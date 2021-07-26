const path = require('path');
const { COMPONENTS_DIR, REPO_ROOT, SRC_DIR } = require('../constants');

module.exports = {
  stories: [path.join(REPO_ROOT, SRC_DIR, COMPONENTS_DIR, '**/*.stories.@(js|jsx|ts|tsx)')],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-scss'],
  typescript: {
    reactDocgen: 'none',
  },
  webpackFinal: (config) => {
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    config.resolve.alias['@momentum-ui/react'] = path.resolve(REPO_ROOT, SRC_DIR, 'index');

    return config;
  },
};
