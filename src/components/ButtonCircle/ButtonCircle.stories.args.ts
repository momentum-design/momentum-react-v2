import {
  commonAriaButton,
  commonHTMLAttributes,
  commonStyles,
} from '../../storybook/helper.stories.argtypes';

import { BUTTON_CIRCLE_CONSTANTS as CONSTANTS } from './';

const buttonCircleArgTypes = {
  /**
   * Below is an example. See [Storybook argTypes documentation]{@link https://storybook.js.org/docs/react/api/argtypes}.
   */
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
  color: {
    description: 'Modifies the color of this component.',
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
    description: 'Whether to render the component is disabled.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.DISABLED,
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
        summary: CONSTANTS.DEFAULTS.SHALLOW_DISABLED,
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
        summary: CONSTANTS.DEFAULTS.GHOST,
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
        summary: CONSTANTS.DEFAULTS.OUTLINE,
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
        summary: CONSTANTS.DEFAULTS.INVERTED,
      },
    },
  },
  size: {
    description: 'Modifies the size of this component.',
    options: [undefined, ...Object.values(CONSTANTS.SIZES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SIZE,
      },
    },
  },
  hasAction: {
    description:
      'Whether or not this ButtonCircle has an action or not, like when it only triggers a Tooltip.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.HAS_ACTION,
      },
    },
  },
};

export { buttonCircleArgTypes };

export default {
  ...commonStyles,
  ...commonAriaButton,
  ...commonHTMLAttributes,
  ...buttonCircleArgTypes,
};
