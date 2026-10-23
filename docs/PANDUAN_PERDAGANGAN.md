# Panduan Modul Perdagangan

Untuk pengurus BUMDes yang mengelola toko atau kios (sembako, pertanian, kebutuhan rumah). Modul ini memakai buku besar yang sama dengan unit lain, sehingga laporan keuangan BUMDes ikut terisi otomatis.

## 1. Mengaktifkan
1. **Setelan > Modul**: nyalakan **Perdagangan**. Akun Persediaan (1500), Piutang (1400), Utang (2100), Penjualan (4300), HPP (5900), dan Selisih Stok (5910) dibuat otomatis.
2. **Unit Usaha**: tambah unit berjenis **Perdagangan** (satu unit = satu toko dan satu gudang).
3. Menu **Perdagangan** muncul untuk pengguna yang berhak (Bendahara dan Petugas Unit mengelola; Pengawas hanya melihat).

Ingin mencoba dulu? Buka **Perdagangan > Data > Data contoh toko desa > Buat data contoh**. Unit bernama *Toko Desa Contoh* berisi transaksi setahun; unit Anda yang lain tidak tersentuh, dan tombol **Hapus data contoh** membuangnya sekali klik.

## 2. Menyiapkan produk dan stok awal
- **Stok > Produk baru**: nama, satuan, harga beli, harga jual, dan stok minimum (untuk peringatan).
- **Stok awal**: dicatat sekali per produk dari rincian produk. Jurnal: Debit 1500 Persediaan, Kredit 3100 Modal.
- **Impor dari CSV** (Data > Impor produk dari CSV): unduh templat, isi kolom `nama, kode, satuan, kategori, harga_beli, harga_jual, stok_min, stok_awal`, lalu pilih berkas. Produk yang namanya atau kodenya sudah ada dilewati; baris bermasalah dilaporkan sebelum Anda mengonfirmasi.

## 3. Kegiatan harian
| Kegiatan | Tempat | Jurnal |
|---|---|---|
| Jual di kasir (cari atau pindai kode, keranjang, tunai atau kredit) | **Kasir** | Dr kas atau 1400 / Cr 4300; Dr 5900 / Cr 1500 sebesar HPP |
| Jual banyak barang dengan tanggal lain | **Penjualan > Penjualan baru** | sama |
| Beli dari pemasok, tunai atau kredit | **Pembelian** | Dr 1500 / Cr kas atau 2100 |
| Bayar utang pemasok | **Pembelian** > rincian > Bayar utang | Dr 2100 / Cr kas |
| Terima pembayaran piutang beberapa nota sekaligus | **Piutang** > pelanggan > centang nota | Dr kas / Cr 1400 per nota; kuitansi gabungan |

### Tampilan Kasir dan pembayaran bertahap (v1.1.311)
- **Kasir** terdiri dari dua panel: kartu produk (dengan filter kategori dan stok) dan panel **Pesanan**. Di ponsel panel pesanan berupa lembar yang naik dari bawah: ketuk ringkasan "N barang · Rp…" di bilah hijau untuk meninjau atau mengubah jumlah, diskon, dan tingkat harga, atau ketuk **Bayar** untuk langsung membayar.
- Tingkat harga, diskon, dan catatan nota ada di bagian lipat *Tingkat harga, diskon, catatan*.
- **Bayar** membuka jendela bertahap: **Pembayaran** (tunai atau kredit, uang diterima dengan tombol nominal cepat, kembalian) → **Berhasil** → **Cetak struk** → **Transaksi baru**. Kas/bank terpilih otomatis (kas terakhir dipakai, atau Kas tunai); tekan Esc untuk menutup jendela. Struk memuat diskon, uang diterima, kembalian, dan catatan. Langkah struk boleh dilewati lewat *Lewati struk*; nota terakhir tetap bisa dicetak dari kartu *Penjualan terakhir*.
- Produk dengan stok habis tidak bisa diketuk; stok di bawah minimum ditandai merah.

### Cetak Perdagangan (v1.1.317)
- Setiap halaman Perdagangan punya tombol **Cetak halaman ini** (atau Ctrl+P): hasil cetak memakai kop BUMDes, judul, tanggal/periode, dan tanda tangan Bendahara dan Direktur. Semua baris ikut tercetak, bukan hanya yang sudah dimuat; tombol dan kisi Kasir tidak tercetak.
- Di tab Stok: **Cetak daftar stok** (stok, harga beli rata-rata, nilai, total persediaan) dan **Cetak katalog harga** (per kategori, harga eceran dan grosir) ukuran A4.
- Lembar hitung opname: kolom Fisik dan Ket. berkotak untuk ditulis tangan, nomor urut, dan judul kolom diulang tiap halaman.
- Struk: jam transaksi dicetak; pesan kaki diatur di Perdagangan > Data > Pesan kaki struk (kosongkan untuk tanpa pesan).

### Kasir sebagai menu sendiri (v1.1.316)
- Menu **Kasir** muncul di sidebar dan navigasi bawah (selama modul Perdagangan aktif dan akun punya izin *Perdagangan: kelola*). Mulai v1.1.331 sub-tab Kasir dihapus dari Perdagangan; kasir hanya lewat menu Kasir. Tab Perdagangan kini: Ringkasan, Penjualan, Piutang, Stok (Stok, Pembelian, Koreksi), Laporan, Data.
- Tombol **Halaman kasir** di dalamnya membuka mode layar penuh tanpa menu (alamat `#kasir`).

### Cetak struk satu ketukan (v1.1.315)
- Setelah pembayaran muncul dialog *Berhasil*; klik **Cetak struk** langsung membuka dialog cetak (ukuran kertas sesuai setelan perangkat), lalu Kasir tampil lagi. **Transaksi baru** menutup dialog tanpa mencetak; nota terakhir tetap bisa dicetak dari kartu Penjualan terakhir.

### Halaman khusus kasir (v1.1.314)
- Di tab Kasir klik **Halaman kasir**, atau buka alamat aplikasi dengan akhiran `#kasir` (bisa dibuat pintasan di perangkat kasir). Tampil layar penuh tanpa sidebar, header, dan menu lain; data dan login sama dengan aplikasi.
- Bar atas menampilkan unit, tanggal, jumlah nota dan total penjualan hari ini. Tombol **Ke aplikasi** kembali ke menu biasa (kartu Tutup kasir harian tetap ada di bagian bawah halaman kasir).
- Akun harus punya izin *Perdagangan: kelola* dan modul Perdagangan aktif; jika tidak, halaman ditolak dengan pesan.

### Struk, tutup kasir, kamera, layar penuh (v1.1.308)
- **Struk**: setelah bayar, tombol *Cetak struk* membuka nota ukuran struk (80 atau 58 mm, bawaan mengikuti pengaturan kertas perangkat). Nota memuat diskon, catatan, uang diterima, dan kembalian.
- **Tutup kasir harian** (kartu di bawah Kasir): pilih tanggal dan kas/bank laci. Kas seharusnya = penjualan tunai + piutang diterima − retur tunai pada hari itu. Isi uang fisik; selisih dijurnal ke akun 5920 Selisih Kas (kurang = beban, lebih = pengurang beban). Satu penutupan per unit, tanggal, dan kas; dapat dibatalkan (jurnal selisih dibalik) dan rekapnya dapat dicetak.
- **Pindai kamera**: tombol di kotak pencarian kasir. Memerlukan peramban dengan BarcodeDetector (Chrome di Android dan komputer) dan izin kamera; bila tidak ada, pakai pemindai USB/Bluetooth atau ketik kode lalu Enter.
- **Layar penuh**: menyembunyikan menu dan tab agar kasir lega di ponsel atau tablet; tombol *Keluar layar penuh* di bagian atas.

### Stok lanjutan (v1.1.309)
- **Opname bersesi** (Koreksi > Opname bersesi): buat sesi (unit, tanggal, kategori), cetak *lembar hitung*, isi hitungan fisik bertahap (boleh lintas hari, mode *hitung buta* menyembunyikan stok buku), lalu *Posting selisih* sekali. Draf tidak mengubah stok atau jurnal; hasil posting bernomor sesi (OP-tahun-nomor). Opname langsung tanpa sesi tetap tersedia.
- **Usulan pembelian** (Pembelian): barang di bawah stok minimum atau cukup kurang dari 7 hari. Jumlah = penjualan rata-rata 30 hari × cakupan hari + stok minimum − stok sekarang, dikelompokkan per pemasok terakhir; tombol *Buat pembelian* mengisi formulir.
- **Satuan ganda**: di data produk isi *Satuan eceran* (mis. kg), *Isi per satuan utama* (mis. 50; harus habis membagi 1000) dan harga eceran (kosong = harga ÷ isi). Di Kasir muncul tombol *(eceran)*; stok tetap dalam satuan utama (3 kg = 0,06 karung) dan nota menampilkan kg. Penjualan lewat formulir Penjualan baru tetap memakai satuan utama.
- **Riwayat harga beli**: dari kartu stok produk, tombol *Harga beli* menampilkan harga terakhir, termurah, dan ringkasan per pemasok.
- **Kedaluwarsa**: aktifkan *Lacak kedaluwarsa* pada produk, lalu isi tanggal saat stok awal atau pembelian. Kartu *Kedaluwarsa* di Stok menampilkan batch yang jatuh tempo dalam sekian hari (bawaan 60), dan Ringkasan memberi peringatan ≤ 30 hari. Sisa batch dihitung dengan asumsi FEFO (yang lebih cepat kedaluwarsa terjual lebih dulu); barang kedaluwarsa dikeluarkan lewat opname.

Harga pokok memakai **rata-rata bergerak**: setiap pembelian memperbarui harga rata-rata, dan HPP penjualan dihitung dari rata-rata itu. Menjual seluruh stok menghabiskan nilai persediaan tepat nol.

## 4. Koreksi
- **Stok opname** (Koreksi): isi hitungan fisik; selisih dijurnal ke 5910 Selisih Stok pada harga rata-rata.
- **Retur penjualan**: barang kembali dari pelanggan. Uang dikembalikan tunai atau mengurangi piutang; stok kembali pada HPP penjualan asal.
- **Retur pembelian**: barang kembali ke pemasok. Dana diterima tunai atau mengurangi utang.
- Semua koreksi dapat dibatalkan dari **Riwayat koreksi** (jurnal dibalik). Penjualan atau pembelian yang masih punya retur harus dibatalkan returnya dulu.

## 5. Membaca laporan
- **Ringkasan**: tombol cepat, blok *Perlu tindakan* (stok menipis, piutang lebih dari 30 hari, utang jatuh tempo), dan tren penjualan 6 bulan.
- **Laporan**: laba rugi unit, penjualan per produk dan per bulan, terlaris dan lambat, nilai persediaan, umur piutang dan utang, stok menipis. Atur tanggal dan unit; **Cetak** atau **Unduh CSV**.
- **Data > Kecocokan persediaan**: membandingkan kartu stok dengan saldo akun 1500. Jika *Selisih*, periksa jurnal persediaan yang dicatat manual di luar menu Perdagangan.

## 6. Hal yang perlu diingat
- Satu penjualan atau pembelian hanya untuk satu unit.
- Penjualan tidak boleh melebihi stok yang tercatat.
- Diskon dicatat per nota (Rp atau %) ke akun 4390 Diskon Penjualan; retur dan laporan memakai harga bersih setelah diskon.
- Kredit pelanggan dapat dibatasi (batas umum dan batas khusus per pelanggan) di **Piutang**.
- Jurnal otomatis tidak dibatalkan dari menu Transaksi; gunakan tombol Batalkan di menu Perdagangan.
- Periode yang sudah ditutup tidak bisa menerima transaksi baru; buka kembali penutupan lebih dulu.

### Perbaikan Kasir dan peran Kasir (v1.1.343)
- **Peran Kasir** (Master > Pengguna) kini juga dapat membuka halaman **Kasir** lewat izin baru `dagang.kasir` ("Kasir: menjual, mencetak nota, dan tutup kasir"). Izin ini hanya membuka halaman Kasir, bukan seluruh Perdagangan. Data lama otomatis mendapat izin ini sekali; bila admin mencabutnya, tidak dipasang ulang. Peran yang punya izin kelola Perdagangan otomatis mencakup Kasir.
- Ubin produk yang sudah di keranjang diberi lencana ×jumlah dan bingkai hijau; stok yang ditampilkan sudah dikurangi isi keranjang.
- Jumlah di keranjang bisa **diketik langsung** (kg/karung), dan tiap baris punya tombol hapus (✕). Mengetik 0 menghapus baris.
- **Tutup kasir harian** kini dilipat di bawah halaman Kasir; ketuk judulnya untuk membuka.
- Dialog bayar ditutup otomatis saat pindah halaman; pesan galat muncul tepat di atas tombol Batal/Selesaikan.

### Tutup kasir bertahap (v1.1.344)
- Di halaman Kasir, tekan **Tutup kasir** untuk membuka dialog tiga langkah: **1 Rekap penjualan** (pilih tanggal dan kas, lihat tunai, piutang diterima, retur, kas seharusnya) → **2 Hitung uang laci** (isi uang fisik; selisih tampil langsung; tombol *Sesuai* mengisi jumlah yang seharusnya) → **3 Selesai** (ringkasan dan tombol Cetak rekap).
- Kas pertama yang aktif terpilih otomatis bila belum dipilih. Riwayat penutupan tetap ada di kartu Tutup kasir harian.

### Kasir harian (v1.1.346)
- **Ringkasan hari ini** (di atas grid): jumlah nota, total tunai dan kredit untuk unit yang dipilih.
- **Riwayat nota**: daftar nota hari ini; **Struk** mencetak ulang, **Batal** (hanya peran pengelola Perdagangan) membalik jurnal dan mengembalikan stok.
- **Tahan**: simpan keranjang yang sedang berjalan (maks. 10), layani pembeli lain, lalu buka **Tertahan** dan **Lanjutkan**. Keranjang tertahan ikut tersimpan di data.
- **Pelanggan (opsional)** di panel Pesanan menampilkan piutang berjalan dan sisa batas kredit; pelanggan terpilih ikut tercatat pada penjualan tunai.

### Metode bayar dan uang muka di Kasir (v1.1.347)
- Dialog bayar kini punya empat metode: **Tunai**, **Transfer**, **QRIS**, dan **Kredit**. Transfer dan QRIS masuk ke rekening/akun yang dipilih (bawaan rekening bank pertama; pilihan terakhir diingat per metode) dan menyimpan **referensi** (opsional) di catatan nota. Tidak ada uang diterima/kembalian pada Transfer dan QRIS.
- **Kredit** dapat disertai **Uang muka (DP)**: DP dicatat sebagai pembayaran piutang pada nota yang sama (masuk kas/bank yang dipilih), sisanya menjadi piutang pelanggan. Untuk membatalkan nota ber-DP, batalkan dulu pembayaran DP di detail nota.
- **Tutup kasir** menampilkan **Penjualan menurut metode**; kas laci hanya memuat penerimaan ke kas yang dipilih, jadi Transfer dan QRIS tidak dihitung sebagai uang di laci.
- Nota lama tanpa metode dibaca otomatis: kas bertipe bank dianggap Transfer, lainnya Tunai.

### Kasir lanjutan (v1.1.348)
- **Pintasan papan ketik** (desktop): **F2** fokus ke pencarian, **F4** buka pembayaran, **Esc** tutup dialog, **Enter** di dialog bayar menyelesaikan penjualan.
- **Sering dibeli**: baris tombol 6 produk terlaris 30 hari terakhir di atas grid; ketuk untuk menambah ke keranjang.
- **Peringatan stok** di baris keranjang bila sisa stok setelah pesanan sudah di bawah stok minimum.
- **WhatsApp** di layar penjualan berhasil: membuka WhatsApp dengan teks struk (ke nomor pelanggan bila ada, bila tidak pilih kontak sendiri).
- **Batas diskon kasir**: atur persen di Perdagangan > Data. Diskon di atas batas hanya dapat diproses peran yang berizin kelola Perdagangan; kasir mendapat pesan penolakan.

### Mengetik tanggal manual (v1.1.349)
- Di semua kolom tanggal dan bulan (termasuk Tutup kasir), buka pemilih lalu ketik di kotak **Ketik** di bagian atas, tekan **Enter** atau **OK**. Format yang dikenali: `21/10/2026`, `21-10-26`, `21102026`, `211026`, `21/10` (tahun ini), `21` (bulan ini), `2026-10-21`; untuk kolom bulan: `10/2026`, `102026`, `2026-10`.
- Dari papan ketik: fokus ke tombol tanggal lalu langsung ketik angka; kotak ketik terbuka otomatis.
- Tanggal yang tidak ada (mis. 31/02) atau di luar batas ditolak dengan pesan di bawah kotak.

### Barang lain / jasa di Kasir (v1.1.350)
- Tombol **Barang lain** (di baris pencarian) menambahkan baris dengan nama, harga, jumlah, dan satuan bebas, misalnya ongkos kirim, jasa, atau barang di luar daftar. Baris ini **tidak memakai stok** dan tidak mengubah persediaan maupun HPP (laba kotor = harga penuh).
- Dapat dicampur dengan produk biasa dalam satu nota, dijual tunai, Transfer, QRIS, atau kredit. Tampil di nota, struk, teks WhatsApp, dan laporan Perdagangan (sebagai "Lain-lain" bernama sesuai label). Baris bebas tidak ikut daftar retur barang.

### Perbaikan Kasir (v1.1.351)
- Setelah menekan **Selesaikan**, layar *Pembayaran berhasil* kini langsung tampil. Sebelumnya layar masih menampilkan langkah pembayaran sampai ketukan berikutnya, yang lalu memunculkan pesan "Keranjang kosong"; ketukan ganda pada Selesaikan kini diabaikan.
- Ubin produk menandai **⚠ Modal > harga** bila harga modal rata-rata persediaan lebih tinggi dari harga jual, supaya salah isi harga modal terlihat sebelum menjual dan menghasilkan laba kotor negatif.

### Pembelian dan utang lanjutan (v1.1.361)
- **Diskon dan biaya angkut pembelian:** di form Pembelian baru, isi *Diskon pembelian* dan *Biaya angkut*. Keduanya dibagi ke tiap barang sebanding nilainya, sehingga harga pokok rata-rata (HPP) sudah memuat angkut dan potongan (landed cost). Biaya angkut bisa *ikut tagihan pemasok* (menambah total nota) atau *dibayar tunai dari kas/bank* terpisah (Debit Persediaan, Kredit kas). Detail pembelian menampilkan harga nota dan harga setelah angkut/diskon.
- **Pesanan pembelian (PO):** kartu *Pesanan pembelian* di Stok > Pembelian. Alur: *Pesanan baru* (draf) → *Tandai terkirim* → *Terima barang* (boleh bertahap; isi jumlah yang tiba dan harga sebenarnya, plus diskon/angkut/kredit-tunai) → selesai. PO tidak membuat jurnal; jurnal dan stok baru terjadi saat barang diterima (menjadi satu Pembelian BL-…, tertaut ke PO). *Tutup sisa pesanan* bila sisa tidak akan datang; *Batalkan pesanan* bila belum ada penerimaan; membatalkan sebuah penerimaan mengembalikan sisa pesanan. *Cetak pesanan* membuat dokumen untuk pemasok.
- **Bayar beberapa nota utang:** kartu *Utang usaha* kini per pemasok (diurut jatuh tempo). Ketuk pemasok, pilih nota, isi jumlah (bisa sebagian; dibagi mulai nota yang paling dulu jatuh tempo), pilih kas/bank. Tiap nota mendapat catatan bayar sendiri dan bisa dibatalkan satu per satu dari detail pembelian.
- **Pengingat:** lonceng memberi tahu utang pemasok lewat jatuh tempo, utang jatuh tempo ≤ 3 hari, dan pesanan yang melewati tanggal harapan; Ringkasan tetap menampilkan utang ≤ 7 hari.

### Analitik perdagangan (v1.1.362)
Di **Laporan Perdagangan** (ikut rentang tanggal dan unit yang dipilih) kini ada kartu: *Pembanding periode* (dibanding periode sebelumnya yang sama panjang; perlu tanggal awal dan akhir), *Grafik tren bulanan*, *Penjualan per Kategori*, *Analisis ABC* (A = 80% penjualan, B = 15% berikutnya, C = sisanya), *Perputaran Stok* (HPP ÷ nilai persediaan hari ini, dan hari persediaan) serta *Margin per Pelanggan*. Semua ikut tombol **Unduh CSV**; tombol **Cetak / simpan PDF** membuka dialog cetak (pilih Simpan sebagai PDF).

### Skala dan integrasi (v1.1.363)
- **Impor penjualan dan pembelian dari CSV:** Data Perdagangan > kartu *Impor penjualan dan pembelian dari CSV* (templat bisa diunduh). Baris dengan nomor nota sama menjadi satu nota; tanggal format YYYY-MM-DD; kredit wajib ada pelanggan/pemasok. Tiap nota dicatat lewat jalur resmi (stok, HPP, jurnal). Nota yang gagal (stok kurang, periode ditutup) dilewati dan disebut di pesan. Maksimal 1.000 nota per berkas; impor pembelian dulu agar stok cukup.
- **Pengingat piutang WhatsApp dan kartu piutang:** buka Piutang > pilih pelanggan; tombol *Ingatkan lewat WhatsApp* (bila nomor telepon ada) dan *Unduh kartu piutang* (berkas HTML mandiri yang bisa dikirim ke pelanggan; potret posisi saat dibuat). Portal daring dengan masuk sendiri belum ada.
- **Daftar besar:** daftar penjualan merender bertahap (30 nota, tombol muat lebih), diuji dengan 6.000 nota.
- **Cermin Supabase:** jalankan `sql/09_perdagangan.sql` sekali di Supabase; lalu Setelan > Awan > Tabel relasional ikut mengisi dan membandingkan `stock_moves`, `purchases`, `dg_po`.

### Beberapa gudang (v1.1.364)
Di **Stok Barang**, kartu *Gudang dan transfer stok*: isi nama lalu *Tambah gudang* (per unit). *Transfer stok* memindahkan jumlah produk antar gudang pada tanggal tertentu; total stok dan nilai persediaan tidak berubah. Gudang utama adalah sisa stok di luar gudang tambahan, jadi penjualan, pembelian, retur, dan opname lama tetap berjalan. Bila stok sebuah produk sebagian ada di gudang lain dan penjualan melebihi isi Gudang utama, sistem meminta Anda mentransfer dulu. Transfer bisa dibatalkan selama stok tujuan belum terpakai; gudang hanya bisa dinonaktifkan bila kosong. Transfer antar unit dagang belum ada.
