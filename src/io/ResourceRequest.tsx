import {ResourceName} from "./ResourceName";

export type ResourceAction = "READ" | "WRITE";

export interface ResourceRequest {
  action: ResourceAction;
  resourceName: ResourceName;
  data?: any;
}
