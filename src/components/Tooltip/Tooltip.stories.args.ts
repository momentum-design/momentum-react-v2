import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import { COLORS } from '../ModalContainer/ModalContainer.constants';
import { DEFAULTS } from './Tooltip.constants';
import { BOUNDARIES } from '../Popover/Popover.constants';

const popoverArgTypes = {
  isDescription: {
    description: `Whether the tooltips be a description or a label of the trigger component`,
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.IS_DESCRIPTION,
      },
    },
  },
  placement: {
    description: `Placement of the Tooltip relative to the trigger component`,
    options: [...Object.values(PLACEMENTS as Record<string, string>)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: DEFAULTS.PLACEMENT,
      },
    },
  },
  offsetSkidding: {
    description: `The offset skidding (in px) along the reference.`,
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: DEFAULTS.OFFSET_SKIDDING,
      },
    },
  },
  offsetDistance: {
    description: `The offset distance (in px) from the reference.`,
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: DEFAULTS.OFFSET_DISTANCE,
      },
    },
  },
  variant: {
    description: `Variant of the Tooltip - can be either small or medium`,
    options: ['small', 'medium'],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: DEFAULTS.VARIANT,
      },
    },
  },
  children: {
    description: 'Provides the child nodes for this element.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'ReactNode',
      },
    },
  },
  color: {
    description: 'What color to render this `<Tooltip />` as.',
    control: { type: 'select' },
    options: [...Object.values(COLORS)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: DEFAULTS.COLOR,
      },
    },
  },
  boundary: {
    description: 'The overflow boundary of the tooltip element.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(BOUNDARIES)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: DEFAULTS.BOUNDARY,
      },
    },
  },
};

export { popoverArgTypes };

export default {
  ...commonStyles,
  ...popoverArgTypes,
};
