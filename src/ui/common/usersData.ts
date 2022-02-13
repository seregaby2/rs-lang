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
    const usersWordsGame = await this.getUserWordsGame();
    let repeatWord: boolean = false;
    usersWordsGame.forEach((e) => {
      if (e.id === wordId) { repeatWord = true; }
    });
    if (!repeatWord) {
      const body: IUserWord = {
        difficulty: 'No',
        optional: {
          learnt: 'No',
          progress: rightWrongAnswer,
        },

      };
      this.controllerUserWords.createUserWord(userId, token, wordId, body);
    }
  }

  async updateUserWordsGame(wordId: string, rightWrongAnswer: number) {
    const userId = localStorage.getItem('user_id') || '';
    const token = localStorage.getItem('user_access_token') || '';
    const usersWordsGame = await this.getUserWordsGame();
    let learn: string = 'No';
    usersWordsGame.forEach((e) => {
      if (e.id === wordId) {
        if ((e.optional.progress === 3 && e.difficulty === 'No') || (e.optional.progress === 5 && e.difficulty === 'Yes')) {
          learn = 'Yes';
          const body: IUserWord = {
            difficulty: 'No',
            optional: {
              learnt: learn,
              progress: rightWrongAnswer,
            },
          };
          this.controllerUserWords.updateUserWord(userId, token, wordId, body);
        }
      }
    });
  }
}
