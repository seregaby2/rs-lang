import { IWordsData } from '../../sprintGame/components';

export class AudioGameResultCard {
  private pageContainer;

  private url = 'https://rs-lang-2022.herokuapp.com/';

  private audioGameCallback;

  private maxResult = 20;

  constructor(callback: () => void) {
    this.pageContainer = document.querySelector('body') as HTMLElement;
    this.audioGameCallback = callback;
  }

  public createResultGameCard(correctWords: IWordsData[], incorrectWords: IWordsData[]): void {
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

    mainTitle.classList.add('main-title-result-card');
    container.classList.add('container-result-info-audio-game');
    containerCorrectAnswer.classList.add('correct-answer-list');
    containerInCorrectAnswer.classList.add('incorrect-answer-list');

    titleCorrectAnswer.classList.add('correct-answer-title');
    titleIncorrectAnswer.classList.add('incorrect-answer-title');
    countCorrectAnswer.classList.add('count-correct-answer');
    countIncorrectAnswer.classList.add('count-incorrect-answer');

    if (correctWords.length < incorrectWords.length) {
      mainTitle.innerHTML = 'В этот раз не получилось, продолжай тренироваться!';
    }
    if (correctWords.length > incorrectWords.length) {
      mainTitle.innerHTML = 'Поздравляем, отличный результат, но ты можешь лучше!';
    }
    if (correctWords.length === this.maxResult) {
      mainTitle.innerHTML = 'Превосходно!!! Вы все знаете!!!';
    }
    this.createCorrectAnswer(containerCorrectAnswer, correctWords);
    this.createIncorrectAnswer(containerInCorrectAnswer, incorrectWords);

    titleCorrectAnswer.innerHTML = `Знаю: ${correctWords.length}`;
    titleIncorrectAnswer.innerHTML = `Ошибок: ${incorrectWords.length}`;
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
    this.setListenerButtonPlayAgain();
    this.setListenerVolumeWord();
  }

  private createCorrectAnswer(parent: HTMLElement, words: IWordsData[]): void {
    words.forEach((item) => {
      const mainContainer = document.createElement('div') as HTMLDivElement;
      const container = document.createElement('div') as HTMLDivElement;
      const audioImg = document.createElement('div') as HTMLDivElement;
      const correctAnswerWord = document.createElement('span') as HTMLSpanElement;
      const correctAnswerTranslate = document.createElement('span') as HTMLSpanElement;
      const correctAnswerDash = document.createElement('span') as HTMLSpanElement;

      mainContainer.classList.add('correct-answer-main-container-result-info-audio-game');
      container.classList.add('correct-answer');
      audioImg.classList.add('volume-correct-answer');
      correctAnswerWord.classList.add('correct-answer-word');
      correctAnswerTranslate.classList.add('correct-answer-translate');
      audioImg.dataset.src = item.audio;

      correctAnswerWord.innerHTML = item.word as string;
      correctAnswerTranslate.innerHTML = item.wordTranslate as string;
      correctAnswerDash.innerText = ' - ';

      container.appendChild(audioImg);
      container.appendChild(correctAnswerWord);
      container.appendChild(correctAnswerDash);
      container.appendChild(correctAnswerTranslate);
      mainContainer.appendChild(container);
      parent.appendChild(container);
    });
  }

  private createIncorrectAnswer(parent: HTMLElement, words: IWordsData[]): void {
    words.forEach((item) => {
      const mainContainer = document.createElement('div') as HTMLDivElement;
      const container = document.createElement('div') as HTMLDivElement;
      const audioImg = document.createElement('div') as HTMLDivElement;
      const incorrectAnswerWord = document.createElement('span') as HTMLSpanElement;
      const incorrectAnswerTranslate = document.createElement('span') as HTMLSpanElement;
      const incorrectAnswerDash = document.createElement('span') as HTMLSpanElement;

      mainContainer.classList.add('incorrect-answer-container');
      container.classList.add('incorrect-answer');
      audioImg.classList.add('volume-correct-answer');
      incorrectAnswerWord.classList.add('incorrect-answer-word');
      incorrectAnswerTranslate.classList.add('incorrect-answer-translate');

      audioImg.dataset.src = item.audio;

      incorrectAnswerWord.innerHTML = item.word as string;
      incorrectAnswerTranslate.innerHTML = item.wordTranslate as string;
      incorrectAnswerDash.innerText = ' - ';

      container.appendChild(audioImg);
      container.appendChild(incorrectAnswerWord);
      container.appendChild(incorrectAnswerDash);
      container.appendChild(incorrectAnswerTranslate);
      mainContainer.appendChild(container);
      parent.appendChild(mainContainer);
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
    containerButton.classList.add('button-container-result-card');
    buttonResultGame.forEach((item) => {
      const button = document.createElement('button') as HTMLButtonElement;
      button.classList.add('button-audio-game', item.class);
      button.innerHTML = item.label;
      containerButton.appendChild(button);
      mainContainer.appendChild(containerButton);
    });
  }

  private setListenerButtonPlayAgain(): void {
    const button = this.pageContainer.querySelector('.button-play-again-audio-game');
    button?.addEventListener('click', () => {
      this.audioGameCallback();
    });
  }

  private setListenerVolumeWord(): void {
    const container = this.pageContainer.querySelector('.container-result-info-audio-game') as HTMLDivElement;
    container.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isSelectedIncorrect = target.classList.contains('volume-incorrect-answer');
      const isSelectedCorrect = target.classList.contains('volume-correct-answer');

      if (isSelectedIncorrect || isSelectedCorrect) {
        const path = target.dataset.src;
        const audio = new Audio();
        audio.src = this.url + path;
        audio.play();
      }
    });
  }
}
