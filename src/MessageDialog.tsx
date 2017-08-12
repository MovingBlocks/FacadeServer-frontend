import RX = require("reactxp");
import Styles = require("./styles/main");
import {ButtonBar, ButtonProps} from "./ButtonBar";

interface MessageDialogProps {
  message: string;
  buttons: ButtonProps[];
}

export class MessageDialog extends RX.Component<MessageDialogProps, null> {

  public static show(message: string, ...buttons: ButtonProps[]) {
    RX.Modal.show(<MessageDialog message={message} buttons={buttons} />, "messageDialog");
  }

  public render() {
    return (
      <RX.View style={Styles.whiteBox}>
        <RX.Text>{this.props.message}</RX.Text>
        <ButtonBar buttons={this.props.buttons} preAnyButtonCallback={this.close} />
      </RX.View>
    );
  }

  private close = () => {
    RX.Modal.dismiss("messageDialog");
  }
}
