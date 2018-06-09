import {TabController} from "../TabController";
import {ServerAdminsTabState} from "./ServerAdminsTabState";

export class ServerAdminsTabController extends TabController<ServerAdminsTabState> {

  public addAdmin = (newAdminId: string) => {
    this.model.requestResource({
      method: "POST",
      resourcePath: ["serverAdmins", newAdminId],
    });
  }

  public removeAdmin = (adminId: string) => {
    this.model.requestResource({
      method: "DELETE",
      resourcePath: ["serverAdmins", adminId],
    });
  }

  public getPermissions = () => {
    this.model.requestResource({
      method: "GET",
      resourcePath: ["serverAdminsPermissions"],
    });
  }

  public getPermissionOfAdmin = (adminId: string) => {
    this.model.requestResource({
      method: "GET",
      resourcePath: ["serverAdmins", adminId, "permissions"],
    });
  }

  public modifyAdminPermission = (adminId: string, checked: boolean, permissionNumber: number) => {
    this.model.requestResource({
      data: undefined,
      method: "PATCH",
      resourcePath: ["serverAdmins", adminId, "permissions"],
    });
  }

}
