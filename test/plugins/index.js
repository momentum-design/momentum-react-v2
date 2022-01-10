const webpack = require('@cypress/webpack-preprocessor');
const babelConfig = require('../../.babelrc');
const path = require('path');
const {
  addVisualRegressionTrackerPlugin,
} = require('@visual-regression-tracker/agent-cypress/dist/plugin');
const { config } = require('process');

const codePath = path.resolve(__dirname, '..');
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  addVisualRegressionTrackerPlugin(on, config);
  on(
    'file:preprocessor',
    webpack({
      webpackOptions: {
        resolve: {
          extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
        },
        target: 'web',
        node: { fs: 'empty' },
        module: {
          rules: [
            {
              test: /\.(js|jsx|ts|tsx)?$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: 'babel-loader',
                  options: babelConfig,
                },
              ],
            },
          ],
        },
      },
    })
  );
  return config;
};
