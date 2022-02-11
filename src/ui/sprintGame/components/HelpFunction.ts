import { IWordsData } from '../../common/controller/model';

export function getRandomNumber(maxCount:number, minCount:number): number {
  return Math.round(Math.random() * (maxCount - minCount) + minCount);
}

export function shuffle(array:IWordsData[]): IWordsData[] {
  return array.sort(() => Math.random() - 0.5);
}
