// Service worker BUMDes. Versi cache diambil dari ?v= saat didaftarkan (sama dengan versi aplikasi).
// Strategi: halaman, skrip, gaya, manifest = jaringan dulu, cadangan dari cache (selalu terbarui bila online, tetap jalan bila offline);
// ikon = cache dulu. Data aplikasi ada di localStorage, tidak pernah lewat service worker.
const V=new URL(self.location).searchParams.get("v")||"dev",CACHE="bumdes-"+V;
const ASSETS=["./","./index.html","./style.css","./config.js","./accounting.js","./layout.js","./views.js","./modules.js","./loans.js","./water.js","./ui.js","./payroll.js","./reports.js","./closing.js","./users.js","./releases.js","./modals.js","./rates.js","./flow.js","./savings.js","./share.js","./sod.js","./keyboard.js","./permissions.js","./pwa.js","./app.js","./manifest.json","./icon.svg","./icon-192.png","./icon-512.png","./icon-maskable-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("bumdes-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==self.location.origin)return;
 const page=r.mode==="navigate"||/\.(html|js|css|json)$/.test(new URL(r.url).pathname);
 e.respondWith(page?fetch(r).then(x=>{const c=x.clone();caches.open(CACHE).then(k=>k.put(r,c));return x}).catch(()=>caches.match(r).then(m=>m||caches.match("./index.html")))
  :caches.match(r).then(m=>m||fetch(r).then(x=>{const c=x.clone();caches.open(CACHE).then(k=>k.put(r,c));return x})))});
