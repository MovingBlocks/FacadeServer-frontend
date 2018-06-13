import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {IncomingMessage} from "../../io/IncomingMessage";
import {OnlinePlayerMetadata} from "../../io/OnlinePlayerMetadata";
import {ResourcePath, ResourcePathUtil} from "../../io/ResourcePath";
import {ResourceSubscriberTabModel} from "../ResourceSubscriberTabModel";
import {TabController} from "../TabController";
import {ServerAdminsTabController} from "./ServerAdminsTabController";
import {AdminPermissions, ServerAdminsTabState} from "./ServerAdminsTabState";

export class ServerAdminsTabModel extends ResourceSubscriberTabModel<ServerAdminsTabState> {

  private adminIds: string[] = [];
  private onlinePlayers: OnlinePlayerMetadata[] = [];
  private adminPermissions: AdminPermissions[] = [];

  public getName(): string {
    return "Admins";
  }

  public getSubscribedResourcePaths(): ResourcePath[] {
    return [
      ["serverAdmins"],
      ["onlinePlayers"],
      ["serverAdminPermissions"],
    ];
  }

  public getDefaultState(): ServerAdminsTabState {
    return {admins: [], nonAdmins: [], adminPermissions: []};
  }

  public initController(): TabController<ServerAdminsTabState> {
    return new ServerAdminsTabController();
  }

  public onResourceUpdated(resourcePath: ResourcePath, data: any): void {
    if (ResourcePathUtil.equals(resourcePath, ["serverAdmins"])) {
      this.adminIds = data as string[];
    } else if (ResourcePathUtil.equals(resourcePath, ["onlinePlayers"])) {
      this.onlinePlayers = data as OnlinePlayerMetadata[];
    } else if (ResourcePathUtil.equals(resourcePath, ["serverAdminPermissions"])) {
      this.adminPermissions = data as AdminPermissions[];
    }
    console.log(this.adminPermissions);
    this.update({
      admins: this.adminIds.map((adminId) => ({
        id: adminId,
        name: this.lookupName(adminId),
      })),
      nonAdmins: this.onlinePlayers
        .filter((onlinePlayer) => this.adminIds.indexOf(onlinePlayer.id) < 0)
        .map((onlinePlayer) => ({
          id: onlinePlayer.id,
          name: onlinePlayer.name,
        })),
      adminPermissions: this.adminPermissions,
    });
  }

  private lookupName(adminId: string): string {
    const matchingEntries: OnlinePlayerMetadata[] = this.onlinePlayers.filter((onlinePlayer) => onlinePlayer.id === adminId);
    if (matchingEntries.length !== 0) { // if not 0, must be 1 (since IDs are unique)
      return matchingEntries[0].name;
    }
    return null;
  }

}
