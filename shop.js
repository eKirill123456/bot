// shop.js - Эксклюзивные улучшения за ключи

// Обычные эксклюзивные улучшения (видны в магазине)
const exclusiveUpgrades = [
    {
        id: 101,
        name: "Золотое касание",
        description: "Каждый клик имеет 1% шанс дать +1 ключ",
        price: 8,
        effect: "goldenTouch",
        value: 0.01,
        purchased: false,
        icon: "fa-hand-holding-heart",
        special: false,
        hidden: false
    },
    {
        id: 102,
        name: "Кристалл энергии",
        description: "Максимальная энергия увеличивается на 50%",
        price: 10,
        effect: "energyMultiplier",
        value: 1.5,
        purchased: false,
        icon: "fa-crystal",
        special: false,
        hidden: false
    },
    {
        id: 103,
        name: "Ключ времени",
        description: "Автокликеры работают в 2 раза быстрее",
        price: 12,
        effect: "autoSpeed",
        value: 2,
        purchased: false,
        icon: "fa-clock",
        special: false,
        hidden: false
    },
    {
        id: 104,
        name: "Драконий ключ",
        description: "Увеличивает очки за клик на 100%",
        price: 15,
        effect: "clickMultiplier",
        value: 2,
        purchased: false,
        icon: "fa-dragon",
        special: false,
        hidden: false
    },
    {
        id: 105,
        name: "Феникс-ключ",
        description: "Восстанавливает 10% энергии каждую секунду",
        price: 15,
        effect: "passiveRegen",
        value: 0.1,
        purchased: false,
        icon: "fa-phoenix-framework",
        special: false,
        hidden: false
    },
    {
        id: 106,
        name: "Ключ удачи",
        description: "Увеличивает шанс золотого касания до 2%",
        price: 20,
        effect: "luckChance",
        value: 0.02,
        purchased: false,
        icon: "fa-clover",
        special: false,
        hidden: false
    },
    {
        id: 107,
        name: "Ключ времени II",
        description: "Ускоряет восстановление энергии на 100%",
        price: 25,
        effect: "regenSpeed",
        value: 2,
        purchased: false,
        icon: "fa-hourglass",
        special: false,
        hidden: false
    },
    {
        id: 108,
        name: "Печать скорости",
        description: "Увеличивает максимальную скорость кликов на 50%",
        price: 30,
        effect: "speedBoost",
        value: 1.5,
        purchased: false,
        icon: "fa-gauge",
        special: false,
        hidden: false
    },
    {
        id: 109,
        name: "Кристалл опыта",
        description: "Увеличивает очки от автокликеров на 50%",
        price: 35,
        effect: "autoMultiplier",
        value: 1.5,
        purchased: false,
        icon: "fa-brain",
        special: false,
        hidden: false
    },
    {
        id: 110,
        name: "Древний свиток",
        description: "Увеличивает эффективность всех улучшений на 25%",
        price: 40,
        effect: "allMultiplier",
        value: 1.25,
        purchased: false,
        icon: "fa-scroll",
        special: false,
        hidden: false
    },
    {
        id: 111,
        name: "Артефакт мастера",
        description: "Все множители работают на 50% сильнее",
        price: 50,
        effect: "masterMultiplier",
        value: 1.5,
        purchased: false,
        icon: "fa-crown",
        special: false,
        hidden: false
    }
];

// Специальные улучшения (скрыты, пока не активированы промокодом)
const specialUpgrades = [
    {
        id: 201,
        name: "Незер-ключ",
        description: "Клики имеют 5% шанс дать x10 очков",
        price: 0,
        effect: "specialMultiplier",
        value: 10,
        chance: 0.05,
        purchased: false,
        icon: "fa-skull",
        special: true,
        hidden: true, // Скрыто по умолчанию
        promoCode: "WITHER666"
    },
    {
        id: 202,
        name: "Эндер-ключ",
        description: "Каждую минуту даёт 1000 очков",
        price: 0,
        effect: "enderGift",
        value: 1000,
        purchased: false,
        icon: "fa-eye",
        special: true,
        hidden: true, // Скрыто по умолчанию
        promoCode: "ENDERDRAGON"
    },
    {
        id: 203,
        name: "Ключ героя",
        description: "Все улучшения работают на 10% эффективнее",
        price: 0,
        effect: "heroBonus",
        value: 0.1,
        purchased: false,
        icon: "fa-shield-halved",
        special: true,
        hidden: true, // Скрыто по умолчанию
        promoCode: "HERO2024"
    },
    {
        id: 204,
        name: "Легендарный ключ",
        description: "Даёт 1 ключ каждые 500 кликов",
        price: 0,
        effect: "legendaryKey",
        value: 1,
        clicksNeeded: 500,
        purchased: false,
        icon: "fa-crown",
        special: true,
        hidden: true, // Скрыто по умолчанию
        promoCode: "LEGENDARY"
    }
];

// Объединяем все улучшения
const allExclusiveUpgrades = [...exclusiveUpgrades, ...specialUpgrades];

// Функция для получения только видимых улучшений (для отображения в магазине)
function getVisibleExclusiveUpgrades() {
    return allExclusiveUpgrades.filter(u => !u.hidden || u.purchased);
}

// Функция для активации специального улучшения по промокоду
function activateSpecialUpgrade(promoCode) {
    const upgrade = allExclusiveUpgrades.find(u => u.promoCode === promoCode);
    if (upgrade && upgrade.hidden) {
        upgrade.hidden = false;
        return upgrade;
    }
    return null;
}

window.allExclusiveUpgrades = allExclusiveUpgrades;
window.getVisibleExclusiveUpgrades = getVisibleExclusiveUpgrades;
window.activateSpecialUpgrade = activateSpecialUpgrade;
