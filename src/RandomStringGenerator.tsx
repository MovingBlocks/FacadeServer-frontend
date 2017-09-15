export class RandomStringGenerator {

  public static generate(length: number): string {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += RandomStringGenerator.ALPHANUMERIC_CHARS[Math.floor(Math.random() * RandomStringGenerator.ALPHANUMERIC_CHARS.length)];
    }
    return result;
  }

  private static ALPHANUMERIC_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  private constructor() {
  }
}
