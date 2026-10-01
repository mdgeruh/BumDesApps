// ===== SETELAN MODUL (v0.1.039): unit selain Simpan Pinjam bawaan nonaktif; data tidak dihapus =====
function modInfo(k){if(k==="air"){const pc=db.sales.filter(x=>owedS(x)>.005).length;return db.water_connections.length+" sambungan · "+db.sales.length+" penjualan · "+(pc?pc+" piutang pelanggan belum lunas":"tanpa piutang berjalan")}
 const dr=db.payrolls.filter(x=>x.status!=="paid").length;return db.payrolls.length+" gaji · "+(dr?dr+" gaji belum dibayar (draf/disetujui)":"tidak ada gaji tertunda")}
function setMod(k,on){try{const m=MODS.find(x=>x[0]===k);if(!m)throw Error("Modul tidak dikenal");on=!!on;if(!db.settings.modules||typeof db.settings.modules!=="object")db.settings.modules={};
 if(modOn(k)===on){S.msg=m[1]+" sudah "+(on?"aktif":"nonaktif");render();return}
 db.settings.modules[k]=on;audit("setting","settings","modules",m[1]+(on?" diaktifkan":" dinonaktifkan"));save();
 S.msg=m[1]+(on?" diaktifkan; menu dan laporan terkait muncul":" dinonaktifkan; menu disembunyikan, data tetap tersimpan")}catch(e){S.msg="⚠ "+e.message}render()}
function vMod(){return`<h2>Modul Unit Usaha</h2><div class="card"><div class="k">Fokus saat ini: <b>Simpan Pinjam</b>, Transaksi, dan akuntansi selalu aktif. Unit lain bawaan nonaktif agar tampilan ringkas. Menonaktifkan hanya menyembunyikan menu, laporan, dan jalan pintasnya; data, jurnal, dan saldo di buku besar tidak berubah dan tidak dihapus.</div></div>
${MODS.map(([k,n,d])=>{const on=modOn(k);return`<div class="card"><div class="k"><b>${n}</b> · ${on?"Aktif":"Nonaktif"}</div><p class="k">${d}</p><p class="k">${esc(modInfo(k))}</p><button class="b${on?" s":""}" role="switch" aria-checked="${on}" onclick="setMod('${k}',${!on})">${on?"Nonaktifkan":"Aktifkan"} ${n}</button></div>`}).join("")}`}
function vSet(){if(rbacOn()&&curUser()&&!can("setelan.kelola"))return rnBar()+vUsr();return rnBar()+subT(vSet0()+vMod()+vUsr(),"su",[["pf","Profil",null],["mod","Modul","<h2>Modul Unit Usaha</h2>"],["usr","Pengguna & Peran","<h2>Pengguna & Peran</h2>"]])}
function vSet0(){const b=db.bumdes[0]||{};
 return`<h2>Profil BUMDes</h2><div class="card">${BF.map(([k,n,t])=>`<label>${n}${k==="name"?" *":""}</label><input id="bd-${k}" type="${t||"text"}"${t==="tel"?' inputmode="tel"':t==="email"?' inputmode="email"':""} autocomplete="off" value="${esc(b[k])}">`).join("")}<button class="b" onclick="saveBd()">Simpan</button></div>
${docSet()}<h2>Simpan Pinjam</h2><div class="card"><label>Denda keterlambatan (% per hari dari angsuran; 0 = nonaktif)</label><input type="number" step="any" inputmode="decimal" value="${db.settings.penalty_pct_day||0}" onchange="setPen(this.value)"><label>Jasa saat pelunasan dipercepat</label><select onchange="setPo(this.value)"><option value="current"${(db.settings.payoff_interest||"current")==="current"?" selected":""}>Sampai angsuran berjalan (sisa jasa tidak ditagih)</option><option value="full"${db.settings.payoff_interest==="full"?" selected":""}>Seluruh sisa jasa sesuai jadwal</option></select></div>
<h3>Perhitungan Jasa dan Denda</h3><div class="card"><div class="k">Nilai bawaan sama dengan perilaku sebelumnya. Disimpan sebagai <b>snapshot di setiap pengajuan</b>: mengubahnya tidak mengubah pinjaman yang sudah diajukan. Persentase denda per hari (di atas) berlaku global.</div>${Object.keys(SPC0).map(k=>SPC_OPT[k]?fld("spc-"+k,SPC_L[k],{t:"select",a:' onchange="setCalc(\''+k+'\',this.value)"',opts:opt(SPC_OPT[k],o=>o,String(calcSet()[k]))}):fld("spc-"+k,SPC_L[k],{type:"text",a:' inputmode="numeric" autocomplete="off" onchange="setCalc(\''+k+'\',this.value)"',value:calcSet()[k]})).join("")}</div>
<h3>Batas Pengajuan dan Transaksi</h3><div class="card"><div class="k">Pengajuan di luar batas ditolak; pengajuan identik atau melewati batas per nasabah hanya diberi peringatan.</div>${Object.keys(SPL0).map(k=>fld("spl-"+k,SPL_L[k],{type:"text",a:' inputmode="numeric" autocomplete="off" onchange="setSpl(\''+k+'\',this.value)"',value:spl()[k]})).join("")}</div>
<p class="k">Nama tampil di menu, judul tab browser, dan dokumen cetak; alamat dan kontak tampil di kop kwitansi dan bukti pencairan.</p>`}
function saveBd(){try{const v=k=>$("#bd-"+k).value.trim(),n=v("name");
 if(!n)throw fe("bd-name","Nama BUMDes wajib diisi");
 if(v("email")&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email")))throw fe("bd-email","Format email tidak valid");
 if(v("phone")&&!/^[\d\s+()\-]{5,20}$/.test(v("phone")))throw fe("bd-phone","Telepon hanya boleh angka, spasi, +, -, ( )");
 const b=db.bumdes[0]||(db.bumdes[0]={_id:"BUMDES-001"});
 BF.forEach(([k])=>{b[k]=v(k)});b.updated_at=now();audit("update","bumdes",b._id);
 if(S.dr)BF.forEach(([k])=>delete S.dr["set|bd-"+k]);S.nsnap=1;save();S.msg="Profil BUMDes disimpan"}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function tgl(id){const p=db.accounting_periods.find(x=>x._id===id);if(p.status==="closed"&&id.slice(0,4)<=cyr()){S.msg="⚠ Periode tahun buku yang sudah ditutup hanya bisa dibuka lewat Batalkan penutupan tahun";render();return}p.status=p.status==="open"?"closed":"open";audit(p.status,"period",id,"Periode "+id);save();render()}
function exp(){const s=JSON.stringify(db,null,1),t=$("#bk");if(t)t.value=s;try{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([s],{type:"application/json"}));a.download="bumdes-backup-"+today()+".json";a.click();try{localStorage.setItem(LB,now())}catch(e){}S.msg="Backup diunduh — simpan file di tempat aman"}catch(e){S.msg="⚠ Export gagal: "+e.message}render()}
function fl(i){const f=i.files[0];if(f)f.text().then(t=>{$("#bk").value=t})}
function chk(j){
 NEWK.forEach(k=>{if(j[k]===undefined)j[k]=[]});
 KEYS.forEach(k=>{if(!Array.isArray(j[k]))throw Error("Koleksi hilang: "+k)});
 const by={};j.journal_lines.forEach(l=>by[l.journal_entry_id]=(by[l.journal_entry_id]||0)+l.debit-l.credit);
 if(Object.values(by).some(x=>Math.abs(x)>.005))throw Error("Ada jurnal yang tidak balance");chkLoans(j)}
// SP0: konsistensi pinjaman pada backup (status vs jadwal vs pembayaran)
function chkLoans(j){const ins={},pay={};j.loan_installments.forEach(i=>(ins[i.loan_id]=ins[i.loan_id]||[]).push(i));j.loan_payments.forEach(p=>(pay[p.loan_id]=pay[p.loan_id]||[]).push(p));
 const ids=new Set(j.loans.map(l=>l._id));
 Object.keys(ins).forEach(k=>{if(!ids.has(k))throw Error("Angsuran mengacu ke pinjaman yang tidak ada ("+k+")")});Object.keys(pay).forEach(k=>{if(!ids.has(k))throw Error("Pembayaran mengacu ke pinjaman yang tidak ada ("+k+")")});
 j.loans.forEach(l=>{const w=m=>Error("Pinjaman "+(l.loan_number||l._id)+": "+m),is=ins[l._id]||[],ps=(pay[l._id]||[]).filter(p=>p.status!=="voided");
  if(!LS[l.status])throw w("status tidak dikenal ("+l.status+")");
  if(!(Number.isFinite(l.principal)&&l.principal>0))throw w("pokok tidak valid");if(!(Number.isInteger(l.tenor)&&l.tenor>=1))throw w("tenor tidak valid");
  if(!(Number.isFinite(l.interest_rate)&&l.interest_rate>=0))throw w("jasa tidak valid");if(!["flat","menurun","anuitas"].includes(l.interest_method))throw w("metode jasa tidak dikenal");if(l.calc!==undefined&&(typeof l.calc!=="object"||!l.calc||Array.isArray(l.calc)))throw w("parameter hitung (snapshot) rusak");
  if(!(j.parties||[]).some(x=>x._id===l.party_id))throw w("nasabah tidak ditemukan");
  if(["active","paid_off"].includes(l.status)){
   if(is.length!==l.tenor)throw w("jumlah angsuran ("+is.length+") tidak sama dengan tenor ("+l.tenor+")");
   if(is.reduce((a,i)=>a+i.principal_due,0)!==l.principal)throw w("jumlah pokok jadwal tidak sama dengan pokok pinjaman");
   if(is.some(i=>i.principal_paid>i.principal_due||i.principal_paid<0))throw w("pembayaran pokok melebihi jadwal");
   if(is.reduce((a,i)=>a+i.principal_paid,0)!==ps.reduce((a,p)=>a+p.principal_amount,0))throw w("pokok terbayar di jadwal tidak sama dengan jumlah pembayaran");
   const all=is.every(i=>i.status==="paid");if(l.status==="paid_off"&&!all)throw w("berstatus Lunas tetapi masih ada angsuran belum lunas");if(l.status==="active"&&all)throw w("berstatus Aktif tetapi semua angsuran sudah lunas");
   if(!l.disbursement_date)throw w("tanggal pencairan kosong")}
  else{if(is.length)throw w("berstatus "+LS[l.status]+" tetapi memiliki jadwal angsuran");if(ps.length)throw w("berstatus "+LS[l.status]+" tetapi memiliki pembayaran")}})}
function impAsk(){try{dataP();const j=JSON.parse($("#bk").value);chk(j);S.imp=j;askC("imp","")}catch(e){S.imp=null;S.msg="⚠ Import gagal: "+e.message;render()}}
function imp(){try{dataP();const j=S.imp||JSON.parse($("#bk").value);chk(j);db=j;migr();S.imp=null;save();S.msg="Import berhasil"}catch(e){S.msg="⚠ Import gagal: "+e.message}render()}
function rst(){try{dataP();reset();S.msg="Data demo direset"}catch(e){S.msg=ER(e)}render()}
