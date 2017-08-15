import RX = require("reactxp");
import Styles = require("../styles/main");
import {HeaderProps} from "./HeaderProps";

export class WebHeader extends RX.Component<HeaderProps, null> {

  public render() {
    const authUI = this.props.authenticated ?
      <RX.Text>Authenticated</RX.Text> :
      <RX.Button style={Styles.okButton} onPress={this.props.showLogin}><RX.Text>Login</RX.Text></RX.Button>;
    return (
      <RX.View style={[Styles.box, Styles.justifySpaceBetween, Styles.header]}>
        <RX.View style={Styles.flex.row}>
          <RX.Text style={Styles.headerText}>Terasology Server web interface</RX.Text>
        </RX.View>
        <RX.View style={Styles.flex.row}>
          <RX.Text>Server: {this.props.serverAddr ? this.props.serverAddr : "Not connected"}</RX.Text>
          {authUI}
        </RX.View>
      </RX.View>
    );
  }
}
