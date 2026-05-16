const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 16 + 10;
        this.speed = Math.random() * 6 + 4;
        this.angle = Math.random() * 360;
        this.color = ['#ec4899','#f43f5e','#fb7185','#fda4af','#ffffff'][Math.floor(Math.random()*5)];
        this.rotation = Math.random() * 0.2 - 0.1;
    }
    update() { this.y += this.speed; this.angle += this.rotation; }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.font = `${this.size}px Arial`;
        ctx.fillText('♥', 0, 0);
        ctx.restore();
    }
}

function triggerConfetti(count = 100) {
    for (let i = 0; i < count; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].y > canvas.height) particles.splice(i, 1);
    }
    requestAnimationFrame(animate);
}

function showPage(n) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page${n}`).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById(`nav${n}`).classList.add('active');
}

const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        document.getElementById('musicStatus').textContent = 'Play Music';
    } else {
        bgMusic.play();
        document.getElementById('musicStatus').textContent = 'Pause Music';
    }
    isPlaying = !isPlaying;
}

window.onload = () => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
    triggerConfetti(80);

    // Background Music
    bgMusic.src = "https://raw.githubusercontent.com/Madhusudan00/Anniversary-gift/main/bg.mp3";
    bgMusic.volume = 0.7;
    bgMusic.play().catch(() => {});
};