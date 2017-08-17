import RX = require("reactxp");
import Styles = require("common/styles/main");
import {AppUIProps} from "common/AppUIProps";

export class AppUI extends RX.Component<AppUIProps, {menuOpen: boolean}> {

  constructor(props: AppUIProps) {
    super(props);
    this.state = {menuOpen: false};
  }

  public render() {
    const serverStatus = this.props.serverAddr ? this.props.serverAddr : "Not connected";
    const authStatus = this.props.isAuthenticated ? "Authenticated" : "Not authenticated";
    const tabSwitchButtons = this.props.tabNames.map((name, index) => (
      <RX.View key={index}>
        <RX.Button style={Styles.whiteBox} onPress={() => this.props.setActiveTab(index)}>
          <RX.Text>{name}</RX.Text>
        </RX.Button>
      </RX.View>
    ));
    const menu = (
      <RX.View style={Styles.box}>
        <RX.ScrollView>
          <RX.Button style={Styles.okButton} onPress={this.props.login}>
            <RX.Text>Login</RX.Text>
          </RX.Button>
          {tabSwitchButtons}
        </RX.ScrollView>
      </RX.View>
    );
    return (
      <RX.View style={Styles.flex.fill}>
        <RX.View style={[Styles.header, Styles.justifyFlexStart]}>
          <RX.Button style={Styles.mobileHeaderMenu} onPress={() => this.setState({menuOpen: !this.state.menuOpen})}>
            <RX.Image style={Styles.flex.fill} source={require("assets/menu.png")} />
          </RX.Button>
          <RX.View style={[Styles.flex.column, Styles.mobileHeaderContent]}>
            <RX.Text style={Styles.headerText}>Terasology mobile interface</RX.Text>
            <RX.Text>{serverStatus} - {authStatus}</RX.Text>
          </RX.View>
        </RX.View>
        <RX.View style={[Styles.flex.row, Styles.flex.fill]}>
          {this.state.menuOpen ? menu : null}
          <RX.View style={[Styles.box, Styles.flex.column, Styles.flex.fill]}>
            {this.props.tabViews[this.props.activeTabIndex]}
          </RX.View>
        </RX.View>
      </RX.View>
    );
  }
}
