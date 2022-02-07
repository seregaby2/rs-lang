import { JWTToken, UserDto } from './models';

export class AuthHelper {
  public saveUserInfoInLocalStorage(userInfo: JWTToken) {
    localStorage.setItem('user_id', `${userInfo.userId}`);
    localStorage.setItem('user_access_token', `${userInfo.token}`);
  }

  public drawGreeting(name: UserDto['name']): void {
    const container = document.querySelector('.header-side-container') as HTMLElement;
    const userName = document.createElement('div') as HTMLElement;
    userName.innerHTML = `Привет, ${name}`;
    userName.classList.add('user-greeting');
    container.prepend(userName);
  }

  public removeLogInBtn(): void {
    const btn = document.querySelector('.authorization-btn') as HTMLElement;
    btn.remove();
  }

  public createAuthorizationBtn(): void {
    const headerSideCont = document.querySelector('.header-side-container') as HTMLDivElement;
    const authorizationBtn = document.createElement('button');
    authorizationBtn.classList.add('btn', 'authorization-btn');
    authorizationBtn.innerHTML = 'Войти';
    headerSideCont.prepend(authorizationBtn);
    this.toggleAuthorizationForm();
  }

  private toggleAuthorizationForm(): void {
    const body = document.querySelector('body') as HTMLBodyElement;
    const authorizationBtn = document.querySelector('.authorization-btn') as HTMLElement;
    const overlay = document.createElement('div') as HTMLElement;
    overlay.classList.add('overlay');

    authorizationBtn.addEventListener('click', () => {
      this.openAuthorizationForm();
      body.append(overlay);
    });

    overlay.addEventListener('click', () => {
      this.closeAuthorizationForm();
    });
  }

  public closeAuthorizationForm(): void {
    const modal = document.querySelector('.form-wrap') as HTMLElement;
    const overlay = document.querySelector('.overlay') as HTMLElement;
    modal.style.top = '-50%';
    overlay.remove();
  }

  public openAuthorizationForm(): void {
    const modal = document.querySelector('.form-wrap') as HTMLElement;
    modal.style.top = '50%';
  }

  public showAuthHint(elementClass: string): void {
    const hint = document.querySelector(`${elementClass}`) as HTMLElement;
    hint.classList.add('visible');
  }

  public hideAuthHint(elementClass: string): void {
    const body = document.querySelector('body') as HTMLBodyElement;
    const hint = document.querySelector(`${elementClass}`) as HTMLElement;
    body.addEventListener('click', () => {
      if (hint.classList.contains('visible')) {
        hint.classList.remove('visible');
      }
    });
  }
}
