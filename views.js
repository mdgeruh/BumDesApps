// ===== VIEWS =====
// ===== SUB-TAB MODERN (v0.1.038): satu pembantu untuk semua tablist =====
function tabBar(items,cur,setJs){return`<div class="stb" role="tablist">${items.map(([k,t,w])=>{const m=/^(.*?)\s*\((\d+)\)$/.exec(t),on=cur===k;return`<button class="stt${on?" on":""}" role="tab" aria-selected="${on}" tabindex="${on?0:-1}" onclick="tabAct(this,()=>{${setJs(k)}})">${m?m[1]:t}${m?`<span class="stc${w&&+m[2]>0?" w":""}">${m[2]}</span>`:""}</button>`}).join("")}</div>`}
function tabAct(el,fn){const L=document.querySelectorAll?[...document.querySelectorAll(".stb,.rsel")]:[],bar=el&&el.closest?el.closest(".stb,.rsel"):null,i=L.indexOf(bar),kb=document.activeElement===el;fn();
 if(kb&&i>=0){const n=document.querySelectorAll(".stb,.rsel")[i],a=n&&n.querySelector('[aria-selected="true"]');if(a&&a.focus)a.focus({preventScroll:true})}}
function tabKey(e){const t=e.target;if(!t||!t.getAttribute||t.getAttribute("role")!=="tab"||!t.closest)return;const bar=t.closest(".stb,.rsel");if(!bar)return;
 const T=[...bar.querySelectorAll('[role="tab"]')],i=T.indexOf(t),k=e.key,j=k==="ArrowRight"?(i+1)%T.length:k==="ArrowLeft"?(i-1+T.length)%T.length:k==="Home"?0:k==="End"?T.length-1:-1;
 if(j<0)return;e.preventDefault();T.forEach(x=>x.setAttribute("tabindex","-1"));T[j].setAttribute("tabindex","0");T[j].focus();if(T[j].scrollIntoView)T[j].scrollIntoView({block:"nearest",inline:"nearest"})}
function subT(H,key,defs){const ix=defs.map(d=>d[2]?H.indexOf(d[2]):0);if(ix.some(x=>x<0))return H;
 const cur=defs.some(d=>d[0]===S[key])?S[key]:defs[0][0],n=defs.findIndex(d=>d[0]===cur);
 return tabBar(defs,cur,k=>`S.${key}='${k}';S.lim=0;render()`)+H.slice(ix[n],n+1<defs.length?ix[n+1]:H.length)}
// ===== DASHBOARD VISUAL (v1.1.090): kartu bergaya dasbor analitik =====
const cmp=n=>{const a=Math.abs(n),g=n<0?"-":"";return a>=1e9?g+(a/1e9).toFixed(1).replace(".",",")+" M":a>=1e6?g+(a/1e6).toFixed(1).replace(".",",")+" jt":a>=1e3?g+Math.round(a/1e3)+" rb":g+Math.round(a)};
const dlt=(a,b,up,t)=>{if(!(Math.abs(b)>0))return"";const p=(a-b)/Math.abs(b)*100,gd=up?p>=0:p<=0;return`<span class="dl ${gd?"ok":"ng"}"><i aria-hidden="true">${p>=0?"▲":"▼"}</i>${Math.abs(p).toFixed(1).replace(".",",")}%<span class="vs"> ${t||"vs bulan lalu"}</span></span>`};
const dcard=(t,sub,body,cl)=>`<section class="card dc${cl?" "+cl:""}"><h3 class="ct">${t}</h3><div class="cs">${sub}</div>${body}</section>`;
function areaSvg(D){const mx=Math.max(1,...D.flatMap(x=>[x.r,x.e])),W=600,H=210,L=44,R=12,T=12,B=26,pw=W-L-R,ph=H-T-B,X=i=>L+(D.length>1?pw*i/(D.length-1):pw/2),Y=v=>T+ph-Math.max(0,v)/mx*ph;
 const pr=D.map((x,i)=>X(i).toFixed(1)+","+Y(x.r).toFixed(1)).join(" "),pe=D.map((x,i)=>X(i).toFixed(1)+","+Y(x.e).toFixed(1)).join(" "),gr=[0,.5,1].map(f=>`<line x1="${L}" x2="${W-R}" y1="${Y(mx*f)}" y2="${Y(mx*f)}" stroke="var(--bd)" stroke-dasharray="3 4"/><text x="${L-6}" y="${Y(mx*f)+4}" text-anchor="end">${cmp(mx*f)}</text>`).join("");
 return`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Tren pendapatan dan beban 6 bulan terakhir. ${esc(D.map(x=>mLbl(x.m)+": pendapatan "+fm(x.r)+", beban "+fm(x.e)).join("; "))}"><defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--ac)" stop-opacity=".35"/><stop offset="1" stop-color="var(--ac)" stop-opacity="0"/></linearGradient></defs>${gr}<polygon points="${X(0)},${T+ph} ${pr} ${X(D.length-1)},${T+ph}" fill="url(#ga)"/><polyline points="${pr}" fill="none" stroke="var(--ac)" stroke-width="2.5" stroke-linejoin="round"/><polyline points="${pe}" fill="none" stroke="var(--mu)" stroke-width="2" stroke-dasharray="5 4" stroke-linejoin="round"/>${D.map((x,i)=>`<circle cx="${X(i)}" cy="${Y(x.r)}" r="3.5" fill="var(--cd)" stroke="var(--ac)" stroke-width="2"/><text x="${X(i)}" y="${H-8}" text-anchor="middle">${mLbl(x.m)}</text>`).join("")}</svg>`}
function vDash(){const s=pl(inUnit);
 const all=balAll();
 const cash=db.cash_accounts.map(c=>[c.name,net(acc(c.account_id),all)]);
 const byU=db.business_units.map(u=>{const x=plU()[u._id]||{r:0,e:0};return{n:u.name,r:x.r,e:x.e,p:x.r-x.e}});
 const A=alertsAll(),TR=trend6(),qa=[tabOk("trx")?`<button class="b" onclick="qTrx('in')">${ic("plus")} Catat Penerimaan</button><button class="b s" onclick="qTrx('out')">${ic("plus")} Catat Pengeluaran</button>`:"",tabOk("sp")?`<button class="b s" onclick="goS('sp',{st:'pinjaman'})">${ic("cash")} Bayar Angsuran</button>`:""].join("");
 const spOn=tabOk("sp"),tgd=spOn?db.loan_installments.filter(i=>i.status!=="paid"&&i.due_date<today()).map(i=>({i,l:db.loans.find(l=>l._id===i.loan_id)})).filter(x=>x.l&&x.l.status==="active"&&(S.unit==="all"||x.l.unit_id===S.unit)):[],
  tga=tgd.reduce((a,{i})=>a+i.principal_due-i.principal_paid+i.interest_due-i.interest_paid,0),nAk=db.loans.filter(l=>l.status==="active"&&(S.unit==="all"||l.unit_id===S.unit)).length,
  T0=today(),T7=addD(T0,7),upc=spOn?db.loan_installments.filter(i=>i.status!=="paid"&&i.due_date>=T0&&i.due_date<=T7).map(i=>({i,l:db.loans.find(l=>l._id===i.loan_id)})).filter(x=>x.l&&x.l.status==="active"&&(S.unit==="all"||x.l.unit_id===S.unit)):[],upa=upc.reduce((a,{i})=>a+i.principal_due-i.principal_paid+i.interest_due-i.interest_paid,0),
  RT=db.transactions.filter(t=>(S.unit==="all"||t.business_unit_id===S.unit)).sort((a,b)=>b.date.localeCompare(a.date)||(b.created_at||"").localeCompare(a.created_at||"")).slice(0,5),
  pd=cyr()?"tahun berjalan":"",mg=s.r>0?Math.round(s.p/s.r*100)+"% dari pendapatan":"",
  kp=(k,v,sub,js,cl,ico,tn)=>{const hd=`<div class="kh"><span class="kic ${tn||"t1"}">${ic(ico||"cash")}</span><span class="k">${k}</span></div><div class="v">${v}</div>${sub?`<div class="s2">${sub}</div>`:""}`;return spOn&&js?`<button class="card kp${cl?" "+cl:""}" onclick="${js}">${hd}</button>`:`<div class="card">${hd}</div>`};
 const M0=TR[5],M1=TR[4],mCnt=m=>db.transactions.filter(t=>t.status==="posted"&&(S.unit==="all"||t.business_unit_id===S.unit)&&mo(t.date)===m).length,c0=mCnt(M0.m),c1=mCnt(M1.m),
  cashT=cash.reduce((a,c)=>a+c[1],0),tot6=TR.reduce((a,x)=>a+x.r,0),totE6=TR.reduce((a,x)=>a+x.e,0),
  wd=(()=>{const a=[0,0,0,0,0,0,0],c0d=addD(T0,-90);db.transactions.forEach(t=>{if(t.status==="posted"&&t.date>=c0d&&t.date<=T0&&(S.unit==="all"||t.business_unit_id===S.unit))a[new Date(t.date+"T00:00:00Z").getUTCDay()]++});return a})(),
  uCol=i=>"var(--c"+(i%6+1)+")";
 return`<h2>Perlu perhatian${A.length?" ("+A.length+")":""}</h2>${A.length?`<div class="al" role="list">${(S.alAll?A:A.slice(0,3)).map(a=>`<div class="wn ${a.sev}" role="listitem"><b>${esc(a.t)}</b><span>${a.d}</span><button class="b s" onclick="${a.fn}">${esc(a.a)}</button></div>`).join("")}</div>${A.length>3?`<button class="b s" onclick="S.alAll=!S.alAll;render()">${S.alAll?"Ringkas peringatan":"Tampilkan semua ("+A.length+")"}</button>`:""}`:`<div class="okb">✓ Tidak ada peringatan: tunggakan, piutang, periode, dan gaji aman.</div>`}
${qa?`<div class="qa noprint" aria-label="Jalan pintas">${qa}</div>`:""}
<div class="g dk">${kp("Total Kas & Bank",rp(cashT),cash.length+" rekening","","","cash","t1")}
${spOn?kp("Tunggakan",rp(tga),tgd.length?tgd.length+" angsuran lewat jatuh tempo":"Tidak ada tunggakan","goS('sp',{st:'tunggakan'})",tgd.length?"bd":"","flag","t3"):""}
${spOn?kp("Jatuh tempo 7 hari",rp(upa),upc.length?upc.length+" angsuran akan jatuh tempo":"Tidak ada angsuran dalam 7 hari","goS('sp',{st:'pinjaman'})","","cal","t2"):""}
${kp("Pendapatan",rp(s.r),(pd?pd+" · ":"")+dlt(M0.r,M1.r,1,"bln ini"),"","","tup","t2")}
${kp("Beban",rp(s.e),(pd?pd+" · ":"")+dlt(M0.e,M1.e,0,"bln ini"),"","","tdn","t3")}
${kp("Laba / Rugi",rp(s.p),mg||pd,"","","chart","t4")}
${kp("Piutang Pinjaman",rp(net(acc("ACC1300"),balU(S.unit))),nAk+" pinjaman aktif","goS('sp',{st:'pinjaman'})","","sp","t5")}
${spOn?kp("Tabungan Nasabah",rp(net(acc("ACC2300"),balU(S.unit))),"","goS('sp',{})","","user","t6"):""}
${modOn("air")?kp("Piutang Pelanggan",rp(net(acc("ACC1400"),balU(S.unit))),"","","","air","t5"):""}</div>
<div class="dgr c2">
${dcard("Ringkasan Bulan Ini",mLbl(M0.m)+" dibanding bulan lalu",`<div class="ov">${[["Pendapatan",rp(M0.r),dlt(M0.r,M1.r,1)],["Beban",rp(M0.e),dlt(M0.e,M1.e,0)],["Laba",rp(M0.r-M0.e),dlt(M0.r-M0.e,M1.r-M1.e,1)],["Transaksi",c0,dlt(c0,c1,1)]].map(([l,v,d])=>`<div><div class="ovv">${v}</div><div class="ovl">${l}</div><div class="ovd">${d||'<span class="dl">—</span>'}</div></div>`).join("")}</div>`)}
${dcard("Laba Rugi per Unit",cyr()?"Tahun berjalan":"Seluruh periode",`<div class="lru-l">${byU.map((u,i)=>{const pc=u.r>0?Math.min(100,Math.round(Math.max(0,u.e)/u.r*100)):(u.e>0?100:0);return `<div class="lru-r"><span class="bi" style="background:${uCol(i)}">${esc((u.n||"?").trim().charAt(0).toUpperCase())}</span><div class="lru-m"><b>${esc(u.n)}</b><small>Pendapatan ${rp(u.r)} · Beban ${rp(u.e)}</small><div class="lru-b${u.e>u.r?" ov":""}" role="img" aria-label="Beban ${pc}% dari pendapatan"><i style="width:${pc}%"></i></div></div><div class="lru-a${u.p<0?" neg":""}"><small>Laba</small><b>${rp(u.p)}</b></div></div>`}).join("")}</div>${byU.length>1?`<div class="lru-t"><span><b>Total unit:</b> pendapatan ${rp(byU.reduce((a,u)=>a+u.r,0))} · beban ${rp(byU.reduce((a,u)=>a+u.e,0))}</span><b class="${byU.reduce((a,u)=>a+u.p,0)<0?"neg":""}">${rp(byU.reduce((a,u)=>a+u.p,0))}</b></div>`:""}`)}
</div>
${byU.length>1?`${S.unit==="all"&&(Math.round(s.r-byU.reduce((a,u)=>a+u.r,0))||Math.round(s.e-byU.reduce((a,u)=>a+u.e,0)))?`<p class="k">Umum (tanpa unit): pendapatan ${rp(s.r-byU.reduce((a,u)=>a+u.r,0))} · beban ${rp(s.e-byU.reduce((a,u)=>a+u.e,0))}. Ini yang membuat angka di atas lebih besar dari total unit.</p>`:""}`:""}
${dcard("Tren 6 Bulan","Pendapatan dan beban per bulan",`<div class="tw"><div class="tl"><div class="k">Pendapatan 6 bulan</div><div class="big">${rp(tot6)}</div><div class="ovd">${dlt(M0.r,M1.r,1,"bln ini")}</div><div class="k" style="margin-top:10px">Beban 6 bulan</div><div class="mid">${rp(totE6)}</div></div><div class="tc"><div class="lg"><span><i class="tr-r"></i>Pendapatan</span><span><i class="tr-e"></i>Beban</span></div>${areaSvg(TR)}</div></div><details class="tr"><summary>Lihat angka</summary>${tbl(["Bulan","#Pendapatan","#Beban","#Selisih"],TR.map(x=>`<tr><td>${mLbl(x.m)}</td><td class="n">${rp(x.r)}</td><td class="n">${rp(x.e)}</td><td class="n">${rp(x.r-x.e)}</td></tr>`))}</details>`,"tr")}
<div class="dgr c2">
${dcard("Pola Transaksi per Hari","90 hari terakhir, jumlah transaksi",(()=>{const mx=Math.max(1,...wd),top=[...wd].sort((a,b)=>b-a)[1]||0,DN=["Min","Sen","Sel","Rab","Kam","Jum","Sab"];return`<div class="bars wk" role="img" aria-label="Transaksi per hari: ${DN.map((n,i)=>n+" "+wd[i]).join(", ")}">${wd.map((v,i)=>`<div class="bcol${v>0&&v>=top&&v>=mx*.6?" hi":""}"><span class="bv">${v}</span><div class="bt"><div class="bf" style="height:${Math.max(2,Math.round(v/mx*100))}%"></div></div><span class="bn">${DN[i]}</span></div>`).join("")}</div>`})())}
${dcard("Saldo Kas & Bank",cash.length+" rekening",(()=>{const pos=cash.map(c=>Math.max(0,c[1])),ps=pos.reduce((a,b)=>a+b,0);return`<div class="big">${rp(cashT)}</div>${ps>0?`<div class="seg" aria-hidden="true">${cash.map((c,i)=>pos[i]>0?`<i style="flex:${pos[i]};background:${uCol(i)}"></i>`:"").join("")}</div>`:""}<div class="sl">${cash.map((c,i)=>`<div><span class="sn"><i style="background:${uCol(i)}"></i>${esc(c[0])}</span><span class="sp">${ps>0?Math.round(pos[i]/ps*100)+"%":""}</span><span class="n">${rp(c[1])}</span></div>`).join("")}</div>`})())}
</div>
${tabOk("trx")&&RT.length?dcard("Transaksi terakhir",RT.length+" transaksi terbaru",`<div class="rc trl">${RT.map(t=>{const d=TDIR[t.type],dn=d===1?"in":d===-1?"out":"nt";return`<div class="trr${t.status==="voided"?" vd":""}"><span class="tri ${dn}" aria-hidden="true">${d===1?"↓":d===-1?"↑":d===0?"⇄":"•"}</span><span class="trm"><b>${esc(t.description)}</b><small>${t.date} · ${esc(TLX[t.type]||String(t.type).replace(/_/g," "))}${t.status==="voided"?" · dibatalkan":""}</small></span><span class="n tra">${rp(t.amount)}</span></div>`}).join("")}</div><button class="b s trs" onclick="go('trx')">Lihat semua transaksi</button>`):""}`}
const PG=30,inD=d=>(!S.d1||d>=S.d1)&&(!S.d2||d<=S.d2);
function flt(ty){return`<div class="fl"><input type="search" placeholder="Cari keterangan…" aria-label="Cari" value="${esc(S.q)}" onchange="S.q=this.value;S.lim=0;render()">${ty?`<select aria-label="Jenis" onchange="S.tt=this.value;S.lim=0;render()"><option value="">Semua jenis</option>${opt(Object.keys(TL),k=>[k,TL[k]],S.tt)}</select>`:""}<input type="date" aria-label="Dari tanggal" value="${S.d1||""}" onchange="S.d1=this.value;S.lim=0;render()"><input type="date" aria-label="Sampai tanggal" value="${S.d2||""}" onchange="S.d2=this.value;S.lim=0;render()">${S.q||S.d1||S.d2||S.tt?`<button class="b s" onclick="S.q=S.d1=S.d2=S.tt='';S.lim=0;render()">Reset filter</button>`:""}</div>`}
const more=n=>n>0?`<button class="b s" onclick="S.lim=(S.lim||PG)+PG;render()">Muat lebih banyak (${n} lagi)</button>`:"";
function vTrx(){const H=vTrx0();return subT(H+vAwal(),"xt",[["daftar","Transaksi",null],["awal","Saldo Awal","<h2>Saldo Awal Terpandu</h2>"]])}
function vTrx0(){
 const q=(S.q||"").toLowerCase(),all=db.transactions.filter(t=>(S.unit==="all"||t.business_unit_id===S.unit)&&inD(t.date)&&(!S.tt||t.type===S.tt)&&(!q||(t.description+" "+TL[t.type]+" "+unitName(t.business_unit_id)).toLowerCase().includes(q))).sort((a,b)=>b.date.localeCompare(a.date)||b.created_at.localeCompare(a.created_at)),lim=S.lim||PG,ls=all.slice(0,lim);
 return`<h2>Transaksi</h2><div class="fl"><button class="b ad" onclick="mdOpen('tn','')">${ic("plus")}<span>Transaksi baru</span></button><button class="b s ad" onclick="mdOpen('jm','')">${ic("plus")}<span>Jurnal multi-baris</span></button></div>${flt(1)}<p class="k">${all.length} transaksi${all.length>ls.length?" · tampil "+ls.length:""}</p>${ls.length?`<div class="ll"><div class="lh" aria-hidden="true"><span>Transaksi</span><span>Jenis</span><span class="n">Jumlah</span><span class="n"></span><span>Status</span><span></span></div>${ls.map(t=>`<button class="li" onclick="mdOpen('td','${t._id}')"><span class="l1"><b>${esc(t.description)}</b><small>${t.date} · ${esc(unitName(t.business_unit_id))}</small></span><span class="l2">${esc(TL[t.type]||t.type)}</span><span class="n l3">${rp(t.amount)}</span><span class="n l4"></span><span class="l5"><span class="bdg ${t.status==="posted"?"ok":"wr"}">${t.status==="posted"?"Diposting":t.status==="voided"?"Dibatalkan":esc(t.status)}</span></span><span class="l6">${ic("next")}</span></button>`).join("")}</div>`:'<div class="empty"><p>Belum ada transaksi yang cocok.</p></div>'}${more(all.length-ls.length)}`}
function trxFormHtml(o){o=o||{};S.ft=S.ft||"in";return`<fieldset class="grp"><legend>1 · Jenis dan tanggal</legend>
${fld("f-type","Jenis",{t:"select",opts:opt(["in","out","tf","manual"],k=>[k,TL[k]],S.ft),a:' onchange="S.ft=this.value;rows()"'})}
${fld("f-date","Tanggal",{type:"date",value:o.date||today(),req:1})}
${fld("f-unit","Unit usaha",{t:"select",opts:`<option value="">Umum (tanpa unit)</option>${opt(db.business_units.filter(isAct),u=>[u._id,u.name],o.unit)}`})}</fieldset>
<fieldset class="grp"><legend>2 · Kas dan akun</legend>
<div data-t="in out tf">${fld("f-cash","Kas/Bank",{t:"select",lid:"l-cash",opts:opt(db.cash_accounts.filter(isAct),c=>[c._id,c.name],o.cash),a:' onchange="trxPrev()"'})}</div>
<div data-t="tf">${fld("f-cash2","Kas/Bank tujuan",{t:"select",opts:opt(db.cash_accounts.filter(isAct),c=>[c._id,c.name],o.cash2||"CASH-002"),a:' onchange="trxPrev()"'})}</div>
<div data-t="in out manual">${fld("f-acc","Akun lawan",{t:"select",lid:"l-acc",opts:`<option value="">— pilih akun —</option>${accOpts(o.acc)}`,a:' onchange="trxPrev()"'})}</div>
<div data-t="manual">${fld("f-acc2","Akun kredit",{t:"select",opts:`<option value="">— pilih akun —</option>${accOpts()}`,a:' onchange="trxPrev()"'})}</div></fieldset>
<fieldset class="grp"><legend>3 · Jumlah dan keterangan</legend>
${fld("f-amt","Jumlah (Rp)",{type:"text",req:1,value:o.amt||"",a:' inputmode="numeric" autocomplete="off" placeholder="0" oninput="fmtR(this);trxPrev()"'})}
${fld("f-desc","Keterangan",{value:o.desc||""})}</fieldset>
<div class="prev" id="f-prev" aria-live="polite"></div>`}
function vJnl(){const n=S.jn||4,R=[...Array(n).keys()];
 return`<div class="k">Untuk jurnal manual dengan banyak akun dan saldo awal (jurnal pembuka). Total debit harus sama dengan total kredit.</div>
<label>Jenis</label><select id="jl-ty"><option value="manual">Jurnal Manual</option><option value="opening">Saldo Awal</option></select>
<label>Tanggal</label><input id="jl-d" type="date" value="${today()}"><label>Unit usaha (opsional)</label><select id="jl-u"><option value="">Umum (tanpa unit)</option>${opt(db.business_units.filter(isAct),u=>[u._id,u.name])}</select>
<label>Keterangan</label><input id="jl-t">
${R.map(i=>`<div class="fl jl"><select id="jl-a${i}" aria-label="Akun baris ${i+1}"><option value="">Akun ${i+1}…</option>${accOpts()}</select><input id="jl-d${i}" type="text" inputmode="numeric" autocomplete="off" placeholder="Debit" aria-label="Debit baris ${i+1}" oninput="fmtR(this);jlSum()"><input id="jl-c${i}" type="text" inputmode="numeric" autocomplete="off" placeholder="Kredit" aria-label="Kredit baris ${i+1}" oninput="fmtR(this);jlSum()"></div>`).join("")}
<p class="k" id="jl-sum">Total debit Rp 0 · kredit Rp 0</p>
<button class="b s" onclick="S.jn=(S.jn||4)+1;render()">+ Baris</button>`}
function jlSum(){const el=$("#jl-sum");if(!el)return;let d=0,c=0;for(let i=0;i<(S.jn||4);i++){d+=+pn($("#jl-d"+i).value||"")||0;c+=+pn($("#jl-c"+i).value||"")||0}
 el.textContent="Total debit Rp "+fm(d)+" · kredit Rp "+fm(c)+(d===c&&d>0?" ✓ seimbang":d||c?" · selisih Rp "+fm(Math.abs(d-c)):"")}
function postJnl(){try{const n=S.jn||4,d=$("#jl-d").value,L=[];if(!d)throw fe("jl-d","Tanggal wajib diisi");
 for(let i=0;i<n;i++){negChk("jl-d"+i);negChk("jl-c"+i);const a=$("#jl-a"+i).value,dd=Math.round(+pn($("#jl-d"+i).value||"")||0),cc=Math.round(+pn($("#jl-c"+i).value||"")||0);
  if(!a&&!dd&&!cc)continue;if(!a)throw fe("jl-a"+i,"Pilih akun untuk baris "+(i+1));if(dd&&cc)throw fe("jl-d"+i,"Baris "+(i+1)+": isi debit atau kredit saja, tidak keduanya");if(!dd&&!cc)throw fe("jl-d"+i,"Baris "+(i+1)+": isi debit atau kredit");
  L.push(dd?{acc:a,d:dd}:{acc:a,c:cc})}
 if(L.length<2)throw Error("Minimal dua baris jurnal");
 const td=L.reduce((x,l)=>x+(l.d||0),0),tc=L.reduce((x,l)=>x+(l.c||0),0);if(td!==tc)throw Error("Debit (Rp "+fm(td)+") dan kredit (Rp "+fm(tc)+") belum seimbang, selisih Rp "+fm(Math.abs(td-tc)));
 post({type:$("#jl-ty").value,date:d,unit:$("#jl-u").value,desc:$("#jl-t").value.trim()||(($("#jl-ty").value==="opening")?"Saldo awal":"Jurnal manual"),lines:L});
 clrF("[id^='jl-']:not(#jl-d):not(#jl-ty):not(#jl-u)");S.jn=4;S.msg="Jurnal diposting ("+L.length+" baris)";okM()}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function rows(){document.querySelectorAll("[data-t]").forEach(e=>e.style.display=e.dataset.t.split(" ").includes(S.ft)?"":"none");
 $("#l-cash").textContent=S.ft==="tf"?"Kas/Bank asal":"Kas/Bank";$("#l-acc").textContent=S.ft==="manual"?"Akun debit":"Akun lawan";trxPrev()}
function trxPrevH(){const v=i=>{const e=$("#"+i);return e&&e.value!=null?String(e.value):""},t=S.ft,amt=Math.round(+pn(v("f-amt").trim()||"0")||0),ca=i=>{const c=db.cash_accounts.find(x=>x._id===v(i));return c?c.account_id:""};
 const L=t==="in"?[[ca("f-cash"),"d"],[v("f-acc"),"c"]]:t==="out"?[[v("f-acc"),"d"],[ca("f-cash"),"c"]]:t==="tf"?[[ca("f-cash2"),"d"],[ca("f-cash"),"c"]]:[[v("f-acc"),"d"],[v("f-acc2"),"c"]],miss=[];
 if(!(amt>0))miss.push("jumlah");if(L.some(x=>!x[0]))miss.push(t==="manual"?"akun debit dan kredit":t==="tf"?"kas asal dan tujuan":"akun lawan");
 return`<div class="k"><b>Jurnal yang akan terbentuk</b>${miss.length?" — lengkapi "+miss.join(" dan "):""}</div><table class="pv"><tr><th>Akun</th><th class="n">Debit</th><th class="n">Kredit</th></tr>${L.map(([a,sd])=>{const ac=a&&acc(a);return`<tr><td${sd==="c"?' class="kr"':""}>${ac?esc(ac.code+" "+ac.name):'<span class="k">belum dipilih</span>'}</td><td class="n">${sd==="d"&&amt>0?rp(amt):""}</td><td class="n">${sd==="c"&&amt>0?rp(amt):""}</td></tr>`}).join("")}</table>`}
function trxPrev(){const el=$("#f-prev");if(el)el.innerHTML=trxPrevH()}
function negAny(){if(!document.querySelectorAll)return;const e=[...document.querySelectorAll('[data-neg="1"]')][0];if(e&&e.id)throw fe(e.id,"Jumlah tidak boleh negatif")}
function negChk(id){const e=$("#"+id);if(e&&e.dataset&&e.dataset.neg==="1")throw fe(id,"Jumlah tidak boleh negatif")}
function submitT(){try{const v=i=>$("#"+i).value,raw=v("f-amt").trim(),t=S.ft,d=v("f-date");
 negChk("f-amt");if(!raw)throw fe("f-amt","Jumlah wajib diisi");const amt=+pn(raw);
 if(!(amt>0))throw fe("f-amt","Jumlah harus lebih dari 0");if(!d)throw fe("f-date","Tanggal wajib diisi");
 const ca=f=>{const c=db.cash_accounts.find(x=>x._id===v(f));if(!c)throw fe(f,"Pilih kas/bank");return c.account_id};let L;
 if(t==="in"||t==="out"){if(!v("f-acc"))throw fe("f-acc","Pilih akun lawan");const k=ca("f-cash");L=t==="in"?[{acc:k,d:amt},{acc:v("f-acc"),c:amt}]:[{acc:v("f-acc"),d:amt},{acc:k,c:amt}]}
 else if(t==="tf"){if(v("f-cash")===v("f-cash2"))throw fe("f-cash2","Kas asal dan tujuan sama");L=[{acc:ca("f-cash2"),d:amt},{acc:ca("f-cash"),c:amt}]}
 else{if(!v("f-acc"))throw fe("f-acc","Pilih akun debit");if(!v("f-acc2"))throw fe("f-acc2","Pilih akun kredit");if(v("f-acc")===v("f-acc2"))throw fe("f-acc2","Akun debit dan kredit sama");L=[{acc:v("f-acc"),d:amt},{acc:v("f-acc2"),c:amt}]}
 const eo=S.etn?editChk(S.etn):null;const nt=post({type:t,date:d,unit:v("f-unit"),desc:v("f-desc")||"-",lines:L});if(eo){nt.edited_from=eo._id;rev(eo._id);eo.replaced_by=nt._id;audit("edit","transaction",nt._id,"Mengganti "+eo.description+" · "+eo.date);save()}clrF("#f-amt,#f-desc");S.msg=eo?"Transaksi diubah: yang lama dibatalkan dengan jurnal pembalik, yang baru diposting":"Transaksi berhasil diposting";okM()}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
// ===== BUKU BESAR (v1.1.094): ringkasan, saldo awal/akhir, urutan, buka transaksi, cetak dan CSV =====
function ledData(){const a=acc(S.acc)||db.accounts.find(postable),dn=["asset","expense"].includes(a.type),TM=new Map(db.transactions.map(t=>[t._id,t]));let run=0;
 const rows=db.journal_lines.filter(l=>l.account_id===a._id&&inUnit(l)).sort((x,y)=>x.date.localeCompare(y.date)).map(l=>{run+=dn?l.debit-l.credit:l.credit-l.debit;const t=TM.get(l.transaction_id);return{d:l.date,id:l.transaction_id,t:t?t.description:"",u:l.business_unit_id||"",db:l.debit,cr:l.credit,run,vd:!!t&&t.status==="voided"}}),
  q=(S.q||"").toLowerCase(),inr=rows.filter(x=>inD(x.d)),fl=inr.filter(x=>!q||x.t.toLowerCase().includes(q)),before=S.d1?rows.filter(x=>x.d<S.d1):[],opening=before.length?before[before.length-1].run:0,
  closing=inr.length?inr[inr.length-1].run:opening;
 return{a,dn,rows,fl,opening,closing,td:fl.reduce((t,x)=>t+x.db,0),tc:fl.reduce((t,x)=>t+x.cr,0)}}
function ledCsv(){const D=ledData();return tblCsv(["Tanggal","Keterangan","Unit","#Debit","#Kredit","#Saldo"],D.fl.map(x=>[x.d,x.t,x.u?unitName(x.u):"Umum",x.db,x.cr,x.run]))}
function ledDl(){try{const D=ledData(),a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["﻿"+ledCsv()],{type:"text/csv"}));a.download="buku-besar-"+D.a.code+"-"+today()+".csv";a.click();S.msg="Buku besar diunduh (CSV)"}catch(e){S.msg="⚠ Unduh gagal: "+e.message}render()}
function vLed(){const D=ledData(),a=D.a,cnt={};db.journal_lines.forEach(l=>{if(inUnit(l))cnt[l.account_id]=(cnt[l.account_id]||0)+1});
 const sel=`<select aria-label="Akun" onchange="S.acc=this.value;S.lim=0;render()">${["asset","liability","equity","revenue","expense"].map(t=>{const L=db.accounts.filter(x=>postable(x)&&x.type===t);return L.length?`<optgroup label="${ACCT_T[t]}">${opt(L,x=>[x._id,x.code+" "+x.name+(cnt[x._id]?" ("+cnt[x._id]+")":"")],S.acc)}</optgroup>`:""}).join("")}</select>`;
 const lim=S.lim||PG,desc=S.lsd==="1",sh=desc?D.fl.slice().reverse().slice(0,lim):D.fl.slice(-lim),rest=D.fl.length-sh.length,
  C=(ico,tn,k,v,sub)=>`<div class="kc"><div class="kh"><span class="kic ${tn}">${ic(ico)}</span><span class="k">${k}</span></div><div class="v">${v}</div><div class="s2">${sub}</div></div>`,
  row=x=>`<button class="li lgr${x.vd?" vd":""}" onclick="mdOpen('td','${x.id}')" aria-label="Buka transaksi ${esc(x.t)}"><span class="l1"><b>${esc(x.t)}</b><small>${x.d}${S.unit==="all"&&x.u?" · "+esc(unitName(x.u)):""}${x.vd?" · dibatalkan":""}</small></span><span class="lgd${x.db?"":" z"}"><i>Debit</i>${rp(x.db)}</span><span class="lgk${x.cr?"":" z"}"><i>Kredit</i>${rp(x.cr)}</span><span class="lgs">${rp(x.run)}</span><span class="l6">${ic("next")}</span></button>`,
  open=S.d1?`<div class="lgo"><span>Saldo awal sebelum ${S.d1}</span><b>${rp(D.opening)}</b></div>`:"",
  per=(S.d1||S.d2)?(S.d1||"awal")+" s/d "+(S.d2||"sekarang"):"semua tanggal";
 return`<label>Akun</label>${sel}${flt(0)}<div class="doc po">${typeof repHead==="function"?repHead("BUKU BESAR — "+esc(a.code+" "+a.name),unTxt()+" · "+perTxt()):""}</div>
<h2>${esc(a.code+" "+a.name)}</h2>
<div class="card ks k4" aria-label="Ringkasan akun">${C("led","t1","Saldo akhir",rp(D.closing),"Saldo normal: "+(D.dn?"Debit":"Kredit"))}${C("tup","t2","Total debit",rp(D.td),per)}${C("tdn","t3","Total kredit",rp(D.tc),per)}${C("cal","t4","Mutasi",D.fl.length,(S.q?"cocok pencarian · ":"")+(D.rows.length+" seluruhnya"))}</div>
<div class="fl noprint"><select aria-label="Urutan" onchange="S.lsd=this.value;S.lim=0;render()"><option value="0"${desc?"":" selected"}>Terlama dulu</option><option value="1"${desc?" selected":""}>Terbaru dulu</option></select><button class="b s" onclick="window.print()">Cetak</button><button class="b s" onclick="ledDl()">Unduh CSV</button></div>
<p class="k">${D.fl.length} baris${rest>0?" · tampil "+sh.length+(desc?" terbaru":" terbaru")+(desc?"":" (urut dari yang lama)"):""} · saldo berjalan dihitung dari seluruh transaksi</p>
${D.fl.length?`<div class="ll lgl"><div class="lgh" aria-hidden="true"><span>Keterangan</span><span class="n">Debit</span><span class="n">Kredit</span><span class="n">Saldo</span><span></span></div>${!desc&&rest>0?more(rest).replace("lagi)","lagi, lebih lama)"):""}${desc?"":open}${sh.map(row).join("")}${desc?open:""}${desc&&rest>0?more(rest):""}${desc?"":`<div class="lgo"><span>Saldo akhir</span><b>${rp(D.closing)}</b></div>`}</div>`:`<div class="empty"><p>${D.rows.length?"Tidak ada mutasi yang cocok dengan filter.":"Belum ada mutasi pada akun ini."}</p></div>`}`}
function vTb(){const m=balU(S.unit);let D=0,C=0;
 const trs=db.accounts.filter(postable).filter(a=>m[a._id]).map(a=>{const x=m[a._id],n=x.d-x.c,d=n>0?n:0,c=n<0?-n:0;D+=d;C+=c;
  return`<tr><td>${a.code}</td><td>${esc(a.name)}</td><td class="n">${rp(d)}</td><td class="n">${rp(c)}</td></tr>`});
 trs.push(`<tr><th></th><th>Total</th><th class="n">${rp(D)}</th><th class="n">${rp(C)}</th></tr>`);
 return`<h2>Neraca Saldo</h2>${tbl(["Kode","Akun","#Debit","#Kredit"],trs)}<p class="k">${Math.round(D)===Math.round(C)?"✓ Seimbang":"⚠ Tidak seimbang"}</p>`}
function vMst(){return subT(vMst0()+vPihak()+vPeg()+vTarifBiaya(),"mt",[["unit","Unit Usaha",null],["kas","Kas & Bank","<h2>Kas & Bank</h2>"],["coa","Akun (COA)","<h2>Chart of Accounts</h2>"],["pihak","Pihak","<h2>Pihak</h2>"],["peg","Pegawai","<h2>Pegawai</h2>"],["tarif","Tarif & Biaya","<h2>Tarif & Biaya</h2>"]])}
// ===== v1.1.012: daftar master ringkas (klik baris → modal rincian) =====
const mrow=(k,id,a,sm,b,c,d,bd)=>`<button class="li" onclick="mdOpen('mdt','${k}|${id}')"><span class="l1"><b>${a}</b><small>${sm||""}</small></span><span class="l2">${b||""}</span><span class="n l3">${c||""}</span><span class="n l4">${d||""}</span><span class="l5"><span class="bdg ${bd[0]}">${bd[1]}</span></span><span class="l6">${ic("next")}</span></button>`,
 mlist=(h,rows,empty)=>rows.length?`<div class="ll"><div class="lh" aria-hidden="true"><span>${h[0]}</span><span>${h[1]}</span><span class="n">${h[2]}</span><span class="n">${h[3]}</span><span>Status</span><span></span></div>${rows.join("")}</div>`:`<div class="empty"><p>${empty||"Belum ada data."}</p></div>`,
 mbd=x=>isAct(x)?["ok","Aktif"]:["wr","Nonaktif"];
// kotak cari + filter untuk daftar master (v1.1.088): pola sama dengan daftar lain (onchange -> state -> render)
const mq=(k,ph,lbl)=>`<input type="search" placeholder="${ph}" aria-label="${lbl}" value="${esc(S[k]||"")}" onchange="S.${k}=this.value;render()">`,mhit=(q,...f)=>{q=String(q||"").trim().toLowerCase();return!q||f.some(x=>String(x||"").toLowerCase().includes(q))};
const ACCT_T={asset:"Aset",liability:"Kewajiban",equity:"Ekuitas",revenue:"Pendapatan",expense:"Beban"};
function vMst0(){const all=balAll(),UT={simpan_pinjam:"Simpan Pinjam",lainnya:"Lainnya"};
 return`<h2>Unit Usaha</h2>${addB("Tambah unit","u")}<p class="k">${db.business_units.filter(isAct).length} aktif dari ${db.business_units.length} unit.</p>${mlist(["Unit","Jenis","","" ],db.business_units.map(u=>mrow("u",u._id,esc(u.name),"Kode "+esc(u.code),UT[u.type]||"Lainnya","","",mbd(u))),"Belum ada unit usaha.")}
<h2>Kas & Bank</h2>${addB("Tambah rekening","c")}<p class="k">${db.cash_accounts.length} rekening.</p>${mlist(["Rekening","Jenis","Saldo",""],db.cash_accounts.map(c=>{const a=acc(c.account_id);return mrow("c",c._id,esc(c.name),"Akun "+esc(a?a.code+" "+a.name:c.account_id),esc(c.type),rp(net(a,all)),"",mbd(c))}),"Belum ada rekening kas/bank.")}
<h2>Chart of Accounts</h2>${addB("Tambah akun","a")}${(()=>{const q=S.aq||"",t=S.aqt||"",L=db.accounts.filter(a=>(!t||a.type===t)&&mhit(q,a.code,a.name)),fl=!!(q.trim()||t);return`<p class="k">${fl?L.length+" dari "+db.accounts.length+" akun":db.accounts.length+" akun"}.</p><div class="fl">${mq("aq","Cari kode / nama akun…","Cari akun")}<select aria-label="Filter tipe akun" onchange="S.aqt=this.value;render()"><option value="">Semua tipe</option>${opt(Object.keys(ACCT_T),k=>[k,ACCT_T[k]],t)}</select></div>`+mlist(["Akun","Tipe","",""],L.map(a=>mrow("a",a._id,(a.parent_id&&!fl?"&nbsp;&nbsp;":"")+esc(a.code+" "+a.name),"",esc(ACCT_T[a.type]||a.type),"","",mbd(a))),fl?"Tidak ada akun yang cocok.":"Belum ada akun.")})()}`}

const SYSA=["ACC1100","ACC1200","ACC1300","ACC1400","ACC3300","ACC4100","ACC4200","ACC4400","ACC4410","ACC4420","ACC4430","ACC4440","ACC4450","ACC4460"],hasJ=id=>db.journal_lines.some(l=>l.account_id===id);
function mErr(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null;render()}
// v1.1.059: kode unit (UNT004, ...) dan kode akun (4 digit menurut tipe) otomatis bila tidak diisi
const nextUnitCode=()=>seqCode("UNT",db.business_units.map(u=>u.code)),ACC_RANGE={asset:1,liability:2,equity:3,revenue:4,expense:5};
function nextAccCode(t){const g=ACC_RANGE[t]||1,used=new Set(db.accounts.map(a=>a.code)),cs=db.accounts.map(a=>+a.code).filter(c=>Number.isInteger(c)&&Math.floor(c/1000)===g&&c%1000!==0);let c=cs.length?Math.max(...cs)+10:g*1000+100;if(c>g*1000+999||used.has(String(c))){c=g*1000+1;while(used.has(String(c))&&c<g*1000+999)c++}return String(c)}
function accTipe(t){const e=$("#a-c");if(e&&!e.disabled&&(!e.value.trim()||Object.keys(ACC_RANGE).some(k=>nextAccCode(k)===e.value.trim())))e.value=nextAccCode(t)}
function saveUnit(){try{const n=$("#u-n").value.trim(),c=$("#u-c").value.trim()||nextUnitCode(),ty=($("#u-t")||{}).value==="simpan_pinjam"?"simpan_pinjam":"lainnya";if(!n)throw fe("u-n","Nama unit wajib diisi");
 if(S.eu&&ty!=="simpan_pinjam"&&db.loans.some(l=>l.unit_id===S.eu))throw fe("u-t","Unit sudah dipakai pinjaman; jenisnya tidak dapat diubah dari Simpan Pinjam");
 if(db.business_units.some(u=>u.code===c&&u._id!==S.eu))throw fe("u-c","Kode sudah dipakai");
 if(S.eu){Object.assign(db.business_units.find(u=>u._id===S.eu),{code:c,name:n,type:ty});audit("update","unit",S.eu);S.eu=null;S.msg="Unit diperbarui"}
 else{const u={_id:"UNIT-"+String(db.business_units.length+1).padStart(3,"0"),code:c,name:n,type:ty,status:"aktif"};db.business_units.push(u);audit("create","unit",u._id);S.msg="Unit ditambahkan"}save();clrF("#u-c,#u-n");okM()}catch(e){mErr(e);return}render()}
function saveCash(){try{const n=$("#c-n").value.trim();if(!n)throw fe("c-n","Nama rekening wajib diisi");
 if(S.ec){Object.assign(db.cash_accounts.find(c=>c._id===S.ec),{name:n,type:$("#c-t").value});audit("update","cash_account",S.ec);S.ec=null;S.msg="Rekening diperbarui"}
 else{const c={_id:"CASH-"+String(db.cash_accounts.length+1).padStart(3,"0"),name:n,type:$("#c-t").value,account_id:$("#c-a").value,status:"aktif"};if(!c.account_id)throw fe("c-a","Pilih akun COA");db.cash_accounts.push(c);audit("create","cash_account",c._id);S.msg="Rekening ditambahkan"}save();clrF("#c-n");okM()}catch(e){mErr(e);return}render()}
function saveAcc(){try{const n=$("#a-n").value.trim();if(!n)throw fe("a-n","Nama akun wajib diisi");
 if(S.ea){const a=acc(S.ea),t=$("#a-t").value;if(t!==a.type&&hasJ(a._id))throw fe("a-t","Tipe tidak dapat diubah: akun sudah dipakai jurnal");a.name=n;a.type=hasJ(a._id)?a.type:t;audit("update","account",a._id);S.ea=null;S.msg="Akun diperbarui"}
 else{const c=$("#a-c").value.trim()||nextAccCode($("#a-t").value);if(!/^\d{4}$/.test(c))throw fe("a-c","Kode harus 4 digit angka");if(acc("ACC"+c))throw fe("a-c","Kode akun sudah ada");
  db.accounts.push({_id:"ACC"+c,code:c,name:n,type:$("#a-t").value,parent_id:"ACC"+c[0]+"000",status:"aktif"});audit("create","account","ACC"+c);S.msg="Akun ditambahkan"}save();clrF("#a-c,#a-n");okM()}catch(e){mErr(e);return}render()}
function togM(k,id){try{const L={u:db.business_units,c:db.cash_accounts,a:db.accounts}[k],x=L.find(q=>q._id===id);
 if(!isAct(x)){x.status="aktif";audit("activate",{u:"unit",c:"cash_account",a:"account"}[k],id);save();S.msg="Diaktifkan kembali";render();return}
 if(k==="u"){if(db.loans.some(l=>l.unit_id===id&&["submitted","approved","active"].includes(l.status)))throw Error("Unit masih punya pinjaman yang belum selesai");
  if(db.products.some(p=>p.unit_id===id&&isAct(p)))throw Error("Unit masih punya produk aktif; nonaktifkan produknya dulu");
  if(db.employees.some(e=>e.unit_id===id&&isAct(e)))throw Error("Unit masih punya pegawai aktif; nonaktifkan atau pindahkan pegawainya dulu")}
 if(k==="c"){const o=db.cash_accounts.some(c=>c._id!==id&&isAct(c)&&c.account_id===x.account_id),sk=net(acc(x.account_id),balAll());
  if(!db.cash_accounts.some(c=>c._id!==id&&isAct(c)))throw Error("Minimal satu rekening kas/bank harus aktif");
  if(!o&&Math.abs(sk)>.005)throw Error("Saldo akun masih Rp "+fm(sk)+"; pindahkan dulu lewat Transfer")}
 if(k==="a"){if(db.accounts.some(a=>a.parent_id===id))throw Error("Akun induk tidak dapat dinonaktifkan");if(SYSA.includes(id))throw Error("Akun ini dipakai otomatis oleh modul (pinjaman/penjualan/kas) sehingga tidak boleh dinonaktifkan");
  if(db.cash_accounts.some(c=>c.account_id===id&&isAct(c)))throw Error("Akun masih dipakai rekening kas/bank aktif");if(db.products.some(p=>p.revenue_account===id&&isAct(p)))throw Error("Akun masih dipakai produk aktif");
  const sk=net(x,balAll());if(Math.abs(sk)>.005)throw Error("Saldo akun masih Rp "+fm(sk)+"; nolkan dulu dengan jurnal")}
 x.status="nonaktif";if(S["e"+k]===id)S["e"+k]=null;audit("deactivate",{u:"unit",c:"cash_account",a:"account"}[k],id);save();S.msg="Dinonaktifkan; data lama tetap tersimpan"}catch(e){S.msg="⚠ "+e.message}render()}
function add(fn,sel){try{fn();audit("create","master","-");save();if(sel)clrF(sel);S.msg="Data ditambahkan"}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function vDat(){return subT(vDat0(),"dt",[["bk","Backup",null],["per","Periode","<h2>Periode Akuntansi</h2>"],["aud","Audit Log","<h2>Audit Log</h2>"]])}
function vDat0(){const bi=bkInfo(),n=[["transaksi",db.transactions.length],["pinjaman",db.loans.length],["pihak",db.parties.length],["tabungan",(db.savings_accounts||[]).length]];
 return`<h2>Data &amp; Cadangan</h2><p class="k">Profil BUMDes: <b>${esc(bnm())}</b>. Impor dan kosongkan hanya mengubah data, bukan nama, alamat, atau logo BUMDes.</p>
<div class="card"><h3>1. Cadangkan data</h3><p class="k">${n.map(x=>x[1]+" "+x[0]).join(" · ")}. ${bi.lb?"Cadangan terakhir: "+esc(String(bi.lb).slice(0,10))+" ("+bi.d+" hari lalu).":"Belum pernah dicadangkan di perangkat ini."}</p><button class="b" onclick="exp()">Export JSON</button></div>
<div class="card"><h3>2. Pulihkan dari cadangan</h3><p class="k">Pilih berkas JSON atau tempel isinya. Hanya data yang diganti; profil BUMDes tetap. Salinan data sekarang disimpan otomatis sebagai cadangan lokal.</p>
<label for="bk-f">Berkas cadangan</label><input id="bk-f" type="file" accept=".json" aria-label="Pilih berkas backup JSON" onchange="fl(this)">
<label for="bk">Atau tempel isi cadangan (JSON)</label><textarea id="bk" rows="5"></textarea><button class="b s" onclick="impAsk()">Import JSON</button></div>
<h3 class="awh">3. Cadangan online (awan)</h3><p class="k">Salinan data di internet supaya aman dan bisa dipakai di HP atau komputer lain. Profil BUMDes ikut tersimpan bersama data.</p>${vCloudSet()}
<div class="card dz"><h3>4. Kosongkan semua data</h3><p class="k">Menghapus transaksi, pinjaman, tabungan, penjualan, gaji, pihak, dan audit log. Profil BUMDes, pengguna, dan pengaturan tetap. Export dulu bila data perlu disimpan.</p>
<label for="bk-x">Ketik ${WIPE_WORD} untuk membuka tombol hapus</label><input id="bk-x" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="${WIPE_WORD}"><button class="b x" onclick="wipeAsk()">Kosongkan semua data</button>
<details class="k"><summary>Isi data contoh (untuk mencoba aplikasi)</summary><p class="k">Mengganti data dengan data contoh. Profil BUMDes tetap.</p><button class="b s" onclick="askC('rst','')">Isi data contoh</button></details></div>
<h2>Periode Akuntansi</h2>${tbl(["Periode","Status",""],db.accounting_periods.map(p=>`<tr><td>${p._id}</td><td>${p.status}</td><td>${p._id.slice(0,4)<=cyr()?`<span class="k">Tahun buku ditutup</span>`:ib(p.status==="open"?"lock":"unlock",p.status==="open"?"Tutup":"Buka","askC('tgl','"+p._id+"')","s")}</td></tr>`))}
<h2>Tutup Buku Tahunan</h2>${vFy()}
<h2>Audit Log</h2>${audB()}`}
const BF=[["name","Nama BUMDes"],["address","Alamat (jalan / dusun)"],["village","Desa / Kelurahan"],["district","Kecamatan"],["regency","Kabupaten / Kota"],["province","Provinsi"],["phone","Telepon","tel"],["email","Email","email"],["director","Nama Direktur"],["treasurer","Nama Bendahara"],["decree_no","No. Perdes / SK Pendirian"],["founded_date","Tanggal pendirian","date"]];

