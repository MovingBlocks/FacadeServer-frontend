import JSONparse = require("../io/json/json_parse");
import {ActionResult} from "../io/ActionResult";
import {IncomingMessage} from "../io/IncomingMessage";
import {OutgoingMessage} from "../io/OutgoingMessage";
import {PrivateIdentityCertificate} from "./PrivateIdentityCertificate";
import {PublicIdentityCertificate} from "./PublicIdentityCertificate";

interface ClientIdentity {
  server: PublicIdentityCertificate;
  clientPublic: PublicIdentityCertificate;
  clientPrivate: PrivateIdentityCertificate;
}

interface HandshakeHello {
  random: string;
  certificate: PublicIdentityCertificate;
  timestamp: string;
}

export class AuthenticationManager {

  private sendMessage: (data: OutgoingMessage) => void;
  private processMessage: (messageData: ActionResult) => void;

  constructor(sendMessage: (data: OutgoingMessage) => void) {
    this.sendMessage = sendMessage;
  }

  public onMessage(message: IncomingMessage): void {
    // check the message type and ensure the callback is not null
    if (message.messageType === "ACTION_RESULT" && typeof this.processMessage === "function") {
      this.processMessage(message.data);
    }
  }

  public authenticateFromConfig(configString: string): void {
    const config: any = JSONparse(configString, null);
    if (typeof config.security === "object" && config.security.clientIdentities.constructor === Array) {
      this.authenticateFromIdentityArray(config.security.clientIdentities as ClientIdentity[]);
    } else {
      return; // TODO report error
    }
  }

  private requestServerHello(then: (serverHello: HandshakeHello) => void): void {
    this.processMessage = (message: ActionResult) => {
      if (message.status === "OK") { // TODO: also check that message data can be casted to HandshakeHello
        then(message.data as HandshakeHello);
      }
    };
    this.sendMessage({messageType: "AUTHENTICATION_REQUEST"});
  }

  private authenticateFromIdentityArray(identities: ClientIdentity[]): void {
    console.log(identities); // TODO remove
    this.requestServerHello(() => {return; });
  }

}
