export type ResourcePath = string[];

export class ResourcePathUtil {

  public static equals(a: ResourcePath, b: ResourcePath): boolean {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  private constructor() {
  }
}
