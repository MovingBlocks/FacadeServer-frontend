/* tslint:disable:no-var-requires */

const BigInteger = require("jsbn").BigInteger;
import JSONparse = require("../io/utils/json_parse");
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
        const serverHello = message.data as HandshakeHello;
        serverHello.certificate.exponent = new BigInteger(this.b64toHex(serverHello.certificate.exponent), 16);
        serverHello.certificate.modulus = new BigInteger(this.b64toHex(serverHello.certificate.modulus), 16);
        serverHello.certificate.signature = new BigInteger(this.b64toHex(serverHello.certificate.signature), 16);
        then(serverHello);
      }
    };
    this.sendMessage({messageType: "AUTHENTICATION_REQUEST"});
  }

  private b64toHex(input: string): string {
    return new Buffer(input, "base64").toString("hex");
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

  private authenticate(serverHelloMessage: HandshakeHello, clientIdentity: ClientIdentity): void {
    const clientHelloMessage: HandshakeHello = {random: "", certificate: clientIdentity.getClientPublic(), timestamp: ""};
    const dataToSign = this.concatArrayBuffers([
      this.handshakeHelloToArrayBuffer(serverHelloMessage),
      this.handshakeHelloToArrayBuffer(clientHelloMessage),
    ]);
    // TODO remove console.log(dataToSign);
    clientHelloMessage.certificate = clientIdentity.getClientPublicBase64();
    this.sendMessage({messageType: "AUTHENTICATION_DATA", data: {clientHello: clientHelloMessage, signature: ""}});
  }

  private handshakeHelloToArrayBuffer(input: HandshakeHello): ArrayBuffer {
    return this.concatArrayBuffers([
      this.b64ToArrayBuffer(input.random),
      this.publicCertToArrayBuffer(input.certificate),
      this.b64ToArrayBuffer(input.timestamp),
    ]);
  }

  private publicCertToArrayBuffer(input: PublicIdentityCertificate): ArrayBuffer {
    return this.concatArrayBuffers([
      this.str2ab(input.id),
      input.modulus.toByteArray(),
      input.exponent.toByteArray(),
      input.signature.toByteArray(),
    ]);
  }

  private str2ab(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  private b64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString =  window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

  private concatArrayBuffers(parts: any): Uint8Array {
    let len = 0;
    parts.forEach((part: any) => len += part.byteLength !== undefined ? part.byteLength : part.length);
    const result: Uint8Array = new Uint8Array(len);
    let offset = 0;
    parts.forEach((part: any) => {
      const view = new Uint8Array(part);
      result.set(view, offset);
      offset += view.length;
    });
    return result;
  }

}
