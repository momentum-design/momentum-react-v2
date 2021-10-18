import { commonStyles } from '../../storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
  children: {
    // description: '`<Reaction/>` for this `<ReactionButton/>`',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'Reaction',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};
