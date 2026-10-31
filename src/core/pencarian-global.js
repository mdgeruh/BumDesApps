// ===== PENCARIAN GLOBAL (v1.1.244, K4) =====
// Satu kolom cari untuk pihak, pelanggan Pamsimas, pinjaman, transaksi, dan proyek. Hanya kelompok yang boleh dilihat pengguna (tabOk). Dibuka dengan tombol di header, "/" atau Ctrl+K.
const gsN=s=>String(s==null?"":s).toLowerCase(),GS_MAX=5;
function gsRun(q){q=gsN(q).trim();if(q.length<2)return[];const hit=(...a)=>a.some(x=>gsN(x).includes(q)),G=[],P=new Map((db.parties||[]).map(p=>[p._id,p])),pn=id=>(P.get(id)||{}).name||"";
 const add=(k,t,L,f)=>{if(L.length)G.push({k,t,n:L.length,r:L.slice(0,GS_MAX).map(f)})};
 if(tabOk("mst"))add("pihak","Pihak",db.parties.filter(p=>hit(p.name,p.phone,p.address,p._id)),p=>({a:esc(p.name),b:[p.type,p.phone,p.address].filter(Boolean).join(" · "),f:`gsGo('pihak','${esc(p._id)}')`}));
 if(tabOk("air")&&db.water_connections)add("air","Pelanggan Pamsimas",db.water_connections.filter(c=>hit(c.meter_no,pn(c.party_id),c._id)),c=>({a:esc(pn(c.party_id)||c.meter_no),b:"Meter "+(c.meter_no||"-"),f:`gsGo('air','${esc(c._id)}')`}));
 if(tabOk("sp"))add("pinjaman","Pinjaman",db.loans.filter(l=>hit(pn(l.party_id),l._id,l.loan_no,l.no)),l=>({a:esc(pn(l.party_id)||l._id),b:[l.loan_no||l.no||l._id,l.status].filter(Boolean).join(" · "),f:`gsGo('pinjaman','${esc(l._id)}')`}));
 if(tabOk("trx"))add("trx","Transaksi",db.transactions.filter(t=>hit(t.description,t._id,t.date,t.amount)),t=>({a:esc(t.description||t._id),b:wd(t.date)+" · Rp "+Math.round(t.amount||0).toLocaleString("id-ID"),f:`gsGo('trx','${esc(t._id)}')`}));
 if(tabOk("pc")&&db.projects&&db.projects.length)add("proyek","Proyek",db.projects.filter(p=>hit(p.name,p.code,p.owner)),p=>({a:esc(p.name),b:[p.code,p.status].filter(Boolean).join(" · "),f:`gsGo('proyek','${esc(p._id)}')`}));
 const cm=gsCmds().filter(c=>hit(c[0]));if(cm.length)G.unshift({k:"perintah",t:"Perintah",n:cm.length,r:cm.slice(0,GS_MAX).map(c=>({a:esc(c[0]),b:"Perintah",f:c[1]}))});
 return G}
function gsHtml(q){const G=gsRun(q);if(gsN(q).trim().length<2)return`<p class="k">Ketik minimal 2 huruf: nama, nomor meter, keterangan transaksi, kode proyek, atau perintah (mis. “catat”, “buka”, “tema”, “backup”).</p>`;
 if(!G.length)return`<p class="k">Tidak ada hasil untuk “${esc(q)}”.</p>`;
 return G.map(g=>`<div class="gsg"><h4>${g.t} <small>${g.n}</small></h4>${g.r.map(r=>`<button type="button" class="gsi2" onclick="${r.f}"><b>${r.a}</b><small>${esc(r.b)}</small></button>`).join("")}${g.n>g.r.length?`<p class="k">dan ${g.n-g.r.length} lainnya — persempit kata kunci.</p>`:""}</div>`).join("")}
function gsOpen(){if(!db||$("#gs"))return;const d=document.createElement("div");d.id="gs";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");d.setAttribute("aria-label","Pencarian");
 d.innerHTML=`<div class="gsb" onclick="event.stopPropagation()"><div class="gsh"><input id="gs-q" type="search" autocomplete="off" placeholder="Cari data atau ketik perintah…" aria-label="Kata kunci pencarian"><button type="button" class="b s sm" onclick="gsClose()">Tutup</button></div><div id="gs-r" class="gsr" aria-live="polite">${gsHtml("")}</div></div>`;
 d.onclick=gsClose;document.body.appendChild(d);const i=$("#gs-q");i.oninput=()=>{$("#gs-r").innerHTML=gsHtml(i.value)};i.focus()}
function gsClose(){const d=$("#gs");if(d&&d.parentNode)d.parentNode.removeChild(d)}
function gsGo(k,id){const o=($("#gs-q")||{}).value||"";gsClose();S.bel=0;
 if(k==="pihak"){const p=db.parties.find(x=>x._id===id);go("mst");S.mt="pihak";S.pf="";S.pq=p?p.name:o}
 else if(k==="air"){wdPage(id);return}
 else if(k==="pinjaman"){go("sp");pgOpen("ld",id);return}
 else if(k==="trx"){go("trx");render();mdOpen("td",id);return}
 else if(k==="proyek"){const p=db.projects.find(x=>x._id===id);go("pc");S.pcv="proyek";S.pcq=p?p.name:o}
 render()}
if(typeof document!=="undefined"&&document.addEventListener)document.addEventListener("keydown",e=>{const t=e.target||{},typing=/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||t.isContentEditable;
 if($&&$("#gs")){if(e.key==="Escape"){e.preventDefault();gsClose()}else if(e.key==="Enter"&&t.id==="gs-q"){const b=$("#gs-r .gsi2");if(b){e.preventDefault();b.click()}}return}
 if(!db||S.cf||S.md||(S.cu===null&&typeof rbacOn==="function"&&rbacOn()&&!curUser()))return;
 if((e.key==="k"||e.key==="K")&&(e.ctrlKey||e.metaKey)){e.preventDefault();gsOpen()}else if(e.key==="/"&&!typing&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault();gsOpen()}});

// v1.1.272 (F2–F6 pelengkap): palet perintah: perintah ikut muncul di hasil pencarian global (Buka …, Catat …, Tema, Backup, Periksa kesehatan data); hanya yang boleh dibuka akun ini
function gsCmds(){const C=[];TABS.forEach(([k,l])=>{if(k!=="prof"&&tabOk(k))C.push(["Buka "+l,`gsClose();go('${k}')`])});C.push(["Buka Profil saya","gsClose();go('prof')"]);
 if(tabOk("trx"))C.push(["Catat penerimaan","gsClose();qTrx('in')"],["Catat pengeluaran","gsClose();qTrx('out')"]);
 C.push(["Tema gelap","gsClose();themeSet('dark')"],["Tema terang","gsClose();themeSet('light')"],["Tema ikuti sistem","gsClose();themeSet('auto')"]);
 if(tabOk("dat")){C.push(["Unduh backup data","gsClose();exp()"],["Periksa kesehatan data","gsClose();go('dat');hcGo()"])}
 return C}
