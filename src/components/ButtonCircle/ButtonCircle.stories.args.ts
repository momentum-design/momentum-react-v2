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
    description:
      'Modifies the color of this component. Some colors do not include an outline variant.',
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
      'Whether to render the COMPONENT looking as if disabled, but allowing onPress actions to still be passed.',
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
    description:
      'Whether this component is a ghost. This overrides the `color` and `outline` props.',
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
    description: 'Whether to render the outline variant of this component.',
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
  solid: {
    description:
      'Whether to use the solid background variant of this `<ButtonCircle />`. Does not support `color` or `ghost`',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SOLID,
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
};

export { buttonCircleArgTypes };

export default {
  ...commonStyles,
  ...commonAriaButton,
  ...commonHTMLAttributes,
  ...buttonCircleArgTypes,
};
