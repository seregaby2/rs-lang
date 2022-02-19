export class TemplateHtmlAudioGame {
  get templateSettings(): string {
    return `
    <div class="main-container-settings-audio-game">
      <div class="container-settings-audio-game-main-title">
        <h3 class="main-title-setting-audio-game">Настойки игры</h2>
      </div>
      <div class="container-support-title-settings-game">
        <h4 class="support-title-setting-audio-game">Выберите сложность игры</h4>
      </div>
      <div class="container-buttons-level-audio-game"></div>
      <div class="container-buttons-settings-audio-game">
        <button class="button-audio-game button-cancel-audio-game">Отмена</button>
        <button class="button-audio-game button-start-audio-game">Старт</button>
      </div>
    </div>`;
  }

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
