import { SprintController } from '../../sprintGame/components';
import { TextBookCard } from './textBookCard';
import { Pagination } from '../pagination';

export class TextbookPage {
  private controller: SprintController = new SprintController();

  private textbookCard: TextBookCard = new TextBookCard();

  private pagination: Pagination = new Pagination(30);

  private currentGroup: number = 0;

  private currentPage: number = 0;

  public drawTextbookPage() {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';

    const textbook = document.createElement('div') as HTMLElement;
    textbook.classList.add('textbook');

    const textbookContainer = document.createElement('div') as HTMLDivElement;
    textbookContainer.classList.add('textbook-container');

    const textbookCardsContainer = document.createElement('div') as HTMLDivElement;
    textbookCardsContainer.classList.add('textbook-cards-container');

    const pagination = document.createElement('div') as HTMLElement;
    pagination.classList.add('pagination');

    const paginationTextbook = document.createElement('div') as HTMLElement;
    paginationTextbook.classList.add('textbook-pagination');

    paginationTextbook.append(pagination);

    textbookContainer.append(this.createTextbookHeader());
    textbookContainer.append(paginationTextbook);
    textbookContainer.append(textbookCardsContainer);

    textbook.append(textbookContainer);
    main.append(textbook);

    this.checkCurrGroupAndPage();
    this.pagination.createPaginationButtons(this.currentPage + 1);
    this.loadInfo();

    this.changeGroups();
    this.changePages();
  }

  private checkCurrGroupAndPage(): void {
    if (localStorage.getItem('currGroup')) {
      this.currentGroup = parseInt(localStorage.getItem('currGroup')!, 10);
    }
    if (localStorage.getItem('currPage')) {
      this.currentPage = parseInt(localStorage.getItem('currPage')!, 10);
    }
  }

  private createTextbookHeader(): HTMLElement {
    const textbookHeader = document.createElement('div') as HTMLDivElement;
    textbookHeader.classList.add('textbook-header');
    textbookHeader.append(this.createPagesNavigation());
    textbookHeader.append(this.createGamesLinks());
    return textbookHeader;
  }

  private createPagesNavigation(): HTMLDivElement {
    const navigationContainer = document.createElement('div') as HTMLDivElement;
    navigationContainer.classList.add('textbook-pages');

    const numberOfPages = 7;
    let pages = '';
    for (let i = 1; i <= numberOfPages; i += 1) {
      pages += `<div class="textbook-page-btn" data-textbook="${i}">
                  <i class="far fa-bookmark"></i>
                  <div class="textbook-page-num">${i}</div>
                </div>`;
    }

    navigationContainer.innerHTML = pages;
    return navigationContainer;
  }

  private createGamesLinks(): HTMLDivElement {
    const gamesContainer = document.createElement('div') as HTMLDivElement;
    gamesContainer.classList.add('games-links-container', 'textbook-games-container');

    gamesContainer.innerHTML = `<i class="fas fa-running" data-route="sprint"></i>
                                <i class="fas fa-microphone" data-route="audiocall"></i>`;

    return gamesContainer;
  }

  private loadInfo(): void {
    console.log(this.currentPage);
    this.clearCardsContainer();
    this.controller.getWords('words', this.currentGroup, this.currentPage)
      .then((words) => {
        words.forEach((word) => {
          if (word) {
            const cardsContainer = document.querySelector('.textbook-cards-container') as HTMLDivElement;
            cardsContainer.append(this.textbookCard.createWordCard(
              word.image,
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
      });
  }

  private changeGroups(): void {
    const groupsBtns = document.querySelectorAll('.textbook-page-btn') as NodeListOf<HTMLButtonElement>;

    groupsBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.textbook) {
          this.currentGroup = parseInt(btn.dataset.textbook, 10) - 1;
          this.currentPage = 0;

          this.pagination.createPaginationButtons(1);
          this.pagination.setToLocalStorage('currPage', 0);
          this.pagination.setToLocalStorage('currGroup', this.currentGroup);

          this.loadInfo();
          this.changePages();
        }
      });
    });
  }

  private changePages(): void {
    const paginationBtns = document.querySelectorAll('.textbook-pag-btn') as NodeListOf<HTMLButtonElement>;
    let page: number;

    paginationBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        page = parseInt(btn.innerHTML, 10) - 1;

        this.currentPage = page;
        this.pagination.setToLocalStorage('currPage', page);

        this.loadInfo();
        this.changePages();
      });
    });

    const prevBtn = document.querySelector('.prev') as HTMLElement;
    prevBtn.addEventListener('click', () => {
      this.loadInfo();
      this.changePages();
    });
  }

  private clearCardsContainer(): void {
    const cardsContainer = document.querySelector('.textbook-cards-container') as HTMLDivElement;
    cardsContainer.innerHTML = '';
  }
}
