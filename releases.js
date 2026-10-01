// ===== CATATAN RILIS (v1.1.003): data untuk modal "?" di Setelan. Tambahkan rilis baru di PALING ATAS; sinkronkan dengan release_notes.md =====
const RELEASES=[
 {v:"1.1.004",d:"2026-10-01",t:"Ringkasan Simpan Pinjam, urutan daftar, simulasi angsuran",i:["Sub-tab Ringkasan (tab bawaan): pinjaman aktif dan sisa pokok, tunggakan, jatuh tempo 7/30 hari, pengajuan menunggu, pembayaran bulan ini; kartu menuju daftar yang sesuai.","Daftar pinjaman: urutan (terbaru, terlama, pokok terbesar, sisa pokok, menunggak dulu) dan Muat lebih banyak.","Modal pengajuan: simulasi angsuran langsung (angsuran, total jasa, total bayar, jasa efektif, jadwal).","Nasabah: kolom sisa pokok, lencana Menunggak, tombol Ajukan pinjaman dari rincian nasabah."]},
 {v:"1.1.003",d:"2026-10-01",t:"Tombol ? Catatan rilis di Setelan",i:["Tombol ? di Setelan membuka modal catatan rilis; rilis terbaru terbuka, rilis lama bisa dibuka satu per satu."]},
 {v:"1.1.002",d:"2026-10-01",t:"Perbaikan ikon gembok periode",i:["Data → Periode: periode yang sudah ditutup kini memakai ikon gembok terbuka (aksi Buka); periode terbuka memakai gembok tertutup (aksi Tutup)."]},
 {v:"1.1.001",d:"2026-10-01",t:"PWA, skema versi baru, kode dipecah",i:["Aplikasi dapat dipasang dari browser (PWA) dan tetap terbuka tanpa internet bila di-host lewat https.","Skema versi baru 1.1.NNN; catatan rilis lengkap di release_notes.md.","Kode dipecah menjadi berkas bernama jelas (index.html, style.css, app.js, loans.js, dst.)."]},
 {v:"0.1.049",d:"2026-10-01",t:"Kode dipecah menjadi berkas sumber",i:["Berkas sumber terpisah dan perakit build.js untuk bumdes.html satu-file."]},
 {v:"0.1.048",d:"2026-10-01",t:"Tombol bayar di kartu pembayaran",i:["Tombol utama Bayar angsuran / bunga / nominal ke-N langsung di kartu pembayaran."]},
 {v:"0.1.047",d:"2026-10-01",t:"Jenis pembayaran angsuran",i:["Pilihan jenis: pokok + bunga, bunga saja, atau nominal bebas, dengan jumlah terisi otomatis."]},
 {v:"0.1.046",d:"2026-10-01",t:"Tunggakan, Jaminan, Nasabah ringkas",i:["Tiga sub-tab memakai daftar ringkas + modal rincian, dengan pencarian dan filter.","Form tambah jaminan pindah ke modal."]},
 {v:"0.1.045",d:"2026-10-01",t:"Daftar pinjaman ringkas + modal rincian",i:["Klik baris pinjaman membuka modal berisi aksi, jadwal pembayaran yang bisa dibuka/ditutup, dan riwayat pembayaran."]},
 {v:"0.1.044",d:"2026-10-01",t:"Penyegaran tampilan",i:["Tampilan lebih modern, ringkas, dan bersih; mode gelap ikut."]},
 {v:"0.1.043",d:"2026-10-01",t:"Form pengajuan pinjaman dalam modal",i:["Pengajuan pinjaman memakai modal."]},
 {v:"0.1.042",d:"2026-10-01",t:"Dashboard",i:["Dashboard dioptimalkan; kartu Piutang Pinjaman dan Tunggakan dapat diklik."]},
 {v:"0.1.041",d:"2026-10-01",t:"Mesin hitung jasa dan denda",i:["Jasa flat/anuitas, denda (masa tenggang, dasar hitung, batas), pembulatan; diatur di Setelan."]},
 {v:"0.1.040",d:"2026-10-01",t:"Validasi pengajuan dan konfirmasi aksi",i:["Batas pinjaman, peringatan data identik, konfirmasi Setujui/Cairkan, alasan wajib saat tolak/batal."]}
];
function vRelease(){return RELEASES.map((r,k)=>`<details class="sx rn"${k===0?" open":""}><summary><b>v${esc(r.v)}</b> <span class="k">${esc(r.d)}</span> ${esc(r.t)}</summary><ul>${r.i.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></details>`).join("")+`<p class="k">Riwayat lengkap ada di berkas release_notes.md dan CHANGELOG.md.</p>`}
function rnBar(){return`<div class="rnb"><span class="k">Versi ${esc(APP_VER)}</span><button class="ib s" title="Catatan rilis" aria-label="Catatan rilis" onclick="mdOpen('rn','')">${ic("help")}<span>Catatan rilis</span></button></div>`}
