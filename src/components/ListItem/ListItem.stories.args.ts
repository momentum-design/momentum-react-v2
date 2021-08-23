import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { LIST_ITEM_CONSTANTS as CONSTANTS } from '.';

export default {
  ...commonStyles,
  isDisabled: {
    defaultValue: CONSTANTS.DEFAULTS.IS_DISABLED,
    description: 'Determines if this item is disabled',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.IS_DISABLED,
      },
    },
  },
  size: {
    defaultValue: CONSTANTS.DEFAULTS.SIZE,
    description: 'Size of the list item',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.SIZES)],
    table: {
      type: {
        summary: 'ListItemSize',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SIZE,
      },
    },
  },
  shape: {
    defaultValue: CONSTANTS.DEFAULTS.SHAPE,
    description: 'The shape of the list item container',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.SHAPES)],
    table: {
      type: {
        summary: "'rectangle' | 'rounded'",
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SHAPE,
      },
    },
  },
  role: {
    defaultValue: CONSTANTS.DEFAULTS.ROLE,
    description: 'Aria role',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.ROLE,
      },
    },
  },
};
