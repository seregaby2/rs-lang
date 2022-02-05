export class TimerSprintGame {
  myInterval: NodeJS.Timer | null;

  time: number;

  constructor() {
    this.myInterval = null;
    this.time = 59;
  }

  timer() {
    const timer = document.querySelector('.item-header-card-sprint-game') as HTMLDivElement;
    if (this.time < 10) {
      timer.textContent = `Время: 0${this.time.toString()}`;
    } else {
      timer.textContent = `Время: ${this.time.toString()}`;
    }
    this.time -= 1;
    if (this.myInterval && this.time < 1) {
      clearInterval(this.myInterval);
    }
  }

  addTimer() {
    this.myInterval = setInterval(() => this.timer(), 1000);
  }
}
