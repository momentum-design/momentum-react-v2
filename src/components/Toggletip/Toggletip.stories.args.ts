import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { popoverArgTypes } from '../Popover/Popover.stories.args';

const toggletipArgTypes = {
  placement: {
    description: `Placement of the Toggletip relative to the trigger component`,
    ...popoverArgTypes['placement'],
  },
  offsetSkidding: {
    description: `The offset skidding (in px) along the reference.`,
    ...popoverArgTypes['offsetSkidding'],
  },
  offsetDistance: {
    description: `The offset distance (in px) from the reference.`,
    ...popoverArgTypes['offsetDistance'],
  },
  variant: {
    description: `Variant of the Toggletip - can be either small or medium`,
    ...popoverArgTypes['variant'],
  },
  children: {
    description: 'Provides the child nodes for this element.',
    ...popoverArgTypes['children'],
  },
  color: {
    description: 'What color to render this `<Toggletip />` as.',
    ...popoverArgTypes['color'],
  },
  boundary: {
    description: 'The overflow boundary of the toggletip element.',
    ...popoverArgTypes['boundary'],
  },
};

export { toggletipArgTypes };

export default {
  ...commonStyles,
  ...toggletipArgTypes,
};
