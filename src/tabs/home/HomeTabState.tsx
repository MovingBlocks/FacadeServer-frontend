export type EngineStateEnum =
  "IDLE" |
  "LOADING" |
  "RUNNING" |
  "UNKNOWN";

export interface EngineStateMetadata {
  state: EngineStateEnum;
  gameName?: string;
}

export interface HomeTabState {
  onlinePlayers?: string[];
  engineState?: EngineStateMetadata;
}
