import RX = require('reactxp');
import {TabView} from '../Tab';
import {ResourceSubscriberTabModel} from '../ResourceSubscriberTab';
import {IncomingMessage} from '../io/IncomingMessage';

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

export class HomeTabModel extends ResourceSubscriberTabModel<HomeTabState> {

  getName(): string {
    return 'Home';
  }

  getSubscribedResourceNames(): string[] {
    return ['onlinePlayers'];
  }

  getDefaultState(): HomeTabState {
    return {onlinePlayers: []};
  }

  onResourceUpdated(resourceName: string, data: any): void {
    if (resourceName == 'onlinePlayers') {
      this.update({onlinePlayers: data as string[]});
    }
  }

}
