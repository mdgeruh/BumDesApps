# Catatan Rilis — v1.1.382

**Sistem BUMDes Multi-Unit Usaha** · 4 Oktober 2026 · satu file `bumdes.html`, data di `localStorage` browser.

Skema versi `1.1.NNN` dimulai di v1.1.001 (sebelumnya `0.1.NNN`) bersamaan dengan aplikasi yang dapat dipasang dari browser (PWA). Rincian tiap rilis ada di bagian *Riwayat singkat* di bawah dan di `CHANGELOG.md`.

## Sorotan

**Simpan Pinjam**
- Pengajuan pinjaman dan rincian pinjaman per nasabah berupa halaman penuh (dua kolom di layar lebar, tombol Kembali, alamat tersendiri); alur Diajukan → Disetujui → Aktif → Lunas (atau Ditolak/Dibatalkan, wajib beralasan), dengan konfirmasi untuk aksi berisiko.
- Metode jasa flat dan anuitas; jadwal angsuran, denda keterlambatan (masa tenggang, dasar hitung, batas), pembulatan, dan batas pinjaman yang dapat diatur di Setelan.
- Sub-tab **Ringkasan** (tab bawaan): pinjaman aktif, tunggakan, jatuh tempo 7/30 hari, pengajuan menunggu, pembayaran bulan ini. Simulasi angsuran langsung saat mengajukan; daftar pinjaman bisa diurutkan dan dimuat bertahap.
- Daftar ringkas untuk **Pinjaman, Tunggakan, Jaminan, Nasabah**; klik baris membuka halaman rincian. Halaman pinjaman memuat jadwal pembayaran yang bisa dibuka/ditutup per angsuran dan riwayat pembayaran (kwitansi, pembatalan).
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
| 1.1.382 | Dashboard: Tren dengan pilihan metrik (DB7) |
| 1.1.381 | Dashboard: persentase ekstrem dan Pola dilipat (DB6) |
| 1.1.380 | Dashboard: KPI utama dan perbandingan hari yang sama (DB1) |
| 1.1.379 | Pemilih unit ringkas di HP (UX3) |
| 1.1.378 | Pamsimas: Calon Putus klik baris (UX2) |
| 1.1.377 | Kepala halaman HP: judul tidak terpotong (UX1) |
| 1.1.376 | Cloud: pesan peran pembaca lebih jelas (CL1) |
| 1.1.375 | Gaji: Bayar semua lewat modal (GJ5) |
| 1.1.374 | Gaji: setor potongan dan buat gaji lewat modal (GJ4) |
| 1.1.373 | Gaji: isian seragam, Transfer dan pengingat (GJ2) |
| 1.1.372 | Gaji: rincian jadi halaman dan daftar ringkas (GJ1) |
| 1.1.371 | Judul tab sesuai nama BUMDes (JT1) |
| 1.1.370 | Halaman detail dua kolom (UD1) |
| 1.1.369 | Penataan struktur berkas (ST1) |
| 1.1.368 | Nama berkas ekspor dengan pengguna dan jam (EX1) |
| 1.1.367 | Peringatan modal Kasir lebih jelas (KR3) |
| 1.1.366 | RBAC Rilis 3: persetujuan transaksi (RB3) |
| 1.1.365 | Gabung CSS kartu dan judul (TL18) |
| 1.1.364 | Multi gudang dan transfer stok (PL9) |
| 1.1.363 | Skala dan integrasi Perdagangan (PL8) |
| 1.1.362 | Analitik perdagangan (PL7) |
| 1.1.361 | Pembelian dan utang lanjutan (PL6) (PL6) |
| 1.1.360 | Render sebagian Kasir, sidebar, banner, Master (KX8) |
| 1.1.359 | Suite lengkap hijau dan perbaikan Data > Backup (TS1) |
| 1.1.358 | Kartu Hari ini membuka daftar nota (KR2) |
| 1.1.357 | Riwayat nota Kasir diperbaiki (KR1) |
| 1.1.356 | Kasir berbentuk daftar (KL1) |
| 1.1.355 | PIN penyelia untuk diskon Kasir (KX7) |
| 1.1.354 | Pelanggan toko terpisah dan periksa harga (PB3) |
| 1.1.353 | Tagihan Pamsimas dioptimalkan (PB2) |
| 1.1.352 | Pamsimas bebas Perdagangan (PB1) |
| 1.1.351 | Perbaikan layar sukses Kasir (KB1) |
| 1.1.350 | Kasir: barang lain / jasa harga bebas (KX5) |
| 1.1.349 | Ketik tanggal manual (KT1) |
| 1.1.348 | Kasir lanjutan: pintasan, sering dibeli, WhatsApp, batas diskon (KX1) |
| 1.1.347 | Kasir: Transfer, QRIS, dan uang muka (DP) (KP1) |
| 1.1.346 | Kasir harian: riwayat nota, tahan keranjang, pelanggan (KH1) |
| 1.1.345 | Isian Kasir bersih (KS3) |
| 1.1.344 | Tutup kasir bertahap (KS2) |
| 1.1.343 | Perbaikan Kasir dan peran Kasir (KS1) |
| 1.1.342 | Lebar penuh semua halaman (TL14) |
| 1.1.341 | Data > Backup tersusun baris sejajar (TL13) |
| 1.1.340 | Perbaikan Kasir: nominal cepat dan tombol Bayar (TL12) |
| 1.1.339 | Data > Backup kolom seimbang (TL11) |
| 1.1.338 | Setelan, Profil, dan Portal lebih rapi (TL10) |
| 1.1.337 | Data > Backup tiga kolom dan istilah cloud (TL9) |
| 1.1.336 | Tata letak desktop: tombol aksi di kepala halaman (TL8) |
| 1.1.335 | Tata letak desktop: isi rata kiri (TL7) |
| 1.1.334 | Tata letak desktop: regresi semua halaman (TL6) |
| 1.1.333 | Tata letak desktop: lebar isian (TL5) |
| 1.1.332 | Tata letak desktop: judul tidak ganda (TL4) |
| 1.1.331 | Tab Perdagangan dirapikan (UV2d) |
| 1.1.330 | Tautan jejak halaman bergaya sendiri (UV2c) |
| 1.1.329 | Jejak halaman dapat diklik (UV2b) |
| 1.1.328 | UI v2 tahap 9: regresi tampilan (UV9) |
| 1.1.327 | UI v2 tahap 8: masuk dan Portal Nasabah (UV8) |
| 1.1.326 | UI v2 tahap 7: formulir (UV7) |
| 1.1.325 | UI v2 tahap 6: sidebar dan header (UV6) |
| 1.1.324 | UI v2 tahap 5: bar filter dan tab (UV5) |
| 1.1.323 | UI v2 tahap 4: tabel dan daftar (UV4) |
| 1.1.322 | UI v2 tahap 3: kartu KPI (UV3) |
| 1.1.321 | UI v2 tahap 2: kepala halaman (UV2) |
| 1.1.320 | UI v2 tahap 1: fondasi gaya (UV1) |
| 1.1.319 | Perbaikan latar judul kartu Laporan |
| 1.1.318 | Tata letak desktop (TL1-TL3) |
| 1.1.317 | Cetak Perdagangan lengkap (PL5g-PL5i) |
| 1.1.316 | Kasir sebagai menu sendiri (PL5f) |
| 1.1.315 | Cetak struk Kasir satu ketukan (PL5e) |
| 1.1.314 | Halaman khusus kasir (PL5d) |
| 1.1.313 | Kasir: perbaikan struk dan ponsel (PL5c) |
| 1.1.312 | Kasir: rapikan elemen ganda (PL5b) |
| 1.1.311 | Kasir tampilan baru (PL5) |
| 1.1.310 | Perbaikan impor cadangan |
| 1.1.309 | Stok lanjutan (PL4) |
| 1.1.308 | Struk dan kasir harian (PL3) |
| 1.1.307 | Penjualan lanjutan (PL2) |
| 1.1.306 | Perdagangan: navigasi dan kenyamanan (PL1) |
| 1.1.305 | Perbaikan hasil pemeriksaan halaman Perdagangan (PL0) |
| 1.1.304 | Perdagangan: impor CSV, data contoh toko desa, panduan (PD8) |
| 1.1.303 | Perdagangan: Ringkasan hidup dan pengingat (PD7) |
| 1.1.302 | Perdagangan: Laporan Perdagangan (PD6) |
| 1.1.301 | Perdagangan: stok opname dan retur (PD5) |
| 1.1.300 | Perdagangan: piutang pelanggan dan kasir cepat (PD4) |
| 1.1.299 | Perdagangan: penjualan dengan HPP otomatis (PD3) |
| 1.1.298 | Perbaikan form Pembelian: isian barang dikosongkan |
| 1.1.297 | Perdagangan: pembelian dan utang usaha (PD2) |
| 1.1.296 | Perdagangan: produk, stok awal, kartu stok (PD1) |
| 1.1.295 | Modul Perdagangan: fondasi (PD0) |
| 1.1.294 | Unit tanpa modul dan hapus unit kosong (DU3) |
| 1.1.293 | Unit Perdagangan bawaan dihapus |
| 1.1.292 | Putus dan sambung kembali (PM8) |
| 1.1.291 | Janji bayar piutang (PM7) |
| 1.1.290 | Pelanggan: filter, detail, impor CSV (PM4) |
| 1.1.289 | Umur tunggakan per pelanggan (PM6) |
| 1.1.288 | Navigasi dan pencarian seragam (PM5) |
| 1.1.287 | Ringkasan Pamsimas hidup (PM3) |
| 1.1.286 | Penagihan lebih cepat (PM2) |
| 1.1.285 | Layanan Lain khusus non-tagihan, aksi tagihan di detail piutang |
| 1.1.284 | Detail piutang tetap terbuka setelah bayar, Riwayat Bayar tab sendiri |
| 1.1.283 | Detail piutang dan Loket jadi halaman, piutang per pelanggan |
| 1.1.282 | Header muat di layar sempit |
| 1.1.281 | Backup lebih sederhana untuk pengguna akhir |
| 1.1.280 | Masuk dengan username, tanpa dropdown, layar bercover |
| 1.1.279 | Tombol Keluar hanya di Profil |
| 1.1.278 | Hapus kartu Akun saya, avatar header sesuai akun |
| 1.1.277 | Nama aplikasi dinamis di layar masuk dan deskripsi halaman |
| 1.1.276 | Nama aplikasi dan versi di berkas backup |
| 1.1.275 | Setelan Pengguna & Peran: izin per peran |
| 1.1.274 | Profil: email akun awan hanya untuk Admin Sistem |
| 1.1.273 | F6: uji regresi tata letak |
| 1.1.272 | Palet perintah, profil, dan bahasa seragam |
| 1.1.271 | F6: pemeriksaan lima lebar layar |
| 1.1.270 | F5: tabel dengan urut, cari, dan kepala menempel |
| 1.1.269 | Tombol panah di kartu Perlu perhatian |
| 1.1.268 | Kartu Perlu perhatian bisa diciutkan dan diperluas |
| 1.1.267 | D10: filter periode kurva Tren |
| 1.1.266 | Perbaikan teks di kartu Perlu perhatian |
| 1.1.265 | D9: cache perhitungan Dashboard |
| 1.1.264 | D7: atur tampilan Dashboard |
| 1.1.263 | D6: garis tren kas 30 hari |
| 1.1.262 | D5: kartu Perlu perhatian di Dashboard |
| 1.1.261 | D4: pemilih periode Dashboard |
| 1.1.260 | D3: perbandingan kas 30 hari dan laba bulan lalu |
| 1.1.259 | D2: angka dan bulan di Dashboard bisa ditekan |
| 1.1.258 | D1: kartu Pamsimas di Dashboard |
| 1.1.257 | F4: tema, pembaruan, penyimpanan persisten |
| 1.1.256 | Tab Ringkasan Pamsimas |
| 1.1.255 | Lencana sub-tab seperti lonceng |
| 1.1.254 | Gaya sub-tab seperti tab map |
| 1.1.253 | Tab dan sub-tab Pamsimas lebih jelas |
| 1.1.252 | Kartu Hari ini dihapus dari Dashboard |
| 1.1.251 | Detail transaksi menjadi halaman |
| 1.1.250 | Rapikan kode: berkas besar dipecah |
| 1.1.249 | Petunjuk awal dan hapus data contoh |
| 1.1.248 | Mode lapangan Pamsimas |
| 1.1.247 | Pengingat piutang air bergilir lewat WhatsApp |
| 1.1.246 | Tanda tangan dan stempel digital pada dokumen cetak |
| 1.1.245 | Kartu Hari ini di Dashboard |
| 1.1.244 | Pencarian global |
| 1.1.243 | Pemeriksaan kesehatan data |
| 1.1.242 | Salinan otomatis di perangkat dan pengingat backup tegas |
| 1.1.241 | Simpan data adaptif untuk data besar |
| 1.1.240 | Detail pelanggan Pamsimas menjadi halaman penuh (bukan modal) |
| 1.1.239 | Perbaikan: Alur per proyek hanya untuk proyek yang masih berjalan |
| 1.1.238 | Alur pengadaan: progress bar menggantikan angka langkah |
| 1.1.237 | RAB proyek lebih cepat diisi dan dibaca |
| 1.1.236 | Alur pengadaan per proyek: 8 langkah dengan satu tombol Lanjut |
| 1.1.235 | Perbaikan: Bayar termin dan form Pengadaan tidak lagi galat bila kolom opsional tidak ada |
| 1.1.234 | RFQ lebih mudah diikuti: penunjuk langkah, panduan, dan tombol aksi utama per tahap |
| 1.1.233 | Header aplikasi lebih bersih dan modern; tombol dan tautan di header disusun ulang |
| 1.1.232 | Fase PC tahap AK: laporan pertanggungjawaban per proyek, rekap tahunan, dan checklist dokumen untuk desa (PC7) |
| 1.1.231 | Fase PC tahap AJ: izin terperinci, pernyataan benturan kepentingan, pemisahan tugas, dan persetujuan berjenjang (PC6) |
| 1.1.230 | Fase PC tahap AI: anggaran vs realisasi, akun proyek, laporan, Dashboard, dan tabel awan (PC5b) |
| 1.1.229 | Fase PC tahap AH: jurnal proyek, tagihan dan pembayaran termin, retensi (PC5a) |
| 1.1.228 | Fase PC tahap AG: serah terima/penerimaan dengan QC, BAST, dan dokumentasi (PC4) |
| 1.1.227 | Fase PC tahap AF: Kontrak/SPK, termin pembayaran, retensi, dan addendum (PC3) |
| 1.1.226 | Fase PC tahap AE: RFQ, evaluasi penawaran, dan Purchase Order (PC2b) |
| 1.1.225 | Fase PC tahap AD: RAB/BoQ, metode pemilihan, dan vendor (PC2a) |
| 1.1.224 | Satu halaman: index.html menggantikan bumdes.html |
| 1.1.223 | Perbaikan: halaman kosong bila berkas proyek.js belum terunggah |
| 1.1.222 | Master Unit Usaha: jenis mengikuti modul dan kecocokan unit-modul |
| 1.1.221 | Fase PC tahap AC: Proyek dan Kegiatan (PC1) |
| 1.1.220 | Pamsimas: Tarif ringkas dan Pengaturan dipecah |
| 1.1.219 | Pamsimas: keadaan kosong, Urungkan, sorot baris |
| 1.1.218 | Pamsimas: tab berkelompok dan tombol aksi per tab |
| 1.1.217 | Baca Meter: isi angka langsung di baris |
| 1.1.216 | Pamsimas: ringkasan angka kunci dan periode ringkas |
| 1.1.215 | Simpan Pinjam dan laporan lebih cepat |
| 1.1.214 | Pamsimas jauh lebih cepat untuk data besar |
| 1.1.213 | Pamsimas: isian lewat modal |
| 1.1.212 | Lonceng lebih ringkas dan lebih lengkap |
| 1.1.211 | Peringatan Dashboard pindah ke lonceng |
| 1.1.210 | Lonceng notifikasi di header |
| 1.1.209 | Saklar modul pindah ke Master > Unit Usaha |
| 1.1.208 | Unit usaha dan Modul selaras dengan Pamsimas |
| 1.1.207 | Pamsimas: daftar kerja baca meter dan petugas per rute |
| 1.1.206 | Pamsimas: cetak tagihan massal dan WhatsApp |
| 1.1.205 | Pamsimas: loket pembayaran cepat |
| 1.1.204 | Pamsimas: meter rusak dan taksiran |
| 1.1.203 | Pamsimas: ganti meter lewat modal |
| 1.1.202 | Buka pertama langsung ke aplikasi, tanpa halaman login |
| 1.1.201 | Buka di perangkat baru dengan data lokal dulu |
| 1.1.200 | Langkah awal di Dashboard dan pemeriksaan otomatis (CI) |
| 1.1.199 | Payroll: komponen per jam atau per hari |
| 1.1.198 | Payroll: rekening pegawai dan daftar transfer gaji |
| 1.1.197 | Pamsimas: calon putus, surat peringatan, pengaduan |
| 1.1.196 | Pamsimas: Ringkasan Desa satu halaman |
| 1.1.195 | Pamsimas: meter induk dan kehilangan air |
| 1.1.194 | Pamsimas: biaya operasional dan kecukupan tarif |
| 1.1.193 | Pamsimas: ganti nama dan Layanan & Biaya Lain |
| 1.1.192 | Perbaikan nama tombol struk |
| 1.1.191 | Cetak tahap I: audit semua dokumen dan uji cetak otomatis |
| 1.1.190 | Cetak tahap H: struk thermal 80 mm dan 58 mm |
| 1.1.189 | Cetak tahap G: Buku Besar dan Neraca Saldo seperti tabel buku |
| 1.1.188 | Cetak tahap F: nama petugas di dokumen |
| 1.1.187 | Perapian folder: dokumen dan ikon |
| 1.1.186 | Unit Air tahap E: penyempurnaan Baca Meter, toast, dan pengingat tunggakan |
| 1.1.185 | Unit Air tahap D: struktur tab dan satu halaman Tarif |
| 1.1.184 | Unit Air tahap C: Piutang mudah dipakai |
| 1.1.183 | Unit Air tahap B: Sambungan aman dan ringkas |
| 1.1.182 | Unit Air tahap A: alur Baca Meter lebih cepat |
| 1.1.181 | Modal detail pelanggan Air lebih ringkas |
| 1.1.180 | Kuitansi pembayaran tagihan air |
| 1.1.179 | Tombol Bayar di modal detail pelanggan Air |
| 1.1.178 | Baca Meter: daftar bersih, klik langsung buka modal |
| 1.1.177 | Unit Air: pencarian pelanggan dan modal detail |
| 1.1.176 | Kurva dashboard halus dengan tooltip |
| 1.1.175 | Data > Backup lebih rapi |
| 1.1.174 | Zona waktu mengikuti perangkat |
| 1.1.173 | Tabel jadwal simulasi ringkas dan polos |
| 1.1.172 | Rapikan tampilan halaman pinjaman |
| 1.1.171 | Ajukan pinjaman dan rincian pinjaman sebagai halaman |
| 1.1.170 | Form Master Tarif Air lewat modal |
| 1.1.169 | Master Tarif Air: golongan, denda, pasang baru, diskon |
| 1.1.168 | Format nomor penjualan dan tagihan air |
| 1.1.167 | Piutang per tanggal lampau dan catatan atas laporan |
| 1.1.166 | Simpan Pinjam: aksesibilitas dan uji pelengkap |
| 1.1.165 | Rekap gaji tahunan |
| 1.1.164 | Neraca dan Arus Kas dengan pembanding |
| 1.1.163 | Laba Rugi dengan pembanding |
| 1.1.162 | Format nomor pegawai dan tabungan |
| 1.1.161 | Setor potongan gaji |
| 1.1.160 | Gaji: setujui dan bayar massal |
| 1.1.159 | Keluar otomatis dan reset izin |
| 1.1.158 | Kartu pinjaman dan rekap tabungan |
| 1.1.157 | Uji cepat dan uji lengkap |
| 1.1.156 | Pengingat backup dapat diatur |
| 1.1.155 | Daftar panjang dimuat bertahap |
| 1.1.154 | Pemantau penyimpanan browser |
| 1.1.153 | Pengguna & Peran tanpa form ganda |
| 1.1.152 | Halaman Profil dirapikan |
| 1.1.151 | Kosongkan isi database awan |
| 1.1.150 | Tampilan sesuai akun dan peran |
| 1.1.149 | Ubah data profil sendiri dan dialog per aksi pinjaman |
| 1.1.148 | Profil pengguna di header dan halaman Profil |
| 1.1.147 | Sidebar dan header lebih jelas; pilihan unit tampil lagi di desktop |
| 1.1.146 | Perapian akhir tampilan seragam; cetak lebih rapi |
| 1.1.145 | Layar masuk dan portal nasabah lebih rapi |
| 1.1.144 | Setelan Simpan Pinjam: tiap pengaturan dalam kartu |
| 1.1.143 | Setelan: pengguna & peran dan portal nasabah dalam kartu |
| 1.1.142 | Setelan: profil, dokumen cetak, modul dalam kartu |
| 1.1.141 | Data: cadangan, periode, tutup buku, audit log dalam kartu dan daftar berbaris |
| 1.1.140 | Master: pihak, pegawai, tarif & pajak dalam kartu dan daftar berbaris |
| 1.1.139 | Master: unit usaha, kas & bank, akun dalam kartu dan daftar berbaris |
| 1.1.138 | Gaji: proses, komponen, laporan dalam kartu dan daftar berbaris |
| 1.1.137 | Unit Air: Baca Meter, Sambungan, Tarif dalam kartu dan daftar berbaris |
| 1.1.136 | Unit Air: Penjualan Lain, Piutang, Pelanggan, Produk dalam kartu dan daftar berbaris |
| 1.1.135 | Buku Besar desktop: kolom Tanggal, Keterangan, Unit, Debit, Kredit, Saldo; filter sebaris |
| 1.1.134 | Neraca Saldo: ringkasan dan saldo per akun berbaris seragam dashboard |
| 1.1.133 | Buku Besar: filter, ringkasan, dan mutasi berbaris dengan ikon debit/kredit seragam dashboard |
| 1.1.132 | Laporan: filter, tiap bagian, aging, dan kecocokan dalam kartu seragam dashboard |
| 1.1.131 | Saldo Awal: kartu, form lipat, dan entri berbaris seragam dashboard |
| 1.1.130 | Transaksi: daftar dalam kartu dengan ikon arus, seragam dashboard |
| 1.1.129 | Simpan Pinjam > Calon seragam dengan dashboard |
| 1.1.128 | Tautan nomor pinjaman di modal Jaminan bergaya aksen |
| 1.1.127 | Simpan Pinjam > Nasabah seragam dengan dashboard |
| 1.1.126 | Simpan Pinjam > Jaminan seragam dengan dashboard |
| 1.1.125 | Simpan Pinjam > Tunggakan seragam dengan dashboard |
| 1.1.124 | Simpan Pinjam > Tabungan seragam dengan dashboard |
| 1.1.123 | Simpan Pinjam > Pinjaman: daftar pinjaman dalam kartu seragam dashboard |
| 1.1.122 | Simpan Pinjam > Ringkasan seragam dengan dashboard (kartu berikon, daftar jatuh tempo) |
| 1.1.121 | Transaksi terakhir di dashboard jadi kartu seragam dengan ikon arus |
| 1.1.120 | Dashboard: grafik Pendapatan per Unit dihapus (duplikat), Laba Rugi per Unit naik |
| 1.1.119 | Grafik Pendapatan per Unit di dashboard lebih halus |
| 1.1.118 | Laba Rugi per Unit di dashboard jadi kartu daftar yang bersih |
| 1.1.117 | Dashboard diprioritaskan: peringatan di atas, banner backup ringkas |
| 1.1.116 | Header lebih ringkas di HP; ikon status awan di header |
| 1.1.115 | Tampilan awan disederhanakan untuk pengguna akhir |
| 1.1.114 | Pengaturan Awan pindah ke Data > Backup |
| 1.1.113 | Profil BUMDes ikut tersinkron dengan awan |
| 1.1.112 | Muat dari awan hanya mengganti data; profil BUMDes tetap |
| 1.1.111 | Data & Cadangan: impor tidak mengubah profil BUMDes; kosongkan semua data |
| 1.1.110 | Nama BUMDes di Profil dan di awan disamakan |
| 1.1.109 | Validasi layar Siapkan BUMDes: kotak galat menetap, sandi tidak terhapus, ikon mata tampilkan sandi |
| 1.1.108 | SQL dipindah ke folder sql/ dengan nama bernomor berurutan |
| 1.1.107 | Satu aplikasi satu database satu BUMDes; penyiapan admin pertama; peran developer dihapus; reset SQL |
| 1.1.106 | Tombol Cek peran akun; galat deteksi developer ditampilkan |
| 1.1.105 | Setelan Awan dibedakan untuk akun developer dan admin |
| 1.1.104 | Halaman Setelan > Awan lebih rapi di desktop (dua kolom) |
| 1.1.103 | Data penjualan, Unit Air, jaminan, tarif dan pajak masuk tabel Supabase |
| 1.1.102 | Konsol Developer: Masuk ke BUMDes membuka layar login BUMDes itu |
| 1.1.101 | Data tabungan masuk tabel Supabase; daftar BUMDes awan hanya milik akun |
| 1.1.100 | Alamat untuk semua sub-tab |
| 1.1.099 | Cetak laporan lebih rapi |
| 1.1.098 | Alamat per halaman (web route) |
| 1.1.097 | Memilih BUMDes awan lain tidak lagi menyalin data |
| 1.1.096 | Semua sub-tab Setelan lebih lega di desktop |
| 1.1.095 | Setelan Profil tampil dua kolom di desktop |
| 1.1.094 | Buku Besar lebih ringkas dan lengkap |
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
