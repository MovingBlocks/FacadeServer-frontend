import {TabController} from "../TabController";
import {ConsoleTabState} from "./ConsoleTabState";

export class ConsoleTabController extends TabController<ConsoleTabState> {

  public execute = () => {
    this.model.requestResource({
      data: this.model.getState().commandToSend,
      method: "GET",
      resourcePath: ["console"],
    });
    this.model.update({commandToSend: ""});
  }
}
