// ===== KEYBOARD LAYAR (v0.1.035): modal dan isian tetap terlihat di atas keyboard =====
let vvBase=0;
// Gulir otomatis hanya untuk kolom yang memunculkan keyboard layar. Kolom tanggal/bulan/jam dan <select> memakai popup asli browser yang TERTUTUP bila halaman digulir (bug v0.1.037: tombol kalender tampak tidak bekerja)
const kbF=t=>!!t&&(t.tagName==="TEXTAREA"||(t.tagName==="INPUT"&&/^(text|search|tel|email|url|password|number|)$/.test(t.type||"")));
function kbFocus(t){if(!kbF(t)||!t.scrollIntoView)return;setTimeout(()=>{if(document.activeElement!==t)return;vvFit();t.scrollIntoView({block:"center"})},300)}
function vvFit(){const v=typeof window!=="undefined"&&window.visualViewport;if(!v)return;const a=document.activeElement,typ=!!(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName||""));
 if(!typ||!vvBase)vvBase=Math.max(window.innerHeight||0,v.height);
 const open=vvBase-v.height>120,el=$("#fm");
 if(el&&el.style&&el.style.setProperty){if(open){el.style.setProperty("--vvt",Math.max(0,Math.round(v.offsetTop))+"px");el.style.setProperty("--vvh",Math.round(v.height)+"px")}else{el.style.removeProperty("--vvt");el.style.removeProperty("--vvh")}}
 if(document.body&&document.body.classList)document.body.classList.toggle("kb",open);
 if(open&&typ&&kbF(a)&&a.scrollIntoView&&a.closest&&(a.closest("#fm")||a.closest("#main")))a.scrollIntoView({block:"nearest"})}
if(typeof window!=="undefined"&&window.visualViewport&&window.visualViewport.addEventListener){const f=()=>vvFit();window.visualViewport.addEventListener("resize",f);window.visualViewport.addEventListener("scroll",f);
 if(window.addEventListener)window.addEventListener("orientationchange",()=>{vvBase=0;setTimeout(vvFit,300)});
 if(document.addEventListener)document.addEventListener("focusin",e=>kbFocus(e.target))}
if(document.addEventListener){document.addEventListener("keydown",e=>{if(!S.cf)return;if(e.key==="Escape"){e.preventDefault();cfN();return}
 if(e.key==="Tab"){const f=[...document.querySelectorAll("#cf button")];if(!f.length)return;const i=f.indexOf(document.activeElement);
  if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&(i<0||i===f.length-1)){e.preventDefault();f[0].focus()}}});
 const sk=document.querySelector(".skip");if(sk&&sk.addEventListener)sk.addEventListener("click",e=>{e.preventDefault();const m=$("#main");if(m&&m.focus)m.focus()})}
if(document.addEventListener)document.addEventListener("keydown",tabKey);
if(document.addEventListener)document.addEventListener("scroll",e=>{const t=e.target;if(t&&t.classList&&t.classList.contains("stb"))stbMask(t)},true);
