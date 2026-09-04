/**
 * Interaktivní vizualizér lineárních rovnic na rovnoramenných vahách pro Místnost 2
 */
export class BalanceWidget {
  static renderWidget(leftExpression, rightExpression) {
    return `
      <div class="balance-scale-widget">
        <svg class="scale-svg" viewBox="0 0 400 160" width="360" height="150">
          <!-- Podstavec vah -->
          <polygon points="170,150 230,150 205,70 195,70" fill="#334155" stroke="#64748b" stroke-width="2" />
          <circle cx="200" cy="70" r="8" fill="#38bdf8" />
          
          <!-- Vahadlo -->
          <line x1="60" y1="70" x2="340" y2="70" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" />
          
          <!-- Závěsy misek -->
          <line x1="60" y1="70" x2="30" y2="110" stroke="#64748b" stroke-width="1.5" />
          <line x1="60" y1="70" x2="90" y2="110" stroke="#64748b" stroke-width="1.5" />
          <line x1="340" y1="70" x2="310" y2="110" stroke="#64748b" stroke-width="1.5" />
          <line x1="340" y1="70" x2="370" y2="110" stroke="#64748b" stroke-width="1.5" />
          
          <!-- Misky vah -->
          <path d="M 20 110 Q 60 135 100 110 Z" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="2" />
          <path d="M 300 110 Q 340 135 380 110 Z" fill="rgba(129, 140, 248, 0.2)" stroke="#818cf8" stroke-width="2" />
          
          <!-- Texty výrazů na miskách -->
          <text x="60" y="102" fill="#38bdf8" font-size="14" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">
            ${leftExpression}
          </text>
          <text x="340" y="102" fill="#818cf8" font-size="14" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">
            ${rightExpression}
          </text>
          
          <!-- Symbol rovnováhy -->
          <text x="200" y="45" fill="#10b981" font-size="18" font-weight="bold" text-anchor="middle">⚖️ =</text>
        </svg>
      </div>
    `;
  }
}
