// ===== PERDAGANGAN PD8 (v1.1.304): impor produk dan stok awal dari CSV, data contoh toko desa setahun =====
// CSV: nama;kode;satuan;kategori;harga_beli;harga_jual;stok_min;stok_awal (pemisah koma atau titik koma, baris judul opsional).
// Data contoh memakai unit sendiri (UNIT-DGDEMO) sehingga unit lain tidak tersentuh; dihapus utuh dengan satu tombol.
let DG_BULK=false;
const DG_IMP_HDR=["nama","kode","satuan","kategori","harga_beli","harga_jual","stok_min","stok_awal"];
function dgCsvGrid(t){t=String(t||"").replace(/^﻿/,"");const ls=t.split(/\r?\n/).filter(l=>l.trim());if(!ls.length)return[];const d=(ls[0].match(/;/g)||[]).length>(ls[0].match(/,/g)||[]).length?";":",";
 const sp=l=>{const o=[];let c="",q=false;for(let i=0;i<l.length;i++){const h=l[i];if(q){if(h==='"'){if(l[i+1]==='"'){c+='"';i++}else q=false}else c+=h}else if(h==='"')q=true;else if(h===d){o.push(c.trim());c=""}else c+=h}o.push(c.trim());return o};return ls.map(sp)}
function dgImpParse(t,un,d){const G=dgCsvGrid(t);if(!G.length)throw Error("berkas kosong");let off=1;if(/^(nama|name|produk)/i.test(G[0][0])){G.shift();off=2}
 const ex=db.products.filter(p=>p.unit_id===un),names=new Set(ex.map(p=>String(p.name).toLowerCase())),codes=new Set(ex.map(p=>String(p.code||"").toLowerCase()).filter(Boolean)),rows=[],err=[];let dup=0;
 const num=(s,empty)=>{s=String(s||"").trim();if(s==="")return empty;const n=+pn(s);return isNaN(n)?NaN:n};
 G.forEach((r,i)=>{const ln=i+off,name=(r[0]||"").trim();if(!name){err.push("Baris "+ln+": nama kosong");return}
  const code=(r[1]||"").trim(),hb=num(r[4],0),hj=num(r[5],NaN),mn=num(r[6],0),aw=num(r[7],0);
  if(!(hj>0)){err.push("Baris "+ln+" ("+name+"): harga_jual harus lebih dari 0");return}if(!(hb>=0)){err.push("Baris "+ln+" ("+name+"): harga_beli tidak valid");return}if(!(mn>=0)){err.push("Baris "+ln+" ("+name+"): stok_min tidak valid");return}
  if(!(aw>=0)){err.push("Baris "+ln+" ("+name+"): stok_awal tidak valid");return}if(aw>0&&!(hb>0)){err.push("Baris "+ln+" ("+name+"): stok_awal butuh harga_beli lebih dari 0");return}
  if(names.has(name.toLowerCase())||(code&&codes.has(code.toLowerCase()))){dup++;return}names.add(name.toLowerCase());if(code)codes.add(code.toLowerCase());
  rows.push({name,code,unit:(r[2]||"").trim()||"pcs",category:(r[3]||"").trim(),cost:hb,price:hj,min_stock:mn,awal:aw})});
 return{rows,err,dup}}
function dgImpMake(r,un,d){const codes=db.products.map(p=>p.code);const code=r.code||seqCode("DGP",codes);
 const p={_id:uid("PRD"),unit_id:un,name:r.name,code,unit:r.unit,category:r.category,cost:r.cost,price:r.price,min_stock:r.min_stock,revenue_account:"ACC4300",status:"aktif"};db.products.push(p);
 if(r.awal>0){const val=Math.round(r.awal*r.cost);if(val>0){const t=post({type:"stok_awal",date:d,unit:un,desc:"Stok awal "+p.name+" ("+qf(r.awal)+" "+p.unit+")",lines:[{acc:"ACC1500",d:val},{acc:"ACC3100",c:val}]});
  (db.stock_moves=db.stock_moves||[]).push({_id:uid("STK"),product_id:p._id,unit_id:un,date:d,kind:"awal",qty:qf3(r.awal),cost:r.cost,value:val,transaction_id:t._id,note:"Stok awal",status:"ok"})}}
 return p}
function dgImpor(inp){if(noPerm("dagang.kelola"))return;const f=inp.files&&inp.files[0];if(!f)return;inp.value="";
 f.text().then(t=>{try{if(!modOn("dagang"))throw Error("Modul Perdagangan belum aktif");const un=S.dgimu&&dgUnits().some(u=>u._id===S.dgimu)?S.dgimu:(dgScope()[0]||{})._id,d=S.dgimd||today();if(!un)throw Error("Belum ada unit Perdagangan");
  if(!/^\d{4}-\d{2}-\d{2}$/.test(d))throw Error("Tanggal stok awal tidak valid");const P=dgImpParse(t,un,d);if(!P.rows.length)throw Error("tidak ada produk baru"+(P.dup?" ("+P.dup+" sudah ada)":"")+(P.err.length?"; "+P.err[0]:""));
  if(P.rows.some(r=>r.awal>0)&&closed(d))throw Error("Periode "+d.slice(0,7)+" sudah ditutup; pilih tanggal stok awal lain");
  S.dgimp={...P,fn:f.name,un,d};askC("dgImp","")}catch(e){S.dgimp=null;S.msg="⚠ Impor gagal: "+e.message;render()}})}
function dgImpGo(){const P=S.dgimp;if(!P||noPerm("dagang.kelola"))return;try{negAny();if(P.rows.some(r=>r.awal>0)&&closed(P.d))throw Error("Periode "+P.d.slice(0,7)+" sudah ditutup");
 DG_BULK=true;let n=0,nv=0;try{P.rows.forEach(r=>{dgImpMake(r,P.un,P.d);n++;nv+=Math.round(r.awal*r.cost)})}finally{DG_BULK=false}
 audit("create","product",P.un,n+" produk dari CSV "+P.fn);save();S.msg=n+" produk diimpor"+(nv?" dengan stok awal senilai Rp "+fm(nv):"")+(P.dup?" · "+P.dup+" dilewati (sudah ada)":"")+(P.err.length?" · "+P.err.length+" baris bermasalah dilewati":"");S.dgimp=null}catch(e){S.msg="⚠ "+e.message}render()}
function dgImpTpl(){try{const t=["nama","kode","satuan","kategori","harga_beli","harga_jual","stok_min","stok_awal"].join(",")+"\r\n"+'"Beras 10 kg",BRS10,karung,Sembako,120000,135000,5,20\r\n"Gula pasir 1 kg",,kg,Sembako,14000,16000,10,30\r\n';
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["﻿"+t],{type:"text/csv"}));a.download="templat-impor-produk.csv";a.click();S.msg="Templat CSV diunduh"}catch(e){S.msg="⚠ "+e.message}render()}
function dgImpSet(k,v){S[k]=v;render()}
// ----- data contoh -----
const dgDemoUnit=()=>db.business_units.find(u=>u._id==="UNIT-DGDEMO");
function dgDemoIsi(){const sv={c:S.dgjc,h:S.dgjh,bc:S.dgbc,bh:S.dgbh};try{if(noPerm("dagang.kelola"))return;negAny();if(!modOn("dagang"))throw Error("Aktifkan modul Perdagangan dulu");
 if(dgDemoUnit()||(db.meta&&db.meta.dagang_demo))throw Error("Data contoh toko sudah ada; hapus dulu bila ingin membuat ulang");
 const kas=db.cash_accounts.find(isAct);if(!kas)throw Error("Belum ada kas/bank aktif");const T=today();let y=+T.slice(0,4),m=+T.slice(5,7)-11;while(m<1){m+=12;y--}const start=y+"-"+String(m).padStart(2,"0")+"-01";
 for(let a=start;a<=T;a=dAdd(a.slice(0,7)+"-28",5).slice(0,7)+"-01")if(closed(a))throw Error("Periode "+a.slice(0,7)+" sudah ditutup; data contoh setahun tidak dapat dibuat");
 let sd=20261017;const R=()=>{sd|=0;sd=sd+0x6D2B79F5|0;let t=Math.imul(sd^sd>>>15,1|sd);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296},ri=(a,b)=>a+Math.floor(R()*(b-a+1));
 const code=["TKC","TKD","DGC"].find(c=>!db.business_units.some(u=>u.code===c))||"TKC"+Date.now()%1000;
 DG_BULK=true;const un="UNIT-DGDEMO";
 db.business_units.push({_id:un,code,name:"Toko Desa Contoh",type:"dagang",status:"aktif"});
 const CU=["Pak Wayan","Bu Ketut","Pak Made","Bu Nyoman","Pak Komang"].map((n,i)=>({_id:"PTY-DGD-C"+(i+1),type:"pelanggan",name:n,phone:"",address:"Dusun "+(i+1),status:"aktif"})),SU=["CV Sumber Tani","UD Makmur Jaya"].map((n,i)=>({_id:"PTY-DGD-S"+(i+1),type:"pemasok",name:n,phone:"",address:"",status:"aktif"}));
 db.parties.push(...CU,...SU);db.meta=db.meta||{};db.meta.dagang_demo={unit:un,parties:[...CU,...SU].map(p=>p._id)};
 post({type:"in",date:start,unit:un,desc:"Modal awal toko contoh",lines:[{acc:kas.account_id,d:60000000},{acc:"ACC3100",c:60000000}]});
 const CAT=[["Beras 10 kg","karung","Sembako",120000,135000,5,25],["Gula pasir 1 kg","kg","Sembako",14000,16000,10,60],["Minyak goreng 1 L","botol","Sembako",15000,17500,10,60],["Telur ayam","kg","Sembako",26000,29000,8,40],["Mie instan","pcs","Sembako",2900,3500,40,300],["Kopi sachet","renteng","Sembako",9000,11000,10,60],["Sabun mandi","pcs","Kebutuhan rumah",3000,4000,20,100],["Detergen 800 g","bungkus","Kebutuhan rumah",16000,19000,8,40],["Pupuk Urea 50 kg","karung","Pertanian",280000,310000,4,20],["Pupuk NPK 50 kg","karung","Pertanian",400000,440000,3,15],["Benih jagung 1 kg","kg","Pertanian",70000,85000,5,20],["Obat hama 500 ml","botol","Pertanian",60000,75000,4,20]];
 const PR=CAT.map(([name,unit,category,cost,price,min,tg])=>({...dgImpMake({name,code:"",unit,category,cost,price,min_stock:min,awal:Math.round(tg*0.6)},un,start),tg}));
 const pend=[],ppend=[];let ns=0,np=0,bad=0;
 const pay1=(x,d)=>{const o=owedS(x);if(o<=.005||d<x.date)return;const t=post({type:"sale_pay",date:d,unit:un,desc:"Pembayaran "+x.sale_number+" – "+dgCustNm(x.party_id),lines:[{acc:kas.account_id,d:o},{acc:"ACC1400",c:o}]});db.payments.push({_id:uid("PAY"),sale_id:x._id,date:d,amount:o,cash_id:kas._id,transaction_id:t._id,status:"posted",...byN()})},
  payB=(b,d)=>{const o=dgOwed(b);if(o<=0)return;const t=post({type:"beli_bayar",date:d,unit:un,desc:"Bayar utang "+b.no,lines:[{acc:"ACC2100",d:o},{acc:kas.account_id,c:o}]});(b.pays=b.pays||[]).push({_id:uid("PBY"),date:d,amount:o,cash_id:kas._id,transaction_id:t._id,status:"ok"})};
 let bi=0;
 for(let d=start;d<=T;d=dAdd(d,1)){
  pend.forEach(z=>{if(!z.done&&z.at<=d){z.done=1;pay1(z.x,d)}});ppend.forEach(z=>{if(!z.done&&z.at<=d){z.done=1;payB(z.b,d)}});
  if(d.slice(8)==="02"){const C=PR.filter(p=>dgQty(p._id)<p.tg*0.7).map(p=>({p:p._id,q:Math.max(1,Math.round(p.tg-dgQty(p._id))),c:Math.round(p.cost*(0.97+R()*0.06)/100)*100}));
   if(C.length){const cr=bi%3!==0;S.dgbc=C;S.dgbh={d,t:cr?"credit":"cash",k:kas._id,v:"PTY-DGD-S"+(1+bi%2),due:"30"};const n0=db.purchases.length;dgbSave();bi++;if(db.purchases.length>n0){np++;const b=db.purchases[db.purchases.length-1];if(cr)ppend.push({b,at:dAdd(d,ri(20,35))})}else bad++}}
  if(R()<0.12)continue;
  for(let k=ri(1,3);k>0;k--){const L=[],used=new Set();for(let j=ri(1,3);j>0;j--){const p=PR[ri(0,PR.length-1)];if(used.has(p._id))continue;used.add(p._id);const av=dgQty(p._id),mx=p.unit==="pcs"?6:p.price>100000?2:4,q=Math.min(ri(1,mx),Math.floor(av));if(q>=1)L.push({p:p._id,q,h:p.price})}
   if(!L.length)continue;const cr=R()<0.2;S.dgjc=L;S.dgjh={d,t:cr?"credit":"cash",k:kas._id,c:cr?CU[ri(0,4)]._id:(R()<0.3?CU[ri(0,4)]._id:"")};const n0=db.sales.length;dgjSave();
   if(db.sales.length>n0){ns++;const x=db.sales[db.sales.length-1];if(cr&&R()<0.97)pend.push({x,at:dAdd(d,ri(7,50))})}else bad++}}
 db.meta.dagang_demo.n={sales:ns,purchases:np};DG_BULK=false;audit("create","unit",un,"Data contoh toko: "+ns+" penjualan, "+np+" pembelian");save();
 S.msg="Data contoh toko dibuat: "+ns+" penjualan dan "+np+" pembelian setahun"+(bad?" ("+bad+" dilewati)":"")}catch(e){DG_BULK=false;S.msg="⚠ "+e.message;if(dgDemoUnit()&&!(db.meta.dagang_demo&&db.meta.dagang_demo.n)){try{dgDemoDel(1)}catch(_){}}}finally{DG_BULK=false;S.dgjc=sv.c;S.dgjh=sv.h;S.dgbc=sv.bc;S.dgbh=sv.bh}render()}
function dgDemoDel(quiet){try{if(!quiet&&noPerm("dagang.kelola"))return;const un="UNIT-DGDEMO",M=db.meta&&db.meta.dagang_demo;if(!dgDemoUnit()&&!M)throw Error("Tidak ada data contoh toko");
 const rm=(k,f)=>{const a=db[k];if(!a)return;for(let i=a.length-1;i>=0;i--)if(f(a[i]))a.splice(i,1)};
 const tx=new Set(db.transactions.filter(t=>t.business_unit_id===un).map(t=>t._id)),sl=new Set(db.sales.filter(s=>s.unit_id===un).map(s=>s._id));
 rm("journal_lines",l=>l.business_unit_id===un||tx.has(l.transaction_id));rm("journal_entries",e=>tx.has(e.transaction_id));rm("transactions",t=>tx.has(t._id));
 rm("payments",p=>sl.has(p.sale_id));rm("sale_items",i=>sl.has(i.sale_id));rm("sales",s=>sl.has(s._id));rm("purchases",b=>b.unit_id===un);rm("stock_moves",m=>m.unit_id===un);rm("products",p=>p.unit_id===un);
 const ps=new Set((M&&M.parties)||[]);rm("parties",p=>ps.has(p._id));rm("business_units",u=>u._id===un);if(db.meta)delete db.meta.dagang_demo;
 audit("delete","unit",un,"Data contoh toko dihapus");save();if(!quiet)S.msg="Data contoh toko dihapus"}catch(e){if(!quiet)S.msg="⚠ "+e.message}render()}
// ----- kartu di sub-tab Data -----
function dgImpCard(){if(!can("dagang.kelola"))return"";const us=dgUnits(),demo=dgDemoUnit(),P=S.dgimp;
 return dcard("Impor produk dari CSV","Kolom: nama, kode, satuan, kategori, harga_beli, harga_jual, stok_min, stok_awal",`<p class="k">Produk yang namanya atau kodenya sudah ada dilewati. Stok awal dijurnal Debit 1500 Persediaan, Kredit 3100 Modal pada tanggal di bawah.</p><div class="fl">${us.length>1?`<select aria-label="Unit tujuan impor" onchange="dgImpSet('dgimu',this.value)">${opt(us,u=>[u._id,u.name],S.dgimu||(dgScope()[0]||{})._id)}</select>`:""}<input type="date" style="max-width:11rem" aria-label="Tanggal stok awal" value="${esc(S.dgimd||today())}" onchange="S.dgimd=this.value"><label class="b" tabindex="0">Pilih berkas CSV<input type="file" class="uh" accept=".csv,text/csv,text/plain" hidden onchange="dgImpor(this)"></label><button class="b s" onclick="dgImpTpl()">Unduh templat</button></div>`,"")
 +dcard("Data contoh toko desa","Satu tahun penjualan, pembelian, piutang, dan utang untuk mencoba modul",demo?`<p class="k">Unit <b>${esc(demo.name)}</b> sudah ada. Menghapusnya membuang semua transaksi, produk, dan pihak contoh; unit lain tidak berubah.</p><div class="fl"><button class="b s" onclick="askC('dgDemoDel','')">Hapus data contoh</button></div>`:`<p class="k">Membuat unit Perdagangan baru bernama Toko Desa Contoh dengan 12 produk, 5 pelanggan, 2 pemasok, dan transaksi 12 bulan terakhir. Unit dan data Anda yang lain tidak diubah, dan semuanya bisa dihapus sekali klik.</p><div class="fl"><button class="b" onclick="askC('dgDemoIsi','')">Buat data contoh</button></div>`,"")}
