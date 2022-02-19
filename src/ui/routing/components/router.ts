import { AudioGamePage } from '../../audioGame/components/audioGamePage';
import { HomePage } from '../../homePage/components/homePage';
import { TeamInfo } from '../../homePage/components/teamInfo';
import { TextbookPage } from '../../textbookPage/components/textbookPage';
import { LogicSprintGame } from '../../sprintGame/components/LogicSprintGame';
import { TemplateStatistics } from '../../statistics/templateStatistics';

enum CurrentPage {
  Team = 'team',
  SprintGame = 'sprint',
  AudioGame = 'audiocall',
  Home = '',
  Vocabulary = 'vocabulary',
  Stats = 'stats',
  Book = 'book',
  Overview = 'overview',
  TextBookSprintGame = 'sprint-textbook',
  TextBookAudioGame = 'audiocall-textbook',
}

export class Router {
  private homePage: HomePage = new HomePage();

  private team: TeamInfo = new TeamInfo();

  private sprintGame: LogicSprintGame = new LogicSprintGame();

  private audioGame: AudioGamePage = new AudioGamePage(() => this.homePage.drawHomePage());

  private textbookPage: TextbookPage = new TextbookPage();

  private templateStatistics: TemplateStatistics = new TemplateStatistics();

  public drawCurrentPage(): void {
    const currentHash = window.location.hash;

    switch (currentHash) {
      case `#/${CurrentPage.Book}`:
        this.textbookPage.drawTextbookPage();
        break;
      case `#/${CurrentPage.Vocabulary}`:
        break;
      case `#/${CurrentPage.Stats}`:
        this.templateStatistics.drawStatistics();
        break;
      case `#/${CurrentPage.Team}`:
        this.team.drawTeamInfo();
        break;
      case `#/${CurrentPage.Overview}`:
        break;
      case `#/${CurrentPage.SprintGame}`:
        this.sprintGame.drawSprintGame();
        break;
      case `#/${CurrentPage.TextBookSprintGame}`:
        this.sprintGame.drawSprintGameFromBookPage();
        break;
      case `#/${CurrentPage.AudioGame}`:
        this.audioGame.draw();
        break;
      case `#/${CurrentPage.TextBookAudioGame}`:
        this.audioGame.drawAudioGameFromBookPage();
        break;
      default:
        this.homePage.drawHomePage();
        break;
    }
  }

  public changePages(): void {
    const menuAside = document.querySelector('.wrapper') as HTMLElement;
    const headerLogo = document.querySelector('.header-logo') as HTMLElement;

    headerLogo.addEventListener('click', () => {
      this.changeRoutes(CurrentPage.Home);
      this.homePage.drawHomePage();
    });

    menuAside.addEventListener('click', (event) => {
      const pageBtn = event.target as HTMLElement;

      if (!pageBtn.dataset.route) {
        return;
      }

      const currentPath = `/#/${pageBtn.dataset.route}`;
      this.changeRoutes(currentPath);

      switch (pageBtn.dataset.route) {
        case CurrentPage.Book:
          this.textbookPage.drawTextbookPage();
          break;
        case CurrentPage.Vocabulary:
          break;
        case CurrentPage.Stats:
          this.templateStatistics.drawStatistics();
          break;
        case CurrentPage.Team:
          this.team.drawTeamInfo();
          break;
        case CurrentPage.Overview:
          break;
        case CurrentPage.SprintGame:
          this.sprintGame.drawSprintGame();
          break;
        case CurrentPage.TextBookSprintGame:
          this.sprintGame.drawSprintGameFromBookPage();
          break;
        case CurrentPage.AudioGame:
          this.audioGame.draw();
          break;
        case CurrentPage.TextBookAudioGame:
          this.audioGame.drawAudioGameFromBookPage();
          break;
        default:
          this.homePage.drawHomePage();
          break;
      }
    });
  }

  public changeRoutes(pathname: string): void {
    window.history.pushState(
      {},
      pathname,
      window.location.origin + pathname,
    );
  }
}
