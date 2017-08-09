import {TabController} from "../TabController";
import {ServerAdminsTabState} from "./ServerAdminsTabState";

export class ServerAdminsTabController extends TabController<ServerAdminsTabState> {

  public removeAdmin = (adminId: string) => {
    this.model.requestResource({
      action: "WRITE",
      data: {
        action: "REMOVE",
        clientId: adminId,
      },
      resourceName: "serverAdmins",
    });
  }

}
