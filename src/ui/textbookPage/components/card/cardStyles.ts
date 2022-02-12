export class CardStyles {
  public changeStyles(group: number): void {
    let color: string;
    switch (group) {
      case 0:
        color = '#f1c50e';
        break;
      case 1:
        color = '#FFBF00';
        break;
      case 2:
        color = '#FF9515';
        break;
      case 3:
        color = '#FF6A2B';
        break;
      case 4:
        color = '#db621c';
        break;
      case 5:
        color = '#e21818';
        break;
      default:
        color = '';
        break;
    }
    const decoration = document
      .querySelectorAll('.textbook-card-decoration') as NodeListOf<HTMLElement>;
    const word = document
      .querySelectorAll('.textbook-card-word') as NodeListOf<HTMLElement>;
    const translation = document
      .querySelectorAll('.textbook-card-translation') as NodeListOf<HTMLElement>;
    const audio = document
      .querySelectorAll('.textbook-card-sound svg') as NodeListOf<HTMLElement>;
    const authorizedBtns = document
      .querySelectorAll('.textbook-authorized-buttons button') as NodeListOf<HTMLElement>;
    [...decoration, ...authorizedBtns].forEach((item) => {
      const decorationEl = item;
      decorationEl.style.background = color;
    });
    [...word, ...translation].forEach((item) => {
      const element = item;
      element.style.color = color;
    });

    audio.forEach((item) => {
      const audioEl = item;
      audioEl.style.fill = color;
    });
  }

  public makeBookmarkActive(number: number): void {
    const btns = document.querySelectorAll('.textbook-page-btn') as NodeListOf<HTMLElement>;
    btns[number].classList.add('active');
  }
}
