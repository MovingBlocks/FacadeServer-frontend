import RX = require("reactxp");
import {TabModel} from "./TabModel";

export abstract class TabView<StateType> extends RX.Component<{model: TabModel<StateType>}, StateType> {

  constructor(props: {model: TabModel<StateType>}) {
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
