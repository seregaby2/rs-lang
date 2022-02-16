import { MenuAside } from '../common/header/components/menuAside';
import { AuthHelper } from './authHelper';
import { TextbookPage } from '../textbookPage/components/textbookPage';
import { LocalStorageService } from '../common/services/localStorageService';

export class LogOut {
  private menuAside = new MenuAside();

  private helper: AuthHelper = new AuthHelper();

  private textbookView: TextbookPage = new TextbookPage();

  private localStorageService: LocalStorageService = new LocalStorageService();

  public drawLogOutBtn(): void {
    const menuAside = document.querySelector('.menu-aside') as HTMLElement;
    const logOutBtn = document.createElement('button');
    logOutBtn.classList.add('menu-item', 'log-out-btn');
    logOutBtn.innerHTML = `<i class="fas fa-sign-out-alt menu-icon"></i>
                    <div class="menu-text">Выход</div>`;

    logOutBtn.addEventListener('click', () => {
      logOutBtn.remove();
      this.logOut();
    });
    menuAside.append(logOutBtn);
  }

  public logOut(): void {
    const greeting = document.querySelector('.user-greeting') as HTMLButtonElement;

    this.localStorageService.clear();

    greeting.remove();

    this.helper.createAuthorizationBtn();
    this.menuAside.closeMenuAside();

    if (window.location.href === 'http://localhost:8080/#/book') {
      this.textbookView.drawTextbookPage();
    }
  }
}
