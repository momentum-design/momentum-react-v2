import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { CHIP_CONSTANTS } from '.';
import { TEAM_COLORS } from '../ThemeProvider/ThemeProvider.constants';

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
  chipColor: {
    description: 'Sets the chip color',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CHIP_CONSTANTS.MULTILINE_COLORS)],
    table: {
      type: {
        summary: 'TeamColor',
      },
      defaultValue: {
        summary: CHIP_CONSTANTS.DEFAULTS.COLOR,
      },
    },
  },
  multiline: {
    description: 'Sets whether the chip is using the multiline modifier',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CHIP_CONSTANTS.DEFAULTS.MULTILINE,
      },
    },
  },
  search: {
    description: 'Sets whether the chip is using the search modifier',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CHIP_CONSTANTS.DEFAULTS.SEARCH,
      },
    },
  },
  size: {
    description:
      'Sets the chip size. `28` is default, `28` and `24` are expected to be used for the `search` modifier, `16` is expected used for the `multiline` modifier.',
    control: { type: 'select' },
    options: [undefined, 16, 24, 28],
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: CHIP_CONSTANTS.DEFAULTS.SIZE,
      },
    },
  },
};

export { chipArgTypes };

export default {
  ...commonStyles,
  ...chipArgTypes,
};
