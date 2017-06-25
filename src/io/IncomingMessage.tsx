enum MessageType {
  ACTION_RESULT,
  RESOURCE_CHANGED,
  RESOURCE_EVENT
}

interface IncomingMessage {
  messageType: MessageType;
  resourceName: string;
  data: any;
}

export default IncomingMessage;
