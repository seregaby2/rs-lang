import { WordResponseModel } from '../models/wordResponse.model';

export class AudioGameController {
  private readonly baseUrl = 'https://rs-lang-2022.herokuapp.com';

  public async getWords(group: number, page: number): Promise<WordResponseModel[]> {
    const response = await fetch(`${this.baseUrl}/words?group=${group}&page=${page}`);
    const data: WordResponseModel[] = await response.json();
    return data;
  }

  public async getWord(id: string): Promise<WordResponseModel> {
    const response = await fetch(`${this.baseUrl}/words/${id}`);
    const data: WordResponseModel = await response.json();
    return data;
  }
}
