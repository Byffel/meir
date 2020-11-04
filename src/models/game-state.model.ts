import { DiceModel } from '@/models/dice.model';

export interface GameStateModel {
  name: string;
  availableOperations: string[];
  values: DiceModel;
  passValues: DiceModel;
  displayDice: boolean;
}

export class GameStateModelBuilder {
  private readonly gameState: GameStateModel;

  constructor() {
    this.gameState = {
      name: '',
      availableOperations: [],
      values: new DiceModel(0, 0),
      passValues: new DiceModel(0, 0),
      displayDice: false
    };
  }

  name(name: string): GameStateModelBuilder {
    this.gameState.name = name;
    return this;
  }

  addAvailableOperation(operation: string): GameStateModelBuilder {
    this.gameState.availableOperations.push(operation);
    return this;
  }

  addAvailableOperations(...operations: string[]): GameStateModelBuilder {
    operations.forEach(o => this.gameState.availableOperations.push(o));
    return this;
  }

  setValues(values: DiceModel): GameStateModelBuilder {
    this.gameState.values = values;
    return this;
  }

  setPassValues(passValues: DiceModel): GameStateModelBuilder {
    this.gameState.passValues = passValues;
    return this;
  }

  displayDice(): GameStateModelBuilder {
    this.gameState.displayDice = true;
    return this;
  }

  build(): GameStateModel {
    return this.gameState;
  }
}
