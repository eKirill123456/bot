// dailySystem.js - Система ежедневных бонусов, заданий, уровней и майнинга

// ==================== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ====================

let playerLevel = 1;
let playerExp = 0;
let expToNextLevel = 100;

let dailyStreak = 0;
let lastDailyClaim = null;

let keyMiningLevel = 0;
let keyMiningRate = 0; // ключей в час
let lastMiningCollect = null;

let dailyQuests = [];
let weeklyQuests = [];

let referrals = [];
let referralBonus = 0;

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

function initDailySystem() {
    console.log("Инициализация системы ежедневных бонусов...");
    
    loadDailySystem();
    generateDailyQuests();
    generateWeeklyQuests();
    
    // Запускаем проверку каждую минуту
    setInterval(checkMiningProgress, 60000);
    
    // Проверяем каждый час для сброса заданий
    setInterval(checkQuestReset, 3600000);
    
    updateDailyUI();
}

// ==================== ЕЖЕДНЕВНЫЙ БОНУС ====================

function claimDailyBonus() {
    const today = new Date().toDateString();
    
    // Проверяем, не получал ли уже сегодня
    if (lastDailyClaim === today) {
        showMessage("Вы уже получили ежедневный бонус сегодня!", "#ff4757");
        return false;
    }
    
    // Проверяем стрик
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (lastDailyClaim === yesterdayStr) {
        dailyStreak++;
    } else {
        dailyStreak = 1; // Сброс стрика
    }
    
    // Рассчитываем бонус
    let bonusKeys = calculateDailyBonus();
    let bonusExp = 10 * dailyStreak;
    
    // Применяем бонус
    window.keys += bonusKeys;
    playerExp += bonusExp;
    
    lastDailyClaim = today;
    
    // Сохраняем
    saveDailySystem();
    
    // Показываем награду
    showDailyBonusReward(bonusKeys, bonusExp);
    
    // Обновляем интерфейс
    updateDailyUI();
    updateKeysDisplay();
    checkLevelUp();
    
    return true;
}

function calculateDailyBonus() {
    // База: 2 ключа, +1 за каждый день стрика, максимум 15
    let bonus = 2 + dailyStreak;
    return Math.min(bonus, 15);
}

function showDailyBonusReward(keys, exp) {
    const modal = document.createElement('div');
    modal.className = 'daily-bonus-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 4000;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(145deg, #2a2a3a, #1e1e2e);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            border: 3px solid #ffd700;
            animation: bonusPop 0.5s ease;
            max-width: 400px;
        ">
            <div style="font-size: 4rem; margin-bottom: 20px;">📅</div>
            <h2 style="color: #ffd700; font-size: 2rem; margin-bottom: 15px;">
                День ${dailyStreak}!
            </h2>
            <div style="
                background: rgba(255, 215, 0, 0.1);
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
            ">
                <div style="font-size: 1.5rem; color: #ffd700; margin-bottom: 10px;">
                    <i class="fas fa-key"></i> +${keys} ключей
                </div>
                <div style="font-size: 1.2rem; color: #00ff9d;">
                    <i class="fas fa-star"></i> +${exp} опыта
                </div>
            </div>
            <div style="
                display: flex;
                gap: 5px;
                justify-content: center;
                margin-bottom: 20px;
            ">
                ${getStreakIndicator()}
            </div>
            <button onclick="this.closest('.daily-bonus-modal').remove()" style="
                background: linear-gradient(145deg, #ffd700, #ffa500);
                border: none;
                color: #1a1a2e;
                padding: 12px 30px;
                border-radius: 8px;
                font-size: 1.1rem;
                font-weight: bold;
                cursor: pointer;
            ">Отлично!</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Добавляем анимацию
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bonusPop {
            0% { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    setTimeout(() => style.remove(), 5000);
}

function getStreakIndicator() {
    let html = '';
    for (let i = 1; i <= 7; i++) {
        if (i <= dailyStreak) {
            html += `<div style="
                width: 30px;
                height: 30px;
                background: #ffd700;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #1a1a2e;
                font-weight: bold;
            ">${i}</div>`;
        } else {
            html += `<div style="
                width: 30px;
                height: 30px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #aaa;
                font-weight: bold;
            ">${i}</div>`;
        }
    }
    return html;
}

// ==================== СИСТЕМА УРОВНЕЙ ====================

function checkLevelUp() {
    while (playerExp >= expToNextLevel) {
        levelUp();
    }
    updateLevelUI();
}

function levelUp() {
    playerExp -= expToNextLevel;
    playerLevel++;
    expToNextLevel = Math.floor(expToNextLevel * 1.5);
    
    // Награда за уровень
    const levelReward = 5 + playerLevel * 2;
    window.keys += levelReward;
    
    showLevelUpReward(levelReward);
    
    // Достижения за уровни
    checkLevelAchievements();
}

function showLevelUpReward(keys) {
    showMessage(`🌟 УРОВЕНЬ ${playerLevel}! +${keys} ключей!`, "#9b59b6", 5000);
    
    // Создаем красивую анимацию
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(145deg, #9b59b6, #8e44ad);
        padding: 30px 50px;
        border-radius: 15px;
        color: white;
        font-size: 2rem;
        font-weight: bold;
        z-index: 5000;
        animation: levelUpFloat 2s ease-out forwards;
        box-shadow: 0 0 50px rgba(155, 89, 182, 0.5);
    `;
    notif.innerHTML = `🌟 УРОВЕНЬ ${playerLevel}! 🌟<br><span style="font-size: 1.2rem;">+${keys} ключей</span>`;
    document.body.appendChild(notif);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes levelUpFloat {
            0% { opacity: 0; transform: translate(-50%, -30%); }
            20% { opacity: 1; transform: translate(-50%, -50%); }
            80% { opacity: 1; transform: translate(-50%, -50%); }
            100% { opacity: 0; transform: translate(-50%, -70%); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        notif.remove();
        style.remove();
    }, 2000);
}

function checkLevelAchievements() {
    const levelAchievements = [
        { level: 5, keys: 10 },
        { level: 10, keys: 25 },
        { level: 25, keys: 50 },
        { level: 50, keys: 100 },
        { level: 100, keys: 200 }
    ];
    
    levelAchievements.forEach(ach => {
        if (playerLevel >= ach.level && !localStorage.getItem(`level_ach_${ach.level}`)) {
            window.keys += ach.keys;
            localStorage.setItem(`level_ach_${ach.level}`, 'true');
            showMessage(`🏆 Достижение: Уровень ${ach.level}! +${ach.keys} ключей!`, "#ffd700");
        }
    });
}

// ==================== ЗАДАНИЯ (КВЕСТЫ) ====================

function generateDailyQuests() {
    dailyQuests = [
        {
            id: 'daily_1',
            name: "Кликер-новичок",
            description: "Сделай 100 кликов",
            type: "clicks",
            target: 100,
            progress: 0,
            reward: 2,
            exp: 20,
            completed: false,
            claimed: false
        },
        {
            id: 'daily_2',
            name: "Очковый маньяк",
            description: "Накопи 1000 очков",
            type: "points",
            target: 1000,
            progress: 0,
            reward: 2,
            exp: 20,
            completed: false,
            claimed: false
        },
        {
            id: 'daily_3',
            name: "Энерджайзер",
            description: "Потрать 50 энергии",
            type: "energy_spent",
            target: 50,
            progress: 0,
            reward: 2,
            exp: 20,
            completed: false,
            claimed: false
        },
        {
            id: 'daily_4',
            name: "Ключевой охотник",
            description: "Открой 1 кейс",
            type: "cases_opened",
            target: 1,
            progress: 0,
            reward: 3,
            exp: 30,
            completed: false,
            claimed: false
        }
    ];
}

function generateWeeklyQuests() {
    weeklyQuests = [
        {
            id: 'weekly_1',
            name: "Мастер кликов",
            description: "Сделай 5000 кликов",
            type: "clicks",
            target: 5000,
            progress: 0,
            reward: 10,
            exp: 100,
            completed: false,
            claimed: false
        },
        {
            id: 'weekly_2',
            name: "Миллионер",
            description: "Накопи 50000 очков",
            type: "points",
            target: 50000,
            progress: 0,
            reward: 10,
            exp: 100,
            completed: false,
            claimed: false
        },
        {
            id: 'weekly_3',
            name: "Кейс-коллектор",
            description: "Открой 10 кейсов",
            type: "cases_opened",
            target: 10,
            progress: 0,
            reward: 15,
            exp: 150,
            completed: false,
            claimed: false
        },
        {
            id: 'weekly_4',
            name: "Апгрейдер",
            description: "Купи 5 улучшений",
            type: "upgrades_bought",
            target: 5,
            progress: 0,
            reward: 10,
            exp: 100,
            completed: false,
            claimed: false
        }
    ];
}

function updateQuestProgress(type, amount = 1) {
    // Обновляем ежедневные задания
    dailyQuests.forEach(quest => {
        if (!quest.completed && quest.type === type) {
            quest.progress += amount;
            if (quest.progress >= quest.target) {
                quest.completed = true;
                showMessage(`✅ Задание выполнено: ${quest.name}!`, "#4CAF50");
            }
        }
    });
    
    // Обновляем еженедельные задания
    weeklyQuests.forEach(quest => {
        if (!quest.completed && quest.type === type) {
            quest.progress += amount;
            if (quest.progress >= quest.target) {
                quest.completed = true;
                showMessage(`✅ Еженедельное задание: ${quest.name}!`, "#9b59b6");
            }
        }
    });
    
    updateQuestsUI();
}

function claimQuestReward(quest, type) {
    if (!quest.completed || quest.claimed) return false;
    
    quest.claimed = true;
    window.keys += quest.reward;
    playerExp += quest.exp;
    
    showMessage(`+${quest.reward} ключей, +${quest.exp} опыта!`, "#ffd700");
    updateKeysDisplay();
    checkLevelUp();
    updateQuestsUI();
    saveDailySystem();
    
    return true;
}

function checkQuestReset() {
    const now = new Date();
    
    // Сброс ежедневных заданий в полночь
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        generateDailyQuests();
        showMessage("📅 Новые ежедневные задания!", "#00adb5");
    }
    
    // Сброс еженедельных заданий в понедельник
    if (now.getDay() === 1 && now.getHours() === 0 && now.getMinutes() === 0) {
        generateWeeklyQuests();
        showMessage("📆 Новые еженедельные задания!", "#9b59b6");
    }
    
    updateQuestsUI();
}

// ==================== МАЙНИНГ КЛЮЧЕЙ ====================

function upgradeKeyMining() {
    const cost = getMiningUpgradeCost();
    
    if (window.keys >= cost) {
        window.keys -= cost;
        keyMiningLevel++;
        updateMiningRate();
        
        showMessage(`⛏ Майнинг улучшен до ${keyMiningLevel} уровня!`, "#00adb5");
        updateKeysDisplay();
        saveDailySystem();
        updateMiningUI();
    } else {
        showMessage(`Недостаточно ключей! Нужно ${cost}`, "#ff4757");
    }
}

function getMiningUpgradeCost() {
    return 50 * Math.pow(2, keyMiningLevel);
}

function updateMiningRate() {
    // База: уровень 0 = 0 ключей/час
    // Уровень 1 = 1 ключ/час
    // Уровень 2 = 2 ключа/час
    // Уровень 3 = 4 ключа/час
    // Уровень 4 = 8 ключей/час
    // Уровень 5 = 16 ключей/час
    keyMiningRate = Math.floor(Math.pow(2, keyMiningLevel - 1)) || 0;
}

function checkMiningProgress() {
    if (keyMiningRate === 0 || !lastMiningCollect) return;
    
    const now = new Date();
    const hoursPassed = (now - new Date(lastMiningCollect)) / 3600000;
    
    if (hoursPassed >= 1) {
        const keysEarned = Math.floor(hoursPassed) * keyMiningRate;
        
        if (keysEarned > 0) {
            window.keys += keysEarned;
            lastMiningCollect = now;
            
            showMessage(`⛏ Майнинг: +${keysEarned} ключей!`, "#00adb5");
            updateKeysDisplay();
            saveDailySystem();
            updateMiningUI();
        }
    }
}

// ==================== УЛУЧШЕННАЯ РЕФЕРАЛЬНАЯ СИСТЕМА ====================

function generateReferralLink() {
    const userId = localStorage.getItem('userId') || generateUserId();
    const referralLink = `https://t.me/alumClickerBot?start=${userId}`;
    
    // Показываем ссылку
    const linkContainer = document.getElementById('referralLinkContainer');
    const linkInput = document.getElementById('referralLink');
    
    if (linkContainer && linkInput) {
        linkInput.value = referralLink;
        linkContainer.style.display = 'flex';
    }
    
    return referralLink;
}

function generateUserId() {
    const userId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', userId);
    return userId;
}

function addReferral(referralId) {
    const newReferral = {
        id: referralId,
        date: new Date().toISOString(),
        progress: {
            clicks: 0,
            points: 0,
            level: 1
        },
        rewards: {
            base: false,
            clicks: false,
            points: false,
            level: false
        }
    };
    
    referrals.push(newReferral);
    
    // Базовый бонус за приглашение
    window.keys += 2;
    showMessage(`🎉 Новый друг! +2 ключа!`, "#ffd700");
    
    saveDailySystem();
    updateReferralsUI();
}

function updateReferralProgress(referralId, type, value) {
    const referral = referrals.find(r => r.id === referralId);
    if (!referral) return;
    
    switch(type) {
        case 'clicks':
            referral.progress.clicks += value;
            if (referral.progress.clicks >= 1000 && !referral.rewards.clicks) {
                referral.rewards.clicks = true;
                window.keys += 3;
                showMessage(`👥 Друг сделал 1000 кликов! +3 ключа!`, "#ffd700");
            }
            break;
            
        case 'points':
            referral.progress.points += value;
            if (referral.progress.points >= 10000 && !referral.rewards.points) {
                referral.rewards.points = true;
                window.keys += 5;
                showMessage(`👥 Друг набрал 10000 очков! +5 ключей!`, "#ffd700");
            }
            break;
            
        case 'level':
            referral.progress.level = value;
            if (referral.progress.level >= 10 && !referral.rewards.level) {
                referral.rewards.level = true;
                window.keys += 10;
                showMessage(`👥 Друг достиг 10 уровня! +10 ключей!`, "#ffd700");
            }
            break;
    }
    
    saveDailySystem();
    updateReferralsUI();
}

// ==================== СОХРАНЕНИЕ/ЗАГРУЗКА ====================

function saveDailySystem() {
    const data = {
        playerLevel,
        playerExp,
        expToNextLevel,
        dailyStreak,
        lastDailyClaim,
        keyMiningLevel,
        keyMiningRate,
        lastMiningCollect,
        dailyQuests,
        weeklyQuests,
        referrals
    };
    
    localStorage.setItem('dailySystem', JSON.stringify(data));
}

function loadDailySystem() {
    const saved = localStorage.getItem('dailySystem');
    if (!saved) return;
    
    try {
        const data = JSON.parse(saved);
        
        playerLevel = data.playerLevel || 1;
        playerExp = data.playerExp || 0;
        expToNextLevel = data.expToNextLevel || 100;
        dailyStreak = data.dailyStreak || 0;
        lastDailyClaim = data.lastDailyClaim || null;
        keyMiningLevel = data.keyMiningLevel || 0;
        keyMiningRate = data.keyMiningRate || 0;
        lastMiningCollect = data.lastMiningCollect || null;
        dailyQuests = data.dailyQuests || [];
        weeklyQuests = data.weeklyQuests || [];
        referrals = data.referrals || [];
        
        updateMiningRate();
    } catch (e) {
        console.error("Ошибка загрузки dailySystem:", e);
    }
}

// ==================== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА ====================

function updateDailyUI() {
    // Обновляем отображение ежедневного бонуса
    const bonusBtn = document.getElementById('dailyBonusBtn');
    if (bonusBtn) {
        const today = new Date().toDateString();
        if (lastDailyClaim === today) {
            bonusBtn.disabled = true;
            bonusBtn.textContent = '✅ Бонус получен';
        } else {
            bonusBtn.disabled = false;
            bonusBtn.textContent = `📅 Забрать бонус (${calculateDailyBonus()} ключей)`;
        }
    }
    
    updateLevelUI();
    updateQuestsUI();
    updateMiningUI();
    updateReferralsUI();
}

function updateLevelUI() {
    const levelEl = document.getElementById('playerLevel');
    const expEl = document.getElementById('playerExp');
    const expProgressEl = document.getElementById('expProgress');
    
    if (levelEl) levelEl.textContent = playerLevel;
    if (expEl) expEl.textContent = `${playerExp}/${expToNextLevel}`;
    
    if (expProgressEl) {
        const percent = (playerExp / expToNextLevel) * 100;
        expProgressEl.style.width = `${percent}%`;
    }
}

function updateQuestsUI() {
    const dailyContainer = document.getElementById('dailyQuests');
    const weeklyContainer = document.getElementById('weeklyQuests');
    
    if (dailyContainer) {
        dailyContainer.innerHTML = '';
        dailyQuests.forEach(quest => {
            dailyContainer.appendChild(createQuestElement(quest, 'daily'));
        });
    }
    
    if (weeklyContainer) {
        weeklyContainer.innerHTML = '';
        weeklyQuests.forEach(quest => {
            weeklyContainer.appendChild(createQuestElement(quest, 'weekly'));
        });
    }
}

function createQuestElement(quest, type) {
    const div = document.createElement('div');
    div.className = `quest-item ${quest.completed ? 'completed' : ''} ${quest.claimed ? 'claimed' : ''}`;
    
    const progressPercent = (quest.progress / quest.target) * 100;
    
    div.innerHTML = `
        <div class="quest-header">
            <span class="quest-name">${quest.name}</span>
            <span class="quest-reward"><i class="fas fa-key"></i> ${quest.reward} | <i class="fas fa-star"></i> ${quest.exp}</span>
        </div>
        <div class="quest-description">${quest.description}</div>
        <div class="quest-progress">
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${progressPercent}%"></div>
            </div>
            <span class="progress-text">${quest.progress}/${quest.target}</span>
        </div>
        <button class="quest-claim-btn" 
                onclick="${type === 'daily' ? 'claimDailyQuest' : 'claimWeeklyQuest'}(${quest.id})"
                ${quest.completed && !quest.claimed ? '' : 'disabled'}>
            ${quest.claimed ? 'Получено' : (quest.completed ? 'Забрать' : 'В процессе')}
        </button>
    `;
    
    return div;
}

function updateMiningUI() {
    const miningLevelEl = document.getElementById('miningLevel');
    const miningRateEl = document.getElementById('miningRate');
    const miningCostEl = document.getElementById('miningUpgradeCost');
    const miningProgressEl = document.getElementById('miningProgress');
    
    if (miningLevelEl) miningLevelEl.textContent = keyMiningLevel;
    if (miningRateEl) miningRateEl.textContent = keyMiningRate;
    if (miningCostEl) miningCostEl.textContent = getMiningUpgradeCost();
    
    if (miningProgressEl && lastMiningCollect) {
        const now = new Date();
        const hoursSince = (now - new Date(lastMiningCollect)) / 3600000;
        const progress = Math.min(100, (hoursSince % 1) * 100);
        miningProgressEl.style.width = `${progress}%`;
    }
}

function updateReferralsUI() {
    const referralsCountEl = document.getElementById('referralsCount');
    const referralsListEl = document.getElementById('referralsList');
    
    if (referralsCountEl) referralsCountEl.textContent = referrals.length;
    
    if (referralsListEl) {
        referralsListEl.innerHTML = '';
        referrals.forEach(ref => {
            const div = document.createElement('div');
            div.className = 'referral-item';
            div.innerHTML = `
                <div class="referral-id">Друг #${ref.id.substr(0, 8)}</div>
                <div class="referral-stats">
                    <span title="Клики">🖱️ ${ref.progress.clicks}</span>
                    <span title="Очки">⭐ ${ref.progress.points}</span>
                    <span title="Уровень">🌟 ${ref.progress.level}</span>
                </div>
                <div class="referral-rewards">
                    ${ref.rewards.base ? '✅' : '⬜'} 
                    ${ref.rewards.clicks ? '✅' : '⬜'} 
                    ${ref.rewards.points ? '✅' : '⬜'} 
                    ${ref.rewards.level ? '✅' : '⬜'}
                </div>
            `;
            referralsListEl.appendChild(div);
        });
    }
}

// ==================== ДОБАВЛЯЕМ В ГЛОБАЛЬНУЮ ОБЛАСТЬ ====================

window.initDailySystem = initDailySystem;
window.claimDailyBonus = claimDailyBonus;
window.upgradeKeyMining = upgradeKeyMining;
window.generateReferralLink = generateReferralLink;
window.updateQuestProgress = updateQuestProgress;
