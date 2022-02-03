export class TemplateHtml {
  private createElement = (className:string, container:HTMLElement, tag:string): HTMLElement => {
    const Element = document.createElement(tag);
    Element.classList.add(className);
    return container.appendChild(Element);
  };

  createTemplateCardGame(wrapperSprintGame:HTMLDivElement): void {
    const wrapperCardSprintGame = this.createElement('wrapper-card-sprint-game', wrapperSprintGame, 'div');
    const cardSprintGame = this.createElement('card-sprint', wrapperCardSprintGame, 'div');
    const headerCardSprintGame = this.createElement('header-card-sprint-game', cardSprintGame, 'div');
    const contentImageCardSprintGame = this.createElement('image-content-card-sprint-game', cardSprintGame, 'div');
    const contentCardSprintGame = this.createElement('content-card-spring-game', cardSprintGame, 'div');
    const footerCardSprintGame = this.createElement('footer-card-spring-game', cardSprintGame, 'div');
    for (let i = 0; i < 3; i += 1) {
      this.createElement('item-header-card-sprint-game', headerCardSprintGame, 'div');
    }
    for (let i = 0; i < 5; i += 1) {
      const img = (this.createElement('favorites-card-img', contentImageCardSprintGame, 'img') as HTMLImageElement);
      img.src = '../assets/images/sprintGame/parrot1.png';
      img.alt = 'parrot';
      img.id = `parrot-${i}`;
    }
    for (let i = 0; i < 2; i += 1) {
      this.createElement('item-content-card-sprint-game', contentCardSprintGame, 'div');
    }
    for (let i = 0; i < 2; i += 1) {
      const buttonNextPrev = this.createElement('item-footer-card-sprint-game', footerCardSprintGame, 'button');
      if (i === 0) {
        buttonNextPrev.textContent = 'Неверно';
      } else {
        buttonNextPrev.textContent = 'Верно';
      }
    }
    wrapperCardSprintGame.style.display = 'none';
  }

  createChooseLevelSprintGame(wrapperSprintGame:HTMLDivElement) {
    const wrapperChooseLevelSprintGame = this.createElement('wrapper-choose-level-sprint-game', wrapperSprintGame, 'div');

    const containerCardChooseLevel = this.createElement('container-choose-level-sprint-game', wrapperChooseLevelSprintGame, 'div');
    const containerTextChooseLevel = this.createElement('container-text-choose-level-sprint-game', containerCardChooseLevel, 'div');

    const headerChooseLevelSprintGame = this.createElement('header-choose-level-sprint-game', containerTextChooseLevel, 'div');
    const textChooseLevelSprintGame = this.createElement('text-choose-level-sprint-game', containerTextChooseLevel, 'div');

    const containerSquareChooseLevelSprint = this.createElement('container-square-choose-level-sprint-game', containerCardChooseLevel, 'div');
    const headerSquareChooseLevelSprintGame = this.createElement('header-square-choose-level-sprint-game', containerSquareChooseLevelSprint, 'div');
    const wrapperSquareChooseLevelSprintGame = this.createElement('wrapper-square-choose-level-sprint-game', containerSquareChooseLevelSprint, 'div');

    textChooseLevelSprintGame.textContent = 'Выбирайте соответсьвующий перевод предложенным словам. Эта игра поможет вам развить навык быстрого перевода.';
    headerChooseLevelSprintGame.textContent = 'Спринт вызов';
    headerSquareChooseLevelSprintGame.textContent = 'Выберите уровень';
    for (let i = 0; i < 6; i += 1) {
      const square = this.createElement('square-choose-level-sprint-game', wrapperSquareChooseLevelSprintGame, 'div');
      square.textContent = i.toString();
    }
  }
}
