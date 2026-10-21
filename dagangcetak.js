// ===== PERDAGANGAN PL5g-PL5i (v1.1.317): cetak halaman Perdagangan, daftar stok, katalog harga, pesan kaki struk =====
// Halaman Perdagangan yang dicetak (Ctrl+P atau tombol Cetak halaman ini) memakai kop, judul, tanggal, dan tanda tangan seperti laporan lain.
const DG_PT={ringkasan:"RINGKASAN PERDAGANGAN",jual:"DAFTAR PENJUALAN",piutang:"PIUTANG PELANGGAN",stok:"DAFTAR STOK BARANG",beli:"PEMBELIAN BARANG",koreksi:"OPNAME DAN RETUR",laporan:"LAPORAN PERDAGANGAN",data:"DATA PERDAGANGAN"};
function dgPre(cur){if(!DG_PT[cur])return"";const un=dgScope().map(u=>u.name).join(", ")||"Perdagangan";let r=null;try{if(cur==="laporan"&&typeof dgLR==="function")r=dgLR()}catch(e){}
 const sub=un+" · "+(r&&r.a&&r.b?tglS(r.a)+" s/d "+tglS(r.b):"Per "+tglS(today()));
 return(cur==="laporan"?"":`<div class="fl noprint dgpr"><button class="b s" type="button" onclick="dgPrint()">${ic("print")}<span>Cetak halaman ini</span></button></div>`)+repHead(DG_PT[cur],sub)}
function dgPost(cur){return DG_PT[cur]?repEnd():""}
// cetak semua baris (bukan hanya yang sudah dimuat), lalu kembalikan batas tampilan
function dgPrint(){S.lim=1e6;render();const back=()=>{if(typeof window!=="undefined")window.removeEventListener("afterprint",back);S.lim=0;render()};
 if(typeof window!=="undefined"&&window.addEventListener&&typeof setTimeout==="function"){window.addEventListener("afterprint",back);setTimeout(()=>window.print(),80)}}
// ----- pesan kaki struk -----
const dgFoot=()=>{const f=String((db.settings||{}).dgFoot===undefined?"Terima kasih":db.settings.dgFoot).trim();return f.slice(0,80)};
function dgcSync(){try{document.documentElement.style.setProperty("--tkf",JSON.stringify(dgFoot()))}catch(e){}}
function dgFootSave(){try{if(noPerm("dagang.kelola"))return;negAny();const v=($("#dg-foot")||{value:""}).value.replace(/[\r\n"\\]/g," ").trim().slice(0,80);db.settings=db.settings||{};db.settings.dgFoot=v;audit("setting","settings","dgFoot","pesan kaki struk");save();S.msg=v?"Pesan kaki struk disimpan":"Pesan kaki struk dikosongkan";dgcSync()}catch(e){S.msg=ER(e)}render()}
function dgFootCard(){return dcard("Pesan kaki struk","Tulisan di bawah struk dan kuitansi kertas 58/80 mm (maks. 80 huruf). Kosongkan untuk tanpa pesan.",`<div class="fl"><input id="dg-foot" type="text" maxlength="80" aria-label="Pesan kaki struk" value="${esc(dgFoot())}" placeholder="Terima kasih"><button class="b" type="button" onclick="dgFootSave()">Simpan</button></div>`,"")}
// ----- daftar stok dan katalog harga (A4) -----
function dgKat(id,mode){const us=dgUnits(),un=us.find(u=>u._id===id)||dgScope()[0]||us[0]||{};return{un,mode,P:db.products.filter(p=>p.unit_id===un._id&&isAct(p)&&isDgProd(p)).sort((a,b)=>String(a.category||"~").localeCompare(String(b.category||"~"))||String(a.name).localeCompare(String(b.name)))}}
function vKat(k){const[id,mode]=String(k).split(":"),D=dgKat(id,mode),stok=mode==="stok",bar=docBar(0);
 if(!D.un._id)return`${bar}<p class="k">Unit dagang tidak tersedia.</p>`;
 let cat=null,tv=0;const rows=D.P.map((p,i)=>{const q=dgQty(p._id),nv=dgVal(p._id),hb=q>0?Math.round(nv/q):0;tv+=nv;const h=(p.category||"Tanpa kategori")!==cat?(cat=p.category||"Tanpa kategori",`<tr class="kth"><th colspan="${stok?6:5}">${esc(cat)}</th></tr>`):"";
  return h+(stok?`<tr><td>${esc(p.code||"")}</td><td>${esc(p.name)}</td><td>${esc(p.unit||"")}</td><td class="n">${qf(q)}</td><td class="n">${rp(hb)}</td><td class="n">${rp(nv)}</td></tr>`
   :`<tr><td>${esc(p.code||"")}</td><td>${esc(p.name)}</td><td>${esc(p.unit||"")}</td><td class="n">${rp(p.price)}</td><td class="n">${p.price_g>0?rp(p.price_g):"-"}</td></tr>`)}).join("");
 const th=stok?`<th>Kode</th><th>Barang</th><th>Satuan</th><th class="n">Stok</th><th class="n">Harga beli rata-rata</th><th class="n">Nilai</th>`:`<th>Kode</th><th>Barang</th><th>Satuan</th><th class="n">Harga eceran</th><th class="n">Harga grosir</th>`;
 return`${bar}<div class="doc">${kop()}<h3>${stok?"DAFTAR STOK BARANG":"KATALOG HARGA"}</h3><div class="cn">${esc(D.un.name)} · ${stok?"Per ":"Berlaku "}${esc(tglS(today()))} · ${D.P.length} barang</div><table class="nt kat"><thead><tr>${th}</tr></thead><tbody>${rows}</tbody>${stok?`<tfoot><tr><th colspan="5">Total nilai persediaan</th><th class="n">${rp(tv)}</th></tr></tfoot>`:""}</table>${stok?sig([["Pengurus",""],["Bendahara",tres()]],0,today()):`<p class="k">Harga dapat berubah sewaktu-waktu.</p>`}</div>`}
function dgKatBtn(){const u=ksUnit?ksUnit():(dgScope()[0]||{})._id;return`<div class="fl"><button class="b s" type="button" onclick="openDoc('kat','${u}:stok')">${ic("print")}<span>Cetak daftar stok</span></button><button class="b s" type="button" onclick="openDoc('kat','${u}:harga')">${ic("print")}<span>Cetak katalog harga</span></button></div>`}
