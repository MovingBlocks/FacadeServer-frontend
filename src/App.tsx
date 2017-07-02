/* tslint:disable:jsx-no-lambda */

import RX = require("reactxp");
import Styles = require("./Styles");
import {AuthenticationDialog} from "./authentication/AuthenticationDialog";
import {AuthenticationManager} from "./authentication/AuthenticationManager";
import {IncomingMessage} from "./io/IncomingMessage";
import {ServerAddressInput} from "./ServerAddressInput";
import {TabModel} from "./tabs/TabModel";

import {ConsoleTabModel} from "./tabs/console/ConsoleTabModel";
import {ConsoleTabView} from "./tabs/console/ConsoleTabView";
import {HomeTabModel} from "./tabs/home/HomeTabModel";
import {HomeTabView} from "./tabs/home/HomeTabView";

interface AppState {
  activeTab?: number;
  serverAddr?: string;
}

class App extends RX.Component<{}, AppState> {

  private wsConn: WebSocket;
  private authenticationManager: AuthenticationManager;
  private tabs: Array<TabModel<any>> = [new HomeTabModel(), new ConsoleTabModel()];
  private tabViews = [
    <HomeTabView model={this.tabs[0]} />,
    <ConsoleTabView model={this.tabs[1]} />,
  ];

  constructor(props: {}) {
    super(props);
    this.state = {activeTab: 0};
  }

  public componentDidMount() {
    RX.Modal.show(<ServerAddressInput callback={this.connect}/>, "ServerAddressInput");
  }

  public render() {
    const tabSwitchButtons = this.tabs.map((item, index) => (
      <RX.Button key={index} style={[Styles.greyBorder, Styles.box]} onPress={() => this.changeTab(index)}>
        {item.getName()}
      </RX.Button>
    ));
    return (
      <RX.View style={Styles.flexColumn}>
        <RX.View style={[Styles.box, Styles.headerView]}>
          <RX.Text style={Styles.headerText}>Terasology Server web interface</RX.Text>
          <RX.View>
            <RX.Text>Server: {this.state.serverAddr}</RX.Text>
            <RX.Button style={Styles.okButton} onPress={this.showLoginDialog}>Login</RX.Button>
          </RX.View>
        </RX.View>
        <RX.View style={Styles.contentView}>
          <RX.View style={[Styles.box, Styles.greyBorder]}>
            {tabSwitchButtons}
          </RX.View>
          <RX.View style={[Styles.box, Styles.greyBorder, Styles.flexColumn]}>
            {this.tabViews[this.state.activeTab]}
          </RX.View>
        </RX.View>
      </RX.View>
    );
  }

  private sendJsonData = (data: any) => { // TODO: replace any with OutgoingMessage
    this.wsConn.send(JSON.stringify(data));
  }

  private connect = (address: string) => {
    RX.Modal.dismiss("ServerAddressInput");
    this.setState({serverAddr: address});
    this.wsConn = new WebSocket(address);
    this.wsConn.onmessage = this.onMessage;
    this.wsConn.onopen = () => {
      this.authenticationManager = new AuthenticationManager(this.sendJsonData);
      this.tabs.forEach((tab: TabModel<any>) => {
        tab.setSendDataCallback(this.sendJsonData);
        tab.initialize();
      });
    };
  }

  private showLoginDialog = () => {
    const onClose = () => RX.Modal.dismiss("AuthenticationDialog");
    RX.Modal.show(<AuthenticationDialog manager={this.authenticationManager} closeCallback={onClose} />, "AuthenticationDialog");
  }

  private onMessage = (event: MessageEvent) => {
    const message: IncomingMessage = JSON.parse(event.data) as IncomingMessage;
    this.authenticationManager.onMessage(message);
    this.tabs.forEach((tab: TabModel<any>) => {
      tab.onMessage(message);
    });
  }

  private changeTab(index: number) {
    this.setState({activeTab: index});
  }

}

export = App;
