import RX = require("reactxp");
import ComponentStyles = require("./ComponentsStyles");

export interface RadioButtonGroupProps {
  items: string[];
  onSelectionChange: (selectedIndex: number) => void;
}

export class RadioButtonGroup extends RX.Component<RadioButtonGroupProps, {selectedIndex: number}> {

  public componentWillMount() {
    this.setState({selectedIndex: 0});
  }

  public render() {
    return (
      <RX.View>
        {this.props.items.map(this.renderItem)}
      </RX.View>
    );
  }

  private renderItem = (item: string, index: number) => {
    const changeSelection = (newValue: number) => {
      this.setState({selectedIndex: newValue});
      this.props.onSelectionChange(newValue);
    };
    return (
      <RX.Button key={index} style={ComponentStyles.componentContainer} onPress={() => changeSelection(index)}>
        <RX.View style={ComponentStyles.radioButtonOuterCircle}>
          <RX.View style={index === this.state.selectedIndex ? ComponentStyles.radioButtonInnerCircle : null} />
        </RX.View>
        <RX.Text>{item}</RX.Text>
      </RX.Button>
    );
  }
}
