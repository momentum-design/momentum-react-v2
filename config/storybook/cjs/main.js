module.exports = {
  "stories": [
    "../../../dist/cjs/**/*.stories.mdx",
    "../../../dist/cjs/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  typescript: {
    reactDocgen: 'none',
  },
};
