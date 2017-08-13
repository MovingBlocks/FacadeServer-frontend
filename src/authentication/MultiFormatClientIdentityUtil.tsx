import {ClientIdentity} from "./ClientIdentity";
import {ClientIdentityConverter} from "./ClientIdentityConverter";
import {Jsbn, MultiFormatBigInteger} from "./MultiFormatBigInteger";

export class MultiFormatClientIdentityUtil {

  public static buildFromJsbn(input: ClientIdentity<Jsbn>): ClientIdentity<MultiFormatBigInteger> {
    return ClientIdentityConverter.convertIdentity(input, MultiFormatBigInteger.buildFromJsbn);
  }

  public static buildFromBase64(input: ClientIdentity<string>): ClientIdentity<MultiFormatBigInteger> {
    return ClientIdentityConverter.convertIdentity(input, MultiFormatBigInteger.buildFromBase64);
  }

  public static extractBase64(input: ClientIdentity<MultiFormatBigInteger>): ClientIdentity<string> {
    return ClientIdentityConverter.convertIdentity(input, MultiFormatBigInteger.extractBase64);
  }

  public static extractJsbn(input: ClientIdentity<MultiFormatBigInteger>): ClientIdentity<Jsbn> {
    return ClientIdentityConverter.convertIdentity(input, MultiFormatBigInteger.extractJsbn);
  }

  private constructor() {
  }
}
