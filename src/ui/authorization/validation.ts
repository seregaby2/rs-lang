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

    signName.addEventListener('input', () => {
      const nameMatch = signName.value
        .match(/^[а-яА-Яa-zA-Z0-9_.-]*$/);

      if (nameMatch) {
        signName.classList.remove('wrong');
      } else {
        signName.classList.add('wrong');
      }
    });
  }

  private validatePassword(): void {
    const signPassword = document.querySelector('#user_pass-sign') as HTMLInputElement;
    signPassword.addEventListener('input', () => {
      const passwordMatch = signPassword.value
        .match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

      if (passwordMatch) {
        signPassword.classList.remove('wrong');
      } else {
        signPassword.classList.add('wrong');
      }
    });
  }

  private validateEmail(): void {
    const email = document.querySelector('#user_email') as HTMLInputElement;
    email.addEventListener('input', () => {
      const emailMatch = email.value
        .match(
          /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );

      if (emailMatch) {
        email.classList.remove('wrong');
      } else {
        email.classList.add('wrong');
      }
    });
  }
}
