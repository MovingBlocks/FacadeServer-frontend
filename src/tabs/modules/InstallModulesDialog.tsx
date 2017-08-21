import RX = require("reactxp");
import Styles = require("../../styles/main");
import {MetaServerApiClient} from "../../modules/MetaServerApiClient";
import {Module} from "../../modules/Module";
import {ModuleSelector} from "../../modules/ModuleSelector";
import {OkCancelButtonBar} from "../../OkCancelButtonBar";
import {WaitOverlay} from "../../WaitOverlay";

interface InstallModulesDialogProps {
  moduleList: Module[];
  installCallback: (moduleIds: string[]) => void;
}

interface InstallModulesDialogState {
  selectedModules: number[]; // list of indices
}

export class InstallModulesDialog extends RX.Component<InstallModulesDialogProps, InstallModulesDialogState> {

  public static show(installCallback: (moduleIds: string[]) => void) {
    WaitOverlay.open("Retrieving list of available modules from meta.terasology.org...");
    MetaServerApiClient.getInstance().getAllModules().then((result: Module[]) => {
      WaitOverlay.close();
      RX.Modal.show(<InstallModulesDialog moduleList={result} installCallback={installCallback} />, "installModulesDialog");
    });
  }

  constructor(props: InstallModulesDialogProps) {
    super(props);
  }

  public componentWillMount() {
    this.setState({selectedModules: []});
  }

  public render() {
    return (
      <RX.View style={Styles.whiteBox}>
        <RX.Text>Choose modules to install:</RX.Text>
        <ModuleSelector
          availableModules={this.props.moduleList}
          defaultEnabledModules={this.state.selectedModules}
          onSelectionChange={this.onChange} />
        <OkCancelButtonBar onOk={this.okClicked} onCancel={this.cancelClicked} okLabel="Install selected modules and dependencies" />
      </RX.View>
    );
  }

  private onChange = (selectedModules: number[]) => {
    this.setState({selectedModules});
  }

  private okClicked = () => {
    const selectedModulesIds: string[] = [];
    this.props.moduleList.forEach((mod: Module, i: number) => {
      if (this.state.selectedModules.indexOf(i) > -1) {
        selectedModulesIds.push(mod.id);
      }
    });
    this.props.installCallback(selectedModulesIds);
    RX.Modal.dismiss("installModulesDialog");
  }

  private cancelClicked = () => {
    RX.Modal.dismiss("installModulesDialog");
  }

}
