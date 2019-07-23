#!/usr/bin/env node
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const merge = require('webpack-merge');
const Path = require('path');

const argv = require('yargs')
  .usage('Usage: $0 --extension-app http://localhost:4000')
  .describe('extension-app','The app url to load')
  .demandOption(['extension-app'])
  .argv;

const Config = require('./webpack.cli');

const port = 5000;
const path = require('path');

const options = {
  https: true,
  hot: true,
  inline: true,
  stats: { colors: true },
    headers: {
    'Access-Control-Allow-Origin': '*'
  },
  proxy: [{
      context: [
        '/app.html',
        '/controller.bundle.js',
        '/app.bundle.js',
        '/bundle.json',
        '/favicon.ico',
        '/app.css',
      ],
      target: argv.extensionApp,
      secure: false,
    }, {
      context: ['/assets/'],
      target: argv.extensionApp,
      secure: false,
    }
  ],
};

const webpackConfig = merge(Config, {
  mode: 'development',
  devtool: 'eval-source-map',
});

const server = new WebpackDevServer(Webpack(webpackConfig), options);

server.listen(port, '0.0.0.0', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('WebpackDevServer listening at localhost:', port);
});
