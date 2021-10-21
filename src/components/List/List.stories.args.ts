import { commonStyles } from '../../storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
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
  listSize: {
    description: 'Size of the list',
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
  shouldFocusOnPres: {
    description: 'Determines if the onPress handler should also focus the selected item',
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
};
