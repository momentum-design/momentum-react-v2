import { commonStyles } from '../../storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
  onScroll: {
    description: 'Provides scrolling callback when user scrolls',
    control: { type: 'function' },
    table: {
      category: 'Scroll Listener',
      type: {
        summary: '(e: ScrollEvent) => void',
      },
      defaultValue: {
        summary: '(e) => {}',
      },
    },
  },
  estimateSize: {
    description: 'Provides the estimated size of all elements being virtualized',
    control: { type: 'function' },
    table: {
      category: 'Size default',
      type: {
        summary: '() => number',
      },
      defaultValue: {
        summary: '() => 0',
      },
    },
  },
  count: {
    description: 'count of total objects in the list',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: '0',
      },
    },
  },
};
