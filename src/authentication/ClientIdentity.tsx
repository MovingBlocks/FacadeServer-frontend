export interface PrivateIdentityCertificate<BigIntegerType> {
  modulus: BigIntegerType;
  exponent: BigIntegerType;
}

export interface PublicIdentityCertificate<BigIntegerType> {
  id: string;
  modulus: BigIntegerType;
  exponent: BigIntegerType;
  signature: BigIntegerType;
}

export interface ClientIdentity<BigIntegerType> {
  server: PublicIdentityCertificate<BigIntegerType>;
  clientPublic: PublicIdentityCertificate<BigIntegerType>;
  clientPrivate: PrivateIdentityCertificate<BigIntegerType>;
}
