import RX = require("reactxp");

export = {
  column: RX.Styles.createViewStyle({
    flexDirection: "column",
  }),
  fill: RX.Styles.createViewStyle({
    flex: 1,
  }),
  fillAll: RX.Styles.createViewStyle({
    alignSelf: "stretch",
    flex: 1,
  }),
  row: RX.Styles.createViewStyle({
    flexDirection: "row",
  }),
};
