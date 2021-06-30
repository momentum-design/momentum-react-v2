const autoprefixer = require('autoprefixer');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const { baseConfig } = require('./webpack.config.base.js');
const { repoRoot } = require('./constants');

// baseConfig.resolve.alias['react-dom'] = '@hot-loader/react-dom';

// baseConfig.module.rules.push({
//   test: /(\.css|\.scss|\.sass)$/,
//   use: [
//     'style-loader',
//     'css-loader?sourceMap',
//     {
//       loader: 'postcss-loader',
//       options: {
//         sourceMap: 'inline',
//         ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
//         plugins: () => [
//           require('postcss-flexbugs-fixes'),
//           autoprefixer({
//             browsers: [
//               '>.25%',
//               'not ie < 9', // React doesn't support IE8 anyway
//             ],
//             flexbox: 'no-2009',
//           }),
//         ],
//       },
//     },
//     'sass-loader?sourceMap',
//   ],
// });

exports.config = {
  ...baseConfig,

  devtool: 'eval-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/

  entry: [
    // must be first entry to properly set public path
    './src/examples/webpack-public-path',
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(repoRoot, 'src/examples/index.js'), // Defining path seems necessary for this to work consistently on Windows machines.
  ],

  target: 'web',

  module: {
    rules: [
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>.25%',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.(ts|tsx)?$/,
        include: [
          path.resolve(repoRoot, 'src'),
          path.resolve(repoRoot, 'node_modules/@momentum-ui/icons/data'),
        ],
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.(js|jsx)?$/,
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
        loader:
          'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]',
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader:
          'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]',
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader:
          'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]',
      },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
    ],
  },

  output: {
    path: path.resolve(repoRoot, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/examples/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true, // set to false to see a list of every file being bundled.
    }),
    new MiniCssExtractPlugin('styles.css'),
  ],

  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      'react-native': 'react-native-web',
      '@momentum-ui/react': path.resolve(repoRoot, 'src', 'index.ts'),
      'react-dom': '@hot-loader/react-dom',
    },
  },
};
