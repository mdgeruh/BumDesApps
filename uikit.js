// ===== v1.1.033 — Kontrol kustom: dropdown, tanggal, bulan, berkas (pengganti tampilan bawaan browser) =====
// Kontrol asli (select, input date/month/file) tetap ada tetapi tersembunyi (.uh), jadi id, nilai, event, dan validasi tidak berubah.
// Tombol kustom (.ub) dipasang tepat setelahnya; nilai diubah lewat kontrol asli lalu event input + change dikirim.
const UI_BLN=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],UI_HR=["Sen","Sel","Rab","Kam","Jum","Sab","Min"],
 UI_CH='<svg class="uc" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 UI_CAL='<svg class="uc" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 10h17M8 3v4M16 3v4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
 UI_CK='<svg class="uc" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
let UIP=null;
const uiE=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])),uiP2=n=>String(n).padStart(2,"0");
function uiFmt(c){const v=c.value;if(c.type==="month"){const m=/^(\d{4})-(\d{2})$/.exec(v);return m?UI_BLN[+m[2]-1]+" "+m[1]:""}const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(v);return m?(+m[3])+" "+UI_BLN[+m[2]-1].slice(0,3)+" "+m[1]:""}
function uiName(c){let n=c.getAttribute("aria-label");if(!n&&c.id){const l=document.querySelector('label[for="'+c.id+'"]');if(l)n=l.textContent}return(n||"").replace(/\s+/g," ").trim()}
function uiSet(c,v){c.value=v;c.dispatchEvent(new Event("input",{bubbles:true}));c.dispatchEvent(new Event("change",{bubbles:true}))}
// ----- pemasangan -----
function uiMake(c,cls,icon){c.classList.add("uh");c.tabIndex=-1;c.setAttribute("aria-hidden","true");const b=document.createElement("button");b.type="button";b.className="ub "+cls;b.innerHTML='<span class="ut"></span>'+icon;c.insertAdjacentElement("afterend",b);b._c=c;c._b=b;return b}
function uiSync(c){const b=c._b;if(!b)return;let t,ph=false;
 if(c.tagName==="SELECT"){const o=c.options[c.selectedIndex];t=o?o.text:"";ph=!!o&&o.value===""}
 else if(c.type==="file"){t=c.files&&c.files.length?c.files[0].name:"Belum ada berkas";ph=!(c.files&&c.files.length)}
 else{t=uiFmt(c);if(!t){t=c.type==="month"?"Pilih bulan":"Pilih tanggal";ph=true}}
 const s=b.firstChild;if(s.textContent!==t)s.textContent=t;b.classList.toggle("ph",ph);if(b.disabled!==c.disabled)b.disabled=c.disabled;
 const nm=uiName(c),al=(nm?nm+", ":"")+t;if(b.getAttribute("aria-label")!==al)b.setAttribute("aria-label",al)}
function uiEnh(){if(!document.querySelectorAll)return;
 if(UIP&&!document.body.contains(UIP.b))uiClose(true);
 document.querySelectorAll("select:not(.uh):not([multiple]):not([data-native])").forEach(s=>{const b=uiMake(s,"sl",UI_CH);b.setAttribute("aria-haspopup","listbox");b.setAttribute("aria-expanded","false");b.onclick=()=>uiOpen(s)});
 document.querySelectorAll("input[type=date]:not(.uh),input[type=month]:not(.uh)").forEach(c=>{const b=uiMake(c,"dt",UI_CAL);b.setAttribute("aria-haspopup","dialog");b.setAttribute("aria-expanded","false");b.onclick=()=>uiOpen(c)});
 document.querySelectorAll("input[type=file]:not(.uh)").forEach(c=>{const b=uiMake(c,"fb",'<span class="uf">Pilih berkas</span>');b.setAttribute("aria-haspopup","dialog");b.onclick=()=>c.click();c.addEventListener("change",()=>uiSync(c))});
 document.querySelectorAll(".uh").forEach(uiSync)}
// ----- popup -----
function uiClose(quiet){const p=UIP;if(!p)return;UIP=null;p.el.remove();p.bd.remove();p.b.setAttribute("aria-expanded","false");if(!quiet&&p.b.isConnected&&p.b.focus)p.b.focus()}
function uiPlace(p){const r=p.b.getBoundingClientRect(),W=innerWidth,H=innerHeight,el=p.el;el.style.cssText="";
 if(W<600){el.classList.add("sheet");p.bd.classList.add("dim");return}
 el.classList.remove("sheet");p.bd.classList.remove("dim");const w=Math.min(Math.max(r.width,p.kind==="sel"?200:284),W-16);el.style.width=w+"px";
 const h=el.offsetHeight,below=H-r.bottom-8,above=r.top-8,up=h>below&&above>below;el.style.left=Math.max(8,Math.min(r.left,W-w-8))+"px";
 if(up){el.style.bottom=(H-r.top+4)+"px";el.style.maxHeight=Math.max(160,above)+"px"}else{el.style.top=(r.bottom+4)+"px";el.style.maxHeight=Math.max(160,below)+"px"}}
function uiOpen(c){if(c.disabled)return;if(UIP){const same=UIP.c===c;uiClose();if(same)return}
 const bd=document.createElement("div");bd.className="upb";bd.onclick=()=>uiClose();const el=document.createElement("div");el.className="up";
 const p={c,b:c._b,el,bd,kind:c.tagName==="SELECT"?"sel":c.type};UIP=p;p.b.setAttribute("aria-expanded","true");
 if(p.kind==="sel")uiSelUI(p);else uiDateUI(p);
 document.body.appendChild(bd);document.body.appendChild(el);uiPlace(p);
 const f=el.querySelector('[aria-selected="true"],[aria-current="date"],.ud:not(:disabled),.um.on,.uo');if(f)f.focus({preventScroll:true});const sc=el.querySelector('[aria-selected="true"]');if(sc&&sc.scrollIntoView)sc.scrollIntoView({block:"nearest"})}
// dropdown
function uiSelUI(p){const c=p.c,el=p.el,os=[...c.options],big=os.length>12;el.setAttribute("role","listbox");el.setAttribute("aria-label",uiName(c)||"Pilihan");
 el.innerHTML=(big?'<div class="usr"><input type="text" class="uq" placeholder="Cari…" aria-label="Cari pilihan" autocomplete="off"></div>':"")+'<div class="uol">'+os.map((o,i)=>`<button type="button" role="option" class="uo${o.value===""?" ph":""}" data-i="${i}" aria-selected="${i===c.selectedIndex}"${o.disabled?" disabled":""}><span>${uiE(o.text)||"&nbsp;"}</span>${i===c.selectedIndex?UI_CK:""}</button>`).join("")+"</div>";
 el.onclick=e=>{const b=e.target.closest(".uo");if(!b||b.disabled)return;const i=+b.dataset.i;uiClose();if(c.selectedIndex!==i){c.selectedIndex=i;uiSync(c);c.dispatchEvent(new Event("input",{bubbles:true}));c.dispatchEvent(new Event("change",{bubbles:true}))}};
 const q=el.querySelector(".uq");if(q)q.oninput=()=>{const t=q.value.toLowerCase();el.querySelectorAll(".uo").forEach(b=>{b.hidden=!!t&&!b.textContent.toLowerCase().includes(t)})}}
// kalender
function uiDateUI(p){const c=p.c,mo=c.type==="month",v=c.value,now=(typeof today==="function"?today():new Date().toISOString().slice(0,10)),base=/^\d{4}-\d{2}/.test(v)?v:now;p.y=+base.slice(0,4);p.m=+base.slice(5,7)-1;p.sel=v;p.now=now;p.mo=mo;uiDateDraw(p)}
function uiInR(c,s){return!(c.min&&s<c.min.slice(0,s.length))&&!(c.max&&s>c.max.slice(0,s.length))}
function uiDateDraw(p,focus){const c=p.c,el=p.el,mo=p.mo;el.setAttribute("role","dialog");el.setAttribute("aria-label",mo?"Pilih bulan":"Pilih tanggal");
 const hd=(t)=>`<div class="uhd"><button type="button" class="un" data-n="-1" aria-label="${mo?"Tahun":"Bulan"} sebelumnya"><svg class="uc" viewBox="0 0 24 24" width="18" height="18"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button><b aria-live="polite">${t}</b><button type="button" class="un" data-n="1" aria-label="${mo?"Tahun":"Bulan"} berikutnya"><svg class="uc" viewBox="0 0 24 24" width="18" height="18"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>`;
 let body;
 if(mo){body='<div class="umg">'+UI_BLN.map((n,i)=>{const s=p.y+"-"+uiP2(i+1);return`<button type="button" class="um${s===p.sel?" on":""}" data-v="${s}"${uiInR(c,s)?"":" disabled"}${s===p.now.slice(0,7)?' aria-current="date"':""}>${n.slice(0,3)}</button>`}).join("")+"</div>"}
 else{const f=(new Date(p.y,p.m,1).getDay()+6)%7,n=new Date(p.y,p.m+1,0).getDate();let g=UI_HR.map(h=>`<span class="uw">${h}</span>`).join("");for(let i=0;i<f;i++)g+="<span></span>";
  for(let d=1;d<=n;d++){const s=p.y+"-"+uiP2(p.m+1)+"-"+uiP2(d);g+=`<button type="button" class="ud${s===p.sel?" on":""}" data-v="${s}"${uiInR(c,s)?"":" disabled"}${s===p.now?' aria-current="date"':""} aria-label="${d} ${UI_BLN[p.m]} ${p.y}">${d}</button>`}body='<div class="udg">'+g+"</div>"}
 const inT=uiInR(c,mo?p.now.slice(0,7):p.now);
 el.innerHTML=hd(mo?p.y:UI_BLN[p.m]+" "+p.y)+body+`<div class="uft"><button type="button" class="b s" data-a="today"${inT?"":" disabled"}>${mo?"Bulan ini":"Hari ini"}</button>${c.value?'<button type="button" class="b s" data-a="clear">Hapus</button>':""}<button type="button" class="b s" data-a="close">Tutup</button></div>`;
 el.onclick=e=>{const t=e.target.closest("button");if(!t||t.disabled)return;
  if(t.dataset.n){const n=+t.dataset.n;if(mo)p.y+=n;else{p.m+=n;if(p.m<0){p.m=11;p.y--}if(p.m>11){p.m=0;p.y++}}uiDateDraw(p);const x=el.querySelector(".un[data-n='"+n+"']");if(x)x.focus();return}
  if(t.dataset.v){uiClose();uiSet(c,t.dataset.v);return}
  const a=t.dataset.a;if(a==="today"){uiClose();uiSet(c,mo?p.now.slice(0,7):p.now)}else if(a==="clear"){uiClose();uiSet(c,"")}else if(a==="close")uiClose()};
 if(focus){const f=el.querySelector('[data-v="'+focus+'"]');if(f)f.focus()}uiPlace(p)}
function uiKey(e){const p=UIP;if(!p)return;const k=e.key,t=e.target;
 if(k==="Escape"){e.preventDefault();e.stopImmediatePropagation();uiClose();return}
 if(!p.el.contains(t))return;
 if(t.classList&&t.classList.contains("uq")){if(k==="Enter"){e.preventDefault();e.stopImmediatePropagation();const f=[...p.el.querySelectorAll(".uo:not([hidden]):not(:disabled)")][0];if(f)f.click()}else if(k==="ArrowDown"){e.preventDefault();const f=p.el.querySelector(".uo:not([hidden])");if(f)f.focus()}return}
 if(k==="Tab"){const f=[...p.el.querySelectorAll("button:not(:disabled):not([hidden]),input")].filter(x=>x.getClientRects().length);if(!f.length)return;const i=f.indexOf(document.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}e.stopImmediatePropagation();return}
 if(p.kind==="sel"){const L=[...p.el.querySelectorAll(".uo:not([hidden]):not(:disabled)")],i=L.indexOf(document.activeElement);
  if(k==="ArrowDown"||k==="ArrowUp"){e.preventDefault();const n=k==="ArrowDown"?Math.min(L.length-1,i+1):Math.max(0,i<0?0:i-1);if(L[n])L[n].focus();if(!(i<=0&&k==="ArrowUp")||!p.el.querySelector(".uq"))return;p.el.querySelector(".uq").focus()}
  else if(k==="Home"||k==="End"){e.preventDefault();const n=k==="Home"?L[0]:L[L.length-1];if(n)n.focus()}e.stopImmediatePropagation();return}
 const d=t.dataset&&t.dataset.v;if(!d)return;const step={ArrowLeft:-1,ArrowRight:1,ArrowUp:p.mo?-3:-7,ArrowDown:p.mo?3:7}[k];
 if(step!==undefined){e.preventDefault();let x;if(p.mo){const n=+d.slice(0,4)*12+(+d.slice(5,7)-1)+step;x=Math.floor(n/12)+"-"+uiP2(n%12+1)}else{const o=new Date(d+"T00:00:00Z");o.setUTCDate(o.getUTCDate()+step);x=o.toISOString().slice(0,10)}p.y=+x.slice(0,4);p.m=+x.slice(5,7)-1;uiDateDraw(p,x)}
 else if(k==="PageUp"||k==="PageDown"){e.preventDefault();const n=k==="PageUp"?-1:1;if(p.mo)p.y+=n;else{p.m+=n;if(p.m<0){p.m=11;p.y--}if(p.m>11){p.m=0;p.y++}}uiDateDraw(p);const f=p.el.querySelector(".ud:not(:disabled),.um:not(:disabled)");if(f)f.focus()}
 e.stopImmediatePropagation()}
if(typeof document!=="undefined"&&document.addEventListener){
 document.addEventListener("keydown",uiKey,true);
 document.addEventListener("focusin",e=>{const t=e.target;if(t&&t.classList&&t.classList.contains("uh")&&t._b&&t.type!=="file"&&t._b.focus)t._b.focus()},true);
 document.addEventListener("keydown",e=>{const t=e.target;if(!UIP&&t&&t.classList&&t.classList.contains("ub")&&t._c&&t._c.type!=="file"&&(e.key==="ArrowDown"||e.key==="ArrowUp")){e.preventDefault();uiOpen(t._c)}},false);
 if(typeof window!=="undefined"&&window.addEventListener){window.addEventListener("resize",()=>{if(UIP)uiPlace(UIP)});window.addEventListener("scroll",e=>{if(UIP&&!UIP.el.contains(e.target))uiPlace(UIP)},true)}}
// nilai yang diubah lewat kode (c.value = ...) ikut menyegarkan tombol kustom
if(typeof HTMLInputElement!=="undefined"){[HTMLInputElement,HTMLSelectElement].forEach(K=>{const d=Object.getOwnPropertyDescriptor(K.prototype,"value");if(!d||!d.set)return;Object.defineProperty(K.prototype,"value",{get:d.get,set(v){d.set.call(this,v);if(this._b)uiSync(this)},configurable:true})});
 const si=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex");if(si&&si.set)Object.defineProperty(HTMLSelectElement.prototype,"selectedIndex",{get:si.get,set(v){si.set.call(this,v);if(this._b)uiSync(this)},configurable:true})}
if(typeof MutationObserver!=="undefined"&&typeof document!=="undefined"&&document.body){let q=0;new MutationObserver(()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;uiEnh()})}).observe(document.body,{childList:true,subtree:true})}
