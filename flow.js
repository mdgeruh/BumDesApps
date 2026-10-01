// ===== v1.1.008 — SP2 tahap 1: alur pengajuan lengkap (opsional, bawaan mati): verifikasi, analisis, wewenang persetujuan, akad =====
const FLOW0={manager_max:50000000,max_ratio:40,docs:"KTP, Kartu Keluarga, Surat keterangan usaha"},FLOW_L={manager_max:"Batas persetujuan Manajer (Rp); di atasnya perlu hak Persetujuan besar",max_ratio:"Rasio angsuran terhadap sisa penghasilan maksimum (%)",docs:"Daftar dokumen wajib (pisahkan dengan koma)"};
const flowOn=()=>!!(db&&db.settings&&db.settings.sp_flow===true),flowCfg=()=>Object.assign({},FLOW0,(db&&db.settings&&db.settings.sp_flow_cfg)||{}),
 flowDocs=()=>String(flowCfg().docs).split(",").map(x=>x.trim()).filter(Boolean),
 VR={lolos:"Lolos",perbaikan:"Perlu perbaikan",tidak:"Tidak lolos"},REC={setuju:"Setuju",bersyarat:"Setuju bersyarat",tolak:"Tolak"};
// tingkat wewenang menurut nominal
const needLevel=l=>l.principal>flowCfg().manager_max?"Direktur":"Manajer";
// perkiraan angsuran pertama dari data pinjaman
function estInst(l){try{return simulate(Object.assign({principal:l.principal,rate:l.interest_rate,tenor:l.tenor,method:l.interest_method,start:l.application_date},calcOf(l))).first_installment}catch(e){return 0}}
function analysisCalc(l,income,oblig){const inst=estInst(l),free=income-oblig,ratio=free>0?Math.round(inst/free*1000)/10:null,col=db.collaterals.filter(c=>c.loan_id===l._id&&c.status!=="returned").reduce((a,c)=>a+(+c.estimated_value||0),0),cfg=flowCfg();
 const ok1=ratio!==null&&ratio<=cfg.max_ratio,ok2=col>=l.principal,ok3=!!(l.verif&&l.verif.result==="lolos");
 return{installment:inst,free_income:free,ratio,collateral:col,score:(ok1?40:0)+(ok2?30:0)+(ok3?30:0),pass_ratio:ok1,pass_collateral:ok2,pass_verif:ok3}}
// gerbang: dipanggil lst("approved") dan cairkan bila alur lengkap aktif
function flowGate(l,to){if(!flowOn()||l.opening)return;
 if(to==="approved"){if(!l.verif||l.verif.result!=="lolos")throw Error("Alur lengkap aktif: verifikasi harus berhasil Lolos sebelum disetujui");
  if(!l.analysis)throw Error("Alur lengkap aktif: analisis kelayakan belum diisi");if(l.analysis.rec==="tolak")throw Error("Rekomendasi analisis: Tolak. Pengajuan ini hanya dapat ditolak");
  if(needLevel(l)==="Direktur"&&!can("sp.setujui.besar"))throw Error("Pokok di atas Rp "+fm(flowCfg().manager_max)+" memerlukan hak Persetujuan besar (Direktur)")}
 if(to==="active"){if(!l.contract||!l.contract.no)throw Error("Alur lengkap aktif: akad belum dibuat; buat akad sebelum pencairan")}}
function saveVerif(){const id=S.evf;try{const l=db.loans.find(x=>x._id===id);if(!l)throw Error("Pinjaman tidak ditemukan");if(l.status!=="submitted")throw Error("Verifikasi hanya untuk pengajuan berstatus Diajukan");
 const v=i=>($("#"+i)||{}).value||"",d=v("vf-d");dChk("vf-d",d,"Tanggal verifikasi",l.application_date,"tanggal pengajuan");const off=v("vf-o").trim();if(!off)throw fe("vf-o","Nama petugas wajib");
 const sd=v("vf-sd");if(sd)dChk("vf-sd",sd,"Tanggal survei",l.application_date,"tanggal pengajuan");const res=v("vf-r");if(!VR[res])throw fe("vf-r","Pilih hasil verifikasi");
 const docs=flowDocs().map((n,i)=>({name:n,ok:v("vf-k"+i)==="1"}));if(res==="lolos"&&docs.some(x=>!x.ok))throw fe("vf-k"+docs.findIndex(x=>!x.ok),"Hasil Lolos memerlukan semua dokumen lengkap");
 l.verif={date:d,officer:off,docs,survey_date:sd||null,survey_note:v("vf-n").trim(),result:res};audit("verifikasi","loan",id,VR[res]+" · "+off);save();okM();S.eld=id;S.md="ld";S.msg="Verifikasi dicatat: "+VR[res]}catch(e){mErr(e);return}render()}
function saveAnalisis(){const id=S.ean;try{const l=db.loans.find(x=>x._id===id);if(!l)throw Error("Pinjaman tidak ditemukan");if(l.status!=="submitted")throw Error("Analisis hanya untuk pengajuan berstatus Diajukan");
 const v=i=>($("#"+i)||{}).value||"",d=v("an-d");dChk("an-d",d,"Tanggal analisis",l.application_date,"tanggal pengajuan");const off=v("an-o").trim();if(!off)throw fe("an-o","Nama analis wajib");
 const inc=Number(pn(v("an-i"))),ob=Number(pn(v("an-b"))||0);if(!(inc>0))throw fe("an-i","Isi penghasilan bulanan lebih dari nol");if(!(ob>=0)||!Number.isFinite(ob))throw fe("an-b","Kewajiban lain tidak valid");
 const rec=v("an-r");if(!REC[rec])throw fe("an-r","Pilih rekomendasi");const c=analysisCalc(l,inc,ob);
 l.analysis={date:d,officer:off,income:inc,obligations:ob,installment:c.installment,ratio:c.ratio,collateral:c.collateral,score:c.score,rec,note:v("an-t").trim(),by:(curUser()||{}).name||null,by_id:actorId()};audit("analisis","loan",id,REC[rec]+" · skor "+c.score+" · "+off);save();okM();S.eld=id;S.md="ld";S.msg="Analisis dicatat: "+REC[rec]}catch(e){mErr(e);return}render()}
function saveAkad(){const id=S.eak;try{const l=db.loans.find(x=>x._id===id);if(!l)throw Error("Pinjaman tidak ditemukan");if(l.status!=="approved")throw Error("Akad dibuat setelah pengajuan disetujui dan sebelum pencairan");
 const v=i=>($("#"+i)||{}).value||"",d=v("ak-d"),no=v("ak-n").trim();if(!no)throw fe("ak-n","Nomor akad wajib");dChk("ak-d",d,"Tanggal akad",l.approval_date||l.application_date,"tanggal persetujuan");
 if(db.loans.some(x=>x._id!==id&&x.contract&&x.contract.no===no))throw fe("ak-n","Nomor akad sudah dipakai");
 l.contract={no,date:d};audit("akad","loan",id,no);save();okM();S.eld=id;S.md="ld";S.msg="Akad "+no+" dicatat"}catch(e){mErr(e);return}render()}
function setFlow(k,v){try{if(k==="on"){const on=v==="1";db.settings.sp_flow=on;audit("setting","settings","sp_flow",on?"Alur lengkap aktif":"Alur lengkap mati");save();S.msg=on?"Alur lengkap aktif untuk pengajuan berikutnya dan yang masih berjalan":"Alur lengkap mati; Simpan Pinjam kembali seperti biasa";render();return}
 if(!(k in FLOW0))throw Error("Pengaturan tidak dikenal");let x=v;if(k!=="docs"){x=Number(pn(v));if(String(v).trim()===""||!Number.isFinite(x)||x<0)throw Error("Isi angka nol atau lebih");if(k==="max_ratio"&&(x<1||x>100))throw Error("Rasio antara 1 dan 100")}
 else{x=String(v).split(",").map(s=>s.trim()).filter(Boolean).join(", ");if(!x)throw Error("Isi minimal satu dokumen")}
 db.settings.sp_flow_cfg=Object.assign({},flowCfg(),{[k]:x});audit("setting","settings","sp_flow_cfg",FLOW_L[k]+": "+x);save();S.msg="Pengaturan alur disimpan"}catch(e){S.msg="⚠ "+e.message}render()}
MK.vf="evf";MK.an="ean";MK.ak="eak";
const ldOf=id=>db.loans.find(x=>x._id===id);
MD.vf=()=>{const l=ldOf(S.evf);if(!l)return{t:"Verifikasi",s:"mdClose()",y:"Tutup",b:"<p>Pinjaman tidak ditemukan.</p>",nf:1};const o=l.verif||{},dl=flowDocs();
 return{t:"Verifikasi "+l.loan_number,s:"saveVerif()",y:"Simpan verifikasi",b:`<p class="k">${esc(party(l.party_id).name)} · Rp ${fm(l.principal)}</p>`+fld("vf-d","Tanggal verifikasi",{type:"date",value:o.date||today(),req:1})+fld("vf-o","Petugas",{value:o.officer||(curUser()||{}).name||"",req:1})
 +dl.map((n,i)=>fld("vf-k"+i,"Dokumen: "+esc(n),{t:"select",opts:opt([["1","Lengkap"],["0","Belum"]],x=>x,((o.docs||[]).find(z=>z.name===n)||{ok:false}).ok?"1":"0")})).join("")
 +fld("vf-sd","Tanggal survei lapangan",{type:"date",value:o.survey_date||""})+fld("vf-n","Catatan survei",{t:"textarea",value:o.survey_note||""})+fld("vf-r","Hasil verifikasi",{t:"select",req:1,opts:opt(Object.entries(VR),x=>x,o.result||"lolos")})}};
MD.an=()=>{const l=ldOf(S.ean);if(!l)return{t:"Analisis",s:"mdClose()",y:"Tutup",b:"<p>Pinjaman tidak ditemukan.</p>",nf:1};const o=l.analysis||{};
 return{t:"Analisis kelayakan "+l.loan_number,s:"saveAnalisis()",y:"Simpan analisis",b:`<p class="k">${esc(party(l.party_id).name)} · Rp ${fm(l.principal)} · perkiraan angsuran pertama Rp ${fm(estInst(l))}. Rasio dan skor dihitung saat disimpan (rasio maks ${flowCfg().max_ratio}%). Skor adalah alat bantu, bukan keputusan otomatis.</p>`
 +fld("an-d","Tanggal analisis",{type:"date",value:o.date||today(),req:1})+fld("an-o","Analis",{value:o.officer||(curUser()||{}).name||"",req:1})+fld("an-i","Penghasilan / usaha per bulan (Rp)",{a:RPA,value:o.income?fm(o.income):"",req:1})+fld("an-b","Kewajiban lain per bulan (Rp)",{a:RPA,value:o.obligations?fm(o.obligations):""})
 +fld("an-r","Rekomendasi",{t:"select",req:1,opts:opt(Object.entries(REC),x=>x,o.rec||"setuju")})+fld("an-t","Catatan",{t:"textarea",value:o.note||""})}};
MD.ak=()=>{const l=ldOf(S.eak);if(!l)return{t:"Akad",s:"mdClose()",y:"Tutup",b:"<p>Pinjaman tidak ditemukan.</p>",nf:1};const o=l.contract||{};
 return{t:"Akad "+l.loan_number,s:"saveAkad()",y:"Simpan akad",b:`<p class="k">${esc(party(l.party_id).name)} · Rp ${fm(l.principal)}. Pencairan hanya dapat dilakukan setelah akad dicatat.</p>`+fld("ak-n","Nomor akad",{value:o.no||"AKD/"+l.loan_number,req:1})+fld("ak-d","Tanggal akad",{type:"date",value:o.date||l.approval_date||today(),req:1})}};
// ringkasan tahap di modal pinjaman
function flowBox(l){if(!flowOn()||l.opening||!["submitted","approved"].includes(l.status))return"";
 const st=(ok,t)=>`<span class="bdg${ok?" ok":""}">${t}</span>`,V=l.verif,A=l.analysis,C=l.contract,K=(k,v)=>`<div class="kv"><span class="k">${k}</span><b>${v}</b></div>`,nl=needLevel(l);
 const bt=l.status==="submitted"?ib("edit",V?"Ubah verifikasi":"Verifikasi","mdOpen('vf','"+l._id+"')","s")+ib("edit",A?"Ubah analisis":"Analisis","mdOpen('an','"+l._id+"')","s"):ib("flag",C?"Ubah akad":"Buat akad","mdOpen('ak','"+l._id+"')","s");
 return`<div class="card flb"><div class="k">Alur pengajuan lengkap</div><div class="kvg">${K("Verifikasi",V?st(V.result==="lolos",VR[V.result])+" · "+V.date:st(0,"Belum"))}${K("Analisis",A?st(A.rec!=="tolak",REC[A.rec])+" · skor "+A.score+(A.ratio!=null?" · rasio "+A.ratio.toLocaleString("id-ID")+"%":""):st(0,"Belum"))}${K("Persetujuan",nl==="Direktur"?"Perlu hak Persetujuan besar (di atas Rp "+fm(flowCfg().manager_max)+")":"Manajer")}${K("Akad",C?esc(C.no)+" · "+C.date:l.status==="approved"?st(0,"Belum — wajib sebelum cair"):"Setelah disetujui")}</div><div class="fl">${bt}</div></div>`}
