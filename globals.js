// globals.js - Глобальные переменные и функции

// Глобальные переменные
let clickCount = 0;
let totalClicks = 0;
let clickValue = 1;
let totalPoints = 0;
let pointsPerSecond = 0;
let soundEnabled = false; // ИЗМЕНЕНО: теперь по умолчанию ВЫКЛ
let audioContext = null;
let keys = 0;
let keysSpent = 0;

// Переменные для системы энергии
let currentEnergy = 100;
let maxEnergy = 100;
let energyCost = 5;
let energyRegen = 5;
let energyEfficiency = 1.0;

// Переменные для эффектов эксклюзивных улучшений
let goldenTouchChance = 0;
let energyMultiplier = 1;
let autoSpeedMultiplier = 1;
let clickMultiplier = 1;
let passiveRegenPercent = 0;
let regenSpeedMultiplier = 1;
let speedBoostMultiplier = 1;
let autoMultiplier = 1;
let allMultiplier = 1;
let masterMultiplier = 1;

// Счетчики для достижений
let maxEnergyFilled = 0;
let lastEnergyPercent = 0;
let clicksPerMinute = 0;
let clicksThisMinute = 0;
let critChance = 0;
let critMultiplier = 2;
let energySpent = 0;

// Переменные для системы энергии
let consecutiveClicks = 0;
let lastClickTime = 0;

// Делаем переменные глобально доступными
window.clickCount = clickCount;
window.totalClicks = totalClicks;
window.clickValue = clickValue;
window.totalPoints = totalPoints;
window.pointsPerSecond = pointsPerSecond;
window.soundEnabled = soundEnabled;
window.audioContext = audioContext;
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
