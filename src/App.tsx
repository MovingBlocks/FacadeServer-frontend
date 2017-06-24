import RX = require('reactxp');
import Styles = require('./Styles');
import Tabs = require('./Tabs');
import Tab from './Tab';


interface AppState {
  activeTab: number;
}

class App extends RX.Component<{}, AppState> {

  private tabs: Tab<Object>[] = Tabs;

  constructor(props: {}) {
    super(props);
    this.state = {activeTab: 0};
  }

  render() {
    return <RX.View style={Styles.flex}>
      <RX.View style={[Styles.box, Styles.headerView]}>
        <RX.Text style={Styles.headerText}>Terasology Server web interface</RX.Text>
        <RX.Text>Unauthenticated mode - click to login</RX.Text>
      </RX.View>
      <RX.View style={Styles.contentView}>
        <RX.View style={[Styles.box, Styles.greyBorder]}>
          {this.tabs.map((item, index) =>
            <RX.Button style={[Styles.greyBorder, Styles.box]} onPress={() => {this.changeTab(index)}}>{item.getName()}</RX.Button>
          )}
        </RX.View>
        <RX.View style={[Styles.box, Styles.greyBorder, Styles.flex]}>
          {this.tabs[this.state.activeTab].render()}
        </RX.View>
      </RX.View>
    </RX.View>;
  }

  private changeTab(index: number) {
    this.setState({activeTab: index});
  }
}

export = App;
