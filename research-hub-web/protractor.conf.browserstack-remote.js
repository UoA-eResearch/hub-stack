// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
// Note that this is the config file for e2e tests using BrowserStack's automation API (against remote hosts). See protractor.conf.browserstack-local.js for local-test settings.

var BROWSERSTACK_CREDENTIALS = require('./e2e/browserstack-credentials');

exports.config = {
  allScriptsTimeout: 11000,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
  },
  onPrepare: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    browser.driver.manage().window().maximize();
  },

  'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],

  'commonCapabilities': {
    'browserstack.user' : BROWSERSTACK_CREDENTIALS.USER,
    'browserstack.key' : BROWSERSTACK_CREDENTIALS.KEY,
    'project' : 'ResearchHub',
    'build' : 'Production',
    'browserstack.debug' : true,
    'browserstack.video' : true,
    'acceptSslCerts' : true
  },

  'multiCapabilities': [{
    'browserName': 'Chrome',
    'os' : 'Windows',
    'os_version' : '10',
    'resolution' : '1920x1080'
  },{
    'browserName': 'Firefox',
    'os' : 'Windows',
    'os_version' : '10',
    'resolution' : '1920x1080'
  },{
    'browserName': 'Safari',
    'os' : 'OS X',
    'os_version' : 'Mojave',
    'resolution' : '1600x1200'
  }]
};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});