interface MemberInfo {
  readonly contribution: string,
  readonly github: string,
  readonly img: string,
}

export class TeamInfo {
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

    const teamInfo: MemberInfo[] = [
      { contribution: 'bla bla', github: 'https://github.com/Runeci', img: 'dasha' },
      { contribution: 'bla bla', github: 'https://github.com/Alhladkiy', img: 'aleksei' },
      { contribution: 'bla bla', github: 'https://github.com/seregaby2', img: 'sergei' },
    ];

    teamInfo.forEach((item) => {
      const memberInfo = document.createElement('div') as HTMLElement;
      memberInfo.classList.add('member-info');

      memberInfo.innerHTML = `<a href="${item.github}" class="member-${item.img} member"></a>`
        + `<p>${item.contribution}</p>`;

      teamInfoCont.append(memberInfo);
    });

    return teamInfoCont;
  }
}
