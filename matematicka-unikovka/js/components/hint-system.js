/**
 * Dvoustupňový systém nápověd a zpětné vazby pro žáky
 */

import { MathRenderer } from '../math-renderer.js';
import { sound } from '../audio.js';
import { gameState } from '../state.js';

export class HintSystem {
  /**
   * Vygeneruje HTML pro akordeon nápověd k dané úloze
   */
  static renderHints(task, roomId) {
    const hint1Id = `hint1_${task.id}`;
    const hint2Id = `hint2_${task.id}`;

    return `
      <div class="hints-container">
        <!-- Nápověda 1 -->
        <div class="hint-card" id="card_${hint1Id}">
          <div class="hint-header" onclick="window.gameApp.revealHint('${task.id}', 1, '${task.topic || 'Zlomky a aritmetika'}', ${roomId})">
            <span class="hint-badge">💡 Nápověda 1: Metodické nakopnutí</span>
            <span class="hint-cost" id="cost_${hint1Id}">(-15 bodů) ▶ Klikni pro odhalení</span>
          </div>
          <div class="hint-content" id="content_${hint1Id}" style="display: none;">
            ${MathRenderer.render(task.hint1)}
          </div>
        </div>

        <!-- Nápověda 2 -->
        <div class="hint-card" id="card_${hint2Id}">
          <div class="hint-header" onclick="window.gameApp.revealHint('${task.id}', 2, '${task.topic || 'Zlomky a aritmetika'}', ${roomId})">
            <span class="hint-badge">🔍 Nápověda 2: Krok za krokem</span>
            <span class="hint-cost" id="cost_${hint2Id}">(-25 bodů) ▶ Klikni pro odhalení</span>
          </div>
          <div class="hint-content" id="content_${hint2Id}" style="display: none;">
            ${MathRenderer.render(task.hint2)}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Vygeneruje box se vzorovým řešením po správném vyřešení úlohy
   */
  static renderSolution(task) {
    if (!task.solution || task.solution.length === 0) return '';

    const stepsHtml = task.solution.map((step, idx) => `
      <div class="solution-step">
        <span class="step-bullet">${idx + 1}</span>
        <div>${MathRenderer.render(step)}</div>
      </div>
    `).join('');

    return `
      <div class="solution-box">
        <h4>✨ Postup a vysvětlení řešení:</h4>
        <div class="solution-steps">
          ${stepsHtml}
        </div>
      </div>
    `;
  }
}
