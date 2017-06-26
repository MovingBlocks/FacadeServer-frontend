# FacadeServer-frontend
This repository contains a web and mobile front-end to Terasology's FacadeServer (https://github.com/MovingBlocks/FacadeServer), based on the [ReactXP](https://github.com/Microsoft/reactxp) framework. The initial code structure was imported from the [ReactXP hello-worrld example](https://github.com/Microsoft/reactxp/tree/master/samples/hello-world).

## How to build
At the moment, the Web (browser-based) environment is the main target, but the ReactXP framework has been chosen to allow to make both web and mobile (Android/iOS) builds from the same codebase.

To build for web, simply install the dependencies *including the development ones* with `npm install --dev`, then run `npm run web-watch`; this will compile Typescript to Javascript and bundle the modules in an optimized JS file. The command is meant to be ran in background to watch the source files and recompile them on-the-fly when they change, so it won't return; you can stop it with a CTRL-C (or equivalent on your OS) when you see `[at-loader] Ok, X sec.`. At this point you can open `index.html` with any browser to run the application.

I also managed to build for Android by following the instructions on the [sample ReactXP project](https://github.com/Microsoft/reactxp/tree/master/samples/hello-world#building-for-react-native); when I'll manage to bring the user interface to an enough mobile-friendly state, I'll provide detailed mobile build instructions here.
