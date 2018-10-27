import { ActionResult } from "../../io/ActionResult";
import { IncomingMessage } from "../../io/IncomingMessage";
import { OnlinePlayerMetadata } from "../../io/OnlinePlayerMetadata";
import { ResourcePath } from "../../io/ResourcePath";
import { ResourcePathUtil } from "../../io/ResourcePath";
import { ResourceSubscriberTabModel } from "../ResourceSubscriberTabModel";
import { TabController } from "../TabController";
import { ChatTabController } from "./ChatTabController";
import { ChatTabState, Message } from "./ChatTabState";

export class ChatTabModel extends ResourceSubscriberTabModel<ChatTabState> {

  public getName(): string {
    return "Chat";
  }

  public getSubscribedResourcePaths(): ResourcePath[] {
    return [
      ["onlinePlayers"],
    ];
  }

  public getDefaultState(): ChatTabState {
    return { messages: [], commandToSend: "Type a chat command here...", commands: [] };
  }

  public initController(): TabController<ChatTabState> {
    return new ChatTabController();
  }

  public onResourceUpdated(resourcePath: ResourcePath, data: any): void {
    if (ResourcePathUtil.equals(resourcePath, ["onlinePlayers"])) {
      this.update({ onlinePlayers: data as OnlinePlayerMetadata[] });
    }
  }

  public onMessage(message: IncomingMessage) {
    super.onMessage(message);
    if (message.messageType === "ACTION_RESULT") {
      const innerMessage: ActionResult = message.data as ActionResult;
      if (innerMessage.status !== "OK") {
          // TODO: Maybe show error message here
      }
    }
    if (message.messageType === "RESOURCE_EVENT" && ResourcePathUtil.equals(message.resourcePath, ["console"])) {
      const oldState: ChatTabState = this.getState();
      const msg: Message = (message.data) as Message;
      if (msg.type === "CHAT" || msg.type === "CLIENT") {
        this.update({ messages: oldState.messages.concat(msg) });
      }
      if (msg.type === "CONSOLE") {
        if (msg.message === "Message sent") {
          this.update({
            messageSendStatus: "SENT",
          });
        } else if (msg.message === "User with name '[a-zA-Z0-9]+' not found.") {
          this.update({
            errorMessage: msg.message,
            messageSendStatus: "ERROR",
          });
        }
      }
    }
  }
}
