/* tslint:disable:no-var-requires */

const BigInteger = require("jsbn").BigInteger;
const rs = require("jsrsasign");
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

  private authenticated: boolean = false;

  private callback: (error: string) => void;
  private sendMessage: (data: OutgoingMessage) => void;
  private processMessage: (messageData: ActionResult) => void;

  constructor(sendMessage: (data: OutgoingMessage) => void) {
    this.sendMessage = sendMessage;
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public setCallback(callback: (error: string) => void): void {
    this.callback = callback;
  }

  public onMessage(message: IncomingMessage): void {
    // check the message type and ensure the callback is not null
    if (message.messageType === "ACTION_RESULT" && typeof this.processMessage === "function") {
      this.processMessage(message.data);
    }
  }

  public authenticateFromConfig(configString: string): void {
    if (this.authenticated) {
      throw new Error("Already authenticated");
    }
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
      this.callback("The entered data is not a valid Terasology client JSON configuration.");
    }
  }

  private requestServerHello(then: (serverHello: HandshakeHello) => void): void {
    this.processMessage = (message: ActionResult) => {
      if (message.status === "OK") { // TODO: also check that message data can be casted to HandshakeHello
        this.processMessage = null;
        const serverHello = message.data as HandshakeHello;
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
      let found = false;
      identities.forEach((identity: ClientIdentity) => {
        if (identity.getServerId() === serverHello.certificate.id) {
          found = true;
          this.authenticate(serverHello, identity);
        }
      });
      if (!found) {
        this.callback("Your configuration does not contain an identity for this server.");
      }
    });
  }

  private authenticate(serverHelloMessage: HandshakeHello, clientIdentity: ClientIdentity): void {
    const publicCert = clientIdentity.getClientPublic();
    const privateCert = clientIdentity.getClientPrivate();
    const clientHelloMessage: HandshakeHello = {random: "", certificate: publicCert, timestamp: ""};
    const dataToSign: Uint8Array = this.concatArrayBuffers([
      this.handshakeHelloToArrayBuffer(serverHelloMessage, (n) => this.b64ToArrayBuffer(n)),
      this.handshakeHelloToArrayBuffer(clientHelloMessage, (n) => n.toByteArray()),
    ]);
    // TODO remove console.log(dataToSign);
    const sig = new rs.Signature({alg: "SHA1withRSA"});
    const rsa = new rs.RSAKey();
    rsa.setPrivate(privateCert.modulus.toString(16), publicCert.exponent.toString(16), privateCert.exponent.toString(16));
    sig.setAlgAndProvider("SHA1withRSA", "cryptojs/jsrsa");
    sig.init(rsa);
    sig.updateHex(Buffer.from(dataToSign).toString("hex"));
    const signedHex = sig.sign();
    const signedB64 = new Buffer(signedHex, "hex").toString("base64");
    clientHelloMessage.certificate = clientIdentity.getClientPublicBase64();
    // TODO remove console.log(signedB64);
    this.processMessage = (messageData: ActionResult) => {
      // TODO remove console.log(messageData);
      if (messageData.status === "OK") {
        this.authenticated = true;
        this.callback(null);
      } else {
        this.callback(messageData.message ? messageData.message : "The server failed to verify the client's identity.");
      }
    };
    this.sendMessage({messageType: "AUTHENTICATION_DATA", data: {clientHello: clientHelloMessage, signature: signedB64}});
  }

  private handshakeHelloToArrayBuffer(input: HandshakeHello, numberConvert: (n: any) => any): ArrayBuffer {
    return this.concatArrayBuffers([
      this.b64ToArrayBuffer(input.random),
      this.str2ab(input.certificate.id),
      numberConvert(input.certificate.modulus),
      numberConvert(input.certificate.exponent),
      numberConvert(input.certificate.signature),
      this.b64ToArrayBuffer(input.timestamp),
    ]);
  }

  private str2ab(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length); // 1 byte for each char
    const bufView = new Uint8Array(buf);
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
