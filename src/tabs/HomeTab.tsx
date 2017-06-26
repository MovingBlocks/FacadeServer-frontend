import RX = require('reactxp');
import {TabModel, TabView} from '../Tab';
import IncomingMessage from '../io/IncomingMessage';
import IncomingMessageType from '../io/IncomingMessageType';

interface HomeTabState {
  onlinePlayers?: string[]
}

export class HomeTabView extends TabView<HomeTabState> {

  render() {
    return <RX.View>
      <RX.Text>There are currently {this.state.onlinePlayers.length} players online on this server:</RX.Text>
      {this.state.onlinePlayers.map((playerName) => <RX.Text key={playerName}>{playerName}</RX.Text>)}
    </RX.View>
  }
}

export class HomeTabModel extends TabModel<HomeTabState> {

  getName(): string {
    return 'Home';
  }

  getObservedResources(): string[] {
    return ['onlinePlayers'];
  }

  getDefaultState(): HomeTabState {
    return {onlinePlayers: []};
  }

  onMessage(message: IncomingMessage): void {
    if (message.messageType == 'RESOURCE_CHANGED' && message.resourceName == 'onlinePlayers') {
      this.update({onlinePlayers: message.data as string[]});
    }
  }

}
