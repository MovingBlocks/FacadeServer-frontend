import RX = require("reactxp");

export = {
  radioButtonContainer: RX.Styles.createViewStyle({
    flexDirection: "row",
    margin: 2,
  }),
  radioButtonInnerCircle: RX.Styles.createViewStyle({
    backgroundColor: "black",
    borderRadius: 4,
    height: 8,
    width: 8,
  }),
  radioButtonOuterCircle: RX.Styles.createViewStyle({
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
    height: 16,
    justifyContent: "center",
    marginRight: 4,
    width: 16,
  }),
};
