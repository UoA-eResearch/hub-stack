// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-verbose-reporter'),
      require("karma-spec-reporter"),
      require('karma-time-stats-reporter')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    coverageReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      thresholds: {
        statements: 80,
        lines: 80,
        branches: 60,
        functions: 60
      },
      fixWebpackSourcePaths: true
    },
    reporters: ['spec', 'time-stats'],
    specReporter: {
      maxLogLines: 5,         // limit number of lines logged per test
      suppressErrorSummary: true,  // do not print error summary
      suppressFailed: false,  // do not print information about failed tests
      suppressPassed: false,  // do not print information about passed tests
      suppressSkipped: true,  // do not print information about skipped tests
      showSpecTiming: false // print the time elapsed for each spec
    },
    timeStatsReporter: {
      reportTimeStats: true,           // Print Time Stats (histogram)
      binSize: 100,                    // Bin size for histogram (in milliseconds)
      slowThreshold: 500,              // The threshold for what is considered a slow test (in milliseconds).
                                       // This is also the max value for last bin histogram
                                       // Note that this will automatically be rounded up to be evenly divisible by binSize
      reportSlowestTests: true,        // Print top slowest tests
      showSlowTestRankNumber: false,   // Displays rank number next to slow tests, e.g. `1) Slow Test`
      longestTestsCount: 5,            // Number of top slowest tests to list
                                       // Set to `Infinity` to show all slow tests. Useful in combination with `reportOnlyBeyondThreshold` as `true`
      reportOnlyBeyondThreshold: false // Only report tests that are slower than threshold

    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    retryLimit: 10,
    captureTimeout: 300000,
    browserNoActivityTimeout: 200000,
    flags: [
      '--disable-gpu',
      '--no-sandbox'
    ],
    singleRun: true,
    failOnEmptyTestSuite: false,
    captureConsole: true,
    browserConsoleLogOptions: {
      level: 'error',
      format: '%b %T: %m',
      terminal: true
    }
  });
};
