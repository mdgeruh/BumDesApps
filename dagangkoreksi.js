// ===== PERDAGANGAN PD5 (v1.1.301): stok opname, retur penjualan, retur pembelian =====
// Semua koreksi tercatat sebagai stock_moves (kind opname|retjual|retbeli) + satu jurnal tiap koreksi (jenis opname, retur_jual, retur_beli).
// Opname: kurang Dr 5910 Selisih Stok / Cr 1500; lebih Dr 1500 / Cr 5910 (nilai pada harga rata-rata).
// Retur jual: Dr pendapatan / Cr kas atau 1400, ditambah Dr 1500 / Cr 5900 sebesar HPP barang yang kembali (dari rincian penjualan asal).
// Retur beli: Dr kas atau 2100 / Cr 1500 sebesar harga beli pada pembelian asal.
const DGK={opname:["Opname","wr"],retjual:["Retur jual","ok"],retbeli:["Retur beli","ok"]},
 dgkMoves=()=>{const I=dgIds();return(db.stock_moves||[]).filter(m=>DGK[m.kind]&&I.has(m.unit_id)).sort((a,b)=>String(b.date).localeCompare(String(a.date))||String(b._id).localeCompare(String(a._id)))},
 dgkRet=(kind,key,id,pid)=>qf3((db.stock_moves||[]).filter(m=>m.kind===kind&&m[key]===id&&m.product_id===pid&&m.status!=="void").reduce((a,m)=>a+Math.abs(m.qty),0)),
 dgkCashBack=(kind,key,id)=>Math.round((db.stock_moves||[]).filter(m=>m.kind===kind&&m[key]===id&&m.status!=="void"&&m.method==="kas").reduce((a,m)=>a+(m.refund||0),0)),
 dgkSales=()=>dgjAll().filter(s=>s.status==="posted"&&db.sale_items.some(i=>i.sale_id===s._id)).sort((a,b)=>String(b.date).localeCompare(String(a.date))),
 dgkBuys=()=>dgPurch().filter(b=>b.status==="posted").sort((a,b)=>String(b.date).localeCompare(String(a.date))),
 dgkPn=id=>String(id||"").startsWith("~")?id.slice(1):(db.products.find(p=>p._id===id)||{}).name||"-",
 dgkEnough=(k,a)=>{const sk=net(acc(k.account_id),bal(()=>true));if(sk<a)throw fe("dk-k","Saldo kas/bank tidak cukup (tersedia Rp "+fm(sk)+")")};
function dgKoreksi(U){if(S.dgse){const s0=dgsGet(S.dgse);if(s0)return dgsView(s0)}const ok2=can("dagang.kelola"),L=dgkMoves(),n=S.lim||30,U2=dgUnits();
 const rows=L.slice(0,n).map(m=>{const K=DGK[m.kind];return`<div class="upr${m.status==="void"?" vd":""}"><span class="upm"><b>${esc(dgkPn(m.product_id))}</b><small>${esc(m.date)} · ${esc(m.note||K[0])} · ${m.qty>0?"+":""}${qf(m.qty)} · ${rp(Math.abs(m.value))}</small></span><span class="upa"><span class="bdg ${m.status==="void"?"ng":K[1]}">${m.status==="void"?"Batal":K[0]}</span>${ok2&&m.status!=="void"?ib("undo","Batalkan","askC('dgkBatal','"+m._id+"')","x"):""}</span></div>`}).join("");
 return`<h2>Opname dan Retur</h2>${dcard("Koreksi stok","Hitung fisik dan retur barang",`<p class="k">Opname mencocokkan stok buku dengan hitungan fisik; selisih dijurnal ke akun 5910 Selisih Stok. Retur mengembalikan barang dari pelanggan atau ke pemasok.</p>`+(ok2?`<div class="fl">${U2.length?`<button class="b" onclick="mdOpen('dgo','${(dgScope()[0]||U2[0])._id}')">Stok opname</button>`:""}<button class="b s" onclick="mdOpen('dgr','x')">Retur penjualan</button><button class="b s" onclick="mdOpen('dgx','x')">Retur pembelian</button></div>`:""),"")}
${dgsCard()}${dcard("Riwayat koreksi",L.length+" catatan",L.length?`<div class="upl">${rows}</div>${L.length>n?`<p class="k">Menampilkan ${n} terbaru.</p>`:""}`:`<p class="k">Belum ada opname atau retur.</p>`,"")}`}
// ----- opname -----
MK.dgo="edgo";
MD.dgo=()=>{const un=S.edgo,us=dgUnits(),P=db.products.filter(p=>p.unit_id===un&&isAct(p)&&isDgProd(p));
 return{t:"Stok opname",s:"dgoSave()",y:"Simpan opname",b:`<p class="k">Isi hitungan fisik hanya untuk barang yang dihitung; yang dikosongkan tidak diubah. Selisih dijurnal pada harga rata-rata.</p>`
 +(us.length>1?`<select aria-label="Unit usaha" onchange="S.edgo=this.value;render()">${opt(us,u=>[u._id,u.name],un)}</select>`:"")
 +fld("do-d","Tanggal",{type:"date",value:today()})
 +(P.length?`<div class="upl">${P.map((p,i)=>`<label class="upr"><span class="upm"><b>${esc(p.name)}</b><small>Buku: ${qf(dgQty(p._id))} ${esc(p.unit||"")}</small></span><input id="do-${i}" inputmode="decimal" placeholder="Fisik" aria-label="Hitungan fisik ${esc(p.name)}" style="max-width:6rem"></label>`).join("")}</div>`:`<p class="k">Belum ada produk di unit ini.</p>`)}};
function dgoSave(){try{negAny();const un=S.edgo,d=$("#do-d").value.trim();if(!modOn("dagang"))throw Error("Modul Perdagangan belum aktif");if(!db.business_units.some(u=>u._id===un&&u.type==="dagang"&&isAct(u)))throw Error("Unit usaha bukan unit Perdagangan aktif");
 if(!/^\d{4}-\d{2}-\d{2}$/.test(d))throw fe("do-d","Tanggal wajib diisi");
 const P=db.products.filter(p=>p.unit_id===un&&isAct(p)&&isDgProd(p)),rows=[];
 P.forEach((p,i)=>{const e=$("#do-"+i),r=e?String(e.value).trim():"";if(r==="")return;const f=qf3(+pn(r));if(!(f>=0)||isNaN(f))throw fe("do-"+i,"Hitungan fisik "+p.name+" tidak valid");rows.push({p,f})});
 const o=dgOpCore(un,d,rows,"Opname"),tot=o.tot,W={length:o.n};
 audit("create","stok",un,"Opname "+W.length+" barang, selisih nilai Rp "+tot.toLocaleString("id-ID"));save();S.msg="Opname "+W.length+" barang dicatat; selisih nilai "+(tot<0?"kurang ":"lebih ")+"Rp "+fm(Math.abs(tot));okM()}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
// ----- retur penjualan -----
MK.dgr="edgr";
function dgrS(v){S.dgrh=Object.assign({},S.dgrh,{s:v});render()}
MD.dgr=()=>{const h=S.dgrh=S.dgrh||{},A=dgkSales(),x=A.find(s=>s._id===h.s)||A[0],its=x?db.sale_items.filter(i=>i.sale_id===x._id&&i.product_id).filter(i=>i.qty-dgkRet("retjual","sale_id",x._id,i.product_id)>0.0004):[],cr=x&&x.payment_type==="credit";
 if(!A.length)return{t:"Retur penjualan",s:"mdClose()",y:"Tutup",b:"<p>Belum ada penjualan yang bisa diretur.</p>",nf:1};
 return{t:"Retur penjualan",s:"dgrSave()",y:"Catat retur",b:`<p class="k">Barang kembali dari pelanggan. Dijurnal: pendapatan berkurang, kas atau piutang berkurang, dan stok kembali pada HPP penjualan asal.</p>`
 +fld("dr-s","Penjualan",{t:"select",a:' onchange="dgrS(this.value)"',opts:opt(A,s=>[s._id,s.sale_number+" · "+s.date+" · "+dgCustNm(s.party_id)],x._id)})
 +fld("dr-p","Barang",{t:"select",opts:`<option value="">Pilih barang</option>`+opt(its,i=>[i.product_id,dgkPn(i.product_id)+" (sisa "+qf(i.qty-dgkRet("retjual","sale_id",x._id,i.product_id))+")"])})
 +fld("dr-q","Jumlah kembali",{type:"text",a:' inputmode="decimal"',req:1})+fld("dr-d","Tanggal",{type:"date",value:today()})
 +fld("dr-m","Pengembalian uang",{t:"select",opts:opt(cr?[["piutang","Kurangi piutang"],["kas","Dikembalikan tunai"]]:[["kas","Dikembalikan tunai"]],z=>z)})
 +fld("dr-k","Dari kas/bank (bila tunai)",{t:"select",opts:`<option value="">Pilih kas/bank</option>`+opt(db.cash_accounts.filter(isAct),c=>[c._id,c.name],x.cash_id)})}};
function dgrSave(){try{negAny();const v=i=>$("#"+i).value.trim(),x=db.sales.find(s=>s._id===v("dr-s")),pid=v("dr-p"),q=qf3(+pn(v("dr-q"))),d=v("dr-d"),m=v("dr-m");
 if(!modOn("dagang"))throw Error("Modul Perdagangan belum aktif");if(!isDgSale(x)||x.status!=="posted")throw Error("Penjualan tidak ditemukan atau sudah dibatalkan");
 const it=db.sale_items.find(i=>i.sale_id===x._id&&i.product_id===pid);if(!it)throw fe("dr-p","Pilih barang");if(!(q>0))throw fe("dr-q","Jumlah harus lebih dari 0");
 const sisa=qf3(it.qty-dgkRet("retjual","sale_id",x._id,pid));if(q>sisa+0.0004)throw fe("dr-q","Melebihi sisa yang bisa diretur ("+qf(sisa)+")");
 if(!/^\d{4}-\d{2}-\d{2}$/.test(d))throw fe("dr-d","Tanggal wajib diisi");if(d<x.date)throw fe("dr-d","Tanggal retur tidak boleh sebelum tanggal penjualan");
 const pr=db.products.find(p=>p._id===pid)||{},full=Math.abs(q-it.qty)<0.0005,net=(it.subtotal||0)-(it.disc||0),amt=full?net:Math.round(q*net/it.qty),dscq=full?(it.disc||0):Math.round(q*(it.disc||0)/it.qty),cost=it.hpp&&Math.abs(q-it.qty)<0.0005?it.hpp:Math.round(q*(it.cost||0)),rv=pr.revenue_account||"ACC4300";
 let k=null;if(m==="piutang"){if(x.payment_type!=="credit")throw Error("Pengurangan piutang hanya untuk penjualan kredit");if(amt>owedS(x)+.005)throw fe("dr-q","Nilai retur (Rp "+fm(amt)+") melebihi sisa piutang (Rp "+fm(owedS(x))+"); pilih dikembalikan tunai")}
 else{k=db.cash_accounts.find(c=>c._id===v("dr-k"));if(!k||!isAct(k))throw fe("dr-k","Pilih kas/bank asal uang kembali");
  if(x.payment_type==="credit"){const cp=Math.round(db.payments.filter(p=>p.sale_id===x._id&&p.status!=="voided"&&!p.retur).reduce((a,p)=>a+p.amount,0))-dgkCashBack("retjual","sale_id",x._id);if(amt>cp+.005)throw fe("dr-q","Pelanggan baru membayar Rp "+fm(Math.max(cp,0))+"; kurangi piutang untuk sisanya")}
  dgkEnough(k,amt)}
 const L=[{acc:rv,d:amt+dscq},{acc:m==="piutang"?"ACC1400":k.account_id,c:amt}];if(dscq>0)L.push({acc:"ACC4390",c:dscq});if(cost>0){L.push({acc:"ACC1500",d:cost},{acc:"ACC5900",c:cost})}
 const tr=post({type:"retur_jual",date:d,unit:x.unit_id,desc:"Retur "+x.sale_number+" – "+pr.name+" x"+qf(q),lines:L}),mv={_id:uid("STK"),product_id:pid,unit_id:x.unit_id,date:d,kind:"retjual",qty:q,cost:q>0?Math.round(cost/q*100)/100:0,value:cost,transaction_id:tr._id,sale_id:x._id,method:m,refund:amt,note:"Retur "+x.sale_number,status:"ok"};
 if(m==="piutang"){const pid2=uid("PAY");db.payments.push({_id:pid2,sale_id:x._id,date:d,amount:amt,cash_id:null,transaction_id:tr._id,status:"posted",retur:true,...byN()});mv.pay_id=pid2}
 (db.stock_moves=db.stock_moves||[]).push(mv);audit("create","stok",x._id,"Retur penjualan "+x.sale_number+" Rp "+amt.toLocaleString("id-ID"));save();S.dgrh=null;S.msg="Retur "+x.sale_number+" dicatat: Rp "+fm(amt)+(m==="piutang"?" mengurangi piutang":" dikembalikan tunai")+"; stok bertambah";okM()}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
// ----- retur pembelian -----
MK.dgx="edgx";
function dgxS(v){S.dgxh=Object.assign({},S.dgxh,{s:v});render()}
MD.dgx=()=>{const h=S.dgxh=S.dgxh||{},A=dgkBuys(),b=A.find(s=>s._id===h.s)||A[0],its=b?b.items.filter(i=>i.qty-dgkRet("retbeli","purchase_id",b._id,i.product_id)>0.0004):[],cr=b&&b.payment_type==="credit";
 if(!A.length)return{t:"Retur pembelian",s:"mdClose()",y:"Tutup",b:"<p>Belum ada pembelian yang bisa diretur.</p>",nf:1};
 return{t:"Retur pembelian",s:"dgxSave()",y:"Catat retur",b:`<p class="k">Barang dikembalikan ke pemasok. Dijurnal: persediaan berkurang, kas atau utang usaha berkurang, sebesar harga beli pembelian asal.</p>`
 +fld("dx-s","Pembelian",{t:"select",a:' onchange="dgxS(this.value)"',opts:opt(A,s=>[s._id,s.no+" · "+s.date+" · "+dgPtyNm(s.party_id)],b._id)})
 +fld("dx-p","Barang",{t:"select",opts:`<option value="">Pilih barang</option>`+opt(its,i=>[i.product_id,dgkPn(i.product_id)+" (sisa "+qf(i.qty-dgkRet("retbeli","purchase_id",b._id,i.product_id))+")"])})
 +fld("dx-q","Jumlah dikembalikan",{type:"text",a:' inputmode="decimal"',req:1})+fld("dx-d","Tanggal",{type:"date",value:today()})
 +fld("dx-m","Pengembalian dana",{t:"select",opts:opt(cr?[["utang","Kurangi utang"],["kas","Diterima tunai"]]:[["kas","Diterima tunai"]],z=>z)})
 +fld("dx-k","Diterima di (bila tunai)",{t:"select",opts:`<option value="">Pilih kas/bank</option>`+opt(db.cash_accounts.filter(isAct),c=>[c._id,c.name],b.cash_id)})}};
function dgxSave(){try{negAny();const v=i=>$("#"+i).value.trim(),b=(db.purchases||[]).find(s=>s._id===v("dx-s")),pid=v("dx-p"),q=qf3(+pn(v("dx-q"))),d=v("dx-d"),m=v("dx-m");
 if(!modOn("dagang"))throw Error("Modul Perdagangan belum aktif");if(!b||b.status!=="posted")throw Error("Pembelian tidak ditemukan atau sudah dibatalkan");
 const it=b.items.find(i=>i.product_id===pid);if(!it)throw fe("dx-p","Pilih barang");if(!(q>0))throw fe("dx-q","Jumlah harus lebih dari 0");
 const sisa=qf3(it.qty-dgkRet("retbeli","purchase_id",b._id,pid));if(q>sisa+0.0004)throw fe("dx-q","Melebihi sisa yang bisa diretur ("+qf(sisa)+")");
 if(q>dgQty(pid)+0.0004)throw fe("dx-q","Stok tinggal "+qf(dgQty(pid))+"; barang yang sudah terjual tidak bisa diretur ke pemasok");
 if(!/^\d{4}-\d{2}-\d{2}$/.test(d))throw fe("dx-d","Tanggal wajib diisi");if(d<b.date)throw fe("dx-d","Tanggal retur tidak boleh sebelum tanggal pembelian");
 const amt=Math.round(q*it.cost);let k=null;
 if(m==="utang"){if(b.payment_type!=="credit")throw Error("Pengurangan utang hanya untuk pembelian kredit");if(amt>dgOwed(b)+.005)throw fe("dx-q","Nilai retur (Rp "+fm(amt)+") melebihi sisa utang (Rp "+fm(dgOwed(b))+"); pilih diterima tunai")}
 else{k=db.cash_accounts.find(c=>c._id===v("dx-k"));if(!k||!isAct(k))throw fe("dx-k","Pilih kas/bank penerima");
  if(b.payment_type==="credit"){const cp=dgPaid(b)-Math.round((b.pays||[]).filter(p=>p.status!=="void"&&p.retur).reduce((a,p)=>a+p.amount,0))-dgkCashBack("retbeli","purchase_id",b._id);if(amt>cp+.005)throw fe("dx-q","Baru dibayar Rp "+fm(Math.max(cp,0))+"; kurangi utang untuk sisanya")}}
 const tr=post({type:"retur_beli",date:d,unit:b.unit_id,desc:"Retur "+b.no+" – "+dgkPn(pid)+" x"+qf(q),lines:[{acc:m==="utang"?"ACC2100":k.account_id,d:amt},{acc:"ACC1500",c:amt}]}),
  mv={_id:uid("STK"),product_id:pid,unit_id:b.unit_id,date:d,kind:"retbeli",qty:-q,cost:it.cost,value:-amt,transaction_id:tr._id,purchase_id:b._id,method:m,refund:amt,note:"Retur "+b.no,status:"ok"};
 if(m==="utang"){const y=uid("PBY");(b.pays=b.pays||[]).push({_id:y,date:d,amount:amt,cash_id:null,transaction_id:tr._id,status:"ok",retur:true});mv.pay_id=y}
 (db.stock_moves=db.stock_moves||[]).push(mv);audit("create","stok",b._id,"Retur pembelian "+b.no+" Rp "+amt.toLocaleString("id-ID"));save();S.dgxh=null;S.msg="Retur "+b.no+" dicatat: Rp "+fm(amt)+(m==="utang"?" mengurangi utang":" diterima tunai")+"; stok berkurang";okM()}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
// ----- batal koreksi -----
function dgkBatal(id){try{const m=(db.stock_moves||[]).find(x=>x._id===id);if(!m||!DGK[m.kind])throw Error("Catatan koreksi tidak ditemukan");if(m.status==="void")throw Error("Sudah dibatalkan");
 if(m.qty>0&&dgQty(m.product_id)-m.qty<-0.0005)throw Error("Stok "+dgkPn(m.product_id)+" sudah berkurang (tersisa "+qf(dgQty(m.product_id))+"); koreksi tidak dapat dibatalkan");
 if(m.transaction_id)rev(m.transaction_id);m.status="void";
 if(m.pay_id){const y=m.kind==="retjual"?db.payments.find(p=>p._id===m.pay_id):((db.purchases||[]).find(b=>b._id===m.purchase_id)||{pays:[]}).pays.find(p=>p._id===m.pay_id);if(y)y.status=m.kind==="retjual"?"voided":"void"}
 audit("void","stok",m.sale_id||m.purchase_id||m.unit_id,"Batal "+DGK[m.kind][0]);save();S.msg=DGK[m.kind][0]+" dibatalkan; jurnal dibalik dan stok dikembalikan"}catch(e){S.msg="⚠ "+e.message}mdClose()}
