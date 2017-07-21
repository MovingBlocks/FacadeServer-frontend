# FacadeServer-frontend [![Build Status](https://travis-ci.org/gianluca-nitti/FacadeServer-frontend.svg?branch=master)](https://travis-ci.org/gianluca-nitti/FacadeServer-frontend)
This repository contains a web and mobile front-end to [Terasology's FacadeServer](https://github.com/MovingBlocks/FacadeServer), based on the [ReactXP](https://github.com/Microsoft/reactxp) framework. The initial code structure was imported from the [ReactXP hello-world example](https://github.com/Microsoft/reactxp/tree/master/samples/hello-world).

The latest successful build is automatically pushed to Github Pages, so that you can try it here: https://gianluca-nitti.github.io/FacadeServer-frontend/

## How to build
At the moment, the Web (browser-based) environment is the main target, but the ReactXP framework has been chosen to allow to make both web and mobile (Android/iOS) builds from the same codebase.

### Web
To build for web, simply install the dependencies **including the development ones** with `npm install --dev`, then run `npm run web`; this will compile Typescript to Javascript and bundle the modules in an optimized JS file. When it returns, you can open `index.html` with any browser to run the application.

### Android
To run on an Android emulator or device accessible over ADB, after installing all the required dependencies with `npm install --dev` you need to run `npm run rn-watch`, which compiles Typescript to Javascript and keeps running in background to automatically recompile if the sources change (in fact, this command won't return until you manually terminate it), then from another terminal run `npm run android` (will fail if there is neither a running AVD nor a physical device connected and accessible via ADB).
