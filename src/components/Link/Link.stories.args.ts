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
  hasExternalLinkIcon: {
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
  externalLinkIconProps: {
    description: `IconProps (scale and autoscale only) for the 'pop-out' icon which is shown on the right side of the link.`,
    control: { type: 'object' },
    table: {
      type: {
        summary: 'object',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  tooltipContent: {
    description:
      'Used for tooltip content that gets triggered when the link is hovered; e.g Opens a new tab',
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
  tooltipType: {
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
  tabIndex: {
    description: 'tabIndex for `<a>` tag',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
};
