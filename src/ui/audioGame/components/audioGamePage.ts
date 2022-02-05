import { SprintController } from '../../sptintGame/components/controller';
import { IWordsData } from '../../sptintGame/components/model';
import { HelpersAudioGame } from './helpersAudioGame';

type OptionsType = Pick<IWordsData, 'id' | 'word'>;

export class AudioGamePage {
  private pageContainer;

  private activeWordIndex = 0;

  private helpers;

  private totalPage = 30;

  private activeGroup = 0;

  private words: IWordsData[] = [];

  private requestWords = 'words';

  private url = 'https://rs-lang-2022.herokuapp.com/';

  private controller = new SprintController();

  constructor() {
    this.pageContainer = document.querySelector('body') as HTMLBodyElement;
    this.helpers = new HelpersAudioGame();
  }

  public draw(): void {
    const mainWrapper = document.createElement('div') as HTMLDivElement;
    mainWrapper.classList.add('main-wrapper-audio-game-page');
    this.pageContainer.prepend(mainWrapper);
    mainWrapper.innerHTML = this.templateSettings;
    this.createLevelButtons();
    this.setListenerLevelButtons();
    this.startGame();
  }

  private startGame(): void {
    const buttonStart = this.pageContainer.querySelector('.button-start-audio-game') as HTMLButtonElement;
    buttonStart.addEventListener('click', () => {
      const pageNumber = this.helpers.getRandomInt(0, this.totalPage);
      this.controller
        .getWords(this.requestWords, this.activeGroup, pageNumber)
        .then((data) => {
          this.words = this.helpers.shuffleArray(data);
          this.activeWordIndex = 0;
          this.drawGameCard();
        });
    });
  }

  private setGameCardListener(): void {
    const container = document.querySelector('.main-wrapper-audio-game') as HTMLDivElement;
    container?.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isOption = target.classList.contains('button-word-audio-game');

      if (isOption) {
        const { id } = target.dataset;
        const activeWord = this.words[this.activeWordIndex];
        const isCorrect = activeWord.id === id;

        if (isCorrect) {
          target.classList.add('correct');
        } else {
          target.classList.add('incorrect');
          const correctButton = document.querySelector(`[data-id='${activeWord.id}']`) as HTMLElement;
          correctButton.classList.add('correct');
        }

        this.createAnswer();
      }
    });
  }

  private createAnswer(): void {
    const options = document.querySelectorAll('.button-word-audio-game') as NodeListOf<HTMLButtonElement>;
    options.forEach((option) => {
      // need disable button
      // eslint-disable-next-line no-param-reassign
      option.disabled = true;
    });
    const buttonWrapper = document.querySelector('.button-wrapper-audio-game') as HTMLButtonElement;
    const img = document.createElement('img') as HTMLImageElement;
    const div = document.createElement('div') as HTMLDivElement;
    const p = document.createElement('p') as HTMLSpanElement;
    img.classList.add('img-answer');
    img.src = this.url + this.words[this.activeWordIndex].image as string;
    div.classList.add('answer-info');
    p.classList.add('answer-text');
    p.innerText = this.words[this.activeWordIndex].word as string;
    div.appendChild(img);
    div.appendChild(p);
    buttonWrapper?.before(div);
    const buttonAnswer = this.pageContainer.querySelector('.button-answer-audio-game') as HTMLButtonElement;
    const buttonNext = this.pageContainer.querySelector('.button-next-card-audio-game') as HTMLButtonElement;
    buttonAnswer.style.display = 'none';
    buttonNext.style.display = 'inline-block';
  }

  private drawNextCard(): void {
    const buttonAnswer = this.pageContainer.querySelector('.button-answer-audio-game') as HTMLButtonElement;
    const buttonNext = this.pageContainer.querySelector('.button-next-card-audio-game') as HTMLButtonElement;
    buttonAnswer?.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isSelectedButtonAnswer = target.classList.contains('button-answer-audio-game');

      if (isSelectedButtonAnswer) {
        buttonAnswer.style.display = 'none';
        buttonNext.style.display = 'inline-block';
        this.createAnswer();
      }
    });
    buttonNext.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isSelectedButtonNext = target.classList.contains('button-next-card-audio-game');

      if (isSelectedButtonNext) {
        buttonNext.style.display = 'none';
        buttonAnswer.style.display = 'inline-block';
        this.activeWordIndex += 1;
        this.drawGameCard();
      }
    });
  }

  private startAudio(word: IWordsData): void {
    const audio = new Audio(this.url + word.audio);
    audio.play();
  }

  private drawGameCard(): void {
    const activeWord = this.words[this.activeWordIndex];
    const options = this.generateOptions(activeWord);
    this.startAudio(activeWord);
    this.createButtonsWithAnswer(options);
    const buttonVolume = this.pageContainer.querySelector('.button-volume-audio-game') as HTMLButtonElement;
    buttonVolume.addEventListener('click', () => {
      this.startAudio(activeWord);
    });
  }

  private generateOptions(item: IWordsData): OptionsType[] {
    const optionsArr: OptionsType[] = [];
    optionsArr.push({
      id: item.id,
      word: item.wordTranslate,
    });

    while (optionsArr.length < 5) {
      const randomIndex = this.helpers.getRandomInt(0, this.words.length);
      const randomWord = this.words[randomIndex];
      const optionInArr = optionsArr.find((option) => option.id === randomWord.id);

      if (!optionInArr) {
        optionsArr.push({
          id: randomWord.id,
          word: randomWord.wordTranslate,
        });
      }
    }

    return this.helpers.shuffleArray(optionsArr);
  }

  private createButtonsWithAnswer(options: OptionsType[]): void {
    const mainWrapper = document.querySelector('.main-wrapper-audio-game-page') as HTMLElement;
    mainWrapper.innerHTML = '';
    mainWrapper.innerHTML = this.baseTemplate;
    const mainContainer = this.pageContainer.querySelector('.main-container-audio-game') as HTMLDivElement;
    const container = document.createElement('div') as HTMLDivElement;
    container.classList.add('button-wrapper-audio-game');
    options.forEach((item) => {
      const buttonWord = document.createElement('button') as HTMLButtonElement;
      buttonWord.classList.add('button-audio-game', 'button-word-audio-game');
      buttonWord.innerHTML = item.word as string;
      buttonWord.dataset.id = item.id;
      container.appendChild(buttonWord);
      mainContainer?.appendChild(container);
    });
    this.drawNextCard();
    this.setGameCardListener();
  }

  private createLevelButtons(): void {
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

    const container = document.querySelector('.container-buttons-level-audio-game');

    levelButtons.forEach((item) => {
      const button = document.createElement('button') as HTMLButtonElement;
      button.classList.add('button-level-audio-game', item.class);
      button.innerHTML = item.label;
      button.dataset.group = String(item.group);
      container?.appendChild(button);

      if (this.activeGroup === item.group) {
        button.classList.add('active');
      }
    });
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
        this.activeGroup = group;
        target.classList.add('active');
      }
    });
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
      <div class="container-buttons-level-audio-game"></div>
      <div class="container-buttons-settings-audio-game">
        <button class="button-audio-game button-cancel-audio-game">Отмена</button>
        <button class="button-audio-game button-start-audio-game">Старт</button>
      </div>
    </div>`;
  }

  get baseTemplate(): string {
    return `
    <div class="main-wrapper-audio-game">
      <div class="main-container-audio-game">
        <button class="button-audio-game button-volume-audio-game"></button>
      </div>
      <button class="button-audio-game button-answer-audio-game">не знаю</button>
      <button class="button-audio-game button-next-card-audio-game"> → </button>

    </div>
      `;
  }
}
