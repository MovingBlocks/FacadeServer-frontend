import RX = require('reactxp');
import TabModel from '../Tab';
import IncomingMessage from '../io/IncomingMessage';

export class ConsoleTabView extends RX.Component<{model: TabModel}, null> {

  constructor(props: {model: TabModel}) {
      super(props);
      props.model.setUpdateViewCallback(() => this.setState);
  }

  render() {
    return <RX.Text>Test - this is the console tab</RX.Text>
  }

}

export class ConsoleTabModel extends TabModel {

  private updateView: (viewState: any) => void;

  getName(): string {
    return 'Console';
  }

  getObservedResources(): string[] {
    return ['console'];
  }

  onMessage(message: IncomingMessage): void {
    console.log('New message to CONSOLE tab:' + JSON.stringify(message));
  }

  setUpdateViewCallback(callback: (viewState: any) => void) {
    this.updateView = callback;
  }
}
