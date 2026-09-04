/**
 * Didaktická taxonomie a kompetenční matice RVP ZŠ / CERMAT pro JPZ z matematiky
 */
export const CURRICULUM_DATA = {
  rooms: [
    {
      id: 1,
      title: 'Vstupní archiv',
      subtitle: 'Číslo a proměnná: Aritmetika, zlomky a celá čísla',
      theme: 'cyan',
      description: 'Základní energetická komora archivu. Odemčení vyžaduje zvládnutí operací se zlomky, zápornými čísly a prioritou matematických operací.',
      competencies: [
        'Provádění početních operací se zlomky v základním tvaru',
        'Operace se zápornými a desetinnými čísly',
        'Dodržování správného pořadí matematických operací',
        'Orientace na číselné ose'
      ],
      cermatFocus: 'Úlohy 1 a 2 z testů CERMAT (výpočty se zlomky a celými čísly)'
    },
    {
      id: 2,
      title: 'Kódovací krypta',
      subtitle: 'Algebraické výrazy a lineární rovnice',
      theme: 'indigo',
      description: 'Centrální dešifrovací sál. Pro aktivaci systémových relé je nutné zjednodušit algebraické výrazy a vyřešit rovnice.',
      competencies: [
        'Úpravy mnohočlenů a vytýkání před závorku',
        'Aplikace vzorců (a+b)², (a-b)², a²-b²',
        'Řešení lineárních rovnic včetně rovnic se zlomky',
        'Vyjádření neznámé ze vzorce'
      ],
      cermatFocus: 'Úlohy 3 a 4 z testů CERMAT (výrazy, rovnice a ekvivalentní úpravy)'
    },
    {
      id: 3,
      title: 'Laboratoř proporcí',
      subtitle: 'Poměry, procenta a úměrnost',
      theme: 'amber',
      description: 'Alchymistický sektor pro syntézu krystalů. Správné směsi vyžadují přesné výpočty procent, měřítka a přímé i nepřímé úměrnosti.',
      competencies: [
        'Výpočty s procenty (základ, procentová část, počet procent)',
        'Slovní úlohy na zdražení a zlevnění (postupné změny)',
        'Dělení celku v daném poměru a měřítko mapy/plánu',
        'Přímá a nepřímá úměrnost v reálných situacích'
      ],
      cermatFocus: 'Úlohy 5, 7 a 8 z testů CERMAT (procenta, poměry, finanční matematika)'
    },
    {
      id: 4,
      title: 'Geometrická observatoř',
      subtitle: 'Planimetrie, stereometrie a Pythagorova věta',
      theme: 'emerald',
      description: 'Hvězdná observatoř pro zaměření časoprostorových souřadnic. Správné nastavení teleskopu závisí na výpočtech obsahů, obvodů, úhlů a délek.',
      competencies: [
        'Využití Pythagorovy věty v rovině i prostoru',
        'Výpočty obvodů a obsahů trojúhelníků, čtyřúhelníků a složených obrazců',
        'Objemy a povrchy těles (hranol, válec, jehlan)',
        'Úhlové vztahy (vnitřní úhly, vrcholové a střídavé úhly)'
      ],
      cermatFocus: 'Úlohy 9, 10 a 11 z testů CERMAT (geometrie, konstrukční a početní planimetrie)'
    },
    {
      id: 5,
      title: 'Komora logiky a dat',
      subtitle: 'Číselné řady, kombinatorika a analýza diagramů',
      theme: 'purple',
      description: 'Kryptografický sál plný záhadných run. Zde se testuje schopnost odhalit zákonitosti v řadách, logicky dedukovat a kombinovat data.',
      competencies: [
        'Odhalení pravidla v číselných a geometrických posloupnostech',
        'Kombinatorické pravidlo součtu a součinu',
        'Vyhodnocování informací z grafů, tabulek a diagramů',
        'Logická dedukce s vylučovací metodou'
      ],
      cermatFocus: 'Úlohy 6 a 15 z testů CERMAT (kombinatorika, čtení z grafů, logické úlohy)'
    },
    {
      id: 6,
      title: 'Finální řídicí sál',
      subtitle: 'Syntéza: Komplexní přijímačkové úlohy',
      theme: 'rose',
      description: 'Hlavní reaktor CHRONOS. Odemčení časového portálu vyžaduje vyřešení komplexních vícestupňových úloh kombinujících geometrii, algebru a reálný kontext.',
      competencies: [
        'Řešení vícestupňových slovních úloh',
        'Syntéza geometrických a algebraických metod',
        'Optimalizace a ověření reálnosti výsledku',
        'Komplexní matematická gramotnost'
      ],
      cermatFocus: 'Úloha 16 z testů CERMAT (komplexní nestandardní úlohy s vysokou bodovou hodnotou)'
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
      description: 'Dobrý solidní základ. Většinu standardních úloh zvládáš, stačí ještě trochu docvičit problematické oblasti (např. slovní úlohy nebo geometrii).'
    },
    {
      id: 'bronze',
      name: 'Matematický učeň',
      minPct: 0,
      icon: '🥉',
      color: '#d97706',
      description: 'Základní průchod archivem dokončen. Doporučujeme věnovat zvýšenou pozornost systematickému procvičování zlomků, rovnic a geometrických vzorců.'
    }
  ]
};
