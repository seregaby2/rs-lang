import { ControllerWords } from '../../../common/controller/controllerWords';
import { IWordsData } from '../../../common/controller/model';

export class CardAudio {
  private controller: ControllerWords = new ControllerWords();

  public playCardAudio(group: number, page: number): void {
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
    const audioWord = new Audio(`https://rs-lang-2022.herokuapp.com/${word}`);
    const audioMeaning = new Audio(`https://rs-lang-2022.herokuapp.com/${meaning}`);
    const audioExample = new Audio(`https://rs-lang-2022.herokuapp.com/${example}`);

    this.disableAudioButtons();

    audioWord.play();
    audioWord.addEventListener('ended', () => {
      audioMeaning.play();
    });

    audioMeaning.addEventListener('ended', () => {
      audioExample.play();
    });

    audioExample.addEventListener('ended', () => {
      this.enableAudioButtons();
    });
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
