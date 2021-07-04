import { OnlinePlayerMetadata } from "../../io/OnlinePlayerMetadata";

export interface Message {
  type: "CONSOLE" | "CHAT" | "ERROR" | "NOTIFICATION" | "CLIENT";
  message: string;
}

export interface ChatTabState {
  messages?: Message[];
  commandToSend?: string;
  commands?: string[];
  messageSendStatus?: "SENDING" | "SENT" | "ERROR" | "NONE";
  errorMessage?: string;
  selectedRecipient?: string;
  onlinePlayers?: OnlinePlayerMetadata[];
}
