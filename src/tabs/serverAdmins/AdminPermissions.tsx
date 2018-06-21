// Must be the same as the enum variable names in the backend.
export interface Permissions {
  CONSOLE_CHEAT: boolean;
  CONSOLE_USER_MANAGEMENT: boolean;
  CONSOLE_SERVER_MANAGEMENT: boolean;
  CONSOLE_DEBUG: boolean;
  INSTALL_MODULES: boolean;
  CREATE_BACKUP_RENAME_GAMES: boolean;
  DELETE_GAMES: boolean;
  START_STOP_GAMES: boolean;
  CHANGE_SETTINGS: boolean;
  ADMIN_MANAGEMENT: boolean;
}

// These variable names must not change due to how the Java Pair class serializes data.
export interface AdminPermissions {
  id: string;
  permissions: Permissions;
}
