import { HomePage } from '../../homePage/components/homePage';
import { TeamInfo } from '../../homePage/components/teamInfo';

enum CurrentPage {
  Team = 'team',
  SprintGame = 'sprint',
  AudioGame = 'audiocall',
  Home = '',
  Vocabulary = 'vocabulary',
  Stats = 'stats',
  Book = 'book',
  Overview = 'overview',
}
export class Router {
  private homePage: HomePage = new HomePage();

  private team: TeamInfo = new TeamInfo();

  public drawCurrentPage(): void {
    const currentHash = window.location.hash;

    switch (currentHash) {
      case `#/${CurrentPage.Book}`:
        break;
      case `#/${CurrentPage.Vocabulary}`:
        break;
      case `#/${CurrentPage.Stats}`:
        break;
      case `#/${CurrentPage.Team}`:
        this.team.drawTeamInfo();
        break;
      case `#/${CurrentPage.Overview}`:
        break;
      case `#/${CurrentPage.SprintGame}`:
        break;
      case `#/${CurrentPage.AudioGame}`:
        break;
      default:
        this.homePage.drawHomePage();
        break;
    }
  }

  public changePages(): void {
    const menuAside = document.querySelector('.menu-aside') as HTMLElement;
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
          break;
        case CurrentPage.Vocabulary:
          break;
        case CurrentPage.Stats:
          break;
        case CurrentPage.Team:
          this.team.drawTeamInfo();
          break;
        case CurrentPage.Overview:
          break;
        case CurrentPage.SprintGame:
          break;
        case CurrentPage.AudioGame:
          break;
        default:
          this.homePage.drawHomePage();
          break;
      }
    });
  }

  private changeRoutes(pathname: string): void {
    window.history.pushState(
      {},
      pathname,
      window.location.origin + pathname,
    );
  }
}
