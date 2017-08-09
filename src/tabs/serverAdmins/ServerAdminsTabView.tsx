import RX = require("reactxp");
import Styles = require("../../styles/main");
import {OkCancelButtonBar} from "../../OkCancelButtonBar";
import {TabView} from "../TabView";
import {ServerAdminsTabController} from "./ServerAdminsTabController";
import {ServerAdminsTabState} from "./ServerAdminsTabState";

export class ServerAdminsTabView extends TabView<ServerAdminsTabState> {

  public render() {
    const controller: ServerAdminsTabController = this.props.model.getController() as ServerAdminsTabController;
    const emptyListMessage = "The admin list is empty - WARNING: access to administrative settings is public! " +
      "Please create a savegame using the Games tab and start it, then connect to the server using the regular Terasology game client " +
      "to restrict the admin privileges to your identity. You will then be able to add other user IDs to the admin list.";
    return (
      <RX.View>
        {this.state.adminIds.length === 0 ? <RX.Text>{emptyListMessage}</RX.Text> : this.renderList(this.renderAdmin(controller))}
      </RX.View>
    );
  }

  private renderList(renderAdmin: (adminId: string) => JSX.Element) {
    return (
      <RX.View>
        <RX.Text>This is the list of the user IDs which are allowed to perform administrative actions:</RX.Text>
        <RX.View>
          {this.state.adminIds.map(renderAdmin)}
        </RX.View>
      </RX.View>
    );
  }

  private renderAdmin = (controller: ServerAdminsTabController) => (adminId: string) => {
    return (
      <RX.View key={adminId} style={Styles.flex.row}>
        <RX.Text>{adminId}</RX.Text>
        <RX.Button style={Styles.cancelButton} onPress={() => controller.removeAdmin(adminId)}>Remove</RX.Button>
      </RX.View>
    );
  }

}
