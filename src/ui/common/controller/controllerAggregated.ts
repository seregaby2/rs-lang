import { IAggregated } from './model';

export class ControllerAggregated {
  public getAggregatedWord(
    userId: string,
    token: string,
    addingMethod: string,
    currentData: string,
  ): Promise<IAggregated[]> {
    const url = `https://rs-lang-2022.herokuapp.com/users/${userId}/aggregatedWords?filter={"$and":[{"userWord.optional.addingMethodWords":"${addingMethod}", "userWord.optional.timeStamp":"${currentData}"}]}&wordsPerPage=1000`;
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

  public getAggregatedLearnedWord(
    userId: string,
    token: string,
  ): Promise<IAggregated[]> {
    const url = `https://rs-lang-2022.herokuapp.com/users/${userId}/aggregatedWords?filter={"$or":[{"$and":[{"userWord.difficulty":"simple", "userWord.optional.progress":3}]},{"userWord.difficulty":"difficult", "userWord.optional.progress":5}]}&wordsPerPage=1000`;
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
}
