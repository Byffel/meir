import { DiceModel } from '@/models/dice.model';
import { MeirValue } from '@/models/meir-value.enum';

export class MeirValueService {
  public static compare = (a: MeirValue, b: MeirValue): number => {
    return a - b;
  };

  public static toDiceModel(value: MeirValue): DiceModel {
    const digits: number[] = value
      .toString()
      .split('')
      .map(d => +d)
      .filter(d => d > 0);
    return new DiceModel(digits[0], digits[1]);
  }

  public static randomMeirValue(): MeirValue {
    return MeirValueService.randomEnum(MeirValue);
  }

  private static randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = (Object.keys(anEnum)
      .map(n => +n)
      .filter(n => !Number.isNaN(n)) as unknown) as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
  }
}
