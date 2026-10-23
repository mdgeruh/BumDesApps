// ===== PERDAGANGAN PL8 (v1.1.363): impor penjualan dan pembelian dari CSV =====
// Penjualan: nota;tanggal;produk;jumlah;harga;pelanggan;bayar   Pembelian: nota;tanggal;produk;jumlah;harga_beli;pemasok;bayar;tempo_hari
// Satu nota = beberapa baris dengan nomor nota sama (kosong = tanggal + pihak + bayar sama). Tiap nota dicatat lewat jalur resmi (stok, HPP, jurnal); nota gagal dilewati.
const DG_IM2_MAX=1000,dgDateOk=d=>{const t=Date.parse(d+"T00:00:00Z");return!isNaN(t)&&new Date(t).toISOString().slice(0,10)===d};
function dgIm2Parse(t,kind){const G=dgCsvGrid(t);if(!G.length)throw Error("berkas kosong");if(/^(nota|no)/i.test(G[0][0])||/tanggal/i.test(G[0][1]||""))G.shift();
 const PR=dgProds(1),byN=new Map(),byC=new Map();PR.forEach(p=>{byN.set(String(p.name).trim().toLowerCase(),p);if(p.code)byC.set(String(p.code).toLowerCase(),p)});
 const ty=kind==="jual"?"pelanggan":"pemasok",PT=db.parties.filter(p=>p.type===ty&&isAct(p)),pt=n=>PT.find(p=>String(p.name).trim().toLowerCase()===n.toLowerCase()),
  num=s=>{s=String(s||"").trim();if(s==="")return NaN;return+pn(s)},N=new Map(),err=[];
 G.forEach((r,i)=>{const ln=i+2,[no,d,pn_,q,h,pa,by,tp]=r.map(x=>(x||"").trim()),pr=byN.get(pn_.toLowerCase())||byC.get(pn_.toLowerCase());
  if(!/^\d{4}-\d{2}-\d{2}$/.test(d)||!dgDateOk(d))return err.push("baris "+ln+": tanggal harus YYYY-MM-DD yang valid");
  if(!pr)return err.push("baris "+ln+": produk \""+pn_+"\" tidak ditemukan");
  const qq=num(q);if(!(qq>0))return err.push("baris "+ln+": jumlah tidak valid");
  let hh=num(h);if(h===""&&kind==="jual")hh=dgPrice(pr);if(isNaN(hh)||hh<0)return err.push("baris "+ln+": harga tidak valid");
  const cr=/^(kredit|credit|utang|piutang)/i.test(by),ptyO=pa?pt(pa):null;if(pa&&!ptyO)return err.push("baris "+ln+": "+ty+" \""+pa+"\" tidak ada");
  if(cr&&!ptyO)return err.push("baris "+ln+": kredit wajib ada "+ty);
  const k=no||d+"|"+(ptyO?ptyO._id:"")+"|"+(cr?"k":"t"),n=N.get(k)||{key:k,no,d,pty:ptyO?ptyO._id:"",cr,unit:pr.unit_id,tp:tp?String(Math.max(0,Math.round(+tp)||0)):"",items:[],ln};
  if(n.d!==d||n.pty!==(ptyO?ptyO._id:"")||n.cr!==cr)return err.push("baris "+ln+": nota "+k+" berisi tanggal/pihak/bayar berbeda");
  if(n.unit!==pr.unit_id)return err.push("baris "+ln+": barang beda unit dalam satu nota");
  const e=n.items.find(z=>z.p===pr._id&&z.h===hh);if(e)e.q=qf3(e.q+qq);else n.items.push({p:pr._id,q:qf3(qq),h:hh});N.set(k,n)});
 const L=[...N.values()].sort((a,b)=>a.d.localeCompare(b.d));if(L.length>DG_IM2_MAX)throw Error("terlalu banyak nota ("+L.length+"); pecah berkas maksimal "+DG_IM2_MAX+" nota");
 return{kind,notas:L,err,rows:L.reduce((a,n)=>a+n.items.length,0),tot:L.reduce((a,n)=>a+n.items.reduce((s,z)=>s+Math.round(z.q*z.h),0),0)}}
function dgIm2Pick(kind,inp){if(noPerm("dagang.kelola"))return;const f=inp.files&&inp.files[0];if(!f)return;inp.value="";
 f.text().then(t=>{try{if(!modOn("dagang"))throw Error("Modul Perdagangan belum aktif");const P=dgIm2Parse(t,kind);if(!P.notas.length)throw Error("tidak ada nota yang valid"+(P.err.length?"; "+P.err[0]:""));S.dgim2={...P,fn:f.name};askC("dgIm2","")}catch(e){S.dgim2=null;S.msg="⚠ Impor gagal: "+e.message;render()}})}
function dgIm2Go(){const P=S.dgim2;if(!P||noPerm("dagang.kelola"))return;const sv={h:S.dgjh,c:S.dgjc,bh:S.dgbh,bc:S.dgbc};let ok2=0,bad=[];
 try{negAny();const kas=db.cash_accounts.find(c=>isAct(c)&&c.type==="kas")||db.cash_accounts.find(isAct);if(!kas)throw Error("Belum ada kas/bank aktif");
  DG_BULK=true;
  P.notas.forEach(n=>{try{
   if(closed(n.d))throw Error("periode "+n.d.slice(0,7)+" sudah ditutup");
   if(P.kind==="jual"){S.dgjh={d:n.d,t:n.cr?"credit":"cash",k:kas._id,c:n.pty};S.dgjc=n.items.map(z=>({...z}));S.msg="";dgjSave();if(/^⚠/.test(S.msg||""))throw Error(S.msg.slice(2))}
   else dgbPost({d:n.d,t:n.cr?"credit":"cash",vd:n.pty,k:kas._id,days:n.tp,items:n.items.map(z=>({p:z.p,q:z.q,c:z.h}))});
   ok2++}catch(e){bad.push((n.no||n.key)+": "+e.message)}})}
 catch(e){S.msg="⚠ "+e.message;S.dgim2=null;DG_BULK=false;S.dgjh=sv.h;S.dgjc=sv.c;render();return}
 DG_BULK=false;S.dgjh=sv.h;S.dgjc=sv.c;S.dgbh=sv.bh;S.dgbc=sv.bc;
 audit("create",P.kind==="jual"?"sale":"purchase","import",ok2+" nota dari CSV "+P.fn);save();
 S.msg=ok2+" nota "+(P.kind==="jual"?"penjualan":"pembelian")+" diimpor"+(bad.length?" · "+bad.length+" dilewati: "+bad.slice(0,3).join("; ")+(bad.length>3?" …":""):"")+(P.err.length?" · "+P.err.length+" baris bermasalah dilewati":"");S.dgim2=null;render()}
function dgIm2Tpl(kind){try{const t=kind==="jual"?"nota,tanggal,produk,jumlah,harga,pelanggan,bayar\r\nJ-001,2026-01-05,\"Beras 10 kg\",2,135000,,tunai\r\nJ-002,2026-01-06,\"Gula pasir 1 kg\",5,16000,\"Pak Wayan\",kredit\r\n":"nota,tanggal,produk,jumlah,harga_beli,pemasok,bayar,tempo_hari\r\nB-001,2026-01-03,\"Beras 10 kg\",20,120000,\"CV Subur\",kredit,14\r\n";
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["﻿"+t],{type:"text/csv"}));a.download="templat-impor-"+(kind==="jual"?"penjualan":"pembelian")+".csv";a.click();S.msg="Templat CSV diunduh"}catch(e){S.msg="⚠ "+e.message}render()}
function dgIm2Card(){if(!can("dagang.kelola"))return"";
 const bx=(k,t,c)=>`<div class="fl"><label class="b" tabindex="0">${t}<input type="file" class="uh" accept=".csv,text/csv,text/plain" hidden onchange="dgIm2Pick('${k}',this)"></label><button class="b s" onclick="dgIm2Tpl('${k}')">Unduh templat</button></div><p class="k">${c}</p>`;
 return dcard("Impor penjualan dan pembelian dari CSV","Untuk memindahkan catatan lama; maksimal "+DG_IM2_MAX+" nota per berkas",
  `<h3>Penjualan</h3>`+bx("jual","Pilih CSV penjualan","Kolom: nota, tanggal (YYYY-MM-DD), produk (nama atau kode), jumlah, harga (kosong = harga eceran), pelanggan, bayar (tunai/kredit). Baris dengan nomor nota sama menjadi satu nota.")+`<h3>Pembelian</h3>`+bx("beli","Pilih CSV pembelian","Kolom: nota, tanggal, produk, jumlah, harga_beli, pemasok, bayar (tunai/kredit), tempo_hari.")+`<p class="k">Setiap nota dicatat seperti input biasa (stok, HPP, jurnal). Nota yang gagal, misalnya stok kurang atau periode ditutup, dilewati dan disebutkan. Urutkan berkas dari pembelian ke penjualan agar stok cukup.</p>`,"")}
// ----- pengingat piutang WhatsApp dan kartu piutang pelanggan (berkas HTML mandiri) -----
function dgqRows(P){return dgjAll().filter(s=>(s.party_id||"-")===P&&s.status==="posted"&&owedS(s)>.005).sort((a,b)=>String(a.date).localeCompare(String(b.date)))}
function dgqText(P){const L=dgqRows(P),tot=Math.round(L.reduce((a,s)=>a+owedS(s),0)),t=[unitName((L[0]||{}).unit_id),"Pengingat piutang · "+dgCustNm(P),"Per "+tglS(today()),""];
 L.forEach(s=>t.push("- "+s.sale_number+" ("+tglS(s.date)+"): Rp "+fm(Math.round(owedS(s)))));t.push("","Total: Rp "+fm(tot),"Mohon dilunasi. Terima kasih.");return t.join("\n")}
function dgqWa(P){const p=db.parties.find(q=>q._id===P),n=p&&waNo(p.phone);if(!n){S.msg="⚠ Nomor telepon pelanggan tidak valid";render();return}audit("share","party",P,"pengingat piutang toko (WhatsApp)");save();window.open("https://wa.me/"+n+"?text="+encodeURIComponent(dgqText(P)),"_blank","noopener")}
function dgqKartuHtml(P){const L=dgqRows(P),tot=Math.round(L.reduce((a,s)=>a+owedS(s),0)),u=unitName((L[0]||{}).unit_id);
 return"<!doctype html><html lang=\"id\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Kartu piutang "+esc(dgCustNm(P))+"</title><style>body{font:16px system-ui,sans-serif;max-width:640px;margin:16px auto;padding:0 16px}table{width:100%;border-collapse:collapse}td,th{padding:8px;border-bottom:1px solid #ddd;text-align:left}td:last-child,th:last-child{text-align:right}h1{font-size:20px}</style></head><body><h1>"+esc(u)+"</h1><p>Kartu piutang <b>"+esc(dgCustNm(P))+"</b><br>Per "+esc(tglS(today()))+"</p><table><thead><tr><th>Nota</th><th>Tanggal</th><th>Sisa (Rp)</th></tr></thead><tbody>"
 +L.map(s=>"<tr><td>"+esc(s.sale_number)+"</td><td>"+esc(tglS(s.date))+"</td><td>"+fm(Math.round(owedS(s)))+"</td></tr>").join("")+"</tbody><tfoot><tr><th colspan=\"2\">Total</th><th>"+fm(tot)+"</th></tr></tfoot></table><p>Berkas ini potret posisi saat dibuat.</p></body></html>"}
function dgqKartu(P){try{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([dgqKartuHtml(P)],{type:"text/html"}));a.download="kartu-piutang-"+String(dgCustNm(P)).replace(/\W+/g,"-").toLowerCase()+".html";a.click();audit("share","party",P,"kartu piutang (berkas)");save();S.msg="Kartu piutang diunduh"}catch(e){S.msg="⚠ "+e.message}render()}
