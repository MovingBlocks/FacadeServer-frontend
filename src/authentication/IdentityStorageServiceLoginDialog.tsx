import RX = require("reactxp");
import Styles = require("../styles/main");
import {OkCancelButtonBar} from "../OkCancelButtonBar";

interface IdentityStorageServiceLoginDialogProps {
  callback: (server: string, username: string, password: string) => void;
}

interface IdentityStorageServiceLoginDialogState {
  server?: string;
  username?: string;
  password?: string;
}

export class IdentityStorageServiceLoginDialog extends
  RX.Component<IdentityStorageServiceLoginDialogProps, IdentityStorageServiceLoginDialogState> {

  public static show(callback: (server: string, username: string, password: string) => void) {
    RX.Modal.show(<IdentityStorageServiceLoginDialog callback={callback} />, "IdentityStorageServiceLoginDialog");
  }

  public componentWillMount() {
    this.setState({server: "http://165.227.140.7", username: "", password: ""});
  }

  public render() {
    return (
      <RX.View style={[Styles.whiteBox, Styles.dialog]}>
        <RX.Text>Server address:</RX.Text>
        <RX.TextInput style={Styles.whiteBox} value={this.state.server} onChangeText={(server) => this.setState({server})} />
        <RX.Text>Username:</RX.Text>
        <RX.TextInput style={Styles.whiteBox} value={this.state.username} onChangeText={(username) => this.setState({username})} />
        <RX.Text>Password:</RX.Text>
        <RX.TextInput secureTextEntry={true} style={Styles.whiteBox}
          value={this.state.password} onChangeText={(password) => this.setState({password})}/>
        <OkCancelButtonBar onOk={this.close(true)} onCancel={this.close(false)}/>
      </RX.View>
    );
  }

  private close = (ok: boolean) => () => {
    if (ok) {
      this.props.callback(this.state.server, this.state.username, this.state.password);
    }
    RX.Modal.dismiss("IdentityStorageServiceLoginDialog");
  }

}
