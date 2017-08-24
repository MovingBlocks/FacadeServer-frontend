import {TabController} from "../TabController";
import {SettingsTabState} from "./SettingsTabState";

export class SettingsTabController extends TabController<SettingsTabState> {

  public updatePort = (newValue: string) => {
    const n: number = parseInt(newValue, 10);
    if (!isNaN(n)) {
      this.model.update({serverPort: n});
    }
  }

  public updateMotd = (newValue: string) => {
    this.model.update({serverMotd: newValue});
  }

  public save = () => {
    this.model.requestResource({
      data: this.model.getState().serverMotd,
      method: "PUT",
      resourcePath: ["config", "MOTD"],
    });
    this.model.requestResource({
      data: this.model.getState().serverPort,
      method: "PUT",
      resourcePath: ["config", "serverPort"],
    });
  }

  public reset = () => {
    this.model.initialize();
  }

}
