import { JWTToken, UserDto } from './models';

export class AuthHelper {
  public saveUserInfoInLocalStorage(userInfo: JWTToken) {
    localStorage.setItem('user_id', `${userInfo.userId}`);
    localStorage.setItem('user_access_token', `${userInfo.token}`);
  }

  public drawGreeting(name: UserDto['name']): void {
    const container = document.querySelector('.header__side-container') as HTMLElement;
    const userName = document.createElement('div') as HTMLElement;
    userName.innerHTML = `Привет, ${name}`;
    userName.classList.add('user-greeting');
    container.prepend(userName);
  }

  public removeLogInBtn(): void {
    const btn = document.querySelector('.authorization-btn') as HTMLElement;
    btn.remove();
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
}
