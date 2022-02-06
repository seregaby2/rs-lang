import { IWordsData } from './model';

export function getRandomNumber(maxCount:number, minCount:number) {
  return Math.round(Math.random() * (maxCount - minCount) + minCount);
}

export function shuffle(array:IWordsData[]) {
  return array.sort(() => Math.random() - 0.5);
}
