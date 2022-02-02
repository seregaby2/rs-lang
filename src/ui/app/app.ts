import { AudioPage } from '../audioGame/components/audioPage';

export class App {
  public start(): void {
    this.showAudioPage();
  }

  private showAudioPage(): void {
    const audioPage = new AudioPage();
    audioPage.render();
  }
}
