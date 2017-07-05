import {TabModel} from "./TabModel";

export abstract class TabController<StateType> {

  protected model: TabModel<StateType>;

  public setModel(model: TabModel<StateType>): void {
    this.model = model;
  }
}
