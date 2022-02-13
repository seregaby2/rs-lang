import { IWordsData } from './model';

export class ControllerWords {
  url = 'https://rs-lang-2022.herokuapp.com';

  public async getWords(group: number, page: number = 1): Promise<IWordsData[]> {
    const urlWords = `${this.url}/words?group=${group}&page=${page}`;
    const res = await fetch(urlWords);
    const words: IWordsData[] = await res.json();
    return words;
  }

  public async getWord(wordId: string): Promise<IWordsData> {
    const urlWord = `${this.url}/words/${wordId}`;
    const res = await fetch(urlWord);
    const word: IWordsData = await res.json();
    return word;
  }
}
