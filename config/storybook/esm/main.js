const path = require('path');
const { COMPONENTS_DIR, REPO_ROOT, ESM_DIR } = require('../constants');

module.exports = {
  stories: [
    path.join(REPO_ROOT, ESM_DIR, COMPONENTS_DIR, '**/*.stories.@(js|jsx|ts|tsx)'),
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
  ],
  typescript: {
    reactDocgen: 'none',
  },
  webpackFinal: (config) => {
    config.resolve.alias['@momentum-ui/react'] = path.resolve(REPO_ROOT, ESM_DIR, 'index');

    return config;
  },
};
