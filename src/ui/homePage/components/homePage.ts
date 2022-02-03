export class HomePage {
  drawPage(): void {
    const body = document.querySelector('body') as HTMLElement;

    const wrapper = document.createElement('div') as HTMLElement;
    wrapper.classList.add('wrapper');

    const main = document.createElement('main') as HTMLElement;
    main.classList.add('main');

    const homePageBackground = document.createElement('div') as HTMLElement;
    homePageBackground.classList.add('home-page-bg', 'wrapper-main-content');

    const mainContent = document.createElement('div') as HTMLElement;
    mainContent.classList.add('main-content');

    homePageBackground.append(mainContent);
    mainContent.append(this.createMainHeading());
    mainContent.append(this.createOpportunityCards());
    main.append(homePageBackground);
    wrapper.append(main);
    body.append(wrapper);
  }

  private createMainHeading(): HTMLElement {
    const mainHeading = document.createElement('h1') as HTMLHeadingElement;
    mainHeading.innerHTML = 'RS Lang';
    mainHeading.classList.add('rs-lang');
    return mainHeading;
  }

  private createOpportunityCards(): HTMLElement {
    const cardsOpportunityContainer = document.createElement('div') as HTMLElement;
    cardsOpportunityContainer.classList.add('opportunity-container');
    const cards = [
      { text: 'Изучай', img: 'learn' },
      { text: 'Играй', img: 'play' },
      { text: 'Развивайся', img: 'progress' },
    ];

    cards.forEach((item) => {
      const card = document.createElement('div') as HTMLElement;
      card.classList.add('opportunity-card');

      const cardImg = document.createElement('div') as HTMLElement;
      cardImg.classList.add('opportunity-img', `opportunity-${item.img}`);
      const cardText = document.createElement('h3') as HTMLElement;
      cardText.innerHTML = `${item.text}`;

      card.append(cardImg, cardText);
      cardsOpportunityContainer.append(card);
    });

    return cardsOpportunityContainer;
  }
}
