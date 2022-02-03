import { SprintController } from './controller';
import { getRandomPage, shuffle } from './HelpFunction';
import { IWordsData } from './model';

export class LogicSprintGame {
  arrayEnglishWord: string[] = [];

  arrayRussianWords: string[][] = [];

  items: IWordsData[] = [];

  countProgressAnswer = 0;

  resultAnswer: number[] = [];

  score: number = 0;

  continuousSeries: number = 0;

  private async getWords(group:number): Promise<IWordsData[]> {
    const minCountPage = 0;
    const maxCountPage = 29;
    const controller = new SprintController();
    const numberPage = getRandomPage(maxCountPage, minCountPage);
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
        const index = getRandomPage(shuffleWordsData.length - 1, 0);
        arrayRussianWordsRandomAnswer.push(shuffleWordsData[index].wordTranslate || '');
      }
      arrayRussianWordsTotal.push(arrayRussianWordsRandomAnswer);
    }
    return arrayRussianWordsTotal;
  }

  async createArrayEnglishAndRussianWords(group:number): Promise<void> {
    const arrayData = [];
    arrayData.push(await this.getWords(group));
    arrayData.push(await this.getWords(group));
    arrayData.push(await this.getWords(group));
    this.items = arrayData.flat(1);
    this.arrayRussianWords = this.createArrayRussianWord(this.items);
    for (let j = 0; j < this.items.length; j += 1) {
      this.arrayEnglishWord.push(this.items[j].word || '');
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
      this.resultAnswer = [];
      this.score = 0;
      this.continuousSeries = 0;
    }
    itemHeader[2].textContent = `Score:${(this.score).toString()}`;
    itemHeader[1].textContent = `Continuous series: ${this.continuousSeries}`;
    this.writeEnglishAndRussianWord(
      this.arrayRussianWords[this.countProgressAnswer][count],
      this.arrayEnglishWord[this.countProgressAnswer],
    );
    console.log(
      'rus',
      this.arrayRussianWords[this.countProgressAnswer][count],
      this.arrayEnglishWord[this.countProgressAnswer],
    );
  }

  async countAnswer() {
    const buttonWrongRight = document.querySelectorAll('.item-footer-card-sprint-game') as NodeListOf<HTMLDivElement>;
    let count = getRandomPage(1, 0);
    this.getAnswer(count);
    buttonWrongRight[0].addEventListener('click', async () => {
      console.log(
        this.items[this.countProgressAnswer].wordTranslate,
        this.arrayRussianWords[this.countProgressAnswer][count],
      );
      if (this.items[this.countProgressAnswer].wordTranslate
          !== this.arrayRussianWords[this.countProgressAnswer][count]) {
        this.resultAnswer.push(1);
        this.score += 10;
        this.continuousSeries += 1;
      } else {
        this.resultAnswer.push(0);
        this.continuousSeries = 0;
      }
      this.countProgressAnswer += 1;
      count = getRandomPage(1, 0);
      this.getAnswer(count);
      console.log(this.countProgressAnswer, 'arr', this.resultAnswer);
    });

    buttonWrongRight[1].addEventListener('click', async () => {
      console.log(
        this.items[this.countProgressAnswer].wordTranslate,
        this.arrayRussianWords[this.countProgressAnswer][count],
      );
      if (this.items[this.countProgressAnswer].wordTranslate
          === this.arrayRussianWords[this.countProgressAnswer][count]) {
        this.resultAnswer.push(1);
        this.score += 10;
        this.continuousSeries += 1;
      } else {
        this.resultAnswer.push(0);
        this.continuousSeries = 0;
      }
      this.countProgressAnswer += 1;
      count = getRandomPage(1, 0);
      this.getAnswer(count);
      console.log('arr', this.resultAnswer);
    });
  }
}
