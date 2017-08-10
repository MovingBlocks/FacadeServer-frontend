export interface IdNamePair {
  id: string;
  name: string;
}

export interface ServerAdminsTabState {
  admins: IdNamePair[];
  nonAdmins: IdNamePair[];
}
