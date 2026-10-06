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
