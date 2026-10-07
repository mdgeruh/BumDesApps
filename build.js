// Membuat bumdes.html (satu file mandiri) dari index.html + style.css + skrip yang dimuat index.html.
//   node build.js          -> tulis bumdes.html dan sql/00_semua.sql
//   node build.js --check  -> gagal (exit 1) bila bumdes.html tidak sinkron, versi tidak cocok, cache sw.js kurang berkas, atau catatan rilis tertinggal
// Urutan skrip = urutan <script src> di index.html (urutan penting: berkas berbagi lingkup global).
// index.html dapat dibuka langsung (multi-berkas) lewat server; bumdes.html dipakai untuk satu-file/offline dan tes.
const fs=require('fs'),path=require('path');
const D=__dirname,rd=f=>fs.readFileSync(path.join(D,f),'utf8');
const html=rd('index.html');
const css=[...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)].map(m=>m[1]);
const js=[...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m=>m[1]);
if(!css.length||!js.length){console.error('index.html: tidak ada stylesheet/skrip');process.exit(1)}
let out=html;
for(const f of css)out=out.replace(`<link rel="stylesheet" href="${f}">`,()=>`<style>\n${rd(f)}</style>`);
js.forEach((f,i)=>{out=out.replace(`<script src="${f}"></script>\n`,()=>i===js.length-1?`<script>\n${js.map(rd).join('')}</script>`:'')});
// versi: package.json "1.1.1" -> "1.1.001" harus sama dengan APP_VER di config.js
const pk=JSON.parse(rd('package.json')).version.split('.'),VER=pk[0]+'.'+pk[1]+'.'+String(pk[2]).padStart(3,'0');
// sql/00_semua.sql = gabungan berkas SQL terpisah menurut urutan pasang (sekali tempel untuk proyek baru)
const SQLP=['01_inti','02_akuntansi','03_pegawai','04_tabungan','05_penjualan','06_nasabah','07_pengguna'];
const sqlAll=()=>{const bar='-- '+'='.repeat(76);return[bar,'-- Sistem BUMDes · Supabase · SEMUA SEKALIGUS (proyek baru)','-- '+'-'.repeat(76),
 '-- Gabungan otomatis dari '+SQLP.length+' berkas di bawah, urutan pasang sudah benar. JANGAN diedit di sini:','-- ubah berkas bagiannya, lalu jalankan: node build.js',
 '-- Cara pakai: Supabase > SQL Editor > New query > tempel SELURUH berkas ini > Run. Idempoten (aman diulang).',
 '-- Bagian: '+SQLP.map((f,i)=>(i+1)+'='+f.replace(/^\d+_/,'')).join(', '),
 '-- Setelah selesai: buka aplikasi > layar masuk > Siapkan BUMDes (pendaftar pertama otomatis admin).',bar,''].join('\n')
 +SQLP.map((f,i)=>'\n\n-- >>>>> BAGIAN '+(i+1)+'/'+SQLP.length+': sql/'+f+'.sql '+'>'.repeat(40)+'\n\n'+rd('sql/'+f+'.sql').replace(/\s+$/,'')+'\n').join('')};
const sqlOut=sqlAll(),sqlTarget=path.join(D,'sql/00_semua.sql');
const target=path.join(D,'bumdes.html');
if(process.argv.includes('--check')){
 let bad=0;const e=m=>{console.error(m);bad++};
 const cur=fs.existsSync(target)?fs.readFileSync(target,'utf8'):'';
 if(cur!==out)e('bumdes.html tidak sinkron dengan file sumber — jalankan: node build.js');
 const sc=fs.existsSync(sqlTarget)?fs.readFileSync(sqlTarget,'utf8'):'';if(sc!==sqlOut)e('sql/00_semua.sql tidak sinkron dengan berkas SQL bagiannya — jalankan: node build.js');
 if(!rd('config.js').includes('APP_VER="'+VER+'"'))e('APP_VER di config.js tidak sama dengan package.json ('+VER+')');
 const sw=rd('sw.js');for(const f of [...css,...js,'index.html','manifest.json'])if(!sw.includes('"./'+f+'"'))e('sw.js: berkas belum masuk daftar cache: '+f);
 const rl=rd('releases.js'),first=(rl.match(/\{v:"([^"]+)"/)||[])[1];if(first!==VER)e('releases.js: entri paling atas ('+first+') harus '+VER);
 if(!rd('release_notes.md').split('\n')[0].includes('v'+VER))e('release_notes.md: judul harus menyebut v'+VER);
 if(!rd('CHANGELOG.md').includes('## ['+VER+']'))e('CHANGELOG.md: belum ada entri ['+VER+']');
 if(bad)process.exit(1);
 console.log('OK: bumdes.html sinkron ('+out.length+' byte), versi '+VER+', cache sw.js lengkap, catatan rilis sinkron');
}else{fs.writeFileSync(sqlTarget,sqlOut);fs.writeFileSync(target,out);console.log('bumdes.html dirakit ('+out.length+' byte, '+js.length+' skrip + '+css.length+' gaya)')}
