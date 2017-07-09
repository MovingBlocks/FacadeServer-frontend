import RX = require("reactxp");
import Styles = require("../../Styles");
import {EngineStateMetadata, EngineStateMetadataRenderer} from "../../io/EngineStateMetadata";
import {TabView} from "../TabView";
import {GameInfo, GamesTabState, NameVersion, Version} from "./GamesTabState";

export class GamesTabView extends TabView<GamesTabState> {

  public render() {
    return (
      <RX.View>
        <RX.Text>Server status: {EngineStateMetadataRenderer.render(this.state.engineState)}</RX.Text>
        <RX.Text>Savegames on this server:</RX.Text>
        {this.state.games.map(this.renderGameInfo)}
      </RX.View>
    );
  }

  private renderGameInfo(game: GameInfo, gameIndex: number) {
    const metaServerbase = "http://meta.terasology.org/modules/show/";
    const renderVersion = (v: Version) => v.major + "." + v.minor + "." + v.patch + (v.snapshot ? "-SNAPSHOT" : "");
    const renderModule = (module: NameVersion, modIndex: number) => {
      const modName = module.name.originalName;
      const modVer = renderVersion(module.version);
      const link = metaServerbase + modName + "/" + modVer;
      return <RX.Text key={modIndex}>{(modIndex !== 0 ? ", " : "")}<RX.Link url={link}>{modName + " " + modVer}</RX.Link></RX.Text>;
    };
    return (
      <RX.View key={gameIndex} style={[Styles.box, Styles.greyBorder]}>
        <RX.Text>{game.manifest.title} - {game.timestamp}</RX.Text>
        <RX.Text>Time: {game.manifest.time} - Seed: {game.manifest.seed}</RX.Text>
        <RX.Text>Modules: {game.manifest.modules.map(renderModule)}</RX.Text>
      </RX.View>
    );
  }

}
