/**
 * Správa stavu hry (Game State Management)
 * Ukládá postup, skóre, statistiky, nápovědy a čas do LocalStorage.
 */

import { CURRICULUM_DATA } from './data/curriculum.js';

export class GameState {
  constructor() {
    this.storageKey = 'chronos_math_escape_state_v1';
    this.defaultState = {
      playerName: 'Hráč',
      difficulty: 'medium', // easy | medium | hard
      currentRoomId: 1,
      unlockedRooms: [1],
      completedRooms: [],
      score: 0,
      baseScore: 0,
      timeBonus: 0,
      totalHintsUsed: 0,
      totalMistakes: 0,
      startTime: null,
      endTime: null,
      elapsedSeconds: 0,
      timerRunning: false,
      
      // Postup v jednotlivých místnostech
      roomProgress: {
        1: { solvedTasks: [], collectedCodes: [], hintsUsed: 0, mistakes: 0, timeSpent: 0, unlocked: false },
        2: { solvedTasks: [], collectedCodes: [], hintsUsed: 0, mistakes: 0, timeSpent: 0, unlocked: false },
        3: { solvedTasks: [], collectedCodes: [], hintsUsed: 0, mistakes: 0, timeSpent: 0, unlocked: false },
        4: { solvedTasks: [], collectedCodes: [], hintsUsed: 0, mistakes: 0, timeSpent: 0, unlocked: false },
        5: { solvedTasks: [], collectedCodes: [], hintsUsed: 0, mistakes: 0, timeSpent: 0, unlocked: false },
        6: { solvedTasks: [], collectedCodes: [], hintsUsed: 0, mistakes: 0, timeSpent: 0, unlocked: false }
      },

      // Úspěšnost podle didaktických témat pro diagnostiku
      topicStats: {
        'Zlomky a aritmetika': { correct: 0, attempts: 0, hints: 0 },
        'Výrazy a rovnice': { correct: 0, attempts: 0, hints: 0 },
        'Procenta a poměry': { correct: 0, attempts: 0, hints: 0 },
        'Geometrie a tělesa': { correct: 0, attempts: 0, hints: 0 },
        'Logika a posloupnosti': { correct: 0, attempts: 0, hints: 0 },
        'Komplexní syntéza': { correct: 0, attempts: 0, hints: 0 }
      },

      gameFinished: false,
      rank: null
    };

    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return { ...this.defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Nelze načíst stav z LocalStorage', e);
    }
    return JSON.parse(JSON.stringify(this.defaultState));
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Nelze uložit stav do LocalStorage', e);
    }
  }

  resetGame(difficulty = 'medium', playerName = 'Hráč') {
    this.state = JSON.parse(JSON.stringify(this.defaultState));
    this.state.difficulty = difficulty;
    this.state.playerName = playerName;
    this.state.startTime = Date.now();
    this.state.timerRunning = true;
    this.saveState();
  }

  startTimer() {
    if (!this.state.startTime) {
      this.state.startTime = Date.now();
    }
    this.state.timerRunning = true;
  }

  pauseTimer() {
    this.state.timerRunning = false;
    this.saveState();
  }

  tickTimer() {
    if (this.state.timerRunning && !this.state.gameFinished) {
      this.state.elapsedSeconds++;
      if (this.state.roomProgress[this.state.currentRoomId]) {
        this.state.roomProgress[this.state.currentRoomId].timeSpent++;
      }
    }
  }

  getFormattedTime(seconds = this.state.elapsedSeconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  recordTaskSuccess(roomId, taskId, codeFragment, topicName = 'Zlomky a aritmetika') {
    const rp = this.state.roomProgress[roomId];
    if (!rp.solvedTasks.includes(taskId)) {
      rp.solvedTasks.push(taskId);
      rp.collectedCodes.push(codeFragment);

      // Body za vyřešení
      const basePoints = 100;
      this.state.score += basePoints;
      this.state.baseScore += basePoints;

      // Záznam diagnostiky tématu
      if (!this.state.topicStats[topicName]) {
        this.state.topicStats[topicName] = { correct: 0, attempts: 0, hints: 0 };
      }
      this.state.topicStats[topicName].correct++;
      this.state.topicStats[topicName].attempts++;

      this.saveState();
    }
  }

  recordMistake(roomId, taskId, topicName = 'Zlomky a aritmetika') {
    this.state.totalMistakes++;
    if (this.state.roomProgress[roomId]) {
      this.state.roomProgress[roomId].mistakes++;
    }
    if (this.state.topicStats[topicName]) {
      this.state.topicStats[topicName].attempts++;
    }
    // Malá bodová korekce za chybu (min skóre 0)
    this.state.score = Math.max(0, this.state.score - 10);
    this.saveState();
  }

  recordHintUsed(roomId, hintLevel, topicName = 'Zlomky a aritmetika') {
    this.state.totalHintsUsed++;
    if (this.state.roomProgress[roomId]) {
      this.state.roomProgress[roomId].hintsUsed++;
    }
    if (this.state.topicStats[topicName]) {
      this.state.topicStats[topicName].hints++;
    }
    // Penalizace za nápovědu: Úroveň 1 = -15 b, Úroveň 2 = -25 b
    const penalty = hintLevel === 1 ? 15 : 25;
    this.state.score = Math.max(0, this.state.score - penalty);
    this.saveState();
  }

  unlockRoom(roomId) {
    const nextRoomId = roomId + 1;
    if (this.state.roomProgress[roomId]) {
      this.state.roomProgress[roomId].unlocked = true;
    }
    if (!this.state.completedRooms.includes(roomId)) {
      this.state.completedRooms.push(roomId);
    }
    if (nextRoomId <= 6 && !this.state.unlockedRooms.includes(nextRoomId)) {
      this.state.unlockedRooms.push(nextRoomId);
    }
    this.saveState();
  }

  finishGame() {
    this.state.gameFinished = true;
    this.state.timerRunning = false;
    this.state.endTime = Date.now();

    // Časový bonus: čím rychlejší průchod, tím vyšší bonus (např. do 30 min)
    const targetSeconds = 30 * 60; // 30 minut
    if (this.state.elapsedSeconds < targetSeconds) {
      const remainingBonus = Math.floor((targetSeconds - this.state.elapsedSeconds) / 10);
      this.state.timeBonus = Math.min(300, remainingBonus);
      this.state.score += this.state.timeBonus;
    }

    // Výpočet hodnosti
    // Max teoretické body: 18 úloh * 100 + 300 časový bonus = 2100 bodů
    const maxScore = 2100;
    const pct = Math.min(100, Math.round((this.state.score / maxScore) * 100));

    let matchedRank = CURRICULUM_DATA.ranks[CURRICULUM_DATA.ranks.length - 1];
    for (const r of CURRICULUM_DATA.ranks) {
      if (pct >= r.minPct) {
        matchedRank = r;
        break;
      }
    }
    this.state.rank = matchedRank;
    this.state.finalPercentage = pct;

    // Uložit do historie studentů pro učitelský modul
    this.saveToStudentHistory();

    this.saveState();
    return matchedRank;
  }

  saveToStudentHistory() {
    const historyKey = 'chronos_student_history';
    try {
      let list = JSON.parse(localStorage.getItem(historyKey) || '[]');
      list.push({
        id: 'rec_' + Date.now(),
        name: this.state.playerName || 'Žák',
        date: new Date().toLocaleDateString('cs-CZ') + ' ' + new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }),
        difficulty: this.state.difficulty,
        score: this.state.score,
        percentage: this.state.finalPercentage || 85,
        rank: this.state.rank ? this.state.rank.name : 'Stříbrný badatel',
        timeSpent: this.state.elapsedSeconds,
        hintsUsed: this.state.totalHintsUsed,
        mistakes: this.state.totalMistakes,
        topicStats: this.state.topicStats
      });
      localStorage.setItem(historyKey, JSON.stringify(list));
    } catch (e) {
      console.warn('Chyba při ukládání do historie', e);
    }
  }
}

export const gameState = new GameState();
