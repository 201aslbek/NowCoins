// 1. Ma'lumotlarni yuklash va Telegram obyekti
let balance = Number(localStorage.getItem('balance')) || 0;
let energy = Number(localStorage.getItem('energy')) || 500;
const maxEnergy = 500;
const refillRate = 3; // Har 3 sekundda 1 energiya

// Telegram WebApp obyekti (faqat Telegramda ishlaydi)
const tg = window.Telegram?.WebApp;

// 2. Foydalanuvchi ma'lumotlarini sozlash (ISLOH QILINDI)
function setupUser() {
    const nameEl = document.getElementById('display-name');
    const idEl = document.getElementById('display-id');
    const avatarImg = document.getElementById('avatar-img');

    // Telegramdan haqiqiy ma'lumotlarni olish
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        
        // Ismni chiqarish (First + Last Name)
        if (nameEl) nameEl.innerText = user.first_name + (user.last_name ? " " + user.last_name : "");
        
        // ID raqamini chiqarish
        if (idEl) idEl.innerText = user.id;
        
        // Avatarni chiqarish
        if (user.photo_url && avatarImg) {
            avatarImg.src = user.photo_url;
            avatarImg.style.display = 'block';
        }
    } else {
        // Agar brauzerda ochilsa, sinov ma'lumotlari
        if (nameEl) nameEl.innerText = "Tester STI";
        if (idEl) idEl.innerText = "12345678";
    }
}

// 3. Oflyayn vaqtda to'lgan energiyani hisoblash
function calculateOfflineEnergy() {
    const lastTime = localStorage.getItem('lastSavedTime');
    if (lastTime) {
        const currentTime = Date.now();
        const timeDiffSeconds = Math.floor((currentTime - Number(lastTime)) / 1000);
        
        const energyToAdd = Math.floor(timeDiffSeconds / refillRate);
        
        if (energyToAdd > 0) {
            energy = Math.min(maxEnergy, energy + energyToAdd);
            console.log(`Yo'qligingizda ${energyToAdd} energiya to'ldi.`);
        }
    }
}

// 4. Ekranni yangilash va saqlash
function updateDisplay() {
    const balEl = document.getElementById('balance');
    const enerEl = document.getElementById('energy');
    const barEl = document.getElementById('energy-bar');
    
    if (balEl) balEl.innerText = balance.toLocaleString();
    if (enerEl) enerEl.innerText = energy;

    if (barEl) {
        const percentage = (energy / maxEnergy) * 100;
        barEl.style.width = percentage + "%";
    }

    // Ma'lumotlarni va vaqtni saqlash
    localStorage.setItem('balance', balance);
    localStorage.setItem('energy', energy);
    localStorage.setItem('lastSavedTime', Date.now().toString());
}

// 5. Bosish funksiyasi
function handleTap(event) {
    if (energy > 0) {
        balance += 1;
        energy -= 1;

        if (event) {
            // Touch va Mouse uchun koordinatalar
            const x = event.clientX || (event.touches && event.touches[0].clientX);
            const y = event.clientY || (event.touches && event.touches[0].clientY);
            if (x && y) createPlusOneEffect(x, y);
        }

        updateDisplay();
    }
}

// 6. "+1" effekti (z-index bilan ustiga chiqarilgan)
function createPlusOneEffect(x, y) {
    const effect = document.createElement('div');
    effect.innerText = "+1";
    effect.className = 'plus-one';
    effect.style.left = (x - 20) + 'px';
    effect.style.top = (y - 20) + 'px';
    document.body.appendChild(effect);
    setTimeout(() => { effect.remove(); }, 800);
}

// 7. Avto-refill
setInterval(() => {
    if (energy < maxEnergy) {
        energy += 1;
        updateDisplay();
    }
}, refillRate * 1000);

// 8. O'yin yuklanganda ishga tushirish
window.addEventListener('load', () => {
    if (tg) {
        tg.ready();
        tg.expand();
    }
    setupUser();
    calculateOfflineEnergy();
    updateDisplay();
});
