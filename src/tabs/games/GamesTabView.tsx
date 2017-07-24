import RX = require("reactxp");
import Styles = require("../../styles/main");
import {EngineStateMetadata, EngineStateMetadataRenderer} from "../../io/EngineStateMetadata";
import {TabView} from "../TabView";
import {GamesTabController} from "./GamesTabController";
import {GameInfo, GamesTabState, NameVersion} from "./GamesTabState";
import {NewGameDialog} from "./NewGameDialog";

export class GamesTabView extends TabView<GamesTabState> {

  public render() {
    const controller: GamesTabController = this.props.model.getController() as GamesTabController;
    const showNewGameDialog = () => NewGameDialog.show(this.state.availableModules, controller.newGame);
    return (
      <RX.ScrollView>
        <RX.Text>Server status: {EngineStateMetadataRenderer.render(this.state.engineState)}</RX.Text>
        <RX.Button style={Styles.okButton} onPress={showNewGameDialog}><RX.Text>New game</RX.Text></RX.Button>
        <RX.Text>Savegames on this server:</RX.Text>
          {this.state.games.map((game: GameInfo, i: number) => this.renderGameInfo(game, i, controller))}
      </RX.ScrollView>
    );
  }

  private renderGameInfo(game: GameInfo, gameIndex: number, controller: GamesTabController) {
    const engineState: EngineStateMetadata = this.state.engineState;
    const metaServerbase = "http://meta.terasology.org/modules/show/";
    const renderModule = (module: NameVersion, modIndex: number) => {
      const link = metaServerbase + module.name + "/" + module.version;
      return (
        <RX.Text key={modIndex}>
          {(modIndex !== 0 ? ", " : "")}<RX.Link url={link}>{module.name + " " + module.version}</RX.Link>
        </RX.Text>
      );
    };
    const stopButton = (
      <RX.Button style={Styles.cancelButton}
        onPress={() => controller.stopGame()}><RX.Text>Stop</RX.Text></RX.Button>
    );
    const startButton = (
      <RX.Button style={Styles.okButton}
      onPress={() => controller.startGame(game.manifest.title)}><RX.Text>Start</RX.Text></RX.Button>
    );
    const startStopButton = game.manifest.title === engineState.gameName ? stopButton : startButton;
    return (
      <RX.View key={gameIndex} style={Styles.whiteBox}>
        <RX.Text>{game.manifest.title} - {game.timestamp}</RX.Text>
        <RX.Text>Time: {game.manifest.time} - Seed: {game.manifest.seed}</RX.Text>
        <RX.Text>Modules: {game.manifest.modules.map(renderModule)}</RX.Text>
        <RX.View style={Styles.flex.row}>
          {startStopButton}
          <RX.Button style={Styles.okButton}
            onPress={() => controller.backupGame(game.manifest.title)}><RX.Text>Backup</RX.Text></RX.Button>
          <RX.Button style={Styles.okButton}
            onPress={() => controller.deleteGame(game.manifest.title)}><RX.Text>Delete</RX.Text></RX.Button>
          <RX.Button style={Styles.okButton}
            onPress={() => controller.renameGame(game.manifest.title)}><RX.Text>Rename</RX.Text></RX.Button>
        </RX.View>
      </RX.View>
    );
  }

}
