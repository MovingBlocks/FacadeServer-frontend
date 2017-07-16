import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {Module} from "../../modules/Module";

export interface Version {
  major: number;
  minor: number;
  patch: number;
  snapshot: boolean;
}

export interface NameVersion {
  name: string;
  version: Version;
}

export interface GameManifest {
  title: string;
  seed: string;
  time: number;
  modules: NameVersion[];
}

export interface GameInfo {
  manifest: GameManifest;
  timestamp: string;
}

export interface GamesTabState {
  games?: GameInfo[];
  engineState?: EngineStateMetadata;
  availableModules?: Module[];
}
