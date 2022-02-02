export class AudioPage {
  private pageContainer;

  constructor() {
    this.pageContainer = document.querySelector('body') as HTMLBodyElement;
  }

  public render(): void {
    this.pageContainer.innerHTML = this.templateSettings;
    this.setHandler();
  }

  private setHandler(): void {
    const buttonStart = this.pageContainer.querySelector('.button-start') as HTMLButtonElement;
    buttonStart.addEventListener('click', () => {
      this.pageContainer.innerHTML = '';
      this.pageContainer.innerHTML = this.templateGame;
    });
  }

  get templateSettings(): string {
    return `
    <div class="settings-game-main-container">
      <div class="settings-game-main-title-container">
        <h3 class="main-title">Настойки игры</h2>
      </div>
      <div class="settings-game-support-title-container">
        <h4 class="support-title">Выберите сложность игры</h4>
        <div>
          <label for="level">Уровень</label>
          <select id="level">
            <option value="level-one">Уровень 1</option>
            <option value="level-two">Уровень 2</option>
            <option value="level-three">Уровень 3</option>
            <option value="level-four">Уровень 4</option>
            <option value="level-five">Уровень 5</option>
            <option value="level-six">Уровень 6</option>
          </select>
        </div>
        <div class="settings-buttons-container">
          <button class="button button-cancel">Отмена</button>
          <button class="button button-start">Старт</button>
        </div>
      </div>
    </div>
    `;
  }

  get templateGame(): string {
    return `
    <div class="main-wrapper">
      <div class="main-container">
        <button class="button button-volume"></button>
        <div class="button-wrapper">
          <button class="button button-word">1</button>
          <button class="button button-word">2</button>
          <button class="button button-word">3</button>
          <button class="button button-word">4</button>
          <button class="button button-word">5</button>
        </div>
        <button class="button button-next">Не знаю</button>
      </div>
    </div>
      `;
  }
}
