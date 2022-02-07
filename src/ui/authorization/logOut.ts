import { MenuAside } from '../common/header/components/menuAside';

export class LogOut {
  private menuAside = new MenuAside();

  public drawLogOutBtn(): void {
    const menuAside = document.querySelector('.menu-aside') as HTMLElement;
    const logOutBtn = document.createElement('button');
    logOutBtn.classList.add('menu-item', 'log-out-btn');
    logOutBtn.innerHTML = `<i class="fas fa-sign-out-alt menu-icon"></i>
                    <div class="menu-text">Выход</div>`;
    menuAside.append(logOutBtn);
    this.logOut();
  }

  public logOut(): void {
    const logOutBtn = document.querySelector('.log-out-btn') as HTMLButtonElement;
    logOutBtn.addEventListener('click', () => {
      const headerSideContainer = document.querySelector('.header-side-container') as HTMLDivElement;
      const greeting = document.querySelector('.user-greeting') as HTMLButtonElement;
      const logInBtn = document.createElement('button') as HTMLButtonElement;
      logInBtn.innerHTML = '<button class="btn authorization-btn">Войти</button>';

      localStorage.clear();

      logOutBtn.remove();
      greeting.remove();
      headerSideContainer.prepend(logInBtn);

      this.menuAside.closeMenuAside();
    });
  }
}
