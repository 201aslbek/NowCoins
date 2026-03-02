let balance = Number(localStorage.getItem('balance')) || 0;
let energy = Number(localStorage.getItem('energy')) || 500;
const maxEnergy = 500;

// 1. Navigation
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const targetPage = this.getAttribute('data-page');
        
        // Tablarni yangilash
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Sahifalarni yangilash
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(targetPage).classList.add('active');
    });
});

// 2. Click Logic
function handleTap(event) {
    if (energy > 0) {
        balance += 1;
        energy -= 1;
        
        // Effekt koordinatasi
        const x = event.clientX || (event.touches && event.touches[0].clientX);
        const y = event.clientY || (event.touches && event.touches[0].clientY);
        
        createPlusOne(x, y);
        updateUI();
    }
}

function createPlusOne(x, y) {
    const el = document.createElement('div');
    el.className = 'plus-one';
    el.innerText = "+1";
    el.style.left = `${x - 10}px`;
    el.style.top = `${y - 10}px`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 800);
}

function updateUI() {
    document.getElementById('balance').innerText = balance.toLocaleString();
    document.getElementById('energy').innerText = energy;
    document.getElementById('energy-bar').style.width = `${(energy / maxEnergy) * 100}%`;
    
    localStorage.setItem('balance', balance);
    localStorage.setItem('energy', energy);
}

// 3. Auto Energy Refill
setInterval(() => {
    if (energy < maxEnergy) {
        energy += 1;
        updateUI();
    }
}, 1500);

// Initialize
window.onload = () => {
    const tg = window.Telegram?.WebApp;
    if(tg) { tg.ready(); tg.expand(); }
    updateUI();
};
