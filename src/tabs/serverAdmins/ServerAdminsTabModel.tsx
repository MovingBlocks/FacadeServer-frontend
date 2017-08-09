import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {IncomingMessage} from "../../io/IncomingMessage";
import {OnlinePlayerMetadata} from "../../io/OnlinePlayerMetadata";
import {ResourceName} from "../../io/ResourceName";
import {ResourceSubscriberTabModel} from "../ResourceSubscriberTabModel";
import {TabController} from "../TabController";
import {ServerAdminsTabController} from "./ServerAdminsTabController";
import {ServerAdminsTabState} from "./ServerAdminsTabState";

export class ServerAdminsTabModel extends ResourceSubscriberTabModel<ServerAdminsTabState> {

  private adminIds: string[] = [];
  private onlinePlayers: OnlinePlayerMetadata[] = [];

  public getName(): string {
    return "Admins";
  }

  public getSubscribedResourceNames(): ResourceName[] {
    return ["serverAdmins", "onlinePlayers"];
  }

  public getDefaultState(): ServerAdminsTabState {
    return {admins: []};
  }

  public initController(): TabController<ServerAdminsTabState> {
    return new ServerAdminsTabController();
  }

  public onResourceUpdated(resourceName: string, data: any): void {
    if (resourceName === "serverAdmins") {
      this.adminIds = data as string[];
    } else if (resourceName === "onlinePlayers") {
      this.onlinePlayers = data as OnlinePlayerMetadata[];
    }
    this.update({admins: this.adminIds.map((adminId) => ({
      id: adminId,
      name: this.lookupName(adminId),
    }))});
  }

  private lookupName(adminId: string): string {
    const matchingEntries: OnlinePlayerMetadata[] = this.onlinePlayers.filter((onlinePlayer) => onlinePlayer.id === adminId);
    if (matchingEntries.length !== 0) { // if not 0, must be 1 (since IDs are unique)
      return matchingEntries[0].name;
    }
    return null;
  }

}
