import RX = require("reactxp");
import {EngineStateMetadata, EngineStateMetadataUtils} from "../../io/EngineStateMetadata";
import {OnlinePlayerMetadata, RgbaColor} from "../../io/OnlinePlayerMetadata";
import {TabView} from "../TabView";
import {HomeTabState} from "./HomeTabState";

export class HomeTabView extends TabView<HomeTabState> {

  public render() {
    // TODO: handle style leaks
    const renderColorString = (color: RgbaColor) => "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
    const createColorStyle = (color: RgbaColor) => RX.Styles.createTextStyle({color: renderColorString(color)});
    return (
      <RX.View>
        <RX.Text>Server status: {EngineStateMetadataUtils.render(this.state.engineState)}</RX.Text>
        <RX.Text>MOTD (Message Of The Day): {this.state.serverMotd}</RX.Text>
        <RX.Text>This server listens on port {this.state.serverPort}.</RX.Text>
        <RX.Text>There are currently {this.state.onlinePlayers.length} players online on this server:</RX.Text>
        {this.state.onlinePlayers.map((player) => <RX.Text key={player.id} style={createColorStyle(player.color)}>{player.name}</RX.Text>)}
      </RX.View>
    );
  }

}
