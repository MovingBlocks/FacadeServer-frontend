import JSONparse = require("../io/json/json_parse");
import {ActionResult} from "../io/ActionResult";
import {IncomingMessage} from "../io/IncomingMessage";
import {OutgoingMessage} from "../io/OutgoingMessage";
import {ClientIdentity, PublicIdentityCertificate} from "./ClientIdentity";

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
    const config: any = JSONparse(configString, (key: string, value: any) => {
      // cast to ClientIdentity class to allow usage of its methods
      if (value.hasOwnProperty("server") && value.hasOwnProperty("clientPublic") && value.hasOwnProperty("clientPrivate")) {
        return new ClientIdentity(value.server, value.clientPublic, value.clientPrivate);
      }
      return value;
    });
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
    this.requestServerHello((serverHello: HandshakeHello) => {
      identities.forEach((identity: ClientIdentity) => {
        if (identity.getServerId() === serverHello.certificate.id) {
          this.authenticate(serverHello, identity);
          return;
        }
      });
      // TODO not found, report error
    });
  }

  private authenticate(serverHello: HandshakeHello, clientIdentity: ClientIdentity): void {
    const clientHello: HandshakeHello = {random: "", certificate: clientIdentity.getClientPublicBase64(), timestamp: ""};
    // TODO: concatenate hellos, sign and reply to handshake
  }

}
