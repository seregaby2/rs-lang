import { TextBookCard } from './card/textBookCard';
import { Pagination } from '../pagination';
import { CardAudio } from './card/cardAudio';
import { CardStyles } from './card/cardStyles';
import { ControllerWords } from '../../common/controller/controllerWords';
import { AuthorizedCard } from './card/authorizedCard';

export class TextbookPage {
  private controller: ControllerWords = new ControllerWords();

  private textbookCard: TextBookCard = new TextBookCard();

  private textbookAuthCard: AuthorizedCard = new AuthorizedCard();

  private pagination: Pagination = new Pagination(30);

  private audio: CardAudio = new CardAudio();

  private style: CardStyles = new CardStyles();

  private currentGroup: number = 0;

  private currentPage: number = 0;

  private numberOfGroups: number = 6;

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

    this.addClassForSprint();
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

  private loadInfo(): void {
    this.controller.getWords(this.currentGroup, this.currentPage)
      .then((words) => {
        this.clearCardsContainer();
        words.forEach((word, index) => {
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
            if (localStorage.getItem('user_id') && localStorage.getItem('user_access_token')) {
              const cardTextContainer = document
                .querySelectorAll('.textbook-card-text') as NodeListOf<HTMLDivElement>;
              cardTextContainer[index]
                .append(this.textbookAuthCard.createWordAuthorisedCard(word.id));
            }
          }
        });
        this.audio.playCardAudio(this.currentGroup, this.currentPage);
        this.style.changeStyles(this.currentGroup);
      });
  }

  private changeGroups(): void {
    const groupsBtns = document.querySelectorAll('.textbook-page-btn') as NodeListOf<HTMLButtonElement>;

    groupsBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        groupsBtns.forEach((item) => {
          item.classList.remove('active');
        });

        if (btn.dataset.textbook === '7') {
          this.textbookAuthCard.drawComplicatedGroup();
        }

        if (btn.dataset.textbook) {
          this.currentGroup = parseInt(btn.dataset.textbook, 10) - 1;
          this.currentPage = 0;

          this.style.makeBookmarkActive(this.currentGroup);

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
      if (localStorage.getItem('currPage')) {
        const pageLocalS = localStorage.getItem('currPage');
        if (pageLocalS) {
          const currPage = parseInt(pageLocalS, 10) - 1;
          this.currentPage = currPage;
          this.pagination.setToLocalStorage('currPage', currPage);
        }
      }
      this.loadInfo();
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
        this.loadInfo();
        this.changePages();
      });
    }
  }

  private clearCardsContainer(): void {
    const cardsContainer = document.querySelector('.textbook-cards-container') as HTMLDivElement;
    cardsContainer.innerHTML = '';
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
}
