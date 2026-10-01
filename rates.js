// ===== v1.1.007 — SP1 tahap 1: Mesin Tarif & Biaya (rate_master, tax_master berversi, calcFees murni) =====
const FEE_TYPES=[["jasa","Jasa / bunga"],["administrasi","Administrasi"],["provisi","Provisi"],["materai","Materai"],["transfer","Transfer"],["denda","Denda keterlambatan"],["pelunasan","Pelunasan dipercepat"],["restruk","Restrukturisasi"],["lain","Biaya lain"]],
 FEE_METHODS=[["persen","Persentase dari dasar"],["tetap","Nominal tetap"],["per_hari","Per hari (× hari)"],["per_bulan","Per bulan (× bulan)"]],
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
  const base=r.base?+ctx[r.base]||0:0,rt=(+r.rate||0)/100,fx=+r.fixed_amount||0;let a=0,dasar=base;
  if(r.calc_method==="tetap"){a=fx;dasar=0}
  else if(r.calc_method==="persen")a=base*rt+fx;
  else if(r.calc_method==="per_hari")a=(r.rate?base*rt:fx)*(+ctx.hari||0);
  else if(r.calc_method==="per_bulan")a=(r.rate?base*rt:fx)*(+ctx.bulan||0);
  a=rd0(a);if(+r.minimum>0&&a<r.minimum)a=rd0(r.minimum);if(+r.maximum>0&&a>r.maximum)a=rd0(r.maximum);
  let tax=0;const tl=[];if(r.taxable)for(const tc of [...new Set(TT.map(t=>t.tax_code))]){const t=pick(TT,"tax_code",tc);if(!t)continue;const v=rd0(a*(+t.tax_rate||0)/100);tax+=v;tl.push({code:tc,rate:+t.tax_rate,amount:v})}
  items.push({fee_code:c,fee_name:r.fee_name,fee_type:r.fee_type,version:r.version||1,base:r.base||"",dasar:rd0(dasar),amount:a,tax:tax,taxes:tl,total:a+tax});fee_total+=a;tax_total+=tax}
 return{date:d,items,fee_total,tax_total,total:fee_total+tax_total}}
// validasi dan penambahan versi (bukan menimpa)
function rateChk(o){const m=s=>(s||"").trim();const e=(f,t)=>{const x=Error(t);x.f=f;return x};
 const code=m(o.fee_code).toUpperCase();if(!/^[A-Z0-9_]{2,20}$/.test(code))throw e("rt-c","Kode 2–20 karakter: huruf besar, angka, atau _");
 if(!m(o.fee_name))throw e("rt-n","Nama biaya wajib");if(!FEE_TYPES.some(x=>x[0]===o.fee_type))throw e("rt-j","Jenis biaya tidak valid");
 if(!FEE_METHODS.some(x=>x[0]===o.calc_method))throw e("rt-m","Metode hitung tidak valid");
 const rate=Number(String(o.rate==null?0:o.rate).replace(",","."))||0,fx=+o.fixed_amount||0,mn=+o.minimum||0,mx=+o.maximum||0;if(rate<0||fx<0||mn<0||mx<0)throw e("rt-r","Nilai tidak boleh negatif");
 if(o.calc_method==="persen"&&!(rate>0||fx>0))throw e("rt-r","Isi persentase atau nominal tambahan");if(o.calc_method==="tetap"&&!(fx>0))throw e("rt-f","Isi nominal tetap");
 if((o.calc_method==="per_hari"||o.calc_method==="per_bulan")&&!(rate>0||fx>0))throw e("rt-r","Isi persentase atau nominal per periode");
 if(rate>100)throw e("rt-r","Persentase maksimal 100");if(mx>0&&mn>mx)throw e("rt-x","Minimum tidak boleh melebihi maksimum");
 if(!/^\d{4}-\d{2}-\d{2}$/.test(o.effective_from||""))throw e("rt-d","Tanggal berlaku wajib");
 const base=o.calc_method==="tetap"?"":(o.base||"pokok");if(base&&!FEE_BASES.some(x=>x[0]===base))throw e("rt-b","Dasar tidak valid");
 return{fee_code:code,fee_name:m(o.fee_name),fee_type:o.fee_type,calc_method:o.calc_method,base,rate,fixed_amount:fx,minimum:mn,maximum:mx,taxable:!!o.taxable,effective_from:o.effective_from}}
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
function saveRate(){try{const v=i=>$("#"+i).value;const r=addRateVersion({fee_code:v("rt-c"),fee_name:v("rt-n"),fee_type:v("rt-j"),calc_method:v("rt-m"),base:v("rt-b"),rate:String(v("rt-r")).replace(",","."),fixed_amount:pn(v("rt-f")),minimum:pn(v("rt-x")),maximum:pn(v("rt-y")),taxable:v("rt-t")==="1",effective_from:v("rt-d")});
 audit("create","rate_master",r._id,r.fee_code+" v"+r.version);save();okM();S.msg="Tarif "+r.fee_code+" versi "+r.version+" ditambahkan"}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function saveTax(){try{const v=i=>$("#"+i).value;const r=addTaxVersion({tax_code:v("tx-c"),tax_name:v("tx-n"),tax_rate:String(v("tx-r")).replace(",","."),effective_from:v("tx-d")});
 audit("create","tax_master",r._id,r.tax_code+" v"+r.version);save();okM();S.msg="Pajak "+r.tax_code+" versi "+r.version+" ditambahkan"}catch(e){S.msg="⚠ "+e.message;S.fe=e.f?{id:e.f,m:e.message}:null}render()}
function togRate(id,tax){const r=(tax?taxRows():rateRows()).find(x=>x._id===id);if(!r)return;r.active=r.active===false;audit("update",tax?"tax_master":"rate_master",id,(r.active?"aktifkan ":"nonaktifkan ")+(r.fee_code||r.tax_code));save();render()}
function rateHit(){try{const v=i=>$("#"+i).value,d=v("rv-d")||today();const in_={date:d,pokok:+pn(v("rv-p"))||0,sisa_pokok:+pn(v("rv-s"))||0,angsuran:+pn(v("rv-a"))||0,tunggakan:+pn(v("rv-t"))||0,hari:+v("rv-h")||0,bulan:+v("rv-b")||0};S.rv=Object.assign({},in_,{out:calcFees(in_)})}catch(e){S.msg="⚠ "+e.message}render()}
MK.rt="ert";MK.tx="etx";
MD.rt=()=>({t:"Tambah versi tarif",s:"saveRate()",y:"Simpan versi",b:`<p class="k">Mengubah tarif membuat <b>versi baru</b>; versi lama ditutup sehari sebelum tanggal berlaku dan transaksi lama tidak berubah. Pakai kode yang sama untuk menambah versi.</p>`
 +fld("rt-c","Kode biaya",{req:1,hint:"Contoh: ADM, PROVISI, DENDA. Kode yang sudah ada = versi baru.",value:S.ert||""})+fld("rt-n","Nama biaya",{req:1})+fld("rt-j","Jenis",{t:"select",opts:opt(FEE_TYPES,x=>x,"administrasi")})
 +fld("rt-m","Metode hitung",{t:"select",opts:opt(FEE_METHODS,x=>x,"persen")})+fld("rt-b","Dasar pengenaan",{t:"select",opts:opt(FEE_BASES,x=>x,"pokok")})
 +fld("rt-t","Dikenai pajak",{t:"select",opts:opt([["0","Tidak"],["1","Ya"]],x=>x,"0")})+fld("rt-d","Berlaku mulai",{type:"date",value:today(),req:1})
 +fld("rt-r","Persentase (%)",{a:' inputmode="decimal" autocomplete="off"',value:""})+fld("rt-f","Nominal (Rp)",{a:RPA,value:""})+fld("rt-x","Minimum (Rp, 0 = tanpa)",{a:RPA,value:""})+fld("rt-y","Maksimum (Rp, 0 = tanpa)",{a:RPA,value:""})});
MD.tx=()=>({t:"Tambah versi pajak",s:"saveTax()",y:"Simpan versi",b:`<p class="k">Pajak dihitung dari fee yang bertanda <b>Dikenai pajak</b>, terpisah dari pendapatan BUMDes. Tidak ada tarif bawaan.</p>`
 +fld("tx-c","Kode pajak",{req:1,hint:"Contoh: PPN, PPH23"})+fld("tx-n","Nama pajak")+fld("tx-r","Tarif (%)",{a:' inputmode="decimal" autocomplete="off"',req:1})+fld("tx-d","Berlaku mulai",{type:"date",value:today(),req:1})});
function vTarifBiaya(){const td=today(),R=rateRows().slice().sort((a,b)=>a.fee_code<b.fee_code?-1:a.fee_code>b.fee_code?1:a.effective_from<b.effective_from?-1:1),T=taxRows().slice().sort((a,b)=>a.tax_code<b.tax_code?-1:a.tax_code>b.tax_code?1:a.effective_from<b.effective_from?-1:1);
 const st=r=>r.active===false?"Nonaktif":r.effective_from>td?"Akan berlaku":inEff(r,td)?"Berlaku":"Berakhir",mt=r=>(FEE_METHODS.find(x=>x[0]===r.calc_method)||[0,""])[1],val=r=>r.calc_method==="tetap"?"Rp "+fm(r.fixed_amount):(r.rate?r.rate.toLocaleString("id-ID")+"%":"")+(r.fixed_amount?(r.rate?" + ":"")+"Rp "+fm(r.fixed_amount):"");
 const rows=R.map(r=>`<tr><td><b>${esc(r.fee_code)}</b> v${r.version||1}<br><span class="k">${esc(r.fee_name)} · ${esc(ftName(r.fee_type))}</span></td><td>${esc(mt(r))}${r.base?" · "+esc((FEE_BASES.find(x=>x[0]===r.base)||[0,r.base])[1]):""}<br><span class="k">${esc(val(r))}${r.minimum?" · min Rp "+fm(r.minimum):""}${r.maximum?" · maks Rp "+fm(r.maximum):""}${r.taxable?" · kena pajak":""}</span></td><td>${r.effective_from}${r.effective_until?" s/d "+r.effective_until:" →"}</td><td>${st(r)}</td><td><button class="b s" aria-label="${r.active===false?"Aktifkan":"Nonaktifkan"} ${esc(r.fee_code)} versi ${r.version||1}" onclick="togRate('${r._id}')">${r.active===false?"Aktifkan":"Nonaktifkan"}</button></td></tr>`);
 const trs=T.map(r=>`<tr><td><b>${esc(r.tax_code)}</b> v${r.version||1}<br><span class="k">${esc(r.tax_name)}</span></td><td>${r.tax_rate.toLocaleString("id-ID")}%</td><td>${r.effective_from}${r.effective_until?" s/d "+r.effective_until:" →"}</td><td>${st(r)}</td><td><button class="b s" aria-label="${r.active===false?"Aktifkan":"Nonaktifkan"} ${esc(r.tax_code)} versi ${r.version||1}" onclick="togRate('${r._id}',1)">${r.active===false?"Aktifkan":"Nonaktifkan"}</button></td></tr>`);
 const pv=S.rv,po=pv&&pv.out,K=(k,v)=>`<div class="kv"><span class="k">${k}</span><b>${v}</b></div>`;
 const pvh=po?(po.items.length?tbl(["Biaya","Dasar","Fee","Pajak","Total"],po.items.map(i=>`<tr><td>${esc(i.fee_code)} <span class="k">v${i.version}</span></td><td class="n">${i.dasar?"Rp "+fm(i.dasar):"-"}</td><td class="n">Rp ${fm(i.amount)}</td><td class="n">Rp ${fm(i.tax)}</td><td class="n">Rp ${fm(i.total)}</td></tr>`))+K("Total fee","Rp "+fm(po.fee_total))+K("Total pajak","Rp "+fm(po.tax_total))+K("Total dipungut","Rp "+fm(po.total)):`<p class="k">Tidak ada tarif yang berlaku pada ${po.date}.</p>`):"";
 const pf=(id,l,v,a)=>fld(id,l,{value:v==null?"":v,a:a||RPA});
 return`<h2>Tarif & Biaya</h2><p class="k">Master tarif berversi untuk fee dan pajak. Mesin ini belum dipakai oleh pencairan/pembayaran; saat ini untuk pengaturan dan pratinjau hitung.</p>${addB("Tambah versi tarif","rt")}
 ${rows.length?tbl(["Biaya","Metode","Berlaku","Status",""],rows):`<div class="empty"><p>Belum ada tarif. Tambahkan versi tarif pertama.</p></div>`}
 <h2>Pajak</h2>${addB("Tambah versi pajak","tx")}${trs.length?tbl(["Pajak","Tarif","Berlaku","Status",""],trs):`<div class="empty"><p>Belum ada pajak (tanpa tarif bawaan).</p></div>`}
 <h2>Pratinjau hitung</h2><div class="card">${fld("rv-d","Tanggal transaksi",{type:"date",value:pv?pv.date:td})}${pf("rv-p","Pokok (Rp)",pv&&pv.pokok?fm(pv.pokok):"")}${pf("rv-s","Sisa pokok (Rp)",pv&&pv.sisa_pokok?fm(pv.sisa_pokok):"")}${pf("rv-a","Angsuran (Rp)",pv&&pv.angsuran?fm(pv.angsuran):"")}${pf("rv-t","Tunggakan (Rp)",pv&&pv.tunggakan?fm(pv.tunggakan):"")}${pf("rv-h","Jumlah hari",pv&&pv.hari||"",' inputmode="numeric" autocomplete="off"')}${pf("rv-b","Jumlah bulan",pv&&pv.bulan||"",' inputmode="numeric" autocomplete="off"')}<button class="b" onclick="rateHit()">Hitung</button>${pvh}</div>`}
