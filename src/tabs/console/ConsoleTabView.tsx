/* tslint:disable:max-line-length */ // TODO remove when styles are fixed

import RX = require("reactxp");
import Styles = require("../../Styles");
import {TabView} from "../TabView";
import {ConsoleTabController} from "./ConsoleTabController";
import {ConsoleTabState} from "./ConsoleTabState";

export class ConsoleTabView extends TabView<ConsoleTabState> {

  public render() {
    const controller: ConsoleTabController = this.props.model.getController() as ConsoleTabController;
    return (
      <RX.View style={[Styles.flexColumn, Styles.consoleRoot]}>
        <RX.View>
          {this.state.messages.map((msg, index) => <RX.Text key={index}>[{msg.type}] {msg.message}</RX.Text>)}
        </RX.View>
        <RX.View style={Styles.consoleInputView}>
          <RX.TextInput style={[Styles.box, Styles.greyBorder, Styles.commandTextInput]} value={this.state.commandToSend} onChangeText={this.onChangeValue} />
          <RX.Button style={[Styles.box, Styles.greyBorder]} onPress={controller.execute}>Execute</RX.Button>
        </RX.View>
      </RX.View>
    );
  }

  private onChangeValue = (newValue: string) => {
    this.props.model.update({commandToSend: newValue});
  }

}
