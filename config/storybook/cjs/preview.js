import globals from './globals';
import theme from './theme.decorator';
import fonts from '../fonts.decorator';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = { ...globals };

export const decorators = [
  fonts,
  theme,
];
