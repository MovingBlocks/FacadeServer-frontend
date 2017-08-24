import {ResourcePath} from "./ResourcePath";

export type IncomingMessageType =
  "ACTION_RESULT"
  | "RESOURCE_CHANGED"
  | "RESOURCE_EVENT";

export interface IncomingMessage {
  messageType: IncomingMessageType;
  resourcePath: ResourcePath;
  data: any;
}
