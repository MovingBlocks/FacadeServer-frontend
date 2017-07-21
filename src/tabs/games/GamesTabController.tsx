import {TextPromptDialog} from "../../TextPromptDialog";
import {TabController} from "../TabController";
import {GamesTabState} from "./GamesTabState";
import {NewGameDialogState} from "./NewGameDialog";

export class GamesTabController extends TabController<GamesTabState> {

  public startGame = (gameName: string) => {
    this.setRunningGame(gameName);
  }

  public stopGame = () => {
    this.setRunningGame("");
  }

  public backupGame = (gameName: string) => {
    this.performGameAction({gameName}, "Backup");
  }

  public deleteGame = (gameName: string) => {
    // TODO ask confirmation (here, in view or in model?)
    this.performGameAction({gameName}, "Delete");
  }

  public renameGame = (gameName: string) => {
    TextPromptDialog.show("Enter the new name:", (newGameName) => {
      this.performGameAction({gameName, newGameName}, "Rename");
    });
  }

  public newGame = (data: NewGameDialogState) => {
    this.model.requestResource({
      action: "WRITE",
      data: {
        data,
        type: "New",
      },
      resourceName: "games",
    });
  }

  private setRunningGame(gameName: string) {
    this.model.requestResource({
      action: "WRITE",
      data: gameName,
      resourceName: "engineState",
    });
  }

  private performGameAction(data: any, action: string) {
    this.model.requestResource({
      action: "WRITE",
      data: {
        data,
        type: action,
      },
      resourceName: "games",
    });
  }

}
