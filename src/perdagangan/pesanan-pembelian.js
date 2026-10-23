// ===== PERDAGANGAN PL6 (v1.1.361): pesanan pembelian (PO), terima sebagian, bayar beberapa nota utang =====
// dg_po: {_id,no,unit_id,party_id,date,expect,note,status: draf|dikirim|sebagian|selesai|batal, items:[{product_id,qty,cost,recv}], recv_ids:[purchase _id], closed:true bila sisa ditutup}
// PO tidak membuat jurnal. Jurnal dan stok baru terjadi saat barang diterima (Terima barang menghasilkan satu Pembelian bernomor BL-).
const PO_ST={draf:"Draf",dikirim:"Dikirim",sebagian:"Diterima sebagian",selesai:"Selesai",batal:"Batal"},
 dgPoAll=()=>{const I=dgIds();return(db.dg_po||[]).filter(o=>I.has(o.unit_id))},
 dgPoGet=id=>(db.dg_po||[]).find(o=>o._id===id),
 dgPoSisa=(o,i)=>Math.max(0,qf3(o.items[i].qty-(o.items[i].recv||0))),
 dgPoLeft=o=>o.items.reduce((a,z,i)=>a+dgPoSisa(o,i),0),
 dgPoLive=o=>o.status==="dikirim"||o.status==="sebagian";
function dgPoNo(d){const y=String(d).slice(0,4),pre="PO-"+y+"-";let mx=0;(db.dg_po||[]).forEach(o=>{if(typeof o.no==="string"&&o.no.startsWith(pre)){const n=+o.no.slice(pre.length);if(n>mx)mx=n}});return pre+String(mx+1).padStart(4,"0")}
function dgPoSt(o){if(o.status==="draf"||o.status==="batal")return;const any=o.items.some(z=>(z.recv||0)>0);o.status=dgPoLeft(o)<=0.0005?"selesai":any?"sebagian":"dikirim"}
const dgPoTot=o=>o.items.reduce((a,z)=>a+Math.round(z.qty*z.cost),0);

// ---------- Kartu Utang usaha per pemasok + Pesanan pembelian (dipasang di halaman Pembelian) ----------
function dgUtangCard(){const A=dgPurch().filter(b=>dgOwed(b)>0),t=today(),G={};
 A.forEach(b=>{const k=b.party_id||"";const z=G[k]??={n:0,o:0,due:null,late:0};z.n++;z.o+=dgOwed(b);if(b.due_date&&(!z.due||b.due_date<z.due))z.due=b.due_date;if(b.due_date&&b.due_date<t)z.late++});
 const ks=Object.keys(G).sort((a,b)=>(G[a].due||"9").localeCompare(G[b].due||"9")),ut=A.reduce((a,b)=>a+dgOwed(b),0);
 const rows=ks.map(k=>{const z=G[k],dd=z.due?dgDays(t,z.due):null,bd=dd===null?"":dd<0?`<span class="bdg ng">Lewat ${-dd} hari</span>`:dd<=7?`<span class="bdg wr">${dd===0?"Jatuh tempo hari ini":dd+" hari lagi"}</span>`:"";
  return`<button class="upr" onclick="dgmOpen('${k}')"><span class="upm"><b>${esc(dgPtyNm(k||null))}</b><small>${z.n} nota${z.due?" · terdekat "+esc(z.due):""}</small></span><span class="upa"><b>${rp(z.o)}</b>${bd}</span></button>`}).join("");
 return dcard("Utang usaha",A.length+" pembelian belum lunas · "+ks.length+" pemasok",`<div class="kvg"><div class="kv"><span class="k">Total utang ke pemasok</span><b>${rp(ut)}</b></div></div>`+(ks.length?`<div class="upl">${rows}</div><p class="k">Ketuk pemasok untuk membayar satu atau beberapa nota sekaligus.</p>`:""),"")}
function dgPoCard(){const A=dgPoAll().slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))||String(b.no).localeCompare(String(a.no))),act=A.filter(o=>o.status!=="selesai"&&o.status!=="batal"),t=today();
 const row=o=>{const late=dgPoLive(o)&&o.expect&&o.expect<t;return`<button class="upr${o.status==="batal"?" vd":""}" onclick="S.edpo='${o._id}';mdOpen('dgpo','${o._id}')"><span class="upm"><b>${esc(o.no)}</b><small>${esc(o.date)} · ${esc(dgPtyNm(o.party_id))} · ${o.items.length} barang${o.expect?" · harap "+esc(o.expect):""}</small></span><span class="upa"><b>${rp(dgPoTot(o))}</b><span class="bdg ${o.status==="selesai"?"ok":o.status==="batal"?"":late?"ng":"wr"}">${late?"Terlambat":PO_ST[o.status]}</span></span></button>`};
 const L=(S.dgpa?A:act).slice(0,S.dgpa?60:20);
 return dcard("Pesanan pembelian",act.length+" aktif"+(A.length>act.length?" · "+A.length+" semuanya":""),`<div class="fl"><button class="b s" onclick="dgpNew()">${ic("plus")}<span>Pesanan baru</span></button>${A.length>act.length?`<button class="b s" onclick="S.dgpa=!S.dgpa;render()">${S.dgpa?"Hanya aktif":"Tampilkan semua"}</button>`:""}</div>`+(L.length?`<div class="upl">${L.map(row).join("")}</div>`:`<p class="k">Belum ada pesanan. Buat pesanan ke pemasok, kirim, lalu terima barang bertahap; stok dan utang baru tercatat saat barang diterima.</p>`),"")}

// ---------- Pesanan baru ----------
function dgpNew(){S.dgpc=[];S.dgph=null;mdOpen("dgpn","")}
function dgpH(k,v){S.dgph=S.dgph||{};S.dgph[k]=v;if(k==="u")render()}
function dgpLine(){try{const h=S.dgph=S.dgph||{},v=i=>$("#"+i).value.trim(),p=db.products.find(x=>x._id===v("pn-p")),q=+pn(v("pn-q")),c=v("pn-c")?+pn(v("pn-c")):(p&&p.cost);
 if(!p||!isAct(p))throw fe("pn-p","Pilih produk aktif dulu");if(!(q>0))throw fe("pn-q","Jumlah harus lebih dari 0");if(!(c>0))throw fe("pn-c","Harga beli harus lebih dari 0 (isi di sini atau di data produk)");
 const un=(S.dgpc||[])[0]?(db.products.find(x=>x._id===S.dgpc[0].p)||{}).unit_id:(h.u||p.unit_id);if(p.unit_id!==un)throw fe("pn-p","Semua barang dalam satu pesanan harus dari unit yang sama ("+unitName(un)+")");
 h.u=un;S.dgpc=S.dgpc||[];const sm=S.dgpc.find(z=>z.p===p._id&&z.c===c);if(sm)sm.q=qf3(sm.q+q);else S.dgpc.push({p:p._id,q:qf3(q),c});clrF("#pn-p,#pn-q,#pn-c");S.msg="";S.fe=null}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function dgpDelLine(i){(S.dgpc||[]).splice(i,1);render()}
function dgpSave(){try{if(noPerm("dagang.kelola"))return;negAny();const h=S.dgph||{},C=S.dgpc||[],d=h.d||today();
 if(!modOn("dagang"))throw Error("Modul Perdagangan belum aktif");if(!/^\d{4}-\d{2}-\d{2}$/.test(d))throw fe("pn-d","Tanggal wajib diisi");
 const ex=h.e||"";if(ex&&(!/^\d{4}-\d{2}-\d{2}$/.test(ex)||ex<d))throw fe("pn-e","Tanggal harapan tidak boleh sebelum tanggal pesanan");
 const vd=h.v||"";if(!vd||!db.parties.some(x=>x._id===vd&&x.type==="pemasok"))throw fe("pn-v","Pilih pemasok");if(!C.length)throw Error("Tambahkan minimal satu barang");
 const P=C.map(z=>({...z,pr:db.products.find(x=>x._id===z.p)}));if(P.some(z=>!z.pr||!isAct(z.pr)))throw Error("Ada produk yang sudah tidak aktif");
 const un=P[0].pr.unit_id;if(P.some(z=>z.pr.unit_id!==un))throw Error("Semua barang harus dari unit yang sama");
 const o={_id:uid("PO"),no:dgPoNo(d),unit_id:un,party_id:vd,date:d,expect:ex||"",note:(h.n||"").trim(),status:"draf",items:P.map(z=>({product_id:z.p,qty:z.q,cost:z.c,recv:0})),recv_ids:[]};
 (db.dg_po=db.dg_po||[]).push(o);audit("create","po",o._id,o.no+" · "+dgPtyNm(vd)+" · Rp "+dgPoTot(o).toLocaleString("id-ID"));save();S.dgpc=[];S.dgph=null;S.msg="Pesanan "+o.no+" disimpan sebagai draf; kirim ke pemasok bila sudah pasti";okM()}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
MK.dgpn="edpn";MK.dgpo="edpo";MK.dgpr="edpo";MK.dgm="edgm";
MD.dgpn=()=>{const h=S.dgph=S.dgph||{},C=S.dgpc||[],us=dgUnits(),un=C.length?(db.products.find(x=>x._id===C[0].p)||{}).unit_id:(h.u||(dgScope()[0]||us[0]||{})._id),
  PR=db.products.filter(p=>p.unit_id===un&&isAct(p)),V=db.parties.filter(p=>p.type==="pemasok"&&isAct(p)),tot=C.reduce((a,z)=>a+Math.round(z.q*z.c),0);
 const rows=C.map((z,i)=>{const p=db.products.find(x=>x._id===z.p)||{};return`<div class="upr"><span class="upm"><b>${esc(p.name||"-")}</b><small>${qf(z.q)} ${esc(p.unit||"")} × ${rp(z.c)}</small></span><span class="upa"><b>${rp(Math.round(z.q*z.c))}</b>${ib("x","Hapus","dgpDelLine("+i+")","x")}</span></div>`}).join("");
 return{t:"Pesanan pembelian baru",s:"dgpSave()",y:"Simpan draf",b:
  fld("pn-d","Tanggal pesanan",{type:"date",value:h.d||today(),a:' onchange="dgpH(\'d\',this.value)"'})
  +fld("pn-e","Diharapkan tiba (opsional)",{type:"date",value:h.e||"",a:' onchange="dgpH(\'e\',this.value)"'})
  +(us.length>1?fld("pn-u","Unit usaha",{t:"select",a:(C.length?" disabled":"")+' onchange="dgpH(\'u\',this.value)"',opts:opt(us,u=>[u._id,u.name],un)}):"")
  +fld("pn-v","Pemasok",{t:"select",a:' onchange="dgpH(\'v\',this.value)"',opts:`<option value="">Pilih pemasok</option>`+opt(V,p=>[p._id,p.name],h.v),hint:V.length?"":"Belum ada pemasok. Tambahkan di Master > Pihak (jenis Pemasok)."})
  +`<h3>Barang (${C.length})</h3>`+(rows?`<div class="upl">${rows}</div><p class="k"><b>Perkiraan total: ${rp(tot)}</b></p>`:`<p class="k">Belum ada barang. Pilih produk, isi jumlah, lalu Tambah barang.</p>`)
  +fld("pn-p","Produk",{t:"select",opts:`<option value="">Pilih produk</option>`+opt(PR,p=>[p._id,p.code+" · "+p.name+" ("+qf(dgQty(p._id))+" "+(p.unit||"")+")"])})
  +fld("pn-q","Jumlah dipesan",{type:"text",a:' inputmode="decimal" autocomplete="off"',value:""})
  +fld("pn-c","Harga beli per satuan (Rp, kosong = harga beli produk)",{type:"text",a:RPA,value:""})
  +`<button class="b s" onclick="dgpLine()">Tambah barang</button>`
  +fld("pn-n","Catatan untuk pemasok (opsional)",{value:h.n||"",a:' maxlength="160" onchange="dgpH(\'n\',this.value)"'})}};

// ---------- Detail pesanan, kirim, tutup, batal ----------
function dgpKirim(id){try{if(noPerm("dagang.kelola"))return;const o=dgPoGet(id);if(!o||o.status!=="draf")throw Error("Hanya draf yang dapat dikirim");o.status="dikirim";audit("update","po",id,"Kirim "+o.no);save();S.msg="Pesanan "+o.no+" ditandai terkirim; cetak untuk pemasok bila perlu"}catch(e){S.msg="⚠ "+e.message}render()}
function dgpBatal(id){try{if(noPerm("dagang.kelola"))return;const o=dgPoGet(id);if(!o)throw Error("Pesanan tidak ditemukan");if(o.status==="batal"||o.status==="selesai")throw Error("Pesanan sudah "+PO_ST[o.status].toLowerCase());if(o.items.some(z=>(z.recv||0)>0))throw Error("Sudah ada barang diterima; gunakan Tutup sisa pesanan");
 o.status="batal";audit("void","po",id,"Batal "+o.no);save();S.msg="Pesanan "+o.no+" dibatalkan"}catch(e){S.msg="⚠ "+e.message}mdClose()}
function dgpTutup(id){try{if(noPerm("dagang.kelola"))return;const o=dgPoGet(id);if(!o||!dgPoLive(o))throw Error("Pesanan tidak aktif");if(!o.items.some(z=>(z.recv||0)>0))throw Error("Belum ada barang diterima; batalkan saja pesanannya");
 o.status="selesai";o.closed=true;audit("update","po",id,"Tutup sisa "+o.no);save();S.msg="Sisa pesanan "+o.no+" ditutup"}catch(e){S.msg="⚠ "+e.message}mdClose()}
function dgpDel(id){try{if(noPerm("dagang.kelola"))return;const i=(db.dg_po||[]).findIndex(o=>o._id===id);if(i<0)throw Error("Pesanan tidak ditemukan");const o=db.dg_po[i];if(o.status!=="draf")throw Error("Hanya draf yang dapat dihapus");
 db.dg_po.splice(i,1);audit("delete","po",id,"Hapus draf "+o.no);save();S.msg="Draf "+o.no+" dihapus"}catch(e){S.msg="⚠ "+e.message}mdClose()}
// pembelian dibatalkan: kembalikan jumlah diterima pada pesanan asal
function dgPoRevert(b){const o=b&&b.po_id&&dgPoGet(b.po_id);if(!o)return;b.items.forEach(z=>{const it=o.items.find(x=>x.product_id===z.product_id);if(it)it.recv=Math.max(0,qf3((it.recv||0)-z.qty))});o.recv_ids=(o.recv_ids||[]).filter(x=>x!==b._id);delete o.closed;if(o.status==="selesai"||o.status==="sebagian"||o.status==="dikirim")dgPoSt(o)}
MD.dgpo=()=>{const o=dgPoGet(S.edpo);if(!o)return{t:"Pesanan",s:"mdClose()",y:"Tutup",b:"<p>Pesanan tidak ditemukan.</p>",nf:1};
 const rows=o.items.map((z,i)=>{const p=db.products.find(x=>x._id===z.product_id)||{};return`<div class="upr"><span class="upm"><b>${esc(p.name||"-")}</b><small>pesan ${qf(z.qty)} ${esc(p.unit||"")} × ${rp(z.cost)} · diterima ${qf(z.recv||0)}${dgPoSisa(o,i)>0&&dgPoLive(o)?" · sisa "+qf(dgPoSisa(o,i)):""}</small></span><span class="upa"><b>${rp(Math.round(z.qty*z.cost))}</b></span></div>`}).join(""),
  rc=(o.recv_ids||[]).map(id=>(db.purchases||[]).find(b=>b._id===id)).filter(Boolean).map(b=>`<button class="upr${b.status==="void"?" vd":""}" onclick="mdOpen('dgd','${b._id}')"><span class="upm"><b>${esc(b.no)}</b><small>${esc(b.date)}${b.status==="void"?" · dibatalkan":""}</small></span><span class="upa"><b>${rp(b.total)}</b></span></button>`).join(""),
  can2=!noPerm("dagang.kelola"),late=dgPoLive(o)&&o.expect&&o.expect<today();
 return{t:esc(o.no),s:"mdClose()",y:"Tutup",nf:1,b:`<div class="ldw"><div class="lds"><span class="bdg ${o.status==="selesai"?"ok":o.status==="batal"?"":"wr"}">${PO_ST[o.status]}</span>${late?` <span class="bdg ng">Lewat tanggal harapan</span>`:""}${o.closed?` <span class="bdg">Sisa ditutup</span>`:""}</div>
  <div class="kvg"><div class="kv"><span class="k">Tanggal</span><b>${esc(o.date)}</b></div><div class="kv"><span class="k">Pemasok</span><b>${esc(dgPtyNm(o.party_id))}</b></div><div class="kv"><span class="k">Unit</span><b>${esc(unitName(o.unit_id))}</b></div>${o.expect?`<div class="kv"><span class="k">Diharapkan tiba</span><b>${esc(o.expect)}</b></div>`:""}<div class="kv"><span class="k">Perkiraan total</span><b>${rp(dgPoTot(o))}</b></div></div>${o.note?`<p class="k">${esc(o.note)}</p>`:""}
  <h3>Barang</h3><div class="upl">${rows}</div>${rc?`<h3>Penerimaan</h3><div class="upl">${rc}</div>`:""}
  <div class="lda">${ib("print","Cetak pesanan","openDoc('dgpo','"+o._id+"')","s")}${can2&&o.status==="draf"?ib("check","Tandai terkirim","dgpKirim('"+o._id+"')","s")+ib("x","Hapus draf","askC('dgpDel','"+o._id+"')","x"):""}${can2&&dgPoLive(o)?ib("check","Terima barang","S.dgrh=null;mdOpen('dgpr','"+o._id+"')","s")+(o.items.some(z=>(z.recv||0)>0)?ib("check","Tutup sisa pesanan","askC('dgpTutup','"+o._id+"')","x"):ib("x","Batalkan pesanan","askC('dgpBatal','"+o._id+"')","x")):""}</div></div>`}};
function vPo(id){const o=dgPoGet(id),bar=docBar(1);if(!o)return`${bar}<p class="k">Pesanan tidak tersedia.</p>`;
 const R=(a,b)=>`<tr><td>${a}</td><td>${b}</td></tr>`,rows=o.items.map((z,i)=>{const p=db.products.find(x=>x._id===z.product_id)||{};return`<tr><td>${i+1}</td><td>${esc(p.name||"-")}${p.code?" <small>("+esc(p.code)+")</small>":""}</td><td class="n">${qf(z.qty)} ${esc(p.unit||"")}</td><td class="n">${rp(z.cost)}</td><td class="n">${rp(Math.round(z.qty*z.cost))}</td></tr>`}).join("");
 return`${bar}<div class="${dcl(1)}">${kop()}<h3>PESANAN PEMBELIAN</h3><div class="cn">No. ${esc(o.no)} · ${esc(o.date)}${o.status==="batal"?" · DIBATALKAN":""}</div><table>${R("Kepada",esc(dgPtyNm(o.party_id)))}${R("Unit",esc(unitName(o.unit_id)))}${o.expect?R("Mohon dikirim sebelum",esc(o.expect)):""}${o.note?R("Catatan",esc(o.note)):""}</table>
  <table><tr><th>No</th><th>Barang</th><th class="n">Jumlah</th><th class="n">Harga</th><th class="n">Jumlah (Rp)</th></tr>${rows}<tr><td colspan="4"><b>Total</b></td><td class="n"><b>${rp(dgPoTot(o))}</b></td></tr></table>${sig([["Pemesan",""],["Pemasok",""]],0,o.date)}</div>`}

// ---------- Terima barang dari pesanan ----------
function dgrH(k,v){S.dgrh=S.dgrh||{};S.dgrh[k]=v;if(k==="t"||k==="fm"||k==="fr")render()}
const dgrN=v=>{const n=Math.round(+pn(String(v||"0")));return isNaN(n)||n<0?0:n};
MD.dgpr=()=>{const o=dgPoGet(S.edpo);if(!o||!dgPoLive(o))return{t:"Terima barang",s:"mdClose()",y:"Tutup",b:"<p>Pesanan tidak aktif.</p>",nf:1};
 const h=S.dgrh=S.dgrh||{},t=h.t||"credit",K=db.cash_accounts.filter(isAct),fr0=dgrN(h.fr),
  rows=o.items.map((z,i)=>{const p=db.products.find(x=>x._id===z.product_id)||{},s=dgPoSisa(o,i);if(s<=0)return"";return`<div class="upr"><span class="upm"><b>${esc(p.name||"-")}</b><small>pesan ${qf(z.qty)} · sudah ${qf(z.recv||0)} · sisa ${qf(s)} ${esc(p.unit||"")}</small></span></div>`
   +fld("pr-q"+i,"Diterima ("+esc(p.unit||"")+")",{type:"text",a:' inputmode="decimal" autocomplete="off" onchange="dgrH(\'q'+i+'\',this.value)"',value:h["q"+i]===undefined?qf(s):h["q"+i]})
   +fld("pr-c"+i,"Harga beli sebenarnya (Rp)",{type:"text",a:RPA+' onchange="dgrH(\'c'+i+'\',this.value)"',value:h["c"+i]===undefined?fm(z.cost):h["c"+i]})}).join("");
 return{t:"Terima barang · "+esc(o.no),s:"dgpTerima()",y:"Catat penerimaan",b:`<p class="k">${esc(dgPtyNm(o.party_id))}. Isi jumlah yang benar-benar tiba; sisanya tetap menunggu. Stok, jurnal, dan utang tercatat sebagai satu Pembelian.</p>`
  +fld("pr-d","Tanggal terima",{type:"date",value:h.d||today(),a:' onchange="dgrH(\'d\',this.value)"'})+rows
  +fld("pr-t","Pembayaran",{t:"select",a:' onchange="dgrH(\'t\',this.value)"',opts:opt([["credit","Kredit (utang usaha)"],["cash","Tunai"]],x=>x,t)})
  +(t==="cash"?fld("pr-k","Dibayar dari",{t:"select",a:' onchange="dgrH(\'k\',this.value)"',opts:`<option value="">Pilih kas/bank</option>`+opt(K,c=>[c._id,c.name],h.k)}):fld("pr-j","Jatuh tempo (hari)",{type:"text",a:' inputmode="numeric" autocomplete="off" onchange="dgrH(\'due\',this.value)"',value:h.due===undefined?"30":h.due}))
  +fld("pr-ds","Diskon pembelian (Rp, opsional)",{type:"text",a:RPA+' onchange="dgrH(\'disc\',this.value)"',value:h.disc||""})
  +fld("pr-fr","Biaya angkut (Rp, opsional)",{type:"text",a:RPA+' onchange="dgrH(\'fr\',this.value)"',value:h.fr||""})
  +(fr0>0?fld("pr-fm","Biaya angkut dibayar",{t:"select",a:' onchange="dgrH(\'fm\',this.value)"',opts:opt([["nota","Ikut tagihan pemasok"],["kas","Tunai dari kas/bank (terpisah)"]],x=>x,h.fm||"nota")}):"")
  +(fr0>0&&h.fm==="kas"&&t==="credit"?fld("pr-kf","Kas/bank untuk biaya angkut",{t:"select",a:' onchange="dgrH(\'kf\',this.value)"',opts:`<option value="">Pilih kas/bank</option>`+opt(K,c=>[c._id,c.name],h.kf)}):"")}};
function dgpTerima(){try{if(noPerm("dagang.kelola"))return;negAny();const o=dgPoGet(S.edpo),h=S.dgrh||{};if(!o||!dgPoLive(o))throw Error("Pesanan tidak aktif");
 const its=[],map=[];o.items.forEach((z,i)=>{const s=dgPoSisa(o,i);if(s<=0)return;const q=h["q"+i]===undefined?s:+pn(String(h["q"+i]).replace(",","."));if(isNaN(q)||q<0)throw fe("pr-q"+i,"Jumlah tidak valid");if(q===0)return;if(q>s+0.0005)throw fe("pr-q"+i,"Melebihi sisa pesanan ("+qf(s)+")");
  const c=h["c"+i]===undefined?z.cost:dgrN(h["c"+i]);if(!(c>0))throw fe("pr-c"+i,"Harga beli harus lebih dari 0");its.push({p:z.product_id,q:qf3(q),c});map.push([i,qf3(q)])});
 if(!its.length)throw Error("Isi jumlah diterima minimal satu barang");
 const r=dgbPost({d:h.d||today(),t:h.t||"credit",vd:o.party_id,k:h.k,days:h.due,items:its,disc:h.disc,fr:h.fr,fm:h.fm,kf:h.kf,po:o._id});
 map.forEach(([i,q])=>{o.items[i].recv=qf3((o.items[i].recv||0)+q)});(o.recv_ids=o.recv_ids||[]).push(r._id);dgPoSt(o);audit("update","po",o._id,"Terima "+r.no+" · "+o.no+" ("+o.status+")");save();
 S.dgrh=null;S.msg="Penerimaan dicatat sebagai "+r.no+" ("+rp(r.total).replace(/<[^>]+>/g,"")+")"+(o.status==="selesai"?"; pesanan selesai":"; sisa pesanan masih menunggu");S.md="dgpo";S.edpo=o._id}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}

// ---------- Bayar beberapa nota utang sekaligus ----------
const dgmList=pid=>dgPurch().filter(b=>dgOwed(b)>0&&(b.party_id||"")===(pid||"")).sort((a,b)=>String(a.due_date||"9").localeCompare(String(b.due_date||"9"))||String(a.date).localeCompare(String(b.date))||String(a.no).localeCompare(String(b.no)));
function dgmOpen(pid){S.dgmh={p:pid||"",sel:null,a:undefined};mdOpen("dgm","x")}
function dgmSelOf(){const h=S.dgmh||{},L=dgmList(h.p);if(!h.sel)h.sel=Object.fromEntries(L.map(b=>[b._id,1]));return L.filter(b=>h.sel[b._id])}
function dgmTog(id,on){const h=S.dgmh;h.sel=h.sel||{};if(on)h.sel[id]=1;else delete h.sel[id];h.a=undefined;render()}
function dgmAll(on){const h=S.dgmh;h.sel={};if(on)dgmList(h.p).forEach(b=>{h.sel[b._id]=1});h.a=undefined;render()}
function dgmH(k,v){S.dgmh=S.dgmh||{};S.dgmh[k]=v;if(k==="p"){S.dgmh.sel=null;S.dgmh.a=undefined;render()}}
MD.dgm=()=>{const h=S.dgmh=S.dgmh||{p:""},Vs=[...new Set(dgPurch().filter(b=>dgOwed(b)>0).map(b=>b.party_id||""))],L=dgmList(h.p),sel=dgmSelOf(),tot=sel.reduce((a,b)=>a+dgOwed(b),0),t=today(),
  rows=L.map(b=>{const dd=b.due_date?dgDays(t,b.due_date):null;return`<label class="upr alr"><input type="checkbox"${h.sel&&h.sel[b._id]?" checked":""} onchange="dgmTog('${b._id}',this.checked)" aria-label="Pilih ${esc(b.no)}"><span class="upm"><b>${esc(b.no)}</b><small>${esc(b.date)}${b.due_date?" · jatuh tempo "+esc(b.due_date)+(dd<0?" (lewat "+(-dd)+" hari)":""):""}</small></span><span class="upa"><b>${rp(dgOwed(b))}</b></span></label>`}).join("");
 return{t:"Bayar utang pemasok",s:"dgmSave()",y:"Catat pembayaran",b:
  fld("dm-p","Pemasok",{t:"select",a:' onchange="dgmH(\'p\',this.value)"',opts:opt(Vs.map(k=>[k,dgPtyNm(k||null)]),x=>x,h.p||"")})
  +(L.length?`<div class="fl"><button class="b s sm" type="button" onclick="dgmAll(true)">Pilih semua</button><button class="b s sm" type="button" onclick="dgmAll(false)">Kosongkan</button></div><div class="upl">${rows}</div>`:`<p class="k">Tidak ada nota belum lunas untuk pemasok ini.</p>`)
  +`<div class="kvg"><div class="kv"><span class="k">Nota dipilih</span><b>${sel.length}</b></div><div class="kv"><span class="k">Sisa utang dipilih</span><b>${rp(tot)}</b></div></div>`
  +fld("dm-d","Tanggal bayar",{type:"date",value:h.d||today(),a:' onchange="dgmH(\'d\',this.value)"'})
  +fld("dm-a","Jumlah dibayar (Rp)",{type:"text",a:RPA+' onchange="dgmH(\'a\',this.value)"',value:h.a===undefined?fm(tot):h.a,hint:"Dibagi ke nota terpilih mulai dari yang jatuh tempo paling awal. Isi lebih kecil dari total untuk pembayaran sebagian."})
  +fld("dm-k","Dibayar dari",{t:"select",a:' onchange="dgmH(\'k\',this.value)"',opts:`<option value="">Pilih kas/bank</option>`+opt(db.cash_accounts.filter(isAct),c=>[c._id,c.name],h.k)})}};
function dgmSave(){try{if(noPerm("dagang.kelola"))return;negAny();const h=S.dgmh||{},sel=dgmSelOf(),d=h.d||today(),k=db.cash_accounts.find(x=>x._id===h.k);
 if(!sel.length)throw Error("Pilih minimal satu nota");if(!/^\d{4}-\d{2}-\d{2}$/.test(d))throw fe("dm-d","Tanggal wajib diisi");
 const tot=sel.reduce((a,b)=>a+dgOwed(b),0),a=h.a===undefined?tot:dgrN(h.a);if(!(a>0))throw fe("dm-a","Jumlah harus lebih dari 0");if(a>tot)throw fe("dm-a","Jumlah melebihi sisa utang nota terpilih (Rp "+fm(tot)+")");
 if(!k||!isAct(k))throw fe("dm-k","Pilih kas/bank");sel.forEach(b=>{if(d<b.date)throw fe("dm-d","Tanggal bayar tidak boleh sebelum tanggal nota "+b.no)});
 const sk=net(acc(k.account_id),bal(()=>true));if(sk<a)throw fe("dm-k","Saldo kas/bank tidak cukup (tersedia Rp "+fm(sk)+")");
 let rest=a,n=0;const nm=dgPtyNm(h.p||null);
 sel.forEach(b=>{if(rest<=0)return;const o=dgOwed(b),x=Math.min(o,rest);rest-=x;
  const tr=post({type:"beli_bayar",date:d,unit:b.unit_id,desc:"Bayar utang "+b.no+" · "+nm,lines:[{acc:"ACC2100",d:x},{acc:k.account_id,c:x}]});
  (b.pays=b.pays||[]).push({_id:uid("PBY"),date:d,amount:x,cash_id:k._id,transaction_id:tr._id,status:"ok",batch:true});n++;audit("create","purchase",b._id,"Bayar utang "+b.no+" Rp "+x.toLocaleString("id-ID")+" (gabungan)")});
 save();S.dgmh=null;S.msg="Pembayaran "+rp(a).replace(/<[^>]+>/g,"")+" dibagi ke "+n+" nota "+nm;mdClose()}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null;render()}}
