// ===== RBAC RILIS 3 (v1.1.366): maker-checker — antrean persetujuan transaksi manual, jurnal manual, dan pembatalan =====
// Hanya berlaku saat Mode Pengguna aktif. Petugas tanpa izin trx.setujui yang mencatat nominal >= ambang tidak langsung diposting:
// permintaannya masuk antrean (diajukan) dan baru diposting setelah orang lain yang punya izin trx.setujui menyetujui. Pembuat tidak boleh menyetujui permintaannya sendiri.
let APV_RUN=false;
const APV_K={trx:"Transaksi manual (masuk, keluar, pindah kas, jurnal 2 akun)",jnl:"Jurnal multi-baris",void:"Pembatalan transaksi"},
 apvCfg=()=>{const c=(db.settings||{}).apv||{};return{min:Math.max(0,Math.round(+c.min||0)),kinds:Object.assign({trx:true,jnl:true,void:true},c.kinds||{})}},
 apvList=()=>db.approvals||[],
 apvPend=()=>apvList().filter(a=>a.status==="diajukan");
function apvNeed(kind,amount){if(APV_RUN||!rbacOn()||!curUser())return false;const c=apvCfg();return c.min>0&&c.kinds[kind]!==false&&amount>=c.min&&!can("trx.setujui")}
function apvNo(){const y=today().slice(0,4),pre="APV-"+y+"-";let mx=0;apvList().forEach(a=>{if(typeof a.no==="string"&&a.no.startsWith(pre)){const n=+a.no.slice(pre.length);if(n>mx)mx=n}});return pre+String(mx+1).padStart(4,"0")}
function apvQueue(kind,pay,amount,desc){const u=curUser(),a={_id:uid("APV"),no:apvNo(),kind,payload:pay,amount:Math.round(amount),desc:String(desc||"-").slice(0,160),by_id:u._id,by:u.name,at:now(),status:"diajukan"};
 (db.approvals=db.approvals||[]).push(a);audit("apv_ajukan","apv",a._id,a.no+" · "+APV_K[kind==="post"?(pay.jnl?"jnl":"trx"):"void"]+" · Rp "+a.amount.toLocaleString("id-ID")+" · "+a.desc);save();return a}
// kembalikan true bila permintaan diantrekan (pemanggil berhenti, tidak memposting)
function apvGate(kind,pay,amount,desc){if(!apvNeed(pay&&pay.jnl?"jnl":kind==="void"?"void":"trx",amount))return false;const a=apvQueue(kind,pay,amount,desc);S.msg="Diajukan untuk persetujuan ("+a.no+"): nominal Rp "+a.amount.toLocaleString("id-ID")+" di atas ambang. Belum diposting.";return true}
function apvSetuju(id){try{if(noPerm("trx.setujui"))return;const a=apvList().find(x=>x._id===id);if(!a||a.status!=="diajukan")throw Error("Permintaan tidak ada atau sudah diproses");
 const u=curUser();if(rbacOn()&&u&&a.by_id===u._id)throw Error("Anda tidak boleh menyetujui permintaan Anda sendiri; minta orang lain yang berwenang");
 APV_RUN=true;try{
  if(a.kind==="post"){const p=a.payload,t=post({type:p.type,date:p.date,unit:p.unit,desc:p.desc,lines:p.lines,project_id:p.project_id});a.tx_id=t._id}
  else{const t=db.transactions.find(x=>x._id===a.payload.id);if(!t||t.status==="voided")throw Error("Transaksi sudah dibatalkan atau tidak ada");const m0=S.msg;S.msg="";(voidT.__f||voidT)(a.payload.id);if(/^⚠/.test(S.msg||"")){const m=S.msg.slice(2);S.msg=m0;throw Error(m)}if(t.status!=="voided")throw Error("Pembatalan tidak berhasil");a.tx_id=t._id}
 }finally{APV_RUN=false}
 a.status="disetujui";a.decided_by=u?u.name:"";a.decided_id=u?u._id:"";a.decided_at=now();audit("apv_setuju","apv",a._id,a.no+" disetujui · Rp "+a.amount.toLocaleString("id-ID"));save();S.msg="Disetujui dan diposting: "+a.no}catch(e){S.msg="⚠ "+e.message}render()}
function apvTolak(id){try{if(noPerm("trx.setujui"))return;const a=apvList().find(x=>x._id===id);if(!a||a.status!=="diajukan")throw Error("Permintaan tidak ada atau sudah diproses");
 const u=curUser(),n=((typeof $==="function"&&$("#apv-n"+id))||{}).value||"";if(n.trim().length<3)throw fe("apv-n"+id,"Isi alasan penolakan (minimal 3 huruf)");
 a.status="ditolak";a.note=n.trim().slice(0,160);a.decided_by=u?u.name:"";a.decided_id=u?u._id:"";a.decided_at=now();audit("apv_tolak","apv",a._id,a.no+" ditolak: "+a.note);save();S.msg="Ditolak: "+a.no;S.fe=null}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function apvBatal(id){try{const a=apvList().find(x=>x._id===id),u=curUser();if(!a||a.status!=="diajukan")throw Error("Permintaan tidak ada atau sudah diproses");if(rbacOn()&&u&&a.by_id!==u._id&&!can("trx.setujui"))throw Error("Hanya pembuat permintaan yang dapat membatalkannya");
 a.status="dibatalkan";a.decided_by=u?u.name:"";a.decided_at=now();audit("apv_batal","apv",a._id,a.no+" dibatalkan pembuatnya");save();S.msg="Permintaan "+a.no+" ditarik kembali"}catch(e){S.msg="⚠ "+e.message}render()}
function apvSet(){try{if(noPerm("setelan.kelola"))return;const m=Math.round(+pn(($("#apv-min")||{value:"0"}).value||"0")||0);if(m<0)throw fe("apv-min","Ambang tidak boleh negatif");
 const k={};for(const x in APV_K)k[x]=!!(($("#apv-k-"+x)||{}).checked);db.settings.apv={min:m,kinds:k};audit("setting","settings","apv","Ambang persetujuan Rp "+m.toLocaleString("id-ID")+" · "+Object.keys(k).filter(x=>k[x]).join(","));save();S.msg=m>0?"Aturan persetujuan disimpan: nominal mulai Rp "+m.toLocaleString("id-ID")+" perlu persetujuan":"Persetujuan dimatikan (ambang 0)";S.fe=null}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function apvBd(s){return`<span class="bdg ${s==="disetujui"?"ok":s==="ditolak"?"ng":s==="diajukan"?"wr":""}">${s}</span>`}
function apvRow(a){const txt=a.kind==="void"?"Batalkan transaksi":"Posting transaksi";return`<div class="upr"><span class="upm"><b>${esc(a.no)} · ${esc(txt)}</b><small>${esc(a.desc)} · oleh ${esc(a.by)} · ${esc(String(a.at).slice(0,16).replace("T"," "))}${a.note?" · alasan: "+esc(a.note):""}</small></span><span class="upa"><b>${rp(a.amount)}</b>${apvBd(a.status)}</span></div>`}
function apvAct(a){const u=curUser(),ok2=can("trx.setujui"),own=u&&a.by_id===u._id;return`<div class="upr"><span class="upm"><b>${esc(a.no)} · ${esc(a.kind==="void"?"Batalkan transaksi":"Posting transaksi")}</b><small>${esc(a.desc)} · oleh ${esc(a.by)} · ${esc(String(a.at).slice(0,16).replace("T"," "))}</small></span><span class="upa"><b>${rp(a.amount)}</b></span></div>
 <div class="fl">${ok2&&!own?`<button class="b" onclick="apvSetuju('${a._id}')">Setujui dan posting</button><input type="text" id="apv-n${a._id}" maxlength="160" aria-label="Alasan penolakan ${esc(a.no)}" placeholder="Alasan bila ditolak"><button class="b s" onclick="apvTolak('${a._id}')">Tolak</button>`:ok2?`<span class="k">Anda pembuat permintaan ini; menunggu orang lain.</span>`:""}${own?`<button class="b s" onclick="apvBatal('${a._id}')">Tarik kembali</button>`:""}</div>`}
function apvQueueHtml(){const on=rbacOn(),u=curUser(),ok2=can("trx.setujui"),L=apvList().slice().sort((a,b)=>String(b.at).localeCompare(String(a.at))),P=L.filter(a=>a.status==="diajukan"),H=L.filter(a=>a.status!=="diajukan").slice(0,15),shown=ok2||!on?P:P.filter(a=>u&&a.by_id===u._id);
 return dcard("Antrean persetujuan",shown.length?shown.length+" menunggu":"Kosong",shown.length?shown.map(apvAct).join(""):`<p class="k">Tidak ada permintaan yang menunggu.${on?"":" Mode Pengguna belum aktif, jadi persetujuan tidak berlaku."}</p>`,"")+(H.length?dcard("Riwayat keputusan",H.length+" terakhir",`<div class="upl">${H.map(apvRow).join("")}</div>`,""):"")}
function vApv(){return`<h2>Persetujuan Transaksi</h2>`+apvQueueHtml()}
function vApvRules(){const c=apvCfg();return`<h2>Aturan Persetujuan</h2>`+dcard("Aturan persetujuan","Berlaku bila Mode Pengguna aktif",`<p class="k">Petugas tanpa izin <b>Menyetujui transaksi</b> yang mencatat nominal sama dengan atau di atas ambang tidak langsung memposting; permintaan masuk antrean dan perlu disetujui orang lain (Direktur). Isi 0 untuk mematikan.</p>
${fld("apv-min","Ambang nominal (Rp)",{type:"text",a:RPA,value:c.min?fm(c.min):"0",hint:"Nominal total transaksi atau total debit jurnal"})}
${Object.entries(APV_K).map(([k,t])=>`<label class="chk"><input type="checkbox" id="apv-k-${k}" ${c.kinds[k]!==false?"checked":""}> ${esc(t)}</label>`).join("")}
<div class="fl"><button class="b" onclick="apvSet()">Simpan aturan</button></div>`,"")+apvQueueHtml()}
MK.apv="eapv";
MD.apv=()=>({t:"Antrean persetujuan",s:"mdClose()",y:"Tutup",nf:1,b:apvQueueHtml()});
