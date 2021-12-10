const path = require('path');
const { COMPONENTS_DIR, LEGACY_COMPONENTS_DIR } = require('./constants');

const REPO_ROOT = path.resolve(__dirname, '../../');

const generateMain = (dir) => {
  return {
    stories: [
      path.join(REPO_ROOT, dir, COMPONENTS_DIR, '**/*.stories.@(js|jsx|ts|tsx)'),
      path.join(REPO_ROOT, dir, LEGACY_COMPONENTS_DIR, '**/*.stories.@(js|jsx|ts|tsx)'),
    ],
    addons: [
      '@storybook/addon-docs',
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/preset-scss',
      '@storybook/addon-ie11',
    ],
    typescript: {
      reactDocgen: 'none',
    },
    webpackFinal: (config) => {
      config.resolve.alias['@momentum-ui/react-collaboration'] = path.resolve(
        REPO_ROOT,
        dir,
        'index'
      );
      config.resolve.alias['@momentum-ui/core/images'] = path.resolve(REPO_ROOT, 'images');
      config.resolve.alias['legacystyles'] = path.resolve(REPO_ROOT, 'scss');

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

      // Find the rule that already handles node_modules dependencies
      const nodeModulesRule = config.module.rules.find(({ include }) =>
        include && include.test ? include.test('/node_modules/semver/something.js') : false
      );

      // Previous include was a single regex. Change to an array that also includes our new dependencies
      // Adding these will mean they go through babel and therefore work with IE
      nodeModulesRule.include = [
        nodeModulesRule.include,
        /[\\/]node_modules[\\/](@react-aria|react-verification-input)/,
      ];
      return config;
    },
  };
};

module.exports = generateMain;
