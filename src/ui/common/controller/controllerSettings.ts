import { ISettings } from './model';

export class ControllerSettings {
  public getSettings(userId: string, token: string): Promise<ISettings> {
    const url = `https://rs-lang-2022.herokuapp.com/users/${userId}/settings`;
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

  public updateSettings(userId: string, token: string, body: ISettings): Promise<ISettings> {
    const url = `https://rs-lang-2022.herokuapp.com/users/${userId}/settings`;
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
