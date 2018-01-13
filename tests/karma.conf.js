const webpack = require('../webpack.test.js');

module.exports = function (config) {
  config.set({
    basePath: '../',
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      { pattern: 'tests/index.js', watched: false },
      { pattern: 'tests/spec/samples/**/*', included: false },
      { pattern: 'src/div2lang.js', included: false, served: false },
    ],
    preprocessors: {
      'tests/**/*.js': ['webpack']
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
    reporters: ['mocha', 'coverage-istanbul']
  });
};
