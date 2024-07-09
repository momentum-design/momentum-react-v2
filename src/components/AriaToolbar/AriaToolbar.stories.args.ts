import { commonStyles } from '../../storybook/helper.stories.argtypes';

const ariaToolbarArgTypes = {
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
  ariaLabel: {
    description: 'The aria-label for the toolbar',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'aria toolbar',
      },
    },
  },
  ariaToolbarItemsSize: {
    description: 'The number of items in the toolbar',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  shouldRenderAsButtonGroup: {
    description: 'Determines if the toolbar should render as a button group',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  buttonGroupProps: {
    description: 'Props to pass to the ButtonGroup component',
    control: { type: 'object' },
    table: {
      type: {
        summary: 'ButtonGroupProps',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  orientation: {
    description: 'The orientation of the toolbar',
    options: ['horizontal', 'vertical'],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'horizontal',
      },
    },
  },
};

export { ariaToolbarArgTypes };

export default {
  ...commonStyles,
  ...ariaToolbarArgTypes,
};
