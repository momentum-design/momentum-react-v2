const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const { baseConfig } = require('./base.config');
const { repoRoot } = require('./constants');

baseConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new MiniCssExtractPlugin('[name].[contenthash].css'),
  new HtmlWebpackPlugin({
    template: 'src/app/index.ejs',
    favicon: 'src/app/favicon.ico',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
    inject: true,
    // Note that you can add custom options here if you need to handle other custom logic in index.html
    // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
    trackJSToken: '',
  })
);

baseConfig.module.rules.push({
  test: /(\.css|\.scss|\.sass)$/,
  use: [
    { loader: MiniCssExtractPlugin.loader },
    'css-loader?sourceMap',
    'sass-loader?sourceMap'
  ]
});

exports.config = [
  {
    ...baseConfig,

    target: 'web',

    entry: [
      'babel-polyfill',
      path.resolve(repoRoot, 'src/app/index')
    ],

    output: {
      path: path.resolve(repoRoot, 'dist'),
      publicPath: '/',
      filename: 'index.js',
    },
  },
];
