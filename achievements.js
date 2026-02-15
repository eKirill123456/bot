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

// Обновленная функция инициализации достижений
function initAchievements() {
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

window.getAchievementCategories = getAchievementCategories;
