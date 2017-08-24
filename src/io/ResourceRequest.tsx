import {ResourcePath} from "./ResourcePath";

export type ResourceMethodName =
  "GET" |
  "POST" |
  "PUT" |
  "DELETE" |
  "PATCH";

export interface ResourceRequest {
  method: ResourceMethodName;
  resourcePath: ResourcePath;
  data?: any;
}
