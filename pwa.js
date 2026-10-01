// ===== PWA (v1.1.001): service worker agar bisa dipasang dan dibuka tanpa sambungan =====
// Hanya aktif bila dibuka lewat http(s) (mis. GitHub Pages / localhost); dari file:// aplikasi tetap berjalan seperti biasa.
if(typeof window!=="undefined"&&typeof navigator!=="undefined"&&navigator.serviceWorker&&typeof location!=="undefined"&&/^https?:$/.test(location.protocol)){
 window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js?v="+APP_VER).catch(()=>{})});
 window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();pwaPrompt=e;if(typeof render==="function")render()});
 window.addEventListener("appinstalled",()=>{pwaPrompt=null;if(typeof render==="function")render()});
}
function pwaInstall(){if(!pwaPrompt)return;const p=pwaPrompt;pwaPrompt=null;p.prompt();if(p.userChoice)p.userChoice.then(()=>render())}
