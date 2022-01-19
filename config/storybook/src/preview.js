import globals from './globals';
import theme from './theme.decorator';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
};

export const globalTypes = { ...globals };

export const decorators = [theme];
