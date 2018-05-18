import RX = require("reactxp");
import Styles = require("common/styles/main");
import {AppUIProps} from "common/AppUIProps";

export class AppUI extends RX.Component<AppUIProps, null> {

  public render() {
    const tabSwitchButtons = this.props.tabNames.map((name, index) => (
      <RX.View key={index}>
        <RX.Button style={Styles.whiteBox} onPress={() => this.props.setActiveTab(index)}>
          <RX.Text>{name}</RX.Text>
        </RX.Button>
      </RX.View>
    ));
    const authUI = this.props.isAuthenticated ?
      <RX.Button style={Styles.cancelButton} onPress={this.props.logout}><RX.Text>Logout</RX.Text></RX.Button> :
      <RX.Button style={Styles.okButton} onPress={this.props.login}><RX.Text>Login</RX.Text></RX.Button>;
    return (
      <RX.View style={Styles.flex.fill}>
        <RX.View style={[Styles.box, Styles.justifySpaceBetween, Styles.header]}>
          <RX.View style={Styles.flex.row}>
            <RX.Text style={Styles.headerText}>Terasology Server web interface</RX.Text>
          </RX.View>
          <RX.View style={Styles.flex.row}>
            <RX.Text>Server: {this.props.serverAddr ? this.props.serverAddr : "Not connected"}</RX.Text>
            {authUI}
          </RX.View>
        </RX.View>
        <RX.View style={[Styles.flex.row, Styles.flex.fill]}>
          <RX.View style={Styles.whiteBox}>
            <RX.ScrollView>
              {tabSwitchButtons}
            </RX.ScrollView>
          </RX.View>
          <RX.View style={[Styles.whiteBox, Styles.flex.column, Styles.flex.fill]}>
            {this.props.tabViews[this.props.activeTabIndex]}
          </RX.View>
        </RX.View>
      </RX.View>
    );
  }
}
