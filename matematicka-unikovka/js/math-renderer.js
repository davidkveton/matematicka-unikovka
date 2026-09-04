/**
 * Sémantický a robustní renderer matematických vzorců a výrazů pro školní matematiku
 * Podporuje KaTeX (pokud je dostupný) a obsahuje kompletní vestavěný HTML fallback,
 * který převede veškerý LaTeX zápis (\frac, \sqrt, \text, \implies, indexy, mocniny)
 * na čisté grafické zobrazení bez jakýchkoliv viditelných zbytků kódu.
 */
export class MathRenderer {
  /**
   * Zpracuje text a nahradí v něm veškeré matematické výrazy (jak $$...$$, tak $...$)
   * a vyčistí případné LaTeX značky i z běžného textu.
   */
  static render(text) {
    if (!text) return '';

    let result = String(text);

    // 1. Zpracování blokové matematiky: $$...$$
    result = result.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
      return this.renderBlock(formula);
    });

    // 2. Zpracování řádkové matematiky: $...$
    result = result.replace(/\$([^$]+)\$/g, (match, formula) => {
      return this.renderInlineMath(formula);
    });

    // 3. Bezpečnostní dočištění případných zbloudilých LaTeX značek v běžném textu
    result = this.cleanLatexText(result);

    // 4. Převod konců řádků \n na <br> (pokud nejsou uvnitř blokových elementů)
    result = result.replace(/\n/g, '<br>');

    return result;
  }

  static renderBlock(formula) {
    const cleanFormula = formula.trim();
    if (typeof window !== 'undefined' && window.katex) {
      try {
        return window.katex.renderToString(cleanFormula, {
          displayMode: true,
          throwOnError: false
        });
      } catch (e) {
        // Fallback
      }
    }
    return `<div class="math-display">${this.renderFormula(cleanFormula)}</div>`;
  }

  static renderInlineMath(formula) {
    const cleanFormula = formula.trim();
    if (typeof window !== 'undefined' && window.katex) {
      try {
        return window.katex.renderToString(cleanFormula, {
          displayMode: false,
          throwOnError: false
        });
      } catch (e) {
        // Fallback
      }
    }
    return `<span class="math-block">${this.renderFormula(cleanFormula)}</span>`;
  }

  /**
   * Vestavěný HTML konvertor matematických formulí pro offline / fallback režim
   */
  static renderFormula(formula) {
    let html = formula.trim();

    // Odstranění \left a \right
    html = html.replace(/\\left\s*([(\[{|])/g, '$1')
               .replace(/\\right\s*([)\]}|])/g, '$1');

    // \text{...} -> obyčejný text
    html = html.replace(/\\text\{([^}]+)\}/g, '<span class="math-text">$1</span>');

    // Základní matematické a logické symboly
    html = html
      .replace(/\\implies/g, ' ⇒ ')
      .replace(/\\cdot|\*/g, ' · ')
      .replace(/\\pm/g, ' ± ')
      .replace(/\\approx/g, ' ≈ ')
      .replace(/\\neq/g, ' ≠ ')
      .replace(/\\leq/g, ' ≤ ')
      .replace(/\\geq/g, ' ≥ ')
      .replace(/\\cup/g, ' ∪ ')
      .replace(/\\cap/g, ' ∩ ')
      .replace(/\\degree|\\circ/g, '°')
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\gamma/g, 'γ')
      .replace(/\\delta/g, 'δ')
      .replace(/\\pi/g, 'π')
      .replace(/\\\{/g, '{')
      .replace(/\\\}/g, '}');

    // Odmocniny: \sqrt{...}
    html = html.replace(/\\sqrt\{([^}]+)\}/g, (match, content) => {
      return `<span class="math-sqrt"><span class="math-sqrt-content">${this.renderFormula(content)}</span></span>`;
    });

    // Zlomky: \frac{čitatel}{jmenovatel} (opakovaně pro podporu vnořených zlomků)
    let prev;
    do {
      prev = html;
      html = html.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (match, num, den) => {
        return `<span class="math-fraction"><span class="math-numerator">${this.renderFormula(num)}</span><span class="math-denominator">${this.renderFormula(den)}</span></span>`;
      });
    } while (html !== prev);

    // Jednoduché zlomky typu a/b pokud jsou v závorkách
    html = html.replace(/(\b\w+|\([^)]+\))\s*\/\s*(\b\w+|\([^)]+\))/g, (match, num, den) => {
      const cleanNum = num.replace(/^\((.+)\)$/, '$1');
      const cleanDen = den.replace(/^\((.+)\)$/, '$1');
      return `<span class="math-fraction"><span class="math-numerator">${this.renderFormula(cleanNum)}</span><span class="math-denominator">${this.renderFormula(cleanDen)}</span></span>`;
    });

    // Mocniny: x^{2} nebo x^2
    html = html.replace(/\^\{([^}]+)\}/g, '<span class="math-sup">$1</span>');
    html = html.replace(/\^([0-9a-zA-Z+-]+)/g, '<span class="math-sup">$1</span>');

    // Indexy: x_{1} nebo x_1
    html = html.replace(/_\{([^}]+)\}/g, '<span class="math-sub">$1</span>');
    html = html.replace(/_([0-9a-zA-Z+-]+)/g, '<span class="math-sub">$1</span>');

    // Zvýraznění samostatných algebraických proměnných (např. x, y, a, b, c, K, v)
    html = html.replace(/\b([a-wyzA-Z])\b/g, (match, v) => {
      // Ignorovat HTML tagy nebo entity
      if (['span', 'class', 'math', 'sup', 'sub', 'frac'].includes(v.toLowerCase())) return v;
      return `<span class="math-var">${v}</span>`;
    });

    return html;
  }

  /**
   * Vyčistí LaTeX kód, pokud se ocitl v textu mimo $ značky
   */
  static cleanLatexText(str) {
    return str
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\implies/g, ' ⇒ ')
      .replace(/\\cdot/g, ' · ')
      .replace(/\\pm/g, ' ± ')
      .replace(/\\approx/g, ' ≈ ')
      .replace(/\\neq/g, ' ≠ ')
      .replace(/\\degree|\\circ/g, '°')
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\gamma/g, 'γ')
      .replace(/\\pi/g, 'π')
      .replace(/\\left\s*([(\[{])/g, '$1')
      .replace(/\\right\s*([)\]}])/g, '$1')
      .replace(/\\\{/g, '{')
      .replace(/\\\}/g, '}');
  }
}
