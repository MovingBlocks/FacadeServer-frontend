import RX = require("reactxp");
import backgrounds = require("./backgrounds");
import flex = require("./flex");

const box = RX.Styles.createViewStyle({
  borderRadius: 4,
  margin: 8,
  padding: 8,
});

const justifyCenter = RX.Styles.createViewStyle({
  justifyContent: "center",
});

const commandTextInput = RX.Styles.createTextInputStyle({
  flex: 5,
});

const justifyFlexEnd = RX.Styles.createViewStyle({
  justifyContent: "flex-end",
});

const greyBorder = RX.Styles.createViewStyle({
  borderColor: "#808080",
  borderStyle: "solid",
  borderWidth: 1,
});

const headerText = RX.Styles.createTextStyle({
  color: "white",
  fontSize: 20,
});

const header = RX.Styles.createViewStyle({
  backgroundColor: "#259c9c",
  flexDirection: "row",
  justifyContent: "space-between",
});

const verticalScroll = RX.Styles.createScrollViewStyle({
  height: 100,
  width: 300,
});

export = {
  backgrounds,
  box,
  cancelButton: [box, greyBorder, justifyCenter, backgrounds.red],
  commandTextInput,
  flex,
  greyBorder,
  header: [box, header],
  headerText,
  justifyCenter,
  justifyFlexEnd,
  okButton: [box, greyBorder, justifyCenter, backgrounds.lime],
  verticalScroll,
  whiteBox: [box, greyBorder, backgrounds.white],
};
