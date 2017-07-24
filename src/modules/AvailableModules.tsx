import {Module} from "./Module";
import {WorldGenerator} from "./WorldGenerator";

export interface AvailableModules {
  modules: Module[];
  worldGenerators: WorldGenerator[];
}
