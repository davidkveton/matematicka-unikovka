/**
 * Vykreslovací šablony pro scény a herní místnosti (Room Views)
 */

import { CURRICULUM_DATA } from '../data/curriculum.js';
import { TASKS_DATABASE } from '../data/tasks.js';
import { MathRenderer } from '../math-renderer.js';
import { HintSystem } from '../components/hint-system.js';
import { GeometryViewer } from '../components/geometry-viewer.js';
import { BalanceWidget } from '../components/balance-widget.js';

export class RoomViews {
  /**
   * Úvodní obrazovka (Start Screen)
   */
  static renderStartScreen() {
    return `
      <div class="card-glass" style="max-width: 800px; margin: 2rem auto; text-align: center;">
        <div style="font-size: 3.5rem; margin-bottom: 1rem; animation: pulse 3s infinite;">⏳ 🗝️ 🌌</div>
        <h2 style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; margin-bottom: 0.5rem; background: linear-gradient(90deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          PROJEKT CHRONOS: ARCHIV VĚDĚNÍ
        </h2>
        <p style="font-size: 1.1rem; color: #cbd5e1; max-width: 620px; margin: 0 auto 1.75rem auto; line-height: 1.6;">
          Vítej, mladý badateli! V tajuplném Archivu matematického vědění došlo k časoprostorové anomálii. 
          Všechny bezpečnostní komory se uzamkly a portál do současnosti je nestabilní. 
          Tvým úkolem je projít 6 komorami, vyřešit jejich matematické šifry, získat energetické kódy a stabilizovat portál!
        </p>

        <!-- Nastavení hry -->
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto; text-align: left;">
          <div style="margin-bottom: 1.25rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.4rem;">
              Jméno / Přezdívka hráče:
            </label>
            <input type="text" id="player-name-input" value="Badatel 1" class="task-input" style="width: 100%;" />
          </div>

          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.4rem;">
              Zvol úroveň obtížnosti (příprava na SŠ):
            </label>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
              <button class="btn btn-secondary btn-sm diff-select-btn" data-diff="easy" style="border-color: #10b981;">
                🌱 Lehká (Základ)
              </button>
              <button class="btn btn-primary btn-sm diff-select-btn active-diff" data-diff="medium" style="border-color: #38bdf8;">
                ⭐ Střední (CERMAT)
              </button>
              <button class="btn btn-secondary btn-sm diff-select-btn" data-diff="hard" style="border-color: #ef4444;">
                🔥 Těžká (Gymnázium)
              </button>
            </div>
          </div>
        </div>

        <button class="btn btn-primary btn-lg" id="start-game-btn" style="padding: 1rem 3rem; font-size: 1.25rem;">
          VSTOUPIT DO ARCHIVU 🚀
        </button>

        <div style="margin-top: 2rem; display: flex; justify-content: center; gap: 1.5rem; font-size: 0.85rem; color: var(--text-muted);">
          <span>⏱️ Průběžné měření času</span>
          <span>💡 2 úrovně nápověd</span>
          <span>🏆 Systém 4 hodností</span>
        </div>
      </div>
    `;
  }

  /**
   * Vykreslení konkrétní herní místnosti (1 až 6)
   */
  static renderRoom(roomId, state) {
    const roomInfo = CURRICULUM_DATA.rooms.find(r => r.id === roomId) || CURRICULUM_DATA.rooms[0];
    const diff = state.difficulty || 'medium';
    const roomTasks = TASKS_DATABASE[roomId]?.[diff] || [];
    const progress = state.roomProgress[roomId] || { solvedTasks: [], collectedCodes: [] };

    // Sestavení cílového kódu místnosti ze všech 3 úloh
    const targetCode = roomTasks.map(t => t.codeFragment).join('');

    // Vykreslení karet úloh
    const tasksHtml = roomTasks.map((task, idx) => {
      const isSolved = progress.solvedTasks.includes(task.id);
      const isCurrent = !isSolved && (idx === 0 || progress.solvedTasks.includes(roomTasks[idx - 1].id));

      return `
        <div class="task-card ${isSolved ? 'solved-task' : (isCurrent ? 'active-task' : '')}" id="task-card-${task.id}">
          <div class="task-header">
            <div class="task-number">
              <span>${isSolved ? '✅' : '🔒'}</span>
              <span>Úkol ${idx + 1}: ${task.title}</span>
            </div>
            <span class="task-reward">+100 bodů</span>
          </div>

          <div class="task-prompt">
            ${MathRenderer.render(task.prompt)}
          </div>

          ${!isSolved ? `
            <div class="task-input-group">
              <input type="text" 
                class="task-input" 
                id="input-${task.id}" 
                placeholder="Zadejte výsledek (např. 12, 3/4 nebo -5)..."
                autocomplete="off"
                onkeypress="if(event.key === 'Enter') window.gameApp.submitTaskAnswer('${task.id}', ${roomId})"
              />
              <button class="btn btn-primary" onclick="window.gameApp.submitTaskAnswer('${task.id}', ${roomId})">
                Ověřit odpověď
              </button>
            </div>
            <div id="feedback-${task.id}"></div>
            ${HintSystem.renderHints(task, roomId)}
          ` : `
            <div class="code-fragment-chip">
              🔑 Získaný fragment kódu: <strong>${task.codeFragment}</strong>
            </div>
            ${HintSystem.renderSolution(task)}
          `}
        </div>
      `;
    }).join('');

    const allSolved = roomTasks.length > 0 && roomTasks.every(t => progress.solvedTasks.includes(t.id));

    // Vykreslení slotů pro fragmenty kódu
    const slotsHtml = roomTasks.map((t, idx) => {
      const isTaskSolved = progress.solvedTasks.includes(t.id);
      const fragment = isTaskSolved ? t.codeFragment : '';
      return `
        <div class="fragment-slot ${fragment ? 'filled' : ''}" title="Fragment z úkolu ${idx + 1}">
          ${fragment || '?'}
        </div>
      `;
    }).join('');

    return `
      <div class="room-wrapper">
        <!-- Hlavička místnosti -->
        <div class="room-header">
          <div class="room-meta">
            <div class="room-badge-group">
              <span class="badge badge-topic">Komora ${roomId} / 6</span>
              <span class="badge badge-${diff}">Obtížnost: ${diff === 'easy' ? 'Lehká' : (diff === 'hard' ? 'Těžká' : 'Střední')}</span>
              <span class="badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
                🎯 ${roomInfo.cermatFocus}
              </span>
            </div>
            <h2 class="room-title">
              <span>🏛️</span> ${roomInfo.title}
            </h2>
            <p class="room-subtitle">${roomInfo.subtitle}</p>
          </div>
        </div>

        <!-- Příběhový text -->
        <div class="story-banner">
          📜 <strong>Záznam archivu:</strong> ${roomInfo.description}
        </div>

        <!-- Herní mřížka: Úkoly vlevo, Zámek vpravo -->
        <div class="room-grid">
          <div class="room-tasks-area">
            ${tasksHtml}
          </div>

          <div class="room-terminal">
            <div class="terminal-card">
              <div class="terminal-title">
                <span>🔐</span> Bezpečnostní terminál
              </div>
              <p class="terminal-desc">
                Vyřeš všechny 3 úkoly, získej číselné fragmenty a zadej kód na číselníku pro otevření těžkých vrat komory.
              </p>

              <div class="collected-fragments">
                ${slotsHtml}
              </div>

              ${allSolved ? `
                <div style="margin-bottom: 1rem; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: var(--radius-md); padding: 0.6rem 0.8rem; font-size: 0.88rem; color: #6ee7b7;">
                  ✨ Všechny fragmenty získány! Kód: <strong>${targetCode}</strong>
                  <button class="btn btn-sm btn-primary" style="margin-top: 0.5rem; width: 100%;" onclick="window.gameApp.autoFillCode('${targetCode}')">
                    ⚡ Vložit kód na číselník
                  </button>
                </div>
              ` : ''}

              <!-- Kontejner pro interaktivní Keypad -->
              <div id="room-keypad-container" data-target-code="${targetCode}"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Závěrečná obrazovka vítězství a hodnocení (Victory Screen)
   */
  static renderVictoryScreen(state) {
    const rank = state.rank || CURRICULUM_DATA.ranks[1];
    const pct = state.finalPercentage || 85;
    const playerName = state.playerName || 'Badatel';

    const topicStatsHtml = Object.entries(state.topicStats).map(([topic, stats]) => {
      const topicPct = stats.attempts > 0 ? Math.min(100, Math.round((stats.correct / stats.attempts) * 100)) : 100;
      let barClass = 'bar-high';
      if (topicPct < 60) barClass = 'bar-low';
      else if (topicPct < 80) barClass = 'bar-mid';

      return `
        <div class="topic-item">
          <div class="topic-info">
            <span class="topic-name"><strong>${topic}</strong></span>
            <span class="topic-pct">${topicPct} %</span>
          </div>
          <div class="topic-bar-bg">
            <div class="topic-bar-fill ${barClass}" style="width: ${topicPct}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="card-glass victory-screen" style="max-width: 960px; margin: 0 auto; text-align: center;">
        <!-- Slavnostní záhlaví -->
        <div style="font-size: 3.8rem; margin-bottom: 0.5rem; animation: pulse 2s infinite;">
          🎉 🏆 🌌 🗝️
        </div>

        <div style="margin-bottom: 1.5rem;">
          <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid #10b981; font-size: 0.9rem; padding: 0.4rem 1rem;">
            ✨ ČASOPROSTOROVÝ PORTÁL ÚSPĚŠNĚ STABILIZOVÁN! ✨
          </span>
          <h2 style="font-family: var(--font-display); font-size: 2.5rem; font-weight: 900; color: #ffffff; margin-top: 0.75rem; line-height: 1.2;">
            GRATULUJEME, ${playerName.toUpperCase()}!
          </h2>
          <p style="color: #cbd5e1; font-size: 1.1rem; max-width: 680px; margin: 0.5rem auto 0 auto; line-height: 1.6;">
            Úspěšně jsi prošel(a) všemi 6 komorami Archivu matematického vědění, vyřešil(a) náročné přijímačkové šifry a zachránil(a) Projekt CHRONOS!
          </p>
        </div>

        <!-- Karta dosažené hodnosti -->
        <div style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95)); border: 2px solid ${rank.color}; border-radius: var(--radius-xl); padding: 1.75rem; margin-bottom: 1.75rem; box-shadow: 0 0 35px rgba(56, 189, 248, 0.2); display: flex; align-items: center; gap: 1.5rem; text-align: left; flex-wrap: wrap;">
          <div class="rank-emblem rank-${rank.id}" style="width: 100px; height: 100px; font-size: 3rem; flex-shrink: 0;">
            ${rank.icon}
          </div>
          <div style="flex: 1; min-width: 260px;">
            <div style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;">
              Získaná hodnost pro přijímací zkoušky:
            </div>
            <h3 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; color: ${rank.color}; margin: 0.2rem 0 0.4rem 0;">
              ${rank.name}
            </h3>
            <p style="color: #e2e8f0; font-size: 0.95rem; line-height: 1.5;">
              ${rank.description}
            </p>
          </div>
        </div>

        <!-- Mřížka 6 detailních statistik -->
        <div class="results-stats-grid" style="grid-template-columns: repeat(3, 1fr); gap: 1rem; width: 100%; margin-bottom: 1.75rem;">
          <div class="stat-box">
            <div class="stat-value" style="color: var(--gold);">${state.score} b</div>
            <div class="stat-label">Celkové skóre</div>
            <small style="color: var(--text-muted); font-size: 0.72rem;">(včetně časového bonusu +${state.timeBonus || 0} b)</small>
          </div>

          <div class="stat-box">
            <div class="stat-value" style="color: var(--primary);">${pct} %</div>
            <div class="stat-label">Úspěšnost řešení</div>
            <small style="color: var(--text-muted); font-size: 0.72rem;">poměr k maximu</small>
          </div>

          <div class="stat-box">
            <div class="stat-value" style="color: #34d399;">${state.getFormattedTime()}</div>
            <div class="stat-label">Celkový čas úniku</div>
            <small style="color: var(--text-muted); font-size: 0.72rem;">všech 6 komor</small>
          </div>

          <div class="stat-box">
            <div class="stat-value" style="color: #f43f5e;">${state.totalHintsUsed}</div>
            <div class="stat-label">Použité nápovědy</div>
            <small style="color: var(--text-muted); font-size: 0.72rem;">celkem za hru</small>
          </div>

          <div class="stat-box">
            <div class="stat-value" style="color: #fb923c;">${state.totalMistakes}</div>
            <div class="stat-label">Chybné pokusy</div>
            <small style="color: var(--text-muted); font-size: 0.72rem;">znovu opraveno</small>
          </div>

          <div class="stat-box">
            <div class="stat-value" style="color: #c084fc;">6 / 6</div>
            <div class="stat-label">Odemčené komory</div>
            <small style="color: var(--text-muted); font-size: 0.72rem;">100 % splněno</small>
          </div>
        </div>

        <!-- Diagnostika dovedností -->
        <div style="background: rgba(15, 23, 42, 0.75); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 1.5rem; width: 100%; text-align: left; margin-bottom: 2rem;">
          <h3 style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; color: #ffffff; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.6rem;">
            📊 Diagnostická mapa tvých matematických dovedností
          </h3>
          <div class="topic-list">
            ${topicStatsHtml}
          </div>
        </div>

        <!-- Hlavní navigační tlačítka -->
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; width: 100%;">
          <button class="btn btn-primary btn-lg" onclick="window.gameApp.restartGame()" style="padding: 1rem 2rem; font-size: 1.15rem;">
            🏠 Zpět do hlavní nabídky (Nová hra)
          </button>
          <button class="btn btn-secondary btn-lg" onclick="window.gameApp.openTeacherDashboard()" style="padding: 1rem 1.75rem;">
            👩‍🏫 Učitelský report a analytika třídy
          </button>
          <button class="btn btn-secondary btn-lg" onclick="window.print()" style="padding: 1rem 1.5rem;">
            🖨️ Vytisknout vysvědčení
          </button>
        </div>
      </div>
    `;
  }
}
