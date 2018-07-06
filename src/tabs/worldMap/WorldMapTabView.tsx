import RX = require("reactxp");
import Styles = require("../../styles/main");

import {Component} from "reactxp/dist/common/Interfaces";
import {Dimensions} from "reactxp/dist/common/Types";
import {CheckBox} from "../../components/CheckBox";
import {TabView} from "../TabView";
import {WorldMapTabController} from "./WorldMapTabController";
import {WorldMapTabState} from "./WorldMapTabState";
import {Vector3i} from "./WorldMapTabState";

export class WorldMapTabView extends TabView<WorldMapTabState> {
  private imageWidth: number = 0;
  private imageHeight: number = 0;
  private imageRef: Component<any, any> = new Component<any, any>();

  public render() {
    const controller: WorldMapTabController = this.props.model.getController() as WorldMapTabController;
    const center: Vector3i = {} as Vector3i;
    let surface: boolean = true;
    let mapBlockWidth: number = 0;
    let mapBlockLength: number = 0;
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
          onPress={() => controller.sendWorldMapData(center, mapBlockWidth, mapBlockLength, surface)}>Submit</RX.Button>
        <RX.View>
          <RX.Image ref={(ref) => this.imageRef = ref}
                    onLoad={(dimensions) => this.onImageLoad(dimensions)}
                    style={RX.Styles.createImageStyle({width: this.imageWidth, height: this.imageHeight})}
                    source={"data:image/png;base64," + this.state.mapImage}/>
        </RX.View>
      </RX.ScrollView>
    );
  }

  private onImageLoad(dimensions: Dimensions) {
    this.imageWidth = dimensions.width;
    this.imageHeight = dimensions.height;
    this.forceUpdate();
  }

}
