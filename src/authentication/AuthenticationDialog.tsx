import RX = require("reactxp");
import Styles = require("../styles/main");
import {AlertDialog} from "../AlertDialog";
import {CheckBox} from "../components/CheckBox";
import {RadioButtonGroup} from "../components/RadioButtonGroup";
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
      <RX.View style={Styles.whiteBox}>
        {/*<CheckBox text="test test test" checkedByDefault={false} onCheckedChange={() => {return; }}/>*/}
        {/*<RadioButtonGroup items={["test1", "test2", "test3"]} onSelectionChange={() => {return; }}/>*/}
        <RX.Text>To authenticate, paste the contents of your game client's configuration file here:</RX.Text>
        <RX.TextInput style={Styles.whiteBox} value={this.state.config} onChangeText={this.onChange} multiline={true} />
        <RX.View style={Styles.flex.row}>
          <RX.Button onPress={this.loginClicked} style={Styles.okButton}><RX.Text>Login</RX.Text></RX.Button>
          <RX.Button onPress={this.cancelClicked} style={Styles.cancelButton}><RX.Text>Cancel</RX.Text></RX.Button>
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
