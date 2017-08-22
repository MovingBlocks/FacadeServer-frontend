import {ActionResult} from "../io/ActionResult";
import {EngineStateMetadata, EngineStateMetadataUtils} from "../io/EngineStateMetadata";
import {IncomingMessage} from "../io/IncomingMessage";
import {OutgoingMessage} from "../io/OutgoingMessage";
import {ResourceName} from "../io/ResourceName";
import {TabModel} from "./TabModel";

export abstract class ResourceSubscriberTabModel<StateType> extends TabModel<StateType> {

  public abstract onResourceUpdated(resourceName: ResourceName, data: any): void;
  public abstract getSubscribedResourceNames(): ResourceName[];

  public onMessage(message: IncomingMessage): void {
    if (message.resourceName === "engineState" || this.isSubscribedToResource(message.resourceName)) {
      if (message.messageType === "RESOURCE_CHANGED") {
        this._onResourceUpdated(message.resourceName, message.data);
      } else if (message.messageType === "ACTION_RESULT" && message.data) {
        const actionResult: ActionResult = message.data as ActionResult;
        if (actionResult.status === "OK" && actionResult.data) {
          this._onResourceUpdated(message.resourceName, actionResult.data);
        }
      }
    }
  }

  public initialize(): void {
    super.initialize();
    this.requestResource({action: "READ", resourceName: "engineState"});
  }

  private requestResources(engineState: EngineStateMetadata) {
    const requestsToSend: ResourceName[] = this.getSubscribedResourceNames();
    const engineStateIndex: number = requestsToSend.indexOf("engineState");
    if (engineStateIndex > -1) {
      requestsToSend.splice(engineStateIndex, 1);
    }
    requestsToSend.forEach((resourceToQuery: ResourceName) => {
      if (EngineStateMetadataUtils.isResourceAvailable(engineState, resourceToQuery)) {
        this.requestResource({action: "READ", resourceName: resourceToQuery});
      }
    });
  }

  private _onResourceUpdated(resourceName: ResourceName, data: any) {
    if (resourceName === "engineState") {
      this.requestResources(data as EngineStateMetadata);
    }
    this.onResourceUpdated(resourceName, data);
  }

  private isSubscribedToResource(resourceName: ResourceName): boolean {
    return this.getSubscribedResourceNames().indexOf(resourceName) > -1;
  }

}
