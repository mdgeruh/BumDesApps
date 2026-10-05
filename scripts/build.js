// Membuat index.html di akar (satu file mandiri: HTML + CSS + JS) dari src/index.html + gaya + skrip yang dimuat src/index.html. Dijalankan dari akar proyek: npm run build / npm test.
//   node scripts/build.js          -> tulis index.html dan supabase/supabase_semua.sql
//   node scripts/build.js --check  -> gagal (exit 1) bila index.html tidak sinkron, versi tidak cocok, cache sw.js kurang berkas, atau catatan rilis tertinggal
// Urutan skrip = urutan <script src> di index.html (urutan penting: berkas berbagi lingkup global).
// src/index.html = sumber (dapat dibuka langsung dari folder src/); index.html di akar = hasil rakitan, dipakai hosting, PWA, dan tes. Jangan diedit.
const fs=require('fs'),path=require('path');
const D=path.join(__dirname,'..'),rd=f=>fs.readFileSync(path.join(D,f),'utf8');
const html=rd('src/index.html');
const css=[...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)].map(m=>m[1]);
const js=[...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m=>m[1]);
if(!css.length||!js.length){console.error('index.html: tidak ada stylesheet/skrip');process.exit(1)}
let out=html.replace('href="../manifest.json"','href="manifest.json"').replace(/href="\.\.\/assets\//g,'href="assets/');
for(const f of css)out=out.replace(`<link rel="stylesheet" href="${f}">`,()=>`<style>\n${rd('src/'+f)}</style>`);
js.forEach((f,i)=>{out=out.replace(`<script src="${f}"></script>\n`,()=>i===js.length-1?`<script>\n${js.map(f=>rd('src/'+f)).join('')}</script>`:'')});
// versi: package.json "1.1.1" -> "1.1.001" harus sama dengan APP_VER di config.js
const pk=JSON.parse(rd('package.json')).version.split('.'),VER=pk[0]+'.'+pk[1]+'.'+String(pk[2]).padStart(3,'0');
// supabase_semua.sql = gabungan berkas SQL terpisah menurut urutan pasang (sekali tempel untuk proyek baru)
const SQLP=['supabase_schema','supabase_developer','supabase_tahap2','supabase_tahap3','supabase_nasabah','supabase_pengguna'];
const sqlAll=()=>{const bar='-- '+'='.repeat(76);return[bar,'-- Sistem BUMDes · Supabase · SEMUA SEKALIGUS (proyek baru)','-- '+'-'.repeat(76),
 '-- Gabungan otomatis dari '+SQLP.length+' berkas di bawah, urutan pasang sudah benar. JANGAN diedit di sini:','-- ubah berkas bagiannya, lalu jalankan: npm run build',
 '-- Cara pakai: Supabase > SQL Editor > New query > tempel SELURUH berkas ini > Run. Idempoten (aman diulang).',
 '-- Bagian: '+SQLP.map((f,i)=>(i+1)+'='+f.replace('supabase_','')).join(', '),
 '-- Setelah selesai: angkat developer pertama dengan perintah di bagian 2 (lihat catatan di sana).',bar,''].join('\n')
 +SQLP.map((f,i)=>'\n\n-- >>>>> BAGIAN '+(i+1)+'/'+SQLP.length+': '+f+'.sql '+'>'.repeat(40)+'\n\n'+rd('supabase/'+f+'.sql').replace(/\s+$/,'')+'\n').join('')};
const sqlOut=sqlAll(),sqlTarget=path.join(D,'supabase','supabase_semua.sql');
const target=path.join(D,'index.html');
if(process.argv.includes('--check')){
 let bad=0;const e=m=>{console.error(m);bad++};
 const cur=fs.existsSync(target)?fs.readFileSync(target,'utf8'):'';
 if(cur!==out)e('index.html tidak sinkron dengan file sumber — jalankan: npm run build');
 const sc=fs.existsSync(sqlTarget)?fs.readFileSync(sqlTarget,'utf8'):'';if(sc!==sqlOut)e('supabase/supabase_semua.sql tidak sinkron dengan berkas SQL bagiannya — jalankan: npm run build');
 if(!rd('src/js/core/config.js').includes('APP_VER="'+VER+'"'))e('APP_VER di src/js/core/config.js tidak sama dengan package.json ('+VER+')');
 const sw=rd('sw.js');for(const f of ['index.html','manifest.json','assets/icons/icon.svg','assets/icons/icon-192.png','assets/icons/icon-512.png','assets/icons/icon-maskable-512.png'])if(!sw.includes('"./'+f+'"'))e('sw.js: berkas belum masuk daftar cache: '+f);
 const rl=rd('src/js/core/releases.js'),first=(rl.match(/\{v:"([^"]+)"/)||[])[1];if(first!==VER)e('src/js/core/releases.js: entri paling atas ('+first+') harus '+VER);
 if(!rd('docs/release_notes.md').split('\n')[0].includes('v'+VER))e('docs/release_notes.md: judul harus menyebut v'+VER);
 if(!rd('CHANGELOG.md').includes('## ['+VER+']'))e('CHANGELOG.md: belum ada entri ['+VER+']');
 if(bad)process.exit(1);
 console.log('OK: index.html sinkron ('+out.length+' byte), versi '+VER+', cache sw.js lengkap, catatan rilis sinkron');
}else{fs.writeFileSync(sqlTarget,sqlOut);fs.writeFileSync(target,out);console.log('index.html dirakit ('+out.length+' byte, '+js.length+' skrip + '+css.length+' gaya)')}
