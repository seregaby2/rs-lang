const levelButtons = [
  {
    group: 0,
    label: '1',
    class: 'button-level-one-audio-game',
  },
  {
    group: 1,
    label: '2',
    class: 'button-level-two-audio-game',
  },
  {
    group: 2,
    label: '3',
    class: 'button-level-three-audio-game',
  },
  {
    group: 3,
    label: '4',
    class: 'button-level-four-audio-game',
  },
  {
    group: 4,
    label: '5',
    class: 'button-level-five-audio-game',
  },
  {
    group: 5,
    label: '6',
    class: 'button-level-six-audio-game',
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
    <div class="main-container-settings-audio-game">
      <div class="container-settings-audio-game-main-title">
        <h2 class="main-title-setting-audio-game">${this.title}</h2>
      </div>
      <div class="container-support-title-settings-game">
        <p class="support-title-setting-audio-game">${this.description}</p>
      </div>
      <div class="level-of-difficulty-audio-game"> Выберите уровень </div>
      <div class="container-buttons-level-audio-game"></div>
    </div>`;
  }

  private setListenerLevelButtons(): void {
    const container = document.querySelector('.container-buttons-level-audio-game') as HTMLElement;
    container.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickedButton = target.classList.contains('button-level-audio-game');

      if (isClickedButton) {
        const activeButton = document.querySelector('.button-level-audio-game.active');
        activeButton?.classList.remove('active');
        const group = Number(target.dataset.group);
        target.classList.add('active');
        this.startButtonCallback(group);
      }
    });
  }

  // public startGame(): void {
  //   const buttonStart = document.querySelector('.button-start-audio-game') as HTMLButtonElement;
  //   buttonStart.addEventListener('click', () => {
  //     this.startButtonCallback(this.activeGroup);
  //   });
  // }

  private createLevelButtons(): void {
    const container = document.querySelector('.container-buttons-level-audio-game');
    levelButtons.forEach((item) => {
      const button = document.createElement('button') as HTMLButtonElement;
      button.classList.add('button-level-audio-game', item.class);
      button.innerHTML = item.label;
      button.dataset.group = String(item.group);
      container?.appendChild(button);
    });
  }
}
