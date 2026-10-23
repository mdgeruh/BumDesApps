// ===== v1.1.236 — Alur pengadaan per proyek: 8 langkah dan satu tombol "Lanjut" yang membuka langkah berikutnya =====
const PC_FL=["RAB","RFQ & penawaran","Pemenang","PO","Kontrak","Penerimaan","Pembayaran","Selesai"];
function pcFlow(p){const id=p._id,R=rqAll().filter(r=>r.project_id===id&&r.status!=="batal").sort((a,b)=>(b.created_at||"").localeCompare(a.created_at||""))[0]||null,
 O=R?poActive(R._id)[0]||null:null,C=O?ctOfPo(O._id)[0]||null:null,RC=O?rcOfPo(O._id):[],rd=RC.find(x=>x.status==="draf")||null,T=C?ctTerms(C):[];
 const S8=[
  {ok:pcBoq(id).length>0,t:"Susun RAB: tambahkan item barang/jasa",go:()=>mdOpen("pcb",id+"|")},
  {ok:!!R&&["evaluasi","dipilih"].includes(R.status),t:!R?"Buat RFQ dari RAB":R.status==="draf"?"Buka RFQ untuk penawaran":"Masukkan penawaran vendor lalu mulai evaluasi",go:()=>{if(!R){if(!rqOpenP(p))throw Error("Proyek berstatus "+PJ_S[p.status]+": RFQ baru hanya untuk proyek Draf atau Berjalan");S.rbp=id;mdOpen("pcq")}else mdOpen("pcy",R._id)}},
  {ok:!!R&&R.status==="dipilih",t:"Nilai penawaran dan pilih pemenang",go:()=>mdOpen("pcy",R._id)},
  {ok:!!O&&O.status==="terbit",t:!O?"Buat Purchase Order":"Setujui dan terbitkan PO",go:()=>{if(!O)poNew(R._id);else mdOpen("pco",O._id)}},
  {ok:!!C&&["aktif","selesai"].includes(C.status),t:!C?"Buat kontrak/SPK dari PO":"Lengkapi termin dan jalankan kontrak",go:()=>{if(!C)ctNew(O._id);else mdOpen("ck",C._id)}},
  {ok:!!O&&!!O.received_full,t:rd?"Selesaikan penerimaan (BAST)":"Catat penerimaan barang/jasa",go:()=>{if(rd)mdOpen("rc",rd._id);else rcNew(O._id)}},
  {ok:T.length>0&&T.every(t=>t.paid),t:"Catat tagihan dan bayar termin",go:()=>mdOpen("ck",C._id)},
  {ok:!!C&&C.status==="selesai"&&(!(+C.ret>0)||!!C.ret_paid),t:"Selesaikan kontrak dan cairkan retensi",go:()=>mdOpen("ck",C._id)}];
 const cur=S8.findIndex(x=>!x.ok);return{steps:S8.map((x,i)=>({...x,l:PC_FL[i]})),cur:cur<0?8:cur,done:cur<0}}
function pcFlowGo(pid){try{const p=pcFind(pid);if(!p)throw Error("Proyek tidak ditemukan");const f=pcFlow(p);if(f.done){openDoc("lpj",pid);return}f.steps[f.cur].go()}catch(e){S.msg="⚠ "+e.message;render()}}
function vAlur(){const P=pcAll().filter(p=>["draf","berjalan"].includes(p.status));if(!P.length)return"";
 return`<h3>Alur per proyek</h3><p class="k">Tekan tombol hijau untuk langkah berikutnya; aplikasi membuka formulir yang tepat.</p>${P.map(p=>{const f=pcFlow(p),s=f.steps[f.cur],pc=Math.round(f.steps.filter(x=>x.ok).length/8*100);return`<div class="fw"><div class="fwh"><b>${esc(p.code)} · ${esc(p.name)}</b><small class="k">${f.done?"Semua langkah selesai · 100%":pc+"% · langkah "+(f.cur+1)+" dari 8: "+esc(s.l)}</small></div>
<div class="fwb${f.done?" ok":""}" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pc}" aria-label="Kemajuan pengadaan ${pc} persen"><i style="width:${pc}%"></i></div>
<button class="b" onclick="pcFlowGo('${p._id}')">${f.done?"Buka laporan pertanggungjawaban":"Lanjut: "+esc(s.t)}</button></div>`}).join("")}`}
