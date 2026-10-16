// ===== SALINAN OTOMATIS DI PERANGKAT (v1.1.242, K2) =====
// Salinan berkala disimpan di IndexedDB (kuota jauh lebih besar dari localStorage), 5 terbaru. Melindungi dari salah impor/kosongkan dan data rusak;
// TIDAK menggantikan Ekspor JSON atau cadangan awan, karena ikut hilang bila data situs dibersihkan.
const ABK_DB="bumdes_auto_bk",ABK_KEEP=5;
const abkReq=r=>new Promise((ok,no)=>{r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)});
const abkIdb=()=>new Promise((ok,no)=>{try{const r=indexedDB.open(ABK_DB,1);r.onupgradeneeded=()=>r.result.createObjectStore("s",{keyPath:"id"});r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)}catch(e){no(e)}});
const abkOn=()=>typeof indexedDB!=="undefined"&&!!indexedDB;
async function abkList(){const d=await abkIdb();try{const a=await abkReq(d.transaction("s").objectStore("s").getAll());return a.sort((x,y)=>x.id<y.id?1:-1)}finally{d.close()}}
async function abkGet(id){const d=await abkIdb();try{return await abkReq(d.transaction("s").objectStore("s").get(id))}finally{d.close()}}
async function abkSnap(force){if(!abkOn()||!db||!db.transactions)return;
 if(!force&&!db.transactions.length)return;
 const L=await abkList(),last=L[0];
 if(!force&&last&&Date.now()-new Date(last.id).getTime()<(bkDays()||7)*864e5){S.abk=L;return}
 const j=JSON.stringify(db),d=await abkIdb();
 try{const tx=d.transaction("s","readwrite"),st=tx.objectStore("s");st.put({id:now(),n:db.transactions.length,l:(db.loans||[]).length,sz:j.length,j});L.slice(ABK_KEEP-1).forEach(x=>st.delete(x.id));
  await new Promise(ok=>{tx.oncomplete=ok;tx.onerror=ok;tx.onabort=ok})}finally{d.close()}
 S.abk=await abkList()}
let ABK_BUSY=0;
function abkTick(force){if(ABK_BUSY||!abkOn())return Promise.resolve();ABK_BUSY=1;return abkSnap(force).catch(()=>{S.abkErr=1}).then(()=>{ABK_BUSY=0;if(force||S.tab==="dat")render()})}
function abkNow(){try{dataP();if(typeof needP==="function"&&rbacOn()&&curUser())needP("data.backup","Hanya peran dengan izin Ekspor backup yang dapat menyimpan salinan")}catch(e){S.msg=ER(e);render();return}abkTick(true).then(()=>{S.msg="Salinan otomatis disimpan di perangkat ini";render()})}
async function abkAsk(id){try{dataP();const r=await abkGet(id);if(!r)throw Error("Salinan tidak ditemukan");const j=JSON.parse(r.j);chk(j);S.imp=j;S.bkn="";askC("imp","")}catch(e){S.imp=null;S.msg="⚠ Pulihkan gagal: "+e.message;render()}}
async function abkDl(id){try{const r=await abkGet(id);if(!r)throw Error("Salinan tidak ditemukan");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([r.j],{type:"application/json"}));a.download="bumdes-salinan-otomatis-"+String(r.id).slice(0,10)+".json";a.click()}catch(e){S.msg="⚠ Unduh gagal: "+e.message;render()}}
function abkCard(){if(!abkOn())return"";
 if(!S.abk&&!S.abkErr&&!ABK_BUSY){abkList().then(L=>{S.abk=L;render()}).catch(()=>{S.abkErr=1;render()})}
 const L=S.abk||[],ed=can("data.kelola"),
 rows=L.map(x=>`<div class="upr"><span class="upm"><b>${esc(wkt(x.id))}</b><small>${x.n} transaksi · ${x.l} pinjaman · ${Math.max(1,Math.round(x.sz/1024))} KB</small></span>${ed?`<button class="b s sm" onclick="abkAsk('${esc(x.id)}')" aria-label="Pulihkan salinan ${esc(wkt(x.id))}">Pulihkan</button>`:""}<button class="b s sm" onclick="abkDl('${esc(x.id)}')" aria-label="Unduh salinan ${esc(wkt(x.id))}">Unduh</button></div>`).join("");
 return dcard("Salinan otomatis di perangkat",S.abkErr?"Penyimpanan salinan tidak tersedia di browser ini.":"Salinan berkala ("+(bkDays()||7)+" hari sekali, maksimal "+ABK_KEEP+" terbaru) disimpan otomatis di perangkat ini. Melindungi dari salah impor atau kosongkan; tidak menggantikan Ekspor JSON atau cadangan awan karena ikut hilang bila data situs dibersihkan.",
  (L.length?`<div class="upl">${rows}</div>`:`<p class="k">${S.abk?"Belum ada salinan.":"Memuat…"}</p>`)+(S.abkErr?"":`<button class="b s bkp" onclick="abkNow()">Simpan salinan sekarang</button>`))}
if(typeof document!=="undefined"&&document.addEventListener)document.addEventListener("visibilitychange",()=>{if(!document.hidden&&typeof db!=="undefined"&&db)abkTick()});
