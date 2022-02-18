export class HomePage {
  drawHomePage(): void {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';

    const homePageBackground = document.createElement('div') as HTMLElement;
    homePageBackground.classList.add('home-page-bg', 'wrapper-main-content');

    const mainContent = document.createElement('div') as HTMLElement;
    mainContent.classList.add('main-content');

    homePageBackground.append(mainContent);
    mainContent.append(this.createMainHeading());
    mainContent.append(this.createOpportunityCards());
    main.append(homePageBackground);
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
      { text: 'Изучай', img: 'learn', route: 'book' },
      { text: 'Играй', img: 'play', route: 'audiocall' },
      { text: 'Развивайся', img: 'progress', route: 'sprint' },
    ];

    cards.forEach((item) => {
      const card = document.createElement('div') as HTMLElement;
      card.classList.add('opportunity-card');
      card.setAttribute('data-route', `${item.route}`);

      const cardImg = document.createElement('div') as HTMLElement;
      cardImg.classList.add('opportunity-img', `opportunity-${item.img}`);
      cardImg.setAttribute('data-route', `${item.route}`);
      const cardText = document.createElement('h3') as HTMLElement;
      cardText.innerHTML = `${item.text}`;

      card.append(cardImg, cardText);
      cardsOpportunityContainer.append(card);
    });

    return cardsOpportunityContainer;
  }
}
