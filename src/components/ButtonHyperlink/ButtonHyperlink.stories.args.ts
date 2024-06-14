import {
  commonAriaButton,
  commonHTMLAttributes,
  commonStyles,
} from '../../storybook/helper.stories.argtypes';

import { BUTTON_HYPERLINK_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonStyles,
  ...commonHTMLAttributes,
  ...commonAriaButton,
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
  role: {
    description: 'Provides `link` or `button` role for this element.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'button',
      },
    },
  },
  disabled: {
    description: 'Whether to render the `<ButtonHyperlink />` as disabled.',
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
  inverted: {
    description: 'Whether to render the `<ButtonHyperlink />` with inverted theme colors',
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
};
