import {TextPromptDialog} from "../../TextPromptDialog";
import {YesNoDialog} from "../../YesNoDialog";
import {TabController} from "../TabController";
import {GamesTabState} from "./GamesTabState";
import {NewGameMetadata} from "./NewGameMetadata";

export class GamesTabController extends TabController<GamesTabState> {

  public startGame = (gameName: string) => {
    this.model.requestResource({
      data: {state: "LOADING", gameName},
      method: "PUT",
      resourcePath: ["engineState"],
    });
  }

  public stopGame = () => {
    this.model.requestResource({
      data: {state: "IDLE"},
      method: "PUT",
      resourcePath: ["engineState"],
    });
  }

  public backupGame = (gameName: string) => {
    this.model.requestResource({
      method: "POST",
      resourcePath: ["games", gameName, "backup"],
    });
  }

  public deleteGame = (gameName: string) => {
    YesNoDialog.show("The savegame \"" + gameName + "\" will be permanently deleted. Are you sure?", () =>
      this.model.requestResource({
        method: "DELETE",
        resourcePath: ["games", gameName],
      }));
  }

  public renameGame = (oldGameName: string) => {
    TextPromptDialog.show("Enter the new name:", (newGameName) =>
      this.model.requestResource({
        data: {gameName: newGameName},
        method: "PATCH",
        resourcePath: ["games", oldGameName],
      }));
  }

  public newGame = (data: NewGameMetadata) => {
    this.model.requestResource({
      data,
      method: "POST",
      resourcePath: ["games"],
    });
  }

}
