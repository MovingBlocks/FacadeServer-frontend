/* tslint:disable:max-line-length */ // TODO: remove when styles are fixed

import RX = require("reactxp");
import Styles = require("../../Styles");
import {EngineStateMetadata, EngineStateMetadataRenderer} from "../../io/EngineStateMetadata";
import {TabView} from "../TabView";
import {GamesTabController} from "./GamesTabController";
import {GameInfo, GamesTabState, NameVersion, Version} from "./GamesTabState";
import {NewGameDialog} from "./NewGameDialog";

export class GamesTabView extends TabView<GamesTabState> {

  public render() {
    const controller: GamesTabController = this.props.model.getController() as GamesTabController;
    const showNewGameDialog = () => NewGameDialog.show(this.state.availableModules, controller.newGame);
    return (
      <RX.View>
        <RX.Text>Server status: {EngineStateMetadataRenderer.render(this.state.engineState)}</RX.Text>
        <RX.Button style={[Styles.box, Styles.greyBorder, Styles.okButton]} onPress={showNewGameDialog}>New game</RX.Button>
        <RX.Text>Savegames on this server:</RX.Text>
        {this.state.games.map((game: GameInfo, i: number) => this.renderGameInfo(game, i, controller))}
      </RX.View>
    );
  }

  private renderGameInfo(game: GameInfo, gameIndex: number, controller: GamesTabController) {
    const engineState: EngineStateMetadata = this.state.engineState;
    const metaServerbase = "http://meta.terasology.org/modules/show/";
    const renderVersion = (v: Version) => v.major + "." + v.minor + "." + v.patch + (v.snapshot ? "-SNAPSHOT" : "");
    const renderModule = (module: NameVersion, modIndex: number) => {
      const modName = module.name;
      const modVer = renderVersion(module.version);
      const link = metaServerbase + modName + "/" + modVer;
      return <RX.Text key={modIndex}>{(modIndex !== 0 ? ", " : "")}<RX.Link url={link}>{modName + " " + modVer}</RX.Link></RX.Text>;
    };
    const stopButton = <RX.Button style={[Styles.box, Styles.greyBorder, Styles.cancelButton]} onPress={() => controller.stopGame()}>Stop</RX.Button>;
    const startButton = <RX.Button style={[Styles.box, Styles.greyBorder, Styles.okButton]} onPress={() => controller.startGame(game.manifest.title)}>Start</RX.Button>;
    const startStopButton = game.manifest.title === engineState.gameName ? stopButton : startButton;
    return (
      <RX.View key={gameIndex} style={[Styles.box, Styles.greyBorder]}>
        <RX.Text>{game.manifest.title} - {game.timestamp}</RX.Text>
        <RX.Text>Time: {game.manifest.time} - Seed: {game.manifest.seed}</RX.Text>
        <RX.Text>Modules: {game.manifest.modules.map(renderModule)}</RX.Text>
        <RX.View style={Styles.consoleInputView/*TODO fix styles*/}>
          {startStopButton}
          <RX.Button style={[Styles.box, Styles.greyBorder, Styles.okButton]} onPress={() => controller.backupGame(game.manifest.title)}>Backup</RX.Button>
          <RX.Button style={[Styles.box, Styles.greyBorder, Styles.okButton]} onPress={() => controller.deleteGame(game.manifest.title)}>Delete</RX.Button>
        </RX.View>
      </RX.View>
    );
  }

}
