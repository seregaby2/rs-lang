import { ControllerUserWords } from '../../../common/controller/controllerUserWords';

export class AuthorizedCard {
  private controller: ControllerUserWords = new ControllerUserWords();

  public createWordAuthorisedCard(id: string): HTMLElement {
    const buttonsContainer = document.createElement('div') as HTMLElement;
    buttonsContainer.classList.add('textbook-authorized-buttons');

    const complicatedBtn = document.createElement('button') as HTMLButtonElement;
    complicatedBtn.classList.add('textbook-complicated-btn', 'btn');
    complicatedBtn.innerHTML = 'Сложное';
    complicatedBtn.setAttribute('data-word-id', id);
    complicatedBtn.addEventListener('click', () => {
      const z = complicatedBtn.dataset.wordId!;
      this.makeWordComplicated(z);
    });

    const learntBtn = document.createElement('button') as HTMLButtonElement;
    learntBtn.classList.add('textbook-learnt-btn', 'btn');
    learntBtn.innerHTML = 'Изученное';
    learntBtn.setAttribute('data-word-id', id);

    buttonsContainer.append(complicatedBtn);
    buttonsContainer.append(learntBtn);
    return buttonsContainer;
  }

  public makeWordComplicated(wordId: string): void {
    const userId = localStorage.getItem('user_id')!;
    const userToken = localStorage.getItem('user_access_token')!;
    this.controller.createUserWord(
      userId,
      userToken,
      wordId,
      {
        difficulty: 'weak',
        optional: {
          testFieldString: 'test',
          testFieldBoolean: true,
        },
      },
    );
  }
}
