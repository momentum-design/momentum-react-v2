import { commonAriaButton, commonStyles } from '../../storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
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
};
