const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

// ===== SONS =====
const sounds = {
    hover: new Audio("assets/sounds/hover.mp3"),
    click: new Audio("assets/sounds/click.mp3"),
    boot: new Audio("assets/sounds/boot.mp3")
};

Object.values(sounds).forEach(sound => {
    sound.volume = 0.3;
});

// Som de boot (primeira interação)
window.addEventListener("click", () => {
    sounds.boot.currentTime = 0;
    sounds.boot.play();
}, { once: true });

// ===== CANVAS =====
function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

// ===== PARTÍCULAS =====
let particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: Math.random() - 0.5,
    dy: Math.random() - 0.5,
    r: 2
}));

function getThemeColor() {
    return getComputedStyle(document.body)
        .getPropertyValue("--main-color");
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getThemeColor();

    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}
animate();

// ===== TEMA + SOM (CARDS) =====
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        // Tema
        document.body.dataset.theme = card.dataset.theme;
        localStorage.setItem("theme", card.dataset.theme);

        // Som
        sounds.hover.currentTime = 0;
        sounds.hover.play();
    });
});

// ===== SOM BOTÕES =====
document.querySelectorAll(".btn-download").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        sounds.hover.currentTime = 0;
        sounds.hover.play();
    });

    btn.addEventListener("click", () => {
        sounds.click.currentTime = 0;
        sounds.click.play();
    });
});

// ===== LOADER =====
window.addEventListener("load", () => {
    document.getElementById("loader").style.display = "none";
});

// ===== RESTAURAR TEMA =====
const saved = localStorage.getItem("theme");
if (saved) document.body.dataset.theme = saved;
