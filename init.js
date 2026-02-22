// init.js - Централизованная инициализация

// Глобальная переменная для отслеживания инициализации
let gameInitialized = false;

// Функция для безопасного вызова других функций
function safeCall(funcName, ...args) {
    if (typeof window[funcName] === 'function') {
        return window[funcName](...args);
    }
    console.log(`Функция ${funcName} не найдена`);
    return null;
}

// Инициализация всех модулей
// Добавьте в функцию initializeAll
function initializeAll() {
    console.log("Инициализация всех модулей...");
    
    safeCall('initAchievements');
    safeCall('initPromoCodes');
    safeCall('initShop');
    safeCall('initTelegram');
    safeCall('loadLeaderboard');
    safeCall('initCheatMode');
    safeCall('initDailySystem'); // ДОБАВЬТЕ ЭТУ СТРОКУ
    
    console.log("Все модули инициализированы");
}

// Запускаем после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM загружен, запускаем инициализацию...");
    setTimeout(initializeAll, 100); // Небольшая задержка для гарантии
});
