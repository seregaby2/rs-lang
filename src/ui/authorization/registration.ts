import { Controller } from './controller';
import { UserDto } from './models';
import { Authorization } from './authorization';
import { AuthHelper } from './authHelper';
import { TextbookPage } from '../textbookPage/components/textbookPage';

export class Registration extends Controller {
  private signIn: Authorization = new Authorization();

  private helper: AuthHelper = new AuthHelper();

  private textbookView: TextbookPage = new TextbookPage();

  constructor() {
    super('users');
  }

  private createUser(data: UserDto): Promise<UserDto> {
    return this.post(JSON.stringify(data));
  }

  public register(): void {
    const btnSignUp = document.querySelector('.sign-up-btn') as HTMLInputElement;
    const inputEmail = document.querySelector('.input-email') as HTMLInputElement;
    const inputPassword = document.querySelector('.input-password') as HTMLInputElement;
    const inputUserName = document.querySelector('.input-user-name') as HTMLInputElement;

    btnSignUp.addEventListener('click', (event) => {
      event.preventDefault();
      if (inputEmail.classList.contains('wrong')
        || inputPassword.classList.contains('wrong')
        || inputUserName.classList.contains('wrong')) {
        return;
      }
      const userInfo: UserDto = {
        email: inputEmail.value,
        password: inputPassword.value,
        name: inputUserName.value,
      };

      this.createUser(userInfo)
        .then(() => {
          this.signIn.signIn({
            email: userInfo.email,
            password: userInfo.password,
          })
            .then((tokenInfo) => {
              this.helper.saveUserInfoInLocalStorage(tokenInfo);
              this.helper.closeAuthorizationForm();
              window.location.reload();

              if (window.location.href === 'http://localhost:8080/#/book') {
                this.textbookView.drawTextbookPage();
              }
            });
        })
        .catch((error) => {
          if (error) {
            this.helper.showAuthHint('.user-exists-hint');
          }
        });
    });
  }
}
