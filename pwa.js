// ===== PWA (v1.1.001): service worker agar bisa dipasang dan dibuka tanpa sambungan =====
// Hanya aktif bila dibuka lewat http(s) (mis. GitHub Pages / localhost); dari file:// aplikasi tetap berjalan seperti biasa.
if(typeof window!=="undefined"&&typeof navigator!=="undefined"&&navigator.serviceWorker&&typeof location!=="undefined"&&/^https?:$/.test(location.protocol)){
 window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js?v="+APP_VER).catch(()=>{})});
 window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();pwaPrompt=e;if(typeof render==="function")render()});
 window.addEventListener("appinstalled",()=>{pwaPrompt=null;if(typeof render==="function")render()});
}
function pwaInstall(){if(!pwaPrompt)return;const p=pwaPrompt;pwaPrompt=null;p.prompt();if(p.userChoice)p.userChoice.then(()=>render())}

// ===== v1.1.257 (F4): tema Terang/Gelap/Ikuti sistem, pembaruan terkontrol, penyimpanan persisten =====
const THK="bd_theme";
function themeGet(){try{const v=localStorage.getItem(THK);return v==="light"||v==="dark"?v:"auto"}catch(e){return"auto"}}
function themeApply(){try{const v=themeGet(),r=document.documentElement;if(!r||!r.setAttribute)return;if(v==="auto")r.removeAttribute("data-theme");else r.setAttribute("data-theme",v);const m=document.querySelector('meta[name="theme-color"]'),dk=v==="dark"||(v==="auto"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(m&&m.setAttribute)m.setAttribute("content",dk?"#141a17":"#1f7a52")}catch(e){}}
function themeSet(v){try{if(v==="light"||v==="dark")localStorage.setItem(THK,v);else localStorage.removeItem(THK)}catch(e){}themeApply();if(typeof render==="function")render()}
themeApply();
// Versi baru: service worker lama diganti otomatis (skipWaiting); halaman tidak dimuat ulang paksa agar isian yang sedang diketik aman, pengguna diberi tombol Muat ulang.
function pwaBanner(){try{if(document.getElementById("updb"))return;const e=document.createElement("div");e.id="updb";e.className="updb noprint";e.setAttribute("role","status");e.innerHTML='<span>Versi baru aplikasi sudah terpasang.</span><button type="button" class="b" onclick="location.reload()">Muat ulang</button><button type="button" class="b s" aria-label="Tutup" onclick="this.parentNode.remove()">Nanti</button>';document.body.appendChild(e)}catch(x){}}
if(typeof window!=="undefined"&&typeof navigator!=="undefined"&&navigator.serviceWorker&&typeof location!=="undefined"&&/^https?:$/.test(location.protocol)){
 const had=!!navigator.serviceWorker.controller;
 navigator.serviceWorker.addEventListener("controllerchange",()=>{if(had)pwaBanner()});
}
function pwaCek(){try{if(!navigator.serviceWorker||!/^https?:$/.test(location.protocol)){toast("Pembaruan otomatis hanya aktif bila aplikasi dibuka lewat alamat web (https).");return}navigator.serviceWorker.getRegistration().then(r=>r?r.update().then(()=>toast("Sudah dicek. Bila ada versi baru, tombol Muat ulang akan muncul.")):toast("Aplikasi belum terpasang sebagai PWA.")).catch(()=>toast("Gagal memeriksa pembaruan.",1))}catch(e){}}
// Penyimpanan persisten: minta browser agar tidak menghapus data saat ruang penuh; hasilnya tampil di Setelan > Profil.
let pst=null;
function pstInit(){try{const s=navigator.storage;if(!s||!s.persisted)return;s.persisted().then(p=>p?true:(s.persist?s.persist():false)).then(g=>{pst=!!g;const e=document.getElementById("pst-st");if(e)e.innerHTML=pstTxt()}).catch(()=>{})}catch(e){}}
function pstTxt(){return pst===true?'<b>Persisten</b>: browser tidak akan menghapus data otomatis.':pst===false?'<b>Belum persisten</b>: bila ruang perangkat penuh, browser bisa menghapus data. Unduh backup secara rutin dan pasang aplikasi ke layar utama.':'Status belum diketahui (browser tidak mendukung atau belum diperiksa).'}
if(typeof window!=="undefined"&&window.addEventListener)window.addEventListener("load",pstInit);
function devSet(){const t=themeGet(),tb=(v,n)=>`<button type="button" class="b${t===v?"":" s"}" aria-pressed="${t===v}" onclick="themeSet('${v}')">${n}</button>`;
 return dcard("Tampilan dan perangkat","Pilihan tema tersimpan di perangkat ini saja. Versi aplikasi dan status penyimpanan membantu saat melapor masalah.",`<label>Tema</label><div class="fl">${tb("auto","Ikuti sistem")}${tb("light","Terang")}${tb("dark","Gelap")}</div><p class="k">Versi aplikasi: <b>v${APP_VER}</b></p><div class="fl"><button type="button" class="b s" onclick="pwaCek()">Periksa pembaruan</button><button type="button" class="b s" onclick="location.reload()">Muat ulang</button></div><p class="k" id="pst-st">${pstTxt()}</p>`,"pfc")}
