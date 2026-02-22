// cheat.js - Секретное чит-меню для разработчика

let cheatModeEnabled = false;

// Функция активации чит-меню
function enableCheatMode() {
    if (cheatModeEnabled) return;
    
    cheatModeEnabled = true;
    console.log("%c🔧 ЧИТ-МЕНЮ АКТИВИРОВАНО! 🔧", "color: #ff4757; font-size: 16px; font-weight: bold;");
    
    // Показываем кнопку быстрого доступа
    const quickButton = document.getElementById('cheatQuickButton');
    if (quickButton) {
        quickButton.style.display = 'flex';
    }
    
    // Показываем сообщение
    if (typeof showMessage === 'function') {
        showMessage("🔧 ЧИТ-МЕНЮ АКТИВИРОВАНО! 🔧", "#ff4757", 5000);
    }
    
    // Сохраняем в localStorage
    localStorage.setItem('cheatModeEnabled', 'true');
}

// Функция переключения чит-меню
function toggleCheatMenu() {
    if (!cheatModeEnabled) return;
    
    const modal = document.getElementById('cheatModal');
    if (modal) {
        if (modal.style.display === 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
            updateCheatInputs();
        }
    }
}

// Обновление значений в инпутах
function updateCheatInputs() {
    document.getElementById('cheatKeysAmount').value = 100;
    document.getElementById('cheatPointsAmount').value = 1000;
    document.getElementById('cheatClicksAmount').value = 1000;
    document.getElementById('cheatEnergyAmount').value = 100;
    document.getElementById('cheatMultiplier').value = 2;
}

// ========== ФУНКЦИИ ДЛЯ КЛЮЧЕЙ ==========
function cheatAddKeys() {
    const amount = parseInt(document.getElementById('cheatKeysAmount').value) || 100;
    window.keys = (window.keys || 0) + amount;
    if (typeof keys !== 'undefined') keys = window.keys;
    updateAllDisplays();
    showMessage(`🔑 +${amount} ключей!`, "#ff4757");
}

function cheatRemoveKeys() {
    const amount = parseInt(document.getElementById('cheatKeysAmount').value) || 100;
    window.keys = Math.max(0, (window.keys || 0) - amount);
    if (typeof keys !== 'undefined') keys = window.keys;
    updateAllDisplays();
    showMessage(`🔑 -${amount} ключей!`, "#ff4757");
}

function cheatSetKeys() {
    const amount = parseInt(document.getElementById('cheatKeysAmount').value) || 100;
    window.keys = amount;
    if (typeof keys !== 'undefined') keys = window.keys;
    updateAllDisplays();
    showMessage(`🔑 Ключи установлены: ${amount}`, "#ff4757");
}

// ========== ФУНКЦИИ ДЛЯ ОЧКОВ ==========
function cheatAddPoints() {
    const amount = parseInt(document.getElementById('cheatPointsAmount').value) || 1000;
    window.clickCount = (window.clickCount || 0) + amount;
    window.totalPoints = (window.totalPoints || 0) + amount;
    if (typeof clickCount !== 'undefined') clickCount = window.clickCount;
    if (typeof totalPoints !== 'undefined') totalPoints = window.totalPoints;
    updateAllDisplays();
    showMessage(`⭐ +${amount} очков!`, "#ff4757");
}

function cheatRemovePoints() {
    const amount = parseInt(document.getElementById('cheatPointsAmount').value) || 1000;
    window.clickCount = Math.max(0, (window.clickCount || 0) - amount);
    window.totalPoints = Math.max(0, (window.totalPoints || 0) - amount);
    if (typeof clickCount !== 'undefined') clickCount = window.clickCount;
    if (typeof totalPoints !== 'undefined') totalPoints = window.totalPoints;
    updateAllDisplays();
    showMessage(`⭐ -${amount} очков!`, "#ff4757");
}

function cheatSetPoints() {
    const amount = parseInt(document.getElementById('cheatPointsAmount').value) || 1000;
    window.clickCount = amount;
    window.totalPoints = amount;
    if (typeof clickCount !== 'undefined') clickCount = window.clickCount;
    if (typeof totalPoints !== 'undefined') totalPoints = window.totalPoints;
    updateAllDisplays();
    showMessage(`⭐ Очки установлены: ${amount}`, "#ff4757");
}

// ========== ФУНКЦИИ ДЛЯ КЛИКОВ ==========
function cheatAddClicks() {
    const amount = parseInt(document.getElementById('cheatClicksAmount').value) || 1000;
    window.totalClicks = (window.totalClicks || 0) + amount;
    if (typeof totalClicks !== 'undefined') totalClicks = window.totalClicks;
    updateAllDisplays();
    showMessage(`🖱️ +${amount} кликов!`, "#ff4757");
}

function cheatRemoveClicks() {
    const amount = parseInt(document.getElementById('cheatClicksAmount').value) || 1000;
    window.totalClicks = Math.max(0, (window.totalClicks || 0) - amount);
    if (typeof totalClicks !== 'undefined') totalClicks = window.totalClicks;
    updateAllDisplays();
    showMessage(`🖱️ -${amount} кликов!`, "#ff4757");
}

function cheatSetClicks() {
    const amount = parseInt(document.getElementById('cheatClicksAmount').value) || 1000;
    window.totalClicks = amount;
    if (typeof totalClicks !== 'undefined') totalClicks = window.totalClicks;
    updateAllDisplays();
    showMessage(`🖱️ Клики установлены: ${amount}`, "#ff4757");
}

// ========== ФУНКЦИИ ДЛЯ ЭНЕРГИИ ==========
function cheatAddEnergy() {
    const amount = parseInt(document.getElementById('cheatEnergyAmount').value) || 100;
    const effectiveMaxEnergy = (window.maxEnergy || 100) * (window.energyMultiplier || 1);
    window.currentEnergy = Math.min(effectiveMaxEnergy, (window.currentEnergy || 100) + amount);
    if (typeof currentEnergy !== 'undefined') currentEnergy = window.currentEnergy;
    updateAllDisplays();
    showMessage(`⚡ +${amount} энергии!`, "#ff4757");
}

function cheatSetEnergy() {
    const amount = parseInt(document.getElementById('cheatEnergyAmount').value) || 100;
    const effectiveMaxEnergy = (window.maxEnergy || 100) * (window.energyMultiplier || 1);
    window.currentEnergy = Math.min(effectiveMaxEnergy, amount);
    if (typeof currentEnergy !== 'undefined') currentEnergy = window.currentEnergy;
    updateAllDisplays();
    showMessage(`⚡ Энергия установлена: ${amount}`, "#ff4757");
}

function cheatMaxEnergy() {
    const effectiveMaxEnergy = (window.maxEnergy || 100) * (window.energyMultiplier || 1);
    window.currentEnergy = effectiveMaxEnergy;
    if (typeof currentEnergy !== 'undefined') currentEnergy = window.currentEnergy;
    updateAllDisplays();
    showMessage(`⚡ Энергия заполнена!`, "#ff4757");
}

// ========== ФУНКЦИИ ДЛЯ УЛУЧШЕНИЙ ==========
function cheatMaxUpgrades() {
    if (typeof upgrades !== 'undefined') {
        upgrades.forEach(upgrade => {
            upgrade.level = upgrade.maxLevel;
            // Пересчитываем стоимость
            const costMultiplier = upgrade.type === 'multiplier' ? 1.25 : 
                                  upgrade.type === 'energy' ? 1.3 : 
                                  upgrade.type === 'regen' ? 1.35 : 
                                  upgrade.type === 'crit' ? 1.4 : 1.2;
            upgrade.cost = Math.floor(upgrade.baseCost * Math.pow(costMultiplier, upgrade.level));
        });
        
        if (typeof recalculateMultiplier === 'function') recalculateMultiplier();
        if (typeof updateEnergyDisplay === 'function') updateEnergyDisplay();
        if (typeof refreshShopUpgradesList === 'function') refreshShopUpgradesList();
        
        showMessage(`📈 Все улучшения максимальны!`, "#ff4757");
    }
}

function cheatUnlockAllSkins() {
    if (typeof skins !== 'undefined') {
        skins.forEach(skin => {
            if (skin.id !== 1) { // Кроме классического
                skin.purchased = true;
            }
        });
        
        if (typeof renderSkins === 'function') renderSkins();
        showMessage(`🎨 Все скины разблокированы!`, "#ff4757");
    }
}

function cheatUnlockAllExclusive() {
    if (typeof allExclusiveUpgrades !== 'undefined') {
        allExclusiveUpgrades.forEach(upgrade => {
            upgrade.purchased = true;
            upgrade.hidden = false;
            if (typeof applyExclusiveEffect === 'function') {
                applyExclusiveEffect(upgrade);
            }
        });
        
        if (typeof initShop === 'function') initShop();
        if (typeof updateExclusiveEffects === 'function') updateExclusiveEffects();
        if (typeof recalculateMultiplier === 'function') recalculateMultiplier();
        
        showMessage(`👑 Все эксклюзивные улучшения разблокированы!`, "#ff4757");
    }
}
function cheatCompleteAchievements() {
    if (typeof achievements !== 'undefined') {
        achievements.forEach(achievement => {
            achievement.completed = true;
            achievement.claimed = true; // ВАЖНО: сразу отмечаем как полученные
        });
        
        // Пересчитываем ключи от всех достижений
        const totalReward = achievements.reduce((sum, a) => sum + a.reward, 0);
        window.keys = totalReward; // Даем все ключи сразу
        
        if (typeof keys !== 'undefined') keys = window.keys;
        
        if (typeof initAchievements === 'function') initAchievements();
        if (typeof updateAchievementsStats === 'function') updateAchievementsStats();
        if (typeof updateKeysDisplay === 'function') updateKeysDisplay();
        
        showMessage(`🏆 Все достижения выполнены! +${totalReward} ключей!`, "#ff4757");
    }
}
// ========== ФУНКЦИИ ДЛЯ КЕЙСОВ ==========
function cheatOpenCase(caseId, count) {
    if (typeof openLootBox !== 'function') return;
    
    showMessage(`📦 Открытие ${count} кейсов...`, "#ff4757");
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            openLootBox(caseId);
        }, i * 300); // Задержка между открытиями
    }
}

// ========== ФУНКЦИИ ДЛЯ МНОЖИТЕЛЕЙ ==========
function cheatSetClickMultiplier() {
    const multiplier = parseFloat(document.getElementById('cheatMultiplier').value) || 2;
    
    // Создаем временное эксклюзивное улучшение
    if (typeof allExclusiveUpgrades !== 'undefined') {
        let cheatMultiplier = allExclusiveUpgrades.find(u => u.id === 999);
        
        if (!cheatMultiplier) {
            cheatMultiplier = {
                id: 999,
                name: "Чит-множитель",
                description: "Временный множитель от чит-меню",
                price: 0,
                effect: "clickMultiplier",
                value: multiplier,
                purchased: true,
                icon: "fa-bug",
                special: true,
                hidden: false
            };
            allExclusiveUpgrades.push(cheatMultiplier);
        } else {
            cheatMultiplier.value = multiplier;
            cheatMultiplier.purchased = true;
        }
        
        if (typeof applyExclusiveEffect === 'function') {
            applyExclusiveEffect(cheatMultiplier);
        }
        if (typeof recalculateMultiplier === 'function') recalculateMultiplier();
        
        showMessage(`🔧 Множитель клика установлен: x${multiplier}`, "#ff4757");
    }
}

function cheatResetMultiplier() {
    // Удаляем чит-множитель
    if (typeof allExclusiveUpgrades !== 'undefined') {
        const index = allExclusiveUpgrades.findIndex(u => u.id === 999);
        if (index !== -1) {
            allExclusiveUpgrades.splice(index, 1);
        }
    }
    
    window.clickMultiplier = 1;
    if (typeof clickMultiplier !== 'undefined') clickMultiplier = 1;
    if (typeof recalculateMultiplier === 'function') recalculateMultiplier();
    
    showMessage(`🔄 Множители сброшены`, "#ff4757");
}

// ========== ОПАСНЫЕ ФУНКЦИИ ==========
function cheatResetGame() {
    if (confirm("⚠️ ТОЧНО СБРОСИТЬ ПРОГРЕСС? ⚠️")) {
        if (typeof resetProgress === 'function') {
            resetProgress();
            showMessage("💀 Прогресс сброшен!", "#ff4757");
        }
    }
}

function cheatWipeData() {
    if (confirm("⚠️⚠️⚠️ ПОЛНОЕ УДАЛЕНИЕ ВСЕХ ДАННЫХ? ⚠️⚠️⚠️\nЭто действие нельзя отменить!")) {
        localStorage.clear();
        showMessage("💀💀💀 ВСЕ ДАННЫЕ УДАЛЕНЫ! Перезагрузка...", "#ff4757", 3000);
        setTimeout(() => location.reload(), 3000);
    }
}

// ========== ОБЩИЕ ФУНКЦИИ ==========
function updateAllDisplays() {
    if (typeof updateUI === 'function') updateUI();
    if (typeof updateEnergyDisplay === 'function') updateEnergyDisplay();
    if (typeof updateKeysDisplay === 'function') updateKeysDisplay();
    if (typeof updateShopStats === 'function') updateShopStats();
    if (typeof updateAchievementsStats === 'function') updateAchievementsStats();
    if (typeof updateLootBoxesKeys === 'function') updateLootBoxesKeys();
    if (typeof updateGlobalVariables === 'function') updateGlobalVariables();
    if (typeof saveGame === 'function') saveGame();
}

// Инициализация
function initCheatMode() {
    console.log("Инициализация чит-системы...");
    
    // Проверяем сохранённый режим
    const saved = localStorage.getItem('cheatModeEnabled');
    if (saved === 'true') {
        enableCheatMode();
    }
    
    // Назначаем обработчики
    const cheatClose = document.getElementById('cheatClose');
    const cheatCloseBtn = document.getElementById('cheatCloseBtn');
    const cheatModal = document.getElementById('cheatModal');
    
    if (cheatClose) {
        cheatClose.onclick = () => {
            if (cheatModal) cheatModal.style.display = 'none';
        };
    }
    
    if (cheatCloseBtn) {
        cheatCloseBtn.onclick = () => {
            if (cheatModal) cheatModal.style.display = 'none';
        };
    }
    
    if (cheatModal) {
        cheatModal.onclick = (e) => {
            if (e.target === cheatModal) {
                cheatModal.style.display = 'none';
            }
        };
    }
}

// Добавляем в глобальную область
window.enableCheatMode = enableCheatMode;
window.toggleCheatMenu = toggleCheatMenu;
window.cheatAddKeys = cheatAddKeys;
window.cheatRemoveKeys = cheatRemoveKeys;
window.cheatSetKeys = cheatSetKeys;
window.cheatAddPoints = cheatAddPoints;
window.cheatRemovePoints = cheatRemovePoints;
window.cheatSetPoints = cheatSetPoints;
window.cheatAddClicks = cheatAddClicks;
window.cheatRemoveClicks = cheatRemoveClicks;
window.cheatSetClicks = cheatSetClicks;
window.cheatAddEnergy = cheatAddEnergy;
window.cheatSetEnergy = cheatSetEnergy;
window.cheatMaxEnergy = cheatMaxEnergy;
window.cheatMaxUpgrades = cheatMaxUpgrades;
window.cheatUnlockAllSkins = cheatUnlockAllSkins;
window.cheatUnlockAllExclusive = cheatUnlockAllExclusive;
window.cheatCompleteAchievements = cheatCompleteAchievements;
window.cheatOpenCase = cheatOpenCase;
window.cheatSetClickMultiplier = cheatSetClickMultiplier;
window.cheatResetMultiplier = cheatResetMultiplier;
window.cheatResetGame = cheatResetGame;
window.cheatWipeData = cheatWipeData;

// Запускаем инициализацию после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    initCheatMode();
});
