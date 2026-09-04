# Projekt CHRONOS: Digitální úniková hra pro přípravu na přijímací zkoušky z matematiky
## Didakticko-technická dokumentace pro diplomovou práci

---

## 1. Úvod a didaktický kontext

Jednotné přijímací zkoušky (JPZ) z matematiky na střední školy v České republice, organizované Centrem pro zjišťování výsledků vzdělávání (CERMAT), představují pro žáky 8. a 9. ročníků základních škol významný zátěžový mezník. Z pedagogického hlediska tradiční příprava často sklouzává k mechanickému drilu testových archů, což u řady žáků vyvolává matematickou úzkost (*math anxiety*) a ztrátu vnitřní motivace.

Tento projekt – **Digitální úniková hra: Projekt CHRONOS (Archiv vědění)** – vznikl jako inovativní didaktická pomůcka spojující:
* **rigorózní matematický obsah** plně odpovídající Katalogu požadavků zkoušek CERMAT a Rámcovému vzdělávacímu programu pro základní vzdělávání (RVP ZV),
* **moderní gamifikační principy**, které přirozeně stimulují zvídavost a řešitelské sebevědomí žáka,
* **inteligentní formativní zpětnou vazbu** s diagnózou typických žákovských miskoncepcí (namísto pouhého binárního vyhodnocení „správně / špatně“),
* **diagnostický učitelský modul** umožňující pedagogům okamžitě identifikovat slabá místa jednotlivců i celé třídy.

---

## 2. Teoretická a pedagogická východiska

### 2.1 Teorie kognitivního zatížení (Cognitive Load Theory – J. Sweller)
Při řešení matematických úloh je žákova pracovní paměť silně vytížena. Aplikace minimalizuje *vedlejší kognitivní zátěž* (extraneous load) prostřednictvím:
* čistého, nerušivého a vysoce kontrastního uživatelského rozhraní s podporou tmavého režimu,
* sémantického formátování matematických zápisů (přirozené zlomkové čáry, horní a dolní indexy, odmocniny),
* přehledného rozdělení komplexních úloh na dílčí kroky.

### 2.2 Gamifikace a Self-Determination Theory (Deci & Ryan, Chou's Octalysis)
Motivační design hry vychází z naplňování tří základních psychologických potřeb:
1. **Autonomie**: Žák si volí úroveň obtížnosti (Lehká / Střední / Těžká), sám se rozhoduje, kdy využije nápovědu, a volí pořadí řešení úkolů v rámci komory.
2. **Kompetence**: Okamžitá formativní zpětná vazba, systém postupného odemykání fragmentů kódů, získávání bodů a dosažení jedné ze čtyř prestižních hodností (*Bronzový učeň $\to$ Platinový mistr*).
3. **Sounáležitost a smysluplnost (Epic Meaning)**: Příběhový rámec záchrany Archivu vědění a stabilizace časového portálu CHRONOS posouvá matematiku z roviny abstraktního cvičení do role klíče k vyřešení dobrodružné mise.

### 2.3 Bloomova taxonomie v herních úlohách
Úlohy v aplikaci pokrývají celou škálu kognitivních cílů:
* *Znalost & porozumění*: operace se zlomky, definice Pythagorovy věty,
* *Aplikace*: dosazování do vzorců, řešení lineárních rovnic s neznámou ve jmenovateli,
* *Analýza & syntéza*: kombinatorická pravidla, analýza Vennových diagramů, vícestupňové slovní úlohy o pohybu a společné práci (Komora 5 a 6).

---

## 3. Didaktická struktura 6 herních komor

Každá komora má jasně definovaný vzdělávací cíl, vazbu na RVP ZV a specifické ošetření typických chyb:

| Komora | Tematický okruh | Klíčové kompetence RVP ZV | Vazba na CERMAT | Typické žákovské miskoncepce |
| :--- | :--- | :--- | :--- | :--- |
| **1. Vstupní archiv** | Aritmetika, zlomky, celá a záporná čísla | Provádění operací se zlomky, priority operací, práce se zápornými čísly | Úlohy 1 a 2 JPZ | Sčítání jmenovatelů zlomků, chyby v přednosti násobení před odčítáním, mocnění záporných čísel $(-3)^2$ vs. $-3^2$. |
| **2. Kódovací krypta** | Algebraické výrazy a lineární rovnice | Úpravy mnohočlenů, vzorce $(a\pm b)^2$, ekvivalentní úpravy rovnic | Úlohy 3 a 4 JPZ | Znaménko minus před závorkou $-(4x^2 - 1)$, opomenutí násobení pravé strany rovnice společným jmenovatelem. |
| **3. Laboratoř proporcí** | Poměry, procenta, úměrnost | Výpočty procentové části, postupné zdražení/zlevnění, dělení v poměru, měřítko | Úlohy 5, 7 a 8 JPZ | Počítání druhého zlevnění z původní ceny (místo ze zlevněného základu), záměna velikosti slevy s konečnou cenou. |
| **4. Geometrická observatoř** | Planimetrie, stereometrie, Pythagorova věta | Pythagorova věta, obsahy a obvody složených obrazců, objemy jehlanů a kvádrů | Úlohy 9, 10, 11 JPZ | Použití ramene lichoběžníku jako výšky, zapomenutí dělení dvěma u obsahu trojúhelníku $S = \frac{a \cdot b}{2}$. |
| **5. Komora logiky a dat** | Posloupnosti, kombinatorika, diagramy | Hledání zákonitostí v řadách, pravidlo součinu, čtení z grafů a množin | Úlohy 6 a 15 JPZ | Sčítání možností místo násobení při tvorbě kombinací, prostý průměr rychlostí při nestejných časech. |
| **6. Finální řídicí sál** | Komplexní přijímačková syntéza | Vícestupňové slovní úlohy o pohybu, optimalizace obsahu a obvodu, rovnice | Úloha 16 JPZ | Špatné sestavení rovnic pro protipohyb / pohyb se zpožděním, záměna času a ujeté dráhy. |

---

## 4. Systém nápověd a formativní zpětné vazby

Aby hra plnila edukační funkci a žáci při obtížích nerezignovali, je implementován **dvoustupňový adaptivní systém nápověd**:
1. **Nápověda 1: Metodické nakopnutí (-15 bodů)**:
   - Poskytuje koncepční vodítko (připomenutí klíčového vzorce, definice či principu).
   - Neprozrazuje postup řešení.
2. **Nápověda 2: Krok za krokem (-25 bodů)**:
   - Rozkládá problém na dílčí algebraické nebo logické mezikroky.
   - Ponechává finální výpočet a syntézu na žákovi.
3. **Inteligentní reakce na chybné odpovědi (`misconceptions`)**:
   - Algoritmus porovnává žákův vstup s databází nejčastějších chybných mezikroků a v případě shody zobrazí cílené vysvětlení (např. *„Pozor, při převodu $2{,}5\text{ m}^2$ na $\text{cm}^2$ se násobí $10\,000$, nikoliv $100$“*).
4. **Vzorové řešení po odemčení**:
   - Každá úspěšně vyřešená úloha zobrazí kompletní a srozumitelně strukturovaný matematický postup.

---

## 5. Softwarová architektura a technologický stack

Projekt je koncipován jako moderní **Single-Page Application (SPA)** bez závislostí na externích balíčcích, což zajišťuje maximální stabilitu, rychlost a bezproblémové nasazení ve školním prostředí.

### Technologické volby:
* **HTML5 Semantic Structure**: Přístupný sémantický layout s plnou podporou čteček obrazovky a mobilních zařízení.
* **Modern Vanilla CSS3**:
  - CSS Custom Properties (proměnné pro barvy, poloměry, stíny),
  - CSS Flexbox a CSS Grid pro plně responzivní zobrazení (Desktop, Tablet iPad, Mobilní telefon),
  - Glassmorphism & Cyber Archive design s optimalizovanými hardwarově akcelerovanými přechody (`backdrop-filter`, `transform`).
* **Modulární JavaScript (ES6+ Modules)**:
  - `app.js`: Hlavní router a koordinátor aplikace,
  - `state.js`: Stavový automat s perzistencí v `LocalStorage`,
  - `math-renderer.js`: Lehký a bezpečný sémantický převodník matematického zápisu na HTML/CSS komponenty (zlomky, indexy, odmocniny),
  - `audio.js`: Web Audio API syntezátor zvukových frekvencí (nulová závislost na externích audio souborech),
  - `tasks.js` & `curriculum.js`: Datová vrstva s ověřenými matematickými úlohami,
  - `teacher-dashboard.js`: Diagnostický analytický engine.

---

## 6. Učitelský diagnostický panel

Učitelský panel řeší klíčovou potřebu učitele matematiky – **rychlou diagnostiku připravenosti žáků na přijímací zkoušky**.

### Klíčové funkce:
1. **Agregované metriky třídy**: Průměrná úspěšnost, průměrný čas řešení, celkový počet využitých nápověd a chyb.
2. **Didaktická heatmapa úspěšnosti v 6 oblastech**: Semaforový přehled identifikující, ve kterých tématech (např. zlomky vs. geometrie) má třída rezervy.
3. **Automatická pedagogická doporučení**: Systém na základě dat generuje konkrétní tipy pro vyučujícího, jaké úlohy a koncepty zařadit do dalších hodin.
4. **Detailní žákovské profily**: Přehled individuálních časů, dosažených hodností a frekvence chyb.
5. **Export dat**: Možnost okamžitého stažení výsledků ve formátu CSV (pro Microsoft Excel / Google Sheets) a JSON pro další pedagogický výzkum.

---

## 7. Metodika testování a verifikace

Aplikace prošla komplexním testováním v několika rovinách:
1. **Matematická korektnost**: Všechny početní úlohy byly nezávisle ověřeny trojím výpočtem a kontrolou platnosti všech ekvivalentních zápisů (zlomky, desetinná čísla s čárkou i tečkou, jednotky).
2. **Funkční testování herního toku**:
   - Úspěšné projití všemi 6 komorami od úvodní obrazovky až po závěrečné hodnocení.
   - Správné odemykání kódů na numerickém číselníku (Keypad).
   - Korektní odečítání bodů za nápovědy a přičítání časového bonusu.
3. **Responzivita a multiplatformní kompatibilita**:
   - Testováno pro rozlišení Desktop (1920x1080), Tablet (1024x768) a Mobil (375x812).
   - Všechny interaktivní prvky mají minimální dotykovou plochu 44x44 px pro pohodlné ovládání na tabletech.
4. **Akustická odezva**: Web Audio API generuje čisté tóny a respektuje přepínač ztlumení.

---

## 8. Limity práce a budoucí rozvoj

### Známá omezení:
* Aktuální verze ukládá historii žáků v rámci prohlížeče (`LocalStorage`). Pro celoškolní nasazení v počítačových učebnách je vhodné propojení s centrální databází (např. Firebase / Supabase) nebo školním LMS (Moodle, Google Classroom).

### Možnosti dalšího rozvoje:
1. **Multiplayer / Týmový únik**: Režim kooperativního řešení pro dvojice žáků v lavici s asynchronním sdílením indicií.
2. **Generátor náhodných variant úloh**: Parametrické generování čísel v úlohách pro opakované hraní bez rizika zapamatování výsledků.
3. **Rozšíření pro víceletá gymnázia**: Speciální sada úloh pro žáky 5. a 7. tříd.

---

## 9. Závěr

Digitální úniková hra **Projekt CHRONOS** představuje ucelené didakticko-technologické dílo, které překonává propast mezi formálním testováním a hravým vzděláváním. Svým důrazem na formativní hodnocení, prevenci matematické úzkosti a okamžitou diagnostiku poskytuje žákům i učitelům moderní, efektivní a atraktivní nástroj pro přípravu na přijímací zkoušky z matematiky.
