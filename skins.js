// skins.js - Скины для кнопки

const skins = [
    {
        id: 1,
        name: "Классический",
        description: "Оригинальный стиль кнопки",
        price: 0,
        icon: "fa-circle",
        class: "skin-default",
        preview: "linear-gradient(145deg, #00adb5, #00969c)",
        buttonIcon: "fa-mouse-pointer",
        purchased: true,
        equipped: true
    },
    {
        id: 2,
        name: "Огненный",
        description: "Пылающая кнопка с огненным эффектом",
        price: 10,
        icon: "fa-fire",
        class: "skin-fire",
        preview: "linear-gradient(145deg, #ff6b6b, #ff4757)",
        buttonIcon: "fa-fire",
        purchased: false,
        equipped: false
    },
    {
        id: 3,
        name: "Ледяной",
        description: "Холодная кнопка с ледяным свечением",
        price: 10,
        icon: "fa-snowflake",
        class: "skin-ice",
        preview: "linear-gradient(145deg, #4ecdc4, #45b7aa)",
        buttonIcon: "fa-snowflake",
        purchased: false,
        equipped: false
    },
    {
        id: 4,
        name: "Королевский",
        description: "Фиолетовый стиль для настоящих королей",
        price: 15,
        icon: "fa-crown",
        class: "skin-royal",
        preview: "linear-gradient(145deg, #9b59b6, #8e44ad)",
        buttonIcon: "fa-crown",
        purchased: false,
        equipped: false
    },
    {
        id: 5,
        name: "Золотой",
        description: "Блестящая золотая кнопка",
        price: 20,
        icon: "fa-coins",
        class: "skin-gold",
        preview: "linear-gradient(145deg, #f1c40f, #f39c12)",
        buttonIcon: "fa-coins",
        purchased: false,
        equipped: false
    },
    {
        id: 6,
        name: "Темный",
        description: "Таинственная темная кнопка",
        price: 15,
        icon: "fa-moon",
        class: "skin-dark",
        preview: "linear-gradient(145deg, #2c3e50, #34495e)",
        buttonIcon: "fa-moon",
        purchased: false,
        equipped: false
    },
    {
        id: 7,
        name: "Неоновый",
        description: "Светящаяся неоновая кнопка",
        price: 25,
        icon: "fa-lightbulb",
        class: "skin-neon",
        preview: "linear-gradient(145deg, #00ff9d, #00b8ff)",
        buttonIcon: "fa-lightbulb",
        purchased: false,
        equipped: false
    },
    {
        id: 8,
        name: "Радужный",
        description: "Переливающаяся радужная кнопка",
        price: 30,
        icon: "fa-rainbow",
        class: "skin-rainbow",
        preview: "linear-gradient(145deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8f00ff)",
        buttonIcon: "fa-rainbow",
        purchased: false,
        equipped: false
    },
    {
        id: 9,
        name: "Хрустальный",
        description: "Прозрачная хрустальная кнопка",
        price: 25,
        icon: "fa-gem",
        class: "skin-crystal",
        preview: "linear-gradient(145deg, #a8e6cf, #d4edf5)",
        buttonIcon: "fa-gem",
        purchased: false,
        equipped: false
    },
    {
        id: 10,
        name: "Лавовый",
        description: "Кипящая лавовая кнопка",
        price: 30,
        icon: "fa-volcano",
        class: "skin-lava",
        preview: "linear-gradient(145deg, #ff8c42, #ff4d4d)",
        buttonIcon: "fa-volcano",
        purchased: false,
        equipped: false
    }
];

let currentSkin = "skin-default";
let currentSkinIcon = "fa-mouse-pointer";

const skinsListElement = document.getElementById('skinsList') || null;
const skinsKeysCountElement = document.getElementById('skinsKeysCount') || null;
const equippedSkinElement = document.getElementById('equippedSkin') || null;
const skinsCounterElement = document.getElementById('skinsCounter') || null;

function initSkins() {
    if (!skinsListElement) return;
    updateSkinsKeys();
    renderSkins();
    updateSkinsCounter();
}

function renderSkins() {
    if (!skinsListElement) return;
    skinsListElement.innerHTML = '';
    skins.forEach(skin => {
        skinsListElement.appendChild(createSkinElement(skin));
    });
}

function createSkinElement(skin) {
    const item = document.createElement('div');
    item.className = `skin-item ${skin.purchased ? 'purchased' : ''} ${skin.equipped ? 'equipped' : ''}`;
    item.id = `skin-${skin.id}`;
    
    const statusTag = skin.equipped ? 'Экипирован' : (skin.purchased ? 'Куплен' : 'Не куплен');
    const tagClass = skin.equipped ? 'equipped' : (skin.purchased ? 'purchased' : '');
    
    let buttonText = '';
    let buttonClass = 'skin-button';
    let disabled = false;
    
    if (skin.equipped) {
        buttonText = 'Экипировано';
        buttonClass += ' equipped';
        disabled = true;
    } else if (skin.purchased) {
        buttonText = 'Экипировать';
        buttonClass += ' purchased';
        disabled = false;
    } else {
        buttonText = `Купить за ${skin.price}`;
        disabled = false;
    }
    
    item.innerHTML = `
        <div class="skin-tag ${tagClass}">${statusTag}</div>
        <div class="skin-preview" style="background: ${skin.preview}">
            <i class="fas ${skin.icon}"></i>
        </div>
        <div class="skin-info">
            <div class="skin-name">${skin.name}</div>
            <div class="skin-description">${skin.description}</div>
            ${!skin.purchased ? `
            <div class="skin-price">
                <i class="fas fa-key"></i> ${skin.price}
            </div>
            ` : ''}
            <button class="${buttonClass}" 
                    onclick="buyOrEquipSkin(${skin.id})" 
                    ${disabled ? 'disabled' : ''}>
                ${buttonText}
            </button>
        </div>
    `;
    return item;
}

function buyOrEquipSkin(skinId) {
    const skin = skins.find(s => s.id === skinId);
    if (!skin) return;
    
    if (skin.equipped) {
        if (typeof showMessage === 'function') showMessage("Этот скин уже экипирован!", "#ff6b6b");
        return;
    }
    
    if (skin.purchased) {
        equipSkin(skinId);
    } else {
        if (window.keys >= skin.price) {
            window.keys -= skin.price;
            if (typeof window.keysSpent !== 'undefined') {
                window.keysSpent += skin.price;
            }
            skin.purchased = true;
            
            if (typeof updateKeysDisplay === 'function') updateKeysDisplay();
            updateSkinsKeys();
            equipSkin(skinId);
            
            if (typeof showMessage === 'function') showMessage(`Куплен скин: ${skin.name}!`, "#4CAF50");
            if (window.soundEnabled && typeof playLevelUpSound === 'function') playLevelUpSound();
            if (typeof checkAchievements === 'function') checkAchievements();
        } else {
            if (typeof showMessage === 'function') showMessage("Недостаточно ключей!", "#ff4757");
        }
    }
    
    renderSkins();
    updateSkinsCounter();
    if (typeof saveGame === 'function') saveGame();
}

function equipSkin(skinId) {
    skins.forEach(s => { s.equipped = false; });
    
    const skin = skins.find(s => s.id === skinId);
    if (skin) {
        skin.equipped = true;
        currentSkin = skin.class;
        currentSkinIcon = skin.buttonIcon || skin.icon || "fa-mouse-pointer";
        
        const clickButton = document.getElementById('clickButton');
        if (clickButton) {
            clickButton.className = `click-button ${skin.class}`;
            clickButton.innerHTML = `<i class="fas ${currentSkinIcon}"></i><br>Кликай!`;
        }
        
        if (equippedSkinElement) {
            equippedSkinElement.textContent = skin.name;
        }
        
        if (typeof showMessage === 'function') showMessage(`Экипирован скин: ${skin.name}!`, "#ff6b6b");
        if (window.soundEnabled && typeof playClickSound === 'function') playClickSound();
    }
}

function updateSkinsKeys() {
    if (skinsKeysCountElement && typeof window.keys !== 'undefined') {
        skinsKeysCountElement.textContent = window.keys;
    }
}

function updateSkinsCounter() {
    if (skinsCounterElement) {
        const purchased = skins.filter(s => s.purchased).length;
        skinsCounterElement.textContent = `${purchased}/${skins.length}`;
    }
}

function loadSkins(savedData) {
    if (savedData && savedData.skins) {
        savedData.skins.forEach(savedSkin => {
            const skin = skins.find(s => s.id === savedSkin.id);
            if (skin) {
                skin.purchased = savedSkin.purchased || false;
                skin.equipped = savedSkin.equipped || false;
                
                if (skin.equipped) {
                    currentSkin = skin.class;
                    currentSkinIcon = skin.buttonIcon || skin.icon || "fa-mouse-pointer";
                    const clickButton = document.getElementById('clickButton');
                    if (clickButton) {
                        clickButton.className = `click-button ${skin.class}`;
                        clickButton.innerHTML = `<i class="fas ${currentSkinIcon}"></i><br>Кликай!`;
                    }
                    
                    if (equippedSkinElement) {
                        equippedSkinElement.textContent = skin.name;
                    }
                }
            }
        });
    }
}

function saveSkins() {
    return skins.map(s => ({
        id: s.id,
        purchased: s.purchased,
        equipped: s.equipped
    }));
}

window.initSkins = initSkins;
window.renderSkins = renderSkins;
window.createSkinElement = createSkinElement;
window.buyOrEquipSkin = buyOrEquipSkin;
window.equipSkin = equipSkin;
window.updateSkinsKeys = updateSkinsKeys;
window.updateSkinsCounter = updateSkinsCounter;
window.loadSkins = loadSkins;
window.saveSkins = saveSkins;