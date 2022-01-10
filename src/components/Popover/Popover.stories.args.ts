import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { COLORS, PLACEMENTS } from './Popover.constants';

export default {
  ...commonStyles,
  children: {
    description: 'Provides the child nodes for this element.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'ReactNode',
      },
    },
  },
  placement: {
    description: 'Placement of the popover relative to the trigger component',
    options: [...Object.values(PLACEMENTS as Record<string, string>)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
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
