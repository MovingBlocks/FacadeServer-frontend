import {TabController} from "../TabController";
import {ServerAdminsTabState} from "./ServerAdminsTabState";

export class ServerAdminsTabController extends TabController<ServerAdminsTabState> {

  public addAdmin = (newAdminId: string) => {
    this.writeAdminsResource(newAdminId, "ADD");
  }

  public removeAdmin = (adminId: string) => {
    this.writeAdminsResource(adminId, "REMOVE");
  }

  private writeAdminsResource = (clientId: string, action: string) => {
    this.model.requestResource({
      action: "WRITE",
      data: {
        action,
        clientId,
      },
      resourceName: "serverAdmins",
    });
  }

}
