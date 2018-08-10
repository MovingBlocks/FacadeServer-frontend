import RX = require("reactxp");
import Styles = require("../../styles/main");
import {OnlinePlayerMetadata} from "common/io/OnlinePlayerMetadata";
import {UserManagementTabView} from "common/tabs/userManagement/UserManagementTabView";

interface BlacklistWhitelistPromptState {
  value?: string;
  onlinePlayers?: OnlinePlayerMetadata[];
  blacklist?: string[];
  whitelist?: string[];
}

interface BlacklistWhitelistPromptDialogProps {
  promptText: string;
  onlinePlayers: OnlinePlayerMetadata[];
  blacklistedPlayers: string[];
  whitelistedPlayers: string[];
  listFunctions: Array<((userId: string) => void)>;
  caller: UserManagementTabView;
}

export class BlacklistWhitelistPromptDialog extends RX.Component<BlacklistWhitelistPromptDialogProps, BlacklistWhitelistPromptState> {

  public static show(promptText: string, onlinePlayers: OnlinePlayerMetadata[], blacklistedPlayers: string[], whitelistedPlayers: string[],
                     listFunctions: Array<((userId: string) => void)>, caller: UserManagementTabView) {
    RX.Modal.show(
      <BlacklistWhitelistPromptDialog promptText={promptText} onlinePlayers={onlinePlayers} blacklistedPlayers={blacklistedPlayers}
                                      whitelistedPlayers={whitelistedPlayers} listFunctions={listFunctions} caller={caller}/>,
      "blacklistWhitelistPromptDialog");
  }

  constructor(props: BlacklistWhitelistPromptDialogProps) {
    super(props);
    this.state = {value: "", onlinePlayers: this.props.onlinePlayers, blacklist: this.props.blacklistedPlayers,
      whitelist: this.props.whitelistedPlayers};
  }

  public componentDidMount() {
    this.props.caller.props.model.update({dialogUpdater: this.onListsUpdated});
  }

  public render() {
    return (
      <RX.View style={Styles.whiteBox}>
        <RX.Text>{this.props.promptText}</RX.Text>
        <RX.Text>Online Players:</RX.Text>
        {this.state.onlinePlayers.map((player) => <RX.Text key={player.id}>{"name: " + player.name + " id: " + player.id}</RX.Text>)}
        <RX.Text>Currently on blacklist:</RX.Text>
        {this.state.blacklist.map((player) => <RX.Text key={"b " + player}>{player}</RX.Text>)}
        <RX.Text>Currently on whitelist:</RX.Text>
        {this.state.whitelist.map((player) => <RX.Text key={"b " + player}>{player}</RX.Text>)}
        <RX.Text>ID to modify:</RX.Text>
        <RX.TextInput style={Styles.whiteBox}
                      value={this.state.value}
                      onChangeText={(newValue) => this.onChangeText(newValue)}/>
        <RX.View style={Styles.flex.row}>
          <RX.Button style={Styles.okButton} onPress={() => this.onListButtonPress(0)}>
            <RX.Text>Add to Blacklist</RX.Text>
          </RX.Button>
          <RX.Button style={Styles.okButton} onPress={() => this.onListButtonPress(1)}>
            <RX.Text>Remove from Blacklist</RX.Text>
          </RX.Button>
        </RX.View>
        <RX.View style={Styles.flex.row}>
          <RX.Button style={Styles.okButton} onPress={() => this.onListButtonPress(2)}>
            <RX.Text>Add to Whitelist</RX.Text>
          </RX.Button>
          <RX.Button style={Styles.okButton} onPress={() => this.onListButtonPress(3)}>
            <RX.Text>Remove from Whitelist</RX.Text>
          </RX.Button>
        </RX.View>
        <RX.Button style={[Styles.okButton, Styles.alignEnd]} onPress={this.closeClicked}>
          <RX.Text>Close</RX.Text>
        </RX.Button>
      </RX.View>
    );
  }

  private onListsUpdated = (wl: string[], bl: string[]) => {
    this.setState({whitelist: wl, blacklist: bl});
  }

  private onListButtonPress(buttonNumber: number) {
    this.props.listFunctions[buttonNumber].call(this.props.listFunctions[buttonNumber], this.state.value);
  }

  private onChangeText = (newValue: string) => {
    this.setState({value: newValue});
  }

  private closeClicked = () => {
    RX.Modal.dismiss("blacklistWhitelistPromptDialog");
  }

}
