import RX = require("reactxp");
import Styles = require("./styles/main");

interface AlertDialogProps {
  afterClose: () => void;
  message: string;
}

export class AlertDialog extends RX.Component<AlertDialogProps, null> {

  public static show(message: string, afterClose?: () => void) {
    RX.Modal.show(<AlertDialog message={message} afterClose={afterClose}/>, "alertDialog");
  }

  public render() {
    return (
      <RX.View style={Styles.whiteBox}>
        <RX.Text>{this.props.message}</RX.Text>
        <RX.Button onPress={this.close} style={Styles.okButton}>OK</RX.Button>
      </RX.View>
    );
  }

  private close = () => {
    RX.Modal.dismiss("alertDialog");
    if (this.props.afterClose) {
      this.props.afterClose();
    }
  }
}
