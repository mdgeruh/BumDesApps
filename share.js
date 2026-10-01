// ===== RINGKASAN NASABAH YANG DAPAT DIBAGIKAN (v1.1.015): teks posisi pinjaman dan tabungan untuk WhatsApp/salin =====
// Data = posisi saat teks dibuat (snapshot). Berisi data pribadi dan keuangan: kirim hanya ke nasabah yang bersangkutan.
function nsText(pid){const p=db.parties.find(x=>x._id===pid);if(!p)return"";const t=today(),L=[],ln=db.loans.filter(l=>l.party_id===pid&&l.status==="active"),sv=(db.savings_accounts||[]).filter(a=>a.party_id===pid&&a.status==="aktif");
 L.push("*"+bnm()+"*","Ringkasan nasabah — "+p.name,"Posisi per "+t,"");
 L.push("*PINJAMAN*");
 if(!ln.length)L.push("Tidak ada pinjaman aktif.");
 ln.forEach(l=>{const ins=db.loan_installments.filter(i=>i.loan_id===l._id).sort((a,b)=>a.installment_number-b.installment_number),op=ins.filter(i=>i.status!=="paid"),od=op.filter(i=>i.due_date<t),nx=op.find(i=>i.due_date>=t),pk=ins.reduce((s,i)=>s+i.principal_due-i.principal_paid,0);
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
