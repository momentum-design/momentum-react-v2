module.exports = {
  stories: [
    '../../../dist/cjs/**/*.stories.mdx',
    '../../../dist/cjs/**/*.stories.@(js|jsx|ts|tsx)'
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
    config.resolve.alias['@momentum-ui/react'] = '../../../dist/cjs/index';

    return config;
  },
};
