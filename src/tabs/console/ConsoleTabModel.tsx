import {IncomingMessage} from "../../io/IncomingMessage";
import {TabController} from "../TabController";
import {TabModel} from "../TabModel";
import {ConsoleTabController} from "./ConsoleTabController";
import {ConsoleTabState, Message} from "./ConsoleTabState";

export class ConsoleTabModel extends TabModel<ConsoleTabState> {

  public getName(): string {
    return "Console";
  }

  public getDefaultState(): ConsoleTabState {
    return {messages: [], commandToSend: "Type a command here..."};
  }

  public initController(): TabController<ConsoleTabState> {
    return new ConsoleTabController();
  }

  public onMessage(message: IncomingMessage) {
    if (message.messageType === "RESOURCE_EVENT" && message.resourceName === "console") {
      const oldState: ConsoleTabState = this.getState();
      this.update({messages: oldState.messages.concat((message.data) as Message)});
    }
  }

}
