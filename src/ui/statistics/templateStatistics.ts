// import { ControllerSettings } from '../common/controller/controllerSettings';
// import { ControllerStatistics } from '../common/controller/controllerStatistics';
import { LogicStatistics } from './logicStatistics';

export class TemplateStatistics {
  private logicStatistics: LogicStatistics = new LogicStatistics();

  async drawStatistics() {
    await this.logicStatistics.updateStat();
    const main = document.querySelector('.main') as HTMLDivElement;
    main.innerHTML = '';
    const templateStats = `
    <div class="wrapper-stats">
      <div class="wrapper-sprint-total">
        <div class="header-sprint">Мини-игра "Спринт"</div>
        <div class="wrapper-sprint">
          <div class="new-words-sprint"></div>
          <div class="percent-right-answer-sprint"></div>
          <div class="longest-series-sprint"></div>
        </div>
      </div>
      <div class="wrapper-audio-total">
        <div class="header-audio">Мини-игра "Аудиовызов"</div>
        <div class="wrapper-audio">
          <div class="new-words-audio"></div>
          <div class="percent-right-answer-audio"></div>
          <div class="longest-series-audio"></div>
        </div>
      </div>
      <div class="wrapper-book-total">
        <div class="header-book">Учебник</div>
        <div class="wrapper-book">
          <div class="new-words-book"></div>
          <div class="count-learnt-book"></div>
          <div class="percent-right-answer-book"></div>
        </div>
      </div>
    </div>
    `;
    main.innerHTML = templateStats;
    await this.writeDataHtml();
  }

  async writeDataHtml() {
    const dataOfStatistics = await this.logicStatistics.getStats();

    const newWordsSprint = document.querySelector('.new-words-sprint') as HTMLDivElement;
    const percentRightAnswerSprint = document.querySelector('.percent-right-answer-sprint') as HTMLDivElement;
    const longestSeriesSprint = document.querySelector('.longest-series-sprint') as HTMLDivElement;

    const newWordsAudio = document.querySelector('.new-words-audio') as HTMLDivElement;
    const percentRightAnswerAudio = document.querySelector('.percent-right-answer-audio') as HTMLDivElement;
    const longestSeriesAudio = document.querySelector('.longest-series-audio') as HTMLDivElement;

    const newWordsBook = document.querySelector('.new-words-book') as HTMLDivElement;
    const countLearntBook = document.querySelector('.count-learnt-book') as HTMLDivElement;
    const percentRightAnswerBook = document.querySelector('.percent-right-answer-book') as HTMLDivElement;

    newWordsSprint.textContent = `Новые слова за день: ${dataOfStatistics.optional.countNewWordsSprint}`;
    percentRightAnswerSprint.textContent = `Процент правильных ответов за день: ${dataOfStatistics.optional.percentRightAnswerSprint}%`;
    longestSeriesSprint.textContent = `Самая длинная серия за день: ${dataOfStatistics.optional.longestSeriesOfRightAnswerSprint}`;

    newWordsAudio.textContent = `Новые слова за день: ${dataOfStatistics.optional.countNewWordsAudio}`;
    percentRightAnswerAudio.textContent = `Процент правильных ответов за день: ${dataOfStatistics.optional.percentRightAnswerAudio}%`;
    longestSeriesAudio.textContent = `Самая длинная серия за день: ${dataOfStatistics.optional.longestSeriesOfRightAnswerAudio}`;

    newWordsBook.textContent = `Новые слова за день: ${dataOfStatistics.optional.countNewWordsBook}`;
    countLearntBook.textContent = `Количество изученных слов: ${dataOfStatistics.optional.countLearnedWordsBook}`;
    percentRightAnswerBook.textContent = `Самая длинная серия за день: ${dataOfStatistics.optional.percentRightAnswerBook}%`;
  }
}
