import { DEFAULTS, THEME_NAMES } from '../../../dist/esm/components/ThemeProvider/ThemeProvider.constants'; // eslint-disable-line import/named

const globals = {
  theme: {
    name: 'Theme',
    description: 'Select the component\'s theme',
    defaultValue: DEFAULTS.THEME,
    toolbar: {
      icon: 'paintbrush',
      items: [...Object.values(THEME_NAMES)],
      showName: true,
    },
  },
};

export default globals;
