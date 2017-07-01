import RX = require("reactxp");
import Styles = require("../../Styles");
import {TabView} from "../TabView";
import {ConsoleTabState} from "./ConsoleTabState";

export class ConsoleTabView extends TabView<ConsoleTabState> {

  public getDefaultState(): ConsoleTabState {
    return {};
  }

  public render() {
    return (
      <RX.View style={[Styles.flexColumn, Styles.consoleRoot]}>
        <RX.View>
          {this.state.messages.map((msg, index) => <RX.Text key={index}>[{msg.type}] {msg.message}</RX.Text>)}
        </RX.View>
        <RX.View style={Styles.consoleInputView}>
          <RX.TextInput style={[Styles.box, Styles.greyBorder, Styles.commandTextInput]} value="type a command here..." />
          <RX.Button style={[Styles.box, Styles.greyBorder]}>Execute</RX.Button>
        </RX.View>
      </RX.View>
    );
  }

}
