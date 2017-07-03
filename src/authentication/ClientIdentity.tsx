export interface PrivateIdentityCertificate {
  modulus: any;
  exponent: any;
}

export interface PublicIdentityCertificate {
  id: any;
  modulus: any;
  exponent: any;
  signature: any;
}

export class ClientIdentity {

  private server: PublicIdentityCertificate;
  private clientPublic: PublicIdentityCertificate;
  private clientPrivate: PrivateIdentityCertificate;

  constructor(server: PublicIdentityCertificate, clientPublic: PublicIdentityCertificate, clientPrivate: PrivateIdentityCertificate) {
    this.server = server;
    this.clientPublic = clientPublic;
    this.clientPrivate = clientPrivate;
  }

  public getServerId(): string {
    return this.server.id;
  }

  public getClientPublic(): PublicIdentityCertificate {
    return this.clientPublic;
  }

  public getClientPublicBase64(): PublicIdentityCertificate {
    return {
      exponent: this.bigIntToBase64(this.clientPublic.exponent),
      id: this.clientPublic.id,
      modulus: this.bigIntToBase64(this.clientPublic.modulus),
      signature: this.bigIntToBase64(this.clientPublic.signature),
    };
  }

  private bigIntToBase64(input: any): string {
    return this.byteArrayToBase64(input.toByteArray());
  }

  private byteArrayToBase64(buffer: any) {
    let binary = "";
    const bytes = new Uint8Array( buffer );
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

}
