import { commonAriaButton, commonStyles } from '../../storybook/helper.stories.argtypes';

import { REACTION_BADGE_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonAriaButton,
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
  reacted: {
    description: 'Whether to render the `<ReactionBadge />` as reacted.',
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
};
