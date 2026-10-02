// ===== SINKRON AWAN SUPABASE (v1.1.042, Tahap 1): login pengurus, simpan/muat snapshot, kunci versi =====
// Server: jalankan supabase_schema.sql di Supabase (tabel bumdes, bumdes_members, bumdes_snapshots + fungsi create_bumdes/save_snapshot).
// Hanya "anon key" yang dipakai. Pengaturan dan token disimpan di localStorage terpisah (CL_KEY), TIDAK masuk db/backup/export.
// Kata sandi tidak pernah disimpan. Data tetap utama di perangkat (localStorage); awan = cadangan dan sinkron bergilir.
const CL_KEY="bumdes_cloud_v1",CL_DELAY=8000;
const cloudCfg=()=>{try{return JSON.parse(localStorage.getItem(CL_KEY)||"{}")||{}}catch(e){return{}}};
const cloudSet=o=>{try{localStorage.setItem(CL_KEY,JSON.stringify(Object.assign(cloudCfg(),o)))}catch(e){}};
const cloudDel=ks=>{try{const c=cloudCfg();ks.forEach(k=>delete c[k]);localStorage.setItem(CL_KEY,JSON.stringify(c))}catch(e){}};
const cloudUrl=u=>{u=String(u||"").trim().replace(/\/+$/,"");if(!/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}(:\d+)?$/i.test(u))return"";return u};
const cloudRole=k=>{try{const b=String(k).split(".")[1]||"";return JSON.parse(atob(b.replace(/-/g,"+").replace(/_/g,"/"))).role||""}catch(e){return""}};
const cloudSecret=k=>/^sb_secret_/.test(String(k||"").trim());
const cloudKeyOk=k=>/^[A-Za-z0-9._-]{20,}$/.test(String(k||"").trim());
function cloudMsg(raw,st){raw=String(raw||"");
 if(/^version_conflict/.test(raw))return"Data di awan sudah berubah";
 const M=[[/Invalid login credentials/i,"Email atau kata sandi salah"],[/Email not confirmed/i,"Email belum dikonfirmasi. Buka email konfirmasi dari Supabase, atau konfirmasi pengguna di dashboard Supabase"],[/tidak_berhak/,"Anda tidak punya hak untuk tindakan ini (peran pembaca hanya boleh melihat)"],[/harus_login/,"Sesi berakhir. Masuk lagi"],[/JWT expired|invalid JWT|token is expired/i,"Sesi berakhir. Masuk lagi"],[/Invalid API key|No API key/i,"Anon key salah. Salin ulang dari Supabase > Project Settings > API"],[/relation .* does not exist|Could not find the (table|function)/i,"Tabel belum dibuat. Jalankan supabase_schema.sql di Supabase > SQL Editor"],[/nama_wajib/,"Nama BUMDes wajib diisi"],[/data_terlalu_besar/,"Data terlalu besar untuk disimpan ke awan"],[/rate limit|too many/i,"Terlalu sering mencoba. Tunggu sebentar"],[/User already registered/i,"Email sudah terdaftar"]];
 for(const[r,t]of M)if(r.test(raw))return t;return raw||("Galat server ("+(st||"?")+")")}
async function cloudReq(path,o={}){const c=cloudCfg();if(!c.url||!c.key)throw Error("Isi alamat proyek dan anon key dulu");
 const h={apikey:c.key,"Content-Type":"application/json"};
 if(o.auth===false){if(c.key.split(".").length===3)h.Authorization="Bearer "+c.key}else{if(!c.token)throw Error("Belum masuk. Masuk dengan email pengurus dulu");await cloudFresh();h.Authorization="Bearer "+cloudCfg().token}
 let r;try{r=await fetch(c.url+path,{method:o.method||"GET",headers:h,body:o.body===undefined?undefined:JSON.stringify(o.body)})}catch(e){throw Error("Tidak dapat terhubung ke Supabase. Periksa internet dan alamat proyek")}
 const t=await r.text();let j=null;try{j=t?JSON.parse(t):null}catch(e){}
 if(!r.ok){const raw=(j&&(j.message||j.msg||j.error_description||j.error))||"";const er=Error(cloudMsg(raw,r.status));er.raw=String(raw);er.status=r.status;throw er}
 return j}
async function cloudFresh(){const c=cloudCfg();if(!c.token||!c.exp||c.exp-Date.now()>60000)return;
 if(!c.refresh){cloudDel(["token","refresh","exp"]);throw Error("Sesi berakhir. Masuk lagi")}
 let r;try{r=await fetch(c.url+"/auth/v1/token?grant_type=refresh_token",{method:"POST",headers:{apikey:c.key,"Content-Type":"application/json"},body:JSON.stringify({refresh_token:c.refresh})})}catch(e){throw Error("Tidak dapat terhubung ke Supabase. Periksa internet")}
 const j=await r.json().catch(()=>null);if(!r.ok||!j||!j.access_token){cloudDel(["token","refresh","exp"]);throw Error("Sesi berakhir. Masuk lagi")}
 cloudSet({token:j.access_token,refresh:j.refresh_token||c.refresh,exp:Date.now()+(+j.expires_in||3600)*1000})}
// ----- pengaturan koneksi, akun -----
function cloudSave(){try{const u=cloudUrl($("#cl-url").value),k=String($("#cl-key").value||"").trim();if(!u)throw fe("cl-url","Alamat proyek harus berbentuk https://xxxx.supabase.co");if(!cloudKeyOk(k))throw fe("cl-key","Anon key tidak valid (salin dari Project Settings > API > anon public)");
 if(cloudSecret(k)||cloudRole(k)==="service_role")throw fe("cl-key","Ini service_role key. JANGAN dipakai di aplikasi. Pakai anon key");
 const c=cloudCfg();if(c.url&&c.url!==u)cloudDel(["token","refresh","exp","email","bumdes_id","bumdes_name","role","ver"]);cloudSet({url:u,key:k});S.msg="Koneksi disimpan";S.fe=null}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
async function cloudLogin(){const em=($("#cl-em").value||"").trim(),pw=$("#cl-pw").value||"";
 try{if(!em||!/^\S+@\S+\.\S+$/.test(em))throw fe("cl-em","Isi email yang valid");if(!pw)throw fe("cl-pw","Kata sandi wajib diisi");S.clb=1;render();
  const j=await cloudReq("/auth/v1/token?grant_type=password",{method:"POST",body:{email:em,password:pw},auth:false});
  cloudSet({token:j.access_token,refresh:j.refresh_token,exp:Date.now()+(+j.expires_in||3600)*1000,email:(j.user&&j.user.email)||em});$("#cl-pw").value="";
  S.cll=await cloudList();const L=S.cll;if(L.length===1)cloudPick(L[0].id);S.msg="Masuk sebagai "+((j.user&&j.user.email)||em)}
 catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}S.clb=0;render()}
async function cloudLogout(){try{await cloudReq("/auth/v1/logout",{method:"POST"})}catch(e){}cloudDel(["token","refresh","exp","email","bumdes_id","bumdes_name","role","ver","last","remote","paused"]);S.cll=null;S.msg="Keluar dari akun awan";render()}
async function cloudList(){const j=await cloudReq("/rest/v1/bumdes_members?select=role,bumdes(id,name)");return(j||[]).filter(x=>x.bumdes).map(x=>({id:x.bumdes.id,name:x.bumdes.name,role:x.role}))}
async function cloudRefreshList(){try{S.clb=1;render();S.cll=await cloudList();S.msg=S.cll.length?"Daftar BUMDes diperbarui":"Belum ada BUMDes di akun ini. Buat baru atau minta admin menambahkan email Anda"}catch(e){S.msg="⚠ "+e.message}S.clb=0;render()}
function cloudPick(id){const b=(S.cll||[]).find(x=>x.id===id);if(!b){S.msg="⚠ Pilih BUMDes dulu";render();return}cloudSet({bumdes_id:b.id,bumdes_name:b.name,role:b.role,ver:0,last:"",remote:0,paused:0});S.msg="BUMDes awan dipilih: "+b.name+". Langkah berikut: Simpan ke awan (bila awan masih kosong) atau Muat dari awan";render()}
function cloudPickSel(){cloudPick($("#cl-b").value)}
async function cloudCreate(){const nm=($("#cl-nb").value||"").trim()||bnm();try{S.clb=1;render();const id=await cloudReq("/rest/v1/rpc/create_bumdes",{method:"POST",body:{p_name:nm}});S.cll=await cloudList();cloudPick(id);S.msg="BUMDes awan dibuat: "+nm+". Langkah berikut: Simpan ke awan"}catch(e){S.msg="⚠ "+e.message}S.clb=0;render()}
// ----- simpan dan muat -----
function cloudPush(silent,force){return cloudPushI(silent,force)}
async function cloudPushI(silent,force){const c=cloudCfg();
 try{if(!c.bumdes_id)throw Error("Pilih BUMDes awan dulu");if(c.role==="pembaca")throw Error("Peran Anda pembaca: hanya boleh memuat dari awan");if(S.clpb)return;S.clpb=1;if(!silent){S.clb=1;render()}
  const body={p_bumdes:c.bumdes_id,p_expected:force&&c.remote!=null?+c.remote:+c.ver||0,p_data:db,p_app_ver:APP_VER};
  const v=await cloudReq("/rest/v1/rpc/save_snapshot",{method:"POST",body});
  cloudSet({ver:+v,last:now(),remote:0,paused:0});if(!silent)S.msg="Tersimpan ke awan (versi "+v+")"}
 catch(e){const m=/^version_conflict:(\d+)/.exec(e.raw||"");if(m){cloudSet({remote:+m[1],paused:1});S.msg="⚠ Data di awan sudah berubah (versi "+m[1]+"; versi Anda "+(+cloudCfg().ver||0)+"). Muat dari awan dulu, atau timpa awan bila data di perangkat ini yang benar"}else if(!silent||!/terhubung/.test(e.message))S.msg="⚠ "+e.message}
 S.clpb=0;S.clb=0;render()}
async function cloudFetchSnap(){const c=cloudCfg();if(!c.bumdes_id)throw Error("Pilih BUMDes awan dulu");const j=await cloudReq("/rest/v1/bumdes_snapshots?bumdes_id=eq."+encodeURIComponent(c.bumdes_id)+"&select=version,data,updated_at,app_ver");if(!j||!j.length)throw Error("Belum ada data di awan. Pakai Simpan ke awan dulu");return j[0]}
async function cloudPullAsk(){try{S.clb=1;render();const s=await cloudFetchSnap();S.clsnap=s;S.clb=0;askC("cloudPull","")}catch(e){S.clb=0;S.msg="⚠ "+e.message;render()}}
function cloudApply(s){const j=s&&s.data;if(!j||typeof j!=="object")throw Error("Data awan tidak valid");chk(j);
 try{localStorage.setItem(KEY+"_prev",JSON.stringify(db))}catch(e){}
 S.clpl=1;db=j;migr();save();S.clpl=0;cloudSet({ver:+s.version,last:now(),remote:0,paused:0});return +s.version}
function cloudPull(){try{const s=S.clsnap;if(!s)throw Error("Ambil data awan dulu");const v=cloudApply(s);S.clsnap=null;S.msg="Data dimuat dari awan (versi "+v+"). Salinan data lama perangkat disimpan sebagai cadangan lokal"}catch(e){S.clpl=0;S.msg="⚠ Muat gagal: "+e.message}render()}
function cloudForce(){cloudPush(false,true)}
function cloudAuto(){if(S.clpl)return;const c=cloudCfg();if(!c.auto||!c.token||!c.bumdes_id||c.role==="pembaca"||c.paused)return;if(typeof setTimeout!=="function")return;clearTimeout(cloudAuto.t);cloudAuto.t=setTimeout(()=>cloudPushI(true),CL_DELAY)}
function cloudAutoSet(v){cloudSet({auto:v==="1",paused:0});S.msg="Simpan otomatis "+(v==="1"?"diaktifkan: perubahan dikirim ke awan beberapa detik setelah disimpan":"dimatikan");if(v==="1")cloudAuto();render()}
function cloudReset(){cloudDel(["url","key","token","refresh","exp","email","bumdes_id","bumdes_name","role","ver","last","remote","paused","auto"]);S.cll=null;S.msg="Pengaturan awan dihapus dari perangkat ini";render()}
// ----- tampilan -----
function vCloudSet(){const c=cloudCfg(),on=!!c.token,sel=!!c.bumdes_id,L=S.cll||[],busy=S.clb?" disabled":"";
 const st=sel?`<div class="card"><div class="kvg"><div class="kv"><span class="k">BUMDes awan</span><b>${esc(c.bumdes_name||"")}</b></div><div class="kv"><span class="k">Peran</span><b>${esc(c.role||"")}</b></div><div class="kv"><span class="k">Versi terakhir disinkron</span><b>${+c.ver||0}</b></div><div class="kv"><span class="k">Terakhir sinkron</span><b>${c.last?esc(String(c.last).replace("T"," ").slice(0,16)):"belum"}</b></div></div>${c.paused?`<p><span class="bdg bd">Dijeda</span> Data di awan berubah (versi ${+c.remote||"?"}). Simpan otomatis berhenti sampai Anda memuat dari awan atau menimpa awan.</p>`:""}<div class="fl"><button class="b"${busy} onclick="cloudPush()">Simpan ke awan</button><button class="b s"${busy} onclick="cloudPullAsk()">Muat dari awan</button>${c.paused?`<button class="b s"${busy} onclick="askC('cloudForce','')">Timpa awan</button>`:""}</div>${fld("cl-auto","Simpan otomatis ke awan",{t:"select",a:' onchange="cloudAutoSet(this.value)"',opts:opt([["0","Mati"],["1","Aktif"]],x=>x,c.auto?"1":"0")})}</div>`:"";
 return`<h2>Awan (Supabase)</h2><div class="card"><div class="k">Cadangan dan sinkron data ke Supabase milik Anda. Data utama tetap di perangkat ini; awan menyimpan salinan terbaru dan 30 riwayat. Buat proyek di supabase.com, jalankan <b>supabase_schema.sql</b> di SQL Editor, lalu isi di bawah. Pakai <b>anon key</b> saja, bukan service_role. Pengaturan ini tidak ikut di Export JSON.</div></div>
<h3>1. Koneksi</h3><div class="card">${fld("cl-url","Alamat proyek",{value:c.url||"",a:' autocomplete="off" inputmode="url" placeholder="https://xxxx.supabase.co"'})}${fld("cl-key","Anon key",{value:c.key||"",a:' autocomplete="off" spellcheck="false"'})}<div class="fl"><button class="b"${busy} onclick="cloudSave()">Simpan koneksi</button>${c.url?`<button class="b s" onclick="askC('cloudReset','')">Hapus pengaturan</button>`:""}</div></div>
${c.url&&c.key?`<h3>2. Akun pengurus</h3><div class="card">${on?`<p>Masuk sebagai <b>${esc(c.email||"")}</b></p><div class="fl"><button class="b s"${busy} onclick="cloudLogout()">Keluar</button></div>`:`<div class="k">Akun dibuat di Supabase > Authentication > Users (Add user). Kata sandi tidak disimpan di perangkat.</div>${fld("cl-em","Email",{type:"email",a:' autocomplete="username"',value:c.email||""})}${fld("cl-pw","Kata sandi",{type:"password",a:' autocomplete="current-password"',value:""})}<div class="fl"><button class="b"${busy} onclick="cloudLogin()">Masuk</button></div>`}</div>`:""}
${on?`<h3>3. BUMDes di awan</h3><div class="card">${L.length?fld("cl-b","Pilih BUMDes",{t:"select",opts:opt(L,b=>[b.id,b.name+" · "+b.role],c.bumdes_id||"")})+`<div class="fl"><button class="b"${busy} onclick="cloudPickSel()">Pakai BUMDes ini</button><button class="b s"${busy} onclick="cloudRefreshList()">Muat ulang daftar</button></div>`:`<div class="fl"><button class="b s"${busy} onclick="cloudRefreshList()">Muat daftar BUMDes</button></div>`}${fld("cl-nb","Atau buat BUMDes baru di awan",{value:bnm()})}<div class="fl"><button class="b s"${busy} onclick="cloudCreate()">Buat di awan</button></div></div>`:""}
${on&&sel?`<h3>4. Sinkron</h3>${st}`:""}`}
