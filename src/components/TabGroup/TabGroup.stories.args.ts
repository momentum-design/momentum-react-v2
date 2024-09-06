import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { TAB_GROUP_CONSTANTS as CONSTANTS } from './';

const tabGroupArgTypes = {
  ...commonStyles,
  ariaLabel: {
    description: 'The aria-label for tab group',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },

  ariaLabelledby: {
    description: 'The aria-labelledby for tab group',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },

  children: {
    defaultValue: undefined,
    description:
      'Provides the Tab nodes for this element.',
    control: {
      type: 'none',
    },
    table: {
      type: {
        summary:'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },

  orientation: {
    defaultValue: CONSTANTS.DEFAULTS.ORIENTATION,
    description: 'Orientation of the TabGroup. Defaults to horizontal',
    control: { type: 'select' },
    options: ['horizontal', 'vertical'],
    table: {
      type: {
        summary: 'horizontal | vertical',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.ORIENTATION,
      },
    },
  },

  spaced: {
    defaultValue: CONSTANTS.DEFAULTS.SPACED,
    description: 'Whether to apply spacing around ChildNodes.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SPACED,
      },
    },
  },
};

export { tabGroupArgTypes };

export default {
  ...commonStyles,
  ...tabGroupArgTypes,
};
