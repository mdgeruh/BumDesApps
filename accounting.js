// ===== STORAGE & ID =====
let db=null,S={tab:"dash",unit:"all",acc:"ACC1100",ft:"in",msg:""};
let VER=0;const MC={};
function memo(k,f){if(MC.v!==VER){for(const x in MC)delete MC[x];MC.v=VER}return k in MC?MC[k]:(MC[k]=f())}
const uid=p=>p+"-"+Date.now()+"-"+Math.random().toString(36).slice(2,7);
const PCS=[["Lembur","earning"],["Insentif","earning"],["Tunjangan Transport","earning"],["Potongan Kasbon","deduction"]],seedPC=d=>{if(d.payroll_components&&!d.payroll_components.length)PCS.forEach(([n,t],i)=>d.payroll_components.push({_id:"PC-00"+(i+1),name:n,type:t,status:"aktif"}))};
// v1.1.174: tanggal dan jam tampilan memakai zona waktu perangkat (mis. WITA); penyimpanan stempel waktu tetap UTC (ISO)
const pad2=n=>String(n).padStart(2,"0"),ymd=d=>d.getFullYear()+"-"+pad2(d.getMonth()+1)+"-"+pad2(d.getDate()),wkt=(x,s)=>{if(!x)return"";const t=String(x);if(!/T\d\d:\d\d/.test(t))return t;const d=new Date(t);return isNaN(d)?t.replace("T"," ").slice(0,s?19:16):ymd(d)+" "+pad2(d.getHours())+":"+pad2(d.getMinutes())+(s?":"+pad2(d.getSeconds()):"")},
wd=x=>wkt(x).slice(0,10),now=()=>new Date().toISOString(),today=()=>ymd(new Date());
function migr(){db.settings=db.settings||{};if(db.settings.sp_fee_split==="per_jenis"&&typeof ensureFeeAccs==="function")ensureFeeAccs(db);seedPC(db);seedRoles(db);ensureSavAcc(db);if(typeof ensureAirAcc==="function")ensureAirAcc(db);if(typeof posSync==="function")posSync();NEWK.forEach(k=>{if(!Array.isArray(db[k]))db[k]=[]});if(!db.settings.air)db.settings.air=AIRDEF();else if(!db.settings.air.mode){if(db.sales.some(x=>x.bill))db.settings.air.mode="tier";else db.settings.air=AIRDEF()}if(!db.settings.closings)db.settings.closings=[];if(!db.settings.modules||typeof db.settings.modules!=="object")db.settings.modules={air:(db.sales||[]).length>0||(db.water_connections||[]).length>0,pay:(db.payrolls||[]).length>0||(db.employees||[]).some(e=>(e.base_salary||0)>0)};(db.business_units||[]).forEach(u=>{if(!u.type)u.type=u.code==="SP"?"simpan_pinjam":"lainnya"});if(db.accounts&&!db.accounts.some(a=>a._id==="ACC3300"))db.accounts.push({_id:"ACC3300",code:"3300",name:"Laba Ditahan",type:"equity",parent_id:"ACC3000",status:"aktif"});snapSet()}
function load(){try{const r=localStorage.getItem(KEY);if(r){db=JSON.parse(r);migr();sess();return}}catch(e){}reset();sess()}
function save(){VER++;try{localStorage.setItem(KEY,JSON.stringify(db));S.saveErr=0;if(typeof cloudAuto==="function")cloudAuto();return true}catch(e){S.saveErr=1;S.sf=1;return false}}
function blank(){const d={meta:{version:1,app:"bumdes-mvp",created_at:now()},settings:{currency:"IDR",penalty_pct_day:0.1,payoff_interest:"current",closings:[],air:AIRDEF(),modules:{air:false,pay:false}}};KEYS.forEach(k=>d[k]=[]);NEWK.forEach(k=>d[k]=[]);
 seedPC(d);seedRoles(d);d.bumdes=[{_id:"BUMDES-001",name:"BUMDes Contoh"}];
 d.business_units=[["001","SP","Simpan Pinjam"],["002","AIR","Sumber Air"],["003","DAG","Perdagangan"]].map(([n,c,nm])=>({_id:"UNIT-"+n,code:c,name:nm,type:c==="SP"?"simpan_pinjam":"lainnya",status:"aktif"}));
 d.accounts=COA.split("\n").map(r=>{const[c,n,t]=r.split("|");return{_id:"ACC"+c,code:c,name:n,type:t,parent_id:c.endsWith("000")?null:"ACC"+c[0]+"000",status:"aktif"}});
 d.cash_accounts=[{_id:"CASH-001",name:"Kas Tunai",type:"kas",account_id:"ACC1100",status:"aktif"},{_id:"CASH-002",name:"Bank Desa",type:"bank",account_id:"ACC1200",status:"aktif"}];
 return d}
function reset(){db=blank();demo();snapSet();S.cu=null;ssS(null);try{localStorage.removeItem(LB)}catch(e){}save();if(typeof entSeed==="function")entSeed()}
function demo(){const t="2026-09-";
 post({type:"in",date:t+"01",unit:"",desc:"Penyertaan modal desa",lines:[{acc:"ACC1200",d:5e7},{acc:"ACC3200",c:5e7}]});
 post({type:"tf",date:t+"03",unit:"",desc:"Tarik tunai operasional",lines:[{acc:"ACC1100",d:5e6},{acc:"ACC1200",c:5e6}]});
 post({type:"in",date:t+"10",unit:"UNIT-002",desc:"Pendapatan air September",lines:[{acc:"ACC1100",d:2.5e6},{acc:"ACC4200",c:2.5e6}]});
 post({type:"out",date:t+"15",unit:"UNIT-002",desc:"Listrik pompa",lines:[{acc:"ACC5200",d:8e5},{acc:"ACC1100",c:8e5}]});
 post({type:"in",date:t+"20",unit:"UNIT-001",desc:"Jasa pinjaman",lines:[{acc:"ACC1100",d:1.2e6},{acc:"ACC4100",c:1.2e6}]});
 db.parties.push({_id:"PTY-DEMO-1",type:"pelanggan",name:"Bu Aminah",phone:"",address:"Dusun I",status:"aktif"});
 db.products.push({_id:"PRD-DEMO-1",unit_id:"UNIT-002",name:"Air bersih",unit:"m³",price:3500,revenue_account:"ACC4200",status:"aktif"});
 db.water_connections.push({_id:"WCN-DEMO-1",unit_id:"UNIT-002",party_id:"PTY-DEMO-1",meter_no:"MTR-001",initial:120,installed:"2026-01-01",status:"aktif"})}
function audit(a,e,id,det,by,chg){const x={_id:uid("AUD"),action:a,entity:e,entity_id:id,user:"demo",at:now()};if(det)x.detail=det;{const cu=by?null:curUser();if(by)x.by=by;else if(cu){x.by=cu.name;x.by_id=cu._id}}try{if(a==="setting"&&e==="settings"&&id&&db.settings){const nv=audJ(db.settings[id]);if(id in _ss&&_ss[id]!==nv)x.before=_ss[id];if(!(id in _ss)||_ss[id]!==nv)x.after=nv;_ss[id]=nv}else if(chg){x.before=audJ(chg.b);x.after=audJ(chg.a)}}catch(_){}db.audit_logs.push(x)}
// ===== ACCOUNTING ENGINE =====
const acc=id=>memo("acc",()=>new Map(db.accounts.map(a=>[a._id,a]))).get(id);
const postable=a=>!db.accounts.some(x=>x.parent_id===a._id);
const cyr=()=>((db&&db.settings)||{}).closed_through||"",cur=l=>l.date.slice(0,4)>cyr();
const closed=d=>d.slice(0,4)<=cyr()||(db.accounts&&db.accounting_periods.find(p=>p._id===d.slice(0,7))||{}).status==="closed";
function post({type,date,unit,desc,lines}){
 const td=lines.reduce((s,l)=>s+(l.d||0),0),tc=lines.reduce((s,l)=>s+(l.c||0),0);
 if(!lines.length||td<=0||Math.round(td*100)!==Math.round(tc*100))throw Error("Jurnal tidak balance (debit ≠ kredit)");
 lines.forEach(l=>{const a=acc(l.acc);if(!a)throw Error("Akun tidak ditemukan");if(a.status==="nonaktif")throw Error("Akun "+a.code+" nonaktif")});
 {const cu=curUser();if(cu&&(cu.unit_ids||[]).length&&!cu.unit_ids.includes(unit||""))throw Error(unit?"Unit “"+unitName(unit)+"” bukan unit tugas Anda":"Petugas yang dibatasi unit tidak boleh mencatat transaksi tanpa unit usaha")}
 if(closed(date))throw Error("Periode "+date.slice(0,7)+" sudah ditutup");
 if(!db.accounting_periods.some(p=>p._id===date.slice(0,7)))db.accounting_periods.push({_id:date.slice(0,7),status:"open"});
 const t={_id:uid("TRX"),type,date,business_unit_id:unit||null,description:desc,amount:td,status:"posted",created_by:"demo",created_at:now()};
 const je={_id:uid("JE"),transaction_id:t._id,date,description:desc,status:"posted"};
 db.transactions.push(t);db.journal_entries.push(je);
 lines.forEach(l=>db.journal_lines.push({_id:uid("JL"),journal_entry_id:je._id,transaction_id:t._id,account_id:l.acc,business_unit_id:unit||null,debit:l.d||0,credit:l.c||0,date}));
 audit("post","transaction",t._id,(TL[type]||type)+" · "+desc+" · Rp "+Math.round(td).toLocaleString("id-ID"));save();return t}
function voidT(id){try{const ty=db.transactions.find(x=>x._id===id).type;if(ty==="closing")throw Error("Jurnal penutup dibatalkan lewat Data > Periode (Batalkan penutupan)");if(ty.startsWith("sale"))throw Error("Transaksi penjualan dikoreksi lewat menu Unit Air (tombol Batalkan)");if(ty.startsWith("sav_"))throw Error("Transaksi tabungan dikoreksi lewat Simpan Pinjam > Tabungan (tombol Batalkan di buku tabungan)");if(ty.startsWith("loan"))throw Error("Transaksi pinjaman dikoreksi lewat menu Simpan Pinjam (tombol Batalkan)");if(ty==="payroll")throw Error("Pembayaran gaji dikoreksi lewat menu Gaji (tombol Batalkan)");if(ty==="payroll_rem")throw Error("Setoran potongan gaji dikoreksi lewat menu Gaji (tombol Batalkan di Potongan gaji belum disetor)");rev(id);S.msg="Transaksi dibatalkan dengan jurnal pembalik"}catch(e){S.msg="⚠ "+e.message}render()}
function rev(id){const t=db.transactions.find(x=>x._id===id);{const cu=curUser();if(cu&&(cu.unit_ids||[]).length&&!cu.unit_ids.includes(t.business_unit_id||""))throw Error("Transaksi ini bukan milik unit tugas Anda")}if(closed(t.date))throw Error("Periode "+t.date.slice(0,7)+" sudah ditutup");
 const je=db.journal_entries.find(j=>j.transaction_id===id&&!j.reversal_of);
 const r={_id:uid("JE"),transaction_id:id,date:t.date,description:"Reversal: "+t.description,status:"posted",reversal_of:je._id};db.journal_entries.push(r);
 db.journal_lines.filter(l=>l.journal_entry_id===je._id).forEach(l=>db.journal_lines.push({...l,_id:uid("JL"),journal_entry_id:r._id,debit:l.credit,credit:l.debit}));
 t.status="voided";audit("void","transaction",id,t.description);save()}
// ===== REPORTING =====
const inUnit=l=>S.unit==="all"||l.business_unit_id===S.unit;
function bal(f){const m={};db.journal_lines.filter(f).forEach(l=>{const a=m[l.account_id]??={d:0,c:0};a.d+=l.debit;a.c+=l.credit});return m}
const net=(a,m)=>{const x=m[a._id]||{d:0,c:0};return["asset","expense"].includes(a.type)?x.d-x.c:x.c-x.d};
const balAll=()=>memo("all",()=>bal(()=>true)),balU=u=>u==="all"?balAll():memo("u:"+u,()=>bal(l=>l.business_unit_id===u));
const plU=()=>memo("plu",()=>{const m={};db.journal_lines.forEach(l=>{if(!cur(l))return;const t=acc(l.account_id).type,x=m[l.business_unit_id||""]??={r:0,e:0};if(t==="revenue")x.r+=l.credit-l.debit;else if(t==="expense")x.e+=l.debit-l.credit});return m});
function pl(f){let r=0,e=0;db.journal_lines.filter(l=>cur(l)&&f(l)).forEach(l=>{const t=acc(l.account_id).type;if(t==="revenue")r+=l.credit-l.debit;if(t==="expense")e+=l.debit-l.credit});return{r,e,p:r-e}}
