import { commonStyles } from '../../storybook/helper.stories.argtypes';
import LinkArgTypes from '../Link/Link.stories.args';
import { DEFAULTS, COLORS, SIZES } from './ButtonCircleLink.constants';

const buttonCircleLinkArgTypes = {
  color: {
    description: 'Modifies the color of this component.',
    options: [undefined, ...Object.values(COLORS)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  disabled: {
    description: 'Whether to render the component is disabled.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.DISABLED,
      },
    },
  },
  shallowDisabled: {
    description:
      'Whether to render the component looking as if disabled, but allowing onPress actions to still be passed.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.SHALLOW_DISABLED,
      },
    },
  },
  ghost: {
    description: 'Whether this component has a transparent background.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.GHOST,
      },
    },
  },
  outline: {
    description: 'Whether this component has an outline/border.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.OUTLINE,
      },
    },
  },
  inverted: {
    description:
      'Whether this component has inverted background (black for dark mode and white for light mode)',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.INVERTED,
      },
    },
  },
  size: {
    description: 'Modifies the size of this component.',
    options: [undefined, ...Object.values(SIZES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: DEFAULTS.SIZE,
      },
    },
  },
};

export default {
  ...commonStyles,
  ...LinkArgTypes,
  ...buttonCircleLinkArgTypes,
};
