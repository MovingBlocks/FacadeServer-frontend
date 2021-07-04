/* tslint:disable:prefer-for-of */
/* tslint:disable:no-bitwise */

import RX = require("reactxp");
import Styles = require("../../styles/main");
import { TabView } from "../TabView";
import { ConsoleAutocomplete } from "./../console/ConsoleAutocomplete";
import { ChatTabController } from "./ChatTabController";
import { ChatTabState, Message } from "./ChatTabState";

interface MessagePart {
  text: string;
  color: number;
}

export class ChatTabView extends TabView<ChatTabState> {

  private firstColor: number = 0xE000;
  private lastColor: number = 0xEFFF;
  private resetColor: number = 0xF000;
  private colorStyles: any = {};

  public render() {
    const controller: ChatTabController = this.props.model.getController() as ChatTabController;
    return (
      <RX.ScrollView>
        <RX.View style={[Styles.flex.column, Styles.flex.fill, Styles.justifyFlexEnd]}>
          <RX.View>
            {this.renderMessages()}
          </RX.View>
        </RX.View>
        <RX.Text>
          {this.renderStatusText()}</RX.Text>
        <RX.View style={Styles.flex.row}>
          <RX.TextInput
            style={[Styles.whiteBox, Styles.commandTextInput]}
            value={this.state.commandToSend}
            onChangeText={this.onChangeValue}
            autoFocus={true}
            onKeyPress={(event) => { this.handleKeypress(event, controller); }} />
          {this.renderRecipientList()}
          <RX.Button style={Styles.okButton} onPress={controller.execute}><RX.Text>Send</RX.Text></RX.Button>
        </RX.View>
      </RX.ScrollView>
    );
  }

  private onChangeValue = (newValue: string) => {
    this.props.model.update({ commandToSend: newValue });
    ConsoleAutocomplete.clear();
  }

  private renderRecipientList() {
    const allItem = { label: "all", value: "ALL" };
    return (
      <RX.Picker
        items={[allItem].concat(this.state.onlinePlayers.map((player) => ({ label: player.name, value: "PLAYER_" + player.name })))}
        selectedValue={this.state.selectedRecipient}
        onValueChange={(value, position) => { this.props.model.update({ selectedRecipient: value }); }} />
    );
  }

  private renderMessages() {
    return this.state.messages.map((msg: Message, index: number) =>
      <RX.Text selectable={true} key={index}>{this.renderMessage(msg.message)}</RX.Text>);
  }

  private renderStatusText() {
    switch (this.state.messageSendStatus) {
      case "SENDING":
        return "Sending...";
      case "ERROR":
        return this.state.errorMessage;
      case "SENT":
        return "Sent";
    }
    return "";
  }

  private renderMessage(message: string): JSX.Element {
    const parts: MessagePart[] = [];
    let currentPart: MessagePart = { text: "", color: 0 };
    for (let i: number = 0; i < message.length; i++) {
      const charCode: number = message.charCodeAt(i);
      if (charCode === this.resetColor) {
        parts.push(currentPart);
        currentPart = { text: "", color: 0 };
      } else if (charCode >= this.firstColor && charCode <= this.lastColor) {
        if (currentPart.text !== "") {
          parts.push(currentPart);
        }
        currentPart = { text: "", color: charCode };
      } else {
        currentPart.text += message[i];
      }
    }
    parts.push(currentPart);
    const renderedParts = parts.map((part: MessagePart, index: number) => {
      const colorId: string = part.color.toString();
      let colorStyle: RX.Types.TextStyle;
      if (this.colorStyles.hasOwnProperty(colorId)) {
        colorStyle = this.colorStyles[colorId];
      } else {
        colorStyle = RX.Styles.createTextStyle({ color: this.colorIdToRgbString(part.color) }) as RX.Types.TextStyle;
        this.colorStyles[colorId] = colorStyle;
      }
      return <RX.Text key={index} style={colorStyle}>{part.text}</RX.Text>;
    });
    return (
      <RX.Text>{renderedParts}</RX.Text>
    );
  }

  private colorIdToRgbString(colorId: number): string {
    const rgb: number = colorId - this.firstColor;
    const r: number = ((rgb >> 8) & 0xF) << 4;
    const g: number = ((rgb >> 4) & 0xF) << 4;
    const b: number = ((rgb >> 0) & 0xF) << 4;
    return "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
  }

  private handleKeypress(event: any, controller: ChatTabController) {
    if (event.keyCode === 13) {
      controller.execute();
    }
  }

}
