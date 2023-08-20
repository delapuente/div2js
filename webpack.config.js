/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/div2js.ts",
  output: {
    filename: "div2js.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    library: {
      name: "div2",
      type: "umd",
    },
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    fallback: {
      fs: false,
      path: false,
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        use: "source-map-loader",
      },
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
        watch: true,
      },
    ],
    allowedHosts: "all",
  },
  stats: {
    errorDetails: true,
    colors: true,
  },
};
