// ===== v1.1.007 — SP1 tahap 1: Mesin Tarif & Biaya (rate_master, tax_master berversi, calcFees murni) =====
const FEE_TYPES=[["jasa","Jasa / bunga"],["administrasi","Administrasi"],["provisi","Provisi"],["materai","Materai"],["transfer","Transfer"],["denda","Denda keterlambatan"],["pelunasan","Pelunasan dipercepat"],["restruk","Restrukturisasi"],["lain","Biaya lain"],["tabwajib","Tabungan wajib (masuk tabungan nasabah)"]],
 FEE_METHODS=[["persen","Persentase dari dasar"],["tetap","Nominal tetap"],["per_hari","Per hari (× hari)"],["per_bulan","Per bulan (× bulan)"],["bertingkat","Bertingkat menurut pokok (khusus jasa)"]],
 FEE_BASES=[["pokok","Pokok pinjaman"],["sisa_pokok","Sisa pokok"],["angsuran","Angsuran"],["tunggakan","Tunggakan"]],
 ftName=t=>(FEE_TYPES.find(x=>x[0]===t)||[0,t])[1];
const rateRows=()=>(db.rate_master=db.rate_master||[]),taxRows=()=>(db.tax_master=db.tax_master||[]);
const inEff=(r,d)=>r.active!==false&&r.effective_from<=d&&(!r.effective_until||d<=r.effective_until);
// versi tarif yang berlaku pada tanggal d (tanggal transaksi memilih versi)
function rateAt(code,d){return rateRows().filter(r=>r.fee_code===code&&inEff(r,d)).sort((a,b)=>b.effective_from<a.effective_from?-1:1)[0]||null}
function taxAt(code,d){return taxRows().filter(r=>r.tax_code===code&&inEff(r,d)).sort((a,b)=>b.effective_from<a.effective_from?-1:1)[0]||null}
const activeFeeCodes=d=>[...new Set(rateRows().map(r=>r.fee_code))].filter(c=>rateAt(c,d));
const rd0=n=>Math.round(+n||0);
// Mesin hitung murni: tanpa efek samping. ctx={date,pokok,sisa_pokok,angsuran,tunggakan,hari,bulan,codes?}; rates/taxes opsional (snapshot)
function calcFees(ctx,rates,taxes){const d=ctx.date,RR=rates||rateRows(),TT=taxes||taxRows(),pick=(A,k,c)=>A.filter(r=>r[k]===c&&inEff(r,d)).sort((a,b)=>b.effective_from<a.effective_from?-1:1)[0];
 const codes=ctx.codes||[...new Set(RR.map(r=>r.fee_code))],items=[];let fee_total=0,tax_total=0;
 for(const c of codes){const r=pick(RR,"fee_code",c);if(!r)continue;
  const base=r.base?+ctx[r.base]||0:0,rt=(+r.rate||0)/100,fx=+r.fixed_amount||0;let a=0,dasar=base,qtyN=1;
  if(r.calc_method==="tetap"){const qn=Math.max(1,Math.min(99,Math.round(+(ctx.qty&&ctx.qty[c])||1)));a=fx*qn;dasar=0;qtyN=qn}
  else if(r.calc_method==="persen")a=base*rt+fx;
  else if(r.calc_method==="per_hari")a=(r.rate?base*rt:fx)*(+ctx.hari||0);
  else if(r.calc_method==="per_bulan")a=(r.rate?base*rt:fx)*(+ctx.bulan||0);
  a=rd0(a);if(+r.minimum>0&&a<r.minimum)a=rd0(r.minimum);if(+r.maximum>0&&a>r.maximum)a=rd0(r.maximum);
  let tax=0;const tl=[];if(r.taxable)for(const tc of [...new Set(TT.map(t=>t.tax_code))]){const t=pick(TT,"tax_code",tc);if(!t)continue;const v=rd0(a*(+t.tax_rate||0)/100);tax+=v;tl.push({code:tc,rate:+t.tax_rate,amount:v})}
  items.push({...(qtyN>1?{qty:qtyN}:{}),fee_code:c,fee_name:r.fee_name,fee_type:r.fee_type,version:r.version||1,base:r.base||"",dasar:rd0(dasar),amount:a,tax:tax,taxes:tl,total:a+tax});fee_total+=a;tax_total+=tax}
 return{date:d,items,fee_total,tax_total,total:fee_total+tax_total}}
// validasi dan penambahan versi (bukan menimpa)
function rateChk(o){const m=s=>(s||"").trim();const e=(f,t)=>{const x=Error(t);x.f=f;return x};
 const code=m(o.fee_code).toUpperCase();if(!/^[A-Z0-9_]{2,20}$/.test(code))throw e("rt-c","Kode 2–20 karakter: huruf besar, angka, atau _");
 if(!m(o.fee_name))throw e("rt-n","Nama biaya wajib");if(!FEE_TYPES.some(x=>x[0]===o.fee_type))throw e("rt-j","Jenis biaya tidak valid");
 if(!FEE_METHODS.some(x=>x[0]===o.calc_method))throw e("rt-m","Metode hitung tidak valid");
 const rate=Number(String(o.rate==null?0:o.rate).replace(",","."))||0,fx=+o.fixed_amount||0,mn=+o.minimum||0,mx=+o.maximum||0;if(rate<0||fx<0||mn<0||mx<0)throw e("rt-r","Nilai tidak boleh negatif");
 let tiers=null,tier_unit="bulan";if(o.calc_method==="bertingkat"){if(o.fee_type!=="jasa")throw e("rt-m","Metode bertingkat hanya untuk jenis Jasa / bunga");tier_unit=o.tier_unit==="tahun"?"tahun":"bulan";const T=(o.tiers||[]).map(t=>({upto:t.upto==null||t.upto===""?null:Math.round(+t.upto),rate:Number(String(t.rate).replace(",","."))}));
  if(!T.length)throw e("rt-k1","Isi minimal satu tingkat jasa");T.forEach((t,i)=>{if(!(t.rate>0&&t.rate<=100))throw e("rt-k"+(i+1)+"r","Persentase jasa tiap tingkat 0–100 dan lebih dari 0");if(i<T.length-1&&!(t.upto>0))throw e("rt-k"+(i+1),"Batas pokok tiap tingkat harus lebih dari 0");if(i>0&&T[i-1].upto!=null&&t.upto!=null&&t.upto<=T[i-1].upto)throw e("rt-k"+(i+1),"Batas pokok harus lebih besar dari tingkat sebelumnya")});
  T[T.length-1].upto=null;tiers=T}
 if(o.calc_method==="bertingkat"){}else if(o.calc_method==="persen"&&!(rate>0||fx>0))throw e("rt-r","Isi persentase atau nominal tambahan");if(o.calc_method==="tetap"&&!(fx>0))throw e("rt-f","Isi nominal tetap");
 if((o.calc_method==="per_hari"||o.calc_method==="per_bulan")&&!(rate>0||fx>0))throw e("rt-r","Isi persentase atau nominal per periode");
 if(rate>100)throw e("rt-r","Persentase maksimal 100");if(mx>0&&mn>mx)throw e("rt-x","Minimum tidak boleh melebihi maksimum");
 if(!/^\d{4}-\d{2}-\d{2}$/.test(o.effective_from||""))throw e("rt-d","Tanggal berlaku wajib");
 const base=o.calc_method==="tetap"?"":(o.base||"pokok");if(base&&!FEE_BASES.some(x=>x[0]===base))throw e("rt-b","Dasar tidak valid");
 return{...(tiers?{tiers,tier_unit}:{}),fee_code:code,fee_name:m(o.fee_name),fee_type:o.fee_type,calc_method:o.calc_method,base,rate,fixed_amount:fx,minimum:mn,maximum:mx,taxable:!!o.taxable&&o.fee_type!=="tabwajib",effective_from:o.effective_from}}
function addRateVersion(o){const x=rateChk(o),prev=rateRows().filter(r=>r.fee_code===x.fee_code).sort((a,b)=>a.effective_from<b.effective_from?-1:1),last=prev[prev.length-1];
 if(last&&x.effective_from<=last.effective_from){const e=Error("Tanggal berlaku harus setelah versi terakhir ("+last.effective_from+")");e.f="rt-d";throw e}
 if(last&&!last.effective_until)last.effective_until=addDays(x.effective_from,-1);
 const r=Object.assign({_id:uid("RT"),version:prev.length+1,effective_until:null,active:true},x);rateRows().push(r);return r}
function addTaxVersion(o){const m=s=>(s||"").trim(),e=(f,t)=>{const x=Error(t);x.f=f;return x};
 const code=m(o.tax_code).toUpperCase();if(!/^[A-Z0-9_]{2,20}$/.test(code))throw e("tx-c","Kode 2–20 karakter: huruf besar, angka, atau _");
 const rate=+o.tax_rate;if(!Number.isFinite(rate)||rate<0||rate>100)throw e("tx-r","Tarif pajak 0–100%");if(!/^\d{4}-\d{2}-\d{2}$/.test(o.effective_from||""))throw e("tx-d","Tanggal berlaku wajib");
 const prev=taxRows().filter(r=>r.tax_code===code).sort((a,b)=>a.effective_from<b.effective_from?-1:1),last=prev[prev.length-1];
 if(last&&o.effective_from<=last.effective_from)throw e("tx-d","Tanggal berlaku harus setelah versi terakhir ("+last.effective_from+")");
 if(last&&!last.effective_until)last.effective_until=addDays(o.effective_from,-1);
 const r={_id:uid("TX"),tax_code:code,tax_name:m(o.tax_name)||code,tax_type:m(o.tax_type)||"pajak",tax_rate:rate,taxable_base:"fee",calculation_method:"persen",effective_from:o.effective_from,effective_until:null,version:prev.length+1,active:true};taxRows().push(r);return r}
// v1.1.059: kode otomatis (biaya per jenis: ADM001, PRV001, ...; pajak PJK001) bila tidak diisi; boleh diganti manual
const FEE_PFX={tabwajib:"TBW",jasa:"JASA",administrasi:"ADM",provisi:"PRV",materai:"MTR",transfer:"TRF",denda:"DND",pelunasan:"PLN",restruk:"RST",lain:"LAIN"};
const seqCode=(p,codes)=>{const re=new RegExp("^"+p+"(\\d{3,})$");let mx=0;for(const c of codes){const m=re.exec(c||"");if(m)mx=Math.max(mx,+m[1])}return p+String(mx+1).padStart(3,"0")};
const nextFeeCode=t=>seqCode(FEE_PFX[t]||"BYA",rateRows().map(r=>r.fee_code)),nextTaxCode=()=>seqCode("PJK",taxRows().map(r=>r.tax_code));
const isAutoCode=c=>!c||/^[A-Z]{2,4}\d{3,}$/.test(c);
function rtJenis(t){const e=$("#rt-c");if(e&&isAutoCode(e.value.trim()))e.value=nextFeeCode(t)}
function saveRate(){try{const v=i=>$("#"+i).value;const r=addRateVersion({fee_code:v("rt-c").trim()||nextFeeCode(v("rt-j")),fee_name:v("rt-n"),fee_type:v("rt-j"),calc_method:v("rt-m"),base:v("rt-b"),rate:String(v("rt-r")).replace(",","."),fixed_amount:pn(v("rt-f")),minimum:pn(v("rt-x")),maximum:pn(v("rt-y")),taxable:v("rt-t")==="1",effective_from:v("rt-d"),tier_unit:v("rt-ku"),tiers:[1,2].map(i=>({upto:pn(v("rt-k"+i)),rate:v("rt-k"+i+"r")})).filter(t=>t.upto&&String(t.rate).trim()).concat(String(v("rt-k3r")).trim()?[{upto:null,rate:v("rt-k3r")}]:[])});
 audit("create","rate_master",r._id,r.fee_code+" v"+r.version,null,{b:null,a:{metode:r.calc_method,tarif:r.rate,nominal:r.fixed_amount,pajak:r.taxable,berlaku:r.effective_from}});save();okM();S.msg="Tarif "+r.fee_code+" versi "+r.version+" ditambahkan"}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function saveTax(){try{const v=i=>$("#"+i).value;const r=addTaxVersion({tax_code:v("tx-c").trim()||nextTaxCode(),tax_name:v("tx-n"),tax_rate:String(v("tx-r")).replace(",","."),effective_from:v("tx-d")});
 audit("create","tax_master",r._id,r.tax_code+" v"+r.version,null,{b:null,a:{tarif:r.tax_rate,berlaku:r.effective_from}});save();okM();S.msg="Pajak "+r.tax_code+" versi "+r.version+" ditambahkan"}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function togRate(id,tax){const r=(tax?taxRows():rateRows()).find(x=>x._id===id);if(!r)return;r.active=r.active===false;audit("update",tax?"tax_master":"rate_master",id,(r.active?"aktifkan ":"nonaktifkan ")+(r.fee_code||r.tax_code),null,{b:{aktif:!r.active},a:{aktif:r.active}});save();render()}
function rateHit(){try{const v=i=>$("#"+i).value,d=v("rv-d")||today();const in_={date:d,pokok:+pn(v("rv-p"))||0,sisa_pokok:+pn(v("rv-s"))||0,angsuran:+pn(v("rv-a"))||0,tunggakan:+pn(v("rv-t"))||0,hari:+v("rv-h")||0,bulan:+v("rv-b")||0};S.rv=Object.assign({},in_,{out:calcFees(in_)})}catch(e){S.msg="⚠ "+e.message}render()}
MK.rt="ert";MK.tx="etx";
MD.rt=()=>({t:"Tambah versi tarif",s:"saveRate()",y:"Simpan versi",b:`<p class="k">Mengubah tarif membuat <b>versi baru</b>; versi lama ditutup sehari sebelum tanggal berlaku dan transaksi lama tidak berubah. Pakai kode yang sama untuk menambah versi.</p>`
 +fld("rt-c","Kode biaya",{hint:"Otomatis menurut jenis (mis. ADM001); boleh diganti kode sendiri. Kode yang sudah ada = versi baru.",value:S.ert||nextFeeCode("administrasi")})+fld("rt-n","Nama biaya",{req:1})+fld("rt-j","Jenis",{t:"select",a:' onchange="rtJenis(this.value)"',opts:opt(FEE_TYPES,x=>x,"administrasi")})
 +fld("rt-m","Metode hitung",{t:"select",opts:opt(FEE_METHODS,x=>x,"persen")})+fld("rt-b","Dasar pengenaan",{t:"select",opts:opt(FEE_BASES,x=>x,"pokok")})
 +fld("rt-t","Dikenai pajak",{t:"select",opts:opt([["0","Tidak"],["1","Ya"]],x=>x,"0")})+fld("rt-d","Berlaku mulai",{type:"date",value:today(),req:1})
 +fld("rt-r","Persentase (%)",{a:' inputmode="decimal" autocomplete="off"',value:""})+fld("rt-f","Nominal (Rp)",{a:RPA,value:""})+fld("rt-x","Minimum (Rp, 0 = tanpa)",{a:RPA,value:""})+fld("rt-y","Maksimum (Rp, 0 = tanpa)",{a:RPA,value:""})
 +'<p class="k"><b>Jasa bertingkat</b> (isi hanya bila Metode = Bertingkat, jenis Jasa). Seluruh pokok memakai satu persentase menurut besar pokok. Contoh: pokok kurang dari 10.000.000 = 2% per bulan, kurang dari 50.000.000 = 1,75%, seterusnya 1,5%.</p>'
 +fld("rt-ku","Satuan persentase",{t:"select",opts:opt([["bulan","per bulan"],["tahun","per tahun"]],x=>x,"bulan")})
 +fld("rt-k1","Tingkat 1: pokok kurang dari (Rp)",{a:RPA,value:""})+fld("rt-k1r","Tingkat 1: persentase (%)",{a:' inputmode="decimal" autocomplete="off"',value:""})
 +fld("rt-k2","Tingkat 2: pokok kurang dari (Rp)",{a:RPA,value:""})+fld("rt-k2r","Tingkat 2: persentase (%)",{a:' inputmode="decimal" autocomplete="off"',value:""})
 +fld("rt-k3r","Seterusnya (pokok di atas tingkat terakhir): persentase (%)",{a:' inputmode="decimal" autocomplete="off"',value:""})});
MD.tx=()=>({t:"Tambah versi pajak",s:"saveTax()",y:"Simpan versi",b:`<p class="k">Pajak dihitung dari fee yang bertanda <b>Dikenai pajak</b>, terpisah dari pendapatan BUMDes. Tidak ada tarif bawaan.</p>`
 +fld("tx-c","Kode pajak",{hint:"Otomatis (PJK001, PJK002, ...); boleh diganti, mis. PPN atau PPH23. Kode yang sudah ada = versi baru.",value:nextTaxCode()})+fld("tx-n","Nama pajak")+fld("tx-r","Tarif (%)",{a:' inputmode="decimal" autocomplete="off"',req:1})+fld("tx-d","Berlaku mulai",{type:"date",value:today(),req:1})});
// v1.1.055: data contoh untuk master tarif & pajak; hanya menambah kode yang belum ada, tidak menimpa
const RATE_DEMO=[["BUNGA12","Jasa pinjaman 12% per tahun","jasa","persen","pokok","12",0,0,0],["BUNGA18","Jasa pinjaman 18% per tahun","jasa","persen","pokok","18",0,0,0],["BUNGA24","Jasa pinjaman 24% per tahun","jasa","persen","pokok","24",0,0,0],["ADM","Biaya administrasi 1%","administrasi","persen","pokok","1",0,25000,500000,true],["MATERAI","Materai","materai","tetap","","",10000,0,0],["TRF","Biaya transfer","transfer","tetap","","",6500,0,0,true],["DENDA1","Denda keterlambatan","denda","per_hari","tunggakan","0.1",0,0,0],["PELUNASAN","Biaya pelunasan dipercepat 1%","pelunasan","persen","sisa_pokok","1",0,0,0],["TABWAJIB","Tabungan wajib 2% dari pokok","tabwajib","persen","pokok","2",0,0,0],["BUNGATGKT","Jasa bertingkat menurut pokok","jasa","bertingkat","pokok","",0,0,0,false,[{upto:10000000,rate:2},{upto:50000000,rate:1.75},{upto:null,rate:1.5}]]];
function isiContohTarif(){try{const d=today().slice(0,4)+"-01-01";let n=0;
 for(const[c,nm,j,m,b,r,f,mn,mx,tk,tg]of RATE_DEMO){const ex=rateRows().filter(x=>x.fee_code===c);if(ex.length){if(tk&&ex.length===1&&!ex[0].taxable){ex[0].taxable=true;audit("update","rate_master",ex[0]._id,c+" kena pajak (contoh)");n++}continue}const x=addRateVersion({fee_code:c,fee_name:nm,fee_type:j,calc_method:m,base:b,rate:r,fixed_amount:String(f),minimum:String(mn),maximum:String(mx),taxable:!!tk,effective_from:d,tiers:tg,tier_unit:"bulan"});audit("create","rate_master",x._id,x.fee_code+" v1 (contoh)");n++}
 if(!taxRows().some(x=>x.tax_code==="PPN")){const x=addTaxVersion({tax_code:"PPN",tax_name:"PPN 11%",tax_rate:"11",effective_from:d});audit("create","tax_master",x._id,"PPN v1 (contoh)");n++}
 save();S.msg=n?n+" data contoh tarif & pajak ditambahkan":"Data contoh sudah ada semua"}catch(e){S.msg="⚠ "+e.message}render()}
function vTarifBiaya(){const td=today(),tq=S.tq||"",R=rateRows().filter(x=>mhit(tq,x.fee_code,x.fee_name,ftName(x.fee_type))).slice().sort((a,b)=>a.fee_code<b.fee_code?-1:a.fee_code>b.fee_code?1:a.effective_from<b.effective_from?-1:1),T=taxRows().slice().sort((a,b)=>a.tax_code<b.tax_code?-1:a.tax_code>b.tax_code?1:a.effective_from<b.effective_from?-1:1);
 const st=r=>r.active===false?"Nonaktif":r.effective_from>td?"Akan berlaku":inEff(r,td)?"Berlaku":"Berakhir",mt=r=>(FEE_METHODS.find(x=>x[0]===r.calc_method)||[0,""])[1],val=r=>r.calc_method==="tetap"?"Rp "+fm(r.fixed_amount):(r.rate?r.rate.toLocaleString("id-ID")+"%":"")+(r.fixed_amount?(r.rate?" + ":"")+"Rp "+fm(r.fixed_amount):"");
 const rows=R.map(r=>mrow("rt",r._id,esc(r.fee_code)+" v"+(r.version||1),esc(r.fee_name)+" · "+esc(ftName(r.fee_type)),esc(mt(r)),esc(r.tiers?tierText(r):val(r)),esc(r.effective_from)+(r.effective_until?" s/d "+esc(r.effective_until):" →"),[r.active===false?"wr":inEff(r,td)?"ok":"",st(r)])),
  trs=T.map(r=>mrow("tx",r._id,esc(r.tax_code)+" v"+(r.version||1),esc(r.tax_name),"",r.tax_rate.toLocaleString("id-ID")+"%",esc(r.effective_from)+(r.effective_until?" s/d "+esc(r.effective_until):" →"),[r.active===false?"wr":inEff(r,td)?"ok":"",st(r)]));
 const pv=S.rv,po=pv&&pv.out,K=(k,v)=>`<div class="kv"><span class="k">${k}</span><b>${v}</b></div>`;
 const pvh=po?(po.items.length?tbl(["Biaya","Dasar","Fee","Pajak","Total"],po.items.map(i=>`<tr><td>${esc(i.fee_code)} <span class="k">v${i.version}</span></td><td class="n">${i.dasar?"Rp "+fm(i.dasar):"-"}</td><td class="n">Rp ${fm(i.amount)}</td><td class="n">Rp ${fm(i.tax)}</td><td class="n">Rp ${fm(i.total)}</td></tr>`))+K("Total fee","Rp "+fm(po.fee_total))+K("Total pajak","Rp "+fm(po.tax_total))+K("Total dipungut","Rp "+fm(po.total)):`<p class="k">Tidak ada tarif yang berlaku pada ${po.date}.</p>`):"";
 const pf=(id,l,v,a)=>fld(id,l,{value:v==null?"":v,a:a||RPA});
 return`<h2>Tarif & Biaya</h2><p class="k">Master tarif berversi untuk fee dan pajak. Jasa dan biaya pencairan pinjaman baru diambil dari sini. Untuk mencoba, isi data contoh lalu ubah sesuai kebijakan BUMDes.</p>${addB("Tambah versi tarif","rt")}<button class="b s" onclick="isiContohTarif()">Isi data contoh</button><div class="fl">${mq("tq","Cari kode / nama biaya…","Cari tarif")}</div>
 ${mlist(["Biaya","Metode","Tarif","Berlaku"],rows,(tq.trim()?"Tidak ada tarif yang cocok.":"Belum ada tarif. Tambahkan versi tarif pertama."))}
 <h2>Pajak</h2>${addB("Tambah versi pajak","tx")}${mlist(["Pajak","","Tarif","Berlaku"],trs,"Belum ada pajak (tanpa tarif bawaan).")}
 <h2>Pratinjau hitung</h2><div class="card">${fld("rv-d","Tanggal transaksi",{type:"date",value:pv?pv.date:td})}${pf("rv-p","Pokok (Rp)",pv&&pv.pokok?fm(pv.pokok):"")}${pf("rv-s","Sisa pokok (Rp)",pv&&pv.sisa_pokok?fm(pv.sisa_pokok):"")}${pf("rv-a","Angsuran (Rp)",pv&&pv.angsuran?fm(pv.angsuran):"")}${pf("rv-t","Tunggakan (Rp)",pv&&pv.tunggakan?fm(pv.tunggakan):"")}${pf("rv-h","Jumlah hari",pv&&pv.hari||"",' inputmode="numeric" autocomplete="off"')}${pf("rv-b","Jumlah bulan",pv&&pv.bulan||"",' inputmode="numeric" autocomplete="off"')}<button class="b" onclick="rateHit()">Hitung</button>${pvh}</div>`}

// ===== SP1 tahap 2 (v1.1.022): biaya dan pajak saat pencairan — dipotong dari pinjaman; dana bersih = pokok − biaya − pajak =====
const DISB_TYPES=["administrasi","provisi","materai","transfer","lain","tabwajib"];
// v1.1.054: bila Setelan belum memilih kode, semua tarif Administrasi/Provisi/Materai/Transfer/Biaya lain yang berlaku di Master Tarif & Biaya ikut dipotong otomatis
const disbAuto=d=>[...new Set(rateRows().filter(r=>DISB_TYPES.includes(r.fee_type)).map(r=>r.fee_code))].filter(c=>rateAt(c,d||today())),
 disbCodes=d=>Array.isArray(db.settings.disb_codes)?db.settings.disb_codes:disbAuto(d);
// tarif jasa (bunga) dari master yang berlaku pada tanggal d: persentase per tahun
// v1.1.057: jasa bertingkat menurut pokok. Seluruh pokok memakai satu persentase: tingkat pertama yang batasnya lebih besar dari pokok
const tierRate=(r,P)=>{if(!r||!r.tiers)return r?+r.rate:null;const t=r.tiers.find(t=>t.upto==null||P<t.upto)||r.tiers[r.tiers.length-1];return+(t.rate*(r.tier_unit==="tahun"?1:12)).toFixed(4)},
 tierInfo=(r,P)=>{if(!r||!r.tiers)return"";const t=r.tiers.find(t=>t.upto==null||P<t.upto)||r.tiers[r.tiers.length-1],u=r.tier_unit==="tahun"?"tahun":"bulan";return String(t.rate).replace(".",",")+"% per "+u+(u==="bulan"?" ("+String(tierRate(r,P)).replace(".",",")+"% per tahun)":"")},
 tierText=r=>r&&r.tiers?r.tiers.map((t,i,A)=>(t.upto==null?(i?"seterusnya ":"semua pokok "):"pokok < "+fm(t.upto)+" ")+String(t.rate).replace(".",",")+"%/"+(r.tier_unit==="tahun"?"thn":"bln")).join("; "):"",
 jasaFor=(c,P,d)=>{const r=rateAt(c,d||today());return r?tierRate(r,P):null};
const jasaRates=d=>[...new Set(rateRows().filter(r=>r.fee_type==="jasa").map(r=>r.fee_code))].map(c=>({c,r:rateAt(c,d||today())})).filter(x=>x.r&&((x.r.calc_method==="persen"&&+x.r.rate>0)||(x.r.calc_method==="bertingkat"&&x.r.tiers&&x.r.tiers.length))).map(x=>({code:x.c,name:x.r.fee_name||x.c,rate:x.r.tiers?null:+x.r.rate,tiers:!!x.r.tiers,version:x.r.version||1}));
const disbPreview=(P,r,n,m,d,codes,qty)=>{try{return disbFee({principal:P,interest_rate:r,tenor:n,interest_method:m,calc:calcSet(),...(Array.isArray(codes)?{disb_codes:codes}:{}),...(qty?{disb_qty:qty}:{})},d)}catch(e){return null}};
function disbFee(l,d){const codes=(Array.isArray(l.disb_codes)?l.disb_codes:disbCodes(d)).filter(c=>{const r=rateAt(c,d);return r&&DISB_TYPES.includes(r.fee_type)});if(!codes.length)return null;
 let ang=0;try{ang=buildSchedule({principal:l.principal,rate:l.interest_rate,tenor:l.tenor,method:l.interest_method,start:d,...calcOf(l)})[0].total_due}catch(e){}
 const r=calcFees({date:d,codes,pokok:l.principal,sisa_pokok:l.principal,angsuran:ang,bulan:l.tenor,hari:0,qty:l.disb_qty});if(!r.items.length)return null;
 // v1.1.063: tabungan wajib bukan biaya/pendapatan: dipisah dan masuk ke rekening tabungan nasabah saat pencairan
 const sv=r.items.filter(i=>i.fee_type==="tabwajib"),fs=r.items.filter(i=>i.fee_type!=="tabwajib"),ft=fs.reduce((a,i)=>a+i.amount,0),tt=fs.reduce((a,i)=>a+i.tax,0);
 return{...r,items:fs,sav_items:sv.map(i=>({...i,tax:0,taxes:[],total:i.amount})),sav_total:sv.reduce((a,i)=>a+i.amount,0),fee_total:ft,tax_total:tt,total:ft+tt}}
// v1.1.056: blok "Tarif, biaya & pajak dari master" di form pengajuan (selalu tampil; hitungan muncul setelah pokok diisi)
const feeDesc=r=>{const mt=r.calc_method,pr=+r.rate,fx=+r.fixed_amount,b=(FEE_BASES.find(x=>x[0]===r.base)||[0,""])[1].toLowerCase();let t=mt==="tetap"?"Rp "+fm(fx):(pr?String(pr).replace(".",",")+"% dari "+b:"")+(fx?(pr?" + ":"")+"Rp "+fm(fx):"");if(+r.minimum>0)t+=", min Rp "+fm(r.minimum);if(+r.maximum>0)t+=", maks Rp "+fm(r.maximum);return t};
function feeInfoHtml(P,r,n,m,d){const sel=typeof feeSel==="function"?feeSel():null;const K=(k,x)=>`<div class="kv"><span class="k">${k}</span><b>${x}</b></div>`,codes=(sel||disbCodes(d)).filter(c=>{const q=rateAt(c,d);return q&&DISB_TYPES.includes(q.fee_type)}),tx=[...new Set(taxRows().map(t=>t.tax_code))].map(c=>taxAt(c,d)).filter(Boolean);
 if(!codes.length&&!tx.length)return`<div class="k">Tarif, biaya & pajak dari Master</div><p class="k">Belum ada biaya pencairan atau pajak di Master > Tarif & Biaya. Tekan Isi data contoh di sana untuk mencoba.</p>`;
 const D=P>0&&Number.isFinite(r)&&Number.isInteger(n)&&n>=1&&n<=360?disbPreview(P,r,n,m,d,sel,typeof feeQtyMap==="function"?feeQtyMap():null):null;
 const rows=D?D.items.map(i=>K(esc(i.fee_name||i.fee_code)+(i.qty?" ×"+i.qty:"")+' <span class="k">'+esc(feeDesc(rateAt(i.fee_code,d)||{}))+"</span>",rp(i.amount)+(i.tax?" + pajak "+rp(i.tax):""))).join("")+K("Total biaya",rp(D.fee_total))+(D.tax_total?K("Total pajak ("+tx.map(t=>esc(t.tax_code)+" "+String(t.tax_rate).replace(".",",")+"%").join(", ")+")",rp(D.tax_total)):"")+(D.sav_total?D.sav_items.map(i=>K(esc(i.fee_name||i.fee_code)+(i.qty?" ×"+i.qty:"")+' <span class="k">masuk tabungan nasabah</span>',rp(i.amount))).join("")+K("Total tabungan wajib",rp(D.sav_total)):"")+K("Dana bersih diterima",rp(P-D.fee_total-D.tax_total-(D.sav_total||0))):codes.map(c=>{const q=rateAt(c,d);return K(esc(q.fee_name||c)+(q.taxable?' <span class="k">kena pajak</span>':""),esc(feeDesc(q)))}).join("");
 return`<div class="k">Tarif, biaya & pajak dari Master (otomatis)</div><div class="kvg">${rows}</div>${!D&&tx.length?`<div class="k">Pajak berlaku: ${tx.map(t=>esc(t.tax_code)+" "+String(t.tax_rate).replace(".",",")+"%").join(", ")} (dikenakan pada biaya bertanda kena pajak)</div>`:""}${D?"":'<div class="k">Isi pokok dan tenor untuk melihat nominal dan dana bersih.</div>'}`}
function setDisb(code,on){try{if(!rateRows().some(r=>r.fee_code===code&&DISB_TYPES.includes(r.fee_type)))throw Error("Kode tarif tidak dapat dipakai saat pencairan");const s=new Set(disbCodes(today()));on?s.add(code):s.delete(code);db.settings.disb_codes=[...s];audit("setting","settings","disb_codes",code+(on?" dipungut saat pencairan":" tidak dipungut saat pencairan"));save();S.msg="Biaya pencairan disimpan; berlaku untuk pencairan berikutnya"}catch(e){S.msg="⚠ "+e.message}render()}
const disbTxt=(l,d)=>{const r=disbFee(l,d);if(!r)return"Tanpa potongan biaya saat pencairan.";return"Potongan biaya Rp "+fm(r.fee_total)+(r.tax_total?" + pajak Rp "+fm(r.tax_total):"")+(r.sav_total?" + tabungan wajib Rp "+fm(r.sav_total):"")+" → dana bersih diterima Rp "+fm(l.principal-r.fee_total-r.tax_total-(r.sav_total||0))};
