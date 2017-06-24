import RX = require('reactxp');
import App = require('./App');

RX.App.initialize(true, true);
RX.UserInterface.setMainView(<App />);

/*const modalCallback = (value: string) => {
  RX.Modal.dismiss('ServerAddressInput');
  connectionManager.connect(value);
}

RX.Modal.show(<ServerAddressInput callback={modalCallback}/>, 'ServerAddressInput');*/
