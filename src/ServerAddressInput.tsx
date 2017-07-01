import RX = require("reactxp");
import Styles = require("./Styles");

interface ServerAddressInputProps {
  callback: (value: string) => void;
}

class ServerAddressInput extends RX.Component<ServerAddressInputProps, {value: string}> {

  constructor(props: ServerAddressInputProps) {
    super(props);
    this.state = {value: "ws://localhost:8080/ws"};
  }

  public render() {
    return (
      <RX.View style={[Styles.box, Styles.greyBorder]}>
        <RX.Text>Server WebSocket address:</RX.Text>
        <RX.TextInput style={[Styles.box, Styles.greyBorder]} value={this.state.value} onChangeText={this.onChangeValue} />
        <RX.Button onPress={this.onButtonClick} style={[Styles.box, Styles.greyBorder, Styles.okButton]}>Click to connect</RX.Button>
      </RX.View>
    );
  }

  private onChangeValue = (newValue: string) => {
    this.setState({value: newValue});
  }

  private onButtonClick = () => {
    this.props.callback(this.state.value);
  }
}

export default ServerAddressInput;
