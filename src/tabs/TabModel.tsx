import {IncomingMessage} from "../io/IncomingMessage";
import {OutgoingMessage} from "../io/OutgoingMessage";
import {ResourceRequest} from "../io/ResourceRequest";
import {TabController} from "./TabController";

export abstract class TabModel<StateType> {

  private sendData: (data: OutgoingMessage) => void;
  private state: StateType = this.getDefaultState();
  private controller: TabController<StateType>;
  private updateView: (viewState: StateType) => void;

  constructor() {
     this.updateView = () => {return; };
  }

  public abstract getName(): string;
  public abstract getDefaultState(): StateType;
  public abstract initController(): TabController<StateType>;
  public abstract onMessage(message: IncomingMessage): void;

  public initialize(): void {
    this.controller = this.initController();
    if (this.controller !== null) {
      this.controller.setModel(this);
    }
  }

  public getController(): TabController<StateType> {
    return this.controller;
  }

  public getState(): StateType {
    return this.state;
  }

  public setUpdateViewCallback(callback: (viewState: StateType) => void) {
    this.updateView = callback;
    this.updateView(this.state);
  }

  public setSendDataCallback(callback: (data: OutgoingMessage) => void) {
    this.sendData = callback;
  }

  public update(state: StateType) {
    // merge the new state with the old one
    for (const fieldName in state) {
      if (state.hasOwnProperty(fieldName)) {
        this.state[fieldName] = state[fieldName];
      }
    }
    this.updateView(state);
  }

  public requestResource = (data: ResourceRequest) => {
    this.sendData({messageType: "RESOURCE_REQUEST", data});
  }

}
