import { commonAriaButton, commonStyles } from '../../storybook/helper.stories.argtypes';

import { REACTION_BADGE_CONSTANTS as CONSTANTS } from './';

delete commonAriaButton.onPress;
delete commonAriaButton.onPressStart;
delete commonAriaButton.onPressEnd;
delete commonAriaButton.onPressChange;
delete commonAriaButton.onPressUp;
delete commonAriaButton.onFocusChange;

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
  onClick: {
    action: 'onClick',
    description: 'Handler that is called when the button is clicked',
    table: {
      type: {
        summary: '(e: MouseEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};
