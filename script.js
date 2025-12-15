const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;


let particles = [];
for(let i=0;i<70;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
dx:Math.random()-0.5,
dy:Math.random()-0.5,
r:2
});
}


function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.fillStyle='rgba(0,255,204,.6)';
particles.forEach(p=>{
p.x+=p.dx; p.y+=p.dy;
if(p.x<0||p.x>canvas.width) p.dx*=-1;
if(p.y<0||p.y>canvas.height) p.dy*=-1;
ctx.beginPath();
ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
ctx.fill();
});
requestAnimationFrame(animate);
}
animate();


const cards = document.querySelectorAll('.card');
cards.forEach(card=>{
card.addEventListener('mouseenter',()=>{
document.body.className = card.dataset.theme;
});
card.addEventListener('mouseleave',()=>{
document.body.className = '';
});
});