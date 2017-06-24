import RX = require('reactxp');

export = {
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
  okButton: RX.Styles.createButtonStyle({
    backgroundColor: 'lime',
    justifyContent: 'center'
  })
};
