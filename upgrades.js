// upgrades.js - Обычные улучшения за очки

const upgrades = [
    {
        id: 1,
        name: "Улучшенный клик",
        description: "Увеличивает количество очков за клик",
        baseCost: 10,
        cost: 10,
        value: 1,
        level: 0,
        maxLevel: 30,
        type: "click"
    },
    {
        id: 2,
        name: "Автокликер",
        description: "Автоматически кликает каждую секунду",
        baseCost: 50,
        cost: 50,
        value: 1,
        level: 0,
        maxLevel: 20,
        type: "auto"
    },
    {
        id: 3,
        name: "Двойной клик",
        description: "Удваивает эффективность кликов (сильное улучшение)",
        baseCost: 500,
        cost: 500,
        value: 2,
        level: 0,
        maxLevel: 5,
        type: "multiplier"
    },
    {
        id: 4,
        name: "Мега кликер",
        description: "Мощный автокликер с высокой скоростью",
        baseCost: 500,
        cost: 500,
        value: 5,
        level: 0,
        maxLevel: 10,
        type: "auto"
    },
    {
        id: 5,
        name: "Кликер-турбо",
        description: "Значительно увеличивает силу кликов",
        baseCost: 1000,
        cost: 1000,
        value: 10,
        level: 0,
        maxLevel: 15,
        type: "click"
    },
    {
        id: 6,
        name: "Батарея",
        description: "Увеличивает максимальный запас энергии (макс. 5)",
        baseCost: 100,
        cost: 100,
        value: 20,
        level: 0,
        maxLevel: 5,
        type: "energy"
    },
    {
        id: 7,
        name: "Супер батарея",
        description: "Сильно увеличивает максимальный запас энергии",
        baseCost: 1000,
        cost: 1000,
        value: 50,
        level: 0,
        maxLevel: 5,
        type: "energy"
    },
    {
        id: 8,
        name: "Регенерация",
        description: "Увеличивает скорость восстановления энергии (макс. 5)",
        baseCost: 200,
        cost: 200,
        value: 1,
        level: 0,
        maxLevel: 5,
        type: "regen"
    },
    {
        id: 9,
        name: "Быстрая регенерация",
        description: "Сильно увеличивает скорость восстановления энергии",
        baseCost: 1000,
        cost: 1000,
        value: 3,
        level: 0,
        maxLevel: 5,
        type: "regen"
    },
    {
        id: 10,
        name: "Крит-клик",
        description: "Шанс на критический удар",
        baseCost: 2000,
        cost: 2000,
        value: 0.05,
        level: 0,
        maxLevel: 10,
        type: "crit"
    }
];