// ===== MASUK GABUNGAN + SESI TERSIMPAN + PORTAL NASABAH SERVER (v1.1.079) =====
// Satu halaman masuk (#masuk): isian berbentuk email = akun pengurus/developer (Supabase Auth), berbentuk nomor HP = nasabah (PIN, fungsi server nsb_*).
// Setelah cocok, pengguna diarahkan menurut peran: developer -> konsol #developer, admin/pengurus/pembaca -> aplikasi, nasabah -> portal.
// Sesi disimpan di perangkat (localStorage): selama belum Keluar, aplikasi tetap terbuka walau offline. Ini pintu masuk, BUKAN enkripsi data lokal.
// Sesi nasabah disimpan di kunci terpisah (NSB_KEY) bersama salinan datanya sendiri, supaya bisa dilihat offline.
const ENT_KOSONG="Akun ini belum terdaftar di BUMDes mana pun. Minta admin BUMDes menambahkan email Anda, atau buat BUMDes baru bila diizinkan";
const ENT_KEY="bumdes_ent_v1",NSB_KEY="bumdes_nsb_v1";
const entGet=()=>{try{return JSON.parse(localStorage.getItem(ENT_KEY)||"{}")||{}}catch(e){return{}}};
const entPut=o=>{try{localStorage.setItem(ENT_KEY,JSON.stringify(Object.assign(entGet(),o)))}catch(e){}};
const nsbGet=()=>{try{return JSON.parse(localStorage.getItem(NSB_KEY)||"null")}catch(e){return null}};
const nsbPut=o=>{try{if(o)localStorage.setItem(NSB_KEY,JSON.stringify(o));else if(typeof localStorage.removeItem==="function")localStorage.removeItem(NSB_KEY);else localStorage.setItem(NSB_KEY,"null")}catch(e){}};
const entOn=()=>{const c=cloudCfg();return!!(c.url&&c.key)};
// "kosong" = perangkat baru yang masih berisi data contoh bawaan dan belum disentuh: sidik jari jumlah koleksi dicatat saat data awal dibuat (reset)
// dan dibandingkan lagi di sini. Perangkat lama (tanpa catatan) dianggap berisi data dan tidak ditimpa.
const entFp=()=>["transactions","parties","loans","loan_installments","journal_entries","journal_lines","savings_accounts","savings_tx","audit_logs","users","business_units","accounts"].map(k=>(db&&db[k]||[]).length).join(",");
const entSeed=()=>{try{localStorage.setItem(KEY+"_seed",entFp())}catch(e){}};
const entBlank=()=>{try{const f=localStorage.getItem(KEY+"_seed");return!!f&&f===entFp()}catch(e){return false}};
const entPub=()=>{const c=cloudCfg();return!!(c.token&&c.bumdes_id&&(c.role==="admin"||c.role==="pengurus"))};
// pembaca di awan: aplikasi hanya melihat (server juga menolak tulis)
const cloudRO=()=>{const c=cloudCfg();return!!(c.token&&c.bumdes_id&&c.role==="pembaca")};
// perlu masuk? hanya bila koneksi awan terpasang dan perangkat belum punya sesi (pengurus, nasabah, atau mode lokal perangkat lama)
// wajib masuk berlaku bila koneksi tertanam di config.js (pemasangan resmi); koneksi manual dari Setelan tidak memaksa (penanda wajib=1 untuk uji)
// peramban otomatis (navigator.webdriver, mis. uji Playwright) tidak dipaksa masuk kecuali uji menyalakan globalThis.__ENT_TEST
function entNeed(){try{if(typeof navigator!=="undefined"&&navigator.webdriver&&!globalThis.__ENT_TEST)return false}catch(e){}if(!entOn()||!(cloudFixed()||entGet().wajib))return false;if(S.pt)return false;if(cloudCfg().token)return false;if(nsbGet())return false;if(entGet().lokal)return false;return true}
// tautan "pakai data lokal" hanya untuk perangkat lama: ada data, belum pernah masuk akun
const entLocalOk=()=>entOn()&&!entBlank()&&!entGet().seen&&!cloudCfg().email;
function entLocal(){entPut({lokal:1,seen:1});S.lgmand=0;lgClose();S.msg="Memakai data lokal perangkat ini. Masuk akun awan dari Setelan > Awan kapan saja";render()}
function entInit(){if(entInit.d)return;entInit.d=1;try{const n=nsbGet();if(n&&n.data&&n.data.party&&n.data.party._id&&!cloudCfg().token&&!S.pt){S.pt={pid:n.data.party._id,tab:"home",sel:null,prev:false,srv:1,at:Date.now()};S.ptl=0}}catch(e){}}
// ----- masuk -----
function entLogin(){const em=$("#ln-em"),pw=$("#ln-pw"),v=((em&&em.value)||"").trim();S.lgem=v;
 try{if(!v)throw fe("ln-em","Isi email (pengurus) atau nomor HP (nasabah)");
  if(v.indexOf("@")>=0)return cloudLogin("ln");
  if(!/^[\d+\s().-]+$/.test(v)||ptKey(v).length<8)throw fe("ln-em","Isi email yang valid, atau nomor HP nasabah");
  return nsbEntry(ptKey(v),(pw&&pw.value)||"")}
 catch(e){S.msg=S.clm="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null;render()}}
async function nsbLoginReq(hp,pin){let j;try{j=await cloudReq("/rest/v1/rpc/nsb_login",{method:"POST",body:{p_hp:hp,p_pin:pin},auth:false,timeout:15000})}catch(e){e.net=/terhubung/.test(e.message);throw e}
 if(!j||!j.ok||!(j.sessions||[]).length){const er=Error(j&&j.err==="terkunci"?"Akun terkunci sementara karena PIN salah berulang. Coba lagi nanti atau hubungi pengurus":"Nomor HP atau PIN salah");er.locked=!!(j&&j.err==="terkunci");er.wrong=!er.locked;throw er}
 return j.sessions}
async function nsbEntry(hp,pin){try{if(!pin)throw fe("ln-pw","PIN wajib diisi");S.clb=1;render();
  let L;try{L=await nsbLoginReq(hp,pin)}catch(e){
   if((e.net||e.wrong)&&typeof ptOn==="function"&&ptOn()&&ptFind(hp)){try{const p=ptLogin(hp,pin);S.pt={pid:p._id,tab:"home",sel:null,prev:false,at:Date.now()};S.ptl=0;S.clb=0;S.msg=S.clm="";lgClose();render();return}catch(e2){throw e.net?e2:e}}
   throw e}
  if(L.length>1){S.lgpick={k:"nsb",L};S.clb=0;S.msg=S.clm="";render();return}
  await nsbEnter(L[0])}
 catch(e){S.msg=S.clm="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}S.clb=0;render()}
async function nsbEnter(s){nsbPut({token:s.token,bumdes:s.bumdes,nama:s.nama,data:null,at:""});const ok=await nsbSync(true);
 const n=nsbGet();if(!ok||!n||!n.data||!n.data.party){const r=nsbSyncMsg||"";nsbPut(null);try{await cloudReq("/rest/v1/rpc/nsb_logout",{method:"POST",body:{p_token:s.token},auth:false,timeout:15000})}catch(e){}throw Error(r||"Data Anda belum diterbitkan oleh pengurus. Coba lagi nanti atau hubungi pengurus")}
 entPut({seen:1});S.lgpick=null;S.pt={pid:n.data.party._id,tab:"home",sel:null,prev:false,srv:1,at:Date.now()};S.ptl=0;S.pte="";S.lgmand=0;lgClose();try{if(location.hash)history.replaceState(null,"",location.pathname+location.search)}catch(e){}S.msg=S.clm="";render()}
let nsbSyncMsg="";
// ambil data terbaru dari server; offline = tetap pakai salinan di perangkat
async function nsbSync(silent){const n=nsbGet();if(!n||!n.token)return false;nsbSyncMsg="";
 try{const j=await cloudReq("/rest/v1/rpc/nsb_data",{method:"POST",body:{p_token:n.token},auth:false,timeout:15000});
  if(!j||!j.ok){if(j&&j.err==="sesi"){nsbSyncMsg="Sesi berakhir. Masuk lagi";if(!silent&&S.pt&&S.pt.srv){nsbPut(null);S.pt=null;S.ptl=0;S.msg="Sesi berakhir. Masuk lagi";render()}}return false}
  nsbPut({token:n.token,bumdes:j.bumdes,nama:j.nama,data:j.data&&j.data.party?j.data:null,at:j.at||now()});if(S.pt)S.pt.off=0;if(!silent&&S.pt)render();return true}
 catch(e){if(S.pt)S.pt.off=1;nsbSyncMsg=e.message;return false}}
async function nsbLogoutDo(){const n=nsbGet();nsbPut(null);S.pt=null;S.ptl=0;S.pte="";if(n&&n.token){try{await cloudReq("/rest/v1/rpc/nsb_logout",{method:"POST",body:{p_token:n.token},auth:false,timeout:15000})}catch(e){}}render()}
async function nsbChgPin(){try{const v=i=>$("#"+i).value;const n=nsbGet();if(!n)throw Error("Sesi tidak valid");pinChk(v("pc-n"),"pc-n");if(v("pc-n")===v("pc-o"))throw fe("pc-n","PIN baru harus berbeda");if(v("pc-n")!==v("pc-r"))throw fe("pc-r","Ulangi PIN tidak sama");
  const j=await cloudReq("/rest/v1/rpc/nsb_change_pin",{method:"POST",body:{p_token:n.token,p_old:v("pc-o"),p_new:v("pc-n")},auth:false,timeout:15000});
  if(!j||!j.ok){const E={pin_lama:["pc-o","PIN lama salah"],pin_baru:["pc-n","PIN baru terlalu mudah ditebak"],pin_sama:["pc-n","PIN baru harus berbeda"],terkunci:[null,"Akun terkunci sementara. Coba lagi nanti"],sesi:[null,"Sesi berakhir. Masuk lagi"]}[j&&j.err]||[null,"PIN gagal diganti"];throw E[0]?fe(E[0],E[1]):Error(E[1])}
  S.msg="PIN berhasil diganti"}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
// tampilan portal dari data server: db sementara berisi HANYA data nasabah itu; db asli tidak disentuh
function nsbDb(d){const h=blank();h.bumdes=[{name:d.bumdes||"BUMDes"}];h.parties=[Object.assign({type:"nasabah"},d.party)];h.loans=d.loans||[];h.loan_installments=d.ins||[];h.savings_accounts=d.sav||[];h.savings_tx=d.stx||[];h.rate_master=d.rates||[];h.settings=Object.assign(h.settings||{},d.settings||{});return h}
function nsbWrap(f){if(!S.pt||!S.pt.srv)return f();const n=nsbGet();if(!n||!n.data||!n.data.party)return f();const bk=db;db=nsbDb(Object.assign({bumdes:n.bumdes},n.data));try{return f()}finally{db=bk}}
function nsbInfo(){if(!S.pt||!S.pt.srv)return"";const n=nsbGet()||{},t=String(n.at||"").replace("T"," ").slice(0,16);return`<small>${S.pt.off?"Offline · ":""}Data per ${esc(tglS(t.slice(0,10)))} ${esc(t.slice(11))}</small>`}
// ----- arah per peran setelah masuk akun awan -----
async function entRoute(L){try{await devChk()}catch(e){}const c=cloudCfg();S.lgpick=null;S.lgmand=0;
 if(c.dev){lgClose();S.dvo=1;S.dvt="ringkas";S.dvc=null;try{history.replaceState(null,"","#developer")}catch(e){}if(!S.dvl)devLoad(true);return"dev"}
 try{if(location.hash==="#developer"||location.hash==="#portal")history.replaceState(null,"",location.pathname+location.search)}catch(e){}
 if(!L.length){lgClose();S.tab="set";S.su="aw";S.msg=S.clm=ENT_KOSONG;return"kosong"}
 if(L.length>1){S.lgpick={k:"stf",L};S.lgmand=1;return"pilih"}
 return entFinish(L[0].id)}
async function entFinish(id){if(cloudCfg().bumdes_id!==id){const b=(S.cll||[]).find(x=>x.id===id);if(b)cloudPick(b.id)}
 const r=await entAutoLoad();lgClose();S.lgpick=null;S.lgmand=0;S.tab="dash";S.doc=null;return r||"app"}
async function entAutoLoad(){const c=cloudCfg();if(!c.bumdes_id)return"";
 try{const s=await cloudFetchSnap();if(s&&entBlank()&&s.data&&typeof s.data==="object"){cloudApply(s);S.msg=S.clm="Data BUMDes dimuat dari awan (versi "+s.version+")";return"muat"}}catch(e){}return""}
async function entPickB(i){const p=S.lgpick;if(!p)return;S.clb=1;render();try{if(p.k==="nsb")await nsbEnter(p.L[i]);else await entFinish(p.L[i].id)}catch(e){S.msg=S.clm="⚠ "+e.message}S.clb=0;render()}
function entPickBack(){S.lgpick=null;if(cloudCfg().token)cloudLogout();else render()}
// ----- penerbitan data portal oleh pengurus -----
const nsbPick=(o,ks)=>{const r={};ks.forEach(k=>{if(o[k]!==undefined)r[k]=o[k]});return r};
const nsbFnv=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return(h>>>0).toString(36)+":"+s.length};
function nsbProj(p){const pid=p._id,L=ptLoans(pid),ids=new Set(L.map(l=>l._id)),sv=ptSav(pid),sid=new Set(sv.map(a=>a._id)),pc=db.settings&&db.settings.penalty_code;
 return{v:1,party:nsbPick(p,["_id","name","phone","address"]),
  loans:L.map(l=>nsbPick(l,["_id","loan_number","party_id","status","principal","interest_rate","interest_method","tenor","disbursement_date","calc"])),
  ins:db.loan_installments.filter(i=>ids.has(i.loan_id)),
  sav:sv.map(a=>nsbPick(a,["_id","party_id","number","product","status","opened_at","maturity","prod"])),
  stx:(db.savings_tx||[]).filter(x=>sid.has(x.account_id)&&x.status==="posted").map(x=>nsbPick(x,["_id","account_id","type","date","amount","status"])),
  rates:(db.rate_master||[]).filter(r=>pc&&r.fee_code===pc),settings:{penalty_code:pc||"",penalty_pct_day:(db.settings||{}).penalty_pct_day}}}
const nsbPubOK=()=>!!(entOn()&&entPub()&&db.settings&&db.settings.portal);
async function nsbPublish(o){o=o||{};const c=cloudCfg();
 try{if(!(entOn()&&entPub()))throw Error("Masuk akun awan sebagai admin atau pengurus dulu");if(!o.purge&&!(db.settings&&db.settings.portal))throw Error("Aktifkan portal nasabah dulu");if(S.nsbpb)return;
  const P=o.purge?[]:db.parties.filter(p=>p.type==="nasabah"&&p.status!=="nonaktif"&&p.portal&&p.portal.srv&&ptKey(p.phone).length>=8);
  if(S.nsbB!==c.bumdes_id){S.nsbB=c.bumdes_id;S.nsbh={};S.nsbk=""}S.nsbh=S.nsbh||{};
  const keep=P.map(p=>p._id),ks=keep.join(","),items=[],hs={};
  P.forEach(p=>{const d=nsbProj(p),h=nsbFnv(JSON.stringify(d));if(o.force||S.nsbh[p._id]!==h){items.push({party_id:p._id,hp:ptKey(p.phone),nama:p.name,data:d});hs[p._id]=h}});
  if(!items.length&&S.nsbk===ks&&!o.force&&!o.purge){return}
  S.nsbpb=1;if(!o.silent){S.clb=1;render()}
  const r=await cloudReq("/rest/v1/rpc/nsb_publish",{method:"POST",body:{p_bumdes:c.bumdes_id,p_items:items,p_keep:keep}});
  Object.assign(S.nsbh,hs);S.nsbk=ks;S.nsbr={at:now(),n:+r.diterbitkan||0,akun:+r.akun||0};S.nsbe="";if(!o.silent)S.msg="Data portal diterbitkan: "+S.nsbr.n+" nasabah diperbarui, "+S.nsbr.akun+" akun aktif di server"}
 catch(e){S.nsbe=e.message;if(!o.silent)S.msg="⚠ "+e.message}
 S.nsbpb=0;if(!o.silent){S.clb=0;render()}}
function nsbPubNow(){nsbPublish({force:true})}
async function nsbSetPin(p,pin){const c=cloudCfg();if(!entOn()||!entPub())return"lokal";
 await cloudReq("/rest/v1/rpc/nsb_set_pin",{method:"POST",body:{p_bumdes:c.bumdes_id,p_party:p._id,p_hp:ptKey(p.phone),p_nama:p.name,p_pin:pin}});
 p.portal.srv=now();save();await nsbPublish({silent:true});return"server"}
// mulai: perbarui data portal nasabah saat online lagi dan saat aplikasi dibuka
(function(){if(typeof window==="undefined"||!window.addEventListener)return;
 const go=()=>{if(nsbGet())nsbSync(true).then(()=>{if(S.pt&&S.pt.srv&&!S.lgn)render()});if(nsbPubOK())nsbPublish({silent:true})};
 window.addEventListener("online",go);if(typeof document!=="undefined"&&document.addEventListener)document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")go()});
 if(typeof setTimeout==="function")setTimeout(go,2500)})();
