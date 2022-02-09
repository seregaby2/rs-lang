import { SprintController } from '../../sprintGame/components';
import { TextBookCard } from './textBookCard';
import { Pagination } from '../pagination';

export class TextbookPage {
  private controller: SprintController = new SprintController();

  private textbookCard: TextBookCard = new TextBookCard();

  private pagination: Pagination = new Pagination(30);

  private currentGroup: number = 0;

  public drawTextbookPage() {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';

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

    main.append(textbookContainer);
    this.loadInfo(1);
    this.pagination.createPaginationButtons(30);
    this.changeGroups();
    this.changePages();
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

  private loadInfo(page: number): void {
    this.clearCardsContainer();
    this.controller.getWords('words', this.currentGroup, page)
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
          this.loadInfo(1);
        }
      });
    });
  }

  private changePages(): void {
    const paginationBtns = document.querySelectorAll('.textbook-pag-btn') as NodeListOf<HTMLButtonElement>;
    paginationBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.innerHTML, 10) - 1;
        this.loadInfo(page);
        this.changePages();
      });
    });
  }

  private clearCardsContainer(): void {
    const cardsContainer = document.querySelector('.textbook-cards-container') as HTMLDivElement;
    cardsContainer.innerHTML = '';
  }
}
