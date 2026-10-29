// ===== MULAI APLIKASI: dimuat paling akhir, setelah semua berkas lain =====
uiLoad();
load();
if (rtOn()) rtApply();
render();
if (typeof cloudBoot === "function") cloudBoot();
if (typeof abkTick === "function" && typeof setTimeout === "function")
  setTimeout(() => abkTick(), 1500);
