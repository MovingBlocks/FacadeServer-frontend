import RX = require("reactxp");
import Styles = require("common/styles/main");
import {HeaderProps} from "common/header/HeaderProps";

export class Header extends RX.Component<HeaderProps, null> {

  public render() {
    const serverStatus = this.props.serverAddr ? this.props.serverAddr : "Not connected";
    const authStatus = this.props.authenticated ? "Authenticated" : "Not authenticated";
    return (
      <RX.View style={[Styles.header, Styles.justifyFlexStart]}>
        <RX.Button style={Styles.mobileHeaderMenu} onPress={this.props.toggleMenu}>
          <RX.Image style={Styles.flex.fill} source={require("../../menu.png")} />
        </RX.Button>
        <RX.View style={[Styles.flex.column, Styles.mobileHeaderContent]}>
          <RX.Text style={Styles.headerText}>Terasology mobile interface</RX.Text>
          <RX.Text>{serverStatus} - {authStatus}</RX.Text>
        </RX.View>
      </RX.View>
    );
  }
}
