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
// Cor das partículas (usando a cor principal do tema original)
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

// Adicionar responsividade ao canvas
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});


// Lógica para mudar o tema de cor ao passar o rato sobre os cards
const cards = document.querySelectorAll('.card');
cards.forEach(card=>{
    // CORREÇÃO: Ao entrar, preserva o tema 'light' se estiver ativo.
    card.addEventListener('mouseenter',()=>{
        // Verifica se o modo claro está ativo
        const isLightMode = document.body.classList.contains('light');
        
        // Concatena a classe 'light' (se existir) com a classe do tema do jogo
        document.body.className = (isLightMode ? 'light ' : '') + card.dataset.theme;
    });

    // CORREÇÃO: Ao sair, restaura o tema 'light' se estiver ativo, ou remove as classes se for dark mode.
    card.addEventListener('mouseleave',()=>{
        if (document.body.classList.contains('light')) {
            document.body.className = 'light'; // Mantém apenas o tema claro
        } else {
            document.body.className = ''; // Volta ao tema escuro padrão
        }
    });
});