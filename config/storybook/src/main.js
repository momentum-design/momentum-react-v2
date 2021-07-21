module.exports = {
  stories: [
    '../../../src/**/*.stories.mdx',
    '../../../src/**/*.stories.@(js|jsx|ts|tsx)'
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
    config.resolve.alias['@momentum-ui/react'] = '../../../src/index';
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    })

    return config;
  },
};
