import RX = require("reactxp");
import Styles = require("./styles/main");
import {OkCancelButtonBar} from "./OkCancelButtonBar";

interface TextPromptDialogProps {
  promptText: string;
  okCallback: (value: string) => void;
  multiline?: boolean;
}

export class TextPromptDialog extends RX.Component<TextPromptDialogProps, {value: string}> {

  public static show(promptText: string, okCallback: (value: string) => void, multiline?: boolean) {
    RX.Modal.show(<TextPromptDialog promptText={promptText} okCallback={okCallback} multiline={multiline}/>, "promptDialog");
  }

  constructor(props: TextPromptDialogProps) {
    super(props);
    this.state = {value: ""};
  }

  public render() {
    return (
      <RX.View style={Styles.whiteBox}>
        <RX.Text>{this.props.promptText}</RX.Text>
        <RX.TextInput style={Styles.whiteBox} value={this.state.value} onChangeText={this.onChange} multiline={this.props.multiline} />
        <OkCancelButtonBar onOk={this.okClicked} onCancel={this.cancelClicked}/>
      </RX.View>
    );
  }

  private onChange = (newValue: string) => {
    this.setState({value: newValue});
  }

  private okClicked = () => {
    this.props.okCallback(this.state.value);
    RX.Modal.dismiss("promptDialog");
  }

  private cancelClicked = () => {
    RX.Modal.dismiss("promptDialog");
  }

}
