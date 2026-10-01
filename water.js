// ===== UNIT AIR (v0.1.009): pelanggan, produk, penjualan tunai/kredit, piutang =====
const cust=id=>db.parties.find(p=>p._id===id)||{name:"Umum"};
const paidOf=x=>db.payments.filter(p=>p.sale_id===x._id&&p.status!=="voided").reduce((a,p)=>a+p.amount,0);
const owedS=x=>x.status!=="posted"||x.payment_type==="cash"?0:Math.round((x.total-paidOf(x))*100)/100;
const ferr=(e,m)=>{S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null;render()};
const isAct=x=>x.status!=="nonaktif",piu=id=>db.sales.filter(x=>x.party_id===id).reduce((a,x)=>a+owedS(x),0);
function savePel(){try{const n=$("#pl-n").value.trim();if(!n)throw fe("pl-n","Nama pelanggan wajib");const f={name:n,phone:$("#pl-p").value.trim(),address:$("#pl-a").value.trim()};
 if(dupP("pelanggan",n,f.phone,f.address,S.ep))throw fe("pl-n","Pelanggan dengan nama, telepon, dan alamat yang sama sudah ada");
 if(S.ep){Object.assign(db.parties.find(x=>x._id===S.ep),f);audit("update","party",S.ep);S.ep=null;S.msg="Data pelanggan diperbarui"}
 else{const x={_id:uid("PTY"),type:"pelanggan",...f,status:"aktif"};db.parties.push(x);audit("create","party",x._id);S.msg="Pelanggan ditambahkan"}save();clrF("#pl-n,#pl-p,#pl-a");okM()}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function togPel(id){try{const x=db.parties.find(q=>q._id===id);
 if(isAct(x)){if(piu(id)>0.005)throw Error("Pelanggan masih punya piutang Rp "+fm(piu(id))+"; selesaikan dulu");x.status="nonaktif";if(S.ep===id)S.ep=null;audit("deactivate","party",id);S.msg="Pelanggan dinonaktifkan"}
 else{x.status="aktif";audit("activate","party",id);S.msg="Pelanggan diaktifkan"}save()}catch(e){S.msg="⚠ "+e.message}render()}
function saveProd(){try{negAny();const v=i=>$("#"+i).value.trim(),h=+pn(v("pr-h"));if(!v("pr-n"))throw fe("pr-n","Nama produk wajib");if(!(h>0))throw fe("pr-h","Harga harus lebih dari 0");
 const f={unit_id:v("pr-u"),name:v("pr-n"),unit:v("pr-s")||"unit",price:h,revenue_account:v("pr-a")};
 if(S.epr){Object.assign(db.products.find(x=>x._id===S.epr),f);audit("update","product",S.epr);S.epr=null;S.msg="Produk diperbarui; berlaku untuk penjualan berikutnya"}
 else{const x={_id:uid("PRD"),...f,status:"aktif"};db.products.push(x);audit("create","product",x._id);S.msg="Produk ditambahkan"}save();clrF("#pr-n,#pr-s,#pr-h");okM()}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function togProd(id){const x=db.products.find(q=>q._id===id);x.status=isAct(x)?"nonaktif":"aktif";if(S.epr===id&&!isAct(x))S.epr=null;audit(isAct(x)?"activate":"deactivate","product",id);save();S.msg=isAct(x)?"Produk diaktifkan":"Produk dinonaktifkan";render()}
function jLine(){const v=i=>$("#"+i).value.trim(),p=db.products.find(x=>x._id===v("j-p")),q=+pn(v("j-q")),hr=v("j-h"),h=hr?+pn(hr):(p&&p.price);
 if(!p||!isAct(p))throw fe("j-p","Pilih produk aktif dulu (tambahkan di sub-tab Produk)");if(!(q>0))throw fe("j-q","Jumlah harus lebih dari 0");if(!(h>0))throw fe("j-h","Harga satuan harus lebih dari 0");
 const c0=(S.cart||[])[0],cu=c0&&(db.products.find(x=>x._id===c0.p)||{}).unit_id;
 if(cu&&p.unit_id!==cu)throw fe("j-p","Semua barang dalam satu penjualan harus dari unit yang sama ("+unitName(cu)+")");
 return{p:p._id,q,h}}
function jAdd(){try{const z=jLine();S.cart=(S.cart||[]).concat([z]);clrF("#j-q,#j-h");S.msg=""}catch(e){ferr(e);return}render()}
function jDel(i){(S.cart||[]).splice(i,1);render()}
function jual(){try{negAny();const v=i=>$("#"+i).value.trim(),d=v("j-d"),ty=v("j-t"),k=db.cash_accounts.find(c=>c._id===v("j-k"));
 if(!d)throw fe("j-d","Tanggal wajib diisi");
 const its=(S.cart||[]).slice();if(v("j-q")||!its.length)its.push(jLine());
 if(ty==="credit"&&!v("j-c"))throw fe("j-c","Penjualan kredit wajib memilih pelanggan");if(v("j-c")&&!isAct(cust(v("j-c"))))throw fe("j-c","Pelanggan nonaktif; aktifkan dulu atau pilih Umum");if(ty==="cash"&&!k)throw fe("j-k","Pilih kas/bank");
 const P=its.map(z=>({...z,pr:db.products.find(x=>x._id===z.p)})),sub=z=>Math.round(z.q*z.h*100)/100,tot=Math.round(P.reduce((a,z)=>a+sub(z),0)*100)/100,R={};
 P.forEach(z=>{R[z.pr.revenue_account]=(R[z.pr.revenue_account]||0)+sub(z)});
 const nm=P.map(z=>z.pr.name+" x"+z.q).join(", "),un=P[0].pr.unit_id,
 t=post({type:ty==="cash"?"sale_cash":"sale_credit",date:d,unit:un,desc:"Penjualan "+(nm.length>90?nm.slice(0,87)+"…":nm)+" – "+cust(v("j-c")).name,lines:[{acc:ty==="cash"?k.account_id:"ACC1400",d:tot}].concat(Object.entries(R).map(([a,c])=>({acc:a,c:Math.round(c*100)/100})))});
 const x={_id:uid("SAL"),sale_number:"JL-"+d.slice(0,4)+"-"+String(db.sales.length+1).padStart(4,"0"),unit_id:un,party_id:v("j-c")||null,date:d,payment_type:ty,total:tot,cash_id:ty==="cash"?k._id:null,transaction_id:t._id,status:"posted"};
 db.sales.push(x);P.forEach(z=>db.sale_items.push({_id:uid("SIT"),sale_id:x._id,product_id:z.p,qty:z.q,price:z.h,subtotal:sub(z)}));audit("sale","sale",x._id,P.length>1?P.length+" barang":undefined);save();S.cart=[];clrF("#j-q,#j-h");S.msg="Penjualan "+x.sale_number+" dicatat"}catch(e){ferr(e);return}render()}
const notaBtn=x=>x.status==="posted"&&!x.opening?ib("print","Nota","openDoc('"+(x.bill?"tagih":"jual")+"','"+x._id+"')","s"):"";
const itemsNote=x=>{const it=db.sale_items.filter(i=>i.sale_id===x._id);return it.slice(0,2).map(i=>esc(i.label||(db.products.find(p=>p._id===i.product_id)||{}).name||"")+" ×"+qf(i.qty)).join(", ")+(it.length>2?" +"+(it.length-2)+" lainnya":"")};
function cartHtml(){const c=S.cart||[];if(!c.length)return"";let t=0;
 const rows=c.map((z,i)=>{const pr=db.products.find(x=>x._id===z.p)||{},sb=Math.round(z.q*z.h*100)/100;t+=sb;return`<tr><td>${esc(pr.name)}</td><td class="n">${qf(z.q)} ${esc(pr.unit||"")}</td><td class="n">${rp(z.h)}</td><td class="n">${rp(sb)}</td><td>${ib("x","Hapus","jDel("+i+")","x")}</td></tr>`});
 return`<h2>Daftar barang (${c.length})</h2>${tbl(["Barang","#Jumlah","#Harga","#Subtotal",""],rows)}<p><b>Total: ${rp(t)}</b> · Unit ${esc(unitName((db.products.find(x=>x._id===c[0].p)||{}).unit_id))}. Isi barang lain lalu <i>Tambah ke daftar</i>, atau langsung <i>Simpan penjualan</i>.</p>`}
function terima(id){try{negAny();const x=db.sales.find(q=>q._id===id),d=$("#ar-d").value,k=db.cash_accounts.find(c=>c._id===$("#ar-k").value),o=owedS(x),raw=pn($("#ar-a").value||""),a=raw===""?o:+raw;
 if(!d)throw fe("ar-d","Tanggal wajib diisi");if(!k)throw fe("ar-k","Pilih kas/bank");if(d<x.date)throw fe("ar-d","Tanggal bayar tidak boleh sebelum tanggal penjualan");
 if(!(a>0))throw fe("ar-a","Jumlah harus lebih dari 0");if(a>o+.005)throw fe("ar-a","Melebihi sisa piutang (Rp "+fm(o)+")");
 const t=post({type:"sale_pay",date:d,unit:x.unit_id,desc:"Pembayaran "+x.sale_number+" – "+cust(x.party_id).name,lines:[{acc:k.account_id,d:a},{acc:"ACC1400",c:a}]});
 db.payments.push({_id:uid("PAY"),sale_id:x._id,date:d,amount:a,cash_id:k._id,transaction_id:t._id,status:"posted"});audit("receive","sale",id);save();clrF("#ar-a");S.msg="Pembayaran Rp "+fm(a)+" dicatat"}catch(e){ferr(e);return}render()}
function batalJual(id){try{const x=db.sales.find(q=>q._id===id);if(db.payments.some(p=>p.sale_id===id&&p.status!=="voided"))throw Error("Batalkan pembayaran piutang dulu");
 if(x.bill){const l=wRds(x.bill.conn_id).pop();if(l&&l.sale_id!==id)throw Error("Ada bacaan meter sesudahnya; batalkan tagihan atau ganti meter yang terbaru dulu")}
 rev(x.transaction_id);x.status="voided";if(x.bill)db.water_readings.forEach(r=>{if(r.sale_id===id)r.status="voided"});audit("void","sale",id);save();S.msg="Penjualan dibatalkan dengan jurnal pembalik"}catch(e){S.msg="⚠ "+e.message}render()}
function batalTerima(id){try{const y=db.payments.find(q=>q._id===id);rev(y.transaction_id);y.status="voided";audit("void","payment",id);save();S.msg="Pembayaran dibatalkan dengan jurnal pembalik"}catch(e){S.msg="⚠ "+e.message}render()}
function vAir(){const st=S.at||"baca",U=x=>S.unit==="all"||x.unit_id===S.unit,ss=db.sales.filter(U).sort((a,b)=>b.date.localeCompare(a.date)||b._id.localeCompare(a._id)),pel=db.parties.filter(p=>p.type==="pelanggan"),pr=db.products.filter(U),ops=ss.filter(x=>owedS(x)>0),eP=db.parties.find(x=>x._id===S.ep),eR=db.products.find(x=>x._id===S.epr),SN=x=>db.sales.find(q=>q._id===x)||{};
 const wcs=db.water_connections.filter(U),ktp=[["baca","Baca Meter",wcs.filter(c=>c.status==="aktif").length],["samb","Sambungan",wcs.length],["piutang","Piutang",ops.length],["tarif","Tarif",null],["jual","Penjualan Lain",ss.length],["pel","Pelanggan",pel.length],["prod","Produk",pr.length]];
 const bar=tabBar(ktp.map(([k,n,c])=>[k,c==null?n:n+" ("+c+")"]),st,k=>`S.at='${k}';S.lim=0;render()`),kas=opt(db.cash_accounts.filter(isAct),c=>[c._id,c.name]);
 const P={jual:`${cartHtml()}<div class="card"><label>Tanggal</label><input id="j-d" type="date" value="${today()}"><label>Produk / layanan</label><select id="j-p">${opt(pr.filter(isAct),p=>[p._id,p.name+" – Rp "+fm(p.price)+"/"+p.unit])}</select><label>Jumlah</label><input id="j-q" type="text" inputmode="decimal" autocomplete="off"><label>Harga satuan (Rp) — kosong = harga produk</label><input id="j-h" type="text" inputmode="numeric" autocomplete="off" oninput="fmtR(this)"><button class="b s" onclick="jAdd()">Tambah ke daftar</button><label>Cara bayar</label><select id="j-t"><option value="cash">Tunai</option><option value="credit">Kredit (piutang)</option></select><label>Pelanggan (wajib untuk kredit)</label><select id="j-c"><option value="">Umum</option>${opt(pel.filter(isAct),p=>[p._id,p.name])}</select><label>Kas/Bank (untuk tunai)</label><select id="j-k">${kas}</select><button class="b" onclick="jual()">Simpan penjualan</button></div>
<h2>Penjualan</h2>${tbl(["No","Tanggal","Pelanggan","Barang","Cara","#Total","Status",""],ss.slice(0,S.lim||PG).map(x=>{const it=db.sale_items.find(i=>i.sale_id===x._id)||{};return`<tr><td>${x.sale_number}</td><td>${x.date}</td><td>${esc(cust(x.party_id).name)}</td><td>${x.opening?"Saldo awal piutang":x.bill?billNote(x,1):itemsNote(x)}</td><td>${x.payment_type==="cash"?"Tunai":"Kredit"}</td><td class="n">${rp(x.total)}</td><td>${x.status==="voided"?"Batal":x.payment_type==="credit"?(owedS(x)>0?"Belum lunas":"Lunas"):"Lunas"}</td><td>${notaBtn(x)}${x.status==="posted"?ib("undo","Batalkan","askC('batalJual','"+x._id+"')","x"):""}</td></tr>`}))}${more(ss.length-Math.min(ss.length,S.lim||PG))}`,
 piutang:`<div class="card"><div class="k">Dipakai untuk Terima pembayaran</div><label>Tanggal bayar</label><input id="ar-d" type="date" value="${today()}"><label>Kas/Bank</label><select id="ar-k">${kas}</select><label>Jumlah (Rp) — kosong = lunasi sisa</label><input id="ar-a" type="text" inputmode="numeric" autocomplete="off" oninput="fmtR(this)"></div>
<h2>Piutang Pelanggan</h2>${ops.length?tbl(["No","Tanggal","Pelanggan","Keterangan","#Total","#Dibayar","#Sisa",""],ops.map(x=>`<tr><td>${x.sale_number}</td><td>${x.date}</td><td>${esc(cust(x.party_id).name)}</td><td>${x.bill?billNote(x):x.opening?"Saldo awal piutang":"Penjualan kredit"}</td><td class="n">${rp(x.total)}</td><td class="n">${rp(paidOf(x))}</td><td class="n">${rp(owedS(x))}</td><td>${ib("cash","Terima","terima('"+x._id+"')")}${notaBtn(x)}</td></tr>`)):`<p class="k">Tidak ada piutang.</p>`}
<h2>Riwayat Pembayaran</h2>${tbl(["Tanggal","No","Pelanggan","#Jumlah","Status",""],db.payments.filter(y=>U(SN(y.sale_id))).slice().reverse().slice(0,S.lim||PG).map(y=>`<tr><td>${y.date}</td><td>${SN(y.sale_id).sale_number}</td><td>${esc(cust(SN(y.sale_id).party_id).name)}</td><td class="n">${rp(y.amount)}</td><td>${y.status==="voided"?"Batal":"Diterima"}</td><td>${y.status==="posted"?ib("undo","Batalkan","askC('batalTerima','"+y._id+"')","x"):""}</td></tr>`))}`,
 pel:`<h2>Pelanggan</h2>${addB("Tambah pelanggan","pl")}${tbl(["Nama","Telepon","Alamat","#Piutang","Status",""],pel.map(p=>`<tr><td>${esc(p.name)}</td><td>${esc(p.phone)}</td><td>${esc(p.address||"")}</td><td class="n">${rp(piu(p._id))}</td><td>${isAct(p)?"Aktif":"Nonaktif"}</td><td>${ib("edit","Edit","openE('ep','"+p._id+"')","s")}${isAct(p)?ib("x","Nonaktifkan","togPel('"+p._id+"')","s"):ib("check","Aktifkan","togPel('"+p._id+"')","s")}</td></tr>`))}
`,
 prod:`<h2>Produk / Layanan</h2>${addB("Tambah produk","pr")}${tbl(["Nama","Unit usaha","Satuan","#Harga","Akun pendapatan","Status",""],pr.map(p=>`<tr><td>${esc(p.name)}</td><td>${esc(unitName(p.unit_id))}</td><td>${esc(p.unit)}</td><td class="n">${rp(p.price)}</td><td>${esc((acc(p.revenue_account)||{}).name||"")}</td><td>${isAct(p)?"Aktif":"Nonaktif"}</td><td>${ib("edit","Edit","openE('epr','"+p._id+"')","s")}${isAct(p)?ib("x","Nonaktifkan","togProd('"+p._id+"')","s"):ib("check","Aktifkan","togProd('"+p._id+"')","s")}</td></tr>`))}
`};
 const W={baca:vBaca,samb:vSamb,tarif:vTarif};return bar+(W[st]?W[st]():(P[st]||P.jual))}
// ===== UNIT AIR – LANGGANAN / PAMSIMAS (v0.1.024): sambungan & meter, tarif bertingkat, baca meter → tagihan bulanan =====
const addDays=(d,n)=>{const t=new Date(d+"T00:00:00Z");t.setUTCDate(t.getUTCDate()+n);return t.toISOString().slice(0,10)};
const airCfg=()=>db.settings.air||AIRDEF();
function hitungAir(u,c){c=c||airCfg();const bl=Math.max(u,+c.min_m3||0),rows=[];let pv=0,w=0;
 for(const t of c.tiers){const hi=t.upto==null?Infinity:+t.upto,q=Math.min(bl,hi)-pv;if(q>0){const v=Math.round(q*t.price);rows.push({q,price:+t.price,v});w+=v}pv=hi;if(bl<=hi)break}
 const ab=Math.round(+c.abon||0);return{usage:u,billed:bl,rows,water:w,abon:ab,total:w+ab}}
const wConn=id=>db.water_connections.find(c=>c._id===id)||{};
const wRds=id=>db.water_readings.filter(r=>r.conn_id===id&&r.status!=="voided");
const wPrev=id=>{const l=wRds(id).pop();return l?l.curr:(+wConn(id).initial||0)};
const wLastB=id=>wRds(id).filter(r=>r.kind==="baca").pop();
const billOf=(cid,per)=>db.sales.find(x=>x.bill&&x.bill.conn_id===cid&&x.bill.period===per&&x.status==="posted");
const arrears=cid=>db.sales.filter(x=>x.bill&&x.bill.conn_id===cid&&owedS(x)>0.005);
const billNote=(x,short)=>{const b=x.bill;if(!b)return"";if(short)return"Tagihan air "+b.period+" · "+qf(b.usage)+" m³";const late=owedS(x)>0.005&&b.due&&b.due<today();return"Air "+b.period+" · "+qf(b.usage)+" m³ · jatuh tempo "+b.due+(late?" ⚠ terlambat":"")};
const clrDr=p=>{if(S.dr)Object.keys(S.dr).forEach(k=>{if(k.startsWith(p))delete S.dr[k]});S.nsnap=1};
function bpChg(v){S.bp=v;clrDr("air|bm");render()}
function bmPrev(cid){const e=$("#bm_"+cid),h=$("#bm_"+cid+"-h");if(!e||!h)return;const raw=pn(e.value.trim());if(raw===""){h.textContent="";return}const cu=+raw,pv=wPrev(cid);
 if(!isFinite(cu)||cu<0){h.textContent="⚠ angka tidak valid";return}if(cu<pv){h.textContent="⚠ lebih kecil dari angka awal";return}const us=Math.round((cu-pv)*100)/100;h.textContent=qf(us)+" m³ → Rp "+fm(hitungAir(us).total)}
function terbitTagihan(){try{const per=$("#bm-p").value,d=$("#bm-d").value,cfg=airCfg(),todo=[];
 if(!/^\d{4}-\d{2}$/.test(per))throw fe("bm-p","Pilih bulan pemakaian");if(!d)throw fe("bm-d","Tanggal tagihan wajib diisi");
 if(d.slice(0,7)<per)throw fe("bm-d","Tanggal tagihan tidak boleh sebelum bulan pemakaian");if(closed(d))throw fe("bm-d","Periode "+d.slice(0,7)+" sudah ditutup");
 if((acc("ACC4200")||{}).status==="nonaktif")throw Error("Akun 4200 Pendapatan Air nonaktif");
 db.water_connections.filter(c=>c.status==="aktif"&&(S.unit==="all"||c.unit_id===S.unit)).forEach(c=>{const id="bm_"+c._id,e=$("#"+id),raw=e?pn(e.value.trim()):"";if(raw==="")return;
  const cu=+raw,pv=wPrev(c._id),lb=wLastB(c._id);
  if(!isFinite(cu)||cu<0)throw fe(id,c.meter_no+": angka meter tidak valid");
  if(billOf(c._id,per))throw fe(id,c.meter_no+" sudah ditagih untuk "+per);
  if(lb&&lb.period>=per)throw fe(id,c.meter_no+": bacaan terakhir sudah periode "+lb.period);
  if(cu<pv)throw fe(id,c.meter_no+": angka akhir lebih kecil dari angka awal ("+qf(pv)+"). Jika meter diganti, pakai Ganti meter di Sambungan");
  const us=Math.round((cu-pv)*100)/100,h=hitungAir(us,cfg);if(h.total<=0)throw fe(id,c.meter_no+": tagihan Rp 0 — atur tarif/abonemen dulu");todo.push({c,cu,pv,us,h})});
 if(!todo.length)throw fe("bm-d","Isi angka meter akhir minimal satu sambungan");
 let sum=0;todo.forEach(({c,cu,pv,us,h})=>{const nm=cust(c.party_id).name,t=post({type:"sale_credit",date:d,unit:c.unit_id,desc:"Tagihan air "+per+" – "+nm+" ("+c.meter_no+")",lines:[{acc:"ACC1400",d:h.total},{acc:"ACC4200",c:h.total}]}),
  seq=db.sales.filter(q=>q.bill&&q.bill.period===per).length+1,
  x={_id:uid("SAL"),sale_number:"TA-"+per.replace("-","")+"-"+String(seq).padStart(3,"0"),unit_id:c.unit_id,party_id:c.party_id,date:d,payment_type:"credit",total:h.total,cash_id:null,transaction_id:t._id,status:"posted",
   bill:{conn_id:c._id,meter:c.meter_no,period:per,prev:pv,curr:cu,usage:us,billed:h.billed,water:h.water,abon:h.abon,rows:h.rows,due:addDays(d,+cfg.due_days||0)}};
  db.sales.push(x);
  if(h.water>0)db.sale_items.push({_id:uid("SIT"),sale_id:x._id,product_id:null,label:"Pemakaian air",unit:"m³",qty:h.billed,price:h.water/h.billed,subtotal:h.water});
  if(h.abon>0)db.sale_items.push({_id:uid("SIT"),sale_id:x._id,product_id:null,label:"Beban tetap",unit:"bulan",qty:1,price:h.abon,subtotal:h.abon});
  db.water_readings.push({_id:uid("WRD"),conn_id:c._id,kind:"baca",period:per,date:d,prev:pv,curr:cu,usage:us,sale_id:x._id,meter_no:c.meter_no,status:"posted"});
  audit("bill","sale",x._id,x.sale_number+" · "+nm+" · "+qf(us)+" m³ · Rp "+fm(h.total));sum+=h.total});
 save();clrF(todo.map(q=>"#bm_"+q.c._id).join(","));S.msg=todo.length+" tagihan air "+per+" diterbitkan · total Rp "+fm(sum)+"; bayar lewat sub-tab Piutang"}catch(e){ferr(e);return}render()}
function vBaca(){const per=S.bp||today().slice(0,7),cfg=airCfg(),cs=db.water_connections.filter(c=>c.status==="aktif"&&(S.unit==="all"||c.unit_id===S.unit)).sort((a,b)=>a.meter_no.localeCompare(b.meter_no,"id",{numeric:true}));
 const rows=cs.map(c=>{const b=billOf(c._id,per),id="bm_"+c._id;return`<tr><td>${esc(c.meter_no)}</td><td>${esc(cust(c.party_id).name)}</td><td class="n">${qf(wPrev(c._id))}</td><td>${b?"✓ "+b.sale_number+" · "+qf(b.bill.usage)+" m³ · "+rp(b.total):`<input id="${id}" type="text" inputmode="decimal" autocomplete="off" placeholder="angka akhir" aria-label="Angka meter akhir ${esc(c.meter_no)}" aria-describedby="${id}-h" oninput="bmPrev('${c._id}')"><div class="k" id="${id}-h" aria-live="polite"></div>`}</td></tr>`});
 return`<h2>Baca Meter &amp; Terbitkan Tagihan</h2><div class="card"><label>Bulan pemakaian</label><input id="bm-p" type="month" value="${per}" onchange="bpChg(this.value)"><label>Tanggal tagihan</label><input id="bm-d" type="date" value="${today()}"><div class="k">Jatuh tempo ${cfg.due_days} hari setelah tanggal tagihan. Isi angka akhir meter pada sambungan yang sudah dibaca (yang kosong dilewati), lalu terbitkan sekaligus. Tagihan langsung menjadi piutang pelanggan (Dr 1400 / Cr 4200); pembayaran dicatat di sub-tab Piutang.</div><button class="b" onclick="terbitTagihan()">Terbitkan tagihan</button></div>
${cs.length?tbl(["Meter","Pelanggan","#Angka awal","Angka akhir / status"],rows):`<p class="k">Belum ada sambungan aktif. Tambahkan pelanggan di sub-tab Pelanggan, lalu daftarkan meternya di sub-tab Sambungan.</p>`}`}
function saveConn(){try{negAny();const v=i=>$("#"+i).value.trim(),e=db.water_connections.find(c=>c._id===S.ecn),m=v("cn-m"),pid=e?e.party_id:v("cn-c"),a=+pn(v("cn-a")||"0"),d=v("cn-d");
 if(!pid)throw fe("cn-c","Pilih pelanggan (tambahkan dulu di sub-tab Pelanggan)");if(!m)throw fe("cn-m","Nomor meter wajib diisi");
 if(db.water_connections.some(c=>c._id!==S.ecn&&c.meter_no.toLowerCase()===m.toLowerCase()))throw fe("cn-m","Nomor meter sudah dipakai sambungan lain");
 if(!isFinite(a)||a<0)throw fe("cn-a","Angka meter awal tidak valid");if(!d)throw fe("cn-d","Tanggal pasang wajib diisi");
 if(e){if(db.water_readings.some(r=>r.conn_id===e._id)&&+e.initial!==a)throw fe("cn-a","Angka awal tidak bisa diubah setelah ada bacaan");e.meter_no=m;e.initial=a;e.installed=d;audit("update","water_connection",e._id,m);S.ecn=null;S.msg="Sambungan diperbarui"}
 else{const x={_id:uid("WCN"),unit_id:airCfg().unit_id,party_id:pid,meter_no:m,initial:a,installed:d,status:"aktif"};db.water_connections.push(x);audit("create","water_connection",x._id,m);S.msg="Sambungan "+m+" ditambahkan"}
 save();clrF("#cn-m,#cn-a");okM()}catch(e){ferr(e);return}render()}
function togConn(id){const c=wConn(id);c.status=c.status==="aktif"?"putus":"aktif";audit(c.status==="putus"?"cut":"reconnect","water_connection",id,c.meter_no);save();S.msg=c.status==="putus"?"Sambungan "+c.meter_no+" diputus; tidak ditagih sampai disambung kembali":"Sambungan "+c.meter_no+" disambung kembali";render()}
function gantiMeter(){try{negAny();const v=i=>$("#"+i).value.trim(),c=wConn(v("gm-c")),m=v("gm-m"),a=+pn(v("gm-a")||""),d=v("gm-d");
 if(!c._id)throw fe("gm-c","Pilih sambungan");if(!m)throw fe("gm-m","Nomor meter baru wajib diisi");
 if(db.water_connections.some(q=>q._id!==c._id&&q.meter_no.toLowerCase()===m.toLowerCase()))throw fe("gm-m","Nomor meter sudah dipakai sambungan lain");
 if(v("gm-a")===""||!isFinite(a)||a<0)throw fe("gm-a","Angka awal meter baru tidak valid");if(!d)throw fe("gm-d","Tanggal ganti wajib diisi");
 db.water_readings.push({_id:uid("WRD"),conn_id:c._id,kind:"ganti",period:d.slice(0,7),date:d,prev:wPrev(c._id),curr:a,usage:0,old_meter:c.meter_no,meter_no:m,status:"posted"});
 audit("meter_change","water_connection",c._id,c.meter_no+" → "+m);c.meter_no=m;save();clrF("#gm-m,#gm-a");S.msg="Meter diganti; bacaan berikutnya dihitung dari angka awal meter baru"}catch(e){ferr(e);return}render()}
function batalGanti(id){try{const r=db.water_readings.find(q=>q._id===id),l=wRds(r.conn_id).pop();if(!l||l._id!==id)throw Error("Hanya ganti meter terbaru yang bisa dibatalkan (batalkan bacaan sesudahnya dulu)");
 if(db.water_connections.some(q=>q._id!==r.conn_id&&q.meter_no.toLowerCase()===String(r.old_meter).toLowerCase()))throw Error("Nomor meter lama sudah dipakai sambungan lain");
 wConn(r.conn_id).meter_no=r.old_meter;r.status="voided";audit("void","water_reading",id);save();S.msg="Ganti meter dibatalkan; nomor meter kembali "+r.old_meter}catch(e){S.msg="⚠ "+e.message}render()}
function vSamb(){const cfg=airCfg(),cs=db.water_connections.filter(c=>S.unit==="all"||c.unit_id===S.unit),pel=db.parties.filter(p=>p.type==="pelanggan"&&isAct(p)),eC=db.water_connections.find(c=>c._id===S.ecn),used=eC&&db.water_readings.some(r=>r.conn_id===eC._id),
 gs=db.water_readings.filter(r=>r.kind==="ganti"&&r.status!=="voided"&&cs.some(c=>c._id===r.conn_id)).slice().reverse();
 return`<h2>Sambungan &amp; Meter</h2>${addB("Tambah sambungan","cn")}${cs.length?tbl(["Meter","Pelanggan","#Angka terakhir","Menunggak","Status",""],cs.map(c=>{const a=arrears(c._id),o=a.reduce((t,x)=>t+owedS(x),0);return`<tr><td>${esc(c.meter_no)}</td><td>${esc(cust(c.party_id).name)}</td><td class="n">${qf(wPrev(c._id))}</td><td>${a.length?a.length+" bln · "+rp(o)+(a.length>=cfg.cut_months?" ⚠ layak diputus":""):"—"}</td><td>${c.status==="aktif"?"Aktif":"Diputus"}</td><td>${ib("edit","Edit","openC('"+c._id+"')","s")}${c.status==="aktif"?ib("x","Putus","togConn('"+c._id+"')","s"):ib("check","Sambung","togConn('"+c._id+"')","s")}</td></tr>`})):`<p class="k">Belum ada sambungan.</p>`}

<h2>Ganti Meter</h2><div class="card"><div class="k">Baca dan tagih dulu angka akhir meter lama, baru catat penggantian; pemakaian setelah ini dihitung dari angka awal meter baru.</div><label>Sambungan</label><select id="gm-c"><option value="">Pilih sambungan</option>${opt(cs,c=>[c._id,c.meter_no+" – "+cust(c.party_id).name])}</select><label>Nomor meter baru</label><input id="gm-m"><label>Angka awal meter baru</label><input id="gm-a" type="text" inputmode="decimal" autocomplete="off"><label>Tanggal ganti</label><input id="gm-d" type="date" value="${today()}"><button class="b" onclick="gantiMeter()">Catat ganti meter</button></div>
${gs.length?`<h2>Riwayat Ganti Meter</h2>`+tbl(["Tanggal","Pelanggan","Meter lama","Meter baru","#Angka awal",""],gs.map(r=>`<tr><td>${r.date}</td><td>${esc(cust(wConn(r.conn_id).party_id).name)}</td><td>${esc(r.old_meter||"")}</td><td>${esc(r.meter_no)}</td><td class="n">${qf(r.curr)}</td><td>${ib("undo","Batalkan","askC('batalGanti','"+r._id+"')","x")}</td></tr>`)):""}`}
function saveTarif(){try{negAny();const n=i=>{const e=$("#"+i);const x=e?pn(e.value.trim()):"";return x===""?NaN:+x},md=$("#tw-md").value==="tier"?"tier":"flat",p1=n("tw-p1"),ab=n("tw-ab"),mn=n("tw-mn"),du=n("tw-du"),cm=n("tw-cm");let tiers;
 if(!(p1>=0))throw fe("tw-p1",md==="flat"?"Harga per m³ tidak valid":"Harga blok 1 tidak valid");
 if(md==="flat")tiers=[{upto:null,price:p1}];else{const u1=n("tw-u1"),u2=n("tw-u2"),p2=n("tw-p2"),p3=n("tw-p3");
  if(!(u1>0))throw fe("tw-u1","Batas blok 1 harus lebih dari 0");if(!(u2>u1))throw fe("tw-u2","Batas blok 2 harus lebih besar dari blok 1");
  [["tw-p2",p2],["tw-p3",p3]].forEach(([i,x])=>{if(!(x>=0))throw fe(i,"Harga per m³ tidak valid")});tiers=[{upto:u1,price:p1},{upto:u2,price:p2},{upto:null,price:p3}]}
 if(!(ab>=0))throw fe("tw-ab","Beban tetap tidak valid");if(!(mn>=0))throw fe("tw-mn","Pemakaian minimum tidak valid");if(!(du>=0&&du<=90))throw fe("tw-du","Jatuh tempo 0–90 hari");if(!(cm>=1))throw fe("tw-cm","Batas tunggakan minimal 1 bulan");
 if(tiers.every(t=>!t.price)&&!ab)throw fe("tw-ab","Semua tarif 0; isi tarif atau beban tetap");
 db.settings.air={...airCfg(),mode:md,unit_id:$("#tw-un").value,abon:ab,min_m3:mn,due_days:du,cut_months:cm,tiers};
 audit("update","settings","air","Tarif air diperbarui");save();S.tm=null;clrDr("air|tw-");S.msg="Tarif disimpan; berlaku untuk tagihan berikutnya (tagihan lama tidak berubah)"}catch(e){ferr(e);return}render()}
function simTarif(){const e=$("#tw-s"),r=$("#tw-sr");if(!e||!r)return;const raw=pn(e.value.trim());if(raw===""||!isFinite(+raw)||+raw<0){r.textContent="";return}const h=hitungAir(+raw);
 r.innerHTML=h.rows.map(x=>qf(x.q)+" m³ × Rp "+fm(x.price)+" = Rp "+fm(x.v)).join("<br>")+(h.abon?"<br>Beban tetap Rp "+fm(h.abon):"")+"<br><b>Total Rp "+fm(h.total)+"</b>"}
function vTarif(){const c=airCfg(),md=S.tm||c.mode||"flat",t=c.tiers.length===3?c.tiers:[{upto:10,price:c.tiers[0].price},{upto:20,price:c.tiers[0].price},{upto:null,price:c.tiers[0].price}],I=(id,val,lb)=>`<label>${lb}</label><input id="${id}" type="text" inputmode="numeric" autocomplete="off" oninput="fmtR(this)" value="${fm(val)}">`;
 return`<h2>Tarif Air</h2><div class="card"><div class="k">Perubahan tarif hanya berlaku untuk tagihan berikutnya; tagihan yang sudah terbit tidak berubah.</div>
<label>Model tarif</label><select id="tw-md" onchange="S.tm=this.value;render()"><option value="flat"${md==="flat"?" selected":""}>Sama untuk semua (satu harga per m³)</option><option value="tier"${md==="tier"?" selected":""}>Bertingkat (3 blok)</option></select>
${md==="flat"?I("tw-p1",t[0].price,"Harga per m³ (Rp)"):I("tw-u1",t[0].upto,"Blok 1: sampai (m³)")+I("tw-p1",t[0].price,"Blok 1: harga per m³ (Rp)")+I("tw-u2",t[1].upto,"Blok 2: sampai (m³)")+I("tw-p2",t[1].price,"Blok 2: harga per m³ (Rp)")+I("tw-p3",t[2].price,"Blok 3 (selebihnya): harga per m³ (Rp)")}
${I("tw-ab",c.abon,"Beban tetap per bulan (Rp)")}${I("tw-mn",c.min_m3,"Pemakaian minimum yang ditagih (m³; 0 = tanpa minimum)")}${I("tw-du",c.due_days,"Jatuh tempo (hari setelah tanggal tagihan)")}${I("tw-cm",c.cut_months,"Ditandai layak diputus setelah menunggak (bulan)")}
<label>Unit usaha</label><select id="tw-un">${opt(db.business_units,u=>[u._id,u.name],c.unit_id)}</select><button class="b" onclick="saveTarif()">Simpan tarif</button></div>
<h2>Simulasi Tagihan</h2><div class="card"><label>Pemakaian (m³) — memakai tarif yang tersimpan</label><input id="tw-s" type="text" inputmode="decimal" autocomplete="off" oninput="simTarif()"><div class="k" id="tw-sr"></div></div>`}
function vNota(id){const x=db.sales.find(q=>q._id===id),bar=`<div class="noprint"><button class="b" onclick="window.print()">Cetak</button><button class="b s" onclick="S.doc=null;render()">Kembali</button></div>`;
 if(!x||x.bill||x.opening||x.status!=="posted")return`${bar}<p class="k">Nota tidak tersedia.</p>`;
 const p=cust(x.party_id),R=(a,v)=>`<tr><td>${a}</td><td class="n">${v}</td></tr>`,ci=x.cash_id&&db.cash_accounts.find(c=>c._id===x.cash_id),pd=paidOf(x),o=owedS(x),
  rows=db.sale_items.filter(i=>i.sale_id===x._id).map(i=>{const pr=db.products.find(z=>z._id===i.product_id)||{};return`<tr><td>${esc(i.label||pr.name||"-")}</td><td class="n">${qf(i.qty)}${pr.unit?" "+esc(pr.unit):""}</td><td class="n">${rp(i.price)}</td><td class="n">${rp(i.subtotal)}</td></tr>`}).join("");
 return`${bar}<div class="doc">${kop()}<h3>NOTA PENJUALAN</h3><div class="cn">No. ${x.sale_number} · ${x.date}</div><table>${R("Pelanggan",esc(p.name))}${p.address?R("Alamat",esc(p.address)):""}${R("Unit usaha",esc(unitName(x.unit_id)))}</table>
<table class="nt"><tr><th>Barang</th><th class="n">Jumlah</th><th class="n">Harga</th><th class="n">Subtotal</th></tr>${rows}<tr><th colspan="3">Total</th><th class="n">${rp(x.total)}</th></tr></table>
<table>${R("Cara bayar",x.payment_type==="cash"?"Tunai"+(ci?" · "+esc(ci.name):""):"Kredit (piutang)")}${x.payment_type==="credit"?R("Sudah dibayar",rp(pd))+R("<b>Sisa</b>","<b>"+rp(o)+"</b>"):R("Status","Lunas")}</table>
<div class="tb">Terbilang: ${cap(terbilang(x.total))}</div>${sig([["Pembeli",x.party_id?p.name:""],["Bendahara",tres()]],0,x.date)}</div>`}
function vTagih(id){const x=db.sales.find(q=>q._id===id),bar=`<div class="noprint"><button class="b" onclick="window.print()">Cetak</button><button class="b s" onclick="S.doc=null;render()">Kembali</button></div>`;
 if(!x||!x.bill||x.status!=="posted")return`${bar}<p class="k">Nota tidak tersedia.</p>`;
 const b=x.bill,p=cust(x.party_id),R=(a,v)=>`<tr><td>${a}</td><td class="n">${v}</td></tr>`,pd=paidOf(x),o=owedS(x);
 return`${bar}<div class="doc">${kop()}<h3>NOTA TAGIHAN AIR</h3><div class="cn">No. ${x.sale_number} · Periode ${b.period} · Tanggal ${x.date}</div><table>${R("Pelanggan",esc(p.name))}${p.address?R("Alamat",esc(p.address)):""}${R("No. meter",esc(b.meter||wConn(b.conn_id).meter_no||"-"))}${R("Angka awal → akhir",qf(b.prev)+" → "+qf(b.curr))}${R("Pemakaian",qf(b.usage)+" m³"+(b.billed>b.usage?" (dikenai minimum "+qf(b.billed)+" m³)":""))}${b.rows.map(r=>R("&nbsp;&nbsp;"+qf(r.q)+" m³ × Rp "+fm(r.price),rp(r.v))).join("")}${b.abon?R("Beban tetap",rp(b.abon)):""}${R("<b>Total tagihan</b>","<b>"+rp(x.total)+"</b>")}${pd?R("Sudah dibayar",rp(pd)):""}${R("<b>Sisa</b>","<b>"+rp(o)+"</b>")}${R("Jatuh tempo",b.due)}</table></div>`}

