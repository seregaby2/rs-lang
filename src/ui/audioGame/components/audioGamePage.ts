import { SprintController } from '../../sptintGame/components/controller';
import { IWordsData } from '../../sptintGame/components/model';
import { HelpersAudioGame } from './helpersAudioGame';

export class AudioGamePage {
  private pageContainer;

  private helpers;

  private activePage = 1;

  private activeGroup = 1;

  private words: IWordsData[] = [];

  private requestWords = 'words';

  private controller = new SprintController();

  constructor() {
    this.pageContainer = document.querySelector('body') as HTMLBodyElement;
    this.helpers = new HelpersAudioGame();
  }

  public draw(): void {
    const mainWrapper = document.createElement('div');
    mainWrapper.classList.add('main-wrapper-audio-game-page');
    this.pageContainer.prepend(mainWrapper);
    mainWrapper.innerHTML = this.templateSettings;
    this.setListenerButtonStart();
  }

  private setListenerButtonStart(): void {
    const buttonStart = this.pageContainer.querySelector('.button-start-audio-game') as HTMLButtonElement;
    buttonStart.addEventListener('click', () => {
      this.controller
        .getWords(this.requestWords, this.activeGroup, this.activePage)
        .then((data) => {
          this.words = this.helpers.shuffleArray(data);
          this.drawGameCard(this.words[0]);
          const buttonVolume = this.pageContainer.querySelector('.button-volume-audio-game') as HTMLButtonElement;
          buttonVolume.addEventListener('click', () => {
            this.showAudio(this.words[1]);
          });
        });
    });
  }

  private drawNextCard(): void {
    const buttonNext = this.pageContainer.querySelector('.button-next-audio-game');
    buttonNext?.addEventListener('click', () => {
      this.drawGameCard(this.words[0]);
    });
  }

  private showAudio(word: IWordsData): string[] {
    const option: string[] = [];
    option.push(word.audio as string);
    return option;
  }

  private drawGameCard(word: IWordsData): void {
    const options = this.generateOptions(word);
    this.createButtons(options);
  }

  private generateOptions(item: IWordsData): string[] {
    const options: string[] = [];
    options.push(item.word as string);
    while (options.length < 5) {
      const index = this.getRandomInt(0, this.words.length);
      const randomItems = this.words[index];
      const word = randomItems.word as string;
      if (!options.includes(word)) {
        options.push(word);
      }
    }
    return this.helpers.shuffleArray(options);
  }

  private createButtons(options: string[]): void {
    const main = document.querySelector('.main-wrapper-audio-game-page') as HTMLElement;
    main.innerHTML = '';
    main.innerHTML = this.templateGame;
    const mainContainer = this.pageContainer.querySelector('.main-container') as HTMLDivElement;
    const container = document.createElement('div') as HTMLDivElement;
    container.classList.add('button-wrapper');
    options.forEach((item) => {
      const buttonWord = document.createElement('button') as HTMLButtonElement;
      buttonWord.classList.add('button-audio-game', 'button-word-audio-game');
      buttonWord.innerHTML = item;
      container.appendChild(buttonWord);
      mainContainer?.appendChild(container);
    });
    this.drawNextCard();
  }

  private getRandomInt(min: number, max: number): number {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);
    return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
  }

  get templateSettings(): string {
    return `
    <div class="main-container-settings-audio-game">
      <div class="container-settings-audio-game-main-title">
        <h3 class="main-title-setting-audio-game">Настойки игры</h2>
      </div>
      <div class="container-support-title-settings-game">
        <h4 class="support-title-setting-audio-game">Выберите сложность игры</h4>
      </div>
      <div class="container-buttons-level-audio-game">
        <button class="button-level-audio-game button-level-one-audio-game">1</button>
        <button class="button-level-audio-game button-level-two-audio-game">2</button>
        <button class="button-level-audio-game button-level-three-audio-game">3</button>
        <button class="button-level-audio-game button-level-four-audio-game">4</button>
        <button class="button-level-audio-game button-level-five-audio-game">5</button>
        <button class="button-level-audio-game button-level-six-audio-game">6</button>
      </div>
      <div class="container-buttons-settings-audio-game">
        <button class="button-audio-game button-cancel-audio-game">Отмена</button>
        <button class="button-audio-game button-start-audio-game">Старт</button>
      </div>
    </div>`;
  }

  get templateGame(): string {
    return `
    <div class="main-wrapper-audio-game">
      <div class="main-container">
        <button class="button-audio-game button-volume-audio-game"></button>
      </div>
      <button class="button-audio-game button-next-audio-game">не знаю</button>
    </div>
      `;
  }
}
