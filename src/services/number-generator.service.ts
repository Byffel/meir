import { DiceModel } from '@/models/dice.model';

export class NumberGenerator {
  private static getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
  }

  public static getRandomSortedDicePair() {
    return new DiceModel(
      this.getRandomInt(6),
      this.getRandomInt(6)
    ).getSortedValues();
  }
}
