import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { FLEX_CONSTANTS as CONSTANTS } from '.';

export default {
  ...commonStyles,
  justifyContent: {
    defaultValue: CONSTANTS.DEFAULTS.JUSTIFY_CONTENT,
    description: 'The distribution of space around items along the main axis.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.JUSTIFY_CONTENT)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.JUSTIFY_CONTENT,
      },
    },
  },
  alignContent: {
    defaultValue: CONSTANTS.DEFAULTS.ALIGN_CONTENT,
    description: 'The distribution of space around child items along the cross axis.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.ALIGN_CONTENT)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.ALIGN_CONTENT,
      },
    },
  },
  alignItems: {
    defaultValue: CONSTANTS.DEFAULTS.ALIGN_ITEMS,
    description: 'The alignment of children within their container.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.ALIGN_ITEMS)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.ALIGN_ITEMS,
      },
    },
  },
  direction: {
    defaultValue: CONSTANTS.DEFAULTS.DIRECTION,
    description: 'The direction in which to layout children.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.DIRECTION)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.DIRECTION,
      },
    },
  },
  wrap: {
    defaultValue: CONSTANTS.DEFAULTS.WRAP,
    description: ' Whether to wrap items onto multiple lines.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.WRAP)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.WRAP,
      },
    },
  },
  xgap: {
    defaultValue: undefined,
    description: 'If present, it will add a margin-left to all elements except first child.',
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
  ygap: {
    defaultValue: undefined,
    description: 'If present, it will add a margin-top to all elements except first child.',
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
};
