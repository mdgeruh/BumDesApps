# Changelog

Format mengikuti [Keep a Changelog](https://keepachangelog.com/) secara longgar. Skema versi `1.1.NNN` (naik satu tiap rilis) mulai v1.1.001; sebelumnya `0.1.NNN`. Rencana ke depan: `ROADMAP.md`.

## [1.1.372] — 2026-10-21

### Diubah
- Daftar gaji diringkas, rincian gaji menjadi halaman (Esc/Kembali), aksi per status di bilah bawah, filter daftar, pembayaran massal digabung ke kartu Proses massal.

## [1.1.371] — 2026-10-21

### Diubah
- Judul tab browser kini hanya nama BUMDes (tanpa nama aplikasi, versi, dan nama halaman); layar masuk juga.

## [1.1.370] — 2026-10-21

### Diubah
- Detail piutang/pelanggan/transaksi memakai dua kolom di layar lebar; ikon tombol dirapikan; Loket dirapikan.

## [1.1.369] — 2026-10-21

### Diubah
- Struktur berkas ditata ulang mengikuti praktik pengembangan web app: src/<modul>/, src/styles/, scripts/, tests/<jenis>/; index.html tetap satu berkas identik; peta nama lama→baru di README.

## [1.1.368] — 2026-10-21

### Diubah
- EX1: dlN() untuk backup, arsip audit, laporan, buku besar, audit log, gaji

## [1.1.367] — 2026-10-21

### Diubah
- KR3: teks peringatan modal > harga di ubin Kasir

## [1.1.366] — 2026-10-21

### Diubah
- RB3: approval.js; izin trx.setujui; db.approvals

## [1.1.365] — 2026-10-21

### Diubah
- TL18: style.css .card/h2 dirapikan; bukti gaya hitungan identik; check-css menjaga agar tidak dobel lagi

## [1.1.364] — 2026-10-21

### Diubah
- PL9: dagangwh.js (dg_wh, dg_tf)

## [1.1.363] — 2026-10-21

### Diubah
- PL8: dagangimpor2.js, sql/09_perdagangan.sql, tbl7 di cloud.js

## [1.1.362] — 2026-10-21

### Diubah
- PL7: kartu analitik di Laporan Perdagangan (daganglaporan2.js)

## [1.1.361] — 2026-10-21

### Diubah
- PL6: PO, terima sebagian, angkut dan diskon, bayar banyak nota, pengingat lonceng

## [1.1.360] — 2026-10-21

### Diubah
- Render sebagian Kasir; banner tipis; sidebar dapat diatur; Master multi-kolom

## [1.1.359] — 2026-10-21

### Diubah
- Perbaikan tumpang tindih kartu Backup; uji lengkap lulus

## [1.1.358] — 2026-10-21

### Diubah
- Kartu ringkasan Kasir menggantikan tombol Riwayat nota

## [1.1.357] — 2026-10-21

### Diubah
- Perbaikan kartu dan modal Riwayat nota Kasir

## [1.1.356] — 2026-10-21

### Diubah
- Kasir memakai daftar barang, bukan ubin

## [1.1.355] — 2026-10-21

### Diubah
- PIN penyelia untuk diskon di atas batas Kasir

## [1.1.354] — 2026-10-21

### Diubah
- Pelanggan toko dipisah dari pelanggan air; kartu Periksa harga

## [1.1.353] — 2026-10-21

### Diubah
- Optimalisasi halaman Tagihan Pamsimas setelah Perdagangan dipisah

## [1.1.352] — 2026-10-21

### Diubah
- Perbaikan: penjualan Perdagangan tidak lagi tampil di Pamsimas (Loket, tunggakan, WA piutang, laporan)

## [1.1.351] — 2026-10-21

### Diubah
- Kasir: perbaikan layar Pembayaran berhasil (render setelah penjualan tercatat), ketukan ganda diabaikan, peringatan modal lebih tinggi dari harga jual pada ubin

## [1.1.350] — 2026-10-21

### Diubah
- Kasir: baris barang lain/jasa berharga bebas tanpa stok (sale_items berlabel, tanpa HPP dan pergerakan stok), dapat dicampur dengan produk dan semua metode bayar

## [1.1.349] — 2026-10-21

### Diubah
- Pemilih tanggal dan bulan dapat diketik manual (kotak Ketik di popup dan ketik langsung dari tombol), dengan validasi tanggal dan batas

## [1.1.348] — 2026-10-21

### Diubah
- Kasir: pintasan papan ketik, baris Sering dibeli, peringatan stok menipis, struk WhatsApp, batas diskon kasir (atur di Perdagangan > Data)

## [1.1.347] — 2026-10-21

### Diubah
- Kasir: metode bayar Transfer dan QRIS (rekening, referensi), kredit dengan uang muka (DP), rincian per metode di ringkasan, riwayat, nota, dan Tutup kasir

## [1.1.346] — 2026-10-21

### Diubah
- Halaman Kasir: ringkasan hari ini, riwayat nota dengan struk dan batal, tahan/lanjutkan keranjang, pelanggan dipilih sejak awal dan tercatat pada penjualan tunai

## [1.1.345] — 2026-10-21

### Diubah
- Isian Kasir (uang diterima, diskon, catatan, uang fisik tutup kasir) tidak terbawa ke transaksi berikutnya: draf isian dihapus setelah transaksi selesai, saat Kosongkan, dan setelah tutup kasir

## [1.1.344] — 2026-10-21

### Diubah
- Tutup kasir harian menjadi dialog bertahap (Rekap, Hitung uang laci, Selesai) dengan selisih langsung, tombol Sesuai, dan cetak rekap; kas bawaan dipilih otomatis

## [1.1.343] — 2026-10-21

### Diubah
- Halaman Kasir: izin baru dagang.kasir untuk peran Kasir, lencana jumlah di ubin, jumlah dapat diketik, hapus per baris, panel Pesanan dirapikan, Tutup kasir dapat dilipat, galat di dekat tombol, dialog menutup saat pindah halaman, tampilan mobile lebih padat, nota tunai Tutup kasir konsisten dengan nominal

## [1.1.342] — 2026-10-21

### Diubah
- TL14: batas lebar 1760 px untuk semua halaman

## [1.1.341] — 2026-10-21

### Diubah
- TL13: Backup tersusun dalam grid baris sejajar

## [1.1.340] — 2026-10-21

### Diubah
- TL12: perbaikan nominal cepat Kasir, tombol Selesaikan, dan bilah aksi

## [1.1.339] — 2026-10-21

### Diubah
- TL11: kartu Backup mengalir seimbang dalam kolom

## [1.1.338] — 2026-10-21

### Diubah
- TL10: Setelan, Profil, Portal lebih rapi di layar lebar

## [1.1.337] — 2026-10-21

### Diubah
- TL9: Data > Backup tiga kolom; istilah awan diganti cloud

## [1.1.336] — 2026-10-21

### Diubah
- TL7-TL8: isi rata kiri dan lebih lebar; tombol aksi pindah ke kepala halaman di desktop

## [1.1.335] — 2026-10-21

### Diubah
- TL7: isi halaman rata kiri dengan batas lebar baru

## [1.1.334] — 2026-10-21

### Diubah
- TL6: uji regresi tata letak semua tab

## [1.1.333] — 2026-10-21

### Diubah
- TL5: batas lebar isian dan tombol di layar lebar

## [1.1.332] — 2026-10-21

### Diubah
- TL4: judul ganda disembunyikan di desktop; jejak tanpa lencana

## [1.1.331] — 2026-10-21

### Diubah
- Tab Perdagangan dirapikan: tanpa sub-tab Kasir, Penjualan dan Piutang menjadi tab (UV2d)

## [1.1.330] — 2026-10-21

### Diubah
- Tautan jejak halaman bergaya sendiri (UV2c)

## [1.1.329] — 2026-10-21

### Diubah
- Jejak halaman dapat diklik (UV2b)

## [1.1.328] — 2026-10-21

### Diubah
- UI v2 tahap 9 (UV9): uji regresi tampilan semua tab x 4 lebar, mode gelap

## [1.1.327] — 2026-10-21

### Diubah
- UI v2 tahap 8 (UV8): layar masuk dan portal nasabah

## [1.1.326] — 2026-10-21

### Diubah
- UI v2 tahap 7 (UV7): formulir dan dialog

## [1.1.325] — 2026-10-21

### Diubah
- UI v2 tahap 6 (UV6): sidebar dan header

## [1.1.324] — 2026-10-21

### Diubah
- UI v2 tahap 5 (UV5): tab dan bar filter

## [1.1.323] — 2026-10-21

### Diubah
- UI v2 tahap 4 (UV4): gaya tabel, daftar, lencana, dan tombol sekunder

## [1.1.322] — 2026-10-21

### Diubah
- UI v2 tahap 3 (UV3): kartu KPI dengan ubin ikon pastel, angka besar, dan garis aksen

## [1.1.321] — 2026-10-21

### Diubah
- UI v2 tahap 2 (UV2): kepala halaman desktop berisi judul besar, jejak halaman, dan area tombol aksi; judul header disembunyikan di desktop
- ui2.js baru (pgHead); tes ui-lebar.py memeriksa kepala halaman di desktop dan ponsel

## [1.1.320] — 2026-10-21

### Diubah
- UI v2 tahap 1 (UV1): token radius 16 px, bayangan lembut, kartu lebih lega, judul lebih tegas, kolom isian dan tombol membulat

## [1.1.319] — 2026-10-21

### Diperbaiki
- Kartu pilihan laporan: judul dan keterangan berlatar hijau karena kelas `.rt` bentrok dengan warna batang tren Pamsimas; aturan dipersempit ke `i.rt` dan `.rlg.rt` (juga `.rb`)
- Pengaman lebar halaman Data: kolom `.bkg` min-width 0, teks panjang tak terputus turun baris, `#ct` tidak melebar (overflow-x: clip)
- Pengaman lebar halaman Data: kolom `.bkg` min-width 0, teks panjang tak terputus turun baris, `#ct` tidak melebar (overflow-x: clip)

## [1.1.318] — 2026-10-21

### Diubah
- Lebar isi desktop per jenis halaman (1180 px untuk Dashboard/Setelan/Master/Profil, 1320 px untuk tabel dan modul operasional)
- Dashboard di layar 1500 px ke atas: dua kolom, Perlu perhatian di kolom kanan (menempel saat gulir)
- Bagian atas Dashboard dirapikan (aksi cepat ringkas, Atur tampilan dan periode sebaris)

### Diperbaiki
- Teks `preserveAspectRatio="none">` bocor di kartu Saldo Kas dan Bank (tanda petik di aria-label grafik)

## [1.1.317] — 2026-10-21

### Ditambah
- Halaman Perdagangan yang dicetak memakai kop, judul, tanggal, dan tanda tangan; tombol Cetak halaman ini; tombol aksi dan kisi Kasir tidak tercetak
- Cetak daftar stok bernilai dan katalog harga (A4)
- Pesan kaki struk yang dapat diatur; jam transaksi pada nota penjualan

### Diubah
- Lembar hitung opname: nomor, kolom isian berkotak, judul kolom berulang
- Struk: Jumlah dan Diskon sebaris
- tests/ui-cetak-pdf.py: 10 kasus Perdagangan baru

## [1.1.316] — 2026-10-20

### Ditambah
- Menu Kasir tersendiri di sidebar dan navigasi bawah, terpisah dari tab Perdagangan

## [1.1.315] — 2026-10-20

### Diubah
- Cetak struk Kasir: dari dialog Berhasil langsung mencetak (tanpa pratinjau struk dan halaman nota perantara), lalu kembali ke Kasir
- Dialog pembayaran menjadi dua langkah; Lewati struk menjadi Transaksi baru

## [1.1.314] — 2026-10-20

### Ditambah
- Halaman khusus kasir (#kasir) layar penuh dengan bar ringkasan hari ini
- Pembukaan lewat tombol Halaman kasir atau alamat langsung; ditolak bila modul nonaktif atau tanpa izin Perdagangan kelola

## [1.1.313] — 2026-10-20

### Ditambah
- Kasir: perbaikan struk, kas bawaan, lembar pesanan ponsel

## [1.1.312] — 2026-10-20

### Diubah
- Halaman Jual > Kasir: judul "Kasir" yang sama dengan tab disembunyikan (hanya tampil di layar penuh)
- Tombol Layar penuh tidak ganda saat layar penuh aktif (tersisa tombol Keluar layar penuh di atas)
- Ponsel: tombol di bilah ringkasan menjadi Bayar (sebelumnya Pesanan, yang menggulir ke panel)

## [1.1.311] — 2026-10-19

### Diubah
- Kasir (Perdagangan) memakai tampilan dua panel: kartu produk per kategori dengan stok di kiri, panel pesanan di kanan (di ponsel bertumpuk dengan bilah ringkasan)
- Pembayaran bertahap dalam satu jendela: Pembayaran, Berhasil, Cetak struk, Transaksi baru
- Produk berstok habis dinonaktifkan; stok di bawah minimum ditandai merah
- Tidak ada perubahan pada logika penjualan, stok, jurnal, tutup kasir, dan struk

## [1.1.310] — 2026-10-17

### Ditambah
- Perbaikan impor cadangan: deteksi berkas terpotong

## [1.1.309] — 2026-10-17

### Ditambah
- Opname bersesi, usulan pembelian, satuan ganda, riwayat harga beli, kedaluwarsa

## [1.1.308] — 2026-10-17

### Ditambah
- Struk, tutup kasir harian, pindai kamera, layar penuh

## [1.1.307] — 2026-10-17

### Ditambah
- Diskon, harga bertingkat, catatan, batas kredit, bayar sebagian, kuitansi

## [1.1.306] — 2026-10-17

### Ditambah
- Perdagangan PL1: sub-tab berkelompok lima (kunci S.dgv dan alamat tidak berubah), preset periode Laporan, filter kategori dan Tampilkan semua di Kasir, tombol Retur dari rincian penjualan dan pembelian.
- Piutang penjualan toko dikeluarkan dari piu() dan lkParts() sehingga Loket Pamsimas hanya menampilkan tunggakan Pamsimas.
- Uji logic-234 (26 pemeriksaan) dan alur UI di ui-dagang.py.

## [1.1.305] — 2026-10-17

### Ditambah
- Perbaikan Perdagangan hasil pemeriksaan halaman: tabel Laporan terlihat (kelas pembungkus dgtw menggantikan po yang tersembunyi), kartu Tahap pengembangan dihapus, Stok menipis di Laporan termasuk barang habis, pemilih berkas CSV tidak ganda (kelas uh), kolom Margin dan HPP disembunyikan di ponsel, label umur piutang 0–30 hari, data contoh dengan 97% piutang terbayar.
- Bagian baru 1.1d di ROADMAP: tahap lanjutan PL1–PL8.
- Uji: regresi tabel Laporan terlihat (logic-231, ui-dagang.py), pemilih berkas, ui-modul 4 saklar, path uji UI relatif.

## [1.1.304] — 2026-10-17

### Ditambah
- Perdagangan PD8: impor produk dan stok awal dari CSV (pratinjau konfirmasi, duplikat dilewati), data contoh toko desa setahun di unit sendiri (UNIT-DGDEMO) yang dapat dihapus utuh, penyimpanan ditunda selama pembuatan data massal.
- Panduan pengguna docs/PANDUAN_PERDAGANGAN.md.
- Uji logic-233 (26 pemeriksaan) dan alur UI di ui-dagang.py.

## [1.1.303] — 2026-10-17

### Ditambah
- Perdagangan PD7, Ringkasan: blok Perlu tindakan (stok menipis/habis, piutang lebih dari 30 hari, utang jatuh tempo ≤ 7 hari/terlambat) dengan tautan ke sub-tab, tren penjualan 6 bulan, tombol cepat Kasir, Pembelian baru, Piutang (disembunyikan untuk Pengawas).
- Uji logic-232 (11 pemeriksaan) dan alur UI di ui-dagang.py.

## [1.1.302] — 2026-10-17

### Ditambah
- Perdagangan PD6, sub-tab Laporan: laba rugi unit dari jurnal (tanpa jurnal penutup), penjualan per produk dan per bulan dari sales dan sale_items dikurangi retur, terlaris dan lambat, nilai persediaan, umur piutang (nota) dan umur utang (jatuh tempo), stok menipis.
- Filter tanggal dan unit; Cetak dan Unduh CSV (enam bagian).
- Uji logic-231 (18 pemeriksaan) dan alur UI di ui-dagang.py.

## [1.1.301] — 2026-10-17

### Ditambah
- Perdagangan PD5, sub-tab Koreksi: stok opname (jenis jurnal opname; Dr 5910 / Cr 1500 untuk kurang, Dr 1500 / Cr 5910 untuk lebih), retur penjualan (jenis retur_jual; Dr pendapatan / Cr kas atau 1400 plus Dr 1500 / Cr 5900), retur pembelian (jenis retur_beli; Dr kas atau 2100 / Cr 1500). Mutasi stok kind opname, retjual, retbeli.
- Retur yang mengurangi piutang atau utang tercatat sebagai pembayaran bertanda retur dan hanya dibatalkan lewat Koreksi.
- Penjualan atau pembelian dengan retur aktif tidak bisa dibatalkan; jurnal opname dan retur tidak bisa dibatalkan dari menu Transaksi.
- Uji logic-230 (44 pemeriksaan) dan alur UI di ui-dagang.py.

## [1.1.300] — 2026-10-17

### Ditambah
- Perdagangan PD4, sub-tab Piutang: pelanggan berutang (jumlah nota, nota tertua, umur, total), cari pelanggan, terima pembayaran penuh beberapa nota sekaligus (satu pembayaran dan satu jurnal per nota, dapat dibatalkan satu per satu) dengan kuitansi gabungan (`kuitg`).
- Perdagangan PD4, sub-tab Kasir: cari/pindai kode, keranjang +/−, cek stok, tunai dengan uang diterima dan kembalian (tidak dijurnal) atau kredit; memakai simpan penjualan PD3 sehingga HPP tetap otomatis; cetak nota terakhir.
- Piutang penjualan toko disaring dari daftar Pamsimas > Piutang.
- Uji `logic-229` (28 pemeriksaan) dan alur UI di `ui-dagang.py`.
- Keterbatasan: total piutang per pelanggan di Loket Pamsimas masih menjumlahkan utang toko bila pelanggannya sama.

## [1.1.299] — 2026-10-17

### Ditambah
- Perdagangan PD3: penjualan banyak barang dari satu unit dagang, tunai (Dr kas/bank, Cr 4300) atau kredit (Dr 1400 Piutang, Cr 4300); pelanggan opsional untuk tunai, wajib untuk kredit. Memakai tabel `sales`, `sale_items`, `payments` yang sama dengan Pamsimas (`sale.dagang`) dan nomor penjualan bersama.
- HPP otomatis rata-rata bergerak: jurnal terpisah jenis `hpp_jual` (Dr 5900 Harga Pokok Penjualan, Cr 1500 Persediaan) dan mutasi stok jenis `jual`; menjual seluruh stok menghabiskan nilainya tepat nol. Penjualan melebihi stok (termasuk gabungan baris keranjang) ditolak.
- Rincian penjualan: HPP per barang, laba kotor, Nota, terima dan batalkan pembayaran piutang, batalkan penjualan (jurnal penjualan dan HPP dibalik, mutasi stok dibatalkan; ditolak bila ada pembayaran aktif).
- Penjualan bulan ini: penjualan, laba kotor, piutang; Ringkasan memuat laba kotor bulan ini.
- Penjualan dan produk unit Perdagangan tidak lagi bisa dijual atau dibatalkan lewat form Pamsimas (produk disaring dari daftar layanan Pamsimas); jurnal penjualan dan HPP tidak bisa dibatalkan dari menu Transaksi. Penjualan lama di unit dagang (tanpa HPP) tetap tampil dan dapat dibatalkan.
- Diskon belum tersedia di penjualan Perdagangan. Piutang dagang masih tampil juga di Pamsimas > Piutang bila filter unit "semua" (disatukan lebih lanjut di PD4).
- Uji `logic-228` (38 pemeriksaan) dan alur UI di `ui-dagang.py`.

## [1.1.298] — 2026-10-17

### Diperbaiki
- Form Pembelian baru (PD2): isian produk, jumlah, dan harga tidak dikosongkan setelah Tambah barang, sehingga ketukan berulang menambah baris yang sama berkali-kali (dilaporkan pengguna lewat tangkapan layar). Kini isian dikosongkan seperti form penjualan Pamsimas, dan barang yang sama dengan harga yang sama digabung menjadi satu baris (jumlah dijumlahkan).
- Uji: `logic-227` (barang sama digabung, harga beda terpisah) dan `ui-dagang.py` (isian dikosongkan di browser).

## [1.1.297] — 2026-10-17

### Ditambah
- Perdagangan PD2: pembelian banyak barang dari pemasok (pihak jenis Pemasok), tunai (Dr 1500 Persediaan, Cr kas/bank, saldo kas dicek) atau kredit (Cr 2100 Utang, jatuh tempo dalam hari); nomor `BL-tahun-urut`; koleksi data baru `purchases` dan mutasi stok jenis `beli`.
- Harga beli rata-rata bergerak: harga beli produk diperbarui dari nilai dibagi jumlah stok setiap pembelian.
- Bayar utang pemasok (Dr 2100, Cr kas/bank; tidak boleh melebihi sisa atau mendahului tanggal pembelian), batalkan pembayaran, batalkan pembelian (ditolak bila stok sudah berkurang atau ada pembayaran aktif). Transaksi pembelian tidak dapat dibatalkan dari menu Transaksi.
- Jenis transaksi baru: Pembelian Tunai, Pembelian Kredit, Bayar Utang Usaha; entitas audit `purchase`.
- Daftar pembelian dengan pencarian dan total utang usaha di sub-tab Pembelian dan Ringkasan.
- Uji `logic-227` (38 pemeriksaan) dan alur UI di `ui-dagang.py`. Cermin tabel relasional awan untuk `purchases` belum dibuat.

## [1.1.296] — 2026-10-17

### Ditambah
- Perdagangan PD1: katalog produk dagang (kode otomatis DGP001, satuan, kategori, harga beli dan jual, stok minimum), daftar stok dengan pencarian, lencana Menipis dan Habis, nonaktifkan produk (stok harus nol).
- Stok awal per produk dengan jurnal Debit 1500 Persediaan, Kredit 3100 Modal BUMDes (jenis transaksi baru "Stok Awal Barang"); hanya sekali per produk, bisa dibatalkan (jurnal dibalik) selama belum ada mutasi lain. Transaksi stok awal tidak dapat dibatalkan dari menu Transaksi.
- Koleksi data baru `stock_moves` (mutasi stok bertanda, nilai per mutasi) dan kartu stok per produk dengan saldo berjalan.
- Ringkasan: nilai persediaan dan jumlah stok menipis; tab Data: kecocokan nilai stok dengan saldo akun 1500 unit dagang.
- Asumsi sementara Gerbang PD-K (dapat diubah pengurus): nilai persediaan rata-rata bergerak, satu gudang per unit, satu tingkat harga jual.
- Uji `logic-226` (33 pemeriksaan) dan alur UI di `ui-dagang.py`. Cermin tabel relasional awan untuk `stock_moves` belum dibuat (ikut snapshot awan dan backup).

## [1.1.295] — 2026-10-17

### Ditambah
- Modul Perdagangan, tahap PD0 (fondasi): saklar modul (bawaan nonaktif), tab Perdagangan di grup Operasional (alamat `/perdagangan`) dengan sub-tab Ringkasan, Penjualan, Stok, Pembelian, Data; berkas baru `dagang.js`.
- Izin `dagang.kelola` (mencakup `dagang.lihat`) dan `dagang.lihat`; peran bawaan: Bendahara dan Petugas Unit mengelola, Pengawas melihat (peran yang sudah tersimpan diatur lewat matriks izin).
- Akun `5900 Harga Pokok Penjualan` dan `5910 Selisih Stok` dibuat saat modul diaktifkan (kode 5100 sudah dipakai Beban Gaji, jadi tidak sama dengan blueprint awal). Belum ada jurnal atau stok yang berubah.
- Jenis unit Perdagangan kini punya modul: saran "Aktifkan modul" dan "Tambah unit" di kartu kecocokan unit dan modul.
- Uji `logic-225` (38 pemeriksaan).

## [1.1.294] — 2026-10-17

### Ditambah
- DU3: label "Belum ada modul" untuk unit jenis Lainnya (daftar, rincian, dan kartu Unit tanpa modul di Modul Unit Usaha).
- Hapus unit usaha yang masih kosong (dengan konfirmasi dan audit); unit yang dipakai transaksi, jurnal, pinjaman, penjualan, produk, pegawai, sambungan, proyek, atau gaji hanya dapat dinonaktifkan. Unit Simpan Pinjam atau Pamsimas terakhir tidak dapat dihapus.

## [1.1.293] — 2026-10-17

### Diubah
- Unit Perdagangan tidak lagi dibuat otomatis (bawaan hanya Simpan Pinjam dan Pamsimas); unit perdagangan dibuat sendiri lewat Setelan > Unit Usaha (jenis Perdagangan). Data contoh diperbarui dan ada berkas data setahun penuh baru; tombol SP1/SP2/Putus di Calon Putus dan tombol aksi Pengaduan kini berjajar rapi (Simpan Pinjam, Pamsimas, Jasa dan Proyek; tanpa Perdagangan dan Wisata Desa).

## [1.1.292] — 2026-10-17

### Diubah
- Putus dan sambung kembali: riwayat status per sambungan, biaya sambung kembali otomatis (opsional, piutang akun 4220), dan tagihan ditolak untuk sambungan yang sedang diputus.

## [1.1.291] — 2026-10-17

### Diubah
- Janji bayar pada piutang Pamsimas: tanggal dan catatan dari halaman detail piutang, lencana Janji di daftar, filter Ada janji bayar, dan peringatan Perlu tindakan di Ringkasan saat janji jatuh tempo.

## [1.1.290] — 2026-10-17

### Diubah
- Daftar Pelanggan: filter (aktif, nonaktif, menunggak, tanpa telepon), tombol Detail ke sambungan pelanggan, dan Impor CSV (nama, telepon, alamat) dengan konfirmasi dan pelewatan duplikat.

## [1.1.289] — 2026-10-17

### Diubah
- Laporan Ringkasan Pamsimas: kartu umur tunggakan per pelanggan (belum jatuh tempo, 1–30, 31–60, lebih dari 60 hari) dan baris CSV-nya; rekap per golongan dan per dusun/alamat sudah ada sebelumnya.

## [1.1.288] — 2026-10-17

### Diubah
- Tab Pamsimas muat di layar 320 px, kolom cari di Biaya dan Pengaduan, serta pencarian pelanggan global di Ringkasan (langsung ke Loket atau Detail).

## [1.1.287] — 2026-10-17

### Diubah
- Ringkasan Pamsimas: blok Perlu tindakan (belum dibaca, lewat jatuh tempo, pengaduan baru), tombol cepat Baca Meter/Loket/Cetak tunggakan, dan tren tagihan vs terkumpul 6 bulan.

## [1.1.286] — 2026-10-17

### Diubah
- Cetak/bagikan daftar tunggakan (per pelanggan dan keseluruhan, PDF dan WhatsApp) dan kuitansi gabungan di Loket untuk beberapa tagihan sekaligus; sudah termasuk PM1 (v1.1.285).

## [1.1.285] — 2026-10-17

### Diubah
- Tab Layanan Lain hanya berisi penjualan layanan di luar tagihan air dan saldo awal (kartu Penjualan Layanan Lain, dengan pencarian nama atau nomor). Halaman detail piutang kini punya tombol Batalkan tagihan atau penjualan (jurnal pembalik) di samping Cetak dan Struk; tagihan yang dibatalkan ditandai Dibatalkan tanpa form pembayaran.

## [1.1.284] — 2026-10-16

### Diubah
- Setelah menerima pembayaran dari halaman detail piutang, aplikasi tetap di halaman itu dan menampilkan bagian Pembayaran tercatat (tanggal, jumlah, denda) dengan tombol Kuitansi (cetak) dan Batalkan, sehingga pembayaran bisa dicetak atau dibatalkan langsung. Riwayat Pembayaran dipindah dari bawah daftar Piutang ke tab sendiri, Riwayat Bayar (grup Tagihan, alamat #/pamsimas/riwayat-bayar), dengan pencarian nama atau nomor tagihan.

## [1.1.283] — 2026-10-16

### Diubah
- Detail piutang dan Loket kini berupa halaman sendiri (dengan tombol Kembali dan Esc), bukan dialog atau panel di bawah daftar. Daftar Piutang dikelompokkan per pelanggan (satu baris dengan jumlah tagihan, total, dan lencana terlambat; pelanggan dengan beberapa tagihan membuka Loket-nya) dengan pilihan tampilan Per tagihan dan urutan Terbaru, Tertua, Terbesar, atau Terlambat dulu. Loket mengingat rekening kas terakhir, dan Enter di pencarian langsung membuka pelanggan pertama. Setelah pembayaran dari halaman detail, aplikasi kembali ke daftar.

## [1.1.282] — 2026-10-16

### Diubah
- Header tidak lagi meluap di layar sempit (320–400px): chip pengguna menjadi avatar saja di ≤400px, tombol dan nama unit dirapatkan di ≤340px, angka besar Dashboard mengecil. Uji baru ui-sempit.py (320 dan 360px, mode pengguna aktif, semua menu). F6 data-act tetap ditunda.

## [1.1.281] — 2026-10-16

### Diubah
- Form Ganti kata sandi dihapus dari Backup (ganti sandi lewat Profil); Isi data contoh dihapus dari kartu Kosongkan data; Pemeriksaan kesehatan data hanya untuk Admin Sistem; konfirmasi impor menampilkan nama berkas, versi aplikasi, dan tanggal pembuatan cadangan.
- Data > Backup disederhanakan untuk pengguna akhir: kolom tempel JSON dihapus (impor hanya lewat pilih berkas; layar Lupa PIN sama), dan di Pengaturan lanjutan awan bagian Koneksi (bila diatur di config.js), Tentang awan, dan petunjuk SQL disembunyikan.

## [1.1.280] — 2026-10-16

### Diubah
- Layar masuk pengguna kini bercover seperti halaman masuk awan (panel nama BUMDes dan versi, kartu Masuk; desktop dua kolom), termasuk layar buat PIN baru.
- Layar masuk memakai kolom Username dan PIN; daftar nama pengguna tidak lagi ditampilkan kepada siapa pun yang membuka aplikasi.
- Username dibuat otomatis dari nama untuk akun yang sudah ada (misalnya Kadek Surya menjadi kadek.surya; nama kembar diberi nomor); admin dapat mengubahnya di Edit pengguna. Aturan: 3–20 karakter huruf kecil, angka, titik, garis bawah, atau strip; unik.
- Pesan gagal masuk untuk username tak dikenal atau akun nonaktif dibuat umum (Username atau PIN salah) agar tidak membocorkan akun; pembatasan percobaan PIN tetap berlaku.
- Username tampil di daftar pengguna dan halaman Profil.
- Uji logic-224.js.

## [1.1.279] — 2026-10-16

### Diubah
- Tombol Keluar di header dihapus; Keluar tersedia di halaman Profil (dibuka lewat avatar di header). Header lebih lega di layar sempit dan tidak lagi mudah salah tekan.

## [1.1.278] — 2026-10-16

### Diubah
- Kartu Akun saya di Pengguna & Peran dihapus karena profil sudah dibuka lewat ikon di header.
- Avatar di header memakai warna avatar pilihan akun yang masuk (sebelumnya selalu hijau), sama dengan halaman Profil.

## [1.1.277] — 2026-10-16

### Diubah
- Layar masuk awan dan deskripsi halaman (meta description) memakai nama dan versi aplikasi "Sistem Bumdes Multi Unit V<versi>" secara dinamis; judul tab, sidebar, manifest, dan backup sudah mengikuti sebelumnya.

## [1.1.276] — 2026-10-16

### Diubah
- Berkas backup JSON kini memuat meta.app "Sistem Bumdes Multi Unit" dan meta.version sesuai versi aplikasi (sebelumnya "bumdes-mvp" dan 1); distempel otomatis saat simpan dan ekspor, backup lama tetap bisa diimpor.

## [1.1.275] — 2026-10-16

### Diubah
- Izin peran kini dipilih per peran (chip peran, lalu daftar izin dengan kotak centang) sehingga terbaca di HP; matriks semua peran dipindah ke bagian Tampilkan matriks.
- Tombol pembuatan pengguna dari pegawai menyebut PIN 123456 (sebelumnya 1234) dan tidak lagi meluap di layar sempit.
- Uji ui-peran.py.

## [1.1.274] — 2026-10-16

### Diubah
- Halaman Profil tidak lagi menampilkan email, peran akun awan, dan nama BUMDes akun awan kepada semua pengguna; hanya pengguna dengan izin Kelola setelan (Admin Sistem) yang melihatnya. Uji logic-223 diperluas.

## [1.1.273] — 2026-10-16

### Ditambah
- Uji ui-tataletak.py membandingkan posisi dan ukuran elemen utama 11 halaman pada 3 lebar layar dengan baseline (toleransi 12 px).
- Nama aplikasi menjadi "Sistem Bumdes Multi Unit V<versi>": judul tab, sidebar, layar masuk, dan manifest PWA (dicap otomatis oleh build.js; build.js --check ikut memeriksa).
- PIN bawaan semua pengguna baru dan semua berkas data contoh menjadi 123456 (sebelumnya 1234 dan 246813).
- Pembuat data baru tests/gen-setahun.js melengkapi backup sampai setahun penuh (Jan–Okt): tagihan air, penjualan, tabungan, gaji, dan PIN 123456 untuk pengguna dan nasabah portal. gen-mertha ikut mencakup Jan–Sep dan penjualan kini wajib memilih pelanggan.
- Uji logic-223.js.

## [1.1.272] — 2026-10-16

### Ditambah
- Palet perintah: pencarian global (tombol cari atau /) kini juga menjalankan perintah: Buka menu, Catat penerimaan/pengeluaran, Tema, Unduh backup, Periksa kesehatan data; hanya yang boleh dibuka akun itu.
- Profil: kartu Tampilan (tema dan warna avatar enam pilihan) dan kartu Sesi dan riwayat masuk (masuk, keluar, gagal masuk, PIN diganti).
- Istilah seragam: Export/Import menjadi Ekspor/Impor di seluruh tampilan; pemeriksaan otomatis check-bahasa mencegah istilah Inggris kembali.

## [1.1.271] — 2026-10-16

### Ditambah
- Uji otomatis lima lebar layar (320, 360, 390, 768, 1280 px) untuk 11 halaman utama; memperbaiki kartu Dashboard, Ringkasan Bulan Ini, pilihan laporan, dan Neraca Saldo yang meluap ke samping di layar 320 px.

## [1.1.270] — 2026-10-16

### Ditambah
- Semua tabel di aplikasi: judul kolom bisa diklik (atau Enter) untuk mengurutkan naik/turun, baris Total tetap di bawah; tabel 12 baris ke atas punya kotak pencarian dan jumlah baris, serta bergulir di dalam kotaknya dengan judul kolom menempel.
- Diuji dengan 5.000 transaksi: Dashboard pertama kali sekitar 35 ms, berikutnya dari cache; daftar Transaksi hanya menggambar 30 baris.

## [1.1.269] — 2026-10-16

### Diubah
- Tombol ciut/buka dan lihat semua pada kartu Perlu perhatian kini berupa ikon panah tanpa label (label tetap ada untuk pembaca layar dan tooltip).

## [1.1.268] — 2026-10-16

### Ditambah
- Kartu Perlu perhatian punya tombol Ciutkan/Buka daftar dan Lihat semua/Tampilkan 3 teratas; bawaan tetap tiga teratas.

## [1.1.267] — 2026-10-16

### Ditambah
- Kurva Tren di Dashboard punya filter periode 3, 6, 12, atau 24 bulan terakhir; judul, total, tabel angka, dan titik sentuh mengikuti, label sumbu dijarangkan untuk periode panjang.

## [1.1.266] — 2026-10-16

### Diperbaiki
- Kartu Perlu perhatian di Dashboard menampilkan keterangan notifikasi dengan benar (sebelumnya tag HTML tampil sebagai teks, mis. pada tunggakan pinjaman).

## [1.1.265] — 2026-10-16

### Ditambah
- Perhitungan Dashboard (laba rugi, kas 30 hari, pola transaksi, transaksi terakhir) disimpan di cache dan dihitung ulang hanya saat data berubah.

## [1.1.264] — 2026-10-16

### Ditambah
- Tombol Atur tampilan di Dashboard untuk menyembunyikan bagian yang tidak diperlukan; pilihan tersimpan per perangkat.

## [1.1.263] — 2026-10-16

### Ditambah
- Kartu Saldo Kas & Bank menampilkan garis tren saldo 30 hari terakhir; berwarna merah bila saldo turun.

## [1.1.262] — 2026-10-16

### Ditambah
- Kartu Perlu perhatian di Dashboard menampilkan tiga notifikasi teratas (kesalahan lebih dulu) dengan tombol langsung dan tautan ke lonceng bila lebih banyak.

## [1.1.261] — 2026-10-16

### Ditambah
- Dashboard punya pemilih periode (Semua, Bulan ini, Bulan lalu, Tahun ini, Rentang tanggal) untuk kartu Pendapatan, Beban, Laba, dan Laba Rugi per Unit.

## [1.1.260] — 2026-10-16

### Ditambah
- Kartu Total Kas & Bank menampilkan selisih terhadap 30 hari lalu dan tanda peringatan bila turun lebih dari 20%; kartu Laba/Rugi menampilkan selisih terhadap bulan lalu.

## [1.1.259] — 2026-10-16

### Ditambah
- Angka Ringkasan Bulan Ini (pendapatan, beban, laba, transaksi) dan bulan di tabel Tren 6 Bulan membuka Laba Rugi atau Transaksi pada bulan itu dengan rentang tanggal terisi.

## [1.1.258] — 2026-10-16

### Ditambah
- Dashboard punya kartu Tagihan Pamsimas bulan berjalan (total, persen terkumpul, jumlah tagihan) yang membuka tab Ringkasan Pamsimas; kartu tidak tampil bila modul Pamsimas mati.

## [1.1.257] — 2026-10-16

### Ditambah
- Setelan > Profil punya kartu Tampilan dan perangkat: tema Ikuti sistem, Terang, atau Gelap (tersimpan di perangkat), versi aplikasi, tombol Periksa pembaruan dan Muat ulang.
- Bila versi baru terpasang saat aplikasi terbuka, muncul spanduk dengan tombol Muat ulang; halaman tidak dimuat ulang paksa agar isian yang sedang diketik aman.
- Aplikasi meminta penyimpanan persisten ke browser dan menampilkan statusnya; bila belum persisten, ada peringatan agar rutin mengunduh backup.

## [1.1.256] — 2026-10-15

### Ditambah
- Tab baru Ringkasan (paling kiri) memuat kartu angka kunci Pamsimas: pelanggan aktif, tagihan, terkumpul, piutang, dan air tak berekening. Kartu tidak lagi ditumpuk di atas tab lain, jadi tab kerja langsung terlihat.
- Pamsimas kini terbuka di Ringkasan (kecuali awal bulan dengan tagihan terlambat, langsung ke Piutang). Kartu tetap bisa ditekan menuju tab terkait.
- Tab grup diperkecil sedikit di HP agar lima tab muat tanpa digeser.

## [1.1.255] — 2026-10-15

### Diubah
- Angka pada sub-tab kembali berupa lencana penuh seperti di lonceng: merah untuk yang perlu ditindak, kuning untuk yang menunggu, hijau pada tab aktif, abu-abu pada tab lain.

## [1.1.254] — 2026-10-15

### Diubah
- Sub-tab di semua halaman kini bergaya tab map: tab abu-abu, tab aktif putih dengan teks tebal, dan angka berwarna aksen tanpa lencana bulat (merah/kuning tetap menandai yang perlu ditindak).

## [1.1.253] — 2026-10-15

### Diubah
- Lencana tab: merah/kuning hanya untuk yang perlu ditindak. Baca Meter menampilkan sisa 'belum N' (kuning); hitungan netral dihapus.
- Sambungan dipindah ke grup Data; Loket ke grup Tagihan; Pengaturan diganti nama menjadi Tarif & Aturan.
- Sub-tab kini berbentuk pil dan menempel di bawah header saat menggulir; grup dan sub-tab lebih mudah dibedakan.
- Pamsimas membuka grup yang paling relevan dan mengingat sub-tab terakhir tiap grup; tombol cepat Loket pembayaran di Baca Meter.

## [1.1.252] — 2026-10-15

### Dihapus
- `views.js`: `vHariIni()` dan pemanggilannya di Dashboard; `style.css`: `.card.hri`; `tests/ui-hariini.py`. `tests/logic-215.js` tinggal menguji notifikasi termin.

## [1.1.251] — 2026-10-15

### Diubah
- `detailpage.js`: `tdPage`, `tdBack`, `vTdPage`, Esc; `modals.js`: `mdOpen('td')` membuka halaman; `closing.js`, `layout.js`, `users.js`: render, navigasi, tombol +, keluar mengenali `S.tdp`; `views.js`: setelah ubah transaksi, halaman pindah ke transaksi baru.
- `tests/ui-trx.py`, `tests/ui-form.py` disesuaikan; `tests/ui-detailtrx.py` baru.

## [1.1.250] — 2026-10-15

### Diubah (tanpa perubahan perilaku)
- `releases.js` (40 rilis terbaru) dan `releases-lama.js` (sisanya, `RELEASES_LAMA`); `water.js` dipecah menjadi `water.js`, `water2.js` (biaya, meter induk, calon putus dan pengaduan, tarif air, loket, daftar kerja), `waterpage.js` (halaman detail pelanggan, mode lapangan). `index.src.html` memuat berkas baru berurutan.

## [1.1.249] — 2026-10-15

### Ditambah
- `views.js`: `demoClear`, petunjuk dan tombol pada `vOnb`; `accounting.js`: `demo()` mencatat `meta.demo_ids`; `closing.js`: konfirmasi `demoClear`.
- `tests/logic-218.js`, `tests/ui-contoh.py`.

## [1.1.248] — 2026-10-15

### Ditambah
- `water.js`: `wfStart`, `wfSkip`, `wfLeft`, `wfBar`; `vWdPage` memakai kelas `wdf` pada mode lapangan; `layout.js`: `go()` mengakhiri mode; `permissions.js`: izin `air.kelola`; gaya `.wfb`, `.wdf`.
- `tests/ui-lapangan.py`.

## [1.1.247] — 2026-10-15

### Ditambah
- `share.js`: `arqIds`, `arqStart`, `arqSend`, `arqSkip`, `MD.arq`; tombol di `water.js` (Piutang); `permissions.js`: izin `air.kelola`.
- `tests/logic-217.js`, `tests/ui-bergilir.py`.

## [1.1.246] — 2026-10-15

### Ditambah
- `layout.js`: `sigImgs`, `sigSet`, `sigDel`, `setSigOn`, `sigPick`, `sigCard`; `sig()` mencetak gambar di atas nama Direktur/Bendahara dan stempel; `permissions.js`: tiga fungsi baru dijaga izin Setelan; gaya `.sgx`.
- `tests/logic-216.js`, `tests/ui-ttd.py`.

## [1.1.245] — 2026-10-15

### Ditambah
- `views.js`: `vHariIni()` pada Dashboard; `layout.js`: notifikasi termin proyek belum dibayar, tombol cari terpisah (`#gsb`).
- `tests/logic-215.js`, `tests/ui-hariini.py`.

## [1.1.244] — 2026-10-15

### Ditambah
- `gsearch.js`: `gsRun`, `gsOpen`, `gsClose`, `gsGo`, pintasan / dan Ctrl+K; tombol cari di `layout.js` (ikon `search`); gaya `#gs` di `style.css`.
- `tests/ui-cari.py`.

## [1.1.243] — 2026-10-15

### Ditambah
- `health.js`: `hcRun`, `hcGo`, `hcFix`, `hcCard`; konfirmasi `hcFix` di `closing.js`; kartu di Data > Backup.
- `tests/logic-214.js`, `tests/ui-kesehatan.py` (data contoh lengkap tidak menghasilkan temuan palsu).

## [1.1.242] — 2026-10-15

### Ditambah
- `autobk.js`: salinan otomatis berkala di IndexedDB (`abkSnap`, `abkTick`, `abkNow`, `abkAsk`, `abkDl`, `abkCard`), 5 terbaru, pemulihan lewat konfirmasi impor yang sudah ada.
### Diubah
- `closing.js`: pengingat backup berat (>= 3x interval) tanpa tombol Nanti. `views.js`: kartu di Data > Backup. `app.js`: salinan dicek 1,5 detik setelah dibuka dan saat tab kembali aktif.
- `tests/ui-abk.py`.

## [1.1.241] — 2026-10-15

### Diubah
- `accounting.js`: `save()` adaptif (`saveNow`, `saveFlush`, penggabungan 300 ms bila tulis >60 ms; kembali langsung bila <25 ms); tulis tuntas pada `pagehide`, `beforeunload`, `visibilitychange`.
- `tests/logic-213.js`: uji mode cepat/lambat, flush, beban 20.000 transaksi.

## [1.1.240] — 2026-10-15

### Diubah
- `water.js`: `wdPage`, `wdBack`, `vWdPage`, `wdSnap`, `wdAfter`, pintasan tombol; `mdOpen('wd')` membuka halaman (`S.wdp`).
- `closing.js`, `layout.js`, `users.js`, `modals.js`: render, navigasi, FAB, dan keluar mengenali halaman detail.
- Tes UI Pamsimas (detailair, lanjut, taksiran, gantimeter, sambung, konfirmasi, petugas, struk, tarifair, air) disesuaikan untuk halaman.

## [1.1.239] — 2026-10-15

### Diperbaiki
- `pcalur.js`: filter proyek di `vAlur` (Draf/Berjalan), pemeriksaan `rqOpenP` pada langkah RFQ.
- Tes: `logic-211.js` (19 langkah).

## [1.1.238] — 2026-10-15

### Diubah
- `pcalur.js`: penanda angka diganti `.fwb` (progressbar ARIA); `style.css`: `.fwb`, `.fws`/`.fwd` dihapus.
- Tes: `logic-211.js`, `ui-alur.py` disesuaikan.

## [1.1.237] — 2026-10-15

### Ditambah
- `pengadaan.js`: `boqSeed`, `boqPv`, `boqReset`; `saveBoq(again)`; daftar `vRab` per pos dan bar progres; saran satuan.
- `style.css`: blok v1.1.237.
- Tes: `logic-212.js`, `ui-rab.py`.

## [1.1.236] — 2026-10-15

### Ditambah
- `pcalur.js`: `pcFlow`, `pcFlowGo`, `vAlur`; `vRfq` memuat kartu alur di atas daftar dokumen.
- `style.css`: blok v1.1.236 (`.fw`, `.fwd`).
- Tes: `logic-211.js` (16 langkah), `ui-alur.py`.

## [1.1.235] — 2026-10-15

### Diperbaiki
- `bayar.js`, `kontrak.js`, `serah.js`, `rfq.js`: pembaca kolom `v()` aman terhadap elemen yang tidak ada (`payTerm`, `payRet`).
- Tes: `ui-bayar.py` menambah skenario tanpa Master Tarif proyek.

## [1.1.234] — 2026-10-15

### Diubah
- `rfq.js`: `rqStatus({id,to})` (pintasan tanpa modal), langkah `.stp` dan panduan `.gdn` di `MD.pcy`; Pilih hanya setelah skor lengkap.
- `style.css`: blok v1.1.234.
- Tes: `logic-210.js`.

## [1.1.233] — 2026-10-15

### Diubah
- `index.src.html`: urutan elemen `.hru` (tanggal, `#unit`, kelompok `.hst` berisi `#bel`/`#awc`/`#bkc`, `#usr`).
- `style.css`: blok v1.1.233 untuk header (tinggi, pil unit, kapsul status, profil, mode HP dan cetak).

## [1.1.232] — 2026-10-15

### Ditambah
- `pclap.js`: `pcChk`, `pcCheckSet`, `vPcChk`, `vLpj`, `vPrt`, `pcYears`, `pcRekapData`; dokumen `lpj` dan `prt` di `vDoc`.
- `pcAct(p,yr)` memfilter tahun; checklist manual disimpan di `project.chk`.
- Tes: `logic-209.js` (13 langkah), `ui-lpj.py`.

## [1.1.231] — 2026-10-14

### Ditambah
- `pcgov.js`: `pcCfg` (`settings.pc_gov`), `pcNeed`, `pcSod`, `poNeed`, `poApprove`, `setPcGov`, `saveTiers`, `vPcGov` (kartu di tab Metode), `vPcAudit` (jejak audit di Laporan Proyek).
- Izin `pc.pengadaan`, `pc.evaluasi`, `pc.setujui`, `pc.kontrak`, `pc.terima`, `pc.bayar`, `pc.audit` (`PERMS`); `can()` menganggap `pc.proyek` mencakup semuanya (`PCST`) dan izin virtual `pc.status`, `pc.kstatus` (`PCV`). `GUARD`/`KPERM` dipecah; `rqStatus` dan `ctStatus` memeriksa izin di dalam fungsi (PO terbit dan kontrak berjalan butuh `pc.setujui`).
- `by_id` pada RFQ, PO, kontrak, dan penerimaan; `rfq.eval_by_id`; `rfq.coi`; `po.approvals`.
- Tes: `logic-208.js` (43 langkah), `ui-pcgov.py`; `logic-154/203/204` dan `ui-rfq.py` disesuaikan.

## [1.1.230] — 2026-10-14

### Ditambah
- `pcfin.js`: `pcSeedAcc` (akun 1650, 2250, 2260, 4700, 5800 saat modul aktif dan saat memuat data), `pcAct` (realisasi dari `journal_lines` bertanda `project_id`, tidak termasuk transaksi dibatalkan), `pcFin`, `vPcFin` (rincian proyek), `vRepProyek` (laporan), `pcDash` (kartu Dashboard).
- `proyek.js`: pos anggaran punya `account_id` (satu akun satu pos per jenis). `reports.js`: laporan Proyek bersyarat modul. `views.js`: kartu Dashboard. `bayar.js`: akun bawaan pembayaran.
- `sql/08_proyek.sql` [8/8]: tabel `projects`, `project_budget_lines`, `procurement_methods`, `project_boq_items`, `project_rfqs`, `project_quotes`, `purchase_orders`, `project_contracts`, `project_receipts`; fungsi `migrate_snapshot_to_tables6`, `tabel_status6`. Penomoran berkas SQL lain menjadi [n/8]. `cloud.js`: `TBL6`, `tbl6`, `tblLocal`/`tblCmp` (total PO dan kontrak), pesan bila fungsi belum ada.
- Tes: `logic-207.js` (26 langkah), `ui-pcfin.py`; `ui-awan2.py` menyiapkan stub tahap 6; `ui-tarif-ringkas.py` diberi jeda toggle.

## [1.1.229] — 2026-10-14

### Ditambah
- `bayar.js`: tagihan termin (`saveInv`), pembayaran (`payTerm`, jurnal `proj_pay` lewat `post`), pembatalan (`payVoid` memakai `rev`), retensi (`payRet`, `retVoid`, jurnal `proj_ret`), `ctPaid`, `ctRetHeld`, `feeProj` (kode tarif jenis `proyek` berdasar `nilai`). Modal `cpi`, `cpy`, `cpr`.
- `accounting.js`: `post()` menerima `project_id` (transaksi dan `journal_lines`); `voidT` memblokir `proj_pay`/`proj_ret`. `views.js`: Jurnal Manual memuat pilihan Proyek. `config.js`: label `proj_pay`, `proj_ret`. `rates.js`: jenis biaya `proyek` dan dasar `nilai`.
- `kontrak.js`: termin menampilkan status dan tombol pembayaran; blokir batal kontrak bila ada pembayaran; addendum tidak di bawah total dibayar.
- Tes: `logic-206.js` (42 langkah), `ui-bayar.py`.

## [1.1.228] — 2026-10-14

### Ditambah
- `serah.js`: koleksi `project_receipts` (di `NEWK`). Penerimaan (`RC_T`: draf→selesai→batal), QC (`QC_S`), `rcAcc`/`rcStat`/`rcSync` (mengisi `po.received` dan `po.received_full`), dokumentasi (`saveRcDoc`, `rcDocDel`), `vBast` (cetak, `S.doc={k:"bast"}` lewat `vDoc` di `loans.js`). Modal `rc`, `rce`, `rcs`, `rcd`.
- Kartu Serah terima di sub-tab Pengadaan; tombol Catat penerimaan di modal PO; izin `pc.proyek`; audit `receipt`, `receipt_status`.
- `proyek.js`: proyek dengan catatan penerimaan tidak bisa dihapus.
- Tes: `logic-205.js` (40 langkah), `ui-serah.py`.

## [1.1.227] — 2026-10-14

### Ditambah
- `kontrak.js`: koleksi `project_contracts` (di `NEWK`). Kontrak (`CT_T`: draf→aktif→selesai/batal), termin persen (`ctTerms` menyerap pembulatan di termin terakhir), retensi, addendum berversi (`ctVal`, `ctEnd`, `ctVer`), batas nilai kumulatif ≤ anggaran biaya (`ctBudget`), `vSpk` (cetak, `S.doc={k:"spk"}` lewat `vDoc` di `loans.js`). Modal `ck`, `cke`, `ckt`, `cka`, `cks`.
- Kartu Kontrak/SPK di sub-tab Pengadaan; tombol buat/buka kontrak di modal PO; izin `pc.proyek` untuk semua aksi baru; audit `contract`, `contract_status`, `contract_add`.
- `rfq.js`: PO dengan kontrak tidak bisa dibatalkan. `proyek.js`: proyek dengan kontrak tidak bisa dibatalkan/dihapus; rincian memuat nilai kontrak.
- Tes: `logic-204.js` (55 langkah), `ui-kontrak.py`.

## [1.1.226] — 2026-10-14

### Ditambah
- `rfq.js`: koleksi `project_rfqs`, `project_quotes`, `purchase_orders` (di `NEWK`). RFQ (`RQ_T`: draf→terbuka→evaluasi→dipilih/batal), penawaran, evaluasi berbobot (`rqScores`), `pcWin` (pengecualian wajib beralasan), PO (`PO_T`), `pcCommit` (komitmen PO terbit ≤ anggaran biaya), `rqNum` (RFQ/PO-tahun-nnn). Modal `pcq`, `pcy` (detail RFQ), `pcu`, `pcv`, `pcz`, `pco`.
- Sub-tab Pengadaan di `vPc()` (rute `/proyek/pengadaan`); `fabCfg`/`fabGo`; izin `pc.proyek` untuk semua aksi baru; audit `rfq`, `quote`, `purchase_order`, `rfq_status`, `rfq_win`, `po_status`.
- `proyek.js`: hapus/batal proyek diblokir bila ada RFQ/PO; rincian memuat Komitmen PO.
- Tes: `logic-203.js` (52 langkah), `ui-rfq.py`; `ui-pengadaan.py` disesuaikan (lima sub-tab).

### Catatan
- Kunci modal detail RFQ sengaja `pcy` agar tidak menimpa modal revisi anggaran `pcr` milik PC1.

## [1.1.225] — 2026-10-14

### Ditambah
- `pengadaan.js`: koleksi `procurement_methods` dan `project_boq_items` (di `NEWK`). `vPc()` kini `subT` dengan kunci `S.pcv` (proyek, rab, vendor, metode; rute `/proyek/rab` dst. lewat `RT_SUB`). Catatan: kunci `S.pt` sudah dipakai portal nasabah sehingga tidak dipakai.
- Metode pemilihan: `pcSeedM()` (3 contoh, otomatis saat `setMod('pc',true)` dan tombol `seedMethods`), `saveMethod`, `togMethod`, modal `pcm`; proyek menyimpan `method_id` (form dan rincian proyek).
- RAB: `saveBoq`, `delBoq`, modal `pcb`; `pcBoqAmt = round(qty × price)`; `vRab` (ringkasan total RAB, anggaran, selisih; per pos), terkunci selain Draf/Berjalan; tombol "Buka RAB" di rincian proyek. `pcHapus` ikut menghapus item RAB.
- Vendor: `vVendor` memakai `parties` jenis `pemasok` (tambah/ubah lewat modal `py`).
- Izin: GUARD `pc.proyek` untuk `saveMethod togMethod seedMethods saveBoq delBoq`; KPERM `pcm`, `pcb`; `fabCfg`/`fabGo` kontekstual per sub-tab. Audit: entitas `procurement_method`, `project_boq`.
- Tes: `logic-202.js` (39 langkah), `ui-pengadaan.py`.

## [1.1.224] — 2026-10-14

### Diubah
- Satu halaman: templat multi-berkas `index.html` diganti nama `index.src.html`; `node build.js` kini menulis `index.html` (mandiri) dan tidak lagi membuat `bumdes.html` (dihapus). `build.js --check` memeriksa `index.html` sinkron dan tanpa `<script src>`/`<link rel="stylesheet">` luar.
- `sw.js`: `ASSETS` hanya `./`, `index.html`, `manifest.json`, dan ikon (skrip/gaya tidak lagi berkas terpisah).
- Tes dan alat (128 berkas: suite, run, gen-*, ui-*, CI): rujukan `bumdes.html` menjadi `index.html`; `check-css` dan `check-pwa` membaca `index.src.html`. Skrip rilis: daftar Git memuat `index.src.html`; pemeriksaan skrip membaca templat.
- README/SUMMARY/tests README disesuaikan (struktur berkas, hosting, alur pengembangan).

## [1.1.223] — 2026-10-14

### Diperbaiki
- Halaman kosong di semua tab (v1.1.221–222): daftar berkas zip Git (`/tmp/g.txt`, alat rilis) tidak memuat `proyek.js` sehingga `vPc` tidak terdefinisi dan `render()` (peta tab di closing.js) melempar ReferenceError. Skrip rilis kini menambah semua skrip `index.html` dan aset `sw.js` ke daftar Git dan menggagalkan paket bila ada yang tertinggal.
- closing.js: peta tab memakai rujukan malas untuk `pc` (`typeof vPc==="function"`); bila berkas hilang, tab lain tetap tampil dan tab Proyek menampilkan pesan.
- Tes: `ui-proyek.py` menambah uji ketahanan tanpa `proyek.js`.

## [1.1.222] — 2026-10-14

### Diubah
- `UNIT_T`/`UNIT_M`/`UNIT_H`, `unitType()`, `modNm()` (views.js): jenis unit `simpan_pinjam`, `air`, `dagang`, `proyek`, `lainnya`; jenis tak dikenal menjadi `lainnya`. `saveUnit`, modal `u`, dan rincian unit memakai peta yang sama. `migr()` mengubah unit DAG "Perdagangan" berjenis `lainnya` menjadi `dagang`; data baru memakai `dagang`.
- `unitStat()`: ringkasan aktivitas per jenis (pinjaman aktif, sambungan, penjualan posted, proyek tidak batal, transaksi) pada baris daftar unit, bersama status modul terkait.
- `unitIssues()`/`unitFix()`: kartu "Kecocokan unit dan modul" (unit berjenis air/proyek tetapi modul nonaktif, modul aktif tanpa unit cocok, lebih dari satu unit Pamsimas aktif) dengan tombol `setMod`/`mdOpen('u')`.
- Form Proyek (`MD.pcp`): pilihan "Pilih unit usaha…" kosong bawaan; ikut filter unit bila spesifik; unit nonaktif disembunyikan kecuali sudah dipakai proyek itu.
- Tes: `logic-201.js` (18 langkah), `ui-unit.py`; `ui-proyek.py` disesuaikan.

## [1.1.221] — 2026-10-14

### Ditambah
- Modul opsional `pc` ("Proyek dan Pengadaan"): `MODS`, tab `pc` (TABS, grup Operasional, `TP`, `ROUTES` rute `proyek`, ikon, `fabCfg`), izin `pc.proyek` (GUARD `savePc pcStatus pcHapus pcLineSave pcLineDel pcRevSave`, `KPERM` pcp/pcl/pcr/pcs; Bendahara bawaan), info modul di `modInfo`.
- `proyek.js`: koleksi `projects` dan `project_budget_lines` (didaftarkan di `NEWK`), `vPc`/`pcList` (kartu ringkas, pencarian, filter status, keadaan kosong), modal `pcp` (data), `pcd` (detail), `pcl` (pos Draf), `pcr` (revisi), `pcs` (status). Status `PJ_T`; kode `PRJ-tahun-nnn`; `pcSum`/`pcLines` per revisi; revisi menyalin seluruh pos ke Rev n+1 dengan id baru dan mencatat `revs` (alasan, perubahan).
- Aturan: Draf → Berjalan butuh pos biaya > 0; batal wajib beralasan; selesai/batal terkunci; hapus hanya Draf/Dibatalkan tanpa `transactions.project_id`; anggaran harus tetap punya pos biaya.
- Audit: entitas `project`, `project_budget`; aksi `project_status`, `project_rev` (AUD_D/AUD_V/AUD_L).
- Tes: `logic-200.js` (45 langkah), `ui-proyek.py`; `logic-146` dan `logic-154` disesuaikan (modul dan tab baru).

## [1.1.220] — 2026-10-14

### Diubah
- `tierDet()` (water.js): akordeon rincian blok tarif (0–10, 10–20, di atas 20 atau semua pemakaian) dan riwayat perubahan tarif (5 entri terakhir dari `audit_logs`, entitas `settings/air`) di kartu Tarif standar. (UX-13)
- Golongan tarif dan Diskon dibungkus `details.tgd.tgs` (tertutup bawaan; `S.tgo` + `tgTog()` mengingat keadaan buka). Denda dan Biaya pasang baru tetap kartu ringkas yang membuka modal. (UX-13/14)
- `WGR`: grup Harian (baca, loket, adu), Tagihan (samb, piutang), Keuangan (jual, biaya), Data (pel, prod, set). Pelanggan dan Layanan tab sendiri (baris tab ketiga dihapus); kartu angka kunci disembunyikan di tarif, pel, prod. `fabCfg`/`fabGo` mencakup Pelanggan dan Layanan. CSS tab kecil dirapatkan di ≤480 px. (UX-14)
- Tes: `logic-199.js`, `ui-tarif-ringkas.py`; `logic-33`, `logic-73`, `logic-197`, `ui-pengaturan`, `ui-tabs`, `ui-tab-grup`, `ui-modal`, `ui-tarifair`, dan peta grup `WG` di uji UI Pamsimas disesuaikan.

## [1.1.219] — 2026-10-14

### Ditambah
- `wEmp()` (water.js): keadaan kosong berikon dengan tombol langkah berikutnya untuk Piutang, Riwayat pembayaran, Loket, Layanan Lain, Biaya, dan Pengaduan; tombol tambah hanya bila punya izin `air.kelola`. (UX-10)
- Toast dengan tombol Urungkan: `toast(m,er,ud)` (ui.js), `udSet`/`toastUndo` (water.js), `S.ud={fn,ids,m}` terikat pada pesan yang sama sehingga tidak bocor ke toast lain. Dipakai pada tagihan dari baris (`bmSave`, `batalJual`), `terima`, dan `loketBayar` (`batalTerima`). `hlSet`/`hlc` menyorot baris yang baru berubah 4 detik (`.upr.hl`). (UX-11)
- Kartu angka kunci memakai istilah Piutang (sama dengan tab). Tanggal di daftar sudah seragam lewat `tglView` (tidak diubah). (UX-12)
- Tes: `logic-198.js`, `ui-urungkan.py`; `logic-140`, `logic-195`, `ui-pamsimas-kpi` disesuaikan.

## [1.1.218] — 2026-10-14

### Diubah
- `WGR` (water.js): tab Pamsimas dua tingkat. Baris atas empat grup (`harian`, `tagihan`, `keu`, `data`; lencana tunggakan di Tagihan), baris kedua tab kerja grup aktif; nilai `S.at` tidak berubah sehingga rute dan tes lama tetap berlaku. (UX-7)
- `fabCfg`/`fabGo` (layout.js): tombol melayang Pamsimas kontekstual (Isi meter memfokus isian angka, Bayar memfokus pencarian Loket, lainnya membuka modal tambah); tersembunyi di Piutang dan Pengaturan atau tanpa izin `air.kelola`. `.fabsp` memberi jarak bawah halaman. (UX-8)
- Modal piutang `MD.wb` dan panel Loket: tombol Rincian sambungan membuka modal `wd` (filter, pencarian, dan posisi halaman tetap). (UX-9)
- Tes: `logic-197.js`, `ui-tab-grup.py`; `logic-33`, `logic-73`, `ui-pengaturan`, `ui-modal`, `ui-tabs`, `ui-layanan` disesuaikan; helper `wt()` di sembilan uji UI untuk berpindah grup.

## [1.1.217] — 2026-10-14

### Ditambah
- Baca Meter: baris sambungan belum ditagih berisi isian `#bm_<id>` (`inputmode="decimal"`), pratinjau `bmPrev` dan tombol Tagih; `bmKey` (Enter) dan `bmSave(id)` menerbitkan lewat `bilChk`/`bilPrep`/`bilPost` lalu memfokuskan baris berikutnya. Tanggal tagihan `#bm-d` (`S.wdd`) di kartu Periode. (UX-4)
- Filter chip `.wch/.wc` (`S.wf`: belum, sudah, cek, semua) dan filter rute `S.wr`; `bmCek()` menandai tagihan taksiran, pemakaian 0, atau lonjakan; lencana "Perlu cek". Daftar dimuat bertahap (`pgLim("bmr")`). (UX-5)
- `bmSpike()`: pemakaian >3× rata-rata `estUse` memberi peringatan di pratinjau (baris dan modal); di baris perlu penekanan kedua untuk menyimpan (`S.bmw`). Angka lebih kecil dari angka awal tetap ditolak. (UX-6)
### Diubah
- Select "Filter status tagihan" diganti chip; tes `ui-detailair`, `ui-lanjut`, `ui-penyempurnaan`, `ui-air`, `logic-141` disesuaikan.
- Tes: `logic-196.js`, `ui-baca-cepat.py`.

## [1.1.216] — 2026-10-14

### Ditambah
- `airKpi()` (water.js): baris kartu `g dk` di atas tab Pamsimas (kecuali Pengaturan): pelanggan aktif, tagihan periode (`S.bp` atau bulan ini), terkumpul, tunggakan, dan air tak berekening (dari `lossData()` bila ada bacaan meter induk); tiap kartu tombol ke tab terkait. Disembunyikan saat cetak. (UX-1)
- Baca Meter: batang progres kedua "terbayar dari tagihan" (`.wpg2`). (UX-2)
### Diubah
- Kartu Periode: `.wpr` (bulan pemakaian dan tombol daftar kerja satu baris) dan `details.wpd` untuk keterangan. (UX-3)
- Tes: `logic-195.js`, `ui-pamsimas-kpi.py`.

## [1.1.215] — 2026-10-14

### Diubah (performa)
- `insL(id)` dan `payL(id)` (accounting.js) mengembalikan angsuran dan pembayaran per pinjaman dari indeks `WX` selama `render()` (salinan; di luar render tetap pencarian langsung). Menggantikan `db.loan_installments.filter(i=>i.loan_id===...)` dan `db.loan_payments.filter(p=>p.loan_id===...)` di loans, reports, collection, restruct, flow, modals, share, portal, dan spaudit.
- Pengukuran (600 pinjaman, 7.200 angsuran, 3.000 transaksi): tab Simpan Pinjam ±250 ms menjadi 15–30 ms; Laporan ±360 ms menjadi ±145 ms.
- Tes: `logic-194.js`.

## [1.1.214] — 2026-10-14

### Diubah (performa)
- Indeks sementara `WX` (accounting.js, dibuka dan ditutup oleh `render()` di closing.js; null di luar render) dipakai `cust`, `paidOf`, `piu`, `wRds`, `billOf`, `arrears`, `wConn`, dan `saleOf` (water.js): pencarian O(n) per baris menjadi O(1). Hasil sama dengan pencarian langsung (diuji).
- `vAir`: urut transaksi hanya pada tab Layanan Lain dan Piutang; riwayat pembayaran hanya dihitung di tab Piutang; isi tab Layanan Lain, Piutang, Pelanggan, dan Layanan dibangun lewat getter (hanya tab terbuka).
- Pengukuran (800 pelanggan, 9.600 tagihan, 9.000 pembayaran): render Baca Meter ±5.300 ms menjadi ±20 ms; tab lain ±1.500–3.000 ms menjadi 13–90 ms.
- Tes: `logic-193.js`.

## [1.1.213] — 2026-10-14

### Diubah
- Form inline Pamsimas dipindah ke modal (`MD.jl`, `by`, `rv`, `sr`, `sb`, `ad`, `tf` di modals.js; kunci di `MK`, izin `air.kelola` di `KPERM`). ID isian dan fungsi simpan tidak berubah; fungsi simpan memanggil `okM()` saat berhasil dan modal tetap terbuka bila ada galat. Cart Layanan Lain tampil di dalam modal. `tarifForm()` dipisah dari `vTarif`; halaman Tarif menampilkan ringkasan, simulasi tetap inline.
- Tes: `logic-192.js`; `logic-19/21/140/141/177/178` dan `ui-air/biaya/layanan/meter/nav/pengaturan/putus` disesuaikan.

## [1.1.212] — 2026-10-14

### Diubah
- Panel lonceng ringkas: tiap notifikasi satu tombol baris (`.beli`, judul `.belt` dan tautan aksi), keterangan menjadi `title`.
- `belItems` ditambah: pengajuan menunggu persetujuan (`submitted`), pinjaman disetujui belum dicairkan (`approved`), tagihan taksiran menunggu koreksi, dan sambungan aktif belum dibaca periode berjalan (mulai tanggal 20); mengikuti filter unit dan modul aktif.
- Tes: `logic-191.js` diperluas.

## [1.1.211] — 2026-10-14

### Diubah
- `vDash` tidak lagi menampilkan blok Perlu perhatian (daftar peringatan, tombol Tampilkan semua, dan pesan aman); semuanya ada di lonceng header (`belItems`). `alertsAll()` tetap dipakai lonceng dan titik lencana navigasi.
- Tes: `logic-31/126/183` dan `ui-dash` disesuaikan (periksa lonceng).

## [1.1.210] — 2026-10-14

### Ditambah
- Lonceng notifikasi di header (`#bel`, `belChip`, `belItems`, `belTog` di layout.js): gabungan `alertsAll()`, pengingat backup (`bkDue`), dan angsuran jatuh tempo 7 hari; lencana merah bila ada peringatan berat (`er`). Panel tertutup lewat klik luar, Escape, atau aksi; disembunyikan saat cetak. Mengikuti filter unit dan izin tab.
- Tes: `logic-191.js`, `ui-lonceng.py`.

## [1.1.209] — 2026-10-14

### Diubah
- `vMod` (saklar modul Pamsimas dan Gaji) dipindah dari Setelan > Modul ke Master > Unit Usaha (di bawah Daftar Unit Usaha); sub-tab Modul dan rute `/setelan/modul` dihapus. `setMod` dan `db.settings.modules` tidak berubah.
- Tes: `logic-34/104/111/146`, `ui-modul`, `ui-route`, `ui-nav` disesuaikan.

## [1.1.208] — 2026-10-14

### Diubah (penyelarasan Pamsimas)
- Jenis unit `air` (label Pamsimas) ditambah di form unit dan `saveUnit`; seed unit bawaan `AIR` bernama Pamsimas bertipe `air`.
- `migr()`: unit berkode AIR, bernama Sumber Air, bertipe lainnya di-rename menjadi Pamsimas bertipe `air`. Unit lain tidak disentuh.
- Setelan > Modul: kartu Pamsimas menampilkan unit pencatat (`modAirUnit`) dan saran bila jenisnya belum Pamsimas.
- Tes: `logic-190.js`; `logic-11`, `logic-14`, `ui-nav`, `ui-sp0` disesuaikan dengan nama Pamsimas.

## [1.1.207] — 2026-10-14

### Ditambah (ROADMAP 1.0e tahap V: DK-1, DK-2)
- Sambungan memiliki isian opsional `rute` dan `urut` (form sambungan, saran rute dari rute yang ada); kosong = ikut alamat pelanggan (`rtOf`). Disimpan di objek sambungan (kolom `doc` jsonb), tanpa perubahan SQL.
- **Daftar kerja baca meter (DK-1):** `vDk` (water.js; dokumen `dk` di `vDoc`), dibuka dari tombol di Baca Meter: lembar A4 per rute (`.dkp`) berisi No, nomor meter, nama, alamat, angka bulan lalu, kolom kosong angka bulan ini dan keterangan, serta tanda tangan petugas; pilihan rute dan isi (hanya belum ditagih atau semua sambungan aktif); pengaturan tidak ikut tercetak. Urutan baris mengikuti `urut` lalu nomor meter.
- **Petugas per rute (DK-2):** `db.settings.air_rute` (disinkronkan bersama setelan) diatur lewat `rtSet` (izin `air.kelola`, tercatat di audit); nama petugas tampil di lembar dan di kepala kelompok Baca Meter ("Kelompok per rute/alamat", urutan mengikuti `urut`) bersama kemajuan "n dari m ditagih".
- Tes: `logic-189.js`, `ui-daftarkerja.py` (termasuk PDF A4: satu halaman per rute).

## [1.1.206] — 2026-10-14

### Ditambah (ROADMAP 1.0e tahap U: TM-1, TM-2)
- **Cetak tagihan massal (TM-1):** `vTagihM` (share.js; dokumen `tagihm` di `vDoc`) memuat seluruh nota tagihan satu periode (`tgBills`, unit terpilih, urut nomor meter numerik atau alamat) dengan satu nota per halaman A4 (`.tgp`, aturan cetak di style.css). Nota memakai `tagihBody` (dipisah dari `vTagih`). Dibuka dari tombol *Cetak & kirim tagihan* di Baca Meter.
- **WhatsApp (TM-2):** `tgText`, `tgWa`, `tgCopy` (izin `air.kelola`): teks tagihan (meter, pemakaian, total, sudah dibayar, sisa, jatuh tempo) lewat tautan wa.me atau salin; tanpa pengiriman otomatis, tercatat di audit. Tombol per pelanggan di halaman periode dan tombol *Kirim tagihan WhatsApp* di modal tagihan. Pelanggan tanpa nomor ditandai.
- Daftar kirim di halaman periode tidak ikut tercetak (`noprint`). Tidak ada perubahan skema SQL.
- Tes: `logic-188.js`, `ui-tagihm.py` (termasuk PDF A4: halaman = jumlah nota).

## [1.1.205] — 2026-10-14

### Ditambah (ROADMAP 1.0e tahap T: LK-1)
- Sub-tab **Loket** di Pamsimas (`vLoket`, water.js; rute `loket`, `S.lkp/lks/lkr/lkd`): pencarian pelanggan (nama, telepon, alamat, nomor meter; tanpa pencarian = tunggakan terbesar), daftar tagihan belum lunas pelanggan terpilih dengan kotak centang (Pilih semua, Kosongkan), ringkasan tagihan, denda, dan total, tanggal bayar dan kas/bank.
- `loketBayar()` (izin `air.kelola`, konfirmasi `askC`): melunasi tagihan terpilih sekaligus; satu pembayaran dan satu jurnal per tagihan (denda keterlambatan otomatis lewat `lateFine` atau dibebaskan dengan centang); validasi tanggal dan periode tutup sebelum memposting apa pun. Kuitansi per pembayaran dibuka dari kartu Pembayaran tercatat. Pembayaran sebagian tetap lewat Piutang. Tidak ada perubahan skema SQL.
- Tes: `logic-187.js`, `ui-loket.py`.

## [1.1.204] — 2026-10-14

### Ditambah (ROADMAP 1.0e tahap S: MR-1, MR-2)
- **Taksiran meter rusak (MR-1):** kotak centang *Meter rusak / tidak terbaca* di modal tagihan (`wd-e`, `wdEst`, `wdEstOn`) mengisi pemakaian taksiran `estUse` (rata-rata 3 bacaan asli terakhir, bisa diubah). `bilPrep(...,est)` menghasilkan tagihan dengan `bill.est=1`; bacaan diberi `est:1` dan `curr=prev` (angka meter tidak maju). Bacaan taksiran tidak masuk rata-rata. Nota, catatan tagihan, riwayat, dan konfirmasi menyebut taksiran.
- **Koreksi (MR-2):** `estPend` mendaftar tagihan taksiran yang belum dikoreksi. Tagihan bacaan asli berikutnya menagih `max(0, kumulatif − taksiran)` m³; bila kumulatif lebih kecil dari taksiran, selisih dikreditkan pada harga rata-rata taksiran (baris `Koreksi taksiran`, `bill.adj={from,est,phys,credit}`); kredit yang melebihi tagihan ditolak dengan arahan. Tagihan taksiran ditandai `est_adj`.
- Ganti meter menutup taksiran yang menunggu (`est_adj="G"+id`, dikembalikan saat ganti meter dibatalkan); membatalkan tagihan koreksi mengembalikan taksiran ke status menunggu. Tidak ada perubahan skema SQL (kolom jsonb).
- Tes: `logic-186.js`, `ui-taksiran.py`.

## [1.1.203] — 2026-10-14

### Ditambah (ROADMAP 1.0e tahap R: GM-1 sampai GM-3)
- Modal **Ganti meter** (`MD.gm`, modals.js; `S.egm`): dibuka dari modal detail sambungan (tombol di Kelola sambungan). Menampilkan nomor meter lama, angka akhir terakhir, dan bacaan terakhir; isian nomor meter baru, angka awal, tanggal, dan alasan (`GM_ALASAN`, disimpan di bacaan jenis "ganti" sebagai `reason`). Peringatan bila periode berjalan belum ditagih (tautan ke modal tagihan). Konfirmasi lewat `askC('gantiMeter')` (closing.js) dengan validasi yang sama.
- Riwayat ganti meter per sambungan di modal (tombol batal untuk penggantian terbaru) dan di tab Sambungan (kini memuat alasan).
- Kartu isian "Ganti Meter" di tab Sambungan dihapus. `gantiMeter()` memakai sambungan modal bila modal terbuka. Tidak ada perubahan skema SQL.
- Tes: `logic-185.js`, `ui-gantimeter.py`; `logic-141` disesuaikan.

## [1.1.202] — 2026-10-14

### Diubah (permintaan pengguna: lewati halaman login saat buka pertama)
- `entNeed` (entry.js): bila `entLocalOk()` (belum pernah masuk akun) dan URL bukan `#masuk`/`#portal`, perangkat otomatis ditandai `{lokal:1,seen:1}` dan halaman masuk dilewati. Setelah itu perilaku sama dengan memilih tombol *Lanjut tanpa masuk*. Tautan `#masuk` dan `#portal` tetap membuka halaman masuk (nasabah). Pernah masuk lalu keluar: halaman masuk wajib seperti semula.
- Tes: `logic-184`, `logic-97` dan `ui-masuk` disesuaikan.

## [1.1.201] — 2026-10-14

### Diubah (permintaan pengguna: buka lokal dulu, login hanya untuk sinkronisasi)
- `entLocalOk` (entry.js) tidak lagi mensyaratkan perangkat berisi data: tombol *Lanjut tanpa masuk (data lokal)* (`#ln-lokal`, cloud.js) tampil di perangkat mana pun yang belum pernah masuk akun (`seen`, email). Setelah pernah masuk akun tombol hilang. Perangkat baru yang masih berisi data contoh tetap dianggap kosong (`entBlank`), sehingga masuk kemudian memuat data dari awan; bila data sudah diubah, sinkronisasi manual lewat Data > Backup.
- Teks penjelasan dan pesan setelah memilih lokal diperbarui. Alur nasabah (nomor HP + PIN) dan sesi yang ada tidak berubah.
- Tes: `logic-184.js`; `logic-97` dan `ui-masuk` disesuaikan.

## [1.1.200] — 2026-10-14

### Ditambah (PY-5, PY-6; tahap Q — rencana Payroll lanjutan dan kualitas selesai)
- Dashboard: `onbSteps`, `vOnb`, `onbHide` (views.js; izin `master.kelola`, setelan `onb_hide`): enam langkah awal tercentang otomatis dari data; kartu hilang bila semua selesai atau disembunyikan; hanya untuk pengguna yang boleh membuka Master.
- CI: `.github/workflows/ci.yml` menjalankan `node build.js --check` pada tiap push/pull request, serta `node tests/suite.js cepat` (Playwright + poppler) bila `tests/suite.js` ada. Catatan: `tests/` dan `data/` ada di `.gitignore` (dipakai lokal), jadi di Git yang berjalan hanya pemeriksaan sinkron build; hapus dua baris itu dari `.gitignore` bila suite ingin dijalankan di CI.
- Data uji: uji logika dan UI sudah dibekukan pada tanggal tetap (`run.js` 2026-09-30, `pg.clock.set_fixed_time` di uji UI), jadi tidak bergantung tanggal nyata; yang tidak bergantung pada tanggal tetap itu hanyalah data demo (bertanggal 2026-09) — mengubah tanggal beku memunculkan beberapa kegagalan (logic-10, 16, 24, 31) yang dicatat di ROADMAP sebagai pemeliharaan uji.
- Tes: `logic-183.js`, `ui-onboarding.py`.

## [1.1.199] — 2026-10-14

### Ditambah (PY-3, PY-4; tahap P)
- `CALC.per_satuan` ("Tarif per satuan (jam/hari)"): komponen menyimpan `unit` (≤ 12 huruf, bawaan jam) dan `value` sebagai tarif bawaan; form komponen memuat kolom *Satuan* (`pk-s`, `pkCalc` menampilkan/menyembunyikan). Tarif per pegawai memakai `components[].amount` lewat `kChecklist`/`kRead`/`posPick` (label Rp / satuan). `ecAmt` = 0 untuk komponen ini sehingga tidak masuk gaji tetap dan `payGen` tidak membuat barisnya.
- `psTarif`, `psForm`, `piQty` (izin `gaji.kelola`): form *Tambah per satuan* di rincian gaji Draf; baris `{name:"Lembur (2,5 jam × Rp 20.000)", base:"Lembur", qty, unit, rate, amount}`; tarif pegawai didahulukan dari tarif master, tarif 0 ditolak, jumlah 0 atau > 1.000 ditolak, gaji bersih negatif ditolak. Daftar komponen manual (`pi-c`) tidak memuat komponen per satuan.
- Laporan gaji per komponen mengelompokkan lewat `base` bila ada.
- Tes: `logic-182.js`, `ui-satuan.py`.

## [1.1.198] — 2026-10-14

### Ditambah (PY-1, PY-2; tahap O)
- Pegawai: `nik` (16 digit, unik), `bank`, `acc_no` (5–25 digit), `acc_name` (kosong = nama pegawai) pada `saveEmp` dan form `pg`; daftar menampilkan bank •• empat digit akhir dan NIK disamarkan (`nikMask`). Tabel relasional `employees` tidak berubah (kolom `data` jsonb menampung semuanya).
- Gaji > *Transfer* (`trfPer`, `trfData`, `trfCsv`, `trfDl`, `vTransfer`; rute `/gaji/transfer`): daftar transfer per periode, peringatan pegawai tanpa rekening, cetak A4, CSV. Slip gaji memuat baris *Rekening* bila ada.
- Roadmap: bagian 1.0d (Payroll lanjutan dan kualitas, tahap O sampai Q).
- Tes: `logic-181.js`, `ui-transfer.py`.

## [1.1.197] — 2026-10-13

### Ditambah (PM-7, PM-8, PM-9; tahap N — Pamsimas selesai)
- `calonPutus`, `vPutus` (water.js): kartu *Calon Putus* di tab Piutang; pelanggan aktif dengan jumlah tagihan belum lunas ≥ `cut_months` (0 = mati); tombol SP1, SP2, dan Putus (`askC('togConn')`).
- Surat peringatan: `spwData`, `vSpw`, `spwSave`; dokumen `spw` (A4) berisi tunggakan per tagihan dan batas waktu (SP1 7 hari, SP2 3 hari, `SP_DAYS`); *Catat terkirim* menyimpan ke `db.settings.air_sp` (nomor `SPn-tahun-nnn`) dan audit.
- Pengaduan: tab *Pengaduan* (`vAdu`, `adSave`, `adSt`, `adDel`), `db.settings.air_comp`, status Baru/Ditangani/Selesai, filter status; rute `/pamsimas/pengaduan`. Tanpa jurnal.
- Perbaikan nama: fungsi baru memakai `spwData`/`vPutus` karena `spData` (reports.js) dan `vCalon` (calon.js) sudah dipakai.
- Tes: `logic-180.js`, `ui-putus.py`; `ui-tabs` dan `ui-pengaturan` disesuaikan (tujuh tab).

## [1.1.196] — 2026-10-13

### Ditambah (PM-6; tahap M)
- Laporan > *Ringkasan Desa* (`airDesaData`, `vAirDesa`, `airDesaCsv` di reports.js; rute `/laporan/ringkasan-desa`): sambungan (aktif/putus/KK), pemakaian per golongan dan per alamat, tingkat penagihan per bulan (terbit vs terbayar), umur tunggakan (0, 1–30, 31–60, 61–90, >90 hari), biaya per m³, kehilangan air. Judul bagian tercetak lewat `rcd` (`h4.rnh`); kartu biaya dan kehilangan air di Laporan Pamsimas ikut berjudul saat cetak.
- Tes: `logic-179.js`, `ui-desa.py` (termasuk PDF A4 ≤ 2 halaman).

## [1.1.195] — 2026-10-13

### Ditambah (PM-5; tahap L)
- Meter induk/sumber: `srcSave`, `srcDel`, `lossSet`, `lossData`, `lossCard`, `vSrc` (water.js), disimpan di `db.settings.air_src` (tanpa jurnal) dan batas di `db.settings.air_loss` (bawaan 20%). Ditampilkan di tab *Biaya* (bagian *Meter Induk*).
- Persen kehilangan per bulan = (produksi − m³ ditagih pada periode yang sama) ÷ produksi; bulan di atas batas ditandai; kartu *Kehilangan air (meter induk)* di Laporan Pamsimas.
- Tes: `logic-178.js`, `ui-meter.py`; `ui-biaya` tetap.

## [1.1.194] — 2026-10-13

### Ditambah (PM-3, PM-4; tahap K)
- Tab *Biaya* di Pamsimas (`vBiaya`, `biayaSave`): catat biaya (listrik pompa, bahan kimia, perawatan pipa, honor operator, BBM, lain) sebagai transaksi `out` pada unit Pamsimas; daftar biaya membuka modal transaksi (bisa dibatalkan). Rute `/pamsimas/biaya`.
- Akun beban 5410, 5420, 5430 lewat `ensureAirAcc` (juga dipanggil di `reset()`, dan sebelum menyimpan biaya).
- `biayaData()`: biaya per bulan/jenis dari jurnal, m³ dan pendapatan dari tagihan terbit; kartu *Biaya operasional dan kecukupan tarif* di Laporan Pamsimas (biaya/m³, tarif rata-rata/m³, penanda defisit).
- Dana pemeliharaan (`db.settings.air_rsv.pct`, `biayaRsv`): hanya saran di laporan, tanpa jurnal pencadangan.
- Tes: `logic-177.js`, `ui-biaya.py`.

## [1.1.193] — 2026-10-13

### Diubah (PM-1, PM-2; tahap J)
- Semua label *Unit Air* menjadi *Pamsimas* (menu `TABS`, `MODS`, header, laporan `LAPORAN PAMSIMAS`, setelan modul, izin `air.kelola`, pesan). Nama internal `air`, kunci data, dan akun tidak berubah.
- Rute: `/pamsimas` (alamat lama `/unit-air` dan `/laporan/unit-air` tetap diterima lewat alias di `rtParse`); sub-tab `layanan-lain` dan `layanan` (alias `penjualan-lain`, `produk`). `vercel.json` dan `index.html` memuat kedua slug.
- `water.js`: tab *Penjualan Lain* → *Layanan Lain* (form *Catat layanan*, pelanggan wajib, tanpa opsi Umum, tombol *Simpan layanan*), sub-tab *Produk* → *Layanan* (*Layanan & Biaya Lain*), nota menjadi *BUKTI PEMBAYARAN LAYANAN* (kolom Pelanggan/Petugas), pesan dan jurnal memakai kata *Layanan*; penjualan lama tanpa pelanggan tampil *Tanpa pelanggan*. Laporan Pamsimas: *Pendapatan*, *Per layanan*, *Transaksi*.
### Ditambah
- `layananDef()` (tombol *Tambah layanan bawaan*): Sambung kembali, Ganti meter, Balik nama, Perbaikan sambungan (akun 4200, tarif 0 dengan penanda *Tarif belum diisi*); izin `air.kelola`.
- Uji: `ui-layanan.py` (baru); `logic-6/17/21/22/26/27/33/34/139/140/171` dan `ui-air/nav/pengaturan/modal/pwa/route/cetak-pdf/struk` disesuaikan.

## [1.1.192] — 2026-10-10

### Diubah
- `modals.js` dan `water.js`: tombol struk diberi nama berbeda (*Struk tagihan*, *Struk kuitansi*, *Struk nota*) agar tidak tampil dua tombol *Cetak struk* di modal yang sama. `ui-struk.py` disesuaikan.

## [1.1.191] — 2026-10-10

### Diubah
- `style.css`: saat dicetak, sel tabel dalam `.sc` (laporan dan daftar) boleh turun baris (`overflow-wrap:break-word`; kolom angka tetap satu baris). Memperbaiki tabel *Kepatuhan pemisahan tugas* di Laporan Simpan Pinjam yang melebar sampai 895 px dan terpotong di kanan halaman A4.
### Ditambah
- `tests/ui-cetak-pdf.py` (masuk `suite.js cepat`): membuat PDF asli (Chromium, media cetak) untuk Buku Besar, Neraca Saldo, enam laporan, kartu pinjaman, akad, rekap dan buku tabungan, slip gaji, laporan gaji, dua dokumen portal, dan enam bukti dalam A4/80/58 mm (34 PDF); memeriksa ukuran kertas, elemen tidak melewati batas kanan, tidak ada halaman kosong, jumlah halaman, nomor halaman, isi kunci, tanpa teks `undefined`/`NaN`.
- Hasil audit: tidak ada halaman kosong atau tabel terpotong selain tabel di atas; halaman akad dan laporan panjang terpecah wajar.

## [1.1.190] — 2026-10-10

### Ditambah
- `layout.js`: `PAPERS`, `paperDef` (bawaan per perangkat, `localStorage bumdes_paper`), `paperCur` (`S.ppr` sementara), `strukP`, `dcl(st)` (kelas `doc st s80|s58`), `docBar(st)` (Cetak/Cetak struk, pilihan ukuran, Kembali), `docPaper`, `setPaper`, `pgStruk` (menyetel `@page struk` dengan lebar 80/58 mm dan tinggi sesuai isi) dan `cetakDoc`. Setelan > Dokumen Cetak: pilihan *Ukuran kertas bukti di perangkat ini*.
- `savings.js`: dokumen `ks` (`vBuktiSav`, nomor `BS-tahun-nomor`) untuk setoran dan penarikan tabungan; tombol *Struk* pada mutasi di modal rekening. Setoran tabungan kini mencatat `officer` (`byN()`).
- `style.css`: blok struk (`.doc.st`, `.s80`, `.s58`, tabel item bertumpuk, nilai turun ke baris bawah di 58 mm, `@page struk` tanpa margin dan tanpa nomor halaman).
- Tombol *Cetak struk* di modal pembayaran, tagihan, nota (`modals.js`, `kwBtn`) dan *Struk* pada riwayat angsuran (`loans.js`). `openDoc/docOpen` menerima ukuran awal.
### Diubah
- Dokumen kuitansi air, nota, nota tagihan, kwitansi angsuran, dan bukti pencairan memakai `docBar` dan `dcl`; tampilan A4 tidak berubah.
- Uji: `logic-176.js`, `ui-struk.py` (baru; PDF 80/58 mm diperiksa: satu halaman, lebar kertas, isi, petugas; A4 tetap A4).

## [1.1.189] — 2026-10-10

### Ditambah
- `views.js`: `bktNo(id)` (nomor bukti `BKT-tahun-nomor`), `ledPrint(D)` (tabel cetak Buku Besar: `colgroup`, saldo awal, jumlah mutasi, saldo akhir, baris batal dicoret), tabel cetak Neraca Saldo di `vTb` (Kode, Nama akun, Tipe, Debit, Kredit, jumlah, status seimbang) dengan `repHead` dan `repEnd`.
- `ledCsv`: kolom *No. Bukti*. `modals.js` `MD.td`: baris *No. bukti*.
- `style.css`: aturan cetak `.lgp/.lgt` (tabel 9pt, judul kolom berulang, baris tidak terpotong, `tfoot` tidak berulang).
### Diubah
- Kartu KPI, daftar kartu Buku Besar, dan kartu Neraca Saldo diberi `noprint`; layar tidak berubah.
- Uji: `logic-175.js`, `ui-bukubesar.py` (baru; PDF diperiksa `pdftotext`: judul kolom berulang, semua baris, saldo, tanda tangan; juga Neraca Saldo); `logic-138` dan `logic-139` disesuaikan.

## [1.1.188] — 2026-10-10

### Ditambah
- `layout.js`: `offId/offName` (pengguna login, lalu petugas perangkat di `localStorage bumdes_officer`), `bendName` (Profil `treasurer`, lalu pegawai aktif berjabatan *bendahara*), `petugas(rec)` (`rec.officer` → `offName()` → `bendName()`), `byN()` (`{officer}` untuk disimpan), `ptgR(rec)` (baris tabel Petugas), `setOfficer(v)` (audit `setting officer`); `tres()` kini `bendName()`.
- Pencatatan `officer` pada `db.payments` (terima), `db.sales` (jual dan `bilPost`), `db.loan_payments`, `db.savings_tx` (setor lewat `savings.js:72`, tarik). Nama field `officer` dipilih karena `by` sudah dipakai di `savings_tx` pencairan (rincian biaya).
- Setelan > Dokumen Cetak: pilihan *Petugas di perangkat ini*. Profil BUMDes: `datalist` pegawai untuk Direktur dan Bendahara (teks bebas tetap diterima).
### Diubah
- Kuitansi air, nota penjualan, kwitansi angsuran: tanda tangan kedua = Petugas (`petugas(rec)`) dan baris Petugas; nota tagihan: baris Petugas; slip gaji dan akhir laporan: Bendahara lewat `tres()`; akhir laporan: "oleh nama" tanpa syarat RBAC aktif; kartu pinjaman, buku dan rekap tabungan: `petugas()`.
- Data lama tanpa `officer`: memakai rantai nama (tanpa galat).
- Uji: `logic-174.js`, `ui-petugas.py` (baru; PDF cetak diperiksa dengan `pdftotext`); `logic-22` disesuaikan.

## [1.1.187] — 2026-10-10

### Diubah (struktur berkas, tanpa perubahan fungsi)
- Dokumen selain `README.md` pindah ke `docs/`: `CHANGELOG.md`, `CHANGELOG_ARSIP.md`, `ROADMAP.md`, `ROADMAP_ARSIP.md`, `SUMMARY.md`, `SUPABASE.md`, `release_notes.md`, blueprint.
- Ikon pindah ke `icons/`: `icon.svg`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`. `index.html` (`rel=icon`, `apple-touch-icon`), `manifest.json` (`icons[].src`), dan `sw.js` (`ASSETS`) memakai jalur baru.
- `build.js --check` membaca `docs/release_notes.md` dan `docs/CHANGELOG.md`. `README.md` memuat jalur baru.
- Tindakan manual di Git: hapus berkas lama di akar (dokumen dan ikon di atas) setelah mengunggah folder baru; cache service worker berganti otomatis lewat versi.
- ROADMAP: tahap cetak CD bergeser (F v1.1.188, G v1.1.189, H v1.1.190, I v1.1.191).

## [1.1.186] — 2026-10-10

### Ditambah
- `vBaca`: ringkasan periode `.wsm` (tertagih, terbayar + persen, belum dibayar dari `db.sales` periode itu, mengikuti filter unit); urutan `S.wo==="alamat"` (`bmData` mengembalikan `ad, nad, wo`; muncul bila ada ≥2 alamat berbeda) dengan header `.wgh` per alamat (n dari m ditagih); `btt(n)` (tombol Kembali ke atas, >12 baris) juga di Sambungan, Piutang, Pelanggan; menghormati `prefers-reduced-motion`.
- `share.js`: `arList/arText(pid)`, `MD.ar` (`MK.ar="ear"`), `arCopy/arWa/arShare/arLog` (audit `share` entity `party`); tombol Kirim pengingat di modal `wb` dan `wd`. Penjaga `air.kelola` untuk `arCopy arWa arShare`, `KPERM.ar`.
### Diubah
- `toast()` memakai `toastPos(e)`: bila modal terbuka, diletakkan 8 px di bawah `#fm .mh`; CSS `body.mo #toast` hanya cadangan (top 64px).
- Uji: `ui-penyempurnaan.py` (baru).

### Ditunda
- Cetak massal tagihan satu periode (UA-10 bagian kedua): menunggu keputusan format cetak; akan memakai format struk/A4 dari tahap cetak CD.

## [1.1.185] — 2026-10-10

### Diubah
- `vAir`: tab harian `baca, samb, piutang, jual` + tab `set` (Pengaturan) yang membuka `S.at='tarif'`; sub-bar `.stsub` (`tarif, pel, prod`) hanya tampil bila `S.at` salah satunya. Nilai `S.at` dan rute `/unit-air/{tarif,pelanggan,produk}` tidak berubah.
- `vTarif`: kartu Tarif standar berkelompok (`.tgp` Model tarif / Blok tarif atau Harga / Lainnya, `.tgi` dua kolom ≥600 px, `.tgf` pembungkus label+isian) + kartu Simulasi tagihan (`.twg` grid 3fr/2fr ≥900 px, `.tws` sticky) + `vTarifAirX()` (golongan, denda, pasang baru, diskon; dulu `vTarifAir` di Master). Label dipersingkat; `label for` ditambahkan.
- Master: sub-tab `tair` dihapus (`vMst`, `RT_SUB.mst`); `rtParse` mengalihkan `/master/tarif-air` ke Unit Air > Tarif.
- Izin: `saveGol gtTog saveLate saveInst saveDisc dsTog` pindah dari `master.kelola` ke `air.kelola`; `KPERM` gl/ds/pb → `air.kelola`.
- Uji: `ui-pengaturan.py` (baru); `ui-air`, `ui-detailair`, `ui-nav`, `ui-tabs`, `ui-tarifair`, `logic-33`, `logic-141`, `logic-172` disesuaikan.

## [1.1.184] — 2026-10-10

### Diubah
- Piutang (`vAir` tab `piutang`): form `ar-*` dihapus; pencarian `S.wq` (nama/telepon/alamat/no meter via `wqHit` + no tagihan) dan filter `S.wpf` (`air|lain|telat`, direset di `go()` dan saat ganti tab); baris `button.upr.nsr` membuka modal `wb`; lencana Terlambat dan Dibayar sebagian; tombol Nota/Terima di baris dihapus (cetak lewat modal).
- Modal baru `MD.wb` (`MK wb:"ewb"`): kv rincian, jumlah terisi sisa + tombol Lunasi sisa (`.wdq`, `aria-describedby`), tanggal/kas berdampingan, denda bila `aLate().on` dan tagihan air, `dkb` Cetak tagihan/nota; mode hanya-lihat bila `noPerm("air.kelola")`. `terima(id,'wp')` menutup modal `wb` setelah berhasil.
- Uji: `ui-piutang.py` (baru); `ui-air`, `ui-tarifair` memakai modal `wb`.

### Dokumentasi
- ROADMAP: tahap C selesai (UA-3, UA-7); bagian baru 1.0b Cetak dokumen (CD-1 sampai CD-6, tahap F–I setelah UA) dari audit PDF cetak.

## [1.1.183] — 2026-10-10

### Diubah
- Sambungan: baris `button.upr.nsr` yang membuka modal `wd` (ikon Detail/Edit/Putus di baris dihapus; CSS `.smr/.smc` dihapus). `togConn` kini lewat `askC('togConn',id)` (`cfInfo`: Putus sambungan? / Sambungkan kembali?, menyebut tunggakan); `ACT.togConn`.
- Modal `wd`: bagian Kelola sambungan (`!noPerm("air.kelola")`): Edit sambungan (`mdOpen('cn',id)`), Putus/Sambungkan kembali. `dkb(t,f,ikon,kelas)` menerima ikon; `.dkb.dng` untuk aksi berisiko.
- Uji: `ui-sambung.py` (baru); `ui-detailair`, `logic-141` memakai `.nsr`.

## [1.1.182] — 2026-10-10

### Ditambah
- `bmData()` (data daftar Baca Meter: periode, urutan, filter bawaan `belum`; `semua` mengurutkan belum ditagih dulu), `wdNext(id)` (pelanggan belum ditagih berikutnya sesuai pencarian, berputar ke awal), progres `.wpt/.wpg` (`role=progressbar`), pesan selesai.
- `terbitSatu(lanjut)`: bila `true` (tombol Terbitkan & lanjut atau Enter) tanpa konfirmasi, lalu `S.ewd` pindah ke berikutnya, `S.wgo` memfokuskan `#wd-a`; tanggal diingat di `S.wdd`.
- `mdHtml`: footer kustom lewat `f.fb`. Modal `wd`: footer Batal / Terbitkan / Terbitkan & lanjut; `#wd-a` di atas, `#wd-p` dan `#wd-d` sejajar.

### Diubah
- Filter status Baca Meter: nilai `belum` (bawaan), `sudah`, `semua`; Reset kembali ke bawaan.
- Uji: `ui-lanjut.py` (baru); `ui-detailair/air/konfirmasi/tarifair` memakai tombol Terbitkan.

## [1.1.181] — 2026-10-10

### Diubah
- Modal `wd`: riwayat mengecualikan tagihan periode yang sedang dibuka (`x!==b`); kuitansi tunggal = `Cetak kuitansi`, beberapa = satu tombol per pembayaran; periode lain memakai tautan `.lkb`. Lencana status (`Ditagih`/`Belum ditagih`, `Belum lunas`) di atas; baris Status dihapus.
- Tombol cetak memakai `.dkb` (bergaris, label selalu terlihat; sebelumnya `ib` hijau/ikon saja). `.wdw .kvg` dua kolom dengan label di atas nilai; `.wdg2` untuk tanggal bayar + kas/bank.
- Uji: `ui-detailair.py` mencakup tanpa duplikat, dua kuitansi, dan riwayat periode lain.

## [1.1.180] — 2026-10-10

### Ditambah
- Dokumen `kuit` (`vKuit(payId)`, water.js; didaftarkan di `vDoc`): kuitansi pembayaran air, nomor `KA-yyyy-nnnn` dari indeks pembayaran, sisa tagihan dihitung sampai pembayaran itu.
- Tombol: modal `wd` (Cetak kuitansi di bagian tagihan; `.wdk` per pembayaran di Riwayat tagihan) dan Riwayat Pembayaran di sub-tab Piutang. Helper `payOk`, `kwNo`, `kwBtn`.
- Uji: `ui-detailair.py` mencakup kuitansi sebagian dan pelunasan, lebar layar, dan mode cetak.

## [1.1.179] — 2026-10-10

### Ditambah
- Modal `wd`: bagian Pembayaran (`wp-d/wp-k/wp-a/wp-f`) dan tombol Bayar per tagihan belum lunas (urut periode), memanggil `terima(id,'wp')`.

### Diubah
- `terima(id,px)`: awalan id kolom bisa dipilih (`ar` untuk sub-tab Piutang, `wp` untuk modal); logika tidak berubah.
- Enter pada `.noent` tidak menekan tombol footer modal. Uji: `ui-detailair.py` mencakup bayar sebagian dan lunas dari modal.

## [1.1.178] — 2026-10-10

### Diubah
- `vBaca()`: baris pelanggan berupa `button.upr.nsr` yang langsung `mdOpen('wd',id)`; input `bm_*`, pratinjau baris, dan tombol Terbitkan tagihan massal dihapus dari UI. Status Belum/Sudah ditagih dan filter status `S.wf` (direset oleh `go()` dan pergantian sub-tab).
- Sambungan: baris `.smc` membuka modal detail saat diketuk di luar tombol.
- `terbitTagihan()`/`bmPrev` tetap ada hanya untuk generator data dan uji logika (tanpa tombol di UI).
- Uji: `ui-air`, `ui-konfirmasi`, `ui-tarifair`, `ui-detailair` memakai alur modal.

## [1.1.177] — 2026-10-10

### Ditambah
- Pencarian pelanggan Unit Air (`wSrch/wqHit`, state `S.wq`; dikosongkan oleh `go()` dan pergantian sub-tab) di Baca Meter, Sambungan, dan Pelanggan.
- Modal `wd` (`MD.wd`, `S.ewd`; modals.js): detail pelanggan/sambungan dengan angka meter akhir, pratinjau (`wdPrev/bilTxt`), `terbitSatu()` (izin `air.kelola`, konfirmasi `cfInfo('terbitSatu')` yang memvalidasi dulu), status Sudah ditagih + Cetak tagihan, riwayat 6 tagihan terakhir. Tombol Detail di baris Baca Meter dan Sambungan.

### Diubah
- `terbitTagihan()` dipecah menjadi `bilChk` (periode), `bilPrep` (validasi satu sambungan), `bilPost` (jurnal, penjualan, bacaan, audit) yang dipakai juga oleh `terbitSatu()`. Perilaku tagihan massal tidak berubah; baris tersaring dibaca dari draf (`bmVal`) dan ikut dihitung di konfirmasi.
- Uji: `ui-detailair.py` (baru; 390/1280 px).

## [1.1.176] — 2026-10-09

### Diubah
- `areaSvg()` (Tren 6 Bulan, Dashboard): garis dan area memakai bezier kubik monoton (`smoothPath()`, Fritsch–Carlson; tidak melampaui data), titik pendapatan dan beban per bulan (`.tpt`), dan area sentuh `.th` per bulan (fokus keyboard, `aria-label` berisi angka).
- Tooltip `.ttp` lewat penanganan delegasi (`trTip/trHide`): hover (mouse), klik/ketuk bertahan sampai di luar, fokus keyboard, Escape. Posisi dijaga di dalam kolom grafik.
- Uji: `ui-kurva.py` (baru; 390/1280 px, mouse, ketuk, keyboard); `logic-107` menyesuaikan struktur SVG.

## [1.1.175] — 2026-10-09

### Diubah
- Data > Backup (`vDat0`): ringkasan status `bkStat()` (`.bks/.bkt`; petak Cadangan online hanya bila `setelan.kelola`), kartu 1-2 dan 3-4 dalam dua kolom `.bkg/.bkc` di ≥1000 px, kartu 5 selebar halaman.
- `.dc.dwc`: kartu dan `details` di dalam kartu awan diratakan (tanpa border/bayangan, dipisah garis). Baris `.bkr` (label + pilihan) dan `.bkb` (tombol) pada kartu 1 dan 4; tombol Export dan Import berukuran penuh di HP.
- Uji: `ui-backuptata.py` (baru; 390/1280 px).

## [1.1.174] — 2026-10-09

### Diubah
- `today()` = tanggal lokal perangkat (`ymd(new Date())`), bukan `now().slice(0,10)` (UTC). `now()` tetap ISO UTC untuk penyimpanan.
- Pembantu baru di `accounting.js`: `pad2`, `ymd`, `wkt(iso[,detik])` (tanggal+jam lokal; tanggal murni tidak digeser), `wd(iso)` (tanggal lokal). Dipakai di jejak audit (tampil, CSV, filter tanggal), log aktivitas, riwayat calon, linimasa pinjaman, status awan/riwayat versi, portal nasabah, info data portal, cetak laporan, tahun tutup buku, tanggal akun, pemotongan arsip log.
- Uji: `tests/run.js` membekukan 12:00 UTC dan memakai `ymd` (lulus di TZ UTC, Makassar, Honolulu, Tokyo); `logic-98` tak bergantung zona; `ui-zona.py` (baru; Makassar/UTC/Honolulu pada 20:00 UTC).

## [1.1.173] — 2026-10-09

### Diubah
- Simulasi pengajuan (`simLive`): tabel jadwal kini dibuat `simTbl()` (kelas `.simt`): angka tanpa Rp, tanggal dd/mm/yy, `tfoot` Jumlah, `thead` menempel, area gulir `.simsc.lg` (maks 340 px) bila tenor >12, lima kolom muat di 360/390 px. Polos tanpa bingkai kartu (`details.simd` tanpa border).
- Keadaan buka/tutup dijaga lewat `S.simO` (`simOpen/simTog`); bawaan terbuka di layar ≥700 px.
- `.pgf .actb` di ≤420 px: margin dan bantalan 10 px agar tidak meluap 1 px.

## [1.1.172] — 2026-10-09

### Diubah
- Halaman pinjaman (`lp/la/ld`): `.card.sim` di dalam `.pgf` diratakan (latar tipis tanpa garis, tanpa bayangan) agar tidak kartu-di-kartu; daftar jadwal simulasi tanpa garis ganda; jarak antara kolom Tenor dan kotak tarif/biaya.
- Baris `.upr`/`.li`, keadaan kosong (`p.k.em` hasil `emptyFx`) dan `.sxa` di dalam `details.sx` pada halaman diberi bantalan sehingga tidak menempel ke garis tepi (CSS saja).

## [1.1.171] — 2026-10-09

### Diubah
- Simpan Pinjam: Ajukan pinjaman (`lp`), Ubah pengajuan (`la`), dan rincian pinjaman (`ld`) tampil sebagai **halaman** di area utama (`vPage()`), bukan modal. `mdOpen('ld'|'lp'|'la',id)` dan `openLoan` mengalihkan ke `pgOpen`; keadaan halaman disimpan di `S.pp={k,id,prev,h}` dan tetap ada saat dialog (`lc/lw/lz/ls/lr/lb/cj/jd/nd/rm`) terbuka di atasnya. `S.md` ikut menyala dengan jenis halaman (`PGK`) sehingga `LI`, `feeSel`, dan `mdBackLd` tidak berubah; `pgNorm()` (awal `render`) menjaga `S.pp`, `S.md`, `S.eld`, dan `S.ela` tetap selaras.
- Form pengajuan/ubah dua kolom di layar ≥1000 px (isian | simulasi `#sim-fee/#sim/#sim-w`, bilah tombol `.actb` menempel); `MD.lp/MD.la` kini mengembalikan `side` (simulasi) dan `xb` (tombol Simpan sebagai draf) selain `b`. Rincian dibagi dua kolom lewat `vLoan(l,1)` → `{top,side}` (`vLoan(l)` tetap string utuh untuk modal lama).
- Kembali/Batal: `pgBack()` memakai riwayat peramban bila halaman dibuka dari dalam aplikasi, selain itu `pgClose()`. Setelah simpan berhasil `pgDone()` kembali ke rincian (dari Ubah) atau ke daftar, dengan entri riwayat diganti (`S.rtRep`).
- Isian form halaman dijaga lewat render ulang oleh `pgSnap/pgRestore` (setara `mdSnap`) dan dikecualikan dari sistem draf per tab (`inPg` di `dSnap/dRestore/dirtyFields`).
- Alamat per halaman: `/simpan-pinjam/ajukan`, `/simpan-pinjam/pinjaman/{id}`, `/simpan-pinjam/pinjaman/{id}/ubah` (`rtPath/rtParse/rtApply/rtPop`, `pgSet` memeriksa data dan izin). Pindah tab, menu Simpan Pinjam, dan keluar akun (termasuk keluar otomatis) menutup halaman. FAB disembunyikan saat halaman terbuka.

### Ditambah
- Tombol **Profil nasabah** di kepala rincian dan kartu **Pinjaman lain {nasabah}** (`pgOthers`) untuk pindah antarpinjaman milik nasabah yang sama.
- Dokumen (kartu pinjaman, bukti cair, kwitansi) yang dibuka dari rincian kini kembali ke halaman rincian, bukan ke daftar.

### Tes
- `logic-173.js` (55: halaman, dialog di atas halaman, ubah/ajukan/draf/hapus draf, dokumen, navigasi, keluar akun, alamat, `pgSet`, `pgNorm`) dan `ui-halaman.py` (390/1280 px: tata letak, bilah tombol, dialog di atas halaman, pinjaman lain, Kembali).
- Disesuaikan ke halaman: `logic-1/35/38/67/79`, `ui.py`, `ui-sp/sp0/sp2/spm/ubah/p0/draf/ringkasan/roles/fab/form/tgl/calon/spa11y`.

## [1.1.170] — 2026-10-09

### Diubah
- Master > Tarif Air: semua form (golongan tarif, denda keterlambatan, biaya pasang baru, diskon) kini berupa modal (`MD.gl`, `MD.dn`, `MD.pb`, `MD.ds`; kunci `MK` `gl/dn/pb/ds` → `S.egl/edn/epb/eds`) dengan galat validasi per kolom dan Escape/Batal menutup. Halaman memuat kartu ringkasan (mis. "5% dari sisa tagihan, tenggang 3 hari") dengan tombol Tambah golongan tarif, Ubah pengaturan denda, Ubah biaya pasang baru, dan Tambah diskon; baris golongan/diskon punya Edit (modal) dan Nonaktifkan.
- Model tarif golongan (flat/bertingkat) menampilkan atau menyembunyikan blok bertingkat di dalam modal tanpa render ulang (`gtMd`).
- `saveGol/saveLate/saveInst/saveDisc` menutup modal lewat `okM()`; `gtEdit` dan `dsEdit` dihapus. Perhitungan, jurnal, dan data tidak berubah.

### Tes
- `logic-172.js` disesuaikan (91 cek): modal berisi bidang dan label terhubung, mode ubah terisi, simpan menutup modal, galat validasi menahan modal.
- `ui-tarifair.py` disesuaikan: alur lewat modal di 390 dan 1280px (validasi, Escape, tampil/sembunyi blok bertingkat).

## [1.1.169] — 2026-10-09

### Ditambah
- **Master > Tarif Air** (sub-tab baru, hanya bila modul Unit Air aktif; izin `master.kelola`), data di `db.settings` (`air_class`, `air_late`, `air_inst`, `air_disc`) sehingga tanpa koleksi atau tabel SQL baru; bawaan nonaktif:
  - **Golongan tarif:** kode otomatis `GOL001…`; model flat/bertingkat, beban tetap, minimum; dipilih per sambungan (`conn.cls`, kolom Golongan tarif di modal sambungan). `airCfgFor(conn)` menimpa model, beban tetap, minimum, dan blok tarif standar; jatuh tempo dan unit tetap dari tarif standar. Golongan nonaktif tidak bisa dipilih baru, sambungan lama tetap memakainya.
  - **Diskon:** kode `DSK001…`; persen atau nominal; lingkup tagihan air, penjualan lain, atau keduanya. Diskon tagihan dipilih per sambungan (`conn.disc`, berlaku tiap bulan); diskon penjualan dipilih di form Penjualan baru (`#j-ds`). Total tagihan/penjualan dan jurnal dicatat setelah diskon (pendapatan bersih), rincian ada di baris item "Diskon …" dan nota; diskon yang menghabiskan seluruh tagihan ditolak.
  - **Denda keterlambatan:** nominal tetap atau persen dari sisa tagihan, tenggang 0–90 hari, batas maksimum. `lateFine()` mengenakan sekali per tagihan pada pembayaran pertama sesudah jatuh tempo + tenggang; form Terima punya kolom Denda (kosong = otomatis, 0 = bebaskan, angka = ubah). Jurnal: Dr kas (bayar + denda) / Cr 1400 (bayar) / Cr 4210 (denda); piutang tidak bertambah. Batal pembayaran membalik denda dan denda dapat dikenakan lagi.
  - **Biaya pasang baru:** nama dan nominal; saat menambah sambungan baru (pilihan Tagihkan Ya/Tidak) dibuat penjualan kredit `install` (Dr 1400 / Cr 4220), nomor memakai format penjualan.
- Akun baru **4210 Pendapatan Denda Air** dan **4220 Pendapatan Pasang Baru Air** (`ensureAirAcc` di `migr`, juga di akun bawaan; masuk akun sistem).
- Laporan Unit Air: baris Denda keterlambatan diterima (akun 4210).
- Unit Air > Tarif: petunjuk ke Master > Tarif Air.

### Diubah
- Tagihan air memakai `airCfgFor(sambungan)` dan mengurangi diskon; pratinjau angka meter menampilkan diskon dan total bersih.
- Sub-tab Master: tujuh bila modul Unit Air aktif (`logic-33` disesuaikan); rute `/master/tarif-air`.

### Tes
- `logic-172.js` (83): akun dan migrasi, bawaan nonaktif, golongan (validasi, tarif, nonaktif, ubah tidak mengubah tagihan lama), diskon (validasi, lingkup, jurnal, item, nota, 100% ditolak, penjualan), denda (tenggang, sekali per tagihan, jurnal, batal, bebas, manual, penolakan, tetap, nonaktif), biaya pasang baru (jurnal, piutang, nomor, nota, edit tidak menagih lagi, batal), tampilan Master, label, izin, audit.
- `ui-tarifair.py`: alur Master > Tarif Air sampai tagihan bergolongan berdiskon, terima dengan denda, 390 dan 1280px.

## [1.1.168] — 2026-10-09

### Ditambah
- Nomor penjualan (`sale`, bawaan `JL-{YYYY}-{NNNN}`) dan nomor tagihan air (`bill`, bawaan `TA-{YYYY}{MM}-{NNN}`) memakai mesin nomor `numNext` (v1.1.162): `NUMF0`/`NUMK`/`numPool` diperluas; kolom format di Setelan > Profil (kartu Nomor, tampil bila modul Unit Air aktif; judul kartu berubah menjadi "Nomor pegawai, tabungan, dan Unit Air"). Urutan mulai 1 lagi saat tahun/bulan/tanggal pada format berganti; nomor lama tidak berubah; nomor tetap unik.

### Diubah
- Penjualan lain tidak lagi bernomor `jumlah semua penjualan + 1` (yang ikut menghitung tagihan dan saldo awal): nomor kini urut per awalan/format sendiri. Tagihan air urut per bulan seperti sebelumnya.
- Tidak ada koleksi database atau tabel SQL baru (`db.settings.num_sale`, `num_bill`).

### Tes
- `logic-171.js` (17): format bawaan, urutan JL- tidak terpengaruh TA-/SA-, urut per bulan tagihan, format baru dan ganti bulan, validasi, tagihan air nyata, keunikan, kolom Setelan menurut modul, izin.
- `ui-nomor.py` diperluas: kolom penjualan dan tagihan air, contoh nomor, penolakan format salah, modul Air nonaktif.

## [1.1.167] — 2026-10-09

### Ditambah
- Laporan > Piutang per tanggal lampau: input **Per tanggal** (kosong = hari ini; tanggal masa depan dipotong ke hari ini). `piuData(dd)` memakai `piuHist(t)` untuk tanggal sebelum hari ini: sisa pokok = pokok − pembayaran pokok bertanggal ≤ t; aging tagihan dari jadwal angsuran dikurangi alokasi pembayaran ≤ t (jasa yang dihapuskan sesudah t dikembalikan); piutang pelanggan = total penjualan kredit − pembayaran bertanggal ≤ t; buku besar 1300/1400 dari jurnal bertanggal ≤ t. Cetak dan CSV mengikuti tanggal. Catatan di layar: pembatalan sesudah tanggal itu tidak dihitung; pinjaman yang direstrukturisasi setelah tanggal itu hanya masuk total pokok, tidak ke aging.
- **Catatan atas laporan** di bawah Neraca, Laba Rugi (per akun dan per unit), Arus Kas, dan Piutang: catatan otomatis dari data (entitas dan cakupan unit, dasar pencatatan jasa/denda diakui saat diterima, amortisasi fee bila ada, saldo awal, tahun buku ditutup, filter unit) ditambah **catatan tambahan** pengurus (maks. 1.500 huruf) di Setelan > Dokumen Cetak (`setRepNote`, izin `setelan.kelola`, tercatat di audit). Ikut tercetak; petunjuk setelan disembunyikan saat cetak.

### Diubah
- Bar filter laporan Piutang berjudul "Filter dan cetak" (sebelumnya "Cetak dan unduh").
- Tidak ada koleksi database atau tabel SQL baru (`db.settings.rep_note`).

### Tes
- `logic-169.js` (30): piutang per tanggal lampau: sebelum cair, hari cair, sebelum/sesudah pembayaran, aging mundur, buku besar per tanggal, `piuHist(hari ini)` sama dengan posisi kini, pembayaran dibatalkan, penjualan kredit dan cicilan, filter unit, tampilan, CSV, tanggal masa depan.
- `logic-170.js` (22): catatan otomatis per laporan, catatan tambahan, escape HTML, batas panjang, audit, kolom Setelan, izin.
- `ui-catatan.py`: piutang per tanggal dan catatan atas laporan di 390 dan 1280px, cetak.
- `logic-137.js` disesuaikan dengan judul bar baru.

## [1.1.166] — 2026-10-09

### Diperbaiki
- `mdr()`: modal tanpa kolom isian (mis. rincian pinjaman `ld`) kini memfokuskan tombol kembali/tombol pertama di dalam modal saat dibuka (sebelumnya fokus tertinggal di halaman belakang).

### Tes
- Penyebab uji UI lambat/gagal sejak v1.1.158 ditemukan: `pg.fill('#bk', JSON ±70 KB)` Playwright memakan ±30 dtk, bukan aplikasi (mengisi nilai + memicu event langsung ±3 ms). 20 uji UI (`akad, awal, bayar, calon, draf, import-dummy, kolek, nsb, restruk, rincian, ringkasan, sp, sp1b, sp2, sp4c, sp5, tab2, tab3, tabungan, trx`) kini memakai `pg.evaluate`; `ui-akad` yang sebelumnya selalu gagal kini lulus dalam ±7 dtk. Suite lengkap: 89 langkah lulus, ±13 menit (`-j 3`).
- `ui-spa11y.py`: audit aksesibilitas modal Simpan Pinjam (pengajuan, ubah, tolak, batal, cairkan, bayar, lunasi, nasabah, rincian) pada 360/390/1280px: label terhubung, target sentuh 44px (mobile), tanpa meluap horizontal, fokus di dalam modal, Escape menutup.
- `logic-168.js` (18 cek): uji transisi pelengkap SP2: tolak tanpa jurnal dan alasan wajib, tidak bisa cair/setuju setelah ditolak, cair dengan fee (satu jurnal, dana bersih), cair dua kali ditolak, batal cair mengembalikan kas dan jadwal, cair tanpa kode fee.
- `check-audit.js` (masuk `suite.js cepat`): setiap `audit("aksi","entitas",…)` berliteral di kode harus punya nama baku `AUD_V`/`AUD_D` (108 pasangan terdaftar).

## [1.1.165] — 2026-10-09

### Ditambah
- Laporan Gaji (Gaji > Laporan): pengelompokan **Per tahun** (`tahun`) dan **Per tahun · pegawai** (`pegtahun`, tahun terbaru dulu lalu nomor/nama pegawai) di `GG`/`gajiTab()`; kolom sama dengan pengelompokan lain (jumlah gaji, bruto, potongan, bersih, dibayar, belum dibayar). Filter periode, filter unit, cetak, dan CSV berlaku.

### Tes
- `logic-167.js` (12 cek), `ui-rekapgaji.py` (390/1280px).

## [1.1.164] — 2026-10-09

### Ditambah
- Laporan > **Neraca**: pilihan Bandingkan neraca dengan (`S.ncmp`): Akhir bulan sebelumnya (dari Per tanggal) atau Tahun sebelumnya (tanggal sama tahun lalu). Butuh Per tanggal terisi. `neracaData(tanggal)` menerima tanggal eksplisit; `nrCmp()`, `nrCmpDate()`.
- Laporan > **Arus Kas**: pilihan Bandingkan arus kas dengan (`S.kcmp`): Periode sebelumnya atau Tahun sebelumnya (rentang sama seperti Laba Rugi; `lrCmpRange(k)` kini menerima jenis). `kasData(a,b)` menerima rentang eksplisit; `kasCmp()`. Akun lawan yang hanya ada di satu rentang tetap tampil.
- Tabel pembanding dipakai bersama (`lrCmpTbl`, tabel di layar lebar/cetak, daftar berbaris di bawah 900px); Unduh CSV Neraca dan Arus Kas memuat kolom pembanding dan selisih. Status kecocokan (Aset = Kewajiban + Ekuitas; saldo akhir = Kas & Bank) tetap tampil.

### Tes
- `logic-165.js` (18 cek), `logic-166.js` (15 cek); `ui-lrbanding.py` diperluas ke Neraca dan Arus Kas.

## [1.1.163] — 2026-10-09

### Ditambah
- Laporan > Laba Rugi (Per akun): pilihan **Bandingkan dengan** (`S.lcmp`): Periode sebelumnya (rentang sama panjang tepat sebelum Dari tanggal) atau Tahun sebelumnya (rentang digeser satu tahun, 29 Februari menjadi 28 Februari). Perlu tanggal Dari dan Sampai; bila kosong/terbalik muncul petunjuk. Kolom Periode ini, Pembanding, Selisih, dan % ("baru" bila pembanding nol); akun yang hanya ada di salah satu rentang tetap tampil.
- `lrData(a,b)` menerima rentang eksplisit (tanpa argumen = filter bawaan); `lrCmp()`, `lrCmpTbl()`, helper `dAdd/dDiff/dYr/pctTxt`.
- Tampilan: tabel di layar lebar dan saat cetak, daftar berbaris `.upl` di bawah 900px. Unduh CSV memuat kolom pembanding dan selisih. Tampilan Per unit tidak berubah.

### Tes
- `logic-164.js` (21 cek), `ui-lrbanding.py` (390/1280px).

## [1.1.162] — 2026-10-09

### Ditambah
- Setelan > Profil > kartu **Nomor pegawai dan tabungan** (`numSet()`): format `num_emp` (bawaan `PEG-{NNN}`) dan `num_tab` (bawaan `TAB-{NNNN}`), memakai mesin nomor yang sama dengan pinjaman/draf/akad (`numChk`, `numNext`, kode `{YYYY} {YY} {MM} {DD} {NNNN}`); contoh nomor berikutnya ditampilkan.
- `numNext` kini memakai `numPool(kind)` (pinjaman/draf/akad dihitung bersama, pegawai, tabungan); `empNo()` dan `savNo()` memakai `numNext`. Bawaan menghasilkan nomor identik dengan sebelumnya; nomor lama tidak berubah dan urutan melanjutkan nomor terbesar yang cocok dengan format.
- `setNum` masuk izin `setelan.kelola`.

### Tes
- `logic-163.js` (18 cek), `ui-nomor.py` (390/1280px).

## [1.1.161] — 2026-10-09

### Ditambah
- Gaji > Proses Gaji: kartu **Potongan gaji belum disetor** (`potCard()`): saldo per unit = potongan gaji berstatus Dibayar − setoran (`potBal()`), form **Catat setoran** (`potSetor`: unit, jumlah, tanggal, kas/bank, tujuan wajib; ditolak bila melebihi saldo, periode tertutup, atau tanpa tujuan) dan riwayat 10 setoran terakhir. Jurnal: Dr Kewajiban Lain (2200) / Cr kas-bank, tipe transaksi baru `payroll_rem` ("Setor Potongan Gaji") pada unit yang sama; tanpa koleksi atau tabel SQL baru.
- `batalSetorPot` (konfirmasi `askC`, jurnal pembalik); `voidT` langsung dari Transaksi diblokir untuk `payroll_rem`. `batalGaji` ditolak bila pembatalan membuat saldo potongan unit lebih kecil dari yang sudah disetor.
- Izin: `potSetor`, `batalSetorPot` → `gaji.kelola`. Audit: `payroll.remit` ("Setoran potongan gaji").

### Tes
- `logic-162.js` (28 cek), `ui-gajisetor.py` (390/1280px).

## [1.1.160] — 2026-10-09

### Ditambah
- Gaji > Proses Gaji: kartu **Proses massal** (`gjMass()`): pilih periode (`S.gpm`, bawaan periode terbaru yang masih menunggu) lalu **Setujui semua draf** (`payApprAll`, izin `gaji.setuju`) atau **Bayar semua disetujui** (`payBayarAll`, izin `gaji.kelola`). Keduanya lewat konfirmasi (`askC`) berisi jumlah gaji, total bersih, kas/bank, dan tanggal; mengikuti filter unit di header.
- Pembayaran massal memakai tanggal dan kas/bank dari kartu Pembayaran gaji; tiap gaji dijurnal sendiri (`payPost`, hasil pemisahan dari `payBayar`) sehingga pembatalan tetap per gaji. Bila satu gagal (mis. periode tertutup), proses berhenti dan pesan menyebut berapa yang sudah dibayar.
- Audit: persetujuan massal tercatat per gaji dengan keterangan "(massal)".

### Tes
- `logic-161.js` (20 cek), `ui-gajimassal.py` (390/1280px).

## [1.1.159] — 2026-10-09

### Ditambah
- Setelan > Pengguna & Peran > Mode Pengguna: kartu **Keluar otomatis** (Jangan keluar otomatis, 5, 15, 30, 60 menit tidak aktif; `db.settings.idle_min`; izin `pengguna.kelola`). Aktivitas (klik, tombol, sentuh) memperbarui `S.idleAt`; pemeriksaan tiap 15 detik (`idleCheck`); saat lewat batas pengguna keluar, sesi dihapus, layar masuk menampilkan alasannya, dan tercatat di audit log.
- Kartu **Kembalikan ke bawaan** di Peran dan Izin: `rolesReset()` mengembalikan izin peran bawaan (tanpa Superadmin dan peran buatan sendiri); dengan konfirmasi dan catatan audit; ditolak bila setelahnya tidak ada Admin Sistem aktif.

### Tes
- `logic-160.js` (20 cek), `ui-rbackecil.py` (390/1280px).

## [1.1.158] — 2026-10-09

### Ditambah
- SP-O O7: **Kartu Pinjaman** (`kartuHtml`, `vKartu`, dokumen `kp`): identitas nasabah, data pinjaman, ringkasan (sisa pokok, total dibayar, tunggakan termasuk denda), jadwal angsuran dengan status, riwayat pembayaran dengan nomor kwitansi, tanda tangan. Tombol "Kartu pinjaman" di rincian pinjaman (pinjaman yang sudah dicairkan).
- **Rekap Tabungan** (`rekapHtml`, `vRekap`, dokumen `rt`): semua rekening aktif nasabah dengan saldo, total, dan 10 mutasi terakhir per rekening. Tombol "Rekap tabungan" di rincian nasabah.
- Portal nasabah: "Cetak kartu pinjaman" (rincian pinjaman) dan "Cetak rekap tabungan" (menu Tabungan); hanya data milik sendiri; versi portal tanpa riwayat kwitansi dan tanda tangan petugas (data itu tidak diterbitkan ke portal). CSS cetak menyembunyikan header, menu, dan pratinjau portal.
- Tabel jadwal pada kartu tidak diubah menjadi kartu di layar sempit (`.sc.nc`); angka tidak terpotong (`nt`).

### Catatan
- `tests/suite.js`: kegagalan kini hanya dinilai dari kode keluar (galat `BrokenPipe` server uji lokal pada `ui-route` tidak lagi dianggap gagal).
- Bukti pembayaran (kwitansi) dan bukti pencairan sudah ada sebelumnya.

### Tes
- `logic-159.js` (23 cek), `ui-cetak.py` (390/1280px: kartu, rekap, portal, media cetak).

## [1.1.157] — 2026-10-09

### Ditambah
- SP-O O11: `tests/suite.js` dengan tiga mode: `cepat` (build --check, check-css/pwa/sql, semua uji logika, 10 uji UI ringkas: ±1,5 menit), `lengkap [-j N]` (ditambah logic-77 dan seluruh uji UI, paralel, bawaan 2 proses), dan `ui <nama…>` untuk uji UI tertentu. Log per langkah di `/tmp/bumdes-suite/`, ringkasan `ringkasan.json`, kode keluar bukan nol bila ada yang gagal.
- `package.json`: `test:cepat`, `test:lengkap`; `test:lokal` kini sama dengan `test:cepat`.

### Diubah
- Uji lengkap dengan 2 proses paralel selesai ±19 menit (sebelumnya ±35 menit berurutan). `ui-awan2.py` memakai berkas sementara sendiri (`_tmp_nokey2.html`) agar tidak berebut dengan `ui-awan.py` saat paralel.
- `tests/run.js` tanpa argumen otomatis memuat semua `logic-*.js` berurut (daftar tetap lama berhenti di logic-116); `--semua` menyertakan `logic-77` yang lambat. Tidak ada perubahan pada aplikasi.

## [1.1.156] — 2026-10-09

### Ditambah
- SP-O O12: interval pengingat backup dapat diatur di Data > Backup (Jangan ingatkan, 3, 7, 14, 30 hari; `db.settings.backup_days`, bawaan 7; perubahan tercatat di audit log, izin `data.backup`).
- Spanduk pengingat memuat jumlah perubahan audit sejak cadangan terakhir; menjadi galat (`role="alert"`) setelah 3x interval; hanya tampil untuk peran dengan izin Export backup.
- Tombol Nanti menyembunyikan pengingat sampai besok (disimpan di `bumdes_bk_snooze`, bertahan setelah muat ulang); mengubah interval menghapus jeda. Chip Backup di header mengikuti interval.

### Catatan
- Sinkronisasi awan hanya dengan kunci anon/publishable sudah dijaga sebelumnya (`cloudSecret`, `service_role` ditolak di `cloudSave` dan `cloudFixed`), sehingga bagian itu dari O12 dinyatakan selesai tanpa perubahan kode.

### Tes
- `logic-158.js` (17 cek), `ui-backup.py` (390/1280px: interval, banner, Nanti bertahan, mati).

## [1.1.155] — 2026-10-08

### Ditambah
- SP-O O10: render bertahap untuk Daftar Nasabah, Pihak, Pegawai, Tabungan, Tunggakan, Pelanggan, Sambungan, dan Piutang Air: 30 baris dulu, tombol "Muat lebih banyak (N lagi)". Pembantu `pgLim/pgMore/pgGrow` di `views.js`; batas per daftar disimpan di `S.pl` dan direset oleh `go()` dan pergantian sub-tab (Simpan Pinjam, `subT`).
- Daftar yang sudah bertahap sebelumnya tetap: Pinjaman, Transaksi, Buku Besar, Log audit, Gaji, Penjualan/Pembayaran Air.

### Tes
- `logic-157.js` (11 cek), `ui-paging.py` (300 nasabah, 390/1280px, reset saat pindah sub-tab).

## [1.1.154] — 2026-10-08

### Ditambah
- SP-O O9: kartu "4. Penyimpanan di browser" di Data > Backup: bilah pemakaian (`stoUse()`, perkiraan batas 5 juta karakter), rincian data aplikasi, log audit, salinan cadangan lokal (`_prev`), dan lainnya.
- Spanduk peringatan di semua halaman saat pemakaian ≥70% (biasa) dan ≥90% (galat); tombol Nanti menyembunyikannya sampai pemakaian naik ±5 poin.
- Arsipkan log audit lama (3/6/12 bulan): dialog konfirmasi, log diunduh sebagai `bumdes-arsip-audit-<tanggal>.json` lalu dihapus dari db; 200 log terbaru dan riwayat pinjaman aktif dipertahankan; tercatat sebagai `arsip_audit`. Tombol Hapus salinan cadangan lokal. Izin `data.kelola`.

### Diubah
- Kartu "Kosongkan semua data" menjadi nomor 5.

### Tes
- `logic-156.js` (20 cek), `ui-storage.py` (390/1280px: kartu, arsip, unduhan, peringatan); `tests/run.js`: stub `localStorage` mendukung `length/key/removeItem`; `logic-145` disesuaikan penomoran.

## [1.1.153] — 2026-10-08

### Diubah
- Setelan > Pengguna & Peran: kartu "Akun saya" tidak lagi memuat form Ganti PIN dan tombol Keluar (sudah ada di halaman Profil; ID `cp-o/cp-n/cp-r` tidak lagi ganda), diganti tombol "Buka Profil saya".
- Daftar Pengguna mendapat kartu angka (pengguna aktif, nonaktif, Admin Sistem aktif, peran); tombol Tambah pengguna dan Buat dari pegawai satu baris.

### Tes
- `logic-147.js` disesuaikan (tautan ke Profil, tanpa form PIN, kartu ringkasan).

## [1.1.152] — 2026-10-08

### Diubah
- Halaman Profil: header berisi nama, peran, unit, telepon/alamat, dan tombol Keluar; kartu angka (menu dapat dibuka, izin peran, masuk sejak / peran akun awan); dua kolom di desktop (CSS columns) dan satu kolom di HP.
- Identitas tidak lagi mengulang Nama/Telepon/Alamat; "Ubah data saya" memakai grid `.pfg`; Ganti PIN menjadi panel lipat (`S.dx.pfp`, terbuka lagi bila PIN salah); tombol Keluar bawah dihapus.
- Aktivitas terakhir (5 terbaru) memakai istilah ramah (Masuk, Keluar, PIN diganti).

### Tes
- `logic-153.js` dan `ui-profil.py` disesuaikan (header memuat kontak, Ganti PIN tertutup bawaan).

## [1.1.151] — 2026-10-08

### Ditambah
- `sql/98_kosongkan_isi.sql`: mengosongkan isi semua tabel data, snapshot, dan riwayat di skema public (`truncate … restart identity cascade`) dengan penjaga konfirmasi `v_konfirmasi = 'KOSONGKAN ISI'`. Tabel `bumdes`, `bumdes_members`, struktur, fungsi, kebijakan, dan `auth.users` tetap; versi snapshot kembali nol sehingga tidak perlu Siapkan BUMDes ulang. Aman diulang.
- Pesan aplikasi saat simpan ke awan ditolak dengan `version_conflict:0` (awan sudah dikosongkan): "Awan sudah dikosongkan … tekan Timpa awan untuk mengirimnya sebagai versi 1".

### Tes
- `tests/sql-kosongkan.sh` (15 cek, Postgres 16: penjaga konfirmasi, isi kosong, struktur/BUMDes/anggota/akun/kebijakan tetap, `save_snapshot` versi lama ditolak dan versi 0 menjadi 1, dapat diulang), `logic-155.js` (4).

## [1.1.150] — 2026-10-08

### Ditambah
- **Tampilan sesuai akun dan peran** (permissions.js `roleFx`, `noPerm`, `FN_P`, `KPERM`): setelah tiap render, tombol aksi (`.b`, `.ib`, `.ad`) di halaman dan di modal yang memanggil fungsi berizin atau membuka modal tulis disembunyikan bila akun tidak punya izinnya (peran lokal) atau berperan pembaca di awan. `FN_P` diturunkan dari `GUARD`; `KPERM` memetakan jenis modal ke izin (`pg`→master, `lc`→cairkan, `lw`/`lz`→bayar, `ls`/`lr`→setujui, `vf`/`an`/`ak`/`tl`/`rs`/`hb`, dan seterusnya); `lst` mengikuti status. Wadah `.fl` yang jadi kosong ikut dibuang; di modal tanpa tombol simpan, Batal menjadi Tutup. Baris daftar yang membuka rincian tidak disembunyikan (tetap bisa dilihat).
- Menu **Setelan** hanya untuk akun dengan `setelan.kelola` atau `pengguna.kelola` (`TP.set`). Akun lain memakai halaman Profil untuk ganti PIN dan ubah data sendiri.
- Menu **Simpan Pinjam** tersembunyi untuk akun yang hanya ditugaskan ke unit non-Simpan Pinjam (`spScope`, layout.js).
- Halaman **Data**: sub-tab dan kartu menurut izin (Backup = `data.backup`/`data.kelola`/`setelan.kelola`; Periode = `periode.kelola`/`audit.lihat`; Audit Log = `audit.lihat`; kartu Export `data.backup`, Import dan Kosongkan `data.kelola`, Cadangan online `setelan.kelola`). `subT` menerima kolom ke-4 `false` untuk menyembunyikan sub-tab.
- Sub-tab **Calon** dan **Tabungan** Simpan Pinjam menurut izin; kartu Tabungan di Ringkasan tidak lagi berupa tautan bagi akun tanpa izin; tombol Bayar Angsuran di dashboard hanya untuk `sp.bayar`; FAB mengikuti `noPerm` (termasuk pembaca awan).

### Diubah
- Uji disesuaikan dengan perilaku baru: `logic-23`, `logic-24`, `logic-26`, `ui-izin.py`, `ui-rbac.py` (Setelan tidak ada untuk non-admin; Petugas Unit unit Air tanpa Simpan Pinjam).

### Tes
- `logic-154.js` (31), `ui-roles.py` (baru: matriks peran × halaman × sub-tab di 390 dan 1280px, modal, FAB, pembaca awan).

## [1.1.149] — 2026-10-08

### Ditambah
- Profil: pengguna yang login (mode pengguna lokal) dapat mengubah data sendiri lewat kartu **Ubah data saya** (`saveProf`, users.js): nama, telepon, alamat. Berlaku untuk semua peran, termasuk peran hanya-lihat, karena hanya menyentuh akun sendiri (tidak termasuk `GUARD`). Peran, unit tugas, status, dan PIN tidak berubah dari sini. Pegawai yang tertaut (`employee_id`) ikut diperbarui. Validasi: nama wajib (maks 60, unik tanpa peka huruf), telepon 6–20 karakter angka, alamat maks 200. Tercatat di jejak audit (`user_ubah`, "oleh pemilik akun"); tanpa perubahan tidak mencatat apa pun. Baris Telepon dan Alamat tampil di Identitas.
- Simpan Pinjam (SP-U): **dialog per aksi** Setujui, Cairkan, Bayar angsuran, dan Lunasi (modal `ls`, `lc`, `lw`, `lz`, modals.js). Kartu global Tanggal/Kas-Bank/Jumlah di rincian pinjaman dihapus. Nilai bawaan terisi, galat tampil per kolom, Batal kembali ke rincian, sukses kembali ke rincian. ID kolom (`sp-date`, `sp-cash`, `sp-mode`, `sp-amt`, `sp-hint`, `cr-hint`, `sp-pay`) dipertahankan sehingga fungsi aksi tidak berubah.
- Data contoh `data/bumdes-data-pihak-pegawai.json` (21 pihak, 8 pegawai, 8 pengguna dengan peran, PIN 123456, tanpa transaksi), pembuatnya `tests/gen-pihak-pegawai.js`, dan panduan `data/setup.md`.

### Diperbaiki
- Uji usang: `ui-a11y.py` (tombol Reset data demo), `ui-cal.py` (geser 6px akibat header menciut), `ui-p0.py` (teks "closed" menjadi "Ditutup").

### Tes
- `logic-152.js` (23, dialog aksi), `logic-153.js` (17, ubah profil), `ui-profil.py` diperluas, `ui-import-pihak-pegawai.py` (baru).

## [1.1.148] — 2026-10-08

### Ditambah
- Halaman Profil (`vProf`, users.js; tab `prof` di `TABS`/`ROUTES`, tidak masuk menu samping/bawah, `NU` tanpa filter unit). `profWho()` menentukan pengguna yang login: pengguna mode lokal (`curUser`) diutamakan, kalau tidak akun awan (email + peran). Isi: kartu profil, Identitas, Akses saya (menu yang boleh dibuka + jumlah izin), Ganti PIN (lokal) / atur ulang kata sandi lewat email (`profReset`, awan), Aktivitas terakhir (audit pengguna), Keluar.
- Chip profil di header (`usrChip` ditulis ulang): avatar `avA`, nama dan peran (`.usn`); tombol Keluar header tetap ada untuk mode pengguna lokal.

### Diperbaiki
- Titik status awan tidak lagi menimpa tulisan "Awan" (padding diperlebar).

### Tes
- `tests/ui-profil.py` (baru), `logic-151.js` (13); `logic-113` tetap lulus (rute `profil`).

## [1.1.147] — 2026-10-08

### Diperbaiki
- Filter unit di sidebar desktop: `unitHome/unitPlace` hanya memindah `<select id="unit">` sehingga tombol kustom `.ub` buatan `uikit.js` hilang saat `#sb` dirender ulang; kini `unitMv(u,p)` memindah select beserta tombolnya.
- Titik status awan menimpa teks "Awan".

### Diubah
- `index.html`: header mendapat `#hic` (ikon halaman) dan `#hdt` (tanggal). `layout.js`: `unitLbl()`, `hdrDate()`, subjudul `nama · unit`, merek dua baris. CSS blok v1.1.147 (kartu `.sbu`, `.hic`, `.hdt`); `header>div:first-of-type` menggantikan `:first-child`.

### Tes
- `tests/ui-chrome.py` (baru), `logic-150.js` (6).

## [1.1.146] — 2026-10-08

### Diubah
- UI-15: `style.css` dipangkas ±2 KB — selektor yang kelasnya tidak ada di JS/HTML atau kombinasi lama (`.li.lgr…`, `.ll.lgl`, `.pt-r`, `.awg`, `.ks.k4`, `.mk-sh`, `.dg…`) dihapus; kelas yang diaktifkan dinamis (`.sh.open`, `.stb.ml/mr`, `.up.sheet`, `.upb.dim`) sengaja dipertahankan. Aturan `@media print{.dc{…}}` baru. Tampilan tidak berubah: 48 screenshot (11 tab + portal × 390/1280 × terang/gelap) identik piksel demi piksel.

### Tes
- `tests/check-css.js` (baru): tak ada kelas CSS tak terpakai, aturan lama tidak muncul lagi, aturan cetak ada.

## [1.1.145] — 2026-10-08

### Diubah
- UI-14: `portal.js` — `ptHomeV` (dua `.card.kp.pt-k` berikon via `ptKp`, dcard tagihan dan mutasi dengan `.upl` + `.tri`), `ptLoansV`/`ptSavV` (dcard berisi `button.upr.pt-it`, avatar `avA`), `ptLoanV`, `ptProfV`, `ptLoginV` (dcard `pt-card`) memakai `dcard`; helper baru `ptKp`, `ptMut`. `cloud.js` — helper `mkH(ico,t)` memberi ikon `.kic` pada judul Masuk, Siapkan BUMDes, Pilih BUMDes; daftar Pilih BUMDes memakai `.upl > button.upr.mk-pk`. CSS blok v1.1.145 di `style.css`. ID, fungsi, dan teks yang diuji tidak berubah.

### Tes
- `logic-149.js` (12): struktur kartu portal dan header layar masuk.

## [1.1.144] — 2026-10-08

### Diubah
- UI-13c: `vSetSP()` (modules.js) memakai pembungkus baru `spCard(t)` yang mengubah tiap `SPK[t]()` (h3 + `.card` berisi `.k` penjelasan dan isian) menjadi `dcard` (judul `h3.ct`, penjelasan jadi subjudul `.cs`; tanpa penjelasan memakai `.dc0`). Isi `SPK` (ID `spc-*`, `fl-*`, `kol-*`, `sv-*`, `sod-*`, dll.) dan fungsi `set*` tidak berubah; bagian lipat `sxG` dan `.spg/.spc` dipertahankan; tombol di dalam dcard boleh membungkus teks.
- Tes: `logic-148.js` baru; `logic-111` disesuaikan (`<h3 class="ct">`).

## [1.1.143] — 2026-10-08

### Diubah
- UI-13b: `vUsr()`, `rolesCard()` (users.js) dan `vPortalSet()` (portal.js) memakai `dcard`. Pengguna: "Aktifkan mode pengguna" (form `us-*` tetap), "Akun saya" (`cp-*`, `chgPin/doLogout`), "Pengguna aplikasi" (`.upr.alr.usr`, avatar `avA`, `.alb` aksi edit / reset PIN / nonaktifkan, lencana status), "Matriks izin" (tabel `tbl` tetap karena matriks, kotak centang `togPerm`), "Matikan mode pengguna" (`.dz`); Portal: "Pengaturan portal" (`sp-portal`) dan "Status penerbitan" (`nsbPubNow`, `ptOpen`). Penanda `<h2>` subT dipertahankan.
- Tes: `logic-147.js` baru; `ui-modal.py` disesuaikan (baris pengguna `.upr`, bukan `tr`).

## [1.1.142] — 2026-10-08

### Diubah
- UI-13a: `vSet0()` dan `vMod()` (modules.js) serta `docSet()` (layout.js) memakai `dcard`. Profil: "Identitas BUMDes" (`.pfc`, grid `.pfg` tetap, ID `bd-*`, `saveBd()`), Dokumen Cetak: "Kop dan tanda tangan" (ID `bd-logo`, `bd-place`, fungsi `logoPick/setSp/setSd`); Modul: "Cara kerja modul" (`.dc0`) dan satu dcard `.mdm` per modul (lencana status, saklar `setMod`). Penanda `<h2>` subT dipertahankan.
- Tes: `logic-146.js` baru.

## [1.1.141] — 2026-10-08

### Diubah
- UI-12: `vDat0()` (views.js), `vFy()` dan `audB()` (closing.js) memakai `dcard`. Backup: kartu "1. Cadangkan data", "2. Pulihkan dari cadangan", "3. Cadangan online (awan)" (`.dwc`, isi `vCloudSet()` tak berubah), "4. Kosongkan semua data" (`.dz`); Periode: "Daftar Periode" (`.upr.dpr`, terurut, ikon `.tri` kunci, aksi `askC('tgl')`); Tutup Buku: "Penutupan tahun buku" (baris unit) dan "Riwayat Penutupan" (baris tahun + batalkan); Audit Log: "Log aktivitas" (`.upr.adr`, avatar pengguna, `<code>` peristiwa, `.aby`, `.ent`). ID form (`bk-f`, `bk`, `bk-x`) dan fungsi tidak berubah; penanda `<h2>` subT dipertahankan. Tabel Periode/Tutup Buku/Audit Log diganti baris.
- Tes: `logic-145.js` baru; `logic-10`, `logic-23`, `logic-62` disesuaikan dengan markup baru Audit Log.

## [1.1.140] — 2026-10-08

### Diubah
- UI-11b: `vPihak`, `vPeg` (payroll.js) dan `vTarifBiaya` (rates.js) memakai `dcard` dan baris `mrw` (`.upr.mdr`, onclick `mdOpen('mdt','k|id')` tetap). Pihak/Pegawai: filter `mq` dan select di dalam dcard, avatar `avA`, Pegawai menampilkan gaji pokok; Tarif/Pajak: avatar, kode versi, jenis, metode, tarif (bertingkat diringkas "Bertingkat" dengan rincian di subjudul), masa berlaku, lencana status; Pratinjau hitung dalam dcard. Daftar jabatan tetap `sxG` (isi memakai `.mpj`). Penanda `<h2>` subT dan semua ID/fungsi form dipertahankan. `mrow/mlist` kini tak dipakai lagi di Master (CSS `.li` dibersihkan di UI-15).
- Tes: `logic-144.js` baru.

## [1.1.139] — 2026-10-08

### Diubah
- UI-11a: `vMst0()` (views.js) bagian Unit Usaha, Kas & Bank, COA memakai `dcard` dan helper baru `mrw` (baris `button.upr.mdr`, onclick `mdOpen('mdt','k|id')` tetap). Unit: avatar `avA`, kode dan jenis, lencana status; Kas: saldo `rp(net())`; COA: filter `mq("aq")` + select `S.aqt` di dalam dcard, chip `.kic.acc`, induk `.mdh`, anak `.mdc`. Teks "N dari M akun" dan "Tidak ada akun yang cocok." dipertahankan; `mrow/mlist` tetap dipakai Pihak/Pegawai/Tarif. Penanda `<h2>` subT dipertahankan.
- Tes: `logic-143.js` baru.

## [1.1.138] — 2026-10-08

### Diubah
- UI-10: `vPay0`, `vKomp`, `vRepGaji` (payroll.js) memakai `dcard`. Proses Gaji: "Buat gaji periode", "Pembayaran gaji", "Daftar Gaji" (`.upr.alr.gjr`, aksi `.alb.gjb` di baris sendiri, lencana status), rincian gaji dalam dcard (`<span id="pd-h">`, ikon `.tri` +/−, form tambah komponen `.gjf`); Komponen: "Master Komponen" berbaris; Laporan: "Filter dan cetak" (`.rpb`), 4 `.card.kp` (`.gjk`), rekap dalam `dcard` `.rpc`. ID form (`gj-*`, `pi-*`) dan fungsi tidak berubah; penanda `<h2>` subT dipertahankan.
- Tes: `logic-142.js` baru.

## [1.1.137] — 2026-10-08

### Diubah
- UI-9b: `vBaca`, `vSamb`, `vTarif` (water.js) memakai `dcard`. Baca Meter: kartu "Periode tagihan" dan "Angka Meter" dengan baris `.upr.bmr` (input `bm_<id>` dan petunjuk `-h` tetap, atau lencana "Sudah ditagih"); Sambungan: "Daftar Sambungan" dengan `.upr.smr` (lencana, `.smw` menunggak), "Ganti Meter", "Riwayat Ganti Meter"; Tarif: "Pengaturan Tarif" dan "Simulasi Tagihan". Helper `avA` dipindah ke tingkat global. ID form (`bm-*`, `gm-*`, `tw-*`) dan fungsi tidak berubah.
- Tes: `logic-141.js` baru.

## [1.1.136] — 2026-10-08

### Diubah
- UI-9a: `vAir()` (water.js) — tab `jual`, `piutang`, `pel`, `prod` memakai `dcard` (form dalam `.alf`; daftar dalam kartu "Daftar Penjualan", "Piutang Pelanggan", "Riwayat Pembayaran", "Daftar Pelanggan", "Daftar Produk") dengan baris `.upr.alr` (avatar `avA`, lencana `stB`, ikon `.tri in` untuk pembayaran, tombol aksi `.alb`). ID form (`j-*`, `ar-*`) dan fungsi (`jual`, `jAdd`, `terima`, `batalJual`, `batalTerima`, `openE`, `togPel`, `togProd`) tidak berubah. Judul `<h2>` ganda di Penjualan/Piutang/Riwayat dihapus karena sudah ada judul kartu. Tab Baca Meter, Sambungan, Tarif belum diubah (UI-9b).
- Tes: `logic-140.js` baru.

## [1.1.135] — 2026-10-08

### Diubah
- Buku Besar desktop (≥900px): baris `.upr.lgr` menjadi grid 7 kolom (ikon D/K, `.lgdd` tanggal, keterangan, `.lgdu` unit, `.lgdb` debit, `.lgkr` kredit, `.lgsa` saldo) dengan header `.upr.lgh`; sel `.lgx` hanya tampil di desktop (disembunyikan di HP dan cetak). Filter dibagi `.lgfg` (akun | cari dan tanggal) sebaris di desktop. Kontrol Mutasi: pilihan urutan 200px, tombol Cetak/CSV di kanan. HP: ringkasan akun 18px agar nominal besar muat, jarak label filter.
- Tes: `logic-138.js` (+3), `ui-nav.py` (kolom hanya di desktop).

## [1.1.134] — 2026-10-08

### Diubah
- UI-8: `vTb()` (Neraca Saldo) memakai `.g.dk.tbk` berisi 3 `.card.kp` (Total debit, Total kredit, Status) dan `dcard` "Saldo per Akun" (`.tbc`) dengan baris `.upr.tbr` (ikon `.tri` D/K, nama, kode · jenis, nominal + Debit/Kredit) dan dua baris total `.upr.lgo`; tabel diganti. Status ✓/⚠ memakai `.rck`.
- Tes: `logic-139.js` baru.

## [1.1.133] — 2026-10-08

### Diubah
- UI-7: `vLed()` (Buku Besar) memakai `dcard` "Akun dan filter" (`.lgf`), ringkasan `.g.dk` berisi 4 `.card.kp` (menggantikan `.card.ks.k4`), dan `dcard` "Mutasi" (`.lgc`) dengan baris `.upr.lgr` (ikon `.tri` D/K, keterangan 2 baris, tanggal · unit, "Saldo …", nominal dan Debit/Kredit) serta baris `.upr.lgo` saldo awal/akhir. Tata letak kolom desktop lama (`.li.lgr`, `.lgh`) tidak dipakai lagi; aturan CSS-nya dibersihkan di UI-15. ID dan fungsi (`ledData`, `ledCsv`, `ledDl`, `mdOpen('td')`) tidak berubah.
- Tes: `logic-138.js` baru; `logic-109.js`, `logic-4.js`, `ui-nav.py` disesuaikan.

## [1.1.132] — 2026-10-08

### Diubah
- UI-6: `repBar` jadi `dcard` "Filter dan cetak" / "Cetak dan unduh" (`.rpb`, `.rbt`); helper `rcard` (dcard + `.rpc`) membungkus Neraca, Laba Rugi (akun dan per unit), Arus Kas, tiap bagian laporan Piutang, Simpan Pinjam (termasuk `spRep2`), dan Unit Air. Aging Piutang memakai `kvr` dengan bar, Piutang terbesar `.upr.rpr`, Kecocokan memakai `kvr` dengan `.rck ok/bad`. Penanda `<h2>` hub (`subT`) dipertahankan; judul bagian dalam berubah dari `<h2>` ke `h3.ct`. Saat cetak: kartu polos, judul dan sub kartu disembunyikan (kop dari `repHead`).
- Gaya: `.rck.ok` dan `.awl li.ok .aws` memakai `--ac` (hijau).
- Tes: `logic-137.js` baru; `logic-66.js` disesuaikan.

## [1.1.131] — 2026-10-08

### Diubah
- UI-5b: `vAwal()` (Transaksi > Saldo Awal) memakai `dcard` "Mulai dari saldo lama" (kartu `kp` berikon, checklist `.awl`), `dcard` "Piutang pelanggan awal" dan "Pinjaman berjalan awal" masing-masing berisi `details.sx.awd` (form; ID `aw-*`/`ap-*`, `awalPv`, `awalPiutang`, `awalPinjam` tidak berubah) dan daftar `.upr.awr` (avatar, sisa, Batalkan, baris Total `.awt`) menggantikan tabel. Penanda `<h2>Saldo Awal Terpandu</h2>` untuk `subT` dipertahankan.
- Tes: `logic-136.js` baru; `logic-60.js` disesuaikan (selektor `details.sx.awd`, checklist).

## [1.1.130] — 2026-10-08

### Diubah
- UI-5: halaman *Transaksi > Transaksi* memakai `dcard` "Daftar Transaksi" dengan baris `.upr.txr` (ikon arus `.tri` dari `TDIR`, keterangan 2 baris, tanggal · unit · jenis `TLX`, nominal; lencana hanya bila bukan diposting; dibatalkan dicoret). Muat lebih banyak dan "tampil n" tetap. Tab *Saldo Awal* dipisah ke UI-5b.

### Diuji
- `logic-135.js` (5); `logic-4.js` disesuaikan (penghitung baris).

## [1.1.129] — 2026-10-08

### Diubah
- UI-4d: tab *Simpan Pinjam > Calon* memakai `dcard` "Daftar Calon" dengan baris `.upr.clr` (avatar, nama, telepon · keperluan · dicatat, rencana pinjaman, status); keterangan kosong tidak lagi menampilkan "- · -"; kosong memakai `.empty`. Dengan ini seluruh sub-tab Simpan Pinjam (UI-1 sampai UI-4) selesai.

### Diuji
- `logic-134.js` (6).

## [1.1.128] — 2026-10-08

### Diperbaiki
- Tautan nomor pinjaman di modal *Jaminan* tampil sebagai tautan biru bawaan browser. Kini memakai kelas `a.lkx` (warna aksen, tebal, ikon panah, area sentuh 36px, fokus terlihat, ikut mode gelap); baris `.kv` dengan tautan rata tengah.

### Diuji
- `logic-132.js` ditambah satu pemeriksaan (total 5).

## [1.1.127] — 2026-10-08

### Diubah
- UI-4c: tab *Simpan Pinjam > Nasabah* memakai `dcard` "Daftar Nasabah" dengan baris `.upr.nsr` (avatar, nama, telepon · tabungan · alamat, jumlah pinjaman aktif, sisa pokok, status); kosong memakai `.empty`.

### Diuji
- `logic-133.js` (4); `logic-39.js` disesuaikan.

## [1.1.126] — 2026-10-08

### Diubah
- UI-4b: tab *Simpan Pinjam > Jaminan* memakai `dcard` "Daftar Jaminan" dengan baris `.upr.jmr` (avatar, nama nasabah, nomor pinjaman · jenis · deskripsi, nilai taksiran, status); kosong memakai `.empty`.

### Diuji
- `logic-132.js` (4); `logic-39.js` disesuaikan.

## [1.1.125] — 2026-10-08

### Diubah
- UI-4a: tab *Simpan Pinjam > Tunggakan* memakai gaya dashboard. `tgList`, `kolBox`, `parBox`, `remBox` (dan *Aging Tunggakan* di `loans.js`) menghasilkan `dcard`; tabel diganti baris `kvr` (helper baru di `layout.js`: judul, nilai, keterangan, bar `lru-b`) dan daftar `.upr` (`.tgr`, `.rmr`). `parBox` juga dipakai di laporan Simpan Pinjam, sehingga tampil sebagai kartu di sana.

### Diuji
- `logic-131.js` (5); `logic-39.js` disesuaikan.

## [1.1.124] — 2026-10-08

### Diubah
- UI-3: tab *Simpan Pinjam > Tabungan* memakai gaya dashboard: kartu total berikon (`kic t6`), `dcard` *Proses akhir bulan* (`savProc`), `dcard` *Daftar Rekening* dengan baris `.upr.snr` (avatar, nama, nomor · produk · unit · mutasi terakhir, saldo, status) dan keterangan akun 2300 di dasar kartu; kosong memakai `.empty`.

### Diuji
- `logic-130.js` (6).

## [1.1.123] — 2026-10-08

### Diubah
- UI-2: tab *Simpan Pinjam > Pinjaman* memakai `dcard` "Daftar Pinjaman" berisi filter dan daftar baris `.upr.lnr` (avatar, nama nasabah, nomor · tenor× · bunga, label sisa pokok/pokok, nominal, lencana status). Muat lebih banyak dan "Menampilkan x dari y" tetap; kosong memakai `.empty`.

### Diuji
- `logic-129.js` (5); `logic-38.js` dan `logic-42.js` disesuaikan; selektor `.li` di tes UI diperluas menjadi `:is(.li,.upr)`.
- Catatan: `ui-cal.py` (Saldo Awal 390px, gulir 618→612) dan `ui-a11y.py` (mencari tombol "Reset data demo" yang sudah tidak ada) gagal juga pada v1.1.121, bukan akibat rilis ini; masuk daftar perbaikan tes.

## [1.1.122] — 2026-10-08

### Diubah
- UI-1: tab *Simpan Pinjam > Ringkasan* memakai gaya dashboard. `spk` dan kartu Tabungan nasabah (`savCard`, `savings.js`) kini memakai ikon `kic` (sp, flag, cal, user, cash); kartu rata atas.
- *Akan jatuh tempo (30 hari)* menjadi `dcard` dengan daftar `.upr` (avatar, nama nasabah, nomor pinjaman · angsuran ke-n · tanggal, tagihan, lencana); keadaan kosong memakai `.empty`. Jangkar `#sp-upc` dipertahankan.

### Diperbaiki
- Banner pengingat backup (`.wn.bn`) di HP terpotong menjadi satu baris; kini membungkus dan rata kiri.

### Diuji
- `logic-128.js` (4); `logic-42.js` disesuaikan.

## [1.1.121] — 2026-10-08

### Diubah
- *Transaksi terakhir* di dashboard memakai gaya kartu yang sama dengan kartu lain (`dcard`, kelas `rc trl`): ikon arus (`TDIR`), keterangan satu baris dengan elipsis, nominal tebal, tombol lihat semua selebar kartu.
- Label jenis transaksi di kartu ini lebih ramah lewat `TLX` (config.js), mis. `sav_setor` menjadi "Setoran Tabungan", `loan_fee` menjadi "Biaya Pinjaman". `TL` (audit dan daftar transaksi) tidak berubah.

### Diuji
- `logic-127.js` (10), `logic-106.js` disesuaikan.

## [1.1.120] — 2026-10-08

### Dihapus
- Grafik *Pendapatan per Unit* di dashboard (sama informasinya dengan *Laba Rugi per Unit*). CSS varian halus `.bars.bpu` dari v1.1.119 ikut dihapus.

### Diubah
- Kartu *Laba Rugi per Unit* dipindah ke grup dua kolom bersama *Ringkasan Bulan Ini* (sebelum Tren 6 Bulan); catatan *Umum (tanpa unit)* ditaruh di bawah grup.

### Diuji
- `logic-127.js` (7) dan `logic-107.js` disesuaikan.

## [1.1.119] — 2026-10-08

### Diubah
- Grafik *Pendapatan per Unit* di dashboard dibuat lebih halus (`.bars.bpu`): tinggi 210px menjadi 132px, batang lebih ramping dengan sudut lebih kecil, warna sorotan lembut tanpa gradien, avatar dan teks lebih kecil. Grafik Pola Transaksi per Hari tidak berubah.

### Diuji
- `logic-127.js` ditambah satu pemeriksaan.

## [1.1.118] — 2026-10-08

### Diubah
- Bagian *Laba Rugi per Unit* di dashboard diganti dari tabel menjadi kartu daftar yang lebih bersih dan modern: avatar unit (warna sama dengan grafik Pendapatan per Unit), baris ringkas pendapatan dan beban, angka laba menonjol (merah bila rugi), bar tipis beban terhadap pendapatan (merah bila beban melebihi pendapatan), dan baris total unit. Kelas CSS `lru-*`.

### Diuji
- `logic-127.js`.

## [1.1.117] — 2026-10-08

### Diubah
- Dashboard diprioritaskan: blok *Perlu perhatian* dan aksi cepat di paling atas, lalu angka utama (Total Kas & Bank, Tunggakan, Jatuh tempo 7 hari, Pendapatan, Beban, Laba/Rugi, Piutang Pinjaman, Tabungan, Piutang Pelanggan), kemudian ringkasan bulan, tren, dan tabel.
- Pengingat backup dan banner cadangan awan menjadi satu baris ringkas dengan tombol kecil (`.wn.bn`); pesan tanpa peringatan dipersingkat.

### Diuji
- `logic-126.js` (urutan dashboard dan banner ringkas).

## [1.1.116] — 2026-10-07

### Diubah
- Header di HP lebih ringkas (padding dan ukuran dikurangi, filter unit lebih sempit) dan menyusut saat halaman digulir (`body.hc`); judul dan nama BUMDes dipotong dengan elipsis.

### Ditambah
- Ikon status awan di header (`awChip`): hijau tersinkron, kuning menyimpan/menunggu, merah perlu dicek (dijeda, offline, belum disimpan), abu-abu belum masuk. Disembunyikan bila awan belum diatur. Diketuk membuka Data > Backup (bagian awan). Ikon `cloud` baru.

## [1.1.115] — 2026-10-07

### Diubah
- Bagian awan di Data > Backup disederhanakan untuk pengguna akhir: satu kartu status dengan tombol utama, Simpan otomatis, dan "Pengaturan lanjutan" tertutup berisi Riwayat cadangan, Koneksi, Ganti kata sandi, Tabel relasional, dan Tentang awan. Dua kolom lama dihapus. Judul menjadi "Cadangan online (awan)"; ikon dan id tombol tetap.

## [1.1.114] — 2026-10-07

### Diubah
- Pengaturan Awan (koneksi, akun, sinkron, riwayat, tabel relasional) dipindah dari Setelan ke Data > Backup (bagian 3 "Sinkron ke awan"). Tab Awan di Setelan dihapus; rute `/setelan/awan` tidak ada lagi.
- Petunjuk "Setelan > Awan" di pesan dan dokumen diganti "Data > Backup". Akun yang belum menjadi anggota BUMDes diarahkan ke Data > Backup.

## [1.1.113] — 2026-10-07

### Diubah
- Profil BUMDes (nama, alamat, logo) kembali ikut tersinkron dengan awan: Muat dari awan, pemulihan riwayat, dan berpindah BUMDes memuat profil dari awan (membatalkan perubahan v1.1.112). Import JSON dan Kosongkan data tetap menjaga profil.

## [1.1.112] — 2026-10-07

### Diubah
- Muat dari awan, pemulihan riwayat versi, dan berpindah BUMDes tidak lagi menimpa profil BUMDes perangkat (nama, alamat, logo). Perangkat dengan profil bawaan (BUMDes Contoh tanpa alamat/logo) memakai profil dari awan dengan nama awan.

## [1.1.111] — 2026-10-07

### Diubah
- Data > Backup ditata ulang menjadi Cadangkan, Pulihkan, dan Kosongkan semua data.
- Import JSON tidak lagi menimpa profil BUMDes (nama, alamat, logo); salinan data sebelum impor disimpan sebagai cadangan lokal.
- Nama berkas export memuat nama BUMDes.

### Ditambah
- Kosongkan semua data: kata kunci KOSONGKAN, dialog konfirmasi dengan rincian, profil BUMDes, pengguna, peran, dan pengaturan dipertahankan, audit log mencatat, salinan lama disimpan lokal.
- "Reset data demo" menjadi "Isi data contoh" (disembunyikan dalam rincian); profil BUMDes tidak ikut berubah dan salinan lama disimpan lokal.

## [1.1.110] — 2026-10-07

### Diperbaiki
- Nama BUMDes bisa berbeda antara Profil (data perangkat) dan awan (tabel `bumdes`, mis. "Sumber Rejeki" vs "Mertha Bhuana"). Kini Siapkan BUMDes menjadikan nama yang diisi sebagai nama Profil, dan admin yang menyimpan Profil atau memuat data awan memperbarui nama awan (`cloudRenameChk`). Pengurus/pembaca tidak mengubah nama awan.

## [1.1.109] — 2026-10-07

### Diubah
- Layar Siapkan BUMDes: galat validasi dan galat server tampil di kotak merah permanen (`role=alert`), semua masalah isian ditampilkan sekaligus, kata sandi dipertahankan saat gagal, ikon mata tampilkan/sembunyikan kata sandi (juga di layar Masuk), batas waktu 25 detik untuk daftar dan penyiapan.

## [1.1.108] — 2026-10-07

### Diubah
- Berkas SQL dipindah ke folder `sql/` dengan nama bernomor menurut urutan pasang (`00_semua`, `01_inti` … `07_pengguna`, `99_reset`). Build, tes, pesan galat aplikasi, dan dokumen disesuaikan. Isi SQL tidak berubah.

## [1.1.107] — 2026-10-07

### Diubah
- Model awan: 1 aplikasi (hosting) = 1 database Supabase = 1 BUMDes. Tabel `bumdes` dibatasi satu baris; `create_bumdes` diganti `setup_status()` dan `setup_bumdes(nama)` (sekali saja, penyiap menjadi admin).
- Layar masuk: "Siapkan BUMDes" (email, kata sandi, nama); mendukung konfirmasi email Supabase.
- Portal nasabah tidak lagi memeriksa status BUMDes.

### Dihapus
- Peran developer, daftar/pemilih BUMDes, `supabase_developer.sql` (hapus juga dari repositori Git).

### Ditambah
- `supabase_reset.sql` (dengan kunci konfirmasi), `tests/sql-reset.sh`, `tests/supabase-test7.sql`, `logic-121.js`, `ui-siapkan.py`.

## [1.1.106] — 2026-10-07
### Diperbaiki
- **Developer dan admin tampak sama karena deteksi developer gagal diam-diam.** `devChk` kini mengembalikan `dev`/`bukan`/`galat` dan menyimpan `dev_err` (mis. "Fungsi developer belum terpasang. Jalankan supabase_developer.sql"); peringatan tampil di Setelan > Awan.
### Ditambahkan
- Tombol **Cek peran akun** (`devCek`) di Setelan > Awan: pesan jelas "Akun ini DEVELOPER platform", "Akun ini BUKAN developer (belum ada di platform_admins)", atau penyebab galat.
- Tes: `logic-120.js` (8).

## [1.1.105] — 2026-10-07
### Diubah
- **Setelan > Awan kini membedakan akun developer dan admin BUMDes.** Developer (tanpa BUMDes terpilih): kartu "Konsol Developer" di kolom kiri (tombol buka halaman Developer + penjelasan), ringkasan berisi Peran "Developer (platform)" dan jumlah BUMDes klien; Sinkron, Riwayat cadangan, Tabel relasional, dan pemilih "BUMDes di awan" disembunyikan karena khusus akun BUMDes. Admin/pengurus/pembaca: tampilan seperti sebelumnya tanpa konsol developer. Akun yang developer sekaligus anggota BUMDes mendapat keduanya. `isDev`, `devC` di `vCloudSet`.
- Tes: `logic-119.js` (7).

## [1.1.104] — 2026-10-07
### Diubah
- **Setelan > Awan dioptimalkan untuk desktop.** Di layar ≥900px isi dibagi dua kolom (`.awg/.awc`): kiri Sinkron, Riwayat cadangan, Tabel relasional; kanan Koneksi, BUMDes di awan, Ganti kata sandi, Developer, Tentang awan. Kartu Sinkron kini selebar kolom (sebelumnya lebih sempit dari kartu lain). Di HP tetap satu kolom, urutan: Sinkron, Riwayat, Tabel, lalu pengaturan.
- Judul "Tabel relasional (Tahap 2)" menjadi "Tabel relasional" (sudah mencakup Tahap 2–5) dengan lencana "terisi", "galat", atau jumlah selisih.
- Tes: `ui-awan2.py` diperluas (dua kolom desktop, satu kolom HP, tanpa overflow).

## [1.1.103] — 2026-10-07
### Ditambahkan
- **Tabel relasional Tahap 5.** `supabase_tahap5.sql` (baru, berkas [6/8]): `products`, `sales`, `sale_items`, `payments`, `water_connections`, `water_readings`, `collaterals`, `rate_master`, `tax_master`, `collection_notes`, `prospects` (kolom penting + `doc` utuh), RLS seperti tahap lain, fungsi `migrate_snapshot_to_tables5` dan `tabel_status5` (jumlah baris, total penjualan dan pembayaran berstatus posted, nilai jaminan).
- Setelan > Awan > Tabel relasional: baris Tahap 5 dan 3 total pembanding muncul otomatis bila SQL terpasang; bila belum, tidak dianggap selisih dan pesan menunjuk `supabase_tahap5.sql`. `TBL5`, `tbl5`.
- Berkas SQL kini **8** bernomor `[1/8]`…`[8/8]` (nasabah jadi [7/8], pengguna [8/8]); `supabase_semua.sql` ikut.
- Tes: `logic-118.js` (12), `supabase-test6.sql` (24; total SQL 141 cek), `ui-awan2.py` diperluas.
- Proyek Supabase yang sudah ada: jalankan `supabase_tahap5.sql` sekali.

## [1.1.102] — 2026-10-07
### Ditambahkan
- **Konsol Developer: tombol "Masuk ke BUMDes".** Di tab BUMDes, tiap BUMDes aktif punya tombol itu: sesi developer ditutup, layar login terbuka dengan spanduk "Masuk ke {nama}" (+ "Bukan BUMDes ini"). Login dengan akun anggota langsung membuka BUMDes tujuan; akun bukan anggota ditolak dengan pesan jelas dan layar tetap bertarget. BUMDes nonaktif tidak bisa dimasuki. `dvMasuk`, `lgTgOff`, `S.lgtg`, cabang di `entRoute`.
- Tes: `logic-117.js` (8), `ui-dev.py` diperluas.

## [1.1.101] — 2026-10-07
### Ditambahkan
- **Tabel relasional Tahap 4: tabungan.** `supabase_tahap4.sql` (baru, berkas [5/7]): `savings_accounts` dan `savings_tx` (kolom penting + `doc` utuh), RLS seperti tahap lain (anggota baca, admin/pengurus tulis, admin hapus, `anon` tanpa akses), fungsi `migrate_snapshot_to_tables4` (samakan dengan snapshot, idempoten) dan `tabel_status4` (jumlah baris dan **saldo tabungan** = setor + bunga − tarik − biaya, hanya mutasi posted). Setelan > Awan > Tabel relasional otomatis ikut mengisi dan membandingkan rekening, mutasi, dan total saldo bila berkas terpasang; bila belum, baris tabungan disembunyikan dan pesan jelas menunjuk `supabase_tahap4.sql`.
### Diperbaiki
- **Daftar BUMDes awan** (Setelan > Awan dan halaman masuk) kini hanya memuat BUMDes milik akun yang masuk. Sebelumnya permintaan tidak memfilter `user_id`, padahal kebijakan RLS memperlihatkan semua anggota dari BUMDes yang sama: BUMDes dengan beberapa anggota bisa muncul berulang, dan perannya bisa terbaca dari anggota lain (admin terbaca "pembaca" dan gagal menyimpan). Kini difilter menurut `sub` token akun sendiri, duplikat digabung dengan peran tertinggi.
### Diubah
- Berkas SQL kini **7** dan bernomor berurutan `[1/7]`…`[7/7]` (schema, developer, tahap2, tahap3, tahap4, nasabah, pengguna); `supabase_semua.sql` memuat ketujuhnya. Sisa yang belum jadi tabel: penjualan/Unit Air, jaminan, tarif dan pajak, produk tabungan, pengguna dan peran.

## [1.1.100] — 2026-10-07
### Ditambahkan
- Alamat per halaman kini mencakup **sub-tab semua menu**: `/transaksi/saldo-awal`; `/master/kas-bank|akun|pihak|pegawai|tarif-biaya`; `/data/periode|audit-log`; `/gaji/komponen|laporan`; `/simpan-pinjam/pinjaman|tabungan|tunggakan|jaminan|nasabah|calon`; `/unit-air/sambungan|piutang|tarif|penjualan-lain|pelanggan|produk`; `/laporan/laba-rugi|arus-kas|piutang|simpan-pinjam|unit-air` (selain `/setelan/...` dari v1.1.098). Sub-tab bawaan tidak diberi akhiran (mis. `/laporan` = Neraca). Back/Forward, refresh, dan buka langsung berfungsi untuk semuanya; sub-rute tak dikenal jatuh ke sub-tab bawaan. Peta rute ada di `RT_SUB` (layout.js); `vercel.json` tidak perlu diubah.

## [1.1.099] — 2026-10-07
### Diubah
- **Cetak laporan dioptimalkan** (Neraca, Laba Rugi, Arus Kas, Piutang, Simpan Pinjam, Unit Air, Laporan Gaji): kartu ringkasan dan kartu pemilih laporan tidak ikut tercetak; judul layar ganda disembunyikan sehingga kertas diawali kop BUMDes; tabel kembali berbentuk tabel (sebelumnya tercetak sebagai kartu tampilan ponsel); kepala tabel berulang di tiap halaman dan baris tidak terpotong; ukuran huruf 10,5pt; halaman A4 dengan margin dan nomor halaman ("Halaman 1 dari 3", Chrome/Edge); tema gelap selalu tercetak hitam di atas putih.
- Ditambah blok penutup yang hanya tampil saat cetak: tanggal tempat penandatanganan (Setelan > Profil), kolom Bendahara dan Direktur (nama dari Profil; Direktur bisa disembunyikan), serta catatan "Dicetak … oleh … · Sistem BUMDes vX".

## [1.1.098] — 2026-10-06
### Ditambahkan
- **Alamat per halaman (web route)** lewat History API: `/dashboard`, `/laporan`, `/transaksi`, `/simpan-pinjam`, `/unit-air`, `/gaji`, `/buku-besar`, `/neraca-saldo`, `/master`, `/data`, `/setelan`, dan sub-tab Setelan (`/setelan/pengguna|modul|simpan-pinjam|portal|awan`). Tombol Back/Forward browser berfungsi, halaman bisa di-bookmark/dibagikan dan refresh tetap di halaman yang sama. Menu yang tidak diizinkan atau modul nonaktif tetap dialihkan seperti biasa.
- `vercel.json`: `rewrites` agar semua alamat rute membuka `index.html`. Tautan lama `#developer`, `#masuk`, `#portal` tetap bekerja.
### Diubah
- `index.html`: skrip kecil di kepala memasang `<base>` dinamis (hanya di http/https) supaya skrip, gaya, dan ikon tetap termuat dari alamat bersarang; tautan "Lewati ke konten" memakai fokus, bukan `#main`. Tautan pemulihan kata sandi memakai alamat dasar aplikasi, bukan alamat halaman. Di `file://` dan berkas `bumdes.html` mandiri, alamat tidak berubah.

## [1.1.097] — 2026-10-06
### Diperbaiki
- Memilih atau membuat BUMDes awan kedua di perangkat yang sama tidak lagi menyalin data perangkat ke BUMDes itu (sebelumnya dua BUMDes awan berisi database yang sama, hanya beda nama). Kini data perangkat dipisah per BUMDes: BUMDes baru/kosong dimulai kosong, BUMDes yang sudah berisi dimuat dari awan, data sebelumnya dicadangkan lokal (`bumdes_db_v1_prev`) dan tetap aman di awan. Perpindahan ditahan bila ada perubahan belum tersimpan. Pilihan pertama kali (perangkat belum tertaut) tetap membawa data perangkat ke awan. BUMDes asal data dicatat di `meta.cloud_bid`.

## [1.1.096] — 2026-10-06
### Diubah
- Setelan dioptimalkan untuk desktop di semua sub-tab (≥900px): kartu Modul dua kolom; pengaturan Simpan Pinjam di tiap kelompok tersusun dua kolom kartu. Profil dan Awan sudah berdampingan/lebar; Pengguna & Peran dan Portal Nasabah tetap. Ponsel tetap satu kolom. Tidak ada perubahan data.

## [1.1.095] — 2026-10-06
### Diubah
- Setelan > Profil dioptimalkan untuk desktop (≥900px): isian Profil BUMDes dua kolom (nama, alamat, No. Perdes melebar penuh) dengan kartu Dokumen Cetak di sampingnya; di ponsel tetap satu kolom. Setiap isian kini punya label terhubung (`for`). Tidak ada perubahan data.

## [1.1.094] — 2026-10-04
**Optimalisasi Buku Besar.** views.js: `ledData()` (baris, saldo berjalan, saldo awal sebelum tanggal awal, saldo akhir, total debit/kredit), `vLed` ditulis ulang: ringkasan 4 kartu (saldo akhir + saldo normal Debit/Kredit, total debit, total kredit, jumlah mutasi), pilihan akun dikelompokkan per tipe dengan jumlah mutasi `(n)`, daftar baris kompak (di HP dua baris per mutasi, di desktop kolom Debit/Kredit/Saldo) yang membuka rincian transaksi saat disentuh, tanda "dibatalkan", unit pada tampilan "Semua unit", baris Saldo awal (bila ada tanggal awal) dan Saldo akhir, pilihan urutan terlama/terbaru dulu (`S.lsd`), Cetak dan Unduh CSV (`ledCsv`/`ledDl`), kepala cetak. Tinggi halaman di HP 5291 → 3971 px. style.css: `.ks.k4`, `.li.lgr`, `.lgo`. Uji: `logic-109.js` (22); `logic-4.js` menyesuaikan pencacah baris.

## [1.1.093] — 2026-10-04
**SQL Supabase dirapikan (tanpa perubahan fungsi).** Keenam berkas SQL kini berkepala seragam (`[n/6]` urutan pasang, Isi, Prasyarat, Dijalankan, Dipakai oleh, Catatan), judul bagian satu gaya selebar 78 kolom, nomor versi dihapus dari kepala (cepat usang). Baru: `supabase_semua.sql`, gabungan otomatis menurut urutan pasang (schema, developer, tahap2, tahap3, nasabah, pengguna) untuk proyek baru dengan sekali tempel; dibangkitkan `node build.js` dan diperiksa `node build.js --check`. `SUPABASE.md` ditulis ulang: pasang cepat, tabel berkas dan urutan, penamaan Tahap 1/2/3 tidak lagi bentrok (portal nasabah bukan "Tahap 3"), status Tahap 2 diperbarui. Uji: `tests/sql-run.sh` (Postgres 16, basis data baru per uji; mode `semua` memasang gabungan dua kali), 100 pemeriksaan lulus di kedua mode; `tests/check-sql.js` (85 pemeriksaan gaya, idempoten, tanpa rahasia, gabungan utuh dan berurutan).

## [1.1.092] — 2026-10-04
**Sidebar disesuaikan.** Tombol "Ciutkan" berlabel di dasar sidebar diganti tombol bulat mengambang (`#cb` di index.html, di luar `#sb`) yang menempel di tepi kanan sidebar dan ikut bergeser saat diciutkan/dibuka; hanya tampil di desktop, punya `aria-label`/`aria-expanded`. Gaya sidebar lebih ringan: logo bermerek dalam kotak, butir aktif berlatar hijau muda (bukan hijau penuh), ikon seragam, mode ciut dengan ikon di tengah dan pemisah antargrup. Uji: `ui-nav.py` ditambah 3 pemeriksaan.

## [1.1.091] — 2026-10-04
**Laporan bergaya kartu (isi laporan tidak berubah).** reports.js: `repKpi()` (kartu ringkasan 5 sel: Total Aset, Pendapatan, Beban, Laba/Rugi bersih, Kas & Bank; mengikuti filter tanggal/unit) dan `repSel()` (pemilih laporan berupa kartu ikon + deskripsi + angka kunci; tetap `role="tab"`, satu aktif, navigasi panah). `vRep` menyusun ringkasan, pemilih, lalu isi laporan (`subT` tetap, bar tab diganti pemilih). views.js: `tabAct`/`tabKey` mengenali `.rsel`. style.css: `.ks`, `.rsel`, `.rcd`; tabel dua kolom di HP membungkus teks agar angka tidak terpotong. Uji: `logic-108.js` (21).

## [1.1.090] — 2026-10-04
**Dashboard bergaya kartu analitik.** views.js: pembantu `cmp` (angka ringkas rb/jt/M), `dlt` (delta ▲▼ hijau/merah menurut arah baik/buruk), `dcard` (kartu bertajuk), `areaSvg` (grafik area pendapatan + garis putus beban). `vDash`: kartu ringkasan berikon (`kp(...,ico,tone)`, ikon baru `tup/tdn/chart` di layout.js) dengan delta bulan ini vs bulan lalu; kartu "Ringkasan Bulan Ini" (2×2: pendapatan, beban, laba, jumlah transaksi); "Pendapatan per Unit" (batang berinisial, tertinggi disorot); "Tren 6 Bulan" lebar (angka besar di kiri, area di kanan, "Lihat angka" tetap); "Pola Transaksi per Hari" (90 hari, Min–Sab); "Saldo Kas & Bank" (total besar, bar komposisi, daftar rekening dengan persen). style.css: token warna `--c1..--c6` (terang/gelap), `.dc`, `.dgr`, `.ov`, `.bars`, `.seg`, `.sl`; kisi 4 kolom di desktop. Uji: `logic-107.js` (12), `logic-106.js` disesuaikan.

## [1.1.089] — 2026-10-04
**Optimalisasi Dashboard.** `vDash` (views.js): kartu baru "Jatuh tempo 7 hari" (angsuran belum lunas, pinjaman aktif, ikut filter unit) dan "Tabungan Nasabah" (akun 2300); kartu Pendapatan/Beban/Laba memberi keterangan periode dan margin; "Perlu perhatian" diringkas 3 teratas dengan tombol Tampilkan semua/Ringkas (`S.alAll`); baris Total pada Saldo Kas & Bank; bagian baru "Transaksi terakhir" (5 terbaru, daftar `.rc` di style.css) dengan tautan ke Transaksi; Laba Rugi per Unit memakai ringkasan "Total unit" dan menjelaskan selisih "Umum (tanpa unit)". Uji: `logic-106.js`.

## [1.1.088] — 2026-10-04
**Optimalisasi halaman Master (tanpa perubahan data).** Tambah helper `mq`/`mhit`/`ACCT_T` (views.js). Unit Usaha dan Kas & Bank menampilkan hitungan; Chart of Accounts: hitungan, cari kode/nama (`S.aq`), filter tipe (`S.aqt`, label Indonesia), daftar datar saat difilter; Mitra: cari nama/telepon/alamat (`S.pq`); Pegawai: cari (`S.eq`) + filter status (`S.efs`), "Daftar jabatan" dilipat (`sxG("posl")`); Tarif & Biaya: cari (`S.tq`). Uji: `logic-105.js` (20); uji UI Setelan disesuaikan ke tab Simpan Pinjam (`S.su='sp'` + bagian terbuka).

## [1.1.087] — 2026-10-04
**Optimalisasi Setelan (tanpa perubahan fungsi).** Urutan tab: Profil, Pengguna & Peran, Modul, Simpan Pinjam (baru), Portal Nasabah, Awan. `vSet0` kini hanya profil + `docSet()`; 13 kartu pengaturan Simpan Pinjam dipindah ke `vSetSP()` (`SPK` per kartu, `SPG` pengelompokan) dalam 5 bagian lipat `sxG` (`dxG`; bagian pertama terbuka, status buka disimpan di `S.dx`): Jasa, denda, nomor, batas / Alur, kontrol, dan kolektibilitas / Tabungan dan deposito / Akuntansi fee / Dokumen dan penagihan. Kartu "Simpan Pinjam" lama (nomor dan denda) berjudul "Nomor dan Denda". Tes: `logic-104.js` (8); logic-57/58/59/65/68/69/70/75 memakai `vSetSP()`; ui-bobot/denda/akad/feesplit/sod/spm membuka tab Simpan Pinjam; ui-nav memakai pencocokan tombol Simpan yang persis (tab baru bernama "Simpan Pinjam").

## [1.1.086] — 2026-10-04
**Tabel relasional Tahap 3: pegawai dan gaji.** `supabase_tahap3.sql` (baru): `employees`, `payroll_components`, `payrolls`, `payroll_items`, `salary_payments` (kolom penting + `doc`, RLS: anggota baca, admin/pengurus tulis, admin hapus), `migrate_snapshot_to_tables3` (menyamakan dengan snapshot: baris yang sudah tidak ada ikut dihapus; PIN pengguna tidak disalin) dan `tabel_status3`. Aplikasi: `tbl3()` dipanggil dari `tblSync` setelah Tahap 2; bila fungsi belum ada (`cloudMsg` memberi pesan khusus) baris Tahap 3 disembunyikan dan tidak dihitung selisih (`cloudSet({tbl3:0})`); `tblLocal`/`tblCmp` menambah 5 koleksi dan total gaji bersih. Diuji di Postgres 16 lokal (isi, samakan setelah hapus, pembaca ditolak). Tes: `logic-103.js` (6), `ui-awan2.py` diperluas (Tahap 3 ada/tidak ada).

## [1.1.085] — 2026-10-04
**Pengguna dari pegawai dan PIN awal 1234.** `PIN0="1234"`; form pengguna: PIN kosong memakai PIN0 (`must_change` tetap true; `chgPin` menolak PIN baru sama dengan lama sehingga 1234 tidak bisa dipertahankan). `usDariPegawai()` (izin `pengguna.kelola`): pegawai aktif tanpa akun (`employee_id` atau nama sama) dibuatkan pengguna dengan `role_id` bawaan jabatan (bukan Superadmin, peran aktif), unit tugas dari unit pegawai; yang jabatannya tanpa peran dilewati dan dilaporkan. `supabase_pengguna.sql` (baru, di luar zip aplikasi): `app_pin_hash` (sama persis dengan `pinHash`: sha256 + 2000 putaran) dan `buat_pengguna_dari_pegawai(p_bumdes, p_pin)` memodifikasi snapshot di server (admin BUMDes atau peran postgres), menaikkan versi dan mencatat riwayat. Diuji di Postgres 16 lokal (hash cocok, lewati nonaktif/tanpa peran/nama ada, idempoten, pengurus ditolak). Tes: `logic-102.js` (11).

## [1.1.084] — 2026-10-04
**Jabatan umum bawaan (laporan: daftar jabatan masih kosong).** `posSeed()` mengisi `POS0` (Direktur, Sekretaris, Bendahara, Kepala Unit Usaha, Kasir, Petugas Unit, Petugas Kredit, Surveyor/Analis, Staf Administrasi) sekali lewat `posSync()` bila `settings.positions_seed` belum ada (berlaku untuk data baru dan lama; penanda mencegah jabatan yang dihapus muncul lagi), dengan `role_id` bawaan hanya bila peran ada. Tombol `posDef()` "Isi jabatan umum" (izin `master.kelola`, diaudit) menambah yang belum ada tanpa menggandakan. Tes: `logic-99.js` (24, +6), `logic-99/101` menyetel `positions_seed`.

## [1.1.083] — 2026-10-04
**Perapian dokumen (tanpa perubahan fungsi).** `CHANGELOG.md` dipecah: v1.1.041 ke atas tetap, rilis lama dan seri `0.1.NNN` pindah ke `CHANGELOG_ARSIP.md` (163 KB → 33 KB). Baris panjang di ROADMAP (Posisi), README dan SUMMARY (Simpan Pinjam, Antarmuka, App Shell) diringkas dan merujuk CHANGELOG; `tests/README.md` diurutkan terbaru di atas; `release_notes.md` diperbarui (tanggal, jumlah berkas uji, batasan data awan, urutan tabel).

## [1.1.082] — 2026-10-04
**Pengguna dipilih dari daftar pegawai.** Form pengguna punya pilihan `us-e` (pegawai aktif; `usPick` mengisi nama, unit tugas, dan peran bawaan jabatan). Pengguna menyimpan `employee_id` (satu pegawai satu akun; kosong = manual). Jabatan menyimpan `role_id` (peran bawaan, bukan Superadmin) lewat modal bawaan jabatan (`ps-r`). Tes: `logic-101.js` (7).

## [1.1.081] — 2026-10-04
**Komponen gaji: nominal / % gaji pokok / % laba (sebelum-sesudah beban gaji), ceklist pegawai, bawaan jabatan.** Master `payroll_components` kini punya `calc` (`tetap`|`persen_gaji`|`persen_laba`), `value` (nilai bawaan) dan `basis` (`sebelum`|`sesudah`, hanya persen laba); `calc` dan jenis terkunci bila sudah dipakai; data lama tanpa `calc` = nominal tetap (`ecAmt`). Komponen pegawai: `{component_id, amount}` (nominal) atau `{component_id, rate}` (persen). Form pegawai memakai `kChecklist("pg")`/`kRead` (pola ceklist biaya pencairan; label tersembunyi `.sr` untuk aksesibilitas) menggantikan tabel + form tambah (`ecAdd`/`ecDel` tetap ada untuk kompatibilitas). `payGen`: nominal dan % gaji pokok dihitung dulu; % laba memakai `labaGaji(periode, unit, sebelum)`: laba bulan itu (tanpa jurnal penutup, filter unit bila pegawai berunit); "sebelum" menambahkan kembali beban gaji (ACC5100 transaksi `payroll`), "sesudah" mengurangi beban gaji periode (gaji pokok + tunjangan + komponen non-laba semua pegawai di lingkup yang sama, termasuk draf; komponen % laba tidak dihitung ke beban agar tidak melingkar). Laba nol/rugi: item tidak dibuat. Nama item memuat persentase dan dasar. Bawaan jabatan: `positions[]` memuat `base_salary/allowance/deduction/comps`; modal `ps` (`openPs`, `savePosDef`), `posPick` mengisi form pegawai baru saja. Tes: `logic-100.js` (23), `logic-13/25` disesuaikan, `ui-modal.py`/`ui-nav.py` memakai ceklist dan Jabatan baru (`pg-jn`).

**Master jabatan pegawai (bagian awal rilis ini).****Master jabatan pegawai.** Jabatan sebelumnya kolom teks bebas (`pg-j`). Kini daftar disimpan di `db.settings.positions` ([{name}], ikut Export JSON dan sinkron awan): `posList`, `posCnt`, `posSync` (dipanggil di `migr()` dan saat membuka form; memasukkan jabatan pegawai lama, huruf berbeda disatukan, urut abjad), `addPos`/`delPos` (dijaga izin `master.kelola`; hapus ditolak bila masih dipakai; diaudit sebagai `setting`/`positions`). Form pegawai: `pg-j` jadi pilihan + `pg-jn` "Jabatan baru" (didahulukan bila terisi; nama sama beda huruf memakai penulisan daftar; maks 60 huruf; jabatan baru otomatis masuk daftar). Master > Pegawai menampilkan Daftar jabatan dengan jumlah pegawai, tambah, hapus. Tes: `logic-99.js` (18).

## [1.1.080] — 2026-10-04
**Perbaikan setelah masuk di perangkat berisi data (laporan pengguna: layar pilih dua BUMDes kembar tanpa pembeda, status "Tersinkron" bersamaan dengan "awan masih kosong").** `cloudCheck`: bila versi lokal 0 (belum pernah sinkron dengan BUMDes ini), awan berisi (rv>0) dan perangkat bukan data contoh (`!entBlank()`), sinkron dijeda (`paused`, `remote=rv`) dan pengguna memilih Muat dari awan atau Timpa awan; sebelumnya data awan bisa menimpa data perangkat otomatis dalam semenit (cadangan `_prev` tetap dibuat). `cloudStat` tidak lagi menulis "Tersinkron" saat versi 0. Layar pilih BUMDes menampilkan "data vN · tanggal"/"kosong" + id singkat bila nama kembar, diurutkan dari yang berisi data; `entFinish` memanggil `cloudCheck` setelah masuk. Tes: `logic-97.js` (39).

## [1.1.079] — 2026-10-04
**Halaman masuk gabungan, sesi tersimpan (offline), dan portal nasabah via Supabase (ROADMAP DB5).** Berkas baru `entry.js` (dimuat setelah `cloud.js`, masuk cache `sw.js`) dan `supabase_nasabah.sql`.
- **Masuk gabungan:** `entNeed()` memaksa halaman `#masuk` bila koneksi awan terpasang dan perangkat belum punya sesi (token pengurus, sesi nasabah, atau pilihan data lokal). Satu form "email atau nomor HP" + "kata sandi atau PIN": berisi `@` → `cloudLogin` (Supabase Auth); berbentuk nomor → `nsbEntry`. `entRoute` mengarahkan: developer (`dev_is_developer`) → `#developer`; tanpa BUMDes → Setelan > Awan; satu BUMDes → pilih otomatis + `entAutoLoad`; banyak → layar pilih (`S.lgpick`, `entPickB`). `entAutoLoad` memuat snapshot awan hanya bila perangkat masih berisi data contoh bawaan (`entBlank`: sidik jari jumlah koleksi dicatat `entSeed()` saat `reset()`, kunci `bumdes_db_v1_seed`); data lokal tidak pernah ditimpa diam-diam. Perangkat lama (tanpa catatan) berisi data dan belum pernah masuk mendapat tombol "Pakai data lokal" satu kali (`entLocal`); setelah pernah masuk (`seen`) tombol hilang. `#masuk` menutup `#dev` dan `#portal`; `Keluar` kembali ke halaman masuk.
- **Sesi offline:** token pengurus tetap di `bumdes_cloud_v1` dan tidak dicek jaringan saat buka; kedaluwarsa hanya diperbarui saat online (`cloudFresh` tidak menghapus token saat offline). Sesi nasabah di `bumdes_nsb_v1` bersama salinan datanya; offline tampil "Offline · Data per …". Ini pintu masuk, bukan enkripsi data lokal.
- **Pembaca hanya melihat:** `cloudRO()` (peran awan pembaca) menolak semua aksi tulis yang dijaga `GUARD` kecuali `setelan.kelola` dan `data.backup` (memuat dari awan tetap boleh). Server tetap penjaga utama.
- **Portal nasabah via server (`supabase_nasabah.sql`):** tabel `nsb_accounts`/`nsb_sessions` (RLS aktif, tanpa kebijakan, tanpa hak tabel), PIN bcrypt, fungsi `nsb_login/nsb_data/nsb_logout/nsb_change_pin` (anon, tanpa galat agar hitungan gagal tersimpan; kunci 15 menit tiap 5 salah, permanen setelah 15 sampai pengurus mengatur ulang) dan `nsb_set_pin/nsb_publish/nsb_list` (admin/pengurus). Sesi 30 hari bergulir; BUMDes nonaktif menolak masuk; developer tidak bisa membaca tabel ini.
- **Penerbitan:** `nsbProj` memproyeksikan hanya data milik nasabah (daftar kolom putih, tanpa catatan internal); `nsbPublish` hanya mengirim yang berubah (sidik FNV), dipanggil setelah simpan awan berhasil, setelah atur PIN, dan lewat tombol "Terbitkan data sekarang" di Setelan > Portal. Mematikan portal menghapus akun server dan penanda `portal.srv`. `savePortalPin` mengirim PIN ke server lewat `nsb_set_pin` bila pengurus masuk akun awan (PIN tidak disimpan polos).
- **Tampilan:** `nsbWrap` menukar `db` sementara dengan salinan nasabah (`nsbDb`) hanya saat merender portal; `ptDoLogin` mencoba server dulu lalu PIN lokal bila jaringan putus atau PIN server belum ada. `tests/run.js` kini menunggu uji async (`globalThis.__P`).
- **Catatan uji:** `entNeed()` tidak memaksa masuk di peramban otomatis (`navigator.webdriver`, mis. Playwright) kecuali uji menyalakan `globalThis.__ENT_TEST=1` (`ui-masuk.py`, `ui-awan2.py`); tanpa ini puluhan uji UI lama yang membuka `bumdes.html` bertameng kunci tertanam akan tertahan halaman masuk. Koneksi manual dari Setelan (bukan `config.js`) tidak memaksa masuk.
- Tes: `logic-97.js` (36), `logic-98.js` (41), `ui-masuk.py` (390 & 1280px, Supabase palsu), `supabase-test4.sql` (36 cek di Postgres 16). Total 98 berkas uji logika.

## [1.1.078] — 2026-10-04
**Halaman khusus developer (lanjutan DB6).** Overlay `#dev` (`dvV`/`dvRender`, dipanggil di `render()` setelah halaman masuk; gaya `.dv-*`): sidebar + konten di desktop ≥900px, menu bawah di HP; menu Ringkasan (`dvRingkas`: total, aktif, nonaktif, kosong, kembar, keanggotaan, ukuran, daftar "Perlu perhatian"), BUMDes (`dvBumdes`: cari nama/email admin tanpa kehilangan fokus, filter semua/aktif/nonaktif/kosong/kembar, kartu + tindakan), Tambah (buat BUMDes + tambah admin, isian dipertahankan saat gagal), Aturan (batas pembuatan mandiri + catatan). Konfirmasi nonaktif/hapus di dalam halaman (`dvAsk`/`dvYes`). `devOpen`/`devClose`, alamat `#developer` (bila belum masuk: halaman masuk dulu lalu ke halaman developer). Bagian di Setelan > Awan kini hanya penjelasan + tombol buka. Isi `<main>` diganti `div role=main` agar tidak terkena gaya `main` global. Uji: logic-96 (21), ui-dev.py (menu, tata letak desktop/HP, cari/filter, buat, kembar, konfirmasi, aturan, #developer, masuk lalu developer).

## [1.1.077] — 2026-10-04
**Peran developer platform (ROADMAP DB6).** Berkas baru `supabase_developer.sql` (jalankan setelah Tahap 1/2; idempoten): kolom `bumdes.status` (aktif/nonaktif; `is_member` menolak BUMDes nonaktif), tabel `platform_admins` (diangkat lewat SQL Editor), `platform_settings` (`allow_self_create`), `platform_audit`; fungsi `is_developer`, `dev_is_developer`, `dev_list_bumdes` (metadata tanpa isi data), `dev_create_bumdes` (admin pertama lewat email, tolak nama kembar), `dev_add_admin`, `dev_set_status`, `dev_delete_bumdes` (hanya yang belum punya snapshot), `dev_settings`, `dev_set_self_create`, `dev_audit`; `create_bumdes` menghormati batas pembuatan mandiri (galat `pembuatan_dibatasi`). Aplikasi: `devChk` (setelah masuk/boot), `devLoad`, `devCreate`, `devAddAdmin`, `devStatus`, `devDel`, `devSelf`, bagian "Developer (platform)" di Setelan > Awan, konfirmasi nonaktif/hapus, pesan galat, dijaga izin `setelan.kelola`. Uji: logic-96 (14), ui-dev.py (390/1280px), `tests/supabase-test3.sql` (24 cek di Postgres 16; tes Tahap 1 dan 2 tetap lolos setelah berkas ini dipasang).

## [1.1.076] — 2026-10-03
**Daftar BUMDes awan tanpa kebingungan nama kembar.** `cloudList` kini mengambil versi dan tanggal snapshot per BUMDes; `cloudLbl` membuat label "nama · peran · vN · tanggal/kosong" (+ id singkat bila nama kembar); peringatan di bagian BUMDes di awan; `cloudCreate` menolak nama yang sudah ada (tanpa membedakan huruf besar/kecil). Penyebab laporan: dua baris BUMDes bernama sama di server (buat ganda saat uji terdahulu), bukan tampilan ganda. Uji: logic-95 (+4).

## [1.1.075] — 2026-10-03
**Tabel relasional Tahap 2 tersambung ke aplikasi (ROADMAP DB4).** SQL: `migrate_snapshot_to_tables` kini boleh admin dan pengurus (sumbernya snapshot yang memang boleh mereka simpan); fungsi baru `tabel_status` (jumlah baris per tabel + total debit, kredit, pokok pinjaman; semua anggota). Jurnal tidak seimbang membatalkan seluruh migrasi saat COMMIT. Aplikasi (cloud.js): `tblSync` (simpan snapshot bila perlu → RPC migrasi → `tabel_status` → `tblCmp` dengan `tblLocal`), `tblCheck` (hanya bandingkan), `tblAutoSet` (setelan `tbl`; `cloudPushI` memicu `tblSync` setelah push, melewati bila sinkron manual sedang mendorong sendiri), bagian "Tabel relasional (Tahap 2)" di Setelan > Awan (lencana Cocok/selisih/Gagal, rincian perangkat vs server), `cloudMsg` untuk jurnal tidak seimbang dan fungsi belum ada, dijaga izin `setelan.kelola`. Uji: logic-95 (18), ui-awan2 (isi, cocok, selisih, otomatis), `tests/supabase-test2.sql` (+ tabel_status, pengurus, pembaca, jurnal tak seimbang) di Postgres 16.

## [1.1.074] — 2026-10-03
**Halaman masuk awan.** Overlay `#masuk` (`lgV`/`lgRender`, dipanggil paling awal di `render()`; `lgOpen`/`lgClose`/`lgBack`; hash `#masuk` dibuka saat boot bila belum masuk): desktop ≥900px grid dua kolom (cover hijau dengan SVG bukit, judul, tiga keunggulan; form di kanan), mobile cover ringkas di atas dan kartu form menumpuk. `cloudLogin`/`cloudForgot` menerima awalan id (`ln`), email diingat saat render ulang, tombol tampil/sembunyi kata sandi, keberhasilan menutup halaman dan membuka Setelan > Awan bila BUMDes belum terpilih. Setelan > Awan: form email/sandi dihapus; tombol Masuk (`#aw-in`) atau Keluar (`#aw-out`) di kartu ringkasan; bagian Akun diganti "Ganti kata sandi" (hanya saat masuk). Uji: ui-awan (tata letak desktop/mobile), ui-awan2, logic-72/94 disesuaikan.

## [1.1.073] — 2026-10-03
**Optimalisasi tab Awan.** `vCloudSet` ditata ulang: kartu ringkasan (koneksi, akun, BUMDes, status `cloudStat`, waktu sinkron terakhir, "Langkah berikut"), blok Sinkron (Simpan/Muat/Timpa, sinkron otomatis, riwayat terlipat), bagian Koneksi/Akun/BUMDes sebagai `details` yang terbuka otomatis hanya bila langkahnya belum selesai (`dxSetD` mencatat hanya bila pengguna mengubah dari bawaan), bantuan terlipat, Enter pada kata sandi untuk masuk, logout membersihkan `dirty/err`. Uji: logic-94 (+6), ui-awan, ui-awan2 disesuaikan.

## [1.1.072] — 2026-10-03
**Koneksi Supabase tertanam di config.js.** `SB_KEY` diisi publishable key (`sb_publishable_…`, setara anon, aman di klien; secret/service_role tetap ditolak). Form koneksi di Setelan > Awan otomatis tersembunyi. Pengujian: `ui-awan2.py` memakai salinan html bersama `SB_KEY` uji, jadi tidak terpengaruh.

## [1.1.071] — 2026-10-03
**Akun awan dan sinkron otomatis dua arah (ROADMAP DB2, DB3).** `config.js`: konstanta `SB_URL`/`SB_KEY` (anon key; service_role/sb_secret_ ditolak) → `cloudFixed()`; bila valid, form URL/key di Setelan > Awan disembunyikan dan `cloudCfg/cloudSet/cloudDel` mengabaikan nilai tersimpan. DB2: `cloudForgot` (POST /auth/v1/recover dengan redirect_to), `cloudRecBoot` (tautan `#access_token…type=recovery` → modal `cr` → `cloudRecSet` PUT /auth/v1/user, otomatis masuk), `cloudChangePw` (≥8 karakter, konfirmasi), `cloudStat` + banner pengingat cadangan awan (dijeda/offline/tertunda ≥7 hari). DB3: penanda `dirty` (diset `cloudAuto`, dibersihkan saat kirim/muat), `cloudCheck` (GET versi snapshot; awan lebih baru dan tidak dirty dan tanpa form terisi → muat otomatis; dirty → dijeda), `cloudBoot` (saat buka, `visibilitychange`, `online`, interval 60 dtk), kirim ulang saat kembali online. Uji: logic-94, ui-awan2.py; SUPABASE.md diperbarui. **Catatan:** isi `SB_KEY` di config.js dengan anon public key; tambahkan domain Vercel ke Authentication > URL Configuration agar tautan reset sandi berfungsi.

## [1.1.070] — 2026-10-03
**Laporan tabungan wajib (ROADMAP O5) dan templat pengingat penagihan (O6).** O5: `twRep`/`twRepHtml` — tabel per pinjaman (nasabah, kebijakan, dipotong, terkunci, dikembalikan, status) dan ringkasan total (dipotong, terkunci, dikembalikan, saldo rekening Tabungan Wajib), di Laporan Simpan Pinjam, mengikuti filter unit. O6: `remKind` (pinjaman aktif menunggak = `late`; angsuran berikutnya jatuh tempo ≤ 7 hari = `due`), `remText` mengisi templat dengan kode {nama} {no} {ke} {tgl} {jumlah} {hari} {n} {denda} {bumdes} (jumlah tunggakan termasuk denda dari `owed`); templat dapat diubah di Setelan → Templat Pengingat Penagihan (`setRemTpl`: maksimal 600 karakter, kode tak dikenal ditolak, kosong = bawaan; tersimpan di `settings.sp_rem`). Kotak "Pengingat penagihan" di sub-tab Tunggakan dan tombol Pengingat di rincian pinjaman membuka modal berisi teks dengan Salin, WhatsApp (bila telepon valid), dan Bagikan; setiap pemakaian dicatat di audit (`share`/`loan`). Memanfaatkan `waNo`, pola ringkasan nasabah. Tes: `logic-93.js` (25), `ui-pengingat.py`.

## [1.1.069] — 2026-10-03
**Kualitas portofolio pinjaman (ROADMAP O4).** Aging tunggakan dan kolektibilitas sudah ada; ditambahkan `parData`/`parBox` (collection.js): distribusi pinjaman aktif menurut umur tunggakan (lancar, 1–30, 31–60, 61–90, >90 hari) dengan sisa pokok dan persen portofolio, PAR >30/>60/>90 hari (sisa pokok pinjaman bertunggakan melebihi batas dibagi total sisa pokok aktif), rasio pinjaman bermasalah (kolektibilitas Kurang Lancar ke atas menurut batas di Setelan), dan akumulasi hapus buku. Tampil di sub-tab Tunggakan dan Laporan Simpan Pinjam; mengikuti filter unit; pinjaman dihapus buku keluar dari PAR. Perbaikan: Laporan SP bagian "Pendapatan per jenis" kini memuat akun fee per jenis (4410–4460) bila mode per jenis aktif. Tes: `logic-92.js` (14), `ui-par.py`.

## [1.1.068] — 2026-10-03
**Denda keterlambatan bersumber dari Master Tarif & Biaya (ROADMAP O3).** Setelan baru `penalty_code`: bila diisi dengan kode berjenis Denda metode per hari, tarif %/hari diambil dari versi master yang berlaku pada tanggal hitung (`penRate`/`penPct`, dipakai `owed` dan `akadSnap`); bila kosong atau kode tidak valid, memakai `penalty_pct_day` seperti sebelumnya (hasil hitung identik). Setelan → Simpan Pinjam: pilihan "Sumber tarif denda" dan tombol "Pindahkan denda ke Master Tarif & Biaya" (`pindahDenda`: membuat tarif DENDA v1 dari angka Setelan efektif 2020-01-01 sehingga hasil hitung tetap sama; idempoten; menolak bila kode DENDA dipakai tarif non-denda); angka manual dinonaktifkan selama memakai master. Denda yang sudah terakru tidak berubah; hanya akrual berikutnya mengikuti versi tarif. Biaya pelunasan dipercepat sudah dari master; "mode jasa pelunasan" tetap setelan (bukan tarif). Perbaikan: pilihan setelan yang diubah lewat tombol tertimpa pemulihan isian form; kolom `sp-pencode`, `sp-feesplit`, `sp-twpol` masuk daftar tanpa pemulihan (`NB`). Tes: `logic-91.js` (15), `ui-denda.py`.

## [1.1.067] — 2026-10-03
**Pendapatan fee per jenis ke akun sendiri (ROADMAP O2).** Setelan baru `sp_fee_split` (Setelan → Akun Pendapatan Fee): `gabung` (bawaan; semua fee ke 4400 seperti sebelumnya) atau `per_jenis`: akun 4410 Administrasi, 4420 Provisi, 4430 Penggantian Materai, 4440 Biaya Transfer, 4450 Pelunasan Dipercepat, 4460 Restrukturisasi (dibuat otomatis saat diaktifkan oleh `ensureFeeAccs`, juga saat impor data yang sudah memakainya; jenis `lain` dan denda tetap 4400). Berlaku untuk pencairan (`feeCr`), pembayaran/pelunasan dipercepat, biaya restrukturisasi (`feeLines`), dan pengakuan fee amortisasi: `fee_amort.by` menyimpan pembagian per akun dan `amortCr` mengakui proporsional dengan sisa pembulatan di akun terakhir, sehingga total per akun sama dengan fee awal saat lunas/hapus buku. Jurnal lama tidak diubah; pembatalan (`rev`) membalik per akun. Laporan rekonsiliasi jasa/denda kini menjumlah semua akun fee dan membandingkan dengan denda + fee pembayaran. Data contoh lengkap dibuat ulang dengan mode per jenis. Tes: `logic-90.js` (18), `ui-feesplit.py`.

## [1.1.066] — 2026-10-03
**Audit tabungan wajib (ROADMAP O1).** Hasil audit: restrukturisasi tidak mengubah tabungan wajib (kunci tetap, ACC2300 tetap sama dengan total tabungan). Perbaikan: (1) rincian pinjaman menampilkan baris "Tabungan wajib" beserta status (`twStatus`: terkunci sampai lunas / dikembalikan saat lunas + tanggal / bebas ditarik / tidak dikembalikan otomatis + alasan / pinjaman dihapus buku); (2) hapus buku memberi pemberitahuan bahwa tabungan wajib tetap di rekening nasabah dan tidak lagi terkunci (batal hapus buku mengunci lagi); (3) pengembalian otomatis yang dilewati (rekening ditutup, saldo kosong, kas tidak cukup) mencatat `disb.sav_ret_skip` dan entri audit; (4) `batalBayar` pada pembayaran pelunasan ditolak bila rekening tabungan wajib sudah ditutup (buka dulu). Keputusan kebijakan yang tetap terbuka: apakah tabungan wajib dikompensasikan ke kerugian saat hapus buku (belum otomatis). Tes: `logic-89.js` (13).

## [1.1.065] — 2026-10-03
**Form "Ubah pengajuan" (draf atau Diajukan) disamakan dengan form pengajuan baru.** Sebelumnya masih versi lama: jasa diketik manual, tanpa tarif master, ceklist biaya, jumlah, atau tabungan wajib, dan `rate_code`/`disb_codes` tidak ikut diperbarui. Sekarang: pilihan tarif jasa dari master (jasa read-only, bertingkat mengikuti pokok), ceklist biaya pencairan termasuk jumlah dan tabungan wajib, pratinjau biaya dan simulasi langsung. `mdOpen("la")` memuat pilihan tersimpan dari pinjaman (`disb_codes`, `disb_qty`); `saveAjuan` menyimpan `rate_code`/`rate_version` baru (dihapus bila jasa manual) serta `disb_codes`/`disb_qty` bila ceklist disentuh; pinjaman lama tanpa pilihan tetap mengikuti pengaturan. Tanpa tarif jasa di master, kolom jasa tetap manual. Pembantu `LI()` memilih id kolom (`la-*` atau `l-*`) untuk `pickJasa`, `jasaForm`, `jasaInfo`, `simLive`. Tes: `logic-88.js` (15), `ui-ubah.py`.

## [1.1.064] — 2026-10-03
**Perlakuan tabungan wajib dapat diatur.** Setelan baru `sp_tw_policy` (Setelan → Tabungan Wajib Pencairan): `bebas` (bawaan, seperti 1.1.063), `kunci` (tabungan wajib tidak dapat ditarik selama pinjaman Aktif; `saveSavTx` memakai `twLocked` dan pesan galat menyebut jumlah terkunci), atau `kembali` (terkunci, lalu saat pinjaman lunas otomatis ditarik tunai ke kas pembayaran terakhir lewat `twReturn`: jurnal ACC2300 ke kas, mutasi tarik `via:"lunas"`, dicatat di `disb.sav_ret`; dilewati bila kas tidak cukup atau rekening ditutup). Kebijakan dicatat per pinjaman saat pencairan (`disb.tw_policy`) sehingga pinjaman lama tidak berubah. `batalBayar` pada pembayaran pelunasan membalik pengembalian (`twUndo`). Tes: `logic-87.js` (15), `ui-tabwajib2.py`.

## [1.1.063] — 2026-10-03
**Tabungan wajib dipotong saat pencairan (bukan fitur koperasi: bagian dari pinjaman yang otomatis menjadi tabungan nasabah sendiri).** Jenis baru "Tabungan wajib" di Master Tarif & Biaya (persen/nominal, minimum/maksimum, jumlah; tidak kena pajak, kode otomatis TBW…). Muncul di ceklist form pengajuan (tag "masuk tabungan nasabah") dan pratinjau; dana bersih = pokok − biaya − pajak − tabungan wajib. `disbFee` memisahkan `sav_items`/`sav_total` dari `items`/`fee_total`. `cairkan` mengkredit ACC2300 dan otomatis membuat/menambah rekening "Tabungan Wajib" nasabah dengan mutasi setor `via:"pencairan"`; `batalCair` membalik mutasi itu (ditolak bila sudah ditarik); `batalSav` menolak membatalkan setoran pencairan; bukti pencairan dan snapshot akad memuat tabungan wajib. Tabungan tidak otomatis dikembalikan saat lunas (ditarik lewat Simpanan biasa). Contoh tarif bertambah TABWAJIB 2% (10 tarif); data contoh lengkap dibuat ulang. Tes: `logic-86.js` (17), `ui-tabwajib.py`; logic-79/84/85 disesuaikan.

## [1.1.062] — 2026-10-03
**Biaya nominal tetap dapat dikali jumlah (mis. materai lebih dari satu).** `calcFees` menerima `ctx.qty={kode:n}` (1–99; hanya metode `tetap`; pajak dihitung dari total setelah dikali; item mencatat `qty`). Ceklist biaya di form pengajuan menampilkan kolom jumlah untuk biaya `tetap` (`feeSetQty`, `feeQtyMap`, state `S.elq`, entri `MK.lq`); pilihan disimpan per pinjaman sebagai `loan.disb_qty` dan dipakai `disbFee` (pratinjau, akad, pencairan); pratinjau menampilkan "Materai ×2". Pinjaman tanpa `disb_qty` = 1. Tes: logic-85 (18), ui-ceklist diperluas.

## [1.1.061] — 2026-10-03
**Form pengajuan: jasa dikunci dari master dan ceklist biaya pencairan.** Bila Master Tarif & Biaya punya tarif jasa, kolom Jasa menjadi read-only ("dari master"), pilihan "Isi manual" dihapus, dan jasa selalu dihitung ulang dari master menurut pokok dan tanggal (`jasaForm`, dipakai `ajukan`, `simpanDraf`, `simLive`; angka yang dikirim di luar form diabaikan); kode dan versi tarif selalu tersimpan. Tanpa tarif jasa di master, kolom tetap bebas. Ceklist biaya pencairan (`feeChecklist`, `feeAvail`, `feeTog`, state `S.elp`): daftar semua biaya berjenis Administrasi/Provisi/Materai/Transfer/Lain yang aktif, bawaan mengikuti Setelan; pilihan disimpan per pinjaman (`loan.disb_codes`) dan dipakai `disbFee` untuk pratinjau, akad, dan pencairan; pinjaman lama tanpa `disb_codes` mengikuti Setelan. Tes: logic-84 (20), ui-ceklist; logic-78/80 disesuaikan.

## [1.1.060] — 2026-10-03
**Data contoh lengkap baru dan perbaikan bug impor.** `tests/gen-lengkap.js` (+ `gen-lengkap.body.js`) membuat `data/bumdes-data-lengkap.json` lewat fungsi aplikasi sendiri sehingga konsisten: 10 nasabah (3 dengan PIN portal), 3 calon, 14 pinjaman di semua status (lunas, lancar, menunggak, anuitas bayar sebagian, restrukturisasi, pelunasan dipercepat, hapus buku + pemulihan, diajukan, disetujui, ditolak, dibatalkan, draf; sebagian memakai jasa master termasuk bertingkat BUNGATGKT; akad bernomor otomatis), jaminan, tindak lanjut, master tarif/pajak (11 tarif, 2 pajak), 4 rekening tabungan dengan bunga/pajak/biaya, Unit Air (7 sambungan, tagihan Agustus–September, pembayaran penuh dan sebagian), Perdagangan (4 produk, penjualan tunai/kredit), biaya operasional, gaji Agustus–September dibayar, 5 pegawai, 4 pengguna contoh. **Perbaikan:** validator Import JSON (`chk`, modules.js) menolak pinjaman berstatus Dihapus buku karena dianggap tidak boleh punya jadwal angsuran, padahal hapus buku mempertahankan jadwal; backup berisi pinjaman hapus buku (dan pemulihan dari awan, yang memakai `chk` yang sama) gagal. Kini `written_off` diperiksa seperti pinjaman aktif. Tes: logic-83, ui-import-lengkap.

## [1.1.059] — 2026-10-03
**Kode otomatis.** Kolom kode tidak lagi wajib dan terisi saran otomatis (boleh diganti): kode biaya menurut jenis (`nextFeeCode`: ADM001, PRV001, MTR001, TRF001, DND001, PLN001, RST001, JASA001, LAIN001; saran ikut berubah saat jenis diganti selama kode belum diubah manual), kode pajak `PJK001` (`nextTaxCode`), kode unit usaha `UNT001` (`nextUnitCode`), kode akun COA 4 digit menurut tipe (`nextAccCode`: aset 1xxx, kewajiban 2xxx, ekuitas 3xxx, pendapatan 4xxx, beban 5xxx; berikutnya = terbesar + 10, tanpa bentrok), dan nomor akad memakai mesin penomoran v1.1.058 (`settings.num_akad`, bawaan `AKD/{YYYY}{MM}/{NNNN}`, dapat diatur di Setelan). Kode kosong saat simpan = otomatis; kode yang diketik tetap divalidasi seperti sebelumnya. Tes: logic-82 (24), ui-kode; logic-46 disesuaikan.

## [1.1.058] — 2026-10-03
**SP: nomor pinjaman memuat tanggal/bulan dengan urut otomatis.** `numNext(kind,date)` (loans.js) membuat nomor dari format `settings.num_loan` (bawaan `LN-{YYYY}{MM}-{NNNN}`) dan `settings.num_draft` (bawaan `DRF-{YYYY}{MM}-{NNNN}`); kode `{YYYY} {YY} {MM} {DD} {NNNN}`; tanggal dari tanggal pengajuan/saldo awal; urut = nomor terbesar dengan awalan/akhiran yang sama + 1 (ganti bulan/tanggal = mulai 1 lagi), memperhitungkan `draft_number`. Dipakai ajukan, simpan draf, kirim draf, dan saldo awal pinjaman. Setelan > Simpan Pinjam punya isian format beserta contoh nomor berikutnya (`numChk` validasi, `setNum`). Nomor lama tidak diubah. Tes: logic-81 (19), ui-nomor; logic-35/67 dan 6 tes UI disesuaikan.

## [1.1.057] — 2026-10-03
**Master Tarif & Biaya: jasa bertingkat menurut pokok.** Metode hitung baru `bertingkat` (khusus jenis Jasa): `tiers=[{upto,rate}]` + `tier_unit` (bulan/tahun); seluruh pokok memakai satu persentase, tingkat pertama dengan `P < upto` (tingkat terakhir `upto=null`). `tierRate` mengonversi ke persen per tahun (×12 untuk per bulan), `tierInfo`/`tierText`/`jasaFor`. `jasaRates` memuat jasa bertingkat; form pengajuan mengisi kolom Jasa otomatis dan mengikuti perubahan pokok/tanggal (`jasaAuto`, kotak info `l-rc-i`); `rateRef` menyimpan kode bila jasa sama dengan hasil master. Form tambah tarif punya isian satuan, 2 tingkat, dan seterusnya. Contoh baru BUNGATGKT (<10 jt 2%/bln, <50 jt 1,75%, seterusnya 1,5%). Tes: logic-80 (28), ui-bertingkat.

## [1.1.056] — 2026-10-03
**Form pengajuan: blok Tarif, biaya & pajak dari Master.** `feeInfoHtml` (rates.js) mengisi `#sim-fee` di form pengajuan: sebelum pokok diisi menampilkan biaya pencairan aktif (rumus, min/maks, tanda kena pajak) dan pajak berlaku; setelah diisi menampilkan nominal tiap biaya, pajak (mis. PPN 11%), total, dan dana bersih. Contoh ADM dan TRF kini kena pajak; klik ulang Isi data contoh menandai contoh lama yang belum kena pajak. Blok biaya dipindah dari `#sim` ke `#sim-fee`. Tes: logic-78/79, ui-tarif.

## [1.1.055] — 2026-10-03
**Master Tarif & Biaya: tombol Isi data contoh.** `isiContohTarif()` (rates.js) menambah 8 tarif contoh (BUNGA12/18/24, ADM 1% min 25.000 maks 500.000, MATERAI 10.000, TRF 6.500, DENDA1 0,1% per hari, PELUNASAN 1%) dan pajak PPN 11%, berlaku 1 Januari tahun berjalan. Idempoten: hanya kode yang belum ada yang ditambahkan. Teks penjelasan halaman diperbarui. Tes: logic-79 (12).

## [1.1.054] — 2026-10-03
**SP: jasa dan biaya pencairan diambil dari Master Tarif & Biaya.** `jasaRates(d)` mendaftar tarif jasa persen yang berlaku; formulir pengajuan punya pilihan `l-rc` (mengisi kolom jasa menurut tanggal, tetap bisa diubah manual; pinjaman menyimpan `rate_code`/`rate_version` bila tidak diubah). `disbCodes(d)` kini bawaan semua kode biaya aktif (Administrasi, Provisi, Materai, Transfer, Lain) bila `settings.disb_codes` belum diatur; centang di Setelan mengecualikan. Simulasi menampilkan pratinjau biaya dan dana bersih. Perilaku bawaan berubah: biaya master otomatis dipotong. Tes: logic-78 (19), logic-57 disesuaikan.

## [1.1.053] — 2026-10-03
**Portal nasabah: riwayat per nasabah dan petunjuk PIN.** `ptLogHtml` (portal.js) menampilkan di rincian nasabah bagian Riwayat portal: status PIN, waktu masuk terakhir, kunci, hitungan gagal, dan 10 catatan audit `portal_*` terakhir milik nasabah itu (diatur pengurus, diganti nasabah, masuk, gagal). Kolom PIN saat edit nasabah memberi teks samar "PIN sudah diatur (kosongkan bila tidak diganti)". Uji: `logic-76.js` (11), `ui-portal.py` diperluas.

## [1.1.052] — 2026-10-03
**SP: bobot skor kelayakan dapat diatur.** `FLOW0` ditambah `w_ratio`, `w_col`, `w_verif` (bawaan 40/30/30); `scoreOf` menghitung skor = bobot terpenuhi / total bobot × 100 (bawaan identik dengan perilaku lama). `setFlow` memvalidasi bilangan bulat 0–100 dan menolak semua bobot nol; perubahan masuk audit `sp_flow_cfg`. Tiga kolom baru di Setelan > Profil > Alur Pengajuan Lengkap. Analisis yang sudah tersimpan tidak berubah. Uji: `logic-75.js` (12), `ui-bobot.py`.

## [1.1.051] — 2026-10-03
**UI: tombol utama menempel pada daftar panjang.** Di Unit Air > Baca Meter, tombol Terbitkan tagihan pindah dari atas ke bilah `.actb` di bawah daftar meter dan menempel (sticky; di seluler di atas navigasi bawah, di desktop di dasar layar), sehingga tidak perlu menggulir ke atas setelah mengisi banyak angka meter. FAB disembunyikan saat bilah itu ada agar tidak bertumpuk. Modal sudah punya footer menempel sejak sebelumnya. Uji `ui-konfirmasi.py` diperluas.

## [1.1.050] — 2026-10-03
**Konfirmasi seragam untuk aksi berisiko.** `askC/ACT/cfInfo` ditambah `amortAll` (Akui fee sampai hari ini), `terbitTagihan` (Terbitkan tagihan air; dialog memuat periode, tanggal, jumlah sambungan terisi) dan `logoDel` (Hapus logo). Tombol di `modules.js`, `water.js`, `layout.js` memakai `askC`. Pelunasan dipercepat tidak diubah karena rincian pelunasan sudah menjadi langkah konfirmasi. Uji: `logic-74.js` (8), `ui-konfirmasi.py` (390 dan 1280px).

## [1.1.049] — 2026-10-02
**UI: FAB (tombol + melayang) dioptimalkan.** `fabCfg/fabSet/fabGo/fabHide` (layout.js): kontekstual (Simpan Pinjam → Ajukan pinjaman; halaman lain → Transaksi baru yang langsung membuka modal lewat `qTrx`), tersembunyi di Transaksi, Laporan, Buku Besar, Neraca Saldo, Setelan, Data dan saat dokumen terbuka, mengikuti hak akses (`trx.kelola`, `sp.ajukan`), menepi saat menggulir ke bawah dan saat fokus di kolom isian (kembali saat menggulir ke atas/fokus lepas), transisi dihormati `prefers-reduced-motion`. Uji: `logic-73.js` (15), `ui-fab.py` (390 dan 1280px).

## [1.1.048] — 2026-10-02
**Awan: riwayat cadangan dan pemulihan versi.** Tombol Riwayat cadangan (`cloudHist`) memuat 30 versi terakhir dari `bumdes_snapshot_history`; Pulihkan (`cloudRestore`) mengambil data versi itu, meminta konfirmasi (`cfInfo cloudPull` varian riwayat), mengganti data perangkat (cadangan lokal `_prev`) dan menyetel versi perangkat ke versi awan terbaru agar Simpan ke awan membuatnya versi baru tanpa konflik. Hanya admin/pengurus (RLS riwayat); izin `setelan.kelola`. Uji: `logic-72.js` (41), `ui-awan.py` (langkah 6b).

## [1.1.047] — 2026-10-02
**Dokumen:** `SUPABASE.md` ditambah bagian menambah pengurus dan peran, mematikan pendaftaran publik, MFA, dan anjuran Muat dari awan sebelum mengubah data. Tidak ada perubahan kode selain nomor versi.

## [1.1.046] — 2026-10-02
**Awan: pesan hasil ditampilkan di bagian Sinkron** (`S.clm`, `role=status`), bukan hanya di atas halaman. Uji `logic-72.js`.

## [1.1.045] — 2026-10-02
**Awan: perbaikan konflik palsu setelah memilih ulang BUMDes.** Menyamakan nama header di `cloudPick` memicu simpan otomatis dengan versi 0, sehingga awan yang sudah berisi menolak (konflik) dan sinkron dijeda. Kini perubahan nama tidak memicu simpan otomatis. Uji `logic-72.js`.

## [1.1.044] — 2026-10-02
**Awan: nama BUMDes di header otomatis mengikuti BUMDes awan yang dipilih/dibuat** (`cloudPick`). Uji `logic-72.js`.

## [1.1.043] — 2026-10-02
**Awan: dukung kunci Supabase format baru** (`sb_publishable_…`): diterima sebagai anon key, `sb_secret_…` ditolak, kunci non-JWT tidak dikirim sebagai Bearer saat masuk. Uji `logic-72.js` diperluas.

## [1.1.042] — 2026-10-02
**Supabase Tahap 1: cadangan dan sinkron awan.** `cloud.js` (koneksi anon key, masuk, pilih/buat BUMDes, simpan dengan kunci versi, deteksi konflik, muat dengan konfirmasi dan cadangan lokal `_prev`, simpan otomatis 8 detik; `service_role` ditolak; pengaturan di kunci `bumdes_cloud_v1`, tidak ikut export). Sub-tab Setelan > Awan; izin `setelan.kelola`. SQL: `supabase_schema.sql` (tabel, RLS, `create_bumdes`, `save_snapshot`, `add_member`, riwayat 30 versi) dan draf `supabase_tahap2.sql` (tabel ternormalisasi, jurnal seimbang, migrasi) — keduanya diuji di Postgres 16. Dokumen `SUPABASE.md`. Uji: `logic-72.js` (31), `ui-awan.py`; `ui-portal.py` memakai tombol Data berawalan judul dan isi `#bk` lewat skrip.


Rilis lama (v1.1.041 ke bawah dan seri 0.1.NNN): lihat `CHANGELOG_ARSIP.md`.