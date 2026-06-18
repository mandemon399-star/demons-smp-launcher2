const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
const lightning = document.getElementById('lightning');

let width, height, stars;

function init() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    stars = [];
    for (let i = 0; i < 240; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2.5,
            speed: Math.random() * 0.65 + 0.2,
            alpha: Math.random() * 0.7 + 0.3
        });
    }
}

function animate() {
    ctx.fillStyle = '#04050d';
    ctx.fillRect(0, 0, width, height);

    stars.forEach(star => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > height) {
            star.y = -10;
            star.x = Math.random() * width;
        }
    });

    requestAnimationFrame(animate);
}

function flashLightning() {
    const delay = Math.random() * 4000 + 2500;
    setTimeout(() => {
        lightning.style.opacity = '0.8';
        setTimeout(() => {
            lightning.style.opacity = '0';
            flashLightning();
        }, 80);
    }, delay);
}

window.addEventListener('resize', init);
window.addEventListener('load', () => {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 250);
    }
});

init();
animate();
flashLightning();
