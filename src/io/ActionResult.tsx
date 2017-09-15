export type ActionResultStatus =
  "OK" |
  "BAD_REQUEST" |
  "FORBIDDEN" |
  "ACTION_NOT_ALLOWED" |
  "NOT_FOUND";

export interface ActionResult {
  status: ActionResultStatus;
  message: string;
  data: any;
}
