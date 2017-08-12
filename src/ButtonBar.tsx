import RX = require("reactxp");
import Styles = require("./styles/main");

type ButtonStyle = "GREEN" | "RED";

interface ButtonProps {
  label: string;
  style: ButtonStyle;
  onClick: () => void;
}

interface ButtonBarProps {
  buttons: ButtonProps[];
}

export class ButtonBar extends RX.Component<ButtonBarProps, null> {

  private static styleMap: any = {
    GREEN: Styles.okButton,
    RED: Styles.cancelButton,
  };

  public render() {
    const renderButton = (button: ButtonProps, index: number) => (
      <RX.Button key={index} onPress={button.onClick} style={ButtonBar.styleMap[button.style]}>
        <RX.Text>{button.label}</RX.Text>
      </RX.Button>
    );
    return (
      <RX.View style={Styles.flex.row}>
        {this.props.buttons.map(renderButton)}
      </RX.View>
    );
  }
}
