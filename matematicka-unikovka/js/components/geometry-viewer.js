/**
 * Interaktivní SVG renderer geometrických diagramů a náčrtků pro Místnost 4
 */
export class GeometryViewer {
  /**
   * Vygeneruje SVG podle typu úlohy
   */
  static renderSvgForTask(taskId) {
    if (taskId.includes('r4_e1') || taskId.includes('r4_m1')) {
      // Pravoúhlý trojúhelník s odvěsnami a přeponou
      return `
        <div class="geometry-canvas-card">
          <svg class="geometry-svg" viewBox="0 0 320 200" width="300" height="180">
            <!-- Trojúhelník -->
            <polygon points="50,160 250,160 50,40" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" stroke-width="3" />
            <!-- Pravý úhel -->
            <rect x="50" y="142" width="18" height="18" fill="none" stroke="#38bdf8" stroke-width="1.5" />
            <circle cx="59" cy="151" r="2.5" fill="#38bdf8" />
            <!-- Popisky stran -->
            <text x="145" y="180" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">a = 12 cm</text>
            <text x="25" y="105" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">b = ?</text>
            <text x="165" y="90" fill="#fbbf24" font-size="14" font-weight="bold" text-anchor="middle">c = 13 cm</text>
          </svg>
        </div>
      `;
    }

    if (taskId.includes('r4_m2')) {
      // Rovnoramenný lichoběžník s výškou
      return `
        <div class="geometry-canvas-card">
          <svg class="geometry-svg" viewBox="0 0 340 180" width="320" height="170">
            <!-- Lichoběžník -->
            <polygon points="40,140 300,140 230,40 110,40" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" stroke-width="3" />
            <!-- Výška -->
            <line x1="110" y1="40" x2="110" y2="140" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4,4" />
            <rect x="110" y="125" width="15" height="15" fill="none" stroke="#fbbf24" stroke-width="1" />
            <!-- Popisky -->
            <text x="170" y="165" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">a = 16 cm</text>
            <text x="170" y="30" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">c = 6 cm</text>
            <text x="55" y="85" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">b = 13 cm</text>
            <text x="125" y="95" fill="#fbbf24" font-size="13" font-weight="bold">v = ?</text>
          </svg>
        </div>
      `;
    }

    if (taskId.includes('r4_m3')) {
      // Rovnoramenný trojúhelník s úhly
      return `
        <div class="geometry-canvas-card">
          <svg class="geometry-svg" viewBox="0 0 300 200" width="280" height="180">
            <!-- Trojúhelník ABC -->
            <polygon points="40,160 260,160 150,35" fill="rgba(192, 132, 252, 0.12)" stroke="#c084fc" stroke-width="3" />
            <!-- Oblouky úhlů -->
            <path d="M 75 160 A 35 35 0 0 0 65 140" fill="none" stroke="#38bdf8" stroke-width="2" />
            <path d="M 225 160 A 35 35 0 0 1 235 140" fill="none" stroke="#38bdf8" stroke-width="2" />
            <!-- Popisky -->
            <text x="30" y="175" fill="#94a3b8" font-size="14" font-weight="bold">A</text>
            <text x="265" y="175" fill="#94a3b8" font-size="14" font-weight="bold">B</text>
            <text x="150" y="25" fill="#94a3b8" font-size="14" font-weight="bold" text-anchor="middle">C</text>
            <text x="85" y="150" fill="#38bdf8" font-size="13" font-weight="bold">α = 55°</text>
            <text x="215" y="150" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="end">β = 55°</text>
            <text x="150" y="65" fill="#fbbf24" font-size="14" font-weight="bold" text-anchor="middle">γ = ?</text>
          </svg>
        </div>
      `;
    }

    if (taskId.includes('r4_h2')) {
      // Čtverec s vepsaným kruhem
      return `
        <div class="geometry-canvas-card">
          <svg class="geometry-svg" viewBox="0 0 240 220" width="220" height="200">
            <!-- Čtverec -->
            <rect x="30" y="20" width="180" height="180" fill="rgba(244, 63, 94, 0.1)" stroke="#f43f5e" stroke-width="3" />
            <!-- Vepsaný kruh -->
            <circle cx="120" cy="110" r="90" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="2.5" />
            <!-- Střed a poloměr -->
            <circle cx="120" cy="110" r="3" fill="#fbbf24" />
            <line x1="120" y1="110" x2="210" y2="110" stroke="#fbbf24" stroke-width="2" stroke-dasharray="3,3" />
            <!-- Popisky -->
            <text x="160" y="105" fill="#fbbf24" font-size="13" font-weight="bold">r = 10 cm</text>
            <text x="120" y="215" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">a = 20 cm</text>
          </svg>
        </div>
      `;
    }

    return '';
  }
}
