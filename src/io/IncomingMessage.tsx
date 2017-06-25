import IncomingMessageType from './IncomingMessageType';

interface IncomingMessage {
  messageType: IncomingMessageType;
  resourceName: string;
  data: any;
}

export default IncomingMessage;
