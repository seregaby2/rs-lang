import { HeaderView } from '../common/header/components/header';
import { Footer } from '../common/footer/components/footer';
import { HomePage } from '../homePage/components/homePage';


export class App {
  private header: HeaderView = new HeaderView();

  private footer: Footer = new Footer();

  private homePage: HomePage = new HomePage();

  public start() {
    this.homePage.drawPage();
    this.header.drawHeader();
    this.footer.drawFooter();
  }
}
