import RX = require("reactxp");
import Styles = require("../../styles/main");

import {TabView} from "../TabView";
import {WorldMapTabController} from "./WorldMapTabController";
import {WorldMapTabState} from "./WorldMapTabState";

import {default as RXImageSvg, SvgPath as RXSvgPath} from "reactxp-imagesvg";

export class WorldMapTabView extends TabView<WorldMapTabState> {

  public render() {
    const controller: WorldMapTabController = this.props.model.getController() as WorldMapTabController;
    return (
      <RX.View style={Styles.flex.column}>
          {this.generateMap()}
      </RX.View>
    );
  }

  private generateMap() {
    const worldMap: JSX.Element[] = [];
    for (let z = 0; z < this.state.mapBlockLength; ++z) {
      worldMap[z] = (
        <RX.View style={Styles.flex.row}>
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
          <RXImageSvg height={10} width={10}><RXSvgPath
          fillColor={"#" + this.state.blockLut[this.state.blocks[x][row]]} d={"M0 0 H 90 V 90 H 0 Z"}/>
          </RXImageSvg>
        );
    }
    return worldMapRow;
  }

}
