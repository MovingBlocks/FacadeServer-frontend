import {ModuleMetadata} from "../../modules/ModuleMetadata";

export interface ModulesTabState {
  installedModules?: ModuleMetadata[];
  installerStatus?: string;
}
