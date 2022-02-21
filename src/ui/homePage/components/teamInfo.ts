interface MemberInfo {
  readonly contribution: string,
  readonly github: string,
  readonly img: string,
}

export class TeamInfo {
  private readonly teamInfo: MemberInfo[] = [
    {
      contribution: `
    <li><p>1</p>Главная страница приложения</li>
    <li><p>2</p>Авторизация <li/>
    <li><p>3</p>Электронный учебник</li>
    <li><p>4</p>Список слов </li>
    <li><p>5</p>Отображение прогресса изучения слов </li>
    <li><p>6</p>Удаление и обновление изученных слов на странице учебника</li>`,
      github: 'https://github.com/Runeci',
      img: 'dasha',
    },
    {
      contribution: `
    <li><p>1</p>Мини-игра "Спринт"</li>
    <li><p>2</p>Обновление прогресса изучения слов в играх <li/>
    <li><p>3</p>Страница статистики</li>
    <li><p>4</p>Разработка логики для создания изученных слов</li>`,
      github: 'https://github.com/seregaby2',
      img: 'sergei',
    },
    {
      contribution: `
    <li><p>1</p>Мини-игра "Аудиовызов"</li>`,
      github: 'https://github.com/Alhladkiy',
      img: 'aleksei',
    },
  ];

  public drawTeamInfo(): void {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';

    const teamInfo = document.createElement('div') as HTMLElement;
    teamInfo.classList.add('team-info');

    teamInfo.append(this.createTeamInfoHeading());
    teamInfo.append(this.createHeadingUnderline());
    teamInfo.append(this.createMembersInfoElements());
    main.append(teamInfo);
  }

  private createTeamInfoHeading(): HTMLHeadingElement {
    const teamInfoHeading = document.createElement('h2') as HTMLHeadingElement;
    teamInfoHeading.innerHTML = 'О команде';
    teamInfoHeading.classList.add('team-info-heading');
    return teamInfoHeading;
  }

  private createHeadingUnderline(): HTMLElement {
    const decoration = document.createElement('div') as HTMLElement;
    decoration.classList.add('team-underline');
    return decoration;
  }

  private createMembersInfoElements(): HTMLElement {
    const teamInfoCont = document.createElement('div') as HTMLElement;
    teamInfoCont.classList.add('members-info');

    this.teamInfo.forEach((item) => {
      const memberInfo = document.createElement('div') as HTMLElement;
      memberInfo.classList.add('member-info');

      memberInfo.innerHTML = `<a href="${item.github}" class="member-${item.img} member" target="_blank"></a>`
        + `<ul>${item.contribution}</ul>`;

      teamInfoCont.append(memberInfo);
    });

    return teamInfoCont;
  }
}
