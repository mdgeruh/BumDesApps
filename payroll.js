// ===== PIHAK & PEGAWAI SEBAGAI MASTER DATA (v0.1.014) =====
const PT={nasabah:"Nasabah",pelanggan:"Pelanggan",pemasok:"Pemasok",lainnya:"Lainnya"};
const pRef=id=>db.loans.some(l=>l.party_id===id)||db.sales.some(x=>x.party_id===id);
const dupP=(t,n,ph,ad,x)=>db.parties.some(p=>p._id!==x&&p.type===t&&(p.name||"").trim().toLowerCase()===n.toLowerCase()&&(p.phone||"").trim()===ph&&(p.address||"").trim().toLowerCase()===ad.toLowerCase());
function savePihak(){try{const v=i=>$("#"+i).value.trim(),n=v("py-n"),ep=db.parties.find(x=>x._id===S.ey);
 if(!n)throw fe("py-n","Nama wajib diisi");
 const t=ep&&pRef(ep._id)?ep.type:v("py-t");if(!PT[t])throw fe("py-t","Pilih jenis pihak");
 const f={name:n,phone:v("py-p"),address:v("py-a")};
 if(dupP(t,n,f.phone,f.address,S.ey))throw fe("py-n","Pihak dengan jenis, nama, telepon, dan alamat yang sama sudah ada");
 if(ep){Object.assign(ep,f,{type:t});audit("update","party",ep._id,PT[t]+" · "+n);S.ey=null;S.msg="Data pihak diperbarui"}
 else{const p={_id:uid("PTY"),type:t,...f,status:"aktif"};db.parties.push(p);audit("create","party",p._id,PT[t]+" · "+n);S.msg="Pihak ditambahkan"}
 save();clrF("#py-n,#py-p,#py-a");okM()}catch(e){mErr(e);return}render()}
function togP(id){try{const p=db.parties.find(x=>x._id===id),d=(PT[p.type]||p.type)+" · "+p.name;
 if(!isAct(p)){p.status="aktif";audit("activate","party",id,d);save();S.msg="Pihak diaktifkan";render();return}
 if(p.type==="nasabah"&&db.loans.some(l=>l.party_id===id&&["submitted","approved","active"].includes(l.status)))throw Error("Nasabah masih punya pinjaman yang belum selesai (diajukan / disetujui / aktif)");
 if(p.type==="pelanggan"&&piu(id)>0.005)throw Error("Pelanggan masih punya piutang Rp "+fm(piu(id))+"; selesaikan dulu");
 p.status="nonaktif";if(S.ey===id)S.ey=null;audit("deactivate","party",id,d);save();S.msg="Pihak dinonaktifkan; data lama tetap tersimpan"}catch(e){S.msg="⚠ "+e.message}render()}
const empNo=()=>"PEG-"+String(db.employees.reduce((a,e)=>Math.max(a,parseInt((e.emp_number||"").slice(4))||0),0)+1).padStart(3,"0");
function saveEmp(){try{negAny();const v=i=>$("#"+i).value.trim(),n=v("pg-n"),j=v("pg-j"),u=v("pg-u"),d=v("pg-d"),ee=db.employees.find(x=>x._id===S.eg);
 if(!n)throw fe("pg-n","Nama pegawai wajib diisi");if(!j)throw fe("pg-j","Jabatan wajib diisi");
 if(u){const x=db.business_units.find(q=>q._id===u);if(!x)throw fe("pg-u","Unit tidak ditemukan");if(!isAct(x)&&!(ee&&ee.unit_id===u))throw fe("pg-u","Unit nonaktif; pilih unit lain")}
 if(d&&!/^\d{4}-\d{2}-\d{2}$/.test(d))throw fe("pg-d","Tanggal mulai tidak valid");
 const mo=i=>{const x=pn(v(i)||"0");if(!/^\d+(\.\d+)?$/.test(x))throw fe(i,"Isi angka Rupiah (0 jika tidak ada)");return+x},g=mo("pg-g"),ta=mo("pg-t"),po=mo("pg-o");if(po>g+ta)throw fe("pg-o","Potongan tidak boleh melebihi gaji pokok + tunjangan");
 const f={name:n,position:j,unit_id:u,phone:v("pg-p"),address:v("pg-a"),start_date:d,base_salary:g,allowance:ta,deduction:po};
 if(db.employees.some(x=>x._id!==S.eg&&x.name.toLowerCase()===n.toLowerCase()&&(x.position||"").toLowerCase()===j.toLowerCase()&&(x.phone||"")===f.phone))throw fe("pg-n","Pegawai dengan nama, jabatan, dan telepon yang sama sudah ada");
 if(ee){Object.assign(ee,f);audit("update","employee",ee._id,ee.emp_number+" · "+n);S.eg=null;S.msg="Data pegawai diperbarui"}
 else{const e={_id:uid("EMP"),emp_number:empNo(),...f,status:"aktif"};db.employees.push(e);audit("create","employee",e._id,e.emp_number+" · "+n+" · "+j);S.msg="Pegawai "+e.emp_number+" ditambahkan"}
 save();clrF("#pg-n,#pg-j,#pg-p,#pg-a,#pg-d,#pg-g,#pg-t,#pg-o");okM()}catch(e){mErr(e);return}render()}
function togG(id){try{const e=db.employees.find(x=>x._id===id),d=e.emp_number+" · "+e.name;
 if(!isAct(e)){const u=e.unit_id&&db.business_units.find(x=>x._id===e.unit_id);if(u&&!isAct(u))throw Error("Unit "+u.name+" nonaktif; pindahkan pegawai ke unit lain lewat Edit dulu");e.status="aktif";delete e.end_date;audit("activate","employee",id,d);S.msg="Pegawai diaktifkan"}
 else{if(db.payrolls.some(p=>p.employee_id===id&&["draft","approved"].includes(p.status)))throw Error("Pegawai masih punya gaji yang belum dibayar (draf / disetujui); selesaikan atau hapus dulu di menu Gaji");e.status="nonaktif";e.end_date=today();if(S.eg===id)S.eg=null;audit("deactivate","employee",id,d);S.msg="Pegawai dinonaktifkan; data lama tetap tersimpan"}save()}catch(e){S.msg="⚠ "+e.message}render()}
function vPihak(){const f=S.pf||"",L=db.parties.filter(p=>!f||p.type===f);
 return`<h2>Pihak</h2>${addB("Tambah pihak","py")}<p class="k">Nasabah, pelanggan, pemasok, dan pihak lain dalam satu daftar. ${L.length} pihak${f?" ("+PT[f]+")":""}.</p><div class="fl"><select aria-label="Jenis pihak" onchange="S.pf=this.value;render()"><option value="">Semua jenis</option>${opt(Object.keys(PT),k=>[k,PT[k]],f)}</select></div>
${mlist(["Pihak","Jenis","","" ],L.map(p=>mrow("py",p._id,esc(p.name),esc(p.phone||"-"),esc(PT[p.type]||p.type),"","",mbd(p))),"Belum ada pihak yang cocok.")}
`}
function vPeg(){const na=db.employees.filter(isAct).length;
 return`<h2>Pegawai</h2>${addB("Tambah pegawai","pg")}<p class="k">${na} aktif dari ${db.employees.length} pegawai. Master ini menjadi dasar modul Payroll.</p>${mlist(["Pegawai","Unit","Gaji pokok",""],db.employees.map(e=>mrow("pg",e._id,esc(e.name),esc(e.emp_number)+" · "+esc(e.position||"-"),esc(unitName(e.unit_id)),rp(e.base_salary||0),"",mbd(e))),"Belum ada pegawai.")}
`}

// ===== PAYROLL (v0.1.015-016): profil gaji, komponen gaji, penggajian per periode, rincian draf, persetujuan, pembayaran → jurnal, slip =====
const PS={draft:"Draf",approved:"Disetujui",paid:"Dibayar"},payGet=id=>db.payrolls.find(x=>x._id===id),payOf=id=>db.salary_payments.find(s=>s.payroll_id===id&&s.status==="posted"),empName=id=>(db.employees.find(e=>e._id===id)||{}).name||"-";
const PK=id=>db.payroll_components.find(c=>c._id===id),PKT={earning:"Pendapatan",deduction:"Potongan"},ecList=e=>(e.components||[]).filter(x=>PK(x.component_id)),
 payRecalc=p=>{const it=db.payroll_items.filter(i=>i.payroll_id===p._id);p.gross_salary=it.filter(i=>i.type==="earning").reduce((s,i)=>s+i.amount,0);p.total_deduction=it.filter(i=>i.type==="deduction").reduce((s,i)=>s+i.amount,0);p.net_salary=p.gross_salary-p.total_deduction};
function payGen(){try{const m=$("#gj-m").value;if(!/^\d{4}-\d{2}$/.test(m))throw fe("gj-m","Pilih periode gaji (bulan)");if(closed(m+"-01"))throw fe("gj-m","Periode "+m+" sudah ditutup");
 const E=db.employees.filter(e=>isAct(e)&&(e.base_salary||0)>0&&!(e.start_date&&e.start_date.slice(0,7)>m)&&!db.payrolls.some(p=>p.employee_id===e._id&&p.period===m));
 if(!E.length)throw fe("gj-m","Tidak ada pegawai aktif bergaji yang belum diproses untuk periode "+m);
 const cs=e=>ecList(e).reduce((o,x)=>{o[PK(x.component_id).type]+=x.amount;return o},{earning:0,deduction:0});
 E.forEach(e=>{const c=cs(e);if((e.deduction||0)+c.deduction>e.base_salary+(e.allowance||0)+c.earning)throw fe("gj-m","Potongan "+e.name+" melebihi pendapatannya; periksa komponen tetap pegawai")});
 E.forEach(e=>{const p={_id:uid("PAY"),period:m,employee_id:e._id,unit_id:e.unit_id||"",gross_salary:0,total_deduction:0,net_salary:0,status:"draft",created_at:now()};db.payrolls.push(p);
  [["Gaji Pokok",e.base_salary,"earning"],["Tunjangan",e.allowance||0,"earning"],["Potongan",e.deduction||0,"deduction"]].forEach(([n,a,t])=>{if(a>0)db.payroll_items.push({_id:uid("PIT"),payroll_id:p._id,name:n,amount:a,type:t,core:true})});
  ecList(e).forEach(x=>{const k=PK(x.component_id);db.payroll_items.push({_id:uid("PIT"),payroll_id:p._id,component_id:k._id,name:k.name,amount:x.amount,type:k.type})});payRecalc(p)});
 audit("create","payroll",m,E.length+" gaji periode "+m+" dibuat (draf)");save();S.msg=E.length+" gaji periode "+m+" dibuat berstatus Draf"}catch(e){mErr(e);return}render()}
// komponen gaji (master), komponen tetap pegawai, rincian gaji draf
const kUsed=id=>db.employees.some(e=>(e.components||[]).some(x=>x.component_id===id))||db.payroll_items.some(i=>i.component_id===id);
function saveComp(){try{const n=$("#pk-n").value.trim(),ek=PK(S.ek),t=ek&&kUsed(ek._id)?ek.type:$("#pk-t").value;if(!n)throw fe("pk-n","Nama komponen wajib diisi");if(!PKT[t])throw fe("pk-t","Pilih jenis komponen");
 if(db.payroll_components.some(c=>c._id!==S.ek&&c.name.toLowerCase()===n.toLowerCase()))throw fe("pk-n","Komponen dengan nama itu sudah ada");
 if(ek){ek.name=n;ek.type=t;audit("update","payroll_component",ek._id,PKT[t]+" · "+n);S.ek=null;S.msg="Komponen gaji diperbarui"}
 else{const c={_id:uid("PC"),name:n,type:t,status:"aktif"};db.payroll_components.push(c);audit("create","payroll_component",c._id,PKT[t]+" · "+n);S.msg="Komponen gaji ditambahkan"}
 save();clrF("#pk-n,#pk-t");okM()}catch(e){mErr(e);return}render()}
function togK(id){try{const k=PK(id),d=PKT[k.type]+" · "+k.name;if(!isAct(k)){k.status="aktif";audit("activate","payroll_component",id,d);S.msg="Komponen diaktifkan"}
 else{if(db.employees.some(e=>isAct(e)&&(e.components||[]).some(x=>x.component_id===id)))throw Error("Komponen masih dipakai pegawai aktif; hapus dari pegawai dulu");k.status="nonaktif";if(S.ek===id)S.ek=null;audit("deactivate","payroll_component",id,d);S.msg="Komponen dinonaktifkan; gaji lama tidak berubah"}save()}catch(e){S.msg="⚠ "+e.message}render()}
function ecAdd(){try{negAny();const e=db.employees.find(x=>x._id===S.eg),k=PK($("#ec-c").value),raw=pn($("#ec-a").value||"");if(!e)return;if(!k||!isAct(k))throw fe("ec-c","Pilih komponen");
 if(!/^\d+(\.\d+)?$/.test(raw)||+raw<=0)throw fe("ec-a","Jumlah harus lebih dari 0");if((e.components||[]).some(x=>x.component_id===k._id))throw fe("ec-c","Komponen sudah ada pada pegawai ini; hapus dulu untuk mengganti jumlah");
 (e.components=e.components||[]).push({component_id:k._id,amount:+raw});audit("update","employee",e._id,e.emp_number+" · +"+k.name+" Rp "+fm(+raw));save();clrF("#ec-a");S.msg="Komponen tetap ditambahkan (berlaku untuk gaji yang dibuat berikutnya)"}catch(e){mErr(e);return}render()}
function ecDel(cid){const e=db.employees.find(x=>x._id===S.eg),k=PK(cid);if(!e)return;e.components=(e.components||[]).filter(x=>x.component_id!==cid);audit("update","employee",e._id,e.emp_number+" · −"+(k?k.name:cid));save();S.msg="Komponen tetap dihapus dari pegawai";render()}
function vEC(e){const L=ecList(e);return`<h2>Komponen tetap ${esc(e.name)}</h2><p class="k">Tambahan per bulan di luar gaji pokok, tunjangan, dan potongan tetap; otomatis masuk gaji yang dibuat berikutnya.</p>${L.length?tbl(["Komponen","Jenis","#Jumlah",""],L.map(x=>{const k=PK(x.component_id);return`<tr><td>${esc(k.name)}</td><td>${PKT[k.type]}</td><td class="n">${rp(x.amount)}</td><td>${ib("x","Hapus","ecDel('"+k._id+"')","s")}</td></tr>`})):'<p class="k">Belum ada komponen tetap.</p>'}
<div class="card">${fld("ec-c","Komponen",{t:"select",opts:opt(db.payroll_components.filter(isAct),k=>[k._id,k.name+" ("+PKT[k.type]+")"])})}${fld("ec-a","Jumlah per bulan (Rp)",{type:"text",a:' inputmode="numeric" autocomplete="off" oninput="fmtR(this)"'})}<button class="b" onclick="ecAdd()">Tambah komponen</button></div>`}
function payOpen(id){S.pd=S.pd===id?null:id;S.msg="";render();if(S.pd){const e=$("#pd-h");if(e&&e.scrollIntoView)e.scrollIntoView({block:"center"})}}
function piAdd(){try{negAny();const p=payGet(S.pd),k=PK($("#pi-c").value),raw=pn($("#pi-a").value||"");if(!p||p.status!=="draft")throw Error("Hanya gaji berstatus Draf yang bisa diubah");if(!k||!isAct(k))throw fe("pi-c","Pilih komponen");
 if(!/^\d+(\.\d+)?$/.test(raw)||+raw<=0)throw fe("pi-a","Jumlah harus lebih dari 0");
 const it={_id:uid("PIT"),payroll_id:p._id,component_id:k._id,name:k.name,amount:+raw,type:k.type};db.payroll_items.push(it);payRecalc(p);
 if(p.net_salary<0){db.payroll_items.pop();payRecalc(p);throw fe("pi-a","Potongan melebihi pendapatan; gaji bersih tidak boleh negatif")}
 audit("update","payroll",p._id,p.period+" · "+empName(p.employee_id)+" · +"+k.name+" Rp "+fm(+raw));save();clrF("#pi-a");S.msg="Komponen ditambahkan ke gaji draf"}catch(e){mErr(e);return}render()}
function piDel(iid){try{const it=db.payroll_items.find(x=>x._id===iid),p=it&&payGet(it.payroll_id);if(!p||p.status!=="draft")throw Error("Hanya gaji berstatus Draf yang bisa diubah");if(it.core)throw Error("Gaji pokok, tunjangan, dan potongan tetap diubah lewat Master > Pegawai lalu buat ulang draf");
 db.payroll_items=db.payroll_items.filter(x=>x._id!==iid);payRecalc(p);
 if(p.net_salary<0){db.payroll_items.push(it);payRecalc(p);throw Error("Menghapus komponen ini membuat gaji bersih negatif")}
 audit("update","payroll",p._id,p.period+" · "+empName(p.employee_id)+" · −"+it.name);save();S.msg="Komponen dihapus dari gaji draf"}catch(e){S.msg="⚠ "+e.message}render()}
function vSlip(id){const p=payGet(id),bar=`<div class="noprint"><button class="b" onclick="window.print()">Cetak</button><button class="b s" onclick="S.doc=null;render()">Kembali</button></div>`;
 if(!p||p.status==="draft")return`${bar}<p class="k">Slip hanya tersedia untuk gaji yang sudah disetujui atau dibayar.</p>`;
 const e=db.employees.find(x=>x._id===p.employee_id)||{},b=db.bumdes[0]||{},R=(a,v)=>`<tr><td>${a}</td><td class="n">${v}</td></tr>`,it=db.payroll_items.filter(i=>i.payroll_id===id),sp=payOf(id),ci=sp&&db.cash_accounts.find(c=>c._id===sp.cash_account_id),
 grp=t=>it.filter(i=>i.type===t).map(i=>R(esc(i.name),rp(i.amount))).join("")||R("-","-");
 return`${bar}<div class="doc">${kop()}<h3>SLIP GAJI</h3><div class="cn">Periode ${p.period} · ${p.status==="paid"?"Dibayar "+sp.payment_date+(ci?" via "+esc(ci.name):""):"Belum dibayar (disetujui)"}</div>
<table>${R("Nama",esc(e.name||"-"))}${R("No. pegawai",esc(e.emp_number||"-"))}${R("Jabatan",esc(e.position||"-"))}${R("Unit usaha",esc(unitName(p.unit_id)))}</table>
<table><tr><th colspan="2">Pendapatan</th></tr>${grp("earning")}<tr><th>Gaji bruto</th><th class="n">${rp(p.gross_salary)}</th></tr><tr><th colspan="2">Potongan</th></tr>${grp("deduction")}<tr><th>Total potongan</th><th class="n">${rp(p.total_deduction)}</th></tr><tr><th>Gaji bersih</th><th class="n">${rp(p.net_salary)}</th></tr></table>
<div class="tb">Terbilang: ${cap(terbilang(p.net_salary))}</div>${sig([["Penerima",e.name],["Bendahara",b.treasurer]],1,sp?sp.payment_date:today())}</div>`}
function payAppr(id){const p=payGet(id);if(!p||p.status!=="draft")return;p.status="approved";p.approved_at=now();audit("approve","payroll",id,p.period+" · "+empName(p.employee_id));save();S.msg="Gaji disetujui";render()}
function payDel(id){const p=payGet(id);if(!p||p.status!=="draft")return;db.payrolls=db.payrolls.filter(x=>x._id!==id);db.payroll_items=db.payroll_items.filter(x=>x.payroll_id!==id);if(S.pd===id)S.pd=null;audit("delete","payroll",id,p.period+" · "+empName(p.employee_id)+" (draf)");save();S.msg="Draf gaji dihapus";render()}
function payBayar(id){try{const p=payGet(id),d=$("#gj-d").value,k=db.cash_accounts.find(c=>c._id===$("#gj-k").value);
 if(!p||p.status!=="approved")throw Error("Hanya gaji berstatus Disetujui yang bisa dibayar");if(!d)throw fe("gj-d","Tanggal bayar wajib diisi");if(d.slice(0,7)<p.period)throw fe("gj-d","Tanggal bayar tidak boleh sebelum periode gaji");if(!k)throw fe("gj-k","Pilih kas/bank");
 const L=[{acc:"ACC5100",d:p.gross_salary},{acc:k.account_id,c:p.net_salary}];if(p.total_deduction>0)L.push({acc:"ACC2200",c:p.total_deduction});
 const t=post({type:"payroll",date:d,unit:p.unit_id,desc:"Gaji "+p.period+" · "+empName(p.employee_id),lines:L});
 db.salary_payments.push({_id:uid("SLP"),payroll_id:id,payment_date:d,cash_account_id:k._id,amount:p.net_salary,transaction_id:t._id,status:"posted"});p.status="paid";
 audit("pay","payroll",id,p.period+" · "+empName(p.employee_id)+" · Rp "+fm(p.net_salary));save();S.msg="Gaji dibayar dan dijurnal"}catch(e){mErr(e);return}render()}
function batalGaji(id){try{const s=db.salary_payments.find(x=>x._id===id),p=s&&payGet(s.payroll_id);if(!s||s.status!=="posted"||!p)throw Error("Pembayaran gaji tidak ditemukan");rev(s.transaction_id);s.status="voided";p.status="approved";audit("void","salary_payment",id,p.period+" · "+empName(p.employee_id));save();S.msg="Pembayaran gaji dibatalkan dengan jurnal pembalik; gaji kembali Disetujui"}catch(e){S.msg="⚠ "+e.message}render()}
function vPay(){return subT(vPay0()+vKomp()+vRepGaji(),"gt",[["proses","Proses Gaji",null],["komp","Komponen","<h2>Komponen Gaji</h2>"],["rekap","Laporan","<h2>Laporan Gaji</h2>"]])}
function vPay0(){const U=x=>S.unit==="all"||x.unit_id===S.unit,L=db.payrolls.filter(U).sort((a,b)=>b.period.localeCompare(a.period)||empName(a.employee_id).localeCompare(empName(b.employee_id))),ne=db.employees.filter(e=>isAct(e)&&(e.base_salary||0)>0).length,kas=opt(db.cash_accounts.filter(isAct),c=>[c._id,c.name]);
 const act=p=>ib("edit","Rincian","payOpen('"+p._id+"')","s")+(p.status!=="draft"?ib("print","Slip","openDoc('slip','"+p._id+"')","s"):"")+(p.status==="draft"?ib("check","Setujui","payAppr('"+p._id+"')")+ib("x","Hapus","payDel('"+p._id+"')","s"):p.status==="approved"?ib("cash","Bayar","payBayar('"+p._id+"')"):(payOf(p._id)?ib("undo","Batalkan","askC('batalGaji','"+payOf(p._id)._id+"')","x"):""));
 const dp=payGet(S.pd),di=dp?db.payroll_items.filter(i=>i.payroll_id===dp._id):[];
 const det=dp?`<h2 id="pd-h">Rincian gaji ${esc(empName(dp.employee_id))} · ${dp.period} (${PS[dp.status]})</h2>${tbl(["Komponen","Jenis","#Jumlah",""],di.map(i=>`<tr><td>${esc(i.name)}</td><td>${PKT[i.type]}</td><td class="n">${rp(i.amount)}</td><td>${dp.status==="draft"&&!i.core?ib("x","Hapus","piDel('"+i._id+"')","s"):""}</td></tr>`))}<p class="k">Bruto Rp ${fm(dp.gross_salary)} − potongan Rp ${fm(dp.total_deduction)} = <b>bersih Rp ${fm(dp.net_salary)}</b></p>${dp.status==="draft"?`<div class="card"><div class="k">Tambah komponen sekali pakai (lembur, insentif, kasbon, dll.) ke gaji draf ini</div><label>Komponen</label><select id="pi-c">${opt(db.payroll_components.filter(isAct),k=>[k._id,k.name+" ("+PKT[k.type]+")"])}</select><label>Jumlah (Rp)</label><input id="pi-a" type="text" inputmode="numeric" autocomplete="off" oninput="fmtR(this)"><button class="b" onclick="piAdd()">Tambah ke gaji</button></div>`:'<p class="k">Gaji yang sudah disetujui tidak dapat diubah.</p>'}`:"";
 return`<h2>Proses Gaji</h2><p class="k">Alur: Draf → Disetujui → Dibayar. ${ne} pegawai aktif punya gaji pokok (isi di Master &gt; Pegawai). Beban gaji dicatat ke unit pegawai (Umum bila tanpa unit); potongan dicatat sebagai Kewajiban Lain (2200) sampai disetor.</p>
<div class="card"><label>Periode gaji</label><input id="gj-m" type="month" value="${today().slice(0,7)}"><button class="b" onclick="payGen()">Buat gaji periode ini</button></div>
<div class="card"><div class="k">Dipakai untuk tombol Bayar</div><label>Tanggal bayar</label><input id="gj-d" type="date" value="${today()}"><label>Kas/Bank</label><select id="gj-k">${kas}</select></div>
<h2>Daftar Gaji</h2>${L.length?tbl(["Periode","Pegawai","Unit","#Bruto","#Potongan","#Bersih","Status",""],L.slice(0,S.lim||PG).map(p=>`<tr><td>${p.period}</td><td>${esc(empName(p.employee_id))}</td><td>${esc(unitName(p.unit_id))}</td><td class="n">${rp(p.gross_salary)}</td><td class="n">${rp(p.total_deduction)}</td><td class="n">${rp(p.net_salary)}</td><td>${PS[p.status]||p.status}</td><td>${act(p)}</td></tr>`))+more(L.length-Math.min(L.length,S.lim||PG)):'<p class="k">Belum ada gaji diproses. Isi gaji pokok pegawai di Master &gt; Pegawai, lalu buat gaji periode.</p>'}${det}`}
function vKomp(){const P=db.payroll_components;
 return`<h2>Komponen Gaji</h2>${addB("Tambah komponen","pk")}<p class="k">Master komponen tambahan (lembur, insentif, tunjangan, potongan). Dipasang tetap per pegawai lewat Master &gt; Pegawai, atau ditambahkan sekali pakai ke gaji draf.</p>${tbl(["Nama","Jenis","Dipakai","Status",""],P.map(k=>`<tr><td>${esc(k.name)}</td><td>${PKT[k.type]}</td><td>${db.employees.filter(e=>(e.components||[]).some(x=>x.component_id===k._id)).length} pegawai</td><td>${isAct(k)?"Aktif":"Nonaktif"}</td><td>${ib("edit","Edit","openK('"+k._id+"')","s")+(isAct(k)?ib("x","Nonaktifkan","togK('"+k._id+"')","s"):ib("check","Aktifkan","togK('"+k._id+"')","s"))}</td></tr>`))}
`}
// ===== LAPORAN GAJI / SDM (v0.1.017): rekap gaji per periode, unit, pegawai, dan komponen; cetak dan CSV =====
const GG={periode:"Periode",unit:"Unit usaha",pegawai:"Pegawai",komponen:"Komponen"};
function gajiSet(){return db.payrolls.filter(p=>p.status!=="draft"&&(S.unit==="all"||p.unit_id===S.unit)&&(!S.gf||p.period>=S.gf)&&(!S.gto||p.period<=S.gto))}
function gajiTab(){const L=gajiSet(),g=GG[S.gg]?S.gg:"periode";
 if(g==="komponen"){const ids=new Set(L.map(p=>p._id)),m={};db.payroll_items.filter(i=>ids.has(i.payroll_id)).forEach(i=>{const x=m[i.type+"|"+i.name]??={n:i.name,t:i.type,c:0,a:0};x.c++;x.a+=i.amount});
  return{g,ct:2,h:["Komponen","Jenis","#Jumlah item","#Total"],r:Object.values(m).sort((a,b)=>(a.t===b.t?0:a.t==="earning"?-1:1)||a.n.localeCompare(b.n)).map(x=>[x.n,PKT[x.t],x.c,x.a])}}
 const key={periode:p=>p.period,unit:p=>unitName(p.unit_id),pegawai:p=>{const e=db.employees.find(x=>x._id===p.employee_id)||{};return(e.emp_number?e.emp_number+" · ":"")+(e.name||"-")}}[g],m={};
 L.forEach(p=>{const k=key(p),x=m[k]??={k,c:0,g:0,d:0,n:0,pd:0,bp:0};x.c++;x.g+=p.gross_salary;x.d+=p.total_deduction;x.n+=p.net_salary;if(p.status==="paid")x.pd+=p.net_salary;else x.bp+=p.net_salary});
 return{g,ct:1,h:[GG[g],"#Jumlah gaji","#Bruto","#Potongan","#Bersih","#Dibayar","#Belum dibayar"],r:Object.values(m).sort((a,b)=>g==="periode"?b.k.localeCompare(a.k):a.k.localeCompare(b.k)).map(x=>[x.k,x.c,x.g,x.d,x.n,x.pd,x.bp])}}
function gajiSum(){const L=gajiSet(),s={c:L.length,g:0,d:0,n:0,pd:0,bp:0};L.forEach(p=>{s.g+=p.gross_salary;s.d+=p.total_deduction;s.n+=p.net_salary;if(p.status==="paid")s.pd+=p.net_salary;else s.bp+=p.net_salary});return s}
function gajiCsv(){const T=gajiTab(),q=v=>typeof v==="number"?String(Math.round(v)):'"'+String(v).replace(/"/g,'""')+'"';return[T.h.map(h=>q(h.replace("#",""))),...T.r.map(r=>r.map(q))].map(r=>r.join(",")).join("\r\n")}
function gajiDl(){try{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["\ufeff"+gajiCsv()],{type:"text/csv"}));a.download="laporan-gaji-"+(S.gg||"periode")+"-"+today()+".csv";a.click();S.msg="Laporan gaji diunduh (CSV)"}catch(e){S.msg="⚠ Unduh gagal: "+e.message}render()}
function vRepGaji(){const T=gajiTab(),s=gajiSum(),bad=S.gf&&S.gto&&S.gf>S.gto,un=S.unit==="all"?"Semua unit":unitName(S.unit),per=(S.gf||S.gto)?(S.gf||"awal")+" s/d "+(S.gto||"sekarang"):"Semua periode";
 const cell=(v,i,h)=>i===T.ct?fm(v):h[0]==="#"?rp(v):esc(v);
 return`<h2>Laporan Gaji</h2><div class="card noprint"><div class="k">Hanya gaji Disetujui dan Dibayar; draf tidak dihitung. Filter unit memakai pilihan di header.</div><div class="fl"><input type="month" aria-label="Dari periode" value="${esc(S.gf||"")}" onchange="S.gf=this.value;S.lim=0;render()"><input type="month" aria-label="Sampai periode" value="${esc(S.gto||"")}" onchange="S.gto=this.value;S.lim=0;render()"><select aria-label="Kelompokkan" onchange="S.gg=this.value;render()">${opt(Object.keys(GG),k=>[k,"Per "+GG[k].toLowerCase()],T.g)}</select>${S.gf||S.gto?`<button class="b s" onclick="S.gf=S.gto='';render()">Reset filter</button>`:""}</div>${bad?'<div class="fe" role="alert">Periode awal sesudah periode akhir</div>':""}<button class="b" onclick="window.print()">Cetak</button><button class="b s" onclick="gajiDl()">Unduh CSV</button></div>
<div class="doc po">${kop()}<h3>LAPORAN GAJI</h3><div class="cn">${esc(un)} · ${esc(per)} · per ${esc(GG[T.g].toLowerCase())}</div></div>
<div class="card"><b>${s.c} gaji</b> · Bruto ${rp(s.g)} · Potongan ${rp(s.d)} · <b>Bersih ${rp(s.n)}</b><br>Dibayar ${rp(s.pd)} · Belum dibayar ${rp(s.bp)}</div>
${T.r.length?tbl(T.h,T.r.map(r=>"<tr>"+r.map((v,i)=>`<td class="${T.h[i][0]==="#"?"n":""}">${cell(v,i,T.h[i])}</td>`).join("")+"</tr>")):'<p class="k">Belum ada gaji yang disetujui atau dibayar pada filter ini.</p>'}`}
