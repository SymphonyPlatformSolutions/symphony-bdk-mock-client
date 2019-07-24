/* eslint-disable */
// Disaling LINT for CommonsJS
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

let currEnv = 'MOCK';

console.log('Current environment: ', currEnv);

module.exports = {
  entry: {
    mock: path.resolve(__dirname, 'dist/wrapper.bundle.js'),
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: './dist', to: '' },
    ]),
    new webpack.DefinePlugin({
      'process.env.currEnv': JSON.stringify(currEnv),
    }),
  ],
};
