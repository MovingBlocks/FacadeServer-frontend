import { TabController } from "../TabController";
import { ChatTabState, Message } from "./ChatTabState";

export class ChatTabController extends TabController<ChatTabState> {
    public static Commands = ["say", "whisper"];

    public execute = () => {
        const command: string = this.model.getState().commandToSend;
        const m = this.model.getState();
        const recipient: string = m.selectedRecipient;
        if (!recipient || recipient === "ALL") {
            this.model.requestResource({
                data: "say " + command,
                method: "POST",
                resourcePath: ["console"],
            });
        } else {
            const recipientName = recipient.replace("PLAYER_", "");
            this.model.requestResource({
                data: `whisper ${recipientName} ${command}`,
                method: "POST",
                resourcePath: ["console"],
            });
        }
        this.model.update({
            commandToSend: "",
        });
    }
}
