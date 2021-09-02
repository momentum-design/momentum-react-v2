import { commonStyles } from '../../storybook/helper.stories.argtypes';


import { REACTION_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonStyles,
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
  size: {
    description: 'Modifies the size of this `<Reaction />`.',
    options: [undefined, ...Object.values(CONSTANTS.SIZES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SIZE,
=======
=======
import { REACTION_CONSTANTS as CONSTANTS } from './';

>>>>>>> 2cca8b86f (feat(reactions): more test updates)
export default {
  ...commonStyles,
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
  size: {
    description: 'Modifies the size of this `<Reaction />`.',
    options: [undefined, ...Object.values(CONSTANTS.SIZES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SIZE,
      },
    },
  },
};
