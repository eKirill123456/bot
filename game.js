// game.js - Основная логика игры

console.log('start game.js');
console.log('upgrades массив:', upgrades);

// Элементы DOM
const clickCountElement = document.getElementById('clickCount');
const clickButton = document.getElementById('clickButton');
const clickValueElement = document.getElementById('clickValue');
const achievementsListElement = document.getElementById('achievementsList');
const totalClicksElement = document.getElementById('totalClicks');
const totalPointsElement = document.getElementById('totalPoints');
const pointsPerSecondElement = document.getElementById('pointsPerSecond');
const resetButton = document.getElementById('resetButton');
const confirmResetElement = document.getElementById('confirmReset');
const confirmYesButton = document.getElementById('confirmYes');
const confirmNoButton = document.getElementById('confirmNo');
const soundToggle = document.getElementById('soundToggle');
const keysCountElement = document.getElementById('keysCount');
const keysDisplay = document.getElementById('keysDisplay');
const energyEfficiencyElement = document.getElementById('energyEfficiency');

// Элементы для статистики достижений
const completedAchievementsElement = document.getElementById('completedAchievements');
const totalKeysElement = document.getElementById('totalKeys');
const availableKeysElement = document.getElementById('availableKeys');
const achievementsCounterElement = document.getElementById('achievementsCounter');

// Элементы для магазина
const shopKeysCountElement = document.getElementById('shopKeysCount');
const shopTotalCountElement = document.getElementById('shopTotalCount');

// Элементы энергии
const currentEnergyElement = document.getElementById('currentEnergy');
const maxEnergyElement = document.getElementById('maxEnergy');
const energyBar = document.getElementById('energyBar');
const energyRegenElement = document.getElementById('energyRegen');
const energyCostElement = document.getElementById('energyCost');
const energySection = document.querySelector('.energy-section');

// Элементы табов
const tabGame = document.getElementById('tabGame');
const tabAchievements = document.getElementById('tabAchievements');
const tabShop = document.getElementById('tabShop');
const tabProfile = document.getElementById('tabProfile');

// Элементы контента табов
const gameTab = document.getElementById('gameTab');
const achievementsTab = document.getElementById('achievementsTab');
const shopTab = document.getElementById('shopTab');
const profileTab = document.getElementById('profileTab');

// Элементы уведомлений
const purchaseNotification = document.getElementById('purchaseNotification');
const purchaseMessage = document.getElementById('purchaseMessage');

// Элементы Telegram
const telegramPanel = document.getElementById('telegramPanel');

// Таймеры
let keyGeneratorInterval;
let minuteTimer;

// Защита от авто кликера
let clickTimestamps = [];
let autoClickerDetected = false;
let autoClickerWarnings = 0;

// Функции для работы с глобальными переменными
function updateGlobalVariables() {
    window.clickCount = clickCount;
    window.totalClicks = totalClicks;
    window.clickValue = clickValue;
    window.totalPoints = totalPoints;
    window.pointsPerSecond = pointsPerSecond;
    window.soundEnabled = soundEnabled;
    window.keys = keys;
    window.keysSpent = keysSpent;
    window.currentEnergy = currentEnergy;
    window.maxEnergy = maxEnergy;
    window.energyCost = energyCost;
    window.energyRegen = energyRegen;
    window.energyEfficiency = energyEfficiency;
    window.goldenTouchChance = goldenTouchChance;
    window.energyMultiplier = energyMultiplier;
    window.autoSpeedMultiplier = autoSpeedMultiplier;
    window.clickMultiplier = clickMultiplier;
    window.passiveRegenPercent = passiveRegenPercent;
    window.regenSpeedMultiplier = regenSpeedMultiplier;
    window.speedBoostMultiplier = speedBoostMultiplier;
    window.autoMultiplier = autoMultiplier;
    window.allMultiplier = allMultiplier;
    window.masterMultiplier = masterMultiplier;
    window.maxEnergyFilled = maxEnergyFilled;
    window.lastEnergyPercent = lastEnergyPercent;
    window.clicksPerMinute = clicksPerMinute;
    window.clicksThisMinute = clicksThisMinute;
    window.critChance = critChance;
    window.critMultiplier = critMultiplier;
    window.energySpent = energySpent;
    window.consecutiveClicks = consecutiveClicks;
    window.lastClickTime = lastClickTime;
}

function loadGlobalVariables() {
    clickCount = window.clickCount || 0;
    totalClicks = window.totalClicks || 0;
    clickValue = window.clickValue || 1;
    totalPoints = window.totalPoints || 0;
    pointsPerSecond = window.pointsPerSecond || 0;
    soundEnabled = window.soundEnabled !== undefined ? window.soundEnabled : true;
    keys = window.keys || 0;
    keysSpent = window.keysSpent || 0;
    currentEnergy = window.currentEnergy || 100;
    maxEnergy = window.maxEnergy || 100;
    energyCost = window.energyCost || 5;
    energyRegen = window.energyRegen || 5;
    energyEfficiency = window.energyEfficiency || 1.0;
    goldenTouchChance = window.goldenTouchChance || 0;
    energyMultiplier = window.energyMultiplier || 1;
    autoSpeedMultiplier = window.autoSpeedMultiplier || 1;
    clickMultiplier = window.clickMultiplier || 1;
    passiveRegenPercent = window.passiveRegenPercent || 0;
    regenSpeedMultiplier = window.regenSpeedMultiplier || 1;
    speedBoostMultiplier = window.speedBoostMultiplier || 1;
    autoMultiplier = window.autoMultiplier || 1;
    allMultiplier = window.allMultiplier || 1;
    masterMultiplier = window.masterMultiplier || 1;
    maxEnergyFilled = window.maxEnergyFilled || 0;
    lastEnergyPercent = window.lastEnergyPercent || 0;
    clicksPerMinute = window.clicksPerMinute || 0;
    clicksThisMinute = window.clicksThisMinute || 0;
    critChance = window.critChance || 0;
    critMultiplier = window.critMultiplier || 2;
    energySpent = window.energySpent || 0;
    consecutiveClicks = window.consecutiveClicks || 0;
    lastClickTime = window.lastClickTime || 0;
}

function checkForAutoClicker() {
    const now = Date.now();
    
    clickTimestamps.push(now);
    clickTimestamps = clickTimestamps.filter(t => now - t < 2000);
    
    if (clickTimestamps.length > 30) {
        autoClickerWarnings++;
        
        if (autoClickerWarnings >= 3) {
            autoClickerDetected = true;
            showMessage("⚠️ ОБНАРУЖЕН АВТОКЛИКЕР! ⚠️", "#ff4757", 3000);
            
            currentEnergy = Math.max(0, currentEnergy - 50);
            clickCount = Math.max(0, clickCount - 1000);
            
            clickTimestamps = [];
            autoClickerWarnings = 0;
            
            setTimeout(() => {
                autoClickerDetected = false;
            }, 10000);
            
            return true;
        } else {
            showMessage(`⚠️ Предупреждение ${autoClickerWarnings}/3: Слишком быстрые клики!`, "#ffa500", 1500);
        }
    }
    
    return false;
}

function initGame() {
    console.log("Инициализация игры...");
    
    loadGlobalVariables();
    
    // Проверяем наличие важных элементов
    console.log("Проверка элементов:");
    console.log("- clickButton:", clickButton);
    console.log("- keysCount:", keysCountElement);
    
    // Настройки
    const settingsButton = document.getElementById('settingsButton');
    const settingsModal = document.getElementById('settingsModal');
    const settingsClose = document.getElementById('settingsClose');
    const settingsReset = document.getElementById('settingsReset');
    const settingsSound = document.getElementById('settingsSound');
    const settingsPromo = document.getElementById('settingsPromo');

    if (settingsButton) {
        settingsButton.onclick = () => {
            settingsModal.style.display = 'flex';
        };
    }

    if (settingsClose) {
        settingsClose.onclick = () => {
            settingsModal.style.display = 'none';
        };
    }

    if (settingsReset) {
        settingsReset.onclick = () => {
            if (settingsModal) {
                settingsModal.style.display = 'none';
            }
            if (typeof showResetConfirmation === 'function') {
                showResetConfirmation();
            }
        };
    }

    if (settingsSound) {
        settingsSound.onclick = toggleSound;
    }

    if (settingsPromo) {
        settingsPromo.onclick = () => {
            settingsModal.style.display = 'none';
            showPromoModal();
        };
    }
    
    // Инициализация модулей
    if (typeof initAchievements === 'function') {
        console.log("Инициализация достижений...");
        initAchievements();
    }
    
    if (typeof initPromoCodes === 'function') {
        console.log("Инициализация промокодов...");
        initPromoCodes();
    }
    
    // Инициализация магазина
    if (typeof initShop === 'function') {
        console.log("Инициализация магазина...");
        initShop();
    }
    
    // Telegram и лидерборд
    if (typeof initTelegram === 'function') {
        console.log("Инициализация Telegram...");
        initTelegram();
        if (telegramPanel) {
            telegramPanel.style.display = 'flex';
            console.log("Telegram панель показана");
        }
    }
    
    if (typeof loadLeaderboard === 'function') {
        console.log("Загрузка лидерборда...");
        loadLeaderboard();
        if (typeof renderLeaderboard === 'function') {
            renderLeaderboard();
        }
    }
    
    // Обновление интерфейса
    updateUI();
    updateEnergyDisplay();
    updateKeysDisplay();
    updateAchievementsStats();
    updateShopStats();
    
    // Назначаем обработчики
    if (clickButton) {
        clickButton.onclick = handleClick;
        console.log("Обработчик клика назначен");
    } else {
        console.error("clickButton не найден!");
    }
    
    if (resetButton) {
        resetButton.onclick = showResetConfirmation;
        console.log("Обработчик сброса назначен");
    }
    
    if (soundToggle) {
        soundToggle.onclick = toggleSound;
        console.log("Обработчик звука назначен");
    }
    
    if (keysDisplay) {
        keysDisplay.onclick = () => switchTab('shop');
        console.log("Обработчик ключей назначен");
    }
    
    // Обработчики табов
    if (tabGame) {
        tabGame.onclick = () => switchTab('game');
        console.log("Обработчик tabGame назначен");
    }
    
    if (tabAchievements) {
        tabAchievements.onclick = () => switchTab('achievements');
        console.log("Обработчик tabAchievements назначен");
    }
    
    if (tabShop) {
        tabShop.onclick = () => switchTab('shop');
        console.log("Обработчик tabShop назначен");
    }
    
    if (tabProfile) {
        tabProfile.onclick = () => switchTab('profile');
        console.log("Обработчик tabProfile назначен");
    }
    
    // Обработчики модальных окон
    if (confirmYesButton) {
        confirmYesButton.onclick = resetProgress;
    }
    
    if (confirmNoButton) {
        confirmNoButton.onclick = closeResetConfirmation;
    }
    
    if (confirmResetElement) {
        confirmResetElement.onclick = function(e) {
            if (e.target === confirmResetElement) closeResetConfirmation();
        };
    }
    
    // Устанавливаем интервалы
    setInterval(autoClicker, 1000);
    setInterval(regenerateEnergy, 1000);
    setInterval(enderGiftEffect, 60000);
    
    minuteTimer = setInterval(() => {
        clicksPerMinute = clicksThisMinute;
        clicksThisMinute = 0;
        checkAchievements();
        updateGlobalVariables();
    }, 60000);
    
    // Загружаем сохранение
    loadGame();
    
    // Автосохранение
    setInterval(() => {
        saveGame();
        updateGlobalVariables();
    }, 10000);
    
   // В функции initGame() найдите этот блок (после загрузки сохранения)

// Загружаем настройки звука
const savedSound = localStorage.getItem('clickerGameSound');
if (savedSound !== null) {
    soundEnabled = savedSound === 'true';
} else {
    soundEnabled = true; // По умолчанию звук включен
}

// Обновляем кнопку звука в настройках
function updateSoundButton() {
    const settingsSound = document.getElementById('settingsSound');
    if (settingsSound) {
        if (soundEnabled) {
            settingsSound.innerHTML = '<i class="fas fa-volume-up"></i> Звук ВКЛ';
        } else {
            settingsSound.innerHTML = '<i class="fas fa-volume-mute"></i> Звук ВЫКЛ';
        }
    }
}

// Обновляем кнопку звука в шапке
if (soundToggle) {
    if (soundEnabled) {
        soundToggle.innerHTML = '<i class="fas fa-volume-up"></i> Звук ВКЛ';
        soundToggle.classList.remove('disabled');
    } else {
        soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i> Звук ВЫКЛ';
        soundToggle.classList.add('disabled');
    }
}

// Обновляем кнопку в настройках
updateSoundButton();
    updateExclusiveEffects();
    updateGlobalVariables();
    
    console.log("Игра инициализирована успешно!");
}

function switchTab(tab) {
    console.log("Переключение на вкладку:", tab);
    
    // Получаем элементы заново
    const tabGame = document.getElementById('tabGame');
    const tabAchievements = document.getElementById('tabAchievements');
    const tabShop = document.getElementById('tabShop');
    const tabProfile = document.getElementById('tabProfile');
    const gameTab = document.getElementById('gameTab');
    const achievementsTab = document.getElementById('achievementsTab');
    const shopTab = document.getElementById('shopTab');
    const profileTab = document.getElementById('profileTab');
    
    // Убираем активный класс со всех табов
    if (tabGame) tabGame.classList.remove('active');
    if (tabAchievements) tabAchievements.classList.remove('active');
    if (tabShop) tabShop.classList.remove('active');
    if (tabProfile) tabProfile.classList.remove('active');
    
    if (gameTab) gameTab.classList.remove('active');
    if (achievementsTab) achievementsTab.classList.remove('active');
    if (shopTab) shopTab.classList.remove('active');
    if (profileTab) profileTab.classList.remove('active');
    
    // Активируем нужный таб
    if (tab === 'game') {
        if (tabGame) tabGame.classList.add('active');
        if (gameTab) gameTab.classList.add('active');
        console.log("Активирована вкладка Игра");
    } else if (tab === 'achievements') {
        if (tabAchievements) tabAchievements.classList.add('active');
        if (achievementsTab) achievementsTab.classList.add('active');
        if (typeof initAchievements === 'function') initAchievements();
        updateAchievementsStats();
        console.log("Активирована вкладка Достижения");
    } else if (tab === 'shop') {
        if (tabShop) tabShop.classList.add('active');
        if (shopTab) shopTab.classList.add('active');
        if (typeof initShop === 'function') initShop();
        updateShopStats();
        console.log("Активирована вкладка Магазин");
    } else if (tab === 'profile') {
        if (tabProfile) tabProfile.classList.add('active');
        if (profileTab) profileTab.classList.add('active');
        console.log("Активирована вкладка Профиль");
    }
}

function playClickSound() {
    if (!soundEnabled) return;
    try {
        if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const bufferSize = audioContext.sampleRate * 0.01;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            const t = i / audioContext.sampleRate;
            const fade = Math.exp(-t * 200);
            output[i] = (Math.sin(2 * Math.PI * 1500 * t) * 0.5 + Math.sin(2 * Math.PI * 3000 * t) * 0.3 + Math.sin(2 * Math.PI * 200 * t) * 0.2) * fade;
            output[i] += (Math.random() * 2 - 1) * 0.05 * fade;
        }
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.4;
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        source.start();
    } catch (e) { console.log("Не удалось воспроизвести звук клика"); }
}

function playBuySound() {
    if (!soundEnabled) return;
    try {
        if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
        playClickSound();
        setTimeout(() => {
            if (soundEnabled) {
                try {
                    const bufferSize = audioContext.sampleRate * 0.008;
                    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
                    const output = buffer.getChannelData(0);
                    for (let i = 0; i < bufferSize; i++) {
                        const t = i / audioContext.sampleRate;
                        const fade = Math.exp(-t * 250);
                        output[i] = (Math.sin(2 * Math.PI * 2000 * t) * 0.4 + Math.sin(2 * Math.PI * 3500 * t) * 0.2) * fade;
                    }
                    const source = audioContext.createBufferSource();
                    source.buffer = buffer;
                    const gainNode = audioContext.createGain();
                    gainNode.gain.value = 0.3;
                    source.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    source.start();
                } catch (e) { console.log("Не удалось воспроизвести второй звук покупки"); }
            }
        }, 80);
    } catch (e) { console.log("Не удалось воспроизвести звук покупки"); }
}

function playLevelUpSound() {
    if (!soundEnabled) return;
    try {
        if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
        playClickSound();
        setTimeout(() => { if (soundEnabled) playClickSound(); }, 60);
        setTimeout(() => {
            if (soundEnabled) {
                try {
                    const bufferSize = audioContext.sampleRate * 0.012;
                    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
                    const output = buffer.getChannelData(0);
                    for (let i = 0; i < bufferSize; i++) {
                        const t = i / audioContext.sampleRate;
                        const fade = Math.exp(-t * 150);
                        output[i] = (Math.sin(2 * Math.PI * 1200 * t) * 0.5 + Math.sin(2 * Math.PI * 2500 * t) * 0.3) * fade;
                    }
                    const source = audioContext.createBufferSource();
                    source.buffer = buffer;
                    const gainNode = audioContext.createGain();
                    gainNode.gain.value = 0.5;
                    source.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    source.start();
                } catch (e) { console.log("Не удалось воспроизвести звук уровня"); }
            }
        }, 120);
    } catch (e) { console.log("Не удалось воспроизвести звук уровня"); }
}

function playAchievementSound() {
    if (!soundEnabled) return;
    try {
        if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const bufferSize = audioContext.sampleRate * 0.02;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            const t = i / audioContext.sampleRate;
            const fade = Math.exp(-t * 100);
            output[i] = (Math.sin(2 * Math.PI * 800 * t) * 0.4 + Math.sin(2 * Math.PI * 1200 * t) * 0.3 + Math.sin(2 * Math.PI * 1600 * t) * 0.2) * fade;
        }
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.5;
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        source.start();
    } catch (e) { console.log("Не удалось воспроизвести звук достижения"); }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    if (soundToggle) {
        if (soundEnabled) {
            soundToggle.innerHTML = '<i class="fas fa-volume-up"></i> Звук ВКЛ';
            soundToggle.classList.remove('disabled');
            playClickSound();
        } else {
            soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i> Звук ВЫКЛ';
            soundToggle.classList.add('disabled');
        }
    }
    localStorage.setItem('clickerGameSound', soundEnabled);
    updateGlobalVariables();
}

function updateEnergyDisplay() {
    if (!currentEnergyElement || !maxEnergyElement || !energyBar || !energyRegenElement || !energyCostElement) return;
    
    const effectiveMaxEnergy = maxEnergy * energyMultiplier;
    const effectiveRegen = energyRegen * regenSpeedMultiplier;
    let currentCost = Math.min(20, Math.ceil(consecutiveClicks / 2));
    if (currentCost < 1) currentCost = 1;
    
    currentEnergyElement.textContent = Math.floor(currentEnergy);
    maxEnergyElement.textContent = Math.floor(effectiveMaxEnergy);
    energyRegenElement.textContent = effectiveRegen.toFixed(1);
    energyCostElement.textContent = currentCost;
    
    const speedIndicator = consecutiveClicks > 10 ? "⚠️ СЛИШКОМ БЫСТРО" : consecutiveClicks > 5 ? "⚡ Быстрый темп" : "✓ Нормальный темп";
    if (energySection) energySection.title = `Стоимость клика: ${currentCost} энергии\n${speedIndicator}\nПауза сбрасывает счетчик`;
    
    const energyPercent = (currentEnergy / effectiveMaxEnergy) * 100;
    energyBar.style.width = `${energyPercent}%`;
    
    if (lastEnergyPercent < 100 && energyPercent >= 100) {
        maxEnergyFilled++;
        checkAchievements();
    }
    lastEnergyPercent = energyPercent;
    
    if (energyPercent < 20) energyBar.style.background = 'linear-gradient(90deg, #ff4757, #ff3838)';
    else if (energyPercent < 50) energyBar.style.background = 'linear-gradient(90deg, #ffd166, #ff9a3c)';
    else energyBar.style.background = 'linear-gradient(90deg, #00adb5, #00ff9d)';
    
    if (clickButton) {
        if (currentEnergy < currentCost) {
            clickButton.disabled = true;
            clickButton.title = `Недостаточно энергии! Нужно ${currentCost}`;
        } else {
            clickButton.disabled = false;
            clickButton.title = "Кликни чтобы заработать очки!";
        }
    }
}

function regenerateEnergy() {
    const effectiveMaxEnergy = maxEnergy * energyMultiplier;
    const effectiveRegen = energyRegen * regenSpeedMultiplier;
    const now = Date.now();
    let regenMultiplier = 1;
    if (now - lastClickTime < 1000) regenMultiplier = 0.5;
    else if (now - lastClickTime < 3000) regenMultiplier = 0.75;
    
    const finalRegen = effectiveRegen * regenMultiplier;
    if (currentEnergy < effectiveMaxEnergy) {
        currentEnergy = Math.min(effectiveMaxEnergy, currentEnergy + finalRegen);
        if (passiveRegenPercent > 0 && regenMultiplier > 0.5) {
            currentEnergy = Math.min(effectiveMaxEnergy, currentEnergy + effectiveMaxEnergy * passiveRegenPercent * regenMultiplier);
        }
        updateEnergyDisplay();
    }
    if (currentEnergy >= effectiveMaxEnergy) consecutiveClicks = 0;
    updateGlobalVariables();
}

function resetProgress() {
    clickCount = 0; totalClicks = 0; clickValue = 1; totalPoints = 0; pointsPerSecond = 0; keys = 0; keysSpent = 0;
    maxEnergyFilled = 0; lastEnergyPercent = 0; clicksPerMinute = 0; clicksThisMinute = 0; energySpent = 0; consecutiveClicks = 0; lastClickTime = 0;
    currentEnergy = 100; maxEnergy = 100; energyCost = 5; energyRegen = 5; energyEfficiency = 1.0;
    critChance = 0;
    critMultiplier = 2;
    
    if (typeof upgrades !== 'undefined') {
        upgrades.forEach(upgrade => { upgrade.level = 0; upgrade.cost = upgrade.baseCost; });
    }
    
    if (typeof achievements !== 'undefined') {
        achievements.forEach(achievement => { achievement.claimed = false; achievement.completed = false; });
    }
    
    if (typeof allExclusiveUpgrades !== 'undefined') {
        allExclusiveUpgrades.forEach(upgrade => { upgrade.purchased = false; if (upgrade.special) upgrade.hidden = true; });
    }
    
    if (typeof skins !== 'undefined') {
        skins.forEach(skin => { skin.purchased = skin.id === 1; skin.equipped = skin.id === 1; });
    }
    
    if (typeof resetPromoCodes === 'function') resetPromoCodes();
    
    if (clickValueElement) clickValueElement.textContent = clickValue;
    
    updateExclusiveEffects();
    updateUI(); 
    updateEnergyDisplay();
    
    if (typeof initAchievements === 'function') initAchievements();
    if (typeof initShop === 'function') initShop();
    
    updateKeysDisplay(); 
    updateAchievementsStats(); 
    updateShopStats();
    updateGlobalVariables();
    
    localStorage.removeItem('clickerGameSave');
    if (soundEnabled) playLevelUpSound();
    showMessage("Прогресс сброшен!", "#ff4757");
    if (confirmResetElement) confirmResetElement.style.display = 'none';
}

function showResetConfirmation() { 
    if (confirmResetElement) {
        confirmResetElement.style.display = 'flex'; 
    }
    if (soundEnabled) playClickSound(); 
}

function closeResetConfirmation() { 
    if (confirmResetElement) confirmResetElement.style.display = 'none'; 
    if (soundEnabled) playClickSound(); 
}

function recalculateMultiplier() {
    let multiplier = 1;
    const multiplierUpgrade = upgrades.find(u => u.type === 'multiplier');
    if (multiplierUpgrade && multiplierUpgrade.level > 0) multiplier = Math.pow(multiplierUpgrade.value, multiplierUpgrade.level);
    
    let baseClickValue = 1;
    upgrades.forEach(upgrade => { if (upgrade.type === 'click' && upgrade.level > 0) baseClickValue += upgrade.value * upgrade.level; });
    
    clickValue = baseClickValue * multiplier * energyEfficiency * clickMultiplier * allMultiplier * masterMultiplier;
    if (clickValueElement) clickValueElement.textContent = clickValue.toFixed(1);
    updateGlobalVariables();
}

function handleClick() {
    if (autoClickerDetected) {
        showMessage("Доступ заблокирован из-за авто кликера!", "#ff4757", 1000);
        return;
    }
    
    if (checkForAutoClicker()) {
        return;
    }
    
    const now = Date.now();
    if (now - lastClickTime > 2000) consecutiveClicks = 0;
    lastClickTime = now;
    consecutiveClicks++;
    
    let energyCost = Math.min(20, Math.ceil(consecutiveClicks / 2));
    if (energyCost < 1) energyCost = 1;
    
    if (currentEnergy < energyCost) {
        if (clickButton) {
            clickButton.classList.add('no-energy');
            setTimeout(() => clickButton.classList.remove('no-energy'), 500);
        }
        showMessage(`Нужно ${energyCost} энергии! Сбавьте темп`, "#ff4757", 1500);
        consecutiveClicks = 0;
        return;
    }
    
    currentEnergy -= energyCost;
    energySpent += energyCost;
    totalClicks++; 
    clicksThisMinute++;
    
    let earnedPoints = clickValue;
    let isCrit = false;
    if (critChance > 0 && Math.random() < critChance) {
        earnedPoints *= critMultiplier;
        isCrit = true;
    }
    const heroBonus = typeof getHeroBonus === 'function' ? getHeroBonus() : 0;
    if (heroBonus > 0) earnedPoints *= (1 + heroBonus);
    
    clickCount += earnedPoints;
    totalPoints += earnedPoints;
    
    if (isCrit) createClickAnimation(`КРИТ! x${critMultiplier} (⚡${energyCost})`);
    else createClickAnimation(`+${clickValue.toFixed(1)} (⚡${energyCost})`);
    
    if (goldenTouchChance > 0 && Math.random() < goldenTouchChance) {
        keys++;
        updateKeysDisplay();
        showMessage("+1 ключ!", "#ffd700", 1500);
    }
    if (typeof checkSpecialEffects === 'function') checkSpecialEffects();
    
    updateUI(); 
    updateEnergyDisplay();
    
    buttonAnimation(clickButton);
    if (soundEnabled) playClickSound();
    checkAchievements();
    updateGlobalVariables();
}

function createClickAnimation(text) {
    if (!clickButton) return;
    
    const anim = document.createElement('div');
    anim.className = 'click-animation';
    anim.textContent = text;
    const rect = clickButton.getBoundingClientRect();
    anim.style.left = (rect.left + Math.random() * rect.width) + 'px';
    anim.style.top = (rect.top + Math.random() * rect.height) + 'px';
    if (text.includes("КРИТ")) {
        anim.style.color = '#ff4757';
        anim.style.fontSize = '2rem';
    }
    document.body.appendChild(anim);
    setTimeout(() => anim.remove(), 1000);
}

function buttonAnimation(button) {
    if (!button) return;
    
    const currentClass = button.className;
    
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        if (button.className !== currentClass) {
            button.className = currentClass;
        }
    }, 100);
}

function updateUI() {
    if (clickCountElement) clickCountElement.textContent = formatNumber(clickCount);
    if (totalClicksElement) totalClicksElement.textContent = formatNumber(totalClicks);
    if (totalPointsElement) totalPointsElement.textContent = formatNumber(totalPoints);
    if (pointsPerSecondElement) {
        const pps = pointsPerSecond * autoSpeedMultiplier * autoMultiplier * allMultiplier * masterMultiplier;
        pointsPerSecondElement.textContent = formatNumber(pps);
    }
    if (energyEfficiencyElement) {
        energyEfficiencyElement.textContent = energyEfficiency.toFixed(1);
    }
}

function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num);
}

function autoClicker() {
    if (pointsPerSecond > 0) {
        const autoPoints = pointsPerSecond * autoSpeedMultiplier * autoMultiplier * allMultiplier * masterMultiplier * 0.5;
        clickCount += autoPoints;
        totalPoints += autoPoints;
        updateUI();
        checkAchievements();
        updateGlobalVariables();
    }
}

// Функция для покупки обычных улучшений из магазина
function buyShopUpgrade(upgradeId) {
    console.log("Покупка улучшения из магазина:", upgradeId);
    
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || upgrade.level >= upgrade.maxLevel) {
        if (upgrade) showMessage("Достигнут максимальный уровень улучшения!", "#6c5ce7");
        return;
    }
    
    // Проверяем, хватает ли очков
    if (clickCount >= upgrade.cost) {
        // Списываем очки
        clickCount -= upgrade.cost;
        
        // Повышаем уровень
        upgrade.level++;
        
        // Применяем эффект улучшения
        if (upgrade.type === 'click') {
            clickValue += upgrade.value;
        } else if (upgrade.type === 'auto') {
            pointsPerSecond += upgrade.value;
        } else if (upgrade.type === 'multiplier') {
            recalculateMultiplier();
        } else if (upgrade.type === 'energy') {
            maxEnergy += upgrade.value;
            currentEnergy = Math.min(maxEnergy * energyMultiplier, currentEnergy + upgrade.value * 0.5);
            updateEnergyDisplay();
        } else if (upgrade.type === 'regen') {
            energyRegen += upgrade.value;
            updateEnergyDisplay();
        } else if (upgrade.type === 'crit') {
            critChance += upgrade.value;
        }
        
        // Пересчитываем стоимость следующего уровня
        const costMultiplier = upgrade.type === 'multiplier' ? 1.25 : 
                              upgrade.type === 'energy' ? 1.3 : 
                              upgrade.type === 'regen' ? 1.35 : 
                              upgrade.type === 'crit' ? 1.4 : 1.2;
        
        if (upgrade.level < upgrade.maxLevel) {
            upgrade.cost = Math.floor(upgrade.baseCost * Math.pow(costMultiplier, upgrade.level));
        }
        
        // Обновляем интерфейс
        updateUI();
        updateEnergyDisplay();
        
        // Обновляем отображение в магазине
        refreshShopUpgradesList();
        
        // Показываем сообщение
        showMessage(`Куплено: ${upgrade.name} (ур. ${upgrade.level})`, "#4CAF50");
        
        if (soundEnabled) playBuySound();
        checkAchievements();
        updateGlobalVariables();
        saveGame();
        
    } else {
        showMessage("Недостаточно очков!", "#ff4757");
    }
}

// Функция для покупки эксклюзивных улучшений
function buyExclusiveUpgrade(upgradeId) {
    const upgrade = allExclusiveUpgrades.find(u => u.id === upgradeId);
    if (!upgrade || upgrade.purchased) {
        if (upgrade) showMessage("Это улучшение уже куплено!", "#ff4757");
        return;
    }
    if (keys >= upgrade.price) {
        keys -= upgrade.price; 
        keysSpent += upgrade.price;
        upgrade.purchased = true;
        applyExclusiveEffect(upgrade);
        updateKeysDisplay(); 
        updateShopStats(); 
        loadShopExclusive(); // Обновляем список эксклюзивных улучшений
        updateEnergyDisplay(); 
        recalculateMultiplier();
        showPurchaseNotification(`Куплено: ${upgrade.name}!`);
        if (soundEnabled) playLevelUpSound();
        checkAchievements();
        updateGlobalVariables();
    } else showMessage("Недостаточно ключей!", "#ff4757");
}

function applyExclusiveEffect(upgrade) {
    switch(upgrade.effect) {
        case 'goldenTouch': goldenTouchChance = upgrade.value; break;
        case 'energyMultiplier': energyMultiplier = upgrade.value; currentEnergy *= upgrade.value; break;
        case 'autoSpeed': autoSpeedMultiplier = upgrade.value; break;
        case 'clickMultiplier': clickMultiplier = upgrade.value; recalculateMultiplier(); break;
        case 'passiveRegen': passiveRegenPercent = upgrade.value; break;
        case 'luckChance': goldenTouchChance = upgrade.value; break;
        case 'regenSpeed': regenSpeedMultiplier = upgrade.value; break;
        case 'speedBoost': speedBoostMultiplier = upgrade.value; break;
        case 'autoMultiplier': autoMultiplier = upgrade.value; break;
        case 'allMultiplier': allMultiplier = upgrade.value; recalculateMultiplier(); break;
        case 'masterMultiplier': masterMultiplier = upgrade.value; recalculateMultiplier(); break;
        case 'specialMultiplier': 
            break;
        case 'enderGift': 
            break;
        case 'heroBonus': 
            break;
        case 'legendaryKey': 
            break;
    }
    updateGlobalVariables();
}

function updateExclusiveEffects() {
    goldenTouchChance = 0; 
    energyMultiplier = 1; 
    autoSpeedMultiplier = 1; 
    clickMultiplier = 1;
    passiveRegenPercent = 0; 
    regenSpeedMultiplier = 1; 
    speedBoostMultiplier = 1; 
    autoMultiplier = 1; 
    allMultiplier = 1; 
    masterMultiplier = 1;
    energyEfficiency = 1.0;
    
    if (typeof allExclusiveUpgrades !== 'undefined') {
        allExclusiveUpgrades.forEach(u => { if (u.purchased) applyExclusiveEffect(u); });
    }
    
    updateGlobalVariables();
}

function updateShopStats() {
    if (shopKeysCountElement) shopKeysCountElement.textContent = keys;
    
    // Подсчитываем общее количество купленных предметов
    let totalPurchased = 0;
    let totalItems = 0;
    
    if (typeof allExclusiveUpgrades !== 'undefined') {
        totalPurchased += allExclusiveUpgrades.filter(u => u.purchased).length;
        totalItems += allExclusiveUpgrades.length;
    }
    
    if (typeof skins !== 'undefined') {
        totalPurchased += skins.filter(s => s.purchased).length;
        totalItems += skins.length;
    }
    
    if (shopTotalCountElement) {
        shopTotalCountElement.textContent = `${totalPurchased}/${totalItems}`;
    }
}

function showPurchaseNotification(message) {
    if (!purchaseMessage || !purchaseNotification) return;
    
    purchaseMessage.textContent = message;
    purchaseNotification.style.display = 'flex';
    setTimeout(() => purchaseNotification.style.display = 'none', 3000);
}

// Функции для достижений
function initAchievements() {
    if (!achievementsListElement) {
        console.error("achievementsListElement не найден!");
        return;
    }
    if (typeof achievements === 'undefined') {
        console.error("achievements не определен!");
        return;
    }
    
    achievementsListElement.innerHTML = '';
    
    // Создаем категории
    const categories = getAchievementCategories();
    
    categories.forEach(category => {
        const categoryAchievements = achievements.filter(a => a.category === category);
        const categoryIcon = categoryAchievements[0]?.categoryIcon || 'fa-star';
        
        const section = document.createElement('div');
        section.className = 'achievements-section';
        
        const title = document.createElement('h3');
        title.className = 'achievements-section-title';
        title.innerHTML = `<i class="fas ${categoryIcon}"></i> ${category}`;
        section.appendChild(title);
        
        const grid = document.createElement('div');
        grid.className = 'achievements-subgrid';
        
        categoryAchievements.sort((a, b) => a.id - b.id).forEach(a => {
            grid.appendChild(createAchievementElement(a));
        });
        
        section.appendChild(grid);
        achievementsListElement.appendChild(section);
    });
    
    updateAchievementsCounter();
}

function createAchievementElement(achievement) {
    const el = document.createElement('div');
    el.className = 'achievement-item' + (achievement.claimed ? ' completed' : '');
    el.id = `achievement-${achievement.id}`;
    
    let progressText = '', progressPercent = 0;
    const effectiveMaxEnergy = maxEnergy * energyMultiplier;
    
    if (achievement.type === 'points') {
        progressPercent = Math.min(100, (totalPoints / achievement.target) * 100);
        progressText = `${formatNumber(totalPoints)}/${formatNumber(achievement.target)}`;
    } else if (achievement.type === 'clicks') {
        progressPercent = Math.min(100, (totalClicks / achievement.target) * 100);
        progressText = `${formatNumber(totalClicks)}/${formatNumber(achievement.target)}`;
    } else if (achievement.type === 'pps') {
        const eff = pointsPerSecond * autoSpeedMultiplier * autoMultiplier * allMultiplier * masterMultiplier;
        progressPercent = Math.min(100, (eff / achievement.target) * 100);
        progressText = `${Math.floor(eff)}/${achievement.target}`;
    } else if (achievement.type === 'energy') {
        progressPercent = Math.min(100, (maxEnergyFilled / achievement.target) * 100);
        progressText = `${maxEnergyFilled}/${achievement.target}`;
    } else if (achievement.type === 'energy_max') {
        progressPercent = Math.min(100, (effectiveMaxEnergy / achievement.target) * 100);
        progressText = `${Math.floor(effectiveMaxEnergy)}/${achievement.target}`;
    } else if (achievement.type === 'energy_spent') {
        progressPercent = Math.min(100, (energySpent / achievement.target) * 100);
        progressText = `${energySpent}/${achievement.target}`;
    } else if (achievement.type === 'keys') {
        progressPercent = Math.min(100, (keys / achievement.target) * 100);
        progressText = `${keys}/${achievement.target}`;
    } else if (achievement.type === 'keys_spent') {
        progressPercent = Math.min(100, (keysSpent / achievement.target) * 100);
        progressText = `${keysSpent}/${achievement.target}`;
    } else if (achievement.type === 'upgrades' && typeof upgrades !== 'undefined') {
        const total = upgrades.reduce((s,u) => s + u.level, 0);
        progressPercent = Math.min(100, (total / achievement.target) * 100);
        progressText = `${total}/${achievement.target}`;
    } else if (achievement.type === 'click_cost') {
        const cost = Math.min(20, Math.ceil(consecutiveClicks / 2));
        progressPercent = Math.min(100, (cost / achievement.target) * 100);
        progressText = `${cost}/${achievement.target}`;
    }
    
    const isCompletable = achievement.condition({ 
        totalPoints, totalClicks, 
        pointsPerSecond: pointsPerSecond * autoSpeedMultiplier * autoMultiplier * allMultiplier * masterMultiplier,
        maxEnergyFilled, 
        upgrades: upgrades || [],
        clicksPerMinute: clicksPerMinute * speedBoostMultiplier,
        keys, keysSpent, 
        maxEnergy: effectiveMaxEnergy, 
        energyMultiplier, 
        energySpent, 
        consecutiveClicks,
        exclusiveUpgrades: allExclusiveUpgrades || [], 
        clickValue
    });
    
    el.innerHTML = `
        <div class="achievement-icon"><i class="fas ${achievement.icon}"></i></div>
        <div class="achievement-info">
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
            <div class="achievement-reward"><i class="fas fa-key"></i> x${achievement.reward}</div>
            ${progressText ? `
            <div class="achievement-progress">
                <div class="progress-bar-container"><div class="progress-bar" style="width: ${progressPercent}%"></div></div>
                <div class="progress-text">${progressText}</div>
            </div>` : ''}
        </div>
        <button class="claim-button ${achievement.claimed ? 'claimed' : ''}" onclick="claimAchievement(${achievement.id})" ${isCompletable && !achievement.claimed ? '' : 'disabled'} id="claim-btn-${achievement.id}">
            ${achievement.claimed ? 'Получено' : (isCompletable ? 'Забрать' : 'Выполните')}
        </button>
    `;
    return el;
}

function checkAchievements() {
    if (typeof achievements === 'undefined') return;
    
    let changed = false;
    const effectivePPS = pointsPerSecond * autoSpeedMultiplier * autoMultiplier * allMultiplier * masterMultiplier;
    const effectiveMaxEnergy = maxEnergy * energyMultiplier;
    
    achievements.forEach(a => {
        if (!a.completed && a.condition({ 
            totalPoints, totalClicks, 
            pointsPerSecond: effectivePPS,
            maxEnergyFilled, 
            upgrades: upgrades || [],
            clicksPerMinute: clicksPerMinute * speedBoostMultiplier,
            keys, keysSpent, 
            maxEnergy: effectiveMaxEnergy, 
            energyMultiplier, 
            energySpent, 
            consecutiveClicks,
            exclusiveUpgrades: allExclusiveUpgrades || [], 
            clickValue
        })) {
            a.completed = true;
            changed = true;
            if (soundEnabled) playAchievementSound();
            showMessage(`Достижение выполнено: ${a.name}!`, "#ffd700");
        }
    });
    
    if (changed) {
        if (achievementsTab && achievementsTab.classList.contains('active') && typeof initAchievements === 'function') {
            initAchievements();
        }
        updateAchievementsStats(); 
        updateAchievementsCounter();
        updateGlobalVariables();
    }
}

function claimAchievement(achievementId) {
    if (typeof achievements === 'undefined') return;
    
    const a = achievements.find(a => a.id === achievementId);
    if (!a || !a.completed || a.claimed) return;
    a.claimed = true;
    keys += a.reward;
    updateKeysDisplay(); 
    updateAchievementsStats(); 
    initAchievements();
    showMessage(`+${a.reward} ключей!`, "#ffd700");
    if (soundEnabled) playLevelUpSound();
    updateGlobalVariables();
}

function updateKeysDisplay() {
    if (keysCountElement) keysCountElement.textContent = keys;
    if (availableKeysElement && typeof achievements !== 'undefined') {
        const avail = achievements.filter(a => a.completed && !a.claimed).reduce((s,a) => s + a.reward, 0);
        availableKeysElement.textContent = avail;
    }
    
    updateShopStats();
    updateGlobalVariables();
}

function updateAchievementsStats() {
    if (typeof achievements === 'undefined') return;
    
    const completed = achievements.filter(a => a.claimed).length;
    const totalEarned = achievements.filter(a => a.claimed).reduce((s,a) => s + a.reward, 0);
    const available = achievements.filter(a => a.completed && !a.claimed).reduce((s,a) => s + a.reward, 0);
    
    if (completedAchievementsElement) completedAchievementsElement.textContent = `${completed}/${achievements.length}`;
    if (totalKeysElement) totalKeysElement.textContent = totalEarned;
    if (availableKeysElement) availableKeysElement.textContent = available;
    
    updateAchievementsCounter();
}

function updateAchievementsCounter() {
    if (achievementsCounterElement && typeof achievements !== 'undefined') {
        const completed = achievements.filter(a => a.claimed).length;
        achievementsCounterElement.textContent = `${completed}/${achievements.length}`;
    }
}

function saveGame() {
    updateGlobalVariables();
    
    const data = {
        clickCount, totalClicks, clickValue, totalPoints, pointsPerSecond,
        currentEnergy, maxEnergy, energyCost, energyRegen, energyEfficiency,
        keys, keysSpent, maxEnergyFilled, lastEnergyPercent,
        clicksPerMinute, clicksThisMinute, critChance, energySpent, consecutiveClicks, lastClickTime,
        upgrades: typeof upgrades !== 'undefined' ? upgrades.map(u => ({ id: u.id, level: u.level, cost: u.cost })) : [],
        achievements: typeof achievements !== 'undefined' ? achievements.map(a => ({ id: a.id, claimed: a.claimed, completed: a.completed })) : [],
        exclusiveUpgrades: typeof allExclusiveUpgrades !== 'undefined' ? allExclusiveUpgrades.map(u => ({ id: u.id, purchased: u.purchased, hidden: u.hidden })) : [],
        skins: typeof skins !== 'undefined' ? skins.map(s => ({ id: s.id, purchased: s.purchased, equipped: s.equipped })) : []
    };
    
    if (typeof savePromoCodes === 'function') {
        const promo = savePromoCodes();
        data.promoCodes = promo.promoCodes;
        data.legendaryClickCounter = promo.legendaryClickCounter;
    }
    
    localStorage.setItem('clickerGameSave', JSON.stringify(data));
    
    if (typeof saveToTelegramCloud === 'function') {
        saveToTelegramCloud();
    }
}

function loadGame() {
    const saved = localStorage.getItem('clickerGameSave');
    if (!saved) return;
    
    try {
        const data = JSON.parse(saved);
        
        clickCount = data.clickCount || 0; 
        totalClicks = data.totalClicks || 0;
        clickValue = data.clickValue || 1; 
        totalPoints = data.totalPoints || 0;
        pointsPerSecond = data.pointsPerSecond || 0;
        currentEnergy = data.currentEnergy || 100; 
        maxEnergy = data.maxEnergy || 100;
        energyCost = data.energyCost || 5; 
        energyRegen = data.energyRegen || 5;
        energyEfficiency = data.energyEfficiency || 1.0;
        keys = data.keys || 0; 
        keysSpent = data.keysSpent || 0;
        maxEnergyFilled = data.maxEnergyFilled || 0; 
        lastEnergyPercent = data.lastEnergyPercent || 0;
        clicksPerMinute = data.clicksPerMinute || 0; 
        clicksThisMinute = data.clicksThisMinute || 0;
        critChance = data.critChance || 0; 
        energySpent = data.energySpent || 0;
        consecutiveClicks = data.consecutiveClicks || 0; 
        lastClickTime = data.lastClickTime || 0;
        
        if (data.upgrades && typeof upgrades !== 'undefined') {
            data.upgrades.forEach(s => {
                const u = upgrades.find(u => u.id === s.id);
                if (u) { 
                    u.level = Math.min(s.level || 0, u.maxLevel); 
                    u.cost = s.cost || u.baseCost; 
                }
            });
        }
        
        if (data.achievements && typeof achievements !== 'undefined') {
            data.achievements.forEach(s => {
                const a = achievements.find(a => a.id === s.id);
                if (a) { 
                    a.claimed = s.claimed || false; 
                    a.completed = s.completed || false; 
                }
            });
        }
        
        if (data.exclusiveUpgrades && typeof allExclusiveUpgrades !== 'undefined') {
            data.exclusiveUpgrades.forEach(s => {
                const u = allExclusiveUpgrades.find(u => u.id === s.id);
                if (u) { 
                    u.purchased = s.purchased || false; 
                    if (s.hidden !== undefined) u.hidden = s.hidden; 
                }
            });
        }
        
        if (data.skins && typeof skins !== 'undefined') {
            data.skins.forEach(s => {
                const skin = skins.find(sk => sk.id === s.id);
                if (skin) {
                    skin.purchased = s.purchased || false;
                    skin.equipped = s.equipped || false;
                }
            });
        }
        
        if (typeof loadPromoCodes === 'function') loadPromoCodes(data);
        
        updateExclusiveEffects(); 
        recalculateMultiplier();
        updateUI(); 
        updateEnergyDisplay(); 
        updateKeysDisplay();
        
        if (typeof initAchievements === 'function') initAchievements();
        if (typeof initShop === 'function') initShop();
        
        updateAchievementsStats(); 
        updateShopStats();
        updateGlobalVariables();
        
        showMessage("Игра загружена!", "#00adb5");
    } catch (e) {
        console.error("Ошибка загрузки игры:", e);
    }
}

function showMessage(text, color = "#00adb5", duration = 3000) {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.cssText = `position:fixed; top:20px; left:50%; transform:translateX(-50%); background:${color}; color:white; padding:15px 25px; border-radius:10px; z-index:2000; font-weight:bold; box-shadow:0 5px 15px rgba(0,0,0,0.3); animation:fadeInOut ${duration/1000}s ease-in-out;`;
    const style = document.createElement('style');
    style.textContent = `@keyframes fadeInOut{0%{opacity:0; top:0}15%{opacity:1; top:20px}85%{opacity:1; top:20px}100%{opacity:0; top:0}}`;
    document.head.appendChild(style);
    document.body.appendChild(msg);
    setTimeout(() => { 
        if (msg.parentNode) msg.remove(); 
        if (style.parentNode) style.remove(); 
    }, duration);
}

// Функции для магазина с вкладками
function initShopTabs() {
    console.log("Инициализация вкладок магазина");
    
    const tabUpgrades = document.getElementById('shopTabUpgrades');
    const tabExclusive = document.getElementById('shopTabExclusive');
    const tabSkins = document.getElementById('shopTabSkins');
    const tabCases = document.getElementById('shopTabCases');
    
    const contentUpgrades = document.getElementById('shopUpgradesContent');
    const contentExclusive = document.getElementById('shopExclusiveContent');
    const contentSkins = document.getElementById('shopSkinsContent');
    const contentCases = document.getElementById('shopCasesContent');
    
    if (tabUpgrades) {
        tabUpgrades.onclick = () => {
            tabUpgrades.classList.add('active');
            if (tabExclusive) tabExclusive.classList.remove('active');
            if (tabSkins) tabSkins.classList.remove('active');
            if (tabCases) tabCases.classList.remove('active');
            
            contentUpgrades.classList.add('active');
            contentExclusive.classList.remove('active');
            contentSkins.classList.remove('active');
            contentCases.classList.remove('active');
            
            loadShopUpgrades();
        };
    }
    
    if (tabExclusive) {
        tabExclusive.onclick = () => {
            tabExclusive.classList.add('active');
            if (tabUpgrades) tabUpgrades.classList.remove('active');
            if (tabSkins) tabSkins.classList.remove('active');
            if (tabCases) tabCases.classList.remove('active');
            
            contentExclusive.classList.add('active');
            contentUpgrades.classList.remove('active');
            contentSkins.classList.remove('active');
            contentCases.classList.remove('active');
            
            loadShopExclusive();
        };
    }
    
    if (tabSkins) {
        tabSkins.onclick = () => {
            tabSkins.classList.add('active');
            if (tabUpgrades) tabUpgrades.classList.remove('active');
            if (tabExclusive) tabExclusive.classList.remove('active');
            if (tabCases) tabCases.classList.remove('active');
            
            contentSkins.classList.add('active');
            contentUpgrades.classList.remove('active');
            contentExclusive.classList.remove('active');
            contentCases.classList.remove('active');
            
            loadShopSkins();
        };
    }
    
    if (tabCases) {
        tabCases.onclick = () => {
            tabCases.classList.add('active');
            if (tabUpgrades) tabUpgrades.classList.remove('active');
            if (tabExclusive) tabExclusive.classList.remove('active');
            if (tabSkins) tabSkins.classList.remove('active');
            
            contentCases.classList.add('active');
            contentUpgrades.classList.remove('active');
            contentExclusive.classList.remove('active');
            contentSkins.classList.remove('active');
            
            loadShopCases();
        };
    }
}

function loadShopUpgrades() {
    const list = document.getElementById('shopUpgradesList');
    if (!list) return;
    
    list.innerHTML = '';
    if (typeof upgrades !== 'undefined') {
        upgrades.forEach(upgrade => {
            const item = createShopUpgradeElement(upgrade);
            list.appendChild(item);
        });
    }
}

function loadShopExclusive() {
    const list = document.getElementById('shopExclusiveList');
    if (!list) return;
    
    list.innerHTML = '';
    if (typeof allExclusiveUpgrades !== 'undefined') {
        allExclusiveUpgrades.forEach(upgrade => {
            const item = createShopExclusiveElement(upgrade);
            list.appendChild(item);
        });
    }
}

function loadShopSkins() {
    const list = document.getElementById('shopSkinsList');
    if (!list) return;
    
    list.innerHTML = '';
    if (typeof skins !== 'undefined') {
        skins.forEach(skin => {
            const item = createShopSkinElement(skin);
            list.appendChild(item);
        });
    }
}

function loadShopCases() {
    const list = document.getElementById('shopCasesList');
    if (!list) return;
    
    list.innerHTML = '';
    if (typeof lootBoxes !== 'undefined') {
        lootBoxes.forEach(box => {
            const item = createShopCaseElement(box);
            list.appendChild(item);
        });
    }
}

function createShopUpgradeElement(upgrade) {
    const div = document.createElement('div');
    div.className = 'shop-item';
    
    const isMaxed = upgrade.level >= upgrade.maxLevel;
    const buttonText = isMaxed ? 'МАКС' : 'Купить';
    const buttonDisabled = isMaxed ? 'disabled' : '';
    
    const progressPercent = Math.min(100, (upgrade.level / upgrade.maxLevel) * 100);
    
    let effectText = '';
    if (upgrade.type === 'click') effectText = `+${upgrade.value} за клик`;
    else if (upgrade.type === 'auto') effectText = `+${upgrade.value} в сек`;
    else if (upgrade.type === 'multiplier') {
        const multiplier = Math.pow(upgrade.value, upgrade.level);
        effectText = `×${multiplier.toFixed(1)} множитель`;
    }
    else if (upgrade.type === 'energy') effectText = `+${upgrade.value} энергии`;
    else if (upgrade.type === 'regen') effectText = `+${upgrade.value} реген`;
    else if (upgrade.type === 'crit') effectText = `+${upgrade.value*100}% крита`;
    
    div.innerHTML = `
        <div class="shop-item-icon"><i class="fas fa-arrow-up"></i></div>
        <div class="shop-item-content">
            <div class="shop-item-title">${upgrade.name}</div>
            <div class="shop-item-description">${upgrade.description}</div>
            <div class="shop-item-effect">${effectText}</div>
            <div class="shop-stats-row">
                <span class="shop-item-level">Ур. ${upgrade.level}/${upgrade.maxLevel}</span>
                <span class="shop-item-cost"><i class="fas fa-star"></i> ${upgrade.cost}</span>
            </div>
            <div class="shop-progress-bar">
                <div class="shop-progress-fill" style="width: ${progressPercent}%"></div>
            </div>
            <button class="shop-buy-button" onclick="buyShopUpgrade(${upgrade.id})" ${buttonDisabled}>
                ${buttonText}
            </button>
        </div>
    `;
    return div;
}

function createShopExclusiveElement(upgrade) {
    const div = document.createElement('div');
    div.className = `shop-item ${upgrade.special ? 'special' : ''} ${upgrade.purchased ? 'purchased' : ''}`;
    
    let effectText = '';
    switch(upgrade.effect) {
        case 'goldenTouch': effectText = `${upgrade.value * 100}% шанс на ключ`; break;
        case 'energyMultiplier': effectText = `Энергия +${((upgrade.value-1)*100)}%`; break;
        case 'autoSpeed': effectText = `Автокликеры x${upgrade.value}`; break;
        case 'clickMultiplier': effectText = `Клик x${upgrade.value}`; break;
        default: effectText = upgrade.description;
    }
    
    div.innerHTML = `
        <div class="shop-item-icon"><i class="fas ${upgrade.icon}"></i></div>
        <div class="shop-item-content">
            <div class="shop-item-title">${upgrade.name}</div>
            <div class="shop-item-description">${upgrade.description}</div>
            <div class="shop-item-effect">${effectText}</div>
            <div class="shop-item-price"><i class="fas fa-key"></i> ${upgrade.price}</div>
            <button class="shop-buy-button ${upgrade.purchased ? 'purchased' : ''}" 
                    onclick="buyExclusiveUpgrade(${upgrade.id})" 
                    ${upgrade.purchased ? 'disabled' : ''}>
                ${upgrade.purchased ? 'Куплено' : 'Купить'}
            </button>
        </div>
    `;
    return div;
}

function createShopSkinElement(skin) {
    const div = document.createElement('div');
    div.className = `skin-item ${skin.purchased ? 'purchased' : ''} ${skin.equipped ? 'equipped' : ''}`;
    div.innerHTML = `
        <div class="skin-preview" style="background: ${skin.preview}">
            <i class="fas ${skin.icon}"></i>
        </div>
        <div class="skin-info">
            <div class="skin-name">${skin.name}</div>
            <div class="skin-description">${skin.description}</div>
            <div class="skin-price"><i class="fas fa-key"></i> ${skin.price}</div>
            <button class="skin-button ${skin.purchased ? 'purchased' : ''} ${skin.equipped ? 'equipped' : ''}" 
                    onclick="buyOrEquipSkin(${skin.id})" 
                    ${skin.equipped ? 'disabled' : ''}>
                ${skin.equipped ? 'Экипирован' : (skin.purchased ? 'Экипировать' : 'Купить')}
            </button>
        </div>
    `;
    return div;
}

function createShopCaseElement(box) {
    const div = document.createElement('div');
    div.className = 'case-item';
    div.innerHTML = `
        <div class="case-image" style="border-color: ${box.color}">${box.image}</div>
        <div class="case-info">
            <div class="case-name" style="color: ${box.color}">${box.name}</div>
            <div class="case-description">${box.description}</div>
            <div class="case-price"><i class="fas fa-key"></i> ${box.price}</div>
            <div class="case-buttons">
                <button class="case-open-button" onclick="openLootBox(${box.id})" 
                        style="background: linear-gradient(145deg, ${box.color}, ${box.color}dd)">
                    Открыть
                </button>
                <button class="case-info-button" onclick="showLootBoxChances(${box.id})">
                    <i class="fas fa-info-circle"></i>
                </button>
            </div>
        </div>
    `;
    return div;
}

function refreshShopUpgradesList() {
    const list = document.getElementById('shopUpgradesList');
    if (!list) return;
    
    list.innerHTML = '';
    if (typeof upgrades !== 'undefined') {
        upgrades.forEach(upgrade => {
            const item = createShopUpgradeElement(upgrade);
            list.appendChild(item);
        });
    }
}

function initShop() {
    console.log("Инициализация магазина...");
    initShopTabs();
    loadShopUpgrades();
    loadShopExclusive();
    loadShopSkins();
    loadShopCases();
}

// Экспортируем функции в глобальную область
window.initGame = initGame;
window.switchTab = switchTab;
window.playClickSound = playClickSound;
window.playBuySound = playBuySound;
window.playLevelUpSound = playLevelUpSound;
window.playAchievementSound = playAchievementSound;
window.toggleSound = toggleSound;
window.updateEnergyDisplay = updateEnergyDisplay;
window.regenerateEnergy = regenerateEnergy;
window.resetProgress = resetProgress;
window.showResetConfirmation = showResetConfirmation;
window.closeResetConfirmation = closeResetConfirmation;
window.recalculateMultiplier = recalculateMultiplier;
window.handleClick = handleClick;
window.createClickAnimation = createClickAnimation;
window.buttonAnimation = buttonAnimation;
window.updateUI = updateUI;
window.formatNumber = formatNumber;
window.autoClicker = autoClicker;
window.buyExclusiveUpgrade = buyExclusiveUpgrade;
window.applyExclusiveEffect = applyExclusiveEffect;
window.updateExclusiveEffects = updateExclusiveEffects;
window.updateShopStats = updateShopStats;
window.showPurchaseNotification = showPurchaseNotification;
window.initAchievements = initAchievements;
window.createAchievementElement = createAchievementElement;
window.checkAchievements = checkAchievements;
window.claimAchievement = claimAchievement;
window.updateKeysDisplay = updateKeysDisplay;
window.updateAchievementsStats = updateAchievementsStats;
window.updateAchievementsCounter = updateAchievementsCounter;
window.saveGame = saveGame;
window.loadGame = loadGame;
window.showMessage = showMessage;
window.buyShopUpgrade = buyShopUpgrade;
window.initShop = initShop;
window.loadShopUpgrades = loadShopUpgrades;
window.loadShopExclusive = loadShopExclusive;
window.loadShopSkins = loadShopSkins;
window.loadShopCases = loadShopCases;
window.refreshShopUpgradesList = refreshShopUpgradesList;

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM загружен, запускаем игру...");
    initGame();
});

