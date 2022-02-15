export class LocalStorageService {
  public set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): string {
    const item = localStorage.getItem(key);
    if (item) {
      return item;
    }
    return '';
  }

  public clear(): void {
    localStorage.clear();
  }
}
