import RX = require("reactxp");
import Styles = require("./styles/main");
import {AlertDialog} from "./AlertDialog";
import {TextPromptDialog} from "./TextPromptDialog";

interface FavoriteServer {
  name: string;
  address: string;
}

interface ServerAddressInputProps {
  callback: (value: string) => void;
}

interface ServerAddressInputState {
  value?: string;
  favorites?: FavoriteServer[];
}

export class ServerAddressInput extends RX.Component<ServerAddressInputProps, ServerAddressInputState> {

  constructor(props: ServerAddressInputProps) {
    super(props);
  }

  public componentWillMount() {
    this.setState({value: "ws://localhost:8080/ws", favorites: []});
    this.refreshFavorites();
  }

  public render() {
    return (
      <RX.ScrollView style={[Styles.whiteBox, Styles.scrollableDialog]}>
        <RX.Text>Server WebSocket address:</RX.Text>
        <RX.TextInput style={Styles.whiteBox} value={this.state.value} onChangeText={this.onChangeValue} />
        <RX.View style={Styles.flex.row}>
          <RX.Button onPress={this.addFavorite} style={Styles.okButton}><RX.Text>Add favorite</RX.Text></RX.Button>
          <RX.Button onPress={() => this.props.callback(this.state.value)} style={Styles.okButton}><RX.Text>Connect</RX.Text></RX.Button>
        </RX.View>
        <RX.View style={Styles.flex.column}>
          <RX.Text>Favorites:</RX.Text>
          {this.state.favorites.map(this.renderFavorite)}
        </RX.View>
      </RX.ScrollView>
    );
  }

  private renderFavorite = (value: FavoriteServer) => {
    return (
      <RX.View style={Styles.flex.row} key={value.name}>
        <RX.View>
          <RX.Text>{value.name}</RX.Text>
          <RX.Text style={Styles.favoriteServerAddress}>{value.address}</RX.Text>
        </RX.View>
        <RX.Button style={Styles.okButton} onPress={() => this.props.callback(value.address)}><RX.Text>Connect</RX.Text></RX.Button>
        <RX.Button style={Styles.cancelButton} onPress={() => this.deleteFavorite(value.name)}><RX.Text>Delete</RX.Text></RX.Button>
      </RX.View>
    );
  }

  private refreshFavorites = () => {
    this.getFavorites((favorites: FavoriteServer[]) => this.setState({favorites}));
  }

  private onChangeValue = (newValue: string) => {
    this.setState({value: newValue});
  }

  private addFavorite = () => {
    TextPromptDialog.show("Enter a name for this server:", (name: string) => {
      this.getFavorites((favorites: FavoriteServer[]) => {
        if (favorites.filter((value: FavoriteServer) => value.name === name).length === 0) {
          favorites.push({name, address: this.state.value});
          this.setFavorites(favorites);
        } else {
          AlertDialog.show("Error: a favorite server with the same name already exists.");
        }
      });
    });
  }

  private deleteFavorite = (name: string) => {
    this.getFavorites((data: FavoriteServer[]) => {
      const index = this.findIndex(data, (value: FavoriteServer) => value.name === name);
      if (index !== -1) {
        data.splice(index, 1);
        this.setFavorites(data);
        this.refreshFavorites();
      } else {
        AlertDialog.show("Error: this entry does not exist or more entries with the same name exist.");
      }
    });
  }

  private setFavorites(data: FavoriteServer[]) {
    RX.Storage.setItem("favServers", JSON.stringify(data));
  }

  private getFavorites(then: (result: FavoriteServer[]) => void) {
    RX.Storage.getItem("favServers").then((data: string) =>
      then(data !== null ? JSON.parse(data) as FavoriteServer[] : []));
  }

  private findIndex<T>(array: T[], predicate: (value: T) => boolean) {
    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
        return i;
      }
    }
    return -1;
  }

}
