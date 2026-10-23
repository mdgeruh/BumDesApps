// ===== PEMERIKSAAN KESEHATAN DATA (v1.1.243, K3) =====
// Hanya membaca; dua perbaikan aman tersedia (hapus angsuran tanpa pinjaman, kosongkan tautan proyek yang hilang) dengan konfirmasi dan salinan _prev.
const hcDup=a=>{const s=new Set(),d=new Set();(a||[]).forEach(x=>{if(s.has(x._id))d.add(x._id);s.add(x._id)});return[...d]};
function hcRun(){const R=[],A=db.accounts||[],ids=a=>new Set((a||[]).map(x=>x._id)),accs=ids(A),loans=ids(db.loans),parties=ids(db.parties),conns=ids(db.water_connections),proj=ids(db.projects),T=db.transactions||[];
 const add=(id,t,list,fix)=>{if(list.length)R.push({id,t,n:list.length,s:list.slice(0,5).map(x=>typeof x==="string"?x:x._id||"?"),fix:!!fix})};
 const JL=db.journal_lines||[],bal={},tx=ids(T);JL.forEach(l=>{bal[l.transaction_id]=(bal[l.transaction_id]||0)+(l.debit||0)-(l.credit||0)});
 add("seimbang","Jurnal tidak seimbang (debet ≠ kredit)",Object.keys(bal).filter(k=>Math.abs(bal[k])>0.5&&tx.has(k)));
 add("akun","Baris jurnal memakai akun yang tidak ada",JL.filter(l=>!accs.has(l.account_id)));
 add("jyatim","Baris jurnal tanpa transaksi",JL.filter(l=>!tx.has(l.transaction_id)));
 add("tanpajurnal","Transaksi tercatat tanpa baris jurnal",T.filter(t=>t.status==="posted"&&!(t.amount===0)&&!JL.some(l=>l.transaction_id===t._id)));
 add("tanggal","Transaksi dengan tanggal tidak valid",T.filter(t=>!/^\d{4}-\d\d-\d\d$/.test(String(t.date||""))));
 ["transactions","parties","loans","water_connections","employees"].forEach(k=>add("dup_"+k,"ID ganda pada "+k,hcDup(db[k])));
 add("angsuran","Angsuran tanpa pinjaman",(db.loan_installments||[]).filter(i=>!loans.has(i.loan_id)),1);
 add("bayar","Pembayaran pinjaman tanpa pinjaman",(db.loan_payments||[]).filter(p=>!loans.has(p.loan_id)));
 add("pinjaman","Pinjaman tanpa data peminjam",(db.loans||[]).filter(l=>!parties.has(l.party_id)));
 add("sambungan","Sambungan air tanpa pelanggan",(db.water_connections||[]).filter(c=>!parties.has(c.party_id)));
 add("bacaan","Bacaan meter tanpa sambungan",(db.water_readings||[]).filter(r=>!conns.has(r.conn_id)));
 add("tabungan","Rekening tabungan tanpa nasabah",(db.savings_accounts||[]).filter(a=>!parties.has(a.party_id)));
 add("proyek","Transaksi bertaut ke proyek yang tidak ada",T.filter(t=>t.project_id&&!proj.has(t.project_id)),1);
 return R}
function hcGo(){S.hc={at:now(),r:hcRun()};render()}
function hcFix(id){try{dataP();if(typeof needP==="function"&&rbacOn()&&curUser())needP("data.kelola","Hanya peran pengelola data yang dapat memperbaiki data");
  let n=0;try{localStorage.setItem(KEY+"_prev",JSON.stringify(db))}catch(e){}
  if(id==="angsuran"){const L=new Set((db.loans||[]).map(x=>x._id)),b=db.loan_installments.length;db.loan_installments=db.loan_installments.filter(i=>L.has(i.loan_id));n=b-db.loan_installments.length}
  else if(id==="proyek"){const P=new Set((db.projects||[]).map(x=>x._id));db.transactions.forEach(t=>{if(t.project_id&&!P.has(t.project_id)){delete t.project_id;n++}})}
  else throw Error("Perbaikan tidak dikenal");
  audit("update","data","-","Pemeriksaan data: "+n+" baris diperbaiki ("+id+")");S._sto=null;save();S.hc={at:now(),r:hcRun()};S.msg=n+" baris diperbaiki. Salinan data sebelumnya disimpan sebagai cadangan lokal"}catch(e){S.msg=ER(e)}render()}
function hcCard(){const ed=can("data.kelola"),h=S.hc;
 const body=!h?`<button class="b s bkp" onclick="hcGo()">Periksa data sekarang</button>`
  :(h.r.length?`<div class="upl">${h.r.map(x=>`<div class="upr"><span class="upm"><b>${esc(x.t)}</b><small>${x.n} data · contoh: ${esc(x.s.join(", "))}</small></span>${x.fix&&ed?`<button class="b s sm" onclick="askC('hcFix','${x.id}')">Perbaiki</button>`:""}</div>`).join("")}</div>`:`<p class="k"><b>Semua pemeriksaan lulus.</b> Tidak ada masalah ditemukan.</p>`)+`<p class="k">Diperiksa ${esc(wkt(h.at))}.</p><button class="b s bkp" onclick="hcGo()">Periksa ulang</button>`;
 return dcard("Pemeriksaan kesehatan data","Memeriksa jurnal seimbang, akun, ID ganda, dan data yatim. Hanya membaca; perbaikan hanya untuk dua kasus aman dan selalu meminta konfirmasi.",body)}
