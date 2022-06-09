import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { BUTTON_GROUP_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonStyles,
  children: {
    defaultValue: undefined,
    description: 'Provides the SupportedButton child nodes for this component.',
    control: {
      type: 'none',
    },
    table: {
      type: {
        summary: 'ReactElement<SupportedComponents> | Array<ReactElement<SupportedComponents>>',
      },
      defaultValue: {
        summary: 'undefined',
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
  compressed: {
    defaultValue: CONSTANTS.DEFAULTS.COMPRESSED,
    description: 'Whether to compress horizontal space and remove inner borders around ChildNodes.',
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
  round: {
    defaultValue: CONSTANTS.DEFAULTS.ROUND,
    description: 'Whether this `<ButtonGroup />` is rounded.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.ROUND,
      },
    },
  },
};
