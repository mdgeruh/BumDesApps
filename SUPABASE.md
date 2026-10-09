# Supabase — cadangan, sinkron awan, dan tabel relasional

**Model: 1 aplikasi = 1 database Supabase = 1 BUMDes.** Setiap BUMDes memasang aplikasinya sendiri (satu hosting) dengan proyek Supabase sendiri. Tidak ada daftar BUMDes bersama dan tidak ada peran developer.

Data utama aplikasi tetap di perangkat (`localStorage`). Supabase milik Anda menyimpan **salinan terbaru**, **30 riwayat**, dan (opsional) **tabel relasional** untuk query dan laporan.

## Pasang cepat (proyek baru)

1. Buat proyek di supabase.com (satu proyek untuk satu BUMDes).
2. **SQL Editor > New query**, tempel **seluruh `sql/00_semua.sql`**, klik **Run**. Berkas ini gabungan otomatis ketujuh berkas di bawah dalam urutan yang benar, dan aman diulang.
3. **Project Settings > API**: salin **Project URL** dan **anon public key**.
4. Di aplikasi: **Data > Backup (bagian Awan)**, isi alamat proyek dan anon key lalu Simpan koneksi (atau isi di `config.js`).
5. Buka layar masuk (`#masuk`) dan pilih **Siapkan BUMDes baru**: isi nama BUMDes, email, dan kata sandi. **Pendaftar pertama otomatis menjadi admin**; penyiapan lalu terkunci (hanya bisa sekali). Bila Supabase meminta konfirmasi email, buka email, lalu masuk dan lanjutkan penyiapan (cukup mengisi nama BUMDes).
6. Admin menambah pengurus lewat bagian *Menambah pengurus dan peran* di bawah.

## Kosongkan isi saja (struktur dan akun tetap)

Jalankan **`sql/98_kosongkan_isi.sql`** di SQL Editor setelah mengubah `v_konfirmasi` menjadi `'KOSONGKAN ISI'`. Mengosongkan seluruh isi tabel data, snapshot, dan riwayat (nomor versi awan kembali ke nol). **Tetap ada:** semua tabel, fungsi, kebijakan akses, BUMDes yang sudah disiapkan, daftar anggota, dan akun login, jadi tidak perlu Siapkan BUMDes lagi. Sesudahnya, di aplikasi buka **Data > Cadangan online**, tekan **Muat ulang**, lalu **Simpan ke awan**: aplikasi menolak simpan pertama karena versi di perangkat masih lama, lalu menampilkan pesan "Awan sudah dikosongkan"; tekan **Timpa awan** sekali agar data perangkat terkirim sebagai versi 1 (atau Import JSON dulu bila perangkat juga ingin dikosongkan). Export cadangan dulu: tidak bisa dibatalkan.

## Mulai dari awal (reset database)

Jalankan **`sql/99_reset.sql`** di SQL Editor. **Menghapus semua tabel dan fungsi di skema public** (data, snapshot, riwayat, nasabah). Berkas ini sengaja gagal sebelum Anda mengubah `v_konfirmasi` menjadi `'HAPUS SEMUA DATA'`; ubah `v_hapus_akun` menjadi `true` bila akun login juga ingin dihapus. Sesudahnya jalankan lagi `sql/00_semua.sql` dan pilih **Siapkan BUMDes**. Proyek lama yang masih memakai model banyak BUMDes (ada `supabase_developer.sql`, tabel `platform_*`, beberapa baris di tabel `bumdes`) **harus direset** sebelum memasang versi ini.

**Koneksi langsung dari kode:** isi `SB_URL` dan `SB_KEY` (anon/publishable key) di `config.js`; form koneksi di Setelan otomatis disembunyikan. Proyek BumDes-app sudah terisi sejak v1.1.072.

## Berkas SQL dan urutan pasang

Semua SQL ada di folder **`sql/`**, bernomor menurut urutan pasang: `00_semua.sql` (gabungan, paling mudah), `01`–`07` (bertahap), `98_kosongkan_isi.sql` (kosongkan isi, struktur tetap), dan `99_reset.sql` (hapus semua untuk mulai dari awal).

| No | Berkas | Isi | Prasyarat | Dipakai oleh |
|---|---|---|---|---|
| 1 | `sql/01_inti.sql` | **Tahap 1**: snapshot, riwayat 30 versi, kunci versi, peran admin/pengurus/pembaca, RLS, penyiapan BUMDes (`setup_status`, `setup_bumdes`, satu BUMDes per database) | — | Setelan > Awan |
| 2 | `sql/02_akuntansi.sql` | **Tahap 2**: tabel akuntansi dan Simpan Pinjam (unit, mitra, akun, kas, transaksi, jurnal seimbang, pinjaman, angsuran, pembayaran, audit) + fungsi migrasi dan status | 1 | Setelan > Awan > Tabel relasional |
| 3 | `sql/03_pegawai.sql` | **Tahap 3**: tabel pegawai dan gaji (pegawai, komponen, penggajian, rincian, pembayaran gaji) | 1, 2 | Tabel relasional (otomatis bila ada) |
| 4 | `sql/04_tabungan.sql` | **Tahap 4**: tabel tabungan (rekening tabungan, mutasi tabungan) | 1, 2 | Tabel relasional (otomatis bila ada) |
| 5 | `sql/05_penjualan.sql` | **Tahap 5**: tabel penjualan, Unit Air, jaminan, tarif dan pajak | 1, 2 | Tabel relasional (otomatis bila ada) |
| 6 | `sql/06_nasabah.sql` | **Portal nasabah**: login HP + PIN, data milik sendiri, kunci bertahap | 1 | Portal Nasabah |
| 7 | `sql/07_pengguna.sql` | **Pengguna dari pegawai** (opsional): fungsi pembuat pengguna dengan PIN awal 1234 | 1 | Pengguna > Buat pengguna dari pegawai |

- Tiap berkas diawali kepala seragam: *Isi, Prasyarat, Dijalankan, Dipakai oleh, Catatan*; semuanya **idempoten** dan tanpa rahasia.
- **Pasang bertahap** (mis. proyek lama yang sudah berjalan): jalankan hanya berkas yang belum dipasang, sesuai nomor. Untuk proyek lama berpola banyak BUMDes, gunakan reset di atas.
- **`sql/00_semua.sql` dibangkitkan otomatis** oleh `node build.js` (dan diperiksa `node build.js --check`). Jangan diedit; ubah berkas bagiannya.

## Menambah pengurus dan peran

- Buat akun di Authentication > Users > Add user, lalu daftarkan di SQL Editor: `select add_member('<id bumdes>', 'email@pengurus', 'pengurus');`
- Peran: `admin`, `pengurus` (simpan dan muat), `pembaca` (hanya muat). Jalankan lagi dengan peran lain untuk mengubahnya.
- Id BUMDes: Table Editor > `bumdes` (kolom `id`), atau `select id, name from public.bumdes;`
- Di model satu BUMDes, tiap akun anggota database ini hanya terhubung ke BUMDes itu. Berpindah BUMDes (v1.1.097) memisahkan data: BUMDes baru mulai kosong, yang sudah berisi dimuat dari awan, data lama dicadangkan lokal; simpan dulu bila ada perubahan belum terkirim. Untuk mengelola dua BUMDes bersamaan, pakai browser atau profil berbeda.
- Akun aplikasi (Setelan > Pengguna & Peran) terpisah dari akun awan.

## Tabel relasional (Tahap 2 dan 3)

- Di Data > Backup (bagian Awan) > Tabel relasional tekan **Isi tabel sekarang**; server memeriksa jurnal seimbang. **Cek kecocokan** membandingkan jumlah baris dan total debit/kredit/pokok dengan perangkat. **Isi tabel otomatis** menjalankannya tiap data tersimpan ke awan.
- Bagian pegawai dan gaji (Tahap 3) dipakai otomatis bila `sql/03_pegawai.sql` sudah dipasang; sebelum itu disembunyikan. PIN pengguna tidak disalin ke tabel.
- Snapshot tetap cadangan utama. Tahap 2: data yang dihapus di perangkat tidak otomatis dihapus dari tabel (terlihat sebagai selisih). Tahap 3: baris yang sudah tidak ada di aplikasi ikut dihapus.
- Bagian tabungan (Tahap 4) dipakai otomatis bila `sql/04_tabungan.sql` sudah dipasang; saldo tabungan di server dibandingkan dengan perangkat (setoran + bunga − penarikan − biaya, hanya mutasi berstatus posted).
- Masih hanya di snapshot: penjualan/Unit Air, jaminan, tarif dan pajak, produk tabungan, pengguna dan peran.

## Pengguna dari pegawai lewat SQL (opsional)

Dari SQL Editor: `select public.buat_pengguna_dari_pegawai('UUID-BUMDES'::uuid);`. Hasilnya sama dengan tombol *Buat pengguna dari pegawai* di aplikasi: peran dari jabatan, PIN awal 1234, wajib ganti saat masuk pertama. Pegawai tanpa peran bawaan jabatan dilewati dan dilaporkan; Superadmin tidak pernah dibuat lewat jalur ini. Perangkat yang punya perubahan belum tersimpan diminta memilih muat/timpa.

## Halaman masuk dan portal nasabah

- **Halaman masuk:** di Data > Backup (bagian Awan) tekan *Masuk ke akun awan*, atau buka alamat aplikasi berakhiran `#masuk`. Isian berisi `@` = akun pengurus/developer (Supabase Auth); berbentuk nomor HP = nasabah. Developer → `#developer`; admin/pengurus/pembaca → aplikasi (pembaca hanya melihat); nasabah → portal. Akun di banyak BUMDes memilih dulu. Perangkat baru memuat data dari awan otomatis; perangkat yang sudah berisi data tidak ditimpa.
- **Lupa kata sandi:** di Supabase > Authentication > URL Configuration, isi Site URL dan Redirect URLs dengan alamat Vercel aplikasi (mis. https://bumdes-app-five.vercel.app/). Tautan email membuka aplikasi dan meminta kata sandi baru.
- **Sesi offline:** sesi disimpan di perangkat (`bumdes_cloud_v1`, `bumdes_nsb_v1`). Selama belum Keluar, aplikasi dan portal terbuka tanpa internet; masuk pertama butuh internet. Ini pintu masuk, bukan enkripsi: data lokal tetap bisa dibaca siapa pun yang memegang perangkat yang tidak dikunci.
- **Pasang portal nasabah:** jalankan `sql/06_nasabah.sql` (sudah ada di `sql/00_semua.sql`). Di aplikasi: Setelan > Portal Nasabah > Aktif; masuk akun awan sebagai admin/pengurus; atur PIN nasabah di Master (PIN dikirim ke server dan disimpan sebagai hash bcrypt). Data nasabah diterbitkan otomatis saat Simpan ke awan, atau tekan *Terbitkan data sekarang*.
- **Keamanan nasabah:** tabel `nsb_accounts`/`nsb_sessions` tanpa kebijakan dan hak tabel; semua lewat fungsi `security definer`. Nasabah hanya mendapat proyeksi miliknya (pinjaman, jadwal, tabungan, profil) tanpa catatan internal. Salah PIN: kunci 15 menit tiap 5 kali, kunci permanen setelah 15 kali sampai pengurus mengatur ulang PIN. Sesi 30 hari, dicabut saat PIN diganti. BUMDes nonaktif menolak masuk. Developer tidak bisa membaca tabel ini. PIN 4–8 angka lemah dibanding kata sandi; OTP dan persetujuan data pribadi masih keputusan pengurus (ROADMAP).

## Perilaku sinkron

- **Simpan ke awan / Muat dari awan.** *Sinkron otomatis* mengirim 8 detik setelah perubahan terakhir dan mengambil data baru dari perangkat lain saat aplikasi dibuka atau kembali online (bila tidak ada perubahan lokal belum terkirim; jika ada, sinkron dijeda dan Anda memilih Timpa/Muat).
- **Kunci versi:** simpan hanya berhasil bila versi di awan sama dengan versi terakhir yang dipegang perangkat. Bila beda (perangkat lain sudah menyimpan), sinkron **dijeda** dan muncul **Timpa awan** (dengan konfirmasi) atau **Muat dari awan**.
- **Sebelum mengubah data di perangkat lain, klik Muat dari awan dulu** agar tidak terjeda konflik.
- **Muat dari awan** mengganti data perangkat; salinan lama disimpan sebagai cadangan lokal (`bumdes_db_v1_prev`).
- **Riwayat cadangan:** menampilkan 30 versi terakhir; *Pulihkan* mengembalikan data perangkat ke versi itu (cadangan lokal disimpan), lalu klik Simpan ke awan agar menjadi versi terbaru. Hanya admin dan pengurus.
- Jika setelah memilih ulang BUMDes versi menunjukkan 0 dan "belum", klik Muat dari awan (atau Timpa awan bila data perangkat ini yang benar).
- Peran **pembaca** hanya boleh memuat.

## Alamat halaman dan Vercel

- Sejak v1.1.098 tiap menu punya alamat (mis. `/laporan`, `/setelan/awan`). Hosting harus mengarahkan alamat itu ke `index.html`: sudah diatur di `vercel.json` (`rewrites`). Di hosting statis lain, tambahkan aturan serupa (semua alamat rute → `index.html`).
- Tautan pemulihan kata sandi memakai alamat dasar aplikasi (mis. `https://bumdes-app-five.vercel.app/`), jadi Redirect URLs di Supabase tidak perlu diubah.

## Keamanan

- Pakai **anon key** saja. **Jangan pernah** memakai `service_role`/`sb_secret_`; aplikasi menolaknya. Anon key dan alamat proyek bukan rahasia; yang melindungi data adalah login dan RLS.
- **Matikan pendaftaran publik:** Authentication > Sign In / Providers, matikan "Allow new users to sign up" (orang asing memang tidak bisa melihat BUMDes Anda karena RLS, tetapi lebih rapi ditutup).
- Aktifkan MFA di akun Supabase Anda dan pakai kata sandi kuat.
- Kata sandi tidak disimpan di perangkat; hanya token sesi, di kunci terpisah `bumdes_cloud_v1` (tidak ikut Export JSON).
- Snapshot berisi seluruh data, termasuk **hash PIN** pengguna dan data pribadi nasabah. Batasi anggota.
- Tabel dilindungi RLS; `anon` tidak punya akses apa pun; snapshot ditulis hanya lewat fungsi `save_snapshot`.

## Uji

- Aplikasi: `tests/logic-72.js` (pembantu awan), `tests/ui-awan.py` dan `ui-awan2.py` (Supabase palsu via Playwright).
- SQL (Postgres 16 lokal): `sh tests/sql-run.sh` memasang berkas terpisah pada basis data baru lalu menjalankan `tests/supabase-test.sql`, `-test2`, `-test3`, `-test4`, `-test5` (117 pemeriksaan). `sh tests/sql-run.sh semua` memasang **hanya** `sql/00_semua.sql` dua kali (uji idempoten) lalu menjalankan uji yang sama. Stub Supabase: `tests/supabase-stub.sql`.
