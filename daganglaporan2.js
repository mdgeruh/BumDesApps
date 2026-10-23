// ===== PERDAGANGAN PL7 (v1.1.362): Analitik — per kategori, ABC, perputaran stok, margin per pelanggan/bulan, grafik tren, pembanding periode =====
// Memakai peristiwa penjualan (+) dan retur (−) seperti dgLapData; nilai persediaan memakai posisi hari ini sebagai pendekatan rata-rata.
const dgAdd=(d,n)=>new Date(Date.parse(d+"T00:00:00Z")+n*864e5).toISOString().slice(0,10),
 dgAnPer=r=>{if(!r.a||!r.b||r.a>r.b)return null;const n=dgDays(r.a,r.b)+1;return{a:dgAdd(r.a,-n),b:dgAdd(r.a,-1),n}};
function dgAnEv(a,b,I){const ev=[],ok2=x=>(!a||x>=a)&&(!b||x<=b);
 dgjAll().filter(s=>s.status==="posted"&&I.has(s.unit_id)&&ok2(s.date)).forEach(s=>db.sale_items.filter(i=>i.sale_id===s._id).forEach(i=>ev.push({d:s.date,s:s._id,p:i.product_id||"~"+(i.label||"Lain-lain"),pt:s.party_id||"",q:i.qty,o:i.subtotal-(i.disc||0),h:i.hpp||0})));
 (db.stock_moves||[]).filter(x=>x.kind==="retjual"&&x.status!=="void"&&I.has(x.unit_id)&&ok2(x.date)).forEach(x=>ev.push({d:x.date,s:"",p:x.product_id,pt:x.party_id||"",q:-x.qty,o:-(x.refund||0),h:-x.value}));
 return ev}
const dgAnSum=ev=>{const o=ev.reduce((s,e)=>s+e.o,0),h=ev.reduce((s,e)=>s+e.h,0);return{o:Math.round(o),h:Math.round(h),lk:Math.round(o-h),mg:o>0?Math.round((o-h)/o*1000)/10:0,n:new Set(ev.filter(e=>e.s).map(e=>e.s)).size}},
 dgAnGrp=(ev,key)=>{const M=new Map();ev.forEach(e=>{const k=key(e),g=M.get(k)||{k,o:0,h:0};g.o+=e.o;g.h+=e.h;M.set(k,g)});return[...M.values()].map(g=>({...g,o:Math.round(g.o),h:Math.round(g.h),lk:Math.round(g.o-g.h),mg:g.o>0?Math.round((g.o-g.h)/g.o*1000)/10:0})).sort((x,y)=>y.o-x.o)};
function dgAnData(D){const r=D.r,ev=dgAnEv(r.a,r.b,r.I),PR=new Map((db.products||[]).map(p=>[p._id,p])),
 kat=dgAnGrp(ev,e=>e.p[0]==="~"?"Lain-lain":((PR.get(e.p)||{}).category||"Tanpa kategori")),
 plg=dgAnGrp(ev,e=>e.pt||""),
 tot=D.prod.reduce((s,p)=>s+Math.max(0,p.o),0);let cum=0;
 const abc=D.prod.filter(p=>p.o>0).map(p=>{const before=tot?cum/tot*100:0;cum+=p.o;return{n:p.n,o:p.o,pct:tot?Math.round(p.o/tot*1000)/10:0,cum:tot?Math.round(cum/tot*1000)/10:0,k:before<80?"A":before<95?"B":"C"}}),
 invV=D.inv.reduce((s,x)=>s+x.v,0),s0=dgAnSum(ev),
 mn=ev.length?ev.reduce((m,e)=>e.d<m?e.d:m,"9999"):"",
 days=r.a&&r.b?dgDays(r.a,r.b)+1:mn?dgDays(r.a||mn,r.b||today())+1:0,
 turn=invV>0&&days>0?Math.round(s0.h/invV*100)/100:0,hari=turn>0?Math.round(days/turn):0,
 per=dgAnPer(r),prev=per?dgAnSum(dgAnEv(per.a,per.b,r.I)):null;
 return{ev,kat,plg,abc,invV,days,turn,hari,s0,per,prev,
  abcN:{A:abc.filter(x=>x.k==="A").length,B:abc.filter(x=>x.k==="B").length,C:abc.filter(x=>x.k==="C").length}}}
const dgAnDel=(c,p)=>p?(p===0?0:Math.round((c-p)/Math.abs(p)*1000)/10):null,
 dgAnFmt=d=>d===null?"–":(d>0?"+":"")+d+"%";
function dgAnCards(D){const A=dgAnData(D),r=D.r,tb=(h,rows,empty)=>rows.length?`<div class="dgtw"><table class="rtt"><thead><tr>${h.map((x,i)=>`<th class="${i?"r":""}">${x}</th>`).join("")}</tr></thead><tbody>${rows.map(z=>`<tr>${z.map((c,i)=>`<td class="${i?"r":""}">${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`:`<p class="k">${empty}</p>`;
 const mx=Math.max(1,...D.bln.map(b=>b.o)),
  cmp=A.prev?tb(["","Periode ini","Periode lalu","Selisih"],[["Penjualan",rp(A.s0.o),rp(A.prev.o),dgAnFmt(dgAnDel(A.s0.o,A.prev.o))],["Laba kotor",rp(A.s0.lk),rp(A.prev.lk),dgAnFmt(dgAnDel(A.s0.lk,A.prev.lk))],["Margin",A.s0.mg+"%",A.prev.mg+"%",(Math.round((A.s0.mg-A.prev.mg)*10)/10)+" poin"],["Jumlah nota",A.s0.n,A.prev.n,dgAnFmt(dgAnDel(A.s0.n,A.prev.n))]],""):`<p class="k">Pilih tanggal awal dan akhir untuk membandingkan dengan periode sebelumnya yang sama panjang.</p>`;
 return`${dcard("Pembanding periode",A.per?A.per.a+" s/d "+A.per.b+" (periode lalu)":"Perlu rentang tanggal",cmp,"")}
${dcard("Grafik tren bulanan","Penjualan (batang) dan margin per bulan",D.bln.length?`<div class="upl">${D.bln.map(b=>`<div class="upr"><span class="upm"><b>${b.k}</b><i style="display:block;height:8px;border-radius:4px;background:var(--ac,#2a7a4b);width:${Math.round(Math.max(0,b.o)/mx*100)}%;min-width:2px"></i></span><span class="upa"><b>${rp(b.o)}</b><small>margin ${b.o>0?Math.round(b.lk/b.o*1000)/10:0}%</small></span></div>`).join("")}</div>`:`<p class="k">Belum ada penjualan pada rentang ini.</p>`,"")}
${dcard("Penjualan per Kategori",A.kat.length+" kategori",tb(["Kategori","Penjualan","Laba kotor","~Margin"],A.kat.map(x=>[esc(x.k),rp(x.o),rp(x.lk),x.mg+"%"]),"Belum ada penjualan pada rentang ini."),"")}
${dcard("Analisis ABC","A = produk penyumbang 80% penjualan, B = 15% berikutnya, C = sisanya · A "+A.abcN.A+" · B "+A.abcN.B+" · C "+A.abcN.C,tb(["Produk","Kelas","Penjualan","% ","Kumulatif"],A.abc.map(x=>[esc(x.n),`<span class="bdg ${x.k==="A"?"ok":x.k==="B"?"wr":"ng"}">${x.k}</span>`,rp(x.o),x.pct+"%",x.cum+"%"]),"Belum ada penjualan pada rentang ini."),"")}
${dcard("Perputaran Stok","Perputaran = HPP ÷ nilai persediaan hari ini; hari persediaan = lama rentang ÷ perputaran",`<div class="kvg"><div class="kv"><span class="k">Nilai persediaan</span><b>${rp(A.invV)}</b></div><div class="kv"><span class="k">HPP rentang</span><b>${rp(A.s0.h)}</b></div><div class="kv"><span class="k">Perputaran</span><b>${A.turn?A.turn+"×":"–"}</b></div><div class="kv"><span class="k">Hari persediaan</span><b>${A.hari?A.hari+" hari":"–"}</b></div></div><p class="k">Nilai persediaan memakai posisi hari ini sebagai pendekatan rata-rata stok.</p>`,"")}
${dcard("Margin per Pelanggan",A.plg.length+" pelanggan",tb(["Pelanggan","Penjualan","Laba kotor","~Margin"],A.plg.slice(0,20).map(x=>[esc(x.k?dgCustNm(x.k):"Umum (tanpa pelanggan)"),rp(x.o),rp(x.lk),x.mg+"%"]),"Belum ada penjualan pada rentang ini."),"")}`}
function dgAnCsv(D){const A=dgAnData(D),t=(h,r)=>tblCsv(h,r);
 return[t(["Kategori","Penjualan","HPP","Laba kotor","Margin %"],A.kat.map(x=>[x.k,x.o,x.h,x.lk,x.mg])),
  t(["Produk","Kelas ABC","Penjualan","Persen","Kumulatif"],A.abc.map(x=>[x.n,x.k,x.o,x.pct,x.cum])),
  t(["Pelanggan","Penjualan","Laba kotor","Margin %"],A.plg.map(x=>[x.k?dgCustNm(x.k):"Umum",x.o,x.lk,x.mg])),
  t(["Perputaran stok","Nilai"],[["Nilai persediaan",A.invV],["HPP",A.s0.h],["Perputaran",A.turn],["Hari persediaan",A.hari]])].join("\r\n\r\n")}
