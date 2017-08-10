import RX = require("reactxp");
import Styles = require("../../styles/main");
import {RadioButtonGroup} from "../../components/RadioButtonGroup";
import {OkCancelButtonBar} from "../../OkCancelButtonBar";
import {IdNamePair} from "./ServerAdminsTabState";

interface AddFromOnlinePlayersDialogProps {
  clientList: IdNamePair[];
  okCallback: (clientId: string) => void;
}

interface AddFromOnlinePlayersDialogState {
  selectedClientId: string;
}

export class AddFromOnlinePlayersDialog extends RX.Component<AddFromOnlinePlayersDialogProps, AddFromOnlinePlayersDialogState> {

  public static show(clientList: IdNamePair[], okCallback: (clientId: string) => void) {
    RX.Modal.show(<AddFromOnlinePlayersDialog clientList={clientList} okCallback={okCallback} />, "addFromOnlinePlayersDialog");
  }

  public componentWillMount() {
    this.setState({selectedClientId: null});
  }

  public render() {
    return (
      <RX.View style={Styles.whiteBox}>
        <RX.Text>Select the user to add to the server admin list:</RX.Text>
        <RadioButtonGroup
          keys={this.props.clientList.map((idName) => idName.id)}
          items={this.props.clientList.map((idName) => idName.name)}
          onSelectionChange={(index, key) => this.setState({selectedClientId: key})} />
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
