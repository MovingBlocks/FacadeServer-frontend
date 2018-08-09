import {TabController} from "../TabController";
import {ModulesTabState} from "./ModulesTabState";

export class ModulesTabController extends TabController<ModulesTabState> {

  public installModules = (moduleIds: string[]) => {
    this.model.requestResource({
      data: moduleIds,
      method: "PUT",
      resourcePath: ["modules", "installer"],
    });
  }

}
