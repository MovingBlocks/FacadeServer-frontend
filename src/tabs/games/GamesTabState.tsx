import {EngineStateMetadata} from "../../io/EngineStateMetadata";

export interface Name {
  originalName: string;
  normalisedName: string;
}

export interface Version {
  major: number;
  minor: number;
  patch: number;
  snapshot: boolean;
}

export interface NameVersion {
  name: Name;
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
}
