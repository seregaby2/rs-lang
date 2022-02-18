import {
  ApiMethod, JWTToken, User, UserDto,
} from './models';
import { AuthHelper } from './authHelper';
import { Controller } from './controller';
import { LogOut } from './logOut';
import { TextbookPage } from '../textbookPage/components/textbookPage';
import { LocalStorageService } from '../common/services/localStorageService';
import { USER_ACCESS_TOKEN, USER_ID } from '../common/model/localStorageKeys';

export class Authorization extends Controller {
  private localStorageService: LocalStorageService = new LocalStorageService();

  private helper: AuthHelper = new AuthHelper();

  private logOut: LogOut = new LogOut();

  private textbookView: TextbookPage = new TextbookPage();

  constructor() {
    super('users');
  }

  public signIn(data: User): Promise<JWTToken> {
    return fetch('https://rs-lang-2022.herokuapp.com/signin', {
      method: ApiMethod.Post,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json());
  }

  public checkIfAuthorized(): void {
    const id = this.localStorageService.get(USER_ID);
    const token = this.localStorageService.get(USER_ACCESS_TOKEN);

    if (id && token) {
      this.helper.removeLogInBtn();
      this.getUser(token, id)
        .then((user) => {
          this.helper.drawGreeting(user.name);
          this.logOut.drawLogOutBtn();
        })
        .catch((err) => {
          if (err) {
            this.localStorageService.clear();
            this.logOut.logOut();
          }
        });
    }
  }

  public logIn(): void {
    const logInBtn = document.querySelector('.login-btn') as HTMLElement;
    const inputPassword = document.querySelector('.input-login-password') as HTMLInputElement;
    const inputEmail = document.querySelector('.input-login-email') as HTMLInputElement;

    logInBtn.addEventListener('click', (event) => {
      event.preventDefault();

      const userInfo: User = {
        email: inputEmail.value,
        password: inputPassword.value,
      };

      this.signIn({
        email: userInfo.email,
        password: userInfo.password,
      })
        .then((tokenInfo) => {
          if (tokenInfo) {
            this.helper.saveUserInfoInLocalStorage(tokenInfo);
            this.helper.closeAuthorizationForm();
          }

          if (window.location.href === 'http://localhost:8080/#/book') {
            this.textbookView.drawTextbookPage();
          }
          window.location.reload();
        })
        .catch((error) => {
          if (error) {
            this.helper.showAuthHint('#login-tab-content .error');
          }
        });
    });
  }

  private getUser(token: string, id: string): Promise<UserDto> {
    return this.get(token, id);
  }
}
