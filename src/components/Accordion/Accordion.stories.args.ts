import { commonStyles } from '../../storybook/helper.stories.argtypes';

const accordionArgTypes = {
  children: {
    description: 'Content of the accordion panel',
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
  heading: {
    description: 'Content of the heading button',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'ReactNode',
      },
    },
  },
  headingRightContent: {
    description: 'Content on the right of the heading button',
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
  defaultExpanded: {
    description: 'Whether if the accordion should be expanded by default',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'true',
      },
    },
  },
};

export { accordionArgTypes };

export default {
  ...commonStyles,
  ...accordionArgTypes,
};
