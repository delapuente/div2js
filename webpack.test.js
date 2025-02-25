/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const base = require("./webpack.config");
/* eslint-enable @typescript-eslint/no-require-imports */

delete base.entry;
delete base.output;

// Needed by Karma
base.devtool = "eval-source-map";

base.module.rules.push({
  test: /\.(ts|js)$/,
  use: {
    loader: "@ephesoft/webpack.istanbul.loader",
    options: { esModules: true },
  },
  include: path.resolve("src/"),
  enforce: "post",
  exclude: /node_modules|\.spec\.js$|div2lang\.js$/,
});

module.exports = base;
