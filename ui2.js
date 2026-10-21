// UI v2 · UV2 (v1.1.321): kepala halaman — judul besar + jejak + area aksi di kanan (desktop)
function pgHead(){
 try{
  if(typeof document==="undefined"||!document.querySelector)return;
  const m=document.querySelector("#main");if(!m||!m.insertAdjacentHTML)return;
  const old=m.querySelector(":scope > .v2h");if(old)old.remove();
  if(S.doc||S.pp||S.kpage||S.wdp||S.bdp||S.lkp||S.tdp)return;
  const lb=Object.fromEntries(TABS),t=lb[S.tab];if(!t)return;
  const crumb=[];
  crumb.push("Beranda");
  crumb.push(t);
  const a=m.querySelector('.stb [aria-selected="true"], .rsel [aria-selected="true"]');
  if(a){const b=a.querySelector&&a.querySelector("b"),own=Array.from(a.childNodes||[]).filter(z=>z.nodeType===3).map(z=>z.textContent).join("");const x=((b||{}).textContent||own||a.textContent||"").replace(/\s+/g," ").trim();if(x&&x!==t&&x.length<40)crumb.push(x)}
  const n=crumb.length,bc=crumb.map((c,i)=>i===n-1?`<span aria-current="page">${esc(c)}</span>`:`<button type="button" class="v2l" onclick="pgCr(${i===0?"'dash'":"'tab'"})">${esc(c)}</button>`).join('<i aria-hidden="true">›</i>');
  const dupK=crumb.map(c=>c.toLowerCase());
  m.insertAdjacentHTML("afterbegin",`<div class="v2h"><div class="v2t"><h2>${esc(t)}</h2><nav class="v2b" aria-label="Jejak halaman">${bc}</nav></div><div class="v2a" id="v2a"></div></div>`);
  // TL8: bilah tombol aksi (hanya tombol) pindah ke area aksi di kanan judul pada desktop
  try{if(window.matchMedia&&window.matchMedia("(min-width:900px)").matches){
   const bar=Array.from(m.querySelectorAll(".fl")).find(f=>(f.parentElement===m||f.parentElement.classList.contains("dgp"))&&!f.closest(".card,.doc,.v2h,.ksg,.ksg-c")&&f.children.length&&f.children.length<=3&&Array.from(f.children).every(c=>c.tagName==="BUTTON"));
   const a=m.querySelector(".v2a");if(bar&&a){while(bar.firstChild)a.appendChild(bar.firstChild);bar.remove()}}}catch(e){}
  // TL10: baris Versi + Catatan rilis (Setelan) ikut ke kepala halaman di desktop
  try{if(window.matchMedia&&window.matchMedia("(min-width:900px)").matches){
   const r=m.querySelector(":scope > .rnb"),a=m.querySelector(".v2a"),t=m.querySelector(".v2t");
   if(r&&a&&t){const v=r.querySelector(".k"),bt=r.querySelector("button");if(bt)a.appendChild(bt);if(v){const sp=document.createElement("span");sp.className="v2v";sp.textContent=v.textContent;t.appendChild(sp)}r.remove()}}}catch(e){}
  // TL4: judul h2 pertama yang sama dengan judul/jejak halaman disembunyikan di desktop (tidak ganda)
  const h=Array.from(m.querySelectorAll("h2")).find(z=>!z.closest(".v2h")&&!z.closest(".doc"));
  if(h&&dupK.includes((h.textContent||"").replace(/\s+/g," ").trim().toLowerCase()))h.classList.add("v2dup");
 }catch(e){}
}
// klik jejak: Beranda membuka Dashboard; nama menu kembali ke tampilan awal menu (tab pertama bila ada sub-tab)
function pgCr(k){
 if(k==="dash"){go("dash");return}
 const f=document.querySelector('#main .stb [role="tab"], #main .rsel [role="tab"]');
 if(f&&f.getAttribute("aria-selected")!=="true"){f.click();window.scrollTo(0,0);return}
 go(S.tab)}
