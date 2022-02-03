import { HeaderView } from '../header/components/header';
import { Footer } from '../footer/components/footer';
import { MenuAside } from '../header/components/menuAside';

export class PageTemplate {
  private header: HeaderView = new HeaderView();

  private footer: Footer = new Footer();

  private menuAside: MenuAside = new MenuAside();

  public drawPageTemplate() {
    this.createWrapper();
    this.header.drawHeader();
    this.menuAside.drawMenuAside();
    this.footer.drawFooter();
  }

  private createWrapper(): void {
    const body = document.querySelector('body') as HTMLElement;
    const wrapper = document.createElement('div') as HTMLElement;
    const main = document.createElement('main') as HTMLElement;

    main.classList.add('main');
    wrapper.classList.add('wrapper');

    wrapper.append(main);
    body.append(wrapper);
  }
}
