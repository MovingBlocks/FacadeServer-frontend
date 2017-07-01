/* tslint:disable:jsx-no-lambda */

import RX = require("reactxp");
import Styles = require("./Styles");
import {IncomingMessage} from "./io/IncomingMessage";
import ServerAddressInput from "./ServerAddressInput";
import {TabModel} from "./tabs/TabModel";

import {ConsoleTabModel} from "./tabs/console/ConsoleTabModel";
import {ConsoleTabView} from "./tabs/console/ConsoleTabview";
import {HomeTabModel} from "./tabs/home/HomeTabModel";
import {HomeTabView} from "./tabs/home/HomeTabView";

interface AppState {
  activeTab?: number;
  serverAddr?: string;
}

class App extends RX.Component<{}, AppState> {

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
          <RX.Text>Server:{this.state.serverAddr} - Unauthenticated mode - click to login</RX.Text>
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

  private connect = (address: string) => {
    RX.Modal.dismiss("ServerAddressInput");
    this.setState({serverAddr: address});
    const wsConn: WebSocket = new WebSocket(address);
    wsConn.onmessage = this.onMessage;
    wsConn.onopen = () => {
      this.tabs.forEach((tab: TabModel<any>) => {
        tab.setSendDataCallback((data: any) => wsConn.send(JSON.stringify(data)));
        tab.initialize();
      });
    };
  }

  private onMessage = (event: MessageEvent) => {
    const message: IncomingMessage = JSON.parse(event.data) as IncomingMessage;
    this.tabs.forEach((tab: TabModel<any>) => {
      tab.onMessage(message);
    });
  }

  private changeTab(index: number) {
    this.setState({activeTab: index});
  }

}

export = App;
