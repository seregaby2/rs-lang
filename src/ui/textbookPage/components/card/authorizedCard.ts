import { ControllerUserWords } from '../../../common/controller/controllerUserWords';
import { ControllerWords } from '../../../common/controller/controllerWords';
import { TextBookCard } from './textBookCard';
import { IWordsData } from '../../../common/controller/model';

export class AuthorizedCard {
  private textbookCard: TextBookCard = new TextBookCard();

  private controllerUserWords: ControllerUserWords = new ControllerUserWords();

  private controllerWords: ControllerWords = new ControllerWords();

  private userId = localStorage.getItem('user_id')!;

  private userToken = localStorage.getItem('user_access_token')!;

  public drawComplicatedGroup(): void {
    const cardsContainer = document
      .querySelector('.textbook-cards-container') as HTMLDivElement;
    cardsContainer.innerHTML = '';
    this.controllerUserWords.getUserWords(this.userId, this.userToken)
      .then((wordsArr) => {
        wordsArr.forEach((word) => {
          if (word.wordId && word.difficulty === 'difficult') {
            this.controllerWords.getWord(word.wordId)
              .then((wordInfo) => {
                const card = this.textbookCard.createWordCard(
                  wordInfo.image,
                  wordInfo.word,
                  wordInfo.transcription,
                  wordInfo.wordTranslate,
                  wordInfo.textMeaning,
                  wordInfo.textMeaningTranslate,
                  wordInfo.textExample,
                  wordInfo.textExampleTranslate,
                );
                card.append(this.createBtnRemoveFromComplicated(wordInfo.id));
                cardsContainer.append(card);
              });
          }
        });
      });
  }

  public createWordAuthorisedCard(id: string): HTMLElement {
    const buttonsContainer = document.createElement('div') as HTMLElement;
    buttonsContainer.classList.add('textbook-authorized-buttons');

    const complicatedBtn = document.createElement('button') as HTMLButtonElement;
    complicatedBtn.classList.add('textbook-complicated-btn', 'btn');
    complicatedBtn.innerHTML = 'Сложное';
    complicatedBtn.setAttribute('data-word-id', id);

    complicatedBtn.addEventListener('click', () => {
      if (complicatedBtn.dataset.wordId) {
        const { wordId } = complicatedBtn.dataset;
        this.makeWordComplicated(wordId);
      }
    });

    const learntBtn = document.createElement('button') as HTMLButtonElement;
    learntBtn.classList.add('textbook-learnt-btn', 'btn');
    learntBtn.innerHTML = 'Изученное';
    learntBtn.setAttribute('data-word-id', id);

    buttonsContainer.append(complicatedBtn);
    buttonsContainer.append(learntBtn);
    return buttonsContainer;
  }

  public createBtnRemoveFromComplicated(wordId: IWordsData['id']): HTMLButtonElement {
    const removeBtn = document.createElement('button') as HTMLButtonElement;
    removeBtn.setAttribute('data-word-id', wordId);
    removeBtn.classList.add('btn');
    removeBtn.innerHTML = 'Удалить';

    removeBtn.addEventListener('click', () => {
      if (removeBtn.dataset.wordId) {
        const id = removeBtn.dataset.wordId;
        this.deleteWordFromComplicated(id);
      }
    });
    return removeBtn;
  }

  private deleteWordFromComplicated(wordId: IWordsData['id']): void {
    this.controllerUserWords.getUserWord(
      this.userId,
      this.userToken,
      wordId,
    )
      .then((i) => {
        this.controllerUserWords.updateUserWord(
          this.userId,
          this.userToken,
          wordId,
          {
            difficulty: 'simple',
            optional: i.optional,
          },
        );
      })
      .then(() => {
        this.drawComplicatedGroup();
      });
  }

  private makeWordComplicated(wordId: string): void {
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
                  optional: currentWord.optional,
                },
              );
            });
        }
      });
  }
}
