// ===== VIEWS =====
// ===== SUB-TAB MODERN (v0.1.038): satu pembantu untuk semua tablist =====
function tabBar(items,cur,setJs){return`<div class="stb" role="tablist">${items.map(([k,t,w])=>{const m=/^(.*?)\s*\((\d+)\)$/.exec(t),on=cur===k;return`<button class="stt${on?" on":""}" role="tab" aria-selected="${on}" tabindex="${on?0:-1}" onclick="tabAct(this,()=>{${setJs(k)}})">${m?m[1]:t}${m?`<span class="stc${w&&+m[2]>0?" w":""}">${m[2]}</span>`:""}</button>`}).join("")}</div>`}
function tabAct(el,fn){const L=document.querySelectorAll?[...document.querySelectorAll(".stb")]:[],bar=el&&el.closest?el.closest(".stb"):null,i=L.indexOf(bar),kb=document.activeElement===el;fn();
 if(kb&&i>=0){const n=document.querySelectorAll(".stb")[i],a=n&&n.querySelector('[aria-selected="true"]');if(a&&a.focus)a.focus({preventScroll:true})}}
function tabKey(e){const t=e.target;if(!t||!t.getAttribute||t.getAttribute("role")!=="tab"||!t.closest)return;const bar=t.closest(".stb");if(!bar)return;
 const T=[...bar.querySelectorAll('[role="tab"]')],i=T.indexOf(t),k=e.key,j=k==="ArrowRight"?(i+1)%T.length:k==="ArrowLeft"?(i-1+T.length)%T.length:k==="Home"?0:k==="End"?T.length-1:-1;
 if(j<0)return;e.preventDefault();T.forEach(x=>x.setAttribute("tabindex","-1"));T[j].setAttribute("tabindex","0");T[j].focus();if(T[j].scrollIntoView)T[j].scrollIntoView({block:"nearest",inline:"nearest"})}
function subT(H,key,defs){const ix=defs.map(d=>d[2]?H.indexOf(d[2]):0);if(ix.some(x=>x<0))return H;
 const cur=defs.some(d=>d[0]===S[key])?S[key]:defs[0][0],n=defs.findIndex(d=>d[0]===cur);
 return tabBar(defs,cur,k=>`S.${key}='${k}';S.lim=0;render()`)+H.slice(ix[n],n+1<defs.length?ix[n+1]:H.length)}
function vDash(){const s=pl(inUnit);
 const all=balAll();
 const cash=db.cash_accounts.map(c=>[c.name,net(acc(c.account_id),all)]);
 const byU=db.business_units.map(u=>{const x=plU()[u._id]||{r:0,e:0};return{n:u.name,r:x.r,e:x.e,p:x.r-x.e}});
 const A=alertsAll(),TR=trend6(),qa=[tabOk("trx")?`<button class="b" onclick="qTrx('in')">${ic("plus")} Catat Penerimaan</button><button class="b s" onclick="qTrx('out')">${ic("plus")} Catat Pengeluaran</button>`:"",tabOk("sp")?`<button class="b s" onclick="goS('sp',{st:'pinjaman'})">${ic("cash")} Bayar Angsuran</button>`:""].join("");
 const spOn=tabOk("sp"),tgd=spOn?db.loan_installments.filter(i=>i.status!=="paid"&&i.due_date<today()).map(i=>({i,l:db.loans.find(l=>l._id===i.loan_id)})).filter(x=>x.l&&x.l.status==="active"&&(S.unit==="all"||x.l.unit_id===S.unit)):[],
  tga=tgd.reduce((a,{i})=>a+i.principal_due-i.principal_paid+i.interest_due-i.interest_paid,0),nAk=db.loans.filter(l=>l.status==="active"&&(S.unit==="all"||l.unit_id===S.unit)).length,
  kp=(k,v,sub,js,cl)=>spOn&&js?`<button class="card kp${cl?" "+cl:""}" onclick="${js}"><div class="k">${k}</div><div class="v">${v}</div>${sub?`<div class="s2">${sub}</div>`:""}</button>`:`<div class="card"><div class="k">${k}</div><div class="v">${v}</div>${sub?`<div class="s2">${sub}</div>`:""}</div>`;
 return`<div class="g dk"><div class="card"><div class="k">Total Kas & Bank</div><div class="v">${rp(cash.reduce((a,c)=>a+c[1],0))}</div></div>
<div class="card"><div class="k">Pendapatan</div><div class="v">${rp(s.r)}</div></div>
<div class="card"><div class="k">Beban</div><div class="v">${rp(s.e)}</div></div>
<div class="card"><div class="k">Laba / Rugi${cyr()?" (tahun berjalan)":""}</div><div class="v">${rp(s.p)}</div></div>
${kp("Piutang Pinjaman",rp(net(acc("ACC1300"),balU(S.unit))),nAk+" pinjaman aktif","goS('sp',{st:'pinjaman'})")}
${spOn?kp("Tunggakan",rp(tga),tgd.length?tgd.length+" angsuran lewat jatuh tempo":"Tidak ada tunggakan","goS('sp',{st:'tunggakan'})",tgd.length?"bd":""):""}
${modOn("air")?`<div class="card"><div class="k">Piutang Pelanggan</div><div class="v">${rp(net(acc("ACC1400"),balU(S.unit)))}</div></div>`:""}</div>
${qa?`<div class="qa noprint" aria-label="Jalan pintas">${qa}</div>`:""}
<h2>Perlu perhatian${A.length?" ("+A.length+")":""}</h2>${A.length?`<div class="al" role="list">${A.map(a=>`<div class="wn ${a.sev}" role="listitem"><b>${esc(a.t)}</b><span>${a.d}</span><button class="b s" onclick="${a.fn}">${esc(a.a)}</button></div>`).join("")}</div>`:`<div class="okb">✓ Tidak ada peringatan: tidak ada tunggakan, piutang lewat jatuh tempo, periode lampau terbuka, atau gaji menunggu dibayar.</div>`}
<div class="dg"><section><h2>Saldo Kas & Bank</h2>${tbl(["Rekening","#Saldo"],cash.map(c=>`<tr><td>${esc(c[0])}</td><td class="n">${rp(c[1])}</td></tr>`))}</section>
<section class="tr"><h2>Tren 6 Bulan</h2><div class="lg"><span><i class="tr-r"></i>Pendapatan</span><span><i class="tr-e"></i>Beban</span></div>${trendSvg(TR)}<details class="tr"><summary>Lihat angka</summary>${tbl(["Bulan","#Pendapatan","#Beban","#Selisih"],TR.map(x=>`<tr><td>${mLbl(x.m)}</td><td class="n">${rp(x.r)}</td><td class="n">${rp(x.e)}</td><td class="n">${rp(x.r-x.e)}</td></tr>`))}</details></section></div>
<h2>Laba Rugi per Unit${cyr()?" (tahun berjalan)":""}</h2>${tbl(["Unit","#Pendapatan","#Beban","#Laba"],byU.map(u=>`<tr><td>${esc(u.n)}</td><td class="n">${rp(u.r)}</td><td class="n">${rp(u.e)}</td><td class="n">${rp(u.p)}</td></tr>`))}`}
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
function vLed(){const a=acc(S.acc),ls=db.journal_lines.filter(l=>l.account_id===S.acc&&inUnit(l)).sort((x,y)=>x.date.localeCompare(y.date));
 let run=0;const dn=["asset","expense"].includes(a.type);
 const trs=ls.map(l=>{run+=dn?l.debit-l.credit:l.credit-l.debit;const t=db.transactions.find(x=>x._id===l.transaction_id);
  return{d:l.date,t:t?t.description:"",h:`<tr><td>${l.date}</td><td>${esc(t?t.description:"")}</td><td class="n">${rp(l.debit)}</td><td class="n">${rp(l.credit)}</td><td class="n">${rp(run)}</td></tr>`}});
 const q=(S.q||"").toLowerCase(),fl2=trs.filter(x=>inD(x.d)&&(!q||x.t.toLowerCase().includes(q))),lim=S.lim||PG,sh=fl2.slice(-lim);
 return`<label>Akun</label><select onchange="S.acc=this.value;S.lim=0;render()">${accOpts(S.acc,1)}</select>${flt(0)}<h2>${esc(a.code+" "+a.name)}</h2><p class="k">${fl2.length} baris${fl2.length>sh.length?" · tampil "+sh.length+" terbaru":""} · saldo berjalan dihitung dari seluruh transaksi</p>${tbl(["Tanggal","Keterangan","#Debit","#Kredit","#Saldo"],sh.map(x=>x.h))}${more(fl2.length-sh.length)}`}
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
function vMst0(){const all=balAll(),UT={simpan_pinjam:"Simpan Pinjam",lainnya:"Lainnya"};
 return`<h2>Unit Usaha</h2>${addB("Tambah unit","u")}${mlist(["Unit","Jenis","","" ],db.business_units.map(u=>mrow("u",u._id,esc(u.name),"Kode "+esc(u.code),UT[u.type]||"Lainnya","","",mbd(u))),"Belum ada unit usaha.")}
<h2>Kas & Bank</h2>${addB("Tambah rekening","c")}${mlist(["Rekening","Jenis","Saldo",""],db.cash_accounts.map(c=>{const a=acc(c.account_id);return mrow("c",c._id,esc(c.name),"Akun "+esc(a?a.code+" "+a.name:c.account_id),esc(c.type),rp(net(a,all)),"",mbd(c))}),"Belum ada rekening kas/bank.")}
<h2>Chart of Accounts</h2>${addB("Tambah akun","a")}${mlist(["Akun","Tipe","",""],db.accounts.map(a=>mrow("a",a._id,(a.parent_id?"&nbsp;&nbsp;":"")+esc(a.code+" "+a.name),"",esc(a.type),"","",mbd(a))),"Belum ada akun.")}`}

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
function vDat0(){return`<h2>Backup & Restore</h2><div class="card"><button class="b" onclick="exp()">Export JSON</button><button class="b s" onclick="impAsk()">Import JSON</button><button class="b x" onclick="askC('rst','')">Reset data demo</button>
<label>Isi backup (tempel JSON di sini atau pilih file)</label><textarea id="bk" rows="6"></textarea><input type="file" accept=".json" aria-label="Pilih berkas backup JSON" onchange="fl(this)"></div>
<h2>Periode Akuntansi</h2>${tbl(["Periode","Status",""],db.accounting_periods.map(p=>`<tr><td>${p._id}</td><td>${p.status}</td><td>${p._id.slice(0,4)<=cyr()?`<span class="k">Tahun buku ditutup</span>`:ib(p.status==="open"?"lock":"unlock",p.status==="open"?"Tutup":"Buka","askC('tgl','"+p._id+"')","s")}</td></tr>`))}
<h2>Tutup Buku Tahunan</h2>${vFy()}
<h2>Audit Log</h2>${audB()}`}
const BF=[["name","Nama BUMDes"],["address","Alamat (jalan / dusun)"],["village","Desa / Kelurahan"],["district","Kecamatan"],["regency","Kabupaten / Kota"],["province","Provinsi"],["phone","Telepon","tel"],["email","Email","email"],["director","Nama Direktur"],["treasurer","Nama Bendahara"],["decree_no","No. Perdes / SK Pendirian"],["founded_date","Tanggal pendirian","date"]];

