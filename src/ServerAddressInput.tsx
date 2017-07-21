import RX = require("reactxp");
import Styles = require("./styles/main");

interface ServerAddressInputProps {
  callback: (value: string) => void;
}

export class ServerAddressInput extends RX.Component<ServerAddressInputProps, {value: string}> {

  constructor(props: ServerAddressInputProps) {
    super(props);
    this.state = {value: "ws://localhost:8080/ws"};
  }

  public render() {
    return (
      <RX.View style={Styles.whiteBox}>
        <RX.Text>Server WebSocket address:</RX.Text>
        <RX.TextInput style={Styles.whiteBox} value={this.state.value} onChangeText={this.onChangeValue} />
        <RX.Button onPress={this.onButtonClick} style={Styles.okButton}><RX.Text>Click to connect</RX.Text></RX.Button>
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
