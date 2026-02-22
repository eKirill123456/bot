// achievements.js - Все достижения игры (50 штук)

const achievements = [
    // Достижения за очки (5 шт)
    {
        id: 1,
        name: "Новичок",
        description: "Накопи 1.000 очков",
        condition: (game) => game.totalPoints >= 1000,
        reward: 1,
        claimed: false,
        completed: false,
        type: "points",
        category: "Очки",
        categoryIcon: "fa-star",
        target: 1000,
        icon: "fa-star"
    },
    {
        id: 2,
        name: "Опытный кликер",
        description: "Накопи 10.000 очков",
        condition: (game) => game.totalPoints >= 10000,
        reward: 2,
        claimed: false,
        completed: false,
        type: "points",
        category: "Очки",
        categoryIcon: "fa-star",
        target: 10000,
        icon: "fa-star"
    },
    {
        id: 3,
        name: "Мастер кликера",
        description: "Накопи 100.000 очков",
        condition: (game) => game.totalPoints >= 100000,
        reward: 3,
        claimed: false,
        completed: false,
        type: "points",
        category: "Очки",
        categoryIcon: "fa-star",
        target: 100000,
        icon: "fa-crown"
    },
    {
        id: 4,
        name: "Легенда клика",
        description: "Накопи 1.000.000 очков",
        condition: (game) => game.totalPoints >= 1000000,
        reward: 5,
        claimed: false,
        completed: false,
        type: "points",
        category: "Очки",
        categoryIcon: "fa-star",
        target: 1000000,
        icon: "fa-crown"
    },
    {
        id: 5,
        name: "Миллиардер",
        description: "Накопи 1.000.000.000 очков",
        condition: (game) => game.totalPoints >= 1000000000,
        reward: 10,
        claimed: false,
        completed: false,
        type: "points",
        category: "Очки",
        categoryIcon: "fa-star",
        target: 1000000000,
        icon: "fa-chart-line"
    },

    // Достижения за клики (5 шт)
    {
        id: 6,
        name: "Кликер-маньяк",
        description: "Соверши 1.000 кликов",
        condition: (game) => game.totalClicks >= 1000,
        reward: 1,
        claimed: false,
        completed: false,
        type: "clicks",
        category: "Клики",
        categoryIcon: "fa-hand-pointer",
        target: 1000,
        icon: "fa-hand-pointer"
    },
    {
        id: 7,
        name: "Кликер-энтузиаст",
        description: "Соверши 5.000 кликов",
        condition: (game) => game.totalClicks >= 5000,
        reward: 2,
        claimed: false,
        completed: false,
        type: "clicks",
        category: "Клики",
        categoryIcon: "fa-hand-pointer",
        target: 5000,
        icon: "fa-hand-pointer"
    },
    {
        id: 8,
        name: "Кликер-профессионал",
        description: "Соверши 10.000 кликов",
        condition: (game) => game.totalClicks >= 10000,
        reward: 3,
        claimed: false,
        completed: false,
        type: "clicks",
        category: "Клики",
        categoryIcon: "fa-hand-pointer",
        target: 10000,
        icon: "fa-hand-pointer"
    },
    {
        id: 9,
        name: "Кликер-эксперт",
        description: "Соверши 25.000 кликов",
        condition: (game) => game.totalClicks >= 25000,
        reward: 4,
        claimed: false,
        completed: false,
        type: "clicks",
        category: "Клики",
        categoryIcon: "fa-hand-pointer",
        target: 25000,
        icon: "fa-medal"
    },
    {
        id: 10,
        name: "Кликер-мастер",
        description: "Соверши 50.000 кликов",
        condition: (game) => game.totalClicks >= 50000,
        reward: 5,
        claimed: false,
        completed: false,
        type: "clicks",
        category: "Клики",
        categoryIcon: "fa-hand-pointer",
        target: 50000,
        icon: "fa-medal"
    },

    // Энергетические достижения (5 шт)
    {
        id: 11,
        name: "Энерджайзер",
        description: "Полностью заполни энергию 10 раз",
        condition: (game) => game.maxEnergyFilled >= 10,
        reward: 1,
        claimed: false,
        completed: false,
        type: "energy",
        category: "Энергия",
        categoryIcon: "fa-bolt",
        target: 10,
        icon: "fa-bolt"
    },
    {
        id: 12,
        name: "Батарейка",
        description: "Купи все улучшения батареи (5 уровней)",
        condition: (game) => {
            const battery = game.upgrades.find(u => u.id === 6);
            return battery && battery.level >= 5;
        },
        reward: 3,
        claimed: false,
        completed: false,
        category: "Энергия",
        categoryIcon: "fa-bolt",
        icon: "fa-battery-full"
    },
    {
        id: 13,
        name: "Регенератор",
        description: "Купи все улучшения регенерации (5 уровней)",
        condition: (game) => {
            const regen = game.upgrades.find(u => u.id === 8);
            return regen && regen.level >= 5;
        },
        reward: 3,
        claimed: false,
        completed: false,
        category: "Энергия",
        categoryIcon: "fa-bolt",
        icon: "fa-heartbeat"
    },
    {
        id: 14,
        name: "Мастер энергии",
        description: "Достигни 1.000 максимальной энергии",
        condition: (game) => {
            const effectiveMaxEnergy = game.maxEnergy * (game.energyMultiplier || 1);
            return effectiveMaxEnergy >= 1000;
        },
        reward: 5,
        claimed: false,
        completed: false,
        type: "energy_max",
        category: "Энергия",
        categoryIcon: "fa-bolt",
        target: 1000,
        icon: "fa-circle-radiation"
    },
    {
        id: 15,
        name: "Энергетический вампир",
        description: "Потрать 10.000 энергии",
        condition: (game) => game.energySpent >= 10000,
        reward: 4,
        claimed: false,
        completed: false,
        type: "energy_spent",
        category: "Энергия",
        categoryIcon: "fa-bolt",
        target: 10000,
        icon: "fa-droplet"
    },

    // Ключевые достижения (5 шт)
    {
        id: 16,
        name: "Коллекционер ключей I",
        description: "Собери 10 ключей",
        condition: (game) => game.keys >= 10,
        reward: 2,
        claimed: false,
        completed: false,
        type: "keys",
        category: "Ключи",
        categoryIcon: "fa-key",
        target: 10,
        icon: "fa-key"
    },
    {
        id: 17,
        name: "Коллекционер ключей II",
        description: "Собери 25 ключей",
        condition: (game) => game.keys >= 25,
        reward: 3,
        claimed: false,
        completed: false,
        type: "keys",
        category: "Ключи",
        categoryIcon: "fa-key",
        target: 25,
        icon: "fa-key"
    },
    {
        id: 18,
        name: "Коллекционер ключей III",
        description: "Собери 50 ключей",
        condition: (game) => game.keys >= 50,
        reward: 5,
        claimed: false,
        completed: false,
        type: "keys",
        category: "Ключи",
        categoryIcon: "fa-key",
        target: 50,
        icon: "fa-key"
    },
    {
        id: 19,
        name: "Коллекционер ключей IV",
        description: "Собери 100 ключей",
        condition: (game) => game.keys >= 100,
        reward: 8,
        claimed: false,
        completed: false,
        type: "keys",
        category: "Ключи",
        categoryIcon: "fa-key",
        target: 100,
        icon: "fa-key"
    },
    {
        id: 20,
        name: "Коллекционер ключей V",
        description: "Собери 500 ключей",
        condition: (game) => game.keys >= 500,
        reward: 15,
        claimed: false,
        completed: false,
        type: "keys",
        category: "Ключи",
        categoryIcon: "fa-key",
        target: 500,
        icon: "fa-key"
    },

    // Тратные достижения (5 шт)
    {
        id: 21,
        name: "Покупатель I",
        description: "Потрать 10 ключей в магазине",
        condition: (game) => game.keysSpent >= 10,
        reward: 1,
        claimed: false,
        completed: false,
        type: "keys_spent",
        category: "Траты",
        categoryIcon: "fa-cart-shopping",
        target: 10,
        icon: "fa-cart-shopping"
    },
    {
        id: 22,
        name: "Покупатель II",
        description: "Потрать 25 ключей в магазине",
        condition: (game) => game.keysSpent >= 25,
        reward: 2,
        claimed: false,
        completed: false,
        type: "keys_spent",
        category: "Траты",
        categoryIcon: "fa-cart-shopping",
        target: 25,
        icon: "fa-cart-shopping"
    },
    {
        id: 23,
        name: "Покупатель III",
        description: "Потрать 50 ключей в магазине",
        condition: (game) => game.keysSpent >= 50,
        reward: 3,
        claimed: false,
        completed: false,
        type: "keys_spent",
        category: "Траты",
        categoryIcon: "fa-cart-shopping",
        target: 50,
        icon: "fa-cart-shopping"
    },
    {
        id: 24,
        name: "Покупатель IV",
        description: "Потрать 100 ключей в магазине",
        condition: (game) => game.keysSpent >= 100,
        reward: 5,
        claimed: false,
        completed: false,
        type: "keys_spent",
        category: "Траты",
        categoryIcon: "fa-cart-shopping",
        target: 100,
        icon: "fa-cart-shopping"
    },
    {
        id: 25,
        name: "Богатство",
        description: "Потрать 500 ключей в магазине",
        condition: (game) => game.keysSpent >= 500,
        reward: 10,
        claimed: false,
        completed: false,
        type: "keys_spent",
        category: "Траты",
        categoryIcon: "fa-cart-shopping",
        target: 500,
        icon: "fa-sack-dollar"
    },

    // Уникальные достижения (5 шт)
    {
        id: 26,
        name: "Мультипликатор",
        description: "Купи все улучшения двойного клика",
        condition: (game) => {
            const mult = game.upgrades.find(u => u.id === 3);
            return mult && mult.level >= 5;
        },
        reward: 4,
        claimed: false,
        completed: false,
        category: "Уникальные",
        categoryIcon: "fa-crown",
        icon: "fa-times-circle"
    },
    {
        id: 27,
        name: "Автоматизация I",
        description: "Суммарно 50+ очков в секунду от автокликеров",
        condition: (game) => game.pointsPerSecond >= 50,
        reward: 3,
        claimed: false,
        completed: false,
        type: "pps",
        category: "Уникальные",
        categoryIcon: "fa-crown",
        target: 50,
        icon: "fa-robot"
    },
    {
        id: 28,
        name: "Автоматизация II",
        description: "Суммарно 200+ очков в секунду от автокликеров",
        condition: (game) => game.pointsPerSecond >= 200,
        reward: 6,
        claimed: false,
        completed: false,
        type: "pps",
        category: "Уникальные",
        categoryIcon: "fa-crown",
        target: 200,
        icon: "fa-microchip"
    },
    {
        id: 29,
        name: "Автоматизация III",
        description: "Суммарно 1000+ очков в секунду от автокликеров",
        condition: (game) => game.pointsPerSecond >= 1000,
        reward: 10,
        claimed: false,
        completed: false,
        type: "pps",
        category: "Уникальные",
        categoryIcon: "fa-crown",
        target: 1000,
        icon: "fa-brain"
    },
    {
        id: 30,
        name: "Коллекционер улучшений",
        description: "Купи 100 уровней улучшений",
        condition: (game) => {
            const totalLevels = game.upgrades.reduce((sum, u) => sum + u.level, 0);
            return totalLevels >= 100;
        },
        reward: 7,
        claimed: false,
        completed: false,
        type: "upgrades",
        category: "Уникальные",
        categoryIcon: "fa-crown",
        target: 100,
        icon: "fa-layer-group"
    },

    // Скиновые достижения (10 шт)
    {
        id: 31,
        name: "Стильный",
        description: "Купи свой первый скин",
        condition: (game) => {
            return game.skins && game.skins.filter(s => s.purchased).length >= 1;
        },
        reward: 2,
        claimed: false,
        completed: false,
        type: "skins",
        category: "Скины",
        categoryIcon: "fa-paint-brush",
        target: 1,
        icon: "fa-paint-brush"
    },
    {
        id: 32,
        name: "Коллекционер скинов I",
        description: "Купи 3 разных скина",
        condition: (game) => {
            return game.skins && game.skins.filter(s => s.purchased).length >= 3;
        },
        reward: 3,
        claimed: false,
        completed: false,
        type: "skins",
        category: "Скины",
        categoryIcon: "fa-paint-brush",
        target: 3,
        icon: "fa-palette"
    },
    {
        id: 33,
        name: "Коллекционер скинов II",
        description: "Купи 5 разных скинов",
        condition: (game) => {
            return game.skins && game.skins.filter(s => s.purchased).length >= 5;
        },
        reward: 5,
        claimed: false,
        completed: false,
        type: "skins",
        category: "Скины",
        categoryIcon: "fa-paint-brush",
        target: 5,
        icon: "fa-palette"
    },
    {
        id: 34,
        name: "Коллекционер скинов III",
        description: "Купи 8 разных скинов",
        condition: (game) => {
            return game.skins && game.skins.filter(s => s.purchased).length >= 8;
        },
        reward: 8,
        claimed: false,
        completed: false,
        type: "skins",
        category: "Скины",
        categoryIcon: "fa-paint-brush",
        target: 8,
        icon: "fa-palette"
    },
    {
        id: 35,
        name: "Коллекционер скинов IV",
        description: "Купи все скины",
        condition: (game) => {
            return game.skins && game.skins.filter(s => s.purchased).length >= 10;
        },
        reward: 15,
        claimed: false,
        completed: false,
        type: "skins",
        category: "Скины",
        categoryIcon: "fa-paint-brush",
        target: 10,
        icon: "fa-crown"
    },
    {
        id: 36,
        name: "Огненный кликер",
        description: "Экипируй огненный скин",
        condition: (game) => {
            const fireSkin = game.skins && game.skins.find(s => s.id === 2);
            return fireSkin && fireSkin.equipped;
        },
        reward: 2,
        claimed: false,
        completed: false,
        category: "Скины",
        categoryIcon: "fa-paint-brush",
        icon: "fa-fire"
    },
    {
        id: 37,
        name: "Ледяное сердце",
        description: "Экипируй ледяной скин",
        condition: (game) => {
            const iceSkin = game.skins && game.skins.find(s => s.id === 3);
            return iceSkin && iceSkin.equipped;
        },
        reward: 2,
        claimed: false,
        completed: false,
        category: "Скины",
        categoryIcon: "fa-paint-brush",
        icon: "fa-snowflake"
    },
    {
        id: 38,
        name: "Королевская особа",
        description: "Экипируй королевский скин",
        condition: (game) => {
            const royalSkin = game.skins && game.skins.find(s => s.id === 4);
            return royalSkin && royalSkin.equipped;
        },
        reward: 3,
        claimed: false,
        completed: false,
        category: "Скины",
        categoryIcon: "fa-paint-brush",
        icon: "fa-crown"
    },
    {
        id: 39,
        name: "Золотая лихорадка",
        description: "Экипируй золотой скин",
        condition: (game) => {
            const goldSkin = game.skins && game.skins.find(s => s.id === 5);
            return goldSkin && goldSkin.equipped;
        },
        reward: 4,
        claimed: false,
        completed: false,
        category: "Скины",
        categoryIcon: "fa-paint-brush",
        icon: "fa-coins"
    },
    {
        id: 40,
        name: "Неоновый рай",
        description: "Экипируй неоновый скин",
        condition: (game) => {
            const neonSkin = game.skins && game.skins.find(s => s.id === 7);
            return neonSkin && neonSkin.equipped;
        },
        reward: 5,
        claimed: false,
        completed: false,
        category: "Скины",
        categoryIcon: "fa-paint-brush",
        icon: "fa-lightbulb"
    },

    // Критовые достижения (5 шт)
    {
        id: 41,
        name: "Критовый I",
        description: "Достигни 10% шанса крита",
        condition: (game) => game.critChance >= 0.1,
        reward: 2,
        claimed: false,
        completed: false,
        type: "crit",
        category: "Криты",
        categoryIcon: "fa-crosshairs",
        target: 10,
        icon: "fa-crosshairs"
    },
    {
        id: 42,
        name: "Критовый II",
        description: "Достигни 25% шанса крита",
        condition: (game) => game.critChance >= 0.25,
        reward: 4,
        claimed: false,
        completed: false,
        type: "crit",
        category: "Криты",
        categoryIcon: "fa-crosshairs",
        target: 25,
        icon: "fa-crosshairs"
    },
    {
        id: 43,
        name: "Критовый III",
        description: "Достигни 50% шанса крита",
        condition: (game) => game.critChance >= 0.5,
        reward: 7,
        claimed: false,
        completed: false,
        type: "crit",
        category: "Криты",
        categoryIcon: "fa-crosshairs",
        target: 50,
        icon: "fa-crosshairs"
    },
    {
        id: 44,
        name: "Критовый IV",
        description: "Достигни 75% шанса крита",
        condition: (game) => game.critChance >= 0.75,
        reward: 10,
        claimed: false,
        completed: false,
        type: "crit",
        category: "Криты",
        categoryIcon: "fa-crosshairs",
        target: 75,
        icon: "fa-bullseye"
    },
    {
        id: 45,
        name: "Критовый V",
        description: "Достигни 100% шанса крита",
        condition: (game) => game.critChance >= 1.0,
        reward: 15,
        claimed: false,
        completed: false,
        type: "crit",
        category: "Криты",
        categoryIcon: "fa-crosshairs",
        target: 100,
        icon: "fa-bullseye"
    },

    // Темповые достижения (5 шт)
    {
        id: 46,
        name: "Спринтер I",
        description: "Достигни 10 последовательных кликов",
        condition: (game) => game.consecutiveClicks >= 10,
        reward: 2,
        claimed: false,
        completed: false,
        type: "consecutive",
        category: "Скорость",
        categoryIcon: "fa-gauge-high",
        target: 10,
        icon: "fa-gauge-high"
    },
    {
        id: 47,
        name: "Спринтер II",
        description: "Достигни 25 последовательных кликов",
        condition: (game) => game.consecutiveClicks >= 25,
        reward: 4,
        claimed: false,
        completed: false,
        type: "consecutive",
        category: "Скорость",
        categoryIcon: "fa-gauge-high",
        target: 25,
        icon: "fa-gauge-high"
    },
    {
        id: 48,
        name: "Спринтер III",
        description: "Достигни 50 последовательных кликов",
        condition: (game) => game.consecutiveClicks >= 50,
        reward: 6,
        claimed: false,
        completed: false,
        type: "consecutive",
        category: "Скорость",
        categoryIcon: "fa-gauge-high",
        target: 50,
        icon: "fa-gauge-high"
    },
    {
        id: 49,
        name: "Марафонец",
        description: "Достигни 100 последовательных кликов",
        condition: (game) => game.consecutiveClicks >= 100,
        reward: 10,
        claimed: false,
        completed: false,
        type: "consecutive",
        category: "Скорость",
        categoryIcon: "fa-gauge-high",
        target: 100,
        icon: "fa-person-running"
    },
    {
        id: 50,
        name: "Бессмертный",
        description: "Достигни 200 последовательных кликов",
        condition: (game) => game.consecutiveClicks >= 200,
        reward: 15,
        claimed: false,
        completed: false,
        type: "consecutive",
        category: "Скорость",
        categoryIcon: "fa-gauge-high",
        target: 200,
        icon: "fa-skull"
    }
];

// Функция для получения уникальных категорий
function getAchievementCategories() {
    const categories = [];
    achievements.forEach(a => {
        if (!categories.includes(a.category)) {
            categories.push(a.category);
        }
    });
    return categories;
}

// Функция форматирования чисел
function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num);
}

// Функция создания элемента достижения
function createAchievementElement(achievement) {
    const el = document.createElement('div');
    el.className = 'achievement-item' + (achievement.claimed ? ' completed' : '');
    el.id = `achievement-${achievement.id}`;
    
    // Получаем глобальные переменные
    const totalPoints = window.totalPoints || 0;
    const totalClicks = window.totalClicks || 0;
    const pointsPerSecond = window.pointsPerSecond || 0;
    const autoSpeedMultiplier = window.autoSpeedMultiplier || 1;
    const autoMultiplier = window.autoMultiplier || 1;
    const allMultiplier = window.allMultiplier || 1;
    const masterMultiplier = window.masterMultiplier || 1;
    const maxEnergy = window.maxEnergy || 100;
    const energyMultiplier = window.energyMultiplier || 1;
    const maxEnergyFilled = window.maxEnergyFilled || 0;
    const keys = window.keys || 0;
    const keysSpent = window.keysSpent || 0;
    const upgrades = window.upgrades || [];
    const allExclusiveUpgrades = window.allExclusiveUpgrades || [];
    const energySpent = window.energySpent || 0;
    const consecutiveClicks = window.consecutiveClicks || 0;
    const critChance = window.critChance || 0;
    
    let progressText = '', progressPercent = 0;
    const effectiveMaxEnergy = maxEnergy * energyMultiplier;
    const effectivePPS = pointsPerSecond * autoSpeedMultiplier * autoMultiplier * allMultiplier * masterMultiplier;
    
    if (achievement.type === 'points') {
        progressPercent = Math.min(100, (totalPoints / achievement.target) * 100);
        progressText = `${formatNumber(totalPoints)}/${formatNumber(achievement.target)}`;
    } else if (achievement.type === 'clicks') {
        progressPercent = Math.min(100, (totalClicks / achievement.target) * 100);
        progressText = `${formatNumber(totalClicks)}/${formatNumber(achievement.target)}`;
    } else if (achievement.type === 'pps') {
        progressPercent = Math.min(100, (effectivePPS / achievement.target) * 100);
        progressText = `${Math.floor(effectivePPS)}/${achievement.target}`;
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
    } else if (achievement.type === 'upgrades' && upgrades.length) {
        const total = upgrades.reduce((s,u) => s + u.level, 0);
        progressPercent = Math.min(100, (total / achievement.target) * 100);
        progressText = `${total}/${achievement.target}`;
    } else if (achievement.type === 'crit') {
        progressPercent = Math.min(100, (critChance * 100 / achievement.target) * 100);
        progressText = `${Math.floor(critChance * 100)}%/${achievement.target}%`;
    } else if (achievement.type === 'consecutive') {
        progressPercent = Math.min(100, (consecutiveClicks / achievement.target) * 100);
        progressText = `${consecutiveClicks}/${achievement.target}`;
    }
    
    const isCompletable = achievement.condition({ 
        totalPoints, totalClicks, 
        pointsPerSecond: effectivePPS,
        maxEnergyFilled, 
        upgrades: upgrades,
        clicksPerMinute: window.clicksPerMinute || 0,
        keys, keysSpent, 
        maxEnergy: effectiveMaxEnergy, 
        energyMultiplier, 
        energySpent, 
        consecutiveClicks,
        exclusiveUpgrades: allExclusiveUpgrades, 
        clickValue: window.clickValue || 1,
        critChance
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

// Функция инициализации достижений
function initAchievements() {
    const achievementsListElement = document.getElementById('achievementsList');
    
    if (!achievementsListElement) {
        console.error("achievementsListElement не найден!");
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

// Функция обновления счетчика достижений
function updateAchievementsCounter() {
    const achievementsCounter = document.getElementById('achievementsCounter');
    if (achievementsCounter) {
        const completed = achievements.filter(a => a.claimed).length;
        achievementsCounter.textContent = `${completed}/${achievements.length}`;
    }
}

// Функция получения награды за достижение
function claimAchievement(achievementId) {
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement || !achievement.completed || achievement.claimed) return;
    
    achievement.claimed = true;
    window.keys = (window.keys || 0) + achievement.reward;
    
    // Обновляем отображения
    if (typeof updateKeysDisplay === 'function') updateKeysDisplay();
    if (typeof updateAchievementsStats === 'function') updateAchievementsStats();
    
    initAchievements(); // Перерисовываем список
    
    if (typeof showMessage === 'function') {
        showMessage(`+${achievement.reward} ключей!`, "#ffd700");
    }
}

// Функция обновления статистики достижений
function updateAchievementsStats() {
    const completedAchievements = document.getElementById('completedAchievements');
    const availableKeys = document.getElementById('availableKeys');
    const totalKeys = document.getElementById('totalKeys');
    
    if (completedAchievements) {
        const completed = achievements.filter(a => a.claimed).length;
        completedAchievements.textContent = `${completed}/${achievements.length}`;
    }
    
    if (availableKeys) {
        const available = achievements.filter(a => a.completed && !a.claimed).reduce((s,a) => s + a.reward, 0);
        availableKeys.textContent = available;
    }
    
    if (totalKeys) {
        const total = achievements.filter(a => a.claimed).reduce((s,a) => s + a.reward, 0);
        totalKeys.textContent = total;
    }
}

// Функция проверки выполнения достижений
function checkAchievements() {
    let changed = false;
    
    const totalPoints = window.totalPoints || 0;
    const totalClicks = window.totalClicks || 0;
    const pointsPerSecond = window.pointsPerSecond || 0;
    const autoSpeedMultiplier = window.autoSpeedMultiplier || 1;
    const autoMultiplier = window.autoMultiplier || 1;
    const allMultiplier = window.allMultiplier || 1;
    const masterMultiplier = window.masterMultiplier || 1;
    const maxEnergy = window.maxEnergy || 100;
    const energyMultiplier = window.energyMultiplier || 1;
    const maxEnergyFilled = window.maxEnergyFilled || 0;
    const keys = window.keys || 0;
    const keysSpent = window.keysSpent || 0;
    const upgrades = window.upgrades || [];
    const energySpent = window.energySpent || 0;
    const consecutiveClicks = window.consecutiveClicks || 0;
    const critChance = window.critChance || 0;
    
    const effectivePPS = pointsPerSecond * autoSpeedMultiplier * autoMultiplier * allMultiplier * masterMultiplier;
    const effectiveMaxEnergy = maxEnergy * energyMultiplier;
    
    achievements.forEach(a => {
        if (!a.completed && a.condition({ 
            totalPoints, totalClicks, 
            pointsPerSecond: effectivePPS,
            maxEnergyFilled, 
            upgrades: upgrades,
            clicksPerMinute: window.clicksPerMinute || 0,
            keys, keysSpent, 
            maxEnergy: effectiveMaxEnergy, 
            energyMultiplier, 
            energySpent, 
            consecutiveClicks,
            exclusiveUpgrades: window.allExclusiveUpgrades || [], 
            clickValue: window.clickValue || 1,
            critChance
        })) {
            a.completed = true;
            changed = true;
            if (typeof playAchievementSound === 'function') playAchievementSound();
            if (typeof showMessage === 'function') showMessage(`Достижение выполнено: ${a.name}!`, "#ffd700");
        }
    });
    
    if (changed) {
        const achievementsTab = document.getElementById('achievementsTab');
        if (achievementsTab && achievementsTab.classList.contains('active')) {
            initAchievements();
        }
        updateAchievementsStats();
        updateAchievementsCounter();
    }
}

// Экспортируем функции в глобальную область
window.achievements = achievements;
window.getAchievementCategories = getAchievementCategories;
window.initAchievements = initAchievements;
window.claimAchievement = claimAchievement;
window.updateAchievementsCounter = updateAchievementsCounter;
window.updateAchievementsStats = updateAchievementsStats;
window.checkAchievements = checkAchievements;
window.formatNumber = formatNumber;
