# Research Hub Web
The front end for the [Research Hub](https://research-hub.auckland.ac.nz/), built with [Angular](https://angular.io/) and [Angular Material](https://material.angular.io/).

## Test runner

This project comes bundled with an interactive test runner capable of launching your:
 - Unit tests
 - e2e tests
    - Using Protractor+Angular's built in Selenium server
    - Using BrowserStack's automation API/Selenium server, including BrowserStack-local (allowing you to run BrowserStack against local hosts)

 Simply run `./test.sh` to specify what sort of testing you would like to do.
 
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

## Further help

To get more help on the Angular CLI use `npm run ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md)

## Dev

For local development run `npm run dev`. This will concurrently:
1. Boot up the `cer-graphql` server locally
2. Generate new schema types in the web project, monitor any changes to the `research-hub-web/src/app/graphql/` folder and automatically regenerate the schema if any changes are detected
3. Serve the web project locally on port 4200, querying the locally running GraphQL server

## GraphQL Schema Types

### Generate new GraphQL schema types

To generate new types run `npm run generate`