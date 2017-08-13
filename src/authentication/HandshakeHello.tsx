import {PublicIdentityCertificate} from "./ClientIdentity";

export interface HandshakeHello {
  random: string;
  certificate: PublicIdentityCertificate<string>;
  timestamp: string;
}
