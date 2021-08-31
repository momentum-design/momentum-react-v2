import {
  DEFAULTS,
  THEME_NAMES,
} from '../../../dist/cjs/components/ThemeProvider/ThemeProvider.constants';

const globals = {
  display: {
    name: 'Display',
    description: 'Select the display type for Stories',
    defaultValue: 'Block',
    toolbar: {
      icon: 'structure',
      items: ['Block', 'Flex'],
      showName: true,
    },
  },
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
