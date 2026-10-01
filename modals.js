// ===== MODAL CRUD (v0.1.032): tambah/edit master data lewat dialog modal =====
// S.md = jenis modal terbuka; id yang diedit tetap di S.eu/ec/ea/ey/eg/en/ep/epr/ecn/ek/eus (null = baru); S.rp = id untuk reset PIN
const MK={ld:"eld",cj:"ecj",jd:"ejd",nd:"end",lp:"elp",la:"ela",lr:"elr",lb:"elb",u:"eu",c:"ec",a:"ea",py:"ey",pg:"eg",n:"en",pl:"ep",pr:"epr",cn:"ecn",pk:"ek",us:"eus",rp:"rp"};
const addB=(t,k)=>`<div class="fl"><button class="b ad" onclick="mdOpen('${k}','')">${ic("plus")}<span>${t}</span></button></div>`;
const mdId=()=>S.md?(S[MK[S.md]]||""):"",mdKey=()=>S.md?S.md+"|"+mdId():"";
function mdOpen(k,id){if(!MK[k])return;const kp=(k==="lr"||k==="lb")&&S.md==="ld"?S.eld:null;for(const x in MK)S[MK[x]]=null;if(kp)S.eld=kp;S[MK[k]]=id||null;S.md=k;S.mv=null;S.mf="";S.msg="";S.fe=null;
 if(typeof document!=="undefined"&&document.activeElement)cfFrom=tKey(document.activeElement);render()}
function mdClose(){S.md=null;S.mv=null;S.fe=null;for(const x in MK)S[MK[x]]=null;render()}
function okM(){S.md=null;S.mv=null}
function openM(k,id){S.mt=k==="u"?"unit":k==="c"?"kas":"coa";mdOpen(k,id)}
function openP(id){S.mt="pihak";mdOpen("py",id)}
function openG(id){S.mt="peg";mdOpen("pg",id)}
function openK(id){S.gt="komp";mdOpen("pk",id)}
function openE(k,id){S.at=k==="ep"?"pel":"prod";mdOpen(k==="ep"?"pl":"pr",id)}
function openC(id){S.at="samb";mdOpen("cn",id)}
function editN(id){S.st="nasabah";mdOpen("n",id)}
function editAjuan(id){mdOpen("la",id)}function tolakAjuan(id){mdOpen("lr",id)}function batalAjuan(id){mdOpen("lb",id)}
function cancelM(){mdClose()}function cancelE(){mdClose()}function cancelK(){mdClose()}
const RPA=' inputmode="numeric" autocomplete="off" oninput="fmtR(this)"',EN=(e,a,b)=>e?a:b;
const MD={
 u:()=>{const e=db.business_units.find(x=>x._id===S.eu);return{t:EN(e,"Edit unit","Unit baru"),s:"saveUnit()",y:EN(e,"Simpan perubahan","Tambah unit"),
  b:fld("u-c","Kode",{value:e?e.code:"",req:1})+fld("u-n","Nama unit",{value:e?e.name:"",req:1})+fld("u-t","Jenis unit",{t:"select",hint:"Pinjaman hanya dapat dibuat pada unit berjenis Simpan Pinjam",opts:opt([["simpan_pinjam","Simpan Pinjam"],["lainnya","Lainnya"]],x=>x,e?e.type:"lainnya")})}},
 c:()=>{const e=db.cash_accounts.find(x=>x._id===S.ec);return{t:EN(e,"Edit rekening","Rekening baru"),s:"saveCash()",y:EN(e,"Simpan perubahan","Tambah rekening"),
  b:fld("c-n","Nama rekening",{value:e?e.name:"",req:1})+fld("c-t","Jenis",{t:"select",opts:["kas","bank"].map(t=>`<option${e&&e.type===t?" selected":""}>${t}</option>`).join("")})
  +fld("c-a","Akun COA"+EN(e," (tidak dapat diubah)",""),{t:"select",a:e?" disabled":"",opts:opt(db.accounts.filter(a=>postable(a)&&isAct(a)&&a.type==="asset"),a=>[a._id,a.code+" "+a.name],e?e.account_id:"")})}},
 a:()=>{const e=acc(S.ea),lk=e&&hasJ(e._id);return{t:EN(e,"Edit akun","Akun baru"),s:"saveAcc()",y:EN(e,"Simpan perubahan","Tambah akun"),
  b:fld("a-c","Kode"+EN(e," (tidak dapat diubah)"," (4 digit)"),{value:e?e.code:"",a:e?" disabled":"",req:1})+fld("a-n","Nama akun",{value:e?e.name:"",req:1})
  +fld("a-t","Tipe"+(lk?" (terkunci: akun sudah dipakai jurnal)":""),{t:"select",a:lk?" disabled":"",opts:["asset","liability","equity","revenue","expense"].map(t=>`<option${e&&e.type===t?" selected":""}>${t}</option>`).join("")})}},
 py:()=>{const e=db.parties.find(x=>x._id===S.ey),lk=e&&pRef(e._id);return{t:EN(e,"Edit pihak","Pihak baru"),s:"savePihak()",y:EN(e,"Simpan perubahan","Tambah pihak"),
  b:fld("py-t","Jenis"+(lk?" (terkunci: sudah dipakai pinjaman/penjualan)":""),{t:"select",a:lk?" disabled":"",opts:opt(Object.keys(PT),k=>[k,PT[k]],e?e.type:"pemasok")})
  +fld("py-n","Nama",{value:e?e.name:"",req:1})+fld("py-p","Telepon",{type:"tel",value:e?e.phone:""})+fld("py-a","Alamat",{value:e?e.address:""})}},
 pg:()=>{const e=db.employees.find(x=>x._id===S.eg),us=db.business_units.filter(u=>isAct(u)||(e&&e.unit_id===u._id));return{t:EN(e,"Edit pegawai","Pegawai baru"),s:"saveEmp()",y:EN(e,"Simpan perubahan","Tambah pegawai"),
  b:fld("pg-n","Nama pegawai",{value:e?e.name:"",req:1})+fld("pg-j","Jabatan",{value:e?e.position:"",req:1})
  +fld("pg-u","Unit usaha",{t:"select",opts:`<option value="">Umum (semua unit)</option>`+opt(us,u=>[u._id,u.name],e?e.unit_id:"")})
  +fld("pg-p","Telepon",{type:"tel",value:e?e.phone:""})+fld("pg-a","Alamat",{value:e?e.address:""})+fld("pg-d","Tanggal mulai bekerja",{type:"date",value:e?e.start_date:""})
  +[["g","Gaji pokok (Rp / bulan)","base_salary"],["t","Tunjangan tetap (Rp / bulan)","allowance"],["o","Potongan tetap (Rp / bulan)","deduction"]].map(([k,l,f])=>fld("pg-"+k,l,{type:"text",a:RPA,value:e&&e[f]?fm(e[f]):""})).join("")
  +(e?vEC(e):"")}},
 ld:()=>{const l=db.loans.find(x=>x._id===S.eld);if(!l)return{t:"Pinjaman",s:"mdClose()",y:"Tutup",b:"<p>Pinjaman tidak ditemukan.</p>",nf:1};return{t:l.loan_number+" · "+party(l.party_id).name,s:"mdClose()",y:"Tutup",b:vLoan(l),nf:1}},
 lp:()=>({t:"Pengajuan pinjaman baru",s:"ajukan()",y:"Ajukan",
  b:fld("l-pty","Nasabah",{t:"select",req:1,opts:opt(db.parties.filter(p=>p.type==="nasabah"&&p.status!=="nonaktif"),p=>[p._id,p.name]),hint:db.parties.some(p=>p.type==="nasabah"&&p.status!=="nonaktif")?"":"Belum ada nasabah aktif: tambahkan di sub-tab Nasabah"})
  +fld("l-u","Unit usaha",{t:"select",opts:opt(spUnits(),u=>[u._id,u.name])})+fld("l-d","Tanggal pengajuan",{type:"date",value:today(),req:1})
  +fld("l-p","Pokok (Rp)",{type:"text",a:RPA,req:1})+fld("l-r","Jasa (% per tahun)",{type:"text",a:' inputmode="decimal" autocomplete="off"',value:"12"})
  +fld("l-m","Metode jasa",{t:"select",opts:opt([["flat","Flat (dari pokok awal)"],["menurun","Menurun (dari sisa pokok)"],["anuitas","Anuitas (angsuran tetap)"]],x=>x,"flat")})
  +fld("l-t","Tenor (bulan)",{type:"text",a:' inputmode="numeric" autocomplete="off"',value:"12",req:1})}),
 la:()=>{const e=db.loans.find(x=>x._id===S.ela);if(!e)return{t:"Ubah pengajuan",s:"mdClose()",y:"Tutup",b:"<p>Pengajuan tidak ditemukan.</p>"};return{t:"Ubah pengajuan "+e.loan_number,s:"saveAjuan()",y:"Simpan perubahan",
  b:fld("la-pty","Nasabah",{t:"select",opts:opt(db.parties.filter(p=>p.type==="nasabah"&&(p.status!=="nonaktif"||p._id===e.party_id)),p=>[p._id,p.name],e.party_id)})+fld("la-u","Unit usaha",{t:"select",opts:opt(spUnits(),u=>[u._id,u.name],e.unit_id)})
  +fld("la-d","Tanggal pengajuan",{type:"date",value:e.application_date})+fld("la-p","Pokok (Rp)",{type:"text",a:RPA,value:fm(e.principal)})+fld("la-r","Jasa (% per tahun)",{type:"text",a:' inputmode="decimal" autocomplete="off"',value:e.interest_rate})
  +fld("la-m","Metode jasa",{t:"select",opts:opt([["flat","Flat (dari pokok awal)"],["menurun","Menurun (dari sisa pokok)"],["anuitas","Anuitas (angsuran tetap)"]],x=>x,e.interest_method)})+fld("la-t","Tenor (bulan)",{type:"text",a:' inputmode="numeric" autocomplete="off"',value:e.tenor})}},
 lr:()=>{const e=db.loans.find(x=>x._id===S.elr);return{t:"Tolak pengajuan"+(e?" "+e.loan_number:""),s:"saveTolak()",y:"Tolak pengajuan",b:(e?'<p class="k">'+esc(party(e.party_id).name)+" · Rp "+fm(e.principal)+"</p>":"")+fld("lr-a","Alasan penolakan",{t:"textarea",req:1})}},
 lb:()=>{const e=db.loans.find(x=>x._id===S.elb);return{t:"Batalkan pengajuan"+(e?" "+e.loan_number:""),s:"saveBatalAjuan()",y:"Batalkan pengajuan",b:(e?'<p class="k">'+esc(party(e.party_id).name)+" · Rp "+fm(e.principal)+". Nomor pinjaman tidak dipakai ulang.</p>":"")+fld("lb-a","Alasan pembatalan",{t:"textarea",req:1})}},
 cj:()=>({t:"Tambah jaminan",s:"saveJam()",y:"Tambah jaminan",b:fld("c-l","Pinjaman",{t:"select",opts:opt(db.loans,l=>[l._id,l.loan_number+" – "+party(l.party_id).name])})+fld("c-t","Jenis",{t:"select",opts:["BPKB","Sertifikat","Emas","Lainnya"].map(x=>`<option>${x}</option>`).join("")})+fld("c-d","Deskripsi",{req:1})+fld("c-v","Nilai taksiran (Rp)",{type:"text",a:RPA})+fld("c-n","No. dokumen")}),
 jd:()=>{const c=db.collaterals.find(x=>x._id===S.ejd);if(!c)return{t:"Jaminan",s:"mdClose()",y:"Tutup",b:"<p>Jaminan tidak ditemukan.</p>",nf:1};const l=db.loans.find(x=>x._id===c.loan_id),R=(k,v)=>`<div class="kv"><span class="k">${k}</span><b>${v}</b></div>`;
  return{t:c.type+" · "+l.loan_number,s:"mdClose()",y:"Tutup",nf:1,b:`<div class="ldw"><div class="lds"><span class="bdg ${c.status==="dipegang"?"wr":"ok"}">${c.status==="dipegang"?"Dipegang":"Dikembalikan"}</span><b>${rp(c.estimated_value)}</b></div><div class="kvg">${R("Pinjaman",`<a href="#" onclick="event.preventDefault();openLoan('${l._id}')">${esc(l.loan_number)}</a>`)}${R("Nasabah",esc(party(l.party_id).name))}${R("Jenis",esc(c.type))}${R("Deskripsi",esc(c.description))}${R("No. dokumen",esc(c.document_number||"-"))}${R("Status pinjaman",LS[l.status]||l.status)}</div><div class="lda">${c.status==="dipegang"?ib("check","Kembalikan","kembalikan('"+c._id+"')","s"):""}</div></div>`}},
 nd:()=>{const p=db.parties.find(x=>x._id===S.end);if(!p)return{t:"Nasabah",s:"mdClose()",y:"Tutup",b:"<p>Nasabah tidak ditemukan.</p>",nf:1};const ls=db.loans.filter(l=>l.party_id===p._id),R=(k,v)=>`<div class="kv"><span class="k">${k}</span><b>${v}</b></div>`;
  return{t:p.name,s:"mdClose()",y:"Tutup",nf:1,b:`<div class="ldw"><div class="lds"><span class="bdg ${p.status==="nonaktif"?"":"ok"}">${p.status==="nonaktif"?"Nonaktif":"Aktif"}</span></div><div class="kvg">${R("Telepon",esc(p.phone||"-"))}${R("Alamat",esc(p.address||"-"))}${R("Pinjaman",ls.length)}</div><div class="lda">${ib("edit","Edit","editN('"+p._id+"')","s")}${p.status==="nonaktif"?ib("check","Aktifkan","togN('"+p._id+"')","s"):ib("lock","Nonaktifkan","togN('"+p._id+"')","s")}</div>${ls.length?`<div class="ll">${ls.map(l=>`<button class="li" onclick="openLoan('${l._id}')"><span class="l1"><b>${esc(l.loan_number)}</b><small>${esc(unitName(l.unit_id))}</small></span><span class="l2">${l.tenor}× · ${l.interest_rate}% ${l.interest_method}</span><span class="n l3">${rp(l.principal)}</span><span class="n l4"></span><span class="l5">${lbadge(l)}</span><span class="l6">${ic("next")}</span></button>`).join("")}</div>`:`<p class="k">Belum ada pinjaman.</p>`}</div>`}},
 n:()=>{const e=db.parties.find(x=>x._id===S.en);return{t:EN(e,"Edit nasabah","Nasabah baru"),s:"saveNasabah()",y:EN(e,"Simpan perubahan","Tambah nasabah"),
  b:fld("n-n","Nama nasabah",{value:e?e.name:"",req:1})+fld("n-p","Telepon",{type:"tel",value:e?e.phone:""})+fld("n-a","Alamat",{value:e?e.address:""})}},
 pl:()=>{const e=db.parties.find(x=>x._id===S.ep);return{t:EN(e,"Edit pelanggan","Pelanggan baru"),s:"savePel()",y:EN(e,"Simpan perubahan","Tambah pelanggan"),
  b:fld("pl-n","Nama pelanggan",{value:e?e.name:"",req:1})+fld("pl-p","Telepon",{type:"tel",value:e?e.phone:""})+fld("pl-a","Alamat",{value:e?e.address:""})}},
 pr:()=>{const e=db.products.find(x=>x._id===S.epr);return{t:EN(e,"Edit produk","Produk baru"),s:"saveProd()",y:EN(e,"Simpan perubahan","Tambah produk"),
  b:fld("pr-n","Nama",{value:e?e.name:"",req:1})+fld("pr-s","Satuan (mis. m³, bulan)",{value:e?e.unit:"m³"})+fld("pr-h","Harga per satuan (Rp)",{type:"text",a:RPA,value:e?fm(e.price):"",req:1})
  +fld("pr-u","Unit usaha",{t:"select",opts:opt(db.business_units,u=>[u._id,u.name],e?e.unit_id:"UNIT-002")})
  +fld("pr-a","Akun pendapatan",{t:"select",opts:opt(db.accounts.filter(a=>postable(a)&&a.type==="revenue"),a=>[a._id,a.code+" "+a.name],e?e.revenue_account:"ACC4200")})}},
 cn:()=>{const e=db.water_connections.find(c=>c._id===S.ecn),used=e&&db.water_readings.some(r=>r.conn_id===e._id),pel=db.parties.filter(p=>p.type==="pelanggan"&&isAct(p));return{t:EN(e,"Edit sambungan","Sambungan baru"),s:"saveConn()",y:EN(e,"Simpan perubahan","Tambah sambungan"),
  b:(e?fld("cn-x","Pelanggan",{value:cust(e.party_id).name,a:" disabled"}):fld("cn-c","Pelanggan",{t:"select",req:1,opts:`<option value="">Pilih pelanggan</option>`+opt(pel,p=>[p._id,p.name])}))
  +fld("cn-m","Nomor meter",{value:e?e.meter_no:"",req:1})
  +fld("cn-a","Angka meter saat dipasang / awal pakai",{type:"text",a:' inputmode="decimal" autocomplete="off"'+(used?" readonly":""),value:e?qf(e.initial):""})
  +fld("cn-d","Tanggal pasang",{type:"date",value:e?e.installed:today(),req:1})}},
 pk:()=>{const e=PK(S.ek),lk=e&&kUsed(e._id);return{t:EN(e,"Edit komponen","Komponen baru"),s:"saveComp()",y:EN(e,"Simpan perubahan","Tambah komponen"),
  b:fld("pk-n","Nama komponen",{value:e?e.name:"",req:1})+fld("pk-t","Jenis"+(lk?" (terkunci: sudah dipakai)":""),{t:"select",a:lk?" disabled":"",opts:opt(Object.keys(PKT),k=>[k,PKT[k]],e?e.type:"earning")})}},
 us:()=>{const e=db.users.find(x=>x._id===S.eus);return{t:EN(e,"Edit pengguna","Tambah pengguna"),s:"saveUser()",y:EN(e,"Simpan","Tambah pengguna"),
  b:fld("us-n","Nama *",{a:' autocomplete="off"',value:e?e.name:"",req:1})+fld("us-r","Peran *",{t:"select",req:1,opts:opt(db.roles.filter(r=>r.status!=="nonaktif"),r=>[r._id,r.name],e?e.role_id:"ROL-PTU")})
  +`<label>Unit tugas (kosong = semua unit; bila diisi, pengguna hanya bisa memilih dan mencatat di unit ini)</label>`
  +db.business_units.map(x=>`<div><label class="ck"><input type="checkbox" id="us-u-${x._id}"${e&&(e.unit_ids||[]).includes(x._id)?" checked":""}> ${esc(x.name)}</label></div>`).join("")
  +(e?"":`<label>PIN awal (4–8 angka; wajib diganti saat masuk pertama) *</label>${PW("us-p","new-password")}<label>Ulangi PIN awal *</label>${PW("us-p2","new-password")}`)}},
 rp:()=>{const u=db.users.find(x=>x._id===S.rp)||{name:""};return{t:"Reset PIN — "+u.name,s:"resetPin()",y:"Reset PIN",
  b:`<p class="k">Isi PIN sementara. Pengguna wajib menggantinya saat masuk; kunci akun dibuka.</p><label>PIN sementara (4–8 angka)</label>${PW("rp-p","new-password")}`}}
};
function mdHtml(){if(!S.md||!MD[S.md])return"";let f;try{f=MD[S.md]()}catch(e){return""}
 return`<div class="mb" tabindex="-1"><div class="mh"><h3 id="fm-t">${esc(f.t)}</h3><button class="ib s" aria-label="Tutup" title="Tutup" onclick="mdClose()">${ic("x")}</button></div><div class="mc">${f.b}</div>${f.nf?"":`<div class="mf"><button class="b s" onclick="mdClose()">Batal</button><button class="b" onclick="${f.s}">${esc(f.y)}</button></div>`}</div>`}
const MSK=/^(INPUT|SELECT|TEXTAREA)$/;
// isian modal dijaga lewat render ulang (mis. galat validasi): disalin sebelum render, dipulihkan sesudahnya; PIN tidak pernah disalin
function mdSnap(){if(!S.md||!document.querySelectorAll||S.mo!==mdKey())return;const v={};let n=0;
 document.querySelectorAll("#fm [id]").forEach(e=>{if(!MSK.test(e.tagName)||e.type==="file"||e.type==="password"||NB.includes(e.id))return;v[e.id]=e.type==="checkbox"?e.checked:e.value;n++});
 const a=document.activeElement;S.mf=a&&a.id&&a.closest&&a.closest("#fm")?a.id:"";if(n)S.mv={k:mdKey(),v}}
function mdLock(on){if(document.body&&document.body.classList)document.body.classList.toggle("mo",!!on)}
function mdr(){const el=$("#fm");if(!el)return;const k=mdKey(),was=S.mo||"";
 if(!S.md||!MD[S.md]){el.className="";el.innerHTML="";S.mo="";S.mv=null;mdLock(0);if(was)cfBack();return}
 el.innerHTML=mdHtml();el.className="on";mdLock(1);
 if(S.mv&&S.mv.k===k&&document.querySelectorAll)document.querySelectorAll("#fm [id]").forEach(e=>{if(!(e.id in S.mv.v))return;const v=S.mv.v[e.id];
  if(e.type==="checkbox")e.checked=!!v;else if(e.tagName==="SELECT"){if([...e.options].some(o=>o.value===v||o.text===v))e.value=v}else e.value=v});
 S.mo=k;if(S.md==="ld"){const sm=$("#sp-mode");if(sm&&S.pm)sm.value=S.pm;const sa=$("#sp-amt");if(sa&&S.pm==="full"&&sm&&S.sa==="")sa.value="";amtSync()}
 if(!S.fe&&!S.cf&&el.querySelector){const co=typeof matchMedia==="function"&&matchMedia("(pointer:coarse)").matches,f=was===k&&S.mf?$("#"+S.mf):co&&was!==k?el.querySelector(".mb"):el.querySelector(".mc input:not([disabled]):not([type=checkbox]),.mc select:not([disabled]),.mc textarea:not([disabled])");if(f&&f.focus){if(was!==k){const c=el.querySelector(".mc");if(c)c.scrollTop=0}f.focus({preventScroll:was!==k})}}vvFit()}
if(document.addEventListener)document.addEventListener("keydown",e=>{if(S.cf||!S.md)return;const el=$("#fm");if(!el||!el.querySelectorAll)return;
 if(e.key==="Escape"){e.preventDefault();mdClose();return}
 if(e.key==="Enter"&&e.target&&e.target.tagName==="INPUT"&&e.target.type!=="checkbox"&&!(e.target.closest&&e.target.closest(".card"))){e.preventDefault();const b=el.querySelector(".mf .b:last-child");if(b)b.click();return}
 if(e.key==="Tab"){const f=[...el.querySelectorAll("button,input,select,textarea")].filter(x=>!x.disabled&&x.getClientRects().length);if(!f.length)return;const i=f.indexOf(document.activeElement);
  if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&(i<0||i===f.length-1)){e.preventDefault();f[0].focus()}}});

