import { commonStyles } from '../../storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
  shouldNodeFocusBeInset: {
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
  excludeTreeRoot: {
    description: 'Determines if the tree root should be excluded from the tree navigation.',
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
};
