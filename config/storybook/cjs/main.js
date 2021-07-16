const path = require('path');
const { REPO_ROOT, CJS_DIR } = require('../constants');

module.exports = {
  stories: [
    path.join(REPO_ROOT, CJS_DIR, '**/*.stories.mdx'),
    path.join(REPO_ROOT, CJS_DIR, '**/*.stories.@(js|jsx|ts|tsx)'),
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
    config.resolve.alias['@momentum-ui/react'] = path.resolve(REPO_ROOT, CJS_DIR, 'index');

    return config;
  },
};
