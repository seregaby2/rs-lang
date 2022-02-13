import { CardAudio } from './card/cardAudio';
import { CardStyles } from './card/cardStyles';
import { ControllerWords } from '../common/controller/controllerWords';
import { clearCardsContainer } from './textbookHelper';
import { TextbookCard } from './card/textbookCard';
import { ControllerUserWords } from '../common/controller/controllerUserWords';
import { AuthorizedCard } from './card/authorizedCard';

export class TextbookPageController {
  private audio: CardAudio = new CardAudio();

  private style: CardStyles = new CardStyles();

  private controllerWords: ControllerWords = new ControllerWords();

  private controllerUserWords: ControllerUserWords = new ControllerUserWords();

  private textbookCard: TextbookCard = new TextbookCard();

  private textbookAuthCard: AuthorizedCard = new AuthorizedCard();

  public toggleWordsInfoLoading(group: number, page: number): void {
    if (localStorage.getItem('user_id') && localStorage.getItem('user_access_token')) {
      this.loadUserInfo(group, page);
    } else {
      this.loadInfo(group, page);
    }
  }

  private loadInfo(group: number, page: number): void {
    const cardsContainer = document.querySelector('.textbook-cards-container') as HTMLDivElement;
    this.controllerWords.getWords(group, page)
      .then((words) => {
        clearCardsContainer();
        words.forEach((word) => {
          if (word) {
            cardsContainer.append(this.textbookCard.createWordCard(
              word.image,
              word.id,
              word.word,
              word.transcription,
              word.wordTranslate,
              word.textMeaning,
              word.textMeaningTranslate,
              word.textExample,
              word.textExampleTranslate,
            ));
          }
        });
        this.audio.playCardAudio(group, page);
        this.style.changeStyles(group);
      });
  }

  private loadUserInfo(group: number, page: number): void {
    const cardsContainer = document.querySelector('.textbook-cards-container') as HTMLDivElement;
    console.log('user-info');

    const array: string[] = [];
    this.controllerUserWords
      .getUserWords(localStorage.getItem('user_id')!, localStorage.getItem('user_access_token')!)
      .then((data) => {
        data.forEach((i) => {
          if (i.difficulty != null) {
            if (i.difficulty === 'difficult') {
              if (i.id != null) {
                array.push(i.id);
              }
            }
          }
        });
      });
    console.log(array);
    this.controllerWords.getWords(group, page)
      .then((words) => {
        clearCardsContainer();
        words.forEach((word, index) => {
          if (word) {
            cardsContainer.append(this.textbookCard.createWordCard(
              word.image,
              word.id,
              word.word,
              word.transcription,
              word.wordTranslate,
              word.textMeaning,
              word.textMeaningTranslate,
              word.textExample,
              word.textExampleTranslate,
            ));
            const cardTextContainer = document
              .querySelectorAll('.textbook-card-text') as NodeListOf<HTMLDivElement>;
            cardTextContainer[index]
              .append(this.textbookAuthCard.createWordAuthorisedCardBtns(word.id));
          }
        });
        this.audio.playCardAudio(group, page);
        this.style.changeStyles(group);
      });
  }
}
