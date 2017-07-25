import RX = require("reactxp");
import Styles = require("../styles/main");
import {AlertDialog} from "../AlertDialog";
import {CheckBox} from "../components/CheckBox";
import {RadioButtonGroup} from "../components/RadioButtonGroup";
import {OkCancelButtonBar} from "../OkCancelButtonBar";
import {TextPromptDialog} from "../TextPromptDialog";
import {AuthenticationManager} from "./AuthenticationManager";
import {IdentityStorageServiceLoginDialog} from "./IdentityStorageServiceLoginDialog";

interface AuthenticationDialogProps {
  closeCallback: () => void;
  manager: AuthenticationManager;
}

interface AuthenticationDialogState {
  authenticationMethodIndex?: number;
  rememberCerts?: boolean;
}

export class AuthenticationDialog extends RX.Component<AuthenticationDialogProps, AuthenticationDialogState> {

  constructor(props: AuthenticationDialogProps) {
    super(props);
    this.state = {authenticationMethodIndex: 0};
  }

  public render() {
    const options = [
      "Authenticate with client identity storage service",
      "Authenticate with configuration file",
    ];
    return (
      <RX.View style={[Styles.whiteBox, Styles.dialog]}>
        <RX.Text>
        To authenticate, you need to provide an identity certificate pair. If you have an account on an identity
        storage server, you can use your credentials to retrieve the required information from the server;
        alternatively, you can paste your game client's configuration file, which contains the necessary certificates.
        </RX.Text>
        <RadioButtonGroup items={options} onSelectionChange={(i: number) => this.setState({authenticationMethodIndex: i})} />
        <CheckBox
          text="Remember the certificate pair on this device/browser"
          checkedByDefault={false}
          onCheckedChange={(checked: boolean) => this.setState({rememberCerts: checked})}/>
        <OkCancelButtonBar okLabel="Next" onOk={this.nextClicked} onCancel={this.cancelClicked} />
      </RX.View>
    );
  }

  private nextClicked = () => {
    this.props.manager.setCallback((error: string) => {
      if (error !== null) {
        AlertDialog.show("Authentication failed: " + error);
      }
      this.props.closeCallback();
    });
    switch (this.state.authenticationMethodIndex) {
      case 0:
        IdentityStorageServiceLoginDialog.show((server: string, username: string, password: string) =>
          AlertDialog.show("This feature is not implemented yet."));
        break;
      case 1:
        TextPromptDialog.show("Please paste the contents of your game client's configuration file here", (value: string) =>
          this.props.manager.authenticateFromConfig(value), true);
    }
  }

  private cancelClicked = () => {
    this.props.closeCallback();
  }

}
