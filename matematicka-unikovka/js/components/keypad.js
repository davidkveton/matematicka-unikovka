/**
 * Interaktivní numerický a kódovací terminál pro odemykání místností
 */

import { sound } from '../audio.js';

export class KeypadComponent {
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

  setTargetCode(code) {
    this.options.targetCode = String(code);
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
      btn.addEventListener('click', (e) => {
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
    const display = this.container.querySelector('#keypad-display');
    const entered = this.currentInput.trim();
    const target = this.options.targetCode.trim();

    if (entered.length === 0) return;

    if (entered === target) {
      sound.playUnlockRoom();
      this.updateDisplay('PŘÍSTUP POVOLEN', false, true);
      setTimeout(() => {
        this.options.onUnlock();
      }, 1000);
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
