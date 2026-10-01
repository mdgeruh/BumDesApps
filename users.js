// ===== PENGGUNA, PERAN, LOGIN PIN (v0.1.028) — opsional, bawaan mati; kontrol prosedur (data di localStorage) =====
const PERMS=[["lihat","Melihat dashboard dan laporan"],["audit.lihat","Melihat audit log"],["trx.kelola","Transaksi, jurnal, dan saldo awal"],["sp.kelola","Simpan Pinjam (nasabah, pengajuan, pencairan, angsuran)"],["air.kelola","Unit Air (penjualan, tagihan, piutang)"],["gaji.kelola","Gaji (profil, penggajian, pembayaran)"],["gaji.setuju","Menyetujui gaji"],["master.kelola","Master data (unit, rekening, akun, pihak, pegawai)"],["periode.kelola","Tutup/buka periode dan tutup buku"],["setelan.kelola","Setelan BUMDes dan dokumen"],["data.backup","Export backup"],["data.kelola","Import dan reset data"],["pengguna.kelola","Kelola pengguna dan peran"]];
const ROLES0=[["ROL-DIR","Direktur","Menyetujui dan mengawasi",["lihat","audit.lihat","gaji.setuju","periode.kelola","data.backup"]],["ROL-BEN","Bendahara","Mengelola keuangan sehari-hari",["lihat","audit.lihat","trx.kelola","sp.kelola","air.kelola","gaji.kelola","master.kelola","data.backup"]],["ROL-PTU","Petugas Unit","Kasir, petugas air, petugas simpan pinjam",["lihat","trx.kelola","sp.kelola","air.kelola"]],["ROL-PGW","Pengawas","Hanya melihat",["lihat","audit.lihat"]],["ROL-ADM","Admin Sistem","Mengelola pengguna dan sistem",["lihat","audit.lihat","master.kelola","setelan.kelola","data.backup","data.kelola","pengguna.kelola"]]];
function seedRoles(d){if(!Array.isArray(d.roles))d.roles=[];if(!Array.isArray(d.users))d.users=[];if(!d.roles.length)ROLES0.forEach(([id,name,desc,perms])=>d.roles.push({_id:id,name,desc,perms:perms.slice(),system:true,status:"aktif"}))}
const MAXF=5,LOCKMS=5*60000,ER=e=>{S.fe=e&&e.f?{id:e.f,m:e.message}:null;return"⚠ "+(e&&e.message)},jam=iso=>{const d=new Date(iso);return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")};
const K256=(()=>{const k=[];for(let n=2;k.length<64;n++){let q=1;for(let i=2;i*i<=n;i++)if(n%i===0){q=0;break}if(q)k.push(Math.floor((Math.cbrt(n)%1)*4294967296))}return k})(),H256=[2,3,5,7,11,13,17,19].map(n=>Math.floor((Math.sqrt(n)%1)*4294967296));
function sha256(s){const u=unescape(encodeURIComponent(s)),l=u.length,n=(((l+8)>>6)+1)*16,m=new Array(n).fill(0),w=new Array(64),h=H256.slice();
 for(let i=0;i<l;i++)m[i>>2]|=u.charCodeAt(i)<<(24-(i%4)*8);m[l>>2]|=0x80<<(24-(l%4)*8);m[n-1]=l*8;
 for(let j=0;j<n;j+=16){for(let t=0;t<64;t++){if(t<16)w[t]=m[j+t];else{const a=w[t-15],b=w[t-2];w[t]=(w[t-16]+(((a>>>7)|(a<<25))^((a>>>18)|(a<<14))^(a>>>3))+w[t-7]+(((b>>>17)|(b<<15))^((b>>>19)|(b<<13))^(b>>>10)))|0}}
  let[a,b,c,d,e,f,g,x]=h;
  for(let t=0;t<64;t++){const T1=(x+(((e>>>6)|(e<<26))^((e>>>11)|(e<<21))^((e>>>25)|(e<<7)))+((e&f)^(~e&g))+K256[t]+w[t])|0,T2=((((a>>>2)|(a<<30))^((a>>>13)|(a<<19))^((a>>>22)|(a<<10)))+((a&b)^(a&c)^(b&c)))|0;x=g;g=f;f=e;e=(d+T1)|0;d=c;c=b;b=a;a=(T1+T2)|0}
  [a,b,c,d,e,f,g,x].forEach((v,i)=>{h[i]=(h[i]+v)|0})}
 return h.map(v=>(v>>>0).toString(16).padStart(8,"0")).join("")}
const pinHash=(p,salt)=>{let h=sha256(salt+":"+p);for(let i=0;i<2000;i++)h=sha256(h+salt+p);return h};
function newSalt(){try{const a=new Uint32Array(4);crypto.getRandomValues(a);return[...a].map(x=>x.toString(16)).join("")}catch(e){return Array.from({length:4},()=>Math.random().toString(16).slice(2,10)).join("")}}
function pinChk(p,f){if(!/^\d{4,8}$/.test(p))throw fe(f,"PIN harus 4–8 angka");if(/^(\d)\1+$/.test(p))throw fe(f,"PIN tidak boleh angka yang sama semua")}
function usDr(){Object.keys(S.dr||{}).forEach(k=>{if(k.indexOf("set|us-")===0||k.indexOf("set|rp-")===0)delete S.dr[k]});S.nsnap=1}
function ssG(){try{return sessionStorage.getItem("bumdes_sess")}catch(e){return null}}
function ssS(v){try{v?sessionStorage.setItem("bumdes_sess",v):sessionStorage.removeItem("bumdes_sess")}catch(e){}}
function sess(){S.cu=rbacOn()?(ssG()||null):null}
const rbacOn=()=>!!(db&&db.settings&&db.settings.rbac===true),roleOf=u=>u?(db.roles||[]).find(r=>r._id===u.role_id):null,isAdm=u=>!!(u&&u.status==="aktif"&&(roleOf(u)||{perms:[]}).perms.includes("pengguna.kelola")),lastAdm=u=>isAdm(u)&&!db.users.some(x=>x._id!==u._id&&isAdm(x)),isLocked=u=>!!u.locked_until&&Date.parse(u.locked_until)>Date.now();
function curUser(){if(!rbacOn())return null;return(db.users||[]).find(x=>x._id===S.cu&&x.status==="aktif")||null}
function can(p){if(!rbacOn())return true;const u=curUser(),r=roleOf(u);return!!(u&&r&&r.perms.includes(p))}
function needP(p,m){if(!can(p))throw Error(m||"Anda tidak berwenang untuk aksi ini")}
function dataP(){if(rbacOn()&&curUser())needP("data.kelola","Hanya Admin Sistem yang dapat mengimpor atau mereset data")}
const nid=(p,a)=>p+"-"+String(1+a.reduce((m,x)=>Math.max(m,+String(x._id).split("-")[1]||0),0)).padStart(3,"0");
function mkUser(name,role,units,pin,must){const salt=newSalt();return{_id:nid("USR",db.users),name,role_id:role,unit_ids:units||[],status:"aktif",pin_salt:salt,pin_hash:pinHash(pin,salt),pin_set_at:now(),must_change:!!must,fails:0,locked_until:"",created_at:now()}}
function authPin(u,p,fid){
 if(isLocked(u)){audit("login_ditolak","user",u._id,"Akun sedang terkunci",u.name);save();throw fe(fid,"Akun terkunci sampai "+jam(u.locked_until)+". Minta Admin Sistem mereset PIN, atau coba lagi nanti.")}
 if(pinHash(p,u.pin_salt)!==u.pin_hash){u.fails=(u.fails||0)+1;
  if(u.fails>=MAXF){u.fails=0;u.locked_until=new Date(Date.now()+LOCKMS).toISOString();audit("kunci_akun","user",u._id,"PIN salah "+MAXF+" kali; akun terkunci 5 menit",u.name);save();throw fe(fid,"PIN salah "+MAXF+" kali. Akun terkunci 5 menit.")}
  audit("login_gagal","user",u._id,"PIN salah ("+u.fails+"/"+MAXF+")",u.name);save();throw fe(fid,"PIN salah. Sisa percobaan: "+(MAXF-u.fails))}
 u.fails=0;u.locked_until=""}
function doLogin(uid,p){const u=db.users.find(x=>x._id===uid);if(!u||u.status!=="aktif")throw fe("lg-u","Akun tidak ditemukan atau nonaktif");if(!p)throw fe("lg-p","PIN wajib diisi");
 authPin(u,p,"lg-p");S.cu=u._id;ssS(u._id);audit("login","user",u._id,"Masuk");save()}
function loginUI(){const u=$("#lg-u"),p=$("#lg-p");try{S.lgu=u?u.value:"";doLogin(S.lgu,p?p.value:"");S.lge="";S.msg="Selamat datang, "+curUser().name}catch(e){S.lge=e.message;S.fe=null}render()}
function doLogout(){const u=curUser();if(u)audit("logout","user",u._id,"Keluar");S.cu=null;ssS(null);S.dr={};S.doc=null;S.cf=null;S.msg="";S.lge="";S.more=0;save();render()}
function chgPin(){try{const u=curUser();if(!u)throw Error("Belum masuk");const o=$("#cp-o").value,n=$("#cp-n").value,r=$("#cp-r").value;
 if(pinHash(o,u.pin_salt)!==u.pin_hash)throw fe("cp-o","PIN lama salah");pinChk(n,"cp-n");if(n===o)throw fe("cp-n","PIN baru harus berbeda dari PIN lama");if(n!==r)throw fe("cp-r","Ulangi PIN baru tidak sama");
 u.pin_salt=newSalt();u.pin_hash=pinHash(n,u.pin_salt);u.pin_set_at=now();u.must_change=false;u.fails=0;audit("pin_ganti","user",u._id,"PIN diganti oleh pemilik akun");save();S.msg="PIN berhasil diganti"}catch(e){S.msg=ER(e)}render()}
function enableRbac(){try{if(rbacOn())throw Error("Mode pengguna sudah aktif");seedRoles(db);const p=$("#us-p").value;
 if(db.users.length){const u=db.users.find(x=>x._id===$("#us-a").value);if(!isAdm(u))throw fe("us-a","Pilih Admin Sistem yang aktif");if(!p)throw fe("us-p","PIN wajib diisi");authPin(u,p,"us-p");
  db.settings.rbac=true;S.cu=u._id;ssS(u._id);audit("rbac_on","settings","rbac","Mode pengguna diaktifkan kembali");audit("login","user",u._id,"Masuk");usDr();save();S.msg="Mode pengguna aktif kembali. Anda masuk sebagai "+u.name;render();return}
 const n=$("#us-n").value.trim(),p2=$("#us-p2").value,ar=db.roles.find(r=>r.perms.includes("pengguna.kelola"));
 if(!n)throw fe("us-n","Nama Admin wajib diisi");pinChk(p,"us-p");if(p!==p2)throw fe("us-p2","Ulangi PIN tidak sama");if(!ar)throw Error("Tidak ada peran dengan izin Kelola pengguna");
 const u=mkUser(n,ar._id,[],p,false);db.users.push(u);db.settings.rbac=true;S.cu=u._id;ssS(u._id);
 audit("rbac_on","settings","rbac","Mode pengguna diaktifkan; Admin Sistem: "+n);audit("login","user",u._id,"Masuk setelah mengaktifkan mode pengguna");usDr();save();S.msg="Mode pengguna aktif. Anda masuk sebagai "+n}catch(e){S.msg=ER(e)}render()}
function rbacOff(){try{needP("pengguna.kelola","Hanya Admin Sistem yang dapat mematikan mode pengguna");audit("rbac_off","settings","rbac","Mode pengguna dimatikan");db.settings.rbac=false;S.cu=null;ssS(null);save();S.msg="Mode pengguna dimatikan"}catch(e){S.msg=ER(e)}render()}
function saveUser(){try{needP("pengguna.kelola","Hanya Admin Sistem yang dapat mengelola pengguna");
 const n=$("#us-n").value.trim(),r=$("#us-r").value,eu=db.users.find(x=>x._id===S.eus),role=db.roles.find(x=>x._id===r);
 if(!n)throw fe("us-n","Nama pengguna wajib diisi");if(!role)throw fe("us-r","Pilih peran");
 if(db.users.some(x=>x._id!==(eu&&eu._id)&&x.name.toLowerCase()===n.toLowerCase()))throw fe("us-n","Nama pengguna sudah dipakai");
 const un=db.business_units.filter(x=>{const c=$("#us-u-"+x._id);return c&&c.checked}).map(x=>x._id);
 if(eu){if(lastAdm(eu)&&!role.perms.includes("pengguna.kelola"))throw fe("us-r","Ini satu-satunya Admin Sistem aktif; peran tidak boleh diubah");
  const d=[];if(eu.name!==n)d.push("nama "+eu.name+" → "+n);if(eu.role_id!==r)d.push("peran "+(roleOf(eu)||{}).name+" → "+role.name);if((eu.unit_ids||[]).join()!==un.join())d.push("unit tugas diubah");
  eu.name=n;eu.role_id=r;eu.unit_ids=un;audit("user_ubah","user",eu._id,d.join("; ")||"tanpa perubahan");S.eus=null;S.msg="Pengguna diperbarui"}
 else{const p=$("#us-p").value,p2=$("#us-p2").value;pinChk(p,"us-p");if(p!==p2)throw fe("us-p2","Ulangi PIN tidak sama");
  const u=mkUser(n,r,un,p,true);db.users.push(u);audit("user_buat","user",u._id,n+" · "+role.name);usDr();clrF("#us-n,#us-p,#us-p2");S.msg="Pengguna ditambahkan; PIN awal wajib diganti saat masuk pertama"}
 save();okM()}catch(e){S.msg=ER(e)}render()}
function togUser(id){try{needP("pengguna.kelola","Hanya Admin Sistem yang dapat mengelola pengguna");const u=db.users.find(x=>x._id===id);if(!u)throw Error("Pengguna tidak ditemukan");
 if(u.status==="aktif"){if(u._id===S.cu)throw Error("Tidak dapat menonaktifkan akun yang sedang dipakai");if(lastAdm(u))throw Error("Tidak dapat menonaktifkan satu-satunya Admin Sistem aktif");u.status="nonaktif";audit("user_nonaktif","user",u._id,u.name);S.msg="Pengguna dinonaktifkan"}
 else{u.status="aktif";audit("user_aktif","user",u._id,u.name);S.msg="Pengguna diaktifkan"}save()}catch(e){S.msg=ER(e)}render()}
function resetPin(){try{needP("pengguna.kelola","Hanya Admin Sistem yang dapat mereset PIN");const u=db.users.find(x=>x._id===S.rp);if(!u)throw Error("Pengguna tidak ditemukan");if(u._id===S.cu)throw Error("Untuk akun sendiri gunakan Ganti PIN");
 const p=$("#rp-p").value;pinChk(p,"rp-p");u.pin_salt=newSalt();u.pin_hash=pinHash(p,u.pin_salt);u.pin_set_at=now();u.must_change=true;u.fails=0;u.locked_until="";audit("pin_reset","user",u._id,"PIN direset Admin; wajib diganti saat masuk");S.rp=null;save();okM();S.msg="PIN sementara "+u.name+" diset; wajib diganti saat masuk"}catch(e){S.msg=ER(e)}render()}
function usrChip(){const e=$("#usr");if(!e)return;const u=curUser();e.innerHTML=u?`<button class="b s" onclick="S.su='usr';go('set')" title="Akun saya" aria-label="Akun saya: ${esc(u.name)}">${ic("user")}<span class="un">${esc(u.name)}</span></button><button class="b s" onclick="doLogout()" aria-label="Keluar" title="Keluar">${ic("out")}</button>`:""}
function gate(){const el=$("#lock");if(!el)return false;if(!rbacOn()){el.className="";el.innerHTML="";return false}
 const u=curUser();if(u&&!u.must_change){el.className="";el.innerHTML="";return false}lockRender(el,u);return true}
const PW=(id,ac)=>`<input id="${id}" type="password" inputmode="numeric" maxlength="8" autocomplete="${ac}">`;
function lockRender(el,u){unitHome();["#main","#sb","#bn","#sheet","#usr"].forEach(x=>{const n=$(x);if(n)n.innerHTML=""});const nm=bnm();document.title=nm+" · Masuk";
 let h;
 if(u)h=`<div class="lk"><h1>${esc(nm)}</h1><p class="k">Halo, ${esc(u.name)}. PIN Anda masih sementara — buat PIN baru untuk melanjutkan.</p><div class="card"><label>PIN sementara</label>${PW("cp-o","current-password")}<label>PIN baru (4–8 angka)</label>${PW("cp-n","new-password")}<label>Ulangi PIN baru</label>${PW("cp-r","new-password")}<button class="b" onclick="chgPin()">Simpan PIN baru</button><button class="b s" onclick="doLogout()">Keluar</button></div></div>`;
 else{const us=db.users.filter(x=>x.status==="aktif");
  h=`<div class="lk"><h1>${esc(nm)}</h1><p class="k">Masuk untuk melanjutkan.</p><div class="card"><label>Pengguna</label><select id="lg-u" onchange="S.lgu=this.value">${opt(us,x=>[x._id,x.name+" — "+((roleOf(x)||{}).name||"")],S.lgu||"")}</select><label>PIN</label><input id="lg-p" type="password" inputmode="numeric" maxlength="8" autocomplete="current-password" onkeydown="if(event.key==='Enter')loginUI()">${S.lge?`<div class="fe" role="alert">${esc(S.lge)}</div>`:""}<button class="b" onclick="loginUI()">Masuk</button></div>
<details${S.lrec?" open":""} ontoggle="S.lrec=this.open"><summary>Lupa PIN?</summary><p class="k">Minta Admin Sistem lain mereset PIN Anda (Setelan &gt; Pengguna &amp; Peran). Jika satu-satunya Admin lupa PIN atau akunnya terkunci, pulihkan dari file backup yang PIN-nya masih diketahui.</p><textarea id="bk" rows="4" placeholder="Tempel isi backup JSON di sini"></textarea><input type="file" accept=".json" aria-label="Pilih berkas backup JSON" onchange="fl(this)"><button class="b s" onclick="impAsk()">Pulihkan dari backup</button></details></div>`}
 el.innerHTML=h;el.className="on";cfr();
 if(S.fe){const f=$("#"+S.fe.id);if(f&&f.insertAdjacentHTML){f.classList.add("er");f.insertAdjacentHTML("afterend",`<div class="fe" role="alert">${esc(S.fe.m)}</div>`)}S.fe=null}
 if(S.msg){toast(S.msg,/^⚠/.test(S.msg));if(typeof setTimeout==="function")setTimeout(()=>{S.msg=""},0)}
 const f=$(u?"#cp-o":"#lg-p");if(f&&f.focus)f.focus()}
function rolesCard(){const R=db.roles.filter(r=>r.status!=="nonaktif"),ed=!!(rbacOn()&&curUser()&&can("pengguna.kelola"));
 return`<h2>Peran dan Izin</h2><p class="k">Izin ditegakkan di fungsi aksi (bukan sekadar menyembunyikan tombol), menu menyesuaikan peran, dan pengguna dengan unit tugas hanya bisa mencatat di unit itu. ${ed?"Centang untuk memberi atau mencabut izin; setiap perubahan tercatat di audit log.":"Hanya Admin Sistem yang dapat mengubah izin."} Ini kontrol prosedur, bukan keamanan sungguhan (data di browser). Geser tabel ke samping bila perlu.</p>`+tbl(["Izin",...R.map(r=>r.name)],PERMS.map(([k,d])=>`<tr><td>${esc(d)}</td>${R.map(r=>`<td>${ed?`<input type="checkbox" aria-label="${esc(r.name+": "+d)}"${r.perms.includes(k)?" checked":""} onchange="togPerm('${r._id}','${k}')">`:r.perms.includes(k)?"✓":"—"}</td>`).join("")}</tr>`).concat(`<tr><th>Jumlah izin</th>${R.map(r=>`<th>${r.perms.length}</th>`).join("")}</tr>`))}
function togPerm(rid,p){try{needP("pengguna.kelola","Hanya Admin Sistem yang dapat mengubah izin peran");const r=db.roles.find(x=>x._id===rid);if(!r||!PD[p])throw Error("Peran atau izin tidak ditemukan");
 const has=r.perms.includes(p);
 if(has&&p==="pengguna.kelola"){const cu=curUser();if(cu&&cu.role_id===rid)throw Error("Tidak dapat mencabut Kelola pengguna dari peran Anda sendiri");const sisa=db.users.some(u=>u.status==="aktif"&&u.role_id!==rid&&(roleOf(u)||{perms:[]}).perms.includes("pengguna.kelola"));if(!sisa)throw Error("Kelola pengguna tidak boleh dicabut: tidak akan ada Admin Sistem aktif tersisa")}
 r.perms=has?r.perms.filter(x=>x!==p):r.perms.concat(p);audit("peran_izin","role",rid,r.name+": "+(has?"cabut ":"beri ")+PD[p]);save();S.msg="Izin "+r.name+" diperbarui"}catch(e){S.msg=ER(e)}render()}
function vUsr(){const on=rbacOn(),cu=curUser();let h=`<h2>Pengguna & Peran</h2>`;
 if(!on){const ex=db.users.filter(isAdm);
  return h+`<div class="card"><p class="k">Mode pengguna <b>belum aktif</b>: siapa pun yang membuka aplikasi ini dapat melakukan semua hal. Mengaktifkannya menambah login PIN, peran, dan jejak “oleh siapa” di audit log.</p><p class="k"><b>Catatan penting:</b> data tersimpan di browser ini, jadi mode ini hanya <b>kontrol prosedur</b> (pemisahan tugas dan jejak), bukan keamanan sungguhan — orang yang paham teknis masih bisa melewatinya lewat DevTools atau file backup. Penegakan sebenarnya menunggu backend (Fase 10). Export backup dulu sebelum mengaktifkan.</p>`
   +(ex.length?`<label>Admin Sistem</label><select id="us-a">${opt(ex,u=>[u._id,u.name],"")}</select><label>PIN Admin</label>${PW("us-p","current-password")}`:`<label>Nama Admin Sistem *</label><input id="us-n" autocomplete="off"><label>PIN (4–8 angka) *</label>${PW("us-p","new-password")}<label>Ulangi PIN *</label>${PW("us-p2","new-password")}`)
   +`<button class="b" onclick="enableRbac()">${ex.length?"Aktifkan kembali":"Aktifkan mode pengguna"}</button></div>`+rolesCard()}
 if(!cu)return h;
 h+=`<div class="card"><p><b>${esc(cu.name)}</b> · ${esc((roleOf(cu)||{}).name||"")}</p><div class="k">Ganti PIN akun Anda</div><label>PIN lama</label>${PW("cp-o","current-password")}<label>PIN baru (4–8 angka)</label>${PW("cp-n","new-password")}<label>Ulangi PIN baru</label>${PW("cp-r","new-password")}<button class="b" onclick="chgPin()">Ganti PIN</button><button class="b s" onclick="doLogout()">Keluar</button></div>`;
 if(!can("pengguna.kelola"))return h+`<p class="k">Pengelolaan pengguna dan peran hanya untuk Admin Sistem.</p>`;
 const act=db.users.filter(isAdm).length;
 h+=`<h2>Daftar Pengguna</h2>${addB("Tambah pengguna","us")}${act<2?`<p class="k">⚠ Hanya ada satu Admin Sistem aktif. Disarankan menambah satu lagi agar PIN yang terlupa bisa direset.</p>`:""}`
  +tbl(["Nama","Peran","Unit","Status",""],db.users.map(u=>`<tr><td>${esc(u.name)}${u._id===S.cu?" (Anda)":""}${u.must_change?' <span class="k">PIN sementara</span>':""}${isLocked(u)?' <span class="k">Terkunci</span>':""}</td><td>${esc((roleOf(u)||{}).name||"?")}</td><td>${esc((u.unit_ids||[]).map(unitName).join(", ")||"Semua")}</td><td>${u.status==="aktif"?"Aktif":"Nonaktif"}</td><td>${ib("edit","Edit","mdOpen('us','"+u._id+"')","s")}${u._id!==S.cu?ib("key","Reset PIN","mdOpen('rp','"+u._id+"')","s")+ib(u.status==="aktif"?"x":"check",u.status==="aktif"?"Nonaktifkan":"Aktifkan","askC('togUser','"+u._id+"')","s"):""}</td></tr>`));
 return h+rolesCard()+`<h2>Mode Pengguna</h2><div class="card"><p class="k">Mematikan mode membuat aplikasi terbuka tanpa login; data pengguna tetap tersimpan.</p><button class="b x" onclick="askC('rbacOff','')">Matikan mode pengguna</button></div>`}

