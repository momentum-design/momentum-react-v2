import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { DEFAULTS } from './Reaction.constants';

export default {
  ...commonStyles,
  hideLoadingSpinner: {
    description: 'Boolean to show loading spinner or not',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.HIDE_LOADING_SPINNER,
      },
    },
  },
  autoPlay: {
    description: 'Boolean to autoplay the reaction emoji or not',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: true,
      },
    },
  },
  loop: {
    description: 'Number of times to play the animation.',
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
  name: {
    description: 'Name of the emoji animation.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: '',
      },
    },
  },
};
