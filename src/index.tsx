/* tslint:disable:no-var-requires */

import RX = require("reactxp");
import App = require("./App");

// polyfills for React Native
global.Buffer = global.Buffer || require("buffer").Buffer;
window.atob = window.atob || require("base-64").decode;
window.btoa = window.btoa || require("base-64").encode;

RX.App.initialize(true, true);
RX.UserInterface.setMainView(<App />);
