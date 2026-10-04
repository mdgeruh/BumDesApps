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
