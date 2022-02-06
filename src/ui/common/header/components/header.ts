export class HeaderView {
  public drawHeader(): void {
    const wrapper = document.querySelector('.wrapper') as HTMLBodyElement;
    const header = this.createHeaderContainer();
    const headerSideCont = document.createElement('div') as HTMLElement;
    headerSideCont.classList.add('header__side-container');
    const headerMenu = this.createBurgerMenu();
    const authorizationBtn = this.createAuthorizationBtn();
    const logo = this.createLogo();

    headerSideCont.append(authorizationBtn);
    headerSideCont.append(headerMenu);

    header.append(logo);
    header.append(headerSideCont);

    wrapper.prepend(header);
  }

  private createHeaderContainer(): HTMLElement {
    const header = document.createElement('header') as HTMLElement;
    header.classList.add('header');
    return header;
  }

  private createAuthorizationBtn(): HTMLElement {
    const authorizationBtn = document.createElement('button');
    authorizationBtn.classList.add('btn', 'authorization-btn');
    authorizationBtn.innerHTML = 'Войти';
    return authorizationBtn;
  }

  private createBurgerMenu(): HTMLElement {
    const menu = document.createElement('div');
    menu.classList.add('header-menu', 'menu-btn', 'btn');

    const menuBurger = document.createElement('div') as HTMLElement;
    menuBurger.classList.add('menu-btn__burger');

    menu.append(menuBurger);
    return menu;
  }

  private createLogo(): HTMLElement {
    const logo = document.createElement('button') as HTMLButtonElement;
    logo.classList.add('header-logo', 'logo');
    logo.innerHTML = 'RL';
    return logo;
  }
}
