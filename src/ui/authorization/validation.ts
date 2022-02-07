export class Validation {
  public validateForm(): void {
    const signUpBtn = document.querySelector('.sign-up-btn') as HTMLElement;

    signUpBtn.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this.validateUserName();
    this.validatePassword();
    this.validateEmail();
  }

  private validateUserName(): void {
    const signName = document.querySelector('#user_name') as HTMLInputElement;
    const signNameHint = document.querySelector('.sign-up-username-hint') as HTMLDivElement;
    signName.addEventListener('input', () => {
      const nameMatch = signName.value
        .match(/^[а-яА-Яa-zA-Z0-9]*$/);

      if (nameMatch || !signName.value) {
        signName.classList.remove('wrong');
        signNameHint.classList.remove('visible');
      } else {
        signName.classList.add('wrong');
        signNameHint.classList.add('visible');
      }
    });
  }

  private validatePassword(): void {
    const signPassword = document.querySelector('#user_pass-sign') as HTMLInputElement;
    const signPasswordHint = document.querySelector('.sign-up-password-hint') as HTMLDivElement;
    signPassword.addEventListener('input', () => {
      const passwordMatch = signPassword.value
        .match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

      if (passwordMatch || !signPassword.value) {
        signPassword.classList.remove('wrong');
        signPasswordHint.classList.remove('visible');
      } else {
        signPassword.classList.add('wrong');
        signPasswordHint.classList.add('visible');
      }
    });
  }

  private validateEmail(): void {
    const email = document.querySelector('#user_email') as HTMLInputElement;
    const signEmailHint = document.querySelector('.sign-up-email-hint') as HTMLDivElement;
    email.addEventListener('input', () => {
      const emailMatch = email.value
        .match(
          /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );

      if (emailMatch || !email.value) {
        email.classList.remove('wrong');
        signEmailHint.classList.remove('visible');
      } else {
        email.classList.add('wrong');
        signEmailHint.classList.add('visible');
      }
    });
  }
}
