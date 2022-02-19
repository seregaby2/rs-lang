export interface IWordsData {
  readonly id: string,
  readonly group: number,
  readonly page: number,
  readonly word: string,
  readonly image: string,
  readonly audio: string,
  readonly audioMeaning: string,
  readonly audioExample: string,
  readonly textMeaning: string,
  readonly textExample: string,
  readonly transcription: string,
  readonly wordTranslate: string,
  readonly textMeaningTranslate: string,
  readonly textExampleTranslate: string
}

interface IOptionalWord {
  new: boolean,
  progress: number,
  timeStamp?: string,
  addingMethodWords?: string,
}

export interface IUserWord {
  id?: string,
  difficulty: string,
  optional: IOptionalWord,
  wordId?: string,
}

interface IOptionalStatistics {
  countNewWordsSprint: number,
  percentRightAnswerSprint: number,
  longestSeriesOfRightAnswerSprint: number,
  countNewWordsAudio: number,
  percentRightAnswerAudio: number,
  longestSeriesOfRightAnswerAudio: number,
  countNewWordsBook: number,
  countLearnedWordsBook: number,
  percentRightAnswerBook: number,
}

export interface IStatistics {
  id?: string,
  learnedWords: number,
  optional: IOptionalStatistics,
}

interface IOptionalSettings {
  countRightAnswerSprint: number,
  countTotalAnswerSprint: number,
  longestContinuosSeriesSprint: number
}

export interface ISettings {
  id?: string,
  wordsPerDay: number,
  optional: IOptionalSettings,
}

export interface IAggregated {
  paginatedResults: IWordsData[],
}
