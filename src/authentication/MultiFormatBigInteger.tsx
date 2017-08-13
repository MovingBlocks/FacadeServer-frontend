/* tslint:disable:no-var-requires */

const BigInteger = require("jsbn").BigInteger;

export type Jsbn = any;

export class MultiFormatBigInteger {

  public static buildFromJsbn(jsbn: Jsbn): MultiFormatBigInteger {
    return new MultiFormatBigInteger(jsbn, MultiFormatBigInteger.jsbnToBase64(jsbn));
  }

  public static buildFromBase64(base64: string): MultiFormatBigInteger {
    return new MultiFormatBigInteger(MultiFormatBigInteger.base64ToJsbn(base64), base64);
  }

  public static extractBase64(multiFormat: MultiFormatBigInteger): string {
    return multiFormat.getBase64();
  }

  public static extractJsbn(multiFormat: MultiFormatBigInteger): Jsbn {
    return multiFormat.getJsbn();
  }

  private static jsbnToBase64(input: Jsbn): string {
    const buffer = input.toByteArray();
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  private static base64ToJsbn(input: string): Jsbn {
    const hex = new Buffer(input, "base64").toString("hex");
    return new BigInteger(hex, 16);
  }

  private jsbn: Jsbn;
  private base64: string;

  private constructor(jsbn: Jsbn, base64: string) {
    this.jsbn = jsbn;
    this.base64 = base64;
  }

  public getBase64(): string {
    return this.base64;
  }

  public getJsbn(): Jsbn {
    return this.jsbn;
  }

  public getHex(): string {
    return this.jsbn.toString(16);
  }

}
