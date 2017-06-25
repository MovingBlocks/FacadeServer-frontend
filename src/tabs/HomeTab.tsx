import RX = require('reactxp');
import Tab from '../Tab';
import IncomingMessage from '../io/IncomingMessage';

class HomeTab extends Tab<{}> {

  getName(): string {
    return 'Home';
  }

  getObservedResources(): string[] {
    return ['onlinePlayers'];
  }

  onMessage(message: IncomingMessage): void {
    console.log('New message to HOME tab:' + JSON.stringify(message));
  }

  render() {
    return <RX.Text>Test - this is the home tab</RX.Text>
  }
}

export = new HomeTab();
