import {AdminPermissions} from "common/tabs/serverAdmins/AdminPermissions";

export interface IdNamePair {
  id: string;
  name: string;
}

export interface ServerAdminsTabState {
  admins: IdNamePair[];
  nonAdmins: IdNamePair[];
  adminPermissions: AdminPermissions[];
}
