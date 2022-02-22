import { CardAudio } from './card/cardAudio';
import { CardStyles } from './card/cardStyles';
import { ControllerWords } from '../common/controller/controllerWords';
import { clearCardsContainer } from './textbookHelper';
import { TextbookCard } from './card/component/textbookCard';
import { ControllerUserWords } from '../common/controller/controllerUserWords';
import { UserCard } from './card/component/userCard';
import { USER_ACCESS_TOKEN, USER_ID } from '../common/model/localStorageKeys';

interface Progress {
  progress: number,
  id: string,
  difficulty: string,
}

export class TextbookPageDisplay {
  private audio: CardAudio = new CardAudio();

  private style: CardStyles = new CardStyles();

  private controllerWords: ControllerWords = new ControllerWords();

  private controllerUserWords: ControllerUserWords = new ControllerUserWords();

  private textbookCard: TextbookCard = new TextbookCard();

  private textbookUserCard: UserCard = new UserCard();

  private userId = localStorage.getItem(USER_ID) || '';

  private userToken = localStorage.getItem(USER_ACCESS_TOKEN) || '';

  public toggleCards(group: number, page: number): void {
    if (this.userId && this.userToken) {
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

    const difficultWords: string[] = [];

    const learntWords: string[] = [];

    const progress: Progress[] = [];
    this.controllerUserWords
      .getUserWords(this.userId, this.userToken)
      .then((data) => {
        data.forEach((word) => {
          if (word.difficulty === 'difficult' && word.wordId) {
            difficultWords.push(word.wordId);
          }

          if (word.difficulty === 'difficult' && word.optional.progress === 5 && word.wordId) {
            learntWords.push(word.wordId);
          }

          if (word.difficulty === 'simple' && word.optional.progress === 3 && word.wordId) {
            learntWords.push(word.wordId);
          }

          const progressObj: Progress = {
            progress: word.optional.progress,
            id: word.wordId || '',
            difficulty: word.difficulty,
          };
          progress.push(progressObj);
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

                difficultWords.forEach((difficultWordId) => {
                  if (difficultWordId === word.id) {
                    this.textbookUserCard.addDifficultWordsStyle(difficultWordId);
                  }
                });

                learntWords.forEach((learntWordId) => {
                  if (learntWordId === word.id) {
                    this.textbookUserCard.addLearntWordsStyle(learntWordId);
                  }
                });

                progress.forEach((progressObj) => {
                  if (progressObj.id === word.id) {
                    const card = document
                      .querySelector(`[data-word-id="${progressObj.id}"] .textbook-card-text`) as HTMLElement;
                    const prog = card.querySelector('.progress-container') as HTMLElement;
                    if (prog) {
                      prog.remove();
                    }
                    this.textbookUserCard.drawProgressElement(progressObj);
                  }
                });
              }
            });
            this.audio.playCardAudio(group, page);
            this.style.changeStyles(group);
            this.textbookUserCard.checkIfAllBtnsActive(true);
          });
      });
  }
}
