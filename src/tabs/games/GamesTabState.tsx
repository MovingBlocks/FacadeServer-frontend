import {EngineStateMetadata} from "../../io/EngineStateMetadata";
import {ModuleMetadata} from "../../modules/ModuleMetadata";
import {WorldGeneratorInfo} from "../../modules/WorldGeneratorInfo";

export interface NameVersion {
  name: string;
  version: string;
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
  availableModules?: ModuleMetadata[];
  worldGenerators?: WorldGeneratorInfo[];
}
