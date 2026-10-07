# ROADMAP — Sistem BUMDes Multi-Unit Usaha

Sumber tunggal todolist. Posisi: **v1.1.109** (2026-10-07). Terbaru: validasi Siapkan BUMDes diperjelas (kotak galat menetap, sandi dipertahankan). Sebelumnya: SQL dirapikan ke folder sql/ bernomor. Sebelumnya: model satu aplikasi satu database satu BUMDes, penyiapan admin pertama, reset SQL. Sebelumnya: tombol Cek peran akun dan galat deteksi developer ditampilkan. Sebelumnya: Setelan > Awan dibedakan untuk akun developer dan admin BUMDes. Sebelumnya: Setelan > Awan dua kolom di desktop. Sebelumnya: tabel relasional Tahap 5 (penjualan, Unit Air, jaminan, tarif dan pajak); berkas SQL kini 8. Sebelumnya: Konsol Developer punya tombol Masuk ke BUMDes yang membuka layar login BUMDes tertuju. Sebelumnya: tabel relasional Tahap 4 (tabungan) dan berkas SQL kini 7 berurutan. Sebelumnya: alamat per halaman kini mencakup sub-tab semua menu (mis. /laporan/laba-rugi, /simpan-pinjam/tunggakan, /master/akun). Sebelumnya: cetak laporan dioptimalkan (A4, tanpa kartu ringkasan, tabel rapi, tanda tangan, nomor halaman). Sebelumnya: alamat per halaman (web route) lewat History API: tiap menu dan sub-tab Setelan punya URL, Back/Forward dan refresh berfungsi, vercel.json menambah rewrites. Sebelumnya: berpindah atau membuat BUMDes awan kedua tidak lagi menyalin data perangkat ke BUMDes itu (data dikosongkan atau dimuat dari awan). Sebelumnya: semua sub-tab Setelan dioptimalkan untuk desktop (Modul dan Simpan Pinjam berdampingan). Sebelumnya: Setelan > Profil dioptimalkan untuk desktop (dua kolom). Sebelumnya: Buku Besar dioptimalkan, ringkasan, saldo awal/akhir, urutan, rincian transaksi, cetak dan CSV (094); SQL Supabase dirapikan, satu berkas pasang-semua dan panduan baru (093); sidebar bergaya ringan dengan tombol ciut mengambang (092); Laporan bergaya kartu, ringkasan 5 kartu dan pemilih laporan berikon (091); Dashboard bergaya kartu analitik, ikon dan delta, grafik area, batang per unit, pola per hari, komposisi kas (090); Dashboard dioptimalkan, kartu jatuh tempo 7 hari dan tabungan, transaksi terakhir, peringatan ringkas (089); halaman Master dioptimalkan, ada pencarian/filter akun, mitra, pegawai, tarif, jabatan dilipat (088); Setelan ditata ulang, pengaturan Simpan Pinjam punya tab sendiri dengan bagian lipat (087); tabel Supabase Tahap 3 untuk pegawai dan gaji (086); pengguna dibuat dari pegawai dengan PIN awal 1234 wajib ganti, plus query SQL (085); jabatan umum terisi otomatis dan tombol Isi jabatan umum (084); dokumen dirapikan dan riwayat lama diarsipkan (083); pengguna dipilih dari daftar pegawai dengan peran bawaan per jabatan (082); komponen gaji nominal/% gaji pokok/% laba sebelum-sesudah beban gaji, ceklist pegawai, bawaan jabatan, master jabatan (081); masuk aman di perangkat berisi data dan pilihan BUMDes yang jelas (080); halaman masuk gabungan per peran, sesi offline, portal nasabah via Supabase (079, DB5); halaman dan peran developer platform (DB6); sinkron awan dua arah dan tabel relasional (DB2–DB4); Simpan Pinjam O1–O6 (audit dan tabungan wajib, fee per jenis, denda dari master tarif, PAR, laporan tabungan, templat pengingat). Skema versi `1.1.NNN`, naik satu tiap rilis. Desain: Blueprint; ringkasan: `SUMMARY.md`; riwayat rilis: `CHANGELOG.md` (rilis lama: `CHANGELOG_ARSIP.md`); cara uji: `tests/README.md`.
Status: `[x]` selesai · `[~]` sebagian · `[ ]` belum · `[-]` ditunda · usaha: S kecil · M sedang · L besar. Panduan teknis, bukan penetapan kebijakan akuntansi/hukum BUMDes.

> **FOKUS SAAT INI (permintaan pengguna 2026-10-01): unit Simpan Pinjam — logika, metode hitung, dan tampilan (UI).**
> - Unit lain **bawaan nonaktif** dan dinyalakan dari *Setelan > Modul* (v0.1.039): Unit Air dan Gaji. Simpan Pinjam, Transaksi, dan akuntansi selalu aktif. Perubahan di luar Simpan Pinjam hanya perbaikan galat dan koreksi data.
> - Urutan pengerjaan Simpan Pinjam: **SP0** integritas logika → **SP-M** mesin hitung dan simulasi → **SP-U** UI Simpan Pinjam → **SP1** Rate/Fee/Tax Engine → **SP2** alur pengajuan lengkap dan persetujuan → **SP3** peran → **SP4** tunggakan, restrukturisasi, pelunasan → **SP5** audit dan laporan. Tiap rilis mencakup logika, UI, uji, dan dokumen sekaligus (lihat Definition of Done).
> - Fase F (Frontend) sisa (F4 PWA/luring/tema, F5 tabel/cetak, F6 arsitektur) **ditunda**; komponen yang dibutuhkan Simpan Pinjam (`fld()`, modal, lencana status, keadaan kosong, sub-tab) dikerjakan di dalam SP-U. Fase PC (Procurement & Contract) dan RBAC Rilis 3 menunggu SP2.

## 1. Peta fase

| Fase | Isi | Status |
|------|-----|--------|
| 1–3 | Fondasi (shell, JSON DB, akuntansi, Kas & Bank, backup); Simpan Pinjam inti; UX P0 | Selesai (v0.1.001–007) |
| 4, 4B | UX P1; navigasi, layout, Setelan BUMDes, optimalisasi | Selesai kecuali sisa polesan (lihat Backlog) |
| 5 | Unit Air | Selesai kecuali Pengiriman (ditunda); sekarang **modul opsional, bawaan nonaktif** (v0.1.039) |
| 6 | Payroll | Hampir selesai (sisa alokasi multi-unit, approval berbasis peran); **modul opsional, bawaan nonaktif** (v0.1.039) |
| 7 | Laporan lengkap | Sebagian (Gaji, Neraca, Laba Rugi, Arus Kas, Piutang, Simpan Pinjam, Unit Air; sisa PDF/XLSX, perbandingan periode, catatan atas laporan) |
| 8 | Tata kelola (master, jurnal multi-baris, saldo awal terpandu, tutup buku, audit log) | Sebagian; approval digabung ke SP2 |
| 8B | RBAC: pengguna, peran, izin | Rilis 1–2 selesai (v0.1.028–029); Rilis 3 persetujuan **digabung dengan SP2** |
| F | Frontend & UI | F1–F3 selesai (v0.1.030–038 termasuk CRUD modal dan sub-tab modern); **F4–F6 ditunda** |
| **SP** | **Simpan Pinjam: integritas, mesin hitung, UI, Rate/Fee/Tax, alur lengkap, peran, tunggakan, audit** | **FOKUS SAAT INI (SP0 dan SP-M selesai; SP-U berikutnya)** |
| PC | Procurement & Contract Management | Ditahan sampai SP2 selesai |
| 9 | Kualitas: onboarding, CI, uji perangkat fisik | Sebagian besar dipindah ke Fase F dan SP-U |
| 10 | Production Ready (API, MongoDB, autentikasi, multi-user) | Belum |

## 2. Fase SP — Simpan Pinjam (FOKUS SAAT INI)

### 2.1 Audit v0.1.038 (dibaca dari kode dan dicoba lewat skrip; menjadi garis dasar yang harus membaik)

**Logika dan metode**
- Transisi status tidak dijaga di fungsi logika, hanya disembunyikan tombolnya: `lst()` menerima status apa pun untuk pinjaman apa pun (dicoba: pinjaman *aktif* diubah ke *ditolak* lewat fungsi, status berubah sementara jurnal pencairan dan 6 angsuran tetap ada)
- Urutan tanggal tidak divalidasi: persetujuan bertanggal sebelum pengajuan, pencairan bertanggal sebelum persetujuan dan pengajuan, dan pembayaran angsuran bertanggal sebelum tanggal pencairan semuanya diterima
- Batas masukan tidak ada: jasa 1000% per tahun, tenor 600 bulan, dan pokok Rp 1.000.000.000.000.000 diterima; tenor `12.9` dipotong diam-diam menjadi 12
- Pengajuan identik (nasabah, pokok, tanggal sama) diterima tanpa peringatan; tidak ada batas plafon atau eksposur per nasabah (lima pinjaman bersamaan lolos)
- Pengajuan salah tidak bisa diedit atau dibatalkan (hanya Setujui atau Tolak); penolakan tanpa alasan; Setujui, Tolak, dan Cairkan tidak meminta konfirmasi (hanya aksi pembatalan yang memakai dialog)
- Pinjaman boleh diajukan atas unit usaha mana pun (bukan hanya unit Simpan Pinjam)
- Metode jasa hanya *flat* dan *menurun*; tidak ada anuitas, masa tenggang, pembulatan angsuran yang dapat diatur, atau frekuensi selain bulanan; tenor dan jatuh tempo selalu dari tanggal pencairan
- Denda satu tarif global, dihitung dari (pokok + jasa) × % per hari × hari terlambat, **tanpa masa tenggang dan tanpa batas maksimum**
- Status *menunggak* tidak disimpan di pinjaman (hanya diturunkan dari angsuran); belum ada kolektibilitas, catatan penagihan, restrukturisasi
- Yang sudah benar dan dipertahankan: jurnal selalu seimbang, alokasi pembayaran denda → jasa → pokok, pembayaran sebagian, pelunasan dipercepat, pembatalan hanya untuk pembayaran terakhir dengan jurnal pembalik, pinjaman saldo awal dipisah

**UI**
- Satu halaman panjang dengan empat sub-tab; sub-tab *Pinjaman* memuat kartu global *Tanggal transaksi / Kas-Bank / Jumlah bayar* yang dipakai bersama oleh Cairkan, Bayar, dan Lunasi (mudah salah isi), daftar pinjaman, jadwal, riwayat, dan formulir pengajuan di bagian bawah
- Tidak ada halaman rincian per pinjaman (ringkasan status, jadwal, riwayat, jaminan, dokumen, linimasa dalam satu tempat) dan tidak ada simulasi angsuran sebelum mengajukan
- Daftar pinjaman (✔ v0.1.045: daftar ringkas + modal rincian + jadwal expand/collapse) tanpa pencarian, filter status, atau muat lebih banyak; nasabah tanpa pencarian; tidak ada ringkasan portofolio di atas daftar
- Formulir pengajuan dan jaminan masih inline (belum `fld()` dan modal seperti CRUD lain); aksi hanya ikon di baris tabel
- Tidak ada ringkasan tunggakan yang bisa ditindaklanjuti (hanya tabel dan aging)

### 2.2 Urutan rilis (nomor versi adalah target; dapat bergeser bila ada perbaikan galat)

| Rilis | Target | Tema | Sifat |
|-------|--------|------|-------|
| **SP0** | v0.1.040 ✔ | Integritas dan validasi logika | Logika + uji, UI minimal (pesan galat per kolom) — selesai |
| **SP-M** | v0.1.041 ✔ | Mesin hitung jadwal, jasa, dan denda (fungsi murni) + simulasi | Metode + uji |
| **SP-U** | v0.1.043–044 | UI Simpan Pinjam: ringkasan portofolio, daftar, rincian pinjaman, pengajuan dan simulasi, alur aksi | UI + uji browser |
| **SP1** | v0.1.045 | Rate, Fee & Tax Engine | Logika + UI Master |
| **SP2** | v0.1.046–047 | Alur pengajuan lengkap, persetujuan berjenjang (bersama 8B Rilis 3), akad, pencairan dengan fee | Logika + UI |
| **SP3** | v0.1.048 | Peran dan pemisahan tugas | Logika + UI |
| **SP4** | v0.1.049 | Tunggakan, kolektibilitas, restrukturisasi, pelunasan | Logika + UI |
| **SP5** | v0.1.050 | Audit, riwayat, laporan Simpan Pinjam | Laporan |

### SP0 — Integritas dan validasi logika (M) — SELESAI (v0.1.040)
Dikerjakan 2026-10-01 (v0.1.040): `LOAN_FLOW`/`goLoan()`, `loanChk()`/`loanWarn()`, `dChk()`/`payDate()`, `spl()` (batas di *Setelan > Profil > Batas Pengajuan dan Transaksi*, `settings.sp_limits`), `chkLoans()`, modal Ubah/Tolak/Batalkan, konfirmasi Setujui dan Cairkan. Uji: `logic-35.js` (114 pengecekan) dan `ui-sp0.py`. Catatan: tanggal transaksi bawaan tidak boleh melewati hari ini (`future_days` 0), pokok minimum Rp 1.000, jasa maks 100%, tenor maks 120 bulan; konfirmasi Tolak berupa modal alasan; peringatan duplikat/eksposur dilanjutkan dengan menekan tombol sekali lagi. Uji lama menaikkan `future_days` (harness) karena sebagian memakai tanggal depan.
Tujuan: logika tidak bisa dilanggar lewat jalur mana pun (UI, fungsi, impor), tanpa mengubah aturan akuntansi. Pinjaman dan data lama tetap terbaca.
- [x] **Validasi Siapkan BUMDes (v1.1.109):** kotak galat menetap, semua masalah sekaligus, sandi dipertahankan, ikon mata tampilkan sandi, batas waktu.
- [x] **SQL bertahap (v1.1.108):** folder `sql/` bernomor 00 sampai 07 dan 99.
- [x] **Satu aplikasi satu database (v1.1.107):** 1 hosting = 1 Supabase = 1 BUMDes; Siapkan BUMDes (pendaftar pertama admin); `supabase_reset.sql`; developer dihapus.
- [x] **Mesin transisi status** satu tabel (`LOAN_FLOW`): `submitted → approved/rejected`, `approved → active` (hanya lewat `cairkan`), `active → paid_off`, pembatalan terkontrol (`approved ← active` hanya tanpa pembayaran); semua fungsi (`lst`, `cairkan`, `batalCair`, `settle`) memeriksa tabel ini; transisi tidak sah ditolak dengan pesan jelas
- [x] **Urutan tanggal:** persetujuan ≥ pengajuan; pencairan ≥ persetujuan; pembayaran ≥ pencairan; pelunasan dipercepat ≥ pembayaran terakhir; tanggal tidak boleh jauh di masa depan (batas yang dapat diatur di Setelan, bawaan hari ini)
- [x] **Batas masukan** (nilai bawaan dapat diatur di Setelan > Simpan Pinjam, bukan angka mati): pokok minimum dan maksimum, jasa 0–`max` % per tahun, tenor bulat 1–`max` bulan (pecahan ditolak, bukan dipotong), pembulatan jumlah ke rupiah; pesan per kolom
- [x] **Duplikat dan eksposur:** peringatan (bisa dilanjutkan dengan konfirmasi) untuk pengajuan identik dalam jangka tertentu; pengaturan opsional *maks. pinjaman aktif per nasabah* dan *maks. total pokok per nasabah* (bawaan: tidak membatasi, tampil sebagai peringatan)
- [x] **Unit Simpan Pinjam:** pinjaman hanya untuk unit bertipe simpan pinjam (penanda `type` pada unit; unit lama dipetakan otomatis ke SP bila `code === "SP"`), pilihan unit di formulir hanya unit itu
- [x] **Edit dan batalkan pengajuan** (status *diajukan* saja): ubah pokok, jasa, metode, tenor, tanggal; batalkan dengan alasan; tercatat di audit; nomor pinjaman tidak dipakai ulang
- [x] **Tolak dengan alasan wajib** (disimpan di pinjaman, tampil di daftar dan rincian); konfirmasi untuk Setujui, Tolak, dan Cairkan lewat dialog yang sudah ada (`askC`)
- [x] **Jaga data impor:** `chk()` memeriksa konsistensi pinjaman (status vs jadwal vs pembayaran, jumlah pokok jadwal = pokok pinjaman, pembayaran terkait ada) dan menolak backup yang rusak dengan pesan jelas
- [x] Uji: tiap transisi sah/tidak sah (termasuk lewat pemanggilan fungsi langsung), urutan tanggal, batas masukan, duplikat dan eksposur, edit/batalkan pengajuan, tolak tanpa alasan ditolak, impor rusak ditolak, mode lama tetap lulus, Neraca Saldo seimbang

### SP-M — Mesin hitung jadwal, jasa, dan denda (M–L) — SELESAI (v0.1.041)
Dikerjakan 2026-10-01 (v0.1.041): `buildSchedule()`, `simulate()`, `owed()` berparameter, `SPC0`/`calcSet()`/`calcOf()`, `setCalc()` (kartu *Perhitungan Jasa dan Denda* di Setelan > Profil, `settings.sp_calc`), snapshot `loan.calc` pada pengajuan. Uji: `logic-36.js` (95 pengecekan, termasuk 1.750 kombinasi identik dengan v0.1.038) dan `ui-spm.py`. Keputusan: **persentase denda per hari tetap global** (tidak disnapshot, perilaku lama); opsi tenggang/batas/dasar denda disnapshot; frekuensi hanya bulanan (mingguan/harian menunggu pengurus); tombol simulasi di UI ditunda ke SP-U (fungsinya sudah siap); mengubah pengajuan Diajukan memperbarui snapshot ke setelan terbaru.
Tujuan: semua hitungan jadwal dan denda ada di fungsi murni yang bisa diuji dan dipakai ulang oleh simulasi, pencairan, restrukturisasi, dan Rate Master (SP1).
- [x] `buildSchedule(params)` murni → daftar angsuran (tanpa menulis data); `schedule()` lama memanggilnya; hasil untuk flat dan menurun **identik dengan sekarang** (diuji terhadap data v0.1.038)
- [x] Metode jasa tambahan: **anuitas** (angsuran tetap, jasa efektif), flat dengan basis hari (30/360 dan aktual/365, dapat dipilih), pembulatan angsuran (ke rupiah, ke 100/1.000) dengan sisa dibebankan ke angsuran terakhir
- [x] **Masa tenggang pokok** (n bulan hanya jasa), tanggal jatuh tempo tetap tanggal-dalam-bulan (31 Jan → akhir Februari, kembali tanggal 31 Maret) atau tanggal tagih tetap yang dipilih; frekuensi bulanan (mingguan dan harian menunggu keputusan pengurus)
- [x] **Denda:** masa tenggang hari (bawaan 0), batas maksimum denda (% dari tagihan atau nominal; bawaan tanpa batas), dasar hitung dipilih (angsuran, tunggakan pokok, tunggakan pokok + jasa); perilaku bawaan **sama dengan sekarang**
- [x] `simulate(params)` → jadwal, total jasa, total bayar, *effective rate* (IRR bulanan dan tahunan), ringkasan; dipakai UI simulasi dan akad nanti
- [x] Parameter hitung disimpan di pinjaman (**snapshot** metode, basis, pembulatan, masa tenggang, denda) agar perubahan setelan tidak mengubah pinjaman berjalan; pinjaman lama tanpa snapshot memakai nilai bawaan lama
- [x] Uji: kesetaraan dengan hasil lama (flat dan menurun, berbagai tenor dan akhir bulan), anuitas dan IRR diverifikasi terhadap rumus, pembulatan menjaga total pokok, masa tenggang, denda dengan tenggang dan batas, snapshot tidak berubah saat setelan berubah, Neraca Saldo seimbang

### SP-U — UI Simpan Pinjam (L; dua rilis)
> Catatan: v0.1.042 dipakai untuk optimalisasi Dashboard (permintaan pengguna), sehingga nomor rilis SP-U dan seterusnya bergeser satu (SP-U v0.1.043–044, SP1 v0.1.045, SP2 v0.1.046–047, SP3 v0.1.048, SP4 v0.1.049, SP5 v0.1.050).
Tujuan: mudah dipakai harian di ponsel dan desktop; semua aksi jelas, aman, dan terbaca. Memakai komponen Fase F (`fld()`, modal, `tabBar()`, lencana, keadaan kosong).
**Rilis 1 (v0.1.043): struktur dan daftar**
- [x] (v1.1.004) Sub-tab baru: **Ringkasan · Pinjaman · Tunggakan · Jaminan · Nasabah** (Ringkasan: pinjaman aktif, sisa pokok, tunggakan, jatuh tempo 7/30 hari, pengajuan menunggu, pembayaran bulan ini, dengan tombol ke tujuan)
- [x] (v1.1.004; pencarian/filter/lencana sudah v0.1.045) Daftar pinjaman: pencarian (no, nasabah), filter status dan unit, urutan, muat lebih banyak, lencana status (Diajukan, Disetujui, Aktif, Menunggak, Lunas, Ditolak, Dibatalkan), kartu di mobile; kolom sisa pokok dan angsuran berikut
- [x] (v1.1.004) Nasabah: pencarian, ringkasan per nasabah (jumlah pinjaman, sisa pokok, status terburuk), tombol *Ajukan pinjaman* dari rincian nasabah
- [~] (kartu dipindah ke modal rincian pinjaman v0.1.045; dialog per aksi belum) Pindahkan kartu global *Tanggal/Kas-Bank/Jumlah* ke **dialog tiap aksi** (Cairkan, Bayar, Lunasi) dengan nilai bawaan yang masuk akal dan galat per kolom
**Rilis 2 (v0.1.049): rincian dan alur**
- [x] (v1.1.005: modal rincian dengan Linimasa, daftar Jaminan tertaut + tambah jaminan, baris Tagihan berikutnya/Denda berjalan/Total dibayar) **Halaman rincian pinjaman** (buka dari daftar): ringkasan (nasabah, unit, pokok, jasa, metode, tenor, status), kartu sisa pokok/tagihan berikutnya/denda berjalan, jadwal, riwayat pembayaran, jaminan, dokumen cetak (bukti cair, kwitansi), **linimasa** (diajukan, disetujui, dicairkan, pembayaran, pelunasan) dari audit; tombol aksi sesuai status dan izin
- [~] **Pengajuan lewat modal** (modal selesai v0.1.043; sisa: panel **simulasi angsuran langsung** (jadwal ringkas, total jasa, effective rate) memakai `simulate()` ✔ v1.1.004; pratinjau peringatan duplikat/eksposur sebelum kirim ✔ v1.1.006) dengan `fld()`
- [~] Jaminan dan nasabah lewat modal ✔ (v0.1.046); jaminan ditautkan dari rincian pinjaman belum
- [x] (v1.1.051 selesai; v1.1.049: FAB kontekstual, menepi saat menggulir/mengisi form; v1.1.050: konfirmasi untuk tagihan air, akui fee, hapus logo; v1.1.051: tombol utama menempel di Baca Meter; modal sudah punya footer menempel) Aksi berisiko seragam memakai konfirmasi; tombol mengembalikan umpan balik (toast, fokus); tombol utama menempel di mobile pada form panjang
- [ ] Aksesibilitas: label terhubung, fokus, target sentuh 44px, uji `ui-a11y.py` tetap lulus; tanpa meluap horizontal di 360/390/1280px
- [x] (v1.1.006; pencarian/filter/mode cetak belum tercakup) Uji browser: `ui-sp.py` (alur nasabah → simulasi → ajukan → setujui → cairkan → bayar sebagian → lunasi → kwitansi, pencarian dan filter, rincian dan linimasa, mobile dan desktop, mode cetak)


#### Kesenjangan terhadap spesifikasi alur lengkap (garis dasar v0.1.029, masih berlaku)
| Tahap | Kondisi sekarang | Kesenjangan |
|-------|------------------|-------------|
| Calon Peminjam | Belum ada; nasabah langsung jadi pihak | Tahap calon sebelum nasabah |
| Nasabah/Peminjam | Ada (pihak, jaminan) | Kelengkapan data verifikasi |
| Pengajuan | Ada (`submitted`) | Draf, alasan, lampiran/catatan |
| Verifikasi | Belum ada | Survei, cek dokumen, hasil verifikasi |
| Analisis Kelayakan | Belum ada | Kemampuan bayar, jaminan, rekomendasi, skor |
| Persetujuan | Satu langkah Setujui/Tolak | Berjenjang menurut nominal, maker-checker (Fase 8B Rilis 3), alasan tolak |
| Akad/Perjanjian | Belum ada | Dokumen akad cetak, nomor akad, tanda tangan, tanggal akad |
| Pencairan | Ada (jurnal Dr 1300 Cr Kas) | Potongan fee saat cair (administrasi, provisi, materai, transfer), pajak |
| Jadwal Angsuran | Ada (flat/menurun) | Jadwal memakai tarif berversi |
| Pembayaran | Ada (denda, sebagian) | Denda dan fee dari Rate Master |
| Tunggakan | Ada (aging, status menunggak) | Kolektibilitas, tindak lanjut/penagihan |
| Restrukturisasi | Belum ada | Ubah tenor/jasa/jadwal terkontrol, jadwal lama tersimpan |
| Pelunasan | Ada (jasa penuh/berjalan) | Biaya pelunasan dipercepat dari Rate Master |
| Rate/Fee/Tax | (v1.1.054: jasa dan biaya pencairan pinjaman baru dari master; v1.1.055: tombol data contoh; v1.1.056: blok tarif/biaya/pajak di form pengajuan; v1.1.057: jasa bertingkat menurut pokok) Denda % per hari dan mode jasa pelunasan di Setelan | Rate Master berversi, Tax Master, mesin hitung reusable |
| Peran | 5 peran (Direktur, Bendahara, Petugas Unit, Pengawas, Admin) | Tujuh peran Simpan Pinjam + pemisahan tugas |
| Audit | Ada (siapa, kapan, aksi, keterangan) | Nilai sebelum/sesudah, peristiwa tiap tahap |

**Alur target:** Calon → Nasabah → Pengajuan → Verifikasi → Analisis → Persetujuan → Akad → Pencairan → Jadwal → Pembayaran → Tunggakan → (Restrukturisasi) → Pelunasan. Status pinjaman: `draft → diajukan → diverifikasi → dianalisis → disetujui/ditolak → diakadkan → aktif → menunggak → direstrukturisasi → lunas` (status lama `submitted/approved/active/paid_off` dipetakan otomatis; pinjaman berjalan tidak berubah).

### SP-O — Optimalisasi dan improvement Simpan Pinjam (usulan 2026-10-03; dikerjakan berurutan, satu rilis per butir/paket)
Urutan: 1 → 2 (Paket A) → 3 (laporan) → sisanya.
- [x] **O1. Tabungan wajib pada restrukturisasi, hapus buku, dan pembatalan** (v1.1.066): audit perilaku tabungan wajib saat pinjaman direstrukturisasi, dihapus buku, atau pencairan dibatalkan setelah ada pembayaran; perbaiki dan uji (tidak ada saldo yatim, ACC2300 = total tabungan, pembatalan simetris dengan pengembalian saat lunas)
- [x] **O2. Jurnal fee per jenis:** administrasi, provisi, materai, transfer masing-masing ke akun COA sendiri (dapat diatur), pajak ke akun kewajiban; laporan laba rugi merinci
- [x] **O3. Denda pindah ke Master Tarif & Biaya** sebagai rate berversi (v1.1.068; hasil hitung sama, tombol pindah dari Setelan). Biaya pelunasan dipercepat sudah dari master sejak sebelumnya; "mode jasa pelunasan" (jasa berjalan/penuh) tetap berupa setelan karena bukan tarif
- [x] **O4. Laporan kualitas pinjaman** (v1.1.069): aging tunggakan dan kolektibilitas sudah ada sebelumnya; ditambah PAR 1+/30/60/90 terhadap sisa pokok, rasio pinjaman bermasalah, dan nilai hapus buku (kotak di sub-tab Tunggakan dan Laporan SP)
- [x] **O5. Laporan fee, pajak per jenis, dan laporan tabungan wajib** (terkunci, dikembalikan); catatan: laporan fee/pajak per kode sudah ada (`feeRep`), yang belum: laporan tabungan wajib
- [x] **O6. Penagihan:** catatan tindak lanjut dan janji bayar sudah ada; yang belum: daftar jatuh tempo/tunggakan siap kirim sebagai teks pengingat (templat)
- [ ] **O7. Cetakan:** kartu pinjaman nasabah, bukti pembayaran, rekap tabungan wajib di portal nasabah (periksa portal dulu)
- [ ] **O8. Wewenang persetujuan menurut nominal** (menunggu keputusan kebijakan pengurus; masuk Gerbang Keputusan)
- [ ] **O9. Batas `localStorage`:** indikator pemakaian, pengarsipan log audit lama, peringatan sebelum penuh
- [ ] **O10. Kecepatan:** pagination/render bertahap untuk daftar panjang (pinjaman, nasabah, jurnal) di HP
- [ ] **O11. Waktu tes:** pecah `tests/run.js` menjadi tes cepat (pra-rilis) dan tes lengkap
- [ ] **O12. Cadangan dan sinkronisasi:** pengingat backup berkala; sinkronisasi cloud hanya dengan kunci anon/publishable

### Rincian rilis SP1–SP5 (dari spesifikasi pengguna 2026-09-30; urutan dan nomor versi mengikuti tabel 2.2)
Seperti RBAC, alur lengkap **opsional dan bawaan mati** (`settings.sp_flow`): bila mati, Simpan Pinjam berjalan seperti v0.1.038 dengan perbaikan SP0 dan seluruh uji lama tetap berlaku. Angka bunga, fee, dan pajak **tidak boleh di-hardcode**; semua lewat master yang dapat diubah tanpa mengubah kode. Tarif resmi dan perlakuan pajak menunggu Gerbang Keputusan; mesin dibuat lebih dulu, isinya diatur pengurus. Kerja sama dengan SP-M: `calcFees` memakai `simulate()`/`buildSchedule()`; kerja sama dengan SP-U: form SP1–SP5 memakai pola UI SP-U.


**SP1 — Rate, Fee & Tax Engine (reusable) (L) — fondasi fee dan pajak; dikerjakan setelah SP0, SP-M, dan SP-U**
- [x] (v1.1.007) Koleksi `rate_master`: `fee_code, fee_name, fee_type, calculation_method, rate, fixed_amount, minimum, maximum, taxable, effective_from, effective_until, active`. Jenis: jasa/bunga, administrasi, provisi, materai, transfer, denda keterlambatan, pelunasan dipercepat, restrukturisasi, biaya lain
- [x] (v1.1.007; per hari/bulan, min–maks; "gabungan" = persen + nominal) Metode hitung: persentase dari pokok/sisa pokok/angsuran/tunggakan, nominal tetap, gabungan dengan minimum–maksimum, per hari/bulan; dasar pengenaan (base) dipilih per fee
- [x] (v1.1.007; snapshot pada pinjaman belum — menunggu SP2 akad; `calcFees` sudah menerima snapshot) **Versi, bukan timpa:** mengubah rate membuat baris versi baru (`effective_from` baru, versi lama ditutup `effective_until`); histori transaksi lama tidak berubah; pinjaman menyimpan **snapshot** rate yang berlaku saat akad
- [x] (v1.1.007; pajak ke jurnal belum) Koleksi `tax_master`: `tax_code, tax_type, tax_rate, taxable_base, calculation_method, effective_date` (berversi); pajak terpisah dari fee BUMDes (baris sendiri di jurnal, akun kewajiban pajak terpisah); tanpa tarif bawaan
- [x] (v1.1.007) Mesin hitung tunggal `calcFees(konteks)` → daftar {fee, dasar, jumlah, pajak, total} murni (tanpa efek samping) agar mudah diuji; tanggal transaksi memilih versi yang berlaku
- [ ] Jurnal: pendapatan tiap jenis fee ke akun sendiri (COA baru, dapat diatur), pajak ke akun kewajiban; perlakuan pengakuan (langsung vs ditangguhkan/amortisasi) mengikuti Gerbang Keputusan
- [ ] Migrasi: `penalty_pct_day` dan mode jasa pelunasan pindah ke Rate Master sebagai rate awal (perilaku dan hasil hitung sama, pinjaman lama tetap); Setelan menautkan ke Master Rate
- [x] (v1.1.007; hak akses memakai `master.kelola`, hak khusus belum) UI: Master > Tarif & Biaya (daftar berversi, tambah versi, nonaktifkan, pratinjau hitung) dan Master > Pajak; hak akses khusus
- [ ] **Dipakai ulang unit lain:** antarmuka `calcFees` netral (harga, markup, fee, pajak, diskon, biaya layanan) untuk Unit Air (biaya pasang baru, denda air, golongan tarif) dan Perdagangan (markup, diskon); adopsi tiap unit dijadwalkan terpisah
- [~] (v1.1.007: versi, min–maks, pembulatan, pajak, kemurnian, Neraca Saldo tetap ✔; migrasi denda/pelunasan belum) Uji: pemilihan versi menurut tanggal, batas minimum–maksimum, pembulatan, pajak, versi baru tidak mengubah transaksi lama, migrasi denda/pelunasan identik dengan hasil lama, Neraca Saldo seimbang

**SP2 — Alur pengajuan lengkap (L)**
- [~] (v1.1.031: Calon Peminjam selesai; v1.1.032: status draf pada pengajuan selesai; v1.1.034: tautan calon → pengajuan selesai) Tahap **Calon Peminjam** (data awal, ubah menjadi Nasabah setelah lolos verifikasi) dan pengajuan berstatus draf
- [x] (v1.1.008; hasil lolos/perlu perbaikan/tidak lolos, dokumen wajib dapat diatur; Lolos = semua dokumen lengkap) **Verifikasi:** daftar periksa dokumen dan survei lapangan (tanggal, petugas, catatan, hasil lolos/perlu perbaikan/tidak lolos)
- [~] (v1.1.008: penghasilan, kewajiban, rasio angsuran, nilai jaminan, rekomendasi, skor tetap 40/30/30; v1.1.052: bobot skor dapat diatur) **Analisis kelayakan:** pendapatan/usaha, kewajiban lain, kemampuan bayar (rasio angsuran terhadap pendapatan), nilai jaminan, rekomendasi (setuju/setuju bersyarat/tolak), skor sederhana yang parameternya dapat diatur (bukan keputusan otomatis)
- [~] (v1.1.008: wewenang dua tingkat menurut nominal lewat hak `sp.setujui.besar`; belum: lebih dari dua jenjang, maker-checker 8B) **Persetujuan berjenjang:** wewenang menurut nominal (mis. Manajer sampai batas tertentu, di atasnya Direktur; ambang diatur di Setelan), alasan penolakan wajib; bergabung dengan mekanisme maker-checker Fase 8B Rilis 3 (satu implementasi, bukan dua)
- [x] (v1.1.008 nomor/tanggal akad; v1.1.024 dokumen akad cetak, klausul yang dapat diatur, snapshot biaya/pajak/denda; belum: template per produk) **Akad/Perjanjian:** nomor akad, dokumen akad cetak (kop, pihak, pokok, jasa, tenor, jadwal, fee dan pajak dari snapshot Rate Master, jaminan, denda, klausul yang dapat diatur), tanggal akad; pencairan hanya setelah akad
- [x] (v1.1.022; fee diamortisasi: v1.1.036) Pencairan memakai `calcFees`: pokok, potongan fee, pajak, dana bersih diterima, satu jurnal seimbang; bukti pencairan menampilkan rinciannya
- [~] (v1.1.008: gerbang verifikasi/analisis/wewenang/akad dan mode mati = perilaku lama ✔ di logic-46/ui-sp2) Uji: tiap transisi sah/tidak sah, tolak tanpa jurnal, pencairan tanpa akad ditolak, fee saat cair, mode alur mati = perilaku lama

**SP3 — Peran dan pemisahan tugas Simpan Pinjam (M)** — selesai v1.1.016 (tersisa: izin `sp.restruk`/`sp.lunasi` menunggu SP4; Admin untuk peran SP memakai Admin Sistem; Direktur data lama perlu diberi `sp.setujui` manual)
- [x] Peran baru pada matriks 8B (dapat diubah Admin): **Admin** (data dan administrasi), **Surveyor/Analis** (verifikasi dan analisis), **Petugas Kredit** (pengajuan), **Approver/Manajer** (persetujuan sesuai wewenang), **Kasir** (pencairan dan pembayaran), **Pengawas** (pantau/audit, hanya lihat), **Direktur** (persetujuan sesuai wewenang). Peran lama tetap dan bisa dipetakan; satu orang boleh merangkap peran menurut Gerbang Keputusan
- [x] Izin per tahap: `sp.ajukan`, `sp.verifikasi`, `sp.analisis`, `sp.setujui`, `sp.akad`, `sp.cairkan`, `sp.bayar`, `sp.restruk`, `sp.lunasi`
- [x] **Segregation of duties:** satu orang tidak boleh menjalankan seluruh rantai dari pengajuan sampai pencairan (aturan yang dapat diatur, mis. pengaju ≠ penyetuju ≠ pencair; penganalisis ≠ penyetuju); penolakan jelas + audit `akses_ditolak`
- [x] Uji: matriks peran × tahap, aturan pemisahan tugas, perangkapan peran, mode pengguna mati = tanpa pembatasan

**SP4 — Tunggakan, restrukturisasi, pelunasan (M–L)** — tahap 1 (kolektibilitas, tindak lanjut, daftar kerja) selesai v1.1.018; tahap 2–3 (restrukturisasi, hapus buku, pemulihan, pelunasan berbiaya, batal restrukturisasi) selesai v1.1.019–020; sisa: persetujuan dua tingkat restrukturisasi, biaya bertingkat
- [x] (v1.1.018) Tunggakan: kolektibilitas berjenjang (Lancar, Dalam Perhatian, Kurang Lancar, Diragukan, Macet; batas hari dapat diatur), catatan tindak lanjut/penagihan (tanggal, hasil, janji bayar), daftar kerja penagihan
- [~] (v1.1.019–020: jadwal baru, arsip jadwal lama, biaya Tarif & Pajak dengan pajak atas biaya, jasa/denda tertunggak dihapus/bayar dulu, batal restrukturisasi terakhir; v1.1.030: persetujuan dua orang (usul → setujui/tolak); belum: kebijakan bunga/denda final menunggu Gerbang Keputusan) **Restrukturisasi:** ubah tenor/jasa/jadwal atau tunda angsuran; persetujuan wajib, fee restrukturisasi dari Rate Master, jadwal lama diarsipkan (tidak dihapus), status `direstrukturisasi`, riwayat tersimpan; kebijakan perlakuan bunga/denda saat restrukturisasi menunggu Gerbang Keputusan
- [x] (v1.1.019–020) Pelunasan dipercepat memakai Rate Master (jasa berjalan/penuh, biaya pelunasan, pajak) dengan rincian di kartu dan kwitansi; hapus buku kredit macet dan pemulihan dengan izin khusus dan aturan dua orang (usul ≠ setuju, opsional)
- [x] (logic-53/54/55) Uji: kolektibilitas menurut hari tunggakan, restrukturisasi menjaga saldo pokok dan Neraca Saldo, jadwal lama tersimpan, pelunasan dengan fee dan pajak

**SP5 — Audit, histori, dan laporan Simpan Pinjam (M)** — sebagian selesai v1.1.021 (nilai sebelum/sesudah, CSV, jejak per pinjaman, laporan tambahan); v1.1.026 laporan biaya per kode selesai; v1.1.027 nama peristiwa audit baku selesai; v1.1.028 waktu proses per tahap selesai (SP5 tuntas)
- [~] (v1.1.021: nilai sebelum/sesudah untuk setelan, nasabah, pengajuan, tarif/pajak; belum: nama baku per tahap) Peristiwa audit tiap tahap: `created, submitted, verified, analyzed, approved, rejected, akad, disbursed, payment, restructured, settled` dengan siapa, kapan, perubahan apa, **nilai sebelum dan sesudah** (juga untuk perubahan Rate/Tax Master dan edit master lain)
- [x] (v1.1.021) Riwayat per pinjaman (linimasa tahap, pelaku, catatan; Jejak audit di modal), ekspor audit log (CSV)
- [~] (v1.1.021: pipeline per status, waktu proses pengajuan→persetujuan→pencairan, kolektibilitas, pendapatan per jenis, pajak terutang, kepatuhan SoD) Laporan: pipeline pengajuan per tahap, waktu proses per tahap, kolektibilitas dan kredit bermasalah, pendapatan per jenis fee dan pajak terutang, kepatuhan pemisahan tugas
- [x] (logic-56) Uji: linimasa lengkap, nilai sebelum/sesudah, laporan cocok dengan buku besar

### Gerbang Keputusan khusus Fase SP (dijawab pengurus/pengawas sebelum pembukuan riil)
Tambahan dari audit: batas wajar jasa, tenor, dan plafon per nasabah (SP0); metode jasa yang diizinkan, basis hari, masa tenggang, dan batas denda (SP-M).
- [ ] Daftar fee yang dikenakan dan tarifnya (jasa, administrasi, provisi, materai, transfer, denda, pelunasan dipercepat, restrukturisasi), dan siapa boleh mengubahnya
- [ ] Pajak: jenis pajak apa yang berlaku atas jasa/fee BUMDes, tarif, dasar pengenaan, siapa memungut/menyetor (konsultasikan konsultan pajak; sistem hanya menghitung sesuai pengaturan)
- [x] (v1.1.036) Pengakuan pendapatan fee/provisi pencairan (langsung atau diamortisasi sepanjang tenor)
- [ ] Wewenang persetujuan menurut nominal, dan aturan pemisahan tugas (apakah perangkapan peran diizinkan pada BUMDes kecil)
- [ ] Kebijakan kolektibilitas, penghapusan buku, restrukturisasi (bunga/denda), isi klausul akad (tinjau hukum)
- [ ] Susunan pengurus dan pemegang tujuh peran di atas (menjawab sebagian Gerbang Keputusan Fase 8B)
- [ ] Batas pokok, jasa, tenor, dan plafon per nasabah yang berlaku (bawaan v0.1.040: pokok Rp 1.000–100 miliar, jasa maks 100%/tahun, tenor maks 120 bulan; plafon per nasabah tidak membatasi, hanya peringatan; angka final menunggu pengurus)
- [ ] Metode jasa yang diizinkan (flat, menurun, anuitas), basis hari, masa tenggang pokok, dan frekuensi angsuran
- [ ] Aturan denda: masa tenggang hari, dasar hitung, batas maksimum

## 3. Backlog di luar Simpan Pinjam (dipertahankan, tidak dikerjakan sekarang)
- **Frontend sisa (Fase F, ditunda):** F4 PWA/luring/tema/penanda versi · F5 tabel (kepala menempel, urut kolom, pencarian), cetak per laporan, render efisien · F6 delegasi peristiwa tanpa handler inline, pecah modul `src/`, token desain, uji regresi visual. Rincian di Lampiran A
- **Unit Air (modul opsional):** Pengiriman (ditunda) · golongan tarif, denda keterlambatan, biaya pasang baru, meter rusak/taksiran · diskon, stok barang, nomor nota terpisah
- **Payroll (modul opsional):** alokasi satu pegawai ke beberapa unit · approval berbasis peran · pembayaran massal · penyetoran potongan · komponen berbasis jam/hari/persen · NIK/rekening pegawai
- **Laporan:** PDF/XLSX · perbandingan periode/tahun · catatan atas laporan · piutang per tanggal lampau · rekap gaji tahunan
- **Tata kelola:** penutupan per bulan/semester · penyusutan otomatis · keterangan sebelum-sesudah untuk edit master · ekspor audit log · sembunyikan tombol yang tidak diizinkan, saring sub-tab Data per izin, batasi laporan per unit, tombol kembalikan matriks izin ke bawaan, batas waktu tidak aktif
- **Setelan lanjutan:** format nomor dokumen, tahun buku
- **Kualitas:** debounce simpan dan daftar sangat panjang · onboarding · CI untuk `node tests/run.js` dan uji browser · cek visual di perangkat fisik, Safari iOS, dan Firefox
- **Pemeliharaan uji (v0.1.039):** uji Node dan browser kini membekukan tanggal ke 2026-09-30 (data demo bertanggal September 2026; sebelumnya 11 uji gagal sejak 1 Oktober karena periode September terbaca sebagai periode lampau). Pilihan: ubah data demo menjadi relatif terhadap tanggal sekarang (butuh penyesuaian uji yang memakai tanggal tetap)


## 4. Fase PC — Procurement & Contract Management: BUMDes sebagai Pelaksana Kegiatan Desa (permintaan pengguna 2026-09-30; DITAHAN sampai Fase SP selesai)
Model: **Desa → Kegiatan/Anggaran → Pemilihan/Penugasan → BUMDes → Pengadaan → Vendor → Barang/Jasa → Serah Terima → Pembayaran → Pelaporan.** Modul ini unit usaha jenis baru (proyek/kegiatan) di atas mesin akuntansi yang sama, memakai Rate, Fee & Tax Engine (SP1) dan RBAC/persetujuan (8B); bukan aplikasi pengadaan pemerintah.

**Prinsip istilah dan aturan:** dipakai istilah netral **Procurement & Contract Management**, bukan "tender". Mekanisme pengadaan yang berlaku bergantung pada sumber dana, nilai pekerjaan, jenis kegiatan, dan posisi BUMDes dalam kegiatan (pelaksana/penyedia atau pembeli) sehingga **tidak di-hardcode**. Metode pemilihan menjadi master yang dapat diatur pengurus sesuai dasar hukum/kebijakan yang berlaku (mis. penunjukan langsung, permintaan penawaran, seleksi terbatas/terbuka; nama, ambang nilai, jumlah penawaran minimum, dokumen wajib, dan wewenang persetujuan diisi pengurus, tanpa nilai bawaan yang mengklaim kepatuhan hukum). Sistem menyimpan bukti proses; kepatuhan hukum tetap tanggung jawab pengurus (konsultasikan pihak berwenang/ahli). Prasyarat teknis: SP1 (Rate/Fee/Tax Engine) dan Rilis 3 RBAC (persetujuan); dikerjakan setelah Fase F selesai, lalu SP1 dan alur persetujuan tersedia. Seperti modul lain: **opsional** dan tidak mengubah perilaku modul yang sudah ada; uji lama tetap lulus.

**PC1 — Proyek/Kegiatan (M)**
- [ ] Koleksi `projects`: nama kegiatan, sumber anggaran, nilai anggaran, tahun anggaran, desa/OPD pemberi kegiatan (pihak jenis *pemberi kegiatan*), dasar penugasan (nomor dan tanggal dokumen), peran BUMDes (pelaksana/pengelola/pembeli), timeline (mulai, selesai, tonggak), PIC (pengguna/pegawai), status (`draf → berjalan → serah terima → selesai/dibatalkan`)
- [ ] Anggaran kegiatan per pos (`project_budget_lines`), revisi anggaran berversi (nilai lama tersimpan), unit usaha otomatis "Proyek" atau per proyek sebagai dimensi laporan
- [ ] Daftar dan kartu proyek, ringkasan status, pencarian; tanpa menghapus proyek yang sudah bertransaksi
- [ ] Uji: siklus status, revisi anggaran, proyek berjurnal tidak bisa dihapus

**PC2 — Procurement / Pengadaan (L)**
- [ ] Rencana kebutuhan dan **RAB/BoQ** (butir, spesifikasi, satuan, volume, harga satuan perkiraan, total; impor CSV), spesifikasi barang/jasa terlampir
- [ ] **Master metode pemilihan** yang dapat diatur (lihat prinsip di atas) dan pemilihan metode per pengadaan sesuai ambang yang diatur pengurus
- [ ] Vendor sebagai pihak (jenis `pemasok` yang sudah ada + NPWP/alamat/kontak/kategori, status aktif, daftar hitam internal dengan alasan); permintaan penawaran (RFQ) dikirim ke beberapa vendor, pencatatan penawaran masuk (harga, waktu, syarat, dokumen)
- [ ] **Evaluasi penawaran:** kriteria dan bobot dapat diatur, skor per evaluator, tabel perbandingan, rekomendasi; **penetapan vendor** dengan alasan
- [ ] **Purchase Order / Surat Pesanan** dari pengadaan terpilih (nomor, butir, harga sepakat, cetak)
- [ ] Uji: BoQ menjumlah benar, ambang metode, penawaran kurang dari minimum menolak penetapan, PO hanya dari vendor ditetapkan

**PC3 — Contract Management (M–L)**
- [ ] Kontrak/SPK: nomor, pihak, nilai kontrak, **termin pembayaran** (persen/nominal, syarat pemicu), jangka waktu, denda keterlambatan (dari Rate Master), **retensi/jaminan** bila berlaku (persen, masa, pelepasan), dokumen pendukung (daftar dan tautan/lampiran kecil)
- [ ] **Addendum / perubahan kontrak** berversi (nilai, waktu, lingkup) dengan persetujuan; nilai dan jadwal termin lama tersimpan; perubahan nilai memperbarui *committed*
- [ ] Kontrak juga untuk sisi masuk: kontrak BUMDes dengan desa/pemberi kegiatan (nilai kegiatan, termin penerimaan)
- [ ] Cetak SPK/kontrak dari templat yang dapat diatur (klausul dari pengurus, bukan bawaan hukum)
- [ ] Uji: total termin = nilai kontrak, addendum, retensi, kontrak tanpa persetujuan tidak aktif

**PC4 — Delivery & Acceptance (M)**
- [ ] Pengiriman barang/kemajuan pekerjaan per butir kontrak/PO; pemeriksaan **quantity dan quality check** (diterima, ditolak sebagian, perlu perbaikan) dengan catatan
- [ ] **Berita Acara Serah Terima (BAST)** cetak (kop, pihak, butir, jumlah diterima, kondisi, tanda tangan pihak-pihak), serah terima ke desa/pemberi kegiatan
- [ ] Bukti dokumentasi (foto kecil diperkecil otomatis seperti logo; batas ukuran karena `localStorage`; catatan lokasi dan tanggal)
- [ ] Penerimaan barang memicu hak tagih/pembayaran vendor sesuai termin; barang ditolak tidak dibayar
- [ ] Uji: penerimaan sebagian, tolak sebagian, BAST hanya dari penerimaan, tidak menerima melebihi pesanan

**PC5 — Finance proyek, margin, dan dashboard (L)**
- [ ] **Invoice/termin:** penagihan ke desa/pemberi kegiatan per termin (piutang proyek) dan tagihan vendor (utang usaha/uang muka), pembayaran vendor dan penerimaan dari desa berjurnal seimbang; pajak dari `tax_master`
- [ ] **Rate/Fee Engine:** fee/markup BUMDes, biaya operasional, pajak, dan biaya barang/jasa dihitung dengan `calcFees` (versi tarif tersimpan di proyek). Contoh lembar proyek: Nilai kegiatan − Biaya barang/jasa − Biaya operasional − Pajak − Fee/markup = **Margin proyek**
- [ ] **Budget vs Actual vs Committed vs Margin** per proyek dan per pos: anggaran, komitmen (kontrak/PO), realisasi (dibayar), sisa, proyeksi margin; peringatan melampaui anggaran
- [ ] Akun COA baru yang dapat diatur (pendapatan proyek/fee, beban pokok proyek, piutang proyek, utang usaha, uang muka, retensi, pajak). **Pengakuan pendapatan** (per termin, per kemajuan, atau saat serah terima) mengikuti Gerbang Keputusan
- [ ] Laporan proyek (ringkasan, pengeluaran per vendor, pajak, margin), cetak dan CSV; Dashboard: kartu proyek berjalan, komitmen, sisa anggaran, margin
- [ ] Uji: lembar proyek cocok dengan jurnal, Neraca Saldo seimbang, komitmen berubah setelah addendum, pembayaran melebihi kontrak ditolak, retensi ditahan dan dilepas

**PC6 — RBAC, alur persetujuan, dan pengendalian benturan kepentingan (M–L)**
- [ ] Alur peran: **Project Manager → Procurement Officer → Vendor Evaluation → Approver → Contract Officer → Warehouse/Receiving → Finance → Auditor/Pengawas**; peran baru pada matriks 8B dapat diubah Admin; izin per tahap (`pc.proyek`, `pc.pengadaan`, `pc.evaluasi`, `pc.setujui`, `pc.kontrak`, `pc.terima`, `pc.bayar`, `pc.audit`)
- [ ] **Pengendalian benturan kepentingan (conflict-of-interest):** pihak yang menyusun spesifikasi/RAB tidak otomatis boleh menyetujui vendor; penyusun spesifikasi ≠ evaluator ≠ penyetuju; penyetuju kontrak ≠ penerima barang ≠ pembayar; pemesan ≠ penerima. Aturan dapat diatur (dan pengecualian tercatat dengan alasan dan persetujuan)
- [ ] Pernyataan benturan kepentingan pengguna per pengadaan (daftar pihak/vendor terkait yang dinyatakan), penolakan bila pengguna terkait dengan vendor (hubungan keluarga/kepemilikan yang dinyatakan pengurus di master)
- [ ] Persetujuan berjenjang menurut nilai (memakai mesin persetujuan Fase 8B/SP2, satu implementasi), audit lengkap (siapa, kapan, nilai sebelum/sesudah) dan peristiwa khusus (evaluasi, penetapan vendor, addendum, BAST, pembayaran)
- [ ] Uji: matriks peran × tahap, tiap aturan benturan kepentingan (ditolak dan pengecualian), Pengawas hanya lihat, mode pengguna mati = tanpa pembatasan (seperti modul lain)

**PC7 — Pelaporan kegiatan ke desa (M)**
- [ ] Laporan pertanggungjawaban kegiatan per proyek: anggaran, realisasi, vendor, barang/jasa, BAST, dokumentasi, sisa/margin; format dan periode ditentukan pemberi kegiatan (templat yang dapat diatur), cetak dan CSV
- [ ] Rekap kegiatan per tahun anggaran dan per desa/pemberi kegiatan; daftar dokumen bukti (checklist kelengkapan)
- [ ] Uji: laporan cocok dengan buku besar dan lembar proyek

**Gerbang Keputusan khusus Fase PC (dijawab pengurus/pengawas/pihak berwenang sebelum dipakai riil):**
- [ ] Dasar hukum dan kebijakan pengadaan yang berlaku untuk kegiatan ini (sumber dana, nilai, jenis kegiatan, posisi BUMDes); metode pemilihan yang diizinkan beserta ambang dan dokumen wajib. Sistem tidak menganggap semua kegiatan sama dengan tender pemerintah
- [ ] Posisi BUMDes: penyedia/pelaksana (menerima pembayaran dari desa) atau pembeli untuk kegiatan swakelola; dampaknya pada pengakuan pendapatan dan pajak
- [ ] Pengakuan pendapatan dan biaya proyek (per termin, per kemajuan, saat serah terima); perlakuan uang muka dan retensi
- [ ] Pajak yang dikenakan pada proyek (bersama Gerbang Keputusan SP), dan siapa memungut/menyetor
- [ ] Batas fee/markup BUMDes atas kegiatan yang dibiayai anggaran desa, dan pelaporannya
- [ ] Susunan peran, aturan benturan kepentingan, dan batas wewenang persetujuan menurut nilai

**Arsitektur modul (target):** Core BUMDes (multi unit usaha) → Simpan Pinjam (Fase SP) · Procurement & Contract (Fase PC) · Penjualan/Perdagangan · Jasa · Aset · Keuangan (mesin akuntansi bersama) · **Rate, Fee & Tax Engine** (SP1; dipakai semua modul) · **RBAC & Approval Workflow** (8B) · **Audit Trail** (semua modul). Modul Penjualan/Perdagangan, Jasa, dan Aset belum dijadwalkan (Unit Air sudah ada); dijadwalkan bila diminta.

## 5. Fase 10 — Production Ready
localStorage tidak cocok untuk banyak user, multi-perangkat, keamanan production, dan backup otomatis. Migrasi hanya mengganti data access layer.
- [ ] Pisahkan frontend; API + migrasi JSON → MongoDB (L)
- [ ] Autentikasi, otorisasi (role & permission), multi-user (L)
- [ ] Security, audit server-side, backup otomatis (L)
- [ ] Pengujian menyeluruh dan deployment (L)

## 6. Gerbang Keputusan (sebelum pembukuan riil)
- [ ] Bentuk/status hukum BUMDes; kebijakan modal dan penyertaan modal
- [ ] Mekanisme unit simpan pinjam; metode jasa/bunga; perlakuan tunggakan dan kredit bermasalah (saat ini asumsi teknis: denda satu tarif global, alokasi denda → jasa → pokok, jasa pelunasan)
- [ ] Kebijakan pendapatan unit air dan penggajian
- [x] Perbaikan: daftar BUMDes awan memfilter akun sendiri (tanpa duplikat/peran anggota lain) (v1.1.101)
- [x] Tabel relasional Tahap 4: rekening dan mutasi tabungan + saldo tabungan dicocokkan; berkas SQL bernomor [n/7] (v1.1.101)
- [x] Konsol Developer: tombol Masuk ke BUMDes membuka layar login BUMDes tertuju; akun bukan anggota ditolak (v1.1.102)
- [x] Tabel relasional Tahap 5: penjualan, rincian, pembayaran, produk, Unit Air, jaminan, tarif, pajak, catatan penagihan, calon peminjam; berkas SQL bernomor [n/8] (v1.1.103)
- [x] Optimalisasi Setelan > Awan untuk desktop: dua kolom, kartu Sinkron selebar kolom, label tabel relasional dirapikan (v1.1.104)
- [x] Setelan > Awan: tampilan developer (konsol) berbeda dari admin (sinkron, tabel); fitur BUMDes disembunyikan untuk developer (v1.1.105)
- [x] Cek peran akun (developer/bukan/galat) di Setelan > Awan; galat deteksi developer tidak lagi diam (v1.1.106)
- [x] Routing sub-tab semua menu: Transaksi, Master, Data, Gaji, Simpan Pinjam, Unit Air, Laporan (v1.1.100)
- [x] Optimalisasi cetak laporan: halaman A4 dengan nomor halaman, kartu ringkasan dan pemilih tidak tercetak, tabel tetap tabel (bukan kartu ponsel), kepala tabel berulang, tema gelap tercetak hitam-putih, blok Bendahara/Direktur dan tanggal cetak (v1.1.099)
- [x] Alamat per halaman (/dashboard, /laporan, /setelan/awan, dst): Back/Forward, refresh, tautan langsung; rewrites Vercel (v1.1.098)
- [x] Perbaikan: memilih/membuat BUMDes awan kedua memisahkan data (kosong untuk BUMDes baru, muat dari awan untuk yang sudah ada, cadangan lokal, ditahan bila ada perubahan belum tersimpan) (v1.1.097)
- [x] Optimalisasi semua sub-tab Setelan untuk desktop: Modul dua kolom, Simpan Pinjam dua kolom kartu (v1.1.096)
- [x] Optimalisasi Setelan > Profil untuk desktop: isian dua kolom, Dokumen Cetak di samping (v1.1.095)
- [x] Optimalisasi Buku Besar: ringkasan, saldo awal/akhir, urutan, buka transaksi, cetak dan CSV (v1.1.094)
- [x] SQL Supabase dirapikan: kepala seragam, supabase_semua.sql, SUPABASE.md baru, uji SQL otomatis (v1.1.093)
- [x] Sidebar: tombol ciut mengambang, gaya lebih ringan (v1.1.092)
- [x] Laporan bergaya kartu: ringkasan dan pemilih laporan (v1.1.091)
- [x] Dashboard bergaya kartu analitik (v1.1.090)
- [x] Optimalisasi Dashboard: jatuh tempo 7 hari, tabungan, transaksi terakhir, peringatan ringkas, total (v1.1.089)
- [x] Optimalisasi halaman Master: pencarian/filter, hitungan, jabatan dilipat (v1.1.088)
- [x] Optimalisasi Setelan: urutan tab dan pengaturan Simpan Pinjam dikelompokkan di tab sendiri (v1.1.087)
- [x] Tabel relasional Tahap 3: pegawai dan gaji (`supabase_tahap3.sql`, v1.1.086); berikutnya tabungan, penjualan/Unit Air, jaminan, tarif, lalu peran dan pengguna tanpa PIN
- [x] Buat pengguna dari pegawai (peran dari jabatan, PIN awal 1234 wajib ganti) lewat aplikasi dan `supabase_pengguna.sql` (v1.1.085)
- [x] Pengguna dipilih dari daftar pegawai; peran bawaan per jabatan (v1.1.082)
- [x] Komponen gaji dengan cara hitung nominal / persen gaji pokok / persen laba (sebelum atau sesudah beban gaji), ceklist di form pegawai, dan gaji & komponen bawaan per jabatan (v1.1.082)
- [ ] COA final dan struktur laporan keuangan
- [ ] Hak akses tiap jabatan dan mekanisme approval (rencana teknis di Fase 8B; peran Simpan Pinjam diusulkan pengguna, lihat Fase SP3, menunggu konfirmasi pengurus)
- [ ] Daftar fee, pajak, dan pengakuan pendapatan fee Simpan Pinjam (lihat Gerbang Keputusan Fase SP)
- [ ] Kebijakan penutupan periode, koreksi transaksi, dan bukti/dokumen cetak
- [ ] Rate & Fee Engine dipakai ulang unit lain (harga, markup, fee, pajak, diskon, biaya layanan Unit Air, Perdagangan, dan proyek/kegiatan Fase PC): urutan adopsi setelah SP1
- [ ] Dasar hukum/kebijakan pengadaan dan posisi BUMDes pada kegiatan desa (lihat Gerbang Keputusan Fase PC); istilah "tender" tidak diasumsikan

## 7. Definition of Done (per fitur)
Model JSON · validasi (di fungsi logika, bukan hanya UI) · permission · UI (mobile dan desktop, aksesibel) · error handling · audit log (jika perlu) · jurnal benar · laporan benar · uji Node dan browser berhasil · dokumen pendamping (README, SUMMARY, ROADMAP, CHANGELOG, tests/README) diperbarui · tidak merusak modul lain · perilaku data lama terjaga (migrasi).

## 8. Risiko
Data hanya di satu browser (backup masih manual) · baru diuji di Chromium · aturan bisnis Simpan Pinjam masih asumsi teknis (Gerbang Keputusan terbuka) · uji dijalankan manual (belum CI) · tanggal uji dibekukan (lihat Backlog).

---
# Lampiran A — Fase F (Frontend & UI), rincian dari roadmap sebelumnya
Dipertahankan apa adanya untuk jejak ukur dan butir F4–F6. Status terbaru ada di tabel peta fase; penyebutan "fokus saat ini" di bawah ini sudah digantikan oleh fokus Simpan Pinjam.

## Fase F — Frontend & UI (F1–F3 selesai; F4–F6 ditunda, permintaan pengguna 2026-09-30)
Dikerjakan **lebih dulu dan sampai tuntas** (F1–F6) sebelum fase fitur apa pun (SP, PC, 8B Rilis 3), agar komponen, pola form, dan tampilan yang benar menjadi dasar semua modul baru; hanya perbaikan galat yang boleh menyela. Tiap rilis Fase F tidak mengubah aturan akuntansi maupun data. Susunan dari audit v0.1.029 (Playwright, 390px dan 1280px, 11 tab) dan pembacaan kode; angka di bawah menjadi **garis dasar** yang harus membaik. Aturan tiap rilis: tanpa perubahan aturan akuntansi, seluruh uji Node dan UI lama tetap lulus, uji baru untuk hal yang diperbaiki, dokumentasi ikut diperbarui.

**Temuan audit (garis dasar v0.1.029)**
- Label form tidak terhubung ke kolom (`<label>` tanpa `for`): 8 kolom di Transaksi baru, 11 di Simpan Pinjam, 16 di Setelan; pembaca layar tidak membaca nama kolom, ketukan pada label tidak memfokuskan kolom
- Tinggi kolom isian dan pilihan 38–40px (target sentuh yang dipakai tombol 44px); filter unit di header 38px dan tanpa nama aksesibel
- Tidak ada gaya `:focus-visible` (fokus keyboard hanya bawaan browser); tidak ada `prefers-reduced-motion`; tidak ada tautan lompat ke konten
- 93 `onclick` + 17 `oninput` + 34 `onchange` inline (menghalangi kebijakan keamanan konten yang ketat di Fase 10 dan menyulitkan pemeliharaan); satu berkas 204 KB, 1.132 baris
- Bilah sub-tab terpotong di mobile tanpa petunjuk bisa digeser (mis. "Daftar" di Transaksi terpotong); sub-tab aktif tidak otomatis digulir ke tengah
- Tanggal pada kolom isian tampil sesuai bahasa browser (mm/dd/yyyy pada peramban berbahasa Inggris), bukan dd/mm/yyyy
- Form Transaksi baru: *Akun lawan* bawaan `1100 Kas` sama dengan akun kas yang dipilih (bawaan membingungkan); seluruh isian bertumpuk panjang tanpa pengelompokan; tombol Posting ada di bawah dan hilang dari layar saat mengisi
- Dashboard hanya enam kartu angka dan dua tabel: tanpa tren, tanpa peringatan (tunggakan, periode terbuka, backup lama), tanpa jalan pintas; status Aktif/Nonaktif hanya teks
- Bukan PWA: tidak ada `manifest`, service worker, `theme-color`, ikon; tidak bisa dipasang dan tidak bisa dibuka luring dari layar utama
- Seluruh layar dirender ulang lewat `innerHTML` pada tiap aksi; posisi gulir dan fokus dijaga lewat mekanisme draf, belum diuji sistematis
- Tema gelap otomatis mengikuti sistem, belum ada tombol manual; hanya 2 aturan `@media print`

**F1 — v0.1.030: Fondasi komponen dan aksesibilitas (M) — SELESAI** (hasil ukur: kolom tanpa label terhubung 136 → 0; kolom < 44px di 390px 135 → 0; sisa form lama ditautkan otomatis, dipindah penuh ke `fld()` di F2)
- [~] Pembantu form tunggal `fld()` (label + kolom + petunjuk, `for`/`id`, `aria-describedby`, `aria-required`; galat memakai `aria-invalid` + `aria-describedby` lewat `render()`) ada dan dipakai form Pihak, Pegawai, dan Komponen tetap; seluruh `<label>` lain ditautkan otomatis oleh `a11y()` setelah tiap render (`for`/`id` atau `aria-labelledby`). Sisa: pindahkan form Transaksi, Jurnal, Simpan Pinjam, Unit Air, Gaji, Setelan, Pengguna ke `fld()` (F2)
- [x] Gaya fokus `:focus-visible` jelas di semua kontrol (terang dan gelap), tautan lompat *Lewati ke konten*, `aria-current` pada menu aktif, `prefers-reduced-motion`
- [x] Tinggi kolom isian, pilihan, dan tombol sekunder minimal 44px di mobile (di desktop kolom tetap 38–40px); nama aksesibel untuk filter unit, berkas logo/backup, dan angka meter per baris; tombol ikon sudah punya `aria-label`
- [x] Dialog konfirmasi (`askC`): jebakan fokus, Escape menutup, fokus kembali ke tombol pemicu, `role=dialog`/`aria-modal`
- [x] Setelah galat validasi, fokus pindah ke kolom bermasalah dan pesan diumumkan (`aria-live`)
- [x] Uji `ui-a11y.py` (Playwright): setiap kolom terlihat punya label terhubung, tinggi ≥ 44px (mobile), fokus terlihat, dialog menjebak fokus; dijalankan pada 11 tab dan semua sub-tab di 390px dan 1280px (`laporan` mencetak angka garis dasar)

**Perbaikan galat v0.1.031 (menyela Fase F): navbar bawah mobile hanya 2 tombol untuk peran Pengawas/Direktur/Admin — SELESAI** (diisi ulang dari tab yang diizinkan; `logic-26.js`)

**Perbaikan galat v0.1.035 (menyela Fase F, laporan pengguna): modal tertutup keyboard layar di ponsel — SELESAI di kode, menunggu konfirmasi perangkat fisik** (`vvFit()`/`visualViewport`, `interactive-widget`, fokus ke kontainer di perangkat sentuh; `logic-30.js`, `ui-kb.py`)

**F2 — v0.1.032–034: Form dan input yang lebih nyaman (M) — prioritas 2 — HAMPIR SELESAI (v0.1.032 = CRUD lewat modal; v0.1.033 = form Transaksi terpandu, angka, draf; v0.1.034 = tanggal dd/mm/yyyy, negatif di semua form rupiah)**
- [x] **CRUD lewat modal (permintaan pengguna, v0.1.032):** 12 form tambah/edit (Unit, Rekening, Akun, Pihak, Pegawai termasuk komponen tetap, Nasabah, Pelanggan, Produk, Sambungan, Komponen gaji, Pengguna, Reset PIN) pindah dari form inline ke dialog modal; tombol *Tambah* di atas tiap daftar; lembar bawah di mobile, dialog tengah di desktop; jebakan fokus, Escape/Batal/Tutup, fokus kembali ke pemicu, gulir latar dikunci, isian terjaga saat galat (PIN tidak pernah disalin), modal tertutup hanya saat berhasil; semua form modal memakai `fld()`; uji `logic-27.js` dan `ui-modal.py`
- [ ] Modal belum dipakai untuk form transaksional (Transaksi, Jurnal, pengajuan/bayar pinjaman, penjualan, baca meter, tarif, ganti meter, rincian gaji, Setelan, aktivasi mode pengguna); keputusan perluasan menunggu pengguna
- [~] Sisa F1: form CRUD kini memakai `fld()` (v0.1.032, lewat modal); sisa memindahkan form Transaksi, Jurnal, Simpan Pinjam (pengajuan, jaminan, bayar), Unit Air (penjualan, baca meter, tarif, ganti meter), Gaji (rincian), Setelan, dan aktivasi mode pengguna dari penautan otomatis `a11y()` ke `fld()` (id tetap); dengan itu `a11y()` dapat dipensiunkan
- [x] (v0.1.033) Transaksi baru: bagi menjadi kelompok (Jenis dan tanggal · Kas dan akun · Jumlah dan keterangan), *Akun lawan* tanpa bawaan yang sama dengan kas (pilih dulu), ringkasan jurnal yang akan terbentuk sebelum Posting (Dr/Kr)
- [x] Tombol aksi utama menempel di bawah layar pada form panjang di mobile (di atas navbar bawah); tidak menutupi kolom terakhir — modal (footer menempel, v0.1.032), Transaksi dan Jurnal Multi-baris (bilah `.actb`, v0.1.033). Sisa: form inline lain (pengajuan pinjaman, penjualan, baca meter) bila dijadikan panjang
- [x] (v0.1.034) Tanggal tampil dd/mm/yyyy pada seluruh tabel, kartu, ringkasan, dialog, dan toast (`tglS()`/`tglView()`; data, nilai kolom, backup, dan dokumen cetak tetap). Bantuan format pada kolom `type=date` tidak dipasang (mengikuti bahasa peramban; mengganti kontrol bawaan menghilangkan pemilih tanggal di mobile)
- [x] (v0.1.033–034) Bidang angka: `inputmode` numerik, pemisah ribuan konsisten, kursor terjaga, kosong ≠ nol, koreksi tempel (\"Rp 1.500.000\" → 1500000), tanda negatif ditolak di semua form rupiah (`negAny()` di 14 fungsi simpan)
- [x] (v0.1.033) Draf form: penanda "draf dipulihkan" + tombol Bersihkan; pemberitahuan non-blok saat pindah tab dan peringatan browser saat menutup/memuat ulang dengan isian belum disimpan (draf per tab sudah dipertahankan, jadi pindah tab tidak memblokir)
- [~] Uji: alur isi → validasi galat → fokus → posting (`ui-form.py`, v0.1.033: Transaksi dan Jurnal, tempel di pengajuan pinjaman; sisa alur penuh Simpan Pinjam dan Unit Air)

**F3 — v0.1.036: Dashboard dan navigasi (M) — prioritas 3 — SELESAI (dengan catatan di tiap butir)**
**Perbaikan galat v0.1.037 (menyela Fase F, dilaporkan pengguna): tombol kalender tidak bekerja karena gulir otomatis saat fokus menutup popup asli — SELESAI** (`kbF()`/`kbFocus()`; `logic-32.js`, `ui-cal.py`)
**Permintaan pengguna v0.1.038 (poles UI Fase F, selesai): sub-tab modern (tab bergaris bawah + lencana jumlah, navigasi panah/Home/End)** (`tabBar()`; `logic-33.js`, `ui-tabs.py`)
- [x] Dashboard: kartu peringatan (tunggakan pinjaman, piutang Unit Air lewat jatuh tempo, periode lampau belum ditutup, gaji disetujui belum dibayar) dengan tombol ke sub-tab tujuan; jalan pintas *Catat Penerimaan/Pengeluaran* (membuka form dengan jenis terisi) dan *Bayar Angsuran*; tren pendapatan–beban 6 bulan (SVG tanpa pustaka, `role=img` dengan angka di label, tabel *Lihat angka*). Peringatan dan jalan pintas mengikuti izin peran dan filter unit. Catatan: piutang jatuh tempo hanya untuk tagihan air (penjualan kredit lain belum punya jatuh tempo)
- [x] Pengingat backup: chip *Backup* dengan titik merah di header bila cadangan terakhir > 7 hari (ikon saja di layar ≤ 480px, tetap ≥ 44px, nama aksesibel memuat umur cadangan), klik langsung mengunduh; spanduk pengingat lama di atas konten tetap ada
- [x] Sub-tab: bayangan tepi kiri/kanan sesuai posisi gulir, sub-tab aktif digulir ke tengah (atau ke ujung bila tidak bisa), sub-tab terakhir diingat per tab dan bertahan setelah muat ulang (8 kunci, disimpan di `localStorage`, nilai divalidasi). Catatan: aplikasi kini terbuka di sub-tab terakhir, bukan selalu yang pertama
- [~] Keadaan kosong (ikon + kotak putus-putus) untuk semua `Belum ada…`/`Tidak ada…` lewat `emptyFx()` setelah render; tombol tindakan pertama baru untuk Pegawai dan Sambungan (yang sudah punya tombol *Tambah* di modal), sisanya ikon dan teks. Lencana status (Aktif, Nonaktif, Lunas, Dibayar, Disetujui, Diajukan, Draf, Sebagian, Menunggak, Ditolak, Dibatalkan) lewat `badgeFx()` pada sel tabel yang isinya persis kata status; teks tetap ada (tidak hanya warna). Sisa: lencana di teks bebas/kartu non-tabel, tombol tindakan untuk keadaan kosong lain
- [~] Desktop: lebar konten maks. 1320px (dari 1100px), Dashboard dua kolom (kas dan tren) mulai 1200px, FAB *+ Transaksi* berlabel di desktop (ikon saja di mobile). Sisa: dua kolom untuk Laporan, FAB sebagai aksi cepat
- [x] Uji: `logic-31.js` (38 pengecekan: peringatan, filter unit, izin, tren, SVG, jalan pintas, chip backup, sub-tab tersimpan) dan `ui-dash.py` (360/390/1280px: peringatan dan tujuan tombol, jalan pintas mengisi jenis, lencana navigasi, tren, FAB, dua kolom, sub-tab digulir ke tengah dan diingat, chip 44px, header 360px tanpa bertumpuk, tanpa meluap); seluruh uji Node (31 file) dan browser (13 berkas) lulus

**F4 — v0.1.037: PWA, luring, dan tema (M) — prioritas 4**
- [ ] `manifest` + ikon + `theme-color`, service worker untuk buka luring dan pembaruan versi terkontrol (butuh disajikan lewat HTTPS/`localhost`; tidak jalan dari `file://`, pengguna diberi panduan)
- [ ] Tombol tema Terang/Gelap/Ikuti sistem di Setelan (pengganti item P3), `theme-color` mengikuti
- [ ] Penanda versi dan tombol *Muat ulang untuk pembaruan*; peringatan bila data tersimpan di penyimpanan yang tidak persisten
- [ ] Uji: manifest valid, service worker terdaftar, halaman terbuka luring (Playwright `offline`), tema tersimpan

**F5 — v0.1.038: Tabel, laporan, dan cetak (M–L) — prioritas 5**
- [ ] Tabel: kepala tabel menempel saat digulir, urut per kolom (klik kepala), pencarian cepat pada daftar panjang, ringkasan jumlah baris, lebar kolom angka konsisten
- [ ] Cetak: aturan `@media print` per laporan dan dokumen (jeda halaman, kepala tabel diulang, sembunyikan navigasi), pratinjau cetak yang sesuai kertas A4 dan setengah A4 (kwitansi/slip)
- [ ] Render lebih efisien: perbarui hanya bagian yang berubah (daftar panjang, sub-tab), jaga gulir dan fokus; ukur waktu render dengan data besar (5.000 transaksi) dan tetapkan batas
- [ ] Uji: cetak ke PDF via Playwright untuk tiap laporan (tanpa meluap, tanpa terpotong), waktu render terukur

**F6 — v0.1.039: Arsitektur frontend (L) — prioritas 6**
- [ ] Ganti `onclick`/`oninput`/`onchange` inline dengan delegasi peristiwa (`data-act`), sehingga kebijakan keamanan konten ketat dapat dipasang (bekal Fase 10)
- [ ] Pecah sumber menjadi modul (`src/` per fitur + skrip pembangun menggabungkan menjadi satu `bumdes.html` yang tetap bisa dibuka langsung); token desain CSS (warna, jarak, radius, ukuran) dan hapus `!important`
- [ ] Uji regresi visual: tangkapan layar dasar per tab (390px dan 1280px, terang dan gelap) dibandingkan otomatis; jalankan `node tests/run.js` + uji UI dalam satu perintah
- [ ] Pilihan (bila diminta): pencarian global/palet perintah, sortir/kolom dapat dipilih pengguna, jalan pintas papan ketik

**Urutan kerja Fase F (aturan):** F1 → F2 → F3 → F4 → F5 → F6; satu rilis satu tema, rilis berikutnya baru dimulai setelah uji lulus. Tiap rilis: audit ulang dengan skrip yang sama (angka garis dasar dibandingkan), tangkapan layar sebelum/sesudah 390px dan 1280px (terang dan gelap), dan catatan di `CHANGELOG.md`.

**Daftar poles UI tambahan (masuk ke rilis Fase F yang terkait bila muat):**
- [~] Token desain (warna, jarak, radius, bayangan, ukuran huruf) — v0.1.030 baru menambah token `--on` (teks di atas aksen/merah); jarak, radius, bayangan, dan ukuran huruf belum dipakai konsisten sejak F1 sehingga tema, kepadatan, dan status warna berasal dari satu tempat (F1; penyelesaian arsitektur di F6)
- [x] Kontras diukur terhadap WCAG AA di tema terang dan gelap (F1, v0.1.030): tema gelap teks putih di atas tombol hijau hanya 2.22:1 dan di atas merah 2.72:1, kini token `--on` (8.37 dan 6.82); teks sekunder tema terang 4.51 → 5.31; diuji otomatis
- [x] Header mobile: filter unit dan chip backup tidak menutupi judul di 360px (diuji) (F3, v0.1.036)
- [~] Tab *Lainnya* (mobile) menampilkan titik bila ada peringatan di tab dalam sheet, dan menu (sidebar dan navbar) menampilkan lencana jumlah; Dashboard menampilkan jumlah peringatan (bukan jumlah tab) di judul *Perlu perhatian*. Lencana mengikuti filter unit yang aktif (F3, v0.1.036)
- [ ] Umpan balik aksi: tombol menampilkan keadaan sedang diproses/berhasil, toast dapat ditutup dan tidak menutupi tombol utama, konfirmasi aksi berisiko seragam (F2)
- [ ] Layar cetak/PDF: pratinjau sebelum cetak dengan tombol Kembali yang konsisten (F5)
- [ ] Bahasa antarmuka seragam (istilah akuntansi, singkatan, tanda baca angka dan tanggal) dan daftar istilah dalam bantuan singkat per tab (F2–F3)
- [ ] Pemeriksaan visual otomatis pada 5 lebar layar (360, 390, 768, 1024, 1280) untuk seluruh tab (F6)

**Definisi selesai Fase F:** tidak ada kolom tanpa label terhubung; tinggi target sentuh ≥ 44px; fokus keyboard terlihat; dapat dipasang dan dibuka luring; tanpa handler inline; uji visual dan aksesibilitas berjalan otomatis; tidak ada regresi pada uji lama.

# Lampiran B — Fase 4–9 (rincian dari roadmap sebelumnya)
Catatan v0.1.039: *Unit Air* dan *Gaji* sekarang modul opsional bawaan nonaktif (Setelan > Modul); item di bawah ini tetap berlaku bila modulnya dinyalakan.

## Fase 4 — P1 (sisa)
- [x] Cari/filter + muat lebih banyak (Transaksi, Buku Besar); sub-tab Simpan Pinjam; kartu mobile untuk Jadwal/Riwayat; input Rupiah berpemisah ribuan; validasi per kolom; area sentuh 44px
- [x] Label pendek pada tombol aksi utama di mobile (v0.1.025: tombol utama seperti Bayar, Cairkan, Setujui menampilkan ikon + label; tombol batal/tolak/sekunder tetap ikon saja; `ui-doc.py`)

P1 diselesaikan dulu agar modul baru (Unit Air) memakai pola UI yang benar.

## Fase 4B — Navigasi, Layout, Setelan, Optimalisasi (permintaan pengguna, v0.1.010)
Perintah pengguna: lanjut sesuai roadmap; optimalisasi; perbaiki UI, navigasi, dan layout tiap tab; tambah setelan nama dan detail BUMDes; semua dimasukkan ke roadmap.
- [x] Setelan BUMDes (tab baru *Setelan*): nama (wajib), alamat, desa, kecamatan, kabupaten/kota, provinsi, telepon, email, direktur, bendahara, no. Perdes/SK pendirian, tanggal pendirian; validasi per kolom; audit log; nama tampil di menu, header, judul tab browser; alamat dan kontak tampil di kop kwitansi dan bukti pencairan
- [x] Navigasi: menu desktop dikelompokkan (Ringkasan, Operasional, Akuntansi, Sistem) dan bisa digulir; navbar bawah mobile = Dashboard, Transaksi, Pinjaman, Unit Air, Lainnya; menu *Lainnya* dikelompokkan; header menempel di atas dengan nama BUMDes; filter unit disembunyikan di Master, Data, Setelan
- [x] Layout tiap tab: sub-tab seragam (bisa digeser di mobile) untuk Transaksi (Baru/Daftar), Simpan Pinjam, Unit Air, Master (Unit/Kas & Bank/Akun), Data (Backup/Periode/Audit); kartu dashboard rapi dan tidak terpotong; jarak konten di bawah header
- [x] Optimalisasi: cache saldo (`memo()` dibatalkan otomatis tiap simpan), peta akun, laba rugi per unit satu lintasan, kartu Dashboard memakai cache
- [x] Tabel lebar (Laba Rugi per Unit, Buku Besar, Transaksi, dll.) menjadi kartu di mobile; Neraca Saldo tetap tabel (v0.1.011)
- [x] Pengaturan denda dan jasa pelunasan pindah ke Setelan (v0.1.011)
- [~] Setelan lanjutan (v0.1.025): logo BUMDes (unggah, otomatis diperkecil ≤240px, disimpan di backup, tampil di kop kwitansi, bukti pencairan, nota tagihan air, slip gaji, dan semua laporan cetak) dan tanda tangan bernama Bendahara/Direktur di dokumen cetak (Direktur bisa disembunyikan). Tempat penandatanganan (v0.1.027: kolom di Setelan > Dokumen Cetak; dicetak bersama tanggal dokumen di atas tanda tangan pada kwitansi, bukti pencairan, slip gaji, dan nota penjualan; kosong = tidak dicetak). Belum: tahun buku, format nomor dokumen (M)
- [ ] Optimalisasi lanjutan: simpan tertunda/debounce, daftar sangat panjang (S–M) → dikerjakan di Fase F5
- [ ] Cek visual semua tab di perangkat fisik, Safari iOS, dan Firefox (M; digabung dengan Fase 9; tangkapan layar dasar otomatis di Fase F6)

## Fase 5 — Unit Air (Blueprint §16–17)
- [x] Air langganan PAMSIMAS (v0.1.022): sambungan & meter, tarif bertingkat, baca meter → tagihan bulanan berjurnal, nota, putus/sambung, ganti meter (`logic-19.js`). Belum: golongan tarif, denda keterlambatan, biaya pasang baru, meter rusak/taksiran (M)
- [x] Pelanggan (`parties`) dan produk/layanan (v0.1.009)
- [x] Penjualan tunai dan kredit → jurnal; piutang pelanggan dan pembayaran; pembatalan terkontrol
- [x] Skenario uji: pelanggan → penjualan → bayar → kas, piutang, jurnal, Neraca Saldo (`logic-6.js`, `ui-air.py`)
- [-] Pengiriman — ditunda sementara atas permintaan pengguna (2026-09-30); dikerjakan kembali bila diperlukan (S–M)
- [x] Edit dan nonaktifkan/aktifkan pelanggan dan produk (v0.1.011; pelanggan berpiutang tidak bisa dinonaktifkan; harga baru hanya untuk penjualan berikutnya)
- [x] Penjualan multi-barang dan harga per transaksi (v0.1.026: daftar barang di Unit Air > Penjualan Lain, harga satuan bisa diubah per transaksi tanpa mengubah harga produk, jurnal satu baris per akun pendapatan; semua barang dalam satu penjualan harus satu unit; laporan dan CSV Unit Air mengikuti; `logic-21.js`, `ui-air.py`)
- [x] Nota penjualan cetak (v0.1.027: tombol Nota di Unit Air > Penjualan Lain dan Piutang; kop, daftar barang dengan harga per transaksi, total + terbilang, cara bayar, sudah dibayar/sisa untuk kredit, kolom Pembeli/Bendahara; tidak tersedia untuk penjualan dibatalkan, saldo awal piutang, dan tagihan air yang punya nota sendiri; `logic-22.js`, `ui-air.py`). Belum: diskon, stok barang, nomor nota terpisah dari nomor penjualan (S)
- [x] Kartu Piutang Pelanggan di Dashboard (v0.1.010)

Syarat rilis (terpenuhi): Neraca Saldo seimbang di tiap tahap; koreksi lewat reversal; periode tertutup menolak transaksi.

## Fase 6 — Payroll (Blueprint §18–19)
Prasyarat: Party dan Pegawai sebagai master data (Fase 8; terpenuhi v0.1.014).
- [x] Pegawai dan komponen gaji: gaji pokok, tunjangan tetap, dan potongan tetap per pegawai (v0.1.015); master `payroll_components` (lembur, insentif, transport, kasbon, dll.), komponen tetap per pegawai, dan komponen sekali pakai pada gaji draf (v0.1.016). Belum: komponen berbasis jam/hari/persentase, NIK/rekening pegawai (S–M)
- [~] Payroll dengan alokasi beban ke unit: beban gaji ke unit pegawai, Umum bila tanpa unit (v0.1.015). Belum: satu pegawai dibagi ke beberapa unit (M)
- [~] Approval dan pembayaran gaji → jurnal (v0.1.015; Draf → Disetujui → Dibayar; Dr Beban Gaji, Cr Kas/Bank, Cr Kewajiban Lain untuk potongan; batal bayar dengan jurnal pembalik). Belum: approval berbasis peran (Fase 8), pembayaran massal, penyetoran potongan (M)
- [~] Uji logika dan UI (v0.1.015: `logic-12.js`; v0.1.016: `logic-13.js`; v0.1.017: `logic-14.js`; v0.1.018: `logic-15.js`; v0.1.019: `logic-16.js`; `ui-nav.py`); menyusul bersama fitur sisa (M)
- [x] Slip gaji cetak (v0.1.016; kop, rincian, terbilang, tanda tangan Penerima/Bendahara). Tanda tangan Direktur dan logo sudah ada sejak v0.1.025
- [x] Laporan SDM/gaji: rekap per periode/unit/pegawai/komponen, dibayar vs belum dibayar, filter periode dan unit, cetak, CSV (v0.1.017). Belum: rekap tahunan, PDF/XLSX (S)

## Fase 7 — Laporan (Blueprint §23)
Laporan membaca dari accounting engine. Sudah ada: Dashboard dasar, Buku Besar, Neraca Saldo, Laba Rugi per unit, daftar tunggakan + aging, Laporan Gaji, Neraca, Laba Rugi, Arus Kas, Piutang, Simpan Pinjam, Unit Air.
- [x] Neraca (per tanggal, laba berjalan yang belum ditutup), Laba Rugi lengkap (per akun dan per unit, rentang tanggal, jurnal penutup tidak dihitung), Arus Kas metode langsung (operasi/investasi/pendanaan, dicocokkan ke saldo Kas & Bank); menu Laporan, filter unit, cetak, CSV (v0.1.018; `logic-15.js`). Belum: perbandingan periode/tahun, catatan atas laporan, PDF/XLSX, klasifikasi arus kas menunggu kebijakan (Gerbang Keputusan: COA final dan struktur laporan)
- [x] Laporan piutang lintas unit (pinjaman + pelanggan per unit, aging, piutang terbesar, kecocokan dengan buku besar 1300/1400) dan laporan Simpan Pinjam (posisi, pencairan, rekap pembayaran, pendapatan jasa dan denda dicocokkan ke jurnal, pinjaman aktif dengan status menunggak, jatuh tempo 30 hari) (v0.1.019; `logic-16.js`). Belum: posisi piutang per tanggal lampau (rincian modul hanya posisi saat ini), kolektibilitas/kredit bermasalah menunggu Gerbang Keputusan
- [x] Laporan Unit Air (v0.1.020): menu Laporan > Unit Air dengan rentang tanggal dan filter unit; ringkasan penjualan (tunai/kredit), pembayaran piutang diterima, piutang pelanggan saat ini; rekap per produk, per pelanggan (total, dibayar, sisa), dan per bulan; dicocokkan ke jurnal (pendapatan penjualan dan akun 1400); cetak dan CSV daftar penjualan (`logic-17.js`). Belum: volume/pengiriman (Pengiriman ditunda), piutang per tanggal lampau, PDF/XLSX
- [x] Laporan SDM/gaji (Laporan Gaji, v0.1.017)
- [~] Cetak/ekspor dan print stylesheet laporan (Laporan Gaji, laporan keuangan, Piutang, Simpan Pinjam, dan Unit Air sudah cetak + CSV; sisa PDF/XLSX) (M)

## Fase 8 — Tata Kelola
- [x] Edit dan nonaktifkan master data: unit, akun, rekening (v0.1.012; akun sistem/induk/bersaldo dilindungi; kode akun dan akun COA rekening tidak dapat diubah)
- [x] Party dan Pegawai sebagai master data (v0.1.014; sub-tab Master > Pihak dan Pegawai; pihak: nasabah/pelanggan/pemasok/lainnya, jenis terkunci setelah dipakai pinjaman/penjualan, nonaktif dilindungi seperti di modul; pegawai: nomor PEG-NNN otomatis, jabatan, unit, tanggal mulai/berhenti; unit dengan pegawai aktif tidak bisa dinonaktifkan; cek duplikat). Belum: komponen gaji dan tautan pegawai ke pihak (Fase 6), NIK/rekening pegawai (S)
- [x] Jurnal manual multi-baris dan saldo awal / jurnal pembuka (v0.1.012, sub-tab Transaksi > Jurnal Multi-baris)
- [x] Saldo awal terpandu per modul (v1.1.025 dioptimalkan: ringkasan, checklist, pratinjau langsung, form lipat, validasi) (v0.1.021): Transaksi > Saldo Awal untuk piutang pelanggan awal (penjualan `SA-…`, dibayar lewat Unit Air > Piutang) dan pinjaman berjalan awal (sisa pokok, jasa, sisa tenor, jatuh tempo berikutnya; jadwal angsuran dibayar lewat Simpan Pinjam); jurnal Dr 1300/1400 Cr ekuitas lawan; batal terkontrol; laporan Piutang cocok dengan buku besar. Belum: tunggakan/denda awal, angsuran terbayar sebagian, edit saldo awal, rekap per pelanggan di laporan Unit Air (S–M)
- [ ] Approval `draft → submitted → approved → posted` (dirinci di Fase 8B; persetujuan pinjaman digabung dengan Fase SP2) (Blueprint §21: pencairan, payroll, pengeluaran besar, jurnal manual, tutup periode) (L)
- [x] Penutupan tahun buku dengan jurnal penutup (v0.1.013; per unit ke 3300 Laba Ditahan, 12 periode terkunci, bisa dibatalkan untuk tahun terakhir; Laba/Rugi Dashboard = tahun berjalan). Belum: penutupan per bulan/semester, penyesuaian penyusutan otomatis
- [x] Audit log diperluas dan bisa difilter (v0.1.013; filter aksi/entitas/tanggal/kata kunci, keterangan pada posting/void/periode/tutup buku). Belum: keterangan sebelum-sesudah untuk edit master, ekspor audit log (S–M)

## Fase 8B — RBAC: Pengguna, Peran, dan Persetujuan
Status: Rilis 1 dan 2 selesai (v0.1.028–029); Rilis 3 belum. Catatan penting: selama data di `localStorage`, RBAC hanya **kontrol prosedur** (pemisahan tugas dan jejak "oleh siapa"), bukan keamanan sungguhan; pengguna teknis tetap bisa melewatinya lewat DevTools atau mengedit file backup. Penegakan sebenarnya menunggu backend dan autentikasi (Fase 10). Model data dibuat siap dipindah ke backend. Mode RBAC **opsional (bawaan mati)**: bila mati, aplikasi berjalan seperti sekarang dan seluruh uji lama tetap berlaku.

**Rilis 1 — v0.1.028: pengguna dan peran (M–L) — SELESAI**
- [x] Koleksi `users` (nama, peran, unit tugas, status, hash PIN) dan `roles` + matriks izin (13 izin); migrasi data lama tanpa merusak (mode mati bawaan; `settings.rbac` baru menyala saat Admin pertama dibuat)
- [x] Peran awal (asumsi, dapat diubah): Direktur, Bendahara, Petugas Unit (kasir, petugas air, petugas simpan pinjam), Pengawas (hanya lihat), Admin Sistem. Satu pengguna satu peran; matriks belum bisa diubah lewat UI (v0.1.029)
- [x] Login PIN 4–8 angka dengan hash SHA-256 bergaram (2000 putaran), kunci 5 menit setelah 5 kali salah, ganti PIN sendiri, PIN sementara wajib diganti, Admin mereset PIN pengguna lain, pulihkan dari backup lewat layar masuk bila Admin terkunci; Admin terakhir dilindungi
- [x] Sesi pengguna aktif ditampilkan di header; keluar/ganti pengguna; sesi berakhir saat tab/browser ditutup (`sessionStorage`); layar kunci menyembunyikan konten. Belum: batas waktu tidak aktif
- [x] Audit log mencatat **oleh siapa** untuk semua aksi (kolom *Oleh*, data lama tampil "-"); filter audit per pengguna; peristiwa login/logout/kunci/PIN/pengguna dicatat
- [x] Uji logika dan UI (`logic-23.js`, `ui-rbac.py`: pengguna, login, kunci, pemulihan, migrasi mode mati)

**Rilis 2 — v0.1.029: penjagaan izin (M–L) — SELESAI**
- [x] Izin per aksi dicek di **fungsi logika** (62 fungsi aksi dibungkus penjaga; `post()` dan `rev()` memeriksa unit tugas); pesan penolakan jelas + audit `akses_ditolak`
- [x] Menu dan tab menyesuaikan peran (Pengawas: Laporan, Buku Besar/Neraca, Audit; Petugas Unit: modul unitnya); tab terlarang dialihkan
- [x] Pembatasan per unit usaha untuk pengguna dengan Unit tugas (filter unit, pencatatan, pembatalan)
- [x] Matriks peran × izin dapat diubah Admin dengan audit log; pelindung Admin terakhir
- [x] Uji: `logic-24.js`, `ui-izin.py`; `ui-rbac.py` disesuaikan
- [ ] Sisa kecil: sembunyikan tombol yang tidak diizinkan (bukan hanya ditolak saat diklik), saring sub-tab Data per izin, batasi laporan per unit, tombol kembalikan matriks ke bawaan, batas waktu tidak aktif (S–M)

**Rilis 3 — alur persetujuan (L; DITAHAN sampai SP2 (persetujuan Simpan Pinjam); satu implementasi bersama persetujuan berjenjang Fase SP2)**
- [ ] Status `draft → diajukan → disetujui / ditolak → diposting` untuk transaksi yang wajib disetujui; jurnal baru terbentuk saat diposting
- [ ] Wajib disetujui Direktur (bawaan, dapat diatur): pencairan pinjaman, gaji (menggantikan persetujuan gaji yang sekarang), tutup periode dan tutup buku tahunan, jurnal manual di atas ambang, Import dan Reset
- [ ] Pemisahan tugas (maker-checker): pembuat tidak boleh menyetujui transaksinya sendiri; ambang nominal persetujuan bisa diatur di Setelan
- [ ] Antrean persetujuan (daftar menunggu, alasan penolakan, riwayat) dan penanda di Dashboard
- [ ] Uji: alur lengkap, pembuat tidak bisa menyetujui sendiri, penolakan tidak menghasilkan jurnal, pembatalan terkontrol

**Syarat sebelum mulai (Gerbang Keputusan):**
- [~] Susunan pengurus BUMDes: peran apa yang ada dan siapa memegangnya (pengguna mengusulkan tujuh peran Simpan Pinjam: Admin, Surveyor/Analis, Petugas Kredit, Approver/Manajer, Kasir, Pengawas, Direktur; lima peran awal akan diselaraskan di Fase SP3; menunggu konfirmasi pengurus)
- [ ] Ambang nominal persetujuan dan daftar aksi yang wajib disetujui
- [ ] Kebijakan PIN dan pemulihan akun bila Admin lupa PIN
- [ ] Apakah satu orang boleh merangkap peran (mis. Bendahara sekaligus Petugas Unit)

## Fase 9 — Kualitas & Nilai Tambah
- **P2:** cache saldo/laporan (`bal()`): dasar `memo()` selesai v0.1.010, sisa cache laporan lain (S) · simpan tertunda/debounce (S) · empty state & label data demo (S) · aksesibilitas: `aria-live`, fokus, kontras, urutan tab (M) → Fase F1 · tanggal dd/mm/yyyy pada tampilan (S) → Fase F2
- **P3:** tema terang/gelap manual (S) → Fase F4 · nasabah dapat dicari (S) · onboarding (M) · print stylesheet laporan (M) → Fase F5
- **Pengujian:** cek visual kartu mobile & pesan per kolom di perangkat fisik/Safari iOS/Firefox (M) · CI untuk `node tests/run.js` dan uji UI (M)

---
## Tabungan nasabah dan portal nasabah (usulan 2026-10-01)
- [x] **TAB1 (v1.1.014)** Tabungan nasabah: rekening, setoran, penarikan, bunga manual, buku tabungan, jurnal ke akun 2300 (utang BUMDes ke nasabah). Tabungan di sini = titipan uang nasabah, bukan simpanan anggota koperasi.
- [x] **TAB2 (v1.1.017)** Bunga otomatis bulanan dari saldo harian, biaya administrasi (Tarif & Pajak), pajak bunga.
- [~] **TAB3** (v1.1.023: bunga bertingkat menurut saldo dan cetak buku tabungan selesai; v1.1.029: pajak atas biaya tabungan selesai; v1.1.037: produk berjangka/deposito dan bunga per produk selesai) Produk berjangka (deposito), bunga bertingkat per produk/saldo, pajak atas biaya, cetak buku tabungan. (M)
- [x] **NSB1 (v1.1.015)** Ringkasan nasabah yang bisa dibagikan (teks: salin/WhatsApp/bagikan; PDF/gambar belum): pinjaman (sisa, jadwal, tunggakan) dan tabungan (saldo, mutasi). Data = posisi saat dikirim. (S)
- [~] **NSB2** (v1.1.038: UI portal nasabah mode demo selesai: masuk HP+PIN, pinjaman, tabungan, profil, pratinjau pengurus; tanpa server) Portal nasabah sungguhan: butuh backend, login nasabah (HP + PIN/OTP), sinkronisasi dari aplikasi pengurus, persetujuan dan perlindungan data pribadi. Keputusan arsitektur dan regulasi (penghimpunan dana masyarakat, OJK/LPS) harus dipastikan lebih dulu. (L)
- [~] **DB1** (v1.1.042: Tahap 1 selesai: `cloud.js`, `supabase_schema.sql`, panduan `SUPABASE.md`, snapshot + kunci versi + RLS; Tahap 2 draf SQL `supabase_tahap2.sql` teruji, belum disambung) Berikutnya: aplikasi memakai tabel Tahap 2 (jurnal seimbang di server), lalu NSB2 portal nasabah sungguhan (Auth/RLS per nasabah, OTP). Butuh proyek Supabase dari pengurus. (L)
- [x] **DB2. Akun awan seperti jurnal-trading/finaaps** (v1.1.071): lupa kata sandi (email atur ulang + layar kata sandi baru dari tautan), ganti kata sandi saat masuk, status sinkron yang jelas dan pengingat cadangan awan. Pendaftaran akun baru sengaja tidak dibuka dari aplikasi (pengurus ditambahkan admin lewat `add_member`).
- [x] **DB3. Sinkron otomatis dua arah antar perangkat** (v1.1.071): muat otomatis saat aplikasi dibuka/kembali aktif bila awan lebih baru dan tidak ada perubahan lokal belum terkirim; kirim ulang otomatis saat kembali online; konflik tetap dijeda dengan pilihan Timpa/Muat.
- [x] **DB4. Tahap 2: tabel relasional** (v1.1.072): aplikasi memakai `supabase_tahap2.sql` (unit, pihak, akun, transaksi, jurnal seimbang dicek di server, pinjaman, audit) dengan migrasi dari snapshot; snapshot tetap sebagai cadangan.
- [x] **DB5. Portal nasabah via Supabase** (v1.1.079): `supabase_nasabah.sql` (akun dan sesi nasabah tertutup rapat, PIN bcrypt, kunci bertahap, data proyeksi per nasabah), masuk HP + PIN dari halaman masuk gabungan, salinan offline, ganti PIN sendiri, penerbitan data oleh pengurus saat sinkron. Belum: OTP SMS/WhatsApp, persetujuan data pribadi (UU PDP) di layar pertama, cetakan kartu pinjaman di portal (O7). Keputusan regulasi (penghimpunan dana, OJK/LPS) tetap harus dipastikan pengurus.
- [x] **DB7. Masuk gabungan dan sesi tersimpan** (v1.1.079): satu halaman masuk (email atau nomor HP), arah per peran (developer, admin/pengurus, pembaca hanya lihat, nasabah), sesi bertahan offline, perangkat lama berisi data punya jalan masuk lokal satu kali.
- [x] **DB6. Peran developer platform** (v1.1.077): `supabase_developer.sql` + bagian Developer di Setelan > Awan: daftar semua BUMDes (metadata saja), buat BUMDes + admin pertama, tambah admin, nonaktif/aktif, hapus yang kosong, batasi pembuatan mandiri, catatan tindakan. Developer tidak membaca isi data kecuali menjadi anggota.
- [x] **SU1** (v1.1.016) Pemisahan tugas berlaku juga untuk Superadmin bila aturan SoD diaktifkan. (S)
