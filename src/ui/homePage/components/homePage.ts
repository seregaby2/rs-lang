export class HomePage {
  public drawHomePage(): void {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';

    const homePageBackground = document.createElement('div') as HTMLElement;
    homePageBackground.classList.add('home-page-bg', 'wrapper-main-content');

    const mainContent = document.createElement('div') as HTMLElement;
    mainContent.classList.add('main-content');

    homePageBackground.append(mainContent);
    mainContent.append(this.createMainHeading());
    main.append(homePageBackground);
  }

  private createMainHeading(): HTMLElement {
    const mainHeading = document.createElement('h1') as HTMLHeadingElement;
    mainHeading.innerHTML = 'RS Lang';
    mainHeading.classList.add('rs-lang');
    return mainHeading;
  }
}
