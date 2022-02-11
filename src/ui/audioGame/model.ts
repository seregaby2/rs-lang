import { IWordsData } from '../common/controller/model';

export type ResultType = Pick<IWordsData, 'audio' | 'word' | 'wordTranslate'>;
