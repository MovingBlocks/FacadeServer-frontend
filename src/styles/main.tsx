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

const justifyFlexEnd = RX.Styles.createViewStyle({
  justifyContent: "flex-end",
});

const commandTextInput = RX.Styles.createTextInputStyle({
  flex: 5,
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

const scrollableDialog = RX.Styles.createScrollViewStyle({
  alignSelf: "center",
  maxHeight: 200,
  maxWidth: 400,
});

const favoriteServerAddress = RX.Styles.createTextStyle({
  fontSize: 12,
  maxHeight: 12,
  maxWidth: 200,
});

export = {
  backgrounds,
  box,
  cancelButton: [box, greyBorder, justifyCenter, backgrounds.red],
  commandTextInput,
  favoriteServerAddress,
  flex,
  greyBorder,
  header: [box, header],
  headerText,
  justifyCenter,
  justifyFlexEnd,
  okButton: [box, greyBorder, justifyCenter, backgrounds.lime],
  scrollableDialog,
  verticalScroll,
  waitOverlay: [flex.fillAll, backgrounds.lightGrayAlpha, justifyCenter],
  whiteBox: [box, greyBorder, backgrounds.white],
};
