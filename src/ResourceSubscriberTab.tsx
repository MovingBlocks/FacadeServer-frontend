import {TabModel} from './Tab';
import {IncomingMessage} from './io/IncomingMessage';
import {OutgoingMessage} from './io/OutgoingMessage';
import {ActionResult} from './io/ActionResult';

export abstract class ResourceSubscriberTabModel<StateType> extends TabModel<StateType> {

  abstract onResourceUpdated(resourceName: string, data: any): void;
  abstract getSubscribedResourceNames(): string[];

  private isSubscribedToResource(resourceName: string): boolean {
    return this.getSubscribedResourceNames().indexOf(resourceName) > -1;
  }

  onMessage(message: IncomingMessage): void {
    if (this.isSubscribedToResource(message.resourceName)) {
      if (message.messageType == 'RESOURCE_CHANGED') {
        this.onResourceUpdated(message.resourceName, message.data);
      } else if (message.messageType == 'ACTION_RESULT') {
        const actionResult: ActionResult = message.data as ActionResult;
        if (actionResult.status == 'OK') {
          this.onResourceUpdated(message.resourceName, actionResult.data);
        }
      }
    }
  }

  initialize(): void {
    this.getSubscribedResourceNames().forEach(resourceToQuery => {
      const data: OutgoingMessage = {messageType: 'RESOURCE_REQUEST', data: {action: 'READ', resourceName: resourceToQuery}};
      this.sendData(data);
    });
  }

}
