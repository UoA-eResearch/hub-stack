// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {
  SpecReporter,
  StacktraceOption
} = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 65000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--headless',
        '--window-size=1920,1080',
        '--disable-extensions'
      ]
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 65000,
    print: function () { }
  },
  logLevel: 'WARN',
  onPrepare: function () {
    require('ts-node').register({
      project: require('path').join(__dirname, 'tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: StacktraceOption.PRETTY
        }
      })
    )
  }
};