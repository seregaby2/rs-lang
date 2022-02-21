import { LocalStorageService } from '../common/services/localStorageService';

export class LogOut {
  private localStorageService: LocalStorageService = new LocalStorageService();

  public drawLogOutBtn(): void {
    const menuAside = document.querySelector('.menu-aside') as HTMLElement;
    const logOutBtn = document.createElement('button');
    logOutBtn.classList.add('menu-item', 'log-out-btn');
    logOutBtn.innerHTML = `<i class="fas fa-sign-out-alt menu-icon"></i>
                    <div class="menu-text">Выход</div>`;

    logOutBtn.addEventListener('click', () => {
      this.logOut();
    });
    menuAside.append(logOutBtn);
  }

  public logOut(): void {
    this.localStorageService.clear();

    window.location.replace(window.location.href);
  }
}
