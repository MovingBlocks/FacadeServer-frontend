import RX = require("reactxp");
import Styles = require("./styles/main");

type ButtonStyle = "GREEN" | "RED";

export interface ButtonProps {
  label: string;
  style: ButtonStyle;
  onClick: () => void;
}

interface ButtonBarProps {
  buttons: ButtonProps[];
  preAnyButtonCallback?: () => void;
  postAnyButtonCallback?: () => void;
}

export class ButtonBar extends RX.Component<ButtonBarProps, null> {

  private static styleMap: any = {
    GREEN: Styles.okButton,
    RED: Styles.cancelButton,
  };

  public render() {
    return (
      <RX.View style={Styles.flex.row}>
        {this.props.buttons.map(this.renderButton)}
      </RX.View>
    );
  }

  private renderButton = (button: ButtonProps, index: number) => (
    <RX.Button key={index} onPress={this.processClick(button.onClick)} style={ButtonBar.styleMap[button.style]}>
      <RX.Text>{button.label}</RX.Text>
    </RX.Button>
  )

  private processClick = (buttonCallback: () => void) => () => {
    this.doIfDefined(this.props.preAnyButtonCallback)();
    this.doIfDefined(buttonCallback)();
    this.doIfDefined(this.props.postAnyButtonCallback)();
  }

  private doIfDefined = (f: () => void) => f ? f : () => {return; };

}
