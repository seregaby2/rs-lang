import { AudioGamePage } from '../audioGame/components/audioGamePage';

export class App {
  public start(): void {
    this.showAudioPage();
  }

  private showAudioPage(): void {
    const audioPage = new AudioGamePage();
    audioPage.draw();
  }
}
