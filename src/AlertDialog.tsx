import RX = require("reactxp");
import {MessageDialog} from "./MessageDialog";

export class AlertDialog {

  public static show(message: string, afterClose?: () => void) {
    MessageDialog.show(message, {label: "OK", style: "GREEN", onClick: afterClose});
  }

  private constructor() {
  }
}
