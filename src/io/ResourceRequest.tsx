export type ResourceAction = "READ" | "WRITE";

export interface ResourceRequest {
  action: ResourceAction;
  resourceName: string;
  data?: any;
}
