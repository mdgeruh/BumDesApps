// ===== MODUL PERDAGANGAN (v1.1.295, PD0): fondasi — saklar modul, tab per unit dagang, izin, akun HPP dan Selisih Stok =====
// Tahap ini belum mengubah stok atau jurnal. Penjualan dan produk unit dagang memakai tabel yang sama dengan Pamsimas (sales, sale_items, products, payments).
// Kode akun 5100 sudah dipakai Beban Gaji, maka HPP = 5900 dan Selisih Stok = 5910 (Persediaan 1500, Piutang 1400, Utang 2100, Penjualan 4300 sudah ada).
const DG_ACC=[["ACC5900","5900","Harga Pokok Penjualan","expense","ACC5000"],["ACC5910","5910","Selisih Stok","expense","ACC5000"],["ACC4390","4390","Diskon Penjualan","revenue","ACC4000"],["ACC5920","5920","Selisih Kas","expense","ACC5000"]],
 DG_NEED=[["ACC1500","Persediaan"],["ACC1400","Piutang Pelanggan"],["ACC2100","Utang Usaha"],["ACC4300","Pendapatan Penjualan"],["ACC5900","Harga Pokok Penjualan"],["ACC5910","Selisih Stok"],["ACC4390","Diskon Penjualan"]];
function dgSeedAcc(){if(!db.accounts)return 0;let n=0;DG_ACC.forEach(([id,code,name,type,par])=>{if(db.accounts.some(a=>a._id===id||a.code===code))return;db.accounts.push({_id:id,code,name,type,parent_id:db.accounts.some(a=>a._id===par)?par:null,status:"aktif"});n++});return n}
const dgUnits=()=>(db.business_units||[]).filter(u=>u.type==="dagang"&&isAct(u));
// unit yang tampil: filter unit global bila menunjuk satu unit dagang, selain itu semua unit dagang aktif
function dgScope(){const A=dgUnits();if(S.unit&&S.unit!=="all"){const u=A.find(x=>x._id===S.unit);if(u)return[u]}return A}
const dgIds=()=>new Set(dgScope().map(u=>u._id)),
 dgSales=()=>{const I=dgIds();return(db.sales||[]).filter(s=>I.has(s.unit_id)&&s.status==="posted")},
 dgProds=all=>{const I=dgIds();return(db.products||[]).filter(p=>I.has(p.unit_id)&&(all||isAct(p)))};
const dgRow=(t,s,r,rs)=>`<div class="upr"><span class="upm"><b>${t}</b><small>${s||""}</small></span><span class="upa">${r?`<b>${r}</b>`:""}${rs?`<small>${rs}</small>`:""}</span></div>`;
const dgNone=()=>dcard("Belum ada unit Perdagangan","Modul aktif, unit belum dibuat",`<p class="k">Buat unit usaha berjenis Perdagangan (toko desa, sembako, pupuk dan bibit, atau sejenisnya) di Master > Unit Usaha.</p><button class="b" onclick="goS('mst',{mt:'unit'});mdOpen('u','')">Tambah unit Perdagangan</button>`,"dc0");
function vDagang(){const U=dgScope();
 if(!U.length)return`<h2>Perdagangan</h2>${dgNone()}`;
 return dgSubT(dgRing(U)+dgKasir(U)+dgJual(U)+dgPiut(U)+dgStok(U)+dgBeli(U)+dgKoreksi(U)+dgLap(U)+dgData(U),"dgv",[["ringkasan","Ringkasan",null],["kasir","Kasir","<h2>Kasir</h2>"],["jual","Penjualan","<h2>Penjualan</h2>"],["piutang","Piutang","<h2>Piutang Pelanggan</h2>"],["stok","Stok","<h2>Stok Barang</h2>"],["beli","Pembelian","<h2>Pembelian</h2>"],["koreksi","Koreksi","<h2>Opname dan Retur</h2>"],["laporan","Laporan","<h2>Laporan Perdagangan</h2>"],["data","Data","<h2>Data Perdagangan</h2>"]])}
function dgRing(U){const S2=dgSales(),m=today().slice(0,7),bl=S2.filter(s=>String(s.date).startsWith(m)),tot=bl.reduce((a,s)=>a+s.total,0),pi=S2.reduce((a,s)=>a+owedS(s),0);
 const kv=(k,v)=>`<div class="kv"><span class="k">${k}</span><b>${v}</b></div>`;
 return`<h2>Ringkasan Perdagangan</h2>${dcard("Unit dagang",U.map(u=>esc(u.name)).join(", "),`<div class="kvg">${kv("Unit aktif",U.length)}${kv("Produk aktif",dgProds().length)}${kv("Nilai persediaan",rp(dgProds(1).reduce((a,p)=>a+dgVal(p._id),0)))}${kv("Utang usaha",rp(dgPurch().reduce((a,b)=>a+dgOwed(b),0)))}${kv("Stok menipis atau habis",dgProds().filter(p=>dgStat(p)).length+" produk")}${kv("Penjualan bulan ini",bl.length+" nota · "+rp(tot))}${kv("Laba kotor bulan ini",rp(bl.reduce((a,s)=>a+s.total-(s.hpp||0),0)))}${kv("Piutang pelanggan",rp(pi))}</div>`,"")}
${dgRingPlus()}
`}
function dgStok(U){const q=(S.dgq||"").trim().toLowerCase(),L=dgProds(1).filter(p=>!q||(p.name+" "+(p.code||"")+" "+(p.category||"")).toLowerCase().includes(q)).sort((a,b)=>String(a.name).localeCompare(String(b.name))),n=S.lim||30;
 const rows=L.slice(0,n).map(p=>{const k=dgQty(p._id),st=dgStat(p),bd=st?`<span class="bdg ${st[0]}">${st[1]}</span>`:"";
  return`<button class="upr" onclick="mdOpen('dgk','${p._id}')"><span class="upm"><b>${esc(p.name)}</b><small>${esc(p.code||"-")} · ${esc(p.category||"Tanpa kategori")} · ${esc((U.find(u=>u._id===p.unit_id)||{}).name||"")}</small></span><span class="upa"><b>${qf(k)} ${esc(p.unit||"")}</b><small>${rp(dgVal(p._id))} · jual ${rp(p.price)}</small>${bd}</span></button>`}).join("");
 return`<h2>Stok Barang</h2><div class="fl"><button class="b ad" onclick="mdOpen('dgp','')">${ic("plus")}<span>Produk baru</span></button></div>${dcard("Produk unit dagang",L.length+" produk"+(q?" cocok":""),`<div class="fl"><input type="search" placeholder="Cari nama, kode, kategori…" aria-label="Cari produk" value="${esc(S.dgq||"")}" onchange="S.dgq=this.value;S.lim=0;render()"></div>`+(L.length?`<div class="upl">${rows}</div>`+(L.length>n?`<button class="b s" onclick="S.lim=${n+30};render()">Muat lebih banyak</button>`:"")+`<p class="k">Nilai stok memakai harga beli rata-rata bergerak. Stok bertambah lewat stok awal dan pembelian, berkurang lewat penjualan.</p>`:`<p class="k">Belum ada produk. Tekan Produk baru, lalu isi stok awal dari rincian produk.</p>`),"")}${dgExpCard()}`}
function dgData(U){const A=DG_NEED.map(([id,n])=>{const a=(db.accounts||[]).find(x=>x._id===id);return dgRow(esc(n),"Akun "+esc(id.slice(3)),"",a?`<span class="bdg ok">Ada</span>`:`<span class="bdg wr">Belum ada</span>`)}).join("");
 return`<h2>Data Perdagangan</h2>${dcard("Unit dagang",U.length+" unit",`<div class="upl">${U.map(u=>dgRow(esc(u.name),"Kode "+esc(u.code),(db.transactions||[]).filter(t=>t.business_unit_id===u._id).length+" transaksi","")).join("")}</div>`,"")}${dgCocok(U)}${dgImpCard()}${dcard("Akun yang dipakai modul","Persediaan, piutang, utang, penjualan, HPP, selisih stok",`<div class="upl">${A}</div><p class="k">Akun HPP (5900) dan Selisih Stok (5910) dibuat otomatis saat modul diaktifkan. Pembukuan memakai mesin akuntansi bersama; tidak ada tabel akuntansi baru.</p>`,"")}`}

// ===== PD1: produk dagang, stok awal, kartu stok (rata-rata bergerak, satu gudang, satu tingkat harga) =====
// stock_moves: {product_id, unit_id, date, kind:"awal", qty (bertanda: + masuk, − keluar), cost (per satuan), value, transaction_id, status}
const qf3=n=>Math.round(n*1000)/1000,
 dgMoves=pid=>(db.stock_moves||[]).filter(m=>m.product_id===pid&&m.status!=="void"),
 dgQty=pid=>qf3(dgMoves(pid).reduce((a,m)=>a+m.qty,0)),
 dgVal=pid=>Math.round(dgMoves(pid).reduce((a,m)=>a+m.value,0)),
 dgStat=p=>{const k=dgQty(p._id);return k<=0?["ng","Habis"]:(p.min_stock>0&&k<=p.min_stock?["wr","Menipis"]:null)};
function dgInvBal(U){const I=new Set((U||dgScope()).map(u=>u._id)),a=(db.accounts||[]).find(x=>x._id==="ACC1500");if(!a)return 0;let d=0;db.journal_lines.forEach(l=>{if(l.account_id==="ACC1500"&&I.has(l.business_unit_id))d+=l.debit-l.credit});return Math.round(d)}
function dgCocok(U){const sm=Math.round(dgProds(1).reduce((a,p)=>a+dgVal(p._id),0)),bk=dgInvBal(U),ok2=sm===bk;
 return dcard("Kecocokan persediaan","Nilai stok dibandingkan dengan buku besar",`<div class="kvg"><div class="kv"><span class="k">Nilai stok (kartu stok)</span><b>${rp(sm)}</b></div><div class="kv"><span class="k">Saldo akun 1500 Persediaan (unit dagang)</span><b>${rp(bk)}</b></div></div><p class="k"><span class="bdg ${ok2?"ok":"wr"}">${ok2?"Cocok":"Selisih "+Math.abs(sm-bk).toLocaleString("id-ID")}</span> ${ok2?"Kartu stok dan buku besar sama.":"Periksa jurnal persediaan yang dicatat di luar menu Perdagangan (mis. jurnal manual)."}</p>`,"")}
function dgProdSave(){try{negAny();const v=i=>$("#"+i).value.trim(),e=db.products.find(x=>x._id===S.edgp),b=v("dp-b")?+pn(v("dp-b")):0,h=+pn(v("dp-h")),m=v("dp-m")?+pn(v("dp-m")):0,pg=v("dp-g")?+pn(v("dp-g")):0,pa=v("dp-a")?+pn(v("dp-a")):0;
 if(!modOn("dagang"))throw Error("Modul Perdagangan belum aktif");
 if(!v("dp-n"))throw fe("dp-n","Nama produk wajib");
 const uid2=e&&dgMoves(e._id).length?e.unit_id:v("dp-u");if(!uid2||!db.business_units.some(u=>u._id===uid2&&u.type==="dagang"))throw fe("dp-u","Pilih unit usaha berjenis Perdagangan");
 if(!(h>0))throw fe("dp-h","Harga jual harus lebih dari 0");if(!(b>=0))throw fe("dp-b","Harga beli tidak boleh negatif");if(!(m>=0))throw fe("dp-m","Stok minimum tidak boleh negatif");if(!(pg>=0))throw fe("dp-g","Harga grosir tidak valid");if(!(pa>=0))throw fe("dp-a","Harga anggota tidak valid");
 const code=v("dp-c")||(e&&e.code)||seqCode("DGP",db.products.map(p=>p.code));
 if(db.products.some(p=>p.code===code&&p._id!==(e&&e._id)))throw fe("dp-c","Kode "+code+" sudah dipakai produk lain");
 const s2=v("dp-s2"),prr=v("dp-pr")?+pn(v("dp-pr")):0,ps=v("dp-ps")?+pn(v("dp-ps")):0;
 if(s2||prr){if(!s2)throw fe("dp-s2","Isi satuan eceran");if(!(prr>=2&&Number.isInteger(prr)&&1000%prr===0))throw fe("dp-pr","Isi per satuan harus bilangan bulat 2 atau lebih yang habis membagi 1000 (2, 4, 5, 8, 10, 20, 25, 40, 50, 100, ...)");if(s2.toLowerCase()===(v("dp-s")||"pcs").toLowerCase())throw fe("dp-s2","Satuan eceran harus berbeda dari satuan utama");if(!(ps>=0))throw fe("dp-ps","Harga eceran tidak valid")}
 const f={unit_id:uid2,name:v("dp-n"),code,unit:v("dp-s")||"pcs",category:v("dp-k"),cost:b,price:h,price_g:pg,price_a:pa,min_stock:m,revenue_account:"ACC4300",sub:s2&&prr?s2:"",per:s2&&prr?prr:0,price_s:s2&&prr?ps:0,trk:v("dp-x")==="1"};
 if(e){Object.assign(e,f);audit("update","product",e._id);S.msg="Produk diperbarui"}else{const x={_id:uid("PRD"),...f,status:"aktif"};db.products.push(x);audit("create","product",x._id,x.code+" "+x.name);S.msg="Produk ditambahkan; isi stok awalnya dari rincian produk"}
 save();okM()}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function dgProdTog(id){try{const x=db.products.find(q=>q._id===id);if(!x)throw Error("Produk tidak ditemukan");if(isAct(x)&&dgQty(id)>0)throw Error("Produk masih punya stok "+qf(dgQty(id))+" "+(x.unit||"")+"; stok harus nol sebelum dinonaktifkan");
 x.status=isAct(x)?"nonaktif":"aktif";audit(isAct(x)?"activate":"deactivate","product",id);save();S.msg=isAct(x)?"Produk diaktifkan":"Produk dinonaktifkan"}catch(e){S.msg="⚠ "+e.message}render()}
function dgStokAwal(){try{negAny();const p=db.products.find(x=>x._id===S.edgs);if(!p)throw Error("Produk tidak ditemukan");const v=i=>$("#"+i).value.trim(),d=v("ds-d"),q=+pn(v("ds-q")),c=+pn(v("ds-c")),ex=($("#ds-e")||{value:""}).value.trim();
 if(!modOn("dagang"))throw Error("Modul Perdagangan belum aktif");if(dgMoves(p._id).length)throw Error("Stok awal hanya dicatat sekali; koreksi selanjutnya lewat stok opname (tahap PD5)");
 if(!/^\d{4}-\d{2}-\d{2}$/.test(d))throw fe("ds-d","Tanggal wajib diisi");if(!(q>0))throw fe("ds-q","Jumlah stok harus lebih dari 0");if(!(c>0))throw fe("ds-c","Harga beli harus lebih dari 0");if(ex&&!/^\d{4}-\d{2}-\d{2}$/.test(ex))throw fe("ds-e","Tanggal kedaluwarsa tidak valid");
 const val=Math.round(q*c);if(!(val>0))throw fe("ds-c","Nilai stok terlalu kecil");
 const t=post({type:"stok_awal",date:d,unit:p.unit_id,desc:"Stok awal "+p.name+" ("+qf(q)+" "+(p.unit||"")+")",lines:[{acc:"ACC1500",d:val},{acc:"ACC3100",c:val}]});
 (db.stock_moves=db.stock_moves||[]).push({_id:uid("STK"),product_id:p._id,unit_id:p.unit_id,date:d,kind:"awal",qty:qf3(q),cost:c,value:val,transaction_id:t._id,note:"Stok awal",...(ex?{exp:ex}:{}),status:"ok"});
 p.cost=c;audit("create","stok",p._id,"Stok awal "+p.name+" "+qf(q));save();S.msg="Stok awal dicatat: "+qf(q)+" "+(p.unit||"")+" senilai Rp "+val.toLocaleString("id-ID");okM()}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function dgStokBatal(id){try{const p=db.products.find(x=>x._id===id);if(!p)throw Error("Produk tidak ditemukan");const M=dgMoves(id);if(M.length!==1||M[0].kind!=="awal")throw Error("Hanya stok awal yang belum ada mutasi lain yang dapat dibatalkan");
 const m=M[0];rev(m.transaction_id);m.status="void";audit("void","stok",id,"Batal stok awal "+p.name);save();S.msg="Stok awal dibatalkan; jurnal dibalik"}catch(e){S.msg="⚠ "+e.message}mdClose()}
MK.dgp="edgp";MK.dgs="edgs";MK.dgk="edgk";
MD.dgp=()=>{const e=db.products.find(x=>x._id===S.edgp),us=dgUnits(),lock=e&&dgMoves(e._id).length;
 return{t:EN(e,"Edit produk","Produk baru"),s:"dgProdSave()",y:EN(e,"Simpan perubahan","Tambah produk"),
  b:fld("dp-n","Nama produk",{value:e?e.name:"",req:1})+fld("dp-c","Kode (kosong = otomatis)",{value:e?e.code||"":"",a:' autocomplete="off" maxlength="20"'})
  +fld("dp-s","Satuan",{value:e?e.unit:"pcs",a:' list="dp-sl" autocomplete="off"'})+`<datalist id="dp-sl">${["pcs","kg","liter","sak","botol","bungkus","dus","karung","meter"].map(x=>`<option value="${x}">`).join("")}</datalist>`
  +fld("dp-k","Kategori (opsional)",{value:e?e.category||"":"",a:' list="dp-kl" autocomplete="off"'})+`<datalist id="dp-kl">${[...new Set(db.products.map(p=>p.category).filter(Boolean))].map(x=>`<option value="${esc(x)}">`).join("")}</datalist>`
  +fld("dp-b","Harga beli per satuan (Rp)",{type:"text",a:RPA,value:e&&e.cost?fm(e.cost):"",hint:"Acuan saja; nilai stok memakai harga beli saat stok masuk"})+fld("dp-h","Harga jual per satuan (Rp)",{type:"text",a:RPA,value:e?fm(e.price):"",req:1})
  +fld("dp-g","Harga grosir (opsional, Rp)",{type:"text",a:RPA,value:e&&e.price_g?fm(e.price_g):"",hint:"Kosong = memakai harga jual"})+fld("dp-a","Harga anggota (opsional, Rp)",{type:"text",a:RPA,value:e&&e.price_a?fm(e.price_a):""})
  +fld("dp-s2","Satuan eceran (opsional, mis. kg)",{value:e?e.sub||"":"",a:' autocomplete="off" maxlength="12"',hint:"Untuk dijual per bagian, mis. karung 50 kg dijual per kg di Kasir"})+fld("dp-pr","Isi per satuan utama (mis. 50)",{type:"text",a:' inputmode="numeric" autocomplete="off"',value:e&&e.per?String(e.per):""})+fld("dp-ps","Harga jual per satuan eceran (Rp, kosong = harga ÷ isi)",{type:"text",a:RPA,value:e&&e.price_s?fm(e.price_s):""})
  +fld("dp-x","Lacak kedaluwarsa",{t:"select",opts:opt([["0","Tidak"],["1","Ya (isi tanggal saat beli atau stok awal)"]],x=>x,e&&e.trk?"1":"0")})
  +fld("dp-m","Stok minimum (peringatan menipis)",{type:"text",a:' inputmode="decimal" autocomplete="off"',value:e?String(e.min_stock||0).replace(".",","):"0"})
  +fld("dp-u","Unit usaha",{t:"select",a:lock?" disabled":"",opts:opt(us,u=>[u._id,u.name],e?e.unit_id:(dgScope()[0]||us[0]||{})._id),hint:lock?"Produk sudah punya mutasi stok; unit tidak dapat diubah":""})}};
MD.dgs=()=>{const p=db.products.find(x=>x._id===S.edgs);if(!p)return{t:"Stok awal",s:"mdClose()",y:"Tutup",b:"<p>Produk tidak ditemukan.</p>",nf:1};
 return{t:"Stok awal · "+esc(p.name),s:"dgStokAwal()",y:"Catat stok awal",b:`<p class="k">Dijurnal: Debit 1500 Persediaan, Kredit 3100 Modal BUMDes. Hanya sekali per produk.</p>`
  +fld("ds-d","Tanggal",{type:"date",value:today()})+fld("ds-q","Jumlah stok ("+esc(p.unit||"satuan")+")",{type:"text",a:' inputmode="decimal" autocomplete="off"',value:"",req:1})
  +fld("ds-c","Harga beli per satuan (Rp)",{type:"text",a:RPA,value:p.cost?fm(p.cost):"",req:1})+(p.trk?fld("ds-e","Kedaluwarsa (opsional)",{type:"date"}):"")}};
MD.dgk=()=>{const p=db.products.find(x=>x._id===S.edgk);if(!p)return{t:"Kartu stok",s:"mdClose()",y:"Tutup",b:"<p>Produk tidak ditemukan.</p>",nf:1};
 const M=dgMoves(p._id).sort((a,b)=>String(a.date).localeCompare(String(b.date))),k=dgQty(p._id);let run=0;
 const rows=M.map(m=>{run=qf3(run+m.qty);return`<div class="upr"><span class="upm"><b>${esc(m.note||m.kind)}</b><small>${esc(m.date)} · @ ${rp(m.cost)}</small></span><span class="upa"><b>${m.qty>0?"+":""}${qf(m.qty)}</b><small>saldo ${qf(run)}</small></span></div>`}).join(""),
  can2=!noPerm("dagang.kelola"),awal=!M.length;
 return{t:esc(p.name),s:"mdClose()",y:"Tutup",nf:1,b:`<div class="ldw"><div class="lds"><span class="bdg ${isAct(p)?"ok":"wr"}">${isAct(p)?"Aktif":"Nonaktif"}</span>${dgStat(p)?` <span class="bdg ${dgStat(p)[0]}">${dgStat(p)[1]}</span>`:""}</div>
  <div class="kvg"><div class="kv"><span class="k">Kode</span><b>${esc(p.code||"-")}</b></div><div class="kv"><span class="k">Kategori</span><b>${esc(p.category||"-")}</b></div><div class="kv"><span class="k">Stok</span><b>${qf(k)} ${esc(p.unit||"")}</b></div><div class="kv"><span class="k">Nilai stok</span><b>${rp(dgVal(p._id))}</b></div><div class="kv"><span class="k">Harga jual</span><b>${rp(p.price)}</b></div><div class="kv"><span class="k">Stok minimum</span><b>${qf(p.min_stock||0)}</b></div></div>
  <h3>Kartu stok</h3>${rows?`<div class="upl">${rows}</div>`:`<p class="k">Belum ada mutasi stok.</p>`}
  ${can2?`<div class="lda">${ib("edit","Edit","mdOpen('dgp','"+p._id+"')","s")}${ib("print","Harga beli","mdClose();mdOpen('dgh','"+p._id+"')","s")}${awal?ib("plus","Stok awal","mdOpen('dgs','"+p._id+"')","s"):""}${M.length===1&&M[0].kind==="awal"?ib("undo","Batalkan stok awal","askC('dgStokBatal','"+p._id+"')","s"):""}${ib(isAct(p)?"x":"check",isAct(p)?"Nonaktifkan":"Aktifkan","mdClose();dgProdTog('"+p._id+"')","s")}</div>`:""}</div>`}};
// PL1: lima kelompok (Ringkasan, Jual, Stok, Laporan, Data); kunci sub-tab (S.dgv) dan alamat tidak berubah
const DG_GRP=[["ringkasan","Ringkasan",["ringkasan"]],["jual","Jual",["kasir","jual","piutang"]],["stok","Stok",["stok","beli","koreksi"]],["laporan","Laporan",["laporan"]],["data","Data",["data"]]];
function dgSubT(H,_k,defs){const ix=defs.map(d=>d[2]?H.indexOf(d[2]):0);if(ix.some(x=>x<0))return H;
 const cur=defs.some(d=>d[0]===S.dgv)?S.dgv:defs[0][0],n=defs.findIndex(d=>d[0]===cur),g=DG_GRP.find(x=>x[2].includes(cur))||DG_GRP[0];(S.dgg=S.dgg||{})[g[0]]=cur;
 const go=k=>`S.dgv='${k}';S.lim=0;S.pl=null;render()`,
  gb=tabBar(DG_GRP.map(x=>[x[0],x[1]]),g[0],k=>`S.dgv=(S.dgg&&S.dgg['${k}'])||'${DG_GRP.find(x=>x[0]===k)[2][0]}';S.lim=0;S.pl=null;render()`),
  lb=g[2].length>1?`<div class="dgsb">${tabBar(defs.filter(d=>g[2].includes(d[0])).map(d=>[d[0],d[1]]),cur,go)}</div>`:"";
 return gb+lb+H.slice(ix[n],n+1<defs.length?ix[n+1]:H.length)}
// PL2: harga bertingkat, diskon, batas kredit
const dgPrice=(p,tr)=>tr==="grosir"&&p.price_g>0?p.price_g:tr==="anggota"&&p.price_a>0?p.price_a:p.price,
 DG_TIER=[["eceran","Eceran"],["grosir","Grosir"],["anggota","Anggota"]],
 dgLimit=pid=>{const s=db.settings||{},o=(s.dgLimit||{})[pid];return o!==undefined&&o!==""?+o:(+s.dgLimitAll||0)},
 dgCustOwed=pid=>Math.round(dgjAll().filter(x=>x.status==="posted"&&x.party_id===pid).reduce((a,x)=>a+owedS(x),0));
