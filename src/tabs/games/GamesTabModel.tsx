import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {IncomingMessage} from "../../io/IncomingMessage";
import {ResourceName} from "../../io/ResourceName";
import {AvailableModules} from "../../modules/AvailableModules";
import {ResourceSubscriberTabModel} from "../ResourceSubscriberTabModel";
import {TabController} from "../TabController";
import {GamesTabController} from "./GamesTabController";
import {GameInfo, GamesTabState} from "./GamesTabState";

export class GamesTabModel extends ResourceSubscriberTabModel<GamesTabState> {

  public getName(): string {
    return "Games and Modules";
  }

  public getSubscribedResourceNames(): ResourceName[] {
    return ["games", "engineState", "availableModules"];
  }

  public getDefaultState(): GamesTabState {
    return {games: [], engineState: {state: "UNKNOWN"}};
  }

  public initController(): TabController<GamesTabState> {
    return new GamesTabController();
  }

  public onResourceUpdated(resourceName: string, data: any): void {
    if (resourceName === "engineState") {
      this.update({engineState: data as EngineStateMetadata});
    } else if (resourceName === "games") {
      this.update({games: data as GameInfo[]});
    } else if (resourceName === "availableModules") {
      this.update({availableModules: data as AvailableModules});
    }
  }

}
