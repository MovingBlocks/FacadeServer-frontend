import {ClientIdentity, PrivateIdentityCertificate, PublicIdentityCertificate} from "./ClientIdentity";

export class ClientIdentityConverter {

  public static convertIdentity<FROM, TO>(i: ClientIdentity<FROM>, fn: (v: FROM) => TO): ClientIdentity<TO> {
    return {
      clientPrivate: ClientIdentityConverter.convertPrivateCert(i.clientPrivate, fn),
      clientPublic: ClientIdentityConverter.convertPublicCert(i.clientPublic, fn),
      server: ClientIdentityConverter.convertPublicCert(i.server, fn),
    };
  }

  public static convertPublicCert<FROM, TO>(i: PublicIdentityCertificate<FROM>, fn: (v: FROM) => TO): PublicIdentityCertificate<TO> {
    return {
      exponent: fn(i.exponent),
      id: i.id,
      modulus: fn(i.modulus),
      signature: fn(i.signature),
    };
  }

  public static convertPrivateCert<FROM, TO>(i: PrivateIdentityCertificate<FROM>, fn: (v: FROM) => TO): PrivateIdentityCertificate<TO> {
    return {
      exponent: fn(i.exponent),
      modulus: fn(i.modulus),
    };
  }

  private constructor() {
  }
}
