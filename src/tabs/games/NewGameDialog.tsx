import RX = require("reactxp");
import Styles = require("../../styles/main");
import {AvailableModules} from "../../modules/AvailableModules";
import {ModuleSelector} from "../../modules/ModuleSelector";
import {WorldGenerator} from "../../modules/WorldGenerator";
import {OkCancelButtonBar} from "../../OkCancelButtonBar";

interface NewGameDialogProps {
  availableModules: AvailableModules;
  onOkCallback: (data: NewGameDialogState) => void;
}

export interface NewGameDialogState {
  gameName?: string;
  seed?: string;
  modules?: string[];
  worldGenerator?: string;
}

export class NewGameDialog extends RX.Component<NewGameDialogProps, NewGameDialogState> {

  public static show(availableModules: AvailableModules, cb: (data: NewGameDialogState) => void) {
    RX.Modal.show(<NewGameDialog availableModules={availableModules} onOkCallback={cb} />, "newGameDialog");
  }

  private static defaultModules: string[] = ["coresamplegameplay"];

  constructor(props: NewGameDialogProps) {
    super(props);
    this.state = {gameName: "New Game", seed: "blockmania", modules: [], worldGenerator: props.availableModules.worldGenerators[0].uri};
  }

  public render() {
    const defaultSelection: number[] = this.findModuleIndexes(NewGameDialog.defaultModules);
    const renderWorldGenerator = (worldGen: WorldGenerator) =>
      ({label: worldGen.displayName + " (" + worldGen.uri + ")", value: worldGen.uri});
    return (
      <RX.View style={Styles.whiteBox}>
        <RX.Text>Title:</RX.Text>
        <RX.TextInput style={Styles.whiteBox} value={this.state.gameName} onChangeText={(s) => this.setState({gameName: s})}/>
        <RX.Text>Seed:</RX.Text>
        <RX.TextInput style={Styles.whiteBox} value={this.state.seed} onChangeText={(s) => this.setState({seed: s})}/>
        <RX.Text>Modules:</RX.Text>
        <ModuleSelector
          onSelectionChange={this.onModuleSelectionChanged}
          availableModules={this.props.availableModules.modules}
          defaultEnabledModules={defaultSelection} />
        <RX.Text>World generator:</RX.Text>
        <RX.Picker
          style={Styles.whiteBox}
          items={this.props.availableModules.worldGenerators.map(renderWorldGenerator)}
          selectedValue={this.state.worldGenerator}
          onValueChange={(itemValue: string) => this.setState({worldGenerator: itemValue})} />
        <OkCancelButtonBar onOk={this.okClicked} onCancel={this.cancelClicked} />
      </RX.View>
    );
  }

  private okClicked = () => {
    this.props.onOkCallback(this.state);
    RX.Modal.dismiss("newGameDialog");
  }

  private cancelClicked = () => {
    RX.Modal.dismiss("newGameDialog");
  }

  private findModuleIndexes = (ids: string[]): number[] => {
    const result: number[] = [];
    const lowerCaseIds = ids.map((s) => s.toLowerCase());
    this.props.availableModules.modules.forEach((module, index) => {
      if (lowerCaseIds.indexOf(module.id.toLowerCase()) > -1) {
        result.push(index);
      }
    });
    return result;
  }

  private onModuleSelectionChanged = (indexes: number[]) => {
    const ids: string[] = [];
    indexes.forEach((index) => ids.push(this.props.availableModules.modules[index].id));
    this.setState({modules: ids});
  }
}
