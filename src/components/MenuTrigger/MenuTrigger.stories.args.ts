import { commonAriaOverlay, commonStyles } from '../../storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
  ...commonAriaOverlay,
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
        summary: 'false',
      },
    },
  },
};
