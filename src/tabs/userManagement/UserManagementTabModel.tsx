import {OnlinePlayerMetadata} from "../../io/OnlinePlayerMetadata";
import {ResourcePath, ResourcePathUtil} from "../../io/ResourcePath";
import {ResourceSubscriberTabModel} from "../ResourceSubscriberTabModel";
import {TabController} from "../TabController";
import {UserManagementTabController} from "./UserManagementTabController";
import {UserManagementTabState} from "./UserManagementTabState";

export class UserManagementTabModel extends ResourceSubscriberTabModel<UserManagementTabState> {

  public getName(): string {
    return "Users";
  }

  public getSubscribedResourcePaths(): ResourcePath[] {
    return [
      ["onlinePlayers"],
    ];
  }

  public getDefaultState(): UserManagementTabState {
    return {onlinePlayers: []};
  }

  public initController(): TabController<UserManagementTabState> {
    return new UserManagementTabController();
  }

  public onResourceUpdated(resourcePath: ResourcePath, data: any): void {
    if (ResourcePathUtil.equals(resourcePath, ["onlinePlayers"])) {
      this.update({onlinePlayers: data as OnlinePlayerMetadata[]});
    }
  }

}
