import { commonAriaButton, commonStyles } from '../../storybook/helper.stories.argtypes';

import { REACTION_BADGE_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonAriaButton,
  ...commonStyles,
  count: {
    description: 'Number of reactions.',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: 1,
      },
    },
  },
  reacted: {
    description: 'Whether to render the `<ReactionBadge />` as reacted.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.REACTED,
      },
    },
  },
  reaction: {
    description: '`<Reaction />` for this `<ReactionBadge />`.',

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
