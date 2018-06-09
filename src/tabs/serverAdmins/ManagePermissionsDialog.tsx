import RX = require("reactxp");
import Styles = require("../../styles/main");
import {CheckBox} from "../../components/CheckBox";
import {OkCancelButtonBar} from "../../OkCancelButtonBar";

interface ManagePermissionsDialogProps {
  okCallback: (clientId: string) => void;
}

interface ManagePermissionsDialogState {
  selectedClientId: string;
}

export class ManagePermissionsDialog extends RX.Component<ManagePermissionsDialogProps, ManagePermissionsDialogState> {

  public static show(okCallback: (clientId: string) => void) {
    RX.Modal.show(<ManagePermissionsDialog okCallback={okCallback} />, "addFromOnlinePlayersDialog");
  }

  public componentWillMount() {
    this.setState({selectedClientId: null});
  }

  public render() {
    // TODO: change onCheckedChange to allow changing commands (maybe use a state?)
    return (
      <RX.View style={Styles.whiteBox}>
        <RX.Text>Admin Permission Management</RX.Text>
        <CheckBox text={"Execute Console Cheat Commands"} onCheckedChange={undefined} checkedByDefault={false}/>
        <CheckBox text={"Execute Console User Management Commands"} onCheckedChange={undefined} checkedByDefault={false}/>
        <CheckBox text={"Execute Console Server Management Commands"} onCheckedChange={undefined} checkedByDefault={false}/>
        <CheckBox text={"Execute Console Debug Commands"} onCheckedChange={undefined} checkedByDefault={false}/>
        <CheckBox text={"Install Modules"} onCheckedChange={undefined} checkedByDefault={false}/>
        <CheckBox text={"Create/Backup/Rename Games"} onCheckedChange={undefined} checkedByDefault={false}/>
        <CheckBox text={"Stop Games"} onCheckedChange={undefined} checkedByDefault={false}/>
        <CheckBox text={"Delete Games"} onCheckedChange={undefined} checkedByDefault={false}/>
        <CheckBox text={"Change Settings"} onCheckedChange={undefined} checkedByDefault={false}/>
        <CheckBox text={"User Management"} onCheckedChange={undefined} checkedByDefault={false}/>
        <CheckBox text={"Admin Management"} onCheckedChange={undefined} checkedByDefault={false}/>
        <OkCancelButtonBar onOk={this.onOk} onCancel={this.onCancel} />
      </RX.View>
    );
  }

  private onOk = () => {
    this.props.okCallback(this.state.selectedClientId);
    RX.Modal.dismiss("addFromOnlinePlayersDialog");
  }

  private onCancel = () => {
    RX.Modal.dismiss("addFromOnlinePlayersDialog");
  }
}
