# Supabase — cadangan dan sinkron awan (v1.1.042)

Data utama aplikasi tetap di perangkat (`localStorage`). Supabase milik Anda menyimpan **salinan terbaru** dan **30 riwayat** per BUMDes.

## Tahap

| Tahap | Isi | Status |
|---|---|---|
| 1 | Satu baris snapshot per BUMDes, kunci versi (cegah saling menimpa), peran admin/pengurus/pembaca, RLS | **Terpasang di aplikasi** (`cloud.js`, `supabase_schema.sql`) |
| 2 | Tabel ternormalisasi (unit, pihak, akun, transaksi, jurnal seimbang, pinjaman, audit) + fungsi migrasi dari snapshot | Draf SQL teruji (`supabase_tahap2.sql`), **belum disambung ke aplikasi** |
| 3 | Portal nasabah sungguhan (login nasabah, RLS per nasabah, OTP) | Belum |

## Pasang Tahap 1

1. Buat proyek di supabase.com.
2. Buka **SQL Editor > New query**, tempel seluruh `supabase_schema.sql`, klik **Run** (aman diulang).
3. **Authentication > Users > Add user**: buat akun email + kata sandi untuk pengurus.
4. **Project Settings > API**: salin **Project URL** dan **anon public key**.
5. Di aplikasi: **Setelan > Awan**. Isi alamat proyek dan anon key, Simpan koneksi, Masuk, lalu Buat BUMDes di awan (pembuat otomatis menjadi admin) atau pilih yang sudah ada.
6. Tombol **Simpan ke awan** / **Muat dari awan**. Opsi **Simpan otomatis** mengirim 8 detik setelah perubahan terakhir.

Menambah pengurus: admin menjalankan di SQL Editor `select add_member('<id bumdes>', 'email@pengurus', 'pengurus');` (peran: admin, pengurus, pembaca). Pengguna harus sudah ada di Authentication > Users.

## Perilaku

- **Kunci versi:** simpan hanya berhasil jika versi di awan sama dengan versi terakhir yang dipegang perangkat. Bila beda (perangkat lain sudah menyimpan), sinkron **dijeda** dan muncul **Timpa awan** (dengan konfirmasi) atau **Muat dari awan**.
- **Muat dari awan** mengganti data perangkat; salinan lama disimpan sebagai cadangan lokal (`bumdes_db_v1_prev`).
- Peran **pembaca** hanya boleh memuat.

## Keamanan

- Pakai **anon key** saja. **Jangan pernah** memakai `service_role` key; aplikasi menolaknya.
- Kata sandi tidak disimpan di perangkat; hanya token sesi, di kunci terpisah `bumdes_cloud_v1` (tidak ikut Export JSON).
- Snapshot berisi seluruh data, termasuk **hash PIN** pengguna dan data pribadi nasabah. Batasi anggota, aktifkan kata sandi kuat, dan pertimbangkan MFA Supabase.
- Tabel dilindungi RLS; `anon` tidak punya akses apa pun; tulis snapshot hanya lewat fungsi `save_snapshot`.

## Uji

`tests/logic-72.js` (pembantu), `tests/ui-awan.py` (Supabase palsu via Playwright). SQL diuji di Postgres 16: `tests/supabase-test.sql`, `tests/supabase-stub.sql`, `tests/supabase-test2.sql`.
