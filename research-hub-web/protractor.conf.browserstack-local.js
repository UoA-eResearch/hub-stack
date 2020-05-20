// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
// Note that this is the config file for e2e tests using BrowserStack's automation API (against local hosts). See protractor.conf.browserstack-remote.js for remote-test settings.

var BROWSERSTACK_CREDENTIALS = require('./e2e/browserstack-credentials');
var browserstack = require('browserstack-local');

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
    'build' : 'Internal',
    'browserstack.debug' : true,
    'browserstack.video' : true,
    'browserstack.local' : true,
    'acceptSslCerts' : true,
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
  }],

    // Code to start browserstack local before start of test
  beforeLaunch: function(){
    console.log("Connecting local");
    return new Promise(function(resolve, reject){
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({'key': exports.config.commonCapabilities['browserstack.key'] }, function(error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  afterLaunch: function(){
    return new Promise(function(resolve, reject){
      exports.bs_local.stop(resolve);
    });
  }

};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});