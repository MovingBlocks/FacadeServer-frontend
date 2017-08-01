import RX = require("reactxp");
import Styles = require("../../styles/main");
import {Module} from "../../modules/Module";
import {TabView} from "../TabView";
import {ModulesTabController} from "./ModulesTabController";
import {ModulesTabState} from "./ModulesTabState";

export class ModulesTabView extends TabView<ModulesTabState> {

  public render() {
    // const controller: ModulesTabController = this.props.model.getController() as ModulesTabController;
    return (
      <RX.View>
        <RX.Text>Module installer status: {this.state.installerStatus}</RX.Text>
        <RX.Text>Installed modules:</RX.Text>
        <RX.ScrollView>
          {this.state.installedModules.modules.map(this.renderModule)}
        </RX.ScrollView>
      </RX.View>
    );
  }

  private renderModule(mod: Module) {
    return (
      <RX.View key={mod.id + "-" + mod.version}>
        <RX.Text>{mod.displayName.en + " " + mod.version}</RX.Text>
      </RX.View>
    );
  }

}
