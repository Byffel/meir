import { MeirValue } from '@/models/meir-value.enum';

export interface GameStateModel {
  name: string;
  availableOperations: string[];
  value: MeirValue;
  passValue: MeirValue;
  displayPassValue: boolean;
  displayDice: boolean;
}

export class GameStateModelBuilder {
  private readonly gameState: GameStateModel;

  constructor() {
    this.gameState = {
      name: '',
      availableOperations: [],
      value: MeirValue.THIRTY_ONE,
      passValue: MeirValue.THIRTY_ONE,
      displayPassValue: false,
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

  setValue(value: MeirValue): GameStateModelBuilder {
    this.gameState.value = value;
    return this;
  }

  setPassValue(passValue: MeirValue): GameStateModelBuilder {
    this.gameState.passValue = passValue;
    return this;
  }

  displayPassValue(): GameStateModelBuilder {
    this.gameState.displayPassValue = true;
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
