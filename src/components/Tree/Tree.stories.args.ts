import { commonStyles } from '../../storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
  shouldFocusOnPress: {
    description: 'Determines if the onPress handler should also focus the selected item',
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
  shouldItemFocusBeInset: {
    description:
      'Determines whether the focus around list-items should be inset or outset. This is needed for virtualized lists',
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
