import RX = require('reactxp');
import IncomingMessage from './io/IncomingMessage'

abstract class Tab<T> extends RX.Component<{}, T> {

  abstract getName(): string;
  abstract getObservedResources(): string[];
  abstract onMessage(message: IncomingMessage): void;
}

export default Tab;
