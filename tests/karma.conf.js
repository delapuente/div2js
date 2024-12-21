/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("../webpack.test.js");

module.exports = function (config) {
  config.set({
    basePath: "../",
    frameworks: ["webpack", "mocha", "sinon-chai"],
    plugins: [
      "karma-webpack",
      "karma-mocha",
      "karma-sinon-chai",
      "karma-mocha-reporter",
      "karma-coverage-istanbul-reporter",
      "karma-chrome-launcher",
      "karma-firefox-launcher",
    ],
    files: [
      { pattern: "tests/index.ts", watched: false },
      { pattern: "tests/spec/samples/**/*", included: false },
      { pattern: "src/div2lang.js", included: false, served: false },
      {
        pattern: "demos/+(PAL|FPG|HELP|MAP)/**/*",
        served: true,
        included: false,
        watched: false,
      },
    ],
    preprocessors: {
      "tests/**/*.ts": ["webpack"],
    },
    webpack,
    browsers: ["Firefox", "Chrome"],
    client: {
      captureConsole: true,
      mocha: { ui: "bdd" },
    },
    coverageIstanbulReporter: {
      reports: ["text-summary", "html"],
      fixWebpackSourcePaths: true,
    },
    reporters: ["mocha", "coverage-istanbul"],
    mime: { "text/x-typescript": ["ts"] },
  });
};
