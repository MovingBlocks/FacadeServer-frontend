import RX = require("reactxp");
import {TabModel} from "./TabModel";

interface TabViewProps<StateType> {
  model: TabModel<StateType>;
}

export abstract class TabView<StateType> extends RX.Component<TabViewProps<StateType>, StateType> {

  constructor(props: TabViewProps<StateType>) {
      super(props);
      this.state = props.model.getState();
  }

  public componentDidMount() {
    this.props.model.setUpdateViewCallback((newState: StateType) => this.setState(newState));
  }

  public componentWillUnmount() {
    this.props.model.setUpdateViewCallback((newState: StateType) => {return; });
  }

}
