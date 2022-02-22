import { IWordsData } from '../../../common/controller/model';

export class TextbookCard {
  public createWordCard(
    imgPath: IWordsData['image'],
    id: IWordsData['id'],
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
    cardContainer.setAttribute('data-word-id', id);

    cardContainer
      .innerHTML = `<div class="textbook-word-img" style="background-image: url('https://rs-lang-2022.herokuapp.com/${imgPath}')"></div>
                    <div class="textbook-card-text">
                        <div class="textbook-word">
                            <div class="textbook-card-word">
                                <div>${word}</div>
                                <div class="textbook-card-sound">
                                 <svg width="36" height="30" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M18.3326 0C17.8816 0 17.4905 0.156374 17.1604 0.469123L8.48928 8.68426H1.66737C1.21531 8.68426 0.825273 8.84064 0.495164 9.15339C0.165055 9.46614 0 9.83665 0 10.2639V19.7361C0 20.1633 0.165055 20.5339 0.495164 20.8466C0.825273 21.1594 1.21636 21.3157 1.66737 21.3157H8.48928L17.1604 29.5309C17.4905 29.8436 17.8806 30 18.3326 30C18.7847 30 19.1747 29.8436 19.5048 29.5309C19.8349 29.2181 20 28.8486 20 28.4203V1.57968C20 1.15239 19.8349 0.781873 19.5059 0.469123C19.1768 0.156374 18.7857 0 18.3337 0H18.3326Z"/>
                                 <path d="M28.0399 18.515C28.7419 17.434 29.0929 16.266 29.0929 15.01C29.0929 13.754 28.7419 12.582 28.0399 11.492C27.3379 10.402 26.4099 9.63396 25.2529 9.18796C25.0879 9.10596 24.8809 9.06396 24.6339 9.06396C24.2049 9.06396 23.8329 9.21697 23.5189 9.52197C23.2049 9.82897 23.0479 10.203 23.0479 10.649C23.0479 10.996 23.1469 11.289 23.3459 11.528C23.5449 11.767 23.7829 11.974 24.0639 12.147C24.3439 12.32 24.6249 12.51 24.9059 12.717C25.1869 12.924 25.4259 13.216 25.6239 13.596C25.8219 13.976 25.9209 14.447 25.9209 15.008C25.9209 15.569 25.8219 16.04 25.6239 16.42C25.4259 16.8 25.1869 17.093 24.9059 17.299C24.6249 17.505 24.3439 17.696 24.0639 17.869C23.7829 18.042 23.5439 18.249 23.3459 18.488C23.1479 18.727 23.0479 19.021 23.0479 19.367C23.0479 19.813 23.2059 20.188 23.5189 20.494C23.8329 20.798 24.2039 20.953 24.6339 20.953C24.8809 20.953 25.0879 20.912 25.2529 20.829C26.4089 20.366 27.3379 19.594 28.0399 18.512V18.515Z"/>
                                 <path d="M33.8744 22.1208C35.2915 19.9463 36 17.5714 36 14.999C36 12.4276 35.2915 10.0547 33.8744 7.87713C32.4574 5.70262 30.5822 4.11727 28.2497 3.12618C28.0337 3.04274 27.8167 3 27.5997 3C27.1667 3 26.7913 3.15976 26.4744 3.47927C26.1574 3.79878 26 4.17629 26 4.61384C26 5.26914 26.325 5.76469 26.975 6.1015C27.9075 6.58891 28.5414 6.95828 28.8744 7.21063C30.1078 8.11829 31.0707 9.25592 31.762 10.6255C32.4534 11.9952 32.7996 13.4523 32.7996 15C32.7996 16.5457 32.4534 18.0038 31.762 19.3745C31.0707 20.7441 30.1078 21.8817 28.8744 22.7894C28.5414 23.0417 27.9075 23.4111 26.975 23.8985C26.325 24.2353 26 24.7298 26 25.3862C26 25.8227 26.1585 26.2012 26.4744 26.5207C26.7903 26.8402 27.1738 27 27.6239 27C27.8238 27 28.0327 26.9573 28.2487 26.8738C30.5811 25.8817 32.4574 24.2984 33.8734 22.1219L33.8744 22.1208Z"/>
                                 </svg>
                            </div>
                            </div>
                            <div class="textbook-card-transcription">${transcription}</div>
                            <div class="textbook-card-translation">${translation}</div>
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
