module.exports = {
  stories: [
    '../../../dist/esm/**/*.stories.mdx',
    '../../../dist/esm/**/*.stories.@(js|jsx|ts|tsx)'
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
    config.resolve.alias['@momentum-ui/react'] = '../../../dist/esm/index';

    return config;
  },
};
