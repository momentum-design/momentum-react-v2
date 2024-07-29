import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { popoverArgTypes } from '../Popover/Popover.stories.args';
import { MENU_TRIGGER_PLACEMENTS } from './MenuTrigger.constants';

export default {
  ...commonStyles,
  children: {
    description:
      'First Child is the Target (button). All following children must be Menu components. ',
    table: {
      type: {
        summary: 'ReactElement[]',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  closeOnSelect: {
    description: 'Whether the Menu closes when a selection is made.',
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
  isOpen: {
    description:
      'This props should be provided if the overlay state is being controlled outside of this component.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onOpenChange: {
    description: "Handler that is called when the popover's open state changes.",
    table: {
      type: {
        summary: '(isOpen: boolean) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  placement: {
    ...popoverArgTypes.placement,
    options: [...Object.values(MENU_TRIGGER_PLACEMENTS as Record<string, string>)],
  },
  color: popoverArgTypes.color,
  variant: popoverArgTypes.variant,
  showArrow: popoverArgTypes.showArrow,
  zIndex: popoverArgTypes.zIndex,
};
