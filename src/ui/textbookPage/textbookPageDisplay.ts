import { CardAudio } from './card/cardAudio';
import { CardStyles } from './card/cardStyles';
import { ControllerWords } from '../common/controller/controllerWords';
import { clearCardsContainer } from './textbookHelper';
import { TextbookCard } from './card/textbookCard';
import { ControllerUserWords } from '../common/controller/controllerUserWords';
import { UserCard } from './card/userCard';

export class TextbookPageDisplay {
  private audio: CardAudio = new CardAudio();

  private style: CardStyles = new CardStyles();

  private controllerWords: ControllerWords = new ControllerWords();

  private controllerUserWords: ControllerUserWords = new ControllerUserWords();

  private textbookCard: TextbookCard = new TextbookCard();

  private textbookUserCard: UserCard = new UserCard();

  public toggleCards(group: number, page: number): void {
    if (localStorage.getItem('user_id') && localStorage.getItem('user_access_token')) {
      this.createUserCards(group, page);
    } else {
      this.createUsualCards(group, page);
    }
  }

  private createUsualCards(group: number, page: number): void {
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

  public createUserCards(group: number, page: number): void {
    const cardsContainer = document.querySelector('.textbook-cards-container') as HTMLDivElement;

    const promisesArrId: string[] = [];
    const promisesProgress: { progress: number, id: string }[] = [];
    this.controllerUserWords
      .getUserWords(
        localStorage.getItem('user_id') || '',
        localStorage.getItem('user_access_token') || '',
      )
      .then((data) => {
        data.forEach((i) => {
          if (i.difficulty != null && i.difficulty === 'difficult' && i.wordId != null) {
            promisesArrId.push(i.wordId);
          }
          if (i.optional.progress != null && i.wordId != null) {
            const obj: { progress: number, id: string } = {
              progress: i.optional.progress,
              id: i.wordId,
            };
            promisesProgress.push(obj);
          }
        });
      })
      .then(() => {
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
                  .append(this.textbookUserCard.drawWordAuthorisedCardBtns(word.id));

                promisesArrId.forEach((complicatedWordId) => {
                  if (complicatedWordId === word.id) {
                    const card = document.querySelector(`[data-word-id="${complicatedWordId}"]`) as HTMLElement;
                    card.append(this.textbookUserCard.drawDifficultStar());

                    const btn = document.querySelector(`[data-difficult-btn="${complicatedWordId}"]`) as HTMLElement;
                    this.textbookUserCard.disableDifficultBtn(btn);
                  }
                });

                promisesProgress.forEach((i) => {
                  if (i.id === word.id) {
                    // console.log(`${word.id}`, i.progress);
                  }
                });
              }
            });
            this.audio.playCardAudio(group, page);
            this.style.changeStyles(group);
          });
      });
  }
}
