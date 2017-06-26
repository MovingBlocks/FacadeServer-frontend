import RX = require('reactxp');
import Styles = require('../Styles');

import {TabModel, TabView} from '../Tab';
import IncomingMessage from '../io/IncomingMessage';

interface Message {
  type: 'CONSOLE' | 'CHAT' | 'ERROR' | 'NOTIFICATION';
  message: string;
}

interface ConsoleTabState {
  messages?: Message[];
  commandToSend?: string;
}

export class ConsoleTabView extends TabView<ConsoleTabState> {

  getDefaultState(): ConsoleTabState {
    return {};
  }

  render() {
    return <RX.View style={[Styles.flexColumn, Styles.consoleRoot]}>
      <RX.View>
        {this.state.messages.map((msg, index) => <RX.Text key={index}>[{msg.type}] {msg.message}</RX.Text>)}
      </RX.View>
      <RX.View style={Styles.consoleInputView}>
        <RX.TextInput style={[Styles.box, Styles.greyBorder, Styles.commandTextInput]} value="type a command here..." />
        <RX.Button style={[Styles.box, Styles.greyBorder]}>Execute</RX.Button>
      </RX.View>
    </RX.View>
  }

}

export class ConsoleTabModel extends TabModel<ConsoleTabState> {

  getName(): string {
    return 'Console';
  }

  getObservedResources(): string[] {
    return ['console'];
  }

  getDefaultState(): ConsoleTabState {
    return {messages: []};
  }

  onMessage(message: IncomingMessage): void {
    if (message.messageType == 'RESOURCE_EVENT' && message.resourceName == 'console') {
      const oldState: ConsoleTabState = this.getState();
      this.update({messages: oldState.messages.concat((message.data) as Message)});
    }
  }

}
