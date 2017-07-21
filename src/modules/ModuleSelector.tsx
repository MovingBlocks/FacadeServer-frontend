import RX = require("reactxp");
import Styles = require("../styles/main");
import {Module} from "./Module";

interface ModuleSelectorProps {
  defaultEnabledModules: number[]; // list of indexes of the availableModules array
  availableModules: Module[];
  onSelectionChange: (selectedModules: number[]) => void;
}

interface ModuleSelectorState {
  enabledModules: number[];
}

export class ModuleSelector extends RX.Component<ModuleSelectorProps, ModuleSelectorState> {

  constructor(props: ModuleSelectorProps) {
    super(props);
    this.state = {enabledModules: props.defaultEnabledModules};
  }

  public componentWillMount() {
    this.props.onSelectionChange(this.state.enabledModules);
  }

  public render() {
    return (
      <RX.View style={Styles.flex.row}>
        <RX.View>
          <RX.Text>Enabled (click to disable)</RX.Text>
          <RX.ScrollView style={[Styles.whiteBox, Styles.verticalScroll]}>
            {this.state.enabledModules.map((i, localIndex) => this.renderModule(this.props.availableModules[i], this.remove(localIndex)))}
          </RX.ScrollView>
        </RX.View>
        <RX.View>
          <RX.Text>All (click to enable)</RX.Text>
          <RX.ScrollView style={[Styles.whiteBox, Styles.verticalScroll]}>
            {this.props.availableModules.map((module, localIndex) => this.renderModule(module, this.add(localIndex)))}
          </RX.ScrollView>
        </RX.View>
      </RX.View>
    );
  }

  private renderModule(mod: Module, onClick: () => void) {
    return <RX.View key={mod.id} onPress={onClick}><RX.Text>{mod.displayName.en}</RX.Text></RX.View>;
  }

  private remove = (i: number) => () => {
    this.state.enabledModules.splice(i, 1);
    this.setState(this.state); // refresh
    this.props.onSelectionChange(this.state.enabledModules);
  }

  private add = (i: number) => () => {
    this.state.enabledModules.push(i);
    this.setState(this.state); // refresh
    this.props.onSelectionChange(this.state.enabledModules);
  }

}
