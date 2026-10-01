# Catatan Rilis — v1.1.017

**Sistem BUMDes Multi-Unit Usaha** · 1 Oktober 2026 · satu file `bumdes.html`, data di `localStorage` browser.

Rilis v1.1.001 menandai pergantian skema versi dari `0.1.NNN` ke `1.1.NNN` (rilis berikutnya: v1.1.002, v1.1.003, …). Fungsi inti sama dengan v0.1.049; yang baru: **aplikasi dapat dipasang dari browser (PWA)**, nomor versi baru, dan catatan rilis ini. v1.1.002 memperbaiki ikon gembok periode; v1.1.003 menambah tombol ? Catatan rilis di Setelan; v1.1.004 melanjutkan UI Simpan Pinjam (Ringkasan, urutan, simulasi); v1.1.005 menambah Linimasa dan Jaminan di rincian pinjaman; v1.1.006 menampilkan pratinjau peringatan di form pengajuan; v1.1.007 menambah Master Tarif & Biaya berversi (belum dipakai transaksi); v1.1.008 menambah alur pengajuan lengkap opsional (verifikasi, analisis, akad); v1.1.009 membuat daftar transaksi ringkas dengan modal rincian dan memindahkan form transaksi ke modal; v1.1.010 menambah tombol Ubah transaksi (batalkan + posting ulang bertaut); v1.1.011 mengganti istilah Void menjadi Batalkan.

## Sorotan

**Simpan Pinjam**
- Pengajuan lewat modal; alur Diajukan → Disetujui → Aktif → Lunas (atau Ditolak/Dibatalkan, wajib beralasan), dengan konfirmasi untuk aksi berisiko.
- Metode jasa flat dan anuitas; jadwal angsuran, denda keterlambatan (masa tenggang, dasar hitung, batas), pembulatan, dan batas pinjaman yang dapat diatur di Setelan.
- Sub-tab **Ringkasan** (tab bawaan): pinjaman aktif, tunggakan, jatuh tempo 7/30 hari, pengajuan menunggu, pembayaran bulan ini. Simulasi angsuran langsung saat mengajukan; daftar pinjaman bisa diurutkan dan dimuat bertahap.
- Daftar ringkas untuk **Pinjaman, Tunggakan, Jaminan, Nasabah**; klik baris membuka modal rincian. Modal pinjaman memuat jadwal pembayaran yang bisa dibuka/ditutup per angsuran dan riwayat pembayaran (kwitansi, pembatalan).
- Pembayaran angsuran dengan **jenis pembayaran**: pokok + bunga, bunga saja, atau nominal bebas; jumlah terisi otomatis dan ada tombol bayar langsung di kartu pembayaran.
- Pelunasan dipercepat, bukti pencairan, kwitansi, pembatalan pencairan/pembayaran, pengelolaan jaminan.

**Unit usaha lain dan akuntansi**
- Unit Air (pelanggan, produk, penjualan tunai/kredit, piutang, langganan dengan tarif bertingkat dan baca meter), Gaji/SDM, transaksi dan jurnal, Buku Besar, Neraca Saldo, Neraca, Laba Rugi, Arus Kas, laporan piutang dan simpan pinjam.
- Modul unit selain Simpan Pinjam dapat dinyalakan/dimatikan; filter unit ada di sidebar.
- Tutup buku/periode, audit log, pengingat backup, Export/Import JSON.

**Keamanan dan akses**
- Opsional: pengguna, peran, dan login PIN dengan izin per aksi (RBAC).

**Tampilan**
- Antarmuka modern, ringkas, dan bersih; Dashboard dengan kartu Piutang Pinjaman dan Tunggakan; mode gelap; target sentuh ≥44px; dapat dipakai di ponsel maupun desktop.

**Pasang di perangkat (PWA)**
- Setelah di-host lewat https (mis. GitHub Pages) atau dibuka di `localhost`, browser menawarkan **Pasang aplikasi**; aplikasi berjalan mandiri dengan ikon sendiri dan tetap bisa dibuka tanpa internet. Pembaruan masuk otomatis saat online.
- Dibuka langsung dari file (`bumdes.html` atau `index.html`), aplikasi tetap jalan, tetapi tidak bisa dipasang.

**Pengembangan**
- Kode dipecah menjadi berkas bernama jelas dalam satu folder (`index.html`, `style.css`, `app.js`, `loans.js`, `reports.js`, dst.); bisa langsung di-host di Vercel/GitHub Pages tanpa build. `node build.js` tetap membuat `bumdes.html` satu-file mandiri.
- Data dummy (`data/bumdes-data-dummy.json`) dan tes (`tests/`) disimpan lokal, tidak diunggah ke Git.
- Tes lokal: logika (Node, 40 berkas) dan UI (Playwright, 390px dan 1280px); tidak ada CI di repo.

## Cara pakai singkat
1. Buka `bumdes.html` di browser (tanpa server).
2. Data awal berisi contoh demo; untuk memindahkan data gunakan Data → Backup & Restore (Export/Import JSON; import **mengganti seluruh data**).
3. Pasang sebagai aplikasi: host folder ini (mis. Vercel atau GitHub Pages), buka alamatnya di Chrome/Edge, lalu klik ikon pasang di bilah alamat atau tombol "Pasang aplikasi" di sidebar. Di iPhone: Bagikan → Tambah ke Layar Utama.
4. Pengembang: ubah berkas sumber → `node build.js` → `npm test`.

## Batasan yang diketahui
- Data hanya tersimpan di browser perangkat (aplikasi terpasang memakai penyimpanan browser asalnya; data tidak berpindah antar perangkat/alamat); lakukan Export JSON berkala sebagai backup.
- Login PIN adalah kontrol prosedur di sisi browser, bukan pengamanan server.
- Belum ada: halaman rincian dengan linimasa, jaminan ditautkan dari rincian pinjaman, kolektibilitas dan restrukturisasi. Lihat `ROADMAP.md`.

## Riwayat singkat
| Versi | Isi |
|---|---|
| 1.1.017 | Tabungan: bunga otomatis, biaya, pajak |
| 1.1.016 | Peran Simpan Pinjam dan pemisahan tugas |
| 1.1.015 | Ringkasan nasabah yang dapat dibagikan |
| 1.1.014 | Tabungan nasabah |
| 1.1.013 | Peran Superadmin |
| 1.1.012 | Master ringkas dengan modal rincian |
| 1.1.011 | Istilah Void diganti Batalkan |
| 1.1.010 | Ubah transaksi dari modal rincian |
| 1.1.009 | Transaksi ringkas dengan modal rincian dan form modal |
| 1.1.008 | Alur pengajuan lengkap opsional: verifikasi, analisis, wewenang, akad |
| 1.1.007 | Master Tarif & Biaya berversi, mesin hitung fee/pajak |
| 1.1.006 | Pratinjau peringatan pengajuan, uji alur lengkap |
| 1.1.005 | Rincian pinjaman: linimasa, jaminan tertaut, tagihan berikutnya |
| 1.1.004 | Ringkasan Simpan Pinjam, urutan daftar, simulasi angsuran, ajukan dari nasabah |
| 1.1.003 | Tombol ? Catatan rilis di Setelan |
| 1.1.002 | Perbaikan ikon gembok periode (terbuka/tertutup) |
| 1.1.001 | PWA, skema versi baru, catatan rilis, kode dipecah bernama jelas |
| 0.1.049 | Kode dipecah menjadi berkas sumber + `build.js` |
| 0.1.048 | Tombol bayar langsung di kartu pembayaran |
| 0.1.047 | Jenis pembayaran angsuran + jumlah otomatis |
| 0.1.046 | Tunggakan, Jaminan, Nasabah: daftar ringkas + modal; data dummy |
| 0.1.045 | Daftar pinjaman ringkas + modal rincian dengan jadwal lipat |
| 0.1.044 | Penyegaran tampilan modern, ringkas, bersih |
| 0.1.043 | Form pengajuan pinjaman dalam modal |
| 0.1.042 | Optimalisasi Dashboard |
| 0.1.041 | SP-M: mesin hitung jasa dan denda, pengaturan perhitungan |
| 0.1.040 | SP0: batas dan validasi pengajuan, konfirmasi aksi |

Riwayat lengkap: `CHANGELOG.md`.
