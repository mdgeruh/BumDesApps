// ===== PERDAGANGAN PD2 (v1.1.297): pembelian tunai dan kredit, utang usaha, harga beli rata-rata bergerak =====
// purchases: {no, unit_id, party_id (pemasok), date, payment_type: cash|credit, cash_id, due_date, items:[{product_id,qty,cost,subtotal}], total, transaction_id, pays:[{_id,date,amount,cash_id,transaction_id,status}], status: posted|void}
// Jurnal: tunai Dr 1500 / Cr kas; kredit Dr 1500 / Cr 2100 Utang; bayar utang Dr 2100 / Cr kas. Stok bertambah lewat stock_moves (kind "beli").
const dgPurch=()=>{const I=dgIds();return(db.purchases||[]).filter(b=>I.has(b.unit_id))},
 dgPaid=b=>Math.round((b.pays||[]).filter(p=>p.status!=="void").reduce((a,p)=>a+p.amount,0)),
 dgOwed=b=>b.status!=="posted"||b.payment_type==="cash"?0:Math.round(b.total-dgPaid(b)),
 dgAvg=p=>{const q=dgQty(p._id);return q>0?Math.round(dgVal(p._id)/q*100)/100:(p.cost||0)},
 dgPtyNm=id=>(db.parties.find(p=>p._id===id)||{}).name||"Tanpa pemasok";
function dgBlNo(d){const y=String(d).slice(0,4),pre="BL-"+y+"-";let mx=0;(db.purchases||[]).forEach(b=>{if(typeof b.no==="string"&&b.no.startsWith(pre)){const n=+b.no.slice(pre.length);if(n>mx)mx=n}});return pre+String(mx+1).padStart(4,"0")}
function dgBeli(U){const q=(S.dgbq||"").trim().toLowerCase(),A=dgPurch().sort((a,b)=>String(b.date).localeCompare(String(a.date))||String(b.no).localeCompare(String(a.no))),
  L=A.filter(b=>!q||(b.no+" "+dgPtyNm(b.party_id)).toLowerCase().includes(q)),n=S.lim||30,ut=A.reduce((a,b)=>a+dgOwed(b),0),nu=A.filter(b=>dgOwed(b)>0).length;
 const rows=L.slice(0,n).map(b=>`<button class="upr${b.status==="void"?" vd":""}" onclick="mdOpen('dgd','${b._id}')"><span class="upm"><b>${esc(b.no)}</b><small>${esc(b.date)} · ${esc(dgPtyNm(b.party_id))} · ${b.items.length} barang</small></span><span class="upa"><b>${rp(b.total)}</b>${b.status==="void"?`<span class="bdg wr">Batal</span>`:b.payment_type==="cash"?`<span class="bdg ok">Tunai</span>`:dgOwed(b)>0?`<span class="bdg wr">Utang ${rp(dgOwed(b))}</span>`:`<span class="bdg ok">Lunas</span>`}</span></button>`).join("");
 return`<h2>Pembelian</h2><div class="fl"><button class="b ad" onclick="dgbNew()">${ic("plus")}<span>Pembelian baru</span></button></div>${dgUsulCard()}${dcard("Utang usaha",nu+" pembelian belum lunas",`<div class="kvg"><div class="kv"><span class="k">Total utang ke pemasok</span><b>${rp(ut)}</b></div></div>`,"")}
${dcard("Daftar Pembelian",L.length+" pembelian"+(q?" cocok":""),`<div class="fl"><input type="search" placeholder="Cari nomor atau pemasok…" aria-label="Cari pembelian" value="${esc(S.dgbq||"")}" onchange="S.dgbq=this.value;S.lim=0;render()"></div>`+(L.length?`<div class="upl">${rows}</div>`+(L.length>n?`<button class="b s" onclick="S.lim=${n+30};render()">Muat lebih banyak</button>`:""):`<p class="k">Belum ada pembelian. Catat pembelian barang dari pemasok; stok bertambah dan harga beli rata-rata diperbarui otomatis.</p>`),"")}`}
function dgbH(k,v){S.dgbh=S.dgbh||{};S.dgbh[k]=v;if(k==="u"||k==="t")render()}
function dgbNew(){S.dgbc=[];S.dgbh=null;mdOpen("dgb","")}
function dgbLine(){try{const h=S.dgbh=S.dgbh||{},v=i=>$("#"+i).value.trim(),p=db.products.find(x=>x._id===v("db-p")),q=+pn(v("db-q")),c=v("db-c")?+pn(v("db-c")):(p&&p.cost);
 if(!p||!isAct(p))throw fe("db-p","Pilih produk aktif dulu (tambahkan di sub-tab Stok)");if(!(q>0))throw fe("db-q","Jumlah harus lebih dari 0");if(!(c>0))throw fe("db-c","Harga beli harus lebih dari 0 (isi di sini atau di data produk)");
 const un=(S.dgbc||[])[0]?(db.products.find(x=>x._id===S.dgbc[0].p)||{}).unit_id:(h.u||p.unit_id);if(p.unit_id!==un)throw fe("db-p","Semua barang dalam satu pembelian harus dari unit yang sama ("+unitName(un)+")");
 const ed=($("#db-e")||{value:""}).value.trim();if(ed&&!/^\d{4}-\d{2}-\d{2}$/.test(ed))throw fe("db-e","Tanggal kedaluwarsa tidak valid");h.u=un;S.dgbc=S.dgbc||[];const sm=S.dgbc.find(z=>z.p===p._id&&z.c===c&&(z.e||"")===ed);if(sm)sm.q=qf3(sm.q+q);else S.dgbc.push({p:p._id,q:qf3(q),c,...(ed?{e:ed}:{})});clrF("#db-p,#db-q,#db-c,#db-e");S.msg="";S.fe=null}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function dgbDel(i){(S.dgbc||[]).splice(i,1);render()}
function dgbSave(){try{negAny();const h=S.dgbh||{},C=S.dgbc||[],d=h.d||today(),t=h.t||"cash";
 if(!modOn("dagang"))throw Error("Modul Perdagangan belum aktif");if(!C.length)throw Error("Tambahkan minimal satu barang");
 if(!/^\d{4}-\d{2}-\d{2}$/.test(d))throw fe("db-d","Tanggal wajib diisi");
 const P=C.map(z=>({...z,pr:db.products.find(x=>x._id===z.p)}));if(P.some(z=>!z.pr||!isAct(z.pr)))throw Error("Ada produk yang sudah tidak aktif");
 const un=P[0].pr.unit_id;if(P.some(z=>z.pr.unit_id!==un))throw Error("Semua barang harus dari unit yang sama");
 if(!db.business_units.some(u=>u._id===un&&u.type==="dagang"&&isAct(u)))throw Error("Unit usaha bukan unit Perdagangan aktif");
 const vd=h.v||"";if(vd&&!db.parties.some(x=>x._id===vd&&x.type==="pemasok"))throw fe("db-v","Pemasok tidak valid");if(t==="credit"&&!vd)throw fe("db-v","Pembelian kredit wajib memilih pemasok");
 const its=P.map(z=>({product_id:z.p,qty:z.q,cost:z.c,subtotal:Math.round(z.q*z.c),...(z.e?{exp:z.e}:{})})),total=its.reduce((a,z)=>a+z.subtotal,0);if(!(total>0))throw Error("Total pembelian harus lebih dari 0");
 let cr,kid=null,due=null;
 if(t==="cash"){const k=db.cash_accounts.find(x=>x._id===h.k);if(!k||!isAct(k))throw fe("db-k","Pilih kas/bank");const sk=net(acc(k.account_id),bal(()=>true));if(sk<total)throw fe("db-k","Saldo kas/bank tidak cukup (tersedia Rp "+fm(sk)+")");cr=k.account_id;kid=k._id}
 else{const days=h.due===undefined||h.due===""?30:Math.round(+pn(h.due));if(!(days>=0&&days<=365))throw fe("db-j","Jatuh tempo 0 sampai 365 hari");cr="ACC2100";const x=new Date(d+"T00:00:00Z");x.setUTCDate(x.getUTCDate()+days);due=x.toISOString().slice(0,10)}
 const no=dgBlNo(d),vn=vd?dgPtyNm(vd):"";
 const tr=post({type:t==="cash"?"beli_tunai":"beli_kredit",date:d,unit:un,desc:"Pembelian "+no+(vn?" · "+vn:""),lines:[{acc:"ACC1500",d:total},{acc:cr,c:total}]});
 const b={_id:uid("PBL"),no,unit_id:un,party_id:vd||null,date:d,payment_type:t,cash_id:kid,due_date:due,items:its,total,transaction_id:tr._id,pays:[],status:"posted"};
 (db.purchases=db.purchases||[]).push(b);db.stock_moves=db.stock_moves||[];
 its.forEach(z=>db.stock_moves.push({_id:uid("STK"),product_id:z.product_id,unit_id:un,date:d,kind:"beli",qty:qf3(z.qty),cost:z.cost,value:z.subtotal,transaction_id:tr._id,purchase_id:b._id,note:"Pembelian "+no,...(z.exp?{exp:z.exp}:{}),status:"ok"}));
 [...new Set(its.map(z=>z.product_id))].forEach(id=>{const p=db.products.find(x=>x._id===id);p.cost=dgAvg(p)});
 audit("create","purchase",b._id,no+" · Rp "+total.toLocaleString("id-ID")+" · "+(t==="cash"?"tunai":"kredit"));save();S.dgbc=[];S.dgbh=null;S.msg="Pembelian "+no+" dicatat: "+rp(total).replace(/<[^>]+>/g,"")+(t==="credit"?" (utang jatuh tempo "+due+")":"");okM()}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function dgbBatal(id){try{const b=(db.purchases||[]).find(x=>x._id===id);if(!b)throw Error("Pembelian tidak ditemukan");if(b.status!=="posted")throw Error("Pembelian sudah dibatalkan");
 if((b.pays||[]).some(p=>p.status!=="void"))throw Error("Batalkan dulu pembayaran utang pembelian ini");if((db.stock_moves||[]).some(m=>m.kind==="retbeli"&&m.purchase_id===id&&m.status!=="void"))throw Error("Batalkan dulu retur pembelian ini (Perdagangan > Koreksi)");
 const need={};b.items.forEach(z=>need[z.product_id]=(need[z.product_id]||0)+z.qty);
 for(const pid in need){const p=db.products.find(x=>x._id===pid);if(dgQty(pid)-need[pid]<-0.0005)throw Error("Stok "+(p?p.name:pid)+" sudah berkurang (tersisa "+qf(dgQty(pid))+"); pembelian tidak dapat dibatalkan")}
 rev(b.transaction_id);b.status="void";(db.stock_moves||[]).forEach(m=>{if(m.purchase_id===id)m.status="void"});
 Object.keys(need).forEach(pid=>{const p=db.products.find(x=>x._id===pid);if(p&&dgQty(pid)>0)p.cost=dgAvg(p)});
 audit("void","purchase",id,"Batal "+b.no);save();S.msg="Pembelian "+b.no+" dibatalkan; jurnal dibalik dan stok dikurangi"}catch(e){S.msg="⚠ "+e.message}mdClose()}
function dgbBayar(){try{negAny();const b=(db.purchases||[]).find(x=>x._id===S.edgy);if(!b)throw Error("Pembelian tidak ditemukan");const v=i=>$("#"+i).value.trim(),d=v("dy-d"),a=Math.round(+pn(v("dy-a"))),k=db.cash_accounts.find(x=>x._id===v("dy-k"));
 if(b.status!=="posted"||b.payment_type!=="credit")throw Error("Hanya pembelian kredit yang masih berlaku yang dapat dibayar");
 if(!/^\d{4}-\d{2}-\d{2}$/.test(d))throw fe("dy-d","Tanggal wajib diisi");if(d<b.date)throw fe("dy-d","Tanggal pembayaran tidak boleh sebelum tanggal pembelian");
 if(!(a>0))throw fe("dy-a","Jumlah harus lebih dari 0");if(a>dgOwed(b))throw fe("dy-a","Jumlah melebihi sisa utang (Rp "+fm(dgOwed(b))+")");
 if(!k||!isAct(k))throw fe("dy-k","Pilih kas/bank");const sk=net(acc(k.account_id),bal(()=>true));if(sk<a)throw fe("dy-k","Saldo kas/bank tidak cukup (tersedia Rp "+fm(sk)+")");
 const tr=post({type:"beli_bayar",date:d,unit:b.unit_id,desc:"Bayar utang "+b.no+" · "+dgPtyNm(b.party_id),lines:[{acc:"ACC2100",d:a},{acc:k.account_id,c:a}]});
 (b.pays=b.pays||[]).push({_id:uid("PBY"),date:d,amount:a,cash_id:k._id,transaction_id:tr._id,status:"ok"});audit("create","purchase",b._id,"Bayar utang "+b.no+" Rp "+a.toLocaleString("id-ID"));save();S.msg="Pembayaran utang dicatat"+(dgOwed(b)===0?"; pembelian lunas":"");S.edgy=null;S.md="dgd";S.edgd=b._id}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function dgbBayarBatal(key){try{const [id,pid]=String(key).split("|"),b=(db.purchases||[]).find(x=>x._id===id),p=b&&(b.pays||[]).find(x=>x._id===pid);if(!p||p.status==="void")throw Error("Pembayaran tidak ditemukan");if(p.retur)throw Error("Retur dibatalkan lewat Perdagangan > Koreksi");
 rev(p.transaction_id);p.status="void";audit("void","purchase",id,"Batal bayar utang "+b.no);save();S.msg="Pembayaran utang dibatalkan"}catch(e){S.msg="⚠ "+e.message}render()}
MK.dgb="edgb";MK.dgd="edgd";MK.dgy="edgy";
MD.dgb=()=>{const h=S.dgbh=S.dgbh||{},C=S.dgbc||[],us=dgUnits(),un=C.length?(db.products.find(x=>x._id===C[0].p)||{}).unit_id:(h.u||(dgScope()[0]||us[0]||{})._id),t=h.t||"cash",
  PR=db.products.filter(p=>p.unit_id===un&&isAct(p)),V=db.parties.filter(p=>p.type==="pemasok"&&isAct(p)),K=db.cash_accounts.filter(isAct),tot=C.reduce((a,z)=>a+Math.round(z.q*z.c),0);
 const rows=C.map((z,i)=>{const p=db.products.find(x=>x._id===z.p)||{};return`<div class="upr"><span class="upm"><b>${esc(p.name||"-")}</b><small>${qf(z.q)} ${esc(p.unit||"")} × ${rp(z.c)}${z.e?" · exp "+esc(z.e):""}</small></span><span class="upa"><b>${rp(Math.round(z.q*z.c))}</b>${ib("x","Hapus","dgbDel("+i+")","x")}</span></div>`}).join("");
 return{t:"Pembelian baru",s:"dgbSave()",y:"Simpan pembelian",b:
  fld("db-d","Tanggal",{type:"date",value:h.d||today(),a:' onchange="dgbH(\'d\',this.value)"'})
  +(us.length>1?fld("db-u","Unit usaha",{t:"select",a:(C.length?" disabled":"")+' onchange="dgbH(\'u\',this.value)"',opts:opt(us,u=>[u._id,u.name],un)}):"")
  +fld("db-v","Pemasok"+(t==="credit"?"":" (opsional)"),{t:"select",a:' onchange="dgbH(\'v\',this.value)"',opts:`<option value="">${t==="credit"?"Pilih pemasok":"Tanpa pemasok"}</option>`+opt(V,p=>[p._id,p.name],h.v),hint:V.length?"":"Belum ada pemasok. Tambahkan di Master > Pihak (jenis Pemasok)."})
  +fld("db-t","Pembayaran",{t:"select",a:' onchange="dgbH(\'t\',this.value)"',opts:opt([["cash","Tunai"],["credit","Kredit (utang usaha)"]],x=>x,t)})
  +(t==="cash"?fld("db-k","Dibayar dari",{t:"select",a:' onchange="dgbH(\'k\',this.value)"',opts:`<option value="">Pilih kas/bank</option>`+opt(K,c=>[c._id,c.name],h.k)}):fld("db-j","Jatuh tempo (hari)",{type:"text",a:' inputmode="numeric" autocomplete="off" onchange="dgbH(\'due\',this.value)"',value:h.due===undefined?"30":h.due}))
  +`<h3>Barang (${C.length})</h3>`+(rows?`<div class="upl">${rows}</div><p class="k"><b>Total: ${rp(tot)}</b></p>`:`<p class="k">Belum ada barang. Pilih produk, isi jumlah, lalu Tambah barang.</p>`)
  +fld("db-p","Produk",{t:"select",opts:`<option value="">Pilih produk</option>`+opt(PR,p=>[p._id,p.code+" · "+p.name+" ("+qf(dgQty(p._id))+" "+(p.unit||"")+")"])})
  +fld("db-q","Jumlah",{type:"text",a:' inputmode="decimal" autocomplete="off"',value:""})
  +fld("db-c","Harga beli per satuan (Rp, kosong = harga beli produk)",{type:"text",a:RPA,value:""})
  +fld("db-e","Kedaluwarsa (opsional, untuk barang berbatch)",{type:"date"})
  +`<button class="b s" onclick="dgbLine()">Tambah barang</button>`}};
MD.dgd=()=>{const b=(db.purchases||[]).find(x=>x._id===S.edgd);if(!b)return{t:"Pembelian",s:"mdClose()",y:"Tutup",b:"<p>Pembelian tidak ditemukan.</p>",nf:1};
 const rows=b.items.map(z=>{const p=db.products.find(x=>x._id===z.product_id)||{};return`<div class="upr"><span class="upm"><b>${esc(p.name||"-")}</b><small>${qf(z.qty)} ${esc(p.unit||"")} × ${rp(z.cost)}${z.exp?" · exp "+esc(z.exp):""}</small></span><span class="upa"><b>${rp(z.subtotal)}</b></span></div>`}).join(""),
  pays=(b.pays||[]).map(p=>`<div class="upr${p.status==="void"?" vd":""}"><span class="upm"><b>${esc(p.date)}</b><small>${esc((db.cash_accounts.find(c=>c._id===p.cash_id)||{}).name||"")}${p.status==="void"?" · dibatalkan":""}</small></span><span class="upa"><b>${rp(p.amount)}</b>${p.status!=="void"&&!noPerm("dagang.kelola")?ib("undo","Batalkan","askC('dgbBayarBatal','"+b._id+"|"+p._id+"')","x"):""}</span></div>`).join(""),
  can2=!noPerm("dagang.kelola"),live=b.status==="posted",ow=dgOwed(b),np=(b.pays||[]).some(p=>p.status!=="void");
 return{t:esc(b.no),s:"mdClose()",y:"Tutup",nf:1,b:`<div class="ldw"><div class="lds"><span class="bdg ${live?"ok":"wr"}">${live?"Berlaku":"Dibatalkan"}</span> <span class="bdg">${b.payment_type==="cash"?"Tunai":"Kredit"}</span></div>
  <div class="kvg"><div class="kv"><span class="k">Tanggal</span><b>${esc(b.date)}</b></div><div class="kv"><span class="k">Pemasok</span><b>${esc(dgPtyNm(b.party_id))}</b></div><div class="kv"><span class="k">Unit</span><b>${esc(unitName(b.unit_id))}</b></div><div class="kv"><span class="k">Total</span><b>${rp(b.total)}</b></div>${b.payment_type==="credit"?`<div class="kv"><span class="k">Jatuh tempo</span><b>${esc(b.due_date||"-")}</b></div><div class="kv"><span class="k">Sisa utang</span><b>${rp(ow)}</b></div>`:""}</div>
  <h3>Barang</h3><div class="upl">${rows}</div>${pays?`<h3>Pembayaran utang</h3><div class="upl">${pays}</div>`:""}
  ${can2&&live?`<div class="lda">${b.payment_type==="credit"&&ow>0?ib("cash","Bayar utang","mdOpen('dgy','"+b._id+"')","s"):""}${ib("undo","Retur barang","S.dgxh={s:'"+b._id+"'};mdOpen('dgx','x')","s")}${!np?ib("undo","Batalkan pembelian","askC('dgbBatal','"+b._id+"')","x"):""}</div>`:""}</div>`}};
MD.dgy=()=>{const b=(db.purchases||[]).find(x=>x._id===S.edgy);if(!b)return{t:"Bayar utang",s:"mdClose()",y:"Tutup",b:"<p>Pembelian tidak ditemukan.</p>",nf:1};
 return{t:"Bayar utang · "+esc(b.no),s:"dgbBayar()",y:"Catat pembayaran",b:`<p class="k">Sisa utang ${rp(dgOwed(b))} ke ${esc(dgPtyNm(b.party_id))}. Dijurnal: Debit 2100 Utang, Kredit kas/bank.</p>`
  +fld("dy-d","Tanggal",{type:"date",value:today()})+fld("dy-a","Jumlah (Rp)",{type:"text",a:RPA,value:fm(dgOwed(b)),req:1})
  +fld("dy-k","Dibayar dari",{t:"select",opts:`<option value="">Pilih kas/bank</option>`+opt(db.cash_accounts.filter(isAct),c=>[c._id,c.name])})}};
