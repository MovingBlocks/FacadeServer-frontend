import RX = require("reactxp");
import Styles = require("./Styles");

interface AlertDialogProps {
  message: string;
}

export class AlertDialog extends RX.Component<AlertDialogProps, null> {

  public static show(message: string) {
    RX.Modal.show(<AlertDialog message={message}/>, "alertDialog");
  }

  public render() {
    return (
      <RX.View style={[Styles.box, Styles.greyBorder]}>
        <RX.Text>{this.props.message}</RX.Text>
        <RX.Button onPress={this.close} style={[Styles.box, Styles.greyBorder, Styles.okButton]}>OK</RX.Button>
      </RX.View>
    );
  }

  private close() {
    RX.Modal.dismiss("alertDialog");
  }
}
