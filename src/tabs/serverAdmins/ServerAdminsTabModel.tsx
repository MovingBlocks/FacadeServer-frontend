import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {IncomingMessage} from "../../io/IncomingMessage";
import {ResourceName} from "../../io/ResourceName";
import {ResourceSubscriberTabModel} from "../ResourceSubscriberTabModel";
import {TabController} from "../TabController";
import {ServerAdminsTabController} from "./ServerAdminsTabController";
import {ServerAdminsTabState} from "./ServerAdminsTabState";

export class ServerAdminsTabModel extends ResourceSubscriberTabModel<ServerAdminsTabState> {

  public getName(): string {
    return "Admins";
  }

  public getSubscribedResourceNames(): ResourceName[] {
    return ["serverAdmins"];
  }

  public getDefaultState(): ServerAdminsTabState {
    return {adminIds: []};
  }

  public initController(): TabController<ServerAdminsTabState> {
    return new ServerAdminsTabController();
  }

  public onResourceUpdated(resourceName: string, data: any): void {
    if (resourceName === "serverAdmins") {
      this.update({adminIds: data as string[]});
    }
  }

}
