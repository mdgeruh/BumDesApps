# Changelog

Format mengikuti [Keep a Changelog](https://keepachangelog.com/) secara longgar. Skema versi `1.1.NNN` (naik satu tiap rilis) mulai v1.1.001; sebelumnya `0.1.NNN`. Rencana ke depan: `ROADMAP.md`.

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