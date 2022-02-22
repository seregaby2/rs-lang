import { getRandomNumber } from './HelpFunction';
import { ISettings, IUserWord, IWordsData } from '../../common/controller/model';
import { TemplateHtml } from './templateHtml';
import { ControllerWords } from '../../common/controller/controllerWords';
import { ControllerUserWords } from '../../common/controller/controllerUserWords';
import { UsersData } from '../../common/usersData';
import { StartGame } from '../../common/startGames/startGames';
import { ControllerSettings } from '../../common/controller/controllerSettings';

const gameTitle = 'Спринт вызов';
const gameDescription = `Выбирайте соответсвующий перевод предложенным словам.
  Эта игра поможет Вам развить навык быстрого перевода`;

export class LogicSprintGame {
  myInterval: NodeJS.Timer | null;

  time: number;

  private template = new TemplateHtml();

  private controllerUserWords = new ControllerUserWords();

  arrayEnglishWord: string[] = [];

  arrayRussianWords: string[][] = [];

  countProgressAnswer = 0;

  score: number = 0;

  continuousSeries: number = 0;

  private itemsSprintGameData: IWordsData[] = [];

  private finalyItemsSprintGameData: IWordsData[] = [];

  resultAnswer: number[] = [];

  countRightAnswer: number = 0;

  countTotalAnswer: number = 0;

  private maxCountProgressAnswer: number = 60;

  private bestContinuousSeries: number = 0;

  private bestContinuousSeriesForDay: number = 0;

  private count: number = 0;

  private controller: ControllerWords = new ControllerWords();

  private userData: UsersData = new UsersData();

  private controllerSettings = new ControllerSettings();

  private start = new StartGame((group) => this.startCallback(group), gameTitle, gameDescription);

  constructor() {
    this.myInterval = null;
    this.time = 60;
  }

  private async getWords(group: number): Promise<IWordsData[]> {
    const minCountPage = 0;
    const maxCountPage = 29;

    const numberPage = getRandomNumber(maxCountPage, minCountPage);
    const items = await this.controller.getWords(group, numberPage);
    return items;
  }

  private getWordsAtTransitionFromBookPage = async (group: number, page: number)
  : Promise<IWordsData[]> => {
    const items = await this.controller.getWords(group, page);
    return items;
  };

  private createArrayRussianWord(items: IWordsData[]): void {
    const newItems = items.slice();
    this.arrayRussianWords = [];
    for (let j = 0; j < newItems.length; j += 1) {
      const arrayRussianWordsRandomAnswer: string[] = [];
      arrayRussianWordsRandomAnswer.push(newItems[j].wordTranslate || '');
      for (let i = 0; i < 1; i += 1) {
        const index = getRandomNumber(newItems.length - 1, 0);
        arrayRussianWordsRandomAnswer.push(newItems[index].wordTranslate || '');
      }
      this.arrayRussianWords.push(arrayRussianWordsRandomAnswer);
    }
  }

  private createArrayEnglishAndRussianWordsHelper = async (group: number): Promise<void> => {
    const header = document.querySelector('.header') as HTMLElement;
    const promiseArray = [];

    const pageStorage = Number(localStorage.getItem('currPage'));
    if (header.classList.contains('sprint-game')) {
      promiseArray.push(this.getWordsAtTransitionFromBookPage(group, pageStorage));
      for (let i = 0; i < 29; i += 1) {
        if (i !== pageStorage) {
          promiseArray.push(this.getWordsAtTransitionFromBookPage(group, i));
        }
      }
      const result = await Promise.all(promiseArray);
      this.itemsSprintGameData = result.flat(1);

      const newItemSprintGameResult: IWordsData[] = [];
      const arrayLearntUserWords: IUserWord[] = [];
      const userGreeting = document.querySelector('.user-greeting') as HTMLDivElement;

      if (userGreeting) {
        const userWords = await this.getUserWordsGame();
        for (let i = 0; i < userWords.length; i += 1) {
          if (userWords[i].optional.progress === 3 || userWords[i].optional.progress === 5) {
            arrayLearntUserWords.push(userWords[i]);
          }
        }
      }

      for (let j = 0; j < this.itemsSprintGameData.length; j += 1) {
        let repeatWord: boolean = false;
        for (let i = 0; i < arrayLearntUserWords.length; i += 1) {
          if (arrayLearntUserWords[i].wordId === this.itemsSprintGameData[j].id) {
            repeatWord = true;
            break;
          }
        }
        if (repeatWord) {
          continue;
        }
        newItemSprintGameResult.push(this.itemsSprintGameData[j]);
      }
      this.finalyItemsSprintGameData = newItemSprintGameResult.slice(0, 60);
      this.createArrayRussianWord(newItemSprintGameResult);
      for (let i = 0; i < this.finalyItemsSprintGameData.length; i += 1) {
        this.arrayEnglishWord.push(this.finalyItemsSprintGameData[i].word || '');
      }
    } else {
      promiseArray.push(this.getWords(group));
      promiseArray.push(this.getWords(group));
      promiseArray.push(this.getWords(group));
      const result = await Promise.all(promiseArray);
      this.itemsSprintGameData = result.flat(1);
      this.createArrayRussianWord(this.itemsSprintGameData);
      for (let j = 0; j < this.itemsSprintGameData.length; j += 1) {
        this.arrayEnglishWord.push(this.itemsSprintGameData[j].word || '');
      }
      this.finalyItemsSprintGameData = this.itemsSprintGameData;
    }
    this.maxCountProgressAnswer = this.arrayEnglishWord.length;
  };

  private createArrayEnglishAndRussianWords = async (group: number): Promise<void> => {
    await this.createArrayEnglishAndRussianWordsHelper(group);
  };

  private writeEnglishAndRussianWord(RussianWord: string, EnglishWord: string): void {
    const inputViewWord = document.querySelectorAll('.item-content-card-sprint-game') as NodeListOf<HTMLDivElement>;
    inputViewWord[0].textContent = EnglishWord;
    inputViewWord[1].textContent = RussianWord;
  }

  getAnswer(count: number): void {
    const itemHeader = document.querySelectorAll('.item-header-card-sprint-game') as NodeListOf<HTMLDivElement>;
    if (this.countProgressAnswer >= this.maxCountProgressAnswer) {
      this.resetTimer();
    } else {
      itemHeader[2].textContent = `Счет: ${(this.score).toString()}`;
      itemHeader[1].textContent = `Непрерывная серия: ${this.continuousSeries}`;
      this.writeEnglishAndRussianWord(
        this.arrayRussianWords[this.countProgressAnswer][count],
        this.arrayEnglishWord[this.countProgressAnswer],
      );
    }
  }

  playSounds(audio: HTMLAudioElement, answer: string): void {
    const newAudio = audio;
    const volume = document.querySelector('.volume') as HTMLDivElement;
    newAudio.pause();
    newAudio.src = `./assets/sounds/${answer}`;
    newAudio.play();
    if (volume.classList.contains('mute')) {
      newAudio.muted = true;
    } else {
      newAudio.muted = false;
    }
  }

  private getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  private writeDataForClickAnswer(condition: boolean): number {
    const audio = new Audio();
    if (condition) {
      this.resultAnswer.push(1);
      this.countRightAnswer += 1;
      this.score += 10;
      this.continuousSeries += 1;
      this.playSounds(audio, 'RightAnswer.mp3');
    } else {
      this.resultAnswer.push(0);
      this.continuousSeries = 0;
      this.playSounds(audio, 'WrongAnswer.mp3');
    }
    this.countTotalAnswer += 1;
    this.countProgressAnswer += 1;
    const count = getRandomNumber(1, 0);

    if (this.bestContinuousSeries < this.continuousSeries) {
      this.bestContinuousSeries = this.continuousSeries;
    }
    if (this.bestContinuousSeriesForDay < this.bestContinuousSeries) {
      this.bestContinuousSeriesForDay = this.bestContinuousSeries;
    }
    const userGreeting = document.querySelector('.user-greeting') as HTMLDivElement;
    const userId = localStorage.getItem('user_id') || '';
    const token = localStorage.getItem('user_access_token') || '';
    const timesStamp = this.getDate();

    if (userGreeting) {
      const body: ISettings = {
        wordsPerDay: 1,
        optional: {
          countRightAnswerSprint: this.countRightAnswer,
          countTotalAnswerSprint: this.countTotalAnswer,
          longestContinuosSeriesSprint: this.bestContinuousSeriesForDay,
        },
      };
      this.controllerSettings.updateSettings(userId, token, body);
      const WordId = this.finalyItemsSprintGameData[this.resultAnswer.length - 1].id;
      const rightWrongAnswer = this.resultAnswer[this.resultAnswer.length - 1];
      let repeatWord: boolean = false;
      this.getUserWordsGame().then((item) => {
        item.forEach((e) => {
          if (e.wordId === WordId) {
            repeatWord = true;
            this.userData
              .updateUserWordsGame(
                WordId,
                rightWrongAnswer,
                e.difficulty,
                e.optional.progress,
                timesStamp,
              );
          }
        });
        if (!repeatWord || item.length === 0) {
          this.userData.createUserWordsGame(WordId, rightWrongAnswer, 'sprint', timesStamp);
        }
      });
    }
    this.getAnswer(count);
    return count;
  }

  private addControlKeyboard = (e: KeyboardEvent): void => {
    const buttonWrongRight = document.querySelectorAll('.item-footer-card-sprint-game') as NodeListOf<HTMLDivElement>;
    if (e.key === 'ArrowLeft' && buttonWrongRight[0]) {
      this.count = this.writeDataForClickAnswer(
        this.finalyItemsSprintGameData[this.countProgressAnswer]
          .wordTranslate !== this.arrayRussianWords[this.countProgressAnswer][this.count],
      );
      buttonWrongRight[0].classList.add('key-down-wrong');
    }
    if (e.key === 'ArrowRight' && buttonWrongRight[0]) {
      this.count = this.writeDataForClickAnswer(
        this.finalyItemsSprintGameData[this.countProgressAnswer]
          .wordTranslate === this.arrayRussianWords[this.countProgressAnswer][this.count],
      );
      buttonWrongRight[1].classList.add('key-down-right');
    }
  };

  private removeClassFromButton(): void {
    const buttonWrongRight = document.querySelectorAll('.item-footer-card-sprint-game') as NodeListOf<HTMLDivElement>;
    if (buttonWrongRight[0]) {
      buttonWrongRight[0].classList.remove('key-down-wrong');
      buttonWrongRight[1].classList.remove('key-down-right');
    }
  }

  async countAnswer(): Promise<void> {
    const buttonWrongRight = document.querySelectorAll('.item-footer-card-sprint-game') as NodeListOf<HTMLDivElement>;
    this.count = getRandomNumber(1, 0);
    this.getAnswer(this.count);
    const volume = document.querySelector('.volume') as HTMLDivElement;
    volume.addEventListener('click', () => {
      volume.classList.toggle('mute');
    });
    buttonWrongRight[0].addEventListener('click', () => {
      this.count = this.writeDataForClickAnswer(
        this.finalyItemsSprintGameData[this.countProgressAnswer]
          .wordTranslate !== this.arrayRussianWords[this.countProgressAnswer][this.count],
      );
    });

    buttonWrongRight[1].addEventListener('click', () => {
      this.count = this.writeDataForClickAnswer(
        this.finalyItemsSprintGameData[this.countProgressAnswer]
          .wordTranslate === this.arrayRussianWords[this.countProgressAnswer][this.count],
      );
    });
    document.addEventListener('keydown', this.addControlKeyboard);
    document.addEventListener('keyup', () => this.removeClassFromButton());
  }

  private async drawSprintGameFromBookPageHelper(group: number) {
    const main = document.querySelector('.main') as HTMLDivElement;
    this.bestContinuousSeries = 0;
    const loader = document.querySelector('.loader') as HTMLDListElement;
    loader.classList.add('show-loader');
    main.classList.add('disabled-wrapper');
    await this.createArrayEnglishAndRussianWordsHelper(group);
    main.innerHTML = '';
    this.template.createTemplateCardGame(main);
    const wrapperCardGame = document.querySelector('.wrapper-card-sprint-game') as HTMLDivElement;
    wrapperCardGame.style.display = 'flex';
    this.timer();
    this.addTimer();
    this.countAnswer();
    loader.classList.remove('show-loader');
    main.classList.remove('disabled-wrapper');
  }

  drawSprintGameFromBookPage(): void {
    const header = document.querySelector('.header') as HTMLElement;
    const main = document.querySelector('.main') as HTMLDivElement;
    if (header.classList.contains('sprint-game')) {
      const groupStorage = Number(localStorage.getItem('currGroup'));
      this.drawSprintGameFromBookPageHelper(groupStorage);
    }
    this.resetTimer();
    main.innerHTML = '';
  }

  drawSprintGame(): void {
    const main = document.querySelector('.main') as HTMLDivElement;
    const div = document.createElement('div');
    div.classList.add('wrapper-choose-level-sprint-game');
    this.resetTimer();
    main.innerHTML = '';
    main.append(div);
    this.start.showGameSetting(div);
  }

  private async startCallback(group: number): Promise<void> {
    const main = document.querySelector('.main') as HTMLDivElement;
    this.bestContinuousSeries = 0;
    await this.createArrayEnglishAndRussianWords(group);
    main.innerHTML = '';
    this.template.createTemplateCardGame(main);
    this.timer();
    this.addTimer();
    this.countAnswer();
  }

  private runVoice(): void {
    const voice = document.querySelectorAll('.column-voice') as NodeListOf<HTMLDivElement>;
    voice.forEach((e, i) => {
      e.addEventListener('click', () => {
        const audio = new Audio();
        audio.src = `https://rs-lang-2022.herokuapp.com/${this.finalyItemsSprintGameData[i].audio}`;
        audio.play();
      });
    });
  }

  private resetTimer(): void {
    const main = document.querySelector('.main') as HTMLElement;
    if (this.myInterval) {
      clearInterval(this.myInterval);
      main.innerHTML = '';
      this.template.createTableWithResults(main, this.finalyItemsSprintGameData, this.resultAnswer);
      this.runVoice();
      const score = document.querySelector('.score-for-result') as HTMLDListElement;
      const continuousSeries = document.querySelector('.best-continuous-series') as HTMLDListElement;
      score.textContent = `Счет: ${this.score}/${this.resultAnswer.length * 10}`;
      continuousSeries.textContent = `Лучшая непрерывная серия: ${this.bestContinuousSeries}`;
      this.resultAnswer = [];
      this.time = 60;
      this.arrayEnglishWord = [];
      this.countProgressAnswer = 0;
      this.score = 0;
      this.continuousSeries = 0;
    }
  }

  private timer(): void {
    const timer = document.querySelector('.item-header-card-sprint-game') as HTMLDivElement;
    const main = document.querySelector('.main') as HTMLElement;
    if (this.time < 10) {
      timer.textContent = `Таймер: 0${this.time.toString()}`;
    } else {
      timer.textContent = `Таймер: ${this.time.toString()}`;
    }
    this.time -= 1;

    if (this.myInterval && this.time < 0) {
      clearInterval(this.myInterval);
      main.innerHTML = '';
      this.template.createTableWithResults(main, this.finalyItemsSprintGameData, this.resultAnswer);
      this.runVoice();
      this.resetTimer();
    }
  }

  private addTimer(): void {
    this.myInterval = setInterval(() => this.timer(), 1000);
    window.addEventListener('click', () => {
      const wrapperCardSprintGame = document.querySelector('.wrapper-card-sprint-game') as HTMLDivElement;
      if (!wrapperCardSprintGame && this.myInterval) {
        clearInterval(this.myInterval);
      }
    });
  }

  async getUserWordGame(wordId: string) {
    const userId = localStorage.getItem('user_id') || '';
    const token = localStorage.getItem('user_access_token') || '';
    const userWord: IUserWord = await this.controllerUserWords.getUserWord(userId, token, wordId);
    return userWord;
  }

  async getUserWordsGame() {
    const userId = localStorage.getItem('user_id') || '';
    const token = localStorage.getItem('user_access_token') || '';
    const userWords: IUserWord[] = await this.controllerUserWords.getUserWords(userId, token);
    return userWords;
  }

  async createUserWordsGame(wordId: string, rightWrongAnswer: number) {
    const userId = localStorage.getItem('user_id') || '';
    const token = localStorage.getItem('user_access_token') || '';
    const usersWordsGame = await this.getUserWordsGame();
    const date = this.getDate();
    let repeatWord: boolean = false;
    usersWordsGame.forEach((e) => {
      if (e.id === wordId) {
        repeatWord = true;
      }
    });
    if (!repeatWord) {
      const body: IUserWord = {
        difficulty: 'simple',
        optional: {
          new: false,
          progress: rightWrongAnswer,
          timeStamp: date,
        },
      };
      this.controllerUserWords.createUserWord(userId, token, wordId, body);
    }
  }
}
