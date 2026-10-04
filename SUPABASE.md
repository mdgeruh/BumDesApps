# Supabase — cadangan dan sinkron awan (v1.1.042)

Data utama aplikasi tetap di perangkat (`localStorage`). Supabase milik Anda menyimpan **salinan terbaru** dan **30 riwayat** per BUMDes.

## Tahap

| Tahap | Isi | Status |
|---|---|---|
| 1 | Satu baris snapshot per BUMDes, kunci versi (cegah saling menimpa), peran admin/pengurus/pembaca, RLS | **Terpasang di aplikasi** (`cloud.js`, `supabase_schema.sql`) |
| 2 | Tabel ternormalisasi (unit, pihak, akun, transaksi, jurnal seimbang, pinjaman, audit) + fungsi migrasi dari snapshot | Draf SQL teruji (`supabase_tahap2.sql`), **belum disambung ke aplikasi** |
| 3 | Portal nasabah dari HP sendiri (HP + PIN, data milik sendiri, offline) | **Terpasang** (`entry.js`, `supabase_nasabah.sql`); OTP SMS/WhatsApp belum |

## Pasang Tahap 1

1. Buat proyek di supabase.com.
2. Buka **SQL Editor > New query**, tempel seluruh `supabase_schema.sql`, klik **Run** (aman diulang).
3. **Authentication > Users > Add user**: buat akun email + kata sandi untuk pengurus.
4. **Project Settings > API**: salin **Project URL** dan **anon public key**.
5. Di aplikasi: **Setelan > Awan**. Isi alamat proyek dan anon key, Simpan koneksi, Masuk, lalu Buat BUMDes di awan (pembuat otomatis menjadi admin) atau pilih yang sudah ada.
6. Tombol **Simpan ke awan** / **Muat dari awan**. Opsi **Sinkron otomatis** mengirim 8 detik setelah perubahan terakhir dan mengambil data baru dari perangkat lain saat aplikasi dibuka/kembali online (bila tidak ada perubahan lokal belum terkirim; jika ada, sinkron dijeda dan Anda memilih Timpa/Muat).

**Koneksi langsung dari kode:** isi `SB_KEY` (anon public key) di `config.js` bersama `SB_URL`; form koneksi di Setelan otomatis disembunyikan. Jangan pernah memakai service_role/sb_secret_. Sejak v1.1.072 `SB_URL` dan publishable key proyek BumDes-app sudah terisi.

**Peran developer:** jalankan `supabase_developer.sql` setelah Tahap 1 (dan Tahap 2). Angkat developer pertama di SQL Editor: `insert into public.platform_admins(user_id) select id from auth.users where email = 'email-anda@contoh.com' on conflict do nothing;` lalu masuk ulang di aplikasi; bagian Developer muncul di Setelan > Awan. Developer mengelola daftar BUMDes (buat, admin pertama, nonaktif, hapus yang kosong, batasi pembuatan mandiri) tetapi tidak membaca isi data BUMDes. Halaman khusus dibuka lewat tombol Buka halaman Developer di Setelan > Awan, atau alamat aplikasi dengan akhiran `#developer`. Bila supabase_schema.sql dijalankan ulang, jalankan berkas developer lagi.

**Tabel relasional (Tahap 2):** jalankan `supabase_tahap2.sql` sekali di SQL Editor (setelah supabase_schema.sql). Di Setelan > Awan > Tabel relasional tekan Isi tabel sekarang; server memeriksa jurnal seimbang. Cek kecocokan membandingkan jumlah baris dan total debit/kredit/pokok dengan perangkat. Opsi Isi tabel otomatis menjalankannya setiap kali data tersimpan ke awan. Snapshot tetap cadangan utama; data yang dihapus di perangkat tidak otomatis dihapus dari tabel (akan terlihat sebagai selisih).

**Halaman masuk:** di Setelan > Awan tekan Masuk ke akun awan (atau buka alamat aplikasi dengan akhiran `#masuk`). Lupa kata sandi ada di halaman itu.

**Lupa kata sandi:** di Supabase > Authentication > URL Configuration, isi Site URL dan Redirect URLs dengan alamat Vercel aplikasi (mis. https://bumdes-app-five.vercel.app/). Tautan email membuka aplikasi dan meminta kata sandi baru.

Menambah pengurus: admin menjalankan di SQL Editor `select add_member('<id bumdes>', 'email@pengurus', 'pengurus');` (peran: admin, pengurus, pembaca). Pengguna harus sudah ada di Authentication > Users.

## Menambah pengurus dan peran

- Buat akun di Authentication > Users > Add user (centang Auto Confirm User), lalu daftarkan: `select add_member('<id bumdes>', 'email@pengurus', 'pengurus');` di SQL Editor. Peran: `admin`, `pengurus` (simpan dan muat), `pembaca` (hanya muat). Jalankan lagi dengan peran lain untuk mengubahnya.
- Id BUMDes ada di Table Editor > `bumdes` (kolom `id`).
- Satu akun boleh jadi anggota banyak BUMDes; satu perangkat terhubung ke satu BUMDes awan sekaligus.
- Akun aplikasi (Setelan > Pengguna & Peran) terpisah dari akun awan.

## Halaman masuk gabungan dan portal nasabah (v1.1.079)

**Alur:** buka aplikasi tanpa sesi → halaman masuk. Isian berisi `@` = akun pengurus/developer (Supabase Auth); berbentuk nomor HP = nasabah. Setelah cocok: developer → `#developer`; admin/pengurus/pembaca → aplikasi (pembaca hanya melihat); nasabah → portal. Akun di banyak BUMDes memilih dulu. Perangkat baru memuat data dari awan otomatis; perangkat yang sudah berisi data tidak ditimpa.

**Sesi offline:** sesi disimpan di perangkat (`bumdes_cloud_v1`, `bumdes_nsb_v1`). Selama belum Keluar, aplikasi dan portal terbuka tanpa internet. Masuk pertama kali butuh internet. Ini pintu masuk, bukan enkripsi: data lokal tetap bisa dibaca siapa pun yang memegang perangkat yang tidak dikunci.

**Tabel pegawai dan gaji (Tahap 3):** setelah `supabase_tahap2.sql`, jalankan `supabase_tahap3.sql` di SQL Editor. Aplikasi otomatis memakainya saat *Isi tabel sekarang* atau isi otomatis (Setelan > Awan > Tabel relasional); sebelum dipasang, bagian ini disembunyikan.

**Buat pengguna dari pegawai lewat SQL (opsional):** jalankan `supabase_pengguna.sql` di SQL Editor, lalu `select public.buat_pengguna_dari_pegawai('UUID-BUMDES'::uuid);` (UUID: `select id, name from public.bumdes;`). Hasilnya sama dengan tombol *Buat pengguna dari pegawai* di aplikasi: peran dari jabatan, PIN awal 1234, wajib ganti saat masuk pertama. Perangkat yang punya perubahan belum tersimpan akan diminta memilih muat/timpa.

**Pasang portal nasabah:** jalankan `supabase_nasabah.sql` di SQL Editor (setelah Tahap 1 dan `supabase_developer.sql`). Di aplikasi: Setelan > Portal Nasabah > Aktif; masuk akun awan sebagai admin/pengurus; atur PIN nasabah di Master (PIN dikirim ke server dan disimpan sebagai hash bcrypt). Data nasabah diterbitkan otomatis saat Simpan ke awan, atau tekan Terbitkan data sekarang.

**Keamanan nasabah:** tabel `nsb_accounts`/`nsb_sessions` tidak punya kebijakan dan hak tabel, semua lewat fungsi `security definer`. Nasabah hanya mendapat proyeksi miliknya (pinjaman, jadwal, tabungan, profil) tanpa catatan internal. Salah PIN: kunci 15 menit tiap 5 kali, kunci permanen setelah 15 kali sampai pengurus mengatur ulang PIN. Sesi 30 hari, dicabut saat PIN diganti. BUMDes nonaktif menolak masuk. Developer tidak bisa membaca tabel ini. PIN 4–8 angka memang lemah dibanding kata sandi; OTP dan persetujuan data pribadi masih keputusan pengurus (ROADMAP).

## Perilaku

- **Riwayat cadangan:** tombol Riwayat cadangan menampilkan 30 versi terakhir; Pulihkan mengembalikan data perangkat ke versi itu (cadangan lokal disimpan), lalu klik Simpan ke awan agar menjadi versi terbaru. Hanya admin dan pengurus.
- **Sebelum mengubah data di perangkat lain, klik Muat dari awan dulu** agar tidak terjeda konflik.
- Jika setelah memilih ulang BUMDes versi menunjukkan 0 dan "belum", klik Muat dari awan (atau Timpa awan bila data perangkat ini yang benar).
- **Kunci versi:** simpan hanya berhasil jika versi di awan sama dengan versi terakhir yang dipegang perangkat. Bila beda (perangkat lain sudah menyimpan), sinkron **dijeda** dan muncul **Timpa awan** (dengan konfirmasi) atau **Muat dari awan**.
- **Muat dari awan** mengganti data perangkat; salinan lama disimpan sebagai cadangan lokal (`bumdes_db_v1_prev`).
- Peran **pembaca** hanya boleh memuat.

## Keamanan

- **Matikan pendaftaran publik:** Authentication > Sign In / Providers, matikan "Allow new users to sign up". Orang asing yang membuat akun memang tidak bisa melihat BUMDes Anda (RLS), tetapi lebih rapi ditutup.
- Aktifkan MFA di akun Supabase Anda dan pakai kata sandi kuat; itu satu-satunya pintu masuk.
- Anon key dan alamat proyek bukan rahasia; yang melindungi data adalah login dan RLS.

- Pakai **anon key** saja. **Jangan pernah** memakai `service_role` key; aplikasi menolaknya.
- Kata sandi tidak disimpan di perangkat; hanya token sesi, di kunci terpisah `bumdes_cloud_v1` (tidak ikut Export JSON).
- Snapshot berisi seluruh data, termasuk **hash PIN** pengguna dan data pribadi nasabah. Batasi anggota, aktifkan kata sandi kuat, dan pertimbangkan MFA Supabase.
- Tabel dilindungi RLS; `anon` tidak punya akses apa pun; tulis snapshot hanya lewat fungsi `save_snapshot`.

## Uji

`tests/logic-72.js` (pembantu), `tests/ui-awan.py` (Supabase palsu via Playwright). SQL diuji di Postgres 16: `tests/supabase-test.sql`, `tests/supabase-stub.sql`, `tests/supabase-test2.sql`.
