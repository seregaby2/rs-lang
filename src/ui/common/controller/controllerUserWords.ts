export class ControllerUserWords {
  public getUserWords<T>(userId: string, token: string): Promise<T> {
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

  public getUserWord<T>(userId: string, token: string, wordId: string): Promise<T> {
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

  public createUserWord<T>(
    userId: string,
    token: string,
    wordId: string,
    body: object,
  ): Promise<T> {
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
      .then((response) => response.json());
  }

  public updateUserWord<T>(
    userId: string,
    token: string,
    wordId: string,
    body: object,
  ): Promise<T> {
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
