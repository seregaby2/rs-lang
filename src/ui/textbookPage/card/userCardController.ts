import { IWordsData } from '../../common/controller/model';
import { ControllerUserWords } from '../../common/controller/controllerUserWords';
import { USER_ACCESS_TOKEN, USER_ID } from '../../common/model/localStorageKeys';
import { LocalStorageService } from '../../common/services/localStorageService';

export class UserCardController {
  private localStorageService: LocalStorageService = new LocalStorageService();

  private controllerUserWords: ControllerUserWords = new ControllerUserWords();

  private userId = this.localStorageService.get(USER_ID);

  private userToken = this.localStorageService.get(USER_ACCESS_TOKEN);

  public makeWordDifficult(wordId: IWordsData['id']): void {
    this.controllerUserWords.createUserWord(
      this.userId,
      this.userToken,
      wordId,
      {
        difficulty: 'difficult',
        optional: {
          new: false,
          progress: 0,
        },
      },
    )
      .catch((err) => {
        if (err) {
          this.controllerUserWords.getUserWord(this.userId, this.userToken, wordId)
            .then((currentWord) => {
              this.controllerUserWords.updateUserWord(
                this.userId,
                this.userToken,
                wordId,
                {
                  difficulty: 'difficult',
                  optional: {
                    new: currentWord.optional.new,
                    progress: 0,
                  },
                },
              );
            });
        }
      });
  }

  public makeWordLearnt(wordId: IWordsData['id']): void {
    this.controllerUserWords.updateUserWord(
      this.userId,
      this.userToken,
      wordId,
      {
        difficulty: 'simple',
        optional: {
          new: false,
          progress: 3,
        },
      },
    )
      .catch((err) => {
        if (err) {
          this.controllerUserWords.createUserWord(
            this.userId,
            this.userToken,
            wordId,
            {
              difficulty: 'simple',
              optional: {
                new: false,
                progress: 3,
              },
            },
          );
        }
      });
  }
}
