import globals from './globals';
import theme from './theme.decorator';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewMode: 'docs',
};

export const globalTypes = { ...globals };

export const decorators = [
  theme,
];
