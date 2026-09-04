/**
 * Kontrolér herních místností (Room Controller)
 * Stará se o validaci odpovědí, chybové stavy, nápovědy a inicializaci číselníků.
 */

import { TASKS_DATABASE } from '../data/tasks.js';
import { gameState } from '../state.js';
import { sound } from '../audio.js';
import { KeypadComponent } from '../components/keypad.js';
import { MathRenderer } from '../math-renderer.js';

export class RoomController {
  constructor(app) {
    this.app = app;
    this.currentKeypad = null;
  }

  initCurrentRoom(roomId) {
    const keypadContainer = document.getElementById('room-keypad-container');
    if (keypadContainer) {
      const targetCode = keypadContainer.getAttribute('data-target-code') || '123';
      
      this.currentKeypad = new KeypadComponent('room-keypad-container', {
        maxLength: targetCode.length,
        targetCode: targetCode,
        onUnlock: () => {
          this.handleRoomUnlock(roomId);
        }
      });
    }
  }

  submitAnswer(taskId, roomId) {
    const inputEl = document.getElementById(`input-${taskId}`);
    const feedbackEl = document.getElementById(`feedback-${taskId}`);
    if (!inputEl || !feedbackEl) return;

    const rawVal = inputEl.value.trim();
    if (!rawVal) {
      feedbackEl.innerHTML = `
        <div class="feedback-box error">
          <div class="feedback-icon">⚠️</div>
          <div class="feedback-body">
            <h4>Prázdná odpověď</h4>
            <p>Nejprve zadej svůj vypočítaný výsledek do pole.</p>
          </div>
        </div>
      `;
      sound.playError();
      return;
    }

    const diff = gameState.state.difficulty || 'medium';
    const roomTasks = TASKS_DATABASE[roomId]?.[diff] || [];
    const task = roomTasks.find(t => t.id === taskId);
    if (!task) return;

    // Normalizace pro porovnání (např. nahrazení čárky tečkou, odstranění mezer)
    const normalizedInput = rawVal.toLowerCase().replace(/\s+/g, '').replace(',', '.');
    const isCorrect = task.acceptedAnswers.some(ans => {
      const normAns = ans.toLowerCase().replace(/\s+/g, '').replace(',', '.');
      return normAns === normalizedInput;
    });

    if (isCorrect) {
      sound.playSuccess();
      gameState.recordTaskSuccess(roomId, taskId, task.codeFragment, task.topic || 'Zlomky a aritmetika');
      
      feedbackEl.innerHTML = `
        <div class="feedback-box success">
          <div class="feedback-icon">🎉</div>
          <div class="feedback-body">
            <h4>Správně!</h4>
            <p>Získáváš fragment kódu <strong>${task.codeFragment}</strong> a +100 bodů.</p>
          </div>
        </div>
      `;

      // Překreslit místnost po krátké prodlevě pro aktualizaci slotů a odemčení
      setTimeout(() => {
        this.app.renderRoom(roomId);
      }, 700);

    } else {
      sound.playError();
      gameState.recordMistake(roomId, taskId, task.topic || 'Zlomky a aritmetika');

      // Specifická pedagogická diagnóza chyby, pokud existuje v misconceptions
      let customMisconception = null;
      if (task.misconceptions) {
        for (const [misKey, misMsg] of Object.entries(task.misconceptions)) {
          if (normalizedInput === misKey.toLowerCase().replace(/\s+/g, '').replace(',', '.')) {
            customMisconception = misMsg;
            break;
          }
        }
      }

      const errorMsg = customMisconception || 'Výsledek není správný. Zkontroluj postup výpočtu, priority operací a znaménka. Případně můžeš využít nápovědu níže.';

      feedbackEl.innerHTML = `
        <div class="feedback-box error">
          <div class="feedback-icon">❌</div>
          <div class="feedback-body">
            <h4>Zkus to znovu:</h4>
            <p>${MathRenderer.render(errorMsg)}</p>
          </div>
        </div>
      `;
    }

    this.app.updateHud();
  }

  revealHint(taskId, hintLevel, topicName, roomId) {
    const costEl = document.getElementById(`cost_hint${hintLevel}_${taskId}`);
    const contentEl = document.getElementById(`content_hint${hintLevel}_${taskId}`);
    const cardEl = document.getElementById(`card_hint${hintLevel}_${taskId}`);

    if (contentEl && contentEl.style.display === 'none') {
      sound.playHint();
      contentEl.style.display = 'block';
      if (costEl) costEl.textContent = '🔓 Odhaleno';
      if (cardEl) cardEl.classList.add('revealed');
      
      gameState.recordHintUsed(roomId, hintLevel, topicName);
      this.app.updateHud();
    }
  }

  handleRoomUnlock(roomId) {
    gameState.unlockRoom(roomId);

    if (roomId === 6) {
      // Finální vítězství!
      sound.playVictory();
      gameState.finishGame();
      this.app.renderVictory();
    } else {
      const nextRoomId = roomId + 1;
      this.app.showModal({
        title: 'Komora úspěšně odemčena! 🚪✨',
        body: `
          <div style="text-align: center; padding: 1rem;">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎉🔓</div>
            <p style="font-size: 1.1rem; line-height: 1.5; color: #f8fafc;">
              Všechny bezpečnostní zámky komory ${roomId} povolíly a těžká vrata se otevírají!
            </p>
            <p style="font-size: 0.95rem; color: #94a3b8; margin-top: 0.5rem;">
              Postupuješ do dalšího sektoru: <strong>Komora ${nextRoomId}</strong>.
            </p>
          </div>
        `,
        confirmText: `Vstoupit do komory ${nextRoomId} ⏩`,
        onConfirm: () => {
          this.app.navigateToRoom(nextRoomId);
        }
      });
    }

    this.app.updateHud();
  }
}
