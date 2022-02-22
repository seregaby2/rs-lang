import { ApiMethod, ApiParams, JWTToken } from './models';

export class Controller {
  private readonly apiUrl: string = 'https://rs-lang-2022.herokuapp.com';

  constructor(private requestPathPart: string) {
  }

  protected get<T>(token: JWTToken['token'], path?: string): Promise<T> {
    return this.request({
      path,
      method: ApiMethod.Get,
    }, token);
  }

  protected post<T>(data: string, path: string = '', token?: JWTToken['token']): Promise<T> {
    if (token) {
      return this.request({
        path,
        method: ApiMethod.Post,
        body: data,
      }, token);
    }
    return this.request({
      path,
      method: ApiMethod.Post,
      body: data,
    });
  }

  protected getURL(path: string = ''): string {
    let newPath = '';
    if (path) {
      newPath = `/${path}`;
    }
    return `${this.apiUrl}/${this.requestPathPart}${newPath}`;
  }

  private request<T>(params: ApiParams, token?: JWTToken['token']): Promise<T> {
    return fetch(this.getURL(params.path), {
      method: params.method,
      ...params.body ? { body: params.body } : {},
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json());
  }
}
