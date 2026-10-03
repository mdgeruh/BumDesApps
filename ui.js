// ===== UI CONTROLLER =====
// ===== P0 (v0.1.006): toast, konfirmasi, peringatan simpan/backup, draf form =====
const LB="bumdes_last_backup",NB=["sp-date","sp-cash","sp-amt","f-type","us-p","us-p2","cp-o","cp-n","cp-r","rp-p","sp-pencode","sp-feesplit","sp-twpol","rem-due","rem-late"],FS="#main input[id],#main select[id],#main textarea[id]";
let tT=null;
function toast(m,er){const e=$("#toast");if(!e)return;e.textContent=m;e.className=er?"on er":"on";if(e.setAttribute)e.setAttribute("aria-live",er?"assertive":"polite");
 if(typeof clearTimeout==="function"&&tT)clearTimeout(tT);if(typeof setTimeout==="function")tT=setTimeout(()=>{e.className=""},er?7000:3500)}


// ===== KOMPONEN FORM & AKSESIBILITAS (v0.1.030, Fase F1) =====
// fld(id,label,{t:"input|select|textarea",type,value,opts,a,hint,req,lid}): label terhubung (for/id), petunjuk (aria-describedby), aria-required
const fld=(id,label,o={})=>{const t=o.t||"input",a=o.a||"",d=o.hint?` aria-describedby="${id}-h"`:"",rq=o.req?' aria-required="true"':"",
 ctl=t==="select"?`<select id="${id}"${a}${d}${rq}>${o.opts||""}</select>`:t==="textarea"?`<textarea id="${id}"${a}${d}${rq}>${esc(o.value==null?"":o.value)}</textarea>`:`<input id="${id}"${o.type?` type="${o.type}"`:""}${a}${d}${rq} value="${esc(o.value==null?"":o.value)}">`;
 return`<label${o.lid?` id="${o.lid}"`:""} for="${id}">${label}</label>${ctl}${o.hint?`<div class="hint k" id="${id}-h">${o.hint}</div>`:""}`};
const CTL=/^(INPUT|SELECT|TEXTAREA)$/;let lbN=0;
// menautkan sisa <label> lama (tanpa for) ke kolom berikutnya: for/id bila kolom punya id, selain itu aria-labelledby
function a11y(){if(!document.querySelectorAll)return;if(typeof uiEnh==="function")uiEnh();
 document.querySelectorAll("#main label:not([for]),#fm label:not([for]),#lock label:not([for])").forEach(l=>{if(l.querySelector&&l.querySelector("input,select,textarea"))return;
  let c=l.nextElementSibling;if(c&&!CTL.test(c.tagName)&&c.tagName!=="LABEL"&&c.querySelector)c=c.querySelector("input,select,textarea");
  if(!c||!CTL.test(c.tagName))return;
  if(c.id)l.htmlFor=c.id;else{if(!l.id)l.id="lb"+(++lbN);c.setAttribute("aria-labelledby",l.id)}})}

