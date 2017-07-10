import {TabController} from "../TabController";
import {GamesTabState} from "./GamesTabState";

export class GamesTabController extends TabController<GamesTabState> {

  public startGame = (gameName: string) => {
    this.setRunningGame(gameName);
  }

  public stopGame = () => {
    this.setRunningGame("");
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
}
