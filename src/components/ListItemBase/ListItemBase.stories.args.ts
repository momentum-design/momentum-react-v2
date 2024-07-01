import { commonStyles, commonHTMLAttributes } from '../../storybook/helper.stories.argtypes';

import { LIST_ITEM_BASE_CONSTANTS as CONSTANTS } from '.';

export default {
  ...commonStyles,
  ...commonHTMLAttributes,
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
    description: 'Size of the list item base',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.SIZES)],
    table: {
      type: {
        summary: 'ListItemBaseSize',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SIZE,
      },
    },
  },
  shape: {
    defaultValue: CONSTANTS.DEFAULTS.SHAPE,
    description: 'The shape of the list item base container',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.SHAPES)],
    table: {
      type: {
        summary: "'rectangle' | 'isPilled'",
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
  isSelected: {
    defaultValue: false,
    description: 'Determines if the list item is selected.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: false,
      },
    },
  },
  isPadded: {
    defaultValue: false,
    description: 'Determines if the list item is padded (has default padding).',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: false,
      },
    },
  },
};
