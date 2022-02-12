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
