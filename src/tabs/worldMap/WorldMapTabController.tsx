import {TabController} from "../TabController";
import {WorldMapTabState} from "./WorldMapTabState";

export class WorldMapTabController extends TabController<WorldMapTabState> {

  // TODO: figure out how to send the data
  public test() {
    this.model.requestResource({
      method: "PUT",
      resourcePath: ["worldMap"],
      data: null,
    });
  }

}
