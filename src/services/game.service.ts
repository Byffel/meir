import { DiceModel } from '@/models/dice.model';
import {
  GameStateModel,
  GameStateModelBuilder
} from '@/models/game-state.model';
import { NumberGenerator } from '@/services/number-generator.service';

export interface MeirGameOperations {
  roll(): void;
  peak(): void;
  pass(): void;
  accuse(): void;
  restart(): void;
  hasOperation(operation: string): boolean;
  displayDice(): boolean;
  getValues(): DiceModel;
}

export class MeirGame implements MeirGameOperations {
  private state: MeirState = new MeirStartedState();

  roll(): void {
    this.state = this.state.roll();
  }
  peak(): void {
    this.state = this.state.peak();
  }
  pass(): void {
    this.state = this.state.pass();
  }
  accuse(): void {
    this.state = this.state.accuse();
  }
  restart(): void {
    this.state = this.state.restart();
  }
  hasOperation(operation: string): boolean {
    return this.state.hasOperation(operation);
  }
  getValues(): DiceModel {
    return this.state.getValues();
  }
  displayDice(): boolean {
    return this.state.displayDice();
  }
}

abstract class MeirState implements MeirGameOperations {
  constructor(private gameState: GameStateModel) {}

  roll(): MeirState {
    throw new Error('Invalid operation');
  }
  peak(): MeirState {
    throw new Error('Invalid operation');
  }
  pass(): MeirState {
    throw new Error('Invalid operation');
  }
  accuse(): MeirState {
    throw new Error('Invalid operation');
  }
  restart(): MeirState {
    throw new Error('Invalid operation');
  }

  hasOperation(operation: string): boolean {
    return this.gameState.availableOperations.includes(operation);
  }

  getValues(): DiceModel {
    if (!this.gameState.values) {
      throw new Error('values are not defined');
    }
    return this.gameState.values;
  }

  displayDice(): boolean {
    return this.gameState.displayDice;
  }
}

class MeirStartedState extends MeirState {
  constructor() {
    const gameState = new GameStateModelBuilder()
      .name('meirStarted')
      .addAvailableOperations('roll')
      .build();
    super(gameState);
  }
  public roll(): MeirState {
    return new RolledOnceState();
  }
}

class RolledOnceState extends MeirState {
  constructor() {
    const gameState = new GameStateModelBuilder()
      .name('rolledOnce')
      .addAvailableOperations('peak', 'pass')
      .setValues(NumberGenerator.getRandomSortedDicePair())
      .build();
    super(gameState);
  }

  public peak(): MeirState {
    return new PeakedState(this.getValues());
  }

  public pass(): MeirState {
    return new PassedState(this.getValues());
  }
}

class PeakedState extends MeirState {
  constructor(values: DiceModel) {
    const gameState = new GameStateModelBuilder()
      .name('peaked')
      .addAvailableOperations('roll', 'pass')
      .setValues(values)
      .displayDice()
      .build();
    super(gameState);
  }
  public roll(): MeirState {
    return new RolledTwiceState();
  }

  public pass(): MeirState {
    return new PassedState(this.getValues());
  }
}

class RolledTwiceState extends MeirState {
  constructor() {
    const gameState = new GameStateModelBuilder()
      .name('rolledTwice')
      .addAvailableOperations('pass')
      .setValues(NumberGenerator.getRandomSortedDicePair())
      .build();
    super(gameState);
  }
  public pass(): MeirState {
    return new PassedState(this.getValues());
  }
}

class PassedState extends MeirState {
  constructor(values: DiceModel) {
    const gameState = new GameStateModelBuilder()
      .name('passed')
      .addAvailableOperations('roll', 'pass', 'accuse')
      .setValues(values)
      .build();
    super(gameState);
  }
  public roll(): MeirState {
    return new RolledOnceState();
  }

  public pass(): MeirState {
    return new PassedState(this.getValues());
  }

  public accuse(): MeirState {
    return new GameOverState(this.getValues());
  }
}

class GameOverState extends MeirState {
  constructor(values: DiceModel) {
    const gameState = new GameStateModelBuilder()
      .name('gameOver')
      .addAvailableOperations('restart')
      .setValues(values)
      .build();
    super(gameState);
  }

  public restart(): MeirStartedState {
    return new MeirStartedState();
  }
}
