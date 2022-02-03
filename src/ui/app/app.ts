import { Router } from '../routing/components/router';
import { PageTemplate } from '../common/pageTemplate/template';

export class App {
  private router: Router = new Router();

  private pageTemplate: PageTemplate = new PageTemplate();

  public start() {
    this.pageTemplate.drawPageTemplate();
    this.router.changePages();
    this.router.drawCurrentPage();
  }
}
