const path = require('path');
const { COMPONENTS_DIR, REPO_ROOT, SRC_DIR } = require('../constants');

module.exports = {
  stories: [
    path.join(REPO_ROOT, SRC_DIR, COMPONENTS_DIR, '**/*.stories.@(js|jsx|ts|tsx)'),
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
    config.resolve.alias['@momentum-ui/react'] = path.resolve(
      REPO_ROOT,
      SRC_DIR,
      'index'
    );

    // Add SVGR Loader
    // ========================================================
    const assetRule = config.module.rules.find(({ test }) => test.test('.svg'));

    const assetLoader = {
      loader: assetRule.loader,
      options: assetRule.options || assetRule.query,
    };

    // Merge our rule with existing assetLoader rules
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ['@svgr/webpack', assetLoader],
    });

    return config;
  },
};
