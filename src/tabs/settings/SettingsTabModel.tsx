import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {IncomingMessage} from "../../io/IncomingMessage";
import {ResourceName} from "../../io/ResourceName";
import {ResourceSubscriberTabModel} from "../ResourceSubscriberTabModel";
import {TabController} from "../TabController";
import {SettingsTabController} from "./SettingsTabController";
import {SettingsTabState} from "./SettingsTabState";

export class SettingsTabModel extends ResourceSubscriberTabModel<SettingsTabState> {

  public getName(): string {
    return "Settings";
  }

  public getSubscribedResourceNames(): ResourceName[] {
    return ["serverMotd", "serverPort"];
  }

  public getDefaultState(): SettingsTabState {
    return {serverPort: 0, serverMotd: ""};
  }

  public initController(): TabController<SettingsTabState> {
    return new SettingsTabController();
  }

  public onResourceUpdated(resourceName: string, data: any): void {
    if (resourceName === "serverPort") {
      this.update({serverPort: data as number});
    } else if (resourceName === "serverMotd") {
      this.update({serverMotd: data as string});
    }
  }

}
