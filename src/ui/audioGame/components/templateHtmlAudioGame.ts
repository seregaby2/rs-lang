export class TemplateHtmlAudioGame {
  get baseTemplate(): string {
    return `
    <div class="main-wrapper-audio-game">
      <div class="main-container-audio-game">
        <div class="answer-info-container">
          <button class="button-audio-game button-volume-audio-game"></button>
        </div>
      </div>
      <button class="button-audio-game button-answer-audio-game">не знаю</button>
      <button class="button-audio-game button-next-card-audio-game"> → </button>

    </div>
      `;
  }
}
