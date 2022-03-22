import { commonStyles } from 'storybook/helper.stories.argtypes';

import { OVERLAY_CONSTANTS as CONSTANTS } from '.';

const overlayArgTypes = {
  children: {
    description: 'Provides the child nodes for this element.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  color: {
    description: 'Provides the color for this element.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.COLORS)],
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.COLOR,
      },
    },
  },
  fullscreen: {
    description: 'Whether this element is displayed across the view port.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.FULLSCREEN,
      },
    },
  },
};

export { overlayArgTypes };

export default {
  ...commonStyles,
  ...overlayArgTypes,
};
