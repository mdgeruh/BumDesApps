// ===== CONFIG =====
let pwaPrompt=null; // kejadian beforeinstallprompt (lihat js-15-pwa.js)
// Koneksi Supabase langsung dari kode (seperti jurnal-trading): isi SB_KEY dengan "anon public key" proyek (Project Settings > API).
// Aman ditaruh di kode karena yang melindungi data adalah login dan RLS. JANGAN isi service_role / sb_secret_ (ditolak aplikasi).
// Bila SB_URL dan SB_KEY terisi, kolom Koneksi di Setelan > Awan disembunyikan dan nilai ini yang dipakai.
const SB_URL="https://smpqygmtivxsdbxuypmx.supabase.co",SB_KEY="sb_publishable_yRNGwSos4JM2wsPqPUtWyA_T9i6EXmp";
const APP_VER="1.1.094"; // harus sama dengan package.json (1.1.1 => 1.1.001); dicek node build.js --check
const KEY="bumdes_db_v1";
const KEYS="bumdes business_units users roles permissions parties employees accounts cash_accounts transactions journal_entries journal_lines general_ledger accounting_periods loans loan_installments loan_payments collaterals products sales sale_items payments payroll_components payrolls payroll_items salary_payments approvals audit_logs water_connections water_readings".split(" ");
const NEWK=["water_connections","water_readings","rate_master","tax_master","savings_accounts","savings_tx","collection_notes","prospects"],AIRDEF=()=>({unit_id:"UNIT-002",mode:"flat",abon:15000,min_m3:0,due_days:14,cut_months:3,tiers:[{upto:null,price:10000}]});
const TABS=[["dash","Dashboard"],["rep","Laporan"],["trx","Transaksi"],["sp","Simpan Pinjam"],["air","Unit Air"],["pay","Gaji"],["led","Buku Besar"],["tb","Neraca Saldo"],["mst","Master"],["dat","Data"],["set","Setelan"]];
const TL={in:"Penerimaan",out:"Pengeluaran",tf:"Transfer",manual:"Jurnal Manual",opening:"Saldo Awal",closing:"Jurnal Penutup",loan_out:"Pencairan Pinjaman",loan_in:"Angsuran Pinjaman",sale_cash:"Penjualan Tunai",sale_credit:"Penjualan Kredit",sale_pay:"Pembayaran Piutang",payroll:"Pembayaran Gaji",fee_amort:"Pengakuan Fee Pencairan"};
const COA=`1000|ASET|asset
1100|Kas|asset
1200|Bank|asset
1300|Piutang Pinjaman|asset
1400|Piutang Pelanggan|asset
1500|Persediaan|asset
1600|Aset Tetap|asset
2000|KEWAJIBAN|liability
2100|Utang|liability
2200|Kewajiban Lain|liability
2210|Utang Pajak Bunga Tabungan|liability
2220|Utang Pajak atas Biaya Pinjaman|liability
2230|Utang Pajak atas Biaya Tabungan|liability
2240|Pendapatan Fee Ditangguhkan|liability
2300|Tabungan Nasabah|liability
3000|EKUITAS/MODAL|equity
3100|Modal BUMDes|equity
3200|Penyertaan Modal Desa|equity
3300|Laba Ditahan|equity
4000|PENDAPATAN|revenue
4100|Pendapatan Jasa Pinjaman|revenue
4200|Pendapatan Air|revenue
4300|Pendapatan Penjualan|revenue
4400|Pendapatan Lainnya|revenue
4500|Pendapatan Administrasi Tabungan|revenue
4600|Pendapatan Pemulihan Piutang|revenue
5000|BEBAN|expense
5100|Beban Gaji|expense
5200|Beban Listrik|expense
5300|Beban BBM|expense
5400|Beban Operasional|expense
5500|Beban Penyusutan|expense
5600|Beban Bunga Tabungan|expense
5700|Beban Kerugian Piutang|expense`;
