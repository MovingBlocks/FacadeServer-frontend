import RX = require('reactxp');

export = {
  flexColumn: RX.Styles.createViewStyle({
    flex: 1,
    flexDirection: 'column'
  }),
  flexRow: RX.Styles.createViewStyle({
    flex: 1,
    flexDirection: 'row'
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
  }),
  consoleRoot: RX.Styles.createViewStyle({
    justifyContent: 'flex-end'
  }),
  consoleInputView: RX.Styles.createViewStyle({
    flexDirection: 'row'
  }),
  commandTextInput: RX.Styles.createTextInputStyle({
    flex: 5
  }),
};
