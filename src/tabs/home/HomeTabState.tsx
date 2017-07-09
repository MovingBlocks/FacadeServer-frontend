import {EngineStateMetadata} from "../../io/EngineStateMetadata";

export interface HomeTabState {
  onlinePlayers?: string[];
  engineState?: EngineStateMetadata;
}
