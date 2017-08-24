import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {IncomingMessage} from "../../io/IncomingMessage";
import {ResourcePath, ResourcePathUtil} from "../../io/ResourcePath";
import {ResourceSubscriberTabModel} from "../ResourceSubscriberTabModel";
import {TabController} from "../TabController";
import {SettingsTabController} from "./SettingsTabController";
import {SettingsTabState} from "./SettingsTabState";

export class SettingsTabModel extends ResourceSubscriberTabModel<SettingsTabState> {

  public getName(): string {
    return "Settings";
  }

  public getSubscribedResourcePaths(): ResourcePath[] {
    return [
      ["config", "serverMotd"],
      ["config", "serverPort"],
    ];
  }

  public getDefaultState(): SettingsTabState {
    return {serverPort: 0, serverMotd: ""};
  }

  public initController(): TabController<SettingsTabState> {
    return new SettingsTabController();
  }

  public onResourceUpdated(resourcePath: ResourcePath, data: any): void {
    if (ResourcePathUtil.equals(resourcePath, ["config", "serverPort"])) {
      this.update({serverPort: data as number});
    } else if (ResourcePathUtil.equals(resourcePath, ["config", "MOTD"])) {
      this.update({serverMotd: data as string});
    }
  }

}
