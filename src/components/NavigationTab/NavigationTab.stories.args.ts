import { commonAriaButton, commonStyles } from 'storybook/helper.stories.argtypes';

import { NAVIGATION_TAB_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonAriaButton,
  ...commonStyles,
  size: {
    description: 'Size of this component.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.SIZES)],
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SIZE,
      },
    },
  },
  label: {
    description: 'The label of this component.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  icon: {
    description: 'The name of the icon to place on this component.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  count: {
    description: 'The count to place in the badge of this component.',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.COUNT,
      },
    },
  },
  active: {
    description: 'True if the tab is active.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.ACTIVE,
      },
    },
  },
};
