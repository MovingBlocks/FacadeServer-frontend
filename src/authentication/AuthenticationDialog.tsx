import RX = require("reactxp");
import Styles = require("../Styles");
import {AlertDialog} from "../AlertDialog";
import {AuthenticationManager} from "./AuthenticationManager";

interface AuthenticationDialogProps {
  closeCallback: () => void;
  manager: AuthenticationManager;

}

interface AuthenticationDialogStatus {
  config?: string;
  isWorking?: boolean;
}

export class AuthenticationDialog extends RX.Component<AuthenticationDialogProps, AuthenticationDialogStatus> {

  constructor(props: AuthenticationDialogProps) {
    super(props);
    this.state = {config: "", isWorking: false};
  }

  public render() {
    return (
      <RX.View style={[Styles.box, Styles.greyBorder]}>
        <RX.Text>To authenticate, paste the contents of your game client's configuration file here:</RX.Text>
        <RX.TextInput style={[Styles.box, Styles.greyBorder]} value={this.state.config} onChangeText={this.onChange} multiline={true} />
        <RX.View style={Styles.consoleInputView/*TODO fix styles*/}>
          <RX.Button onPress={this.loginClicked} style={[Styles.box, Styles.greyBorder, Styles.okButton]}>Login</RX.Button>
          <RX.Button onPress={this.cancelClicked} style={[Styles.box, Styles.greyBorder, Styles.cancelButton]}>Cancel</RX.Button>
        </RX.View>
      </RX.View>
    );
  }

  private onChange = (newValue: string) => {
    this.setState({config: newValue});
  }

  private loginClicked = () => {
    this.setState({isWorking: true});
    this.props.manager.setCallback((error: string) => {
      if (error !== null) {
        AlertDialog.show("Authentication failed: " + error);
      }
      this.props.closeCallback();
    });
    this.props.manager.authenticateFromConfig(this.state.config);
  }

  private cancelClicked = () => {
    this.props.closeCallback();
  }

}
