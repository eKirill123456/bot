// lootboxes.js - Система кейсов (лутбоксов)

const lootBoxes = [
    {
        id: 1,
        name: "Обычный кейс",
        price: 5,
        icon: "fa-box",
        color: "#9b59b6",
        description: "Содержит обычные награды",
        image: "🎁"
    },
    {
        id: 2,
        name: "Редкий кейс",
        price: 15,
        icon: "fa-box-open",
        color: "#3498db",
        description: "Повышенный шанс на редкие награды",
        image: "📦"
    },
    {
        id: 3,
        name: "Эпический кейс",
        price: 30,
        icon: "fa-cube",
        color: "#9b59b6",
        description: "Шанс на эпические скины и улучшения",
        image: "💎"
    },
    {
        id: 4,
        name: "Легендарный кейс",
        price: 50,
        icon: "fa-crown",
        color: "#f1c40f",
        description: "Гарантированный легендарный предмет",
        image: "👑"
    }
];

const lootBoxItems = [
    // ОБЫЧНЫЙ КЕЙС (id: 1)
    {
        id: 1001,
        boxId: 1,
        name: "50 очков",
        type: "points",
        value: 50,
        rarity: "common",
        chance: 30,
        icon: "fa-star",
        description: "50 дополнительных очков"
    },
    {
        id: 1002,
        boxId: 1,
        name: "100 очков",
        type: "points",
        value: 100,
        rarity: "common",
        chance: 25,
        icon: "fa-star",
        description: "100 дополнительных очков"
    },
    {
        id: 1003,
        boxId: 1,
        name: "1 ключ",
        type: "keys",
        value: 1,
        rarity: "common",
        chance: 20,
        icon: "fa-key",
        description: "1 ключ"
    },
    {
        id: 1004,
        boxId: 1,
        name: "2 ключа",
        type: "keys",
        value: 2,
        rarity: "uncommon",
        chance: 10,
        icon: "fa-key",
        description: "2 ключа"
    },
    {
        id: 1005,
        boxId: 1,
        name: "50 энергии",
        type: "energy",
        value: 50,
        rarity: "uncommon",
        chance: 8,
        icon: "fa-bolt",
        description: "+50 к текущей энергии"
    },
    {
        id: 1006,
        boxId: 1,
        name: "Скин 'Огненный'",
        type: "skin",
        value: 2,
        rarity: "rare",
        chance: 3,
        icon: "fa-fire",
        description: "Огненный скин для кнопки (эксклюзив)",
        exclusive: true
    },
    {
        id: 1007,
        boxId: 1,
        name: "Скин 'Ледяной'",
        type: "skin",
        value: 3,
        rarity: "rare",
        chance: 3,
        icon: "fa-snowflake",
        description: "Ледяной скин для кнопки (эксклюзив)",
        exclusive: true
    },
    {
        id: 1008,
        boxId: 1,
        name: "Улучшение 'Крит-клик I'",
        type: "upgrade",
        value: 10,
        upgradeLevel: 1,
        rarity: "rare",
        chance: 1,
        icon: "fa-crosshairs",
        description: "+1 уровень к Крит-клику"
    },
    
    // РЕДКИЙ КЕЙС (id: 2)
    {
        id: 2001,
        boxId: 2,
        name: "100 очков",
        type: "points",
        value: 100,
        rarity: "common",
        chance: 25,
        icon: "fa-star",
        description: "100 дополнительных очков"
    },
    {
        id: 2002,
        boxId: 2,
        name: "200 очков",
        type: "points",
        value: 200,
        rarity: "common",
        chance: 20,
        icon: "fa-star",
        description: "200 дополнительных очков"
    },
    {
        id: 2003,
        boxId: 2,
        name: "2 ключа",
        type: "keys",
        value: 2,
        rarity: "common",
        chance: 15,
        icon: "fa-key",
        description: "2 ключа"
    },
    {
        id: 2004,
        boxId: 2,
        name: "3 ключа",
        type: "keys",
        value: 3,
        rarity: "uncommon",
        chance: 12,
        icon: "fa-key",
        description: "3 ключа"
    },
    {
        id: 2005,
        boxId: 2,
        name: "100 энергии",
        type: "energy",
        value: 100,
        rarity: "uncommon",
        chance: 10,
        icon: "fa-bolt",
        description: "+100 к текущей энергии"
    },
    {
        id: 2006,
        boxId: 2,
        name: "Скин 'Королевский'",
        type: "skin",
        value: 4,
        rarity: "rare",
        chance: 5,
        icon: "fa-crown",
        description: "Королевский скин для кнопки (эксклюзив)",
        exclusive: true
    },
    {
        id: 2007,
        boxId: 2,
        name: "Скин 'Темный'",
        type: "skin",
        value: 6,
        rarity: "rare",
        chance: 5,
        icon: "fa-moon",
        description: "Темный скин для кнопки (эксклюзив)",
        exclusive: true
    },
    {
        id: 2008,
        boxId: 2,
        name: "Улучшение 'Крит-клик II'",
        type: "upgrade",
        value: 10,
        upgradeLevel: 2,
        rarity: "epic",
        chance: 4,
        icon: "fa-crosshairs",
        description: "+2 уровня к Крит-клику"
    },
    {
        id: 2009,
        boxId: 2,
        name: "Улучшение 'Батарея'",
        type: "upgrade",
        value: 6,
        upgradeLevel: 1,
        rarity: "rare",
        chance: 4,
        icon: "fa-battery-full",
        description: "+1 уровень к Батарее"
    },
    
    // ЭПИЧЕСКИЙ КЕЙС (id: 3)
    {
        id: 3001,
        boxId: 3,
        name: "200 очков",
        type: "points",
        value: 200,
        rarity: "common",
        chance: 20,
        icon: "fa-star",
        description: "200 дополнительных очков"
    },
    {
        id: 3002,
        boxId: 3,
        name: "500 очков",
        type: "points",
        value: 500,
        rarity: "uncommon",
        chance: 15,
        icon: "fa-star",
        description: "500 дополнительных очков"
    },
    {
        id: 3003,
        boxId: 3,
        name: "3 ключа",
        type: "keys",
        value: 3,
        rarity: "common",
        chance: 15,
        icon: "fa-key",
        description: "3 ключа"
    },
    {
        id: 3004,
        boxId: 3,
        name: "5 ключей",
        type: "keys",
        value: 5,
        rarity: "uncommon",
        chance: 12,
        icon: "fa-key",
        description: "5 ключей"
    },
    {
        id: 3005,
        boxId: 3,
        name: "200 энергии",
        type: "energy",
        value: 200,
        rarity: "uncommon",
        chance: 10,
        icon: "fa-bolt",
        description: "+200 к текущей энергии"
    },
    {
        id: 3006,
        boxId: 3,
        name: "Скин 'Золотой'",
        type: "skin",
        value: 5,
        rarity: "epic",
        chance: 8,
        icon: "fa-coins",
        description: "Золотой скин для кнопки (эксклюзив)",
        exclusive: true
    },
    {
        id: 3007,
        boxId: 3,
        name: "Скин 'Хрустальный'",
        type: "skin",
        value: 9,
        rarity: "epic",
        chance: 8,
        icon: "fa-gem",
        description: "Хрустальный скин для кнопки (эксклюзив)",
        exclusive: true
    },
    {
        id: 3008,
        boxId: 3,
        name: "Эксклюзив 'Золотое касание'",
        type: "exclusive",
        value: 101,
        rarity: "legendary",
        chance: 6,
        icon: "fa-hand-holding-heart",
        description: "Эксклюзивное улучшение: Золотое касание",
        exclusive: true
    },
    {
        id: 3009,
        boxId: 3,
        name: "Эксклюзив 'Кристалл энергии'",
        type: "exclusive",
        value: 102,
        rarity: "legendary",
        chance: 6,
        icon: "fa-crystal",
        description: "Эксклюзивное улучшение: Кристалл энергии",
        exclusive: true
    },
    
    // ЛЕГЕНДАРНЫЙ КЕЙС (id: 4)
    {
        id: 4001,
        boxId: 4,
        name: "500 очков",
        type: "points",
        value: 500,
        rarity: "common",
        chance: 15,
        icon: "fa-star",
        description: "500 дополнительных очков"
    },
    {
        id: 4002,
        boxId: 4,
        name: "1000 очков",
        type: "points",
        value: 1000,
        rarity: "uncommon",
        chance: 12,
        icon: "fa-star",
        description: "1000 дополнительных очков"
    },
    {
        id: 4003,
        boxId: 4,
        name: "5 ключей",
        type: "keys",
        value: 5,
        rarity: "common",
        chance: 12,
        icon: "fa-key",
        description: "5 ключей"
    },
    {
        id: 4004,
        boxId: 4,
        name: "10 ключей",
        type: "keys",
        value: 10,
        rarity: "uncommon",
        chance: 10,
        icon: "fa-key",
        description: "10 ключей"
    },
    {
        id: 4005,
        boxId: 4,
        name: "500 энергии",
        type: "energy",
        value: 500,
        rarity: "uncommon",
        chance: 10,
        icon: "fa-bolt",
        description: "+500 к текущей энергии"
    },
    {
        id: 4006,
        boxId: 4,
        name: "Скин 'Неоновый'",
        type: "skin",
        value: 7,
        rarity: "legendary",
        chance: 10,
        icon: "fa-lightbulb",
        description: "Неоновый скин для кнопки (эксклюзив)",
        exclusive: true
    },
    {
        id: 4007,
        boxId: 4,
        name: "Скин 'Радужный'",
        type: "skin",
        value: 8,
        rarity: "legendary",
        chance: 10,
        icon: "fa-rainbow",
        description: "Радужный скин для кнопки (эксклюзив)",
        exclusive: true
    },
    {
        id: 4008,
        boxId: 4,
        name: "Скин 'Лавовый'",
        type: "skin",
        value: 10,
        rarity: "legendary",
        chance: 10,
        icon: "fa-volcano",
        description: "Лавовый скин для кнопки (эксклюзив)",
        exclusive: true
    },
    {
        id: 4009,
        boxId: 4,
        name: "Эксклюзив 'Ключ времени'",
        type: "exclusive",
        value: 103,
        rarity: "legendary",
        chance: 5,
        icon: "fa-clock",
        description: "Эксклюзивное улучшение: Ключ времени",
        exclusive: true
    },
    {
        id: 4010,
        boxId: 4,
        name: "Эксклюзив 'Драконий ключ'",
        type: "exclusive",
        value: 104,
        rarity: "legendary",
        chance: 5,
        icon: "fa-dragon",
        description: "Эксклюзивное улучшение: Драконий ключ",
        exclusive: true
    },
    {
        id: 4011,
        boxId: 4,
        name: "Эксклюзив 'Артефакт мастера'",
        type: "exclusive",
        value: 111,
        rarity: "legendary",
        chance: 1,
        icon: "fa-crown",
        description: "Эксклюзивное улучшение: Артефакт мастера",
        exclusive: true
    }
];

// ИСПРАВЛЕНО: функция открытия кейса
function openLootBox(boxId) {
    console.log("Открытие кейса:", boxId);
    
    const boxData = lootBoxes.find(b => b.id === boxId);
    if (!boxData) {
        if (typeof showMessage === 'function') showMessage("Кейс не найден!", "#ff4757");
        return null;
    }
    
    // Проверяем ключи через глобальную переменную
    if (window.keys < boxData.price) {
        if (typeof showMessage === 'function') showMessage(`Недостаточно ключей! Нужно ${boxData.price}`, "#ff4757");
        return null;
    }
    
    // СПИСЫВАЕМ КЛЮЧИ
    window.keys -= boxData.price;
    console.log(`Куплен кейс за ${boxData.price} ключей. Осталось ключей:`, window.keys);
    
    // Обновляем глобальную переменную keys
    if (typeof keys !== 'undefined') {
        keys = window.keys;
    }
    
    // Обновляем отображение ключей
    if (typeof updateKeysDisplay === 'function') {
        updateKeysDisplay();
    }
    
    // Обновляем статистику магазина
    if (typeof updateShopStats === 'function') {
        updateShopStats();
    }
    
    // Обновляем отображение ключей в кейсах
    updateLootBoxesKeys();
    
    const items = lootBoxItems.filter(item => item.boxId === boxId);
    const selectedItem = selectRandomLootItem(items);
    console.log("Выпал предмет:", selectedItem);
    
    const reward = applyLootBoxReward(selectedItem);
    
    showLootBoxAnimation(boxData, selectedItem, reward);
    
    if (typeof saveGame === 'function') saveGame();
    
    return { box: boxData, item: selectedItem, reward };
}

function selectRandomLootItem(items) {
    let chancePool = [];
    items.forEach(item => {
        for (let i = 0; i < item.chance; i++) {
            chancePool.push(item);
        }
    });
    
    const randomIndex = Math.floor(Math.random() * chancePool.length);
    return chancePool[randomIndex];
}

// ИСПРАВЛЕНО: функция применения награды
function applyLootBoxReward(item) {
    let reward = { type: item.type, value: item.value, name: item.name };
    
    console.log("Применение награды:", item);
    
    switch(item.type) {
        case 'points':
            // Обновляем через window объект
            window.clickCount = (window.clickCount || 0) + item.value;
            window.totalPoints = (window.totalPoints || 0) + item.value;
            
            // Обновляем локальные переменные
            if (typeof clickCount !== 'undefined') clickCount = window.clickCount;
            if (typeof totalPoints !== 'undefined') totalPoints = window.totalPoints;
            
            reward.message = `+${item.value} очков!`;
            console.log(`Добавлено ${item.value} очков. Теперь очков:`, window.clickCount);
            break;
            
        case 'keys':
            window.keys = (window.keys || 0) + item.value;
            
            // Обновляем локальную переменную
            if (typeof keys !== 'undefined') keys = window.keys;
            
            reward.message = `+${item.value} ключей!`;
            console.log(`Добавлено ${item.value} ключей. Теперь ключей:`, window.keys);
            break;
            
        case 'energy':
            const effectiveMaxEnergy = (window.maxEnergy || 100) * (window.energyMultiplier || 1);
            window.currentEnergy = Math.min(effectiveMaxEnergy, (window.currentEnergy || 100) + item.value);
            
            // Обновляем локальную переменную
            if (typeof currentEnergy !== 'undefined') currentEnergy = window.currentEnergy;
            
            reward.message = `+${item.value} энергии!`;
            break;
            
        case 'skin':
            const skin = window.skins ? window.skins.find(s => s.id === item.value) : null;
            
            if (skin) {
                if (skin.purchased) {
                    const keyReward = Math.floor(item.rarity === 'legendary' ? 15 : 
                                               item.rarity === 'epic' ? 10 : 
                                               item.rarity === 'rare' ? 5 : 3);
                    window.keys += keyReward;
                    
                    // Обновляем локальную переменную
                    if (typeof keys !== 'undefined') keys = window.keys;
                    
                    reward.message = `Повторный скин: +${keyReward} ключей!`;
                    reward.type = 'keys_duplicate';
                } else {
                    skin.purchased = true;
                    reward.message = `Новый скин: ${skin.name}!`;
                    reward.type = 'skin_new';
                    
                    if (item.rarity === 'legendary' || item.rarity === 'epic') {
                        if (typeof equipSkin === 'function') {
                            equipSkin(item.value);
                        }
                    }
                }
            }
            break;
            
        case 'upgrade':
            const upgrade = window.upgrades ? window.upgrades.find(u => u.id === item.value) : null;
            
            if (upgrade) {
                const newLevel = Math.min(upgrade.maxLevel, upgrade.level + (item.upgradeLevel || 1));
                const levelsGained = newLevel - upgrade.level;
                
                if (levelsGained > 0) {
                    upgrade.level = newLevel;
                    
                    const costMultiplier = upgrade.type === 'multiplier' ? 1.25 : 
                                          upgrade.type === 'energy' ? 1.3 : 
                                          upgrade.type === 'regen' ? 1.35 : 
                                          upgrade.type === 'crit' ? 1.4 : 1.2;
                    
                    if (upgrade.level < upgrade.maxLevel) {
                        upgrade.cost = Math.floor(upgrade.baseCost * Math.pow(costMultiplier, upgrade.level));
                    }
                    
                    reward.message = `+${levelsGained} уровень к ${upgrade.name}!`;
                    
                    if (typeof recalculateMultiplier === 'function') recalculateMultiplier();
                    if (typeof updateEnergyDisplay === 'function') updateEnergyDisplay();
                } else {
                    const keyReward = item.rarity === 'legendary' ? 20 : 
                                     item.rarity === 'epic' ? 15 : 10;
                    window.keys += keyReward;
                    
                    // Обновляем локальную переменную
                    if (typeof keys !== 'undefined') keys = window.keys;
                    
                    reward.message = `Максимальный уровень: +${keyReward} ключей!`;
                }
            }
            break;
            
        case 'exclusive':
            const exclusive = window.allExclusiveUpgrades ? 
                window.allExclusiveUpgrades.find(u => u.id === item.value) : null;
            
            if (exclusive) {
                if (exclusive.purchased) {
                    const keyReward = 25;
                    window.keys += keyReward;
                    
                    // Обновляем локальную переменную
                    if (typeof keys !== 'undefined') keys = window.keys;
                    
                    reward.message = `Повторное улучшение: +${keyReward} ключей!`;
                } else {
                    exclusive.purchased = true;
                    exclusive.hidden = false;
                    
                    if (typeof applyExclusiveEffect === 'function') {
                        applyExclusiveEffect(exclusive);
                    }
                    
                    reward.message = `Новое улучшение: ${exclusive.name}!`;
                    
                    if (typeof initShop === 'function') initShop();
                }
            }
            break;
    }
    
    // ОБНОВЛЯЕМ ВСЕ ИНТЕРФЕЙСЫ
    if (typeof updateUI === 'function') {
        updateUI();
    }
    
    if (typeof updateEnergyDisplay === 'function') {
        updateEnergyDisplay();
    }
    
    if (typeof updateKeysDisplay === 'function') {
        updateKeysDisplay();
    }
    
    if (typeof updateShopStats === 'function') {
        updateShopStats();
    }
    
    if (typeof renderSkins === 'function') {
        renderSkins();
    }
    
    // Обновляем отображение ключей в кейсах
    updateLootBoxesKeys();
    
    // Обновляем глобальные переменные
    if (typeof updateGlobalVariables === 'function') {
        updateGlobalVariables();
    }
    
    return reward;
}

function showLootBoxAnimation(boxData, item, reward) {
    const modal = document.createElement('div');
    modal.className = 'lootbox-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 3000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
    `;
    
    let rarityColor = '#9b59b6';
    if (item.rarity === 'uncommon') rarityColor = '#3498db';
    else if (item.rarity === 'rare') rarityColor = '#f1c40f';
    else if (item.rarity === 'epic') rarityColor = '#9b59b6';
    else if (item.rarity === 'legendary') rarityColor = '#e74c3c';
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(145deg, #2a2a3a, #1e1e2e);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            border: 3px solid ${rarityColor};
            box-shadow: 0 0 50px ${rarityColor}80;
            animation: popIn 0.5s ease;
        ">
            <div style="font-size: 5rem; margin-bottom: 20px; animation: spin 1s ease;">
                ${boxData.image}
            </div>
            <h2 style="color: ${rarityColor}; font-size: 2rem; margin-bottom: 10px;">
                ${item.name}
            </h2>
            <div style="font-size: 1.2rem; color: #fff; margin-bottom: 20px;">
                ${item.description}
            </div>
            <div style="
                background: rgba(255, 255, 255, 0.1);
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 20px;
                font-size: 1.3rem;
                color: ${rarityColor};
            ">
                <i class="fas ${item.icon}"></i> ${reward.message}
            </div>
            <div style="margin-bottom: 20px;">
                <span style="
                    background: ${rarityColor};
                    color: white;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-weight: bold;
                    text-transform: uppercase;
                ">${item.rarity}</span>
            </div>
            <button onclick="this.closest('.lootbox-modal').remove()" style="
                background: linear-gradient(145deg, #00adb5, #00969c);
                border: none;
                color: white;
                padding: 12px 30px;
                border-radius: 8px;
                font-size: 1.1rem;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s;
            ">Закрыть</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            0% { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => style.remove(), 5000);
}

function showLootBoxChances(boxId) {
    const boxData = lootBoxes.find(b => b.id === boxId);
    if (!boxData) return;
    
    const items = lootBoxItems.filter(item => item.boxId === boxId);
    
    const common = items.filter(i => i.rarity === 'common');
    const uncommon = items.filter(i => i.rarity === 'uncommon');
    const rare = items.filter(i => i.rarity === 'rare');
    const epic = items.filter(i => i.rarity === 'epic');
    const legendary = items.filter(i => i.rarity === 'legendary');
    
    const modal = document.createElement('div');
    modal.className = 'lootbox-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 3000;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(145deg, #2a2a3a, #1e1e2e);
            padding: 30px;
            border-radius: 20px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            border: 2px solid ${boxData.color};
        ">
            <h2 style="color: ${boxData.color}; margin-bottom: 20px; text-align: center;">
                <i class="fas ${boxData.icon}"></i> ${boxData.name} - Шансы
            </h2>
            
            ${common.length > 0 ? `
            <div style="margin-bottom: 20px;">
                <h3 style="color: #9b59b6; margin-bottom: 10px;">Обычные (${common.reduce((sum, i) => sum + i.chance, 0)}%)</h3>
                ${common.map(item => `
                    <div style="display: flex; justify-content: space-between; padding: 5px; border-bottom: 1px solid #333;">
                        <span><i class="fas ${item.icon}"></i> ${item.name}</span>
                        <span style="color: #9b59b6;">${item.chance}%</span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${uncommon.length > 0 ? `
            <div style="margin-bottom: 20px;">
                <h3 style="color: #3498db; margin-bottom: 10px;">Необычные (${uncommon.reduce((sum, i) => sum + i.chance, 0)}%)</h3>
                ${uncommon.map(item => `
                    <div style="display: flex; justify-content: space-between; padding: 5px; border-bottom: 1px solid #333;">
                        <span><i class="fas ${item.icon}"></i> ${item.name}</span>
                        <span style="color: #3498db;">${item.chance}%</span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${rare.length > 0 ? `
            <div style="margin-bottom: 20px;">
                <h3 style="color: #f1c40f; margin-bottom: 10px;">Редкие (${rare.reduce((sum, i) => sum + i.chance, 0)}%)</h3>
                ${rare.map(item => `
                    <div style="display: flex; justify-content: space-between; padding: 5px; border-bottom: 1px solid #333;">
                        <span><i class="fas ${item.icon}"></i> ${item.name}</span>
                        <span style="color: #f1c40f;">${item.chance}%</span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${epic.length > 0 ? `
            <div style="margin-bottom: 20px;">
                <h3 style="color: #9b59b6; margin-bottom: 10px;">Эпические (${epic.reduce((sum, i) => sum + i.chance, 0)}%)</h3>
                ${epic.map(item => `
                    <div style="display: flex; justify-content: space-between; padding: 5px; border-bottom: 1px solid #333;">
                        <span><i class="fas ${item.icon}"></i> ${item.name}</span>
                        <span style="color: #9b59b6;">${item.chance}%</span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${legendary.length > 0 ? `
            <div style="margin-bottom: 20px;">
                <h3 style="color: #e74c3c; margin-bottom: 10px;">Легендарные (${legendary.reduce((sum, i) => sum + i.chance, 0)}%)</h3>
                ${legendary.map(item => `
                    <div style="display: flex; justify-content: space-between; padding: 5px; border-bottom: 1px solid #333;">
                        <span><i class="fas ${item.icon}"></i> ${item.name}</span>
                        <span style="color: #e74c3c;">${item.chance}%</span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <button onclick="this.closest('.lootbox-modal').remove()" style="
                background: linear-gradient(145deg, #00adb5, #00969c);
                border: none;
                color: white;
                padding: 12px 30px;
                border-radius: 8px;
                font-size: 1.1rem;
                cursor: pointer;
                font-weight: bold;
                width: 100%;
                margin-top: 20px;
            ">Закрыть</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function renderLootBoxes() {
    const casesList = document.getElementById('casesList');
    if (!casesList) return;
    
    casesList.innerHTML = '';
    
    lootBoxes.forEach(box => {
        const boxElement = createLootBoxElement(box);
        casesList.appendChild(boxElement);
    });
}

function createLootBoxElement(box) {
    const item = document.createElement('div');
    item.className = 'case-item';
    item.id = `case-${box.id}`;
    
    item.innerHTML = `
        <div class="case-image" style="border-color: ${box.color};">
            ${box.image}
        </div>
        <div class="case-info">
            <div class="case-name" style="color: ${box.color};">${box.name}</div>
            <div class="case-description">${box.description}</div>
            <div class="case-price">
                <i class="fas fa-key"></i> ${box.price}
            </div>
            <div class="case-buttons">
                <button class="case-open-button" onclick="openLootBox(${box.id})" style="background: linear-gradient(145deg, ${box.color}, ${box.color}dd);">
                    <i class="fas fa-gift"></i> Открыть
                </button>
                <button class="case-info-button" onclick="showLootBoxChances(${box.id})">
                    <i class="fas fa-info-circle"></i>
                </button>
            </div>
        </div>
    `;
    
    return item;
}

function updateLootBoxesKeys() {
    const casesKeysCount = document.getElementById('casesKeysCount');
    if (casesKeysCount) casesKeysCount.textContent = window.keys || 0;
}

window.lootBoxes = lootBoxes;
window.lootBoxItems = lootBoxItems;
window.openLootBox = openLootBox;
window.showLootBoxChances = showLootBoxChances;
window.renderLootBoxes = renderLootBoxes;
window.updateLootBoxesKeys = updateLootBoxesKeys;
