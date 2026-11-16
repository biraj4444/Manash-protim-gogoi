(function(){
"use strict";
var S=window.SITE;
var $=function(s,r){return(r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

var ICONS={
 word:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 15h6M9 18h4"/>',
 sheet:'<path d="M4 4h16v16H4z"/><path d="M4 9h16M4 14h16M10 4v16"/>',
 db:'<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
 entry:'<rect x="3" y="7" width="18" height="11" rx="2"/><path d="M7 11h.01M11 11h.01M15 11h.01M7 14.5h10"/>',
 flask:'<path d="M9 3h6M10 3v6L5 19a1.5 1.5 0 0 0 1.3 2h11.4a1.5 1.5 0 0 0 1.3-2l-5-10V3"/><path d="M8 15h8"/>',
 meter:'<circle cx="12" cy="13" r="8"/><path d="M12 13l4-4M7 13h.01M12 8v.01M17 13h.01"/>',
 poster:'<rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="9" cy="9.5" r="1.8"/><path d="M4 17l5-4 4 3 3-2 4 3"/>',
 slides:'<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 20h8M7 12l3-3 3 2 4-4"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
 phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
 chip:'<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
 present:'<rect x="3" y="4" width="18" height="11" rx="1.5"/><path d="M12 15v5M8 20h8"/><circle cx="12" cy="9.5" r="2"/>',
 talk:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>'
};
$$("[data-icon]").forEach(function(e){
  e.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+(ICONS[e.getAttribute("data-icon")]||"")+'</svg>';
});

var toastEl;
function toast(m){
  if(!toastEl){toastEl=document.createElement("div");toastEl.className="toast";toastEl.setAttribute("role","status");document.body.appendChild(toastEl)}
  toastEl.textContent=m;toastEl.classList.add("show");clearTimeout(toast._t);
  toast._t=setTimeout(function(){toastEl.classList.remove("show")},2200);
}

var mb=$(".menu-btn"),nav=$("#nav");
if(mb&&nav){mb.addEventListener("click",function(){var o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o?"true":"false");mb.textContent=o?"Close":"Menu"})}
$$("[data-year]").forEach(function(e){e.textContent=new Date().getFullYear()});

$$("[data-photo]").forEach(function(box){
  var fb=function(){box.innerHTML='<div class="fallback">MG</div>'};
  if(!S.profileImage){fb();return}
  var img=new Image();img.alt="Portrait of "+S.name;img.decoding="async";img.onerror=fb;img.src=S.profileImage;box.appendChild(img);
});

$$("[data-email]").forEach(function(e){if(S.email){if(!e.hasAttribute("data-keep"))e.textContent=S.email;if(e.tagName==="A")e.href="mailto:"+S.email}});
$$("[data-phone]").forEach(function(e){if(S.phone){if(!e.hasAttribute("data-keep"))e.textContent=S.phone;if(e.tagName==="A")e.href="tel:"+(S.phoneRaw||S.phone.replace(/\s/g,""))}});
$$("[data-location]").forEach(function(e){if(S.location)e.textContent=S.location});
["email","phone","location"].forEach(function(k){
  if(!S[k])$$('[data-show="'+k+'"]').forEach(function(e){e.parentNode&&e.parentNode.removeChild(e)});
});
var emptyBox=$("#contact-empty");
if(emptyBox&&!S.email&&!S.phone&&!S.location)emptyBox.hidden=false;

$$("[data-copy]").forEach(function(b){b.addEventListener("click",function(){
  var v=b.getAttribute("data-copy")==="email"?S.email:S.phone;
  var ok=function(){toast("Copied "+v)};
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(v).then(ok,function(){toast("Copy failed")})}
  else{var t=document.createElement("textarea");t.value=v;document.body.appendChild(t);t.select();try{document.execCommand("copy");ok()}catch(e){toast("Copy failed")}t.remove()}
})});

var form=$("#contact-form");
if(form){form.addEventListener("submit",function(ev){
  ev.preventDefault();
  var n=form.name.value.trim(),m=form.email.value.trim(),s=form.subject.value.trim(),t=form.message.value.trim();
  if(!n||!m||!t){toast("Fill in your name, email and message.");return}
  window.location.href="mailto:"+S.email+"?subject="+encodeURIComponent(s||"Message from "+n)+"&body="+encodeURIComponent(t+"\n\n- "+n+" ("+m+")");
  toast("Opening your email app");
})}
$$("[data-print]").forEach(function(b){b.addEventListener("click",function(){window.print()})});
})();
