const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const { baseConfig } = require('./webpack.config.base');
const { repoRoot } = require('./constants');

baseConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new MiniCssExtractPlugin('[name].[contenthash].css'),
  new HtmlWebpackPlugin({
    template: 'src/examples/index.ejs',
    favicon: 'src/examples/favicon.ico',
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

// baseConfig.module.rules.push({
//   test: /(\.css|\.scss|\.sass)$/,
//   use: [
//     { loader: MiniCssExtractPlugin.loader },
//     'css-loader?sourceMap',
//     'sass-loader?sourceMap'
//   ]
// });

exports.config = [
  {
    ...baseConfig,

    target: 'web',

    entry: ['babel-polyfill', path.resolve(repoRoot, 'src/examples/index')],

    module: {
      rules: [
        {
          test: /(\.css|\.scss|\.sass)$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            'css-loader?sourceMap',
            'sass-loader?sourceMap',
          ],
        },
        {
          test: /\.(js)?$/,
          include: [
            path.resolve(repoRoot, 'src'),
            path.resolve(repoRoot, 'node_modules/@momentum-ui/icons/data'),
          ],
          use: ['babel-loader'],
        },
        {
          test: /\.eot(\?v=\d+.\d+.\d+)?$/,
          loader: 'url-loader?name=[name].[ext]',
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]',
        },
        {
          test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]',
        },
        {
          test: /\.svg(\?v=\d+.\d+.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]',
        },
        { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
        { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      ],
    },

    output: {
      path: path.resolve(repoRoot, './docs/examples'),
      publicPath: '/',
      filename: 'index.js',
    },

    resolve: {
      extensions: ['*', '.js', '.json'],
      alias: {
        '@momentum-ui/react': path.resolve(repoRoot, 'dist/esm', 'index.js'),
      },
    },
  },
];
