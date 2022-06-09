import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { CHIP_CONSTANTS } from '.';

const chipArgTypes = {
  children: {
    description: 'Text of the chip. Overwritten by text prop',
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
  leftIcon: {
    description: 'The icon displayed on the left if it exists, overwritten by avatar',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'SupportedIcon',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  rightIcon: {
    description: 'The icon displayed on the right if it exists',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'SupportedIcon',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  avatar: {
    description: 'Avatar supplied by consumer, overrides leftIcon',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'SupportedAvatar',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  outline: {
    description: 'Sets the chip to have outline styling',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CHIP_CONSTANTS.DEFAULTS.OUTLINE,
      },
    },
  },
  disabled: {
    description: 'Sets whether the chip is disabled',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CHIP_CONSTANTS.DEFAULTS.DISABLED,
      },
    },
  },
  error: {
    description: 'Sets whether the chip is in error state',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CHIP_CONSTANTS.DEFAULTS.ERROR,
      },
    },
  },
};

export { chipArgTypes };

export default {
  ...commonStyles,
  ...chipArgTypes,
};
