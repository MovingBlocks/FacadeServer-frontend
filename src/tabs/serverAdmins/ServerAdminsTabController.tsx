import {TabController} from "../TabController";
import {AdminPermissions, ServerAdminsTabState} from "./ServerAdminsTabState";

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

  public modifyAdminPermission = (adminId: string, newPermissions: AdminPermissions) => {
    this.model.requestResource({
      data: newPermissions,
      method: "PATCH",
      resourcePath: ["serverAdmins", adminId, "permissions"],
    });
  }

}
