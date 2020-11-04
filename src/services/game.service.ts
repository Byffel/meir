import {
  GameStateModel,
  GameStateModelBuilder
} from '@/models/game-state.model';
import { MeirValue } from '@/models/meir-value.enum';
import { MeirValueService } from '@/services/meir-value.service';

export interface MeirGameOperations {
  roll(): void;
  peak(): void;
  pass(passValue: MeirValue): void;
  accuse(): void;
  restart(): void;
  hasOperation(operation: string): boolean;
  displayDice(): boolean;
  getValue(): MeirValue;
}

export class MeirGame implements MeirGameOperations {
  private state: MeirState = new MeirStartedState();

  roll(): void {
    this.state = this.state.roll();
  }
  peak(): void {
    this.state = this.state.peak();
  }
  pass(passValue: MeirValue): void {
    this.state = this.state.pass(passValue);
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
  getValue(): MeirValue {
    return this.state.getValue();
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
  pass(passValue: MeirValue): MeirState {
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

  getValue(): MeirValue {
    if (!this.gameState.value) {
      throw new Error('value is not defined');
    }
    return this.gameState.value;
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
      .setValue(MeirValueService.randomMeirValue())
      .build();
    super(gameState);
  }

  public peak(): MeirState {
    return new PeakedState(this.getValue());
  }

  public pass(passValue: MeirValue): MeirState {
    return new PassedState(this.getValue(), passValue);
  }
}

class PeakedState extends MeirState {
  constructor(values: MeirValue) {
    const gameState = new GameStateModelBuilder()
      .name('peaked')
      .addAvailableOperations('roll', 'pass')
      .setValue(values)
      .displayDice()
      .build();
    super(gameState);
  }
  public roll(): MeirState {
    return new RolledTwiceState();
  }

  public pass(passValue: MeirValue): MeirState {
    return new PassedState(this.getValue(), passValue);
  }
}

class RolledTwiceState extends MeirState {
  constructor() {
    const gameState = new GameStateModelBuilder()
      .name('rolledTwice')
      .addAvailableOperations('pass')
      .setValue(MeirValueService.randomMeirValue())
      .build();
    super(gameState);
  }
  public pass(values: MeirValue): MeirState {
    return new PassedState(this.getValue(), values);
  }
}

class PassedState extends MeirState {
  constructor(values: MeirValue, passValue: MeirValue) {
    const gameState = new GameStateModelBuilder()
      .name('passed')
      .addAvailableOperations('roll', 'pass', 'accuse')
      .setValue(values)
      .setPassValue(passValue)
      .build();
    super(gameState);
  }
  public roll(): MeirState {
    return new RolledOnceState();
  }

  public pass(passValue: MeirValue): MeirState {
    return new PassedState(this.getValue(), passValue);
  }

  public accuse(): MeirState {
    return new GameOverState(this.getValue());
  }
}

class GameOverState extends MeirState {
  constructor(values: MeirValue) {
    const gameState = new GameStateModelBuilder()
      .name('gameOver')
      .addAvailableOperations('restart')
      .setValue(values)
      .build();
    super(gameState);
  }

  public restart(): MeirStartedState {
    return new MeirStartedState();
  }
}
