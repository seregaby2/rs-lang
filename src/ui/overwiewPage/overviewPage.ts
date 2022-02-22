export class OverviewPage {
  public drawOverviewPage(): void {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';

    const overviewWrapper = document.createElement('div') as HTMLElement;
    overviewWrapper.classList.add('overview-wrapper');

    const overview = document.createElement('div') as HTMLElement;
    overview.classList.add('overview-page');
    overview.innerHTML = '<iframe src="https://www.youtube.com/embed/KfigIlv2k38" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

    overviewWrapper.append(overview);
    main.append(overviewWrapper);
  }
}
