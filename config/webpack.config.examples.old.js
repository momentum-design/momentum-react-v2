const { DefinePlugin, HotModuleReplacementPlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const { NODE_ENV } = process.env;

module.exports = {
  devServer: {
    contentBase: './docs/examples',
  },
  entry: './src/examples/index.jsx',
  mode: NODE_ENV || 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
      },
      {
        exclude: /node_modules/,
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: NODE_ENV === 'production' ? '[hash:base64]' : '[path][name]__[local]',
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?name=[name].[ext]',
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
    ],
  },
  resolve: {
    extensions: ['.css', '.js', '.jsx'],
    alias: {
      '@momentum-ui/react': './src',
    },
  },
  output: {
    path: path.resolve(__dirname, './docs/examples'),
    filename: 'examples.bundle.js',
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: (NODE_ENV === 'development'),
    }),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/examples/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
    new MiniCssExtractPlugin(),
  ],
};