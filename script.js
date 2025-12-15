const cards=document.querySelectorAll(".card");
const body=document.body;
const sound=document.getElementById("gameSound");
const loader=document.getElementById("loader");
const toggle=document.getElementById("toggleTheme");

const sounds={
valorant:"sounds/valorant.mp3",
fortnite:"sounds/fortnite.mp3",
minecraft:"sounds/minecraft.mp3"
};

window.onload=()=>loader.style.display="none";

cards.forEach(card=>{
card.addEventListener("mouseenter",()=>{
const t=card.dataset.theme;
body.className=t;
sound.src=sounds[t];
sound.volume=0.3;
sound.play();
});
card.addEventListener("mouseleave",()=>{
body.className="";
sound.pause();
});
});

toggle.onclick=()=>body.classList.toggle("light");

/* PARTICULAS */
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
canvas.width=innerWidth;canvas.height=innerHeight;

let p=[];
for(let i=0;i<80;i++){
p.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,
dx:Math.random()-0.5,dy:Math.random()-0.5,r:2});
}

function anim(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.fillStyle="rgba(0,255,204,.6)";
p.forEach(o=>{
o.x+=o.dx;o.y+=o.dy;
if(o.x<0||o.x>canvas.width)o.dx*=-1;
if(o.y<0||o.y>canvas.height)o.dy*=-1;
ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,Math.PI*2);ctx.fill();
});
requestAnimationFrame(anim);
}
anim();

/* PARALLAX */
document.addEventListener("mousemove",e=>{
const x=(innerWidth/2-e.clientX)/40;
const y=(innerHeight/2-e.clientY)/40;
document.querySelector(".hero").style.transform=
`rotateY(${x}deg) rotateX(${y}deg)`;
});

/* SCROLL */
window.addEventListener("scroll",()=>{
document.querySelectorAll(".reveal").forEach(el=>{
if(el.getBoundingClientRect().top<innerHeight-100){
el.classList.add("active");
}
});
});

/* PWA */
if("serviceWorker"in navigator){
navigator.serviceWorker.register("service-worker.js");
}
