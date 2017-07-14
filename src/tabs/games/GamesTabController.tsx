import {TabController} from "../TabController";
import {GamesTabState} from "./GamesTabState";

export class GamesTabController extends TabController<GamesTabState> {

  public startGame = (gameName: string) => {
    this.setRunningGame(gameName);
  }

  public stopGame = () => {
    this.setRunningGame("");
  }

  public backupGame = (gameName: string) => {
    this.performGameAction(gameName, "Backup");
  }

  public deleteGame = (gameName: string) => {
    // TODO ask confirmation (here, in view or in model?)
    this.performGameAction(gameName, "Delete");
  }

  private setRunningGame(gameName: string) {
    this.model.sendData({
      data: {
        // TODO: build interface for resource request
        action: "WRITE",
        data: gameName,
        resourceName: "engineState",
      },
      messageType: "RESOURCE_REQUEST",
    });
  }

  private performGameAction(gameName: string, action: string) {
    this.model.sendData({
      data: {
        // TODO: build interface for resource request
        action: "WRITE",
        data: {
          data: {
            gameName,
          },
          type: action,
        },
        resourceName: "games",
      },
      messageType: "RESOURCE_REQUEST",
    });
  }

}
