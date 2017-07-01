export type OutgoingMessageType =
  "AUTHENTICATION_REQUEST" |
  "AUTHENTICATION_DATA" |
  "RESOURCE_REQUEST";

export interface OutgoingMessage {
  messageType: OutgoingMessageType;
  data: any;
}
