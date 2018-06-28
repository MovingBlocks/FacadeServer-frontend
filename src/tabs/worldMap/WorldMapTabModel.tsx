import {ResourcePath, ResourcePathUtil} from "../../io/ResourcePath";
import {ResourceSubscriberTabModel} from "../ResourceSubscriberTabModel";
import {TabController} from "../TabController";
import {WorldMapTabController} from "./WorldMapTabController";
import {WorldMapTabState} from "./WorldMapTabState";

export class WorldMapTabModel extends ResourceSubscriberTabModel<WorldMapTabState> {

  public getName(): string {
    return "World Map";
  }

  public getSubscribedResourcePaths(): ResourcePath[] {
    return [
      ["worldMap"],
    ];
  }

  public getDefaultState(): WorldMapTabState {
    return {topLeft: {x: 0, y: 0, z: 0}, blocks: [], blockLut: {[""] : ""}, mapBlockWidth: 0, mapBlockLength: 0};
  }

  public initController(): TabController<WorldMapTabState> {
    return new WorldMapTabController();
  }

  public onResourceUpdated(resourcePath: ResourcePath, data: any): void {
    if (ResourcePathUtil.equals(resourcePath, ["worldMap"])) {
        this.update({topLeft: data.topLeft, blocks: data.blocks, blockLut: data.blockLut,
          mapBlockWidth: data.mapBlockWidth, mapBlockLength: data.mapBlockLength});
    }
  }

}
