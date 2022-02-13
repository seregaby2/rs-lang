import { IUserWord } from './model';

export class ControllerUserWords {
  public getUserWords(userId: string, token: string): Promise<IUserWord[]> {
    const url = `https://rs-lang-2022.herokuapp.com/users/${userId}/words`;
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

  public getUserWord(userId: string, token: string, wordId: string): Promise<IUserWord> {
    const url = `https://rs-lang-2022.herokuapp.com/users/${userId}/words/${wordId}`;
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

  public createUserWord(
    userId: string,
    token: string,
    wordId: string,
    body: IUserWord,
  ): Promise<IUserWord> {
    const url = `https://rs-lang-2022.herokuapp.com/users/${userId}/words/${wordId}`;
    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json();
      });
  }

  public updateUserWord(
    userId: string,
    token: string,
    wordId: string,
    body: IUserWord,
  ): Promise<IUserWord> {
    const url = `https://rs-lang-2022.herokuapp.com/users/${userId}/words/${wordId}`;
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

  public deleteUserWord<T>(userId: string, token: string, wordId: string): Promise<T> {
    const url = `https://rs-lang-2022.herokuapp.com/users/${userId}/words/${wordId}`;
    return fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json());
  }
}
