// promocodes.js - Система промокодов

const promoCodes = [
    // Обычные промокоды (дают ключи)
    {
        code: "CLICKER2024",
        reward: 5,
        type: "keys",
        used: false,
        description: "5 ключей"
    },
    {
        code: "WELCOME",
        reward: 3,
        type: "keys",
        used: false,
        description: "3 ключа"
    },
    {
        code: "ENERGY100",
        reward: 100,
        type: "energy",
        used: false,
        description: "+100 к текущей энергии"
    },
    {
        code: "BOOSTER",
        reward: 50,
        type: "points",
        used: false,
        description: "50 очков"
    },
    {
        code: "SUPERCLICK",
        reward: 10,
        type: "clicks",
        used: false,
        description: "10 бесплатных кликов"
    },
    {
        code: "LUCKYDAY",
        reward: 2,
        type: "keys",
        used: false,
        description: "2 ключа"
    },
    {
        code: "PROMO2024",
        reward: 4,
        type: "keys",
        used: false,
        description: "4 ключа"
    },
    {
        code: "ENERGYMASTER",
        reward: 200,
        type: "energy",
        used: false,
        description: "+200 к текущей энергии"
    },
    
    // Промокоды на кейсы
    {
        code: "FREECASE",
        reward: 1,
        type: "case_common",
        used: false,
        description: "1 бесплатный обычный кейс"
    },
    {
        code: "LUCKYBOX",
        reward: 1,
        type: "case_rare",
        used: false,
        description: "1 бесплатный редкий кейс"
    },
    {
        code: "EPICGIFT",
        reward: 1,
        type: "case_epic",
        used: false,
        description: "1 бесплатный эпический кейс"
    },
    {
        code: "LEGENDARY2025",
        reward: 1,
        type: "case_legendary",
        used: false,
        description: "1 бесплатный легендарный кейс"
    },
    {
        code: "CASEMASTER",
        reward: 3,
        type: "case_common",
        used: false,
        description: "3 обычных кейса"
    },
    {
        code: "BOXCOLLECTOR",
        reward: 2,
        type: "case_rare",
        used: false,
        description: "2 редких кейса"
    },
    
    // Промокоды, открывающие специальные улучшения
    {
        code: "WITHER666",
        reward: null,
        type: "special",
        specialUpgradeId: 201,
        used: false,
        description: "Незер-ключ"
    },
    {
        code: "ENDERDRAGON",
        reward: null,
        type: "special",
        specialUpgradeId: 202,
        used: false,
        description: "Эндер-ключ"
    },
    {
        code: "HERO2024",
        reward: null,
        type: "special",
        specialUpgradeId: 203,
        used: false,
        description: "Ключ героя"
    },
    {
        code: "LEGENDARY",
        reward: null,
        type: "special",
        specialUpgradeId: 204,
        used: false,
        description: "Легендарный ключ"
    },
    
    // Промокоды на эксклюзивные предметы
    {
        code: "SKINLOVER",
        reward: 2,
        type: "skin_random",
        used: false,
        description: "Случайный эксклюзивный скин"
    },
    {
        code: "UPGRADE10",
        reward: 10,
        type: "upgrade_points",
        used: false,
        description: "10 очков улучшений"
    },
    {
        code: "CRYSTALKEY",
        reward: 1,
        type: "exclusive_random",
        used: false,
        description: "Случайное эксклюзивное улучшение"
    }   
        
    {   
        code: "DEBUGMODE666",
        reward: null,
        type: "cheat_menu",
        used: false,
        description: "Активация чит-меню (только для разработчика)"
    }
];

let legendaryClickCounter = 0;
let promoButton, promoModal, promoInput, promoActivate, promoClose, promoList, promoMessage;

function forceUpdateKeysDisplay() {
    console.log("Принудительное обновление ключей");
    
    const currentKeys = window.keys || 0;
    
    const keysElements = [
        document.getElementById('keysCount'),
        document.getElementById('skinsKeysCount'),
        document.getElementById('shopKeysCount'),
        document.getElementById('availableKeys'),
        document.getElementById('casesKeysCount')
    ];
    
    keysElements.forEach(el => {
        if (el) el.textContent = currentKeys;
    });
    
    if (typeof window.keys !== 'undefined') {
        window.keys = currentKeys;
    }
    
    if (typeof keys !== 'undefined') {
        keys = window.keys;
    }
    
    if (typeof updateKeysDisplay === 'function') {
        updateKeysDisplay();
    }
    
    if (typeof updateShopStats === 'function') {
        updateShopStats();
    }
    
    if (typeof updateLootBoxesKeys === 'function') {
        updateLootBoxesKeys();
    }
}

function initPromoCodes() {
    console.log("Инициализация промокодов...");
    
    promoButton = document.getElementById('promoButton');
    promoModal = document.getElementById('promoModal');
    promoInput = document.getElementById('promoInput');
    promoActivate = document.getElementById('promoActivate');
    promoClose = document.getElementById('promoClose');
    promoList = document.getElementById('promoList');
    promoMessage = document.getElementById('promoMessage');
    
    if (promoButton) {
        promoButton.addEventListener('click', function() {
            showPromoModal();
        });
    }
    
    if (promoClose) {
        promoClose.addEventListener('click', function() {
            hidePromoModal();
        });
    }
    
    if (promoActivate) {
        promoActivate.addEventListener('click', function() {
            activatePromoCode();
        });
    }
    
    if (promoModal) {
        promoModal.addEventListener('click', function(e) {
            if (e.target === promoModal) {
                hidePromoModal();
            }
        });
    }
    
    if (promoInput) {
        promoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                activatePromoCode();
            }
        });
    }
    
    updatePromoList();
}

function showPromoModal() {
    if (!promoModal) return;
    promoModal.style.display = 'flex';
    if (promoInput) {
        promoInput.value = '';
        promoInput.focus();
    }
    updatePromoList();
    if (typeof playClickSound === 'function') playClickSound();
}

function hidePromoModal() {
    if (!promoModal) return;
    promoModal.style.display = 'none';
    if (typeof playClickSound === 'function') playClickSound();
}

function updatePromoList() {
    if (!promoList) return;
    
    promoList.innerHTML = '<h3 style="color: #9b59b6; margin-bottom: 10px;">Активированные промокоды:</h3>';
    
    const usedPromos = promoCodes.filter(promo => promo.used);
    
    if (usedPromos.length === 0) {
        promoList.innerHTML += '<p style="color: #aaa; text-align: center;">У вас пока нет активированных промокодов</p>';
        return;
    }
    
    usedPromos.forEach(promo => {
        const promoItem = document.createElement('div');
        promoItem.className = 'promo-item';
        
        promoItem.innerHTML = `
            <div>
                <span class="promo-code">${promo.code}</span>
                <div style="font-size: 0.8rem; color: #4CAF50;">✓ Активирован</div>
            </div>
            <div class="promo-reward">
                <i class="fas fa-gift"></i> ${promo.description}
            </div>
        `;
        
        promoList.appendChild(promoItem);
    });
}

function openCaseFromPromo(caseType, count = 1) {
    let caseId = 1;
    
    switch(caseType) {
        case 'case_rare':
            caseId = 2;
            break;
        case 'case_epic':
            caseId = 3;
            break;
        case 'case_legendary':
            caseId = 4;
            break;
        default:
            caseId = 1;
    }
    
    for (let i = 0; i < count; i++) {
        if (typeof openLootBox === 'function') {
            setTimeout(() => {
                openLootBox(caseId);
            }, i * 500);
        }
    }
}

function activatePromoCode() {
    if (!promoInput) return;
    
    const code = promoInput.value.trim().toUpperCase();
    console.log('Активация промокода:', code);
    
    if (!code) {
        showPromoMessage("Введите промокод!", "error");
        return;
    }
    
    const promo = promoCodes.find(p => p.code === code);
    console.log('Найден промокод:', promo);
    
    if (!promo) {
        showPromoMessage("Неверный промокод!", "error");
        return;
    }
    
    if (promo.used) {
        showPromoMessage("Этот промокод уже использован!", "error");
        return;
    }
    
    promo.used = true;
    console.log('Промокод активирован, тип:', promo.type);
    
    if (promo.type === 'keys') {
        console.log('Было ключей:', window.keys);
        window.keys += promo.reward;
        if (typeof keys !== 'undefined') keys = window.keys;
        console.log('Стало ключей:', window.keys);
        showPromoMessage(`+${promo.reward} ключей!`, "success");
        forceUpdateKeysDisplay();
        
    } else if (promo.type === 'energy') {
        const effectiveMaxEnergy = (window.maxEnergy || 100) * (window.energyMultiplier || 1);
        window.currentEnergy = Math.min(effectiveMaxEnergy, (window.currentEnergy || 100) + promo.reward);
        showPromoMessage(`+${promo.reward} энергии!`, "success");
        if (typeof updateEnergyDisplay === 'function') updateEnergyDisplay();
        
    } else if (promo.type === 'points') {
        window.clickCount = (window.clickCount || 0) + promo.reward;
        window.totalPoints = (window.totalPoints || 0) + promo.reward;
        showPromoMessage(`+${promo.reward} очков!`, "success");
        if (typeof updateUI === 'function') updateUI();
        
    } else if (promo.type === 'clicks') {
        for (let i = 0; i < promo.reward; i++) {
            simulateClick();
        }
        showPromoMessage(`+${promo.reward} бесплатных кликов!`, "success");
        
    } else if (promo.type.startsWith('case_')) {
        const caseNames = {
            'case_common': 'обычных',
            'case_rare': 'редких',
            'case_epic': 'эпических',
            'case_legendary': 'легендарных'
        };
        const caseName = caseNames[promo.type] || 'кейсов';
        showPromoMessage(`+${promo.reward} ${caseName} кейсов!`, "success");
        openCaseFromPromo(promo.type, promo.reward);
        
    } else if (promo.type === 'skin_random') {
        const exclusiveSkins = [2, 3, 4, 5, 6, 7, 8, 9, 10];
        const randomSkinId = exclusiveSkins[Math.floor(Math.random() * exclusiveSkins.length)];
        const skin = window.skins ? window.skins.find(s => s.id === randomSkinId) : null;
        
        if (skin) {
            skin.purchased = true;
            showPromoMessage(`Получен скин: ${skin.name}!`, "success");
            if (typeof renderSkins === 'function') renderSkins();
        }
        
    } else if (promo.type === 'upgrade_points') {
        window.clickCount = (window.clickCount || 0) + promo.reward * 100;
        window.totalPoints = (window.totalPoints || 0) + promo.reward * 100;
        showPromoMessage(`+${promo.reward * 100} очков улучшений!`, "success");
        if (typeof updateUI === 'function') updateUI();
        
    } else if (promo.type === 'exclusive_random') {
        const exclusives = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111];
        const randomExclusiveId = exclusives[Math.floor(Math.random() * exclusives.length)];
        const exclusive = window.allExclusiveUpgrades ? 
            window.allExclusiveUpgrades.find(u => u.id === randomExclusiveId) : null;
        
        if (exclusive && !exclusive.purchased) {
            exclusive.purchased = true;
            if (typeof applyExclusiveEffect === 'function') applyExclusiveEffect(exclusive);
            showPromoMessage(`Получено улучшение: ${exclusive.name}!`, "success");
            if (typeof initShop === 'function') initShop();
        } else {
            window.keys += 15;
            showPromoMessage(`Повторное улучшение: +15 ключей!`, "success");
            forceUpdateKeysDisplay();
        }
        
    } else if (promo.type === 'special') {
        // ИСПРАВЛЕНО: используем функцию из shop.js
        if (typeof activateSpecialUpgrade === 'function') {
            const activatedUpgrade = activateSpecialUpgrade(promo.code);
            
            if (activatedUpgrade) {
                showPromoMessage(`Открыто улучшение: ${activatedUpgrade.name}!`, "success");
                
                // Обновляем отображение магазина, если он открыт
                const shopTab = document.getElementById('shopTab');
                if (shopTab && shopTab.classList.contains('active') && typeof loadShopExclusive === 'function') {
                    loadShopExclusive();
                }
            } else {
                showPromoMessage("Ошибка активации улучшения!", "error");
            }
        } else {
            showPromoMessage("Ошибка системы улучшений!", "error");
        }
    }
    
    updatePromoList();
    
    if (typeof saveGame === 'function') saveGame();
    
    promoInput.value = '';
}

function showPromoMessage(text, type) {
    if (!promoMessage) return;
    
    promoMessage.textContent = text;
    promoMessage.className = `promo-message ${type}`;
    promoMessage.style.display = 'flex';
    
    setTimeout(() => {
        promoMessage.style.display = 'none';
    }, 3000);
}

function simulateClick() {
    if (window.currentEnergy < window.energyCost) return;
    
    window.currentEnergy -= window.energyCost;
    window.totalClicks++;
    window.clicksThisMinute++;
    
    const earnedPoints = window.clickValue * (window.energyCost / 5);
    window.clickCount += earnedPoints;
    window.totalPoints += earnedPoints;
    
    if (typeof updateUI === 'function') updateUI();
    if (typeof updateEnergyDisplay === 'function') updateEnergyDisplay();
}

function checkSpecialEffects() {
    const nezerKey = window.allExclusiveUpgrades ? 
        window.allExclusiveUpgrades.find(u => u.id === 201) : 
        null;
    if (nezerKey && nezerKey.purchased) {
        if (Math.random() < 0.05) {
            const bonus = window.clickValue * 9;
            window.clickCount += bonus;
            window.totalPoints += bonus;
            if (typeof showMessage === 'function') showMessage("НЕЗЕР-КЛЮЧ! x10", "#9b59b6", 1000);
        }
    }
    
    const legendaryKey = window.allExclusiveUpgrades ? 
        window.allExclusiveUpgrades.find(u => u.id === 204) : 
        null;
    if (legendaryKey && legendaryKey.purchased) {
        legendaryClickCounter++;
        if (legendaryClickCounter >= 500) {
            legendaryClickCounter = 0;
            window.keys++;
            if (typeof keys !== 'undefined') keys = window.keys;
            forceUpdateKeysDisplay();
            if (typeof showMessage === 'function') showMessage("Легендарный ключ: +1 ключ!", "#ffd700", 1000);
        }
    }
}

function enderGiftEffect() {
    const enderKey = window.allExclusiveUpgrades ? 
        window.allExclusiveUpgrades.find(u => u.id === 202) : 
        null;
    if (enderKey && enderKey.purchased) {
        window.clickCount += 1000;
        window.totalPoints += 1000;
        if (typeof showMessage === 'function') showMessage("Эндер-ключ: +1000 очков!", "#00adb5", 2000);
        if (typeof updateUI === 'function') updateUI();
    }
}

function getHeroBonus() {
    const heroKey = window.allExclusiveUpgrades ? 
        window.allExclusiveUpgrades.find(u => u.id === 203) : 
        null;
    return (heroKey && heroKey.purchased) ? heroKey.value : 0;
}

function loadPromoCodes(savedData) {
    if (savedData && savedData.promoCodes) {
        savedData.promoCodes.forEach(savedPromo => {
            const promo = promoCodes.find(p => p.code === savedPromo.code);
            if (promo) {
                promo.used = savedPromo.used;
            }
        });
    }
    
    if (savedData && savedData.legendaryClickCounter) {
        legendaryClickCounter = savedData.legendaryClickCounter;
    }
}

function savePromoCodes() {
    return {
        promoCodes: promoCodes.map(p => ({ code: p.code, used: p.used })),
        legendaryClickCounter: legendaryClickCounter
    };
}

function resetPromoCodes() {
    promoCodes.forEach(promo => {
        promo.used = false;
    });
    legendaryClickCounter = 0;
}

window.checkSpecialEffects = checkSpecialEffects;
window.getHeroBonus = getHeroBonus;
window.enderGiftEffect = enderGiftEffect;
window.savePromoCodes = savePromoCodes;
window.loadPromoCodes = loadPromoCodes;
window.resetPromoCodes = resetPromoCodes;
window.initPromoCodes = initPromoCodes;
window.forceUpdateKeysDisplay = forceUpdateKeysDisplay;
