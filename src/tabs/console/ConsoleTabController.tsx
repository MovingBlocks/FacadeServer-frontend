import {TabController} from "../TabController";
import {ConsoleTabState} from "./ConsoleTabState";

export class ConsoleTabController extends TabController<ConsoleTabState> {

  public execute = () => {
    this.model.sendData({
      data: {
        // TODO: build interface for resource request
        action: "WRITE",
        data: this.model.getState().commandToSend,
        resourceName: "console",
      },
      messageType: "RESOURCE_REQUEST",
    });
    this.model.update({commandToSend: ""});
  }
}
