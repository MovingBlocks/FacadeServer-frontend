import RX = require('reactxp');

abstract class Tab<T> extends RX.Component<T, null> {

  abstract getName(): String;
}

export default Tab;
