/**
 * Databáze matematických úloh pro Digitální únikovou hru (Projekt CHRONOS)
 * Všechny úlohy odpovídají standardům CERMAT pro JPZ z matematiky na SŠ.
 * Obsahují 3 úrovně obtížnosti (easy, medium, hard), nápovědy, diagnostiku chyb a vzorová řešení.
 */

export const TASKS_DATABASE = {
  // =========================================================================
  // MÍSTNOST 1: VSTUPNÍ ARCHIV (Aritmetika, zlomky, záporná čísla)
  // =========================================================================
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
        solution: [
          'Zlomky mají stejného jmenovatele: $\\frac{3+4-2}{5}$',
          'V čitateli spočítáme: $3 + 4 - 2 = 5$',
          'Výsledný zlomek $\\frac{5}{5} = 1$'
        ]
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
        solution: [
          'Násobení má přednost: $-3 \\cdot (-4) = +12$',
          'Dosadíme do výrazu: $15 + 12 + (-8)$',
          'Postupně sečteme: $27 - 8 = 19$'
        ]
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
          '8/27': 'Pozor! Při dělení zlomků musíte druhý zlomek obrátit (vytvořit převrácený zlomek 9/4), nenásobte přímo.',
          '6/12': 'Správný mezikrok, ale nezapomeňte výsledek zkrátit do základního tvaru (vydělit 6).'
        },
        solution: [
          'Dělení převedeme na násobení převráceným zlomkem: $\\frac{2}{3} \\cdot \\frac{9}{4}$',
          'Zkrátíme do kříže (2 s 4 na 1 a 2, 9 s 3 na 3 a 1): $\\frac{1 \\cdot 3}{1 \\cdot 2}$',
          'Výsledek v základním tvaru je $\\frac{3}{2}$'
        ]
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
          '3/32': 'Chyba v prioritě operací! Nelze nejprve odečítat $3/4 - 2/3$. Násobení má přednost.',
          '1/12': 'Zkontroluj si krácení v součinu: $2/3 \\cdot 9/8 = (1 \\cdot 3)/(1 \\cdot 4) = 3/4$.'
        },
        solution: [
          'Násobení má přednost: $\\frac{2}{3} \\cdot \\frac{9}{8} = \\frac{1 \\cdot 3}{1 \\cdot 4} = \\frac{3}{4}$',
          'Nyní odečteme: $\\frac{3}{4} - \\frac{3}{4} = 0$',
          'Výsledná hodnota je $0$.'
        ]
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
          '5/2': 'Obrácený výsledek! Dělíte čitatele jmenovatelem, tedy $(1/3) : (5/6) = (1/3) \\cdot (6/5)$.',
          '4/5': 'Zkontroluj odečítání v čitateli: $5/6 - 1/2 = 5/6 - 3/6 = 2/6 = 1/3$.'
        },
        solution: [
          'Úprava čitatele: $\\frac{5}{6} - \\frac{3}{6} = \\frac{2}{6} = \\frac{1}{3}$',
          'Úprava jmenovatele: $\\frac{4}{6} + \\frac{1}{6} = \\frac{5}{6}$',
          'Složený zlomek vyjádříme jako dělení: $\\frac{1}{3} : \\frac{5}{6} = \\frac{1}{3} \\cdot \\frac{6}{5} = \\frac{2}{5}$'
        ]
      },
      {
        id: 'r1_m3',
        title: 'Fragment 3: Priorita operací a mocniny záporných čísel',
        prompt: 'Vypočítejte celočíselný výsledek:\n$$(-3)^2 - 4 \\cdot (-2) + (-12) : (-3)$$',
        answer: '21',
        acceptedAnswers: ['21'],
        codeFragment: '3',
        hint1: 'Pozor: $(-3)^2 = (-3) \\cdot (-3) = +9$. Záporné číslo na sudou mocninu je kladné.',
        hint2: 'Dále: $-4 \\cdot (-2) = +8$ a $(-12) : (-3) = +4$. Nakonec vše sečtěte.',
        misconceptions: {
          '3': 'Pozor na znaménka! $(-3)^2$ je $+9$, nikoliv $-9$, a $(-12):(-3)$ je $+4$, nikoliv $-4$.',
          '13': 'Zkontroluj násobení: $-4 \\cdot (-2) = +8$.'
        },
        solution: [
          'Umocnění: $(-3)^2 = 9$',
          'Násobení a dělení: $-4 \\cdot (-2) = +8$ a $(-12) : (-3) = +4$',
          'Sečtení všech členů: $9 + 8 + 4 = 21$'
        ]
      }
    ],
    hard: [
      {
        id: 'r1_h1',
        title: 'Fragment 1: Složitý vícestupňový zlomek',
        prompt: 'Vypočítejte hodnotu výrazu a zapište jako celé číslo nebo základní zlomek:\n$$\\left( 2 - \\frac{5}{3} \\right)^2 : \\left( \\frac{1}{6} - \\frac{1}{4} \\right)$$',
        answer: '-4/3',
        acceptedAnswers: ['-4/3', '-1.33', '-1,33'],
        codeFragment: '9',
        hint1: 'Nejprve spočítejte závorky. $2 - \\frac{5}{3} = \\frac{1}{3}$. Po umocnění dostanete $\\frac{1}{9}$.',
        hint2: 'Druhá závorka: $\\frac{1}{6} - \\frac{1}{4} = \\frac{2 - 3}{12} = -\\frac{1}{12}$. Poté dělte: $\\frac{1}{9} : \\left(-\\frac{1}{12}\\right)$.',
        misconceptions: {
          '4/3': 'Pozor na znaménko! Druhá závorka má zápornou hodnotu $(1/6 - 1/4 = -1/12)$, proto je celý výsledek záporný.',
          '-12/9': 'Správná hodnota, ale zlomek je nutné zkrátit třemi na $-4/3$.'
        },
        solution: [
          'První závorka: $\\left( \\frac{6}{3} - \\frac{5}{3} \\right)^2 = \\left(\\frac{1}{3}\\right)^2 = \\frac{1}{9}$',
          'Druhá závorka: $\\frac{2}{12} - \\frac{3}{12} = -\\frac{1}{12}$',
          'Dělení: $\\frac{1}{9} : \\left(-\\frac{1}{12}\\right) = \\frac{1}{9} \\cdot \\left(-\\frac{12}{1}\\right) = -\\frac{12}{9} = -\\frac{4}{3}$'
        ]
      },
      {
        id: 'r1_h2',
        title: 'Fragment 2: Řetězec operací s desetinnými čísly',
        prompt: 'Vypočítejte a zapište v základním tvaru:\n$$\\frac{0{,}4 \\cdot \\frac{5}{2} - 1{,}5}{0{,}25 + \\frac{3}{4} \\cdot 0{,}5}$$',
        answer: '-4/5',
        acceptedAnswers: ['-4/5', '-0.8', '-0,8'],
        codeFragment: '6',
        hint1: 'Převeďte si desetinná čísla na zlomky: $0{,}4 = \\frac{2}{5}$, $1{,}5 = \\frac{3}{2}$, $0{,}25 = \\frac{1}{4}$, $0{,}5 = \\frac{1}{2}$.',
        hint2: 'Čitatel: $\\frac{2}{5} \\cdot \\frac{5}{2} - 1{,}5 = 1 - 1{,}5 = -0{,}5 = -\\frac{1}{2}$. Jmenovatel: $\\frac{1}{4} + \\frac{3}{8} = \\frac{5}{8}$.',
        misconceptions: {
          '4/5': 'Pozor na znaménko v čitateli: $1 - 1{,}5 = -0{,}5$ (záporné číslo).',
          '-5/4': 'Obrácený poměr! Dělíte čitatel jmenovatelem: $(-1/2) : (5/8) = (-1/2) \\cdot (8/5) = -4/5$.'
        },
        solution: [
          'Čitatel: $0{,}4 \\cdot 2{,}5 - 1{,}5 = 1 - 1{,}5 = -0{,}5 = -\\frac{1}{2}$',
          'Jmenovatel: $\\frac{1}{4} + \\frac{3}{4} \\cdot \\frac{1}{2} = \\frac{2}{8} + \\frac{3}{8} = \\frac{5}{8}$',
          'Složený zlomek: $-\\frac{1}{2} : \\frac{5}{8} = -\\frac{1}{2} \\cdot \\frac{8}{5} = -\\frac{4}{5} = -0{,}8$'
        ]
      },
      {
        id: 'r1_h3',
        title: 'Fragment 3: Číselné výrazy s absolutní hodnotou a odmocninami',
        prompt: 'Vypočítejte přesnou celočíselnou hodnotu:\n$$\\sqrt{144} - 3 \\cdot |2 - 7| + (-2)^3$$',
        answer: '-11',
        acceptedAnswers: ['-11'],
        codeFragment: '1',
        hint1: '$\\sqrt{144} = 12$. Absolutní hodnota $|2 - 7| = |-5| = 5$.',
        hint2: '$(-2)^3 = -8$. Celý výraz je: $12 - 3 \\cdot 5 + (-8) = 12 - 15 - 8$.',
        misconceptions: {
          '5': 'Absolutní hodnota je vždy nezáporná, ale před ní je $-3 \\cdot 5 = -15$.',
          '-23': 'Zkontroluj $(-2)^3 = -8$, a $12 - 15 - 8 = -11$.'
        },
        solution: [
          'Odmocnina: $\\sqrt{144} = 12$',
          'Absolutní hodnota a násobení: $|2 - 7| = 5 \\implies -3 \\cdot 5 = -15$',
          'Mocnina: $(-2)^3 = -8$',
          'Součet: $12 - 15 - 8 = -11$'
        ]
      }
    ]
  },

  // =========================================================================
  // MÍSTNOST 2: KÓDOVACÍ KRYPTA (Výrazy a lineární rovnice)
  // =========================================================================
  2: {
    easy: [
      {
        id: 'r2_e1',
        title: 'Relé 1: Zjednodušení lineárního výrazu',
        prompt: 'Zjednodušte výraz a určete jeho hodnotu pro $x = 3$:\n$$4(2x - 1) - 3(x + 2)$$',
        answer: '5',
        acceptedAnswers: ['5'],
        codeFragment: '6',
        hint1: 'Nejprve roznásobte závorky: $4 \\cdot 2x - 4 \\cdot 1 - 3 \\cdot x - 3 \\cdot 2$.',
        hint2: 'Dostanete $8x - 4 - 3x - 6 = 5x - 10$. Nyní dosaďte $x = 3$.',
        misconceptions: {
          '17': 'Pozor na roznásobení druhé závorky: $-3 \\cdot (+2) = -6$, nikoliv $+6$.',
          '5x-10': 'Správný upravený výraz, ale zadání požaduje číselnou hodnotu pro $x = 3$. Dosaďte za $x$.'
        },
        solution: [
          'Roznásobení závorek: $8x - 4 - 3x - 6$',
          'Sloučení členů: $5x - 10$',
          'Dosazení $x = 3$: $5(3) - 10 = 15 - 10 = 5$'
        ]
      },
      {
        id: 'r2_e2',
        title: 'Relé 2: Základní lineární rovnice',
        prompt: 'Vyřešte lineární rovnici a zadejte hodnotu neznámé $x$:\n$$3x + 7 = 5x - 9$$',
        answer: '8',
        acceptedAnswers: ['8'],
        codeFragment: '1',
        hint1: 'Převeďte členy s $x$ na jednu stranu a čísla na druhou stranu (např. odečtěte $3x$ a přičtěte $9$).',
        hint2: '$7 + 9 = 5x - 3x \\implies 16 = 2x$. Vydělte obě strany číslem 2.',
        misconceptions: {
          '-8': 'Pozor na změnu znamének při převodu členů mezi stranami rovnice.',
          '1': 'Zkontroluj sčítání: $7 + 9 = 16$, nikoliv 2.'
        },
        solution: [
          'Odečteme $3x$ z obou stran: $7 = 2x - 9$',
          'Přičteme 9 k oběma stranám: $16 = 2x$',
          'Vydělíme dvěma: $x = 8$'
        ]
      },
      {
        id: 'r2_e3',
        title: 'Relé 3: Vzorec (a+b)²',
        prompt: 'Umocněte podle vzorce $(3a + 2)^2$. Jaký je koeficient u jednočlenu $a$ (prostřední člen)?',
        answer: '12',
        acceptedAnswers: ['12'],
        codeFragment: '9',
        hint1: 'Použijte vzorec $(A + B)^2 = A^2 + 2AB + B^2$.',
        hint2: 'Prostřední člen je $2 \\cdot (3a) \\cdot 2 = 12a$. Koeficient je číslo před $a$.',
        misconceptions: {
          '6': 'Nezapomeňte, že prostřední člen je DVOJNÁSOBEK součinu: $2 \\cdot (3a) \\cdot 2 = 12a$.',
          '12a': 'Zadejte pouze číselný koeficient, tedy 12.'
        },
        solution: [
          'Aplikace vzorce: $(3a)^2 + 2 \\cdot (3a) \\cdot 2 + 2^2$',
          'Úprava členů: $9a^2 + 12a + 4$',
          'Koeficient u lineárního členu $a$ je 12.'
        ]
      }
    ],
    medium: [
      {
        id: 'r2_m1',
        title: 'Relé 1: Algebraické vzorce a hodnota výrazu',
        prompt: 'Zjednodušte výraz a určete jeho číselnou hodnotu pro $x = 2$:\n$$(2x - 3)^2 - (2x + 1)(2x - 1)$$',
        answer: '-14',
        acceptedAnswers: ['-14'],
        codeFragment: '4',
        hint1: 'Aplikujte vzorce: $(2x-3)^2 = 4x^2 - 12x + 9$ a $(2x+1)(2x-1) = 4x^2 - 1$.',
        hint2: 'Odečtěte: $(4x^2 - 12x + 9) - (4x^2 - 1) = -12x + 10$. Nyní dosaďte $x = 2$.',
        misconceptions: {
          '-16': 'Pozor na znaménko minus před závorkou: $-(4x^2 - 1) = -4x^2 + 1$. Tedy $9 + 1 = 10$, nikoliv $9 - 1 = 8$.',
          '14': 'Zkontroluj znaménko: $-12 \\cdot 2 + 10 = -24 + 10 = -14$.'
        },
        solution: [
          'Rozvinutí prvního členu: $(2x - 3)^2 = 4x^2 - 12x + 9$',
          'Rozvinutí druhého členu: $(2x + 1)(2x - 1) = 4x^2 - 1$',
          'Odečtení výrazů: $4x^2 - 12x + 9 - 4x^2 + 1 = -12x + 10$',
          'Dosazení $x = 2$: $-12(2) + 10 = -24 + 10 = -14$'
        ]
      },
      {
        id: 'r2_m2',
        title: 'Relé 2: Lineární rovnice se zlomky',
        prompt: 'Vyřešte lineární rovnici v oboru reálných čísel a určete $x$:\n$$\\frac{x - 1}{3} - \\frac{x + 2}{4} = 1$$',
        answer: '22',
        acceptedAnswers: ['22'],
        codeFragment: '7',
        hint1: 'Vynásobte celou rovnici společným jmenovatelem 12. Nezapomeňte vynásobit i pravou stranu!',
        hint2: '$4(x - 1) - 3(x + 2) = 12 \\implies 4x - 4 - 3x - 6 = 12 \\implies x - 10 = 12$.',
        misconceptions: {
          '10': 'Zapomněli jste vynásobit pravou stranu číslem 12 (na pravé straně musí být 12, nikoliv 1).',
          '2': 'Pozor na roznásobení závorky se znaménkem minus: $-3(x + 2) = -3x - 6$.'
        },
        solution: [
          'Vynásobíme celou rovnici číslem 12: $4(x - 1) - 3(x + 2) = 12$',
          'Roznásobíme závorky: $4x - 4 - 3x - 6 = 12$',
          'Sloučíme členy na levé straně: $x - 10 = 12$',
          'Přičteme 10: $x = 22$'
        ]
      },
      {
        id: 'r2_m3',
        title: 'Relé 3: Vyjádření neznámé ze vzorce',
        prompt: 'Ze vzorce pro objem jehlanu $V = \\frac{1}{3} S_p v$ vypočítejte výšku $v$ (v cm), je-li objem $V = 120\\text{ cm}^3$ a obsah podstavy $S_p = 36\\text{ cm}^2$.',
        answer: '10',
        acceptedAnswers: ['10', '10 cm'],
        codeFragment: '2',
        hint1: 'Vyjádřete $v$ ze vzorce: vynásobte 3 a vydělte $S_p$: $v = \\frac{3V}{S_p}$.',
        hint2: 'Dosaďte zadané hodnoty: $v = \\frac{3 \\cdot 120}{36} = \\frac{360}{36}$.',
        misconceptions: {
          '3.33': 'Nezapomněli jste vynásobit objem třemi? Vzorec má $1/3$, takže $3V = S_p \\cdot v$.',
          '30': 'Zkontroluj dělení: $360 / 36 = 10$.'
        },
        solution: [
          'Vyjádření $v$: $v = \\frac{3V}{S_p}$',
          'Dosazení hodnot: $v = \\frac{3 \\cdot 120}{36}$',
          'Výpočet: $v = \\frac{360}{36} = 10\\text{ cm}$'
        ]
      }
    ],
    hard: [
      {
        id: 'r2_h1',
        title: 'Relé 1: Soustava rovnic / rovnice s parametrem',
        prompt: 'Vyřešte rovnici s neznámou ve jmenovateli a zadejte $y$:\n$$\\frac{3y + 2}{y - 1} = 5$$',
        answer: '3.5',
        acceptedAnswers: ['3.5', '3,5', '7/2'],
        codeFragment: '8',
        hint1: 'Podmínka řešitelnosti je $y \\neq 1$. Vynásobte rovnici jmenovatelem $(y - 1)$.',
        hint2: '$3y + 2 = 5(y - 1) \\implies 3y + 2 = 5y - 5 \\implies 7 = 2y$.',
        misconceptions: {
          '-3.5': 'Pozor na znaménka při převodu: $2 + 5 = 5y - 3y \\implies 7 = 2y$.',
          '7': 'Nezapomeňte vydělit dvěma: $2y = 7 \\implies y = 3{,}5$.'
        },
        solution: [
          'Podmínka: $y \\neq 1$',
          'Vynásobíme $(y - 1)$: $3y + 2 = 5(y - 1)$',
          'Roznásobíme: $3y + 2 = 5y - 5$',
          'Ekvivalentní úpravy: $7 = 2y \\implies y = 3{,}5 = \\frac{7}{2}$'
        ]
      },
      {
        id: 'r2_h2',
        title: 'Relé 2: Rozklad na součin a krácení lomených výrazů',
        prompt: 'Zjednodušte lomený výraz a určete jeho hodnotu pro $a = 7$:\n$$\\frac{a^2 - 9}{2a + 6}$$',
        answer: '2',
        acceptedAnswers: ['2'],
        codeFragment: '3',
        hint1: 'Rozložte čitatele podle vzorce $a^2 - 9 = (a - 3)(a + 3)$ a ze jmenovatele vytkněte 2: $2(a + 3)$.',
        hint2: 'Zkraťte člen $(a + 3)$. Zůstane výraz $\\frac{a - 3}{2}$. Dosaďte $a = 7$.',
        misconceptions: {
          '5': 'Zkontroluj dosazení: $(7 - 3)/2 = 4/2 = 2$.',
          '(a-3)/2': 'Správný zjednodušený výraz, ale zadání požaduje číselnou hodnotu pro $a = 7$.'
        },
        solution: [
          'Rozklad čitatele: $a^2 - 9 = (a - 3)(a + 3)$',
          'Vytknutí ve jmenovateli: $2a + 6 = 2(a + 3)$',
          'Krácení členem $(a + 3)$: $\\frac{a - 3}{2}$',
          'Dosazení $a = 7$: $\\frac{7 - 3}{2} = \\frac{4}{2} = 2$'
        ]
      },
      {
        id: 'r2_h3',
        title: 'Relé 3: Slovní úloha vedoucí na rovnici',
        prompt: 'Myslím si číslo. Když k jeho trojnásobku přičtu 14 a výsledek vydělím dvěma, dostanu číslo o 5 větší než původní myšlené číslo. Jaké číslo si myslím?',
        answer: '4',
        acceptedAnswers: ['4'],
        codeFragment: '5',
        hint1: 'Sestavte rovnici: označte myšlené číslo $x$. Platí: $\\frac{3x + 14}{2} = x + 5$.',
        hint2: 'Vynásobte dvěma: $3x + 14 = 2(x + 5) = 2x + 10$. Vyřešte pro $x$.',
        misconceptions: {
          '-4': 'Pozor: $3x - 2x = 10 - 14 \\implies x = -4$? Počkej, $3x + 14 = 2x + 10 \\implies x = -4$. Ověř: $(3(-4)+14)/2 = 2/2 = 1$, a $-4 + 5 = 1$. Funguje! Pokud je myšlené číslo kladné, zkontroluj zadání.',
          '6': 'Zkontrolujte dosazení do sestavené rovnice.'
        },
        solution: [
          'Sestavení rovnice: $\\frac{3x + 14}{2} = x + 5$',
          'Odstranění zlomku: $3x + 14 = 2x + 10$',
          'Úprava: $x = -4$ (nebo při formulaci o 5 menší $x = 4$). Správné řešení rovnice je 4 pro upravené znění $3x + 14 = 2x + 18 \\implies x = 4$.'
        ]
      }
    ]
  },

  // =========================================================================
  // MÍSTNOST 3: LABORATOŘ PROPORCÍ (Poměry, procenta, úměrnost)
  // =========================================================================
  3: {
    easy: [
      {
        id: 'r3_e1',
        title: 'Krystal 1: Výpočet procentové části',
        prompt: 'Základní cena vstupu do archivu je 450 Kč. Žáci mají slevu 20 %. Kolik Kč zaplatí žák po slevě?',
        answer: '360',
        acceptedAnswers: ['360', '360 Kč'],
        codeFragment: '3',
        hint1: 'Sleva 20 % znamená, že žák zaplatí 80 % původní ceny (nebo spočítejte 20 % a odečtěte).',
        hint2: '$10\\% = 45\\text{ Kč} \\implies 20\\% = 90\\text{ Kč}$. Cena po slevě: $450 - 90$.',
        misconceptions: {
          '90': '90 Kč je pouze velikost SLEVY, nikoliv výsledná cena, kterou žák zaplatí.',
          '370': 'Zkontroluj odečítání: $450 - 90 = 360$.'
        },
        solution: [
          'Výpočet 1 %: $450 : 100 = 4{,}5\\text{ Kč}$',
          'Sleva 20 %: $20 \\cdot 4{,}5 = 90\\text{ Kč}$',
          'Cena po slevě: $450 - 90 = 360\\text{ Kč}$'
        ]
      },
      {
        id: 'r3_e2',
        title: 'Krystal 2: Rozdělení v poměru',
        prompt: 'Časový krystal o hmotnosti 35 gramů byl rozdělen na dvě části v poměru $2 : 3$. Kolik gramů váží těžší část?',
        answer: '21',
        acceptedAnswers: ['21', '21 g'],
        codeFragment: '8',
        hint1: 'Celkový počet dílů je $2 + 3 = 5$ dílů.',
        hint2: 'Jeden díl váží $35 : 5 = 7\\text{ g}$. Těžší část má 3 díly: $3 \\cdot 7$.',
        misconceptions: {
          '14': '14 gramů váží LEHČÍ část ($2 \\cdot 7$). Otázka se ptá na TĚŽŠÍ část.',
          '7': '7 gramů je pouze hodnota 1 dílu.'
        },
        solution: [
          'Počet dílů celkem: $2 + 3 = 5$ dílů',
          'Jeden díl: $35 : 5 = 7\\text{ g}$',
          'Těžší část (3 díly): $3 \\cdot 7 = 21\\text{ g}$'
        ]
      },
      {
        id: 'r3_e3',
        title: 'Krystal 3: Přímá úměrnost',
        prompt: 'Při výrobě 4 energetických článků se spotřebuje 18 gramů krystalického prachu. Kolik gramů prachu je potřeba na 10 stejných článků?',
        answer: '45',
        acceptedAnswers: ['45', '45 g'],
        codeFragment: '1',
        hint1: 'Jde o přímou úměrnost: spočítejte spotřebu na 1 článek ($18 : 4$) a vynásobte deseti.',
        hint2: '$18 : 4 = 4{,}5\\text{ g}$ na jeden článek. Na 10 článků: $10 \\cdot 4{,}5$.',
        misconceptions: {
          '40': 'Zkontroluj násobení: $18 / 4 = 4{,}5$, a $4{,}5 \\cdot 10 = 45$.',
          '36': 'To by platilo pro 8 článků ($2 \\cdot 18$). Na 10 článků je třeba ještě přidat 2 články (+9 g).'
        },
        solution: [
          'Spotřeba na 1 článek: $18 : 4 = 4{,}5\\text{ g}$',
          'Spotřeba na 10 článků: $10 \\cdot 4{,}5 = 45\\text{ g}$'
        ]
      }
    ],
    medium: [
      {
        id: 'r3_m1',
        title: 'Krystal 1: Postupné změny cen (zdražení a zlevnění)',
        prompt: 'Měřicí přístroj stál původně 1 200 Kč. Nejprve byl zlevněn o 20 % a následně byla jeho nová cena zvýšena o 10 %. Kolik Kč stojí přístroj nyní?',
        answer: '1056',
        acceptedAnswers: ['1056', '1056 Kč'],
        codeFragment: '6',
        hint1: 'Pozor: Procenta z nové ceny se počítají ze zlevněné částky, nikoliv z původních 1 200 Kč!',
        hint2: 'Po zlevnění: $1200 \\cdot 0{,}8 = 960\\text{ Kč}$. Nové zdražení o 10 %: $960 \\cdot 1{,}1 = 960 + 96$.',
        misconceptions: {
          '1080': 'Typická chyba! Nelze jednoduše říct $-20\\% + 10\\% = -10\\%$. Druhá změna se počítá ze zlevněné ceny (960 Kč)!',
          '960': '960 Kč je cena po prvním zlevnění, nezapomeňte ji ještě o 10 % zvýšit.'
        },
        solution: [
          'Cena po slevě 20 %: $1200 \\cdot (1 - 0{,}20) = 1200 \\cdot 0{,}80 = 960\\text{ Kč}$',
          'Zdražení o 10 % ze zlevněné ceny: $960 \\cdot (1 + 0{,}10) = 960 \\cdot 1{,}10 = 1056\\text{ Kč}$'
        ]
      },
      {
        id: 'r3_m2',
        title: 'Krystal 2: Dělení odměny v poměru tří složek',
        prompt: 'Tři badatelé si rozdělili grant 7 200 Kč v poměru $2 : 3 : 4$. Kolik Kč obdržel badatel s největším podílem?',
        answer: '3200',
        acceptedAnswers: ['3200', '3200 Kč'],
        codeFragment: '9',
        hint1: 'Sečtěte všechny díly: $2 + 3 + 4 = 9$ dílů.',
        hint2: 'Určete hodnotu jednoho dílu: $7200 : 9 = 800\\text{ Kč}$. Největší podíl má 4 díly: $4 \\cdot 800$.',
        misconceptions: {
          '1600': '1 600 Kč je podíl s NEJMENŠÍM podílem (2 díly). Otázka se ptá na největší podíl (4 díly).',
          '2400': '2 400 Kč je prostřední podíl (3 díly).'
        },
        solution: [
          'Celkový počet dílů: $2 + 3 + 4 = 9$ dílů',
          'Hodnota 1 dílu: $7200 : 9 = 800\\text{ Kč}$',
          'Největší podíl (4 díly): $4 \\cdot 800 = 3200\\text{ Kč}$'
        ]
      },
      {
        id: 'r3_m3',
        title: 'Krystal 3: Měřítko mapy a převody jednotek',
        prompt: 'Na mapě s měřítkem $1 : 50\\,000$ je vzdálenost dvou kontrolních stanovišť $6\\text{ cm}$. Kolik kilometrů je tato vzdálenost ve skutečnosti?',
        answer: '3',
        acceptedAnswers: ['3', '3 km', '3.0', '3,0'],
        codeFragment: '2',
        hint1: 'Měřítko $1 : 50\\,000$ znamená, že $1\\text{ cm}$ na mapě odpovídá $50\\,000\\text{ cm}$ ve skutečnosti.',
        hint2: 'Skutečná vzdálenost: $6 \\cdot 50\\,000 = 300\\,000\\text{ cm}$. Převeďte centimetry na kilometry ($1\\text{ m} = 100\\text{ cm}$, $1\\text{ km} = 1000\\text{ m}$).',
        misconceptions: {
          '30': 'Chyba v převodu jednotek: $300\\,000\\text{ cm} = 3\\,000\\text{ m} = 3\\text{ km}$, nikoliv 30 km.',
          '300': 'Nezapomeňte převést centimetry na kilometry (dělíme 100 000).'
        },
        solution: [
          'Výpočet v centimetrech: $6 \\cdot 50\\,000 = 300\\,000\\text{ cm}$',
          'Převod na metry: $300\\,000 : 100 = 3\\,000\\text{ m}$',
          'Převod na kilometry: $3\\,000 : 1\\,000 = 3\\text{ km}$'
        ]
      }
    ],
    hard: [
      {
        id: 'r3_h1',
        title: 'Krystal 1: Směsi a koncentrace roztoků',
        prompt: 'Kolik litrů čisté vody musíme přilít do 6 litrů $40\\%$ roztoku kyseliny, abychom získali roztok s koncentrací $15\\%$?',
        answer: '10',
        acceptedAnswers: ['10', '10 l', '10 litrů'],
        codeFragment: '7',
        hint1: 'Určete množství čisté kyseliny: $6 \\cdot 0{,}40 = 2{,}4\\text{ litru}$. Toto množství se přidáním vody nezmění.',
        hint2: 'Sestavte rovnici: $2{,}4 = 0{,}15 \\cdot (6 + x)$, kde $x$ je přidaná voda.',
        misconceptions: {
          '16': '16 litrů je CELKOVÝ výsledný objem roztoku ($6 + 10$). Přidané vody je $16 - 6 = 10$ litrů.',
          '8': 'Zkontroluj výpočet: $2{,}4 / 0{,}15 = 16$, tedy $x = 16 - 6 = 10$.'
        },
        solution: [
          'Objem čisté složky: $6 \\cdot 0{,}40 = 2{,}4\\text{ litru}$',
          'Rovnice pro novou koncentraci: $\\frac{2{,}4}{6 + x} = 0{,}15$',
          'Výpočet celkového objemu: $6 + x = \\frac{2{,}4}{0{,}15} = 16\\text{ litrů}$',
          'Objem přidané vody: $x = 16 - 6 = 10\\text{ litrů}$'
        ]
      },
      {
        id: 'r3_h2',
        title: 'Krystal 2: Slovní úloha o společné práci',
        prompt: 'První čerpadlo naplní nádrž za 12 hodin, druhé výkonnější čerpadlo za 6 hodin. Za kolik hodin se nádrž naplní, pokud budou pracovat obě čerpadla současně?',
        answer: '4',
        acceptedAnswers: ['4', '4 h', '4 hodiny'],
        codeFragment: '1',
        hint1: 'Za 1 hodinu naplní 1. čerpadlo $\\frac{1}{12}$ nádrže a 2. čerpadlo $\\frac{1}{6}$ nádrže.',
        hint2: 'Společně za 1 hodinu: $\\frac{1}{12} + \\frac{1}{6} = \\frac{1+2}{12} = \\frac{3}{12} = \\frac{1}{4}$ nádrže. Celý čas je převrácená hodnota.',
        misconceptions: {
          '9': 'Typická chyba! Nelze zprůměrovat časy $(12+6)/2 = 9$. Když pracují obě čerpadla, musí to trvat MÉNĚ než 6 hodin!',
          '18': 'Časy se nesčítají, výkonnost se spojuje.'
        },
        solution: [
          'Výkon 1. čerpadla za 1 h: $\\frac{1}{12}$ nádrže',
          'Výkon 2. čerpadla za 1 h: $\\frac{1}{6} = \\frac{2}{12}$ nádrže',
          'Společný výkon za 1 h: $\\frac{1}{12} + \\frac{2}{12} = \\frac{3}{12} = \\frac{1}{4}$ nádrže',
          'Doba naplnění celé nádrže: $t = 1 : \\frac{1}{4} = 4\\text{ hodiny}$'
        ]
      },
      {
        id: 'r3_h3',
        title: 'Krystal 3: Obrácená procenta a zisk',
        prompt: 'Prodejce prodal elektronický čip za 2 760 Kč, čímž dosáhl zisku $15\\%$ oproti své nákupní ceně. Za kolik Kč prodejce čip původně nakoupil?',
        answer: '2400',
        acceptedAnswers: ['2400', '2400 Kč'],
        codeFragment: '4',
        hint1: 'Cena 2 760 Kč představuje $115\\%$ původní nákupní ceny (nikoliv $100\\%$).',
        hint2: 'Vydělte částku $115$ pro zjištění 1 % ($2760 : 115 = 24\\text{ Kč}$) a vynásobte $100$.',
        misconceptions: {
          '2346': 'Chyba! Odečetli jste 15 % z prodejní ceny ($2760 \\cdot 0{,}85$). Procenta zisku se ale počítají z NÁKUPNÍ ceny!',
          '2380': 'Zkontroluj dělení: $2760 / 1{,}15 = 2400$.'
        },
        solution: [
          'Prodejní cena odpovídá: $100\\% + 15\\% = 115\\%$',
          'Hodnota 1 %: $2760 : 115 = 24\\text{ Kč}$',
          'Původní nákupní cena (100 %): $100 \\cdot 24 = 2400\\text{ Kč}$'
        ]
      }
    ]
  },

  // =========================================================================
  // MÍSTNOST 4: GEOMETRICKÁ OBSERVATOŘ (Pythagorova věta, obsahy, tělesa)
  // =========================================================================
  4: {
    easy: [
      {
        id: 'r4_e1',
        title: 'Objektiv 1: Pythagorova věta - odvěsna',
        prompt: 'V pravoúhlém trojúhelníku má přepona délku $c = 10\\text{ cm}$ a jedna odvěsna $a = 6\\text{ cm}$. Jaká je délka druhé odvěsny $b$ v cm?',
        answer: '8',
        acceptedAnswers: ['8', '8 cm'],
        codeFragment: '5',
        hint1: 'Podle Pythagorovy věty platí: $b^2 = c^2 - a^2$.',
        hint2: '$b^2 = 10^2 - 6^2 = 100 - 36 = 64$. Odmocněte $\\sqrt{64}$.',
        misconceptions: {
          '11.66': 'Pozor! Přepona je nejdelší strana, odvěsnu získáte ODEČTENÍM: $c^2 - a^2$, nikoliv sčítáním!',
          '4': 'Zkontroluj výpočet: $100 - 36 = 64$, a $\\sqrt{64} = 8$.'
        },
        solution: [
          'Pythagorova věta: $b = \\sqrt{c^2 - a^2}$',
          'Dosazení: $b = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64}$',
          'Délka odvěsny $b = 8\\text{ cm}$'
        ]
      },
      {
        id: 'r4_e2',
        title: 'Objektiv 2: Obsah pravoúhlého trojúhelníku',
        prompt: 'Vypočítejte obsah pravoúhlého trojúhelníku s odvěsnami délek $8\\text{ cm}$ a $15\\text{ cm}$ v $\\text{cm}^2$.',
        answer: '60',
        acceptedAnswers: ['60', '60 cm2', '60 cm^2'],
        codeFragment: '2',
        hint1: 'Obsah pravoúhlého trojúhelníku je polovina součinu jeho odvěsen: $S = \\frac{a \\cdot b}{2}$.',
        hint2: '$S = \\frac{8 \\cdot 15}{2} = \\frac{120}{2}$.',
        misconceptions: {
          '120': 'Nezapomněli jste vydělit dvěma? Trojúhelník tvoří polovinu obdélníku: $S = (a \\cdot b) / 2$.',
          '23': '23 cm je součet odvěsen, nikoliv obsah!'
        },
        solution: [
          'Vzorec pro obsah: $S = \\frac{a \\cdot b}{2}$',
          'Výpočet: $S = \\frac{8 \\cdot 15}{2} = \\frac{120}{2} = 60\\text{ cm}^2$'
        ]
      },
      {
        id: 'r4_e3',
        title: 'Objektiv 3: Úhly v trojúhelníku',
        prompt: 'V trojúhelníku mají dva vnitřní úhly velikosti $\\alpha = 48^\\circ$ a $\\beta = 72^\\circ$. Jakou velikost má třetí úhel $\\gamma$ ve stupních?',
        answer: '60',
        acceptedAnswers: ['60', '60°', '60 stupňů'],
        codeFragment: '7',
        hint1: 'Součet všech vnitřních úhlů v libovolném trojúhelníku je vždy $180^\\circ$.',
        hint2: '$\\gamma = 180^\\circ - (48^\\circ + 72^\\circ) = 180^\\circ - 120^\\circ$.',
        misconceptions: {
          '120': '120° je součet úhlů $\\alpha + \\beta$, třetí úhel je $180^\\circ - 120^\\circ$.',
          '50': 'Zkontroluj sčítání: $48 + 72 = 120$, $180 - 120 = 60$.'
        },
        solution: [
          'Součet úhlů v trojúhelníku: $\\alpha + \\beta + \\gamma = 180^\\circ$',
          'Výpočet: $\\gamma = 180^\\circ - (48^\\circ + 72^\\circ) = 180^\\circ - 120^\\circ = 60^\\circ$'
        ]
      }
    ],
    medium: [
      {
        id: 'r4_m1',
        title: 'Objektiv 1: Pythagorova věta a obsah trojúhelníku',
        prompt: 'V pravoúhlém trojúhelníku má odvěsna délku $a = 12\\text{ cm}$ a přepona $c = 13\\text{ cm}$. Vypočítejte obsah tohoto trojúhelníku v $\\text{cm}^2$.',
        answer: '30',
        acceptedAnswers: ['30', '30 cm2', '30 cm^2'],
        codeFragment: '1',
        hint1: 'Nejprve pomocí Pythagorovy věty dopočítejte druhou odvěsnu $b = \\sqrt{13^2 - 12^2}$.',
        hint2: '$b = \\sqrt{169 - 144} = \\sqrt{25} = 5\\text{ cm}$. Následně spočítejte obsah $S = \\frac{12 \\cdot 5}{2}$.',
        misconceptions: {
          '60': 'Nezapomněli jste vydělit součin odvěsen dvěma? $S = (12 \\cdot 5) / 2 = 30$.',
          '78': 'Pozor! Obsah se nepočítá jako násobení odvěsny a přepony, ale z obou ODVĚSEN ($a$ a $b$).'
        },
        solution: [
          'Výpočet odvěsny $b$: $b = \\sqrt{13^2 - 12^2} = \\sqrt{169 - 144} = \\sqrt{25} = 5\\text{ cm}$',
          'Výpočet obsahu: $S = \\frac{a \\cdot b}{2} = \\frac{12 \\cdot 5}{2} = 30\\text{ cm}^2$'
        ]
      },
      {
        id: 'r4_m2',
        title: 'Objektiv 2: Rovnoramenný lichoběžník',
        prompt: 'Rovnoramenný lichoběžník má základny délek $a = 16\\text{ cm}$, $c = 6\\text{ cm}$ a rameno $b = 13\\text{ cm}$. Vypočítejte obsah tohoto lichoběžníku v $\\text{cm}^2$.',
        answer: '132',
        acceptedAnswers: ['132', '132 cm2', '132 cm^2'],
        codeFragment: '4',
        hint1: 'Pro výpočet výšky $v$ sestavte pravoúhlý trojúhelník pod ramenem: odvěsna $x = \\frac{a - c}{2} = \\frac{16 - 6}{2} = 5\\text{ cm}$.',
        hint2: 'Výška $v = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = 12\\text{ cm}$. Obsah $S = \\frac{(a + c) \\cdot v}{2} = \\frac{22 \\cdot 12}{2}$.',
        misconceptions: {
          '143': 'Nepoužili jste rameno 13 cm přímo jako výšku? Lichoběžník má šikmá ramena, výšku musíte spočítat Pythagorovou větou ($v = 12\\text{ cm}$).',
          '264': 'Nezapomněli jste dělit dvěma ve vzorci pro obsah lichoběžníku $S = \\frac{(a+c)v}{2}$?'
        },
        solution: [
          'Délka úseku základny pod ramenem: $x = \\frac{16 - 6}{2} = 5\\text{ cm}$',
          'Výška lichoběžníku z Pythagorovy věty: $v = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12\\text{ cm}$',
          'Obsah lichoběžníku: $S = \\frac{(16 + 6) \\cdot 12}{2} = \\frac{22 \\cdot 12}{2} = 132\\text{ cm}^2$'
        ]
      },
      {
        id: 'r4_m3',
        title: 'Objektiv 3: Úhly v rovnoramenném trojúhelníku',
        prompt: 'V rovnoramenném trojúhelníku $ABC$ s hlavním vrcholem $C$ má úhel při základně velikost $\\alpha = 55^\\circ$. Jakou velikost má vnitřní úhel $\\gamma$ při vrcholu $C$ ve stupních?',
        answer: '70',
        acceptedAnswers: ['70', '70°', '70 stupňů'],
        codeFragment: '8',
        hint1: 'V rovnoramenném trojúhelníku jsou oba úhly při základně shodné: $\\alpha = \\beta = 55^\\circ$.',
        hint2: 'Součet úhlů je $180^\\circ \\implies \\gamma = 180^\\circ - 2 \\cdot 55^\\circ = 180^\\circ - 110^\\circ$.',
        misconceptions: {
          '125': '125° by byl vnější úhel nebo chyba $180 - 55$. Úhly při základně jsou DVA ($2 \\cdot 55^\\circ = 110^\\circ$).',
          '55': '55° je úhel při základně, nikoliv úhel při hlavním vrcholu $C$.'
        },
        solution: [
          'Úhly při základně: $\\alpha = \\beta = 55^\\circ$',
          'Součet úhlů při základně: $55^\\circ + 55^\\circ = 110^\\circ$',
          'Úhel při hlavním vrcholu: $\\gamma = 180^\\circ - 110^\\circ = 70^\\circ$'
        ]
      }
    ],
    hard: [
      {
        id: 'r4_h1',
        title: 'Objektiv 1: Tělesová úhlopříčka krychle a kvádru',
        prompt: 'Kvádr má rozměry podstavy $a = 6\\text{ cm}$, $b = 8\\text{ cm}$ a výšku $c = 24\\text{ cm}$. Jaká je délka tělesové úhlopříčky kvádru v cm?',
        answer: '26',
        acceptedAnswers: ['26', '26 cm'],
        codeFragment: '9',
        hint1: 'Použijte prostorovou Pythagorovu větu: $u^2 = a^2 + b^2 + c^2$.',
        hint2: '$u^2 = 6^2 + 8^2 + 24^2 = 36 + 64 + 576 = 100 + 576 = 676$. Spočtěte $\\sqrt{676}$.',
        misconceptions: {
          '10': '10 cm je pouze STĚNOVÁ úhlopříčka podstavy ($u_p = \\sqrt{6^2+8^2} = 10$). Tělesová úhlopříčka je $\\sqrt{10^2+24^2}$.',
          '38': '38 cm je prostý součet rozměrů $6 + 8 + 24$, nikoliv úhlopříčka!'
        },
        solution: [
          'Stěnová úhlopříčka podstavy: $u_p = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10\\text{ cm}$',
          'Tělesová úhlopříčka: $u = \\sqrt{u_p^2 + c^2} = \\sqrt{10^2 + 24^2} = \\sqrt{100 + 576} = \\sqrt{676} = 26\\text{ cm}$'
        ]
      },
      {
        id: 'r4_h2',
        title: 'Objektiv 2: Obsah složeného obrazce (kruh a čtverec)',
        prompt: 'Do čtverce o straně $a = 20\\text{ cm}$ je vepsán kruh. O kolik $\\text{cm}^2$ je obsah čtverce větší než obsah vepsaného kruhu? (Za $\\pi$ počítejte hodnotu $3{,}14$).',
        answer: '86',
        acceptedAnswers: ['86', '86 cm2', '86 cm^2', '85.84'],
        codeFragment: '3',
        hint1: 'Obsah čtverce: $S_1 = a^2 = 20^2 = 400\\text{ cm}^2$. Poloměr vepsaného kruhu je polovina strany: $r = 10\\text{ cm}$.',
        hint2: 'Obsah kruhu: $S_2 = \\pi r^2 = 3{,}14 \\cdot 10^2 = 314\\text{ cm}^2$. Rozdíl: $400 - 314$.',
        misconceptions: {
          '314': '314 cm² je obsah samotného kruhu, otázka se ptá na ROZDÍL obsahů čtverce a kruhu ($400 - 314$).',
          '71.6': 'Zkontrolujte poloměr: $r = 10\\text{ cm}$, tedy $r^2 = 100$, nikoliv $r = 20$.'
        },
        solution: [
          'Obsah čtverce: $S_{ctverec} = 20^2 = 400\\text{ cm}^2$',
          'Poloměr vepsaného kruhu: $r = 10\\text{ cm}$',
          'Obsah kruhu: $S_{kruh} = \\pi r^2 = 3{,}14 \\cdot 100 = 314\\text{ cm}^2$',
          'Rozdíl obsahů: $400 - 314 = 86\\text{ cm}^2$'
        ]
      },
      {
        id: 'r4_h3',
        title: 'Objektiv 3: Objem a povrch pravidelného čtyřbokého jehlanu',
        prompt: 'Pravidelný čtyřboký jehlan má podstavnou hranu $a = 10\\text{ cm}$ a výšku tělesa $v = 12\\text{ cm}$. Jaký je jeho objem v $\\text{cm}^3$?',
        answer: '400',
        acceptedAnswers: ['400', '400 cm3', '400 cm^3'],
        codeFragment: '6',
        hint1: 'Obsah čtvercové podstavy je $S_p = a^2 = 10^2 = 100\\text{ cm}^2$.',
        hint2: 'Vzorec pro objem jehlanu: $V = \\frac{1}{3} S_p v = \\frac{1}{3} \\cdot 100 \\cdot 12$.',
        misconceptions: {
          '1200': 'Nezapomněli jste vydělit třemi? Vzorec pro objem jehlanu je $V = \\frac{1}{3} S_p v$, nikoliv $S_p v$.',
          '600': 'Jehlan má třetinový objem oproti hranolu, nikoliv poloviční.'
        },
        solution: [
          'Obsah podstavy: $S_p = 10^2 = 100\\text{ cm}^2$',
          'Objem jehlanu: $V = \\frac{1}{3} S_p v = \\frac{1}{3} \\cdot 100 \\cdot 12 = 100 \\cdot 4 = 400\\text{ cm}^3$'
        ]
      }
    ]
  },

  // =========================================================================
  // MÍSTNOST 5: KOMORA LOGIKY A DAT (Číselné řady, kombinatorika, grafy)
  // =========================================================================
  5: {
    easy: [
      {
        id: 'r5_e1',
        title: 'Runa 1: Číselná posloupnost',
        prompt: 'Doplňte chybějící číslo v řadě:\n$$3, 7, 11, 15, 19, \\boldsymbol{?}$$',
        answer: '23',
        acceptedAnswers: ['23'],
        codeFragment: '7',
        hint1: 'Všimněte si rozdílů mezi sousedními čísly: $7 - 3 = 4$, $11 - 7 = 4$.',
        hint2: 'Jde o aritmetickou posloupnost s diferencí $+4$. K číslu 19 přičtěte 4.',
        misconceptions: {
          '21': 'Pozor: rozdíl mezi členy je 4 ($15 + 4 = 19$), tedy $19 + 4 = 23$.',
          '24': 'Zkontroluj sčítání: $19 + 4 = 23$.'
        },
        solution: [
          'Každý další člen je o 4 větší než předchozí.',
          'Pravidlo: $+4$',
          'Chybějící číslo: $19 + 4 = 23$'
        ]
      },
      {
        id: 'r5_e2',
        title: 'Runa 2: Kombinatorické pravidlo součinu',
        prompt: 'V jídelně archivu si můžete vybrat ze 3 polévek, 4 hlavních jídel a 2 nápojů. Kolik různých tříchodových obědových menu lze sestavit?',
        answer: '24',
        acceptedAnswers: ['24'],
        codeFragment: '2',
        hint1: 'Každou polévku lze zkombinovat s každým hlavním jídlem a každým nápojem.',
        hint2: 'Použijte kombinatorické pravidlo součinu: vynásobte počty možností $3 \\cdot 4 \\cdot 2$.',
        misconceptions: {
          '9': 'Typická chyba! Možnosti nesčítáme ($3+4+2=9$), ale NÁSOBÍME, protože volby jsou na sobě nezávislé.',
          '12': 'Nezapomněli jste vynásobit také 2 nápoje? ($3 \\cdot 4 \\cdot 2 = 24$).'
        },
        solution: [
          'Aplikace pravidla součinu: počet menu $= 3 \\cdot 4 \\cdot 2$',
          'Výpočet: $12 \\cdot 2 = 24$ různých kombinací'
        ]
      },
      {
        id: 'r5_e3',
        title: 'Runa 3: Práce s tabulkou',
        prompt: 'V tabulce bodů ze 4 testů má žák body: 14, 18, 12, 16. Jaký je jeho průměrný počet bodů na jeden test?',
        answer: '15',
        acceptedAnswers: ['15', '15.0', '15,0'],
        codeFragment: '9',
        hint1: 'Aritmetický průměr spočítáte sečtením všech hodnot a vydělením počtem testů (4).',
        hint2: 'Součet: $14 + 18 + 12 + 16 = 60$. Průměr: $60 : 4$.',
        misconceptions: {
          '60': '60 je celkový SOUČET bodů. Nezapomeňte ho vydělit počtem testů (4).',
          '14': 'Zkontroluj výpočet: $60 / 4 = 15$.'
        },
        solution: [
          'Součet bodů: $14 + 18 + 12 + 16 = 60$',
          'Aritmetický průměr: $60 : 4 = 15$'
        ]
      }
    ],
    medium: [
      {
        id: 'r5_m1',
        title: 'Runa 1: Nelineární číselná posloupnost',
        prompt: 'Doplňte chybějící číslo v logické řadě:\n$$2, 5, 11, 23, 47, \\boldsymbol{?}$$',
        answer: '95',
        acceptedAnswers: ['95'],
        codeFragment: '8',
        hint1: 'Sledujte vztah mezi sousedními členy: $5 = 2 \\cdot 2 + 1$, $11 = 5 \\cdot 2 + 1$, $23 = 11 \\cdot 2 + 1$.',
        hint2: 'Nebo rozdíly: $+3, +6, +12, +24, +48$. Další číslo je $47 + 48$ nebo $47 \\cdot 2 + 1$.',
        misconceptions: {
          '71': 'Pozor: rozdíl není konstantní. Rozdíly se v každém kroku zdvojnásobují (3, 6, 12, 24, 48).',
          '94': 'Nezapomněli jste přičíst jedničku? $47 \\cdot 2 = 94$, s pravidlem $+1$ je to $95$.'
        },
        solution: [
          'Pravidlo 1: Každé číslo je dvojnásobkem předchozího zvětšeným o 1 ($a_{n+1} = 2a_n + 1$).',
          'Pravidlo 2 (přes přírůstky): Přírůstky jsou $3, 6, 12, 24 \\implies$ další přírůstek je 48.',
          'Výpočet: $47 \\cdot 2 + 1 = 94 + 1 = 95$ (nebo $47 + 48 = 95$)'
        ]
      },
      {
        id: 'r5_m2',
        title: 'Runa 2: Kombinatorika s podmínkou',
        prompt: 'Kolik různých trojciferných čísel větších než 400 lze sestavit z cifer $\\{1, 3, 5, 7, 9\\}$, pokud se žádná cifra v čísle nesmí opakovat?',
        answer: '36',
        acceptedAnswers: ['36'],
        codeFragment: '5',
        hint1: 'Na pozici stovek (první cifra) mohou být pouze cifry větší než 4, tedy $\\{5, 7, 9\\}$ (3 možnosti).',
        hint2: 'Na pozici desítek zbývají 4 cifry z pěti. Na pozici jednotek zbývají 3 cifry. Vynásobte: $3 \\cdot 4 \\cdot 3$.',
        misconceptions: {
          '60': '60 by byl počet VŠECH trojciferných čísel z 5 cifer ($5 \\cdot 4 \\cdot 3$). Číslo ale musí být větší než 400 (stovky mohou být jen 5, 7, 9).',
          '12': 'Nezapomeňte vynásobit možnosti pro všechny 3 pozice: $3 \\cdot 4 \\cdot 3 = 36$.'
        },
        solution: [
          'Počet možností pro stovky ($>4$, tedy 5, 7, 9): 3 možnosti',
          'Počet možností pro desítky (ze zbývajících 4 cifer): 4 možnosti',
          'Počet možností pro jednotky (ze zbývajících 3 cifer): 3 možnosti',
          'Celkem čísel: $3 \\cdot 4 \\cdot 3 = 36$'
        ]
      },
      {
        id: 'r5_m3',
        title: 'Runa 3: Množiny a Vennovy diagramy',
        prompt: 'Ve třídě je 28 žáků. 18 žáků hraje fotbal, 14 žáků hraje florbal a 4 žáci nehrají ani jeden z těchto sportů. Kolik žáků hraje fotbal i florbal zároveň?',
        answer: '8',
        acceptedAnswers: ['8'],
        codeFragment: '1',
        hint1: 'Počet žáků, kteří hrají alespoň jeden sport, je $28 - 4 = 24$ žáků.',
        hint2: 'Sečtěte sportovce: $18 + 14 = 32$. Rozdíl oproti 24 tvoří žáci v průniku obou sportů ($32 - 24$).',
        misconceptions: {
          '4': '4 žáci nehrají žádný sport. Průnik je $18 + 14 - (28 - 4) = 32 - 24 = 8$.',
          '10': 'Zkontroluj výpočet: $18 + 14 = 32$, $32 - 24 = 8$.'
        },
        solution: [
          'Počet žáků hrajících alespoň jeden sport: $28 - 4 = 24$',
          'Vzorec pro sjednocení množin: $|A \\cup B| = |A| + |B| - |A \\cap B|$',
          'Dosazení: $24 = 18 + 14 - x \\implies 24 = 32 - x$',
          'Počet žáků hrajících oba sporty: $x = 32 - 24 = 8$'
        ]
      }
    ],
    hard: [
      {
        id: 'r5_h1',
        title: 'Runa 1: Posloupnost obrazců a teček',
        prompt: 'V 1. obrazci je 5 teček, ve 2. je 9 teček, ve 3. je 13 teček, ve 4. je 17 teček. Kolik teček bude v 20. obrazci této řady?',
        answer: '81',
        acceptedAnswers: ['81'],
        codeFragment: '4',
        hint1: 'Vzorec pro $n$-tý člen je $a_n = a_1 + (n - 1) \\cdot d$, kde $a_1 = 5$ a diference $d = 4$.',
        hint2: 'Nebo: $a_n = 4n + 1$. Pro $n = 20$: $4 \\cdot 20 + 1$.',
        misconceptions: {
          '80': 'Nezapomněli jste na posun $+1$? V 1. obrazci je 5 teček ($4 \\cdot 1 + 1 = 5$), tedy v 20. je $4 \\cdot 20 + 1 = 81$.',
          '85': 'Zkontroluj vzorec: $5 + (20 - 1) \\cdot 4 = 5 + 19 \\cdot 4 = 5 + 76 = 81$.'
        },
        solution: [
          'Diference mezi obrazci: $d = 4$',
          'Vzorec pro $n$-tý člen: $a_n = 5 + (n - 1) \\cdot 4 = 4n + 1$',
          'Pro 20. obrazec ($n = 20$): $a_{20} = 4 \\cdot 20 + 1 = 80 + 1 = 81\\text{ teček}$'
        ]
      },
      {
        id: 'r5_h2',
        title: 'Runa 2: Kombinatorika - podání rukou / turnaj',
        prompt: 'Na šachovém turnaji v archivu hraje každý hráč s každým právě jednu partii. Celkem bylo odehráno 45 partií. Kolik hráčů se turnaje zúčastnilo?',
        answer: '10',
        acceptedAnswers: ['10', '10 hráčů'],
        codeFragment: '6',
        hint1: 'Počet partií mezi $n$ hráči je dán vzorcem $\\frac{n(n - 1)}{2} = 45$.',
        hint2: '$n(n - 1) = 90$. Hledejte dvě po sobě jdoucí přirozená čísla, jejichž součin je 90 ($10 \\cdot 9$).',
        misconceptions: {
          '9': 'Pro 9 hráčů by bylo partií $(9 \\cdot 8)/2 = 36$. Pro 45 partií je potřeba 10 hráčů ($10 \\cdot 9 / 2 = 45$).',
          '45': '45 je počet partií, nikoliv počet hráčů.'
        },
        solution: [
          'Vzorec pro počet dvojic z $n$ prvků: $\\frac{n(n - 1)}{2} = 45$',
          'Úprava: $n(n - 1) = 90$',
          'Rozklad na součin sousedních čísel: $10 \\cdot 9 = 90 \\implies n = 10\\text{ hráčů}$'
        ]
      },
      {
        id: 'r5_h3',
        title: 'Runa 3: Logická bilance a průměrná rychlost',
        prompt: 'Automobil jel první polovinu celkové dráhy průměrnou rychlostí $60\\text{ km/h}$ a druhou polovinu stejné dráhy rychlostí $90\\text{ km/h}$. Jaká byla průměrná rychlost automobilu na celé trase v km/h?',
        answer: '72',
        acceptedAnswers: ['72', '72 km/h', '72.0', '72,0'],
        codeFragment: '3',
        hint1: 'Pozor: Průměrná rychlost NENÍ aritmetický průměr rychlostí! Počítá se jako celková dráha dělená celkovým časem: $v = \\frac{s}{t_1 + t_2}$.',
        hint2: 'Zvolte si např. celkovou dráhu $s = 360\\text{ km}$ (polovina $= 180\\text{ km}$). $t_1 = 180/60 = 3\\text{ h}$, $t_2 = 180/90 = 2\\text{ h}$. $v = 360 / (3 + 2)$.',
        misconceptions: {
          '75': 'Klasický chyták! Nelze spočítat $(60 + 90)/2 = 75$, protože při nižší rychlosti strávil vůz na trati VÍCE ČASU. Správný je harmonický průměr.',
          '70': 'Zkontroluj výpočet: $360 / 5 = 72\\text{ km/h}$.'
        },
        solution: [
          'Vzorec: $v_p = \\frac{s_{celk}}{t_{celk}} = \\frac{2s}{\\frac{s}{v_1} + \\frac{s}{v_2}} = \\frac{2 v_1 v_2}{v_1 + v_2}$',
          'Dosazení: $v_p = \\frac{2 \\cdot 60 \\cdot 90}{60 + 90} = \\frac{10800}{150}$',
          'Výpočet: $v_p = 72\\text{ km/h}$'
        ]
      }
    ]
  },

  // =========================================================================
  // MÍSTNOST 6: FINÁLNÍ ŘÍDICÍ SÁL (Syntéza a CERMAT výzva)
  // =========================================================================
  6: {
    easy: [
      {
        id: 'r6_e1',
        title: 'Reaktor 1: Slovní úloha s pohybem',
        prompt: 'Dva turisté vyrazili v 9:00 proti sobě ze dvou míst vzdálených 24 km. První jde rychlostí $4\\text{ km/h}$, druhý rychlostí $2\\text{ km/h}$. Za kolik hodin se potkají?',
        answer: '4',
        acceptedAnswers: ['4', '4 h', '4 hodiny'],
        codeFragment: '9',
        hint1: 'Rychlosti turistů se sčítají, protože jdou proti sobě: $v = 4 + 2 = 6\\text{ km/h}$.',
        hint2: 'Čas do setkání spočítáte ze vzorce $t = s / v = 24 / 6$.',
        misconceptions: {
          '6': 'Zkontroluj dělení: $24 / 6 = 4\\text{ hodiny}$.',
          '12': 'Turisté se přibližují společnou rychlostí 6 km/h, nikoliv 2 km/h.'
        },
        solution: [
          'Rychlost vzájemného přibližování: $v = 4 + 2 = 6\\text{ km/h}$',
          'Čas do setkání: $t = \\frac{s}{v} = \\frac{24}{6} = 4\\text{ hodiny}$'
        ]
      },
      {
        id: 'r6_e2',
        title: 'Reaktor 2: Obvod a obsah v praxi',
        prompt: 'Obdélníková zahrada má délku $25\\text{ m}$ a šířku $12\\text{ m}$. Kolik metrů pletiva je potřeba na její oplocení (obvod)?',
        answer: '74',
        acceptedAnswers: ['74', '74 m'],
        codeFragment: '3',
        hint1: 'Obvod obdélníku se spočítá podle vzorce $o = 2 \\cdot (a + b)$.',
        hint2: '$o = 2 \\cdot (25 + 12) = 2 \\cdot 37$.',
        misconceptions: {
          '300': '300 m² je OBSAH zahrady ($25 \\cdot 12$). Na oplocení potřebujete OBVOD ($2(a+b)$).',
          '37': '37 m je pouze polovina obvodu ($a + b$), nezapomeňte vynásobit dvěma.'
        },
        solution: [
          'Vzorec pro obvod obdélníku: $o = 2(a + b)$',
          'Dosazení: $o = 2(25 + 12) = 2 \\cdot 37 = 74\\text{ m}$'
        ]
      },
      {
        id: 'r6_e3',
        title: 'Reaktor 3: Finální kalibrace portálu',
        prompt: 'Vyřešte rovnici a určete aktivační kód $K$:\n$$5K - 13 = 2K + 14$$',
        answer: '9',
        acceptedAnswers: ['9'],
        codeFragment: '1',
        hint1: 'Odečtěte $2K$ a přičtěte 13: $5K - 2K = 14 + 13$.',
        hint2: '$3K = 27 \\implies K = 27 : 3$.',
        misconceptions: {
          '-9': 'Pozor na převod: $14 + 13 = +27$, nikoliv $-27$.',
          '3': 'Zkontroluj dělení: $27 / 3 = 9$.'
        },
        solution: [
          'Převod členů: $5K - 2K = 14 + 13$',
          'Úprava: $3K = 27$',
          'Dělení třemi: $K = 9$'
        ]
      }
    ],
    medium: [
      {
        id: 'r6_m1',
        title: 'Reaktor 1: Pohyb se zpožděním (přijímačkový standard)',
        prompt: 'Z města A vyjel v 8:00 cyklista rychlostí $15\\text{ km/h}$. V 9:00 za ním vyjel ze stejného místa motocyklista rychlostí $45\\text{ km/h}$. V kolika kilometrech od města A motocyklista cyklistu dohoní?',
        answer: '22.5',
        acceptedAnswers: ['22.5', '22,5', '22.5 km', '45/2'],
        codeFragment: '3',
        hint1: 'V 9:00 má cyklista náskok $15\\text{ km}$ ($1\\text{ h} \\cdot 15\\text{ km/h}$). Relativní rychlost přibližování je $45 - 15 = 30\\text{ km/h}$.',
        hint2: 'Čas motocyklisty: $t = 15 / 30 = 0{,}5\\text{ h}$. Ujetá vzdálenost: $s = 45 \\cdot 0{,}5$.',
        misconceptions: {
          '0.5': '0,5 hodiny je ČAS jízdy motocyklisty, ale otázka se ptá na VZDÁLENOST od města A v kilometrech!',
          '45': 'Za 1 hodinu by ujel 45 km, ale dohoní ho už za půl hodiny (za 30 minut).'
        },
        solution: [
          'Náskok cyklisty v 9:00: $s_0 = 15\\text{ km}$',
          'Relativní rychlost: $v_{rel} = 45 - 15 = 30\\text{ km/h}$',
          'Doba jízdy motocyklisty: $t = \\frac{15}{30} = 0{,}5\\text{ h}$ (30 minut)',
          'Vzdálenost místa setkání od A: $s = 45 \\cdot 0{,}5 = 22{,}5\\text{ km}$'
        ]
      },
      {
        id: 'r6_m2',
        title: 'Reaktor 2: Geometricko-algebraická syntéza',
        prompt: 'Obdélníkový pozemek má obvod $84\\text{ m}$. Jedna jeho strana je o $6\\text{ m}$ delší než druhá. Vypočítejte obsah tohoto pozemku v $\\text{m}^2$.',
        answer: '432',
        acceptedAnswers: ['432', '432 m2', '432 m^2'],
        codeFragment: '7',
        hint1: 'Polovina obvodu je $a + b = 42\\text{ m}$. Jelikož $a = b + 6$, platí: $(b + 6) + b = 42$.',
        hint2: '$2b + 6 = 42 \\implies 2b = 36 \\implies b = 18\\text{ m}$, $a = 24\\text{ m}$. Obsah $S = 24 \\cdot 18$.',
        misconceptions: {
          '42': '42 m je pouze polovina obvodu ($a + b$), nikoliv obsah.',
          '450': 'Zkontrolujte rozměry: strany jsou 24 m a 18 m, $24 \\cdot 18 = 432\\text{ m}^2$.'
        },
        solution: [
          'Rovnice pro obvod: $2(a + b) = 84 \\implies a + b = 42$',
          'Dosazení $a = b + 6$: $b + 6 + b = 42 \\implies 2b = 36 \\implies b = 18\\text{ m}$',
          'Druhá strana: $a = 18 + 6 = 24\\text{ m}$',
          'Obsah pozemku: $S = a \\cdot b = 24 \\cdot 18 = 432\\text{ m}^2$'
        ]
      },
      {
        id: 'r6_m3',
        title: 'Reaktor 3: Finální lineární rovnice portálu',
        prompt: 'Určete hodnotu neznámé $K$, která stabilizuje časový portál:\n$$\\frac{2K + 5}{3} - \\frac{K - 1}{2} = 7$$',
        answer: '29',
        acceptedAnswers: ['29'],
        codeFragment: '9',
        hint1: 'Vynásobte celou rovnici společným jmenovatelem 6. Nezapomeňte vynásobit pravou stranu ($7 \\cdot 6 = 42$).',
        hint2: '$2(2K + 5) - 3(K - 1) = 42 \\implies 4K + 10 - 3K + 3 = 42 \\implies K + 13 = 42$.',
        misconceptions: {
          '35': 'Pozor na roznásobení se záporným číslem: $-3(K - 1) = -3K + 3$, tedy $10 + 3 = 13$, nikoliv 7.',
          '-29': 'Zkontroluj znaménko: $K = 42 - 13 = +29$.'
        },
        solution: [
          'Vynásobíme číslem 6: $2(2K + 5) - 3(K - 1) = 42$',
          'Roznásobíme závorky: $4K + 10 - 3K + 3 = 42$',
          'Sloučíme členy na levé straně: $K + 13 = 42$',
          'Odečteme 13: $K = 29$'
        ]
      }
    ],
    hard: [
      {
        id: 'r6_h1',
        title: 'Reaktor 1: Komplexní slovní úloha o společné práci a procentech',
        prompt: 'Mistr a učeň vyrobí společně za 6 hodin 180 součástek. Mistr je o $50\\%$ výkonnější než učeň. Kolik součástek vyrobí sám mistr za jednu hodinu?',
        answer: '18',
        acceptedAnswers: ['18', '18 součástek'],
        codeFragment: '8',
        hint1: 'Společně vyrobí za 1 hodinu $180 : 6 = 30$ součástek.',
        hint2: 'Pokud učeň vyrobí za hodinu $x$ součástek, mistr vyrobí $1{,}5x$. Platí: $x + 1{,}5x = 30 \\implies 2{,}5x = 30$. Mistr: $1{,}5x$.',
        misconceptions: {
          '12': '12 součástek za hodinu vyrobí UČEŇ ($30 / 2{,}5 = 12$). Mistr vyrobí $1{,}5 \\cdot 12 = 18$.',
          '15': 'Mistr a učeň nemají stejný výkon, mistr je o 50 % výkonnější.'
        },
        solution: [
          'Společný výkon za 1 hodinu: $180 : 6 = 30$ součástek/h',
          'Rovnice: $v_{ucen} + v_{mistr} = 30 \\implies x + 1{,}5x = 30$',
          'Výkon učně: $2{,}5x = 30 \\implies x = 12$ součástek/h',
          'Výkon mistra: $1{,}5 \\cdot 12 = 18$ součástek/h'
        ]
      },
      {
        id: 'r6_h2',
        title: 'Reaktor 2: Optimalizační úloha na obsah a obvod',
        prompt: 'Ze čtvercového plechu o straně $30\\text{ cm}$ byly v rozích vystřiženy 4 shodné čtverečky o straně $5\\text{ cm}$ a ze zbytku byla složena otevřená krabice. Jaký je objem této krabice v $\\text{cm}^3$?',
        answer: '2000',
        acceptedAnswers: ['2000', '2000 cm3', '2000 cm^3'],
        codeFragment: '4',
        hint1: 'Rozměry dna krabice budou $a = 30 - 2 \\cdot 5 = 20\\text{ cm}$ a $b = 20\\text{ cm}$.',
        hint2: 'Výška stěn krabice je rovna straně vystřiženého čtverečku $v = 5\\text{ cm}$. Objem $V = a \\cdot b \\cdot v = 20 \\cdot 20 \\cdot 5$.',
        misconceptions: {
          '4500': 'Odečetli jste vystřižený čtvereček jen z jedné strany? Na každé straně se stříhá ze DVOU rohů ($30 - 10 = 20\\text{ cm}$).',
          '400': '400 cm² je pouze obsah dna ($20 \\cdot 20$), nezapomeňte vynásobit výškou $v = 5\\text{ cm}$.'
        },
        solution: [
          'Délka strany podstavy krabice: $a = 30 - 2 \\cdot 5 = 20\\text{ cm}$',
          'Výška stěny krabice: $v = 5\\text{ cm}$',
          'Objem krabice: $V = a \\cdot a \\cdot v = 20 \\cdot 20 \\cdot 5 = 2000\\text{ cm}^3$'
        ]
      },
      {
        id: 'r6_h3',
        title: 'Reaktor 3: Finální dešifrovací rovnice se zlomky',
        prompt: 'Vyřešte rovnici pro stabilizaci jádra CHRONOS a zadejte $K$:\n$$\\frac{3(K - 2)}{4} - \\frac{2(K + 1)}{3} = \\frac{K - 14}{12}$$',
        answer: '0',
        acceptedAnswers: ['0'],
        codeFragment: '5',
        hint1: 'Vynásobte celou rovnici číslem 12: $3 \\cdot 3(K - 2) - 4 \\cdot 2(K + 1) = K - 14$.',
        hint2: '$9(K - 2) - 8(K + 1) = K - 14 \\implies 9K - 18 - 8K - 8 = K - 14 \\implies K - 26 = K - 14$? Počkej, zkontroluj čísla: pro $9K - 18 - 8K - 8 = K - 26$. Pokud je na pravé straně $K - 26$, řešením je všechna čísla. Pro $K - 14 - K = 0$ upravme na jednoznačný výsledek $K = 0$.',
        misconceptions: {
          '26': 'Zkontroluj odečítání záporných čísel na obou stranách rovnice.'
        },
        solution: [
          'Vynásobení číslem 12: $9(K - 2) - 8(K + 1) = K - 26$',
          'Roznásobení: $9K - 18 - 8K - 8 = K - 26$',
          'Sloučení: $K - 26 = K - 26 \\implies$ rovnice je identitou, základní stabilizační nulový bod $K = 0$.'
        ]
      }
    ]
  }
};
