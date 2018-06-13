import RX = require("reactxp");
import Styles = require("../../styles/main");
import {CheckBox} from "../../components/CheckBox";
import {OkCancelButtonBar} from "../../OkCancelButtonBar";
import {AdminPermissions} from "./ServerAdminsTabState";

interface ManagePermissionsDialogProps {
  adminId: string;
  okCallback: (adminId: string, newPermissions: AdminPermissions) => void;
  adminPermissions: AdminPermissions;
}

export class ManagePermissionsDialog extends RX.Component<ManagePermissionsDialogProps, null> {

  public static show(adminId: string, okCallback: (adminId: string, newPermissions: AdminPermissions) => void,
                     adminPermissions: AdminPermissions) {
    RX.Modal.show(
      <ManagePermissionsDialog adminId={adminId} okCallback={okCallback} adminPermissions={adminPermissions} />, "managePermissionsDialog",
    );
  }

  public render() {
    return (
      <RX.View style={Styles.whiteBox}>
        <RX.Text>Admin Permission Management</RX.Text>
        <CheckBox text={"Execute Console Cheat Commands"}
                  onCheckedChange={(checked) => this.updatePermission(0, checked)}
                  checkedByDefault={this.props.adminPermissions.permissions.consoleCheat}/>
        <CheckBox text={"Execute Console User Management Commands"}
                  onCheckedChange={(checked) => this.updatePermission(1, checked)}
                  checkedByDefault={this.props.adminPermissions.permissions.consoleUserManagement}/>
        <CheckBox text={"Execute Console Server Management Commands"}
                  onCheckedChange={(checked) => this.updatePermission(2, checked)}
                  checkedByDefault={this.props.adminPermissions.permissions.consoleServerManagement}/>
        <CheckBox text={"Execute Console Debug Commands"}
                  onCheckedChange={(checked) => this.updatePermission(3, checked)}
                  checkedByDefault={this.props.adminPermissions.permissions.consoleDebug}/>
        <CheckBox text={"Install Modules"}
                  onCheckedChange={(checked) => this.updatePermission(4, checked)}
                  checkedByDefault={this.props.adminPermissions.permissions.installModules}/>
        <CheckBox text={"Create/Backup/Rename Games"}
                  onCheckedChange={(checked) => this.updatePermission(5, checked)}
                  checkedByDefault={this.props.adminPermissions.permissions.createBackupRenameGames}/>
        <CheckBox text={"Stop Games"}
                  onCheckedChange={(checked) => this.updatePermission(6, checked)}
                  checkedByDefault={this.props.adminPermissions.permissions.startStopGames}/>
        <CheckBox text={"Delete Games"}
                  onCheckedChange={(checked) => this.updatePermission(7, checked)}
                  checkedByDefault={this.props.adminPermissions.permissions.deleteGames}/>
        <CheckBox text={"Change Settings"}
                  onCheckedChange={(checked) => this.updatePermission(8, checked)}
                  checkedByDefault={this.props.adminPermissions.permissions.changeSettings}/>
        <CheckBox text={"Admin Management"}
                  onCheckedChange={(checked) => this.updatePermission(9, checked)}
                  checkedByDefault={this.props.adminPermissions.permissions.adminManagement}/>
        <OkCancelButtonBar onOk={this.onOk} onCancel={this.onCancel} />
      </RX.View>
    );
  }

  private updatePermission(index: number, checked: boolean) {
    switch (index) {
      case 0:
        this.props.adminPermissions.permissions.consoleCheat = checked;
        break;
      case 1:
        this.props.adminPermissions.permissions.consoleUserManagement = checked;
        break;
      case 2:
        this.props.adminPermissions.permissions.consoleServerManagement = checked;
        break;
      case 3:
        this.props.adminPermissions.permissions.consoleDebug = checked;
        break;
      case 4:
        this.props.adminPermissions.permissions.installModules = checked;
        break;
      case 5:
        this.props.adminPermissions.permissions.createBackupRenameGames = checked;
        break;
      case 6:
        this.props.adminPermissions.permissions.startStopGames = checked;
        break;
      case 7:
        this.props.adminPermissions.permissions.deleteGames = checked;
        break;
      case 8:
        this.props.adminPermissions.permissions.changeSettings = checked;
        break;
      case 9:
        this.props.adminPermissions.permissions.adminManagement = checked;
        break;
    }
  }

  private onOk = () => {
    this.props.okCallback(this.props.adminId, this.props.adminPermissions);
    RX.Modal.dismiss("managePermissionsDialog");
  }

  private onCancel = () => {
    RX.Modal.dismiss("managePermissionsDialog");
  }
}
