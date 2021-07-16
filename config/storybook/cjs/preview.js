import globals from './globals';
import theme from './theme.decorator';
import styles from '../styles.decorator';

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
  styles,
  theme,
];
