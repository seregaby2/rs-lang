// import { HeaderView } from '../common/header/components/header';
// import { Footer } from '../common/footer/components/footer';
// import { HomePage } from '../homePage/components/homePage';
import { Router } from '../routing/components/router';
import { PageTemplate } from '../common/pageTemplate/template';
// import { TeamInfo } from '../homePage/components/teamInfo';

export class App {
  // private header: HeaderView = new HeaderView();
  //
  // private footer: Footer = new Footer();

  // private homePage: HomePage = new HomePage();

  // private team: TeamInfo = new TeamInfo();

  private router: Router = new Router();

  private pageTemplate: PageTemplate = new PageTemplate();

  public start() {
    this.pageTemplate.drawPageTemplate();
    this.router.changePages();
    this.router.drawCurrentPage();
  }
}
