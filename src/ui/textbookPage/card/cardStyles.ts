export class CardStyles {
  public levelColor: string[] = [
    '#f1c50e',
    '#FFBF00',
    '#FF9515',
    '#FF6A2B',
    '#e21818',
    '#e21818',
    '#dc146f'];

  public changeStyles(group: number): void {
    const color: string = this.levelColor[group];
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
    const complicatedStar = document
      .querySelectorAll('.textbook-star-complicated') as NodeListOf<HTMLElement>;

    [...decoration, ...authorizedBtns].forEach((item) => {
      const decorationEl = item;
      decorationEl.style.background = color;
    });
    [...word, ...translation, ...complicatedStar].forEach((item) => {
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
