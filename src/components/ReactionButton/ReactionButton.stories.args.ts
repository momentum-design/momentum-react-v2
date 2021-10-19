import { commonStyles, extendArgTypes } from '../../storybook/helper.stories.argtypes';

import { buttonCircleArgTypes } from '../ButtonCircle/ButtonCircle.stories.args';
import { REACTION_BUTTON_CONSTANTS as CONSTANTS } from '.';

const reactionButtonArgTypes = {
  ...commonStyles,
  children: {
    description: 'Provides the child `<Reaction/>`s for this `<ReactionButton/>`.',
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

export { reactionButtonArgTypes };

export default {
  ...commonStyles,
  ...reactionButtonArgTypes,
  ...extendArgTypes('ButtonCircle', buttonCircleArgTypes, ['children', 'reacted', 'size']),
};
