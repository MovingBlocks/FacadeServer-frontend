/* tslint:disable:no-var-requires */

const rs = require("jsrsasign");
import JSONparse = require("../io/utils/json_parse");
import {ActionResult} from "../io/ActionResult";
import {IncomingMessage} from "../io/IncomingMessage";
import {OutgoingMessage} from "../io/OutgoingMessage";
import {RandomStringGenerator} from "../RandomStringGenerator";
import {ClientIdentity, PublicIdentityCertificate} from "./ClientIdentity";
import {HandshakeHello} from "./HandshakeHello";
import {IdentityStorageServiceApiClient} from "./IdentityStorageServiceApiClient";
import {Jsbn, MultiFormatBigInteger} from "./MultiFormatBigInteger";
import {MultiFormatClientIdentityUtil} from "./MultiFormatClientIdentityUtil";

type IdentityConverter<T> = (v: ClientIdentity<T>) => ClientIdentity<MultiFormatBigInteger>;

export class AuthenticationManager {

  private authenticated: boolean = false;

  private callback: (error: string, identity?: ClientIdentity<MultiFormatBigInteger>) => void;
  private sendMessage: (data: OutgoingMessage) => void;
  private processMessage: (messageData: ActionResult) => void;

  constructor(sendMessage: (data: OutgoingMessage) => void) {
    this.sendMessage = sendMessage;
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public setCallback(callback: (error: string, identity?: ClientIdentity<MultiFormatBigInteger>) => void): void {
    this.callback = callback;
  }

  public onMessage(message: IncomingMessage): void {
    // check the message type and ensure the callback is not null
    if (message.messageType === "ACTION_RESULT" && typeof this.processMessage === "function") {
      this.processMessage(message.data);
    }
  }

  public authenticateFromConfig = (configString: string) => {
    if (this.authenticated) {
      throw new Error("Already authenticated");
    }
    const config: any = JSONparse(configString, null);
    if (typeof config.security === "object" && config.security.clientIdentities.constructor === Array) {
      const jsbnOnlyIdentity: Array<ClientIdentity<Jsbn>> = config.security.clientIdentities as Array<ClientIdentity<Jsbn>>;
      this.authenticateFromIdentityArray(jsbnOnlyIdentity, MultiFormatClientIdentityUtil.buildFromJsbn);
    } else {
      this.callback("The entered data is not a valid Terasology client JSON configuration.");
    }
  }

  public authenticateFromIdentityStorage = (server: string, username: string, password: string) => {
    const authManager: AuthenticationManager = this;
    const apiClient: IdentityStorageServiceApiClient = new IdentityStorageServiceApiClient(server);
    apiClient.login(username, password).then(() =>
      authManager.requestServerHello((serverHello: HandshakeHello) => // login success
        apiClient.getClientIdentity(serverHello.certificate.id).then((base64Identity: ClientIdentity<string>) => { // get identity success
          authManager.authenticate(serverHello, MultiFormatClientIdentityUtil.buildFromBase64(base64Identity));
          apiClient.logout();
        },
      (errMsg: string) => authManager.callback(errMsg))), // get identity error
      (errMsg: string) => authManager.callback(errMsg), // login error
    );
  }

  public authenticate(serverHelloMessage: HandshakeHello, clientIdentity: ClientIdentity<MultiFormatBigInteger>): void {
    const publicCert = clientIdentity.clientPublic;
    const privateCert = clientIdentity.clientPrivate;
    const base64PublicCert = MultiFormatClientIdentityUtil.extractBase64(clientIdentity).clientPublic;
    // TODO: set random and timestamp
    const b64random: string = Buffer.from(RandomStringGenerator.generate(16)).toString("base64");
    const b64timestamp: string = Buffer.from(Date.now().toString()).toString("base64");
    const clientHelloMessage: HandshakeHello = {random: b64random, certificate: base64PublicCert, timestamp: b64timestamp};
    const dataToSign: Uint8Array = this.concatArrayBuffers([
      this.handshakeHelloToArrayBuffer(serverHelloMessage),
      this.handshakeHelloToArrayBuffer(clientHelloMessage),
    ]);
    const sig = new rs.Signature({alg: "SHA1withRSA"});
    const rsa = new rs.RSAKey();
    rsa.setPrivate(privateCert.modulus.getHex(), publicCert.exponent.getHex(), privateCert.exponent.getHex());
    sig.setAlgAndProvider("SHA1withRSA", "cryptojs/jsrsa");
    sig.init(rsa);
    sig.updateHex(Buffer.from(dataToSign).toString("hex"));
    const signedHex = sig.sign();
    const signedB64 = new Buffer(signedHex, "hex").toString("base64");
    this.processMessage = (messageData: ActionResult) => {
      if (messageData.status === "OK") {
        this.authenticated = true;
        this.callback(null, clientIdentity);
      } else {
        this.callback(messageData.message ? messageData.message : "The server failed to verify the client's identity.");
      }
    };
    this.sendMessage({messageType: "AUTHENTICATION_DATA", data: {clientHello: clientHelloMessage, signature: signedB64}});
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

  private authenticateFromIdentityArray<T>(identities: Array<ClientIdentity<T>>, convertIdentity: IdentityConverter<T>): void {
    this.requestServerHello((serverHello: HandshakeHello) => {
      let found = false;
      identities.forEach((identity: ClientIdentity<T>) => {
        if (identity.server.id === serverHello.certificate.id) {
          found = true;
          this.authenticate(serverHello, convertIdentity(identity));
        }
      });
      if (!found) {
        this.callback("Your configuration does not contain an identity for this server.");
      }
    });
  }

  private handshakeHelloToArrayBuffer(input: HandshakeHello): ArrayBuffer {
    return this.concatArrayBuffers([
      this.b64ToArrayBuffer(input.random),
      this.str2ab(input.certificate.id),
      this.b64ToArrayBuffer(input.certificate.modulus),
      this.b64ToArrayBuffer(input.certificate.exponent),
      this.b64ToArrayBuffer(input.certificate.signature),
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
