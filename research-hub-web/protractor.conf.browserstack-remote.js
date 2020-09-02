// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
// Note that this is the config file for e2e tests using BrowserStack's automation API (against remote hosts). See protractor.conf.browserstack-local.js for local-test settings.

const {
  SpecReporter,
  StacktraceOption
} = require('jasmine-spec-reporter');

var {
  BROWSERSTACK_CREDENTIALS_USER,
  BROWSERSTACK_CREDENTIALS_KEY
} = require('dotenv').config({ path: '../.env' }).parsed;

exports.config = {
  allScriptsTimeout: 65000,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 65000,
    print: function () { }
  },
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
    );
    browser.driver.manage().window().maximize();
  },

  'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],

  'commonCapabilities': {
    'browserstack.user': BROWSERSTACK_CREDENTIALS_USER,
    'browserstack.key': BROWSERSTACK_CREDENTIALS_KEY,
    'browserstack.local': 'false',
    'project': 'ResearchHub',
    'build': 'Production',
    'browserstack.debug': 'false',
    'browserstack.video': 'true',
    'acceptSslCerts': 'true',
    'browserstack.idleTimeout': '120'
  },

  'multiCapabilities': [
    {
      'os': 'Windows',
      'os_version': '10',
      'browserName': 'Chrome',
      'resolution': '1920x1080',
    },
    {
      'os': 'Windows',
      'os_version': '10',
      'browserName': 'Firefox',
      'resolution': '1920x1080',
    },
    {
      'os': 'OS X',
      'browserName': 'Safari',
      'os_version': 'Catalina',
      'resolution': '1920x1080'
    }]
};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});