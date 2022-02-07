/* eslint-disable import/no-cycle */
import { TemplateHtml } from './templateHtml';

export class TimerSprintGame {
  myInterval: NodeJS.Timer | null;

  time: number;

  private template = new TemplateHtml();

  private main = document.querySelector('.main') as HTMLElement;

  constructor() {
    this.myInterval = null;
    this.time = 2;
  }

  timer(): void {
    const timer = document.querySelector('.item-header-card-sprint-game') as HTMLDivElement;
    if (this.time < 10) {
      timer.textContent = `Timer: 0${this.time.toString()}`;
    } else {
      timer.textContent = `Timer: ${this.time.toString()}`;
    }
    this.time -= 1;
    if (this.myInterval && this.time < 0) {
      clearInterval(this.myInterval);
      this.main.innerHTML = '';
      this.template.createTableWithResults(this.main);
    }
  }

  addTimer(): void {
    this.myInterval = setInterval(() => this.timer(), 1000);
    window.addEventListener('click', () => {
      const wrapperCardSprintGame = document.querySelector('.wrapper-card-sprint-game') as HTMLDivElement;
      if (!wrapperCardSprintGame && this.myInterval) {
        clearInterval(this.myInterval);
      }
    });
  }
}
