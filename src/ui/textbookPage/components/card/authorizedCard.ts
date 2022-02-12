export class AuthorizedCard {
  public createWordAuthorisedCard(id: string): HTMLElement {
    const buttonsContainer = document.createElement('div') as HTMLElement;
    buttonsContainer.classList.add('textbook-authorized-buttons');
    const complicatedBtn = document.createElement('button') as HTMLButtonElement;
    complicatedBtn.classList.add('textbook-complicated-btn', 'btn');
    complicatedBtn.innerHTML = 'Изученное';
    const learntBtn = document.createElement('button') as HTMLButtonElement;
    learntBtn.classList.add('textbook-learnt-btn', 'btn');
    learntBtn.innerHTML = 'Сложное';
    learntBtn.setAttribute('data-word-id', id);

    buttonsContainer.append(complicatedBtn);
    buttonsContainer.append(learntBtn);
    return buttonsContainer;
  }
  //
  // private makeWordComplicated(): void {
  //
  // }
}
