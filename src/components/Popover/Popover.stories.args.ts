import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import { COLORS } from '../ModalContainer/ModalContainer.constants';
import { DEFAULTS, BOUNDARIES } from './Popover.constants';

const popoverArgTypes = {
  trigger: {
    description: `Determines the events that cause the Popover to show.
    Multiple event names should be separated by spaces. For example to allow both click and hover, use \`click mouseenter\` as the trigger.
    Possible event names: \`click\`, \`mouseenter\`, \`focusin\`, \`manual\` (to programmatically trigger the popover, this disables the popover-close events on DOM focus change)`,
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: DEFAULTS.TRIGGER,
      },
    },
  },
  placement: {
    description: `Placement of the Popover relative to the trigger component`,
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
  showArrow: {
    description: `Whether the arrow should be shown`,
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.SHOW_ARROW,
      },
    },
  },
  variant: {
    description: `Variant of the Popover - can be either small or medium`,
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
  interactive: {
    description: `Determines if the Popover has interactive content inside of it,
    so that it can be hovered over and clicked inside without hiding.`,
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.INTERACTIVE,
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
    description: 'What color to render this `<Popover />` as.',
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
    description: 'The overflow boundary of the popover element.',
    control: { type: 'select' },
    options: [...Object.values(BOUNDARIES)],
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
