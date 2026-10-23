// ===== PERDAGANGAN PL9 (v1.1.364): beberapa gudang per unit dan transfer stok antar gudang =====
// Gudang utama = sisa (total stok − stok di gudang lain), sehingga penjualan, pembelian, retur, dan opname lama tidak berubah.
// Stok di gudang lain hanya berubah lewat transfer (db.dg_tf). Transfer antar unit dagang belum ada (butuh jurnal antar unit).
const dgWhAll=un=>(db.dg_wh||[]).filter(w=>isAct(w)&&(!un||w.unit_id===un)),
 dgWhNm=id=>id?((db.dg_wh||[]).find(w=>w._id===id)||{}).name||"-":"Gudang utama",
 dgTfOk=()=>(db.dg_tf||[]).filter(t=>t.status!=="void"),
 dgWhQty=(pid,wh)=>{if(!wh)return dgMainQty(pid);return qf3(dgTfOk().filter(t=>t.product_id===pid).reduce((a,t)=>a+(t.to===wh?t.qty:0)-(t.from===wh?t.qty:0),0))},
 dgOtherQty=pid=>qf3(dgTfOk().filter(t=>t.product_id===pid).reduce((a,t)=>a+(t.to?t.qty:0)-(t.from?t.qty:0),0)),
 dgMainQty=pid=>qf3(dgQty(pid)-dgOtherQty(pid));
function dgWhAdd(){try{if(noPerm("dagang.kelola"))return;const n=($("#wh-n").value||"").trim().slice(0,40),un=($("#wh-u")||{}).value||(dgScope()[0]||dgUnits()[0]||{})._id;
 if(!n)throw fe("wh-n","Nama gudang wajib diisi");if(!un||!dgUnits().some(u=>u._id===un))throw Error("Pilih unit usaha Perdagangan");
 if(/^gudang utama$/i.test(n)||dgWhAll(un).some(w=>w.name.toLowerCase()===n.toLowerCase()))throw fe("wh-n","Nama gudang sudah ada di unit ini");
 const w={_id:uid("WH"),unit_id:un,name:n,status:"aktif"};(db.dg_wh=db.dg_wh||[]).push(w);audit("create","wh",w._id,n+" · "+unitName(un));save();S.msg="Gudang "+n+" ditambahkan";S.fe=null}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function dgWhOff(id){try{if(noPerm("dagang.kelola"))return;const w=(db.dg_wh||[]).find(x=>x._id===id);if(!w)return;
 if(dgProds(1).some(p=>p.unit_id===w.unit_id&&Math.abs(dgWhQty(p._id,id))>0.0004))throw Error("Gudang masih berisi stok; pindahkan dulu ke gudang lain");
 w.status="nonaktif";audit("update","wh",id,"nonaktif "+w.name);save();S.msg="Gudang "+w.name+" dinonaktifkan"}catch(e){S.msg="⚠ "+e.message}render()}
function dgTfNo(d){const y=String(d).slice(0,4),pre="TF-"+y+"-";let mx=0;(db.dg_tf||[]).forEach(o=>{if(typeof o.no==="string"&&o.no.startsWith(pre)){const n=+o.no.slice(pre.length);if(n>mx)mx=n}});return pre+String(mx+1).padStart(4,"0")}
function dgTfPost(sp){const p=db.products.find(x=>x._id===sp.p);if(!p||!isAct(p))throw Error("Produk tidak valid");const un=p.unit_id,q=qf3(+sp.q);
 if(!db.business_units.some(u=>u._id===un&&u.type==="dagang"&&isAct(u)))throw Error("Unit usaha bukan unit Perdagangan aktif");
 const from=sp.from||"",to=sp.to||"";if(from===to)throw fe("tf-t","Gudang asal dan tujuan harus berbeda");
 for(const w of[from,to])if(w&&!dgWhAll(un).some(x=>x._id===w))throw Error("Gudang tidak valid untuk unit produk ini");
 if(!(q>0))throw fe("tf-q","Jumlah harus lebih dari 0");if(!/^\d{4}-\d{2}-\d{2}$/.test(sp.d||""))throw fe("tf-d","Tanggal wajib diisi");if(closed(sp.d))throw Error("Periode "+sp.d.slice(0,7)+" sudah ditutup");
 const have=dgWhQty(p._id,from);if(q>have+0.0005)throw fe("tf-q","Stok di "+dgWhNm(from)+" hanya "+qf(have)+" "+(p.unit||""));
 const t={_id:uid("TF"),no:dgTfNo(sp.d),unit_id:un,product_id:p._id,from,to,qty:q,date:sp.d,note:(sp.n||"").trim().slice(0,120),status:"ok"};
 (db.dg_tf=db.dg_tf||[]).push(t);audit("create","tf",t._id,p.name+" "+qf(q)+" · "+dgWhNm(from)+" → "+dgWhNm(to));save();return t}
function dgTfSave(){try{if(noPerm("dagang.kelola"))return;const h=S.dgtfh||{},v=i=>($("#"+i)||{value:""}).value;
 const t=dgTfPost({p:v("tf-p"),from:v("tf-f"),to:v("tf-t"),q:+pn(v("tf-q")),d:v("tf-d")||today(),n:v("tf-n")});S.dgtfh=null;S.msg="Transfer "+t.no+" dicatat: "+dgWhNm(t.from)+" → "+dgWhNm(t.to);okM()}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function dgTfBatal(id){try{if(noPerm("dagang.kelola"))return;const t=(db.dg_tf||[]).find(x=>x._id===id);if(!t||t.status==="void")return;if(closed(t.date))throw Error("Periode "+t.date.slice(0,7)+" sudah ditutup");
 t.status="void";const bad=dgProds(1).some(p=>p._id===t.product_id&&[t.from,t.to].some(w=>dgWhQty(p._id,w)<-0.0004));
 if(bad){t.status="ok";throw Error("Tidak bisa dibatalkan: stok di gudang tujuan sudah terpakai atau dipindah lagi")}
 audit("void","tf",id,"batal "+t.no);save();S.msg="Transfer "+t.no+" dibatalkan"}catch(e){S.msg="⚠ "+e.message}render()}
MK.dgtf="edtf";
MD.dgtf=()=>{const us=dgUnits(),h=S.dgtfh=S.dgtfh||{},PR=dgProds().filter(p=>us.some(u=>u._id===p.unit_id)),pid=h.p||(PR[0]||{})._id,p=db.products.find(x=>x._id===pid)||{},W=dgWhAll(p.unit_id),
  ws=[["","Gudang utama"]].concat(W.map(w=>[w._id,w.name]));
 if(!W.length)return{t:"Transfer stok",s:"mdClose()",y:"Tutup",nf:1,b:"<p>Tambahkan minimal satu gudang tambahan untuk unit produk ini dulu.</p>"};
 return{t:"Transfer stok antar gudang",s:"dgTfSave()",y:"Pindahkan",b:
  fld("tf-p","Produk",{t:"select",a:' onchange="S.dgtfh={...S.dgtfh,p:this.value};render()"',opts:opt(PR,x=>[x._id,x.name+" · "+unitName(x.unit_id)],pid)})
  +fld("tf-f","Dari gudang",{t:"select",a:' onchange="S.dgtfh={...S.dgtfh,f:this.value};render()"',opts:ws.map(([i,n])=>`<option value="${i}"${(h.f||"")===i?" selected":""}>${esc(n)} (${qf(dgWhQty(pid,i))} ${esc(p.unit||"")})</option>`).join("")})
  +fld("tf-t","Ke gudang",{t:"select",opts:ws.map(([i,n])=>`<option value="${i}"${(h.t!==undefined?h.t:(W[0]||{})._id)===i?" selected":""}>${esc(n)}</option>`).join("")})
  +fld("tf-q","Jumlah",{type:"text",a:RPA,value:""})+fld("tf-d","Tanggal",{type:"date",value:today()})+fld("tf-n","Catatan (opsional)",{type:"text",value:""})}};
function dgWhCard(){const ok2=can("dagang.kelola"),us=dgUnits(),W=dgWhAll(),T=(db.dg_tf||[]).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))||String(b.no).localeCompare(String(a.no))).slice(0,10);
 const rows=W.map(w=>{const ps=dgProds(1).filter(p=>p.unit_id===w.unit_id),n=ps.filter(p=>dgWhQty(p._id,w._id)>0.0004).length,v=Math.round(ps.reduce((a,p)=>{const q=dgQty(p._id);return a+(q>0?dgVal(p._id)*dgWhQty(p._id,w._id)/q:0)},0));
  return`<div class="upr"><span class="upm"><b>${esc(w.name)}</b><small>${esc(unitName(w.unit_id))} · ${n} produk berstok</small></span><span class="upa"><b>${rp(v)}</b>${ok2?`<button class="b s sm" onclick="dgWhOff('${w._id}')">Nonaktifkan</button>`:""}</span></div>`}).join("");
 const tr=T.map(t=>{const p=db.products.find(x=>x._id===t.product_id)||{};return`<div class="upr${t.status==="void"?" vd":""}"><span class="upm"><b>${esc(t.no)} · ${esc(p.name||"-")}</b><small>${esc(tglS(t.date))} · ${esc(dgWhNm(t.from))} → ${esc(dgWhNm(t.to))}${t.status==="void"?" · batal":""}</small></span><span class="upa"><b>${qf(t.qty)} ${esc(p.unit||"")}</b>${ok2&&t.status!=="void"?`<button class="b s sm" onclick="dgTfBatal('${t._id}')">Batalkan</button>`:""}</span></div>`}).join("");
 return dcard("Gudang dan transfer stok",W.length?W.length+" gudang tambahan":"Satu gudang (utama)",
  `<p class="k">Gudang utama = sisa stok di luar gudang tambahan. Penjualan dan pembelian tetap memakai total stok; pindahkan stok antar gudang lewat Transfer. Nilai gudang memakai rata-rata biaya produk.</p>`+(rows?`<div class="upl">${rows}</div>`:"")
  +(ok2?`<div class="fl"><input id="wh-n" type="text" maxlength="40" aria-label="Nama gudang baru" placeholder="Nama gudang baru">${us.length>1?`<select id="wh-u" aria-label="Unit usaha gudang">${opt(us,u=>[u._id,u.name],(dgScope()[0]||{})._id)}</select>`:""}<button class="b" onclick="dgWhAdd()">Tambah gudang</button>${W.length?`<button class="b s" onclick="mdOpen('dgtf','')">Transfer stok</button>`:""}</div>`:"")
  +(tr?`<h3>Transfer terakhir</h3><div class="upl">${tr}</div>`:""),"")}
