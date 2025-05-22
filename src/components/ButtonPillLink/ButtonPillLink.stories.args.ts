import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { DEFAULTS } from './ButtonPillLink.constants';
import { BUTTON_PILL_CONSTANTS as CONSTANTS } from '../ButtonPill';
import LinkArgTypes from '../Link/Link.stories.args';

const buttonPillLinkArgTypes = {
  color: {
    description: 'Modifies the color of this `<ButtonPillLink />`.',
    options: [undefined, ...Object.values(CONSTANTS.COLORS)],
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
    description: 'Whether to render the `<ButtonPillLink />` as disabled.',
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
      'Whether to render the `<ButtonPillLink />` looking as if disabled, but allowing onPress actions to still be passed.',
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
  grown: {
    description: 'If this component should grow its width to the parent container.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.GROWN,
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
    description: 'Modifies the size of this `<ButtonPillLink />`.',
    options: [undefined, ...Object.values(CONSTANTS.SIZES)],
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
  ...buttonPillLinkArgTypes,
};
