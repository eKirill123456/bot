// leaderboard.js - Таблица лидеров

let leaderboard = [];

function loadLeaderboard() {
    const saved = localStorage.getItem('clickerLeaderboard');
    if (saved) {
        try {
            leaderboard = JSON.parse(saved);
        } catch (e) {
            console.log("Ошибка загрузки лидерборда:", e);
            leaderboard = [];
        }
    } else {
        leaderboard = [
            { name: "Игрок 1", score: 1000000, clicks: 50000, level: 100 },
            { name: "Игрок 2", score: 750000, clicks: 40000, level: 85 },
            { name: "Игрок 3", score: 500000, clicks: 30000, level: 70 },
            { name: "Игрок 4", score: 250000, clicks: 20000, level: 50 },
            { name: "Игрок 5", score: 100000, clicks: 10000, level: 30 }
        ];
    }
    return leaderboard;
}

function saveLeaderboard() {
    localStorage.setItem('clickerLeaderboard', JSON.stringify(leaderboard));
}

function addToLeaderboard(playerName, score, clicks, level) {
    const existingIndex = leaderboard.findIndex(p => p.name === playerName);
    
    if (existingIndex !== -1) {
        if (score > leaderboard[existingIndex].score) {
            leaderboard[existingIndex] = { name: playerName, score, clicks, level };
        }
    } else {
        leaderboard.push({ name: playerName, score, clicks, level });
    }
    
    leaderboard.sort((a, b) => b.score - a.score);
    
    if (leaderboard.length > 100) {
        leaderboard = leaderboard.slice(0, 100);
    }
    
    saveLeaderboard();
    renderLeaderboard();
}

function getPlayerRank(playerName) {
    const index = leaderboard.findIndex(p => p.name === playerName);
    return index !== -1 ? index + 1 : null;
}

function renderLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    if (!leaderboardList) return;
    
    leaderboardList.innerHTML = '';
    
    leaderboard.slice(0, 10).forEach((player, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
        
        const row = document.createElement('div');
        row.className = 'leaderboard-row';
        row.innerHTML = `
            <div class="leaderboard-rank">${medal}</div>
            <div class="leaderboard-name">${player.name}</div>
            <div class="leaderboard-score">${formatNumber(player.score)}</div>
            <div class="leaderboard-clicks">${formatNumber(player.clicks)}</div>
            <div class="leaderboard-level">${player.level}</div>
        `;
        
        leaderboardList.appendChild(row);
    });
}

function checkAndUpdateRecord(playerName) {
    if (!playerName || playerName === "Загрузка..." || playerName === "Локальный режим") return;
    
    const currentScore = window.totalPoints || 0;
    const currentClicks = window.totalClicks || 0;
    
    const playerLevel = window.upgrades ? 
        window.upgrades.reduce((sum, u) => sum + u.level, 0) : 0;
    
    addToLeaderboard(playerName, currentScore, currentClicks, playerLevel);
    
    if (leaderboard.length > 0 && currentScore >= leaderboard[0].score) {
        if (typeof showMessage === 'function') showMessage("🎉 НОВЫЙ РЕКОРД! 🎉", "#ffd700", 5000);
        
        window.keys = (window.keys || 0) + 10;
        if (typeof updateKeysDisplay === 'function') updateKeysDisplay();
    }
}

function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num);
}

// Добавляем функцию для инициализации обработчика кнопки лидерборда
function initLeaderboardButton() {
    const updateBtn = document.getElementById('updateLeaderboardBtn');
    if (updateBtn) {
        updateBtn.onclick = () => {
            const playerName = document.getElementById('telegramUser')?.textContent || 'Игрок';
            checkAndUpdateRecord(playerName);
        };
    }
}

window.leaderboard = leaderboard;
window.loadLeaderboard = loadLeaderboard;
window.saveLeaderboard = saveLeaderboard;
window.addToLeaderboard = addToLeaderboard;
window.getPlayerRank = getPlayerRank;
window.renderLeaderboard = renderLeaderboard;
window.checkAndUpdateRecord = checkAndUpdateRecord;
window.initLeaderboardButton = initLeaderboardButton;