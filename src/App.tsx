import RX = require("reactxp");
import {AlertDialog} from "./AlertDialog";
import {AuthenticationDialog} from "./authentication/AuthenticationDialog";
import {AuthenticationManager} from "./authentication/AuthenticationManager";
import {ClientIdentity} from "./authentication/ClientIdentity";
import {HandshakeHello} from "./authentication/HandshakeHello";
import {LocalIdentityStorage} from "./authentication/LocalIdentityStorage";
import {MultiFormatBigInteger} from "./authentication/MultiFormatBigInteger";
import {ActionResult} from "./io/ActionResult";
import {IncomingMessage} from "./io/IncomingMessage";
import {OutgoingMessage} from "./io/OutgoingMessage";
import {MessageDialog} from "./MessageDialog";
import {ServerAddressInput} from "./ServerAddressInput";
import {TabModel} from "./tabs/TabModel";
import {WaitOverlay} from "./WaitOverlay";

import {ConsoleTabModel} from "./tabs/console/ConsoleTabModel";
import {ConsoleTabView} from "./tabs/console/ConsoleTabView";
import {GamesTabModel} from "./tabs/games/GamesTabModel";
import {GamesTabView} from "./tabs/games/GamesTabView";
import {HomeTabModel} from "./tabs/home/HomeTabModel";
import {HomeTabView} from "./tabs/home/HomeTabView";
import {ModulesTabModel} from "./tabs/modules/ModulesTabModel";
import {ModulesTabView} from "./tabs/modules/ModulesTabView";
import {ServerAdminsTabModel} from "./tabs/serverAdmins/ServerAdminsTabModel";
import {ServerAdminsTabView} from "./tabs/serverAdmins/ServerAdminsTabView";
import {SettingsTabModel} from "./tabs/settings/SettingsTabModel";
import {SettingsTabView} from "./tabs/settings/SettingsTabView";
import {UserManagementTabModel} from "./tabs/userManagement/UserManagementTabModel";
import {UserManagementTabView} from "./tabs/userManagement/UserManagementTabView";
import {WorldMapTabModel} from "./tabs/worldMap/WorldMapTabModel";
import {WorldMapTabView} from "./tabs/worldMap/WorldMapTabView";

import {AppUI} from "platformSpecific/AppUI";

interface AppState {
  activeTab?: number;
  serverAddr?: string;
  authenticated?: boolean;
}

class App extends RX.Component<{}, AppState> {

  private wsConn: WebSocket;
  private authenticationManager: AuthenticationManager;
  private tabs: Array<TabModel<any>> = [
    new HomeTabModel(),
    new ConsoleTabModel(),
    new GamesTabModel(),
    new ModulesTabModel(),
    new SettingsTabModel(),
    new ServerAdminsTabModel(),
    new UserManagementTabModel(),
    new WorldMapTabModel(),
  ];
  private tabViews = [
    <HomeTabView model={this.tabs[0]} />,
    <ConsoleTabView model={this.tabs[1]} />,
    <GamesTabView model={this.tabs[2]} />,
    <ModulesTabView model={this.tabs[3]} />,
    <SettingsTabView model={this.tabs[4]} />,
    <ServerAdminsTabView model={this.tabs[5]} />,
    <UserManagementTabView model={this.tabs[6]} />,
    <WorldMapTabView model={this.tabs[7]} />,
  ];

  constructor(props: {}) {
    super(props);
    this.state = {activeTab: 0};
  }

  public componentDidMount() {
    RX.Modal.show(<ServerAddressInput callback={this.connect}/>, "ServerAddressInput");
  }

  public render() {
    return (
      <AppUI
        activeTabIndex={this.state.activeTab}
        tabViews={this.tabViews}
        tabNames={this.tabs.map((tab) => tab.getName())}
        serverAddr={this.state.serverAddr}
        isAuthenticated={this.state.authenticated}
        login={this.showLoginDialog}
        logout={this.logout}
        setActiveTab={(index) => this.setState({activeTab: index})}
      />
    );
  }

  private sendJsonData = (data: OutgoingMessage) => {
    this.wsConn.send(JSON.stringify(data));
  }

  private connect = (address: string) => {
    RX.Modal.dismiss("ServerAddressInput");
    WaitOverlay.open("Connecting...");
    const onConnectionError = (error: string) => {
      WaitOverlay.close();
      AlertDialog.show("Failed to connect to the server." + (error ? " Reason: " + error : ""), () =>
        RX.Modal.show(<ServerAddressInput callback={this.connect}/>, "ServerAddressInput"));
    };
    try {
      this.wsConn = new WebSocket(address);
    } catch (err) {
      onConnectionError(err);
      return;
    }
    this.wsConn.onerror = () => onConnectionError("");
    this.wsConn.onopen = () => {
      this.setState({serverAddr: address});
      this.authenticationManager = new AuthenticationManager(this.sendJsonData);
      this.requestServerHello((serverHello: HandshakeHello) => {
        this.wsConn.onmessage = this.onMessage;
        WaitOverlay.close();
        const serverId: string = serverHello !== null ? serverHello.certificate.id : null;
        LocalIdentityStorage.getIdentity(serverId, (result: ClientIdentity<MultiFormatBigInteger>) => {
          if (result !== null) {
            const authenticateAndFinalize = () => {
              WaitOverlay.open("Authenticating...");
              this.authenticationManager.setCallback((error: string) => {
                WaitOverlay.close();
                if (error !== null) {
                  AlertDialog.show("Authentication failed: " + error);
                } else {
                  this.setState({authenticated: this.authenticationManager.isAuthenticated()});
                }
                this.finalizeInitialization();
              });
              this.authenticationManager.authenticate(serverHello, result);
            };
            const finalizeAndRemoveIdentity = () => {
              this.finalizeInitialization();
              LocalIdentityStorage.removeIdentity(serverId);
            };
            MessageDialog.show(
              "Do you want to authenticate to this server with the locally stored identity?",
              {label: "Yes", style: "GREEN", onClick: authenticateAndFinalize},
              {label: "No", style: "RED", onClick: this.finalizeInitialization},
              {label: "No, and delete the stored identity", style: "RED", onClick: finalizeAndRemoveIdentity},
            );
          } else {
            this.finalizeInitialization();
          }
        });
      });
    };
  }

  private requestServerHello = (callback: (serverHello: HandshakeHello) => void) => {
    this.wsConn.onmessage = (event: MessageEvent) => {
      const message: ActionResult = (JSON.parse(event.data) as IncomingMessage).data as ActionResult;
      if (message.status === "OK") {
        callback(message.data as HandshakeHello);
      } else {
        callback(null);
      }
    };
    this.sendJsonData({messageType: "AUTHENTICATION_REQUEST"});
  }

  private finalizeInitialization = () => {
    this.tabs.forEach((tab: TabModel<any>) => {
      tab.setSendDataCallback(this.sendJsonData);
      tab.initialize();
    });
  }

  private showLoginDialog = () => {
    const onClose = () => {
      this.setState({authenticated: this.authenticationManager.isAuthenticated()});
      RX.Modal.dismiss("AuthenticationDialog");
    };
    RX.Modal.show(<AuthenticationDialog manager={this.authenticationManager} closeCallback={onClose} />, "AuthenticationDialog");
  }

  // TODO: use a better method of logging out than simply refreshing the page
  private logout = () => {
    window.location.reload(true);
  }

  private onMessage = (event: MessageEvent) => {
    const message: IncomingMessage = JSON.parse(event.data) as IncomingMessage;
    if (!this.authenticationManager.isAuthenticated()) {
      this.authenticationManager.onMessage(message);
    }
    this.tabs.forEach((tab: TabModel<any>) => {
      tab.onMessage(message);
      if (message.messageType === "ACTION_RESULT") {
        const innerMessage: ActionResult = message.data as ActionResult;
        if (innerMessage.status !== "OK") {
          AlertDialog.show("An error occurred. Status: " + innerMessage.status + ", Message: " + innerMessage.message);
        }
      }
      // console.log(JSON.stringify(message)); // for debugging
    });
  }

}

export = App;
