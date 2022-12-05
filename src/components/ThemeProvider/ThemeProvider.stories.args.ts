import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { THEME_PROVIDER_CONSTANTS as CONSTANTS } from './';

const themeProviderArgTypes = {
  theme: {
    description:
      'The name of the target theme to apply to all child nodes of this `<ThemeProvider />`.',
    options: [...Object.values(CONSTANTS.THEMES)],
    control: { type: 'select' },
    table: {
      type: {
        sumary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.THEME,
      },
    },
  },
  children: {
    description:
      'Provides the child nodes for this element. The child nodes of this element are themed by the assigned theme.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

export { themeProviderArgTypes };

export default {
  ...commonStyles,
  ...themeProviderArgTypes,
};
