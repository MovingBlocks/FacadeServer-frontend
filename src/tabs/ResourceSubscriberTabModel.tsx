import {ActionResult} from "../io/ActionResult";
import {EngineStateMetadata, EngineStateMetadataUtils} from "../io/EngineStateMetadata";
import {IncomingMessage} from "../io/IncomingMessage";
import {OutgoingMessage} from "../io/OutgoingMessage";
import {ResourcePath, ResourcePathUtil} from "../io/ResourcePath";
import {TabModel} from "./TabModel";

export abstract class ResourceSubscriberTabModel<StateType> extends TabModel<StateType> {

  public abstract onResourceUpdated(resourcePath: ResourcePath, data: any): void;
  public abstract getSubscribedResourcePaths(): ResourcePath[];

  public onMessage(message: IncomingMessage): void {
    const resourcePath: ResourcePath = message.resourcePath;
    if (message.messageType === "RESOURCE_CHANGED" && this.isSubscribedToResource(resourcePath)) {
      this.onResourceUpdated(resourcePath, message.data);
    } else if (message.messageType === "ACTION_RESULT" && message.data) {
      const actionResult: ActionResult = message.data as ActionResult;
      if (actionResult.status === "OK" && actionResult.data) {
        this.onResourceUpdated(resourcePath, actionResult.data);
      }
    }
  }

  public initialize(): void {
    super.initialize();
    this.requestResources();
  }

  private requestResources() {
    this.getSubscribedResourcePaths().forEach((resourceToQuery: ResourcePath) =>
        this.requestResource({resourcePath: resourceToQuery, method: "GET"}));
  }

  private isSubscribedToResource(resourcePath: ResourcePath): boolean {
    for (const currentResourcePath of this.getSubscribedResourcePaths()) {
      if (ResourcePathUtil.equals(resourcePath, currentResourcePath)) {
        return true;
      }
    }
    return false;
  }

}
