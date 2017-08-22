import RX = require("reactxp");
import Styles = require("../../styles/main");
import {OkCancelButtonBar} from "../../OkCancelButtonBar";
import {TabView} from "../TabView";
import {SettingsTabController} from "./SettingsTabController";
import {SettingsTabState} from "./SettingsTabState";

export class SettingsTabView extends TabView<SettingsTabState> {

  public render() {
    const controller: SettingsTabController = this.props.model.getController() as SettingsTabController;
    return (
      <RX.View>
        <RX.View style={[Styles.flex.row, Styles.flex.fill]}>
          <RX.Text>Game server port:</RX.Text>
          <RX.TextInput
            style={[Styles.whiteBox, Styles.flex.fill, Styles.smallTextInput]}
            value={this.state.serverPort.toString()}
            onChangeText={controller.updatePort} />
        </RX.View>
        <RX.Text>
        Server's MOTD/Message Of The Day (is displayed in-game when a player joins the server, and on the home page of this web interface):
        </RX.Text>
        <RX.TextInput multiline={true} style={Styles.whiteBox} value={this.state.serverMotd} onChangeText={controller.updateMotd} />
        <OkCancelButtonBar okLabel="Save" cancelLabel="Reset to values on server" onOk={controller.save} onCancel={controller.reset} />
      </RX.View>
    );
  }

}
