import {EngineStateMetadata} from "../../io/EngineStateMetadata";

export interface GameInfo {
  manifest: any;
  timestamp: string;
}

export interface GamesTabState {
  games?: GameInfo[];
  engineState?: EngineStateMetadata;
}
