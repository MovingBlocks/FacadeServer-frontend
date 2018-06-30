import {TabController} from "../TabController";
import {Vector3i, WorldMapTabState} from "./WorldMapTabState";

export interface WorldMapInput {
  center: Vector3i;
  mapBlockWidth: number;
  mapBlockLength: number;
  surface: boolean;
}

export class WorldMapTabController extends TabController<WorldMapTabState> {

  public test(center: Vector3i, mapBlockWidth: number, mapBlockLength: number, surface: boolean) {
    const newData: WorldMapInput = {} as WorldMapInput;
    newData.center = center;
    newData.mapBlockWidth = mapBlockWidth;
    newData.mapBlockLength = mapBlockLength;
    newData.surface = surface;
    this.model.requestResource({
      method: "PUT",
      resourcePath: ["worldMap"],
      data: newData,
    });
  }

}
