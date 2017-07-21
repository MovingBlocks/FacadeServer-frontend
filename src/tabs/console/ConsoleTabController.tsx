import {TabController} from "../TabController";
import {ConsoleTabState} from "./ConsoleTabState";

export class ConsoleTabController extends TabController<ConsoleTabState> {

  public execute = () => {
    this.model.requestResource({
      action: "WRITE",
      data: this.model.getState().commandToSend,
      resourceName: "console",
    });
    this.model.update({commandToSend: ""});
  }
}
