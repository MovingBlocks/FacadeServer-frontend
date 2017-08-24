export type EngineStateEnum =
  "IDLE" |
  "LOADING" |
  "RUNNING" |
  "UNKNOWN";

export interface EngineStateMetadata {
  state: EngineStateEnum;
  gameName?: string;
}

export class EngineStateMetadataUtils {

  public static render(engineState: EngineStateMetadata): string {
    return this.capitalizeFirst(engineState.state) + " " + this.emptyIfUndefinedOrNull(engineState.gameName);
  }

  /*public static isResourceAvailable(engineState: EngineStateMetadata, resourceName: ResourceName): boolean {
    if (resourceName === "onlinePlayers" || resourceName === "console") {
      return engineState.state === "RUNNING";
    }
    return true;
  }*/ // TODO

  private static capitalizeFirst(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  private static emptyIfUndefinedOrNull(input: string): string {
    return input ? input : "";
  }
}
