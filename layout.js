// ===== UI HELPERS =====
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const rp=n=>`<span class="${n<0?"neg":""}">Rp ${Math.round(n).toLocaleString("id-ID")}</span>`;
const opt=(arr,f,sel)=>arr.map(x=>{const[v,t]=f(x);return`<option value="${esc(v)}"${v===sel?" selected":""}>${esc(t)}</option>`}).join("");
const accOpts=(s,all)=>opt(db.accounts.filter(a=>postable(a)&&(all||isAct(a))),a=>[a._id,a.code+" "+a.name],s);
const unitName=id=>(db.business_units.find(u=>u._id===id)||{name:"Umum"}).name;
const kvr=(a,s,v,pc)=>`<div class="kvr"><div class="kvt"><b>${a}</b><span>${v}</span></div>${pc!=null?`<div class="lru-b" role="img" aria-label="${Math.round(pc)}%"><i style="width:${Math.min(100,Math.max(0,pc))}%"></i></div>`:""}${s?`<small>${s}</small>`:""}</div>`;
const tbl=(h,rows)=>`<div class="sc"><table class="${h[h.length-1]===""?"act":""}"><tr>${h.map(x=>`<th class="${x[0]=="#"?"n":""}">${x.replace("#","")}</th>`).join("")}</tr>${rows.join("")}</table></div>`;
// ===== LAYOUT (ikon, sidebar, bottom nav) =====
const IC_P={cloud:'<path d="M17.5 19H7a5 5 0 1 1 1.4-9.8A6 6 0 0 1 20 11.5a3.8 3.8 0 0 1-2.5 7.5z"/>',eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',eyeoff:'<path d="M17.9 17.9A10.9 10.9 0 0 1 12 19c-6.5 0-10-7-10-7a18 18 0 0 1 5.1-5.9M9.9 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M2 2l20 20"/>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',out:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',key:'<circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.7 12.3L21 2"/><path d="M17 6l3 3"/>',rep:'<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',pay:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',air:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',dash:'<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
trx:'<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>',
sp:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
led:'<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
tb:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 3v18"/>',
mst:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
dat:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
more:'<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
plus:'<path d="M12 5v14M5 12h14"/>',chev:'<path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/>',next:'<path d="m9 6 6 6-6 6"/>',
check:'<path d="M20 6 9 17l-5-5"/>',x:'<path d="M18 6 6 18M6 6l12 12"/>',
cash:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/>',
cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
undo:'<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/>',
lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
help:'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
unlock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
print:'<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
set:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
flag:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
tup:'<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',tdn:'<path d="m22 17-8.5-8.5-5 5L2 7"/><path d="M16 17h6v-6"/>',chart:'<path d="M3 3v18h18"/><path d="M7 15v3M12 9v9M17 5v13"/>'};
const ic=n=>`<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC_P[n]}</svg>`;
const ib=(i,t,f,c)=>`<button class="ib ${c||""}" title="${t}" aria-label="${t}" onclick="${f}">${ic(i)}<span>${t}</span></button>`;
const BN=["dash","trx","sp","air"],GR=[["Ringkasan",["dash","rep"]],["Operasional",["trx","sp","air","pay"]],["Akuntansi",["led","tb"]],["Sistem",["mst","dat","set"]]],NU=["mst","dat","set","prof"];
const TP={dash:["lihat"],rep:["lihat"],trx:["trx.kelola"],sp:["sp.kelola","sp.data","sp.ajukan","sp.verifikasi","sp.analisis","sp.setujui","sp.akad","sp.tagih","sp.restruk","sp.hapusbuku","sp.cairkan","sp.bayar"],air:["air.kelola"],pay:["gaji.kelola","gaji.setuju"],led:["trx.kelola","audit.lihat"],tb:["trx.kelola","audit.lihat"],mst:["master.kelola"],dat:["data.backup","data.kelola","periode.kelola","audit.lihat"],set:["setelan.kelola","pengguna.kelola"]};
const MODS=[["air","Unit Air","Pelanggan, sambungan dan meter, tagihan air, penjualan, piutang pelanggan, laporan Unit Air"],["pay","Gaji (Payroll)","Proses gaji, komponen gaji, slip gaji, laporan gaji"]],modOn=k=>!!((db&&db.settings&&db.settings.modules)||{})[k],
 tabOk=k=>(!MODS.some(m=>m[0]===k)||modOn(k))&&(!rbacOn()||!curUser()||!TP[k]||TP[k].some(p=>can(p)))&&(k!=="sp"||spScope()),GRV=()=>GR.map(([g,ks])=>[g,ks.filter(tabOk)]).filter(x=>x[1].length),BNP=BN.concat(["rep","pay","led","tb","mst","dat","set"]),BNV=()=>BNP.filter(tabOk).slice(0,4);
// akun yang ditugaskan hanya ke unit non-Simpan Pinjam tidak memerlukan menu Simpan Pinjam
const spScope=()=>{if(!rbacOn())return true;const u=curUser(),ids=(u&&u.unit_ids)||[];return!ids.length||ids.some(id=>(db.business_units||[]).some(x=>x._id===id&&x.type==="simpan_pinjam"))};
const bnm=()=>(db.bumdes[0]||{}).name||"BUMDes";
function bAddr(){const b=db.bumdes[0]||{},a=[b.address,b.village&&"Desa "+b.village,b.district&&"Kec. "+b.district,b.regency,b.province].filter(Boolean).join(", "),c=[b.phone&&"Telp. "+b.phone,b.email].filter(Boolean).join(" · ");return(a||c)?`<div class="cn">${esc(a)}${a&&c?"<br>":""}${esc(c)}</div>`:""}
const logoOk=u=>typeof u==="string"&&u.length<=200000&&/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+\/=]+$/.test(u);
const kop=()=>{const b=db.bumdes[0]||{};return(logoOk(b.logo)?`<img class="logo" alt="Logo ${esc(bnm())}" src="${b.logo}">`:"")+`<h2>${esc(bnm())}</h2>`+bAddr()};
const BLN=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const tglId=d=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(d||"");return m&&BLN[+m[2]-1]?(+m[3])+" "+BLN[+m[2]-1]+" "+m[1]:d||""};
const sig=(c,dir,date)=>{if(dir&&db.settings.sign_director!==false)c=c.concat([["Direktur",(db.bumdes[0]||{}).director]]);const pl=String(db.settings.sign_place||"").trim();
 return(pl?`<div class="tp">${esc(pl)}, ${tglId(date||today())}</div>`:"")+`<div class="sg">${c.map(([r,n])=>`<div>${r}<br><br><br>( ${esc(n||"..............")} )</div>`).join("")}</div>`};
const tres=()=>(db.bumdes[0]||{}).treasurer;
function logoSet(u){if(!logoOk(u))throw Error("Logo tidak valid atau terlalu besar (maks. ±150 KB setelah diperkecil)");const b=db.bumdes[0]||(db.bumdes[0]={_id:"BUMDES-001"});b.logo=u;b.updated_at=now();audit("update","bumdes",b._id,"Logo BUMDes diubah");save()}
function logoDel(){const b=db.bumdes[0];if(b&&b.logo){delete b.logo;b.updated_at=now();audit("update","bumdes",b._id,"Logo BUMDes dihapus");save()}S.msg="Logo dihapus";render()}
function logoPick(inp){const f=inp.files[0];if(!f)return;
 if(!/^image\/(png|jpeg|webp)$/.test(f.type)){S.msg="⚠ Logo harus PNG, JPG, atau WebP";render();return}
 if(f.size>3e6){S.msg="⚠ File logo terlalu besar (maks. 3 MB)";render();return}
 const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{try{const k=Math.min(1,240/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.max(1,Math.round(im.width*k));c.height=Math.max(1,Math.round(im.height*k));c.getContext("2d").drawImage(im,0,0,c.width,c.height);
  let u=c.toDataURL("image/png");if(u.length>150000)u=c.toDataURL("image/jpeg",.85);logoSet(u);S.msg="Logo disimpan"}catch(e){S.msg="⚠ "+e.message}render()};im.onerror=()=>{S.msg="⚠ File gambar tidak dapat dibaca";render()};im.src=r.result};r.readAsDataURL(f)}
function setSd(v){db.settings.sign_director=v!=="0";audit("setting","settings","sign_director","Tanda tangan Direktur "+(v==="0"?"disembunyikan":"ditampilkan"));save();S.msg="Pengaturan dokumen disimpan";render()}
function setRepNote(v){v=String(v||"").replace(/\r/g,"").trim().slice(0,REPN_MAX);db.settings.rep_note=v;audit("setting","settings","rep_note",v?"Catatan atas laporan diubah ("+v.length+" huruf)":"Catatan atas laporan dikosongkan");save();S.msg="Catatan atas laporan disimpan";render()}
function setSp(v){v=String(v||"").trim().slice(0,60);db.settings.sign_place=v;audit("setting","settings","sign_place",v?"Tempat penandatanganan: "+v:"Tempat penandatanganan dikosongkan");save();S.msg="Pengaturan dokumen disimpan";render()}
function docSet(){const b=db.bumdes[0]||{},lg=logoOk(b.logo);return`<h2>Dokumen Cetak</h2>${dcard("Kop dan tanda tangan","Nama Direktur dan Bendahara di dokumen diambil dari Profil BUMDes. Tempat penandatanganan (bila diisi) dicetak bersama tanggal dokumen di atas tanda tangan.",`<label>Logo BUMDes (PNG/JPG/WebP, otomatis diperkecil; tampil di kop dokumen)</label>${lg?`<img alt="Logo" src="${b.logo}" style="max-height:64px;max-width:180px;display:block;margin:4px 0">`:`<div class="k">Belum ada logo</div>`}<input id="bd-logo" type="file" aria-label="Pilih berkas logo (PNG, JPG, atau WebP)" accept="image/png,image/jpeg,image/webp" onchange="logoPick(this)">${lg?`<button class="b s" onclick="askC('logoDel','')">Hapus logo</button>`:""}
<label>Tempat penandatanganan (mis. Desa Sukamaju; kosong = tempat dan tanggal tidak dicetak)</label><input id="bd-place" maxlength="60" autocomplete="off" value="${esc(db.settings.sign_place||"")}" onchange="setSp(this.value)">
<label>Tanda tangan Direktur pada bukti pencairan dan slip gaji</label><select onchange="setSd(this.value)"><option value="1"${db.settings.sign_director!==false?" selected":""}>Tampilkan</option><option value="0"${db.settings.sign_director===false?" selected":""}>Sembunyikan</option></select>`,"")}${dcard("Catatan atas laporan","Tampil di bawah Neraca, Laba Rugi, Arus Kas, dan Piutang (juga saat dicetak), setelah catatan otomatis dari data.",`<label for="rep-note">Catatan tambahan (kebijakan akuntansi, penjelasan angka, dasar penilaian; maksimal ${REPN_MAX} huruf)</label><textarea id="rep-note" rows="5" maxlength="${REPN_MAX}" autocomplete="off" onchange="setRepNote(this.value)">${esc(db.settings.rep_note||"")}</textarea><p class="k">Kosongkan untuk hanya memakai catatan otomatis.</p>`,"")}`}
try{S.sbc=localStorage.getItem("bumdes_ui_sbc")==="1"}catch(e){}
// ===== Alamat per halaman (v1.1.098): /dashboard, /laporan, /setelan/awan, ... lewat History API (hanya di http/https; file:// tidak berubah) =====
const ROUTES=[["dash","dashboard"],["rep","laporan"],["trx","transaksi"],["sp","simpan-pinjam"],["air","unit-air"],["pay","gaji"],["led","buku-besar"],["tb","neraca-saldo"],["mst","master"],["dat","data"],["set","setelan"],["prof","profil"]];
const RT_SUB={set:["su","pf",[["usr","pengguna"],["mod","modul"],["sp","simpan-pinjam"],["pt","portal"]]],
 trx:["xt","daftar",[["awal","saldo-awal"]]],
 mst:["mt","unit",[["kas","kas-bank"],["coa","akun"],["pihak","pihak"],["peg","pegawai"],["tarif","tarif-biaya"],["tair","tarif-air"]]],
 dat:["dt","bk",[["per","periode"],["aud","audit-log"]]],
 pay:["gt","proses",[["komp","komponen"],["rekap","laporan"]]],
 sp:["st","ringkasan",[["pinjaman","pinjaman"],["tabungan","tabungan"],["tunggakan","tunggakan"],["jaminan","jaminan"],["nasabah","nasabah"],["calon","calon"]]],
 air:["at","baca",[["samb","sambungan"],["piutang","piutang"],["tarif","tarif"],["jual","penjualan-lain"],["pel","pelanggan"],["prod","produk"]]],
 rep:["rp","neraca",[["lr","laba-rugi"],["kas","arus-kas"],["piu","piutang"],["sp","simpan-pinjam"],["air","unit-air"]]]};
const rtOn=()=>typeof window!=="undefined"&&window.RT_BASE!==undefined&&typeof location!=="undefined"&&/^https?:$/.test(location.protocol)&&typeof history!=="undefined"&&!!history.pushState;
const rtBase=()=>(typeof window!=="undefined"&&window.RT_BASE)||"/";
function rtPath(){const r=ROUTES.find(x=>x[0]===S.tab);if(!r)return null;let p=rtBase()+r[1];if(S.tab==="sp"&&S.pp)return p+"/"+(S.pp.k==="lp"?"ajukan":"pinjaman/"+encodeURIComponent(S.pp.id)+(S.pp.k==="la"?"/ubah":""));const m=RT_SUB[S.tab];if(m){const q=m[2].find(x=>x[0]===S[m[0]]);if(q)p+="/"+q[1]}return p}
function rtParse(path){const b=rtBase();if(path.indexOf(b)!==0)return null;const sg=path.slice(b.length).split("/").filter(Boolean),r=ROUTES.find(x=>x[1]===sg[0]);if(!r)return null;const o={tab:r[0]},m=RT_SUB[r[0]];if(m){const q=m[2].find(x=>x[1]===sg[1]);o.sk=m[0];o.sv=q?q[0]:m[1]}if(r[0]==="sp"){if(sg[1]==="ajukan"){o.sk="st";o.sv="pinjaman";o.pp={k:"lp",id:null}}else if(sg[1]==="pinjaman"&&sg[2]){let id=sg[2];try{id=decodeURIComponent(id)}catch(e){}o.pp={k:sg[3]==="ubah"?"la":"ld",id}}}return o}
function rtSync(){try{if(!rtOn()||location.hash||S.lgn||S.pt)return;const p=rtPath();if(!p)return;if(location.pathname===p){S.rtPop=0;S.rtRep=0;S.rtInit=1;return}
 if(S.rtInit&&!S.rtPop&&!S.rtRep)history.pushState(null,"",p+location.search);else history.replaceState(null,"",p+location.search);S.rtInit=1;S.rtPop=0;S.rtRep=0}catch(e){}}
function rtApply(){const o=rtParse(location.pathname);if(!o)return false;S.tab=o.tab;if(o.sk)S[o.sk]=o.sv;if(o.pp)S.pp=o.pp;return true}
function rtPop(){S.rtPop=1;const o=rtParse(location.pathname);if(!o){render();return}if(o.sk)S[o.sk]=o.sv;if(o.tab!==S.tab)go(o.tab);if(o.tab==="sp")pgSet(o.pp||null);render()}
if(typeof window!=="undefined"&&window.addEventListener)window.addEventListener("popstate",()=>{if(typeof rtPop==="function"&&rtOn())rtPop()});
function go(k){const dn=dirtyFields().length,pl=(TABS.find(x=>x[0]===S.tab)||[0,""])[1],same=k===S.tab;S.md=null;S.mv=null;S.ecn=S.eus=S.rp=null;S.eu=S.ec=S.ea=S.ey=S.eg=S.ek=S.pd=null;S.gf=S.gto="";S.pf="";S.wq="";S.wf="";S.tab=k;S.msg=dn&&!same?"Isian di "+pl+" belum diposting; disimpan sementara":"";S.doc=null;S.pp=null;S.pv=null;S.rc=0;S.more=0;S.q="";S.d1="";S.d2="";S.tt="";S.aa="";S.ae="";S.au="";S.lim=0;S.pl=null;render();window.scrollTo(0,0)}
const unitMQ=()=>typeof matchMedia==="function"&&matchMedia("(min-width:900px)").matches;
function unitMv(u,p){p.appendChild(u);if(u._b&&u._b.parentNode!==p)p.appendChild(u._b)}
function unitHome(){const u=$("#unit"),h=document.querySelector(".hru");if(u&&h&&u.parentNode&&(u.parentNode!==h||(u._b&&u._b.parentNode!==h))&&h.appendChild)unitMv(u,h)}
function unitPlace(){const u=$("#unit"),w=$("#sbu");if(u&&w&&u.parentNode&&w.appendChild&&unitMQ()&&!S.sbc)unitMv(u,w);if(w&&w.style)w.style.display=NU.includes(S.tab)||S.sbc?"none":""}
if(typeof matchMedia==="function"&&matchMedia("(min-width:900px)").addEventListener)matchMedia("(min-width:900px)").addEventListener("change",()=>render());
function togSb(){S.sbc=!S.sbc;try{localStorage.setItem("bumdes_ui_sbc",S.sbc?"1":"0")}catch(e){}render()}
function unitLbl(){const v=S.unit||"all";if(v==="all")return"Semua unit";const u=(db.business_units||[]).find(x=>x._id===v);return u?u.name:"Semua unit"}
function hdrDate(){try{return new Date(today()+"T12:00:00").toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"short",year:"numeric"})}catch(e){return""}}
function chrome(){rtSync();const lb=Object.fromEntries(TABS),nm=bnm(),AT=alertTabs(),btn=(k,c)=>`<button class="ni ${S.tab===k?"on":""}"${S.tab===k?' aria-current="page"':""} title="${lb[k]}${AT[k]?" — "+AT[k]+" peringatan":""}" onclick="go('${k}')">${ic(k)}<span>${lb[k]}</span>${bc(AT[k])}</button>`;
 $("#app").className=S.sbc?"col":"";
 unitHome();$("#sb").innerHTML=`<div class="brand">${ic("mst")}<span><b title="${esc(nm)}">${esc(nm)}</b><small>v${APP_VER}</small></span></div><div class="sbu" id="sbu"><label for="unit">Unit usaha</label></div>`+GRV().map(([g,ks])=>`<div class="gl"><span>${g}</span></div>`+ks.map(btn).join("")).join("")+`<div class="grow"></div>${pwaPrompt?`<button class="ni" id="pwa" title="Pasang aplikasi di perangkat" onclick="pwaInstall()">${ic("plus")}<span>Pasang aplikasi</span></button>`:""}`;
 {const cb=$("#cb");if(cb){const t=(S.sbc?"Perluas":"Ciutkan")+" menu";cb.innerHTML=ic("chev");cb.title=t;if(cb.setAttribute){cb.setAttribute("aria-label",t);cb.setAttribute("aria-expanded",String(!S.sbc))}}}
 $("#bn").innerHTML=BNV().map(k=>`<button class="${S.tab===k&&!S.more?"on":""}"${S.tab===k&&!S.more?' aria-current="page"':""} onclick="go('${k}')">${ic(k)}${k==="sp"?"Simpan Pinjam":lb[k]}${bc(AT[k])}</button>`).join("")+(GRV().some(([g,ks])=>ks.some(k=>!BNV().includes(k)))?`<button class="${S.more||!BNV().includes(S.tab)?"on":""}" aria-haspopup="true" aria-expanded="${!!S.more}" onclick="S.more=!S.more;render()">${ic("more")}Lainnya${GRV().some(([g,ks])=>ks.some(k=>!BNV().includes(k)&&AT[k]))?'<i class="dt" aria-hidden="true"></i><span class="sr"> — ada peringatan</span>':""}</button>`:"");
 unitPlace();
 $("#sheet").className=S.more?"sh open":"sh";
 $("#sheet").innerHTML=`<div onclick="event.stopPropagation()">`+GRV().map(([g,ks])=>{ks=ks.filter(k=>!BNV().includes(k));return ks.length?`<div class="gl"><span>${g}</span></div>`+ks.map(btn).join(""):""}).join("")+`</div>`;
 $("#ttl").textContent=lb[S.tab];$("#sbt").textContent=nm+(NU.includes(S.tab)?"":" · "+unitLbl());{const hi=$("#hic");if(hi)hi.innerHTML=ic(S.tab);const hd=$("#hdt");if(hd)hd.textContent=hdrDate()}document.title=nm+" · "+lb[S.tab];$("#unit").style.display=NU.includes(S.tab)?"none":"";
 usrChip();bkChip();if(typeof awChip==="function")awChip();fabSet()}
// ===== F3 (v0.1.036): peringatan, tren, jalan pintas, lencana, sub-tab, keadaan kosong =====
const mo=d=>d.slice(0,7),addMo=(m,n)=>{const[y,x]=m.split("-").map(Number),t=y*12+x-1+n;return Math.floor(t/12)+"-"+String(t%12+1).padStart(2,"0")},BLS=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
const bc=n=>n?`<i class="bc" aria-hidden="true">${n>99?"99+":n}</i><span class="sr"> — ${n} peringatan</span>`:"";
function goS(tab,o){Object.assign(S,o||{});go(tab)}
// ===== FAB (v1.1.049): kontekstual, menepi saat menggulir/mengisi form, menghormati hak akses =====
const FAB_HIDE=["trx","rep","led","tb","set","dat"];
function fabCfg(){if(S.doc||S.pp||FAB_HIDE.includes(S.tab))return null;if(S.tab==="sp")return can("sp.ajukan")&&!noPerm("sp.ajukan")?{l:"Ajukan pinjaman",t:"Ajukan pinjaman baru"}:null;return can("trx.kelola")&&!noPerm("trx.kelola")?{l:"Transaksi",t:"Transaksi baru"}:null}
function fabSet(){const e=$("#fab"),c=fabCfg();e.innerHTML=ic("plus")+'<span class="fl2">'+(c?c.l:"Transaksi")+'</span>';e.style.display=c?"":"none";if(c&&e.setAttribute){e.setAttribute("title",c.t);e.setAttribute("aria-label",c.t)}}
function fabGo(){const c=fabCfg();if(!c)return;if(S.tab==="sp")mdOpen("lp","");else qTrx("")}
function fabHide(on){const e=$("#fab");if(e&&e.classList)e.classList.toggle("fh",!!on)}
if(typeof document.addEventListener==="function"&&typeof window.addEventListener==="function"){let ly=0;window.addEventListener("scroll",()=>{const y=window.scrollY||0;if(document.body&&document.body.classList){if(y>56)document.body.classList.add("hc");else if(y<12)document.body.classList.remove("hc")}if(y>ly+8&&y>120)fabHide(1);else if(y<ly-8||y<=120)fabHide(0);ly=y},{passive:true});
 document.addEventListener("focusin",e=>{const t=e.target;if(t&&/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)&&!/^(checkbox|radio|button)$/.test(t.type||""))fabHide(1)});
 document.addEventListener("focusout",()=>{setTimeout(()=>{const t=document.activeElement;if(!(t&&/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))fabHide(0)},150)})}
function qTrx(ty){S.xt="daftar";S.ft=ty;go("trx");mdOpen("tn","")}
function alertsAll(){const T=today(),A=[],uOk=u=>S.unit==="all"||u===S.unit;
 const tg=db.loan_installments.filter(i=>i.status!=="paid"&&i.due_date<T).map(i=>({i,l:db.loans.find(l=>l._id===i.loan_id)})).filter(x=>x.l&&x.l.status==="active"&&uOk(x.l.unit_id));
 if(tg.length){const t=tg.reduce((a,{i})=>a+i.principal_due-i.principal_paid+i.interest_due-i.interest_paid,0);A.push({k:"tg",tab:"sp",n:tg.length,sev:"er",t:tg.length+" angsuran pinjaman menunggak",d:"Sisa tagihan "+rp(t),a:"Lihat tunggakan",fn:"goS('sp',{st:'tunggakan'})"})}
 const pj=db.sales.filter(x=>owedS(x)>.005&&x.bill&&x.bill.due&&x.bill.due<T&&uOk(x.unit_id));
 if(pj.length)A.push({k:"pj",tab:"air",n:pj.length,sev:"",t:pj.length+" piutang pelanggan lewat jatuh tempo",d:"Sisa tagihan "+rp(pj.reduce((a,x)=>a+owedS(x),0)),a:"Lihat piutang",fn:"goS('air',{at:'piutang'})"});
 const pd=db.accounting_periods.filter(p=>p.status==="open"&&p._id<mo(T)&&db.transactions.some(t=>t.status!=="voided"&&mo(t.date)===p._id));
 if(pd.length)A.push({k:"pd",tab:"dat",n:pd.length,sev:"",t:pd.length+" periode lampau belum ditutup",d:pd.map(p=>p._id).slice(0,3).join(", ")+(pd.length>3?" …":""),a:"Buka periode",fn:"goS('dat',{dt:'per'})"});
 const gj=db.payrolls.filter(x=>x.status==="approved"&&uOk(x.unit_id));
 if(gj.length)A.push({k:"gj",tab:"pay",n:gj.length,sev:"",t:gj.length+" gaji disetujui, belum dibayar",d:"Bayar setelah dana siap",a:"Buka gaji",fn:"go('pay')"});
 return A.filter(a=>tabOk(a.tab))}
const alertTabs=()=>{const m={};try{alertsAll().forEach(a=>{m[a.tab]=(m[a.tab]||0)+a.n})}catch(e){}return m};
const trend6=()=>memo("tr6:"+S.unit,()=>{const m0=mo(today()),M=[...Array(6).keys()].map(i=>addMo(m0,i-5)),R=Object.fromEntries(M.map(m=>[m,{r:0,e:0}]));
 db.journal_lines.forEach(l=>{if(!cur(l)||!inUnit(l))return;const x=R[mo(l.date)];if(!x)return;const t=acc(l.account_id).type;if(t==="revenue")x.r+=l.credit-l.debit;else if(t==="expense")x.e+=l.debit-l.credit});return M.map(m=>({m,...R[m]}))});
const mLbl=m=>BLS[+m.slice(5)-1]+" "+m.slice(2,4);
function trendSvg(D){const mx=Math.max(1,...D.flatMap(x=>[x.r,x.e])),W=600,H=190,P=16,bw=24,g=(W-2*P)/D.length,ph=H-44;
 const b=D.map((x,i)=>{const cx=P+g*i+g/2,hr=Math.max(0,x.r)/mx*ph,he=Math.max(0,x.e)/mx*ph;
  return`<rect class="tr-r" x="${cx-bw-2}" y="${H-24-hr}" width="${bw}" height="${hr}" rx="3"/><rect class="tr-e" x="${cx+2}" y="${H-24-he}" width="${bw}" height="${he}" rx="3"/><text x="${cx}" y="${H-7}" text-anchor="middle">${mLbl(x.m)}</text>`}).join("");
 return`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Tren pendapatan dan beban 6 bulan terakhir. ${esc(D.map(x=>mLbl(x.m)+": pendapatan "+fm(x.r)+", beban "+fm(x.e)).join("; "))}"><line x1="${P}" x2="${W-P}" y1="${H-24}" y2="${H-24}" stroke="var(--bd)"/>${b}</svg>`}
function bkChip(){const e=$("#bkc");if(!e)return;const b=bkInfo();
 e.innerHTML=bkDue()?`<button class="b chip" onclick="exp()" aria-label="Unduh backup — ${b.lb?"terakhir "+b.d+" hari lalu":"belum pernah"}" title="Backup terakhir: ${b.lb?b.d+" hari lalu":"belum pernah"}">${ic("dat")}<span>Backup</span><i class="dot" aria-hidden="true"></i></button>`:""}
const SUBK=["xt","mt","dt","su","st","at","gt","rp"],UIK="bumdes_ui_sub";
function uiLoad(){try{const o=JSON.parse(localStorage.getItem(UIK)||"{}");SUBK.forEach(k=>{if(typeof o[k]==="string"&&/^[a-z]{1,12}$/.test(o[k]))S[k]=o[k]});S._us=JSON.stringify(o)}catch(e){}}
function uiSave(){try{const o={};SUBK.forEach(k=>{if(S[k])o[k]=S[k]});const j=JSON.stringify(o);if(j!==S._us){localStorage.setItem(UIK,j);S._us=j}}catch(e){}}
function stbMask(b){const l=b.scrollLeft>2,r=b.scrollLeft+b.clientWidth<b.scrollWidth-2;b.classList.toggle("ml",l);b.classList.toggle("mr",r)}
function stbFx(){if(!document.querySelectorAll)return;document.querySelectorAll(".stb").forEach(b=>{const a=b.querySelector('[aria-selected="true"]');
 if(a&&b.scrollWidth>b.clientWidth)b.scrollLeft=Math.max(0,a.offsetLeft-(b.clientWidth-a.offsetWidth)/2);stbMask(b)})}
const EMI=[["pegawai","user","pg"],["sambungan","air","cn"],["komponen","pay"],["gaji","pay"],["pembayaran","cash"],["pendapatan","rep"],["penjualan","air"],["saldo awal","trx"],["tahun buku","cal"],["logo","set"]];
function emptyFx(){if(!document.querySelectorAll)return;document.querySelectorAll("#main p.k").forEach(p=>{const t=p.textContent.trim();if(!/^(Belum ada|Tidak ada)/.test(t)||p.classList.contains("em")||p.closest(".doc"))return;
 const lo=t.toLowerCase(),m=EMI.find(x=>lo.includes(x[0]))||[0,"more"];p.classList.add("em");p.insertAdjacentHTML("afterbegin",ic(m[1]));
 if(m[2]){const a=document.querySelector('#main button.ad[onclick^="mdOpen(\''+m[2]+'\'"]');if(a)p.insertAdjacentHTML("beforeend",'<button class="b" onclick="'+a.getAttribute("onclick")+'">'+a.textContent.trim()+"</button>")}})}
const BDG={Aktif:"ok",Lunas:"ok",Dibayar:"ok",Disetujui:"ok",Diajukan:"wr",Draf:"wr",Sebagian:"wr",Menunggak:"bd",Ditolak:"bd",Nonaktif:"",Dibatalkan:"",Dipegang:"wr"};
function badgeFx(){if(!document.querySelectorAll)return;document.querySelectorAll("#main td").forEach(td=>{if(td.children.length||td.closest(".doc"))return;const t=td.textContent.trim();if(t in BDG)td.innerHTML=`<span class="bdg ${BDG[t]}">${t}</span>`})}
