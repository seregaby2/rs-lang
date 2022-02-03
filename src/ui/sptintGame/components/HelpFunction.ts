import { IWordsData } from './model';

export function getRandomPage(maxCountPage:number, minCountPage:number) {
  return Math.round(Math.random() * (maxCountPage - minCountPage) + minCountPage);
}

export function shuffle(array:IWordsData[]) {
  return array.sort(() => Math.random() - 0.5);
}
