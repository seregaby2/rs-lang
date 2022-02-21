export class OverviewPage {
  public drawOverviewPage(): void {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';

    const overviewWrapper = document.createElement('div') as HTMLElement;
    overviewWrapper.classList.add('overview-wrapper');

    const overview = document.createElement('div') as HTMLElement;
    overview.classList.add('overview-page');
    overview.innerHTML = '<iframe src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>';

    overviewWrapper.append(overview);
    main.append(overviewWrapper);
  }
}
