import { Validation } from '../validation';
import { Registration } from '../registration';
import { AuthHelper } from '../authHelper';
import { Authorization } from '../authorization';

export class AuthorizationForm {
  private validation: Validation = new Validation();

  private registration: Registration = new Registration();

  private helper: AuthHelper = new AuthHelper();

  private authorization: Authorization = new Authorization();

  public drawAuthorization(): void {
    console.log('gi');
    this.helper.createAuthorizationBtn();
    this.createAuthorizationForm();
    this.toggleAuthorizationMode();
    this.validation.validateForm();
    this.registration.register();
    this.authorization.logIn();
    this.authorization.checkIfAuthorized();
    this.helper.hideAuthHint('#login-tab-content .error');
    this.helper.hideAuthHint('.user-exists-hint');
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
            <div class="sign-up-email">
                <div class="sign-up-hint sign-up-email-hint">Email должен быть вида rslang@gmail.com</div>
                <input type="email" class="input input-email" id="user_email" autocomplete="off" placeholder="Email">
            </div>
            <div class="sign-up-username">
                <div class="sign-up-hint sign-up-username-hint">Имя может содержать только цифры и буквы</div>
                <input type="text" class="input input-user-name" id="user_name" autocomplete="off" placeholder="Имя">
            </div>
            <div class="sign-up-password">
                <div class="sign-up-hint sign-up-password-hint">Пароль должен состоять минимум из 8 символов и содержать цифры и буквы</div>
                <input type="password" class="input input-password" id="user_pass-sign" autocomplete="off" placeholder="Пароль">
            </div>
            <input type="submit" class="button sign-up-btn" value="Регистрация">
            <div class="user-exists-hint">Пользователь с таким email уже существует</div>
         </form>
    </div>
    <div id="login-tab-content">
         <form class="login-form" action="" method="">
             <input type="text" class="input input-login-email" id="user_login" autocomplete="off" placeholder="Email">
             <input type="password" class="input input-login-password" id="user_pass-login" autocomplete="off" placeholder="Пароль">
             <input type="submit" class="button login-btn" value="Вход">
             <div class="error">Неправильный email или пароль</div>
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
}
