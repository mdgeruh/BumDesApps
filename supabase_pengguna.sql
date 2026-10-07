-- ============================================================================
-- Sistem BUMDes · Supabase · [8/8] PENGGUNA aplikasi dari data pegawai (opsional)
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
