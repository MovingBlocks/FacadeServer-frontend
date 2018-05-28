import {IncomingMessage} from "../../io/IncomingMessage";
import {ResourcePath} from "../../io/ResourcePath";
import {ResourcePathUtil} from "../../io/ResourcePath";
import {ResourceSubscriberTabModel} from "../ResourceSubscriberTabModel";
import {TabController} from "../TabController";
import {ConsoleTabController} from "./ConsoleTabController";
import {ConsoleTabState, Message} from "./ConsoleTabState";

export class ConsoleTabModel extends ResourceSubscriberTabModel<ConsoleTabState> {

  public getName(): string {
    return "Console";
  }

  public getSubscribedResourcePaths(): ResourcePath[] {
    return [
      ["console"],
    ];
  }

  public getDefaultState(): ConsoleTabState {
    return {messages: [], commandToSend: "Type a command here...", commands: []};
  }

  public initController(): TabController<ConsoleTabState> {
    return new ConsoleTabController();
  }

  public onResourceUpdated(resourcePath: ResourcePath, data: any): void {
    if (ResourcePathUtil.equals(resourcePath, ["console"])) {
      this.update({commands: data as string[]});
    }
  }

  public onMessage(message: IncomingMessage) {
    super.onMessage(message);
    if (message.messageType === "RESOURCE_EVENT" && ResourcePathUtil.equals(message.resourcePath, ["console"])) {
      const oldState: ConsoleTabState = this.getState();
      this.update({messages: oldState.messages.concat((message.data) as Message)});
    }
  }

}
