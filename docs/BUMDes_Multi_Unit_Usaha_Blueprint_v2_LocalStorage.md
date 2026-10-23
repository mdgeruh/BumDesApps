# Blueprint Sistem BUMDes Multi-Unit Usaha

**Status:** Revised Blueprint — MVP Single HTML + JSON localStorage
**Versi:** 2.0
**Tanggal:** 2026-09-30

------------------------------------------------------------------------

## 1. Tujuan Sistem

Sistem ini dirancang sebagai aplikasi manajemen BUMDes yang dapat
menangani banyak unit usaha dalam satu sistem.

Contoh unit usaha:

-   Unit Simpan Pinjam
-   Unit Sumber Air
-   Unit Perdagangan
-   Unit Pertanian
-   Unit Pariwisata
-   Unit usaha lain yang ditambahkan di kemudian hari

Sistem tidak dirancang sebagai aplikasi koperasi. Unit Simpan Pinjam
hanya merupakan salah satu modul usaha BUMDes.

### Prinsip utama

1.  Satu BUMDes dapat memiliki banyak unit usaha.
2.  Unit usaha dapat ditambah tanpa mengubah fondasi database.
3.  Setiap unit dapat memiliki modul operasional yang berbeda.
4.  Semua transaksi keuangan bermuara pada satu sistem akuntansi.
5.  Transaksi operasional menghasilkan jurnal secara otomatis.
6.  Laporan dapat dilihat secara keseluruhan maupun per unit usaha.
7.  Penggajian menjadi modul tersendiri dan dapat dialokasikan ke unit
    usaha.
8.  Data transaksi yang sudah diposting tidak boleh dihapus sembarangan.
9.  Perubahan penting harus tercatat dalam audit log.
10. Sistem harus memiliki workflow approval untuk transaksi tertentu.

------------------------------------------------------------------------

# 3. Strategi Implementasi Awal — Single HTML + JSON localStorage

Blueprint ini tetap menggunakan arsitektur modular sebagai **target akhir**, tetapi
implementasi pertama sengaja dibuat sederhana agar aplikasi dapat langsung diuji
tanpa backend dan database server.

## 2.1 Bentuk aplikasi tahap awal

Cukup satu file:

```text
bumdes.html
```

Di dalam file:

```text
HTML
CSS
JavaScript
JSON data model
localStorage
```

Tidak diperlukan pada tahap ini:

```text
Node.js
Express
MongoDB
REST API
JWT
Server hosting
```

Semua data disimpan di browser menggunakan:

```javascript
localStorage
```

## 2.2 Prinsip penting

localStorage hanya merupakan **storage sementara/MVP**, bukan desain database
production.

Struktur JSON harus dibuat semirip mungkin dengan struktur collection/database
yang sudah dirancang sehingga migrasi ke backend nanti tidak perlu mengubah
business logic secara besar-besaran.

Alur:

```text
UI
 ↓
Application State
 ↓
Business Logic
 ↓
Accounting Engine
 ↓
JSON State
 ↓
localStorage
```

## 2.3 Root JSON

Gunakan satu root object:

```json
{
  "meta": {},
  "settings": {},
  "bumdes": [],
  "business_units": [],
  "users": [],
  "roles": [],
  "permissions": [],
  "parties": [],
  "employees": [],
  "accounts": [],
  "cash_accounts": [],
  "transactions": [],
  "journal_entries": [],
  "journal_lines": [],
  "general_ledger": [],
  "accounting_periods": [],
  "loans": [],
  "loan_installments": [],
  "loan_payments": [],
  "collaterals": [],
  "products": [],
  "sales": [],
  "sale_items": [],
  "payments": [],
  "payroll_components": [],
  "payrolls": [],
  "payroll_items": [],
  "salary_payments": [],
  "approvals": [],
  "audit_logs": []
}
```

Nama array sengaja mengikuti collection pada desain database target.

## 2.4 Helper penyimpanan

```javascript
const DB_KEY = "bumdes_db_v1";

function loadDB() {
  const raw = localStorage.getItem(DB_KEY);
  return raw ? JSON.parse(raw) : createDefaultDB();
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}
```

Setiap perubahan data harus melalui fungsi penyimpanan terpusat, bukan
menulis localStorage secara acak dari setiap halaman.

## 2.5 ID

Jangan menggunakan array index sebagai ID.

Contoh:

```text
BUMDES-001
UNIT-001
PTY-001
EMP-001
ACC-1100
TRX-001
JE-001
JL-001
LOAN-001
PAY-001
```

Untuk MVP:

```javascript
function generateId(prefix) {
  return prefix + "-" + Date.now() + "-" +
    Math.random().toString(36).slice(2, 7);
}
```

## 2.6 Status transaksi

Gunakan lifecycle yang sama sejak awal:

```text
draft
submitted
approved
rejected
posted
cancelled
voided
```

Untuk MVP tanpa login multi-user, `created_by` dan `approved_by` dapat
menggunakan user demo/default.

## 2.7 Aturan accounting tetap berlaku

Walaupun data masih localStorage:

```text
Total Debit = Total Credit
```

Transaksi tidak boleh menjadi `posted` jika jurnal tidak balance.

Transaksi `posted` tidak dihapus langsung.

Gunakan:

```text
void
reversal
adjustment
```

## 2.8 Backup dan restore wajib ada sejak MVP

Karena localStorage berada di browser, aplikasi harus menyediakan:

```text
Export JSON
Import JSON
Reset Demo Data
Backup/Restore
```

File backup contoh:

```text
bumdes-backup-2026-09-30.json
```

Import harus melakukan validasi struktur sebelum mengganti data aktif.

## 2.9 Batasan localStorage

Tahap ini cocok untuk:

- prototype
- belajar alur aplikasi
- simulasi transaksi
- validasi accounting engine
- pengujian UI
- demo internal
- penggunaan satu browser/perangkat

Belum cocok untuk:

- banyak user bersamaan
- akses dari banyak perangkat
- keamanan production
- data sangat besar
- audit server-side
- backup otomatis server
- transaksi real-time multi-user

------------------------------------------------------------------------

# 3. Arsitektur Sistem

``` text
                         BUMDES
                           |
          +----------------+----------------+
          |                |                |
       CORE DATA        UNIT USAHA        SDM
          |                |                |
          |        +-------+-------+        |
          |        |       |       |        |
          |      Simpan   Air    Unit X   Payroll
          |      Pinjam
          |        |       |       |
          +--------+-------+-------+
                           |
                    TRANSACTION ENGINE
                           |
              +------------+------------+
              |                         |
           KAS/BANK                 PIUTANG/UTANG
              |                         |
              +------------+------------+
                           |
                        AKUNTANSI
                           |
                    GENERAL LEDGER
                           |
             +-------------+-------------+
             |             |             |
           NERACA       LABA RUGI     ARUS KAS
```

------------------------------------------------------------------------

# 4. Prinsip Arsitektur

## 3.1 Core

Core adalah fondasi yang dipakai semua unit:

-   BUMDes
-   User
-   Role
-   Permission
-   Unit Usaha
-   Party
-   Employee
-   Settings

## 3.2 Business Module

Setiap unit usaha dapat memiliki modul operasional sendiri.

Contoh:

``` text
Unit Simpan Pinjam
    -> Nasabah
    -> Pinjaman
    -> Jadwal Angsuran
    -> Pembayaran

Unit Sumber Air
    -> Pelanggan
    -> Produk/Layanan
    -> Penjualan
    -> Pengiriman
    -> Pembayaran

Unit Perdagangan
    -> Produk
    -> Stok
    -> Pembelian
    -> Penjualan
    -> Pembayaran
```

## 3.3 Financial Engine

Semua modul menggunakan:

-   Kas
-   Bank
-   Transaksi
-   Jurnal
-   Buku Besar
-   Periode Akuntansi

## 3.4 Reporting

Laporan mengambil data dari accounting engine, bukan menghitung ulang
dari setiap modul.

------------------------------------------------------------------------

# 5. Struktur Modul

``` text
BUMDes
|
+-- Dashboard
|
+-- Master Data
|   +-- Profil BUMDes
|   +-- Unit Usaha
|   +-- Pengguna
|   +-- Role & Permission
|   +-- Party
|   +-- Pegawai
|   +-- Rekening Kas/Bank
|   +-- Chart of Accounts
|
+-- Unit Simpan Pinjam
|   +-- Nasabah
|   +-- Pinjaman
|   +-- Angsuran
|   +-- Pembayaran
|   +-- Jaminan
|   +-- Tunggakan
|
+-- Unit Sumber Air
|   +-- Pelanggan
|   +-- Produk/Layanan
|   +-- Penjualan
|   +-- Pengiriman
|   +-- Pembayaran
|   +-- Piutang
|
+-- Unit Usaha Lain
|   +-- Modul sesuai kebutuhan
|
+-- Penggajian
|   +-- Pegawai
|   +-- Komponen Gaji
|   +-- Payroll
|   +-- Pembayaran Gaji
|
+-- Keuangan
|   +-- Kas
|   +-- Bank
|   +-- Penerimaan
|   +-- Pengeluaran
|   +-- Transfer
|
+-- Akuntansi
|   +-- Jurnal Umum
|   +-- Buku Besar
|   +-- Periode Akuntansi
|   +-- Penutupan Periode
|
+-- Laporan
|   +-- Neraca
|   +-- Laba Rugi
|   +-- Arus Kas
|   +-- Buku Besar
|   +-- Jurnal
|   +-- Piutang
|   +-- Laporan per Unit
|
+-- Audit
    +-- Approval
    +-- Audit Log
```

------------------------------------------------------------------------

# 7. Target Database — MongoDB (Tahap Lanjutan)


> **Catatan implementasi:** collection MongoDB di bawah ini adalah target
> setelah MVP localStorage terbukti benar. Untuk tahap sekarang, collection
> tersebut direpresentasikan sebagai array JSON di `bumdes_db_v1`.



## 5.1 Core Collections

### `bumdes`

``` json
{
  "_id": "BUMDES001",
  "nama": "BUMDes Desa Maju",
  "desa": "Desa Maju",
  "alamat": "...",
  "tahun_berdiri": 2020,
  "status": "aktif",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### `business_units`

``` json
{
  "_id": "UNIT001",
  "bumdes_id": "BUMDES001",
  "kode": "SP",
  "nama": "Unit Simpan Pinjam",
  "jenis": "simpan_pinjam",
  "status": "aktif",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

Contoh unit:

``` text
UNIT001 = Simpan Pinjam
UNIT002 = Sumber Air
UNIT003 = Pertanian
UNIT004 = Perdagangan
UNIT005 = Pariwisata
```

Unit baru cukup ditambahkan sebagai data.

------------------------------------------------------------------------

## 5.2 User & Access

### `users`

Field utama:

``` text
_id
bumdes_id
name
email
password_hash
role_id
status
last_login
createdAt
updatedAt
```

### `roles`

Contoh:

``` text
USER
ADMIN
SUPERADMIN
```

### `permissions`

Contoh:

``` text
loan.create
loan.approve
loan.disburse
payment.create
payroll.create
payroll.approve
transaction.post
journal.create
report.view
period.close
```

------------------------------------------------------------------------

# 7. Party

Gunakan collection umum `parties`, jangan hanya `members`.

Satu orang/badan usaha dapat menjadi:

-   pelanggan
-   peminjam
-   pemasok
-   pihak lain

### `parties`

``` json
{
  "_id": "PTY001",
  "bumdes_id": "BUMDES001",
  "nama": "I Made XXX",
  "nik": "...",
  "alamat": "...",
  "telepon": "...",
  "roles": [
    "customer",
    "borrower"
  ],
  "status": "aktif"
}
```

------------------------------------------------------------------------

# 8. Pegawai

### `employees`

``` text
_id
bumdes_id
employee_code
name
position
unit_id
start_date
employment_status
bank_account
salary_profile_id
status
```

Pegawai harus dapat dikaitkan dengan unit usaha.

Contoh:

``` text
Direktur          -> Operasional BUMDes
Operator Pompa    -> Unit Air
Staf Pinjaman     -> Unit Simpan Pinjam
Sopir             -> Unit Air
```

------------------------------------------------------------------------

# 9. Chart of Accounts

### `accounts`

Struktur awal:

``` text
1000 ASET
  1100 Kas
  1200 Bank
  1300 Piutang Pinjaman
  1400 Piutang Pelanggan
  1500 Persediaan
  1600 Aset Tetap

2000 KEWAJIBAN
  2100 Utang
  2200 Kewajiban Lain

3000 EKUITAS/MODAL
  3100 Modal BUMDes
  3200 Penyertaan Modal Desa

4000 PENDAPATAN
  4100 Pendapatan Jasa Pinjaman
  4200 Pendapatan Air
  4300 Pendapatan Penjualan
  4400 Pendapatan Lainnya

5000 BEBAN
  5100 Beban Gaji
  5200 Beban Listrik
  5300 Beban BBM
  5400 Beban Operasional
  5500 Beban Penyusutan
```

Struktur akun harus mendukung parent-child.

``` json
{
  "_id": "ACC5200",
  "code": "5200",
  "name": "Beban Listrik",
  "type": "expense",
  "parent_id": "ACC5000",
  "status": "aktif"
}
```

------------------------------------------------------------------------

# 10. Kas dan Bank

### `cash_accounts`

Contoh:

``` text
Kas BUMDes
Bank BUMDes
Kas Unit Air
Bank Unit Simpan Pinjam
```

Field:

``` text
_id
bumdes_id
name
type
account_id
bank_name
account_number
opening_balance
status
```

------------------------------------------------------------------------

# 11. Accounting Engine

Ini adalah bagian paling penting.

### `transactions`

``` text
_id
bumdes_id
unit_id
tanggal
jenis
reference_type
reference_id
description
status
created_by
approved_by
posted_at
```

Contoh jenis:

``` text
water_sale
loan_disbursement
loan_payment
cash_receipt
cash_payment
bank_transfer
payroll
purchase
manual_journal
```

------------------------------------------------------------------------

## `journal_entries`

``` text
_id
transaction_id
tanggal
description
status
created_by
posted_at
```

## `journal_lines`

``` text
_id
journal_entry_id
account_id
unit_id
debit
credit
party_id
description
```

Aturan utama:

``` text
Total Debit = Total Credit
```

Tidak boleh ada jurnal yang diposting jika debit dan kredit tidak
seimbang.

------------------------------------------------------------------------

# 12. General Ledger

### `general_ledger`

Dapat berupa ledger hasil posting jurnal.

Field:

``` text
_id
journal_entry_id
journal_line_id
tanggal
account_id
unit_id
debit
credit
balance
```

General Ledger menjadi sumber laporan.

------------------------------------------------------------------------

# 13. Accounting Period

### `accounting_periods`

Contoh:

``` text
2026-01
2026-02
...
2026-12
```

Status:

``` text
open
closed
```

Setelah periode ditutup, transaksi lama tidak boleh diedit secara
langsung.

Jika ada koreksi, gunakan:

``` text
Jurnal Koreksi
```

------------------------------------------------------------------------

# 14. Modul Simpan Pinjam

## `loans`

Field:

``` text
_id
unit_id
party_id
loan_number
application_date
approval_date
disbursement_date
principal
interest_rate
interest_method
tenor
installment_amount
status
```

## `loan_installments`

``` text
_id
loan_id
installment_number
due_date
principal_due
interest_due
penalty_due
total_due
principal_paid
interest_paid
penalty_paid
status
```

## `loan_payments`

``` text
_id
loan_id
party_id
payment_date
principal_amount
interest_amount
penalty_amount
total_amount
cash_account_id
transaction_id
```

## `collaterals`

``` text
_id
loan_id
type
description
estimated_value
document_number
status
```

------------------------------------------------------------------------

# 15. Mekanisme Simpan Pinjam

## Pengajuan

``` text
Nasabah
   ↓
Pengajuan
   ↓
Verifikasi Admin
   ↓
Persetujuan
   ↓
Pencairan
```

## Pencairan

Contoh Rp10.000.000:

``` text
Debit  Piutang Pinjaman       10.000.000
Kredit Kas/Bank               10.000.000
```

## Angsuran

Contoh:

``` text
Pokok     800.000
Jasa      200.000
Total   1.000.000
```

Jurnal:

``` text
Debit  Kas/Bank               1.000.000
Kredit Piutang Pinjaman         800.000
Kredit Pendapatan Jasa          200.000
```

Komponen bunga/jasa harus mengikuti kebijakan BUMDes yang sebenarnya dan
dapat dikonfigurasi.

------------------------------------------------------------------------

# 16. Modul Sumber Air

## `products`

``` text
_id
unit_id
code
name
type
unit
price
cost
status
```

Contoh:

``` text
AIR-001
Air Bersih
m3
Rp5.000
```

## `sales`

``` text
_id
unit_id
customer_id
invoice_number
sale_date
payment_method
subtotal
discount
total
paid_amount
remaining_amount
status
```

## `sale_items`

``` text
_id
sale_id
product_id
quantity
unit_price
subtotal
```

## `payments`

``` text
_id
reference_type
reference_id
payment_date
amount
cash_account_id
transaction_id
```

------------------------------------------------------------------------

# 17. Mekanisme Unit Air

## Penjualan tunai

``` text
Penjualan
   ↓
Kas
   ↓
Pendapatan Air
```

Jurnal:

``` text
Debit  Kas                    500.000
Kredit Pendapatan Air         500.000
```

## Penjualan kredit

``` text
Penjualan
   ↓
Piutang Pelanggan
   ↓
Pendapatan Air
```

Jurnal:

``` text
Debit  Piutang Pelanggan    1.000.000
Kredit Pendapatan Air       1.000.000
```

Ketika dibayar:

``` text
Debit  Kas/Bank             1.000.000
Kredit Piutang Pelanggan    1.000.000
```

Pembayaran piutang tidak membuat pendapatan baru.

------------------------------------------------------------------------

# 18. Modul Penggajian

## `payroll_components`

Contoh:

``` text
Gaji Pokok
Tunjangan
Insentif
Lembur
Potongan
```

## `payrolls`

``` text
_id
period
employee_id
unit_id
gross_salary
total_deduction
net_salary
status
```

## `payroll_items`

``` text
payroll_id
component_id
amount
type
```

## `salary_payments`

``` text
payroll_id
payment_date
cash_account_id
amount
transaction_id
```

------------------------------------------------------------------------

# 19. Alur Payroll

``` text
Data Pegawai
     ↓
Hitung Payroll
     ↓
Review
     ↓
Approval
     ↓
Pembayaran
     ↓
Jurnal
     ↓
General Ledger
```

Contoh:

``` text
Gaji Bruto       3.000.000
Potongan           100.000
Gaji Bersih      2.900.000
```

Biaya gaji harus dapat dialokasikan ke unit usaha.

Contoh:

``` text
Operator Air
    ↓
Unit Air
    ↓
Beban Gaji Unit Air
```

------------------------------------------------------------------------

# 20. Kas dan Bank

Sediakan transaksi:

``` text
Penerimaan Kas
Pengeluaran Kas
Penerimaan Bank
Pengeluaran Bank
Transfer Kas ke Bank
Transfer Bank ke Kas
Transfer antar rekening
```

Setiap transaksi keuangan harus menghasilkan jurnal.

------------------------------------------------------------------------

# 21. Approval Workflow

Tidak semua transaksi membutuhkan approval yang sama.

Contoh:

  Transaksi            Workflow
  -------------------- --------------------
  Penjualan kecil      Admin
  Pencairan pinjaman   Admin → Superadmin
  Payroll              Admin → Superadmin
  Pengeluaran besar    Admin → Superadmin
  Jurnal manual        Superadmin
  Tutup periode        Superadmin

Status umum:

``` text
draft
submitted
approved
rejected
posted
cancelled
```

------------------------------------------------------------------------

# 22. Audit Log

### `audit_logs`

Catat:

``` text
user_id
action
module
reference_type
reference_id
old_value
new_value
timestamp
```

Contoh:

``` text
Admin mengubah nominal transaksi
↓
Audit Log menyimpan nilai sebelum dan sesudah
```

Data audit tidak boleh dihapus oleh user biasa.

------------------------------------------------------------------------

# 23. Laporan

## Laporan Umum

-   Dashboard
-   Neraca
-   Laba Rugi
-   Arus Kas
-   Jurnal Umum
-   Buku Besar
-   Trial Balance
-   Rekap Kas
-   Rekap Bank

## Laporan Simpan Pinjam

-   Daftar pinjaman
-   Pinjaman aktif
-   Jatuh tempo
-   Tunggakan
-   Aging piutang
-   Rekap pembayaran
-   Pendapatan jasa/bunga
-   Posisi piutang

## Laporan Unit Air

-   Penjualan
-   Piutang pelanggan
-   Penerimaan
-   Volume air
-   Pendapatan
-   Beban
-   Laba/rugi unit

## Laporan SDM

-   Daftar pegawai
-   Payroll
-   Rekap gaji
-   Beban gaji per unit

## Laporan per Unit Usaha

Setiap unit harus dapat menghasilkan:

``` text
Pendapatan
- Beban
----------------
Surplus/Laba Unit
```

------------------------------------------------------------------------

# 24. Dashboard

Dashboard utama:

``` text
TOTAL BUMDES

Kas              Rp xxx
Bank             Rp xxx
Piutang          Rp xxx
Pendapatan       Rp xxx
Beban            Rp xxx
Surplus/Laba     Rp xxx
```

Kemudian:

``` text
KINERJA UNIT

Simpan Pinjam
Pendapatan       Rp xxx
Beban            Rp xxx

Sumber Air
Pendapatan       Rp xxx
Beban            Rp xxx

Unit Lain
Pendapatan       Rp xxx
Beban            Rp xxx
```

Dashboard tidak boleh menggunakan angka manual. Semua berasal dari
database dan accounting engine.

------------------------------------------------------------------------

# 25. Aturan Penting Sistem

## 24.1 Tidak menghapus transaksi posted

Jika transaksi sudah `posted`, jangan hapus.

Gunakan:

``` text
Void
Reversal
Adjustment
```

## 24.2 Semua jurnal harus balance

``` text
SUM(debit) = SUM(credit)
```

## 24.3 Satu transaksi dapat memiliki beberapa journal line

Contoh angsuran:

``` text
Kas                 Debit
Piutang Pokok       Kredit
Pendapatan Jasa     Kredit
Pendapatan Denda    Kredit
```

## 24.4 Unit usaha adalah dimensi transaksi

Hampir semua transaksi keuangan harus memiliki:

``` text
unit_id
```

Jika transaksi merupakan biaya bersama BUMDes, gunakan:

``` text
unit_id = OPERASIONAL_BUMDES
```

## 24.5 Jangan hard-code unit usaha

Jangan membuat:

``` text
if unit == "air"
if unit == "simpan_pinjam"
```

di seluruh aplikasi.

Gunakan konfigurasi/modul agar unit baru dapat ditambahkan.

------------------------------------------------------------------------

# 26. Struktur Folder Backend

Contoh jika menggunakan Node.js:

``` text
backend/
|
+-- src/
    |
    +-- modules/
    |   +-- auth/
    |   +-- users/
    |   +-- units/
    |   +-- parties/
    |   +-- employees/
    |   +-- accounting/
    |   +-- cash-bank/
    |   +-- savings-loans/
    |   +-- water/
    |   +-- payroll/
    |   +-- reports/
    |   +-- audit/
    |
    +-- core/
    |   +-- database/
    |   +-- middleware/
    |   +-- permissions/
    |   +-- validation/
    |   +-- errors/
    |
    +-- routes/
    +-- config/
    +-- app.js
```

------------------------------------------------------------------------

# 27. Struktur Frontend

``` text
frontend/
|
+-- src/
    |
    +-- pages/
    |   +-- dashboard/
    |   +-- units/
    |   +-- savings-loans/
    |   +-- water/
    |   +-- payroll/
    |   +-- accounting/
    |   +-- reports/
    |
    +-- components/
    |   +-- tables/
    |   +-- forms/
    |   +-- modals/
    |   +-- cards/
    |
    +-- services/
    +-- hooks/
    +-- layouts/
    +-- permissions/
```

------------------------------------------------------------------------

# 28. API Dasar

Contoh:

``` text
/api/auth
/api/users
/api/units
/api/parties
/api/employees

/api/accounting/accounts
/api/accounting/transactions
/api/accounting/journals
/api/accounting/ledger

/api/loans
/api/loans/installments
/api/loans/payments

/api/water/products
/api/water/sales
/api/water/payments

/api/payroll
/api/payroll/payments

/api/reports/balance-sheet
/api/reports/income-statement
/api/reports/cash-flow
/api/reports/general-ledger
```

------------------------------------------------------------------------

# 29. TODO DEVELOPMENT --- STEP BY STEP

## PHASE 0 --- Perencanaan

-   [ ] Finalisasi kebutuhan BUMDes
-   [ ] Tentukan unit usaha awal
-   [ ] Tentukan pengguna sistem
-   [ ] Tentukan workflow approval
-   [ ] Tentukan kebijakan transaksi
-   [ ] Tentukan periode akuntansi
-   [ ] Tentukan metode pencatatan yang akan digunakan
-   [ ] Finalisasi Chart of Accounts
-   [ ] Finalisasi aturan Simpan Pinjam
-   [ ] Finalisasi mekanisme Unit Air
-   [ ] Finalisasi penggajian

**Output:** Dokumen kebutuhan sistem.

------------------------------------------------------------------------

# PHASE 1 --- Project Foundation

-   [ ] Buat repository
-   [ ] Setup backend
-   [ ] Setup frontend
-   [ ] Setup MongoDB
-   [ ] Setup environment variables
-   [ ] Setup database connection
-   [ ] Setup error handling
-   [ ] Setup validation
-   [ ] Setup logging
-   [ ] Setup API structure
-   [ ] Setup frontend routing
-   [ ] Setup layout utama

**Output:** Aplikasi kosong yang sudah dapat menjalankan frontend +
backend + database.

------------------------------------------------------------------------

# PHASE 2 --- Authentication & Authorization

-   [ ] Login
-   [ ] Logout
-   [ ] Password hashing
-   [ ] Session/JWT
-   [ ] User management
-   [ ] Role management
-   [ ] Permission management
-   [ ] Middleware authorization
-   [ ] Proteksi API
-   [ ] Proteksi halaman frontend

**Output:** Sistem login dan hak akses.

------------------------------------------------------------------------

# PHASE 3 --- Core Master Data

-   [ ] Profil BUMDes
-   [ ] CRUD Unit Usaha
-   [ ] CRUD Party
-   [ ] CRUD Pegawai
-   [ ] Rekening Kas/Bank
-   [ ] Pengaturan sistem
-   [ ] Status aktif/nonaktif
-   [ ] Search
-   [ ] Filter
-   [ ] Pagination

**Output:** Fondasi master data.

------------------------------------------------------------------------

# PHASE 4 --- Accounting Foundation

-   [ ] Chart of Accounts
-   [ ] Account hierarchy
-   [ ] Accounting period
-   [ ] Transaction model
-   [ ] Journal entry
-   [ ] Journal lines
-   [ ] Debit/credit validation
-   [ ] Posting engine
-   [ ] General ledger
-   [ ] Reversal
-   [ ] Void
-   [ ] Adjustment
-   [ ] Period closing

**Output:** Mesin akuntansi dasar.

------------------------------------------------------------------------

# PHASE 5 --- Kas & Bank

-   [ ] Kas masuk
-   [ ] Kas keluar
-   [ ] Bank masuk
-   [ ] Bank keluar
-   [ ] Transfer
-   [ ] Saldo rekening
-   [ ] Mutasi
-   [ ] Rekonsiliasi dasar
-   [ ] Integrasi dengan jurnal

**Output:** Modul kas/bank terhubung akuntansi.

------------------------------------------------------------------------

# PHASE 6 --- Unit Simpan Pinjam

-   [ ] Data nasabah
-   [ ] Produk pinjaman
-   [ ] Pengajuan
-   [ ] Verifikasi
-   [ ] Approval
-   [ ] Pencairan
-   [ ] Jadwal angsuran
-   [ ] Perhitungan pokok
-   [ ] Perhitungan jasa/bunga
-   [ ] Pembayaran angsuran
-   [ ] Pembayaran sebagian
-   [ ] Pelunasan
-   [ ] Denda jika digunakan
-   [ ] Tunggakan
-   [ ] Aging piutang
-   [ ] Jaminan
-   [ ] Cetak bukti transaksi
-   [ ] Integrasi jurnal

**Output:** Unit Simpan Pinjam berjalan end-to-end.

------------------------------------------------------------------------

# PHASE 7 --- Unit Sumber Air

-   [ ] Data pelanggan
-   [ ] Produk/layanan air
-   [ ] Harga
-   [ ] Penjualan
-   [ ] Penjualan tunai
-   [ ] Penjualan kredit
-   [ ] Piutang
-   [ ] Pembayaran
-   [ ] Pengiriman jika diperlukan
-   [ ] Rekap volume
-   [ ] Pendapatan air
-   [ ] Beban operasional air
-   [ ] Integrasi kas/bank
-   [ ] Integrasi jurnal

**Output:** Unit Sumber Air berjalan end-to-end.

------------------------------------------------------------------------

# PHASE 8 --- Penggajian

-   [ ] Data pegawai
-   [ ] Jabatan
-   [ ] Unit kerja
-   [ ] Gaji pokok
-   [ ] Tunjangan
-   [ ] Insentif
-   [ ] Lembur
-   [ ] Potongan
-   [ ] Payroll period
-   [ ] Perhitungan payroll
-   [ ] Approval payroll
-   [ ] Pembayaran payroll
-   [ ] Bukti pembayaran
-   [ ] Alokasi biaya per unit
-   [ ] Integrasi jurnal

**Output:** Payroll terhubung ke keuangan.

------------------------------------------------------------------------

# PHASE 9 --- Laporan Akuntansi

-   [ ] Trial balance
-   [ ] Jurnal umum
-   [ ] Buku besar
-   [ ] Neraca
-   [ ] Laba rugi
-   [ ] Arus kas
-   [ ] Laporan perubahan ekuitas jika diperlukan
-   [ ] Laporan per unit
-   [ ] Filter periode
-   [ ] Export PDF
-   [ ] Export Excel

**Output:** Laporan keuangan terintegrasi.

------------------------------------------------------------------------

# PHASE 10 --- Dashboard

-   [ ] Dashboard BUMDes
-   [ ] Saldo kas
-   [ ] Saldo bank
-   [ ] Piutang
-   [ ] Pendapatan
-   [ ] Beban
-   [ ] Laba/surplus
-   [ ] Grafik pendapatan
-   [ ] Grafik beban
-   [ ] Performa unit usaha
-   [ ] Tunggakan pinjaman
-   [ ] Tagihan air
-   [ ] Payroll

**Output:** Dashboard manajemen.

------------------------------------------------------------------------

# PHASE 11 --- Approval & Audit

-   [ ] Approval engine
-   [ ] Approval history
-   [ ] Audit log
-   [ ] Perubahan data tercatat
-   [ ] Reversal log
-   [ ] Void log
-   [ ] Login activity
-   [ ] Permission audit

**Output:** Kontrol internal lebih kuat.

------------------------------------------------------------------------

# PHASE 12 --- Security

-   [ ] Password hashing
-   [ ] Input validation
-   [ ] Authorization
-   [ ] Rate limiting
-   [ ] Secure headers
-   [ ] API protection
-   [ ] Audit trail
-   [ ] Backup database
-   [ ] Restore test
-   [ ] Environment secret management

**Output:** Sistem lebih siap digunakan secara nyata.

------------------------------------------------------------------------

# PHASE 13 --- Testing

## Unit Test

-   [ ] Perhitungan angsuran
-   [ ] Perhitungan bunga/jasa
-   [ ] Perhitungan payroll
-   [ ] Jurnal debit/kredit
-   [ ] Saldo kas
-   [ ] Saldo piutang

## Integration Test

-   [ ] Pencairan → jurnal
-   [ ] Angsuran → jurnal
-   [ ] Penjualan air → jurnal
-   [ ] Pembayaran piutang → jurnal
-   [ ] Payroll → jurnal
-   [ ] Pengeluaran → jurnal

## User Acceptance Test

-   [ ] Admin
-   [ ] Superadmin
-   [ ] Pengurus
-   [ ] Unit Simpan Pinjam
-   [ ] Unit Air

------------------------------------------------------------------------

# PHASE 14 --- Deployment

-   [ ] Production database
-   [ ] Production backend
-   [ ] Production frontend
-   [ ] Environment configuration
-   [ ] Domain
-   [ ] SSL
-   [ ] Backup otomatis
-   [ ] Monitoring
-   [ ] Error logging
-   [ ] Recovery procedure

------------------------------------------------------------------------

# PHASE 15 --- Penambahan Unit Usaha

Setelah fondasi selesai, unit baru mengikuti pola:

``` text
Buat Unit
    ↓
Tentukan Modul
    ↓
Buat Master Data
    ↓
Buat Transaksi
    ↓
Mapping Account
    ↓
Integrasi Transaction Engine
    ↓
Test Jurnal
    ↓
Test Laporan
    ↓
Aktifkan Unit
```

Contoh:

``` text
Tambah Unit Pertanian
        ↓
Produk
        ↓
Pembelian
        ↓
Persediaan
        ↓
Penjualan
        ↓
Kas/Piutang
        ↓
Jurnal
        ↓
Laporan Unit Pertanian
```

------------------------------------------------------------------------

# 30. Urutan Prioritas Development — MVP First

Jangan langsung membuat backend.

Tahap awal:

```text
1. Single HTML
      ↓
2. JSON Data Model
      ↓
3. localStorage Engine
      ↓
4. Master Data
      ↓
5. Accounting Engine
      ↓
6. Kas & Bank
      ↓
7. Simpan Pinjam
      ↓
8. Unit Air
      ↓
9. Payroll
      ↓
10. Reports
      ↓
11. Dashboard
      ↓
12. Backup / Restore
      ↓
13. Testing
```

Setelah MVP stabil:

```text
MVP localStorage
      ↓
Pisahkan frontend
      ↓
Buat API
      ↓
Migrasi JSON → MongoDB
      ↓
Authentication
      ↓
Authorization
      ↓
Multi-user
      ↓
Deployment
```

## 30.1 Aturan MVP

Jangan membuat semua modul sekaligus.

Urutan coding yang disarankan:

```text
STEP 1
App Shell + Navigation
      ↓
STEP 2
DB/localStorage layer
      ↓
STEP 3
Master Data
      ↓
STEP 4
Chart of Accounts
      ↓
STEP 5
Transaction Engine
      ↓
STEP 6
Journal Engine
      ↓
STEP 7
Kas & Bank
      ↓
STEP 8
Simpan Pinjam
      ↓
STEP 9
Unit Air
      ↓
STEP 10
Payroll
      ↓
STEP 11
Reports
      ↓
STEP 12
Dashboard
      ↓
STEP 13
Backup/Restore
```

# 31. Milestone

## Milestone 1

**Core System**

Target:

``` text
Login
User
Role
Unit Usaha
Party
Pegawai
```

## Milestone 2

**Accounting Core**

Target:

``` text
COA
Kas
Bank
Jurnal
Ledger
```

## Milestone 3

**Simpan Pinjam**

Target:

``` text
Pengajuan
Pencairan
Angsuran
Pelunasan
Piutang
```

## Milestone 4

**Unit Air**

Target:

``` text
Pelanggan
Penjualan
Piutang
Pembayaran
```

## Milestone 5

**Payroll**

Target:

``` text
Pegawai
Payroll
Approval
Pembayaran
```

## Milestone 6

**Reporting**

Target:

``` text
Neraca
Laba Rugi
Arus Kas
Buku Besar
Laporan Unit
```

## Milestone 7

**Production Ready**

Target:

``` text
Security
Audit
Backup
Testing
Deployment
```

------------------------------------------------------------------------

# 32. Prinsip Pengembangan

### Jangan langsung membuat UI besar.

Urutan pengerjaan setiap modul:

``` text
Requirement
    ↓
Database
    ↓
Business Logic
    ↓
API
    ↓
Validation
    ↓
Accounting Mapping
    ↓
Frontend
    ↓
Testing
```

### Setiap modul wajib diuji dengan transaksi nyata.

Contoh Unit Air:

``` text
Buat pelanggan
    ↓
Buat penjualan
    ↓
Terima pembayaran
    ↓
Cek kas
    ↓
Cek piutang
    ↓
Cek jurnal
    ↓
Cek buku besar
    ↓
Cek laba rugi
```

------------------------------------------------------------------------

# 33. Definition of Done

Sebuah fitur dianggap selesai jika:

-   [ ] Database sudah dibuat
-   [ ] Validation sudah dibuat
-   [ ] API sudah dibuat
-   [ ] Permission sudah dibuat
-   [ ] UI sudah dibuat
-   [ ] Error handling sudah dibuat
-   [ ] Audit log sudah dibuat jika diperlukan
-   [ ] Jurnal sudah benar
-   [ ] Laporan sudah benar
-   [ ] Test berhasil
-   [ ] Tidak merusak modul lain

------------------------------------------------------------------------

# 34. TODO Status Rules

Gunakan status:

``` text
[ ] TODO
[x] DONE
[~] IN PROGRESS
[!] BLOCKED
```

Contoh:

``` text
[x] Setup MongoDB
[x] Setup Backend
[~] Setup Authentication
[ ] Setup Accounting Engine
[ ] Setup Unit Simpan Pinjam
```

------------------------------------------------------------------------

# 35. Catatan Penting Sebelum Coding

Hal-hal berikut harus difinalisasi sebelum implementasi akuntansi:

1.  Bentuk dan status hukum BUMDes yang digunakan.
2.  Kebijakan modal dan penyertaan modal.
3.  Mekanisme unit simpan pinjam yang benar-benar digunakan BUMDes.
4.  Metode jasa/bunga pinjaman.
5.  Perlakuan tunggakan dan kredit bermasalah.
6.  Kebijakan pendapatan unit air.
7.  Kebijakan penggajian.
8.  Chart of Accounts final.
9.  Struktur laporan keuangan yang dibutuhkan.
10. Hak akses setiap jabatan.
11. Mekanisme approval.
12. Kebijakan penutupan periode.
13. Kebijakan koreksi transaksi.
14. Kebutuhan bukti transaksi dan dokumen cetak.

Dokumen ini adalah **blueprint teknis awal**, bukan penetapan kebijakan
akuntansi/hukum BUMDes. Aturan operasional dan akuntansi final harus
disesuaikan dengan ketentuan yang berlaku dan kebijakan BUMDes.

------------------------------------------------------------------------

# 36. Status Proyek Awal

``` text
FOUNDATION             [ ] TODO
AUTHENTICATION         [ ] TODO
MASTER DATA            [ ] TODO
ACCOUNTING ENGINE      [ ] TODO
CASH & BANK            [ ] TODO
SIMPAN PINJAM          [ ] TODO
UNIT AIR               [ ] TODO
PAYROLL                [ ] TODO
REPORTING              [ ] TODO
DASHBOARD              [ ] TODO
APPROVAL                [ ] TODO
AUDIT                  [ ] TODO
SECURITY               [ ] TODO
TESTING                [ ] TODO
DEPLOYMENT             [ ] TODO
```

**Next recommended step:**

> Finalisasi JSON schema dan alur accounting engine MVP, lalu mulai membuat
> `bumdes.html` sebagai aplikasi single-file dengan localStorage.


------------------------------------------------------------------------

# 36. Scope MVP yang Dikerjakan Terlebih Dahulu

Agar proyek tidak terlalu besar, versi pertama fokus pada:

```text
CORE
├── Dashboard
├── Profil BUMDes
├── Unit Usaha
├── Party
├── Pegawai
├── Chart of Accounts
└── Kas/Bank

TRANSAKSI
├── Penerimaan
├── Pengeluaran
├── Transfer
└── Jurnal Manual

ACCOUNTING
├── Transaction Engine
├── Journal Engine
├── General Ledger
├── Trial Balance
└── Accounting Period

UNIT SIMPAN PINJAM
├── Nasabah
├── Pinjaman
├── Angsuran
├── Pembayaran
└── Tunggakan

UNIT AIR
├── Pelanggan
├── Produk/Layanan
├── Penjualan
├── Piutang
└── Pembayaran

PAYROLL
├── Pegawai
├── Komponen Gaji
├── Payroll
└── Pembayaran

REPORT
├── Dashboard
├── Kas/Bank
├── Piutang
├── Laba Rugi
├── Neraca
├── Buku Besar
└── Laporan per Unit

DATA
├── localStorage
├── Export JSON
└── Import JSON
```

Modul berikut ditunda sampai fondasi MVP stabil:

```text
Authentication production
JWT
Multi-user real-time
MongoDB
REST API
Cloud deployment
Rate limiting
Secure headers
Server-side audit
Automated backup
```

------------------------------------------------------------------------

# 37. Struktur Single HTML yang Disarankan

Walaupun hanya satu file, JavaScript tetap dipisahkan secara logis:

```text
bumdes.html
│
├── <style>
│   ├── layout
│   ├── sidebar
│   ├── dashboard
│   ├── table
│   ├── form
│   └── modal
│
├── <body>
│   ├── Sidebar
│   ├── Header
│   ├── Main Content
│   └── Modal
│
└── <script>
    ├── CONFIG
    ├── DEFAULT_DB
    ├── STORAGE
    ├── ID GENERATOR
    ├── MASTER DATA
    ├── TRANSACTION ENGINE
    ├── JOURNAL ENGINE
    ├── LEDGER ENGINE
    ├── SIMPAN PINJAM
    ├── UNIT AIR
    ├── PAYROLL
    ├── REPORTING
    ├── DASHBOARD
    ├── BACKUP / RESTORE
    ├── AUDIT
    └── UI CONTROLLER
```

Dengan struktur ini, file tetap satu tetapi kode tidak menjadi satu blok
JavaScript yang sulit dipelihara.

------------------------------------------------------------------------

# 38. Jalur Migrasi ke Database

Ketika MVP sudah stabil:

```text
localStorage JSON
      ↓
Export master data
      ↓
Validasi JSON
      ↓
Import ke MongoDB
      ↓
API menggantikan localStorage
      ↓
Frontend tetap menggunakan business model yang sama
```

Prinsip penting:

> **Jangan membuat ulang sistem dari nol ketika pindah ke MongoDB.**

Yang berubah terutama adalah data access layer:

```text
MVP:

UI → Business Logic → localStorage

Production:

UI → API → Business Logic/Service → MongoDB
```

Business rules seperti:

```text
Debit = Kredit
Posted tidak boleh dihapus
Pencairan menghasilkan jurnal
Pembayaran angsuran menghasilkan jurnal
Penjualan kredit menghasilkan piutang
Pembayaran piutang mengurangi piutang
Payroll menghasilkan beban dan kewajiban/pembayaran
```

harus tetap sama.

------------------------------------------------------------------------

# 39. Status Implementasi Baru

```text
BLUEPRINT / DOMAIN
[x] Sudah didefinisikan

MVP SINGLE HTML
[ ] App Shell
[ ] JSON Database
[ ] localStorage
[ ] Master Data
[ ] Accounting Engine
[ ] Kas & Bank
[ ] Simpan Pinjam
[ ] Unit Air
[ ] Payroll
[ ] Reports
[ ] Dashboard
[ ] Backup / Restore
[ ] Testing

BACKEND FUTURE
[ ] API
[ ] MongoDB
[ ] Authentication
[ ] Authorization
[ ] Multi-user
[ ] Production Security
[ ] Deployment
```

**Next step paling tepat:** buat `bumdes.html` MVP dan bangun fondasi
`DEFAULT_DB → loadDB() → saveDB() → CRUD master data → transaction engine`
sebelum membuat modul yang lebih kompleks.
