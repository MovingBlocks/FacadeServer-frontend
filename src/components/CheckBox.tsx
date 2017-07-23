import RX = require("reactxp");
import ComponentStyles = require("./ComponentsStyles");

export interface CheckBoxProps {
  text: string;
  onCheckedChange: (checked: boolean) => void;
  checkedByDefault: boolean;
}

export class CheckBox extends RX.Component<CheckBoxProps, {checked: boolean}> {

  public componentWillMount() {
    this.setState({checked: this.props.checkedByDefault});
  }

  public render() {
    const toggle = () => {
      const value = !this.state.checked;
      this.props.onCheckedChange(value);
      this.setState({checked: value});
    };
    return (
      <RX.Button style={ComponentStyles.componentContainer} onPress={toggle}>
        <RX.View style={ComponentStyles.checkBoxOuterSquare}>
          <RX.View style={this.state.checked ? ComponentStyles.checkBoxInnerSquare : null} />
        </RX.View>
        <RX.Text>{this.props.text}</RX.Text>
      </RX.Button>
    );
  }
}
