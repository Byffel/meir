import { DiceModel } from '@/models/dice.model';
import { MeirValue } from '@/models/meir-value.enum';

type MeirValueStrings = keyof typeof MeirValue;

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

  public static toMeirValue(value: number): MeirValue {
    if (value === 21) {
      return MeirValue.MEIR;
    } else {
      const modifiedValue: number = value % 11 === 0 ? value * 10 : value;
      const key: MeirValueStrings = MeirValue[
        modifiedValue
      ] as MeirValueStrings;
      return MeirValue[key];
    }
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
