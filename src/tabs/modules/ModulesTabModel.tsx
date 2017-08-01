import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {IncomingMessage} from "../../io/IncomingMessage";
import {ResourceName} from "../../io/ResourceName";
import {AvailableModules} from "../../modules/AvailableModules";
import {ResourceSubscriberTabModel} from "../ResourceSubscriberTabModel";
import {TabController} from "../TabController";
import {ModulesTabController} from "./ModulesTabController";
import {ModulesTabState} from "./ModulesTabState";

export class ModulesTabModel extends ResourceSubscriberTabModel<ModulesTabState> {

  public getName(): string {
    return "Modules";
  }

  public getSubscribedResourceNames(): ResourceName[] {
    return ["availableModules", "moduleInstaller"];
  }

  public getDefaultState(): ModulesTabState {
    return {installerStatus: "", installedModules: {modules: [], worldGenerators: []}};
  }

  public initController(): TabController<ModulesTabState> {
    return new ModulesTabController();
  }

  public onResourceUpdated(resourceName: string, data: any): void {
    if (resourceName === "availableModules") {
      this.update({installedModules: data as AvailableModules});
    } else if (resourceName === "moduleInstaller") {
      this.update({installerStatus: data as string});
    }
  }

}
