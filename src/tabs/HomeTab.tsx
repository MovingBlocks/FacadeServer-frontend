import RX = require('reactxp');
import TabModel from '../Tab';
import IncomingMessage from '../io/IncomingMessage';
import IncomingMessageType from '../io/IncomingMessageType';

interface HomeTabState {
  onlinePlayers?: string[]
}

export class HomeTabView extends RX.Component<{model: TabModel}, HomeTabState> {

  constructor(props: {model: TabModel}) {
      super(props);
      this.state = {onlinePlayers: []};
  }

  componentDidMount() {
    this.props.model.setUpdateViewCallback((newState) => this.setState(newState));
  }

  componentWillUnmount() {
    this.props.model.setUpdateViewCallback((newState) => {});
  }

  render() {
    return <RX.View>
      <RX.Text>There are currently {this.state.onlinePlayers.length} players online on this server:</RX.Text>
      {this.state.onlinePlayers.forEach((playerName) => <RX.Text>{playerName}</RX.Text>)}
    </RX.View>
  }
}

export class HomeTabModel extends TabModel {

  private updateView: (viewState: HomeTabState) => void;
  private state: HomeTabState = {onlinePlayers: []};

  private update(state: HomeTabState) {
    this.state = state;
    this.updateView(state);
  }

  getName(): string {
    return 'Home';
  }

  getObservedResources(): string[] {
    return ['onlinePlayers'];
  }

  onMessage(message: IncomingMessage): void {
    if (message.messageType == 'RESOURCE_CHANGED' && message.resourceName == 'onlinePlayers') {
      this.update({onlinePlayers: message.data as string[]});
    }
  }

  getState() {
    return this.state;
  }

  setUpdateViewCallback(callback: (viewState: HomeTabState) => void) {
    this.updateView = callback;
    this.updateView(this.state);
  }
}
