import {IncomingMessage} from "../io/IncomingMessage";

export abstract class TabModel<StateType> {

  // TODO: data must not be any but OutgoingMessage
  private updateView: (viewState: StateType) => void;
  private state: StateType = this.getDefaultState();

  public abstract getName(): string;
  public abstract getDefaultState(): StateType;
  public abstract onMessage(message: IncomingMessage): void;

  public initialize(): void {
    // does nothing by default, but can be overridden in subclasses
  }

  public getState(): StateType {
    return this.state;
  }

  public setUpdateViewCallback(callback: (viewState: StateType) => void) {
    this.updateView = callback;
    this.updateView(this.state);
  }

  public setSendDataCallback(callback: (data: any) => void) {
    this.sendData = callback;
  }

  protected sendData: (data: any) => void = () => {/*TODO: notify that connection isn't ready*/};

  protected update(state: StateType) {
    this.state = state;
    this.updateView(state);
  }
}
