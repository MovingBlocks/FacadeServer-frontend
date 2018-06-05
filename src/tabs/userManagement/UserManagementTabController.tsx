import {TabController} from "../TabController";
import {UserManagementTabState} from "./UserManagementTabState";

export class UserManagementTabController extends TabController<UserManagementTabState> {

  public addPermission = (user: string, addedPermission: string) => {
    console.log(user, addedPermission);
    //this.execute("addPermission " + user + " " + addedPermission);
  }

  public removePermission = (user: string, removedPermission: string) => {
    console.log(user, removedPermission);
    //this.execute("removePermission " + user + " " + removedPermission);
  }

  public kickUser = (user: string) => {
    console.log(user);
    //this.execute("kickUser " + user);
  }

  public renameUser = (user: string, newName: string) => {
    console.log(user, newName);
    //this.execute("renameUser " + user + " " + newName);
  }

  private execute = (command: string) => {
      this.model.requestResource({
        data: command,
        method: "POST",
        resourcePath: ["console"],
      });
  }

}
