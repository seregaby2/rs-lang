import { Validation } from '../validation';
import { Registration } from '../registration';
import { AuthHelper } from '../authHelper';
import { Authorization } from '../authorization';

export class AuthorizationView {
  private validation: Validation = new Validation();

  private registration: Registration = new Registration();

  private helper: AuthHelper = new AuthHelper();

  private authorization: Authorization = new Authorization();

  public drawAuthorization(): void {
    this.createAuthorizationBtn();
    this.createAuthorizationForm();
    this.toggleAuthorizationMode();
    this.validation.validateForm();
    this.registration.register();
    this.authorization.logIn();
    this.authorization.checkIfAuthorized();
  }

  public createAuthorizationBtn(): void {
    const headerSideCont = document.querySelector('.header-side-container') as HTMLDivElement;
    const authorizationBtn = document.createElement('button');
    authorizationBtn.classList.add('btn', 'authorization-btn');
    authorizationBtn.innerHTML = 'Войти';
    headerSideCont.prepend(authorizationBtn);
    this.toggleAuthorizationForm();
  }

  private createAuthorizationForm(): void {
    const main = document.querySelector('.wrapper') as HTMLDivElement;
    const formWrap = document.createElement('div') as HTMLElement;
    formWrap.classList.add('form-wrap');
    formWrap.innerHTML = `
    <div class="tabs">
        <h3 class="signup-tab">
            <a class="active" href="#">Регистрация</a>
        </h3>
        <h3 class="login-tab">
            <a href="#">Вход</a>
        </h3>
    </div>
    <div class="tabs-content">
         <div id="signup-tab-content" class="active">
         <form class="signup-form" action="" method="">
             <input type="email" class="input input-email" id="user_email" autocomplete="off" placeholder="Email">
             <input type="text" class="input input-user-name" id="user_name" autocomplete="off" placeholder="Имя">
             <input type="password" class="input input-password" id="user_pass-sign" autocomplete="off" placeholder="Пароль">
             <input type="submit" class="button sign-up-btn" value="Регистрация">
         </form>
         <div class="help-text"></div>
    </div>
    <div id="login-tab-content">
         <form class="login-form" action="" method="">
             <input type="text" class="input input-login-email" id="user_login" autocomplete="off" placeholder="Email">
             <input type="password" class="input input-login-password" id="user_pass-login" autocomplete="off" placeholder="Пароль">
             <input type="submit" class="button login-btn" value="Вход">
         </form>
    </div>
    </div>
    </div> `;
    main.append(formWrap);
  }

  private toggleAuthorizationMode(): void {
    const tabs = document.querySelectorAll('.tabs h3 a') as NodeListOf<HTMLElement>;
    const signUP = document.querySelector('#signup-tab-content') as HTMLElement;
    const logIn = document.querySelector('#login-tab-content') as HTMLElement;
    tabs.forEach((tab) => {
      tab.addEventListener('click', (event) => {
        [signUP, logIn, ...tabs].forEach((item) => item.classList.remove('active'));
        tab.classList.toggle('active');

        const currTab = event.target as HTMLElement;
        if (currTab.closest('.login-tab')) {
          logIn.classList.add('active');
        } else {
          signUP.classList.add('active');
        }
      });
    });
  }

  private toggleAuthorizationForm(): void {
    const body = document.querySelector('body') as HTMLBodyElement;
    const authorizationBtn = document.querySelector('.authorization-btn') as HTMLElement;
    const overlay = document.createElement('a') as HTMLElement;
    overlay.classList.add('overlay');

    authorizationBtn.addEventListener('click', () => {
      this.helper.openAuthorizationForm();
      body.append(overlay);
    });

    overlay.addEventListener('click', () => {
      this.helper.closeAuthorizationForm();
    });
  }
}
