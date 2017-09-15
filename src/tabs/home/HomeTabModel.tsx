import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {OnlinePlayerMetadata} from "../../io/OnlinePlayerMetadata";
import {ResourcePath, ResourcePathUtil} from "../../io/ResourcePath";
import {ResourceSubscriberTabModel} from "../ResourceSubscriberTabModel";
import {TabController} from "../TabController";
import {TabModel} from "../TabModel";
import {HomeTabState} from "./HomeTabState";

export class HomeTabModel extends ResourceSubscriberTabModel<HomeTabState> {

  public getName(): string {
    return "Home";
  }

  public getSubscribedResourcePaths(): ResourcePath[] {
    return [
      ["onlinePlayers"],
      ["engineState"],
      ["config", "serverPort"],
      ["config", "MOTD"],
    ];
  }

  public getDefaultState(): HomeTabState {
    return {onlinePlayers: [], engineState: {state: "UNKNOWN"}, serverPort: 0, serverMotd: ""};
  }

  public initController(): TabController<null> {
    return null;
  }

  public onResourceUpdated(resourcePath: ResourcePath, data: any): void {
    if (ResourcePathUtil.equals(resourcePath, ["onlinePlayers"])) {
      this.update({onlinePlayers: data as OnlinePlayerMetadata[]});
    } else if (ResourcePathUtil.equals(resourcePath, ["engineState"])) {
      this.update({engineState: data as EngineStateMetadata});
    } else if (ResourcePathUtil.equals(resourcePath, ["config", "serverPort"])) {
      this.update({serverPort: data as number});
    } else if (ResourcePathUtil.equals(resourcePath, ["config", "MOTD"])) {
      this.update({serverMotd: data as string});
    }
  }

}
