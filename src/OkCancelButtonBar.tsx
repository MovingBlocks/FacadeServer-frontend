import RX = require("reactxp");
import Styles = require("./styles/main");

interface OkCancelButtonBarProps {
  okLabel?: string;
  cancelLabel?: string;
  onOk: () => void;
  onCancel: () => void;
}

export class OkCancelButtonBar extends RX.Component<OkCancelButtonBarProps, null> {

  public render() {
    const okLabel = this.props.okLabel ? this.props.okLabel : "OK";
    const cancelLabel = this.props.cancelLabel ? this.props.cancelLabel : "Cancel";
    return (
      <RX.View style={Styles.flex.row}>
        <RX.Button onPress={this.props.onOk} style={Styles.okButton}><RX.Text>{okLabel}</RX.Text></RX.Button>
        <RX.Button onPress={this.props.onCancel} style={Styles.cancelButton}><RX.Text>{cancelLabel}</RX.Text></RX.Button>
      </RX.View>
    );
  }
}
