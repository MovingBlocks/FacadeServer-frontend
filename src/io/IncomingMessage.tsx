export type IncomingMessageType =
  'ACTION_RESULT'
  | 'RESOURCE_CHANGED'
  | 'RESOURCE_EVENT'

export interface IncomingMessage {
  messageType: IncomingMessageType;
  resourceName: string;
  data: any;
}
