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

  private execute = (command: string) => {
    this.model.requestResource({
      data: command,
      method: "POST",
      resourcePath: ["console"],
    });
  }

}
