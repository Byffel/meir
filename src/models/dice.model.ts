export class DiceModel {
  constructor(public value1: number, public value2: number) {}

  public getSortedValues(): DiceModel {
    return this.value1 > this.value2
      ? new DiceModel(this.value1, this.value2)
      : new DiceModel(this.value2, this.value1);
  }
}
