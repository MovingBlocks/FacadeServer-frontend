import RX = require("reactxp");
import Styles = require("../../styles/main");
import {ModuleMetadata} from "../../modules/ModuleMetadata";
import {TabView} from "../TabView";
import {InstallModulesDialog} from "./InstallModulesDialog";
import {ModulesTabController} from "./ModulesTabController";
import {ModulesTabState} from "./ModulesTabState";

export class ModulesTabView extends TabView<ModulesTabState> {

  public render() {
    const controller: ModulesTabController = this.props.model.getController() as ModulesTabController;
    const showInstallDialog = () => InstallModulesDialog.show(controller.installModules);
    return (
      <RX.View>
        <RX.Text>Module installer status: {this.state.installerStatus}</RX.Text>
        <RX.Button style={Styles.okButton} onPress={showInstallDialog}><RX.Text>Install new modules...</RX.Text></RX.Button>
        <RX.Text>Installed modules:</RX.Text>
        <RX.ScrollView>
          {this.state.installedModules.map(this.renderModule)}
        </RX.ScrollView>
      </RX.View>
    );
  }

  private renderModule(mod: ModuleMetadata) {
    return (
      <RX.View key={mod.id + "-" + mod.version}>
        <RX.Text>{mod.displayName.en + " " + mod.version}</RX.Text>
      </RX.View>
    );
  }

}
