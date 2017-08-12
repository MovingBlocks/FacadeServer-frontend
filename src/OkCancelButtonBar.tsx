import RX = require("reactxp");
import Styles = require("./styles/main");
import {ButtonBar} from "./ButtonBar";

interface OkCancelButtonBarProps {
  okLabel?: string;
  cancelLabel?: string;
  onOk: () => void;
  onCancel: () => void;
}

export class OkCancelButtonBar extends RX.Component<OkCancelButtonBarProps, null> {

  private base: ButtonBar;

  public constructor(props: OkCancelButtonBarProps) {
    super(props);
    const okLabel: string = props.okLabel ? props.okLabel : "OK";
    const cancelLabel: string = props.cancelLabel ? props.cancelLabel : "Cancel";
    this.base = new ButtonBar({
      buttons: [
        {label: okLabel, style: "GREEN", onClick: props.onOk},
        {label: cancelLabel, style: "RED", onClick: props.onCancel},
      ],
    });
  }

  public render() {
    return this.base.render();
  }
}
