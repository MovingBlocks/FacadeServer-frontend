import RX = require('reactxp');
import Tab from '../Tab';

class ConsoleTab extends Tab<String> {

  getName(): String {
    return 'Console';
  }

  render() {
    return <RX.Text>Test - this is the console tab</RX.Text>
  }
}

export = new ConsoleTab();
