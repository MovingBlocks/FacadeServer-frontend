import RX = require("reactxp");
import {EngineStateMetadata, EngineStateMetadataRenderer} from "../../io/EngineStateMetadata";
import {TabView} from "../TabView";
import {GamesTabState} from "./GamesTabState";

export class GamesTabView extends TabView<GamesTabState> {

  public render() {
    return (
      <RX.View>
        <RX.Text>Server status: {EngineStateMetadataRenderer.render(this.state.engineState)}</RX.Text>
      </RX.View>
    );
  }

}
