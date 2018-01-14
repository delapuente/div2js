const path = require('path');

module.exports = {
  entry: ['./src/div2js.ts'],
  output: {
    filename: 'div2js.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
    library: 'div2',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: "source-map-loader"
      },
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: "awesome-typescript-loader"
      }
    ]
  },
  devServer: {
    contentBase: [path.resolve(__dirname), path.resolve(__dirname, 'assets')],
    watchContentBase: true,
    disableHostCheck: true
  },
  node: {
    'fs': 'empty'
  }
};
