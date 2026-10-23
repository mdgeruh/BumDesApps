-- ============================================================================
-- Sistem BUMDes · Supabase · RESET database (mulai dari awal)
-- ----------------------------------------------------------------------------
-- PERINGATAN: berkas ini MENGHAPUS SEMUA tabel dan fungsi di skema public (data BUMDes, snapshot, riwayat,
--             jurnal, nasabah, dan seluruh fungsi aplikasi). Tidak bisa dibatalkan. Khusus untuk database
--             yang dipakai aplikasi ini saja (model 1 aplikasi = 1 database).
-- Cara pakai  : 1) Ubah v_konfirmasi di bawah menjadi 'HAPUS SEMUA DATA'.
--               2) (Opsional) ubah v_hapus_akun menjadi true untuk ikut menghapus semua akun login (auth.users).
--               3) Supabase > SQL Editor > New query > tempel > Run.
--               4) Lalu jalankan sql/00_semua.sql (pasang ulang), buka aplikasi, dan pilih Siapkan BUMDes.
-- Tanpa rahasia. Fungsi bawaan ekstensi (mis. pgcrypto) tidak disentuh.
-- ============================================================================
do $$
declare
  v_konfirmasi text    := 'TIDAK';   -- ubah menjadi: HAPUS SEMUA DATA
  v_hapus_akun boolean := false;     -- true = hapus juga semua akun login
  r record;
begin
  if v_konfirmasi is distinct from 'HAPUS SEMUA DATA' then
    raise exception 'Dibatalkan: ubah v_konfirmasi menjadi ''HAPUS SEMUA DATA'' bila yakin ingin mereset database.';
  end if;

  -- fungsi di skema public (kecuali milik ekstensi)
  for r in
    select p.oid::regprocedure as f
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and not exists (select 1 from pg_depend d where d.objid = p.oid and d.deptype = 'e')
  loop
    execute 'drop function if exists ' || r.f || ' cascade';
  end loop;

  -- tabel di skema public (kecuali milik ekstensi)
  for r in
    select c.relname
    from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relkind in ('r','p')
      and not exists (select 1 from pg_depend d where d.objid = c.oid and d.deptype = 'e')
  loop
    execute format('drop table if exists public.%I cascade', r.relname);
  end loop;

  if v_hapus_akun then
    delete from auth.users;
  end if;

  raise notice 'Reset selesai. Jalankan sql/00_semua.sql lalu buka aplikasi dan pilih Siapkan BUMDes.';
end $$;
