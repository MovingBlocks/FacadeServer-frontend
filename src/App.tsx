import RX = require('reactxp');
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';

const styles = {
  flex: RX.Styles.createViewStyle({
    flex: 1
  }),
  box: RX.Styles.createViewStyle({
    margin: 8,
    padding: 8,
    borderRadius: 4
  }),
  greyBorder: RX.Styles.createViewStyle({
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#808080'
  }),
  headerView: RX.Styles.createViewStyle({
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#259c9c',
  }),
  headerText: RX.Styles.createTextStyle({
    fontSize: 20,
    color: 'white'
  }),
  contentView: RX.Styles.createViewStyle({
    flexDirection: 'row',
    flex: 1
  }),
};

class App extends RX.Component<{}, null> {

  render() {
    return <RX.View style={styles.flex}>
      <RX.View style={[styles.box, styles.headerView]}>
        <RX.Text style={styles.headerText}>Terasology Server web interface</RX.Text>
        <RX.Text>Unauthenticated mode - click to login</RX.Text>
      </RX.View>
      <RX.View style={styles.contentView}>
        <RX.View style={[styles.box, styles.greyBorder]}>
          <RX.Text>Menu</RX.Text>
        </RX.View>
        <RX.View style={[styles.box, styles.greyBorder, styles.flex]}>
          <RX.Text>Main panel</RX.Text>
        </RX.View>
      </RX.View>
    </RX.View>;
  }
}

export = App;
