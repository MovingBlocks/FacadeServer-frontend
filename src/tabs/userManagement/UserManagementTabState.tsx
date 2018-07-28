import {OnlinePlayerMetadata} from "../../io/OnlinePlayerMetadata";

export interface UserManagementTabState {
  onlinePlayers?: OnlinePlayerMetadata[];
  blacklist?: string[];
  whitelist?: string[];
  dialogUpdater?: (wl: string[], bl: string[]) => void;
}
