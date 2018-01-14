const webpack = require('../webpack.test.js');

module.exports = function (config) {
  config.set({
    basePath: '../',
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      { pattern: 'tests/index.ts', watched: false },
      { pattern: 'tests/spec/samples/**/*', included: false },
      { pattern: 'src/div2lang.js', included: false, served: false },
    ],
    preprocessors: {
      'tests/**/*.ts': ['webpack']
    },
    webpack,
    browsers: ['Firefox', 'Chrome'],
    client: {
      captureConsole: true,
      mocha: { ui: 'bdd' }
    },
    coverageIstanbulReporter: {
      reports: [ 'text-summary', 'html' ],
      fixWebpackSourcePaths: true
    },
    reporters: ['mocha', 'coverage-istanbul'],
    mime: { 'text/x-typescript': ['ts'] }
  });
};
