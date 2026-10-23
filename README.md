# Sistem BUMDes Multi-Unit Usaha

Aplikasi manajemen BUMDes untuk banyak unit usaha (Simpan Pinjam, Pamsimas, dll.; unit Perdagangan dibuat sendiri bila perlu) dengan satu mesin akuntansi bersama. Bukan aplikasi koperasi: Simpan Pinjam hanyalah salah satu unit. Saat ini fokus ke Simpan Pinjam; Unit Air dan Gaji bawaan nonaktif dan dapat dinyalakan di *Setelan > Modul*.

> **Status:** MVP Tahap 1 — **v1.1.207** · satu file `index.html` (HTML + CSS + JS), data di `localStorage` (key `bumdes_db_v1`)
> **Desain:** `docs/BUMDes_Multi_Unit_Usaha_Blueprint_v2_LocalStorage.md`

## Menjalankan

1. Buka `index.html` di browser (tanpa install/server). Data demo dibuat otomatis saat pertama dibuka.
2. Data hanya ada di satu browser/perangkat. **Export JSON berkala** (tab *Data*); aplikasi mengingatkan setelah 7 hari.

Panduan Perdagangan: `docs/PANDUAN_PERDAGANGAN.md`.

## Fitur (v1.1.371)
- **Judul tab sesuai nama BUMDes (JT1) (v1.1.371).**
- **Halaman detail dua kolom (UD1) (v1.1.370).**
- **Penataan struktur berkas (ST1) (v1.1.369).**
- **Nama berkas ekspor dengan pengguna dan jam (EX1) (v1.1.368).**
- **Peringatan modal Kasir lebih jelas (KR3) (v1.1.367).**
- **RBAC Rilis 3: persetujuan transaksi (RB3) (v1.1.366).**
- **Gabung CSS kartu dan judul (TL18) (v1.1.365).**
- **Multi gudang dan transfer stok (PL9) (v1.1.364).**
- **Skala dan integrasi Perdagangan (PL8) (v1.1.363).**
- **Analitik perdagangan (PL7) (v1.1.362).**
- **Pembelian dan utang lanjutan (PL6) (PL6) (v1.1.361).**
- **Render sebagian Kasir, sidebar, banner, Master (KX8) (v1.1.360).**
- **Suite lengkap hijau dan perbaikan Data > Backup (TS1) (v1.1.359).**
- **Kartu Hari ini membuka daftar nota (KR2) (v1.1.358).**
- **Riwayat nota Kasir diperbaiki (KR1) (v1.1.357).**
- **Kasir berbentuk daftar (KL1) (v1.1.356).**
- **PIN penyelia untuk diskon Kasir (KX7) (v1.1.355).**
- **Pelanggan toko terpisah dan periksa harga (PB3) (v1.1.354).**
- **Tagihan Pamsimas dioptimalkan (PB2) (v1.1.353).**
- **Pamsimas bebas Perdagangan (PB1) (v1.1.352).**
- **Perbaikan layar sukses Kasir (KB1) (v1.1.351).**
- **Kasir: barang lain / jasa harga bebas (KX5) (v1.1.350).**
- **Ketik tanggal manual (KT1) (v1.1.349).**
- **Kasir lanjutan: pintasan, sering dibeli, WhatsApp, batas diskon (KX1) (v1.1.348).**
- **Kasir: Transfer, QRIS, dan uang muka (DP) (KP1) (v1.1.347).**
- **Kasir harian: riwayat nota, tahan keranjang, pelanggan (KH1) (v1.1.346).**
- **Isian Kasir bersih (KS3) (v1.1.345).**
- **Tutup kasir bertahap (KS2) (v1.1.344).**
- **Perbaikan Kasir dan peran Kasir (KS1) (v1.1.343).**
- **Lebar penuh semua halaman (TL14) (v1.1.342).**
- **Data > Backup tersusun baris sejajar (TL13) (v1.1.341).**
- **Perbaikan Kasir: nominal cepat dan tombol Bayar (TL12) (v1.1.340).**
- **Data > Backup kolom seimbang (TL11) (v1.1.339).**
- **Setelan, Profil, dan Portal lebih rapi (TL10) (v1.1.338).**
- **Data > Backup tiga kolom dan istilah cloud (TL9) (v1.1.337).**
- **Tata letak desktop: tombol aksi di kepala halaman (TL8) (v1.1.336).**
- **Tata letak desktop: isi rata kiri (TL7) (v1.1.335).**
- **Tata letak desktop: regresi semua halaman (TL6) (v1.1.334).**
- **Tata letak desktop: lebar isian (TL5) (v1.1.333).**
- **Tata letak desktop: judul tidak ganda (TL4) (v1.1.332).**
- **Tab Perdagangan dirapikan (UV2d) (v1.1.331).**
- **Tautan jejak halaman bergaya sendiri (UV2c) (v1.1.330).**
- **Jejak halaman dapat diklik (UV2b) (v1.1.329).**
- **UI v2 tahap 9: regresi tampilan (UV9) (v1.1.328).**
- **UI v2 tahap 8: masuk dan Portal Nasabah (UV8) (v1.1.327).**
- **UI v2 tahap 7: formulir (UV7) (v1.1.326).**
- **UI v2 tahap 6: sidebar dan header (UV6) (v1.1.325).**
- **UI v2 tahap 5: bar filter dan tab (UV5) (v1.1.324).**
- **UI v2 tahap 4: tabel dan daftar (UV4) (v1.1.323).**
- **UI v2 tahap 3: kartu KPI (UV3) (v1.1.322).**
- **UI v2 tahap 2: kepala halaman (UV2) (v1.1.321).**
- **UI v2 tahap 1: fondasi gaya (UV1) (v1.1.320).**
- **Perbaikan latar judul kartu Laporan (v1.1.319).**
- **Tata letak desktop (TL1-TL3) (v1.1.318).**
- **Cetak Perdagangan lengkap (PL5g-PL5i) (v1.1.317).**
- **Kasir sebagai menu sendiri (PL5f) (v1.1.316).**
- **Cetak struk Kasir satu ketukan (PL5e) (v1.1.315).**
- **Halaman khusus kasir (PL5d) (v1.1.314).**
- **Kasir: perbaikan struk dan ponsel (PL5c) (v1.1.313).** Struk menampilkan eceran, diskon, kembalian, catatan; kas bawaan; lembar Pesanan di ponsel.
- **Kasir: rapikan elemen ganda (PL5b, v1.1.312).**
- **Kasir tampilan baru (PL5, v1.1.311).** Dua panel dan pembayaran bertahap.
- **Perbaikan impor cadangan (v1.1.310).**
- **Stok lanjutan (PL4) (v1.1.309).**
- **Struk dan kasir harian (PL3) (v1.1.308).**
- **Penjualan lanjutan (PL2) (v1.1.307).**
- **Perdagangan: navigasi dan kenyamanan (PL1) (v1.1.306).**
- **Perbaikan hasil pemeriksaan halaman Perdagangan (PL0) (v1.1.305).**
- **Perdagangan: impor CSV, data contoh toko desa, panduan (PD8) (v1.1.304).**
- **Perdagangan: Ringkasan hidup dan pengingat (PD7) (v1.1.303).**
- **Perdagangan: Laporan Perdagangan (PD6) (v1.1.302).**
- **Perdagangan: stok opname dan retur (PD5) (v1.1.301).**
- **Perdagangan: piutang pelanggan dan kasir cepat (PD4) (v1.1.300).**
- **Perdagangan: penjualan dengan HPP otomatis (PD3) (v1.1.299).**
- **Perbaikan form Pembelian: isian barang dikosongkan (v1.1.298).**
- **Perdagangan: pembelian dan utang usaha (PD2) (v1.1.297).**
- **Perdagangan: produk, stok awal, kartu stok (PD1) (v1.1.296).**
- **Modul Perdagangan: fondasi (PD0) (v1.1.295).**
- **Unit tanpa modul dan hapus unit kosong (DU3) (v1.1.294).**
- **Unit Perdagangan bawaan dihapus (v1.1.293).**
- **Putus dan sambung kembali (PM8) (v1.1.292).**
- **Janji bayar piutang (PM7) (v1.1.291).**
- **Pelanggan: filter, detail, impor CSV (PM4) (v1.1.290).**
- **Umur tunggakan per pelanggan (PM6) (v1.1.289).**
- **Navigasi dan pencarian seragam (PM5) (v1.1.288).**
- **Ringkasan Pamsimas hidup (PM3) (v1.1.287).**
- **Penagihan lebih cepat (PM2) (v1.1.286).**
- **Layanan Lain khusus non-tagihan, aksi tagihan di detail piutang (v1.1.285).**
- **Detail piutang tetap terbuka setelah bayar, Riwayat Bayar tab sendiri (v1.1.284).**
- **Detail piutang dan Loket jadi halaman, piutang per pelanggan (v1.1.283).**
- **Header muat di layar sempit (v1.1.282).** Chip pengguna avatar saja di ≤400px; uji ui-sempit.
- **Backup lebih sederhana (v1.1.281).** Tanpa kolom tempel JSON dan tanpa panel teknis awan.
- **Masuk dengan username, tanpa dropdown pengguna, layar masuk bercover (v1.1.280).**
- **Tombol Keluar hanya di Profil (v1.1.279).**
- **Hapus kartu Akun saya, avatar header sesuai akun (v1.1.278).**
- **Nama aplikasi dinamis di layar masuk dan deskripsi halaman (v1.1.277).**
- **Nama aplikasi dan versi di berkas backup (v1.1.276).**
- **Setelan Pengguna & Peran: izin per peran (v1.1.275).**
- **Profil: email akun awan hanya untuk Admin Sistem (v1.1.274).**
- **F6 regresi tata letak, nama "Sistem Bumdes Multi Unit V…", PIN bawaan 123456, pembuat data setahun (v1.1.273).**
- **Palet perintah di pencarian, kartu Tampilan dan Sesi di Profil, istilah Ekspor/Impor seragam (v1.1.272).**
- **F6: pemeriksaan lima lebar layar (v1.1.271).**
- **F5: tabel dengan urut, cari, dan kepala menempel (v1.1.270).**
- **Tombol panah di kartu Perlu perhatian (v1.1.269).**
- **Kartu Perlu perhatian bisa diciutkan dan diperluas (v1.1.268).**
- **D10: filter periode kurva Tren (v1.1.267).**
- **Perbaikan teks kartu Perlu perhatian (v1.1.266).**
- **D9: cache perhitungan Dashboard (v1.1.265).**
- **D7: atur tampilan Dashboard (v1.1.264).**
- **D6: garis tren kas 30 hari (v1.1.263).**
- **D5: kartu Perlu perhatian di Dashboard (v1.1.262).**
- **D4: pemilih periode Dashboard (v1.1.261).**
- **D3: perbandingan kas 30 hari dan laba bulan lalu (v1.1.260).**
- **D2: angka dan bulan di Dashboard bisa ditekan (v1.1.259).**
- **D1: kartu Pamsimas di Dashboard (v1.1.258).**
- **F4: tema Terang/Gelap/Ikuti sistem, spanduk Muat ulang, status penyimpanan persisten (v1.1.257).**
- **Tab Ringkasan Pamsimas berisi kartu angka kunci (v1.1.256).**
- **Lencana sub-tab berupa blok warna seperti lonceng (v1.1.255).**
- **Sub-tab bergaya tab map: abu-abu, aktif putih tebal (v1.1.254).**
- **Tab dan sub-tab Pamsimas lebih jelas: lencana bermakna, Sambungan di Data, Tarif & Aturan, ingat sub-tab, sub-tab menempel (v1.1.253).**
- **Kartu Hari ini dihapus; notifikasi lewat lonceng (v1.1.252).**
- **Detail transaksi sebagai halaman (v1.1.251).**
- **Berkas besar dipecah (v1.1.250).**
- **Petunjuk awal dan hapus data contoh (v1.1.249).**
- **Mode lapangan Pamsimas (v1.1.248).**
- **Pengingat piutang air bergilir (v1.1.247).**
- **Tanda tangan dan stempel digital (v1.1.246).**
- **Kartu Hari ini di Dashboard (v1.1.245).**
- **Pencarian global (v1.1.244).**
- **Pemeriksaan kesehatan data (v1.1.243).**
- **Salinan otomatis di perangkat (v1.1.242).**
- **Simpan data adaptif (v1.1.241).**
- **Detail pelanggan Pamsimas sebagai halaman (v1.1.240).**
- **Alur per proyek hanya untuk proyek Draf atau Berjalan (v1.1.239).**
- **Alur pengadaan memakai progress bar (v1.1.238).**
- **RAB proyek lebih cepat diisi dan dibaca (v1.1.237).**
- **Alur pengadaan per proyek (v1.1.236):** 8 langkah dengan satu tombol Lanjut.
- **Perbaikan galat Bayar termin (v1.1.235):** kolom potongan opsional.
- **RFQ lebih mudah diikuti (v1.1.234):** penunjuk langkah, panduan, dan tombol aksi utama.
- **Header aplikasi lebih bersih dan modern (v1.1.233):** tombol dan tautan header disusun ulang.
- **Fase PC tahap AK — laporan pertanggungjawaban proyek, rekap tahunan, checklist dokumen desa (v1.1.232):** pelaporan ke desa (PC7 roadmap 1.0).
- **Fase PC tahap AJ — izin terperinci, benturan kepentingan, pemisahan tugas, persetujuan berjenjang (v1.1.231):** tata kelola pengadaan bila Mode Pengguna aktif (PC6 roadmap 1.0).
- **Fase PC tahap AI — anggaran vs realisasi, akun proyek, laporan, tabel awan (v1.1.230):** realisasi dari jurnal proyek, sisa anggaran, margin, laporan Proyek, kartu Dashboard, `sql/08_proyek.sql` (PC5b roadmap 1.0).
- **Fase PC tahap AH — jurnal proyek, pembayaran termin, retensi (v1.1.229):** `project_id` di transaksi, tagihan vendor, bayar termin dengan jurnal otomatis, potongan lewat Master Tarif, pencairan retensi (PC5a roadmap 1.0).
- **Fase PC tahap AG — serah terima dengan QC, BAST, dokumentasi (v1.1.228):** penerimaan per PO dengan hasil QC per item, dokumentasi, cetak BAST (PC4 roadmap 1.0).
- **Fase PC tahap AF — Kontrak/SPK, termin, retensi, addendum (v1.1.227):** kontrak dari PO Terbit, termin persen, retensi, addendum berversi, cetak SPK (PC3 roadmap 1.0).
- **Fase PC tahap AE — RFQ, evaluasi penawaran, Purchase Order (v1.1.226):** sub-tab Pengadaan; penawaran vendor, penilaian berbobot, pemenang (pengecualian beralasan), PO dengan batas komitmen terhadap anggaran (PC2b roadmap 1.0).
- **Fase PC tahap AD — RAB/BoQ, metode pemilihan, vendor (v1.1.225):** sub-tab Proyek/RAB/Vendor/Metode; RAB per proyek dibandingkan dengan anggaran; master metode pemilihan yang diatur pengurus; vendor = Pihak berjenis Pemasok (PC2a roadmap 1.0).
- **Satu halaman index.html (v1.1.224):** `bumdes.html` dihapus; `index.html` kini berkas mandiri hasil `node build.js` (templat sumber: `index.src.html`); `sw.js` hanya menyimpan index.html, manifest, ikon.
- **Perbaikan halaman kosong (v1.1.223):** zip Git v1.1.221-222 tidak memuat proyek.js sehingga semua tab kosong; kini lengkap, dan aplikasi tetap tampil bila berkas itu hilang.
- **Master Unit Usaha (v1.1.222):** jenis unit mengikuti modul (Perdagangan, Proyek dan Jasa), ringkasan aktivitas dan status modul per unit, kartu Kecocokan unit dan modul; unit pada form Proyek tidak lagi terisi otomatis.
- **Fase PC tahap AC — Proyek dan Kegiatan (v1.1.221):** modul opsional Proyek dan Pengadaan; proyek dengan status Draf → Berjalan → Serah terima → Selesai/Dibatalkan, anggaran per pos dengan revisi berversi, hapus terbatas (PC1 roadmap 1.0).
- **Pamsimas: Tarif ringkas dan Pengaturan dipecah (v1.1.220):** akordeon rincian blok, riwayat tarif, golongan, dan diskon; Pelanggan dan Layanan jadi tab sendiri di grup Data (tahap AB roadmap 1.1, tahap terakhir UI/UX Pamsimas).
- **Pamsimas: keadaan kosong, Urungkan, sorot baris (v1.1.219):** keadaan kosong berikon dengan tombol langkah berikutnya, toast Urungkan untuk tagihan dan pembayaran, sorot baris yang baru berubah, istilah Piutang seragam (tahap AA roadmap 1.1).
- **Pamsimas: tab berkelompok dan tombol aksi (v1.1.218):** grup Harian/Tagihan/Keuangan/Data, tombol melayang kontekstual per tab, pintasan Rincian sambungan dari piutang dan Loket (tahap Z roadmap 1.0f).
- **Baca Meter cepat (v1.1.217):** isian angka akhir per baris dengan Enter pindah ke berikutnya, filter chip (Belum, Sudah, Perlu cek, Semua) dan rute, peringatan lonjakan >3× rata-rata (tahap Y roadmap 1.0f).
- **Pamsimas: ringkasan angka kunci (v1.1.216):** kartu pelanggan aktif, tagihan, terkumpul, tunggakan, dan air tak berekening di atas tab; progres tagihan dan pembayaran; kartu Periode ringkas (tahap X roadmap 1.0f).
- **Simpan Pinjam dan laporan lebih cepat (v1.1.215):** indeks angsuran dan pembayaran per pinjaman selama satu tampilan; 600 pinjaman membuka tab dalam sekitar 15–30 ms (sebelumnya 250–360 ms).
- **Pamsimas lebih cepat (v1.1.214):** indeks sementara per tampilan; 800 pelanggan dan 9.600 tagihan membuka Baca Meter dalam sekitar 20 ms (sebelumnya sekitar 5 detik).
- **Isian Pamsimas lewat modal (v1.1.213):** Layanan Lain, Biaya, dana pemeliharaan, Meter Induk, batas kehilangan air, Pengaduan, dan Tarif standar kini diisi lewat modal seperti form Pamsimas lainnya.
- **Lonceng ringkas dan lebih lengkap (v1.1.212):** satu baris per notifikasi; ditambah pengajuan pinjaman menunggu, pinjaman disetujui belum cair, taksiran Pamsimas menunggu koreksi, dan sambungan belum dibaca (mulai tanggal 20).
- **Dashboard tanpa daftar peringatan (v1.1.211):** daftar Perlu perhatian dihapus dari Dashboard; peringatan hanya di lonceng header.
- **Lonceng notifikasi (v1.1.210):** ikon lonceng di header dengan lencana jumlah; panel berisi peringatan Dashboard, pengingat backup, dan angsuran jatuh tempo 7 hari dengan tombol aksi langsung.
- **Saklar modul di Master (v1.1.209):** sub-tab Modul di Setelan dihapus; modul Pamsimas dan Gaji diaktifkan atau dinonaktifkan langsung dari Master > Unit Usaha.
- **Unit Usaha dan Modul selaras Pamsimas (v1.1.208):** jenis unit Pamsimas di Master > Unit Usaha, unit bawaan bernama Pamsimas (data lama Sumber Air diubah otomatis), dan kartu modul Pamsimas menampilkan unit pencatat.
- **Daftar kerja baca meter (v1.1.207):** isian Rute dan Urutan pada data sambungan (kosong = ikut alamat pelanggan), petugas baca per rute, dan daftar kerja cetak A4 per rute (nomor meter, nama, alamat, angka bulan lalu, kolom kosong untuk angka baru, tanda tangan petugas) dari tombol di Baca Meter. Baca Meter yang dikelompokkan per rute menampilkan petugasnya.
- **Tagihan massal dan WhatsApp (v1.1.206):** tombol Cetak & kirim tagihan di Baca Meter membuka halaman periode: cetak semua nota (A4, satu nota per halaman, urut nomor meter atau alamat) dan tombol WhatsApp/Salin per pelanggan berisi teks tagihan siap kirim (tanpa pengiriman otomatis). Tombol Kirim tagihan WhatsApp juga ada di modal tagihan.
- **Loket pembayaran cepat (v1.1.205):** sub-tab Loket di Pamsimas: cari pelanggan (nama, telepon, alamat, nomor meter), lihat semua tunggakan, pilih tagihan, terima pembayaran sekaligus (denda keterlambatan otomatis atau dibebaskan), lalu cetak kuitansi per tagihan. Pembayaran sebagian tetap lewat Piutang.
- **Meter rusak dan taksiran (v1.1.204):** di modal tagihan, centang Meter rusak / tidak terbaca untuk menagih pemakaian taksiran (rata-rata 3 bacaan asli terakhir, bisa diubah). Angka meter tidak dimajukan; tagihan ditandai taksiran. Pada bacaan asli berikutnya pemakaian kumulatif dikurangi taksiran yang sudah ditagih; bila taksiran terlalu tinggi, selisihnya dikreditkan (baris Koreksi taksiran). Ganti meter menutup taksiran yang menunggu.
- **Ganti meter lewat modal (v1.1.203):** tombol Ganti meter di modal detail sambungan membuka modal (meter lama dan angka akhir, nomor dan angka awal meter baru, tanggal, alasan), peringatan bila periode berjalan belum ditagih, konfirmasi sebelum simpan, riwayat dan batal di modal. Kartu isian lama di tab Sambungan dihapus.
- **Buka pertama tanpa login (v1.1.202):** perangkat yang belum pernah masuk akun langsung membuka aplikasi dengan data lokal, tanpa halaman masuk. Masuk hanya untuk sinkronisasi (Data > Backup / ikon awan). Tautan `#masuk` dan `#portal` (nasabah) tetap membuka halaman masuk.
- **Lokal dulu (v1.1.201):** pada pemasangan dengan koneksi awan, halaman masuk punya tombol Lanjut tanpa masuk (data lokal) untuk perangkat yang belum pernah masuk akun; masuk hanya diperlukan untuk sinkronisasi.
- **Langkah awal dan CI (v1.1.200):** kartu Langkah awal di Dashboard (profil, unit, kas, pihak/pegawai, transaksi pertama, cadangan; tercentang otomatis, bisa disembunyikan); `.github/workflows/ci.yml` menjalankan `node build.js --check` (dan suite cepat bila folder tests/ ikut diunggah).
- **Komponen per satuan (v1.1.199):** cara hitung baru tarif per jam/hari pada Komponen Gaji; tarif per pegawai lewat ceklist; jumlah satuan diisi pada gaji Draf (jumlah = tarif × satuan), tercantum di slip.
- **Rekening pegawai dan daftar transfer (v1.1.198):** NIK, bank, nomor rekening, dan atas nama pada Master Pegawai; sub-tab Transfer di Gaji (daftar per periode, peringatan tanpa rekening, cetak A4, CSV); rekening tampil di slip.
- **Calon putus, SP, pengaduan (v1.1.197):** kartu Calon Putus di Piutang (batas bulan dari Tarif) dengan tombol Putus; cetak Surat Peringatan 1/2 (A4) dan catat terkirim; tab Pengaduan untuk laporan pipa bocor/air mati (Baru/Ditangani/Selesai).
- **Ringkasan Desa (v1.1.196):** laporan satu halaman untuk musyawarah desa (sambungan aktif/putus, KK terlayani, pemakaian per golongan dan dusun, tingkat penagihan, umur tunggakan, biaya per m³, kehilangan air); cetak A4 dan CSV.
- **Kehilangan air (v1.1.195):** bacaan meter induk/sumber per bulan dibanding m³ ditagih; persen kehilangan, batas bawaan 20% dengan penanda, kartu di Laporan Pamsimas.
- **Biaya Pamsimas (v1.1.194):** tab Biaya untuk listrik pompa, kaporit, perawatan pipa, honor operator; laporan biaya per m³ dibanding tarif rata-rata; saran dana pemeliharaan (persen, belum dijurnal).
- **Pamsimas (v1.1.193):** Unit Air kini Pamsimas; Penjualan Lain dan Produk diganti Layanan & Biaya Lain (pelanggan wajib, layanan bawaan, bukti pembayaran layanan).
- **Tombol struk (v1.1.192):** Struk tagihan, Struk kuitansi, dan Struk nota bernama jelas di modal.
- **Cetak tahap I (v1.1.191):** audit PDF semua dokumen dan laporan (A4, struk 80/58 mm); perbaikan tabel Laporan Simpan Pinjam yang terpotong; 34 PDF diuji otomatis di uji pra-rilis.
- **Cetak tahap H (v1.1.190):** struk thermal 80/58 mm untuk kuitansi, nota, tagihan, angsuran, pencairan, dan setoran/penarikan tabungan; ukuran kertas per perangkat; tombol Cetak struk.
- **Cetak tahap G (v1.1.189):** Buku Besar dan Neraca Saldo dicetak sebagai tabel (judul kolom berulang, saldo awal/akhir, nomor bukti).
- **Cetak tahap F (v1.1.188):** nama petugas muncul di kuitansi, nota, tagihan, dan akhir laporan; petugas tercatat saat transaksi.
- **Perapian folder (v1.1.187):** dokumen selain README di `docs/`, ikon di `icons/`.
- **Unit Air tahap E (v1.1.186):** ringkasan periode, kelompok per alamat, tombol ke atas, toast di bawah header modal, pengingat tunggakan (WhatsApp/salin/bagikan).
- **Unit Air tahap D (v1.1.185):** empat tab harian + Pengaturan (Tarif, Pelanggan, Produk); tarif standar, golongan, denda, pasang baru, dan diskon di satu halaman.
- **Unit Air tahap C (v1.1.184):** Piutang dengan cari dan filter; baris membuka modal terima pembayaran (Lunasi sisa, denda, cetak tagihan).
- **Unit Air tahap B (v1.1.183):** Sambungan berupa daftar ketuk-untuk-detail; Putus dan Sambungkan kembali dengan konfirmasi di modal.
- **Unit Air tahap A (v1.1.182):** progres tagihan, filter bawaan Belum ditagih, Terbitkan & lanjut ke pelanggan berikutnya.
- **Modal detail Air lebih ringkas (v1.1.181):** tanpa tombol kuitansi dobel, tombol cetak tenang, rincian dua kolom.
- **Kuitansi pembayaran air (v1.1.180):** dokumen cetak per pembayaran; tombol di modal detail pelanggan dan di Riwayat Pembayaran.
- **Tombol Bayar di modal detail Air (v1.1.179):** bagian Pembayaran dengan tanggal, kas/bank, jumlah, denda; bayar sebagian atau lunas per tagihan.
- **Baca Meter: daftar bersih (v1.1.178):** ketuk pelanggan langsung membuka modal detail (angka meter akhir + Terbitkan tagihan); filter status; tanpa input di daftar.
- **Unit Air: pencarian pelanggan dan modal detail (v1.1.177):** kolom cari di Baca Meter, Sambungan, Pelanggan; modal detail dengan angka meter akhir dan Terbitkan tagihan per pelanggan.
- **Kurva dashboard halus dengan tooltip (v1.1.176):** bezier mulus; tooltip bulan, pendapatan, beban, selisih saat hover, klik/ketuk, atau keyboard.
- **Data > Backup lebih rapi (v1.1.175):** ringkasan status, dua kolom di layar lebar, kartu awan datar, baris pilihan dan tombol rapi.
- **Zona waktu mengikuti perangkat (v1.1.174):** tanggal hari ini dan jam tampilan memakai waktu perangkat (mis. WITA); data tersimpan tetap UTC.
- **Tabel jadwal simulasi ringkas dan polos (v1.1.173):** angka tanpa Rp, baris Jumlah, muat di HP tanpa geser, bukan kartu.
- **Tampilan halaman pinjaman dirapikan (v1.1.172):** tanpa kartu di dalam kartu; teks tidak menempel ke garis tepi.
- **Ajukan pinjaman dan rincian pinjaman sebagai halaman (v1.1.171):** Simpan Pinjam > Pinjaman: Ajukan pinjaman, Ubah pengajuan, dan rincian per nasabah kini halaman penuh (dua kolom di layar lebar; simulasi angsuran di samping isian; bilah tombol tetap terlihat; Kembali; kartu Pinjaman lain milik nasabah). Setujui, Cairkan, Bayar, Lunasi, Tolak, jaminan, dan profil nasabah tetap jendela kecil di atas halaman. Alamat: `/simpan-pinjam/ajukan`, `/simpan-pinjam/pinjaman/{id}`, `.../ubah`; tombol Back peramban kembali ke daftar.
- **Master Tarif Air (v1.1.169; form lewat modal sejak v1.1.170):** halaman Unit Air > Pengaturan > Tarif (sebelumnya Master > Tarif Air) mengatur golongan tarif (dipilih per sambungan), denda keterlambatan (sekali per tagihan, diubah/dibebaskan saat Terima), biaya pasang baru (piutang saat sambungan baru), dan diskon (tagihan dan penjualan lain); semua bawaan nonaktif. Akun baru 4210 dan 4220.
- **Format nomor penjualan dan tagihan air (v1.1.168):** Setelan > Profil > kartu Nomor (bila modul Unit Air aktif) mengatur format nomor penjualan dan tagihan air dengan kode {YYYY} {YY} {MM} {DD} {NNNN}.
- **Piutang per tanggal lampau dan catatan atas laporan (v1.1.167):** Laporan > Piutang bisa dilihat per tanggal (dihitung mundur dari pembayaran); Neraca, Laba Rugi, Arus Kas, dan Piutang memuat Catatan atas laporan (otomatis + catatan tambahan di Setelan > Dokumen Cetak) yang ikut tercetak.
- **Simpan Pinjam: aksesibilitas dan uji pelengkap (v1.1.166):** fokus keyboard masuk ke jendela rincian; uji aksesibilitas modal (`ui-spa11y.py`), uji transisi (`logic-168.js`), dan pemeriksa nama baku audit (`check-audit.js`).
- **Rekap gaji tahunan (v1.1.165):** Laporan Gaji > Kelompokkan "Per tahun" dan "Per tahun · pegawai".
- **Neraca dan Arus Kas dengan pembanding (v1.1.164):** Neraca vs akhir bulan sebelumnya/tahun sebelumnya; Arus Kas vs periode sebelumnya/tahun sebelumnya; selisih Rupiah dan persen, CSV ikut memuat pembanding.
- **Laba Rugi dengan pembanding (v1.1.163):** Laporan > Laba Rugi > "Bandingkan dengan" periode sebelumnya atau tahun sebelumnya (selisih Rupiah dan persen; CSV ikut memuat pembanding).
- **Format nomor pegawai dan tabungan (v1.1.162):** Setelan > Profil > "Nomor pegawai dan tabungan": format nomor dengan kode {YYYY} {YY} {MM} {DD} {NNNN}; berlaku untuk nomor berikutnya.
- **Setor potongan gaji (v1.1.161):** Gaji > Proses Gaji > "Potongan gaji belum disetor": saldo per unit dan form setoran dari kas/bank (sebagian/penuh, tujuan wajib), pelunasan Kewajiban Lain 2200; dapat dibatalkan dengan jurnal pembalik.
- **Gaji massal (v1.1.160):** Gaji > Proses Gaji > kartu "Proses massal": pilih periode, lalu setujui semua draf atau bayar semua gaji disetujui sekaligus (konfirmasi jumlah/total, tiap gaji dijurnal sendiri dan dapat dibatalkan sendiri, mengikuti filter unit dan izin).
- **Keluar otomatis dan reset izin (v1.1.159):** Setelan > Pengguna & Peran: "Keluar otomatis" (Jangan, 5, 15, 30, 60 menit tidak aktif; `db.settings.idle_min`, pesan di layar masuk, tercatat di audit log) dan "Kembalikan matriks ke bawaan" (izin peran bawaan kembali ke awal; peran buatan sendiri dan Superadmin tidak berubah; ditolak bila Admin Sistem aktif akan habis).
- **Cetakan baru (v1.1.158, SP-O O7):** Kartu Pinjaman (data, ringkasan, jadwal, riwayat kwitansi; tombol di rincian pinjaman) dan Rekap Tabungan (semua rekening aktif nasabah, 10 mutasi terakhir; tombol di rincian nasabah). Portal nasabah: Cetak kartu pinjaman dan Cetak rekap tabungan (hanya milik sendiri, tanpa tanda tangan petugas dan tanpa daftar kwitansi karena data itu tidak diterbitkan ke portal); cetak portal menyembunyikan header dan menu.
- **Uji cepat dan lengkap (v1.1.157, SP-O O11):** `npm run test:cepat` (`node tests/suite.js cepat`: build --check, check-css/pwa/sql, semua uji logika, 10 uji UI ringkas; ±1,5 menit) dan `npm run test:lengkap` (+ logic-77 dan seluruh uji UI, paralel `-j N`; ±19 menit dengan 2 proses). Tanpa perubahan pada aplikasi.
- **Pengingat backup berkala (v1.1.156, SP-O O12):** interval dipilih di Data > Backup (3/7/14/30 hari atau mati; `db.settings.backup_days`, bawaan 7), spanduk memuat jumlah perubahan sejak cadangan terakhir dan berubah galat pada 3x interval, Nanti menyembunyikan sampai besok (`bumdes_bk_snooze`), hanya tampil untuk peran dengan izin Export backup. Penjaga kunci awan (hanya anon/publishable, `sb_secret_`/service_role ditolak) sudah ada sejak sebelumnya.
- **Daftar panjang dimuat bertahap (v1.1.155, SP-O O10):** Nasabah, Pihak, Pegawai, Tabungan, Tunggakan, Pelanggan, Sambungan, dan Piutang Air menampilkan 30 baris dengan tombol Muat lebih banyak (`pgLim/pgMore/pgGrow`); batas direset saat pindah halaman.
- **Pemantau penyimpanan browser (v1.1.154, SP-O O9):** kartu "Penyimpanan di browser" di Data > Backup (bilah pemakaian dari perkiraan batas 5 MB, rincian data/log audit/salinan lokal), spanduk peringatan 70% dan 90%, Arsipkan log audit lama (unduh JSON lalu hapus; 200 log terbaru dan riwayat pinjaman aktif dipertahankan), Hapus salinan cadangan lokal.
- **Pengguna & Peran dirapikan (v1.1.153):** form Ganti PIN ganda di Setelan diganti tautan ke Profil; kartu ringkasan angka di Daftar Pengguna; tombol tambah dan buat dari pegawai satu baris.
- **Profil dirapikan (v1.1.152):** header dengan tombol Keluar dan kontak, kartu angka (menu, izin, masuk sejak), dua kolom di desktop, Ganti PIN berupa panel lipat, aktivitas terakhir beristilah ramah.
- **Kosongkan isi database awan (v1.1.151):** `sql/98_kosongkan_isi.sql` mengosongkan isi tabel dan snapshot tanpa menghapus struktur, BUMDes, anggota, atau akun; aplikasi menampilkan pesan jelas dan tombol Timpa awan bila awan sudah dikosongkan.
- **Tampilan sesuai akun dan peran (v1.1.150):** menu, sub-tab, kartu, dan tombol aksi hanya tampil bila peran akun mengizinkan (termasuk peran pembaca di awan); Setelan hanya untuk Admin Sistem; akun yang hanya bertugas di unit non-Simpan Pinjam tidak melihat menu Simpan Pinjam.
- **Ubah data sendiri (v1.1.149):** di halaman Profil, pengguna yang login dapat mengubah nama, telepon, dan alamat (ikut ke data pegawai tertaut); tercatat di jejak audit.
- **Dialog per aksi pinjaman (v1.1.149):** Setujui, Cairkan, Bayar angsuran, dan Lunasi dibuka sebagai dialog dengan nilai bawaan dan galat per kolom.
- **Profil pengguna yang login (v1.1.148):** chip profil di header (avatar inisial, nama, peran; hanya avatar di HP) membuka halaman Profil: identitas, akses saya, ganti PIN (mode pengguna) atau atur ulang kata sandi (akun awan), aktivitas terakhir, dan Keluar. Alamat `#profil`.
- **Sidebar dan header lebih jelas (v1.1.147):** pilihan unit usaha tampil lagi di sidebar desktop (sebelumnya hilang), nama BUMDes dua baris, header memuat ikon halaman, subjudul nama BUMDes · unit, dan tanggal hari ini; saat sidebar diciutkan pilihan unit pindah ke header.
- **Penutup seragam UI (v1.1.146, UI-15):** CSS lama yang tak lagi dipakai (daftar lama Buku Besar, baris mutasi portal, grid awan, dll.) dihapus tanpa mengubah tampilan (48 tangkapan layar terang/gelap identik); kartu `dc` tidak terpotong saat dicetak; penjaga baru `node tests/check-css.js`.
- **Layar masuk dan Portal Nasabah seragam dengan dashboard (v1.1.145, UI-14):** Beranda portal memakai dua kartu ringkasan berikon (Total tabungan, Sisa pokok pinjaman), tagihan berikutnya dan mutasi dalam kartu; daftar pinjaman/tabungan berbaris dengan avatar; detail, profil, ganti PIN, dan login portal dalam kartu berjudul. Layar Masuk, Siapkan BUMDes, dan Pilih BUMDes diberi ikon di judul; pilihan BUMDes berupa daftar berbaris. ID, fungsi, dan teks lama tidak berubah.
- **Setelan Simpan Pinjam seragam dengan dashboard (v1.1.144, UI-13c):** 13 pengaturan (Nomor dan Denda, Perhitungan Jasa, Batas Pengajuan, Alur Pengajuan, Pemisahan Tugas, Kolektibilitas, Tabungan, Produk, Tabungan Wajib, Akun Fee, Pengakuan Fee, Klausul Akad, Templat Pengingat) tampil sebagai kartu berjudul dengan penjelasan sebagai subjudul; bagian lipat per kelompok tetap. Dengan ini seluruh tab Setelan sudah seragam.
- **Setelan Pengguna & Peran dan Portal Nasabah seragam dengan dashboard (v1.1.143, UI-13b):** kartu *Akun saya*, *Pengguna aplikasi* (baris berawatar dengan peran, unit, status, dan tombol edit / reset PIN / nonaktifkan), *Matriks izin*, *Matikan mode pengguna* (bingkai merah), serta kartu *Pengaturan portal* dan *Status penerbitan*. Simpan Pinjam menyusul (UI-13c).
- **Setelan Profil, Dokumen Cetak, dan Modul seragam dengan dashboard (v1.1.142, UI-13a):** kartu *Identitas BUMDes* (dua kolom di desktop) dan *Kop dan tanda tangan*; tab Modul berupa kartu penjelasan dan satu kartu per modul dengan lencana status dan saklar. Pengguna & Peran, Portal Nasabah, dan Simpan Pinjam menyusul (UI-13b, UI-13c).
- **Data seragam dengan dashboard (v1.1.141, UI-12):** empat bagian Backup (Cadangkan, Pulihkan, Cadangan online, Kosongkan — bagian bahaya berbingkai merah) jadi kartu bernomor; Periode Akuntansi berupa daftar berbaris terurut dengan ikon kunci dan lencana status; Tutup Buku Tahunan dan Riwayat Penutupan jadi kartu dengan baris unit/tahun; Audit Log berupa daftar berbaris (keterangan, peristiwa, waktu, pengguna, aksi, entitas) dengan filter di dalam kartu.
- **Master Pihak, Pegawai, Tarif & Pajak seragam dengan dashboard (v1.1.140, UI-11b):** kartu *Daftar Pihak*, *Daftar Pegawai* (gaji pokok di kanan), *Daftar Tarif*, *Daftar Pajak*, dan *Pratinjau hitung*; baris berawatar dengan status, filter di dalam kartu, tarif bertingkat diringkas sebagai "Bertingkat". Dengan ini seluruh tab Master sudah seragam.
- **Master seragam dengan dashboard (v1.1.139, UI-11a):** Unit Usaha (kartu *Daftar Unit Usaha*, baris berawatar inisial dengan kode, jenis, dan status), Kas & Bank (baris dengan saldo dan status), dan Akun COA (filter dalam kartu, chip kode akun berwarna menurut tipe, akun induk menonjol dan akun anak menjorok); baris membuka modal seperti sebelumnya. Pihak, Pegawai, Tarif menyusul di UI-11b.
- **Gaji seragam dengan dashboard (v1.1.138, UI-10):** Proses Gaji (kartu *Buat gaji periode*, *Pembayaran gaji*, *Daftar Gaji* berisi baris berawatar dengan bersih, status, dan aksi di baris tersendiri; kartu rincian gaji dengan komponen +/−), Komponen (kartu *Master Komponen* berbaris), dan Laporan (filter dalam kartu, empat kartu ringkasan, rekap dalam kartu).
- **Unit Air seragam dengan dashboard, bagian 2 (v1.1.137, UI-9b):** Baca Meter (kartu periode tagihan; kartu *Angka Meter* berisi baris per sambungan dengan kolom angka akhir atau status sudah ditagih), Sambungan (daftar berbaris dengan lencana Aktif/Diputus, peringatan menunggak, kartu Ganti Meter dan Riwayat Ganti Meter), dan Tarif (kartu Pengaturan Tarif dan Simulasi Tagihan). Seluruh tab Unit Air kini seragam.
- **Unit Air seragam dengan dashboard, bagian 1 (v1.1.136, UI-9a):** tab Penjualan Lain, Piutang, Pelanggan, dan Produk memakai kartu; formulir dalam kartu, daftar berupa baris berawatar dengan nominal, lencana status (Lunas/Belum lunas/Batal/Nonaktif), dan tombol aksi; tabel diganti. Baca Meter, Sambungan, dan Tarif menyusul (UI-9b).
- **Buku Besar desktop dioptimalkan (v1.1.135):** di layar lebar daftar mutasi punya kolom Tanggal, Keterangan, Unit, Debit, Kredit, dan Saldo (debit hijau, kredit merah, nol dipudarkan) dengan judul kolom; filter akun dan cari/tanggal sebaris. Tampilan HP tidak berubah.
- **Neraca Saldo seragam dengan dashboard (v1.1.134, UI-8):** tiga kartu ringkasan (total debit, total kredit, status seimbang) dan kartu *Saldo per Akun* berisi baris dengan ikon D/K, nama akun, kode, jenis, dan nominal; baris total debit dan kredit menggantikan tabel.
- **Buku Besar seragam dengan dashboard (v1.1.133, UI-7):** kartu *Akun dan filter*, empat kartu ringkasan (saldo akhir, total debit, total kredit, mutasi), dan kartu *Mutasi* berisi baris dengan ikon D (debit) / K (kredit), keterangan, tanggal, unit, saldo berjalan, serta baris saldo awal dan akhir. Urutan, Cetak, dan Unduh CSV tidak berubah.
- **Laporan seragam dengan dashboard (v1.1.132, UI-6):** filter dan cetak berupa kartu ringkas (tombol Cetak/Unduh CSV selebar kartu); Neraca, Laba Rugi, Arus Kas, Piutang, Simpan Pinjam, dan Unit Air tiap bagiannya dalam kartu; aging piutang berupa baris dengan bar, piutang terbesar berawatar, kecocokan Buku Besar berstatus ✓/⚠. Cetak dan CSV tidak berubah (kartu menjadi polos saat dicetak).
- **Saldo Awal seragam dengan dashboard (v1.1.131, UI-5b):** ringkasan dalam kartu *Mulai dari saldo lama* (kartu berikon, checklist langkah), form piutang dan pinjaman berjalan awal berada dalam kartu masing-masing dengan form lipat, entri berupa baris berawatar (sisa, tombol Batalkan, baris Total) menggantikan tabel.
- **Transaksi seragam dengan dashboard (v1.1.130, UI-5):** daftar transaksi dalam kartu *Daftar Transaksi* (pencarian, jenis, tanggal di dalam kartu); baris berisi ikon arus (hijau masuk, merah keluar, abu-abu transfer/lainnya), keterangan sampai dua baris, tanggal · unit · jenis ramah (`TLX`), nominal; lencana hanya untuk yang tidak berstatus diposting (mis. Dibatalkan, dicoret).
- **Simpan Pinjam > Calon seragam dengan dashboard (v1.1.129, UI-4d):** daftar calon dalam kartu *Daftar Calon* (pencarian dan filter di dalam kartu); baris berisi avatar, nama, telepon · keperluan · tanggal dicatat, rencana pinjaman, dan lencana status. Semua sub-tab Simpan Pinjam kini memakai gaya yang sama dengan dashboard.
- **Tautan modal rapi (v1.1.128):** nomor pinjaman di modal Jaminan kini bergaya aksen (hijau, tebal, panah, tanpa garis bawah; mengikuti mode gelap) menggantikan tautan biru bawaan browser. Kelas `a.lkx` bisa dipakai untuk tautan lain di dalam modal.
- **Simpan Pinjam > Nasabah seragam dengan dashboard (v1.1.127, UI-4c):** daftar nasabah dalam kartu *Daftar Nasabah* (pencarian dan filter di dalam kartu); baris berisi avatar, nama, telepon · tabungan · alamat, jumlah pinjaman aktif, sisa pokok, dan lencana Aktif/Menunggak/Nonaktif.
- **Simpan Pinjam > Jaminan seragam dengan dashboard (v1.1.126, UI-4b):** daftar jaminan dalam kartu *Daftar Jaminan* (pencarian dan filter di dalam kartu); baris berisi avatar nasabah, nomor pinjaman · jenis · deskripsi, nilai taksiran, dan lencana Dipegang/Dikembalikan.
- **Simpan Pinjam > Tunggakan seragam dengan dashboard (v1.1.125, UI-4a):** *Daftar Tunggakan*, *Kolektibilitas pinjaman aktif*, *Aging Tunggakan*, *Pengingat penagihan*, dan *Kualitas portofolio (PAR)* kini masing-masing berupa kartu; tabel diganti baris dengan bar persentase; baris tunggakan berisi avatar nasabah, nomor pinjaman, lencana kolektibilitas, tindak lanjut terakhir, dan sisa tagihan.
- **Simpan Pinjam > Tabungan seragam dengan dashboard (v1.1.124, UI-3):** kartu total tabungan berikon; *Proses akhir bulan* dan *Daftar Rekening* masing-masing dalam kartu; baris rekening berisi avatar nasabah, nomor · produk · unit · mutasi terakhir, saldo, dan lencana status; keterangan kesesuaian dengan akun 2300 di dasar kartu.
- **Simpan Pinjam > Pinjaman seragam dengan dashboard (v1.1.123, UI-2):** daftar pinjaman kini berada dalam kartu *Daftar Pinjaman* (pencarian, filter, urutan di dalam kartu); tiap baris berisi avatar nasabah, nama, nomor pinjaman · tenor · bunga, nominal (sisa pokok atau pokok) dan lencana status; tabel berkepala diganti daftar berbaris. Keadaan kosong memakai gaya yang sama dengan dashboard.
- **Simpan Pinjam > Ringkasan seragam dengan dashboard (v1.1.122, UI-1):** enam kartu ringkasan kini berikon berwarna seperti dashboard; *Akan jatuh tempo (30 hari)* menjadi kartu berisi daftar berbaris (avatar nasabah, nomor pinjaman, angsuran ke-n, tagihan, lencana hari lagi) menggantikan tabel berkepala. Pengingat backup di HP kini membungkus teks (sebelumnya terpotong).
- **Transaksi terakhir seragam (v1.1.121):** di dashboard kini berupa kartu seperti yang lain: judul dan subjudul, ikon arus (hijau masuk, merah keluar, abu-abu transfer/lainnya), keterangan dipotong rapi, nominal tebal di kanan, tombol "Lihat semua transaksi" selebar kartu. Label jenis ramah ("Setoran Tabungan", "Biaya Pinjaman") menggantikan kode mentah (`sav setor`, `loan fee`).
- **Dashboard tanpa duplikat (v1.1.120):** grafik *Pendapatan per Unit* dihapus karena angkanya sudah ada di kartu *Laba Rugi per Unit*; kartu itu kini berada di samping (desktop) atau tepat di bawah (HP) *Ringkasan Bulan Ini*. Catatan "Umum (tanpa unit)" tetap muncul di bawahnya bila ada selisih.
- **Grafik Pendapatan per Unit lebih halus (v1.1.119):** lebih pendek, batang ramping dan berwarna lembut, avatar dan teks lebih kecil, agar tidak menyaingi kartu Laba Rugi per Unit di bawahnya.
- **Laba Rugi per Unit lebih bersih (v1.1.118):** di dashboard kini berupa kartu daftar: avatar unit, pendapatan dan beban ringkas, laba menonjol (merah bila rugi), bar tipis beban terhadap pendapatan, dan baris total unit.
- **Dashboard diprioritaskan (v1.1.117):** urutan baru: Perlu perhatian dan aksi cepat di atas, lalu angka utama (Total Kas & Bank, Tunggakan, Jatuh tempo 7 hari, Pendapatan, Beban, Laba/Rugi, piutang, tabungan), baru tren dan ringkasan. Pengingat backup dan cadangan awan jadi satu baris kecil (bukan banner besar); pesan "tidak ada peringatan" dipersingkat.
- **Header ringkas dan status awan (v1.1.116):** di HP header lebih pendek dan baris nama BUMDes menyusut saat halaman digulir; judul dan nama panjang dipotong rapi. Ada ikon awan di header dengan titik status (hijau tersinkron, kuning menyimpan, merah perlu dicek, abu-abu belum masuk); diketuk membuka Data > Backup bagian awan.
- **Awan lebih sederhana (v1.1.115):** bagian Cadangan online di Data > Backup kini satu kartu status (Tersinkron / Belum masuk / Belum diatur) dengan tombol Simpan ke awan, Muat dari awan, dan Keluar, ditambah pilihan Simpan otomatis. Koneksi, riwayat cadangan, ganti kata sandi, tabel relasional, dan penjelasan teknis dipindah ke "Pengaturan lanjutan" yang tertutup (terbuka otomatis bila koneksi belum diisi atau ada masalah).
- **Awan pindah ke Data > Backup (v1.1.114):** pengaturan Awan (Supabase) tidak lagi di Setelan; kini menjadi bagian 3 di Data > Backup, di antara Pulihkan dan Kosongkan data. Tab Awan di Setelan dihapus.
- **Profil ikut awan (v1.1.113):** profil BUMDes (nama, alamat, logo) ikut tersinkron bersama data: Simpan ke awan menyimpannya dan Muat dari awan memuatnya kembali (membatalkan v1.1.112). Import JSON dan Kosongkan data tetap menjaga profil.
- **Data & Cadangan (v1.1.111):** halaman Data > Backup dibagi tiga bagian: Cadangkan (Export JSON, nama berkas memuat nama BUMDes, info cadangan terakhir), Pulihkan (Import JSON hanya mengganti data; nama, alamat, dan logo BUMDes tidak berubah) dan Kosongkan semua data (wajib mengetik KOSONGKAN; profil BUMDes, pengguna, dan pengaturan tetap; salinan lama disimpan sebagai cadangan lokal). "Reset data demo" menjadi "Isi data contoh" yang tersembunyi; ia juga tidak mengubah profil BUMDes.
- **Nama BUMDes seragam (v1.1.110):** nama di Profil BUMDes dan nama di awan (tabel `bumdes`) kini disamakan. Saat Siapkan BUMDes, nama yang diisi menjadi nama Profil; saat admin menyimpan Profil atau memuat data dari awan, nama awan ikut diperbarui.
- **Validasi Siapkan BUMDes (v1.1.109):** semua masalah isian tampil sekaligus di kotak merah yang menetap (tidak hilang seperti toast), kata sandi tidak terhapus saat gagal, ada ikon mata untuk menampilkan/menyembunyikan kata sandi (juga di layar Masuk), dan permintaan daftar punya batas waktu 25 detik.
- **SQL bertahap (v1.1.108):** semua berkas SQL pindah ke folder `sql/` dengan nama berurut: `00_semua`, `01_inti`, `02_akuntansi`, `03_pegawai`, `04_tabungan`, `05_penjualan`, `06_nasabah`, `07_pengguna`, dan `98_kosongkan_isi`, dan `99_reset`.
- **Satu aplikasi, satu database (v1.1.107):** model diubah menjadi 1 hosting = 1 proyek Supabase = 1 BUMDes. Peran developer, daftar BUMDes dan pemilih BUMDes dihapus (`supabase_developer.sql` dibuang). Pendaftar pertama lewat layar "Siapkan BUMDes" otomatis menjadi admin lalu penyiapan terkunci; `sql/99_reset.sql` mengosongkan database untuk mulai dari awal.
- **Cek peran akun (v1.1.106):** Setelan > Awan punya tombol "Cek peran akun" yang menyebut apakah akun developer platform, akun BUMDes biasa, atau pengecekan gagal. Galat pengecekan developer (mis. `supabase_developer.sql` belum terpasang) kini ditampilkan, tidak lagi diam-diam menganggap akun sebagai admin biasa.
- **Setelan > Awan beda untuk developer dan admin (v1.1.105):** akun developer melihat kartu Konsol Developer (buka halaman Developer, jumlah BUMDes klien, peran "Developer (platform)") tanpa Sinkron, Riwayat cadangan, Tabel relasional, dan pemilih BUMDes; akun admin/pengurus/pembaca melihat sinkron dan tabel BUMDes-nya tanpa konsol developer.
- **Setelan > Awan di desktop (v1.1.104):** dua kolom berdampingan (kiri: Sinkron, Riwayat cadangan, Tabel relasional; kanan: Koneksi, BUMDes di awan, Ganti kata sandi, Developer, Tentang awan), kartu Sinkron selebar kolom, label "Tabel relasional" tidak lagi menyebut Tahap 2 dan ada lencana status. Di HP tetap satu kolom.
- **Tabel relasional Tahap 5 (v1.1.103):** penjualan, rincian, pembayaran, produk, sambungan dan catatan meter Unit Air, jaminan, tarif dan pajak berversi, catatan penagihan, dan calon peminjam kini ikut disalin ke tabel Supabase (`sql/05_penjualan.sql`, berkas [5/9]) dengan pengecekan jumlah baris serta total penjualan, pembayaran, dan nilai jaminan. Berkas SQL kini 8.
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
| Modul (v0.1.039) | *Master > Unit Usaha* (sebelumnya Setelan > Modul): **Unit Air** dan **Gaji** bawaan **nonaktif** agar tampilan fokus ke Simpan Pinjam; dinyalakan lewat saklar. Menonaktifkan hanya menyembunyikan menu, navbar, kartu Dashboard, sub-tab Laporan Unit Air, dan Saldo Awal piutang pelanggan; data, jurnal, dan saldo tetap utuh. Data lama yang sudah berisi data Unit Air/Gaji tetap menyala saat dimuat (tidak hilang diam-diam). Dicatat di audit log |
| Setelan | Profil BUMDes dan pengaturan denda/jasa pelunasan: nama, alamat, kontak, direktur, bendahara, no. SK; tampil di menu, judul, dan kop dokumen cetak; **tempat penandatanganan** dicetak bersama tanggal dokumen di atas tanda tangan |
| Data | Export/Import JSON (divalidasi), Reset data demo, Periode + Tutup Buku Tahunan, **Audit Log** lengkap (filter aksi, entitas, tanggal, kata kunci; muat lebih banyak) |

Aksesibilitas (v0.1.030): tautan *Lewati ke konten*, fokus keyboard terlihat, label semua kolom terhubung, target sentuh 44px di mobile, dialog konfirmasi menjebak fokus dan menutup dengan Escape, kontras warna memenuhi WCAG AA di tema terang dan gelap.

**Fokus pengembangan: Simpan Pinjam** (integritas logika, mesin hitung, UI), lihat `docs/ROADMAP.md`. Belum ada: Pengiriman Unit Air dan ekspor PDF/XLSX. Rencana lengkap ada di `docs/ROADMAP.md`.

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

> Ini blueprint/prototype teknis, bukan penetapan kebijakan akuntansi atau hukum BUMDes. Keputusan yang harus final sebelum pembukuan riil ada di `docs/ROADMAP.md` (Gerbang Keputusan).

## Dokumen

| File | Isi |
|------|-----|
| `docs/SUMMARY.md` | Ringkasan blueprint, aturan sistem, dan status implementasi |
| `docs/ROADMAP.md` | Fase, todolist, gerbang keputusan, Definition of Done |
| `docs/CHANGELOG.md` | Riwayat rilis terbaru (v1.1.041 ke atas) |
| `docs/CHANGELOG_ARSIP.md` | Riwayat rilis lama (v1.1.040 ke bawah dan seri 0.1.NNN) |
| `tests/` | Uji logika (Node) dan UI (Playwright); lihat `tests/README.md` (hanya lokal, tidak diunggah ke Git) |


## Data dummy
`data/bumdes-data-dummy.json` — backup contoh siap impor; lihat `data/README.md` (hanya lokal, tidak diunggah ke Git).

## Struktur berkas dan alur kerja
Sejak v1.1.369 sumber ditata **per modul di `src/`** dengan nama berkas yang bermakna (kebab-case); hasil rakitannya tetap **satu halaman: `index.html`** (mandiri, di-host apa adanya di Vercel, GitHub Pages, Netlify).

```
index.html  sw.js  manifest.json  icons/  vercel.json   ← permukaan deploy (root)
src/        index.html (templat) · styles/main.css · core/ sistem/ akuntansi/ gaji/ simpan-pinjam/ pamsimas/ proyek/ perdagangan/
scripts/    build.js (perakit + pemeriksa)
sql/        01..09 + 00_semua.sql (dibangkitkan)
docs/       dokumentasi
tests/      logic/ ui/ checks/ gen/ sql/ + run.js, suite.js (hanya lokal)
```

Urutan skrip di `src/index.html` penting (semua berbagi satu lingkup global). Menambah berkas skrip: letakkan di folder modulnya, daftarkan di `src/index.html`, lalu `node scripts/build.js`.

| Berkas | Isi |
|---|---|
| `index.html` | **Aplikasi satu berkas**, hasil `node scripts/build.js`. Jangan diedit langsung |
| `sw.js`, `manifest.json`, `icons/`, `vercel.json` | PWA dan pengaturan Vercel (tetap di root agar bisa di-host) |
| `scripts/build.js`, `package.json` | Perakit/pemeriksa dan skrip dev |
| `sql/` | Skema Supabase; `00_semua.sql` dibangkitkan |
| `docs/` | `release_notes.md`, `CHANGELOG*.md`, `SUMMARY.md`, `ROADMAP*.md`, `SUPABASE.md`, blueprint |
| `tests/`, `data/` | Tes dan data dummy — **hanya lokal, tidak diunggah ke Git** |

**Peta nama lama → baru** (folder `src/`):

| Folder | Berkas (lama → baru) |
|---|---|
| `styles/` | `style.css` → `main.css` |
| `core/` | `config.js` → `config.js`; `accounting.js` → `penyimpanan-jurnal.js`; `layout.js` → `tata-letak.js`; `views.js` → `tampilan-utama.js`; `ui.js` → `pengendali-ui.js`; `uikit.js` → `kontrol-kustom.js`; `ui2.js` → `kepala-halaman.js`; `keyboard.js` → `keyboard-layar.js`; `detailpage.js` → `halaman-detail.js`; `modals.js` → `modal-data-master.js`; `gsearch.js` → `pencarian-global.js`; `pwa.js` → `pwa.js`; `app.js` → `mulai-aplikasi.js` |
| `sistem/` | `users.js` → `pengguna-peran.js`; `permissions.js` → `izin-aksi.js`; `approval.js` → `persetujuan.js`; `entry.js` → `masuk.js`; `cloud.js` → `awan-supabase.js`; `autobk.js` → `salinan-otomatis.js`; `health.js` → `kesehatan-data.js`; `modules.js` → `pengaturan-modul.js`; `closing.js` → `tutup-buku-audit.js`; `releases.js` → `catatan-rilis.js`; `releases-lama.js` → `catatan-rilis-lama.js` |
| `akuntansi/` | `reports.js` → `laporan-keuangan.js` |
| `gaji/` | `payroll.js` → `pihak-pegawai-gaji.js` |
| `simpan-pinjam/` | `loans.js` → `pinjaman.js`; `rates.js` → `tarif-biaya.js`; `flow.js` → `alur-pengajuan.js`; `savings.js` → `tabungan.js`; `share.js` → `ringkasan-nasabah.js`; `sod.js` → `pemisahan-tugas.js`; `collection.js` → `kolektibilitas-penagihan.js`; `restruct.js` → `restrukturisasi.js`; `spaudit.js` → `audit.js`; `calon.js` → `calon-peminjam.js`; `portal.js` → `portal-nasabah.js` |
| `pamsimas/` | `water.js` → `unit-air.js`; `water2.js` → `unit-air-lanjutan.js`; `waterpage.js` → `halaman-pelanggan.js` |
| `proyek/` | `proyek.js` → `proyek.js`; `pengadaan.js` → `rab-vendor.js`; `rfq.js` → `rfq.js`; `kontrak.js` → `kontrak.js`; `serah.js` → `serah-terima.js`; `bayar.js` → `pembayaran.js`; `pcfin.js` → `keuangan.js`; `pcgov.js` → `tata-kelola.js`; `pclap.js` → `laporan.js`; `pcalur.js` → `alur-pengadaan.js` |
| `perdagangan/` | `dagang.js` → `modul.js`; `dagangbeli.js` → `pembelian.js`; `dagangbeli2.js` → `pesanan-pembelian.js`; `dagangwh.js` → `gudang.js`; `dagangjual.js` → `penjualan.js`; `dagangpiutang.js` → `piutang-kasir.js`; `dagangkoreksi.js` → `koreksi.js`; `daganglaporan.js` → `laporan.js`; `daganglaporan2.js` → `analitik.js`; `dagangimpor.js` → `impor-produk.js`; `dagangimpor2.js` → `impor-transaksi.js`; `dagangkasir.js` → `struk-tutup-kasir.js`; `dagangcetak.js` → `cetak.js`; `dagangstok2.js` → `stok-lanjutan.js` |

**Deploy Git → Vercel:** unggah seluruh isi paket Git (semua berkas datar di root repo, tanpa `tests/` dan `data/`) ke GitHub; hubungkan repo ke Vercel (Framework Preset: *Other*). `vercel.json` sudah mengatur tanpa build dan folder keluaran `.`, jadi tidak perlu mengisi apa pun. Pada tiap commit Vercel men-deploy ulang.

**Hosting statis lain (unggah manual):** cukup unggah `index.html`, `sw.js`, `manifest.json`, ikon, dan `vercel.json`. Berkas sumber (`src/`, `scripts/`), `package.json`, dan dokumen tidak diperlukan agar aplikasi berjalan.

**Pasang sebagai aplikasi (PWA):** setelah di-host lewat https, pilih *Pasang aplikasi* di browser. Dari `file://` aplikasi tetap jalan tetapi tidak bisa dipasang.

**Alur pengembangan:** edit berkas sumber → `node scripts/build.js` (menyegarkan `index.html`) → `npm test` (cek sinkron + versi + daftar cache) atau `npm run test:cepat` (uji pra-rilis ±1,5 menit; butuh `tests/` lokal) dan `npm run test:lengkap` (semua uji termasuk seluruh uji UI). Saat menambah/ganti nama berkas skrip: ubah daftar `<script src>` di `src/index.html` (`sw.js` tidak perlu diubah: hanya menyimpan `index.html`, manifest, dan ikon).
