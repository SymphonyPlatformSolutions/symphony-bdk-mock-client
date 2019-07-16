/* eslint-disable */
// Disaling LINT for CommonsJS
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


const wrapperEntry = './src/wrapper.js';
const currEnv = 'MOCK';
const rendererEntry = './src/renderer-mock.js';
const symphonyMockEntry = './src/symphony-mock.js';

console.log('Current environment: ', currEnv);

const config = {
  entry: {
    wrapper: path.resolve(wrapperEntry),
    renderer: path.resolve(rendererEntry),
    'symphony-mock': path.resolve(symphonyMockEntry),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 81920,
          },
        }],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/react', '@babel/preset-env'],
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.hbs$/, loader: 'raw-loader' },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'renderer-app.html',
      template: './src/renderer-app.html',
      inject: false,
    }),
    new webpack.DefinePlugin({
      'process.env.currEnv': JSON.stringify(currEnv),
    }),
    new CopyWebpackPlugin([
      { from: './src/assets', to: 'assets' },
    ]),
    new CopyWebpackPlugin([
      { from: './src/assets/sass/fonts', to: 'fonts' },
    ]),
    new CopyWebpackPlugin([
      { from: './src/renderer.js', to: '' },
    ]),
    new CopyWebpackPlugin([
      { from: './src/default-entities.js', to: '' },
    ]),
  ],
};

module.exports = config;
