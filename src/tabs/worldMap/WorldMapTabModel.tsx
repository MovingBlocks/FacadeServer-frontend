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
    return {mapImage: ""};
  }

  public initController(): TabController<WorldMapTabState> {
    return new WorldMapTabController();
  }

  public onResourceUpdated(resourcePath: ResourcePath, data: any): void {
    if (ResourcePathUtil.equals(resourcePath, ["worldMap"])) {
        this.update({mapImage: data});
    }
  }

}
