import { ControllerAggregated } from '../common/controller/controllerAggregated';
import { ControllerSettings } from '../common/controller/controllerSettings';
import { ControllerStatistics } from '../common/controller/controllerStatistics';
import { ISettings, IStatistics } from '../common/controller/model';

export class LogicStatistics {
  private newWordsSprint: number = 0;

  private newWordsAudio: number = 0;

  private newWordsBook: number = 0;

  private percentSprint: number = 0;

  private percentAudio: number = 0;

  private percentBook: number = 0;

  private theBestSeriesSprint: number = 0;

  private theBestSeriesAudio: number = 0;

  private learnedAnswer: number = 0;

  private dataOfSettings!: ISettings;

  private controllerAggregated: ControllerAggregated = new ControllerAggregated();

  private controllerStatistics: ControllerStatistics = new ControllerStatistics();

  private controllerSettings: ControllerSettings = new ControllerSettings();

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

  private async getLearnedWordsFromBook() {
    const userId = localStorage.getItem('user_id') || '';
    const token = localStorage.getItem('user_access_token') || '';
    this.learnedAnswer = (await this.controllerAggregated
      .getAggregatedLearnedWord(userId, token))[0].paginatedResults.length;
  }

  private async getPercentForGame() {
    const userId = localStorage.getItem('user_id') || '';
    const token = localStorage.getItem('user_access_token') || '';

    this.dataOfSettings = await this.controllerSettings.getSettings(userId, token);
    const rightAnswerSprint = this.dataOfSettings.optional.countRightAnswerSprint;
    const totalAnswerSprint = this.dataOfSettings.optional.countTotalAnswerSprint || 1;
    if (rightAnswerSprint) {
      this.percentSprint = Math.round((rightAnswerSprint
        / totalAnswerSprint) * 10000) / 100;
    } else {
      this.percentSprint = 0;
    }

    const rightAnswerAudio = this.dataOfSettings.optional.countRightAnswerAudio;
    const totalAnswerAudio = this.dataOfSettings.optional.countTotalAnswerAudio || 1;
    if (rightAnswerAudio) {
      this.percentAudio = Math.round((rightAnswerAudio
        / totalAnswerAudio) * 10000) / 100;
    } else {
      this.percentAudio = 0;
    }

    if (rightAnswerAudio && rightAnswerSprint) {
      const rightAnswerBook = rightAnswerSprint + rightAnswerAudio;
      const totalAnswerBook = totalAnswerAudio + totalAnswerSprint;
      this.percentBook = Math.round((rightAnswerBook
      / totalAnswerBook) * 10000) / 100;
    } else if (!rightAnswerAudio) {
      this.percentBook = this.percentSprint;
    } else if (!rightAnswerSprint) {
      this.percentBook = this.percentAudio;
    }
  }

  private GetContinuosSeriesForGame() {
    if (this.dataOfSettings.optional.longestContinuosSeriesSprint) {
      this.theBestSeriesSprint = this.dataOfSettings.optional.longestContinuosSeriesSprint;
    } else {
      this.theBestSeriesSprint = 0;
    }

    if (this.dataOfSettings.optional.longestContinuosSeriesAudio) {
      this.theBestSeriesAudio = this.dataOfSettings.optional.longestContinuosSeriesAudio;
    } else {
      this.theBestSeriesAudio = 0;
    }
  }

  private getCurrentDay() {
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
      const bodySet: ISettings = {
        wordsPerDay: 1,
        optional: {
          countRightAnswerSprint: 0,
          countTotalAnswerSprint: 1,
          longestContinuosSeriesSprint: 0,
          countRightAnswerAudio: 0,
          countTotalAnswerAudio: 1,
          longestContinuosSeriesAudio: 0,
        },

      };
      await this.controllerSettings.updateSettings(userId, token, bodySet);
      repeat = true;
    }
    await this.getNewWords();
    await this.getPercentForGame();
    this.GetContinuosSeriesForGame();
    await this.getLearnedWordsFromBook();
    const body: IStatistics = {
      learnedWords: 0,
      optional: {
        countNewWordsSprint: this.newWordsSprint,
        percentRightAnswerSprint: this.percentSprint,
        longestSeriesOfRightAnswerSprint: this.theBestSeriesSprint,
        countNewWordsAudio: this.newWordsAudio,
        percentRightAnswerAudio: this.percentAudio,
        longestSeriesOfRightAnswerAudio: this.theBestSeriesAudio,
        countNewWordsBook: this.newWordsBook,
        countLearnedWordsBook: this.learnedAnswer,
        percentRightAnswerBook: this.percentBook,
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
