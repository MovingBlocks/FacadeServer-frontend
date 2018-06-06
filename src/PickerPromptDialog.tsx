import RX = require("reactxp");
import Styles = require("./styles/main");
import {PickerPropsItem} from "reactxp/dist/common/Types";
import {OkCancelButtonBar} from "./OkCancelButtonBar";

interface PickerPromptDialogProps {
  promptText: string;
  items: PickerPropsItem[];
  okCallback: (value: string) => void;
}

export class PickerPromptDialog extends RX.Component<PickerPromptDialogProps, {selectedValue: string}> {

  public static show(promptText: string, items: PickerPropsItem[], okCallback: (value: string) => void) {
    RX.Modal.show(
      <PickerPromptDialog promptText={promptText} items={items} okCallback={okCallback}/>, "pickerPromptDialog",
    );
  }

  constructor(props: PickerPromptDialogProps) {
    super(props);
    this.state = {selectedValue: this.props.items[0].value};
  }

  public render() {
    return (
      <RX.View style={Styles.whiteBox}>
        <RX.Text>{this.props.promptText}</RX.Text>
        <RX.Picker
          style={Styles.smallPickerInput}
          items={this.props.items}
          selectedValue={this.state.selectedValue}
          onValueChange={this.onValueChange}/>
        <OkCancelButtonBar onOk={this.okClicked} onCancel={this.cancelClicked}/>
      </RX.View>
    );
  }

  private onValueChange = (newValue: string) => {
    this.setState({selectedValue: newValue});
  }

  private okClicked = () => {
    this.props.okCallback(this.state.selectedValue);
    RX.Modal.dismiss("pickerPromptDialog");
  }

  private cancelClicked = () => {
    RX.Modal.dismiss("pickerPromptDialog");
  }

}
