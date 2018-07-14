import {TabController} from "../TabController";
import {UserManagementTabState} from "./UserManagementTabState";

export class UserManagementTabController extends TabController<UserManagementTabState> {

  public addPermission = (user: string, addedPermission: string) => {
    this.execute("givePermission " + user + " " + addedPermission);
  }

  public removePermission = (user: string, removedPermission: string) => {
    this.execute("removePermission " + user + " " + removedPermission);
  }

  public kickUser = (user: string) => {
    this.execute("kickUser " + user);
  }

  public renameUser = (user: string, newName: string) => {
    this.execute("renameUser " + user + " " + newName);
  }

  public addToBlacklist = (userId: string) => {
    this.model.requestResource({
      method: "POST",
      resourcePath: ["blacklist", userId],
    });
  }

  public removeFromBlacklist = (userId: string) => {
    this.model.requestResource({
      method: "DELETE",
      resourcePath: ["blacklist", userId],
    });
  }

  public addToWhitelist = (userId: string) => {
    this.model.requestResource({
      method: "POST",
      resourcePath: ["whitelist", userId],
    });
  }

  public removeFromWhitelist = (userId: string) => {
    this.model.requestResource({
      method: "DELETE",
      resourcePath: ["whitelist", userId],
    });
  }

  private execute = (command: string) => {
    this.model.requestResource({
      data: command,
      method: "POST",
      resourcePath: ["console"],
    });
  }

}
