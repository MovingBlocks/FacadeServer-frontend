import RX = require('reactxp');
import Tab from '../Tab';

class HomeTab extends Tab<String> {

  getName(): String {
    return 'Home';
  }

  render() {
    return <RX.Text>Test - this is the home tab</RX.Text>
  }
}

export = new HomeTab();
