import { IWordsData } from './model';

export class SprintController {
  url = 'https://rs-lang-2022.herokuapp.com';

  async getWords(item:string, group:number, page:number): Promise<IWordsData[]> {
    const urlWords = `${this.url}/${item}?group=${group}&page=${page}`;
    const res = await fetch(urlWords);
    const words:IWordsData[] = await res.json();
    return words;
  }

  async getWord(item:string, id: string):Promise<IWordsData> {
    const urlWord = `${this.url}/${item}/${id}`;
    const res = await fetch(urlWord);
    const word:IWordsData = await res.json();
    return word;
  }
}
