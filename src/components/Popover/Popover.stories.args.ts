import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import { COLORS } from '../ModalContainer/ModalContainer.constants';

export default {
  ...commonStyles,
  trigger: {
    description: `Determines the events that cause the Popover to show. <br/><br/>
    Multiple event names should be separated by spaces. For example to allow both click and hover, use \`click mouseenter\` as the trigger.
    <br/><br/>Possible event names: \`click\`, \`mouseenter\`, \`focusin\`, \`manual\` (to programmatically trigger the popover)
    <br/>default: \`click\``,
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  placement: {
    description: `Placement of the Popover relative to the trigger component
    <br/><br/>default \`bottom\``,
    options: [...Object.values(PLACEMENTS as Record<string, string>)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
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
        summary: 'true',
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
        summary: 'small',
      },
    },
  },
  interactive: {
    description: `Determines if the Popover has interactive content inside of it,
    so that it can be hovered over and clicked inside without hiding.
    <br/><br/>default \`false\``,
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
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
        summary: 'undefined',
      },
    },
  },
};
