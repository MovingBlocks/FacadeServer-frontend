import RX = require("reactxp");

const outerBase = RX.Styles.createViewStyle({
  alignItems: "center",
  borderColor: "black",
  borderStyle: "solid",
  borderWidth: 1,
  justifyContent: "center",
  marginRight: 4,
});

const innerBase = RX.Styles.createViewStyle({
  backgroundColor: "black",
});

export = {
  checkBoxInnerSquare: [innerBase, RX.Styles.createViewStyle({
    borderRadius: 2,
    height: 8,
    width: 8,
  })],
  checkBoxOuterSquare: [outerBase, RX.Styles.createViewStyle({
    borderRadius: 2,
    height: 16,
    width: 16,
  })],
  componentContainer: RX.Styles.createViewStyle({
    alignSelf: "flex-start",
    flexDirection: "row",
    margin: 2,
  }),
  radioButtonInnerCircle: [innerBase, RX.Styles.createViewStyle({
    borderRadius: 4,
    height: 8,
    width: 8,
  })],
  radioButtonOuterCircle: [outerBase, RX.Styles.createViewStyle({
    borderRadius: 8,
    height: 16,
    width: 16,
  })],
};
