import { ControllerUserWords } from '../../common/controller/controllerUserWords';

export class UserCard {
  private controllerUserWords: ControllerUserWords = new ControllerUserWords();

  private userId = localStorage.getItem('user_id') || '';

  private userToken = localStorage.getItem('user_access_token') || '';

  private levelColor: string[] = ['#F1C50EFF', '#FFBF00', '#FF9515', '#FF6A2B', '#e21818', '#e21818', '#dc146f'];

  public drawWordAuthorisedCardBtns(id: string): HTMLElement {
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
        card.append(this.drawDifficultStar());

        this.disableDifficultBtn(complicatedBtn);
      }
    });

    const learntBtn = document.createElement('button') as HTMLButtonElement;
    learntBtn.classList.add('textbook-learnt-btn', 'btn');
    learntBtn.innerHTML = 'Изученное';
    learntBtn.setAttribute('data-learnt-btn', id);

    buttonsContainer.append(complicatedBtn);
    buttonsContainer.append(learntBtn);
    return buttonsContainer;
  }

  public drawDifficultStar(): HTMLElement {
    const star = document.createElement('div') as HTMLElement;
    const group = localStorage.getItem('currGroup');

    if (group) {
      const index = parseInt(group, 10);
      star
        .innerHTML = `<i class="fa fa-solid fa-star textbook-star-difficult" style="color: ${this.levelColor[index]}"></i>`;
    }
    return star;
  }

  public disableDifficultBtn(btn: HTMLElement): void {
    btn.classList.add('disable');
  }

  private makeWordDifficult(wordId: string): void {
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
