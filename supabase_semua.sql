-- ============================================================================
-- Sistem BUMDes · Supabase · SEMUA SEKALIGUS (proyek baru)
-- ----------------------------------------------------------------------------
-- Gabungan otomatis dari 6 berkas di bawah, urutan pasang sudah benar. JANGAN diedit di sini:
-- ubah berkas bagiannya, lalu jalankan: node build.js
-- Cara pakai: Supabase > SQL Editor > New query > tempel SELURUH berkas ini > Run. Idempoten (aman diulang).
-- Bagian: 1=schema, 2=developer, 3=tahap2, 4=tahap3, 5=nasabah, 6=pengguna
-- Setelah selesai: angkat developer pertama dengan perintah di bagian 2 (lihat catatan di sana).
-- ============================================================================


-- >>>>> BAGIAN 1/6: supabase_schema.sql >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-- ============================================================================
-- Sistem BUMDes · Supabase · [1/6] TAHAP 1 · Cadangan dan sinkron awan
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


-- >>>>> BAGIAN 2/6: supabase_developer.sql >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-- ============================================================================
-- Sistem BUMDes · Supabase · [2/6] PERAN DEVELOPER (platform)
-- ----------------------------------------------------------------------------
-- Isi         : Tabel platform_admins, platform_settings, platform_audit; fungsi dev_* (daftar/buat/nonaktifkan/hapus BUMDes kosong,
--               tambah admin pertama, pengaturan, audit); kolom bumdes.status; menimpa is_member dan create_bumdes agar menghormati status.
-- Prasyarat   : supabase_schema.sql (jalankan SETELAH Tahap 1; sebelum Tahap 2 atau sesudahnya sama saja)
-- Dijalankan  : Supabase > SQL Editor > New query > tempel seluruh berkas > Run. Idempoten (aman diulang). Tanpa rahasia.
-- Dipakai oleh: halaman Developer (#developer)
-- Catatan
--   Prinsip: developer mengelola WADAH (daftar BUMDes, admin pertama, status), BUKAN isi data. Ia tidak bisa membaca
--   snapshot/tabel BUMDes kecuali ia sendiri menjadi anggota.
--   Mengangkat developer pertama (jalankan sendiri di SQL Editor, ganti emailnya):
--    insert into public.platform_admins(user_id) select id from auth.users where email = 'email-developer@contoh.com' on conflict do nothing;
-- ============================================================================

alter table public.bumdes add column if not exists status text not null default 'aktif';
do $$ begin
  alter table public.bumdes add constraint bumdes_status_chk check (status in ('aktif','nonaktif'));
exception when duplicate_object then null; end $$;

create table if not exists public.platform_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists public.platform_settings (
  id boolean primary key default true check (id),
  allow_self_create boolean not null default true
);
insert into public.platform_settings(id) values (true) on conflict do nothing;
create table if not exists public.platform_audit (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  actor uuid, actor_email text, action text not null, bumdes_id uuid, detail text
);
alter table public.platform_admins   enable row level security;
alter table public.platform_settings enable row level security;
alter table public.platform_audit    enable row level security;
revoke all on public.platform_admins, public.platform_settings, public.platform_audit from anon, authenticated, public;

create or replace function public.is_developer() returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.platform_admins where user_id = auth.uid()); $$;

-- BUMDes nonaktif: tidak ada yang bisa membaca/menulisnya (anggota maupun admin) sampai diaktifkan lagi
create or replace function public.is_member(b uuid, roles text[] default array['admin','pengurus','pembaca'])
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.bumdes_members m join public.bumdes d on d.id = m.bumdes_id
    where m.bumdes_id = b and m.user_id = auth.uid() and m.role = any(roles) and d.status = 'aktif'
  );
$$;

-- pembuatan BUMDes baru oleh pengguna biasa bisa dibatasi developer
create or replace function public.create_bumdes(p_name text)
returns uuid
language plpgsql security definer set search_path = public
as $$
declare v_id uuid;
begin
  if auth.uid() is null then raise exception 'harus_login' using errcode = '28000'; end if;
  if p_name is null or char_length(btrim(p_name)) = 0 then raise exception 'nama_wajib' using errcode = '22023'; end if;
  if not public.is_developer() and not (select allow_self_create from public.platform_settings where id) then
    raise exception 'pembuatan_dibatasi' using errcode = '42501';
  end if;
  insert into public.bumdes(name) values (left(btrim(p_name), 120)) returning id into v_id;
  insert into public.bumdes_members(bumdes_id, user_id, role) values (v_id, auth.uid(), 'admin');
  return v_id;
end $$;

create or replace function public.dev_log(p_action text, p_bumdes uuid, p_detail text) returns void
language sql security definer set search_path = public
as $$ insert into public.platform_audit(actor, actor_email, action, bumdes_id, detail)
      values (auth.uid(), (select email from auth.users where id = auth.uid()), p_action, p_bumdes, p_detail); $$;

create or replace function public.dev_need() returns void
language plpgsql stable security definer set search_path = public
as $$ begin if not public.is_developer() then raise exception 'tidak_berhak' using errcode = '42501'; end if; end $$;

create or replace function public.dev_is_developer() returns boolean
language sql stable security definer set search_path = public
as $$ select public.is_developer(); $$;

-- daftar BUMDes beserta metadata (TANPA isi data)
create or replace function public.dev_list_bumdes()
returns table(id uuid, name text, status text, created_at timestamptz, members int, admins text, version bigint, updated_at timestamptz, bytes bigint)
language plpgsql stable security definer set search_path = public
as $$
begin
  perform public.dev_need();
  return query
  select b.id, b.name, b.status, b.created_at,
         (select count(*)::int from public.bumdes_members m where m.bumdes_id = b.id),
         coalesce((select string_agg(u.email, ', ' order by u.email) from public.bumdes_members m join auth.users u on u.id = m.user_id
                   where m.bumdes_id = b.id and m.role = 'admin'), ''),
         coalesce(s.version, 0), s.updated_at, coalesce(pg_column_size(s.data), 0)::bigint
  from public.bumdes b left join public.bumdes_snapshots s on s.bumdes_id = b.id
  order by b.created_at desc;
end $$;

create or replace function public.dev_create_bumdes(p_name text, p_admin_email text)
returns uuid
language plpgsql security definer set search_path = public
as $$
declare v_id uuid; v_user uuid; v_name text := left(btrim(coalesce(p_name,'')), 120);
begin
  perform public.dev_need();
  if char_length(v_name) = 0 then raise exception 'nama_wajib' using errcode = '22023'; end if;
  if exists (select 1 from public.bumdes where lower(name) = lower(v_name)) then
    raise exception 'nama_kembar' using errcode = '23505';
  end if;
  select id into v_user from auth.users where lower(email) = lower(btrim(coalesce(p_admin_email,'')));
  if v_user is null then raise exception 'email_tidak_terdaftar' using errcode = 'P0002'; end if;
  insert into public.bumdes(name, created_by) values (v_name, v_user) returning id into v_id;
  insert into public.bumdes_members(bumdes_id, user_id, role) values (v_id, v_user, 'admin');
  perform public.dev_log('buat_bumdes', v_id, v_name || ' / admin ' || lower(btrim(p_admin_email)));
  return v_id;
end $$;

create or replace function public.dev_add_admin(p_bumdes uuid, p_email text)
returns void
language plpgsql security definer set search_path = public
as $$
declare v_user uuid;
begin
  perform public.dev_need();
  if not exists (select 1 from public.bumdes where id = p_bumdes) then raise exception 'bumdes_tidak_ada' using errcode = 'P0002'; end if;
  select id into v_user from auth.users where lower(email) = lower(btrim(coalesce(p_email,'')));
  if v_user is null then raise exception 'email_tidak_terdaftar' using errcode = 'P0002'; end if;
  insert into public.bumdes_members(bumdes_id, user_id, role) values (p_bumdes, v_user, 'admin')
    on conflict (bumdes_id, user_id) do update set role = 'admin';
  perform public.dev_log('tambah_admin', p_bumdes, lower(btrim(p_email)));
end $$;

create or replace function public.dev_set_status(p_bumdes uuid, p_status text)
returns void
language plpgsql security definer set search_path = public
as $$
begin
  perform public.dev_need();
  if p_status not in ('aktif','nonaktif') then raise exception 'status_tidak_valid' using errcode = '22023'; end if;
  update public.bumdes set status = p_status where id = p_bumdes;
  if not found then raise exception 'bumdes_tidak_ada' using errcode = 'P0002'; end if;
  perform public.dev_log('status_' || p_status, p_bumdes, null);
end $$;

-- hanya BUMDes yang belum punya data (tanpa snapshot) yang boleh dihapus
create or replace function public.dev_delete_bumdes(p_bumdes uuid)
returns void
language plpgsql security definer set search_path = public
as $$
declare v_name text;
begin
  perform public.dev_need();
  select name into v_name from public.bumdes where id = p_bumdes;
  if v_name is null then raise exception 'bumdes_tidak_ada' using errcode = 'P0002'; end if;
  if exists (select 1 from public.bumdes_snapshots where bumdes_id = p_bumdes) then
    raise exception 'bumdes_berisi_data' using errcode = '23503';
  end if;
  delete from public.bumdes where id = p_bumdes;
  perform public.dev_log('hapus_bumdes_kosong', p_bumdes, v_name);
end $$;

create or replace function public.dev_settings() returns jsonb
language plpgsql stable security definer set search_path = public
as $$ begin perform public.dev_need(); return (select to_jsonb(s) - 'id' from public.platform_settings s where id); end $$;

create or replace function public.dev_set_self_create(p_allow boolean) returns void
language plpgsql security definer set search_path = public
as $$ begin perform public.dev_need(); update public.platform_settings set allow_self_create = coalesce(p_allow, true) where id;
  perform public.dev_log('atur_buat_mandiri', null, case when p_allow then 'boleh' else 'dibatasi' end); end $$;

create or replace function public.dev_audit()
returns table(at timestamptz, actor_email text, action text, bumdes_id uuid, detail text)
language plpgsql stable security definer set search_path = public
as $$ begin perform public.dev_need();
  return query select a.at, a.actor_email, a.action, a.bumdes_id, a.detail from public.platform_audit a order by a.id desc limit 50; end $$;

do $$
declare f text;
begin
  foreach f in array array['is_developer()','dev_log(text,uuid,text)','dev_need()','dev_is_developer()','dev_list_bumdes()','dev_create_bumdes(text,text)',
     'dev_add_admin(uuid,text)','dev_set_status(uuid,text)','dev_delete_bumdes(uuid)','dev_settings()','dev_set_self_create(boolean)','dev_audit()'] loop
    execute format('revoke all on function public.%s from public, anon', f);
  end loop;
  foreach f in array array['is_developer()','dev_is_developer()','dev_list_bumdes()','dev_create_bumdes(text,text)',
     'dev_add_admin(uuid,text)','dev_set_status(uuid,text)','dev_delete_bumdes(uuid)','dev_settings()','dev_set_self_create(boolean)','dev_audit()'] loop
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;
grant execute on function public.create_bumdes(text) to authenticated;
grant execute on function public.is_member(uuid, text[]) to authenticated;


-- >>>>> BAGIAN 3/6: supabase_tahap2.sql >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-- ============================================================================
-- Sistem BUMDes · Supabase · [3/6] TAHAP 2 · Tabel relasional (akuntansi dan Simpan Pinjam)
-- ----------------------------------------------------------------------------
-- Isi         : Tabel business_units, parties, accounts, cash_accounts, transactions, journal_lines (jurnal dijaga seimbang di server),
--               loans, loan_installments, loan_payments, audit_logs (hanya tambah); RLS; fungsi post_transaction,
--               migrate_snapshot_to_tables, tabel_status. Tiap tabel: kolom penting untuk query + doc = objek asli aplikasi.
-- Prasyarat   : supabase_schema.sql (memakai tabel bumdes dan fungsi is_member)
-- Dijalankan  : Supabase > SQL Editor > New query > tempel seluruh berkas > Run. Idempoten (aman diulang). Tanpa rahasia.
-- Dipakai oleh: Setelan > Awan > Tabel relasional (cloud.js)
-- Catatan
--   Koleksi lain (tabungan, penjualan/air, jaminan, tarif, pengguna) tetap di snapshot sampai dimigrasikan.
-- ============================================================================

-- ----- tabel master --------------------------------------------------------
create table if not exists public.business_units (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, code text, name text not null, type text, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create table if not exists public.parties (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, type text not null, name text not null, phone text, address text, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists parties_name_idx on public.parties(bumdes_id, type, lower(name));
create table if not exists public.accounts (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, code text not null, name text not null, type text not null, parent_id text, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create table if not exists public.cash_accounts (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, name text not null, account_id text, type text, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);

-- ----- akuntansi: transaksi dan baris jurnal -------------------------------
create table if not exists public.transactions (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, date date not null, type text, business_unit_id text, description text,
  amount numeric(18,2), status text, created_by text, created_at timestamptz,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists transactions_date_idx on public.transactions(bumdes_id, date);
create table if not exists public.journal_lines (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, transaction_id text not null, account_id text not null, business_unit_id text,
  date date not null,
  debit numeric(18,2) not null default 0 check (debit >= 0),
  credit numeric(18,2) not null default 0 check (credit >= 0),
  doc jsonb not null default '{}', primary key (bumdes_id, id),
  check (debit = 0 or credit = 0)
);
create index if not exists journal_lines_txn_idx on public.journal_lines(bumdes_id, transaction_id);
create index if not exists journal_lines_acc_idx on public.journal_lines(bumdes_id, account_id, date);

-- jurnal wajib seimbang per transaksi saat COMMIT (constraint trigger tertunda)
create or replace function public.trg_check_balanced() returns trigger
language plpgsql as $$
declare d numeric; c numeric; t text; b uuid;
begin
  t := coalesce(new.transaction_id, old.transaction_id); b := coalesce(new.bumdes_id, old.bumdes_id);
  select coalesce(sum(debit),0), coalesce(sum(credit),0) into d, c
    from public.journal_lines where bumdes_id = b and transaction_id = t;
  if d <> c then
    raise exception 'jurnal_tidak_seimbang: transaksi % debit % kredit %', t, d, c using errcode = '23514';
  end if;
  return null;
end $$;
drop trigger if exists journal_lines_balanced on public.journal_lines;
create constraint trigger journal_lines_balanced after insert or update or delete on public.journal_lines
  deferrable initially deferred for each row execute function public.trg_check_balanced();

-- ----- Simpan Pinjam -------------------------------------------------------
create table if not exists public.loans (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, loan_number text, party_id text not null, unit_id text, status text not null,
  principal numeric(18,2) not null, interest_rate numeric(9,4), tenor int, interest_method text,
  application_date date, approval_date date, disbursement_date date, installment_amount numeric(18,2),
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists loans_party_idx on public.loans(bumdes_id, party_id);
create table if not exists public.loan_installments (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, loan_id text not null, installment_number int not null, due_date date not null,
  principal_due numeric(18,2) not null default 0, interest_due numeric(18,2) not null default 0,
  principal_paid numeric(18,2) not null default 0, interest_paid numeric(18,2) not null default 0,
  penalty_due numeric(18,2) default 0, penalty_paid numeric(18,2) default 0, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists loan_inst_loan_idx on public.loan_installments(bumdes_id, loan_id, installment_number);
create table if not exists public.loan_payments (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, loan_id text not null, installment_id text, party_id text, payment_date date,
  principal_amount numeric(18,2), interest_amount numeric(18,2), penalty_amount numeric(18,2),
  total_amount numeric(18,2), kind text, status text, transaction_id text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);

-- ----- audit log: hanya tambah, tidak bisa diubah/hapus --------------------
create table if not exists public.audit_logs (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, at timestamptz, action text, entity text, entity_id text, detail text, "user" text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);

-- ----- RLS -----------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['business_units','parties','accounts','cash_accounts','transactions','journal_lines',
                           'loans','loan_installments','loan_payments','audit_logs'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on public.%I from anon, public', t);
    execute format('grant select on public.%I to authenticated', t);
    execute format('drop policy if exists %I on public.%I', t||'_sel', t);
    execute format('create policy %I on public.%I for select to authenticated using (public.is_member(bumdes_id))', t||'_sel', t);
  end loop;
  -- master dan Simpan Pinjam: admin/pengurus boleh tambah dan ubah; hanya admin boleh hapus
  foreach t in array array['business_units','parties','accounts','cash_accounts','loans','loan_installments','loan_payments'] loop
    execute format('grant insert, update, delete on public.%I to authenticated', t);
    execute format('drop policy if exists %I on public.%I', t||'_ins', t);
    execute format('create policy %I on public.%I for insert to authenticated with check (public.is_member(bumdes_id, array[''admin'',''pengurus'']))', t||'_ins', t);
    execute format('drop policy if exists %I on public.%I', t||'_upd', t);
    execute format('create policy %I on public.%I for update to authenticated using (public.is_member(bumdes_id, array[''admin'',''pengurus''])) with check (public.is_member(bumdes_id, array[''admin'',''pengurus'']))', t||'_upd', t);
    execute format('drop policy if exists %I on public.%I', t||'_del', t);
    execute format('create policy %I on public.%I for delete to authenticated using (public.is_member(bumdes_id, array[''admin'']))', t||'_del', t);
  end loop;
  -- jurnal, transaksi, audit: hanya INSERT (koreksi lewat transaksi pembalik); status transaksi boleh diubah (pembatalan)
  foreach t in array array['transactions','journal_lines','audit_logs'] loop
    execute format('grant insert on public.%I to authenticated', t);
    execute format('drop policy if exists %I on public.%I', t||'_ins', t);
    execute format('create policy %I on public.%I for insert to authenticated with check (public.is_member(bumdes_id, array[''admin'',''pengurus'']))', t||'_ins', t);
  end loop;
end $$;
grant update (status) on public.transactions to authenticated;
drop policy if exists transactions_upd on public.transactions;
create policy transactions_upd on public.transactions for update to authenticated
  using (public.is_member(bumdes_id, array['admin','pengurus'])) with check (public.is_member(bumdes_id, array['admin','pengurus']));

-- ----- fungsi: catat transaksi + baris jurnal secara atomik ----------------
-- p_txn   : {"id","date","type","business_unit_id","description","amount","status","created_by"}
-- p_lines : [{"id","account_id","debit","credit","business_unit_id"}, ...]
create or replace function public.post_transaction(p_bumdes uuid, p_txn jsonb, p_lines jsonb)
returns text
language plpgsql security definer set search_path = public
as $$
declare d numeric; c numeric; v_id text := p_txn->>'id';
begin
  if not public.is_member(p_bumdes, array['admin','pengurus']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  if v_id is null or jsonb_typeof(p_lines) <> 'array' or jsonb_array_length(p_lines) < 2 then
    raise exception 'transaksi_tidak_valid' using errcode = '22023';
  end if;
  select coalesce(sum((l->>'debit')::numeric),0), coalesce(sum((l->>'credit')::numeric),0)
    into d, c from jsonb_array_elements(p_lines) l;
  if d <> c or d <= 0 then
    raise exception 'jurnal_tidak_seimbang: debit % kredit %', d, c using errcode = '23514';
  end if;
  insert into public.transactions(bumdes_id,id,date,type,business_unit_id,description,amount,status,created_by,created_at,doc)
  values (p_bumdes, v_id, (p_txn->>'date')::date, p_txn->>'type', p_txn->>'business_unit_id', p_txn->>'description',
          nullif(p_txn->>'amount','')::numeric, coalesce(p_txn->>'status','posted'), p_txn->>'created_by', now(), p_txn);
  insert into public.journal_lines(bumdes_id,id,transaction_id,account_id,business_unit_id,date,debit,credit,doc)
  select p_bumdes, l->>'id', v_id, l->>'account_id', coalesce(l->>'business_unit_id', p_txn->>'business_unit_id'),
         (p_txn->>'date')::date, coalesce((l->>'debit')::numeric,0), coalesce((l->>'credit')::numeric,0), l
  from jsonb_array_elements(p_lines) l;
  return v_id;
end $$;

-- ----- fungsi: pindahkan data dari snapshot (Tahap 1) ke tabel -------------
-- Hanya admin dan pengurus; sumbernya snapshot yang memang boleh mereka simpan.
-- Idempoten: menimpa baris dengan id yang sama. Koleksi lain (gaji, air, dst.) tetap di snapshot sampai dimigrasikan.
create or replace function public.migrate_snapshot_to_tables(p_bumdes uuid)
returns jsonb
language plpgsql security definer set search_path = public
as $$
declare s jsonb; r jsonb := '{}'; n int;
begin
  if not public.is_member(p_bumdes, array['admin','pengurus']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  select data into s from public.bumdes_snapshots where bumdes_id = p_bumdes;
  if s is null then raise exception 'snapshot_belum_ada' using errcode = 'P0002'; end if;
  set constraints all deferred;

  insert into public.business_units select p_bumdes, o->>'_id', o->>'code', o->>'name', o->>'type', o->>'status', o
    from jsonb_array_elements(coalesce(s->'business_units','[]')) o
    on conflict (bumdes_id,id) do update set code=excluded.code,name=excluded.name,type=excluded.type,status=excluded.status,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('business_units', n);

  insert into public.parties select p_bumdes, o->>'_id', o->>'type', o->>'name', o->>'phone', o->>'address', o->>'status', o
    from jsonb_array_elements(coalesce(s->'parties','[]')) o
    on conflict (bumdes_id,id) do update set type=excluded.type,name=excluded.name,phone=excluded.phone,address=excluded.address,status=excluded.status,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('parties', n);

  insert into public.accounts select p_bumdes, o->>'_id', o->>'code', o->>'name', o->>'type', o->>'parent_id', o->>'status', o
    from jsonb_array_elements(coalesce(s->'accounts','[]')) o
    on conflict (bumdes_id,id) do update set code=excluded.code,name=excluded.name,type=excluded.type,parent_id=excluded.parent_id,status=excluded.status,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('accounts', n);

  insert into public.cash_accounts select p_bumdes, o->>'_id', o->>'name', o->>'account_id', o->>'type', o->>'status', o
    from jsonb_array_elements(coalesce(s->'cash_accounts','[]')) o
    on conflict (bumdes_id,id) do update set name=excluded.name,account_id=excluded.account_id,type=excluded.type,status=excluded.status,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('cash_accounts', n);

  insert into public.transactions select p_bumdes, o->>'_id', (o->>'date')::date, o->>'type', o->>'business_unit_id', o->>'description',
      nullif(o->>'amount','')::numeric, o->>'status', o->>'created_by', nullif(o->>'created_at','')::timestamptz, o
    from jsonb_array_elements(coalesce(s->'transactions','[]')) o
    on conflict (bumdes_id,id) do update set date=excluded.date,type=excluded.type,business_unit_id=excluded.business_unit_id,description=excluded.description,amount=excluded.amount,status=excluded.status,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('transactions', n);

  insert into public.journal_lines select p_bumdes, o->>'_id', o->>'transaction_id', o->>'account_id', o->>'business_unit_id',
      (o->>'date')::date, coalesce((o->>'debit')::numeric,0), coalesce((o->>'credit')::numeric,0), o
    from jsonb_array_elements(coalesce(s->'journal_lines','[]')) o
    on conflict (bumdes_id,id) do update set transaction_id=excluded.transaction_id,account_id=excluded.account_id,business_unit_id=excluded.business_unit_id,date=excluded.date,debit=excluded.debit,credit=excluded.credit,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('journal_lines', n);

  insert into public.loans select p_bumdes, o->>'_id', o->>'loan_number', o->>'party_id', o->>'unit_id', o->>'status',
      (o->>'principal')::numeric, nullif(o->>'interest_rate','')::numeric, nullif(o->>'tenor','')::int, o->>'interest_method',
      nullif(o->>'application_date','')::date, nullif(o->>'approval_date','')::date, nullif(o->>'disbursement_date','')::date,
      nullif(o->>'installment_amount','')::numeric, o
    from jsonb_array_elements(coalesce(s->'loans','[]')) o
    on conflict (bumdes_id,id) do update set loan_number=excluded.loan_number,party_id=excluded.party_id,unit_id=excluded.unit_id,status=excluded.status,principal=excluded.principal,interest_rate=excluded.interest_rate,tenor=excluded.tenor,interest_method=excluded.interest_method,application_date=excluded.application_date,approval_date=excluded.approval_date,disbursement_date=excluded.disbursement_date,installment_amount=excluded.installment_amount,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('loans', n);

  insert into public.loan_installments select p_bumdes, o->>'_id', o->>'loan_id', (o->>'installment_number')::int, (o->>'due_date')::date,
      coalesce((o->>'principal_due')::numeric,0), coalesce((o->>'interest_due')::numeric,0),
      coalesce((o->>'principal_paid')::numeric,0), coalesce((o->>'interest_paid')::numeric,0),
      coalesce((o->>'penalty_due')::numeric,0), coalesce((o->>'penalty_paid')::numeric,0), o->>'status', o
    from jsonb_array_elements(coalesce(s->'loan_installments','[]')) o
    on conflict (bumdes_id,id) do update set loan_id=excluded.loan_id,installment_number=excluded.installment_number,due_date=excluded.due_date,principal_due=excluded.principal_due,interest_due=excluded.interest_due,principal_paid=excluded.principal_paid,interest_paid=excluded.interest_paid,penalty_due=excluded.penalty_due,penalty_paid=excluded.penalty_paid,status=excluded.status,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('loan_installments', n);

  insert into public.loan_payments select p_bumdes, o->>'_id', o->>'loan_id', o->>'installment_id', o->>'party_id', nullif(o->>'payment_date','')::date,
      nullif(o->>'principal_amount','')::numeric, nullif(o->>'interest_amount','')::numeric, nullif(o->>'penalty_amount','')::numeric,
      nullif(o->>'total_amount','')::numeric, o->>'kind', o->>'status', o->>'transaction_id', o
    from jsonb_array_elements(coalesce(s->'loan_payments','[]')) o
    on conflict (bumdes_id,id) do update set loan_id=excluded.loan_id,installment_id=excluded.installment_id,party_id=excluded.party_id,payment_date=excluded.payment_date,principal_amount=excluded.principal_amount,interest_amount=excluded.interest_amount,penalty_amount=excluded.penalty_amount,total_amount=excluded.total_amount,kind=excluded.kind,status=excluded.status,transaction_id=excluded.transaction_id,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('loan_payments', n);

  insert into public.audit_logs select p_bumdes, o->>'_id', nullif(o->>'at','')::timestamptz, o->>'action', o->>'entity', o->>'entity_id',
      coalesce(o->>'detail', o->>'det'), o->>'user', o
    from jsonb_array_elements(coalesce(s->'audit_logs','[]')) o
    on conflict (bumdes_id,id) do nothing;
  get diagnostics n = row_count; r := r || jsonb_build_object('audit_logs', n);
  return r;
end $$;

-- ----- fungsi: ringkasan isi tabel untuk dicocokkan dengan perangkat -------
-- Boleh dipanggil semua anggota.
create or replace function public.tabel_status(p_bumdes uuid)
returns jsonb
language plpgsql stable security definer set search_path = public
as $$
declare r jsonb;
begin
  if not public.is_member(p_bumdes) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  select jsonb_build_object(
    'business_units', (select count(*) from public.business_units where bumdes_id = p_bumdes),
    'parties',        (select count(*) from public.parties where bumdes_id = p_bumdes),
    'accounts',       (select count(*) from public.accounts where bumdes_id = p_bumdes),
    'transactions',   (select count(*) from public.transactions where bumdes_id = p_bumdes),
    'journal_lines',  (select count(*) from public.journal_lines where bumdes_id = p_bumdes),
    'loans',          (select count(*) from public.loans where bumdes_id = p_bumdes),
    'loan_installments', (select count(*) from public.loan_installments where bumdes_id = p_bumdes),
    'loan_payments',  (select count(*) from public.loan_payments where bumdes_id = p_bumdes),
    'audit_logs',     (select count(*) from public.audit_logs where bumdes_id = p_bumdes),
    'debit',          (select coalesce(sum(debit),0) from public.journal_lines where bumdes_id = p_bumdes),
    'credit',         (select coalesce(sum(credit),0) from public.journal_lines where bumdes_id = p_bumdes),
    'principal',      (select coalesce(sum(principal),0) from public.loans where bumdes_id = p_bumdes)
  ) into r;
  return r;
end $$;

revoke all on function public.post_transaction(uuid, jsonb, jsonb) from public, anon;
revoke all on function public.migrate_snapshot_to_tables(uuid)     from public, anon;
revoke all on function public.tabel_status(uuid)                   from public, anon;
grant execute on function public.post_transaction(uuid, jsonb, jsonb) to authenticated;
grant execute on function public.migrate_snapshot_to_tables(uuid)     to authenticated;
grant execute on function public.tabel_status(uuid)                   to authenticated;


-- >>>>> BAGIAN 4/6: supabase_tahap3.sql >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-- ============================================================================
-- Sistem BUMDes · Supabase · [4/6] TAHAP 3 · Tabel pegawai dan gaji
-- ----------------------------------------------------------------------------
-- Isi         : Tabel employees, payroll_components, payrolls, payroll_items, salary_payments; fungsi migrate_snapshot_to_tables3,
--               tabel_status3. Tiap tabel: kolom penting + doc = objek asli aplikasi.
-- Prasyarat   : supabase_schema.sql dan supabase_tahap2.sql
-- Dijalankan  : Supabase > SQL Editor > New query > tempel seluruh berkas > Run. Idempoten (aman diulang). Tanpa rahasia.
-- Dipakai oleh: Setelan > Awan > Tabel relasional (otomatis bila fungsi di bawah ada)
-- Catatan
--   PIN pengguna TIDAK disalin ke tabel ini.
--   Cara "samakan dengan snapshot": baris yang sudah tidak ada di data aplikasi ikut dihapus dari tabel.
-- ============================================================================

create table if not exists public.employees (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, emp_number text, name text not null, position text, unit_id text, status text,
  base_salary numeric(18,2), doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create table if not exists public.payroll_components (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, name text not null, type text, calc text, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create table if not exists public.payrolls (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, period text not null, employee_id text not null, unit_id text, status text,
  gross_salary numeric(18,2) not null default 0, total_deduction numeric(18,2) not null default 0, net_salary numeric(18,2) not null default 0,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists payrolls_period_idx on public.payrolls(bumdes_id, period);
create table if not exists public.payroll_items (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, payroll_id text not null, component_id text, name text, type text,
  amount numeric(18,2) not null default 0, doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists payroll_items_pay_idx on public.payroll_items(bumdes_id, payroll_id);
create table if not exists public.salary_payments (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, payroll_id text not null, payment_date date, cash_account_id text, transaction_id text, status text,
  amount numeric(18,2), doc jsonb not null default '{}', primary key (bumdes_id, id)
);

do $$
declare t text;
begin
  foreach t in array array['employees','payroll_components','payrolls','payroll_items','salary_payments'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on public.%I from anon, public', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('drop policy if exists %I on public.%I', t||'_sel', t);
    execute format('create policy %I on public.%I for select to authenticated using (public.is_member(bumdes_id))', t||'_sel', t);
    execute format('drop policy if exists %I on public.%I', t||'_ins', t);
    execute format('create policy %I on public.%I for insert to authenticated with check (public.is_member(bumdes_id, array[''admin'',''pengurus'']))', t||'_ins', t);
    execute format('drop policy if exists %I on public.%I', t||'_upd', t);
    execute format('create policy %I on public.%I for update to authenticated using (public.is_member(bumdes_id, array[''admin'',''pengurus''])) with check (public.is_member(bumdes_id, array[''admin'',''pengurus'']))', t||'_upd', t);
    execute format('drop policy if exists %I on public.%I', t||'_del', t);
    execute format('create policy %I on public.%I for delete to authenticated using (public.is_member(bumdes_id, array[''admin'']))', t||'_del', t);
  end loop;
end $$;

create or replace function public.migrate_snapshot_to_tables3(p_bumdes uuid)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare s jsonb; r jsonb := '{}'; n int;
begin
  if not public.is_member(p_bumdes, array['admin','pengurus']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  select data into s from public.bumdes_snapshots where bumdes_id = p_bumdes;
  if s is null then raise exception 'snapshot_belum_ada' using errcode = 'P0002'; end if;

  delete from public.employees where bumdes_id = p_bumdes;
  insert into public.employees select p_bumdes, o->>'_id', o->>'emp_number', o->>'name', o->>'position', o->>'unit_id', o->>'status',
      nullif(o->>'base_salary','')::numeric, o from jsonb_array_elements(coalesce(s->'employees','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('employees', n);

  delete from public.payroll_components where bumdes_id = p_bumdes;
  insert into public.payroll_components select p_bumdes, o->>'_id', o->>'name', o->>'type', coalesce(o->>'calc','tetap'), o->>'status', o
    from jsonb_array_elements(coalesce(s->'payroll_components','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('payroll_components', n);

  delete from public.payrolls where bumdes_id = p_bumdes;
  insert into public.payrolls select p_bumdes, o->>'_id', o->>'period', o->>'employee_id', o->>'unit_id', o->>'status',
      coalesce((o->>'gross_salary')::numeric,0), coalesce((o->>'total_deduction')::numeric,0), coalesce((o->>'net_salary')::numeric,0), o
    from jsonb_array_elements(coalesce(s->'payrolls','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('payrolls', n);

  delete from public.payroll_items where bumdes_id = p_bumdes;
  insert into public.payroll_items select p_bumdes, o->>'_id', o->>'payroll_id', o->>'component_id', o->>'name', o->>'type',
      coalesce((o->>'amount')::numeric,0), o from jsonb_array_elements(coalesce(s->'payroll_items','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('payroll_items', n);

  delete from public.salary_payments where bumdes_id = p_bumdes;
  insert into public.salary_payments select p_bumdes, o->>'_id', o->>'payroll_id', nullif(o->>'payment_date','')::date, o->>'cash_account_id',
      o->>'transaction_id', o->>'status', nullif(o->>'amount','')::numeric, o from jsonb_array_elements(coalesce(s->'salary_payments','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('salary_payments', n);
  return r;
end $$;

create or replace function public.tabel_status3(p_bumdes uuid)
returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_member(p_bumdes) then raise exception 'tidak_berhak' using errcode = '42501'; end if;
  return jsonb_build_object(
    'employees',          (select count(*) from public.employees where bumdes_id = p_bumdes),
    'payroll_components', (select count(*) from public.payroll_components where bumdes_id = p_bumdes),
    'payrolls',           (select count(*) from public.payrolls where bumdes_id = p_bumdes),
    'payroll_items',      (select count(*) from public.payroll_items where bumdes_id = p_bumdes),
    'salary_payments',    (select count(*) from public.salary_payments where bumdes_id = p_bumdes),
    'net_salary',         (select coalesce(sum(net_salary),0) from public.payrolls where bumdes_id = p_bumdes));
end $$;

revoke all on function public.migrate_snapshot_to_tables3(uuid) from public, anon;
revoke all on function public.tabel_status3(uuid) from public, anon;
grant execute on function public.migrate_snapshot_to_tables3(uuid) to authenticated;
grant execute on function public.tabel_status3(uuid) to authenticated;


-- >>>>> BAGIAN 5/6: supabase_nasabah.sql >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-- ============================================================================
-- Sistem BUMDes · Supabase · [5/6] PORTAL NASABAH
-- ----------------------------------------------------------------------------
-- Isi         : Tabel nsb_accounts dan nsb_sessions (dikunci rapat: RLS aktif, tanpa kebijakan, tanpa hak tabel);
--               fungsi nsb_login, nsb_data, nsb_logout, nsb_change_pin (sisi nasabah) dan nsb_set_pin, nsb_publish, nsb_list (sisi pengurus).
-- Prasyarat   : supabase_schema.sql dan supabase_developer.sql (memakai kolom bumdes.status)
-- Dijalankan  : Supabase > SQL Editor > New query > tempel seluruh berkas > Run. Idempoten (aman diulang). Tanpa rahasia.
-- Dipakai oleh: Portal Nasabah (portal.js, entry.js)
-- Catatan
--   Prinsip:
--   * Nasabah TIDAK memakai Supabase Auth: masuk dengan nomor HP + PIN lewat fungsi server (security definer).
--   * PIN disimpan sebagai hash bcrypt (pgcrypto); salah PIN dihitung di server (terkunci bertahap).
--   * Data portal = proyeksi milik nasabah itu SAJA (pinjaman, jadwal, tabungan, profil), diterbitkan pengurus saat sinkron.
--     Nasabah hanya bisa membaca. Developer platform tidak dapat membaca tabel ini (tanpa kebijakan).
-- ============================================================================

create extension if not exists pgcrypto;

create table if not exists public.nsb_accounts (
  id           uuid primary key default gen_random_uuid(),
  bumdes_id    uuid not null references public.bumdes(id) on delete cascade,
  party_id     text not null,
  hp           text not null,
  nama         text not null default '',
  pin_hash     text not null,
  fails        int  not null default 0,
  locked_until timestamptz,
  data         jsonb not null default '{}'::jsonb,
  data_at      timestamptz,
  last_login   timestamptz,
  created_at   timestamptz not null default now(),
  unique (bumdes_id, party_id),
  unique (bumdes_id, hp)
);
create index if not exists nsb_accounts_hp_idx on public.nsb_accounts (hp);

create table if not exists public.nsb_sessions (
  token_hash text primary key,
  account_id uuid not null references public.nsb_accounts(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);
create index if not exists nsb_sessions_acc_idx on public.nsb_sessions (account_id);

alter table public.nsb_accounts enable row level security;
alter table public.nsb_sessions enable row level security;
revoke all on public.nsb_accounts from public, anon, authenticated;
revoke all on public.nsb_sessions from public, anon, authenticated;

-- ----- pembantu ------------------------------------------------------------
create or replace function public.nsb_hp(p text) returns text
language sql immutable set search_path = public as $$
  select case
    when d like '62%' then '0' || substr(d, 3)
    when d like '8%'  then '0' || d
    else d end
  from (select regexp_replace(coalesce(p, ''), '\D', '', 'g') as d) x;
$$;

create or replace function public.nsb_pin_ok(p text) returns boolean
language sql immutable set search_path = public as $$
  select p ~ '^\d{4,8}$' and p !~ '^(\d)\1+$';
$$;

create or replace function public.nsb_mk_session(p_acc uuid) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare t text := encode(gen_random_bytes(24), 'hex');
begin
  delete from public.nsb_sessions where expires_at < now();
  insert into public.nsb_sessions(token_hash, account_id, expires_at)
  values (encode(digest(t, 'sha256'), 'hex'), p_acc, now() + interval '30 days');
  return t;
end $$;

create or replace function public.nsb_acc_of(p_token text) returns uuid
language plpgsql security definer set search_path = public, extensions as $$
declare a uuid; h text := encode(digest(coalesce(p_token, ''), 'sha256'), 'hex');
begin
  select s.account_id into a
  from public.nsb_sessions s
  join public.nsb_accounts c on c.id = s.account_id
  join public.bumdes b on b.id = c.bumdes_id
  where s.token_hash = h and s.expires_at > now() and b.status = 'aktif';
  if a is not null then
    update public.nsb_sessions set expires_at = now() + interval '30 days' where token_hash = h;
  end if;
  return a;
end $$;

-- ----- sisi nasabah (boleh dipanggil tanpa login Supabase) -----------------
-- Kembalian: {ok:true, sessions:[{token,bumdes,nama}]} atau {ok:false, err:'...'}.
-- Tidak melempar galat agar hitungan salah PIN tetap tersimpan.
create or replace function public.nsb_login(p_hp text, p_pin text)
returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare r record; v_hp text := public.nsb_hp(p_hp); out jsonb := '[]'::jsonb; locked boolean := false; any_acc boolean := false;
begin
  if length(v_hp) < 8 or p_pin is null or length(p_pin) > 20 then
    return jsonb_build_object('ok', false, 'err', 'salah');
  end if;
  for r in
    select c.*, b.name as bname from public.nsb_accounts c
    join public.bumdes b on b.id = c.bumdes_id
    where c.hp = v_hp and b.status = 'aktif'
  loop
    any_acc := true;
    if r.locked_until is not null and r.locked_until > now() then
      locked := true; continue;
    end if;
    if r.pin_hash = crypt(p_pin, r.pin_hash) then
      update public.nsb_accounts set fails = 0, locked_until = null, last_login = now() where id = r.id;
      out := out || jsonb_build_array(jsonb_build_object(
        'token', public.nsb_mk_session(r.id), 'bumdes', r.bname, 'nama', r.nama));
    else
      update public.nsb_accounts set
        fails = r.fails + 1,
        locked_until = case
          when r.fails + 1 >= 15 then 'infinity'::timestamptz
          when (r.fails + 1) % 5 = 0 then now() + interval '15 minutes'
          else locked_until end
      where id = r.id;
    end if;
  end loop;
  if jsonb_array_length(out) > 0 then
    return jsonb_build_object('ok', true, 'sessions', out);
  end if;
  if locked then
    return jsonb_build_object('ok', false, 'err', 'terkunci');
  end if;
  return jsonb_build_object('ok', false, 'err', 'salah');
end $$;

create or replace function public.nsb_data(p_token text)
returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare a uuid := public.nsb_acc_of(p_token); r record;
begin
  if a is null then return jsonb_build_object('ok', false, 'err', 'sesi'); end if;
  select c.nama, c.data, c.data_at, b.name as bname into r
  from public.nsb_accounts c join public.bumdes b on b.id = c.bumdes_id where c.id = a;
  return jsonb_build_object('ok', true, 'nama', r.nama, 'bumdes', r.bname, 'data', r.data, 'at', r.data_at);
end $$;

create or replace function public.nsb_logout(p_token text)
returns void
language sql security definer set search_path = public, extensions as $$
  delete from public.nsb_sessions where token_hash = encode(digest(coalesce(p_token, ''), 'sha256'), 'hex');
$$;

create or replace function public.nsb_change_pin(p_token text, p_old text, p_new text)
returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare a uuid := public.nsb_acc_of(p_token); r public.nsb_accounts;
begin
  if a is null then return jsonb_build_object('ok', false, 'err', 'sesi'); end if;
  select * into r from public.nsb_accounts where id = a;
  if r.locked_until is not null and r.locked_until > now() then
    return jsonb_build_object('ok', false, 'err', 'terkunci');
  end if;
  if r.pin_hash <> crypt(coalesce(p_old, ''), r.pin_hash) then
    update public.nsb_accounts set
      fails = r.fails + 1,
      locked_until = case when r.fails + 1 >= 15 then 'infinity'::timestamptz
                          when (r.fails + 1) % 5 = 0 then now() + interval '15 minutes' else locked_until end
    where id = a;
    return jsonb_build_object('ok', false, 'err', 'pin_lama');
  end if;
  if not public.nsb_pin_ok(p_new) then return jsonb_build_object('ok', false, 'err', 'pin_baru'); end if;
  if p_new = p_old then return jsonb_build_object('ok', false, 'err', 'pin_sama'); end if;
  update public.nsb_accounts set pin_hash = crypt(p_new, gen_salt('bf', 8)), fails = 0, locked_until = null where id = a;
  delete from public.nsb_sessions where account_id = a and token_hash <> encode(digest(p_token, 'sha256'), 'hex');
  return jsonb_build_object('ok', true);
end $$;

-- ----- sisi pengurus (harus login Supabase, admin/pengurus BUMDes itu) -----
-- Atur PIN (dan buka kunci). Nomor HP dipakai untuk masuk; harus unik per BUMDes.
create or replace function public.nsb_set_pin(p_bumdes uuid, p_party text, p_hp text, p_nama text, p_pin text)
returns void
language plpgsql security definer set search_path = public, extensions as $$
declare v_hp text := public.nsb_hp(p_hp);
begin
  if auth.uid() is null then raise exception 'harus_login' using errcode = '28000'; end if;
  if not public.is_member(p_bumdes, array['admin','pengurus']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  if length(v_hp) < 8 then raise exception 'hp_tidak_valid' using errcode = '22023'; end if;
  if not public.nsb_pin_ok(p_pin) then raise exception 'pin_tidak_valid' using errcode = '22023'; end if;
  if exists (select 1 from public.nsb_accounts where bumdes_id = p_bumdes and hp = v_hp and party_id <> p_party) then
    raise exception 'hp_dipakai' using errcode = '23505';
  end if;
  insert into public.nsb_accounts(bumdes_id, party_id, hp, nama, pin_hash)
  values (p_bumdes, p_party, v_hp, coalesce(p_nama, ''), crypt(p_pin, gen_salt('bf', 8)))
  on conflict (bumdes_id, party_id) do update
    set hp = excluded.hp, nama = excluded.nama, pin_hash = excluded.pin_hash, fails = 0, locked_until = null;
  delete from public.nsb_sessions where account_id = (select id from public.nsb_accounts where bumdes_id = p_bumdes and party_id = p_party);
end $$;

-- Terbitkan data portal. p_items = [{party_id, hp, nama, data}] hanya untuk akun yang SUDAH punya PIN di server.
-- p_keep = daftar party_id yang tetap berhak masuk; akun lain di BUMDes ini dihapus (nasabah nonaktif/portal dimatikan).
create or replace function public.nsb_publish(p_bumdes uuid, p_items jsonb, p_keep text[])
returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare it jsonb; n int := 0; d int := 0; v_hp text;
begin
  if auth.uid() is null then raise exception 'harus_login' using errcode = '28000'; end if;
  if not public.is_member(p_bumdes, array['admin','pengurus']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  if p_items is not null and jsonb_typeof(p_items) <> 'array' then
    raise exception 'data_tidak_valid' using errcode = '22023';
  end if;
  for it in select * from jsonb_array_elements(coalesce(p_items, '[]'::jsonb)) loop
    if pg_column_size(it) > 400 * 1024 then continue; end if;
    v_hp := public.nsb_hp(it->>'hp');
    update public.nsb_accounts set
      nama = coalesce(it->>'nama', nama),
      data = coalesce(it->'data', '{}'::jsonb),
      data_at = now(),
      hp = case when length(v_hp) >= 8
                 and not exists (select 1 from public.nsb_accounts o where o.bumdes_id = p_bumdes and o.hp = v_hp and o.party_id <> it->>'party_id')
                then v_hp else public.nsb_accounts.hp end
    where bumdes_id = p_bumdes and party_id = it->>'party_id';
    if found then n := n + 1; end if;
  end loop;
  delete from public.nsb_accounts where bumdes_id = p_bumdes and not (party_id = any(coalesce(p_keep, array[]::text[])));
  get diagnostics d = row_count;
  return jsonb_build_object('diterbitkan', n, 'dihapus', d,
    'akun', (select count(*) from public.nsb_accounts where bumdes_id = p_bumdes));
end $$;

-- Daftar akun portal untuk pengurus (tanpa hash): status kunci dan login terakhir.
create or replace function public.nsb_list(p_bumdes uuid)
returns table(party_id text, hp text, nama text, fails int, locked boolean, last_login timestamptz, data_at timestamptz)
language plpgsql security definer set search_path = public, extensions as $$
begin
  if auth.uid() is null then raise exception 'harus_login' using errcode = '28000'; end if;
  if not public.is_member(p_bumdes, array['admin','pengurus']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  return query select c.party_id, c.hp, c.nama, c.fails, (c.locked_until is not null and c.locked_until > now()),
                      c.last_login, c.data_at
               from public.nsb_accounts c where c.bumdes_id = p_bumdes order by c.nama;
end $$;

-- ----- hak eksekusi --------------------------------------------------------
revoke all on function public.nsb_mk_session(uuid) from public, anon, authenticated;
revoke all on function public.nsb_acc_of(text) from public, anon, authenticated;
revoke all on function public.nsb_login(text, text) from public;
revoke all on function public.nsb_data(text) from public;
revoke all on function public.nsb_logout(text) from public;
revoke all on function public.nsb_change_pin(text, text, text) from public;
revoke all on function public.nsb_set_pin(uuid, text, text, text, text) from public, anon;
revoke all on function public.nsb_publish(uuid, jsonb, text[]) from public, anon;
revoke all on function public.nsb_list(uuid) from public, anon;
grant execute on function public.nsb_login(text, text) to anon, authenticated;
grant execute on function public.nsb_data(text) to anon, authenticated;
grant execute on function public.nsb_logout(text) to anon, authenticated;
grant execute on function public.nsb_change_pin(text, text, text) to anon, authenticated;
grant execute on function public.nsb_set_pin(uuid, text, text, text, text) to authenticated;
grant execute on function public.nsb_publish(uuid, jsonb, text[]) to authenticated;
grant execute on function public.nsb_list(uuid) to authenticated;


-- >>>>> BAGIAN 6/6: supabase_pengguna.sql >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-- ============================================================================
-- Sistem BUMDes · Supabase · [6/6] PENGGUNA aplikasi dari data pegawai (opsional)
-- ----------------------------------------------------------------------------
-- Isi         : Fungsi app_pin_hash (hash PIN identik dengan aplikasi) dan buat_pengguna_dari_pegawai.
-- Prasyarat   : supabase_schema.sql (dan data BUMDes yang sudah tersimpan ke awan)
-- Dijalankan  : Supabase > SQL Editor > New query > tempel seluruh berkas > Run. Idempoten (aman diulang). Tanpa rahasia.
-- Dipakai oleh: Pengguna > "Buat pengguna dari pegawai" (hasil sama, tanpa SQL)
-- Catatan
--   Cara pakai dari SQL Editor (peran postgres): select public.buat_pengguna_dari_pegawai('UUID-BUMDES-ANDA'::uuid);
--    UUID BUMDes: select id, name from public.bumdes;
--   Aturan: tiap pegawai aktif yang belum punya akun (employee_id atau nama sama) dibuatkan pengguna dengan peran bawaan
--    jabatannya (Master > Pegawai > Daftar jabatan), unit tugas = unit pegawai, PIN awal 1234, wajib diganti saat masuk pertama.
--   Pegawai yang jabatannya belum punya peran bawaan dilewati (dan dilaporkan). Peran Superadmin tidak pernah dibuat lewat jalur ini.
--   Snapshot naik versi; perangkat memuat versi baru (yang punya perubahan belum tersimpan diminta memilih muat/timpa).
-- ============================================================================

create extension if not exists pgcrypto;

-- hash PIN identik dengan aplikasi (users.js pinHash): sha256(salt:pin) lalu 2000 putaran sha256(h+salt+pin)
create or replace function public.app_pin_hash(p_pin text, p_salt text)
returns text language plpgsql immutable set search_path = public, extensions as $$
declare h text; i int;
begin
  h := encode(digest(convert_to(p_salt || ':' || p_pin, 'UTF8'), 'sha256'), 'hex');
  for i in 1..2000 loop
    h := encode(digest(convert_to(h || p_salt || p_pin, 'UTF8'), 'sha256'), 'hex');
  end loop;
  return h;
end $$;

create or replace function public.buat_pengguna_dari_pegawai(p_bumdes uuid, p_pin text default '1234')
returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare
  s jsonb; users jsonb; e jsonb; pos jsonb; rid text; n int := 0; sk int := 0; nv bigint;
  nums int; nid text; salt text; nm text[] := '{}'; made text[] := '{}';
  ts text := to_char(now() at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS');
begin
  if auth.uid() is not null and not public.is_member(p_bumdes, array['admin']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  if p_pin !~ '^[0-9]{4,8}$' then raise exception 'pin_tidak_valid' using errcode = '22023'; end if;
  select data into s from public.bumdes_snapshots where bumdes_id = p_bumdes for update;
  if s is null then raise exception 'snapshot_belum_ada' using errcode = 'P0002'; end if;
  users := coalesce(s->'users', '[]'::jsonb);
  select coalesce(array_agg(lower(u->>'name')), '{}') into nm from jsonb_array_elements(users) u;

  for e in select x from jsonb_array_elements(coalesce(s->'employees','[]'::jsonb)) x
           where coalesce(x->>'status','aktif') = 'aktif' loop
    if exists (select 1 from jsonb_array_elements(users) u where u->>'employee_id' = e->>'_id')
       or lower(e->>'name') = any(nm) then continue; end if;
    select p into pos from jsonb_array_elements(coalesce(s#>'{settings,positions}','[]'::jsonb)) p
      where lower(p->>'name') = lower(trim(coalesce(e->>'position',''))) limit 1;
    rid := pos->>'role_id';
    if rid is null or rid = 'ROL-SUP'
       or not exists (select 1 from jsonb_array_elements(coalesce(s->'roles','[]'::jsonb)) r
                      where r->>'_id' = rid and coalesce(r->>'status','aktif') <> 'nonaktif') then
      sk := sk + 1; continue;
    end if;
    select coalesce(max(nullif(split_part(u->>'_id','-',2),'')::int), 0) + 1 into nums from jsonb_array_elements(users) u;
    nid := 'USR-' || lpad(nums::text, 3, '0');
    salt := encode(gen_random_bytes(8), 'hex');
    users := users || jsonb_build_array(jsonb_build_object(
      '_id', nid, 'name', e->>'name', 'role_id', rid,
      'unit_ids', case when coalesce(e->>'unit_id','') <> '' then jsonb_build_array(e->>'unit_id') else '[]'::jsonb end,
      'status', 'aktif', 'pin_salt', salt, 'pin_hash', public.app_pin_hash(p_pin, salt), 'pin_set_at', ts,
      'must_change', true, 'fails', 0, 'locked_until', '', 'created_at', ts, 'employee_id', e->>'_id'));
    nm := nm || lower(e->>'name'); made := made || (e->>'name'); n := n + 1;
  end loop;

  if n > 0 then
    s := jsonb_set(s, '{users}', users);
    update public.bumdes_snapshots set data = s, version = version + 1, updated_at = now() where bumdes_id = p_bumdes returning version into nv;
    insert into public.bumdes_snapshot_history(bumdes_id, version, data, app_ver) select p_bumdes, nv, s, app_ver from public.bumdes_snapshots where bumdes_id = p_bumdes;
    delete from public.bumdes_snapshot_history where bumdes_id = p_bumdes and version <= nv - 30;
  end if;
  return jsonb_build_object('dibuat', n, 'dilewati_tanpa_peran', sk, 'nama', to_jsonb(made), 'pin_awal', p_pin, 'wajib_ganti', true);
end $$;

revoke all on function public.buat_pengguna_dari_pegawai(uuid, text) from public, anon;
grant execute on function public.buat_pengguna_dari_pegawai(uuid, text) to authenticated;
revoke all on function public.app_pin_hash(text, text) from public, anon, authenticated;
