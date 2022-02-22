import { CURRENT_GROUP } from '../../../common/model/localStorageKeys';
import { LocalStorageService } from '../../../common/services/localStorageService';
import { UserCardController } from '../userCardController';

export class UserCard {
  private localStorageService: LocalStorageService = new LocalStorageService();

  private levelColor: string[] = ['#F1C50EFF', '#FFBF00', '#FF9515', '#FF6A2B', '#e21818', '#e21818', '#dc146f'];

  private userCardController: UserCardController = new UserCardController();

  public drawWordAuthorisedCardBtns(wordId: string): HTMLElement {
    const buttonsContainer = document.createElement('div') as HTMLElement;
    buttonsContainer.classList.add('textbook-authorized-buttons');
    buttonsContainer.append(this.drawDifficultBtn(wordId));
    buttonsContainer.append(this.drawLearntBtn(wordId));
    return buttonsContainer;
  }

  private drawDifficultBtn(wordId: string): HTMLElement {
    const difficultBtn = document.createElement('button') as HTMLButtonElement;
    difficultBtn.classList.add('textbook-difficult-btn', 'btn');
    difficultBtn.innerHTML = 'Сложное';
    difficultBtn.setAttribute('data-difficult-btn', wordId);

    difficultBtn.addEventListener('click', () => {
      if (difficultBtn.dataset.difficultBtn) {
        this.userCardController.makeWordDifficult(wordId);

        const card = difficultBtn
          .closest('.textbook-card-container') as HTMLElement;

        card.append(this.createDifficultStar(wordId));

        const learntBtn = document
          .querySelector(`[data-learnt-btn="${wordId}"]`) as HTMLButtonElement;
        learntBtn.classList.remove('disable');

        const check = document
          .querySelector(`[data-word-id="${wordId}"] .check`) as HTMLElement;
        if (check) {
          check.remove();
        }

        const progress = document
          .querySelector(`[data-word-id="${wordId}"] .progress-container`) as HTMLElement;
        if (progress) {
          progress.remove();
        }

        this.drawProgressElement({ progress: 0, id: wordId, difficulty: 'difficult' });
        this.checkIfAllBtnsActive(false);
        this.disableBtn(difficultBtn);
      }
    });

    return difficultBtn;
  }

  private drawLearntBtn(wordId: string): HTMLElement {
    const learntBtn = document.createElement('button') as HTMLButtonElement;
    learntBtn.classList.add('textbook-learnt-btn', 'btn');
    learntBtn.innerHTML = 'Изученное';
    learntBtn.setAttribute('data-learnt-btn', wordId);

    learntBtn.addEventListener('click', () => {
      if (learntBtn.dataset.learntBtn) {
        this.userCardController.makeWordLearnt(wordId);

        const card = learntBtn
          .closest('.textbook-card-container') as HTMLElement;
        card.append(this.createLearntCheckmark(wordId));

        const difficultBtn = document
          .querySelector(`[data-difficult-btn="${wordId}"]`) as HTMLButtonElement;
        difficultBtn.classList.remove('disable');

        const star = document
          .querySelector(`[data-word-id="${wordId}"] .star`) as HTMLElement;
        if (star) {
          star.remove();
        }

        const progress = document
          .querySelector(`[data-word-id="${wordId}"] .progress-container`) as HTMLElement;
        if (progress) {
          progress.remove();
        }
        this.drawProgressElement({ progress: 3, id: wordId, difficulty: 'simple' });

        this.checkIfAllBtnsActive(false);
        this.disableBtn(learntBtn);
      }
    });

    return learntBtn;
  }

  public drawProgress(width: number): HTMLElement {
    const progressContainer = document.createElement('div') as HTMLElement;
    const progressElement = document.createElement('div') as HTMLElement;
    const progressResult = document.createElement('div') as HTMLElement;

    progressContainer.classList.add('progress-container');
    progressElement.classList.add('progress');
    progressResult.classList.add('progress-result');

    progressElement.style.width = `${width}%`;
    progressResult.innerHTML = `${width}%`;

    const group = this.localStorageService.get(CURRENT_GROUP);

    if (group) {
      const index = parseInt(group, 10);
      progressElement.style.backgroundColor = this.levelColor[index];
    }
    progressContainer.append(progressResult);
    progressContainer.append(progressElement);
    return progressContainer;
  }

  public createDifficultStar(wordId: string): HTMLElement {
    let star = document
      .querySelector(`[data-word-id="${wordId}"] .star`) as HTMLElement;
    if (star) {
      star.remove();
    } else {
      star = document.createElement('div') as HTMLElement;
      star.classList.add('star');
    }

    const group = this.localStorageService.get(CURRENT_GROUP);

    if (group) {
      const index = parseInt(group, 10);
      star
        .innerHTML = `<i class="fa fa-solid fa-star textbook-star-difficult" style="color: ${this.levelColor[index]}"></i>`;
    }
    return star;
  }

  public createLearntCheckmark(wordId: string): HTMLElement {
    let check = document
      .querySelector(`[data-word-id="${wordId}"] .check`) as HTMLElement;
    if (check) {
      check.remove();
    } else {
      check = document.createElement('div') as HTMLElement;
      check.classList.add('check');
    }

    const group = this.localStorageService.get(CURRENT_GROUP);

    if (group) {
      const index = parseInt(group, 10);
      check
        .innerHTML = `<i class="fa fa-solid fa-check textbook-learnt-check" style="color: ${this.levelColor[index]}"></i>`;
    }
    return check;
  }

  public disableBtn(btn: HTMLElement): void {
    btn.classList.add('disable');
  }

  public addLearntWordsStyle(learntWordId: string): void {
    const card = document
      .querySelector(`[data-word-id="${learntWordId}"]`) as HTMLElement;
    card.append(this.createLearntCheckmark(learntWordId));
    const btn = document
      .querySelector(`[data-learnt-btn="${learntWordId}"]`) as HTMLElement;
    this.disableBtn(btn);
  }

  public addDifficultWordsStyle(difficultWordId: string): void {
    const card = document
      .querySelector(`[data-word-id="${difficultWordId}"]`) as HTMLElement;
    card.append(this.createDifficultStar(difficultWordId));

    const btn = document
      .querySelector(`[data-difficult-btn="${difficultWordId}"]`) as HTMLElement;
    this.disableBtn(btn);
  }

  public drawProgressElement(progressInfo: {
    progress: number,
    id: string,
    difficulty: string,
  }): void {
    const card = document
      .querySelector(`[data-word-id="${progressInfo.id}"] .textbook-card-text`) as HTMLElement;
    const learntSimple = 3;
    const learntDifficult = 5;
    let width: number;
    if (progressInfo.difficulty === 'simple') {
      width = Math.ceil((100 * progressInfo.progress) / learntSimple);
    } else {
      width = Math.ceil((100 * progressInfo.progress) / learntDifficult);
    }
    card.append(this.drawProgress(width));
  }

  public checkIfAllBtnsActive(onload: boolean): void {
    const amountOfCards = 20;
    let count = 0;
    if (onload) {
      count = 0;
    } else {
      count = 1;
    }
    const main = document
      .querySelector('.main') as HTMLElement;

    const paginationBtn = document
      .querySelector('.textbook-pag-btn.active') as HTMLElement;

    const difficultBtn = document
      .querySelectorAll('.textbook-difficult-btn.disable') as NodeListOf<HTMLButtonElement>;

    const learntBtn = document
      .querySelectorAll('.textbook-learnt-btn.disable') as NodeListOf<HTMLButtonElement>;

    const gamesButtons = document
      .querySelectorAll('.games-links-container i') as NodeListOf<HTMLButtonElement>;

    count = count + difficultBtn.length + learntBtn.length;
    if (count === amountOfCards) {
      main.style.backgroundColor = 'rgba(0,0,0, 0.1)';

      paginationBtn.style.background = this
        .levelColor[parseInt(this.localStorageService.get(CURRENT_GROUP), 10)];

      gamesButtons.forEach((btn) => {
        const button = btn;
        btn.classList.add('disable');
        button.style.opacity = '0.5';
      });
    } else {
      main.style.backgroundColor = 'rgba(255,255,255)';
      gamesButtons.forEach((btn) => {
        const button = btn;
        btn.classList.remove('disable');
        button.style.opacity = '1';
      });
    }
  }
}
