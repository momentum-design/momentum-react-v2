import {
  DEFAULTS,
  THEME_NAMES,
} from '../../../src/components/ThemeProvider/ThemeProvider.constants';

const globals = {
  theme: {
    name: 'Theme',
    description: "Select the component's theme",
    defaultValue: DEFAULTS.THEME,
    toolbar: {
      icon: 'paintbrush',
      items: [...Object.values(THEME_NAMES)],
      showName: true,
    },
  },
};

export default globals;
