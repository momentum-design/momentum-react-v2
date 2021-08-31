import { commonStyles } from '../../storybook/helper.stories.argtypes';

<<<<<<< HEAD
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
export default {
  ...commonStyles,
  /**
   * Below is an example. See [Storybook argTypes documentation]{@link https://storybook.js.org/docs/react/api/argtypes}.
   */
  children: {
    description: 'Provides the child nodes for this element.', // Description of this prop.
    control: { type: 'text' }, // Control
    table: {
      type: {
        summary: 'ReactNode', // Explicit type of this prop.
      },
      defaultValue: {
        summary: 'undefined', // Default value when rendering this component.
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)
      },
    },
  },
};
