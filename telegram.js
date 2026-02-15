// telegram.js - Интеграция с Telegram

let tg = window.Telegram?.WebApp || null;
let user = null;

function initTelegram() {
    console.log("Инициализация Telegram...");
    
    if (window.Telegram?.WebApp) {
        tg = window.Telegram.WebApp;
        
        // Безопасно вызываем методы
        try {
            tg.expand();
        } catch (e) {
            console.log("expand не поддерживается");
        }
        
        try {
            tg.enableClosingConfirmation();
        } catch (e) {
            console.log("enableClosingConfirmation не поддерживается");
        }
        
        try {
            user = tg.initDataUnsafe?.user;
        } catch (e) {
            console.log("initDataUnsafe не поддерживается");
        }
        
        if (user) {
            console.log("Пользователь Telegram:", user);
            const telegramUser = document.getElementById('telegramUser');
            if (telegramUser) {
                telegramUser.textContent = `@${user.username || user.first_name}`;
            }
        } else {
            const telegramUser = document.getElementById('telegramUser');
            if (telegramUser) {
                telegramUser.textContent = "Гость";
            }
        }
        
        try {
            tg.MainButton.setText("Играть");
            tg.MainButton.show();
            tg.MainButton.onClick(() => {
                tg.close();
            });
        } catch (e) {
            console.log("MainButton не поддерживается");
        }
        
        // Назначаем обработчики для кнопок Telegram
        const shareBtn = document.getElementById('shareButton');
        const inviteBtn = document.getElementById('inviteButton');
        
        if (shareBtn) {
            shareBtn.onclick = shareResult;
        }
        
        if (inviteBtn) {
            inviteBtn.onclick = inviteFriend;
        }
        
        // НЕ вызываем loadTelegramSave(), чтобы избежать ошибок
        console.log("Telegram инициализирован (без CloudStorage)");
    } else {
        console.log("Игра запущена не в Telegram");
        const telegramUser = document.getElementById('telegramUser');
        if (telegramUser) {
            telegramUser.textContent = "Локальный режим";
        }
    }
}

// Функции для облака - оставляем, но они не будут вызываться
function saveToTelegramCloud() {
    // Просто ничего не делаем, чтобы избежать ошибок
    console.log("CloudStorage не поддерживается, сохранение только в localStorage");
}

function loadTelegramSave() {
    // Просто ничего не делаем
    console.log("CloudStorage не поддерживается, загрузка только из localStorage");
}

function sendToTelegram(data) {
    if (tg) {
        try {
            tg.sendData(JSON.stringify(data));
        } catch (e) {
            console.log("sendData не поддерживается");
        }
    }
}

function shareResult() {
    if (!tg) {
        // Если не в Telegram, копируем ссылку в буфер обмена
        const text = `Я набрал ${formatNumber(window.totalPoints || 0)} очков в кликер игре! Сыграй тоже!`;
        const url = window.location.href;
        const shareText = `${text} ${url}`;
        
        navigator.clipboard.writeText(shareText).then(() => {
            if (typeof showMessage === 'function') {
                showMessage("Ссылка скопирована в буфер обмена!", "#00adb5");
            }
        });
        return;
    }
    
    try {
        const text = `Я набрал ${formatNumber(window.totalPoints || 0)} очков в кликер игре! Сыграй тоже!`;
        const url = window.location.href;
        
        tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
    } catch (e) {
        console.log("shareResult не поддерживается");
    }
}

function inviteFriend() {
    if (!tg) {
        // Если не в Telegram, копируем ссылку
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            if (typeof showMessage === 'function') {
                showMessage("Ссылка на игру скопирована!", "#00adb5");
            }
        });
        return;
    }
    
    try {
        const botUsername = "alumClickerBot";
        const text = `Присоединяйся к игре!`;
        const url = `https://t.me/${botUsername}?start=invite`;
        
        tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
        
        window.keys = (window.keys || 0) + 1;
        if (typeof updateKeysDisplay === 'function') updateKeysDisplay();
        if (typeof showMessage === 'function') showMessage("+1 ключ за приглашение друга!", "#ffd700");
    } catch (e) {
        console.log("inviteFriend не поддерживается");
    }
}

function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num);
}

window.initTelegram = initTelegram;
window.saveToTelegramCloud = saveToTelegramCloud;
window.loadTelegramSave = loadTelegramSave;
window.sendToTelegram = sendToTelegram;
window.shareResult = shareResult;
window.inviteFriend = inviteFriend;