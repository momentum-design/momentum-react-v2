import { commonStyles } from '../../storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
  children: {
    description: 'Provides the child `<ReactionButton/>`s for this `<ReactionPicker/>`.',
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
