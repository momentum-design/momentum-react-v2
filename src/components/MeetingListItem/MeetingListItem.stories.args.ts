import { commonStyles } from '../../storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
  children: {
    description: 'Provides the child nodes for this element.', // Description of this prop.
    control: { type: 'none' }, // Control
    table: {
      type: {
        summary: 'ReactNode', // Explicit type of this prop.
      },
      defaultValue: {
        summary: 'undefined', // Default value when rendering this component.
      },
    },
  },
  isDisabled: {
    defaultValue: false,
    description: 'Determines if this item is disabled',
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
  buttonGroup: {
    defaultValue: undefined,
    description: 'Provides the nodes for the end of the item',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  color: {
    defaultValue: undefined,
    description: 'Provides the color status of this item',
    control: { type: 'select' },
    table: {
      type: {
        summary: "'join' | 'inactive' | 'activeNoJoin' | 'empty'",
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  startImage: {
    defaultValue: undefined,
    description: 'Provides the nodes for the start of the item',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
};
