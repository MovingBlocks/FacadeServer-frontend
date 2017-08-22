import RX = require("reactxp");
import Styles = require("./styles/main");
import {MessageDialog} from "./MessageDialog";

export class YesNoDialog {

  public static show(message: string, onYes?: () => void, onNo?: () => void) {
    MessageDialog.show(message, {label: "Yes", style: "GREEN", onClick: onYes}, {label: "No", style: "RED", onClick: onNo});
  }

  private constructor() {
  }
}
