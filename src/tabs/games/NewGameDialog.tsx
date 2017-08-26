import RX = require("reactxp");
import Styles = require("../../styles/main");
import {ModuleMetadata} from "../../modules/ModuleMetadata";
import {ModuleSelector} from "../../modules/ModuleSelector";
import {WorldGeneratorInfo} from "../../modules/WorldGeneratorInfo";
import {OkCancelButtonBar} from "../../OkCancelButtonBar";
import {RandomStringGenerator} from "../../RandomStringGenerator";
import {NewGameMetadata} from "./NewGameMetadata";

interface NewGameDialogProps {
  availableModules: ModuleMetadata[];
  availableWorldGenerators: WorldGeneratorInfo[];
  onOkCallback: (data: NewGameMetadata) => void;
}

export class NewGameDialog extends RX.Component<NewGameDialogProps, NewGameMetadata> {

  public static show(availableModules: ModuleMetadata[], availableWorldGenerators: WorldGeneratorInfo[],
                     cb: (data: NewGameMetadata) => void) {
    const dialog = (
      <NewGameDialog
        availableModules={availableModules}
        availableWorldGenerators={availableWorldGenerators}
        onOkCallback={cb} />
    );
    RX.Modal.show(dialog, "newGameDialog");
  }

  private static defaultModules: string[] = ["coresamplegameplay"];

  constructor(props: NewGameDialogProps) {
    super(props);
    this.state = {
      gameName: "New Game",
      modules: [],
      seed: RandomStringGenerator.generate(32),
      worldGenerator: props.availableWorldGenerators[0].uri,
    };
  }

  public render() {
    const defaultSelection: number[] = this.findModuleIndexes(NewGameDialog.defaultModules);
    const renderWorldGenerator = (worldGen: WorldGeneratorInfo) =>
      ({label: worldGen.displayName + " (" + worldGen.uri + ")", value: worldGen.uri});
    return (
      <RX.View style={Styles.whiteBox}>
        <RX.Text>Title:</RX.Text>
        <RX.TextInput style={Styles.whiteBox} value={this.state.gameName} onChangeText={(s) => this.setState({gameName: s})}/>
        <RX.Text>Seed:</RX.Text>
        <RX.View style={Styles.flex.row}>
          <RX.TextInput style={[Styles.whiteBox, Styles.flex.fill]} value={this.state.seed} onChangeText={(s) => this.setState({seed: s})}/>
          <RX.Button style={Styles.okButton} onPress={() => this.setState({seed: RandomStringGenerator.generate(32)})}>
            <RX.Text>Randomize</RX.Text>
          </RX.Button>
        </RX.View>
        <RX.Text>Modules:</RX.Text>
        <ModuleSelector
          onSelectionChange={this.onModuleSelectionChanged}
          availableModules={this.props.availableModules}
          defaultEnabledModules={defaultSelection} />
        <RX.Text>World generator:</RX.Text>
        <RX.Picker
          style={Styles.whiteBox}
          items={this.props.availableWorldGenerators.map(renderWorldGenerator)}
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
