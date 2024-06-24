import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { popoverArgTypes } from '../Popover/Popover.stories.args';

import { DEFAULTS } from './Tooltip.constants';

const tooltipArgTypes = {
  type: {
    description: `Determines, whether the tooltip is the description or the label of the trigger component, or none`,
    options: ['none', 'label', 'description'],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'description',
      },
    },
  },
  placement: {
    description: `Placement of the Tooltip relative to the trigger component`,
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
    description: `Variant of the Tooltip - can be either small or medium`,
    ...popoverArgTypes['variant'],
  },
  children: {
    description: 'Provides the child nodes for this element.',
    ...popoverArgTypes['children'],
  },
  color: {
    description: 'What color to render this `<Tooltip />` as.',
    ...popoverArgTypes['color'],
  },
  boundary: {
    description: 'The overflow boundary of the tooltip element.',
    ...popoverArgTypes['boundary'],
  },
};

export { tooltipArgTypes };

export default {
  ...commonStyles,
  ...tooltipArgTypes,
};
