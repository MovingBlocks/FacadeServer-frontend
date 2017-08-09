import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {OnlinePlayerMetadata} from "../../io/OnlinePlayerMetadata";

export interface HomeTabState {
  onlinePlayers?: OnlinePlayerMetadata[];
  engineState?: EngineStateMetadata;
  serverMotd?: string;
  serverPort?: number;
}
