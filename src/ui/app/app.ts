// import { getRandomPage } from '../sptintGame/components/HelpFunction';
import { LogicSprintGame } from '../sptintGame/components/LogicSprintGame';
import { TemplateHtml } from '../sptintGame/components/templateHtml';

export class App {
  public start() {
    const templateSprintGame = new TemplateHtml();
    const wrapper = document.body as HTMLBodyElement;
    templateSprintGame.createTemplate(wrapper);
    const logic = new LogicSprintGame();
    // window.addEventListener('click', () => {
    //   logic.getAnswer();
    // });

    window.addEventListener('load', async () => {
      await logic.createArrayEnglishAndRussianWords();
      logic.countAnswer();
      // const count = getRandomPage(1, 0);
      // await logic.getAnswer(count);
    });
  }
}
