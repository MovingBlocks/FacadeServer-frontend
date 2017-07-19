import RX = require("reactxp");
import Styles = require("./Styles");

interface TextPromptDialogProps {
  promptText: string;
  okCallback: (value: string) => void;
}

export class TextPromptDialog extends RX.Component<TextPromptDialogProps, {value: string}> {

  public static show(promptText: string, okCallback: (value: string) => void ) {
    RX.Modal.show(<TextPromptDialog promptText={promptText} okCallback={okCallback}/>, "promptDialog");
  }

  constructor(props: TextPromptDialogProps) {
    super(props);
    this.state = {value: ""};
  }

  public render() {
    return (
      <RX.View style={[Styles.box, Styles.greyBorder, Styles.dialog]}>
        <RX.Text>{this.props.promptText}</RX.Text>
        <RX.TextInput style={[Styles.box, Styles.greyBorder]} value={this.state.value} onChangeText={this.onChange} multiline={false} />
        <RX.View style={Styles.flexRow/**/}>
          <RX.Button onPress={this.okClicked} style={[Styles.box, Styles.greyBorder, Styles.okButton]}>OK</RX.Button>
          <RX.Button onPress={this.cancelClicked} style={[Styles.box, Styles.greyBorder, Styles.cancelButton]}>Cancel</RX.Button>
        </RX.View>
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
