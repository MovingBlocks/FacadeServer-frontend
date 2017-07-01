import {IncomingMessage} from "../../io/IncomingMessage";
import {TabModel} from "../TabModel";
import {ConsoleTabState, Message} from "./ConsoleTabState";

export class ConsoleTabModel extends TabModel<ConsoleTabState> {

  public getName(): string {
    return "Console";
  }

  public getObservedResources(): string[] {
    return ["console"];
  }

  public getDefaultState(): ConsoleTabState {
    return {messages: []};
  }

  public onMessage(message: IncomingMessage): void {
    if (message.messageType === "RESOURCE_EVENT" && message.resourceName === "console") {
      const oldState: ConsoleTabState = this.getState();
      this.update({messages: oldState.messages.concat((message.data) as Message)});
    }
  }

}
