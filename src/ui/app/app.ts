// import { getRandomPage } from '../sptintGame/components/HelpFunction';
import { LogicSprintGame } from '../sptintGame/components/LogicSprintGame';
import { TemplateHtml } from '../sptintGame/components/templateHtml';

export class App {
  public async start() {
    const templateSprintGame = new TemplateHtml();
    const wrapper = document.body as HTMLBodyElement;

    templateSprintGame.createChooseLevelSprintGame(wrapper);
    const squareChooseLevel = document.querySelectorAll('.square-choose-level-sprint-game') as NodeListOf<HTMLDivElement>;
    const wrapperChooseLevelSprintGame = document.querySelector('.wrapper-choose-level-sprint-game') as HTMLDivElement;
    squareChooseLevel.forEach((e, i) => {
      e.addEventListener('click', async () => {
        wrapperChooseLevelSprintGame.style.display = 'none';
        templateSprintGame.createTemplateCardGame(wrapper);
        const wrapperCardGame = document.querySelector('.wrapper-card-sprint-game') as HTMLDivElement;
        wrapperCardGame.style.display = 'flex';
        const logic = new LogicSprintGame();
        await logic.createArrayEnglishAndRussianWords(i);
        logic.countAnswer();
      });
    });

    // window.addEventListener('click', () => {
    //   logic.getAnswer();
    // });

    // window.addEventListener('load', async () => {
    //   await logic.createArrayEnglishAndRussianWords();
    //   logic.countAnswer();
    // });
  }
}
