/* tslint:disable:prefer-for-of */
/* tslint:disable:no-bitwise */

import RX = require("reactxp");
import Styles = require("../../styles/main");
import {TabView} from "../TabView";
import {ConsoleAutocomplete} from "./ConsoleAutocomplete";
import {ConsoleTabController} from "./ConsoleTabController";
import {ConsoleTabState, Message} from "./ConsoleTabState";

interface MessagePart {
  text: string;
  color: number;
}

export class ConsoleTabView extends TabView<ConsoleTabState> {

  private firstColor: number = 0xE000;
  private lastColor: number = 0xEFFF;
  private resetColor: number = 0xF000;
  private colorStyles: any = {};

  public render() {
    const controller: ConsoleTabController = this.props.model.getController() as ConsoleTabController;
    return (
      <RX.ScrollView>
        <RX.View style={[Styles.flex.column, Styles.flex.fill, Styles.justifyFlexEnd]}>
          <RX.View>
            {this.state.messages.map((msg, index) => <RX.Text key={index}>[{msg.type}] {this.renderMessage(msg.message)}</RX.Text>)}
          </RX.View>
        </RX.View>
        <RX.View style={Styles.flex.row}>
          <RX.TextInput
            style={[Styles.whiteBox, Styles.commandTextInput]}
            value={this.state.commandToSend}
            onChangeText={this.onChangeValue}
            autoFocus={true}
            onKeyPress={(event) =>  {this.handleKeypress(event, controller); }}/>
          <RX.Button style={Styles.okButton} onPress={() => this.onCommandEntered(this.state.commandToSend, controller)}>
            <RX.Text>Execute</RX.Text>
          </RX.Button>
        </RX.View>
      </RX.ScrollView>
    );
  }

  private onCommandEntered(command: string, controller: ConsoleTabController) {
    command = command.indexOf(" ") === -1 ? command : command.substr(0, command.indexOf(" "));
    if (command === "help") {
      const addedMessage: Message[] = [{type: "CONSOLE", message: this.state.filteredHelpText}];
      this.props.model.update({messages: this.state.messages.concat(addedMessage), commandToSend: ""});
    } else if (this.state.commands.indexOf(command) !== -1) {
      controller.execute();
    } else {
      this.props.model.update({commandToSend: "enter valid command"});
    }
  }

  private onChangeValue = (newValue: string) => {
    this.props.model.update({commandToSend: newValue});
    ConsoleAutocomplete.clear();
  }

  private renderMessage(message: string): JSX.Element {
    const parts: MessagePart[] = [];
    let currentPart: MessagePart = {text: "", color: 0};
    for (let i: number = 0; i < message.length; i++) {
      const charCode: number = message.charCodeAt(i);
      if (charCode === this.resetColor) {
        parts.push(currentPart);
        currentPart  = {text: "", color: 0};
      } else if (charCode >= this.firstColor && charCode <= this.lastColor) {
        if (currentPart.text !== "") {
          parts.push(currentPart);
        }
        currentPart = {text: "", color: charCode};
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
        colorStyle = RX.Styles.createTextStyle({color: this.colorIdToRgbString(part.color)});
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

  private autoComplete(command: string) {
    ConsoleAutocomplete.setCommandList(this.state.commands);
    this.props.model.update({commandToSend: ConsoleAutocomplete.complete(command)});
  }

  private handleKeypress(event: any, controller: ConsoleTabController) {
    if (event.keyCode === 9) {
      this.autoComplete(this.state.commandToSend);
    } else if (event.keyCode === 13) {
      this.onCommandEntered(this.state.commandToSend, controller);
    }
  }

}
