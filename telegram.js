// telegram.js - Интеграция с Telegram
let tg = null;
let user = null;

function initTelegram() {
    console.log("Инициализация Telegram...");
    
    // Проверяем наличие Telegram WebApp API
    if (window.Telegram && window.Telegram.WebApp) {
        try {
            tg = window.Telegram.WebApp;
            
            // Безопасно вызываем методы
            if (typeof tg.expand === 'function') {
                tg.expand();
            }
            
            if (typeof tg.ready === 'function') {
                tg.ready();
            }
            
            // Получаем данные пользователя
            if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
                user = tg.initDataUnsafe.user;
                console.log("Пользователь Telegram:", user);
                
                const telegramUser = document.getElementById('telegramUser');
                if (telegramUser) {
                    telegramUser.textContent = user.username ? 
                        `@${user.username}` : user.first_name;
                }
            } else {
                const telegramUser = document.getElementById('telegramUser');
                if (telegramUser) {
                    telegramUser.textContent = "Гость";
                }
            }
            
            console.log("Telegram инициализирован успешно");
        } catch (e) {
            console.log("Ошибка при инициализации Telegram:", e);
        }
    } else {
        console.log("Игра запущена не в Telegram");
        const telegramUser = document.getElementById('telegramUser');
        if (telegramUser) {
            telegramUser.textContent = "Локальный режим";
        }
    }
}

// Безопасные функции для облака
function saveToTelegramCloud() {
    // Заглушка, чтобы избежать ошибок
    console.log("CloudStorage не поддерживается");
}

function loadTelegramSave() {
    // Заглушка, чтобы избежать ошибок
    console.log("CloudStorage не поддерживается");
}

function shareResult() {
    try {
        const text = `Я набрал ${formatNumber(window.totalPoints || 0)} очков в кликер игре! Сыграй тоже!`;
        const url = window.location.href;
        
        if (tg && typeof tg.openTelegramLink === 'function') {
            tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
        } else {
            // Копируем в буфер обмена
            navigator.clipboard.writeText(`${text} ${url}`).then(() => {
                if (typeof showMessage === 'function') {
                    showMessage("Ссылка скопирована!", "#00adb5");
                }
            }).catch(() => {
                alert(`${text}\n\n${url}`);
            });
        }
    } catch (e) {
        console.log("shareResult ошибка:", e);
    }
}

function inviteFriend() {
    try {
        const url = window.location.href;
        
        if (tg && typeof tg.openTelegramLink === 'function') {
            const botUsername = "alumClickerBot";
            const inviteUrl = `https://t.me/${botUsername}?start=invite`;
            tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(inviteUrl)}`);
        } else {
            navigator.clipboard.writeText(url).then(() => {
                if (typeof showMessage === 'function') {
                    showMessage("Ссылка на игру скопирована!", "#00adb5");
                }
            });
        }
        
        // Даём бонус за приглашение
        if (typeof window.keys !== 'undefined') {
            window.keys = (window.keys || 0) + 1;
            if (typeof updateKeysDisplay === 'function') {
                updateKeysDisplay();
            }
            if (typeof showMessage === 'function') {
                showMessage("+1 ключ за приглашение!", "#ffd700");
            }
        }
    } catch (e) {
        console.log("inviteFriend ошибка:", e);
    }
}

function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num);
}

// Экспортируем функции
window.initTelegram = initTelegram;
window.saveToTelegramCloud = saveToTelegramCloud;
window.loadTelegramSave = loadTelegramSave;
window.shareResult = shareResult;
window.inviteFriend = inviteFriend;
