#!/usr/bin/env node
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const merge = require('webpack-merge');
const Path = require('path');
const Config = require('./webpack.mock');

const [,, ...args] = process.argv;

console.log(`Hello World ${args}`);

const port = 4000;
const path = require('path');

const options = {
  hot: true,
  inline: true,
  stats: { colors: true }
};

const webpackConfig = merge(Config, {
  mode: 'development',
  devtool: 'eval-source-map',
});

const server = new WebpackDevServer(Webpack(webpackConfig), options);

server.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('WebpackDevServer listening at localhost:', port);
});
