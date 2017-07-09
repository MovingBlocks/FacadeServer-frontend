import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {IncomingMessage} from "../../io/IncomingMessage";
import {ResourceSubscriberTabModel} from "../ResourceSubscriberTabModel";
import {TabController} from "../TabController";
import {GameInfo, GamesTabState} from "./GamesTabState";

export class GamesTabModel extends ResourceSubscriberTabModel<GamesTabState> {

  public getName(): string {
    return "Games and Modules";
  }

  public getSubscribedResourceNames(): string[] {
    return ["games", "engineState"];
  }

  public getDefaultState(): GamesTabState {
    return {games: [], engineState: {state: "UNKNOWN"}};
  }

  public initController(): TabController<GamesTabState> {
    return null;
  }

  public onResourceUpdated(resourceName: string, data: any): void {
    if (resourceName === "engineState") {
      this.update({engineState: data as EngineStateMetadata});
    } else if (resourceName === "games") {
      this.update({games: data as GameInfo[]});
    }
  }

}
