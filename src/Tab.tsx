import RX = require('reactxp');
import IncomingMessage from './io/IncomingMessage'

abstract class TabModel {

  abstract getName(): string;
  abstract getObservedResources(): string[];
  abstract onMessage(message: IncomingMessage): void;
  abstract setUpdateViewCallback(callback: (viewState: any) => void): void;
}

export default TabModel;
