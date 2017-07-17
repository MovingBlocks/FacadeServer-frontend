import RX = require("reactxp");
import Styles = require("../../Styles");
import {Module} from "../../modules/Module";
import {ModuleSelector} from "../../modules/ModuleSelector";

interface NewGameDialogProps {
  availableModules: Module[];
  onOkCallback: (data: NewGameDialogState) => void;
}

export interface NewGameDialogState {
  gameName?: string;
  seed?: string;
  modules?: string[];
  worldGenerator?: string;
}

export class NewGameDialog extends RX.Component<NewGameDialogProps, NewGameDialogState> {

  public static show(availableModules: Module[], cb: (data: NewGameDialogState) => void) {
    RX.Modal.show(<NewGameDialog availableModules={availableModules} onOkCallback={cb} />, "newGameDialog");
  }

  private static defaultModules: string[] = ["coresamplegameplay"];

  constructor(props: NewGameDialogProps) {
    super(props);
    this.state = {gameName: "New Game", seed: "blockmania", modules: [], worldGenerator: "Core:FacetedPerlin"};
  }

  public render() {
    const defaultSelection: number[] = this.findModuleIndexes(NewGameDialog.defaultModules);
    return (
      <RX.View style={[Styles.box, Styles.greyBorder, Styles.dialog]}>
        <RX.Text>Title:</RX.Text>
        <RX.TextInput
          style={[Styles.box, Styles.greyBorder]}
          value={this.state.gameName}
          onChangeText={(s) => this.setState({gameName: s})}/>
        <RX.Text>Seed:</RX.Text>
        <RX.TextInput
          style={[Styles.box, Styles.greyBorder]}
          value={this.state.seed}
          onChangeText={(s) => this.setState({seed: s})}/>
        <RX.Text>Modules:</RX.Text>
        <ModuleSelector
          onSelectionChange={this.onModuleSelectionChanged}
          availableModules={this.props.availableModules}
          defaultEnabledModules={defaultSelection} />
        <RX.Text>World generator URI:</RX.Text>
        <RX.TextInput
          style={[Styles.box, Styles.greyBorder]}
          value={this.state.worldGenerator}
          onChangeText={(s) => this.setState({worldGenerator: s})}/>
        <RX.View style={Styles.consoleInputView/*TODO fix styles*/}>
          <RX.Button onPress={() => this.okClicked()} style={[Styles.box, Styles.greyBorder, Styles.okButton]}>OK</RX.Button>
          <RX.Button onPress={() => this.cancelClicked()} style={[Styles.box, Styles.greyBorder, Styles.cancelButton]}>Cancel</RX.Button>
        </RX.View>
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
    this.props.availableModules.forEach((module, index) => {
      if (lowerCaseIds.indexOf(module.id.toLowerCase()) > -1) {
        result.push(index);
      }
    });
    return result;
  }

  private onModuleSelectionChanged = (indexes: number[]) => {
    const ids: string[] = [];
    indexes.forEach((index) => ids.push(this.props.availableModules[index].id));
    this.setState({modules: ids});
  }
}
