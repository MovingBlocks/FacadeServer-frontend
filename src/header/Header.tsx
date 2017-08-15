import RX = require("reactxp");
import Styles = require("../styles/main");
import {HeaderProps} from "./HeaderProps";
import {MobileHeader} from "./MobileHeader";
import {WebHeader} from "./WebHeader";

export class Header extends RX.Component<HeaderProps, null> {

  public render() {
    const p = this.props;
    return RX.Platform.getType() === "web" ?
      <WebHeader serverAddr={p.serverAddr} authenticated={p.authenticated} showLogin={p.showLogin} toggleMenu={p.toggleMenu} /> :
      <MobileHeader serverAddr={p.serverAddr} authenticated={p.authenticated} showLogin={p.showLogin} toggleMenu={p.toggleMenu} />;
  }
}
