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

const justifyFlexStart = RX.Styles.createViewStyle({
  justifyContent: "flex-start",
});

const justifySpaceBetween = RX.Styles.createViewStyle({
  justifyContent: "space-between",
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

const mobileHeaderMenu = RX.Styles.createViewStyle({
  flex: 1,
  paddingHorizontal: 8,
  paddingVertical: 4,
});

const mobileHeaderContent = RX.Styles.createViewStyle({
  flex: 3,
  marginLeft: 32,
});

const dialog = RX.Styles.createViewStyle({
  maxWidth: 450,
  minWidth: 300,
});

export = {
  backgrounds,
  box,
  cancelButton: [box, greyBorder, justifyCenter, backgrounds.red],
  commandTextInput,
  dialog,
  favoriteServerAddress,
  flex,
  greyBorder,
  header,
  headerText,
  justifyCenter,
  justifyFlexEnd,
  justifyFlexStart,
  justifySpaceBetween,
  mobileHeaderContent,
  mobileHeaderMenu,
  okButton: [box, greyBorder, justifyCenter, backgrounds.lime],
  scrollableDialog,
  smallTextInput: [box, greyBorder, backgrounds.white], // TODO: remove (use whiteBox)
  verticalScroll,
  waitOverlay: [flex.fillAll, backgrounds.lightGrayAlpha, justifyCenter],
  whiteBox: [box, greyBorder, backgrounds.white],
};
