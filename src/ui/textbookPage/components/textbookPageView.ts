import { Pagination } from '../pagination';
import { CardStyles } from '../card/cardStyles';
import { TextbookPageDisplay } from '../textbookPageDisplay';
import { hidePagination } from '../textbookHelper';
import { DifficultGroup } from '../difficultGroup/difficultGroup';

export class TextbookPageView {
  private pagination: Pagination = new Pagination(30);

  private textbookDisplay = new TextbookPageDisplay();

  private difficultGroup: DifficultGroup = new DifficultGroup();

  private style: CardStyles = new CardStyles();

  private currentGroup: number = 0;

  private currentPage: number = 0;

  private numberOfGroups: number = 6;

  public drawTextbookPage() {
    this.createTextbookPageTemplate();

    this.checkCurrGroupAndPage();

    this.pagination
      .createPaginationButtons(this.currentPage + 1);

    if (localStorage.getItem('currGroup') === '6') {
      this.difficultGroup.drawDifficultGroup();
    } else {
      this.textbookDisplay.toggleCards(this.currentGroup, this.currentPage);
    }

    this.changeGroups();
    this.changePages();

    this.addClassForSprint();
  }

  private createTextbookPageTemplate() {
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
  }

  private checkCurrGroupAndPage(): void {
    if (localStorage.getItem('currGroup')) {
      const group = localStorage.getItem('currGroup');
      if (group) {
        this.currentGroup = parseInt(group, 10);
        this.style.makeBookmarkActive(this.currentGroup);
      }
    } else {
      this.pagination.setToLocalStorage('currGroup', 0);
    }
    if (localStorage.getItem('currPage')) {
      const page = localStorage.getItem('currPage');
      if (page) {
        this.currentPage = parseInt(page, 10);
      }
    } else {
      this.pagination.setToLocalStorage('currPage', 0);
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

    if (localStorage.getItem('user_id')) {
      this.numberOfGroups = 7;
    }

    let pages = '';
    for (let i = 1; i <= this.numberOfGroups; i += 1) {
      pages += `<div class="textbook-page-btn" data-textbook="${i}">
                  <i class="fas fa-bookmark"></i>
                  <div class="textbook-page-num">${i}</div>
                </div>`;
    }

    navigationContainer.innerHTML = pages;
    return navigationContainer;
  }

  private createGamesLinks(): HTMLDivElement {
    const gamesContainer = document.createElement('div') as HTMLDivElement;
    gamesContainer.classList.add('games-links-container', 'textbook-games-container');

    gamesContainer.innerHTML = `<i class="fas fa-running" data-route="sprint-textbook"></i>
                                <i class="fas fa-microphone" data-route="audiocall-textbook"></i>`;

    return gamesContainer;
  }

  private addClassForSprint() {
    const iconStartGameFromBookPage = document.querySelector('.fa-running') as HTMLElement;
    const iconStartGameFromMainPage = document.querySelector('.sprint') as HTMLElement;
    const header = document.querySelector('.header');
    if (header) {
      iconStartGameFromBookPage.addEventListener('click', () => {
        header.classList.add('sprint-game');
      });
      iconStartGameFromMainPage.addEventListener('click', () => {
        header.classList.remove('sprint-game');
      });
    }
  }

  private changeGroups(): void {
    const groupsBtns = document.querySelectorAll('.textbook-page-btn') as NodeListOf<HTMLButtonElement>;

    groupsBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        groupsBtns.forEach((item) => {
          item.classList.remove('active');
        });

        if (btn.dataset.textbook) {
          if (btn.dataset.textbook === '7') {
            this.difficultGroup.drawDifficultGroup();
            this.currentGroup = 6;
          } else {
            this.currentGroup = parseInt(btn.dataset.textbook, 10) - 1;
            this.currentPage = 0;

            this.pagination.createPaginationButtons(1);
            this.pagination.setToLocalStorage('currPage', 0);
            this.textbookDisplay.toggleCards(this.currentGroup, this.currentPage);
            this.changePages();

            hidePagination(false);
          }
          this.style.makeBookmarkActive(this.currentGroup);
          this.pagination.setToLocalStorage('currGroup', this.currentGroup);
        }
      });
    });
  }

  private changePages(): void {
    const paginationBtns = document
      .querySelectorAll('.textbook-pag-btn') as NodeListOf<HTMLButtonElement>;
    let page: number;

    paginationBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        page = parseInt(btn.innerHTML, 10) - 1;
        this.currentPage = page;
        this.pagination.setToLocalStorage('currPage', page);

        this.textbookDisplay.toggleCards(this.currentGroup, this.currentPage);
        this.changePages();
      });
    });

    const prevBtn = document.querySelector('.prev') as HTMLElement;
    prevBtn.addEventListener('click', () => {
      if (localStorage.getItem('currPage')) {
        const pageLocalS = localStorage.getItem('currPage');
        if (pageLocalS) {
          const currPage = parseInt(pageLocalS, 10) - 1;
          this.currentPage = currPage;
          this.pagination.setToLocalStorage('currPage', currPage);
        }
      }

      this.textbookDisplay.toggleCards(this.currentGroup, this.currentPage);
      this.changePages();
    });

    const nextBtn = document.querySelector('.next') as HTMLElement;
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (localStorage.getItem('currPage')) {
          if (localStorage.getItem('currPage')) {
            const pageLocalS = localStorage.getItem('currPage');
            if (pageLocalS) {
              const currPage = parseInt(pageLocalS, 10) - 1;
              this.currentPage = currPage;
              this.pagination.setToLocalStorage('currPage', currPage);
            }
          }
        }

        this.textbookDisplay.toggleCards(this.currentGroup, this.currentPage);
        this.changePages();
      });
    }
  }
}
