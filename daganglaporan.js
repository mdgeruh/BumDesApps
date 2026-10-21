// ===== PERDAGANGAN PD6 (v1.1.302): Laporan Perdagangan — laba rugi unit, penjualan per produk/bulan, persediaan, umur piutang dan utang, stok menipis =====
// Laba rugi dari jurnal (unit dagang, rentang tanggal, tanpa jurnal penutup); penjualan dari sales + sale_items dikurangi retur (stock_moves retjual).
const dgLR=()=>{const d=today(),a=S.dgl1===undefined?d.slice(0,7)+"-01":S.dgl1,b=S.dgl2===undefined?d:S.dgl2,u=S.dgu||"all",I=new Set(dgUnits().filter(x=>u==="all"||x._id===u).map(x=>x._id));return{a,b,u,I}},
 dgInR=(x,r)=>(!r.a||x>=r.a)&&(!r.b||x<=r.b);
function dgLapData(){const r=dgLR(),T=new Map(db.transactions.map(t=>[t._id,t.type])),
  m=bal(l=>r.I.has(l.business_unit_id)&&dgInR(l.date,r)&&T.get(l.transaction_id)!=="closing"),
  R=db.accounts.filter(a=>a.type==="revenue"&&m[a._id]).map(a=>({code:a.code,name:a.name,v:net(a,m)})).filter(x=>Math.round(x.v)),
  E=db.accounts.filter(a=>a.type==="expense"&&m[a._id]).map(a=>({code:a.code,name:a.name,v:net(a,m),id:a._id})).filter(x=>Math.round(x.v)),
  pen=R.reduce((s,x)=>s+x.v,0),hpp=Math.round(m.ACC5900?net(acc("ACC5900"),m):0),sel=Math.round(m.ACC5910?net(acc("ACC5910"),m):0),
  lain=E.filter(x=>x.id!=="ACC5900"&&x.id!=="ACC5910").reduce((s,x)=>s+x.v,0),
  // peristiwa penjualan (+) dan retur (−)
  ev=[];
 dgjAll().filter(s=>s.status==="posted"&&r.I.has(s.unit_id)&&dgInR(s.date,r)).forEach(s=>db.sale_items.filter(i=>i.sale_id===s._id).forEach(i=>ev.push({d:s.date,p:i.product_id,q:i.qty,o:i.subtotal-(i.disc||0),h:i.hpp||0})));
 (db.stock_moves||[]).filter(x=>x.kind==="retjual"&&x.status!=="void"&&r.I.has(x.unit_id)&&dgInR(x.date,r)).forEach(x=>ev.push({d:x.date,p:x.product_id,q:-x.qty,o:-(x.refund||0),h:-x.value}));
 const P=new Map(),B=new Map();ev.forEach(e=>{const p=P.get(e.p)||{id:e.p,q:0,o:0,h:0};p.q=qf3(p.q+e.q);p.o+=e.o;p.h+=e.h;P.set(e.p,p);const k=e.d.slice(0,7),b=B.get(k)||{k,o:0,h:0};b.o+=e.o;b.h+=e.h;B.set(k,b)});
 const prod=[...P.values()].map(p=>({...p,n:dgkPn(p.id),lk:p.o-p.h,mg:p.o>0?Math.round((p.o-p.h)/p.o*1000)/10:0})).sort((a,b)=>b.o-a.o),
  bln=[...B.values()].sort((a,b)=>a.k.localeCompare(b.k)).map(b=>({...b,lk:b.o-b.h})),
  sold=new Set(prod.filter(p=>p.q>0).map(p=>p.id)),lambat=dgProds(1).filter(p=>r.I.has(p.unit_id)&&!sold.has(p._id)&&dgQty(p._id)>0).map(p=>({n:p.name,q:dgQty(p._id),v:dgVal(p._id),u:p.unit||""})),
  inv=dgProds(1).filter(p=>r.I.has(p.unit_id)).map(p=>({n:p.name,u:p.unit||"",q:dgQty(p._id),v:dgVal(p._id),st:dgStat(p)})).filter(x=>x.q>0||x.v).sort((a,b)=>b.v-a.v),
  tp=today(),pb=[["0–30 hari",0,30],["31–60 hari",31,60],["61–90 hari",61,90],["Lebih dari 90 hari",91,1e9]],
  piu=pb.map(([n,lo,hi])=>({n,v:0,c:0})),ut=[["Belum jatuh tempo",-1e9,0],["Terlambat 1–30 hari",1,30],["Terlambat 31–60 hari",31,60],["Terlambat lebih dari 60 hari",61,1e9]].map(([n])=>({n,v:0,c:0}));
 dgjAll().filter(s=>s.status==="posted"&&r.I.has(s.unit_id)&&owedS(s)>.005).forEach(s=>{const k=dgDays(s.date,tp),i=k<=30?0:k<=60?1:k<=90?2:3;piu[i].v+=owedS(s);piu[i].c++});
 dgPurch().filter(b=>r.I.has(b.unit_id)&&dgOwed(b)>0).forEach(b=>{const k=b.due_date?dgDays(b.due_date,tp):0,i=k<=0?0:k<=30?1:k<=60?2:3;ut[i].v+=dgOwed(b);ut[i].c++});
 const rnd=a=>a.map(x=>({...x,v:Math.round(x.v)}));
 return{r,R,E,pen:Math.round(pen),hpp,sel,lain:Math.round(lain),lk:Math.round(pen-hpp),lb:Math.round(pen-hpp-sel-lain),prod,bln,lambat,inv,piu:rnd(piu),ut:rnd(ut),tipis:dgProds(1).filter(p=>r.I.has(p.unit_id)&&dgStat(p)).map(p=>({n:p.name,u:p.unit||"",q:dgQty(p._id),v:dgVal(p._id),st:dgStat(p)}))}}
function dgLapCsv(){const D=dgLapData(),q=a=>a.map(x=>x.length?x:["",""]);const t=(h,r)=>tblCsv(h,r);
 return[t(["Laba Rugi Perdagangan "+D.r.a+" s/d "+D.r.b,"Rp"],[["Penjualan bersih",D.pen],["HPP",D.hpp],["Laba kotor",D.lk],["Selisih stok",D.sel],["Beban lain",D.lain],["Laba bersih",D.lb]]),
  t(["Produk","Jumlah","Penjualan","HPP","Laba kotor","Margin %"],D.prod.map(p=>[p.n,p.q,p.o,p.h,p.lk,p.mg])),
  t(["Bulan","Penjualan","~HPP","Laba kotor"],D.bln.map(b=>[b.k,b.o,b.h,b.lk])),
  t(["Persediaan","Jumlah","Nilai"],D.inv.map(x=>[x.n,x.q,x.v])),
  t(["Umur piutang","Nota","Rp"],D.piu.map(x=>[x.n,x.c,x.v])),
  t(["Umur utang","Nota","Rp"],D.ut.map(x=>[x.n,x.c,x.v]))].join("\r\n\r\n")}
function dgLapDl(){try{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["﻿"+dgLapCsv()],{type:"text/csv"}));a.download="laporan-perdagangan-"+today()+".csv";a.click();S.msg="Laporan Perdagangan diunduh (CSV)"}catch(e){S.msg="⚠ Unduh gagal: "+e.message}render()}
function dgLapSet(k,v){S[k]=v;render()}
function dgLapPre(k){const t=today(),y=+t.slice(0,4),m=+t.slice(5,7),p2=n=>String(n).padStart(2,"0");let a,b=t;
 if(k==="bln")a=y+"-"+p2(m)+"-01";else if(k==="3bln"){let yy=y,mm=m-2;if(mm<1){mm+=12;yy--}a=yy+"-"+p2(mm)+"-01"}else if(k==="thn")a=y+"-01-01";else if(k==="lalu"){a=(y-1)+"-01-01";b=(y-1)+"-12-31"}else{a="";b=""}
 S.dgl1=a;S.dgl2=b;S.dgpre=k;render()}
function dgLap(U){const D=dgLapData(),r=D.r,us=dgUnits(),bad=r.a&&r.b&&r.a>r.b,kv=(k,v,c)=>`<div class="kv"><span class="k">${k}</span><b${c?` class="${c}"`:""}>${v}</b></div>`,
  tb=(h,rows,empty)=>rows.length?`<div class="dgtw"><table class="rtt"><thead><tr>${h.map((x,i)=>`<th class="${i?"r":""}${x[0]==="~"?" dgm":""}">${x.replace(/^~/,"")}</th>`).join("")}</tr></thead><tbody>${rows.map(z=>`<tr>${z.map((c,i)=>`<td class="${i?"r":""}${h[i][0]==="~"?" dgm":""}">${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`:`<p class="k">${empty}</p>`;
 return`<h2>Laporan Perdagangan</h2>${dcard("Filter dan cetak","Rentang tanggal dan unit untuk laba rugi dan penjualan; persediaan, piutang, dan utang menunjukkan posisi hari ini.",
  `<div class="dgchip">${[["bln","Bulan ini"],["3bln","3 bulan"],["thn","Tahun ini"],["lalu","Tahun lalu"],["semua","Semua"]].map(([k,t])=>`<button class="${S.dgpre===k?"on":""}" onclick="dgLapPre('${k}')">${t}</button>`).join("")}</div><div class="fl"><input type="date" aria-label="Dari tanggal" value="${esc(r.a||"")}" onchange="S.dgpre=null;dgLapSet('dgl1',this.value)"><input type="date" aria-label="Sampai tanggal" value="${esc(r.b||"")}" onchange="S.dgpre=null;dgLapSet('dgl2',this.value)">${us.length>1?`<select aria-label="Unit usaha" onchange="dgLapSet('dgu',this.value)"><option value="all">Semua unit dagang</option>${opt(us,u=>[u._id,u.name],r.u)}</select>`:""}<button class="b" onclick="window.print()">Cetak</button><button class="b s" onclick="dgLapDl()">Unduh CSV</button></div>${bad?`<p class="k"><span class="bdg wr">Tanggal awal setelah tanggal akhir</span></p>`:""}`,"noprint")}
${dcard("Laba Rugi Perdagangan",(r.a||"awal")+" s/d "+(r.b||"akhir"),`<div class="kvg">${kv("Penjualan bersih",rp(D.pen))}${kv("HPP",rp(D.hpp))}${kv("Laba kotor",rp(D.lk),D.lk<0?"neg":"")}${kv("Selisih stok",rp(D.sel))}${kv("Beban lain",rp(D.lain))}${kv(D.lb<0?"Rugi bersih":"Laba bersih",rp(D.lb),D.lb<0?"neg":"")}</div><p class="k">Dari jurnal unit Perdagangan (penjualan, retur, HPP, opname, dan beban unit). Penjualan bersih sudah dikurangi retur.</p>`,"")}
${dcard("Penjualan per Produk",D.prod.length+" produk",tb(["Produk","Jumlah","Penjualan","Laba kotor","~Margin"],D.prod.map(p=>[esc(p.n),qf(p.q),rp(p.o),rp(p.lk),p.mg+"%"]),"Belum ada penjualan pada rentang ini."),"")}
${dcard("Penjualan per Bulan",D.bln.length+" bulan",tb(["Bulan","Penjualan","~HPP","Laba kotor"],D.bln.map(b=>[b.k,rp(b.o),rp(b.h),rp(b.lk)]),"Belum ada penjualan pada rentang ini."),"")}
${dcard("Produk Terlaris dan Lambat","Terlaris menurut penjualan; lambat = ada stok tetapi tidak terjual pada rentang ini",`<h3>Terlaris</h3>`+tb(["Produk","Jumlah","Penjualan"],D.prod.filter(p=>p.q>0).slice(0,5).map(p=>[esc(p.n),qf(p.q),rp(p.o)]),"Belum ada penjualan.")+`<h3>Lambat terjual</h3>`+tb(["Produk","Stok","Nilai"],D.lambat.slice(0,10).map(p=>[esc(p.n),qf(p.q)+" "+esc(p.u),rp(p.v)]),"Semua barang berstok terjual pada rentang ini."),"")}
${dcard("Nilai Persediaan",rp(D.inv.reduce((a,x)=>a+x.v,0)),tb(["Produk","Stok","Nilai"],D.inv.map(x=>[esc(x.n)+(x.st?` <span class="bdg ${x.st[0]}">${x.st[1]}</span>`:""),qf(x.q)+" "+esc(x.u),rp(x.v)]),"Belum ada stok."),"")}
${dcard("Umur Piutang dan Utang","Posisi hari ini, dihitung dari tanggal nota (piutang) dan jatuh tempo (utang)",`<h3>Piutang pelanggan</h3>`+tb(["Umur","Nota","Rp"],D.piu.map(x=>[x.n,x.c,rp(x.v)]),"")+`<h3>Utang usaha</h3>`+tb(["Status","Nota","Rp"],D.ut.map(x=>[x.n,x.c,rp(x.v)]),""),"")}
${dcard("Stok Menipis atau Habis",D.tipis.length+" produk",tb(["Produk","Stok","Status"],D.tipis.map(x=>[esc(x.n),qf(x.q)+" "+esc(x.u),x.st[1]]),"Tidak ada stok menipis."),"")}`}
// ===== PD7 (v1.1.303): ringkasan hidup — tombol cepat, Perlu tindakan, tren penjualan 6 bulan =====
const dgNav=k=>"S.dgv='"+k+"';render()";
function dgTren(n){const t=today(),res=[];let y=+t.slice(0,4),m=+t.slice(5,7);for(let i=0;i<(n||6);i++){res.unshift({k:y+"-"+String(m).padStart(2,"0"),o:0,h:0});m--;if(m<1){m=12;y--}}
 const M=new Map(res.map(x=>[x.k,x])),I=dgIds();
 dgjAll().filter(s=>s.status==="posted"&&I.has(s.unit_id)).forEach(s=>{const b=M.get(String(s.date).slice(0,7));if(b){b.o+=s.total;b.h+=s.hpp||0}});
 (db.stock_moves||[]).filter(x=>x.kind==="retjual"&&x.status!=="void"&&I.has(x.unit_id)).forEach(x=>{const b=M.get(String(x.date).slice(0,7));if(b){b.o-=x.refund||0;b.h-=x.value}});
 return res}
function dgPerlu(){const t=today(),P=dgPiutList().filter(r=>r.days>30),pt=P.reduce((a,r)=>a+r.tot,0),ts=dgProds().filter(p=>dgStat(p)),hb=ts.filter(p=>dgQty(p._id)<=0).length,
  U=dgPurch().filter(b=>dgOwed(b)>0&&b.due_date&&dgDays(t,b.due_date)<=7),late=U.filter(b=>b.due_date<t).length,ut=U.reduce((a,b)=>a+dgOwed(b),0),
  L=[];
 if(ts.length)L.push(["Stok menipis atau habis",ts.length+" produk"+(hb?" ("+hb+" habis)":""),"stok","ng"]);
 if(P.length)L.push(["Piutang lebih dari 30 hari",P.length+" pelanggan · "+rp(pt).replace(/<[^>]+>/g,""),"piutang","wr"]);
 if(U.length)L.push(["Utang jatuh tempo ≤ 7 hari",U.length+" pembelian · "+rp(ut).replace(/<[^>]+>/g,"")+(late?" · "+late+" terlambat":""),"beli",late?"ng":"wr"]);
 {const ex=typeof dgExpData==="function"?dgExpData().L.filter(b=>b.dl<=30):[];if(ex.length)L.push(["Barang kedaluwarsa atau hampir (≤ 30 hari)",ex.length+" batch · "+rp(ex.reduce((a,b)=>a+b.val,0)).replace(/<[^>]+>/g,""),"stok",ex.some(b=>b.dl<=0)?"ng":"wr"])}
 return L}
function dgRingPlus(){const ok2=can("dagang.kelola"),L=dgPerlu(),T=dgTren(6),mx=Math.max(1,...T.map(x=>x.o));
 const q=ok2?`<div class="fl"><button class="b" onclick="go('ksr')">Buka Kasir</button><button class="b s" onclick="dgbNew()">Pembelian baru</button><button class="b s" onclick="${dgNav("piutang")}">Piutang</button></div>`:"";
 return`${q}${dcard("Perlu tindakan",L.length?L.length+" hal":"Tidak ada",L.length?`<div class="upl">${L.map(([a,b,k,c])=>`<button class="upr" onclick="${dgNav(k)}"><span class="upm"><b>${a}</b><small>${b}</small></span><span class="upa"><span class="bdg ${c}">Periksa</span></span></button>`).join("")}</div>`:`<p class="k"><span class="bdg ok">Aman</span> Stok, piutang, dan utang tidak ada yang perlu perhatian.</p>`,"")}
${dcard("Tren penjualan 6 bulan","Penjualan bersih setelah retur",`<div class="upl">${T.map(x=>`<div class="upr"><span class="upm"><b>${x.k}</b><i style="display:block;height:8px;border-radius:4px;background:var(--ac,#2a7a4b);width:${Math.round(Math.max(0,x.o)/mx*100)}%;min-width:2px"></i></span><span class="upa"><b>${rp(x.o)}</b><small>laba kotor ${rp(x.o-x.h).replace(/<[^>]+>/g,"")}</small></span></div>`).join("")}</div>`,"")}`}
