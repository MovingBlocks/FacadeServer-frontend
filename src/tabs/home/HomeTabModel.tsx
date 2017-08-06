import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {ResourceName} from "../../io/ResourceName";
import {ResourceSubscriberTabModel} from "../ResourceSubscriberTabModel";
import {TabController} from "../TabController";
import {TabModel} from "../TabModel";
import {HomeTabState} from "./HomeTabState";

export class HomeTabModel extends ResourceSubscriberTabModel<HomeTabState> {

  public getName(): string {
    return "Home";
  }

  public getSubscribedResourceNames(): ResourceName[] {
    return ["onlinePlayers", "engineState", "serverPort", "serverMotd"];
  }

  public getDefaultState(): HomeTabState {
    return {onlinePlayers: [], engineState: {state: "UNKNOWN"}, serverPort: 0, serverMotd: ""};
  }

  public initController(): TabController<null> {
    return null;
  }

  public onResourceUpdated(resourceName: string, data: any): void {
    if (resourceName === "onlinePlayers") {
      this.update({onlinePlayers: data as string[]});
    } else if (resourceName === "engineState") {
      this.update({engineState: data as EngineStateMetadata});
    } else if (resourceName === "serverPort") {
      this.update({serverPort: data as number});
    } else if (resourceName === "serverMotd") {
      this.update({serverMotd: data as string});
    }
  }

}
