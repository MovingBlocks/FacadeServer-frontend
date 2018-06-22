import RX = require("reactxp");
import Styles = require("../../styles/main");
import {CheckBox} from "../../components/CheckBox";
import {OkCancelButtonBar} from "../../OkCancelButtonBar";
import {AdminPermissions} from "./AdminPermissions";

interface ManagePermissionsDialogProps {
  okCallback: (adminId: string, newPermissions: AdminPermissions) => void;
  adminPermissions: AdminPermissions;
}

export class ManagePermissionsDialog extends RX.Component<ManagePermissionsDialogProps, null> {

  public static show(adminId: string, okCallback: (adminId: string, newPermissions: AdminPermissions) => void,
                     adminPermissions: AdminPermissions) {
    RX.Modal.show(
      <ManagePermissionsDialog okCallback={okCallback} adminPermissions={adminPermissions} />, "managePermissionsDialog",
    );
  }

  public render() {
    return (
      <RX.View style={Styles.whiteBox}>
        <RX.Text>Admin Permission Management</RX.Text>
        <CheckBox text={"Execute Console Cheat Commands"}
                  onCheckedChange={(checked) => this.props.adminPermissions.permissions.CONSOLE_CHEAT = checked}
                  checkedByDefault={this.props.adminPermissions.permissions.CONSOLE_CHEAT}/>
        <CheckBox text={"Execute Console User Management Commands"}
                  onCheckedChange={(checked) => this.props.adminPermissions.permissions.CONSOLE_USER_MANAGEMENT = checked}
                  checkedByDefault={this.props.adminPermissions.permissions.CONSOLE_USER_MANAGEMENT}/>
        <CheckBox text={"Execute Console Server Management Commands"}
                  onCheckedChange={(checked) => this.props.adminPermissions.permissions.CONSOLE_SERVER_MANAGEMENT = checked}
                  checkedByDefault={this.props.adminPermissions.permissions.CONSOLE_SERVER_MANAGEMENT}/>
        <CheckBox text={"Execute Console Debug Commands"}
                  onCheckedChange={(checked) => this.props.adminPermissions.permissions.CONSOLE_DEBUG = checked}
                  checkedByDefault={this.props.adminPermissions.permissions.CONSOLE_DEBUG}/>
        <CheckBox text={"Install Modules"}
                  onCheckedChange={(checked) => this.props.adminPermissions.permissions.INSTALL_MODULES = checked}
                  checkedByDefault={this.props.adminPermissions.permissions.INSTALL_MODULES}/>
        <CheckBox text={"Create/Backup/Rename Games"}
                  onCheckedChange={(checked) => this.props.adminPermissions.permissions.CREATE_BACKUP_RENAME_GAMES = checked}
                  checkedByDefault={this.props.adminPermissions.permissions.CREATE_BACKUP_RENAME_GAMES}/>
        <CheckBox text={"Stop Games"}
                  onCheckedChange={(checked) => this.props.adminPermissions.permissions.START_STOP_GAMES = checked}
                  checkedByDefault={this.props.adminPermissions.permissions.START_STOP_GAMES}/>
        <CheckBox text={"Delete Games"}
                  onCheckedChange={(checked) => this.props.adminPermissions.permissions.DELETE_GAMES = checked}
                  checkedByDefault={this.props.adminPermissions.permissions.DELETE_GAMES}/>
        <CheckBox text={"Change Settings"}
                  onCheckedChange={(checked) => this.props.adminPermissions.permissions.CHANGE_SETTINGS = checked}
                  checkedByDefault={this.props.adminPermissions.permissions.CHANGE_SETTINGS}/>
        <CheckBox text={"Admin Management"}
                  onCheckedChange={(checked) => this.props.adminPermissions.permissions.ADMIN_MANAGEMENT = checked}
                  checkedByDefault={this.props.adminPermissions.permissions.ADMIN_MANAGEMENT}/>
        <OkCancelButtonBar onOk={this.onOk} onCancel={this.onCancel} />
      </RX.View>
    );
  }

  private onOk = () => {
    this.props.okCallback(this.props.adminPermissions.id, this.props.adminPermissions);
    RX.Modal.dismiss("managePermissionsDialog");
  }

  private onCancel = () => {
    RX.Modal.dismiss("managePermissionsDialog");
  }
}
