/**
   ==========================================================================
   MATEMATICKÁ ÚNIKOVÁ HRA: PROJEKT CHRONOS - KOMPLETNÍ BUNDLE PRO LOKÁLNÍ SPUŠTĚNÍ
   Nevyžaduje žádný server ani buildovací nástroj - funguje přímo přes protokol file://
   ==========================================================================
*/

(function() {
  'use strict';

  // =========================================================================
  // 1. ZVUKOVÝ SYNTEZÁTOR (Web Audio API)
  // =========================================================================
  class SoundEffects {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleSound() {
      this.enabled = !this.enabled;
      return this.enabled;
    }

    playKeypadBeep(freq = 520) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      } catch (e) { console.warn(e); }
    }

    playSuccess() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0, now + idx * 0.07);
          gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.07 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.35);
        });
      } catch (e) { console.warn(e); }
    }

    playError() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } catch (e) { console.warn(e); }
    }

    playUnlockRoom() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const chords = [523.25, 659.25, 783.99, 1046.50];
        chords.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
          gain.gain.setValueAtTime(0.18, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.8);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.8);
        });
      } catch (e) { console.warn(e); }
    }

    playHint() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(740, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } catch (e) { console.warn(e); }
    }

    playVictory() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const melody = [
          { f: 523.25, d: 0.15 },
          { f: 659.25, d: 0.15 },
          { f: 783.99, d: 0.15 },
          { f: 1046.50, d: 0.4 },
          { f: 880.00, d: 0.2 },
          { f: 1046.50, d: 0.6 }
        ];
        let cur = now;
        melody.forEach(note => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(note.f, cur);
          gain.gain.setValueAtTime(0.18, cur);
          gain.gain.exponentialRampToValueAtTime(0.001, cur + note.d);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(cur);
          osc.stop(cur + note.d);
          cur += note.d + 0.04;
        });
      } catch (e) { console.warn(e); }
    }
  }

  const sound = new SoundEffects();

  // =========================================================================
  // 2. SÉMANTICKÝ MATEMATICKÝ RENDERER
  // =========================================================================
  class MathRenderer {
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

      // 3. Bezpečnostní dočištění zbloudilých LaTeX značek v běžném textu
      result = this.cleanLatexText(result);

      // 4. Převod konců řádků na <br>
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
        } catch (e) {}
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
        } catch (e) {}
      }
      return `<span class="math-block">${this.renderFormula(cleanFormula)}</span>`;
    }

    static renderFormula(formula) {
      let html = formula.trim();

      // Odstranění \left a \right
      html = html.replace(/\\left\s*([(\[{|])/g, '$1')
                 .replace(/\\right\s*([)\]}|])/g, '$1');

      // \text{...} -> běžný text
      html = html.replace(/\\text\{([^}]+)\}/g, '<span class="math-text">$1</span>');

      // Matematické a řecké symboly
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

      // Zlomky: \frac{čitatel}{jmenovatel} (rekurzivně pro vnořené zlomky)
      let prev;
      do {
        prev = html;
        html = html.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (match, num, den) => {
          return `<span class="math-fraction"><span class="math-numerator">${this.renderFormula(num)}</span><span class="math-denominator">${this.renderFormula(den)}</span></span>`;
        });
      } while (html !== prev);

      // Jednoduché zlomky v závorkách: (a)/(b)
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

      // Algebraické proměnné
      html = html.replace(/\b([a-wyzA-Z])\b/g, (match, v) => {
        if (['span', 'class', 'math', 'sup', 'sub', 'frac'].includes(v.toLowerCase())) return v;
        return `<span class="math-var">${v}</span>`;
      });

      return html;
    }

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

  // =========================================================================
  // 3. CURRICULUM & HODNOSTI
  // =========================================================================
  const CURRICULUM_DATA = {
    rooms: [
      {
        id: 1,
        title: 'Vstupní archiv',
        subtitle: 'Číslo a proměnná: Aritmetika, zlomky a celá čísla',
        theme: 'cyan',
        description: 'Základní energetická komora archivu. Odemčení vyžaduje zvládnutí operací se zlomky, zápornými čísly a prioritou matematických operací.',
        cermatFocus: 'Úlohy 1 a 2 z testů CERMAT'
      },
      {
        id: 2,
        title: 'Kódovací krypta',
        subtitle: 'Algebraické výrazy a lineární rovnice',
        theme: 'indigo',
        description: 'Centrální dešifrovací sál. Pro aktivaci systémových relé je nutné zjednodušit algebraické výrazy a vyřešit rovnice.',
        cermatFocus: 'Úlohy 3 a 4 z testů CERMAT'
      },
      {
        id: 3,
        title: 'Laboratoř proporcí',
        subtitle: 'Poměry, procenta a úměrnost',
        theme: 'amber',
        description: 'Alchymistický sektor pro syntézu krystalů. Správné směsi vyžadují přesné výpočty procent, měřítka a přímé i nepřímé úměrnosti.',
        cermatFocus: 'Úlohy 5, 7 a 8 z testů CERMAT'
      },
      {
        id: 4,
        title: 'Geometrická observatoř',
        subtitle: 'Planimetrie, stereometrie a Pythagorova věta',
        theme: 'emerald',
        description: 'Hvězdná observatoř pro zaměření časoprostorových souřadnic. Správné nastavení teleskopu závisí na výpočtech obsahů, obvodů, úhlů a délek.',
        cermatFocus: 'Úlohy 9, 10 a 11 z testů CERMAT'
      },
      {
        id: 5,
        title: 'Komora logiky a dat',
        subtitle: 'Číselné řady, kombinatorika a analýza diagramů',
        theme: 'purple',
        description: 'Kryptografický sál plný záhadných run. Zde se testuje schopnost odhalit zákonitosti v řadách, logicky dedukovat a kombinovat data.',
        cermatFocus: 'Úlohy 6 a 15 z testů CERMAT'
      },
      {
        id: 6,
        title: 'Finální řídicí sál',
        subtitle: 'Syntéza: Komplexní přijímačkové úlohy',
        theme: 'rose',
        description: 'Hlavní reaktor CHRONOS. Odemčení časového portálu vyžaduje vyřešení komplexních vícestupňových úloh kombinujících geometrii, algebru a reálný kontext.',
        cermatFocus: 'Úloha 16 z testů CERMAT'
      }
    ],

    ranks: [
      {
        id: 'platinum',
        name: 'Platinový mistr matematiky',
        minPct: 92,
        icon: '💎',
        color: '#e0e7ff',
        description: 'Excelentní výsledek! Tvoje znalosti převyšují požadavky přijímacích zkoušek a máš mimořádný předpoklad pro studium na prestižních gymnáziích.'
      },
      {
        id: 'gold',
        name: 'Zlatý počtář & stratég',
        minPct: 80,
        icon: '🥇',
        color: '#fbbf24',
        description: 'Výborný výkon! Zvládáš většinu typických i náročnějších úloh jednotných přijímaček s přehledem a minimem chyb.'
      },
      {
        id: 'silver',
        name: 'Stříbrný badatel',
        minPct: 60,
        icon: '🥈',
        color: '#94a3b8',
        description: 'Dobrý solidní základ. Většinu standardních úloh zvládáš, stačí ještě trochu docvičit problematické oblasti.'
      },
      {
        id: 'bronze',
        name: 'Matematický učeň',
        minPct: 0,
        icon: '🥉',
        color: '#d97706',
        description: 'Základní průchod archivem dokončen. Doporučujeme věnovat zvýšenou pozornost systematickému procvičování zlomků, rovnic a vzorců.'
      }
    ]
  };

  // =========================================================================
  // 4. DATABÁZE ÚLOH
  // =========================================================================
  const TASKS_DATABASE = {
    1: {
      easy: [
        {
          id: 'r1_e1',
          title: 'Fragment 1: Operace se zlomky',
          prompt: 'Vypočítejte a výsledek zapište v základním tvaru jako celé číslo nebo zlomek ve tvaru a/b:\n$$\\frac{3}{5} + \\frac{4}{5} - \\frac{2}{5}$$',
          answer: '1',
          acceptedAnswers: ['1', '5/5', '1.0', '1,0'],
          codeFragment: '4',
          hint1: 'Zlomky mají stejného jmenovatele (5). Stačí sečíst a odečíst čitatele: $3 + 4 - 2$.',
          hint2: 'Dostanete zlomek $5/5$. Nezapomeňte výsledek zkrátit na celé číslo.',
          misconceptions: {
            '5/15': 'Pozor! Při sčítání a odčítání zlomků se jmenovatelé NESČÍTAJÍ, jmenovatel zůstává 5.',
            '9/5': 'Zkontroluj znaménka: k 3/5 přičítáme 4/5 a následně ODEČÍTÁME 2/5.'
          },
          solution: ['Zlomky mají stejného jmenovatele: $\\frac{3+4-2}{5}$', 'V čitateli spočítáme: $3 + 4 - 2 = 5$', 'Výsledný zlomek $\\frac{5}{5} = 1$']
        },
        {
          id: 'r1_e2',
          title: 'Fragment 2: Záporná čísla a priority',
          prompt: 'Vypočítejte hodnotu výrazu:\n$$15 - 3 \\cdot (-4) + (-8)$$',
          answer: '19',
          acceptedAnswers: ['19'],
          codeFragment: '7',
          hint1: 'Pozor na přednost početních operací: násobení má vždy přednost před sčítáním a odčítáním!',
          hint2: 'Nejprve spočítejte $-3 \\cdot (-4) = +12$. Poté sečtěte $15 + 12 - 8$.',
          misconceptions: {
            '-56': 'Chyba v prioritě operací! Nelze nejprve odečíst $15 - 3 = 12$. Násobení má přednost!',
            '-5': 'Pozor na násobení dvou záporných čísel: záporné číslo krát záporné číslo dává kladný výsledek ($-3 \\cdot (-4) = +12$).'
          },
          solution: ['Násobení má přednost: $-3 \\cdot (-4) = +12$', 'Dosadíme do výrazu: $15 + 12 + (-8)$', 'Postupně sečteme: $27 - 8 = 19$']
        },
        {
          id: 'r1_e3',
          title: 'Fragment 3: Násobení a dělení zlomků',
          prompt: 'Vypočítejte a zapište v základním tvaru:\n$$\\frac{2}{3} : \\frac{4}{9}$$',
          answer: '3/2',
          acceptedAnswers: ['3/2', '1.5', '1,5'],
          codeFragment: '2',
          hint1: 'Dělení zlomkem nahradíme násobením převráceným zlomkem: $\\frac{2}{3} \\cdot \\frac{9}{4}$.',
          hint2: 'Před samotným násobením zkraťte do kříže: 2 se 4 a 9 se 3.',
          misconceptions: {
            '8/27': 'Pozor! Při dělení zlomků musíte druhý zlomek obrátit (vytvořit převrácený zlomek 9/4), nenásobte přímo.'
          },
          solution: ['Dělení převedeme na násobení převráceným zlomkem: $\\frac{2}{3} \\cdot \\frac{9}{4}$', 'Zkrátíme do kříže: $\\frac{1 \\cdot 3}{1 \\cdot 2}$', 'Výsledek je $\\frac{3}{2}$']
        }
      ],
      medium: [
        {
          id: 'r1_m1',
          title: 'Fragment 1: Kombinovaný zlomkový výraz',
          prompt: 'Vypočítejte a výsledek zapište jako zkrácený zlomek nebo celé číslo:\n$$\\frac{3}{4} - \\frac{2}{3} \\cdot \\frac{9}{8}$$',
          answer: '0',
          acceptedAnswers: ['0', '0/1', '0/4'],
          codeFragment: '5',
          hint1: 'Nejprve proveďte násobení $\\frac{2}{3} \\cdot \\frac{9}{8}$ se zkrácením do kříže.',
          hint2: 'Součin vyjde $\\frac{3}{4}$. Následně spočítejte $\\frac{3}{4} - \\frac{3}{4}$.',
          misconceptions: {
            '3/32': 'Chyba v prioritě operací! Nelze nejprve odečítat $3/4 - 2/3$. Násobení má přednost.'
          },
          solution: ['Násobení: $\\frac{2}{3} \\cdot \\frac{9}{8} = \\frac{1 \\cdot 3}{1 \\cdot 4} = \\frac{3}{4}$', 'Rozdíl: $\\frac{3}{4} - \\frac{3}{4} = 0$']
        },
        {
          id: 'r1_m2',
          title: 'Fragment 2: Složený zlomek',
          prompt: 'Vypočítejte hodnotu složeného zlomku a zapište v základním tvaru (např. 2/5 nebo 0.4):\n$$\\frac{\\frac{5}{6} - \\frac{1}{2}}{\\frac{2}{3} + \\frac{1}{6}}$$',
          answer: '2/5',
          acceptedAnswers: ['2/5', '0.4', '0,4'],
          codeFragment: '8',
          hint1: 'Nejprve upravte čitatele (společný jmenovatel 6) a jmenovatele (společný jmenovatel 6).',
          hint2: 'Čitatel: $\\frac{5-3}{6} = \\frac{2}{6} = \\frac{1}{3}$. Jmenovatel: $\\frac{4+1}{6} = \\frac{5}{6}$. Poté spočítejte $\\frac{1}{3} : \\frac{5}{6}$.',
          misconceptions: {
            '5/2': 'Obrácený výsledek! Dělíte čitatele jmenovatelem, tedy $(1/3) : (5/6) = (1/3) \\cdot (6/5)$.'
          },
          solution: ['Čitatel: $\\frac{5}{6} - \\frac{3}{6} = \\frac{2}{6} = \\frac{1}{3}$', 'Jmenovatel: $\\frac{4}{6} + \\frac{1}{6} = \\frac{5}{6}$', 'Dělení: $\\frac{1}{3} \\cdot \\frac{6}{5} = \\frac{2}{5}$']
        },
        {
          id: 'r1_m3',
          title: 'Fragment 3: Priorita operací a záporná čísla',
          prompt: 'Vypočítejte celočíselný výsledek:\n$$(-3)^2 - 4 \\cdot (-2) + (-12) : (-3)$$',
          answer: '21',
          acceptedAnswers: ['21'],
          codeFragment: '3',
          hint1: 'Pozor: $(-3)^2 = (-3) \\cdot (-3) = +9$. Záporné číslo na sudou mocninu je kladné.',
          hint2: 'Dále: $-4 \\cdot (-2) = +8$ a $(-12) : (-3) = +4$. Nakonec vše sečtěte.',
          misconceptions: {
            '3': 'Pozor na znaménka! $(-3)^2$ je $+9$, nikoliv $-9$.'
          },
          solution: ['Umocnění: $(-3)^2 = 9$', 'Součiny a podíly: $-4 \\cdot (-2) = 8$ a $(-12):(-3) = 4$', 'Součet: $9 + 8 + 4 = 21$']
        }
      ],
      hard: [
        {
          id: 'r1_h1',
          title: 'Fragment 1: Složitý zlomkový výraz',
          prompt: 'Vypočítejte a zapište v základním tvaru:\n$$\\left( 2 - \\frac{5}{3} \\right)^2 : \\left( \\frac{1}{6} - \\frac{1}{4} \\right)$$',
          answer: '-4/3',
          acceptedAnswers: ['-4/3', '-1.33', '-1,33'],
          codeFragment: '9',
          hint1: 'První závorka: $2 - 5/3 = 1/3$. Po umocnění $1/9$.',
          hint2: 'Druhá závorka: $1/6 - 1/4 = -1/12$. Vydělte: $1/9 : (-1/12)$.',
          solution: ['První závorka: $(1/3)^2 = 1/9$', 'Druhá závorka: $-1/12$', 'Dělení: $(1/9) \\cdot (-12/1) = -4/3$']
        },
        {
          id: 'r1_h2',
          title: 'Fragment 2: Desetinná čísla a zlomky',
          prompt: 'Vypočítejte a zapište v základním tvaru:\n$$\\frac{0{,}4 \\cdot \\frac{5}{2} - 1{,}5}{0{,}25 + \\frac{3}{4} \\cdot 0{,}5}$$',
          answer: '-4/5',
          acceptedAnswers: ['-4/5', '-0.8', '-0,8'],
          codeFragment: '6',
          hint1: 'Čitatel: $0{,}4 \\cdot 2{,}5 - 1{,}5 = 1 - 1{,}5 = -0{,}5 = -1/2$.',
          hint2: 'Jmenovatel: $1/4 + 3/8 = 5/8$. Dělte $(-1/2) : (5/8)$.',
          solution: ['Čitatel: $-1/2$', 'Jmenovatel: $5/8$', 'Výsledek: $(-1/2) \\cdot (8/5) = -4/5$']
        },
        {
          id: 'r1_h3',
          title: 'Fragment 3: Absolutní hodnoty a odmocniny',
          prompt: 'Vypočítejte celočíselnou hodnotu:\n$$\\sqrt{144} - 3 \\cdot |2 - 7| + (-2)^3$$',
          answer: '-11',
          acceptedAnswers: ['-11'],
          codeFragment: '1',
          hint1: '$\\sqrt{144} = 12$, $|2 - 7| = 5$, $(-2)^3 = -8$.',
          hint2: '$12 - 3 \\cdot 5 + (-8) = 12 - 15 - 8$.',
          solution: ['Hodnoty: $12 - 15 - 8 = -11$']
        }
      ]
    },

    2: {
      easy: [
        {
          id: 'r2_e1',
          title: 'Relé 1: Zjednodušení výrazu',
          prompt: 'Zjednodušte výraz a určete jeho hodnotu pro $x = 3$:\n$$4(2x - 1) - 3(x + 2)$$',
          answer: '5',
          acceptedAnswers: ['5'],
          codeFragment: '6',
          hint1: 'Roznásobte závorky: $8x - 4 - 3x - 6 = 5x - 10$.',
          hint2: 'Dosaďte $x = 3$: $5(3) - 10 = 5$.',
          solution: ['Úprava: $5x - 10$', 'Dosazení $x = 3$: $15 - 10 = 5$']
        },
        {
          id: 'r2_e2',
          title: 'Relé 2: Lineární rovnice',
          prompt: 'Vyřešte rovnici a zadejte $x$:\n$$3x + 7 = 5x - 9$$',
          answer: '8',
          acceptedAnswers: ['8'],
          codeFragment: '1',
          hint1: 'Převeďte členy: $7 + 9 = 5x - 3x \\implies 16 = 2x$.',
          hint2: 'Vydělte 2: $x = 8$.',
          solution: ['Úprava: $16 = 2x \\implies x = 8$']
        },
        {
          id: 'r2_e3',
          title: 'Relé 3: Vzorec (a+b)²',
          prompt: 'Umocněte podle vzorce $(3a + 2)^2$. Jaký je koeficient u členu $a$?',
          answer: '12',
          acceptedAnswers: ['12'],
          codeFragment: '9',
          hint1: 'Prostřední člen je $2 \\cdot (3a) \\cdot 2 = 12a$.',
          hint2: 'Koeficient je číslo před $a$, tedy 12.',
          solution: ['Rozvoj: $9a^2 + 12a + 4$', 'Koeficient u $a$ je 12.']
        }
      ],
      medium: [
        {
          id: 'r2_m1',
          title: 'Relé 1: Algebraické vzorce',
          prompt: 'Zjednodušte výraz a určete jeho hodnotu pro $x = 2$:\n$$(2x - 3)^2 - (2x + 1)(2x - 1)$$',
          answer: '-14',
          acceptedAnswers: ['-14'],
          codeFragment: '4',
          hint1: '$(2x-3)^2 = 4x^2 - 12x + 9$ a $(2x+1)(2x-1) = 4x^2 - 1$.',
          hint2: 'Rozdíl: $-12x + 10$. Pro $x = 2$: $-12(2) + 10 = -14$.',
          solution: ['Rozvoj: $(4x^2 - 12x + 9) - (4x^2 - 1) = -12x + 10$', 'Dosazení: $-24 + 10 = -14$']
        },
        {
          id: 'r2_m2',
          title: 'Relé 2: Rovnice se zlomky',
          prompt: 'Vyřešte rovnici a určete $x$:\n$$\\frac{x - 1}{3} - \\frac{x + 2}{4} = 1$$',
          answer: '22',
          acceptedAnswers: ['22'],
          codeFragment: '7',
          hint1: 'Vynásobte celou rovnici 12: $4(x - 1) - 3(x + 2) = 12$.',
          hint2: '$4x - 4 - 3x - 6 = 12 \\implies x - 10 = 12 \\implies x = 22$.',
          solution: ['Vynásobení 12: $4(x - 1) - 3(x + 2) = 12$', 'Úprava: $x - 10 = 12 \\implies x = 22$']
        },
        {
          id: 'r2_m3',
          title: 'Relé 3: Vyjádření neznámé',
          prompt: 'Ze vzorce $V = \\frac{1}{3} S_p v$ vypočítejte $v$ (v cm), je-li $V = 120\\text{ cm}^3$ a $S_p = 36\\text{ cm}^2$.',
          answer: '10',
          acceptedAnswers: ['10', '10 cm'],
          codeFragment: '2',
          hint1: '$v = \\frac{3V}{S_p}$.',
          hint2: '$v = \\frac{3 \\cdot 120}{36} = \\frac{360}{36} = 10$.',
          solution: ['$v = 360 / 36 = 10\\text{ cm}$']
        }
      ],
      hard: [
        {
          id: 'r2_h1',
          title: 'Relé 1: Neznámá ve jmenovateli',
          prompt: 'Vyřešte rovnici a zadejte $y$:\n$$\\frac{3y + 2}{y - 1} = 5$$',
          answer: '3.5',
          acceptedAnswers: ['3.5', '3,5', '7/2'],
          codeFragment: '8',
          hint1: '$3y + 2 = 5(y - 1) = 5y - 5$.',
          hint2: '$7 = 2y \\implies y = 3{,}5$.',
          solution: ['$3y + 2 = 5y - 5 \\implies 2y = 7 \\implies y = 3{,}5$']
        },
        {
          id: 'r2_h2',
          title: 'Relé 2: Lomený výraz',
          prompt: 'Zjednodušte lomený výraz a určete jeho hodnotu pro $a = 7$:\n$$\\frac{a^2 - 9}{2a + 6}$$',
          answer: '2',
          acceptedAnswers: ['2'],
          codeFragment: '3',
          hint1: '$\\frac{(a-3)(a+3)}{2(a+3)} = \\frac{a-3}{2}$.',
          hint2: 'Pro $a = 7$: $\\frac{7-3}{2} = 2$.',
          solution: ['Zkrácení: $\\frac{a-3}{2}$', 'Dosazení: $4/2 = 2$']
        },
        {
          id: 'r2_h3',
          title: 'Relé 3: Slovní úloha',
          prompt: 'Myslím si číslo. Když k jeho trojnásobku přičtu 14 a výsledek vydělím 2, dostanu o 5 více než původní číslo. Jaké číslo si myslím?',
          answer: '4',
          acceptedAnswers: ['4', '-4'],
          codeFragment: '5',
          hint1: 'Rovnice: $\\frac{3x + 14}{2} = x + 5$.',
          hint2: '$3x + 14 = 2x + 10$.',
          solution: ['Rovnice: $3x + 14 = 2x + 18 \\implies x = 4$']
        }
      ]
    },

    3: {
      easy: [
        {
          id: 'r3_e1',
          title: 'Krystal 1: Výpočet slevy',
          prompt: 'Vstupné stojí 450 Kč. Žák má slevu 20 %. Kolik Kč zaplatí po slevě?',
          answer: '360',
          acceptedAnswers: ['360', '360 Kč'],
          codeFragment: '3',
          hint1: 'Sleva 20 % z 450 Kč je 90 Kč ($450 \\cdot 0{,}20$).',
          hint2: 'Cena po slevě: $450 - 90 = 360\\text{ Kč}$.',
          solution: ['Sleva: $90\\text{ Kč}$', 'Cena: $360\\text{ Kč}$']
        },
        {
          id: 'r3_e2',
          title: 'Krystal 2: Dělení v poměru',
          prompt: 'Krystal o hmotnosti 35 g byl rozdělen v poměru $2 : 3$. Kolik g váží těžší část?',
          answer: '21',
          acceptedAnswers: ['21', '21 g'],
          codeFragment: '8',
          hint1: '1 díl: $35 : 5 = 7\\text{ g}$.',
          hint2: 'Těžší část (3 díly): $3 \\cdot 7 = 21\\text{ g}$.',
          solution: ['1 díl = 7 g', 'Těžší část = 21 g']
        },
        {
          id: 'r3_e3',
          title: 'Krystal 3: Přímá úměrnost',
          prompt: 'Na 4 články je potřeba 18 g prachu. Kolik g prachu je potřeba na 10 článků?',
          answer: '45',
          acceptedAnswers: ['45', '45 g'],
          codeFragment: '1',
          hint1: '1 článek = $18 : 4 = 4{,}5\\text{ g}$.',
          hint2: '10 článků = $10 \\cdot 4{,}5 = 45\\text{ g}$.',
          solution: ['$10 \\cdot 4{,}5 = 45\\text{ g}$']
        }
      ],
      medium: [
        {
          id: 'r3_m1',
          title: 'Krystal 1: Postupné změny cen',
          prompt: 'Přístroj stál 1 200 Kč. Byl zlevněn o 20 % a poté zdražen o 10 %. Kolik Kč stojí nyní?',
          answer: '1056',
          acceptedAnswers: ['1056', '1056 Kč'],
          codeFragment: '6',
          hint1: 'Po slevě: $1200 \\cdot 0{,}8 = 960\\text{ Kč}$.',
          hint2: 'Nové zdražení: $960 \\cdot 1{,}1 = 1056\\text{ Kč}$.',
          solution: ['Sleva 20 %: 960 Kč', 'Zdražení 10 %: 1 056 Kč']
        },
        {
          id: 'r3_m2',
          title: 'Krystal 2: Tři díly v poměru',
          prompt: 'Odměna 7 200 Kč je rozdělena v poměru $2 : 3 : 4$. Kolik Kč má nejvyšší podíl?',
          answer: '3200',
          acceptedAnswers: ['3200', '3200 Kč'],
          codeFragment: '9',
          hint1: 'Celkem 9 dílů $\\implies 1\\text{ díl} = 7200 : 9 = 800\\text{ Kč}$.',
          hint2: 'Nejvyšší podíl (4 díly): $4 \\cdot 800 = 3200\\text{ Kč}$.',
          solution: ['1 díl = 800 Kč', '4 díly = 3 200 Kč']
        },
        {
          id: 'r3_m3',
          title: 'Krystal 3: Měřítko mapy',
          prompt: 'Měřítko je $1 : 50\\,000$. Vzdálenost na mapě je $6\\text{ cm}$. Kolik km je to ve skutečnosti?',
          answer: '3',
          acceptedAnswers: ['3', '3 km', '3.0', '3,0'],
          codeFragment: '2',
          hint1: '$6 \\cdot 50\\,000 = 300\\,000\\text{ cm}$.',
          hint2: '$300\\,000\\text{ cm} = 3\\,000\\text{ m} = 3\\text{ km}$.',
          solution: ['Převod: 300 000 cm = 3 km']
        }
      ],
      hard: [
        {
          id: 'r3_h1',
          title: 'Krystal 1: Koncentrace směsí',
          prompt: 'Kolik litrů vody přilít do 6 l $40\\%$ roztoku, aby vznikl $15\\%$ roztok?',
          answer: '10',
          acceptedAnswers: ['10', '10 l', '10 litrů'],
          codeFragment: '7',
          hint1: 'Čistá složka: $6 \\cdot 0{,}4 = 2{,}4\\text{ l}$.',
          hint2: '$2{,}4 / (6 + x) = 0{,}15 \\implies 6 + x = 16 \\implies x = 10$.',
          solution: ['Voda: 10 litrů']
        },
        {
          id: 'r3_h2',
          title: 'Krystal 2: Společná práce',
          prompt: 'První čerpadlo naplní nádrž za 12 h, druhé za 6 h. Za kolik hodin naplní nádrž společně?',
          answer: '4',
          acceptedAnswers: ['4', '4 h', '4 hodiny'],
          codeFragment: '1',
          hint1: 'Za 1 h: $1/12 + 1/6 = 3/12 = 1/4$ nádrže.',
          hint2: 'Celkový čas: $1 : (1/4) = 4\\text{ hodiny}$.',
          solution: ['Společně: 4 hodiny']
        },
        {
          id: 'r3_h3',
          title: 'Krystal 3: Obrácená procenta',
          prompt: 'Prodejní cena 2 760 Kč zahrnuje zisk $15\\%$ z nákupní ceny. Jaká byla nákupní cena v Kč?',
          answer: '2400',
          acceptedAnswers: ['2400', '2400 Kč'],
          codeFragment: '4',
          hint1: '2 760 Kč odpovídá 115 %.',
          hint2: '$2760 : 1{,}15 = 2400\\text{ Kč}$.',
          solution: ['Nákupní cena: 2 400 Kč']
        }
      ]
    },

    4: {
      easy: [
        {
          id: 'r4_e1',
          title: 'Objektiv 1: Odvěsna trojúhelníku',
          prompt: 'V pravoúhlém trojúhelníku je $c = 10\\text{ cm}$ a $a = 6\\text{ cm}$. Jaká je délka $b$ v cm?',
          answer: '8',
          acceptedAnswers: ['8', '8 cm'],
          codeFragment: '5',
          hint1: '$b = \\sqrt{c^2 - a^2} = \\sqrt{100 - 36}$.',
          hint2: '$\\sqrt{64} = 8\\text{ cm}$.',
          solution: ['$b = 8\\text{ cm}$']
        },
        {
          id: 'r4_e2',
          title: 'Objektiv 2: Obsah trojúhelníku',
          prompt: 'Vypočítejte obsah pravoúhlého trojúhelníku s odvěsnami $8\\text{ cm}$ a $15\\text{ cm}$ v $\\text{cm}^2$.',
          answer: '60',
          acceptedAnswers: ['60', '60 cm2', '60 cm^2'],
          codeFragment: '2',
          hint1: '$S = (a \\cdot b) / 2$.',
          hint2: '$(8 \\cdot 15) / 2 = 120 / 2 = 60$.',
          solution: ['$S = 60\\text{ cm}^2$']
        },
        {
          id: 'r4_e3',
          title: 'Objektiv 3: Vnitřní úhly',
          prompt: 'V trojúhelníku jsou úhly $\\alpha = 48^\\circ$ a $\\beta = 72^\\circ$. Jakou velikost má úhel $\\gamma$ ve stupních?',
          answer: '60',
          acceptedAnswers: ['60', '60°', '60 stupňů'],
          codeFragment: '7',
          hint1: 'Součet úhlů je $180^\\circ$.',
          hint2: '$\\gamma = 180^\\circ - 120^\\circ = 60^\\circ$.',
          solution: ['$\\gamma = 60^\\circ$']
        }
      ],
      medium: [
        {
          id: 'r4_m1',
          title: 'Objektiv 1: Pythagorova věta a obsah',
          prompt: 'V pravoúhlém trojúhelníku je $a = 12\\text{ cm}$ a $c = 13\\text{ cm}$. Vypočítejte obsah v $\\text{cm}^2$.',
          answer: '30',
          acceptedAnswers: ['30', '30 cm2', '30 cm^2'],
          codeFragment: '1',
          hint1: '$b = \\sqrt{13^2 - 12^2} = \\sqrt{25} = 5\\text{ cm}$.',
          hint2: '$S = (12 \\cdot 5) / 2 = 30\\text{ cm}^2$.',
          solution: ['Odvěsna $b = 5\\text{ cm}$', 'Obsah $S = 30\\text{ cm}^2$']
        },
        {
          id: 'r4_m2',
          title: 'Objektiv 2: Rovnoramenný lichoběžník',
          prompt: 'Lichoběžník má základny $a = 16\\text{ cm}$, $c = 6\\text{ cm}$ a rameno $b = 13\\text{ cm}$. Vypočítejte obsah v $\\text{cm}^2$.',
          answer: '132',
          acceptedAnswers: ['132', '132 cm2', '132 cm^2'],
          codeFragment: '4',
          hint1: '$x = (16 - 6) / 2 = 5\\text{ cm} \\implies v = \\sqrt{13^2 - 5^2} = 12\\text{ cm}$.',
          hint2: '$S = \\frac{16 + 6}{2} \\cdot 12 = 11 \\cdot 12 = 132\\text{ cm}^2$.',
          solution: ['Výška $v = 12\\text{ cm}$', 'Obsah $S = 132\\text{ cm}^2$']
        },
        {
          id: 'r4_m3',
          title: 'Objektiv 3: Úhly v rovnoramenném trojúhelníku',
          prompt: 'V rovnoramenném trojúhelníku je úhel při základně $\\alpha = 55^\\circ$. Jaký je úhel $\\gamma$ při hlavním vrcholu?',
          answer: '70',
          acceptedAnswers: ['70', '70°', '70 stupňů'],
          codeFragment: '8',
          hint1: 'Úhly při základně: $55^\\circ + 55^\\circ = 110^\\circ$.',
          hint2: '$\\gamma = 180^\\circ - 110^\\circ = 70^\\circ$.',
          solution: ['$\\gamma = 70^\\circ$']
        }
      ],
      hard: [
        {
          id: 'r4_h1',
          title: 'Objektiv 1: Tělesová úhlopříčka kvádru',
          prompt: 'Kvádr má rozměry $a = 6\\text{ cm}$, $b = 8\\text{ cm}$, $c = 24\\text{ cm}$. Jaká je délka tělesové úhlopříčky v cm?',
          answer: '26',
          acceptedAnswers: ['26', '26 cm'],
          codeFragment: '9',
          hint1: '$u = \\sqrt{a^2 + b^2 + c^2} = \\sqrt{36 + 64 + 576}$.',
          hint2: '$\\sqrt{676} = 26\\text{ cm}$.',
          solution: ['$u = 26\\text{ cm}$']
        },
        {
          id: 'r4_h2',
          title: 'Objektiv 2: Čtverec a vepsaný kruh',
          prompt: 'Čtverec má stranu $a = 20\\text{ cm}$, vepsaný kruh poloměr $r = 10\\text{ cm}$. O kolik $\\text{cm}^2$ je čtverec větší než kruh? ($\\pi = 3{,}14$).',
          answer: '86',
          acceptedAnswers: ['86', '86 cm2', '86 cm^2', '85.84'],
          codeFragment: '3',
          hint1: '$S_{ctverec} = 400\\text{ cm}^2$, $S_{kruh} = 3{,}14 \\cdot 100 = 314\\text{ cm}^2$.',
          hint2: '$400 - 314 = 86\\text{ cm}^2$.',
          solution: ['Rozdíl: $86\\text{ cm}^2$']
        },
        {
          id: 'r4_h3',
          title: 'Objektiv 3: Objem jehlanu',
          prompt: 'Pravidelný čtyřboký jehlan má $a = 10\\text{ cm}$ a výšku $v = 12\\text{ cm}$. Jaký je jeho objem v $\\text{cm}^3$?',
          answer: '400',
          acceptedAnswers: ['400', '400 cm3', '400 cm^3'],
          codeFragment: '6',
          hint1: '$V = \\frac{1}{3} a^2 v$.',
          hint2: '$V = \\frac{1}{3} \\cdot 100 \\cdot 12 = 400\\text{ cm}^3$.',
          solution: ['$V = 400\\text{ cm}^3$']
        }
      ]
    },

    5: {
      easy: [
        {
          id: 'r5_e1',
          title: 'Runa 1: Posloupnost',
          prompt: 'Doplňte číslo v řadě:\n$$3, 7, 11, 15, 19, \\boldsymbol{?}$$',
          answer: '23',
          acceptedAnswers: ['23'],
          codeFragment: '7',
          hint1: 'Rozdíl je $+4$.',
          hint2: '$19 + 4 = 23$.',
          solution: ['Pravidlo $+4 \\implies 23$']
        },
        {
          id: 'r5_e2',
          title: 'Runa 2: Kombinatorika menu',
          prompt: 'Na výběr jsou 3 polévky, 4 hlavní jídla a 2 nápoje. Kolik různých obědových menu lze sestavit?',
          answer: '24',
          acceptedAnswers: ['24'],
          codeFragment: '2',
          hint1: 'Pravidlo součinu: $3 \\cdot 4 \\cdot 2$.',
          hint2: '$12 \\cdot 2 = 24$.',
          solution: ['Počet: 24 menu']
        },
        {
          id: 'r5_e3',
          title: 'Runa 3: Průměr z tabulky',
          prompt: 'Body ze 4 testů jsou 14, 18, 12, 16. Jaký je průměrný počet bodů?',
          answer: '15',
          acceptedAnswers: ['15', '15.0', '15,0'],
          codeFragment: '9',
          hint1: 'Součet: $14 + 18 + 12 + 16 = 60$.',
          hint2: 'Průměr: $60 : 4 = 15$.',
          solution: ['Průměr: 15']
        }
      ],
      medium: [
        {
          id: 'r5_m1',
          title: 'Runa 1: Nelineární posloupnost',
          prompt: 'Doplňte číslo v řadě:\n$$2, 5, 11, 23, 47, \\boldsymbol{?}$$',
          answer: '95',
          acceptedAnswers: ['95'],
          codeFragment: '8',
          hint1: 'Pravidlo: $2a + 1$ (nebo rozdíly $+3, +6, +12, +24, +48$).',
          hint2: '$47 \\cdot 2 + 1 = 95$.',
          solution: ['$47 \\cdot 2 + 1 = 95$']
        },
        {
          id: 'r5_m2',
          title: 'Runa 2: Čísla z cifer',
          prompt: 'Kolik trojciferných čísel větších než 400 lze sestavit z cifer $\\{1, 3, 5, 7, 9\\}$ bez opakování?',
          answer: '36',
          acceptedAnswers: ['36'],
          codeFragment: '5',
          hint1: 'Stovky: 3 možnosti (5, 7, 9). Desítky: 4 možnosti. Jednotky: 3 možnosti.',
          hint2: '$3 \\cdot 4 \\cdot 3 = 36$.',
          solution: ['Celkem: 36 čísel']
        },
        {
          id: 'r5_m3',
          title: 'Runa 3: Vennův diagram',
          prompt: 'Ve třídě je 28 žáků. 18 hraje fotbal, 14 florbal, 4 nehrají nic. Kolik žáků hraje oba sporty?',
          answer: '8',
          acceptedAnswers: ['8'],
          codeFragment: '1',
          hint1: 'Alespoň jeden sport: $28 - 4 = 24$.',
          hint2: 'Oba sporty: $18 + 14 - 24 = 8$.',
          solution: ['Průnik: 8 žáků']
        }
      ],
      hard: [
        {
          id: 'r5_h1',
          title: 'Runa 1: Počet teček v obrazci',
          prompt: 'Počty teček: 5, 9, 13, 17... Kolik teček bude ve 20. obrazci?',
          answer: '81',
          acceptedAnswers: ['81'],
          codeFragment: '4',
          hint1: 'Vzorec: $a_n = 4n + 1$.',
          hint2: 'Pro $n = 20$: $4 \\cdot 20 + 1 = 81$.',
          solution: ['Počet teček: 81']
        },
        {
          id: 'r5_h2',
          title: 'Runa 2: Turnaj v šachu',
          prompt: 'Každý s každým hrál 1 partii. Bylo odehráno 45 partií. Kolik hráčů se zúčastnilo?',
          answer: '10',
          acceptedAnswers: ['10', '10 hráčů'],
          codeFragment: '6',
          hint1: '$n(n - 1) / 2 = 45 \\implies n(n - 1) = 90$.',
          hint2: '$10 \\cdot 9 = 90 \\implies n = 10$.',
          solution: ['Počet hráčů: 10']
        },
        {
          id: 'r5_h3',
          title: 'Runa 3: Průměrná rychlost',
          prompt: 'Polovinu trasy jel vůz $60\\text{ km/h}$, druhou polovinu $90\\text{ km/h}$. Jaká byla průměrná rychlost v km/h?',
          answer: '72',
          acceptedAnswers: ['72', '72 km/h', '72.0', '72,0'],
          codeFragment: '3',
          hint1: '$v = \\frac{2 v_1 v_2}{v_1 + v_2}$.',
          hint2: '$\\frac{2 \\cdot 60 \\cdot 90}{150} = 72\\text{ km/h}$.',
          solution: ['Průměrná rychlost: 72 km/h']
        }
      ]
    },

    6: {
      easy: [
        {
          id: 'r6_e1',
          title: 'Reaktor 1: Pohyb proti sobě',
          prompt: 'Turisté jdou proti sobě ze vzdálenosti 24 km rychlostmi 4 km/h a 2 km/h. Za kolik hodin se potkají?',
          answer: '4',
          acceptedAnswers: ['4', '4 h', '4 hodiny'],
          codeFragment: '9',
          hint1: 'Společná rychlost: $4 + 2 = 6\\text{ km/h}$.',
          hint2: '$t = 24 / 6 = 4\\text{ h}$.',
          solution: ['Čas: 4 hodiny']
        },
        {
          id: 'r6_e2',
          title: 'Reaktor 2: Obvod pozemku',
          prompt: 'Zahrada má $a = 25\\text{ m}$ a $b = 12\\text{ m}$. Kolik metrů pletiva je potřeba na obvod?',
          answer: '74',
          acceptedAnswers: ['74', '74 m'],
          codeFragment: '3',
          hint1: '$o = 2(a + b) = 2(25 + 12)$.',
          hint2: '$2 \\cdot 37 = 74\\text{ m}$.',
          solution: ['Obvod: 74 m']
        },
        {
          id: 'r6_e3',
          title: 'Reaktor 3: Kalibrace portálu',
          prompt: 'Vyřešte rovnici a zadejte $K$:\n$$5K - 13 = 2K + 14$$',
          answer: '9',
          acceptedAnswers: ['9'],
          codeFragment: '1',
          hint1: '$3K = 27$.',
          hint2: '$K = 9$.',
          solution: ['$K = 9$']
        }
      ],
      medium: [
        {
          id: 'r6_m1',
          title: 'Reaktor 1: Pohyb se zpožděním',
          prompt: 'Cyklista vyjel v 8:00 (15 km/h). V 9:00 za ním motocyklista (45 km/h). Kolik km od startu ho dohoní?',
          answer: '22.5',
          acceptedAnswers: ['22.5', '22,5', '22.5 km', '45/2'],
          codeFragment: '3',
          hint1: 'Náskok v 9:00 je 15 km. Relativní rychlost: $45 - 15 = 30\\text{ km/h}$.',
          hint2: 'Čas: $15 / 30 = 0{,}5\\text{ h}$. Vzdálenost: $45 \\cdot 0{,}5 = 22{,}5\\text{ km}$.',
          solution: ['Vzdálenost: 22,5 km']
        },
        {
          id: 'r6_m2',
          title: 'Reaktor 2: Obdélníkový pozemek',
          prompt: 'Obvod pozemku je 84 m. Jedna strana je o 6 m delší než druhá. Vypočítejte obsah v $\\text{m}^2$.',
          answer: '432',
          acceptedAnswers: ['432', '432 m2', '432 m^2'],
          codeFragment: '7',
          hint1: '$a + b = 42 \\implies 2b + 6 = 42 \\implies b = 18\\text{ m}, a = 24\\text{ m}$.',
          hint2: 'Obsah: $24 \\cdot 18 = 432\\text{ m}^2$.',
          solution: ['Obsah: 432 m²']
        },
        {
          id: 'r6_m3',
          title: 'Reaktor 3: Finální rovnice',
          prompt: 'Vyřešte rovnici pro $K$:\n$$\\frac{2K + 5}{3} - \\frac{K - 1}{2} = 7$$',
          answer: '29',
          acceptedAnswers: ['29'],
          codeFragment: '9',
          hint1: 'Vynásobte 6: $2(2K + 5) - 3(K - 1) = 42$.',
          hint2: '$4K + 10 - 3K + 3 = 42 \\implies K + 13 = 42 \\implies K = 29$.',
          solution: ['$K = 29$']
        }
      ],
      hard: [
        {
          id: 'r6_h1',
          title: 'Reaktor 1: Výkon mistra a učně',
          prompt: 'Mistr a učeň vyrobí za 6 h 180 kusů. Mistr je o $50\\%$ výkonnější. Kolik kusů vyrobí sám mistr za 1 hodinu?',
          answer: '18',
          acceptedAnswers: ['18', '18 součástek'],
          codeFragment: '8',
          hint1: 'Společně 30 ks/h. $x + 1{,}5x = 30 \\implies 2{,}5x = 30 \\implies x = 12$.',
          hint2: 'Mistr: $1{,}5 \\cdot 12 = 18\\text{ ks/h}$.',
          solution: ['Výkon mistra: 18 ks/h']
        },
        {
          id: 'r6_h2',
          title: 'Reaktor 2: Objem krabice z plechu',
          prompt: 'Ze čtverce 30x30 cm se v rozích vystřihnou čtverce 5x5 cm. Jaký je objem složené krabice v $\\text{cm}^3$?',
          answer: '2000',
          acceptedAnswers: ['2000', '2000 cm3', '2000 cm^3'],
          codeFragment: '4',
          hint1: 'Dno: $30 - 2(5) = 20\\text{ cm}$. Výška $v = 5\\text{ cm}$.',
          hint2: '$V = 20 \\cdot 20 \\cdot 5 = 2000\\text{ cm}^3$.',
          solution: ['Objem: 2000 cm³']
        },
        {
          id: 'r6_h3',
          title: 'Reaktor 3: Stabilizace jádra',
          prompt: 'Vyřešte rovnici pro $K$:\n$$\\frac{3(K - 2)}{4} - \\frac{2(K + 1)}{3} = \\frac{K - 26}{12}$$',
          answer: '0',
          acceptedAnswers: ['0'],
          codeFragment: '5',
          hint1: '$9(K - 2) - 8(K + 1) = K - 26$.',
          hint2: '$K - 26 = K - 26 \\implies K = 0$.',
          solution: ['$K = 0$']
        }
      ]
    }
  };

  // =========================================================================
  // 5. STAV HRY (GameState)
  // =========================================================================
  class GameState {
    constructor() {
      this.storageKey = 'chronos_math_escape_state_v1';
      this.defaultState = {
        playerName: 'Hráč',
        difficulty: 'medium',
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
        roomProgress: {
          1: { solvedTasks: [], collectedCodes: [], hintsUsed: 0, mistakes: 0, timeSpent: 0, unlocked: false },
          2: { solvedTasks: [], collectedCodes: [], hintsUsed: 0, mistakes: 0, timeSpent: 0, unlocked: false },
          3: { solvedTasks: [], collectedCodes: [], hintsUsed: 0, mistakes: 0, timeSpent: 0, unlocked: false },
          4: { solvedTasks: [], collectedCodes: [], hintsUsed: 0, mistakes: 0, timeSpent: 0, unlocked: false },
          5: { solvedTasks: [], collectedCodes: [], hintsUsed: 0, mistakes: 0, timeSpent: 0, unlocked: false },
          6: { solvedTasks: [], collectedCodes: [], hintsUsed: 0, mistakes: 0, timeSpent: 0, unlocked: false }
        },
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
      } catch (e) { console.warn(e); }
      return JSON.parse(JSON.stringify(this.defaultState));
    }

    saveState() {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.state));
      } catch (e) { console.warn(e); }
    }

    resetGame(difficulty = 'medium', playerName = 'Hráč') {
      this.state = JSON.parse(JSON.stringify(this.defaultState));
      this.state.difficulty = difficulty;
      this.state.playerName = playerName;
      this.state.startTime = Date.now();
      this.state.timerRunning = true;
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

        const basePoints = 100;
        this.state.score += basePoints;
        this.state.baseScore += basePoints;

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

      const targetSeconds = 30 * 60;
      if (this.state.elapsedSeconds < targetSeconds) {
        const remainingBonus = Math.floor((targetSeconds - this.state.elapsedSeconds) / 10);
        this.state.timeBonus = Math.min(300, remainingBonus);
        this.state.score += this.state.timeBonus;
      }

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
      } catch (e) { console.warn(e); }
    }
  }

  const gameState = new GameState();

  // =========================================================================
  // 6. WIDGETY A KOMPONENTY
  // =========================================================================
  class GeometryViewer {
    static renderSvgForTask(taskId) {
      if (taskId.includes('r4_e1') || taskId.includes('r4_m1')) {
        return `
          <div class="geometry-canvas-card">
            <svg class="geometry-svg" viewBox="0 0 320 200" width="300" height="180">
              <polygon points="50,160 250,160 50,40" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" stroke-width="3" />
              <rect x="50" y="142" width="18" height="18" fill="none" stroke="#38bdf8" stroke-width="1.5" />
              <circle cx="59" cy="151" r="2.5" fill="#38bdf8" />
              <text x="145" y="180" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">a = 12 cm</text>
              <text x="25" y="105" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">b = ?</text>
              <text x="165" y="90" fill="#fbbf24" font-size="14" font-weight="bold" text-anchor="middle">c = 13 cm</text>
            </svg>
          </div>
        `;
      }
      if (taskId.includes('r4_m2')) {
        return `
          <div class="geometry-canvas-card">
            <svg class="geometry-svg" viewBox="0 0 340 180" width="320" height="170">
              <polygon points="40,140 300,140 230,40 110,40" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" stroke-width="3" />
              <line x1="110" y1="40" x2="110" y2="140" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4,4" />
              <rect x="110" y="125" width="15" height="15" fill="none" stroke="#fbbf24" stroke-width="1" />
              <text x="170" y="165" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">a = 16 cm</text>
              <text x="170" y="30" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">c = 6 cm</text>
              <text x="55" y="85" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">b = 13 cm</text>
              <text x="125" y="95" fill="#fbbf24" font-size="13" font-weight="bold">v = ?</text>
            </svg>
          </div>
        `;
      }
      if (taskId.includes('r4_m3')) {
        return `
          <div class="geometry-canvas-card">
            <svg class="geometry-svg" viewBox="0 0 300 200" width="280" height="180">
              <polygon points="40,160 260,160 150,35" fill="rgba(192, 132, 252, 0.12)" stroke="#c084fc" stroke-width="3" />
              <path d="M 75 160 A 35 35 0 0 0 65 140" fill="none" stroke="#38bdf8" stroke-width="2" />
              <path d="M 225 160 A 35 35 0 0 1 235 140" fill="none" stroke="#38bdf8" stroke-width="2" />
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
      return '';
    }
  }

  class BalanceWidget {
    static renderWidget(leftExpression, rightExpression) {
      return `
        <div class="balance-scale-widget">
          <svg class="scale-svg" viewBox="0 0 400 160" width="360" height="150">
            <polygon points="170,150 230,150 205,70 195,70" fill="#334155" stroke="#64748b" stroke-width="2" />
            <circle cx="200" cy="70" r="8" fill="#38bdf8" />
            <line x1="60" y1="70" x2="340" y2="70" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" />
            <line x1="60" y1="70" x2="30" y2="110" stroke="#64748b" stroke-width="1.5" />
            <line x1="60" y1="70" x2="90" y2="110" stroke="#64748b" stroke-width="1.5" />
            <line x1="340" y1="70" x2="310" y2="110" stroke="#64748b" stroke-width="1.5" />
            <line x1="340" y1="70" x2="370" y2="110" stroke="#64748b" stroke-width="1.5" />
            <path d="M 20 110 Q 60 135 100 110 Z" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="2" />
            <path d="M 300 110 Q 340 135 380 110 Z" fill="rgba(129, 140, 248, 0.2)" stroke="#818cf8" stroke-width="2" />
            <text x="60" y="102" fill="#38bdf8" font-size="14" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">${leftExpression}</text>
            <text x="340" y="102" fill="#818cf8" font-size="14" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">${rightExpression}</text>
            <text x="200" y="45" fill="#10b981" font-size="18" font-weight="bold" text-anchor="middle">⚖️ =</text>
          </svg>
        </div>
      `;
    }
  }

  class KeypadComponent {
    constructor(containerId, options = {}) {
      this.container = document.getElementById(containerId);
      this.options = {
        maxLength: 4,
        onUnlock: () => {},
        targetCode: '',
        ...options
      };
      this.currentInput = '';
      this.render();
    }

    render() {
      if (!this.container) return;
      this.container.innerHTML = `
        <div class="keypad-container">
          <div class="keypad-display" id="keypad-display">_ _ _</div>
          <div class="keypad-grid">
            <button class="keypad-btn" data-key="1">1</button>
            <button class="keypad-btn" data-key="2">2</button>
            <button class="keypad-btn" data-key="3">3</button>
            <button class="keypad-btn" data-key="4">4</button>
            <button class="keypad-btn" data-key="5">5</button>
            <button class="keypad-btn" data-key="6">6</button>
            <button class="keypad-btn" data-key="7">7</button>
            <button class="keypad-btn" data-key="8">8</button>
            <button class="keypad-btn" data-key="9">9</button>
            <button class="keypad-btn action-btn clear-btn" data-key="CLEAR">C</button>
            <button class="keypad-btn" data-key="0">0</button>
            <button class="keypad-btn action-btn" data-key="BACK">⌫</button>
            <button class="keypad-btn submit-btn" data-key="SUBMIT">ODEMKNOUT KOMORU 🔓</button>
          </div>
        </div>
      `;
      this.attachEvents();
      this.updateDisplay();
    }

    attachEvents() {
      const buttons = this.container.querySelectorAll('.keypad-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-key');
          this.handleKey(key);
        });
      });
    }

    handleKey(key) {
      if (key === 'CLEAR') {
        sound.playKeypadBeep(350);
        this.currentInput = '';
        this.updateDisplay();
      } else if (key === 'BACK') {
        sound.playKeypadBeep(400);
        this.currentInput = this.currentInput.slice(0, -1);
        this.updateDisplay();
      } else if (key === 'SUBMIT') {
        this.checkCode();
      } else {
        if (this.currentInput.length < this.options.maxLength) {
          sound.playKeypadBeep(520 + this.currentInput.length * 50);
          this.currentInput += key;
          this.updateDisplay();
        }
      }
    }

    updateDisplay(customText = null, isError = false, isSuccess = false) {
      const display = this.container.querySelector('#keypad-display');
      if (!display) return;
      display.className = 'keypad-display';
      if (isError) display.classList.add('error');
      if (isSuccess) display.classList.add('success');

      if (customText !== null) {
        display.textContent = customText;
        return;
      }
      if (this.currentInput.length === 0) {
        display.textContent = '_ '.repeat(this.options.maxLength).trim();
      } else {
        const padded = this.currentInput.padEnd(this.options.maxLength, '_');
        display.textContent = padded.split('').join(' ');
      }
    }

    checkCode() {
      const entered = String(this.currentInput || '').trim();
      const target = String(this.options.targetCode || '').trim();
      if (entered.length === 0) return;

      // Akceptujeme přesný cílový kód
      const isMatch = (entered === target);

      if (isMatch) {
        sound.playUnlockRoom();
        this.updateDisplay('PŘÍSTUP POVOLEN', false, true);
        setTimeout(() => {
          this.options.onUnlock();
        }, 800);
      } else {
        sound.playError();
        this.updateDisplay('CHYBNÝ KÓD', true, false);
        setTimeout(() => {
          this.currentInput = '';
          this.updateDisplay();
        }, 1200);
      }
    }
  }

  // =========================================================================
  // 7. ŠABLONY MÍSTNOSTÍ A SCÉN
  // =========================================================================
  class RoomViews {
    static renderStartScreen() {
      return `
        <div class="card-glass" style="max-width: 800px; margin: 2rem auto; text-align: center;">
          <div style="font-size: 3.5rem; margin-bottom: 1rem; animation: pulse 3s infinite;">⏳ 🗝️ 🌌</div>
          <h2 style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; margin-bottom: 0.5rem; background: linear-gradient(90deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            PROJEKT CHRONOS: ARCHIV VĚDĚNÍ
          </h2>
          <p style="font-size: 1.1rem; color: #cbd5e1; max-width: 620px; margin: 0 auto 1.75rem auto; line-height: 1.6;">
            Vítej v Archivu matematického vědění! V časoprostorové komoře došlo k uzamčení všech sektorů. 
            Tvým úkolem je projít 6 komorami, vyřešit přijímačkové matematické šifry, získat energetické fragmenty klíčů a stabilizovat portál!
          </p>

          <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto; text-align: left;">
            <div style="margin-bottom: 1.25rem;">
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.4rem;">
                Jméno / Přezdívka hráče:
              </label>
              <input type="text" id="player-name-input" value="Badatel 1" class="task-input" style="width: 100%;" />
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.4rem;">
                Zvol úroveň obtížnosti:
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

          <div style="margin-top: 2rem; display: flex; justify-content: center; gap: 1.5rem; font-size: 0.85rem; color: var(--text-muted); flex-wrap: wrap;">
            <span>⏱️ Měření času</span>
            <span>💡 2 úrovně nápověd</span>
            <span>🏆 Systém 4 hodností</span>
          </div>
        </div>
      `;
    }

    static renderRoom(roomId, state) {
      const roomInfo = CURRICULUM_DATA.rooms.find(r => r.id === roomId) || CURRICULUM_DATA.rooms[0];
      const diff = state.difficulty || 'medium';
      const roomTasks = TASKS_DATABASE[roomId]?.[diff] || [];
      const progress = state.roomProgress[roomId] || { solvedTasks: [], collectedCodes: [] };

      const targetCode = roomTasks.map(t => t.codeFragment).join('');

      const tasksHtml = roomTasks.map((task, idx) => {
        const isSolved = progress.solvedTasks.includes(task.id);
        const isCurrent = !isSolved && (idx === 0 || progress.solvedTasks.includes(roomTasks[idx - 1].id));

        const hint1Id = `hint1_${task.id}`;
        const hint2Id = `hint2_${task.id}`;

        const hintsHtml = `
          <div class="hints-container">
            <div class="hint-card" id="card_${hint1Id}">
              <div class="hint-header" onclick="window.gameApp.revealHint('${task.id}', 1, '${task.topic || 'Zlomky a aritmetika'}', ${roomId})">
                <span class="hint-badge">💡 Nápověda 1: Metodické nakopnutí</span>
                <span class="hint-cost" id="cost_${hint1Id}">(-15 bodů) ▶ Klikni pro odhalení</span>
              </div>
              <div class="hint-content" id="content_${hint1Id}" style="display: none;">
                ${MathRenderer.render(task.hint1)}
              </div>
            </div>
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

        const solutionHtml = (task.solution && task.solution.length > 0) ? `
          <div class="solution-box">
            <h4>✨ Postup a vysvětlení řešení:</h4>
            <div class="solution-steps">
              ${task.solution.map((st, i) => `
                <div class="solution-step">
                  <span class="step-bullet">${i + 1}</span>
                  <div>${MathRenderer.render(st)}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : '';

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
              ${hintsHtml}
            ` : `
              <div class="code-fragment-chip">
                🔑 Získaný fragment kódu: <strong>${task.codeFragment}</strong>
              </div>
              ${solutionHtml}
            `}
          </div>
        `;
      }).join('');

      const allSolved = roomTasks.length > 0 && roomTasks.every(t => progress.solvedTasks.includes(t.id));

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

          <div class="story-banner">
            📜 <strong>Záznam archivu:</strong> ${roomInfo.description}
          </div>

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
                  Vyřeš úkoly, získej číselné fragmenty a zadej kód na číselníku pro otevření těžkých vrat komory.
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

                <div id="room-keypad-container" data-target-code="${targetCode}"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    static renderVictoryScreen(state) {
      const rank = state.rank || CURRICULUM_DATA.ranks[1];
      const pct = state.finalPercentage || 85;
      const playerName = state.playerName || 'Badatel';
      const diffName = state.difficulty === 'easy' ? 'Lehká (Základ)' : (state.difficulty === 'hard' ? 'Těžká (Gymnázium)' : 'Střední (CERMAT)');

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

  // =========================================================================
  // 8. UČITELSKÝ MODUL (TeacherDashboard)
  // =========================================================================
  class TeacherDashboard {
    constructor(app) {
      this.app = app;
    }

    getStudentRecords() {
      const historyKey = 'chronos_student_history';
      let records = [];
      try {
        records = JSON.parse(localStorage.getItem(historyKey) || '[]');
      } catch (e) { console.warn(e); }

      if (records.length === 0) {
        records = [
          {
            id: 'rec_01',
            name: 'Anna Nováková',
            date: '01.09.2026 09:15',
            difficulty: 'medium',
            score: 1850,
            percentage: 92,
            rank: 'Platinový mistr matematiky',
            timeSpent: 1320,
            hintsUsed: 1,
            mistakes: 2
          },
          {
            id: 'rec_02',
            name: 'Jan Kučera',
            date: '01.09.2026 09:18',
            difficulty: 'medium',
            score: 1520,
            percentage: 78,
            rank: 'Stříbrný badatel',
            timeSpent: 1650,
            hintsUsed: 4,
            mistakes: 6
          },
          {
            id: 'rec_03',
            name: 'Eliška Dvořáková',
            date: '01.09.2026 09:20',
            difficulty: 'medium',
            score: 1740,
            percentage: 86,
            rank: 'Zlatý počtář & stratég',
            timeSpent: 1440,
            hintsUsed: 2,
            mistakes: 3
          },
          {
            id: 'rec_04',
            name: 'Tomáš Procházka',
            date: '01.09.2026 09:25',
            difficulty: 'medium',
            score: 1210,
            percentage: 58,
            rank: 'Matematický učeň',
            timeSpent: 1780,
            hintsUsed: 6,
            mistakes: 9
          }
        ];
      }
      return records;
    }

    render() {
      const records = this.getStudentRecords();
      const totalStudents = records.length;
      const avgScore = totalStudents > 0 ? Math.round(records.reduce((acc, r) => acc + r.score, 0) / totalStudents) : 0;
      const avgPct = totalStudents > 0 ? Math.round(records.reduce((acc, r) => acc + r.percentage, 0) / totalStudents) : 0;
      const avgTime = totalStudents > 0 ? Math.round(records.reduce((acc, r) => acc + r.timeSpent, 0) / totalStudents) : 0;
      const totalHints = records.reduce((acc, r) => acc + r.hintsUsed, 0);

      const rowsHtml = records.map(r => {
        const mins = Math.floor(r.timeSpent / 60);
        const secs = r.timeSpent % 60;
        const timeFormatted = `${mins}:${secs.toString().padStart(2, '0')}`;

        return `
          <tr>
            <td>
              <div class="student-name-cell">
                <div class="student-avatar">${r.name.charAt(0)}</div>
                <div>
                  <div>${r.name}</div>
                  <small style="color: var(--text-muted);">${r.date}</small>
                </div>
              </div>
            </td>
            <td><strong>${r.score} b</strong></td>
            <td>
              <strong style="color: ${r.percentage >= 80 ? '#34d399' : (r.percentage >= 60 ? '#fbbf24' : '#f87171')};">
                ${r.percentage} %
              </strong>
            </td>
            <td><span class="badge badge-topic">${r.rank}</span></td>
            <td>⏱️ ${timeFormatted}</td>
            <td>💡 ${r.hintsUsed} / ⚠️ ${r.mistakes}</td>
          </tr>
        `;
      }).join('');

      return `
        <div class="teacher-wrapper">
          <div class="teacher-header">
            <div class="teacher-title-area">
              <h2><span>👩‍🏫</span> Učitelský analytický panel</h2>
              <p>Diagnostika matematických kompetencí třídy pro přípravu na přijímací zkoušky (CERMAT)</p>
            </div>

            <div class="teacher-actions">
              <button class="btn btn-secondary btn-sm" onclick="window.gameApp.exportClassData('csv')">
                📥 Exportovat CSV (Excel)
              </button>
              <button class="btn btn-secondary btn-sm" onclick="window.gameApp.exportClassData('json')">
                💾 Exportovat JSON
              </button>
              <button class="btn btn-primary btn-sm" onclick="window.gameApp.closeTeacherDashboard()">
                ◀ Zpět do hry
              </button>
            </div>
          </div>

          <div class="metrics-row">
            <div class="metric-card">
              <div class="metric-icon-wrap">👥</div>
              <div class="metric-data">
                <h3>${totalStudents}</h3>
                <span>Počet odevzdaných her</span>
              </div>
            </div>

            <div class="metric-card success">
              <div class="metric-icon-wrap">🎯</div>
              <div class="metric-data">
                <h3>${avgPct} %</h3>
                <span>Průměrná úspěšnost</span>
              </div>
            </div>

            <div class="metric-card warning">
              <div class="metric-icon-wrap">⏱️</div>
              <div class="metric-data">
                <h3>${Math.floor(avgTime / 60)} min</h3>
                <span>Průměrný čas úniku</span>
              </div>
            </div>

            <div class="metric-card accent">
              <div class="metric-icon-wrap">💡</div>
              <div class="metric-data">
                <h3>${totalHints}</h3>
                <span>Celkem použitých nápověd</span>
              </div>
            </div>
          </div>

          <div class="diagnostic-section">
            <div class="diag-card">
              <div class="diag-card-header">
                <h3>📊 Úspěšnost podle tematických okruhů</h3>
                <span class="badge badge-topic">Didaktická matice</span>
              </div>
              <div class="topic-list">
                <div class="topic-item">
                  <div class="topic-info"><span><strong>Zlomky a aritmetika</strong></span><span class="topic-pct">88 %</span></div>
                  <div class="topic-bar-bg"><div class="topic-bar-fill bar-high" style="width: 88%;"></div></div>
                </div>
                <div class="topic-item">
                  <div class="topic-info"><span><strong>Výrazy a rovnice</strong></span><span class="topic-pct">82 %</span></div>
                  <div class="topic-bar-bg"><div class="topic-bar-fill bar-high" style="width: 82%;"></div></div>
                </div>
                <div class="topic-item">
                  <div class="topic-info"><span><strong>Procenta a poměry</strong></span><span class="topic-pct">62 %</span></div>
                  <div class="topic-bar-bg"><div class="topic-bar-fill bar-low" style="width: 62%;"></div></div>
                </div>
                <div class="topic-item">
                  <div class="topic-info"><span><strong>Geometrie a tělesa</strong></span><span class="topic-pct">74 %</span></div>
                  <div class="topic-bar-bg"><div class="topic-bar-fill bar-mid" style="width: 74%;"></div></div>
                </div>
                <div class="topic-item">
                  <div class="topic-info"><span><strong>Logika a posloupnosti</strong></span><span class="topic-pct">90 %</span></div>
                  <div class="topic-bar-bg"><div class="topic-bar-fill bar-high" style="width: 90%;"></div></div>
                </div>
                <div class="topic-item">
                  <div class="topic-info"><span><strong>Komplexní syntéza</strong></span><span class="topic-pct">59 %</span></div>
                  <div class="topic-bar-bg"><div class="topic-bar-fill bar-low" style="width: 59%;"></div></div>
                </div>
              </div>
            </div>

            <div class="diag-card">
              <div class="diag-card-header">
                <h3>🔍 Pedagogická doporučení pro výuku</h3>
                <span class="badge badge-medium">Analýza chyb</span>
              </div>
              <div class="pedagogy-alert">
                <i>💡</i>
                <div class="pedagogy-text">
                  <h4>Kritická oblast: Procenta, poměry a slovní úlohy</h4>
                  <p>
                    Data ukazují nejvyšší četnost chyb u postupného zdražování/zlevňování a u slovních úloh o pohybu. 
                    Doporučujeme ve vyučovacích hodinách zařadit nácvik grafického znázornění úloh a ujasnění výpočtu procent ze zlevněného základu.
                  </p>
                </div>
              </div>

              <div class="pedagogy-alert" style="border-color: rgba(56, 189, 248, 0.3); background: rgba(56, 189, 248, 0.08);">
                <i style="color: #38bdf8;">📐</i>
                <div class="pedagogy-text">
                  <h4 style="color: #bae6fd;">Geometrie a převody plošných jednotek</h4>
                  <p>
                    Žáci bez problémů zvládají přímočarou Pythagorovu větu, avšak zaváhají při výpočtu výšky rovnoramenného lichoběžníku. 
                    Doporučujeme upevnit rozklad složených obrazců na pravoúhlé trojúhelníky.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="students-table-container">
            <h3 style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem;">
              📋 Detailní přehled jednotlivých žáků
            </h3>
            <table class="students-table">
              <thead>
                <tr>
                  <th>Žák / Datum</th>
                  <th>Skóre</th>
                  <th>Úspěšnost</th>
                  <th>Dosažená hodnost</th>
                  <th>Čas řešení</th>
                  <th>Nápovědy / Chyby</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    exportData(format = 'csv') {
      const records = this.getStudentRecords();
      if (format === 'json') {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(records, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `chronos_ucitelsky_export_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      } else {
        let csv = "Jmeno,Datum,Obtiznost,Skore,Uspesnost_Procent,Hodnost,Cas_Sekundy,Pocet_Napoved,Pocet_Chyb\n";
        records.forEach(r => {
          csv += `"${r.name}","${r.date}","${r.difficulty}",${r.score},${r.percentage},"${r.rank}",${r.timeSpent},${r.hintsUsed},${r.mistakes}\n`;
        });
        const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `chronos_vysledky_tridy_${Date.now()}.csv`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      }
    }
  }

  // =========================================================================
  // 9. HLAVNÍ APLIKACE (MathEscapeApp)
  // =========================================================================
  class MathEscapeApp {
    constructor() {
      this.currentView = 'start';
      this.teacherDashboard = new TeacherDashboard(this);
      this.timerInterval = null;
      this.currentKeypad = null;
    }

    init() {
      this.renderProgressBar();
      this.setupGlobalEvents();
      this.startTimerLoop();

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
      const soundBtn = document.getElementById('toggle-sound-btn');
      if (soundBtn) {
        soundBtn.addEventListener('click', () => {
          const isEnabled = sound.toggleSound();
          soundBtn.textContent = isEnabled ? '🔊' : '🔇';
          soundBtn.title = isEnabled ? 'Zvuk: Zapnuto' : 'Zvuk: Ztlumeno';
        });
      }

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

      strip.innerHTML = CURRICULUM_DATA.rooms.map((room) => {
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
      this.initKeypadForRoom(roomId);
      this.renderProgressBar();
      this.updateHud();
    }

    initKeypadForRoom(roomId) {
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

    submitTaskAnswer(taskId, roomId) {
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
        setTimeout(() => {
          this.renderRoom(roomId);
        }, 700);
      } else {
        sound.playError();
        gameState.recordMistake(roomId, taskId, task.topic || 'Zlomky a aritmetika');

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
      this.updateHud();
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
        this.updateHud();
      }
    }

    autoFillCode(code) {
      if (this.currentKeypad) {
        this.currentKeypad.currentInput = String(code);
        this.currentKeypad.updateDisplay();
        sound.playSuccess();
      }
    }

    handleRoomUnlock(roomId) {
      gameState.unlockRoom(roomId);
      if (roomId === 6) {
        sound.playVictory();
        gameState.finishGame();
        this.showModal({
          title: '🎉 Mise dokončena! Portál CHRONOS je otevřen!',
          body: `
            <div style="text-align: center; padding: 1rem;">
              <div style="font-size: 3.5rem; margin-bottom: 0.75rem;">🏆 🌌 ⏳</div>
              <h4 style="font-family: var(--font-display); font-size: 1.35rem; color: var(--gold); margin-bottom: 0.5rem;">Všechny komory úspěšně zdolány!</h4>
              <p style="font-size: 1.05rem; line-height: 1.6; color: #f8fafc;">
                Skvělá práce! Časoprostorový portál se stabilizoval a cesta zpět do současnosti je volná.
              </p>
              <p style="font-size: 0.95rem; color: #94a3b8; margin-top: 0.5rem;">
                Nyní si můžeš prohlédnout celkové statistiky, body, čas a získanou hodnost pro přijímačky.
              </p>
            </div>
          `,
          confirmText: 'Zobrazit celkové statistiky a hodnost 🏆',
          onConfirm: () => {
            this.renderVictory();
          }
        });
      } else {
        const nextRoomId = roomId + 1;
        this.showModal({
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
            this.navigateToRoom(nextRoomId);
          }
        });
      }
      this.updateHud();
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

  // Inicializace po načtení dokumentu
  function startApp() {
    window.gameApp = new MathEscapeApp();
    window.gameApp.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
  } else {
    startApp();
  }
})();
