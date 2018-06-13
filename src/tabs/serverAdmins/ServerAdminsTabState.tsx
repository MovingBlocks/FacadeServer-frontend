export interface IdNamePair {
  id: string;
  name: string;
}

export interface Permissions {
  consoleCheat: boolean;
  consoleUserManagement: boolean;
  consoleServerManagement: boolean;
  consoleDebug: boolean;
  installModules: boolean;
  createBackupRenameGames: boolean;
  deleteGames: boolean;
  startStopGames: boolean;
  changeSettings: boolean;
  adminManagement: boolean;
}

export interface AdminPermissions {
  id: string;
  permissions: Permissions;
}

export interface ServerAdminsTabState {
  admins: IdNamePair[];
  nonAdmins: IdNamePair[];
  adminPermissions: AdminPermissions[];
}
