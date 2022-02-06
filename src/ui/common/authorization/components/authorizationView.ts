export class AuthorizationView {
  public drawAuthorization(): void {
    const main = document.querySelector('.wrapper') as HTMLDivElement;
    const formWrap = document.createElement('div') as HTMLElement;
    formWrap.classList.add('form-wrap');
    formWrap.innerHTML = `
    <div class="tabs">
        <h3 class="signup-tab">
            <a class="active" href="#">Sign Up</a>
        </h3>
        <h3 class="login-tab">
            <a href="#">Login</a>
        </h3>
    </div>
    <div class="tabs-content">
         <div id="signup-tab-content" class="active">
         <form class="signup-form" action="" method="">
             <input type="email" class="input input-email" id="user_email" autocomplete="off" placeholder="Email">
             <input type="text" class="input" id="user_name" autocomplete="off" placeholder="Username">
             <input type="password" class="input" id="user_pass-sign" autocomplete="off" placeholder="Password">
             <input type="submit" class="button sign-up-btn" value="Sign Up">
         </form>
         <div class="help-text"></div>
    </div>
    <div id="login-tab-content">
         <form class="login-form" action="" method="">
             <input type="text" class="input" id="user_login" autocomplete="off" placeholder="Email or Username">
             <input type="password" class="input" id="user_pass-login" autocomplete="off" placeholder="Password">
             <input type="checkbox" class="checkbox" id="remember_me">
             <label for="remember_me">Remember me</label>
             <input type="submit" class="button" value="Login">
         </form>
    </div>
    </div>
    </div> `;
    main.append(formWrap);
    this.toggleAuthorizationMode();
    this.toggleAuthorizationForm();
    this.validateForm();
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

    const modal = document.querySelector('.form-wrap') as HTMLElement;

    authorizationBtn.addEventListener('click', () => {
      modal.style.top = '50%';
      body.append(overlay);
    });

    overlay.addEventListener('click', () => {
      modal.style.top = '-50%';
      overlay.remove();
    });
  }

  private validateForm(): void {
    const email = document.querySelector('#user_email') as HTMLInputElement;
    const signUpBtn = document.querySelector('.sign-up-btn') as HTMLElement;
    const signPassword = document.querySelector('#user_pass-sign') as HTMLInputElement;

    signUpBtn.addEventListener('click', () => {
      email.value
        .match(
          /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
      signPassword.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    });
  }
}
