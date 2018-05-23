import RX = require("reactxp");
import Styles = require("../../styles/main");
import {EngineStateMetadata, EngineStateMetadataUtils} from "../../io/EngineStateMetadata";
import {OnlinePlayerMetadata, RgbaColor} from "../../io/OnlinePlayerMetadata";
import {SystemMetadataUtils} from "../../io/SystemMetadata";
import {TabView} from "../TabView";
import {HomeTabState} from "./HomeTabState";

export class HomeTabView extends TabView<HomeTabState> {

  public render() {
    // TODO: handle style leaks
    const renderColorString = (color: RgbaColor) => "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
    const createColorStyle = (color: RgbaColor) => RX.Styles.createTextStyle({color: renderColorString(color)});
    return (
      <RX.View>
        <RX.Button onPress={this.updateValues} style={Styles.okButton}><RX.Text>Refresh</RX.Text></RX.Button>
        <RX.Text>Server status: {EngineStateMetadataUtils.render(this.state.engineState)}</RX.Text>
        <RX.Text>MOTD (Message Of The Day): {this.state.serverMotd}</RX.Text>
        <RX.Text>This server listens on port {this.state.serverPort}.</RX.Text>
        <RX.Text>There are currently {this.state.onlinePlayers.length} players online on this server:</RX.Text>
        {this.state.onlinePlayers.map((player) => <RX.Text key={player.id} style={createColorStyle(player.color)}>{player.name}</RX.Text>)}
        <RX.Text/>
        <RX.Text>CPU usage: {this.state.system.cpuUsage.toPrecision(4)}%</RX.Text>
        <RX.Text>Memory usage: {this.state.system.memoryUsagePercentage.toPrecision(4)}%</RX.Text>
        <RX.Text>Memory used/total: {SystemMetadataUtils.memoryStringFormat(this.state.system.memoryUsed)} /
          {SystemMetadataUtils.memoryStringFormat(this.state.system.memoryTotal)},
          {" " + SystemMetadataUtils.memoryStringFormat(this.state.system.memoryAvailable)} available</RX.Text>
        <RX.Text>Server uptime: {SystemMetadataUtils.systemUptimeFormat(this.state.system.serverUptime)}</RX.Text>
      </RX.View>
    );
  }

  public updateValues = () => {
    this.props.model.requestUpdateValues(["system"]);
    this.props.model.requestUpdateValues(["engineState"]);
    this.props.model.requestUpdateValues(["onlinePlayers"]);
  }

}
