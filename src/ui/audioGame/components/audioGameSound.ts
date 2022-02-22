export class AudioGameSound {
  private isMuted = false;

  public playSoundCorrectAnswer(): void {
    if (!this.isMuted) {
      const audio = new Audio();
      audio.src = './assets/sounds/RightAnswer.mp3';
      audio.play();
    }
  }

  public playSoundIncorrectAnswer(): void {
    if (!this.isMuted) {
      const audio = new Audio();
      audio.src = './assets/sounds/WrongAnswer.mp3';
      audio.play();
    }
  }

  public createSoundButton(): void {
    const mainContainer = document.querySelector('main') as HTMLDivElement;
    const container = document.createElement('div') as HTMLDivElement;
    const buttonSound = document.createElement('button') as HTMLButtonElement;

    container.classList.add('button-sound-container');
    buttonSound.classList.add('button-audio-game', 'button-sound');

    container.append(buttonSound);
    mainContainer.prepend(container);
    this.setListenerButtonSound(buttonSound);
  }

  private setListenerButtonSound(button: HTMLButtonElement): void {
    button.addEventListener('click', () => {
      button.classList.toggle('mute');
      this.isMuted = !this.isMuted;
    });
  }
}
