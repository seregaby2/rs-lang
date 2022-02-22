import { IWordsData } from '../../common/controller/model';

export class TemplateHtml {
  private createElement = (className: string, container: HTMLElement, tag: string): HTMLElement => {
    const Element = document.createElement(tag);
    Element.classList.add(className);
    return container.appendChild(Element);
  };

  createTemplateCardGame(wrapperSprintGame: HTMLDivElement): void {
    const wrapperCardSprintGame = this.createElement('wrapper-card-sprint-game', wrapperSprintGame, 'div');
    const controlPanel = this.createElement('control-panel', wrapperCardSprintGame, 'div');
    this.createElement('volume', controlPanel, 'div');
    const cardSprintGame = this.createElement('card-sprint', wrapperCardSprintGame, 'div');
    const headerCardSprintGame = this.createElement('header-card-sprint-game', cardSprintGame, 'div');
    const contentImageCardSprintGame = this.createElement('image-content-card-sprint-game', cardSprintGame, 'div');
    const contentCardSprintGame = this.createElement('content-card-spring-game', cardSprintGame, 'div');
    const footerCardSprintGame = this.createElement('footer-card-spring-game', cardSprintGame, 'div');
    for (let i = 0; i < 3; i += 1) {
      this.createElement('item-header-card-sprint-game', headerCardSprintGame, 'div');
    }
    for (let i = 0; i < 5; i += 1) {
      const img = (this.createElement('favorites-card-img', contentImageCardSprintGame, 'img') as HTMLImageElement);
      img.src = './assets/images/sprintGame/parrot1.png';
      img.alt = 'parrot';
      img.id = `parrot-${i}`;
    }
    for (let i = 0; i < 2; i += 1) {
      this.createElement('item-content-card-sprint-game', contentCardSprintGame, 'div');
    }
    for (let i = 0; i < 2; i += 1) {
      const buttonNextPrev = this.createElement('item-footer-card-sprint-game', footerCardSprintGame, 'button');
      if (i === 0) {
        buttonNextPrev.textContent = 'Неверно';
      } else {
        buttonNextPrev.textContent = 'Верно';
      }
    }
  }

  createTableWithResults(
    wrapperSprintGame: HTMLElement,
    arrayWordsForSprintGame: IWordsData[],
    arrayResultAnswer: number[],
  ): void {
    const wrapperResultListSprintGame = this.createElement('wrapper-result-sprint-game', wrapperSprintGame, 'div');
    const wrapperTable = this.createElement('wrapper-table', wrapperResultListSprintGame, 'div');
    const wrapperHeaderResultTable = this.createElement('wrapper-header-table', wrapperTable, 'div');
    this.createElement('best-continuous-series', wrapperHeaderResultTable, 'div');
    this.createElement('score-for-result', wrapperHeaderResultTable, 'div');
    const result = this.createElement('text-result', wrapperTable, 'div');
    result.textContent = 'Результаты';
    if (!arrayResultAnswer.length) {
      arrayResultAnswer.push(0);
    }
    for (let i = 0; i < arrayResultAnswer.length; i += 1) {
      this.createRowTableWithResult(wrapperTable, i, arrayWordsForSprintGame, arrayResultAnswer);
    }
  }

  createRowTableWithResult(
    wrapperTable: HTMLElement,
    index: number,
    arrayWordsForSprintGame: IWordsData[],
    arrayResultAnswer: number[],
  ) {
    const wrapperRowTableWithResult = this.createElement('wrapper-row', wrapperTable, 'div');
    const voice = this.createElement('column-voice', wrapperRowTableWithResult, 'div');
    voice.style.backgroundImage = 'url(./assets/svg/voice.svg)';
    const englishWord = this.createElement('column-english', wrapperRowTableWithResult, 'div');
    englishWord.textContent = arrayWordsForSprintGame[index].word?.toString() || '';
    const transcription = this.createElement('column-transcription', wrapperRowTableWithResult, 'div');
    transcription.textContent = arrayWordsForSprintGame[index].transcription?.toString() || '';
    const russianWord = this.createElement('column-russian', wrapperRowTableWithResult, 'div');
    russianWord.textContent = arrayWordsForSprintGame[index].wordTranslate?.toString() || '';
    const answer = this.createElement('column-answer', wrapperRowTableWithResult, 'div');
    if (arrayResultAnswer[index] === 0) {
      answer.style.backgroundImage = 'url(./assets/svg/wrongAnswer.svg)';
    } else {
      answer.style.backgroundImage = 'url(./assets/svg/rightAnswer.svg)';
    }
  }

  loader(wrapperTable: HTMLElement) {
    this.createElement('loader', wrapperTable, 'div');
  }
}
