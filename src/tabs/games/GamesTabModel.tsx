import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {IncomingMessage} from "../../io/IncomingMessage";
import {ResourcePath, ResourcePathUtil} from "../../io/ResourcePath";
import {ModuleMetadata} from "../../modules/ModuleMetadata";
import {WorldGeneratorInfo} from "../../modules/WorldGeneratorInfo";
import {ResourceSubscriberTabModel} from "../ResourceSubscriberTabModel";
import {TabController} from "../TabController";
import {GamesTabController} from "./GamesTabController";
import {GameInfo, GamesTabState} from "./GamesTabState";

export class GamesTabModel extends ResourceSubscriberTabModel<GamesTabState> {

  public getName(): string {
    return "Games";
  }

  public getSubscribedResourcePaths(): ResourcePath[] {
    return [
      ["games"],
      ["engineState"],
      ["modules", "available"],
      ["worldGenerators"],
    ];
  }

  public getDefaultState(): GamesTabState {
    return {games: [], engineState: {state: "UNKNOWN"}};
  }

  public initController(): TabController<GamesTabState> {
    return new GamesTabController();
  }

  public onResourceUpdated(resourcePath: ResourcePath, data: any): void {
    if (ResourcePathUtil.equals(resourcePath, ["engineState"])) {
      this.update({engineState: data as EngineStateMetadata});
    } else if (ResourcePathUtil.equals(resourcePath, ["games"])) {
      this.update({games: data as GameInfo[]});
    } else if (ResourcePathUtil.equals(resourcePath, ["modules", "available"])) {
      this.update({availableModules: data as ModuleMetadata[]});
    } else if (ResourcePathUtil.equals(resourcePath, ["worldGenerators"])) {
      this.update({worldGenerators: data as WorldGeneratorInfo[]});
    }
  }

}
