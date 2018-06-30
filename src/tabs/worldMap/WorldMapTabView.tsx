import RX = require("reactxp");
import Styles = require("../../styles/main");

import {CheckBox} from "../../components/CheckBox";
import {TabView} from "../TabView";
import {WorldMapTabController} from "./WorldMapTabController";
import {WorldMapTabState} from "./WorldMapTabState";
import {Vector3i} from "./WorldMapTabState";

import {default as RXImageSvg, SvgPath as RXSvgPath} from "reactxp-imagesvg";

export class WorldMapTabView extends TabView<WorldMapTabState> {

  public render() {
    const controller: WorldMapTabController = this.props.model.getController() as WorldMapTabController;
    const center: Vector3i = this.state.center;
    let surface: boolean = true;
    let mapBlockWidth: number = this.state.mapBlockWidth;
    let mapBlockLength: number = this.state.mapBlockLength;
    return (
      <RX.ScrollView>
        <CheckBox text={"Surface"} onCheckedChange={(checked) => surface = checked} checkedByDefault={surface}/>
        <RX.View style={Styles.flex.row}>
          <RX.Text>Center:</RX.Text>
          <RX.TextInput
            style={[Styles.whiteBox, Styles.flex.fill, Styles.smallTextInput]}
            onChangeText={(x) => center.x = Number(x) > 250 ? 250 : Number(x)}/>
          <RX.TextInput
            style={[Styles.whiteBox, Styles.flex.fill, Styles.smallTextInput]}
            onChangeText={(y) => center.y = Number(y) > 250 ? 250 : Number(y)}/>
          <RX.TextInput
            style={[Styles.whiteBox, Styles.flex.fill, Styles.smallTextInput]}
            onChangeText={(z) => center.z = Number(z) > 250 ? 250 : Number(z)}/>
        </RX.View>
        <RX.View style={Styles.flex.row}>
          <RX.Text>Width:</RX.Text>
          <RX.TextInput
            style={[Styles.whiteBox, Styles.flex.fill, Styles.smallTextInput]}
            onChangeText={(width) => mapBlockWidth = Number(width)}/>
          <RX.Text>Length:</RX.Text>
          <RX.TextInput
            style={[Styles.whiteBox, Styles.flex.fill, Styles.smallTextInput]}
            onChangeText={(length) => mapBlockLength = Number(length)}/>
        </RX.View>
        <RX.Button
          style={Styles.okButton}
          onPress={() => controller.test(center, mapBlockWidth, mapBlockLength, surface)}>Submit</RX.Button>
        <RX.View style={Styles.flex.column}>
          {this.generateMap()}
        </RX.View>
      </RX.ScrollView>
    );
  }

  private generateMap() {
    const worldMap: JSX.Element[] = [];
    for (let z = 0; z < this.state.mapBlockLength; ++z) {
      worldMap[z] = (
        <RX.View style={Styles.flex.row} key={"column " + z}>
          {this.generateMapRow(z)}
        </RX.View>
      );
    }
    return worldMap;
  }

  private generateMapRow(row: number) {
    const worldMapRow: JSX.Element[] = [];
    for (let x = 0; x < this.state.mapBlockWidth; ++x) {
        worldMapRow[x] = (
          <RXImageSvg height={30 - this.state.mapBlockWidth / 10} width={30 - this.state.mapBlockLength / 10} key={"row " + x}><RXSvgPath
          fillColor={"#" + this.state.blockLut[this.state.blocks[x][row]]} d={"M0 0 H 90 V 90 H 0 Z"}/>
          </RXImageSvg>
        );
    }
    return worldMapRow;
  }

}
