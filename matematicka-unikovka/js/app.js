/**
 * Hlavní inicializační a aplikační modul (App Controller)
 */

import { gameState } from './state.js';
import { sound } from './audio.js';
import { RoomViews } from './rooms/room-views.js';
import { RoomController } from './rooms/room-controller.js';
import { TeacherDashboard } from './teacher/teacher-dashboard.js';
import { CURRICULUM_DATA } from './data/curriculum.js';

class MathEscapeApp {
  constructor() {
    this.currentView = 'start'; // start | room | victory | teacher
    this.roomController = new RoomController(this);
    this.teacherDashboard = new TeacherDashboard(this);
    this.timerInterval = null;
  }

  init() {
    this.renderProgressBar();
    this.setupGlobalEvents();
    this.startTimerLoop();

    // Pokud je hra už rozehraná, pokračovat v aktuální místnosti
    if (gameState.state.gameFinished) {
      this.renderVictory();
    } else if (gameState.state.currentRoomId && gameState.state.startTime) {
      this.navigateToRoom(gameState.state.currentRoomId);
    } else {
      this.renderStartScreen();
    }

    this.updateHud();
  }

  startTimerLoop() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      gameState.tickTimer();
      this.updateHud();
    }, 1000);
  }

  setupGlobalEvents() {
    // Tlačítko zvuku
    const soundBtn = document.getElementById('toggle-sound-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const isEnabled = sound.toggleSound();
        soundBtn.textContent = isEnabled ? '🔊' : '🔇';
        soundBtn.title = isEnabled ? 'Zvuk: Zapnuto' : 'Zvuk: Ztlumeno';
      });
    }

    // Tlačítko učitelského panelu
    const teacherBtn = document.getElementById('teacher-portal-btn');
    if (teacherBtn) {
      teacherBtn.addEventListener('click', () => {
        if (this.currentView === 'teacher') {
          this.closeTeacherDashboard();
        } else {
          this.openTeacherDashboard();
        }
      });
    }

    // Tlačítko nápovědy/pravidel
    const infoBtn = document.getElementById('game-info-btn');
    if (infoBtn) {
      infoBtn.addEventListener('click', () => {
        this.showModal({
          title: '📜 Pravidla únikové hry Projekt CHRONOS',
          body: `
            <div style="font-size: 0.95rem; line-height: 1.6; color: #e2e8f0;">
              <p style="margin-bottom: 0.75rem;">
                <strong>Tvůj cíl:</strong> Projít všemi 6 komorami tajuplného Archivu matematického vědění, 
                získat energetické klíče a stabilizovat časový portál pro návrat do současnosti.
              </p>
              <ul style="padding-left: 1.25rem; margin-bottom: 0.75rem;">
                <li>Každá komora obsahuje 3 matematické úkoly ve stylu jednotných přijímacích zkoušek (CERMAT).</li>
                <li>Za každý správně vyřešený úkol získáš <strong>100 bodů</strong> a fragment přístupového kódu.</li>
                <li>Při nesprávné odpovědi získáš konkrétní didaktickou radu a můžeš počítat znovu.</li>
                <li>K dispozici máš <strong>dvě úrovně nápověd</strong> (koncepční nakopnutí a krok za krokem).</li>
                <li>Získané fragmenty zadej na terminálu místnosti pro odemčení masivních vrat komory.</li>
              </ul>
              <p style="color: var(--primary);">Hodně štěstí a bystrou mysl při luštění!</p>
            </div>
          `
        });
      });
    }
  }

  renderProgressBar() {
    const strip = document.getElementById('progress-strip');
    if (!strip) return;

    const currentRoom = gameState.state.currentRoomId;
    const completed = gameState.state.completedRooms || [];
    const unlocked = gameState.state.unlockedRooms || [1];

    strip.innerHTML = CURRICULUM_DATA.rooms.map((room, idx) => {
      const rId = room.id;
      const isCompleted = completed.includes(rId);
      const isActive = rId === currentRoom && !isCompleted;
      const isLocked = !unlocked.includes(rId);

      let statusText = 'Uzamčeno';
      if (isCompleted) statusText = 'Dokončeno';
      else if (isActive) statusText = 'Probíhá';
      else if (!isLocked) statusText = 'Odemčeno';

      return `
        <div class="room-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}"
             onclick="if(!${isLocked}) window.gameApp.navigateToRoom(${rId})">
          <div class="step-num">${isCompleted ? '✓' : rId}</div>
          <div class="step-info">
            <span class="step-title">${room.title}</span>
            <span class="step-status">${statusText}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  updateHud() {
    const pointsEl = document.getElementById('hud-score-val');
    const timerEl = document.getElementById('hud-timer-val');
    const roomEl = document.getElementById('hud-room-val');

    if (pointsEl) pointsEl.textContent = `${gameState.state.score} b`;
    if (timerEl) timerEl.textContent = gameState.getFormattedTime();
    if (roomEl) roomEl.textContent = `${gameState.state.currentRoomId} / 6`;
  }

  renderStartScreen() {
    this.currentView = 'start';
    const mainEl = document.getElementById('main-view');
    if (!mainEl) return;

    mainEl.innerHTML = RoomViews.renderStartScreen();

    // Výběr obtížnosti
    let selectedDiff = gameState.state.difficulty || 'medium';
    const diffButtons = mainEl.querySelectorAll('.diff-select-btn');
    diffButtons.forEach(btn => {
      const diff = btn.getAttribute('data-diff');
      if (diff === selectedDiff) {
        btn.className = 'btn btn-primary btn-sm diff-select-btn active-diff';
      } else {
        btn.className = 'btn btn-secondary btn-sm diff-select-btn';
      }

      btn.addEventListener('click', () => {
        selectedDiff = diff;
        diffButtons.forEach(b => b.className = 'btn btn-secondary btn-sm diff-select-btn');
        btn.className = 'btn btn-primary btn-sm diff-select-btn active-diff';
      });
    });

    // Start tlačítko
    const startBtn = mainEl.querySelector('#start-game-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const nameInput = mainEl.querySelector('#player-name-input');
        const playerName = nameInput ? nameInput.value.trim() || 'Badatel 1' : 'Badatel 1';
        
        sound.playUnlockRoom();
        gameState.resetGame(selectedDiff, playerName);
        this.navigateToRoom(1);
      });
    }
  }

  navigateToRoom(roomId) {
    this.currentView = 'room';
    gameState.state.currentRoomId = roomId;
    gameState.saveState();

    this.renderRoom(roomId);
    this.renderProgressBar();
    this.updateHud();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderRoom(roomId) {
    const mainEl = document.getElementById('main-view');
    if (!mainEl) return;

    mainEl.innerHTML = RoomViews.renderRoom(roomId, gameState.state);
    this.roomController.initCurrentRoom(roomId);
    this.renderProgressBar();
    this.updateHud();
  }

  submitTaskAnswer(taskId, roomId) {
    this.roomController.submitAnswer(taskId, roomId);
  }

  autoFillCode(code) {
    if (this.roomController && this.roomController.currentKeypad) {
      this.roomController.currentKeypad.currentInput = String(code);
      this.roomController.currentKeypad.updateDisplay();
      sound.playSuccess();
    }
  }

  revealHint(taskId, hintLevel, topicName, roomId) {
    this.roomController.revealHint(taskId, hintLevel, topicName, roomId);
  }

  renderVictory() {
    this.currentView = 'victory';
    const mainEl = document.getElementById('main-view');
    if (!mainEl) return;

    mainEl.innerHTML = RoomViews.renderVictoryScreen(gameState.state);
    this.renderProgressBar();
    this.updateHud();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openTeacherDashboard() {
    this.currentView = 'teacher';
    const mainEl = document.getElementById('main-view');
    if (!mainEl) return;

    mainEl.innerHTML = this.teacherDashboard.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeTeacherDashboard() {
    if (gameState.state.gameFinished) {
      this.renderVictory();
    } else {
      this.navigateToRoom(gameState.state.currentRoomId || 1);
    }
  }

  exportClassData(format) {
    this.teacherDashboard.exportData(format);
  }

  restartGame() {
    gameState.state.gameFinished = false;
    gameState.saveState();
    this.renderStartScreen();
    this.updateHud();
    this.renderProgressBar();
  }

  showModal({ title, body, confirmText = 'Zavřít', onConfirm = null }) {
    const existing = document.getElementById('app-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'app-modal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="icon-btn" id="modal-close-x">✕</button>
        </div>
        <div class="modal-body">${body}</div>
        <div class="modal-footer">
          <button class="btn btn-primary" id="modal-confirm-btn">${confirmText}</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const close = () => {
      modal.remove();
      if (onConfirm) onConfirm();
    };

    modal.querySelector('#modal-close-x').addEventListener('click', () => modal.remove());
    modal.querySelector('#modal-confirm-btn').addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }
}

// Inicializace po načtení DOMu
document.addEventListener('DOMContentLoaded', () => {
  window.gameApp = new MathEscapeApp();
  window.gameApp.init();
});
