import RX = require("reactxp");
import Styles = require("./styles/main");

interface WaitOverlayProps {
  message: string;
}

export class WaitOverlay extends RX.Component<WaitOverlayProps, null> {

  public static open(message: string) {
    RX.Modal.show(<WaitOverlay message={message}/>, "waitOverlay");
  }

  public static close() {
    RX.Modal.dismiss("waitOverlay");
  }

  public render() {
    return (
      <RX.View style={Styles.waitOverlay}>
        <RX.View style={[Styles.flex.row, Styles.justifyCenter]}>
          <RX.Text style={Styles.headerText}>{this.props.message}</RX.Text>
        </RX.View>
        <RX.View style={[Styles.flex.row, Styles.justifyCenter]}>
          <RX.ActivityIndicator color="white" size="medium" />
        </RX.View>
      </RX.View>
    );
  }
}
