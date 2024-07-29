import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import { COLORS } from '../ModalContainer/ModalContainer.constants';
import { DEFAULTS, BOUNDARIES, CLOSE_BUTTON_PLACEMENTS } from './Popover.constants';

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
  closeButtonPlacement: {
    description: `Placement of the close button relative to the container of the popover`,
    options: [...Object.values(CLOSE_BUTTON_PLACEMENTS)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: DEFAULTS.CLOSE_BUTTON_PLACEMENT,
      },
    },
  },
  focusBackOnTrigger: {
    description: `Determines whether the focus should return to the trigger element when the popover is closed`,
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.FOCUS_BACK_ON_TRIGGER_COMPONENT_NON_INTERACTIVE,
      },
    },
  },
  zIndex: {
    description: `The z-index of the tippy popover. If not supplied, tippy will default to 9999`,
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  'aria-labelledby': {
    description:
      'aria-labelledby for an interactive popover only, defaults to the trigger component id',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  'aria-label': {
    description:
      'The aria-label for interactive popover. If not supplied, Popover will be labelled by the triggerComponent',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

export { popoverArgTypes };

export default {
  ...commonStyles,
  ...popoverArgTypes,
};
