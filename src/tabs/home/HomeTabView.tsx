import RX = require("reactxp");
import {EngineStateMetadata, EngineStateMetadataUtils} from "../../io/EngineStateMetadata";
import {TabView} from "../TabView";
import {HomeTabState} from "./HomeTabState";

export class HomeTabView extends TabView<HomeTabState> {

  public render() {
    return (
      <RX.View>
        <RX.Text>Server status: {EngineStateMetadataUtils.render(this.state.engineState)}</RX.Text>
        <RX.Text>MOTD (Message Of The Day): {this.state.serverMotd}</RX.Text>
        <RX.Text>This server listens on port {this.state.serverPort}.</RX.Text>
        <RX.Text>There are currently {this.state.onlinePlayers.length} players online on this server:</RX.Text>
        {this.state.onlinePlayers.map((playerName) => <RX.Text key={playerName}>{playerName}</RX.Text>)}
      </RX.View>
    );
  }

}
