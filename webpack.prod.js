const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const { DefinePlugin } = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true, //cleans `dist` folder while making new build
  },
  // to omit creation of LICENSE.txt file
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  plugins: [
    new DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify('http://ibursky.com/'),
    }),
  ]
});