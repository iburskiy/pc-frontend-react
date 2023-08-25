const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { DefinePlugin } = require("webpack");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'inline-source-map',

  // fix refreshing urls like this: http://localhost:8081/product/details/ACAN1641R7FA
  // Only if BrowserRouter would be used in index.tsx, not HashRouter (см. Чтименя.md)
  output: {
    publicPath: '/',
  },

  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
    port: 8081,
  },
  plugins: [
    new DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify('http://localhost:8081/'),
    }),
    new ESLintPlugin({
      extensions: ['ts', 'tsx']
    }),
  ]
});