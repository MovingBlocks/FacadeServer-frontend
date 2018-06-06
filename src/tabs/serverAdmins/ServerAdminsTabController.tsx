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

  public modifyPermission = (adminId: string, checked: boolean, permissionNumber: number) => {
    return adminId + checked + permissionNumber;
  }

}
