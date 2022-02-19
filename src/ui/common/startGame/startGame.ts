const levelButtons = [
  {
    group: 0,
    label: '1',
    class: 'button-level-one',
  },
  {
    group: 1,
    label: '2',
    class: 'button-level-two',
  },
  {
    group: 2,
    label: '3',
    class: 'button-level-three',
  },
  {
    group: 3,
    label: '4',
    class: 'button-level-four',
  },
  {
    group: 4,
    label: '5',
    class: 'button-level-five',
  },
  {
    group: 5,
    label: '6',
    class: 'button-level-six',
  },
];

export class StartGame {
  private startButtonCallback;

  private title: string;

  private description: string;

  constructor(callback: (group: number) => void, title: string, description: string) {
    this.startButtonCallback = callback;
    this.title = title;
    this.description = description;
  }

  public showGameSetting(container: HTMLElement): void {
    // eslint-disable-next-line no-param-reassign
    container.innerHTML = this.getTemplate();
    this.createLevelButtons();
    this.setListenerLevelButtons();
  }

  private getTemplate(): string {
    return `
    <div class="main-container-settings-games">
      <div class="container-main-title-setting-games">
        <h2 class="main-title-setting-games">${this.title}</h2>
      </div>
      <div class="container-description-main-title-setting-games">
        <p class="description-title-setting-games">${this.description}</p>
      </div>
      <div class="container-title-difficulties-games">
        <p class="title-difficulty-setting-games">Выберите уровень</p>
      </div>
      <div class="container-buttons-level-setting-game"></div>
    </div>`;
  }

  private setListenerLevelButtons(): void {
    const container = document.querySelector('.container-buttons-level-setting-game') as HTMLElement;
    container.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickedButton = target.classList.contains('button-level-games');

      if (isClickedButton) {
        const activeButton = document.querySelector('.button-level-games.active');
        activeButton?.classList.remove('active');
        const group = Number(target.dataset.group);
        target.classList.add('active');
        this.startButtonCallback(group);
      }
    });
  }

  private createLevelButtons(): void {
    const container = document.querySelector('.container-buttons-level-setting-game');
    levelButtons.forEach((item) => {
      const button = document.createElement('button') as HTMLButtonElement;
      button.classList.add('button-level-games', item.class);
      button.innerHTML = item.label;
      button.dataset.group = String(item.group);
      container?.appendChild(button);
    });
  }
}
