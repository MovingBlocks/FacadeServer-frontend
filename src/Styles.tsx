import RX = require("reactxp");

export = {
  box: RX.Styles.createViewStyle({
    borderRadius: 4,
    margin: 8,
    padding: 8,
  }),
  cancelButton: RX.Styles.createButtonStyle({
    backgroundColor: "red",
    justifyContent: "center",
  }),
  commandTextInput: RX.Styles.createTextInputStyle({
    flex: 5,
  }),
  consoleInputView: RX.Styles.createViewStyle({
    flexDirection: "row",
  }),
  consoleRoot: RX.Styles.createViewStyle({
    justifyContent: "flex-end",
  }),
  contentView: RX.Styles.createViewStyle({
    flex: 1,
    flexDirection: "row",
  }),
  flexColumn: RX.Styles.createViewStyle({
    flex: 1,
    flexDirection: "column",
  }),
  flexRow: RX.Styles.createViewStyle({
    flex: 1,
    flexDirection: "row",
  }),
  greyBorder: RX.Styles.createViewStyle({
    borderColor: "#808080",
    borderStyle: "solid",
    borderWidth: 1,
  }),
  headerText: RX.Styles.createTextStyle({
    color: "white",
    fontSize: 20,
  }),
  headerView: RX.Styles.createViewStyle({
    backgroundColor: "#259c9c",
    flexDirection: "row",
    justifyContent: "space-between",
  }),
  okButton: RX.Styles.createButtonStyle({
    backgroundColor: "lime",
    justifyContent: "center",
  }),
  verticalScroll: RX.Styles.createScrollViewStyle({
    height: 100,
    width: 300,
  }),
};
