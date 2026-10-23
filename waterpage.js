// ===== PAMSIMAS: halaman detail pelanggan dan mode lapangan (dipindah dari water.js pada v1.1.250; perilaku tidak berubah) =====
// ===== v1.1.240 — Detail pelanggan Pamsimas sebagai halaman (bukan modal) =====
// S.wdp = id sambungan yang dibuka; isi diambil dari MD.wd (sama dengan versi modal), id kolom (#wd-a, #wp-d, dst.) tetap.
function wdPage(id){if(!id)return;S.tab="air";S.doc=null;S.pp=null;for(const x in MK)S[MK[x]]=null;S.md=null;S.mv=null;S.fe=null;S.msg="";S.wdp=id;S.ewd=id;S.wgo=0;render();if(typeof window!=="undefined"&&window.scrollTo)window.scrollTo(0,0);const m=$("#main");if(m&&m.focus)m.focus({preventScroll:true})}
function wdBack(){S.wfield=0;S.wdp=null;S.ewd=null;S.mv=null;S.fe=null;render();if(typeof window!=="undefined"&&window.scrollTo)window.scrollTo(0,0)}
function vWdPage(){if(S.ewd&&S.ewd!==S.wdp)S.wdp=S.ewd;else S.ewd=S.wdp;const f=MD.wd(),fb=(f.fb||"").replace(/mdClose\(\)/g,"wdBack()");
 const wf=S.wfield?wfBar():"";
 return`<div class="pg${S.wfield?" wdf":""}">${wf}<div class="pgh"><button class="b s pgb" onclick="wdBack()"><span aria-hidden="true">←</span> Daftar sambungan</button><div class="pgt"><h2>${esc(f.t)}</h2></div></div><section class="card pgf" id="pgf"><div class="pgg"><div class="pgc">${f.b}</div></div>${fb?`<div class="actb">${fb}</div>`:""}</section></div>`}
function wdSnap(){if(!S.wdp||S.tab!=="air"||!document.querySelectorAll||S.wdo!==S.wdp)return;const v={};let n=0;
 document.querySelectorAll("#main .pgf [id]").forEach(e=>{if(!MSK.test(e.tagName)||e.type==="file"||e.type==="password"||NB.includes(e.id))return;v[e.id]=e.type==="checkbox"?e.checked:e.value;n++});
 const a=document.activeElement;S.wdm=a&&a.id&&a.closest&&a.closest(".pgf")?a.id:"";if(n)S.wdv={k:S.wdp,v}}
function wdAfter(){if(!S.wdp||S.tab!=="air"){S.wdo="";S.wdv=null;return}
 if(S.wdv&&S.wdv.k===S.wdp&&document.querySelectorAll)document.querySelectorAll("#main .pgf [id]").forEach(e=>{if(!(e.id in S.wdv.v))return;const v=S.wdv.v[e.id];if(e.type==="checkbox")e.checked=!!v;else if(e.tagName==="SELECT"){if([...e.options].some(o=>o.value===v||o.text===v))e.value=v}else e.value=v});
 const was=S.wdo;S.wdo=S.wdp;if(was===S.wdp&&S.wdm&&!S.fe&&!S.wgo){const f=$("#"+S.wdm);if(f&&f.focus)f.focus({preventScroll:true})}
 wdPrev();if(S.wgo){S.wgo=0;const a=$("#wd-a");if(a&&a.focus){a.focus({preventScroll:false})}}}
if(typeof document!=="undefined"&&document.addEventListener)document.addEventListener("keydown",e=>{if(!S.wdp||S.tab!=="air"||S.cf||S.md||S.doc)return;
 if(e.key==="Escape"){e.preventDefault();wdBack();return}
 if(e.key==="Enter"&&e.target&&e.target.tagName==="INPUT"&&e.target.type!=="checkbox"&&e.target.closest&&e.target.closest("#pgf")&&!e.target.closest(".noent")){e.preventDefault();const b=document.querySelector("#pgf .actb .b:last-child");if(b)b.click()}});

// ===== v1.1.248 (K8): mode lapangan Pamsimas =====
// Alur satu layar per pelanggan untuk petugas baca meter: mulai dari pelanggan pertama yang belum dibaca, kolom angka besar, Terbitkan & lanjut ke pelanggan berikutnya, Lewati, Selesai. Data tetap tersimpan di perangkat (aplikasi berjalan tanpa sinyal).
function wfStart(){const id=wdNext("");if(!id){S.msg="Semua sambungan periode ini sudah ditagih";render();return}S.wfield=1;wdPage(id)}
function wfSkip(){const nx=wdNext(S.ewd);if(!nx){S.msg="Tidak ada pelanggan lain yang belum dibaca";render();return}wdPage(nx);S.wgo=1;render()}
function wfLeft(){const d=bmData();return d.cs.filter((c,i)=>!d.bl[i]).length}
function wfBar(){const n=wfLeft(),d=bmData(),tot=d.cs.length;return`<div class="wfb" role="status"><span><b>Mode lapangan</b> · ${n} dari ${tot} belum dibaca · tersimpan di perangkat, tanpa sinyal pun bisa</span><span class="wfa"><button type="button" class="b s sm" onclick="wfSkip()">Lewati</button><button type="button" class="b s sm" onclick="wdBack()">Selesai</button></span></div>`}

// ===== v1.1.283 — Detail piutang dan Loket sebagai halaman (bukan dialog / bukan panel di bawah daftar) =====
// S.bdp = id tagihan (piutang) yang dibuka; isi dari MD.wb (id kolom #wp-a, #wp-d, #wp-k tetap). S.lkp = pelanggan yang dibuka di Loket.
function bdPage(id){if(!id)return;if(S.tab!=="air"&&(typeof tabOk!=="function"||tabOk("air"))){S.tab="air";S.at="piutang"}S.doc=null;S.pp=null;for(const x in MK)S[MK[x]]=null;S.md=null;S.mv=null;S.fe=null;S.msg="";S.wdp=null;S.tdp=null;S.bdp=id;S.ewb=id;render();if(typeof window!=="undefined"&&window.scrollTo)window.scrollTo(0,0);const m=$("#main");if(m&&m.focus)m.focus({preventScroll:true})}
function bdBack(){S.bdp=null;S.ewb=null;S.mv=null;S.fe=null;render();if(typeof window!=="undefined"&&window.scrollTo)window.scrollTo(0,0)}
function vBdPage(){S.ewb=S.bdp;const f=MD.wb(),bd=(f.b||"").replace(/mdClose\(\)/g,"bdBack()"),fb=f.nf?"":`<button class="b" onclick="${f.s}">${esc(f.y)}</button>`;
 return`<div class="pg"><div class="pgh"><button class="b s pgb" onclick="bdBack()"><span aria-hidden="true">←</span> Piutang</button><div class="pgt"><h2>${esc(f.t)}</h2><small class="k">Detail piutang</small></div></div><section class="card pgf" id="pgf"><div class="pgg"><div class="pgc">${bd}</div></div>${fb?`<div class="actb">${fb}</div>`:""}</section></div>`}
function vLkPage(){const P=lkParts(),p=cust(S.lkp);
 return`<div class="pg"><div class="pgh"><button class="b s pgb" onclick="lkClose()"><span aria-hidden="true">←</span> Loket</button><div class="pgt"><h2>${esc(p.name||"Pelanggan")}</h2><small class="k">Terima pembayaran di loket</small></div></div>${P.hasil}${P.pan}</div>`}
function lkSrch(){return`<div class="fl wsr"><input type="search" id="lk-q" placeholder="Nama / telepon / alamat / no meter…" aria-label="Cari pelanggan" value="${esc(S.wq||"")}" onchange="S.wq=this.value;S.lim=0;render()" onkeydown="if(event.key==='Enter'){event.preventDefault();lkEnter(this.value)}">${(S.wq||"").trim()?`<button class="b s" onclick="S.wq='';render()">Reset</button>`:""}</div>`}
function lkEnter(v){S.wq=v;S.lim=0;render();const c=S._lkc||[];if(c.length)lkPick(c[0])}
function lkOpen(pid){if(!pid)return;S.tab="air";S.at="loket";S.wq="";S.bdp=null;S.ewb=null;S.doc=null;S.pp=null;for(const x in MK)S[MK[x]]=null;S.md=null;lkPick(pid);if(typeof window!=="undefined"&&window.scrollTo)window.scrollTo(0,0)}
function jBdg(x){return x.janji&&owedS(x)>0.005?`<span class="bdg ${x.janji.d<today()?"bd":"wr"}">Janji ${esc(tglS(x.janji.d))}</span>`:""}
function piuList(opsF){const late=x=>owedS(x)>0.005&&x.bill&&x.bill.due&&x.bill.due<today(),k=S.wps||"",
 cmp=k==="tua"?(a,b)=>a.date===b.date?a._id.localeCompare(b._id):a.date<b.date?-1:1:k==="besar"?(a,b)=>owedS(b)-owedS(a):k==="telat"?(a,b)=>(late(b)?1:0)-(late(a)?1:0)||(a.date<b.date?1:-1):null,
 L=cmp?opsF.slice().sort(cmp):opsF,lim=pgLim("pcl");
 if(S.wpv==="tgh")return`<div class="upl">${L.slice(0,lim).map((x,i)=>{const nm=x.party_id?cust(x.party_id).name:"Tanpa pelanggan",lt=late(x),pd=paidOf(x);return`<button class="upr nsr${hlc(x._id)}" onclick="mdOpen('wb','${x._id}')">${avA(nm,i)}<span class="upm"><b>${esc(nm)}</b><small>${x.sale_number} · ${x.bill?"Air "+esc(x.bill.period)+" · jatuh tempo "+esc(tglS(x.bill.due)):x.opening?"Saldo awal piutang":"Layanan · "+esc(tglS(x.date))}</small></span><span class="upa"><b>${rp(owedS(x))}</b>${lt?'<span class="bdg bd">Terlambat</span>':""}${pd>0?'<span class="bdg wr">Dibayar sebagian</span>':""}${jBdg(x)}</span></button>`}).join("")}</div>${pgMore("pcl",L.length)}${btt(Math.min(L.length,lim))}`;
 const G=[],ix={};L.forEach(x=>{const key=x.party_id||"-";if(!(key in ix)){ix[key]=G.length;G.push({p:x.party_id,L:[]})}G[ix[key]].L.push(x)});
 return`<div class="upl">${G.slice(0,lim).map((g,i)=>{const nm=g.p?cust(g.p).name:"Tanpa pelanggan",tot=g.L.reduce((t,x)=>t+owedS(x),0),nl=g.L.filter(late).length,one=g.L.length===1,x0=g.L[0],tua=g.L.map(x=>x.date).sort()[0],
  oc=one||!g.p?`mdOpen('wb','${x0._id}')`:`lkOpen('${g.p}')`;
  return`<button class="upr nsr${hlc(x0._id)}" onclick="${oc}">${avA(nm,i)}<span class="upm"><b>${esc(nm)}</b><small>${one?x0.sale_number+" · "+(x0.bill?"Air "+esc(x0.bill.period)+" · jatuh tempo "+esc(tglS(x0.bill.due)):x0.opening?"Saldo awal piutang":"Layanan · "+esc(tglS(x0.date))):g.L.length+" tagihan · tertua "+esc(tglS(tua))+" · buka di Loket"}</small></span><span class="upa"><b>${rp(tot)}</b>${nl?`<span class="bdg bd">Terlambat${one?"":" "+nl}</span>`:""}${one&&paidOf(x0)>0?'<span class="bdg wr">Dibayar sebagian</span>':""}${one?jBdg(x0):(g.L.some(y=>y.janji&&y.janji.d<today())?'<span class="bdg bd">Janji lewat</span>':g.L.some(y=>y.janji)?'<span class="bdg wr">Ada janji</span>':"")}</span></button>`}).join("")}</div>${pgMore("pcl",G.length)}${btt(Math.min(G.length,lim))}`}
if(typeof document!=="undefined"&&document.addEventListener)document.addEventListener("keydown",e=>{if(S.cf||S.md||S.doc||S.bel)return;if(e.key==="Escape"){if(S.bdp){e.preventDefault();bdBack()}else if(S.lkp&&S.tab==="air"&&S.at==="loket"){e.preventDefault();lkClose()}}});
// isian di halaman detail piutang dipertahankan saat tampilan digambar ulang (mis. ukuran layar berubah)
function bdSnap(){if(!S.bdp||!document.querySelectorAll||S.bdo!==S.bdp)return;const v={};let n=0;
 document.querySelectorAll("#main .pgf [id]").forEach(e=>{if(!MSK.test(e.tagName)||e.type==="file"||e.type==="password"||NB.includes(e.id))return;v[e.id]=e.type==="checkbox"?e.checked:e.value;n++});
 const a=document.activeElement;S.bdm=a&&a.id&&a.closest&&a.closest(".pgf")?a.id:"";if(n)S.bdv={k:S.bdp,v}}
function bdAfter(){if(!S.bdp){S.bdo="";S.bdv=null;return}
 if(S.bdv&&S.bdv.k===S.bdp&&document.querySelectorAll)document.querySelectorAll("#main .pgf [id]").forEach(e=>{if(!(e.id in S.bdv.v))return;const v=S.bdv.v[e.id];if(e.type==="checkbox")e.checked=!!v;else if(e.tagName==="SELECT"){if([...e.options].some(o=>o.value===v||o.text===v))e.value=v}else e.value=v});
 const was=S.bdo;S.bdo=S.bdp;if(was===S.bdp&&S.bdm&&!S.fe){const f=$("#"+S.bdm);if(f&&f.focus)f.focus({preventScroll:true})}}
