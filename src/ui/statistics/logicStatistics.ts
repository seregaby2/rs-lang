import { ControllerAggregated } from '../common/controller/controllerAggregated';
import { ControllerStatistics } from '../common/controller/controllerStatistics';
import { IStatistics } from '../common/controller/model';

export class LogicStatistics {
  private newWordsSprint: number = 0;

  private newWordsAudio: number = 0;

  private newWordsBook: number = 0;

  private percentSprint: number = 0;

  private theBestSeriesSprint: number = 0;

  private controllerAggregated: ControllerAggregated = new ControllerAggregated();

  private controllerStatistics: ControllerStatistics = new ControllerStatistics();

  private getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  private async getNewWords() {
    const userId = localStorage.getItem('user_id') || '';
    const token = localStorage.getItem('user_access_token') || '';
    this.newWordsSprint = (await this.controllerAggregated.getAggregatedWord(userId, token, 'sprint', this.getDate()))[0].paginatedResults.length;
    this.newWordsAudio = (await this.controllerAggregated.getAggregatedWord(userId, token, 'audio', this.getDate()))[0].paginatedResults.length;
    this.newWordsBook = this.newWordsSprint + this.newWordsAudio;
  }

  private async getPercentSprint() {
    const rightAnswer = Number(localStorage.getItem('countRightAnswer'));
    const totalAnswer = Number(localStorage.getItem('countTotalAnswer'));
    if (rightAnswer) {
      this.percentSprint = Math.round((rightAnswer
        / totalAnswer) * 10000) / 100;
    } else {
      this.percentSprint = 0;
    }
  }

  private GetContinuosSeriesSprint() {
    const bestSeriesSprint = Number(localStorage.getItem('theBestContinuosSeries'));
    if (bestSeriesSprint) {
      this.theBestSeriesSprint = bestSeriesSprint;
    } else {
      this.theBestSeriesSprint = 0;
    }
  }

  getCurrentDay() {
    const date = new Date();
    return date.getDay();
  }

  async updateStat() {
    const userId = localStorage.getItem('user_id') || '';
    const token = localStorage.getItem('user_access_token') || '';
    let repeat = true;
    let day: number = 0;
    if (repeat) {
      const date = new Date();
      day = date.getDay();
      repeat = false;
    }
    const currentDay = this.getCurrentDay();
    if (day !== currentDay) {
      localStorage.setItem('countRightAnswer', '0');
      localStorage.setItem('countTotalAnswer', '1');
      localStorage.setItem('theBestContinuosSeries', '0');
      repeat = true;
    }

    await this.getNewWords();
    await this.getPercentSprint();
    this.GetContinuosSeriesSprint();
    const body: IStatistics = {
      learnedWords: 0,
      optional: {
        countNewWordsSprint: this.newWordsSprint,
        percentRightAnswerSprint: this.percentSprint,
        longestSeriesOfRightAnswerSprint: this.theBestSeriesSprint,
        countNewWordsAudio: this.newWordsAudio,
        percentRightAnswerAudio: 0,
        longestSeriesOfRightAnswerAudio: 0,
        countNewWordsBook: this.newWordsBook,
        countLearnedWordsBook: 0,
        percentRightAnswerBook: 0,
      },
    };
    await this.controllerStatistics.updateStatistics(userId, token, body);
  }

  getStats() {
    const userId = localStorage.getItem('user_id') || '';
    const token = localStorage.getItem('user_access_token') || '';
    return this.controllerStatistics.getStatistics(userId, token);
  }
}
