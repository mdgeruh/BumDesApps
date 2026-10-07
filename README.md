# Sistem BUMDes Multi-Unit Usaha

Aplikasi manajemen BUMDes untuk banyak unit usaha (Simpan Pinjam, Sumber Air, Perdagangan, dll.) dengan satu mesin akuntansi bersama. Bukan aplikasi koperasi: Simpan Pinjam hanyalah salah satu unit. Saat ini fokus ke Simpan Pinjam; Unit Air dan Gaji bawaan nonaktif dan dapat dinyalakan di *Setelan > Modul*.

> **Status:** MVP Tahap 1 — **v1.1.108** · satu file `bumdes.html` (HTML + CSS + JS), data di `localStorage` (key `bumdes_db_v1`)
> **Desain:** `BUMDes_Multi_Unit_Usaha_Blueprint_v2_LocalStorage.md`

## Menjalankan

1. Buka `bumdes.html` di browser (tanpa install/server). Data demo dibuat otomatis saat pertama dibuka.
2. Data hanya ada di satu browser/perangkat. **Export JSON berkala** (tab *Data*); aplikasi mengingatkan setelah 7 hari.

## Fitur (v1.1.108)
- **SQL bertahap (v1.1.108):** semua berkas SQL pindah ke folder `sql/` dengan nama berurut: `00_semua`, `01_inti`, `02_akuntansi`, `03_pegawai`, `04_tabungan`, `05_penjualan`, `06_nasabah`, `07_pengguna`, dan `99_reset`.
- **Satu aplikasi, satu database (v1.1.107):** model diubah menjadi 1 hosting = 1 proyek Supabase = 1 BUMDes. Peran developer, daftar BUMDes dan pemilih BUMDes dihapus (`supabase_developer.sql` dibuang). Pendaftar pertama lewat layar "Siapkan BUMDes" otomatis menjadi admin lalu penyiapan terkunci; `sql/99_reset.sql` mengosongkan database untuk mulai dari awal.
- **Cek peran akun (v1.1.106):** Setelan > Awan punya tombol "Cek peran akun" yang menyebut apakah akun developer platform, akun BUMDes biasa, atau pengecekan gagal. Galat pengecekan developer (mis. `supabase_developer.sql` belum terpasang) kini ditampilkan, tidak lagi diam-diam menganggap akun sebagai admin biasa.
- **Setelan > Awan beda untuk developer dan admin (v1.1.105):** akun developer melihat kartu Konsol Developer (buka halaman Developer, jumlah BUMDes klien, peran "Developer (platform)") tanpa Sinkron, Riwayat cadangan, Tabel relasional, dan pemilih BUMDes; akun admin/pengurus/pembaca melihat sinkron dan tabel BUMDes-nya tanpa konsol developer.
- **Setelan > Awan di desktop (v1.1.104):** dua kolom berdampingan (kiri: Sinkron, Riwayat cadangan, Tabel relasional; kanan: Koneksi, BUMDes di awan, Ganti kata sandi, Developer, Tentang awan), kartu Sinkron selebar kolom, label "Tabel relasional" tidak lagi menyebut Tahap 2 dan ada lencana status. Di HP tetap satu kolom.
- **Tabel relasional Tahap 5 (v1.1.103):** penjualan, rincian, pembayaran, produk, sambungan dan catatan meter Unit Air, jaminan, tarif dan pajak berversi, catatan penagihan, dan calon peminjam kini ikut disalin ke tabel Supabase (`sql/05_penjualan.sql`, berkas [5/7]) dengan pengecekan jumlah baris serta total penjualan, pembayaran, dan nilai jaminan. Berkas SQL kini 8.
- **Konsol Developer: Masuk ke BUMDes (v1.1.102):** tiap BUMDes aktif punya tombol "Masuk ke BUMDes"; developer keluar dari konsol dan layar login menampilkan nama BUMDes itu. Setelah masuk dengan akun admin/pengurus BUMDes tersebut, aplikasi langsung membuka BUMDes itu (tanpa pemilih). Akun bukan anggota ditolak. Developer tetap tidak bisa membaca data klien.

> **Masuk (v1.1.079):** satu halaman masuk untuk semua peran (email = pengurus/developer, nomor HP = nasabah) dengan arah otomatis menurut peran, sesi tersimpan sehingga bisa dipakai offline, dan portal nasabah di HP sendiri lewat Supabase (`sql/06_nasabah.sql`).
>
> **Awan (v1.1.078):** koneksi Supabase dapat ditanam di `config.js` (`SB_URL`, `SB_KEY` anon); lupa/ganti kata sandi, status sinkron, dan sinkron otomatis dua arah.

| Area | Isi |
|------|-----|
| Master data | Unit usaha, Chart of Accounts (parent-child), rekening Kas/Bank, **Pihak** (nasabah, pelanggan, pemasok, lainnya) dan **Pegawai** (nomor PEG-NNN, jabatan dari master jabatan dengan gaji/komponen bawaan, ceklist komponen gaji nominal/% gaji/% laba, unit, tanggal mulai, gaji pokok/tunjangan/potongan tetap, komponen tetap); tambah, edit, nonaktifkan (dengan perlindungan akun sistem/bersaldo/berpiutang/berpinjaman/ber-pegawai) |
| Transaksi | Penerimaan, Pengeluaran, Transfer, Jurnal Manual, Jurnal Multi-baris, **Saldo Awal terpandu** (v1.1.025: ringkasan, checklist, pratinjau jurnal/jadwal langsung, form lipat, validasi tanggal/jasa/tenor) (piutang pelanggan dan pinjaman berjalan yang terhubung ke Unit Air / Simpan Pinjam); cari/filter (kata kunci, jenis, tanggal), 30 baris + muat lebih banyak |
| Akuntansi | Jurnal otomatis, Debit = Kredit, pembatalan (void) dengan jurnal pembalik, periode bulanan (tutup/buka), **Tutup Buku Tahunan** (jurnal penutup per unit ke 3300 Laba Ditahan, kunci 12 periode, bisa dibatalkan) |
| Simpan Pinjam | Calon → nasabah → pengajuan (draf, kirim, ubah, tolak beralasan) → persetujuan → pencairan; jadwal flat/menurun/anuitas, basis hari, pembulatan, masa tenggang, tanggal tagih tetap; bayar penuh/sebagian, pelunasan dipercepat (berbiaya + pajak), denda (tenggang/batas/dasar), aging dan kolektibilitas, restrukturisasi dan hapus buku (aturan dua orang), jaminan, pembatalan terkontrol; jasa, biaya, dan pajak dari Master Tarif & Biaya (berversi, bertingkat), dipotong saat pencairan, fee dapat diamortisasi; tabungan dan deposito (bunga per produk/bertingkat, tabungan wajib, pajak administrasi); akad, kwitansi, bukti pencairan, dan buku tabungan cetak; Audit Log baku + jejak per pinjaman; laporan pipeline, kolektibilitas, PAR 30/60/90, pendapatan per jenis, biaya per kode, pajak terutang, waktu proses, kepatuhan pemisahan tugas. Rincian per versi: `CHANGELOG.md`. |
| Unit Air | **Air langganan (PAMSIMAS):** sambungan & meter (putus/sambung, ganti meter), tarif (bawaan Rp 10.000/m³ sama untuk semua + beban tetap Rp 15.000; bisa bertingkat) + minimum, **baca meter → tagihan bulanan** (Dr 1400 / Cr 4200), nota tagihan cetak, piutang dan pembayaran (penuh/sebagian), penanda tunggakan/layak diputus; **Penjualan Lain** tunai/kredit, pelanggan dan produk; jurnal otomatis; pembatalan terkontrol; **nota penjualan cetak** untuk penjualan biasa (tunai/kredit, multi-barang) |
| Payroll | Menu **Gaji** (sub-tab Proses Gaji dan Komponen): komponen gaji fleksibel (lembur, insentif, tunjangan, kasbon; tetap per pegawai atau sekali pakai pada gaji draf), gaji dibuat per periode dari profil gaji pegawai, **slip gaji cetak**, **laporan gaji/SDM** (per periode, unit, pegawai, komponen; cetak dan CSV), alur Draf → Disetujui → Dibayar; pembayaran menjurnal Dr Beban Gaji (per unit pegawai) / Cr Kas-Bank / Cr Kewajiban Lain (potongan); batal bayar dengan jurnal pembalik |
| Laporan | Menu **Laporan** (sub-tab Neraca, Laba Rugi, Arus Kas, Piutang, Simpan Pinjam, Unit Air): Neraca per tanggal, Laba Rugi per akun atau per unit dengan rentang tanggal, Arus Kas metode langsung (operasi/investasi/pendanaan) yang dicocokkan ke saldo Kas & Bank, **Piutang** (pinjaman + pelanggan per unit, aging, piutang terbesar, kecocokan dengan buku besar) **Simpan Pinjam** (posisi, pencairan, pembayaran, jasa dan denda, daftar pinjaman aktif), dan **Unit Air** (penjualan tunai/kredit, per produk, pelanggan, bulan, pembayaran piutang, cocok dengan jurnal); cetak dan CSV. Juga Dashboard, Buku Besar (saldo berjalan, filter), Neraca Saldo, Laporan Gaji; semua bisa difilter per unit |
| Pengguna & peran (opsional, bawaan mati) | *Setelan > Pengguna & Peran*: login PIN (hash bergaram, kunci akun 5 menit setelah 5 kali salah), lima peran awal dengan matriks izin, reset PIN oleh Admin, pemulihan dari backup, sesi per tab, audit log mencatat *Oleh*. **Kontrol prosedur, bukan keamanan sungguhan** selama data di browser; izin ditegakkan di fungsi aksi, menu menyesuaikan peran, pembatasan per Unit tugas, matriks izin dapat diubah Admin (tercatat di audit) |
| Keamanan data | Toast, dialog konfirmasi aksi berisiko (Void, batal cair/bayar, tutup/buka periode, Import, Reset), banner gagal simpan, pengingat backup, draf form bertahan saat render ulang, audit log |
| Antarmuka | PWA (dipasang dari browser, jalan offline); mobile: navbar bawah dan lembar bawah untuk modal; desktop: sidebar ikon yang bisa diciutkan dan filter unit; Dashboard berperingatan (tunggakan, piutang air, periode terbuka, gaji belum dibayar), jalan pintas, tren 6 bulan, kartu dapat diklik; semua tambah/edit data lewat modal (jebakan fokus, Escape, galat di kolom, isian terjaga); Form Transaksi terpandu (akun lawan wajib, ringkasan jurnal sebelum Posting, draf dipulihkan); input Rupiah berpemisah ribuan, negatif ditolak, tanggal dd/mm/yyyy; aksesibilitas (tautan lompat, fokus terlihat, label terhubung, target 44px, kontras AA, mode gelap, `prefers-reduced-motion`); halaman masuk gabungan dan halaman developer |
| Modul (v0.1.039) | *Setelan > Modul*: **Unit Air** dan **Gaji** bawaan **nonaktif** agar tampilan fokus ke Simpan Pinjam; dinyalakan lewat saklar. Menonaktifkan hanya menyembunyikan menu, navbar, kartu Dashboard, sub-tab Laporan Unit Air, dan Saldo Awal piutang pelanggan; data, jurnal, dan saldo tetap utuh. Data lama yang sudah berisi data Unit Air/Gaji tetap menyala saat dimuat (tidak hilang diam-diam). Dicatat di audit log |
| Setelan | Profil BUMDes dan pengaturan denda/jasa pelunasan: nama, alamat, kontak, direktur, bendahara, no. SK; tampil di menu, judul, dan kop dokumen cetak; **tempat penandatanganan** dicetak bersama tanggal dokumen di atas tanda tangan |
| Data | Export/Import JSON (divalidasi), Reset data demo, Periode + Tutup Buku Tahunan, **Audit Log** lengkap (filter aksi, entitas, tanggal, kata kunci; muat lebih banyak) |

Aksesibilitas (v0.1.030): tautan *Lewati ke konten*, fokus keyboard terlihat, label semua kolom terhubung, target sentuh 44px di mobile, dialog konfirmasi menjebak fokus dan menutup dengan Escape, kontras warna memenuhi WCAG AA di tema terang dan gelap.

**Fokus pengembangan: Simpan Pinjam** (integritas logika, mesin hitung, UI), lihat `ROADMAP.md`. Belum ada: Pengiriman Unit Air dan ekspor PDF/XLSX. Rencana lengkap ada di `ROADMAP.md`.

## Prinsip

- Debit = Kredit; jurnal tidak balance ditolak.
- Transaksi `posted` tidak dihapus: void/reversal/adjustment.
- Semua transaksi bermuara ke satu buku besar; laporan membaca dari jurnal.
- Unit usaha adalah **dimensi** transaksi (tidak di-hardcode).

## Arsitektur

`UI → Application State → Business Logic → Accounting Engine → JSON State → localStorage`

Bagian kode: `CONFIG → STORAGE & ID → ACCOUNTING ENGINE → REPORTING → UI HELPERS → VIEWS → UI CONTROLLER`. Koleksi JSON mengikuti nama collection MongoDB (target), termasuk yang modulnya belum ada (kosong), sehingga migrasi hanya mengganti data access layer. Daftar koleksi: Blueprint §2.3.

## Batasan localStorage

Cocok untuk prototype, simulasi, validasi engine, dan demo satu perangkat. Belum cocok untuk multi-user, multi-perangkat, keamanan production, data besar, audit server-side, dan backup otomatis.

> Ini blueprint/prototype teknis, bukan penetapan kebijakan akuntansi atau hukum BUMDes. Keputusan yang harus final sebelum pembukuan riil ada di `ROADMAP.md` (Gerbang Keputusan).

## Dokumen

| File | Isi |
|------|-----|
| `SUMMARY.md` | Ringkasan blueprint, aturan sistem, dan status implementasi |
| `ROADMAP.md` | Fase, todolist, gerbang keputusan, Definition of Done |
| `CHANGELOG.md` | Riwayat rilis terbaru (v1.1.041 ke atas) |
| `CHANGELOG_ARSIP.md` | Riwayat rilis lama (v1.1.040 ke bawah dan seri 0.1.NNN) |
| `tests/` | Uji logika (Node) dan UI (Playwright); lihat `tests/README.md` (hanya lokal, tidak diunggah ke Git) |


## Data dummy
`data/bumdes-data-dummy.json` — backup contoh siap impor; lihat `data/README.md` (hanya lokal, tidak diunggah ke Git).

## Struktur berkas dan alur kerja
Satu folder datar (tanpa subfolder sumber). Halaman utama `index.html` memuat gaya dan skrip secara langsung, jadi **bisa di-host apa adanya** di hosting statis (Vercel, GitHub Pages, Netlify) tanpa langkah build.

| Berkas | Isi |
|---|---|
| `index.html` | Halaman aplikasi; memuat `style.css` dan skrip di bawah (urutan penting) |
| `style.css` | Seluruh gaya |
| `config.js` | Konfigurasi, konstanta, versi (`APP_VER`) |
| `accounting.js` | Penyimpanan, ID, mesin akuntansi, pelaporan dasar |
| `layout.js` | Ikon, sidebar, navigasi bawah, peringatan, tren |
| `views.js` | Tampilan utama: dashboard, laporan, transaksi, master, setelan |
| `modules.js` | Pengaturan modul unit usaha |
| `loans.js` | Simpan Pinjam: nasabah, pinjaman, jadwal, pembayaran, jaminan |
| `water.js` | Unit Air: pelanggan, penjualan, langganan, meter |
| `ui.js` | Toast, konfirmasi, draf form, komponen form dan aksesibilitas |
| `payroll.js` | Pihak/pegawai sebagai master, penggajian, laporan gaji |
| `reports.js` | Laporan keuangan, piutang, saldo awal terpandu, laporan air |
| `uikit.js` | Kontrol form kustom (v1.1.033): dropdown, kalender, bulan, berkas |
| `cloud.js` | Sinkron awan Supabase Tahap 1 (v1.1.042): koneksi, masuk, simpan/muat dengan kunci versi |
| `sql/00_semua.sql` | **Pasang semua sekaligus** untuk proyek baru: gabungan otomatis 7 berkas di bawah (dibangkitkan `node build.js`, jangan diedit) |
| `sql/99_reset.sql` | Kosongkan database (hapus semua tabel dan fungsi) untuk mulai dari awal |
| `sql/01_inti.sql` | [1/7] Tahap 1: snapshot, riwayat, kunci versi, peran, RLS |
| `sql/02_akuntansi.sql` | [2/7] Tahap 2: tabel akuntansi dan Simpan Pinjam + migrasi |
| `sql/03_pegawai.sql` | [3/7] Tahap 3: tabel pegawai dan gaji |
| `sql/04_tabungan.sql` | [4/7] Tahap 4: tabel tabungan (rekening dan mutasi) |
| `sql/05_penjualan.sql` | [5/7] Tahap 5: tabel penjualan, Unit Air, jaminan, tarif dan pajak |
| `sql/06_nasabah.sql` | [6/7] Portal nasabah (HP + PIN) |
| `sql/07_pengguna.sql` | [7/7] Pengguna dari pegawai (opsional) |
| `SUPABASE.md` | Panduan pasang cepat, urutan berkas SQL, peran, keamanan, uji |
| `portal.js` | Portal nasabah mode demo (v1.1.038): masuk HP + PIN, pinjaman, tabungan, profil |
| `calon.js` | Calon peminjam (v1.1.031): sub-tab Calon, status, jadikan nasabah |
| `closing.js` | Tutup buku/periode, audit log, backup |
| `users.js` | Pengguna, peran, login PIN |
| `releases.js` | Data catatan rilis untuk tombol ? di Setelan (rilis baru ditambah di paling atas) |
| `modals.js` | Dialog modal tambah/ubah data |
| `flow.js` | Alur pengajuan lengkap opsional (SP2): verifikasi, analisis, wewenang persetujuan, akad |
| `rates.js` | Mesin Tarif & Biaya: `rate_master`/`tax_master` berversi, `calcFees()` murni, tampilan Master > Tarif & Biaya |
| `keyboard.js` | Keyboard layar dan pintasan |
| `permissions.js` | Penjagaan izin per aksi (dimuat setelah semua fungsi) |
| `pwa.js` | Pendaftaran service worker, tombol pasang aplikasi |
| `app.js` | Memulai aplikasi (dimuat paling akhir) |
| `manifest.json`, `sw.js`, `icon-*.png`, `icon.svg` | PWA: pasang dari browser, jalan offline |
| `vercel.json` | Pengaturan Vercel (tanpa build; sw.js tidak di-cache) |
| `bumdes.html` | Versi **satu-file mandiri** hasil `node build.js` (untuk dibuka langsung dari file/tes; jangan diedit) |
| `build.js`, `package.json` | Perakit `bumdes.html` dan skrip dev (tidak perlu diunggah ke hosting) |
| `release_notes.md`, `CHANGELOG.md`, `CHANGELOG_ARSIP.md`, `README.md`, `SUMMARY.md`, `ROADMAP.md` | Dokumentasi |
| `tests/`, `data/` | Tes dan data dummy — **hanya lokal, tidak diunggah ke Git** (`.gitignore`) |

**Deploy Git → Vercel:** unggah seluruh isi paket Git (semua berkas datar di root repo, tanpa `tests/` dan `data/`) ke GitHub; hubungkan repo ke Vercel (Framework Preset: *Other*). `vercel.json` sudah mengatur tanpa build dan folder keluaran `.`, jadi tidak perlu mengisi apa pun. Pada tiap commit Vercel men-deploy ulang.

**Hosting statis lain (unggah manual):** unggah `index.html`, `style.css`, semua `*.js` kecuali `build.js`, `manifest.json`, ikon, dan `vercel.json`. `bumdes.html`, `build.js`, `package.json`, dan dokumen tidak diperlukan agar aplikasi berjalan.

**Pasang sebagai aplikasi (PWA):** setelah di-host lewat https, pilih *Pasang aplikasi* di browser. Dari `file://` aplikasi tetap jalan tetapi tidak bisa dipasang.

**Alur pengembangan:** edit berkas sumber → `node build.js` (menyegarkan `bumdes.html`) → `npm test` (cek sinkron + versi + daftar cache) atau `npm run test:lokal` (semua tes; butuh `tests/` lokal). Saat menambah/ganti nama berkas skrip: ubah daftar `<script src>` di `index.html` dan `ASSETS` di `sw.js`.
