# Sistem BUMDes Multi-Unit Usaha

Aplikasi manajemen BUMDes untuk banyak unit usaha (Simpan Pinjam, Sumber Air, Perdagangan, dll.) dengan satu mesin akuntansi bersama. Bukan aplikasi koperasi: Simpan Pinjam hanyalah salah satu unit. Saat ini fokus ke Simpan Pinjam; Unit Air dan Gaji bawaan nonaktif dan dapat dinyalakan di *Setelan > Modul*.

> **Status:** MVP Tahap 1 — **v1.1.075** · satu file `bumdes.html` (HTML + CSS + JS), data di `localStorage` (key `bumdes_db_v1`)
> **Desain:** `BUMDes_Multi_Unit_Usaha_Blueprint_v2_LocalStorage.md`

## Menjalankan

1. Buka `bumdes.html` di browser (tanpa install/server). Data demo dibuat otomatis saat pertama dibuka.
2. Data hanya ada di satu browser/perangkat. **Export JSON berkala** (tab *Data*); aplikasi mengingatkan setelah 7 hari.

## Fitur (v1.1.075)

> **Awan (v1.1.075):** koneksi Supabase dapat ditanam di `config.js` (`SB_URL`, `SB_KEY` anon); lupa/ganti kata sandi, status sinkron, dan sinkron otomatis dua arah.

| Area | Isi |
|------|-----|
| Master data | Unit usaha, Chart of Accounts (parent-child), rekening Kas/Bank, **Pihak** (nasabah, pelanggan, pemasok, lainnya) dan **Pegawai** (nomor PEG-NNN, jabatan, unit, tanggal mulai, gaji pokok/tunjangan/potongan tetap, komponen tetap); tambah, edit, nonaktifkan (dengan perlindungan akun sistem/bersaldo/berpiutang/berpinjaman/ber-pegawai) |
| Transaksi | Penerimaan, Pengeluaran, Transfer, Jurnal Manual, Jurnal Multi-baris, **Saldo Awal terpandu** (v1.1.025: ringkasan, checklist, pratinjau jurnal/jadwal langsung, form lipat, validasi tanggal/jasa/tenor) (piutang pelanggan dan pinjaman berjalan yang terhubung ke Unit Air / Simpan Pinjam); cari/filter (kata kunci, jenis, tanggal), 30 baris + muat lebih banyak |
| Akuntansi | Jurnal otomatis, Debit = Kredit, pembatalan (void) dengan jurnal pembalik, periode bulanan (tutup/buka), **Tutup Buku Tahunan** (jurnal penutup per unit ke 3300 Laba Ditahan, kunci 12 periode, bisa dibatalkan) |
| Simpan Pinjam | **v1.1.037: produk tabungan dan deposito (bunga per produk, jangka, jatuh tempo).** **v1.1.036: fee pencairan bisa diamortisasi sepanjang tenor (akun 2240).** **v1.1.035: batas sisa pokok untuk aturan dua orang restrukturisasi.** **v1.1.034: Ajukan pinjaman dari calon mengisi pokok otomatis dan menautkan pengajuan ke calon.** **v1.1.032: pengajuan bisa disimpan sebagai draf (kirim/ubah/hapus).** **v1.1.031: sub-tab Calon (calon → nasabah → pengajuan).** **v1.1.030: aturan dua orang untuk restrukturisasi (usul → setujui/tolak).** **v1.1.029: pajak atas biaya administrasi tabungan (akun 2230).** **v1.1.028: laporan Waktu proses per tahap (rata-rata dan terlama).** **v1.1.027: Audit Log punya kolom Peristiwa baku (DOMAIN.PERISTIWA), ikut di CSV dan pencarian.** **v1.1.026: laporan Biaya per kode (pencairan, pelunasan, restrukturisasi).** Sub-tab Pinjaman/Tunggakan/Jaminan/Nasabah; pengajuan **lewat modal (v0.1.043)** (dapat diubah/dibatalkan, ditolak dengan alasan) → persetujuan (konfirmasi) → pencairan; **v0.1.041: metode anuitas, basis hari, pembulatan, masa tenggang, tanggal tagih tetap, denda dengan tenggang/batas/dasar (Setelan > Profil), fungsi simulasi, snapshot per pengajuan. v0.1.040: transisi status dijaga satu tabel, urutan tanggal dan batas masukan divalidasi (batas di Setelan), peringatan duplikat dan eksposur nasabah, pinjaman hanya untuk unit berjenis Simpan Pinjam, impor memeriksa konsistensi pinjaman**; jadwal flat/menurun; bayar penuh/sebagian; pelunasan dipercepat; denda; aging tunggakan; jaminan; pembatalan terkontrol; kwitansi & bukti pencairan cetak  **v1.1.020:** pelunasan dipercepat dapat berbiaya + pajak dari Tarif & Pajak (rincian di kartu dan kwitansi); biaya restrukturisasi ikut pajak (akun 2220); batal restrukturisasi terakhir; aturan hapus buku dua orang (Setelan > Pemisahan Tugas).  **v1.1.021:** audit menyimpan nilai sebelum/sesudah dan dapat diunduh CSV; Jejak audit per pinjaman; Laporan Simpan Pinjam memuat pipeline, kolektibilitas, pendapatan per jenis, pajak terutang, dan kepatuhan pemisahan tugas.  **v1.1.022:** biaya dan pajak dari Tarif & Pajak dapat dipotong saat pencairan (dana bersih = pokok − biaya − pajak, satu jurnal, rincian di bukti pencairan).  **v1.1.023:** bunga tabungan bertingkat menurut saldo (Setelan) dan cetak buku tabungan per rekening.  **v1.1.024:** akad cetak (Cetak akad di modal pinjaman) dengan snapshot biaya, pajak, dan denda saat akad dicatat; klausul tambahan diatur di Setelan. |
| Unit Air | **Air langganan (PAMSIMAS):** sambungan & meter (putus/sambung, ganti meter), tarif (bawaan Rp 10.000/m³ sama untuk semua + beban tetap Rp 15.000; bisa bertingkat) + minimum, **baca meter → tagihan bulanan** (Dr 1400 / Cr 4200), nota tagihan cetak, piutang dan pembayaran (penuh/sebagian), penanda tunggakan/layak diputus; **Penjualan Lain** tunai/kredit, pelanggan dan produk; jurnal otomatis; pembatalan terkontrol; **nota penjualan cetak** untuk penjualan biasa (tunai/kredit, multi-barang) |
| Payroll | Menu **Gaji** (sub-tab Proses Gaji dan Komponen): komponen gaji fleksibel (lembur, insentif, tunjangan, kasbon; tetap per pegawai atau sekali pakai pada gaji draf), gaji dibuat per periode dari profil gaji pegawai, **slip gaji cetak**, **laporan gaji/SDM** (per periode, unit, pegawai, komponen; cetak dan CSV), alur Draf → Disetujui → Dibayar; pembayaran menjurnal Dr Beban Gaji (per unit pegawai) / Cr Kas-Bank / Cr Kewajiban Lain (potongan); batal bayar dengan jurnal pembalik |
| Laporan | Menu **Laporan** (sub-tab Neraca, Laba Rugi, Arus Kas, Piutang, Simpan Pinjam, Unit Air): Neraca per tanggal, Laba Rugi per akun atau per unit dengan rentang tanggal, Arus Kas metode langsung (operasi/investasi/pendanaan) yang dicocokkan ke saldo Kas & Bank, **Piutang** (pinjaman + pelanggan per unit, aging, piutang terbesar, kecocokan dengan buku besar) **Simpan Pinjam** (posisi, pencairan, pembayaran, jasa dan denda, daftar pinjaman aktif), dan **Unit Air** (penjualan tunai/kredit, per produk, pelanggan, bulan, pembayaran piutang, cocok dengan jurnal); cetak dan CSV. Juga Dashboard, Buku Besar (saldo berjalan, filter), Neraca Saldo, Laporan Gaji; semua bisa difilter per unit |
| Pengguna & peran (opsional, bawaan mati) | *Setelan > Pengguna & Peran*: login PIN (hash bergaram, kunci akun 5 menit setelah 5 kali salah), lima peran awal dengan matriks izin, reset PIN oleh Admin, pemulihan dari backup, sesi per tab, audit log mencatat *Oleh*. **Kontrol prosedur, bukan keamanan sungguhan** selama data di browser; izin ditegakkan di fungsi aksi, menu menyesuaikan peran, pembatasan per Unit tugas, matriks izin dapat diubah Admin (tercatat di audit) |
| Keamanan data | Toast, dialog konfirmasi aksi berisiko (Void, batal cair/bayar, tutup/buka periode, Import, Reset), banner gagal simpan, pengingat backup, draf form bertahan saat render ulang, audit log |
| Antarmuka | **PWA: bisa dipasang dari browser dan jalan offline (v1.1.001)**, **Pembayaran angsuran: pokok + bunga / bunga saja / nominal, jumlah otomatis (v0.1.047)**, **Tunggakan/Jaminan/Nasabah: daftar ringkas + modal (v0.1.046)**, **Daftar pinjaman ringkas + modal rincian dengan jadwal expand/collapse (v0.1.045)**, **Tampilan modern ringkas (v0.1.044): kartu/tabel/sidebar/input disegarkan, mode gelap ikut**, **Dashboard v0.1.042: kartu Piutang Pinjaman dan Tunggakan dapat diklik, tata letak ringkasan rapi di mobile dan desktop**, **Filter unit di sidebar (desktop; header di mobile)**, **Dashboard berperingatan** (tunggakan, piutang air, periode terbuka, gaji belum dibayar), jalan pintas, tren 6 bulan, lencana menu, chip backup, sub-tab diingat (v0.1.036). **Modal tidak lagi tertutup keyboard layar di ponsel** (v0.1.035). **Tanggal tampil dd/mm/yyyy** dan angka negatif ditolak di semua form rupiah (v0.1.034). **Form Transaksi terpandu** (v0.1.033): tiga kelompok isian, akun lawan wajib dipilih, ringkasan jurnal Debit/Kredit sebelum Posting, bilah Posting menempel di mobile; **angka**: kursor terjaga, tempel `Rp 1.500.000` dibersihkan, tanda negatif ditolak, kosong ≠ nol; **draf** dipulihkan dengan penanda dan tombol Bersihkan. **Tambah/edit data (CRUD) lewat modal** (v0.1.032): Unit, Rekening, Akun, Pihak, Pegawai, Nasabah, Pelanggan, Produk, Sambungan, Komponen gaji, Pengguna, Reset PIN — tombol *Tambah* di atas tiap daftar, modal menjebak fokus, Escape/Batal menutup, galat tampil di kolom dan isian terjaga. Mobile: navbar bawah (Dashboard, Transaksi, Pinjaman, Unit Air, Lainnya) + kartu untuk Jadwal/Riwayat. Desktop: sidebar ikon yang bisa diciutkan. Input Rupiah berpemisah ribuan, validasi di bawah kolom |
| Modul (v0.1.039) | *Setelan > Modul*: **Unit Air** dan **Gaji** bawaan **nonaktif** agar tampilan fokus ke Simpan Pinjam; dinyalakan lewat saklar. Menonaktifkan hanya menyembunyikan menu, navbar, kartu Dashboard, sub-tab Laporan Unit Air, dan Saldo Awal piutang pelanggan; data, jurnal, dan saldo tetap utuh. Data lama yang sudah berisi data Unit Air/Gaji tetap menyala saat dimuat (tidak hilang diam-diam). Dicatat di audit log |
| Setelan | Profil BUMDes dan pengaturan denda/jasa pelunasan: nama, alamat, kontak, direktur, bendahara, no. SK; tampil di menu, judul, dan kop dokumen cetak; **tempat penandatanganan** dicetak bersama tanggal dokumen di atas tanda tangan |
| Data | Export/Import JSON (divalidasi), Reset data demo, Periode + Tutup Buku Tahunan, **Audit Log** lengkap (filter aksi, entitas, tanggal, kata kunci; muat lebih banyak) |

Aksesibilitas (v0.1.030): tautan *Lewati ke konten*, fokus keyboard terlihat, label semua kolom terhubung, target sentuh 44px di mobile, dialog konfirmasi menjebak fokus dan menutup dengan Escape, kontras warna memenuhi WCAG AA di tema terang dan gelap.

**Fokus pengembangan: Simpan Pinjam** (integritas logika, mesin hitung, UI), lihat `ROADMAP.md`. Belum ada: Pengiriman Unit Air, penjagaan izin per aksi dan alur persetujuan (v0.1.029–030), ekspor PDF/XLSX. Rencana lengkap ada di `ROADMAP.md`.

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
| `CHANGELOG.md` | Riwayat rilis |
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
| `supabase_schema.sql` | SQL Tahap 1 (tabel, RLS, fungsi); jalankan di Supabase SQL Editor |
| `supabase_tahap2.sql` | Draf Tahap 2: tabel ternormalisasi + migrasi (belum dipakai aplikasi) |
| `SUPABASE.md` | Panduan pasang, keamanan, tahap |
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
| `release_notes.md`, `CHANGELOG.md`, `README.md`, `SUMMARY.md`, `ROADMAP.md` | Dokumentasi |
| `tests/`, `data/` | Tes dan data dummy — **hanya lokal, tidak diunggah ke Git** (`.gitignore`) |

**Deploy Git → Vercel:** unggah seluruh isi paket Git (semua berkas datar di root repo, tanpa `tests/` dan `data/`) ke GitHub; hubungkan repo ke Vercel (Framework Preset: *Other*). `vercel.json` sudah mengatur tanpa build dan folder keluaran `.`, jadi tidak perlu mengisi apa pun. Pada tiap commit Vercel men-deploy ulang.

**Hosting statis lain (unggah manual):** unggah `index.html`, `style.css`, semua `*.js` kecuali `build.js`, `manifest.json`, ikon, dan `vercel.json`. `bumdes.html`, `build.js`, `package.json`, dan dokumen tidak diperlukan agar aplikasi berjalan.

**Pasang sebagai aplikasi (PWA):** setelah di-host lewat https, pilih *Pasang aplikasi* di browser. Dari `file://` aplikasi tetap jalan tetapi tidak bisa dipasang.

**Alur pengembangan:** edit berkas sumber → `node build.js` (menyegarkan `bumdes.html`) → `npm test` (cek sinkron + versi + daftar cache) atau `npm run test:lokal` (semua tes; butuh `tests/` lokal). Saat menambah/ganti nama berkas skrip: ubah daftar `<script src>` di `index.html` dan `ASSETS` di `sw.js`.
