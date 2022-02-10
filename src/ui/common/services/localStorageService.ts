export enum LocalStorageKeys {
  'CURRENT_PAGE' = 'currPage',
  'CURRENT_GROUP' = 'currGroup',
}

export class LocalStorageService {
  public set<T>(key: LocalStorageKeys, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get<T>(key: LocalStorageKeys): T | null {
    const a = localStorage.getItem(key);
    if (a) {
      return JSON.parse(a);
    }
    return null;
  }

  public clear(): void {
    localStorage.clear();
  }
}
