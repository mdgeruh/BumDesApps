-- ============================================================================
-- Sistem BUMDes · Supabase · KOSONGKAN ISI database (struktur tetap)
-- ----------------------------------------------------------------------------
-- Menghapus SELURUH ISI tabel data di skema public: snapshot dan riwayat (nomor versi kembali ke nol),
--   transaksi, jurnal, pinjaman, tabungan, penjualan, gaji, pihak, pegawai, audit, dan akun portal nasabah.
-- TETAP ADA: semua tabel, fungsi, kebijakan akses, BUMDes yang sudah disiapkan (tabel bumdes),
--   daftar anggota/peran (bumdes_members), dan akun login (auth.users). Tidak perlu Siapkan BUMDes lagi.
-- Tidak bisa dibatalkan. Export cadangan dari aplikasi dulu.
-- Cara pakai  : 1) Ubah v_konfirmasi di bawah menjadi 'KOSONGKAN ISI'.
--               2) Supabase > SQL Editor > New query > tempel > Run.
--               3) Di aplikasi: Data > Cadangan online > Muat ulang, lalu Simpan ke awan.
--                  Karena awan kosong, aplikasi akan menolak simpan pertama (versi berbeda); tekan Timpa awan sekali
--                  agar data perangkat dikirim sebagai versi 1. Bila perangkat juga kosong, Import JSON dulu.
-- Tanpa rahasia. Untuk mulai dari nol termasuk struktur dan akun, pakai 99_reset.sql.
-- ============================================================================
do $$
declare
  v_konfirmasi text := 'TIDAK';   -- ubah menjadi: KOSONGKAN ISI
  t text; n int := 0; daftar text[] := '{}';
begin
  if v_konfirmasi is distinct from 'KOSONGKAN ISI' then
    raise exception 'Dibatalkan: ubah v_konfirmasi menjadi ''KOSONGKAN ISI'' bila yakin ingin mengosongkan isi database.';
  end if;

  for t in
    select c.relname
    from pg_class c join pg_namespace s on s.oid = c.relnamespace
    where s.nspname = 'public' and c.relkind in ('r','p')
      and c.relname not in ('bumdes','bumdes_members')
      and not exists (select 1 from pg_depend d where d.objid = c.oid and d.deptype = 'e')
    order by c.relname
  loop
    daftar := daftar || format('public.%I', t);
  end loop;

  if array_length(daftar, 1) is not null then
    execute 'truncate table ' || array_to_string(daftar, ', ') || ' restart identity cascade';
    n := array_length(daftar, 1);
  end if;

  raise notice 'Selesai: isi % tabel dikosongkan. Struktur, BUMDes, anggota, dan akun login tetap.', n;
end $$;
