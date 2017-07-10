import {ActionResult} from "../io/ActionResult";
import {IncomingMessage} from "../io/IncomingMessage";
import {OutgoingMessage} from "../io/OutgoingMessage";
import {TabModel} from "./TabModel";

export abstract class ResourceSubscriberTabModel<StateType> extends TabModel<StateType> {

  public abstract onResourceUpdated(resourceName: string, data: any): void;
  public abstract getSubscribedResourceNames(): string[];

  public onMessage(message: IncomingMessage): void {
    if (this.isSubscribedToResource(message.resourceName)) {
      if (message.messageType === "RESOURCE_CHANGED") {
        this.onResourceUpdated(message.resourceName, message.data);
      } else if (message.messageType === "ACTION_RESULT" && message.data) {
        const actionResult: ActionResult = message.data as ActionResult;
        if (actionResult.status === "OK" && actionResult.data) {
          this.onResourceUpdated(message.resourceName, actionResult.data);
        }
      }
    }
  }

  public initialize(): void {
    super.initialize();
    this.getSubscribedResourceNames().forEach((resourceToQuery) => {
      const data: OutgoingMessage = {
        data: {action: "READ", resourceName: resourceToQuery},
        messageType: "RESOURCE_REQUEST",
      };
      this.sendData(data);
    });
  }

  private isSubscribedToResource(resourceName: string): boolean {
    return this.getSubscribedResourceNames().indexOf(resourceName) > -1;
  }

}
