/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-cycle */
import { SprintController } from './controller';
import { getRandomNumber, shuffle } from './HelpFunction';
import { IWordsData } from './model';
import { TemplateHtml } from './templateHtml';
// import { TimerSprintGame } from './timer';

export let itemsSprintGameData: IWordsData[] = [];
export let resultAnswer: number[] = [];
export class LogicSprintGame {
  myInterval: NodeJS.Timer | null;

  time: number;

  private template = new TemplateHtml();

  arrayEnglishWord: string[] = [];

  arrayRussianWords: string[][] = [];

  countProgressAnswer = 0;

  score: number = 0;

  continuousSeries: number = 0;

  constructor() {
    this.myInterval = null;
    this.time = 60;
  }

  private async getWords(group:number): Promise<IWordsData[]> {
    const minCountPage = 0;
    const maxCountPage = 29;
    const controller = new SprintController();
    const numberPage = getRandomNumber(maxCountPage, minCountPage);
    const items = await controller.getWords('words', group, numberPage);
    return items;
  }

  private createArrayRussianWord(items:IWordsData[]):string[][] {
    const arrayRussianWordsTotal = [];
    const shuffleWordsData:IWordsData[] = shuffle(items);
    for (let j = 0; j < items.length; j += 1) {
      const arrayRussianWordsRandomAnswer:string[] = [];
      arrayRussianWordsRandomAnswer.push(items[j].wordTranslate || '');
      for (let i = 0; i < 1; i += 1) {
        const index = getRandomNumber(shuffleWordsData.length - 1, 0);
        arrayRussianWordsRandomAnswer.push(shuffleWordsData[index].wordTranslate || '');
      }
      arrayRussianWordsTotal.push(arrayRussianWordsRandomAnswer);
    }
    return arrayRussianWordsTotal;
  }

  async createArrayEnglishAndRussianWords(group:number): Promise<void> {
    const promiseArray = [];
    promiseArray.push(this.getWords(group));
    promiseArray.push(this.getWords(group));
    promiseArray.push(this.getWords(group));
    const result = await Promise.all(promiseArray);
    itemsSprintGameData = result.flat(1);
    this.arrayRussianWords = this.createArrayRussianWord(itemsSprintGameData);
    for (let j = 0; j < itemsSprintGameData.length; j += 1) {
      this.arrayEnglishWord.push(itemsSprintGameData[j].word || '');
    }
  }

  private writeEnglishAndRussianWord(RussianWord:string, EnglishWord:string): void {
    const inputViewWord = document.querySelectorAll('.item-content-card-sprint-game') as NodeListOf<HTMLDivElement>;
    inputViewWord[0].textContent = EnglishWord;
    inputViewWord[1].textContent = RussianWord;
  }

  getAnswer(count:number): void {
    const itemHeader = document.querySelectorAll('.item-header-card-sprint-game') as NodeListOf<HTMLDivElement>;
    if (this.countProgressAnswer >= 60) {
      this.countProgressAnswer = 0;
      resultAnswer = [];
      this.score = 0;
      this.continuousSeries = 0;
    }
    itemHeader[2].textContent = `Score: ${(this.score).toString()}`;
    itemHeader[1].textContent = `Continuous series: ${this.continuousSeries}`;
    this.writeEnglishAndRussianWord(
      this.arrayRussianWords[this.countProgressAnswer][count],
      this.arrayEnglishWord[this.countProgressAnswer],
    );
  }

  playSounds(audio:HTMLAudioElement, answer:string): void {
    const newAudio = audio;
    newAudio.pause();
    newAudio.src = `../assets/sounds/${answer}`;
    newAudio.play();
  }

  async countAnswer(): Promise<void> {
    const buttonWrongRight = document.querySelectorAll('.item-footer-card-sprint-game') as NodeListOf<HTMLDivElement>;
    let count = getRandomNumber(1, 0);
    this.getAnswer(count);
    const audio = new Audio();
    buttonWrongRight[0].addEventListener('click', () => {
      if (itemsSprintGameData[this.countProgressAnswer].wordTranslate
          !== this.arrayRussianWords[this.countProgressAnswer][count]) {
        resultAnswer.push(1);
        this.score += 10;
        this.continuousSeries += 1;
        this.playSounds(audio, 'RightAnswer.mp3');
      } else {
        resultAnswer.push(0);
        this.continuousSeries = 0;
        this.playSounds(audio, 'WrongAnswer.mp3');
      }
      this.countProgressAnswer += 1;
      count = getRandomNumber(1, 0);
      this.getAnswer(count);
    });

    buttonWrongRight[1].addEventListener('click', async () => {
      if (itemsSprintGameData[this.countProgressAnswer].wordTranslate
          === this.arrayRussianWords[this.countProgressAnswer][count]) {
        resultAnswer.push(1);
        this.score += 10;
        this.continuousSeries += 1;
        this.playSounds(audio, 'RightAnswer.mp3');
      } else {
        resultAnswer.push(0);
        this.continuousSeries = 0;
        this.playSounds(audio, 'WrongAnswer.mp3');
      }
      this.countProgressAnswer += 1;
      count = getRandomNumber(1, 0);
      this.getAnswer(count);
    });
  }

  async drawSprintGame(): Promise<void> {
    const main = document.querySelector('.main') as HTMLDivElement;
    main.innerHTML = '';
    const templateSprintGame = new TemplateHtml();
    templateSprintGame.createChooseLevelSprintGame(main);
    const squareChooseLevel = document.querySelectorAll('.square-choose-level-sprint-game') as NodeListOf<HTMLDivElement>;
    squareChooseLevel.forEach((e, i) => {
      e.addEventListener('click', async () => {
        await this.createArrayEnglishAndRussianWords(i);
        main.innerHTML = '';
        templateSprintGame.createTemplateCardGame(main);
        const wrapperCardGame = document.querySelector('.wrapper-card-sprint-game') as HTMLDivElement;
        wrapperCardGame.style.display = 'flex';
        this.timer();
        this.addTimer();
        this.countAnswer();
      });
    });
  }

  runVoice() {
    const voice = document.querySelectorAll('.column-voice') as NodeListOf<HTMLDivElement>;
    voice.forEach((e, i) => {
      e.addEventListener('click', () => {
        const audio = new Audio();
        audio.src = `https://rs-lang-2022.herokuapp.com/${itemsSprintGameData[i].audio}`;
        audio.play();
      });
    });
  }

  resetTimer() {
    const main = document.querySelector('.main') as HTMLElement;
    if (this.myInterval) {
      clearInterval(this.myInterval);
      main.innerHTML = '';
      this.template.createTableWithResults(main);
      resultAnswer = [];
      this.time = 60;
    }
  }

  timer(): void {
    const timer = document.querySelector('.item-header-card-sprint-game') as HTMLDivElement;
    const buttonWrongRight = document.querySelectorAll('.item-footer-card-sprint-game') as NodeListOf<HTMLDivElement>;
    const main = document.querySelector('.main') as HTMLElement;
    if (this.time < 10) {
      timer.textContent = `Timer: 0${this.time.toString()}`;
    } else {
      timer.textContent = `Timer: ${this.time.toString()}`;
    }
    this.time -= 1;

    if (this.myInterval && this.time < 0) {
      clearInterval(this.myInterval);
      main.innerHTML = '';
      this.template.createTableWithResults(main);
    }
    buttonWrongRight[0].addEventListener('click', () => {
      console.log(resultAnswer.length, 'wrong', this.myInterval);
      if (resultAnswer.length === 59 && this.myInterval) {
        this.resetTimer();
      }
    });
    buttonWrongRight[1].addEventListener('click', () => {
      console.log(resultAnswer.length, 'right');
      if (resultAnswer.length === 59 && this.myInterval) {
        this.resetTimer();
      }
    });
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
