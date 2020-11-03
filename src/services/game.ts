export interface MeirGameOperations {
  roll(): void;
  peak(): void;
  pass(): void;
  accuse(): void;
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

  private logCurrentState(): void {
    console.log(this.state);
  }
}

abstract class MeirState implements MeirGameOperations {
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
}

class MeirStartedState extends MeirState {
  public roll(): MeirState {
    return new RolledOnceState();
  }
}

class RolledOnceState extends MeirState {
  public peak(): MeirState {
    return new PeakedState();
  }

  public pass(): MeirState {
    return new PassedState();
  }
}

class PeakedState extends MeirState {
  public roll(): MeirState {
    return new RolledTwiceState();
  }

  public pass(): MeirState {
    return new PassedState();
  }
}

class RolledTwiceState extends MeirState {
  public pass(): MeirState {
    return new PassedState();
  }
}

class PassedState extends MeirState {
  public roll(): MeirState {
    return new RolledTwiceState();
  }

  public pass(): MeirState {
    return new PassedState();
  }

  public accuse(): MeirState {
    return new GameOverState();
  }
}

class GameOverState extends MeirState {}
