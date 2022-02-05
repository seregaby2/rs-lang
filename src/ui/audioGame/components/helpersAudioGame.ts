export class HelpersAudioGame {
  public shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  public getRandomInt(min: number, max: number): number {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);
    return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
  }
}
