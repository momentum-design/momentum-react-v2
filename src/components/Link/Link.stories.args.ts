import {
  commonAriaLink,
  commonHTMLAttributes,
  commonStyles,
} from '../../storybook/helper.stories.argtypes';

import { Link_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonStyles,
  ...commonHTMLAttributes,
  ...commonAriaLink,
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
  disabled: {
    description: 'Whether to render the `<Link />` as disabled.',
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
    description: 'Whether to render the `<Link />` with inverted theme colors',
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
  hasIcon: {
    description: 'whether this component has icon `name = pop-out` in the right',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: false,
      },
    },
  },
  iconProps: {
    description: 'icon props',
    table: {
      type: {
        summary: 'IconNextProps',
      },
    },
  },
  tooltipContent: {
    description: 'Used for tooltip content',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  type: {
    description: `Determines, whether the tooltip is the description or the label of the trigger component, or none`,
    options: ['none', 'label', 'description'],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'description',
      },
    },
  },
};
