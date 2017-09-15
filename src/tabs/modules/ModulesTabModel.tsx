import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {IncomingMessage} from "../../io/IncomingMessage";
import {ResourcePath, ResourcePathUtil} from "../../io/ResourcePath";
import {ModuleMetadata} from "../../modules/ModuleMetadata";
import {ResourceSubscriberTabModel} from "../ResourceSubscriberTabModel";
import {TabController} from "../TabController";
import {ModulesTabController} from "./ModulesTabController";
import {ModulesTabState} from "./ModulesTabState";

export class ModulesTabModel extends ResourceSubscriberTabModel<ModulesTabState> {

  public getName(): string {
    return "Modules";
  }

  public getSubscribedResourcePaths(): ResourcePath[] {
    return [
      ["modules", "available"],
      ["modules", "installer"],
    ];
  }

  public getDefaultState(): ModulesTabState {
    return {installerStatus: "", installedModules: []};
  }

  public initController(): TabController<ModulesTabState> {
    return new ModulesTabController();
  }

  public onResourceUpdated(resourcePath: ResourcePath, data: any): void {
    if (ResourcePathUtil.equals(resourcePath, ["modules", "available"])) {
      this.update({installedModules: data as ModuleMetadata[]});
    } else if (ResourcePathUtil.equals(resourcePath, ["modules", "installer"])) {
      this.update({installerStatus: data as string});
    }
  }

}
