export interface MeirGameOperations {
  roll(): void;
  peak(): void;
  pass(): void;
  accuse(): void;
  restart(): void;
  hasOperation(operation: string): boolean;
}

export class MeirGame implements MeirGameOperations {
  private state: MeirState = new MeirStartedState();

  constructor() {
    this.logCurrentState();
  }

  roll(): void {
    this.state = this.state.roll();
    this.logCurrentState();
  }
  peak(): void {
    this.state = this.state.peak();
    this.logCurrentState();
  }
  pass(): void {
    this.state = this.state.pass();
    this.logCurrentState();
  }
  accuse(): void {
    this.state = this.state.accuse();
    this.logCurrentState();
  }
  restart(): void {
    this.state = this.state.restart();
    this.logCurrentState();
  }
  hasOperation(operation: string): boolean {
    return this.state.hasOperation(operation);
  }

  private logCurrentState(): void {
    console.log(this.state);
  }
}

abstract class MeirState implements MeirGameOperations {
  constructor(public name: string, private availableOperations: string[]) {}

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

  public hasOperation(operation: string): boolean {
    console.log(operation, this.availableOperations);
    return this.availableOperations.includes(operation);
  }
}

class MeirStartedState extends MeirState {
  constructor() {
    super('meirStarted', ['roll']);
  }
  public roll(): MeirState {
    return new RolledOnceState();
  }
}

class RolledOnceState extends MeirState {
  constructor() {
    super('rolledOnce', ['peak', 'pass']);
  }

  public peak(): MeirState {
    return new PeakedState();
  }

  public pass(): MeirState {
    return new PassedState();
  }
}

class PeakedState extends MeirState {
  constructor() {
    super('peaked', ['roll', 'pass']);
  }
  public roll(): MeirState {
    return new RolledTwiceState();
  }

  public pass(): MeirState {
    return new PassedState();
  }
}

class RolledTwiceState extends MeirState {
  constructor() {
    super('rolledTwice', ['pass']);
  }
  public pass(): MeirState {
    return new PassedState();
  }
}

class PassedState extends MeirState {
  constructor() {
    super('passed', ['roll', 'pass', 'accuse']);
  }
  public roll(): MeirState {
    return new RolledOnceState();
  }

  public pass(): MeirState {
    return new PassedState();
  }

  public accuse(): MeirState {
    return new GameOverState();
  }
}

class GameOverState extends MeirState {
  constructor() {
    super('gameOver', ['restart']);
  }

  public restart(): MeirStartedState {
    return new MeirStartedState();
  }
}
