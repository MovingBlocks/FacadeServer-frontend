export interface Message {
  type: "CONSOLE" | "CHAT" | "ERROR" | "NOTIFICATION";
  message: string;
}

export interface ConsoleTabState {
  messages?: Message[];
  commandToSend?: string;
  commands?: string[];
  filteredHelpText?: string;
}
