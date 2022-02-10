import { IWordsData } from '../../sprintGame/components';

export class TextBookCard {
  public createWordCard(
    imgPath: IWordsData['image'],
    word: IWordsData['word'],
    transcription: IWordsData['transcription'],
    translation: IWordsData['wordTranslate'],
    meaning: IWordsData['textMeaning'],
    meaningTranslate: IWordsData['textMeaningTranslate'],
    example: IWordsData['textExample'],
    exampleTranslate: IWordsData['textExampleTranslate'],
  ): HTMLDivElement {
    const cardContainer = document.createElement('div') as HTMLDivElement;
    cardContainer.classList.add('textbook-card-container');

    cardContainer
      .innerHTML = `<div class="textbook-word-img" style="background-image: url('https://rs-lang-2022.herokuapp.com/${imgPath}')"></div>
                    <div class="textbook-card-text">
                        <div class="textbook-word">
                            <div class="textbook-card-word">${word}</div>
                            <div class="textbook-card-transcription">${transcription}</div>
                            <div class="textbook-card-translation">${translation}
                        </div>
                        <div class="textbook-word-meaning">
                            <div class="textbook-card-meaning">${meaning}</div>
                            <div class="textbook-card-meaningTranslate">${meaningTranslate}</div>
                        </div>
                        <div class="textbook-word-example">
                            <div class="textbook-card-example">${example}</div>
                            <div class="textbook-card-exampleTranstale">${exampleTranslate}</div>
                        </div>
                    </div>
                    </div>
                    <div class="textbook-card-decoration"></div>`;
    return cardContainer;
  }
}
