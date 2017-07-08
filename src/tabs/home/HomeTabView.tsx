import RX = require("reactxp");
import {TabView} from "../TabView";
import {EngineStateMetadata, HomeTabState} from "./HomeTabState";

export class HomeTabView extends TabView<HomeTabState> {

  public render() {
    return (
      <RX.View>
        <RX.Text>Server status: {this.renderStateString(this.state.engineState)}</RX.Text>
        <RX.Text>There are currently {this.state.onlinePlayers.length} players online on this server:</RX.Text>
        {this.state.onlinePlayers.map((playerName) => <RX.Text key={playerName}>{playerName}</RX.Text>)}
      </RX.View>
    );
  }

  private renderStateString(engineState: EngineStateMetadata): string {
    return this.capitalizeFirst(this.state.engineState.state) + " " + this.emptyIfUndefinedOrNull(this.state.engineState.gameName);
  }

  private capitalizeFirst(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  private emptyIfUndefinedOrNull(input: string): string {
    return input ? input : "";
  }
}
