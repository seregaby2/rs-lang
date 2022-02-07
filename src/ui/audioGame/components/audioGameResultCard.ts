import { IWordsData } from '../../sprintGame/components';

export class AudioGameResultCard {
  public correctAnswer: IWordsData[] = [];

  public incorrectAnswer: IWordsData[] = [];

  private pageContainer;

  constructor() {
    this.pageContainer = document.querySelector('body') as HTMLElement;
  }

  public createResultGameCard(): void {
    const mainContainer = this.pageContainer.querySelector('.main-wrapper-audio-game') as HTMLElement;
    mainContainer.innerHTML = '';
    const mainTitle = document.createElement('h2') as HTMLElement;
    const container = document.createElement('div') as HTMLDivElement;
    const containerCorrectAnswer = document.createElement('div') as HTMLDivElement;
    const containerInCorrectAnswer = document.createElement('div') as HTMLDivElement;
    const titleCorrectAnswer = document.createElement('h3') as HTMLElement;
    const titleIncorrectAnswer = document.createElement('h3') as HTMLElement;
    const countCorrectAnswer = document.createElement('span') as HTMLSpanElement;
    const countIncorrectAnswer = document.createElement('span') as HTMLSpanElement;

    mainTitle.classList.add('main-title-result-info-audio-game');
    container.classList.add('container-result-info-audio-game');
    containerCorrectAnswer.classList.add('container-correct-answer-result-info-audio-game');
    containerInCorrectAnswer.classList.add('container-incorrect-answer-result-info-audio-game');;

    titleCorrectAnswer.classList.add('correct-answer-title-result-info-audio-game');
    titleIncorrectAnswer.classList.add('incorrect-answer-title-result-info-audio-game');
    countCorrectAnswer.classList.add('correct-answer-count-result-info-audio-game');
    countIncorrectAnswer.classList.add('incorrect-answer-count-result-info-audio-game');

    if (this.correctAnswer.length < this.incorrectAnswer.length) {
      mainTitle.innerHTML = 'В этот раз не получилось, но продолжай тренироваться!';
    }
    if (this.correctAnswer.length > this.incorrectAnswer.length) {
      mainTitle.innerHTML = 'Поздравляем, отличный результат, но ты можешь лучше!';
    }
    if (this.correctAnswer.length === 20) {
      mainTitle.innerHTML = 'Превосходно!!! Вы все знаете!!!';
    }
    this.createCorrectAnswer(containerCorrectAnswer);
    this.createIncorrectAnswer(containerInCorrectAnswer);

    titleCorrectAnswer.innerHTML = `ЗНАЮ: ${this.correctAnswer.length}`;
    titleIncorrectAnswer.innerHTML = `ОШИБОК: ${this.incorrectAnswer.length}`;
    titleCorrectAnswer.appendChild(countCorrectAnswer);

    titleIncorrectAnswer.appendChild(countIncorrectAnswer);

    titleIncorrectAnswer.appendChild(countIncorrectAnswer);
    container.appendChild(mainTitle);
    container.appendChild(titleCorrectAnswer);
    container.appendChild(containerCorrectAnswer);
    container.appendChild(titleIncorrectAnswer);
    container.appendChild(containerInCorrectAnswer);
    mainContainer.appendChild(container);

    this.createButtonsResultGame();
  }

  private createCorrectAnswer(parent: HTMLElement): void {
    this.correctAnswer.forEach((item) => {
      const container = document.createElement('div');
      const correctAnswerWord = document.createElement('span') as HTMLSpanElement;
      const correctAnswerTranslate = document.createElement('span') as HTMLSpanElement;
      const correctAnswerDash = document.createElement('span') as HTMLSpanElement;

      container.classList.add('correct-answer-list-result-info-audio-game');
      correctAnswerWord.innerHTML = item.word as string;
      correctAnswerTranslate.innerHTML = item.wordTranslate as string;
      correctAnswerDash.innerText = '-';

      container.appendChild(correctAnswerWord);
      container.appendChild(correctAnswerDash);
      container.appendChild(correctAnswerTranslate);
      parent.appendChild(container);
    });
  }

  private createIncorrectAnswer(parent: HTMLElement): void {
    this.incorrectAnswer.forEach((item) => {
      const container = document.createElement('div');
      const incorrectAnswerWord = document.createElement('span') as HTMLSpanElement;
      const incorrectAnswerTranslate = document.createElement('span') as HTMLSpanElement;
      const incorrectAnswerDash = document.createElement('span') as HTMLSpanElement;

      container.classList.add('incorrect-answer-list-result-info-audio-game');
      incorrectAnswerWord.innerHTML = item.word as string;
      incorrectAnswerTranslate.innerHTML = item.wordTranslate as string;
      incorrectAnswerDash.innerText = '-';

      container.appendChild(incorrectAnswerWord);
      container.appendChild(incorrectAnswerDash);
      container.appendChild(incorrectAnswerTranslate);
      parent.appendChild(container);
    });
  }

  private createButtonsResultGame(): void {
    const buttonResultGame = [
      {
        label: 'Играть еще',
        class: 'button-play-again-audio-game',
      },
      {
        label: 'К списку игр',
        class: 'button-game-list-audio-game',
      },
    ];
    const mainContainer = this.pageContainer.querySelector('.main-wrapper-audio-game') as HTMLElement;
    const containerButton = document.createElement('div') as HTMLDivElement;
    containerButton.classList.add('button-container-result-info-audio-game');
    buttonResultGame.forEach((item) => {
      const button = document.createElement('button') as HTMLButtonElement;
      button.classList.add('button-audio-game', item.class);
      button.innerHTML = item.label;
      containerButton.appendChild(button);
      mainContainer.appendChild(containerButton);
    });
  }
}
