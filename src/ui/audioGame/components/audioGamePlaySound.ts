export class AudioGamePlaySound {
  public playSoundCorrectAnswer(): void {
    const audio = new Audio();
    audio.src = '../assets/sounds/RightAnswer.mp3';
    audio.play();
  }

  public playSoundIncorrectAnswer(): void {
    const audio = new Audio();
    audio.src = '../assets/sounds/WrongAnswer.mp3';
    audio.play();
  }
}
