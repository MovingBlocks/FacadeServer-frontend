import RX = require("reactxp");
import ComponentStyles = require("./ComponentsStyles");

export interface RadioButtonGroupProps {
  items: string[];
  keys?: string[];
  onSelectionChange: (selectedIndex: number, selectedKey: string) => void;
}

export class RadioButtonGroup extends RX.Component<RadioButtonGroupProps, {selectedIndex: number}> {

  public componentWillMount() {
    this.changeSelection(0);
  }

  public render() {
    return (
      <RX.View>
        {this.props.items.map(this.renderItem)}
      </RX.View>
    );
  }

  private renderItem = (item: string, index: number) => {
    return (
      <RX.Button key={index} style={ComponentStyles.componentContainer} onPress={() => this.changeSelection(index)}>
        <RX.View style={ComponentStyles.radioButtonOuterCircle}>
          <RX.View style={index === this.state.selectedIndex ? ComponentStyles.radioButtonInnerCircle : null} />
        </RX.View>
        <RX.Text>{item}</RX.Text>
      </RX.Button>
    );
  }

  private changeSelection = (newValue: number) => {
    this.setState({selectedIndex: newValue});
    this.props.onSelectionChange(newValue, this.props.keys ? this.props.keys[newValue] : null);
  }
}
