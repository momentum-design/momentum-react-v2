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
};

export { ariaToolbarArgTypes };

export default {
  ...commonStyles,
  ...ariaToolbarArgTypes,
};
