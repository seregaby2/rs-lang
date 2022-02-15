import { ControllerUserWords } from '../../common/controller/controllerUserWords';
import { ControllerWords } from '../../common/controller/controllerWords';
import { TextbookCard } from './textbookCard';
import { IWordsData } from '../../common/controller/model';
import { clearCardsContainer, hidePagination } from '../textbookHelper';

export class AuthorizedCard {
  private textbookCard: TextbookCard = new TextbookCard();

  private controllerUserWords: ControllerUserWords = new ControllerUserWords();

  private controllerWords: ControllerWords = new ControllerWords();

  private userId = localStorage.getItem('user_id')!;

  private userToken = localStorage.getItem('user_access_token')!;

  private levelColor: string[] = ['#F1C50EFF', '#FFBF00', '#FF9515', '#FF6A2B', '#e21818', '#e21818', '#dc146f'];

  public drawComplicatedGroup(): void {
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

  public createWordAuthorisedCardBtns(id: string): HTMLElement {
    const buttonsContainer = document.createElement('div') as HTMLElement;
    buttonsContainer.classList.add('textbook-authorized-buttons');

    const complicatedBtn = document.createElement('button') as HTMLButtonElement;
    complicatedBtn.classList.add('textbook-difficult-btn', 'btn');
    complicatedBtn.innerHTML = 'Сложное';
    complicatedBtn.setAttribute('data-difficult-btn', id);

    complicatedBtn.addEventListener('click', () => {
      if (complicatedBtn.dataset.difficultBtn) {
        const wordId = complicatedBtn.dataset.difficultBtn;
        this.makeWordDifficult(wordId);

        const card = complicatedBtn.closest('.textbook-card-container') as HTMLElement;
        card.append(this.createDifficultStar());

        const z = document.querySelector(`[data-learnt-btn="${wordId}"]`) as HTMLButtonElement;
        z.classList.remove('disable');

        const star = document.querySelector(`[data-word-id="${wordId}"] .check`) as HTMLElement;
        if (star) {
          star.remove();
        }

        this.disableBtn(complicatedBtn);
      }
    });

    const learntBtn = document.createElement('button') as HTMLButtonElement;
    learntBtn.classList.add('textbook-learnt-btn', 'btn');
    learntBtn.innerHTML = 'Изученное';
    learntBtn.setAttribute('data-learnt-btn', id);

    learntBtn.addEventListener('click', () => {
      if (learntBtn.dataset.learntBtn) {
        const wordId = learntBtn.dataset.learntBtn;
        this.makeWordLearnt(wordId);

        const card = learntBtn.closest('.textbook-card-container') as HTMLElement;
        card.append(this.createLearntCheckmark());

        const z = document.querySelector(`[data-difficult-btn="${wordId}"]`) as HTMLButtonElement;
        z.classList.remove('disable');

        const star = document.querySelector(`[data-word-id="${wordId}"] .star`) as HTMLElement;
        if (star) {
          star.remove();
        }

        this.disableBtn(learntBtn);
      }
    });

    buttonsContainer.append(complicatedBtn);
    buttonsContainer.append(learntBtn);
    return buttonsContainer;
  }

  public createDifficultStar(): HTMLElement {
    const star = document.createElement('div') as HTMLElement;
    star.classList.add('star');
    const group = localStorage.getItem('currGroup');

    if (group) {
      const index = parseInt(group, 10);
      star
        .innerHTML = `<i class="fa fa-solid fa-star textbook-star-difficult" style="color: ${this.levelColor[index]}"></i>`;
    }
    return star;
  }

  public disableBtn(btn: HTMLElement): void {
    btn.classList.add('disable');
  }

  private createLearntCheckmark(): HTMLElement {
    const check = document.createElement('div') as HTMLElement;
    check.classList.add('check');
    const group = localStorage.getItem('currGroup');

    if (group) {
      const index = parseInt(group, 10);
      check
        .innerHTML = `<i class="fa fa-solid fa-check textbook-learnt-check" style="color: ${this.levelColor[index]}"></i>`;
    }
    return check;
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
            if (localStorage.getItem('currGroup') === '6') {
              this.drawComplicatedGroup();
            }
          });
      });
  }

  private makeWordDifficult(wordId: IWordsData['id']): void {
    this.controllerUserWords.createUserWord(
      this.userId,
      this.userToken,
      wordId,
      {
        difficulty: 'difficult',
        optional: {
          new: false,
          progress: 0,
        },
      },
    )
      .catch((err) => {
        if (err) {
          this.controllerUserWords.getUserWord(this.userId, this.userToken, wordId)
            .then((currentWord) => {
              this.controllerUserWords.updateUserWord(
                this.userId,
                this.userToken,
                wordId,
                {
                  difficulty: 'difficult',
                  optional: {
                    new: currentWord.optional.new,
                    progress: 0,
                  },
                },
              );
            });
        }
      });
  }

  private makeWordLearnt(wordId: IWordsData['id']): void {
    this.controllerUserWords.createUserWord(
      this.userId,
      this.userToken,
      wordId,
      {
        difficulty: 'simple',
        optional: {
          new: false,
          progress: 3,
        },
      },
    )
      .catch((err) => {
        if (err) {
          this.controllerUserWords.getUserWord(this.userId, this.userToken, wordId)
            .then(() => {
              this.controllerUserWords.updateUserWord(
                this.userId,
                this.userToken,
                wordId,
                {
                  difficulty: 'simple',
                  optional: {
                    new: false,
                    progress: 3,
                  },
                },
              );
            });
        }
      });
  }
}
