# FacadeServer-frontend [![Build Status](https://travis-ci.org/gianluca-nitti/FacadeServer-frontend.svg?branch=master)](https://travis-ci.org/gianluca-nitti/FacadeServer-frontend)
This repository contains a web and mobile front-end to [Terasology's FacadeServer](https://github.com/MovingBlocks/FacadeServer), based on the [ReactXP](https://github.com/Microsoft/reactxp) framework. The initial code structure was imported from the [ReactXP hello-world example](https://github.com/Microsoft/reactxp/tree/master/samples/hello-world).

## How to build
At the moment, the Web (browser-based) environment is the main target, but the ReactXP framework has been chosen to allow to make both web and mobile (Android/iOS) builds from the same codebase.

To build for web, simply install the dependencies **including the development ones** with `npm install --dev`, then run `npm run web`; this will compile Typescript to Javascript and bundle the modules in an optimized JS file. When it returns, you can open `index.html` with any browser to run the application.

I also managed to build for Android by following the instructions on the [sample ReactXP project](https://github.com/Microsoft/reactxp/tree/master/samples/hello-world#building-for-react-native); when I'll manage to bring the user interface to an enough mobile-friendly state, I'll provide detailed mobile build instructions here.
