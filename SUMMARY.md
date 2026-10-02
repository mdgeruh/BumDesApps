# SUMMARY — Sistem BUMDes Multi-Unit Usaha

Ringkasan blueprint v2.0 dan status implementasi (v1.1.044). Todolist rinci dan keputusan kebijakan ada di `ROADMAP.md`. **Fokus saat ini (2026-10-01): unit Simpan Pinjam, yaitu logika, metode hitung, dan UI (Fase SP: SP0 integritas → SP-M mesin hitung → SP-U UI → SP1–SP5).** Unit Air dan Gaji kini modul opsional **bawaan nonaktif** (*Setelan > Modul*). Fase Frontend sisa (F4–F6), Fase PC, dan RBAC Rilis 3 menunggu.

## 1. Tujuan dan Prinsip

Satu sistem untuk banyak unit usaha BUMDes; semua transaksi keuangan bermuara ke satu sistem akuntansi; laporan bisa keseluruhan atau per unit.

1. Satu BUMDes, banyak unit; unit baru ditambah tanpa mengubah fondasi database
2. Tiap unit dapat punya modul operasional berbeda
3. Transaksi operasional menghasilkan jurnal otomatis
4. Payroll modul tersendiri, dapat dialokasikan ke unit
5. Transaksi posted tidak dihapus sembarangan; perubahan penting masuk audit log
6. Workflow approval untuk transaksi tertentu

## 2. Strategi

- **Tahap 1 (sekarang):** satu file `bumdes.html`, JSON di `localStorage`, backup/restore sejak MVP
- **Lanjutan:** pisah frontend → API → MongoDB → autentikasi → multi-user → deployment
- Struktur JSON mengikuti collection database target agar migrasi tidak menulis ulang business logic

`UI → Application State → Business Logic → Accounting Engine → JSON State → localStorage`

## 3. Modul

| Kelompok | Isi |
|----------|-----|
| Core | BUMDes, User, Role, Permission, Unit Usaha, Party, Pegawai, Settings |
| Simpan Pinjam | Nasabah, Pinjaman, Angsuran, Pembayaran, Jaminan, Tunggakan |
| Unit Air | Pelanggan, Produk/Layanan, Penjualan, Pengiriman, Pembayaran, Piutang |
| Penggajian | Pegawai, Komponen Gaji, Payroll, Pembayaran Gaji |
| Keuangan | Kas, Bank, Penerimaan, Pengeluaran, Transfer |
| Akuntansi | Jurnal Umum, Buku Besar, Periode, Penutupan Periode |
| Laporan | Neraca, Laba Rugi, Arus Kas, Buku Besar, Jurnal, Piutang, per Unit |
| Audit | Approval, Audit Log |

## 4. Chart of Accounts Awal

```text
1000 ASET: 1100 Kas · 1200 Bank · 1300 Piutang Pinjaman · 1400 Piutang Pelanggan · 1500 Persediaan · 1600 Aset Tetap
2000 KEWAJIBAN: 2100 Utang · 2200 Kewajiban Lain
3000 EKUITAS: 3100 Modal BUMDes · 3200 Penyertaan Modal Desa
4000 PENDAPATAN: 4100 Jasa Pinjaman · 4200 Air · 4300 Penjualan · 4400 Lainnya
5000 BEBAN: 5100 Gaji · 5200 Listrik · 5300 BBM · 5400 Operasional · 5500 Penyusutan
```

## 5. Aturan Sistem

- Debit = Kredit; transaksi tidak boleh `posted` jika jurnal tidak balance
- Status: `draft → submitted → approved / rejected → posted → cancelled / voided`
- Posted tidak dihapus; gunakan void, reversal, atau adjustment
- Satu transaksi boleh punya banyak journal line; unit usaha adalah dimensi, jangan hard-code
- Laporan membaca dari accounting engine, bukan menghitung ulang dari modul
- Pencairan, angsuran, penjualan kredit, dan payroll menghasilkan jurnal

## 6. Status Implementasi

| Area | Status | Catatan |
|------|--------|---------|
| App Shell | [x] | Form Transaksi terpandu (v0.1.033: tiga kelompok, akun lawan wajib dipilih, ringkasan jurnal Dr/Kr, bilah Posting menempel, angka dengan kursor terjaga/tempel/negatif, penanda draf); tambah/edit master data lewat modal (v0.1.032: 12 form CRUD; tombol *Tambah* di atas daftar, lembar bawah di mobile, dialog tengah di desktop, jebakan fokus, Escape, fokus kembali ke pemicu, isian terjaga saat galat); navbar bawah (mobile; empat tombol diisi dari tab yang diizinkan per peran, v0.1.031), sidebar berkelompok (desktop), header menempel, sub-tab seragam, ikon; aksesibilitas F1 (v0.1.030): tautan lompat, fokus terlihat, `aria-current`, label terhubung, target 44px di mobile, dialog menjebak fokus, kontras AA, `prefers-reduced-motion` |
| Setelan BUMDes | [x] | Nama dan detail BUMDes; tampil di menu, judul, dan dokumen cetak (v0.1.010); logo dan tanda tangan Bendahara/Direktur di dokumen cetak (v0.1.025); tempat penandatanganan + tanggal di atas tanda tangan (v0.1.027) |
| JSON DB + localStorage | [x] | |
| Master Data | [x] | Tambah, edit, nonaktif: unit, rekening, akun (v0.1.012); Pihak (party) dan Pegawai (v0.1.014). Komponen gaji menyusul di Payroll |
| Jurnal manual & saldo awal | [x] | Jurnal multi-baris dan saldo awal (v0.1.012); saldo awal terpandu piutang pelanggan dan pinjaman berjalan terhubung ke modul (v0.1.024) |
| Audit Log | [x] | Daftar lengkap dengan filter aksi/entitas/tanggal/kata kunci dan keterangan (v0.1.013) |
| Accounting Engine | [x] | Transaksi, jurnal, void, periode, tutup buku tahunan dengan jurnal penutup (v0.1.013; akun 3300 Laba Ditahan) |
| Kas & Bank | [x] | |
| Simpan Pinjam | [~] | **Fokus saat ini. SP0 (integritas logika) selesai v0.1.040:** transisi status satu tabel, urutan tanggal, batas masukan dapat diatur, duplikat/eksposur, jenis unit, ubah/batal/tolak beralasan, impor diperiksa; SP-M (mesin hitung, anuitas, simulasi, snapshot) selesai v0.1.041; berikutnya SP-U (UI Simpan Pinjam). Alur inti sudah ada: pengajuan, persetujuan, pencairan, jadwal flat/menurun, denda, sebagian, pelunasan, koreksi, jaminan, cetak, aging. Audit v0.1.038 menemukan celah: transisi status dan urutan tanggal tidak dijaga di fungsi, batas masukan dan plafon tidak ada, pengajuan tidak bisa diedit, UI satu halaman panjang tanpa rincian pinjaman dan simulasi. Dikerjakan di SP0 (integritas), SP-M (mesin hitung), SP-U (UI), lalu SP1–SP5 |
| Modul opsional | [x] | Unit Air dan Gaji bawaan nonaktif; saklar di *Setelan > Modul* (v0.1.039); data tidak dihapus saat dinonaktifkan |
| Backup / Restore | [x] | Dengan konfirmasi Import/Reset |
| UX P0 & P1 | [x]/[~] | P0 selesai (v0.1.006); P1 selesai (v0.1.008); label pendek tombol aksi utama di mobile (v0.1.025) |
| Unit Air | [~] | Air langganan PAMSIMAS: sambungan/meter, tarif per m³ + beban tetap, baca meter → tagihan bulanan, nota (v0.1.024); Penjualan tunai/kredit, piutang, pelanggan, produk (v0.1.009); Edit/nonaktif pelanggan & produk (v0.1.011); laporan Unit Air (v0.1.020); penjualan multi-barang dengan harga per transaksi (v0.1.026); nota penjualan cetak untuk penjualan biasa (v0.1.027); Pengiriman ditunda sementara |
| Payroll | [~] | Profil gaji pegawai, penggajian per periode, persetujuan, pembayaran → jurnal (v0.1.015); komponen gaji fleksibel, rincian gaji draf, slip cetak (v0.1.016); laporan gaji/SDM per periode/unit/pegawai/komponen dengan cetak dan CSV (v0.1.017). Belum: alokasi multi-unit, approval berbasis peran |
| Reports | [~] | Ada: Dashboard, Buku Besar, Neraca Saldo, Laba Rugi per unit, Laporan Gaji (v0.1.017); menu **Laporan** dengan Neraca, Laba Rugi, Arus Kas (v0.1.018), Piutang lintas unit dan Simpan Pinjam (v0.1.019), Unit Air (v0.1.020), semua bisa dicetak dan diunduh CSV. Belum: PDF/XLSX, perbandingan periode, catatan atas laporan |
| Testing | [~] | Node (`logic-1..37`, tanggal dibekukan di harness) + Playwright (`ui-tabs`, `ui-cal`, `ui`, `ui-p0`, `ui-air`, `ui-nav`, `ui-doc`, `ui-rbac`, `ui-izin`, `ui-a11y`, `ui-modal`, `ui-form`, `ui-tgl`, `ui-kb`, `ui-modul`, `ui-sp0`), manual, belum CI |
| RBAC (pengguna, peran, izin, persetujuan) | [~] | Rilis 1–2 selesai (v0.1.028–029): pengguna, peran, login PIN berhash, kunci akun, reset PIN, pemulihan, sesi, audit *Oleh*; izin ditegakkan di fungsi aksi, menu per peran, pembatasan unit, matriks izin dapat diubah Admin; opsional bawaan mati dan hanya kontrol prosedur. Belum: alur persetujuan (v0.1.030); rincian di `ROADMAP.md` Fase 8B |
| Backend (API, MongoDB, auth, multi-user, deployment) | [ ] | Milestone 7 |

## 7. Catatan

Blueprint ini panduan teknis awal, bukan penetapan kebijakan akuntansi atau hukum BUMDes. Aturan final mengikuti ketentuan yang berlaku dan kebijakan BUMDes.

**PWA (v1.1.001):** aplikasi dapat dipasang dari browser dan dibuka offline bila di-host lewat https/localhost (manifest, ikon, service worker); lihat `README.md` dan `release_notes.md`.
