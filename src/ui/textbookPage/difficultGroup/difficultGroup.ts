import { clearCardsContainer, hidePagination } from '../textbookHelper';
import { IWordsData } from '../../common/controller/model';
import { ControllerWords } from '../../common/controller/controllerWords';
import { TextbookCard } from '../card/component/textbookCard';
import { ControllerUserWords } from '../../common/controller/controllerUserWords';
import { LocalStorageService } from '../../common/services/localStorageService';
import { USER_ACCESS_TOKEN, USER_ID } from '../../common/model/localStorageKeys';

export class DifficultGroup {
  private localStorageService: LocalStorageService = new LocalStorageService();

  private controllerWords: ControllerWords = new ControllerWords();

  private textbookCard: TextbookCard = new TextbookCard();

  private controllerUserWords: ControllerUserWords = new ControllerUserWords();

  private userId = this.localStorageService.get(USER_ID);

  private userToken = this.localStorageService.get(USER_ACCESS_TOKEN);

  public drawDifficultGroup(): void {
    const cardsContainer = document
      .querySelector('.textbook-cards-container') as HTMLDivElement;

    hidePagination(true);

    const difficultWordsArray: Promise<IWordsData>[] = [];

    this.controllerUserWords.getUserWords(this.userId, this.userToken)
      .then((wordsArr) => {
        wordsArr.forEach((word) => {
          if (word.wordId && word.difficulty === 'difficult') {
            difficultWordsArray.push(this.controllerWords.getWord(word.wordId));
          }
        });
      })
      .then(() => Promise.all(difficultWordsArray)
        .then((wordsData) => {
          clearCardsContainer();
          wordsData.forEach((wordInfo) => {
            const card = this.textbookCard.createWordCard(
              wordInfo.image,
              wordInfo.id,
              wordInfo.word,
              wordInfo.transcription,
              wordInfo.wordTranslate,
              wordInfo.textMeaning,
              wordInfo.textMeaningTranslate,
              wordInfo.textExample,
              wordInfo.textExampleTranslate,
            );

            card.append(this.createBtnRemoveFromDifficult(wordInfo.id));
            cardsContainer.append(card);
          });
        }));
  }

  private createBtnRemoveFromDifficult(wordId: IWordsData['id']): HTMLButtonElement {
    const removeBtn = document.createElement('button') as HTMLButtonElement;
    removeBtn.setAttribute('data-delete-btn', wordId);
    removeBtn.classList.add('btn', 'textbook-delete-btn');
    removeBtn.innerHTML = 'Удалить';
    removeBtn.addEventListener('click', () => {
      if (removeBtn.dataset.deleteBtn) {
        const id = removeBtn.dataset.deleteBtn;
        this.deleteWordFromDifficult(id);
      }
    });
    return removeBtn;
  }

  private deleteWordFromDifficult(wordId: IWordsData['id']): void {
    this.controllerUserWords.getUserWord(
      this.userId,
      this.userToken,
      wordId,
    )
      .then((word) => {
        this.controllerUserWords.updateUserWord(
          this.userId,
          this.userToken,
          wordId,
          {
            difficulty: 'simple',
            optional: word.optional,
          },
        )
          .then(() => {
            this.drawDifficultGroup();
          });
      });
  }
}
