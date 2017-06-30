import RX = require('reactxp');
import {IncomingMessage} from './io/IncomingMessage'

export abstract class TabView<StateType> extends RX.Component<{model: TabModel<StateType>}, StateType> {

  constructor(props: {model: TabModel<StateType>}) {
      super(props);
      this.state = props.model.getState()
  }

  componentDidMount() {
    this.props.model.setUpdateViewCallback((newState: StateType) => this.setState(newState));
  }

  componentWillUnmount() {
    this.props.model.setUpdateViewCallback((newState: StateType) => {});
  }

}

export abstract class TabModel<StateType> {

  //TODO: data must not be any but OutgoingMessage
  protected sendData: (data: any) => void = () => {/*TODO: notify that connection isn't ready*/};
  private updateView: (viewState: StateType) => void;
  private state: StateType = this.getDefaultState();

  abstract getName(): string;
  abstract getDefaultState(): StateType;
  abstract onMessage(message: IncomingMessage): void;

  initialize(): void {
    //does nothing by default, but can be overridden in subclasses
  }

  getState(): StateType {
    return this.state;
  }

  setUpdateViewCallback(callback: (viewState: StateType) => void) {
    this.updateView = callback;
    this.updateView(this.state);
  }

  setSendDataCallback(callback: (data: any) => void) {
    this.sendData = callback;
  }

  protected update(state: StateType) {
    this.state = state;
    this.updateView(state);
  }
}
