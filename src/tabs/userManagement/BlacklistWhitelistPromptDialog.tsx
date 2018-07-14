import RX = require("reactxp");
import Styles = require("../../styles/main");
import {PickerPropsItem} from "reactxp/dist/common/Types";

interface BlacklistWhitelistPromptDialogProps {
  promptText: string;
  onlinePlayersItems: PickerPropsItem[];
  blacklistedPlayersItems: PickerPropsItem[];
  whitelistedPlayersItems: PickerPropsItem[];
  listFunctions: Array<((userId: string) => void)>;
}

export class BlacklistWhitelistPromptDialog extends RX.Component<BlacklistWhitelistPromptDialogProps, {onlinePlayersValue?: string,
  blacklistedPlayersValue?: string, whitelistedPlayersValue?: string, lastChangedValue?: string}> {

  public static show(promptText: string, onlinePlayersItems: PickerPropsItem[], blacklistedPlayersItems: PickerPropsItem[],
                     whitelistedPlayersItems: PickerPropsItem[], listFunctions: Array<((userId: string) => void)>) {
    RX.Modal.show(
      <BlacklistWhitelistPromptDialog promptText={promptText} onlinePlayersItems={onlinePlayersItems}
        blacklistedPlayersItems={blacklistedPlayersItems} whitelistedPlayersItems={whitelistedPlayersItems} listFunctions={listFunctions}/>,
      "blacklistWhitelistPromptDialog",
    );
  }

  constructor(props: BlacklistWhitelistPromptDialogProps) {
    super(props);
    this.state = {onlinePlayersValue: "",
      blacklistedPlayersValue: "",
      whitelistedPlayersValue: "",
      lastChangedValue: ""};
  }

  public render() {
    return (
      <RX.View style={Styles.whiteBox}>
        <RX.Text>{this.props.promptText}</RX.Text>
        <RX.Text>Online Players:</RX.Text>
        <RX.Picker
          style={Styles.smallPickerInput}
          items={this.props.onlinePlayersItems}
          selectedValue={this.state.onlinePlayersValue}
          onValueChange={(value) => this.onValueChange(value, 0)}/>
        <RX.Text>Currently on Blacklist:</RX.Text>
        <RX.Picker
          style={Styles.smallPickerInput}
          items={this.props.blacklistedPlayersItems}
          selectedValue={this.state.blacklistedPlayersValue}
          onValueChange={(value) => this.onValueChange(value, 1)}/>
        <RX.Text>Currently on Whitelist:</RX.Text>
        <RX.Picker
          style={Styles.smallPickerInput}
          items={this.props.whitelistedPlayersItems}
          selectedValue={this.state.whitelistedPlayersValue}
          onValueChange={(value) => this.onValueChange(value, 2)}/>
        <RX.View style={Styles.flex.row}>
          <RX.Button style={Styles.okButton} onPress={() => this.props.listFunctions[0].call(this.state.lastChangedValue)}>
            <RX.Text>Add to Blacklist</RX.Text>
          </RX.Button>
          <RX.Button style={Styles.okButton} onPress={() => this.props.listFunctions[1].call(this.state.lastChangedValue)}>
            <RX.Text>Remove from Blacklist</RX.Text>
          </RX.Button>
        </RX.View>
        <RX.View style={Styles.flex.row}>
          <RX.Button style={Styles.okButton} onPress={() => this.props.listFunctions[2].call(this.state.lastChangedValue)}>
            <RX.Text>Add to Whitelist</RX.Text>
          </RX.Button>
          <RX.Button style={Styles.okButton} onPress={() => this.props.listFunctions[3].call(this.state.lastChangedValue)}>
            <RX.Text>Remove from Whitelist</RX.Text>
          </RX.Button>
        </RX.View>
        <RX.Button style={[Styles.okButton, Styles.alignEnd]} onPress={this.closeClicked}>
          <RX.Text>Close</RX.Text>
        </RX.Button>
      </RX.View>
    );
  }

  private onValueChange = (newValue: string, valueToChange: number) => {
    switch (valueToChange) {
      case 0:
        this.setState({onlinePlayersValue: newValue});
        break;
      case 1:
        this.setState({blacklistedPlayersValue: newValue});
        break;
      case 2:
        this.setState({whitelistedPlayersValue: newValue});
        break;
    }
    this.state.lastChangedValue = newValue;
  }

  private closeClicked = () => {
    RX.Modal.dismiss("blacklistWhitelistPromptDialog");
  }

}
