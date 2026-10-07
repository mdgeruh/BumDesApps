-- ============================================================================
-- Sistem BUMDes · Supabase · [1/8] TAHAP 1 · Cadangan dan sinkron awan
-- ----------------------------------------------------------------------------
-- Isi         : Tabel bumdes, bumdes_members, bumdes_snapshots, bumdes_snapshot_history; kebijakan RLS;
--               fungsi is_member, create_bumdes, save_snapshot (kunci versi), add_member.
-- Prasyarat   : proyek Supabase baru (tidak ada prasyarat)
-- Dijalankan  : Supabase > SQL Editor > New query > tempel seluruh berkas > Run. Idempoten (aman diulang). Tanpa rahasia.
-- Dipakai oleh: Setelan > Awan (cloud.js)
-- Catatan
--   Hanya "anon key" yang boleh dipakai di aplikasi. JANGAN pernah memakai service_role key.
--   Bila berkas ini dijalankan ulang, jalankan lagi supabase_developer.sql (ia menimpa is_member dan create_bumdes).
-- ============================================================================

create extension if not exists pgcrypto;

-- ----- tabel ---------------------------------------------------------------
create table if not exists public.bumdes (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 120),
  created_at  timestamptz not null default now(),
  created_by  uuid default auth.uid()
);

create table if not exists public.bumdes_members (
  bumdes_id   uuid not null references public.bumdes(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  role        text not null default 'pengurus' check (role in ('admin','pengurus','pembaca')),
  created_at  timestamptz not null default now(),
  primary key (bumdes_id, user_id)
);
create index if not exists bumdes_members_user_idx on public.bumdes_members(user_id);

-- satu baris data terkini per BUMDes (seluruh objek db aplikasi sebagai JSON)
create table if not exists public.bumdes_snapshots (
  bumdes_id   uuid primary key references public.bumdes(id) on delete cascade,
  version     bigint not null default 0,
  data        jsonb not null check (jsonb_typeof(data) = 'object'),
  app_ver     text,
  updated_at  timestamptz not null default now(),
  updated_by  uuid default auth.uid()
);

-- riwayat cadangan (30 versi terakhir per BUMDes)
create table if not exists public.bumdes_snapshot_history (
  id          bigint generated always as identity primary key,
  bumdes_id   uuid not null references public.bumdes(id) on delete cascade,
  version     bigint not null,
  data        jsonb not null,
  app_ver     text,
  saved_at    timestamptz not null default now(),
  saved_by    uuid default auth.uid(),
  unique (bumdes_id, version)
);

-- ----- fungsi bantu keanggotaan --------------------------------------------
create or replace function public.is_member(b uuid, roles text[] default array['admin','pengurus','pembaca'])
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.bumdes_members m
    where m.bumdes_id = b and m.user_id = auth.uid() and m.role = any(roles)
  );
$$;

-- ----- keamanan baris (RLS) ------------------------------------------------
alter table public.bumdes                  enable row level security;
alter table public.bumdes_members          enable row level security;
alter table public.bumdes_snapshots        enable row level security;
alter table public.bumdes_snapshot_history enable row level security;

drop policy if exists bumdes_select on public.bumdes;
create policy bumdes_select on public.bumdes for select to authenticated
  using (public.is_member(id));

drop policy if exists bumdes_update on public.bumdes;
create policy bumdes_update on public.bumdes for update to authenticated
  using (public.is_member(id, array['admin'])) with check (public.is_member(id, array['admin']));

drop policy if exists members_select on public.bumdes_members;
create policy members_select on public.bumdes_members for select to authenticated
  using (public.is_member(bumdes_id));

drop policy if exists members_admin_write on public.bumdes_members;
create policy members_admin_write on public.bumdes_members for all to authenticated
  using (public.is_member(bumdes_id, array['admin']))
  with check (public.is_member(bumdes_id, array['admin']));

drop policy if exists snapshots_select on public.bumdes_snapshots;
create policy snapshots_select on public.bumdes_snapshots for select to authenticated
  using (public.is_member(bumdes_id));
-- tulis snapshot HANYA lewat fungsi save_snapshot (tanpa policy insert/update/delete)

drop policy if exists history_select on public.bumdes_snapshot_history;
create policy history_select on public.bumdes_snapshot_history for select to authenticated
  using (public.is_member(bumdes_id, array['admin','pengurus']));

-- hak akses tabel: anon tidak boleh apa pun; authenticated hanya yang dibutuhkan
revoke all on public.bumdes, public.bumdes_members, public.bumdes_snapshots, public.bumdes_snapshot_history from anon, public;
grant select on public.bumdes, public.bumdes_members, public.bumdes_snapshots, public.bumdes_snapshot_history to authenticated;
grant update (name) on public.bumdes to authenticated;
grant insert, update, delete on public.bumdes_members to authenticated;

-- ----- fungsi: buat BUMDes baru (pembuat otomatis menjadi admin) -----------
create or replace function public.create_bumdes(p_name text)
returns uuid
language plpgsql security definer set search_path = public
as $$
declare v_id uuid;
begin
  if auth.uid() is null then
    raise exception 'harus_login' using errcode = '28000';
  end if;
  if p_name is null or char_length(btrim(p_name)) = 0 then
    raise exception 'nama_wajib' using errcode = '22023';
  end if;
  insert into public.bumdes(name) values (left(btrim(p_name), 120)) returning id into v_id;
  insert into public.bumdes_members(bumdes_id, user_id, role) values (v_id, auth.uid(), 'admin');
  return v_id;
end;
$$;

-- ----- fungsi: simpan snapshot dengan kunci versi (cegah saling menimpa) ---
-- p_expected = versi yang dipegang aplikasi (0 untuk simpanan pertama).
-- Jika versi di server berbeda: galat 'version_conflict:<versi_server>' (kode 40001).
create or replace function public.save_snapshot(p_bumdes uuid, p_expected bigint, p_data jsonb, p_app_ver text default null)
returns bigint
language plpgsql security definer set search_path = public
as $$
declare cur bigint; nv bigint;
begin
  if auth.uid() is null then
    raise exception 'harus_login' using errcode = '28000';
  end if;
  if not public.is_member(p_bumdes, array['admin','pengurus']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  if p_data is null or jsonb_typeof(p_data) <> 'object' then
    raise exception 'data_tidak_valid' using errcode = '22023';
  end if;
  if pg_column_size(p_data) > 30 * 1024 * 1024 then
    raise exception 'data_terlalu_besar' using errcode = '54000';
  end if;

  select version into cur from public.bumdes_snapshots where bumdes_id = p_bumdes for update;
  if not found then
    if coalesce(p_expected, 0) <> 0 then
      raise exception 'version_conflict:0' using errcode = '40001';
    end if;
    nv := 1;
    insert into public.bumdes_snapshots(bumdes_id, version, data, app_ver) values (p_bumdes, nv, p_data, p_app_ver);
  else
    if cur <> coalesce(p_expected, -1) then
      raise exception 'version_conflict:%', cur using errcode = '40001';
    end if;
    nv := cur + 1;
    update public.bumdes_snapshots
       set version = nv, data = p_data, app_ver = p_app_ver, updated_at = now(), updated_by = auth.uid()
     where bumdes_id = p_bumdes;
  end if;

  insert into public.bumdes_snapshot_history(bumdes_id, version, data, app_ver) values (p_bumdes, nv, p_data, p_app_ver);
  delete from public.bumdes_snapshot_history where bumdes_id = p_bumdes and version <= nv - 30;
  return nv;
end;
$$;

-- ----- fungsi: tambah anggota berdasarkan email (hanya admin) --------------
-- Pengguna harus sudah mendaftar/diundang di Supabase > Authentication > Users.
create or replace function public.add_member(p_bumdes uuid, p_email text, p_role text default 'pengurus')
returns void
language plpgsql security definer set search_path = public
as $$
declare v_user uuid;
begin
  if not public.is_member(p_bumdes, array['admin']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  if p_role not in ('admin','pengurus','pembaca') then
    raise exception 'peran_tidak_valid' using errcode = '22023';
  end if;
  select id into v_user from auth.users where lower(email) = lower(btrim(p_email)) limit 1;
  if v_user is null then
    raise exception 'pengguna_tidak_ditemukan' using errcode = 'P0002';
  end if;
  insert into public.bumdes_members(bumdes_id, user_id, role) values (p_bumdes, v_user, p_role)
  on conflict (bumdes_id, user_id) do update set role = excluded.role;
end;
$$;

-- ----- hak eksekusi fungsi -------------------------------------------------
revoke all on function public.create_bumdes(text)                      from public, anon;
revoke all on function public.save_snapshot(uuid, bigint, jsonb, text) from public, anon;
revoke all on function public.add_member(uuid, text, text)             from public, anon;
revoke all on function public.is_member(uuid, text[])                  from public, anon;
grant execute on function public.create_bumdes(text)                      to authenticated;
grant execute on function public.save_snapshot(uuid, bigint, jsonb, text) to authenticated;
grant execute on function public.add_member(uuid, text, text)             to authenticated;
grant execute on function public.is_member(uuid, text[])                  to authenticated;

-- ----- selesai -------------------------------------------------------------
-- Cek cepat setelah dijalankan:
--   select table_name from information_schema.tables where table_schema='public' and table_name like 'bumdes%';
