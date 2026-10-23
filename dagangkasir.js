// ===== PERDAGANGAN PL3 (v1.1.308): struk kasir, tutup kasir harian, pindai kode lewat kamera, mode layar penuh =====
// Tutup kasir: kas yang seharusnya ada = penerimaan tunai penjualan + piutang diterima - retur tunai pada tanggal itu (dari jurnal kas unit).
// Selisih dengan hitungan fisik dijurnal ke akun 5920 Selisih Kas (kurang = beban, lebih = pendapatan lain/pengurang beban). Satu penutupan per unit, tanggal, dan kas.
const dgTkOn=(un,d,k)=>(db.dg_closings||[]).find(c=>c.status==="ok"&&c.unit_id===un&&c.date===d&&c.cash_id===k),
 dgTkHas=(un,d,k)=>!!dgTkOn(un,d,k);
function dgTkData(un,d,kid){const kas=db.cash_accounts.find(c=>c._id===kid),T=new Map((db.transactions||[]).map(t=>[t._id,t.type])),r={tunai:0,piutang:0,retur:0},NT=new Set();
 if(kas)db.journal_lines.forEach(l=>{if(l.date!==d||l.business_unit_id!==un||l.account_id!==kas.account_id)return;const ty=T.get(l.transaction_id),v=(l.debit||0)-(l.credit||0);if(ty==="sale_cash"){r.tunai+=v;NT.add(l.transaction_id)}else if(ty==="sale_pay")r.piutang+=v;else if(ty==="retur_jual")r.retur+=v});
 const S1=db.sales.filter(x=>x.dagang&&x.unit_id===un&&x.date===d&&x.status==="posted"),ca=S1.filter(x=>x.payment_type==="cash"),kr=S1.filter(x=>x.payment_type==="credit");
 r.exp=r.tunai+r.piutang+r.retur;r.nota=S1.length;r.notaTunai=Math.max(ca.length,NT.size);r.notaKredit=kr.length;r.jualTunai=ca.reduce((a,x)=>a+x.total,0);r.jualKredit=kr.reduce((a,x)=>a+x.total,0);
 r.nretur=(db.stock_moves||[]).filter(m=>m.kind==="retjual"&&m.status!=="void"&&m.unit_id===un&&m.date===d).length;return r}
function dgTkH(k,v){S.tkh=S.tkh||{};S.tkh[k]=v;render()}
function dgTutup(U){const un=ksUnit(),h=S.tkh=S.tkh||{},d=h.d||today(),K=db.cash_accounts.filter(isAct),kid=h.k||S.kk0||(K[0]||{})._id||"",D=dgTkData(un,d,kid),cnt=h.c===undefined||h.c===""?null:Math.round(+pn(String(h.c))),df=cnt===null||isNaN(cnt)?null:cnt-D.exp,done=dgTkOn(un,d,kid),
 H=(db.dg_closings||[]).filter(c=>c.unit_id===un&&c.status==="ok").sort((a,b)=>a.date===b.date?(b._id<a._id?-1:1):(a.date<b.date?1:-1)).slice(0,6),
 R=(a,v)=>`<div class="upr"><span class="upm"><b>${a}</b></span><span class="upa"><b>${v}</b></span></div>`;
 const hist=H.length?`<div class="upl">${H.map(c=>`<div class="upr"><span class="upm"><b>${esc(tglS(c.date))} · ${esc((db.cash_accounts.find(x=>x._id===c.cash_id)||{}).name||"-")}</b><small>Seharusnya Rp ${fm(c.expected)} · hitung Rp ${fm(c.counted)} · ${c.diff===0?"pas":(c.diff<0?"kurang Rp "+fm(-c.diff):"lebih Rp "+fm(c.diff))}</small></span><span class="upa">${ib("print","Rekap","openDoc('tk','"+c._id+"')","s")}${ib("x","Batalkan","askC('dgTutupBatal','"+c._id+"')","x")}</span></div>`).join("")}</div>`:`<p class="k">Belum ada penutupan kasir.</p>`;
 const step=S.tks||0;
 return dcard("Tutup kasir harian",unitName(un),`<p class="k">Cocokkan uang di laci dengan catatan penjualan hari itu. Selisih dijurnal ke akun Selisih Kas.</p><div class="fl"><button class="b" onclick="tkStep(1)">Tutup kasir</button></div><h3>Riwayat penutupan</h3>`+hist,"")+(step?tkDlg(step,{un,d,K,kid,D,cnt,df,done}):"")}
function tkMet(un,d){const B={tunai:[0,0],transfer:[0,0],qris:[0,0],kredit:[0,0]};db.sales.filter(x=>isDgSale(x)&&x.unit_id===un&&x.date===d&&x.status==="posted").forEach(x=>{const m=saleMeth(x);B[m][0]++;B[m][1]+=x.total});
 const R=m=>B[m][0]?`<div class="upr"><span class="upm"><b>${methL(m)} (${B[m][0]} nota)</b></span><span class="upa"><b>Rp ${fm(B[m][1])}</b></span></div>`:"";const h=R("tunai")+R("transfer")+R("qris")+R("kredit");
 return h?`<p class="k"><b>Penjualan menurut metode</b></p><div class="upl">${h}</div>${B.transfer[0]+B.qris[0]?`<p class="k">Transfer dan QRIS masuk ke rekening, tidak dihitung sebagai uang di laci.</p>`:""}`:""}
function tkStep(n){S.tks=n;if(n===1){S.msg="";S.fe=null}if(!n)S.msg="";render()}
function tkKid(){const h=S.tkh||{};return h.k||S.kk0||(db.cash_accounts.filter(isAct)[0]||{})._id||""}
function tkPas(){const D=dgTkData(ksUnit(),(S.tkh||{}).d||today(),tkKid());dgTkH("c",String(D.exp))}
function tkLive(v){S.tkh=S.tkh||{};S.tkh[ "c"]=v;const e=document.getElementById("tk-df");if(!e)return;const D=dgTkData(ksUnit(),S.tkh.d||today(),tkKid()),n=v===""?null:Math.round(+pn(String(v)));if(n===null||isNaN(n)){e.className="ksg-kem";e.innerHTML="Isi uang fisik di laci";return}const df=n-D.exp;e.className="ksg-kem"+(df<0?" bad":"");e.innerHTML=df===0?"Pas, tidak ada selisih":(df<0?"Kurang "+rp(-df):"Lebih "+rp(df))}
function tkDlg(step,o){const R=(a,v)=>`<div class="upr"><span class="upm"><b>${a}</b></span><span class="upa"><b>${v}</b></span></div>`,h=S.tkh||{},D=o.D,
 hd=`<ol class="kss">${["Rekap penjualan","Hitung uang laci","Selesai"].map((l,i)=>`<li class="${i+1<step?"done":i+1===step?"on":""}">${l}</li>`).join("")}</ol>`,
 er=S.msg&&String(S.msg).startsWith("⚠")?`<p class="ksg-er" role="alert">${esc(S.msg)}</p>`:"";let b="";
 if(step===1){b=`<h3>Tutup kasir harian</h3><p class="k">${esc(unitName(o.un))}</p>`+fld("tk-d","Tanggal",{type:"date",value:o.d,a:' onchange="dgTkH(\'d\',this.value)"'})+fld("tk-k","Kas/bank laci",{t:"select",a:' onchange="dgTkH(\'k\',this.value)"',opts:opt(o.K,c=>[c._id,c.name],o.kid)})
  +tkMet(o.un,o.d)+`<div class="upl">${R("Penjualan tunai ("+D.notaTunai+" nota)","Rp "+fm(D.tunai))}${R("Piutang diterima","Rp "+fm(D.piutang))}${R("Retur tunai ("+D.nretur+")","Rp "+fm(D.retur))}${R("Kas seharusnya","Rp "+fm(D.exp))}</div><p class="k">Penjualan kredit hari ini: ${D.notaKredit} nota · Rp ${fm(D.jualKredit)} (tidak masuk laci).</p>`
  +(o.done?`<p class="ksg-er">⚠ Kas ini sudah ditutup untuk tanggal tersebut. Batalkan penutupan di Riwayat bila perlu mengulang.</p>`:"")
  +er+`<div class="fl"><button class="b s" onclick="tkStep(0)">Batal</button><button class="b" onclick="tkStep(2)"${o.done?" disabled":""}>Lanjut</button></div>`}
 else if(step===2){b=`<h3>Hitung uang di laci</h3><p class="k">Kas seharusnya</p><p class="ksg-big">${rp(D.exp)}</p>`
  +fld("tk-c","Uang fisik di laci (Rp)",{type:"text",a:' inputmode="numeric" autocomplete="off" placeholder="Isi hasil hitung" oninput="fmtR(this);tkLive(this.value)" onchange="tkLive(this.value)"',value:h.c||""})
  +`<div class="fl"><button class="b s sm" onclick="tkPas()">Sesuai (Rp ${fm(D.exp)})</button></div><p id="tk-df" class="ksg-kem${o.df!==null&&o.df<0?" bad":""}">${o.df===null?"Isi uang fisik di laci":(o.df===0?"Pas, tidak ada selisih":(o.df<0?"Kurang "+rp(-o.df):"Lebih "+rp(o.df)))}</p>`
  +fld("tk-n","Catatan (opsional)",{value:h.n||"",a:' maxlength="120" onchange="S.tkh.n=this.value"'})
  +er+`<div class="fl"><button class="b s" onclick="tkStep(1)">Kembali</button><button class="b" onclick="dgTutupSave()">Tutup kasir</button></div>`}
 else{const c=(db.dg_closings||[]).find(x=>x._id===S.tklast)||{};b=`<div class="ksg-ok">✓</div><h3>Kasir ditutup</h3><p class="k">${esc(tglS(c.date||o.d))}</p><div class="upl">${R("Kas seharusnya","Rp "+fm(c.expected||0))}${R("Uang di laci","Rp "+fm(c.counted||0))}${R("Selisih",c.diff===0?"Pas":(c.diff<0?"Kurang Rp "+fm(-c.diff):"Lebih Rp "+fm(c.diff)))}</div>`
  +`<div class="fl"><button class="b s" onclick="tkStep(0)">Selesai</button><button class="b" onclick="openDoc('tk','${esc(c._id||"")}')">Cetak rekap</button></div>`}
 return`<div class="ksov" onclick="if(event.target===this&&${step===3?"false":"true"})tkStep(0)"><div class="ksdlg" role="dialog" aria-modal="true" aria-label="Tutup kasir">${hd}${b}</div></div>`}
function dgTutupSave(){try{if(noPerm("dagang.kasir"))return;negAny();if(!modOn("dagang"))throw Error("Modul Perdagangan tidak aktif");const h=S.tkh||{},un=ksUnit(),d=h.d||today(),kid=tkKid(),kas=db.cash_accounts.find(c=>c._id===kid);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(d))throw fe("tk-d","Tanggal wajib diisi");if(d>today())throw fe("tk-d","Tanggal tidak boleh di masa depan");if(!kas||!isAct(kas))throw fe("tk-k","Pilih kas/bank");
 const cnt=h.c===undefined||h.c===""?NaN:Math.round(+pn(String(h.c)));if(isNaN(cnt)||cnt<0)throw fe("tk-c","Isi uang fisik di laci (0 atau lebih)");if(dgTkHas(un,d,kid))throw Error("Kas ini sudah ditutup untuk "+d);
 const D=dgTkData(un,d,kid),df=cnt-D.exp;let tx=null;if(df!==0){dgSeedAcc();tx=post({type:"tutup_kasir",date:d,unit:un,desc:"Selisih kas kasir "+d+" – "+kas.name,lines:df<0?[{acc:"ACC5920",d:-df},{acc:kas.account_id,c:-df}]:[{acc:kas.account_id,d:df},{acc:"ACC5920",c:df}]})}
 const c={_id:uid("TK"),unit_id:un,date:d,cash_id:kid,expected:D.exp,counted:cnt,diff:df,tunai:D.tunai,piutang:D.piutang,retur:D.retur,nota:D.nota,notaTunai:D.notaTunai,notaKredit:D.notaKredit,jualKredit:D.jualKredit,note:(h.n||"").trim().slice(0,120),transaction_id:tx?tx._id:null,status:"ok",...byN()};
 (db.dg_closings=db.dg_closings||[]).push(c);audit("create","kasir",c._id,"Tutup kasir "+d+" · seharusnya Rp "+D.exp.toLocaleString("id-ID")+" · selisih Rp "+df.toLocaleString("id-ID"));save();S.tkh={d:h.d,k:kid};ksDraftClr("tk-");S.tks=3;S.tklast=c._id;S.msg="Kasir "+d+" ditutup"+(df===0?": pas":(df<0?": kurang Rp "+fm(-df):": lebih Rp "+fm(df))+" (dijurnal ke Selisih Kas)")}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function dgTutupBatal(id){try{const c=(db.dg_closings||[]).find(x=>x._id===id);if(!c||c.status!=="ok")throw Error("Penutupan tidak ditemukan");if(c.transaction_id)rev(c.transaction_id);c.status="void";audit("void","kasir",id,"Batal tutup kasir "+c.date);save();S.msg="Penutupan kasir "+c.date+" dibatalkan"+(c.transaction_id?"; jurnal selisih dibalik":"")}catch(e){S.msg="⚠ "+e.message}render()}
function vTk(id){const c=(db.dg_closings||[]).find(x=>x._id===id),bar=docBar(1);if(!c)return`${bar}<p class="k">Rekap tidak tersedia.</p>`;
 const R=(a,v)=>`<tr><td>${a}</td><td class="n">${v}</td></tr>`,kn=(db.cash_accounts.find(x=>x._id===c.cash_id)||{}).name||"-";
 return`${bar}<div class="${dcl(1)}">${kop()}<h3>REKAP TUTUP KASIR</h3><div class="cn">${esc(unitName(c.unit_id))} · ${c.date}${c.status==="void"?" · DIBATALKAN":""}</div><table>${R("Kas/bank",esc(kn))}${R("Nota hari itu",c.nota+" ("+c.notaTunai+" tunai, "+c.notaKredit+" kredit)")}${R("Penjualan tunai",rp(c.tunai))}${R("Piutang diterima",rp(c.piutang))}${R("Retur tunai",rp(c.retur))}${R("<b>Kas seharusnya</b>","<b>"+rp(c.expected)+"</b>")}${R("Uang fisik",rp(c.counted))}${R("<b>Selisih</b>","<b>"+(c.diff===0?"Pas":(c.diff<0?"Kurang ":"Lebih ")+rp(Math.abs(c.diff)))+"</b>")}${R("Penjualan kredit (di luar laci)",rp(c.jualKredit))}${c.note?R("Catatan",esc(c.note)):""}</table>${sig([["Kasir",c.by||""],["Pengurus",""]],0,c.date)}</div>`}
// pindai kode lewat kamera (BarcodeDetector bila tersedia); hasil dikirim ke ksQ seperti ketikan pemindai
let KS_STREAM=null,KS_TMR=null;
function ksScanStop(){try{if(KS_TMR)clearInterval(KS_TMR);KS_TMR=null;if(KS_STREAM)KS_STREAM.getTracks().forEach(t=>t.stop());KS_STREAM=null;const o=document.getElementById("ksscan");if(o)o.remove()}catch(e){}}
async function ksScan(){try{ksScanStop();if(!("BarcodeDetector" in window)||!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia))throw Error("Peramban ini belum mendukung pemindaian kamera. Gunakan pemindai USB/Bluetooth atau ketik kode lalu Enter");
 const det=new window.BarcodeDetector(),st=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}});KS_STREAM=st;
 const o=document.createElement("div");o.id="ksscan";o.setAttribute("role","dialog");o.setAttribute("aria-label","Pindai kode");o.innerHTML='<video playsinline muted></video><div class="ksc"><b>Arahkan kamera ke kode batang</b><button class="b s" type="button">Tutup</button></div>';document.body.appendChild(o);
 o.querySelector("button").onclick=ksScanStop;const v=o.querySelector("video");v.srcObject=st;await v.play();let busy=false;
 KS_TMR=setInterval(async()=>{if(busy)return;busy=true;try{const r=await det.detect(v);if(r&&r.length&&r[0].rawValue){const c=r[0].rawValue;ksScanStop();ksQ(c)}}catch(e){}busy=false},350)}catch(e){ksScanStop();const nm=e&&e.name;S.msg="⚠ "+(nm==="NotAllowedError"?"Izin kamera ditolak; izinkan akses kamera di pengaturan peramban":nm==="NotFoundError"||nm==="OverconstrainedError"?"Kamera tidak ditemukan di perangkat ini":nm==="NotReadableError"?"Kamera sedang dipakai aplikasi lain":e&&e.message&&!nm?e.message:"Kamera tidak dapat dibuka");render()}}
function ksFull(){S.kfs=!S.kfs;try{document.body.classList.toggle("ksfs",!!S.kfs);if(S.kfs&&document.documentElement.requestFullscreen)document.documentElement.requestFullscreen().catch(()=>{});else if(!S.kfs&&document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen().catch(()=>{})}catch(e){}render()}
// Esc menutup jendela pembayaran dan lembar pesanan di Kasir
if(typeof document!=="undefined"&&typeof document.addEventListener==="function")document.addEventListener("keydown",e=>{if(e.key==="Escape"&&(S.tab==="ksr"||S.tab==="dagang"&&S.dgv==="kasir")){if(S.kstep){ksStep(0)}else if(S.ksh){ksSheet(false)}}});

/* PL5d (v1.1.314): halaman khusus kasir. Alamat #kasir membuka Kasir layar penuh tanpa sidebar, header, dan menu lain; data dan login sama dengan aplikasi. */
function kpOk(){return typeof tabOk==="function"&&tabOk("ksr")&&can("dagang.kasir")}
function kpUrl(h){try{if(typeof history!=="undefined"&&history.replaceState)history.replaceState(null,"",location.pathname+location.search+h)}catch(e){}}
function kpSync(){if(S.kpage&&!kpOk()){S.kpage=0;S.msg="⚠ Halaman Kasir tidak tersedia untuk akun ini (perlu izin Perdagangan: kelola dan modul aktif)";kpUrl("")}
 if(S.kpage){S.tab="ksr";S.dgv="kasir"}
 try{document.body.classList.toggle("ksp",!!S.kpage);document.body.classList.toggle("ksfs",!!(S.kpage||S.kfs))}catch(e){}}
function kpOpen(){S.kpage=1;S.tab="ksr";S.dgv="kasir";kpUrl("#kasir");render()}
function kpExit(){S.kpage=0;S.kfs=false;try{if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen().catch(()=>{})}catch(e){}kpUrl("");render()}
function kpBar(){const un=ksUnit(),d=today(),L=db.sales.filter(x=>x.dagang&&x.unit_id===un&&x.date===d&&x.status==="posted"),t=L.reduce((a,x)=>a+(+x.total||0),0);
 return`<div class="ksp-bar"><b>Kasir</b><span>${esc(unitName(un))} · ${esc(tglS(d))}</span><span class="ksp-s">Hari ini: ${L.length} nota · ${rp(t)}</span><button class="b s" type="button" onclick="kpExit()">Ke aplikasi</button></div>`}
if(typeof window!=="undefined"&&window.addEventListener){if(location.hash==="#kasir")S.kpage=1;window.addEventListener("hashchange",()=>{const on=location.hash==="#kasir";if(on!==!!S.kpage){S.kpage=on?1:0;if(!on)S.kfs=false;render()}})}

/* PL5f (v1.1.316): Kasir sebagai menu sendiri (sidebar dan navigasi bawah), terpisah dari tab Perdagangan */
function vKsr(){const U=dgScope();S.dgv="kasir";if(!U.length)return`<h2>Kasir</h2>${dgNone()}`;return dgKasir(U)}
