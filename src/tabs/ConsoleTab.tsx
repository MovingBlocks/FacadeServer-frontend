import RX = require('reactxp');
import Tab from '../Tab';
import IncomingMessage from '../io/IncomingMessage'

class ConsoleTab extends Tab<{}> {

  getName(): string {
    return 'Console';
  }

  getObservedResources(): string[] {
    return ['console'];
  }

  onMessage(message: IncomingMessage): void {
    console.log('New message to CONSOLE tab:' + JSON.stringify(message));
  }

  render() {
    return <RX.Text>Test - this is the console tab</RX.Text>
  }
}

export = new ConsoleTab();
