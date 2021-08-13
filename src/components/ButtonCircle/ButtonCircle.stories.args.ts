import { commonAriaButton, commonStyles } from '../../storybook/helper.stories.argtypes';

import { BUTTON_CIRCLE_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonStyles,
  ...commonAriaButton,
  /**
   * Below is an example. See [Storybook argTypes documentation]{@link https://storybook.js.org/docs/react/api/argtypes}.
   */
  children: {
    defaultValue: 'A', // This should be the provided value for the story.
    description: 'Provides the child nodes for this element.', // Description of this prop.
    control: { type: 'text' }, // Control
    table: {
      type: {
        summary: 'ReactNode', // Explicit type of this prop.
      },
      defaultValue: {
        summary: 'undefined', // Default value when rendering this component.
      },
    },
  },
  color: {
    defaultValue: undefined,
    description:
      'Modifies the color of this `<ButtonCircle />`. Some colors do not include an outline variant.',
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
    defaultValue: CONSTANTS.DEFAULTS.DISABLED,
    description: 'Whether to render the `<ButtonCircle />` is disabled.',
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
  ghost: {
    defaultValue: CONSTANTS.DEFAULTS.GHOST,
    description:
      'Whether this `<ButtonCircle />` is a ghost. This overrides the `color` and `outline` props.',
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
    defaultValue: CONSTANTS.DEFAULTS.OUTLINE,
    description: 'Whether to render the outline variant of this `<ButtonCircle />`.',
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
  size: {
    defaultValue: CONSTANTS.DEFAULTS.SIZE,
    description: 'Modifies the size of this `<ButtonCircle />`.',
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
