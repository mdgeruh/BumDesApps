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
