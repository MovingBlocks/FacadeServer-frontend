import RX = require("reactxp");
import {EngineStateMetadataUtils} from "../../io/EngineStateMetadata";
import {RgbaColor} from "../../io/OnlinePlayerMetadata";
import {SystemMetadataUtils} from "../../io/SystemMetadata";
import {TabView} from "../TabView";
import {HomeTabState} from "./HomeTabState";

export class HomeTabView extends TabView<HomeTabState> {

  public render() {
    // TODO: handle style leaks
    const renderColorString = (color: RgbaColor) => "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
    const createColorStyle = (color: RgbaColor) => RX.Styles.createTextStyle({color: renderColorString(color)});
    const system = this.state.system;
    return (
      <RX.View>
        <RX.Text>Server status: {EngineStateMetadataUtils.render(this.state.engineState)}</RX.Text>
        <RX.Text>MOTD (Message Of The Day): {this.state.serverMotd}</RX.Text>
        <RX.Text>This server listens on port {this.state.serverPort}.</RX.Text>
        <RX.Text>There are currently {this.state.onlinePlayers.length} players online on this server:</RX.Text>
        {this.state.onlinePlayers.map((player) => <RX.Text key={player.id} style={createColorStyle(player.color)}>{player.name}</RX.Text>)}
        <RX.Text/>
        <RX.Text>CPU usage: {system.cpuUsage.toPrecision(4)}%</RX.Text>
        <RX.Text>Memory usage: {system.memoryMax === 0 ? 0 : (system.memoryUsed * 100 / system.memoryMax).toPrecision(4)}%</RX.Text>
        <RX.Text>Memory used/total: {SystemMetadataUtils.memoryStringFormat(system.memoryUsed)}/
          {SystemMetadataUtils.memoryStringFormat(system.memoryMax)},
          {" " + SystemMetadataUtils.memoryStringFormat(system.memoryMax - system.memoryUsed)} available</RX.Text>
        <RX.Text>JVM Memory used/total: {SystemMetadataUtils.memoryStringFormat(system.jvmMemoryUsed)}/
          {SystemMetadataUtils.memoryStringFormat(system.jvmMemoryMax)},
          {" " + SystemMetadataUtils.memoryStringFormat(system.jvmMemoryMax - system.jvmMemoryUsed)} available</RX.Text>
        <RX.Text>Server uptime: {SystemMetadataUtils.serverUptimeFormat(system.serverUptime)}</RX.Text>
      </RX.View>
    );
  }

}
