import { commonStyles } from 'storybook/helper.stories.argtypes';

import * as CONSTANTS from './ListHeader.constants';
const listHeaderArgTypes = {
  children: {
    description: 'Provides the child nodes for this element.',
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
  outline: {
    description: 'Determines wether the header has an outline. (Can be bottom or top)',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  outlinePosition: {
    description: 'Position of the outline.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.OUTLINE_POSITION)],
    table: {
      type: {
        summary: 'top | bottom',
      },
      defaultValue: {
        summary: 'bottom',
      },
    },
  },
  outlineColor: {
    description: 'Color of the outline.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.OUTLINE_COLOR)],
    table: {
      type: {
        summary: 'primary | secondary',
      },
      defaultValue: {
        summary: 'primary',
      },
    },
  },
  bold: {
    description: 'Determines wether the header has bold text.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
};

export { listHeaderArgTypes };

export default {
  ...commonStyles,
  ...listHeaderArgTypes,
};
