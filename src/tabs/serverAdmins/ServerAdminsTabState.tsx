export interface IdNamePair {
  id: string;
  name: string;
}

export interface AdminPermissions {
  id: string;
  consoleCheat: boolean;
  consoleUserManagement: boolean;
  consoleServerManagement: boolean;
  consoleDebug: boolean;
  installModules: boolean;
  createBackupRenameGames: boolean;
  deleteGames: boolean;
  stopGames: boolean;
  changeSettings: boolean;
  adminManagement: boolean;
}

export interface ServerAdminsTabState {
  admins: IdNamePair[];
  nonAdmins: IdNamePair[];
  adminPermissions: AdminPermissions[];
}
