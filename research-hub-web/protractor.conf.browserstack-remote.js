// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
// Note that this is the config file for e2e tests using BrowserStack's automation API (against remote hosts). See protractor.conf.browserstack-local.js for local-test settings.

const { SpecReporter } = require('jasmine-spec-reporter');
var { 
  BROWSERSTACK_CREDENTIALS_USER, 
  BROWSERSTACK_CREDENTIALS_KEY 
} = require('dotenv').config({path: '../.env'}).parsed;

exports.config = {
  allScriptsTimeout: 11000,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
  },
  onPrepare: function () {
    require('ts-node').register({
      project: require('path').join(__dirname, './e2e/tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    browser.driver.manage().window().maximize();
  },

  'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],

  'commonCapabilities': {
    'browserstack.user': BROWSERSTACK_CREDENTIALS_USER,
    'browserstack.key': BROWSERSTACK_CREDENTIALS_KEY,
    'project': 'ResearchHub',
    'build': 'Production',
    'browserstack.debug': true,
    'browserstack.video': true,
    'acceptSslCerts': true
  },

  'multiCapabilities': [{
    'browserName': 'Chrome',
    'os': 'Windows',
    'os_version': '10',
    'resolution': '1920x1080'
  }, {
    'browserName': 'Firefox',
    'os': 'Windows',
    'os_version': '10',
    'resolution': '1920x1080'
  }, {
    'browserName': 'Safari',
    'os': 'OS X',
    'os_version': 'Mojave',
    'resolution': '1600x1200'
  }]
};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});