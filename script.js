// Edit this block to personalise the card.
const C={
  name:"Veronica Palma Galvan", dept:"Marketing Department", address:"Diversion Road, San Miguel, Calasiao Pangasinan",
  person:"Veronica Palma Galvan", org:"Toyota Dagupan City Inc.",
  bio:"Hi I am a certified Marketing Professional of Toyota Dagupan! I am ready and happy to serve Pangasinan!",
  phone:"0916-518-961", email:"veronica.palma@toyotadagupan.com",
  mapLink:"https://maps.app.goo.gl/darb4tgim12gCQac6", // paste your Google Maps link here (opens in the viewer's maps app)
  fbName:"Veronica Palma-Toyota Dagupan", // name shown on the Facebook row
  fb:"https://www.facebook.com/veronicapalmatoyotadagupan", // link it opens when tapped
  images:{hero:"", logo:"images/veron.jpg"} // optional: your own photo / logo, e.g. "images/photo.jpg", "images/logo.png"
};
const $=id=>document.getElementById(id), fmt=p=>p.replace(/^\+63(\d{3})(\d{3})(\d{4})$/,"+63 $1 $2 $3");
document.title=C.name; $("name").textContent=C.name; $("addr").textContent=C.dept; $("bio").textContent=C.bio;
// address opens the viewer's maps app: Apple Maps on iPhone, the phone's map chooser on Android, Google Maps elsewhere
function mapUrl(){if(C.mapLink)return C.mapLink;const ll=C.lat+","+C.lng,n=encodeURIComponent(C.name),ua=navigator.userAgent;
  if(/iPad|iPhone|iPod/.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)){$("rMap").removeAttribute("target");return "https://maps.apple.com/?ll="+ll+"&q="+n}
  if(/Android/i.test(ua)){$("rMap").removeAttribute("target");return "geo:"+ll+"?q="+ll+"("+n+")"}
  return "https://www.google.com/maps/search/?api=1&query="+ll}
const mail="mailto:"+C.email, map=mapUrl();
[["rFb",C.fb],["rMail",mail],["rMap",map]].forEach(([i,h])=>$(i).href=h);

// tapping the phone number opens a menu: Call, Message, Add to Contacts
const ov=$("ov"), openMenu=()=>{$("mNum").textContent=fmt(C.phone);$("oCall").href="tel:"+C.phone;$("oSms").href="sms:"+C.phone;ov.hidden=false;$("oCall").focus()}, closeMenu=()=>{ov.hidden=true};
$("rCall").href="tel:"+C.phone; $("rCall").removeAttribute("download");
$("rCall").addEventListener("click",e=>{e.preventDefault();openMenu()});
// plain links: iPhone and Android hand these straight to the native Phone / Messages apps
$("oCall").href="tel:"+C.phone; $("oSms").href="sms:"+C.phone;
["oCall","oSms"].forEach(i=>$(i).addEventListener("click",()=>setTimeout(closeMenu,400)));
// Add to Contacts: Android Chrome opens a new-contact screen with the name and number typed in;
// iPhone and other browsers open contact.vcf (iPhone shows "Add Contact" with everything filled in)
$("oSave").addEventListener("click",e=>{
  const ua=navigator.userAgent;
  if(/Android/i.test(ua)&&/Chrome\//.test(ua)&&!/; wv\)|FBAN|FBAV|Messenger|Instagram/i.test(ua)){
    e.preventDefault();
    location.href="intent:#Intent;action=android.intent.action.INSERT;type=vnd.android.cursor.dir/contact;S.name="+encodeURIComponent(C.person)+";S.phone="+encodeURIComponent(C.phone)+";S.company="+encodeURIComponent(C.org)+";end";
  }
  setTimeout(closeMenu,400);
});
$("oX").addEventListener("click",closeMenu);
ov.addEventListener("click",e=>{if(e.target===ov)closeMenu()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});

// your own images (leave a slot empty to keep the drawn placeholder)
function setImg(el,src,alt){if(!src)return;el.textContent="";const im=new Image();im.src=src;im.alt=alt;im.className="pic";el.appendChild(im);el.classList.add("has-img")}
if(C.images.hero)$("heroImg").src=C.images.hero;
setImg($("logoBox"),C.images.logo,"Company logo");
