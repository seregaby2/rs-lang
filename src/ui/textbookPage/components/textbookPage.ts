import { SprintController } from '../../sprintGame/components';
import { TextBookCard } from './textBookCard';

export class TextbookPage {
  private controller: SprintController = new SprintController();

  private textbookCard: TextBookCard = new TextBookCard();

  public drawTextbookPage() {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';

    const textbookContainer = document.createElement('div') as HTMLDivElement;
    textbookContainer.classList.add('textbook-container');

    const textbookCardsContainer = document.createElement('div') as HTMLDivElement;
    textbookCardsContainer.classList.add('textbook-cards-container');

    textbookContainer.append(this.createTextbookHeader());
    textbookContainer.append(textbookCardsContainer);
    main.append(textbookContainer);
    this.loadPagesInfo();
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

  private loadPagesInfo(): void {
    const pagesBtns = document.querySelectorAll('.textbook-page-btn') as NodeListOf<HTMLButtonElement>;
    pagesBtns.forEach((btn) => btn.addEventListener('click', () => {
      let group;

      if (btn.dataset.textbook) {
        group = parseInt(btn.dataset.textbook, 10) - 1;

        this.clearCardsContainer();
        this.controller.getWords('words', group, 1)
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
    }));
  }

  private clearCardsContainer(): void {
    const cardsContainer = document.querySelector('.textbook-cards-container') as HTMLDivElement;
    cardsContainer.innerHTML = '';
  }
}
