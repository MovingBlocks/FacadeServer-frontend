import RX = require("reactxp");
import {TabView} from "../TabView";
import {HomeTabState} from "./HomeTabState";

export class HomeTabView extends TabView<HomeTabState> {

  public render() {
    return (
      <RX.View>
        <RX.Text>There are currently {this.state.onlinePlayers.length} players online on this server:</RX.Text>
        {this.state.onlinePlayers.map((playerName) => <RX.Text key={playerName}>{playerName}</RX.Text>)}
      </RX.View>
    );
  }
}
