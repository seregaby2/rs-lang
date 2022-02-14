import { ControllerUserWords } from './controller/controllerUserWords';
import { IUserWord } from './controller/model';

export class UsersData {
  private controllerUserWords = new ControllerUserWords();

  async getUserWordGame(wordId: string) {
    const userId = localStorage.getItem('user_id') || '';
    const token = localStorage.getItem('user_access_token') || '';
    const userWord: IUserWord = await this.controllerUserWords.getUserWord(userId, token, wordId);
    return userWord;
  }

  async getUserWordsGame() {
    const userId = localStorage.getItem('user_id') || '';
    const token = localStorage.getItem('user_access_token') || '';
    const userWords: IUserWord[] = await this.controllerUserWords.getUserWords(userId, token);
    return userWords;
  }

  async createUserWordsGame(wordId: string, rightWrongAnswer: number) {
    const userId = localStorage.getItem('user_id') || '';
    const token = localStorage.getItem('user_access_token') || '';
    const body: IUserWord = {
      difficulty: 'simple',
      optional: {
        new: true,
        progress: rightWrongAnswer,
      },
    };
    this.controllerUserWords.createUserWord(userId, token, wordId, body);
  }

  async updateUserWordsGame(
    wordId: string,
    rightWrongAnswer: number,
    difficult: string,
    progressHelp: number,
  ) {
    const userId = localStorage.getItem('user_id') || '';
    const token = localStorage.getItem('user_access_token') || '';
    let progressHelpTwo = progressHelp;
    let difficultHelp = difficult;
    if ((rightWrongAnswer === 1 && difficult === 'simple' && progressHelpTwo < 3)
    || (rightWrongAnswer === 1 && difficult === 'difficult' && progressHelpTwo < 5)) {
      progressHelpTwo += 1;
    }
    if (rightWrongAnswer === 0 && progressHelpTwo > 0) {
      progressHelpTwo -= 1;
    }
    if (progressHelpTwo === 5) {
      difficultHelp = 'simple';
      progressHelpTwo = 3;
    }
    const body: IUserWord = {
      difficulty: difficultHelp,
      optional: {
        new: true,
        progress: progressHelpTwo,
      },
    };
    this.controllerUserWords.updateUserWord(userId, token, wordId, body);
  }
}
