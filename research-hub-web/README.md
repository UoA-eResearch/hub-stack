# Research Hub Web
The front end for the [Research Hub](https://research-hub.auckland.ac.nz/), built with [Angular](https://angular.io/) and [Angular Material](https://material.angular.io/).

## Developing

Follow steps 1 and 2 in the [research-hub-deploy README](https://github.com/UoA-eResearch/research-hub-deploy#research-hub-deploy).

To experience the full functionality of the app, you also need to run research-hub-api and research-hub-db whilst developing. 
Follow the instructions on the following pages:

* [research-hub-db](https://github.com/UoA-eResearch/research-hub-db#research-hub-db): run the database using Docker
* [research-hub-api](https://github.com/UoA-eResearch/research-hub-api#research-hub-api): run the api directly with Maven or via the IntelliJ IDE

Navigate to the research-hub-web folder (this command assumes you're in the `research-hub-deploy` folder):
```bash
cd build/research-hub-web
```

Install dependencies:
```bash
npm install
```

Then run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you 
change any of the source files.

To test run the app in production mode, run `npm run test-prod`.

## Code scaffolding

Run `npm run ng generate component component-name` to generate a new component. You can also use `npm run ng generate directive|pipe|service|class|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. 

## Build production and use webpack bundle analyzer

Run `npm run build-prod` to build the project in production mode.

You can also visualise the size of the webpack output files with [webpack bundle analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer), 
an interactive zoomable treemap. To do this, once the build has finished, run `npm run bundle-report`.

## Test runner

This project comes bundled with an interactive test runner capable of launching your:
 - Unit tests
 - e2e tests
    - Using Protractor+Angular's built in Selenium server
    - Using BrowserStack's automation API/Selenium server, including BrowserStack-local (allowing you to run BrowserStack against local hosts)

 Simply run `./test.sh` to specify the sort of testing you would like to do.
 
 Note: if you wish to use BrowserStack automated e2e testing you must store your BrowserStack credentials in a file `./e2e/browserstack-credentials.json` in the format:

```
 {
    "USER": "BrowserStack-username-here",
    "KEY": "BrowserStack-api-key-here"
 }
```

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm run start`.

## Documentation

Run `npm run compodoc` to generate new documentation via [Compodoc](https://compodoc.app/).

## Further help

To get more help on the Angular CLI use `npm run ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
