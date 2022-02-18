import { IStatistics } from './model';

export class ControllerStatistics {
  public getStatistics(userId: string, token: string): Promise<IStatistics> {
    const url = `https://rs-lang-2022.herokuapp.com/users/${userId}/statistics`;
    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json());
  }

  public updateStatistics(userId: string, token: string, body: IStatistics): Promise<IStatistics> {
    const url = `https://rs-lang-2022.herokuapp.com/users/${userId}/statistics`;
    return fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json());
  }
}
