# Sistem BUMDes Multi-Unit Usaha

Aplikasi manajemen BUMDes untuk banyak unit usaha (Simpan Pinjam, Sumber Air, Perdagangan, dll.) dengan satu mesin akuntansi bersama. Bukan aplikasi koperasi: Simpan Pinjam hanyalah salah satu unit. Saat ini fokus ke Simpan Pinjam; Unit Air dan Gaji bawaan nonaktif dan dapat dinyalakan di *Setelan > Modul*.

> **Status:** MVP Tahap 1 — **v1.1.174** · satu file `bumdes.html` (HTML + CSS + JS), data di `localStorage` (key `bumdes_db_v1`)
> **Desain:** `BUMDes_Multi_Unit_Usaha_Blueprint_v2_LocalStorage.md`

## Menjalankan

1. Buka `bumdes.html` di browser (tanpa install/server). Data demo dibuat otomatis saat pertama dibuka.
2. Data hanya ada di satu browser/perangkat. **Export JSON berkala** (tab *Data*); aplikasi mengingatkan setelah 7 hari.

## Fitur (v1.1.174)
- **Zona waktu mengikuti perangkat (v1.1.174):** tanggal hari ini dan jam tampilan memakai waktu perangkat (mis. WITA); data tersimpan tetap UTC.
- **Tabel jadwal simulasi ringkas dan polos (v1.1.173):** angka tanpa Rp, baris Jumlah, muat di HP tanpa geser, bukan kartu.
- **Tampilan halaman pinjaman dirapikan (v1.1.172):** tanpa kartu di dalam kartu; teks tidak menempel ke garis tepi.
- **Ajukan pinjaman dan rincian pinjaman sebagai halaman (v1.1.171):** Simpan Pinjam > Pinjaman: Ajukan pinjaman, Ubah pengajuan, dan rincian per nasabah kini halaman penuh (dua kolom di layar lebar; simulasi angsuran di samping isian; bilah tombol tetap terlihat; Kembali; kartu Pinjaman lain milik nasabah). Setujui, Cairkan, Bayar, Lunasi, Tolak, jaminan, dan profil nasabah tetap jendela kecil di atas halaman. Alamat: `/simpan-pinjam/ajukan`, `/simpan-pinjam/pinjaman/{id}`, `.../ubah`; tombol Back peramban kembali ke daftar.
- **Master Tarif Air (v1.1.169; form lewat modal sejak v1.1.170):** sub-tab Master > Tarif Air mengatur golongan tarif (dipilih per sambungan), denda keterlambatan (sekali per tagihan, diubah/dibebaskan saat Terima), biaya pasang baru (piutang saat sambungan baru), dan diskon (tagihan dan penjualan lain); semua bawaan nonaktif. Akun baru 4210 dan 4220.
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
| `sql/98_kosongkan_isi.sql` | Kosongkan isi semua tabel data dan snapshot (versi awan kembali nol); struktur, BUMDes, anggota, dan akun tetap |
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

**Alur pengembangan:** edit berkas sumber → `node build.js` (menyegarkan `bumdes.html`) → `npm test` (cek sinkron + versi + daftar cache) atau `npm run test:cepat` (uji pra-rilis ±1,5 menit; butuh `tests/` lokal) dan `npm run test:lengkap` (semua uji termasuk seluruh uji UI). Saat menambah/ganti nama berkas skrip: ubah daftar `<script src>` di `index.html` dan `ASSETS` di `sw.js`.
