// ===== RINGKASAN NASABAH YANG DAPAT DIBAGIKAN (v1.1.015): teks posisi pinjaman dan tabungan untuk WhatsApp/salin =====
// Data = posisi saat teks dibuat (snapshot). Berisi data pribadi dan keuangan: kirim hanya ke nasabah yang bersangkutan.
function nsText(pid){const p=db.parties.find(x=>x._id===pid);if(!p)return"";const t=today(),L=[],ln=db.loans.filter(l=>l.party_id===pid&&l.status==="active"),sv=(db.savings_accounts||[]).filter(a=>a.party_id===pid&&a.status==="aktif");
 L.push("*"+bnm()+"*","Ringkasan nasabah — "+p.name,"Posisi per "+t,"");
 L.push("*PINJAMAN*");
 if(!ln.length)L.push("Tidak ada pinjaman aktif.");
 ln.forEach(l=>{const ins=insL(l._id).sort((a,b)=>a.installment_number-b.installment_number),op=ins.filter(i=>i.status!=="paid"),od=op.filter(i=>i.due_date<t),nx=op.find(i=>i.due_date>=t),pk=ins.reduce((s,i)=>s+i.principal_due-i.principal_paid,0);
  L.push(l.loan_number+" · sisa pokok Rp "+fm(pk)+" · "+op.length+" dari "+ins.length+" angsuran belum lunas");
  if(od.length){const tot=od.reduce((s,i)=>s+owed(i,t).total,0);L.push("  ⚠ Tunggakan "+od.length+" angsuran, total Rp "+fm(tot)+" (termasuk denda)")}
  if(nx)L.push("  Angsuran berikut: ke-"+nx.installment_number+", jatuh tempo "+nx.due_date+", tagihan Rp "+fm(owed(nx,t).total))});
 L.push("","*TABUNGAN*");
 if(!sv.length)L.push("Tidak ada rekening tabungan aktif.");
 sv.forEach(a=>{L.push(a.number+" ("+a.product+") · saldo Rp "+fm(savBal(a._id)));const m=savLive(a._id).slice(-3).reverse();m.forEach(x=>L.push("  "+x.date+" "+SAV_T[x.type]+" "+(SAV_SIGN[x.type]<0?"−":"+")+"Rp "+fm(x.amount)))});
 L.push("","Data per tanggal di atas; bila ada selisih dengan catatan Anda, hubungi pengurus "+bnm()+".");return L.join("\n")}
const waNo=s=>{let n=String(s||"").replace(/\D/g,"");if(n.startsWith("0"))n="62"+n.slice(1);else if(n.startsWith("8"))n="62"+n;return n.length>=9?n:""};
MK.ns="ens";
MD.ns=()=>{const p=db.parties.find(x=>x._id===S.ens);if(!p)return{t:"Ringkasan nasabah",s:"mdClose()",y:"Tutup",b:"<p>Nasabah tidak ditemukan.</p>",nf:1};
 return{t:"Ringkasan · "+p.name,s:"mdClose()",y:"Tutup",nf:1,b:`<p class="k">Teks ini berisi data pinjaman dan tabungan nasabah pada saat ini. Kirim hanya ke nasabah yang bersangkutan.</p><pre id="ns-t" class="ns-t">${esc(nsText(p._id))}</pre><div class="lda">${ib("check","Salin","nsCopy('"+p._id+"')")}${waNo(p.phone)?ib("out","WhatsApp","nsWa('"+p._id+"')"):""}${typeof navigator!=="undefined"&&navigator.share?ib("out","Bagikan","nsShare('"+p._id+"')","s"):""}</div>${waNo(p.phone)?"":'<p class="k">Nomor telepon nasabah belum diisi atau tidak valid, sehingga tombol WhatsApp tidak tersedia.</p>'}`}};
function nsLog(id,how){audit("share","party",id,"ringkasan nasabah ("+how+")");save()}
function nsCopy(id){const x=nsText(id);try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(x).then(()=>{S.msg="Ringkasan disalin";render()},()=>{S.msg="⚠ Gagal menyalin; tekan lama teks untuk menyalin manual";render()});else throw 0}catch(e){S.msg="⚠ Penyalinan tidak didukung; tekan lama teks untuk menyalin manual";render()}nsLog(id,"salin")}
function nsWa(id){const p=db.parties.find(x=>x._id===id),n=p&&waNo(p.phone);if(!n){S.msg="⚠ Nomor telepon nasabah tidak valid";render();return}nsLog(id,"WhatsApp");window.open("https://wa.me/"+n+"?text="+encodeURIComponent(nsText(id)),"_blank","noopener")}
function nsShare(id){nsLog(id,"bagikan");try{navigator.share({title:"Ringkasan nasabah",text:nsText(id)}).catch(()=>{})}catch(e){}}

// ===== PENGINGAT JATUH TEMPO / TUNGGAKAN (v1.1.070): teks dari templat yang dapat diatur =====
const REM_D={due:"Yth. Bapak/Ibu {nama}, kami mengingatkan angsuran ke-{ke} pinjaman {no} sebesar Rp {jumlah} jatuh tempo pada {tgl}. Terima kasih. — {bumdes}",late:"Yth. Bapak/Ibu {nama}, angsuran pinjaman {no} menunggak {hari} hari ({n} angsuran), total Rp {jumlah} termasuk denda Rp {denda}. Mohon segera dibayar atau hubungi pengurus. — {bumdes}"},REM_K=["nama","no","ke","tgl","jumlah","hari","n","denda","bumdes"];
const remTpl=k=>{const t=(db.settings.sp_rem||{})[k];return typeof t==="string"&&t.trim()?t:REM_D[k]};
function remKind(l,d){d=d||today();if(!l||l.status!=="active")return null;const op=insL(l._id).filter(i=>i.status!=="paid").sort((a,b)=>a.installment_number-b.installment_number);if(op.some(i=>i.due_date<d))return"late";const nx=op[0];return nx&&dayDiff(nx.due_date,d)<=7?"due":null}
function remText(id,d){d=d||today();const l=db.loans.find(x=>x._id===id),k=remKind(l,d);if(!k)return"";const p=party(l.party_id),op=insL(l._id).filter(i=>i.status!=="paid").sort((a,b)=>a.installment_number-b.installment_number);let v;
 if(k==="late"){const od=op.filter(i=>i.due_date<d),w=od.map(i=>owed(i,d)),mx=Math.max(...od.map(i=>dayDiff(d,i.due_date)));v={hari:mx,n:od.length,jumlah:fm(w.reduce((s,x)=>s+x.total,0)),denda:fm(w.reduce((s,x)=>s+x.pen,0)),ke:od[0].installment_number,tgl:od[0].due_date}}
 else{const i=op[0];v={ke:i.installment_number,tgl:i.due_date,jumlah:fm(owed(i,d).total),hari:0,n:1,denda:"0"}}
 return remTpl(k).replace(/\{(\w+)\}/g,(m,x)=>x==="nama"?p.name:x==="no"?l.loan_number:x==="bumdes"?bnm():(x in v?String(v[x]):m))}
function setRemTpl(k,v){try{if(!REM_D[k])throw Error("Templat tidak dikenal");v=String(v||"").trim();if(v.length>600)throw Error("Maksimal 600 karakter");const bad=[...v.matchAll(/\{(\w+)\}/g)].map(m=>m[1]).filter(x=>!REM_K.includes(x));if(bad.length)throw Error("Kode tidak dikenal: {"+bad[0]+"}. Yang tersedia: "+REM_K.map(x=>"{"+x+"}").join(" "));
 db.settings.sp_rem=Object.assign({},db.settings.sp_rem);if(v&&v!==REM_D[k])db.settings.sp_rem[k]=v;else delete db.settings.sp_rem[k];audit("setting","settings","sp_rem","Templat pengingat "+(k==="due"?"jatuh tempo":"tunggakan")+(v?" diubah":" dikembalikan"));save();S.msg="Templat pengingat disimpan"}catch(e){S.msg="⚠ "+e.message}render()}
MK.rm="erm";
MD.rm=()=>{const l=db.loans.find(x=>x._id===S.erm),t=l?remText(l._id):"",p=l&&party(l.party_id);if(!l||!t)return{t:"Pengingat",s:"mdClose()",y:"Tutup",b:"<p>Tidak ada pengingat untuk pinjaman ini (tidak aktif, atau belum jatuh tempo dalam 7 hari).</p>",nf:1};
 return{t:"Pengingat · "+p.name,s:"mdClose()",y:"Tutup",nf:1,b:`<p class="k">Teks dibuat dari templat di Setelan. Kirim hanya ke nasabah yang bersangkutan.</p><pre id="rm-t" class="ns-t">${esc(t)}</pre><div class="lda">${ib("check","Salin","remCopy('"+l._id+"')")}${waNo(p.phone)?ib("out","WhatsApp","remWa('"+l._id+"')"):""}${typeof navigator!=="undefined"&&navigator.share?ib("out","Bagikan","remShare('"+l._id+"')","s"):""}</div>${waNo(p.phone)?"":'<p class="k">Nomor telepon nasabah belum diisi atau tidak valid, sehingga tombol WhatsApp tidak tersedia.</p>'}`}};
function remLog(id,how){audit("share","loan",id,"pengingat ("+how+")");save()}
function remCopy(id){const x=remText(id);try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(x).then(()=>{S.msg="Pengingat disalin";render()},()=>{S.msg="⚠ Gagal menyalin; tekan lama teks untuk menyalin manual";render()});else throw 0}catch(e){S.msg="⚠ Penyalinan tidak didukung; tekan lama teks untuk menyalin manual";render()}remLog(id,"salin")}
function remWa(id){const l=db.loans.find(x=>x._id===id),n=l&&waNo(party(l.party_id).phone);if(!n){S.msg="⚠ Nomor telepon nasabah tidak valid";render();return}remLog(id,"WhatsApp");window.open("https://wa.me/"+n+"?text="+encodeURIComponent(remText(id)),"_blank","noopener")}
function remShare(id){remLog(id,"bagikan");try{navigator.share({title:"Pengingat angsuran",text:remText(id)}).catch(()=>{})}catch(e){}}
function remBox(){const L=db.loans.filter(l=>(S.unit==="all"||l.unit_id===S.unit)&&remKind(l)).map(l=>({l,k:remKind(l)})).sort((a,b)=>(a.k==="late"?0:1)-(b.k==="late"?0:1));if(!L.length)return"";
 return dcard("Pengingat penagihan","Angsuran menunggak atau jatuh tempo dalam 7 hari",`<div class="upl">${L.map(({l,k},n)=>{const nm=party(l.party_id).name;return`<div class="upr rmr"><span class="bi" style="background:var(--c${n%6+1})" aria-hidden="true">${esc((nm||"?").trim().charAt(0).toUpperCase())}</span><span class="upm"><b>${esc(nm)}</b><small>${esc(l.loan_number)}</small></span><span class="upa">${k==="late"?'<span class="bdg bd">Menunggak</span>':'<span class="bdg wr">Jatuh tempo ≤ 7 hari</span>'}${ib("out","Pengingat","mdOpen('rm','"+l._id+"')","s")}</span></div>`}).join("")}</div><p class="k">Teks mengikuti templat di Setelan. Tombol Salin, WhatsApp, atau Bagikan ada di dalam.</p>`)}

// ===== v1.1.186: pengingat tagihan air yang belum dibayar (UA-11): teks untuk WhatsApp, salin, atau bagikan =====
// Isi: semua piutang pelanggan yang belum lunas pada saat teks dibuat (snapshot). Berisi data keuangan pribadi: kirim hanya ke pelanggan yang bersangkutan.
MK.ar="ear";
const arList=pid=>db.sales.filter(x=>notDg(x)&&x.party_id===pid&&x.status==="posted"&&owedS(x)>0.005).sort((a,b)=>String(a.bill?a.bill.due:a.date).localeCompare(String(b.bill?b.bill.due:b.date)));
function arText(pid){const p=db.parties.find(x=>x._id===pid),L=p?arList(pid):[];if(!L.length)return"";const t=today(),T=["*"+bnm()+"*","Pengingat tagihan air","","Yth. Bapak/Ibu "+p.name+",","Kami mengingatkan tagihan berikut belum dibayar:"];let tot=0,fine=0;
 L.forEach(x=>{const o=owedS(x),lf=x.bill?lateFine(x,t,o):null;tot+=o;if(lf>0)fine+=lf;
  if(x.bill){const dl=Math.round((Date.parse(t)-Date.parse(x.bill.due))/864e5);T.push("- Air "+x.bill.period+" ("+x.sale_number+"): Rp "+fm(o)+" · jatuh tempo "+tglS(x.bill.due)+(dl>0?", terlambat "+dl+" hari":""))}
  else T.push("- "+(x.opening?"Saldo awal piutang":"Layanan")+" "+x.sale_number+": Rp "+fm(o)+" · tanggal "+tglS(x.date))});
 T.push("","Total yang belum dibayar: Rp "+fm(tot));if(fine>0)T.push("Perkiraan denda keterlambatan bila dibayar hari ini: Rp "+fm(fine));
 T.push("","Mohon segera dibayar. Abaikan pesan ini bila sudah membayar. Terima kasih.");return T.join("\n")}
MD.ar=()=>{const p=db.parties.find(x=>x._id===S.ear),x=arText(S.ear);if(!p||!x)return{t:"Pengingat tagihan",s:"mdClose()",y:"Tutup",b:"<p>Tidak ada tagihan yang belum dibayar.</p>",nf:1};
 return{t:"Pengingat · "+p.name,s:"mdClose()",y:"Tutup",nf:1,b:`<p class="k">Teks berisi tagihan pelanggan pada saat ini. Kirim hanya ke pelanggan yang bersangkutan.</p><pre id="ar-t" class="ns-t">${esc(x)}</pre><div class="lda">${ib("check","Salin","arCopy('"+p._id+"')")}${waNo(p.phone)?ib("out","WhatsApp","arWa('"+p._id+"')"):""}${typeof navigator!=="undefined"&&navigator.share?ib("out","Bagikan","arShare('"+p._id+"')","s"):""}</div>${waNo(p.phone)?"":'<p class="k">Nomor telepon pelanggan belum diisi atau tidak valid, sehingga tombol WhatsApp tidak tersedia.</p>'}`}};
function arLog(id,how){audit("share","party",id,"pengingat tagihan air ("+how+")");save()}
function arCopy(id){const x=arText(id);try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(x).then(()=>{S.msg="Pengingat disalin";render()},()=>{S.msg="⚠ Gagal menyalin; tekan lama teks untuk menyalin manual";render()});else throw 0}catch(e){S.msg="⚠ Penyalinan tidak didukung; tekan lama teks untuk menyalin manual";render()}arLog(id,"salin")}
function arWa(id){const p=db.parties.find(x=>x._id===id),n=p&&waNo(p.phone);if(!n){S.msg="⚠ Nomor telepon pelanggan tidak valid";render();return}arLog(id,"WhatsApp");window.open("https://wa.me/"+n+"?text="+encodeURIComponent(arText(id)),"_blank","noopener")}
function arShare(id){arLog(id,"bagikan");try{navigator.share({title:"Pengingat tagihan air",text:arText(id)}).catch(()=>{})}catch(e){}}

// ===== v1.1.206: tagihan satu periode: cetak semua nota (A4) dan kirim lewat WhatsApp =====
const tgBills=per=>db.sales.filter(x=>x.status==="posted"&&x.bill&&x.bill.period===per&&(S.unit==="all"||x.unit_id===S.unit)).sort((a,b)=>{const ca=wConn(a.bill.conn_id),cb=wConn(b.bill.conn_id);if(S.wo==="alamat"){const k=String(cust(a.party_id).address||"").localeCompare(String(cust(b.party_id).address||""),"id",{numeric:true});if(k)return k}return String(ca.meter_no||a.bill.meter).localeCompare(String(cb.meter_no||b.bill.meter),"id",{numeric:true})});
function vTagihM(per){const L=tgBills(per),bar=docBar(0);
 if(!L.length)return`${bar}<p class="k">Belum ada tagihan untuk periode ${esc(per)}.</p>`;
 const sOw=L.reduce((t,x)=>t+owedS(x),0),sT=L.reduce((t,x)=>t+x.total,0),
  rows=L.map((x,i)=>{const p=cust(x.party_id),o=owedS(x),wa=waNo(p.phone);return`<div class="upr alr"><span class="upm"><b>${esc(p.name)}</b><small>Meter ${esc(x.bill.meter||"")} · ${qf(x.bill.usage)} m³ · ${rp(x.total)}${o>0.005?" · sisa "+rp(o):""}</small></span><span class="upa">${o>0.005?(wa?ib("out","WhatsApp","tgWa('"+x._id+"')","s")+ib("check","Salin","tgCopy('"+x._id+"')","s"):'<small class="smw">Tanpa nomor HP</small>'):'<span class="bdg ok">Lunas</span>'}</span></div>`}).join("");
 return`${bar}<div class="noprint">${dcard("Tagihan "+esc(per),L.length+" nota · total "+rp(sT)+" · belum dibayar "+rp(sOw),`<p class="k">Tekan Cetak untuk mencetak semua nota di bawah (satu nota per halaman A4). Tombol WhatsApp membuka pesan berisi tagihan pelanggan yang bersangkutan; kirim manual dari WhatsApp Anda.</p><div class="fl"><select aria-label="Urutan nota" onchange="S.wo=this.value;render()"><option value="">Urut no meter</option><option value="alamat"${S.wo==="alamat"?" selected":""}>Kelompok per alamat</option></select></div><div class="upl">${rows}</div>`,"")}</div>${L.map(x=>`<div class="tgp">${tagihBody(x,0)}</div>`).join("")}`}
function tgText(id){const x=db.sales.find(q=>q._id===id);if(!x||!x.bill||x.status!=="posted")return"";const b=x.bill,p=cust(x.party_id),o=owedS(x),T=["*"+bnm()+"*","Tagihan air periode "+b.period,"","Yth. Bapak/Ibu "+p.name+",","Meter "+(b.meter||"")+" · pemakaian "+qf(b.usage)+" m³"+(b.est?" (taksiran)":""),"Total tagihan: Rp "+fm(x.total)];
 if(paidOf(x)>0.005)T.push("Sudah dibayar: Rp "+fm(paidOf(x)));T.push("Sisa yang harus dibayar: Rp "+fm(o),"Jatuh tempo: "+tglS(b.due),"","Mohon dibayar sebelum jatuh tempo. Abaikan pesan ini bila sudah membayar. Terima kasih.");return T.join("\n")}
function tgLog(x,how){audit("share","party",x.party_id,"tagihan air "+x.bill.period+" ("+how+")");save()}
function tgWa(id){const x=db.sales.find(q=>q._id===id),p=x&&cust(x.party_id),n=p&&waNo(p.phone);if(!x||!x.bill){return}if(!n){S.msg="⚠ Nomor telepon pelanggan tidak valid";render();return}tgLog(x,"WhatsApp");window.open("https://wa.me/"+n+"?text="+encodeURIComponent(tgText(id)),"_blank","noopener")}
function tgCopy(id){const x=db.sales.find(q=>q._id===id);if(!x||!x.bill)return;const t=tgText(id);try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(()=>{S.msg="Teks tagihan disalin";render()},()=>{S.msg="⚠ Gagal menyalin";render()});else throw 0}catch(e){S.msg="⚠ Penyalinan tidak didukung";render()}tgLog(x,"salin")}

// ===== v1.1.247 (K7): pengingat piutang air bergilir lewat WhatsApp =====
// Antrean pelanggan yang menunggak (tagihan lewat jatuh tempo) dan bernomor WhatsApp valid; yang sudah diingatkan hari ini dilewati. Satu pesan per ketukan (WhatsApp dibuka manual), tercatat di audit seperti pengingat tunggal.
MK.arq="earq";
const arqToday=pid=>(db.audit_logs||[]).some(a=>a.action==="share"&&a.entity==="party"&&a.entity_id===pid&&String(a.detail||"").startsWith("pengingat tagihan air")&&wd(a.at)===today());
function arqIds(){const t=today(),seen=new Set(),U=x=>S.unit==="all"||x.unit_id===S.unit,out=[];
 db.sales.filter(x=>x.status==="posted"&&x.party_id&&U(x)&&owedS(x)>0.005&&x.bill&&x.bill.due&&x.bill.due<t).forEach(x=>{if(seen.has(x.party_id))return;seen.add(x.party_id);const p=db.parties.find(q=>q._id===x.party_id);if(p&&waNo(p.phone)&&!arqToday(p._id))out.push(p._id)});
 return out.sort((a,b)=>((db.parties.find(x=>x._id===a)||{}).name||"").localeCompare((db.parties.find(x=>x._id===b)||{}).name||"","id"))}
function arqStart(){const ids=arqIds();if(!ids.length){S.msg="Tidak ada pelanggan menunggak yang bisa diingatkan (nomor WhatsApp kosong atau sudah diingatkan hari ini)";render();return}S.arq={ids,i:0,sent:0,skip:0};mdOpen("arq","x")}
function arqAdv(){const q=S.arq;if(!q)return;q.i++;render()}
function arqSend(){const q=S.arq;if(!q||q.i>=q.ids.length)return;const id=q.ids[q.i],p=db.parties.find(x=>x._id===id),n=p&&waNo(p.phone),x=p&&arText(id);
 if(!n||!x){q.skip++;arqAdv();return}arLog(id,"WhatsApp bergilir");q.sent++;try{window.open("https://wa.me/"+n+"?text="+encodeURIComponent(x),"_blank","noopener")}catch(e){}arqAdv()}
function arqSkip(){const q=S.arq;if(!q||q.i>=q.ids.length)return;q.skip++;arqAdv()}
MD.arq=()=>{const q=S.arq;if(!q)return{t:"Pengingat bergilir",s:"mdClose()",y:"Tutup",b:"<p>Antrean tidak ditemukan.</p>",nf:1};
 const N=q.ids.length;if(q.i>=N)return{t:"Pengingat bergilir",s:"mdClose()",y:"Selesai",nf:1,b:`<p><b>Selesai.</b> ${q.sent} pengingat dibuka di WhatsApp, ${q.skip} dilewati.</p><p class="k">Pelanggan yang sudah diingatkan hari ini tidak akan masuk antrean lagi hari ini.</p>`};
 const id=q.ids[q.i],p=db.parties.find(x=>x._id===id)||{name:"?"},tot=arList(id).reduce((a,x)=>a+owedS(x),0);
 return{t:"Pengingat bergilir",s:"mdClose()",y:"Tutup",nf:1,b:`<div class="fwb" role="progressbar" aria-valuemin="0" aria-valuemax="${N}" aria-valuenow="${q.i}" aria-label="Pelanggan ${q.i+1} dari ${N}"><i style="width:${Math.round(q.i/N*100)}%"></i></div><p class="k">Pelanggan ${q.i+1} dari ${N} · ${q.sent} terbuka · ${q.skip} dilewati</p><p><b>${esc(p.name)}</b><br><span class="k">Total belum dibayar ${rp(tot)}</span></p><pre id="ar-t" class="ns-t">${esc(arText(id))}</pre><div class="lda">${ib("out","Kirim WhatsApp","arqSend()")}${ib("x","Lewati","arqSkip()","s")}</div><p class="k">WhatsApp terbuka dengan pesan siap kirim; kirim manual, lalu kembali ke sini untuk pelanggan berikutnya.</p>`}};
