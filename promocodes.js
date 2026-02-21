// promocodes.js - Система промокодов (упрощенная версия)

// Объявляем переменные
let legendaryClickCounter = 0;
let promoModal, promoInput, promoActivate, promoClose, promoList, promoMessage;

// Массив промокодов
const promoCodes = [
    {
        code: "DEBUGMODE666",
        reward: null,
        type: "cheat_menu",
        used: false,
        description: "Активация чит-меню"
    },
    {
        code: "TEST123",
        reward: 10,
        type: "keys",
        used: false,
        description: "10 ключей (тест)"
    }
];

// Функция показа модального окна - ОБЯЗАТЕЛЬНО В ГЛОБАЛЬНОЙ ОБЛАСТИ
function showPromoModal() {
    console.log("🔧 showPromoModal вызвана!");
    
    // Получаем элементы, если их нет
    if (!promoModal) {
        promoModal = document.getElementById('promoModal');
    }
    
    if (!promoModal) {
        console.error("Модальное окно promoModal не найдено в DOM!");
        alert("Ошибка: модальное окно не найдено. Проверьте HTML.");
        return;
    }
    
    // Показываем окно
    promoModal.style.display = 'flex';
    console.log("✅ Модальное окно открыто");
    
    // Получаем поле ввода
    if (!promoInput) {
        promoInput = document.getElementById('promoInput');
    }
    
    if (promoInput) {
        promoInput.value = '';
        promoInput.focus();
    }
    
    // Обновляем список
    updatePromoList();
}

// Функция скрытия
function hidePromoModal() {
    if (!promoModal) {
        promoModal = document.getElementById('promoModal');
    }
    if (promoModal) {
        promoModal.style.display = 'none';
    }
}

// Функция обновления списка
function updatePromoList() {
    if (!promoList) {
        promoList = document.getElementById('promoList');
    }
    if (!promoList) return;
    
    promoList.innerHTML = '<h3>Активированные:</h3>';
    
    const usedPromos = promoCodes.filter(p => p.used);
    
    if (usedPromos.length === 0) {
        promoList.innerHTML += '<p>Нет активированных промокодов</p>';
        return;
    }
    
    usedPromos.forEach(promo => {
        promoList.innerHTML += `<div>${promo.code} - ✓</div>`;
    });
}

// Функция активации
function activatePromoCode() {
    if (!promoInput) {
        promoInput = document.getElementById('promoInput');
    }
    
    const code = promoInput?.value.trim().toUpperCase();
    
    if (!code) {
        alert("Введите код");
        return;
    }
    
    const promo = promoCodes.find(p => p.code === code);
    
    if (!promo) {
        alert("Неверный код");
        return;
    }
    
    if (promo.used) {
        alert("Код уже использован");
        return;
    }
    
    promo.used = true;
    
    if (promo.type === 'keys') {
        window.keys = (window.keys || 0) + promo.reward;
        alert(`+${promo.reward} ключей!`);
    } else if (promo.type === 'cheat_menu') {
        if (typeof enableCheatMode === 'function') {
            enableCheatMode();
            alert("Чит-меню активировано!");
        }
    }
    
    updatePromoList();
    promoInput.value = '';
}

// Инициализация
function initPromoCodes() {
    console.log("Инициализация промокодов...");
    
    promoModal = document.getElementById('promoModal');
    promoInput = document.getElementById('promoInput');
    promoActivate = document.getElementById('promoActivate');
    promoClose = document.getElementById('promoClose');
    promoList = document.getElementById('promoList');
    
    if (promoActivate) {
        promoActivate.onclick = activatePromoCode;
    }
    
    if (promoClose) {
        promoClose.onclick = hidePromoModal;
    }
    
    console.log("Промокоды инициализированы");
}

// ЭКСПОРТ В ГЛОБАЛЬНУЮ ОБЛАСТЬ - ЭТО ВАЖНО!
window.showPromoModal = showPromoModal;
window.hidePromoModal = hidePromoModal;
window.activatePromoCode = activatePromoCode;
window.initPromoCodes = initPromoCodes;
window.promoCodes = promoCodes;

// Для отладки
console.log("promocodes.js загружен, showPromoModal доступна:", typeof showPromoModal);
