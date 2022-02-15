import { MenuAside } from '../common/header/components/menuAside';
import { AuthHelper } from './authHelper';
import { TextbookPageView } from '../textbookPage/components/textbookPageView';

export class LogOut {
  private menuAside = new MenuAside();

  private helper: AuthHelper = new AuthHelper();

  private textbookView: TextbookPageView = new TextbookPageView();

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
      const greeting = document.querySelector('.user-greeting') as HTMLButtonElement;
      localStorage.clear();
      logOutBtn.remove();
      greeting.remove();
      this.helper.createAuthorizationBtn();
      this.menuAside.closeMenuAside();

      if (window.location.href === 'http://localhost:8080/#/book') {
        this.textbookView.drawTextbookPage();
      }
    });
  }
}
