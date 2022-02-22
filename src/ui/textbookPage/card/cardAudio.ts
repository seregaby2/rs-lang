import { ControllerWords } from '../../common/controller/controllerWords';
import { IWordsData } from '../../common/controller/model';

export class CardAudio {
  private audioWord: HTMLAudioElement | undefined;

  private audioMeaning: HTMLAudioElement | undefined;

  private audioExample: HTMLAudioElement | undefined;

  private controller: ControllerWords = new ControllerWords();

  public playCardAudio(group: number, page: number): void {
    const pagination = document.querySelector('.textbook-pagination') as HTMLElement;
    const textbookHeader = document.querySelector('.textbook-header') as HTMLElement;
    const header = document.querySelector('.header') as HTMLElement;
    [pagination, textbookHeader, header].forEach((el) => {
      el.addEventListener('click', () => {
        this.stopAudioSet();
      });
    });
    const audioBtns = document.querySelectorAll('.textbook-card-sound') as NodeListOf<HTMLDivElement>;
    audioBtns.forEach((btn, btnNumber) => {
      btn.addEventListener('click', () => {
        this.makeAudioBtnActive(btn);
        this.controller.getWords(group, page)
          .then((words) => {
            this.playAudioSet(
              words[btnNumber].audio,
              words[btnNumber].audioMeaning,
              words[btnNumber].audioExample,
            );
          });
      });
    });
  }

  private playAudioSet(
    word: IWordsData['audio'],
    meaning: IWordsData['audioMeaning'],
    example: IWordsData['audioExample'],
  ): void {
    this.audioWord = new Audio(`https://rs-lang-2022.herokuapp.com/${word}`);
    this.audioMeaning = new Audio(`https://rs-lang-2022.herokuapp.com/${meaning}`);
    this.audioExample = new Audio(`https://rs-lang-2022.herokuapp.com/${example}`);

    this.disableAudioButtons();

    this.audioWord?.play();

    this.audioWord.addEventListener('ended', () => {
      this.audioMeaning?.play();
    });

    this.audioMeaning.addEventListener('ended', () => {
      this.audioExample?.play();
    });

    this.audioExample.addEventListener('ended', () => {
      this.enableAudioButtons();
    });
  }

  private stopAudioSet(): void {
    this.audioExample?.pause();
    this.audioWord?.pause();
    this.audioMeaning?.pause();
  }

  private disableAudioButtons(): void {
    const audioBtns = document.querySelectorAll('.textbook-card-sound') as NodeListOf<HTMLDivElement>;
    audioBtns.forEach((btn) => {
      btn.classList.add('disable');
    });
  }

  private enableAudioButtons(): void {
    const audioBtns = document.querySelectorAll('.textbook-card-sound') as NodeListOf<HTMLDivElement>;
    audioBtns.forEach((btn) => {
      btn.classList.remove('disable', 'active');
    });
  }

  private makeAudioBtnActive(element: HTMLElement): void {
    element.classList.toggle('active');
  }
}
