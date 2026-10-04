# Catatan Rilis — v1.1.093

**Sistem BUMDes Multi-Unit Usaha** · 4 Oktober 2026 · satu file `bumdes.html`, data di `localStorage` browser.

Skema versi `1.1.NNN` dimulai di v1.1.001 (sebelumnya `0.1.NNN`) bersamaan dengan aplikasi yang dapat dipasang dari browser (PWA). Rincian tiap rilis ada di bagian *Riwayat singkat* di bawah dan di `CHANGELOG.md`.

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
- Tes lokal: logika (Node, 101 berkas) dan UI (Playwright, 390px dan 1280px); tidak ada CI di repo.

## Cara pakai singkat
1. Buka `bumdes.html` di browser (tanpa server).
2. Data awal berisi contoh demo; untuk memindahkan data gunakan Data → Backup & Restore (Export/Import JSON; import **mengganti seluruh data**).
3. Pasang sebagai aplikasi: host folder ini (mis. Vercel atau GitHub Pages), buka alamatnya di Chrome/Edge, lalu klik ikon pasang di bilah alamat atau tombol "Pasang aplikasi" di sidebar. Di iPhone: Bagikan → Tambah ke Layar Utama.
4. Pengembang: ubah berkas sumber → `node build.js` → `npm test`.

## Batasan yang diketahui
- Tanpa akun awan, data hanya tersimpan di browser perangkat (tidak berpindah antar perangkat/alamat); lakukan Export JSON berkala. Dengan akun awan (Supabase), data dicadangkan dan disinkron antar perangkat.
- Login PIN adalah kontrol prosedur di sisi browser, bukan pengamanan server.
- Fitur yang belum ada dan rencananya: lihat `ROADMAP.md`.

## Riwayat singkat
| Versi | Isi |
|---|---|
| 1.1.093 | SQL Supabase dirapikan |
| 1.1.092 | Sidebar dengan tombol ciut mengambang |
| 1.1.091 | Laporan bergaya kartu |
| 1.1.090 | Dashboard bergaya kartu analitik |
| 1.1.089 | Dashboard lebih informatif |
| 1.1.088 | Halaman Master lebih ringkas |
| 1.1.087 | Setelan lebih rapi |
| 1.1.086 | Pegawai dan gaji masuk tabel Supabase |
| 1.1.085 | Pengguna dari pegawai, PIN awal 1234 |
| 1.1.084 | Jabatan umum langsung tersedia |
| 1.1.083 | Dokumen dirapikan, riwayat lama diarsipkan |
| 1.1.082 | Pengguna dipilih dari daftar pegawai |
| 1.1.081 | Daftar jabatan & komponen gaji persen/laba |
| 1.1.080 | Masuk lebih aman di perangkat berisi data |
| 1.1.079 | Satu halaman masuk untuk semua peran |
| 1.1.078 | Halaman khusus developer |
| 1.1.077 | Peran developer platform |
| 1.1.076 | Daftar BUMDes awan lebih jelas |
| 1.1.075 | Tabel relasional di Supabase |
| 1.1.074 | Halaman masuk awan |
| 1.1.073 | Tab Awan lebih ringkas |
| 1.1.072 | Koneksi awan sudah tertanam |
| 1.1.071 | Akun awan dan sinkron otomatis dua arah |
| 1.1.070 | Pengingat penagihan dan laporan tabungan wajib |
| 1.1.069 | Kualitas portofolio: PAR dan pinjaman bermasalah |
| 1.1.068 | Denda keterlambatan dari Master Tarif & Biaya |
| 1.1.067 | Pendapatan fee dapat dipisah per jenis ke akun sendiri |
| 1.1.066 | Status tabungan wajib di rincian pinjaman dan penjagaan pembatalan |
| 1.1.065 | Ubah draf/pengajuan memakai tarif master dan ceklist biaya |
| 1.1.064 | Tabungan wajib: bebas, terkunci, atau dikembalikan saat lunas |
| 1.1.063 | Tabungan wajib dipotong saat pencairan |
| 1.1.062 | Jumlah materai (dan biaya tetap lain) di form pengajuan |
| 1.1.061 | Jasa dikunci dari master dan ceklist biaya di form pengajuan |
| 1.1.060 | Data contoh lengkap dan perbaikan impor backup pinjaman Dihapus buku |
| 1.1.059 | Kode otomatis: biaya, pajak, unit, akun, nomor akad |
| 1.1.058 | Nomor pinjaman dengan tahun/bulan dan urut otomatis |
| 1.1.057 | Jasa bertingkat menurut pokok dari Master Tarif & Biaya |
| 1.1.056 | Form pengajuan menampilkan tarif, biaya, dan pajak dari master |
| 1.1.055 | Data contoh untuk Master Tarif & Biaya |
| 1.1.054 | Jasa dan biaya pencairan dari Master Tarif & Biaya |
| 1.1.053 | Riwayat portal per nasabah dan petunjuk PIN |
| 1.1.052 | Bobot skor kelayakan dapat diatur |
| 1.1.051 | Tombol Terbitkan tagihan menempel di bawah daftar meter |
| 1.1.050 | Konfirmasi sebelum aksi berisiko (tagihan air, akui fee, hapus logo) |
| 1.1.049 | Tombol + melayang lebih pintar dan tidak menutupi isi |
| 1.1.048 | Riwayat cadangan awan dan pulihkan versi |
| 1.1.047 | Panduan Supabase dilengkapi (pengurus, keamanan) |
| 1.1.046 | Pesan hasil sinkron tampil dekat tombol Simpan |
| 1.1.045 | Perbaikan: Simpan ke awan tidak lagi dijeda setelah memilih ulang BUMDes |
| 1.1.044 | Nama BUMDes di header ikut BUMDes awan |
| 1.1.043 | Kunci Supabase format baru (publishable) didukung |
| 1.1.042 | Cadangan dan sinkron data ke Supabase (awan) |
| 1.1.041 | Portal nasabah lebih lega dan ada tombol kembali |
| 1.1.040 | PIN portal langsung dari formulir nasabah |
| 1.1.039 | Portal Nasabah mudah ditemukan di Setelan |
| 1.1.038 | Portal nasabah (tampilan demo) |
| 1.1.037 | Produk tabungan dan deposito |
| 1.1.036 | Fee pencairan bisa diamortisasi |
| 1.1.035 | Batas nominal untuk persetujuan restrukturisasi |
| 1.1.034 | Calon langsung diajukan pinjaman |
| 1.1.033 | Tampilan form lebih seragam |
| 1.1.032 | Pengajuan bisa disimpan sebagai draf |
| 1.1.031 | Calon peminjam sebelum menjadi nasabah |
| 1.1.030 | Restrukturisasi bisa butuh dua orang |
| 1.1.029 | Pajak atas biaya administrasi tabungan |
| 1.1.028 | Waktu proses per tahap di laporan |
| 1.1.027 | Audit Log dengan nama peristiwa baku |
| 1.1.026 | Laporan biaya per kode |
| 1.1.025 | Saldo Awal Terpandu lebih mudah dan aman |
| 1.1.024 | Akad cetak dengan tarif yang dibekukan |
| 1.1.023 | Bunga tabungan bertingkat dan cetak buku tabungan |
| 1.1.022 | Biaya dan pajak dipotong saat pencairan |
| 1.1.021 | Audit sebelum/sesudah, ekspor CSV, jejak audit pinjaman, laporan Simpan Pinjam |
| 1.1.020 | Biaya dan pajak pelunasan/restrukturisasi, batal restrukturisasi, hapus buku dua orang |
| 1.1.019 | Halaman Simpan Pinjam + tabungan; restrukturisasi, hapus buku |
| 1.1.018 | Kolektibilitas dan tindak lanjut penagihan |
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
