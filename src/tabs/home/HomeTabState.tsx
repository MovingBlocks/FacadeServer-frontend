import {SystemMetadata} from "common/io/SystemMetadata";
import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {OnlinePlayerMetadata} from "../../io/OnlinePlayerMetadata";

export interface HomeTabState {
  onlinePlayers?: OnlinePlayerMetadata[];
  engineState?: EngineStateMetadata;
  system?: SystemMetadata;
  serverMotd?: string;
  serverPort?: number;
}
