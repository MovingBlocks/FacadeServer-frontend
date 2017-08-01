import {AvailableModules} from "../../modules/AvailableModules";

export interface ModulesTabState {
  installedModules?: AvailableModules;
  installerStatus?: string;
}
