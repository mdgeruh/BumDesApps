// ===== HALAMAN DETAIL SERAGAM (v1.1.251, K6): detail transaksi sebagai halaman (bukan modal) =====
// Pola sama dengan detail pelanggan Pamsimas (waterpage.js): tombol Kembali, Esc menutup. Isi dari MD.td; Ubah/Batalkan tetap dialog di atas halaman.
// S.tdp = id transaksi yang dibuka. Tab asal tetap aktif sehingga Kembali mengembalikan daftar semula.
function tdPage(id){if(!id)return;for(const x in MK)S[MK[x]]=null;S.md=null;S.mv=null;S.fe=null;S.msg="";S.doc=null;S.tdp=id;S.etd=id;render();if(typeof window!=="undefined"&&window.scrollTo)window.scrollTo(0,0);const m=$("#main");if(m&&m.focus)m.focus({preventScroll:true})}
function tdBack(){S.tdp=null;S.etd=null;S.mv=null;S.fe=null;render();if(typeof window!=="undefined"&&window.scrollTo)window.scrollTo(0,0)}
function vTdPage(){if(!S.tdp)return"";S.etd=S.tdp;const f=MD.td(),fb=(f.fb||"").replace(/mdClose\(\)/g,"tdBack()");
 return`<div class="pg"><div class="pgh"><button class="b s pgb" onclick="tdBack()"><span aria-hidden="true">←</span> Kembali</button><div class="pgt"><h2>${esc(f.t)}</h2></div></div><section class="card pgf" id="pgf"><div class="pgg"><div class="pgc">${f.b}</div></div>${fb?`<div class="actb">${fb}</div>`:""}</section></div>`}
if(typeof document!=="undefined"&&document.addEventListener)document.addEventListener("keydown",e=>{if(!S.tdp||S.cf||S.md||S.doc||S.bel)return;if(e.key==="Escape"){e.preventDefault();tdBack()}});
