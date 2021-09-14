import { commonStyles } from '../../storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
  placeholder: {
    description: 'The input placeholder',
    table: {
      category: 'Props',
    },
  },
  initialText: {
    table: {
      category: 'Story parameters',
    },
    description: 'The starting input value (not a component prop)',
  },
  clearButtonAriaLabel: {
    description: 'The aria-label for clear button',
    table: {
      category: 'Props',
    },
  },
  searching: {
    description: 'Triggers the display of the spinner when true',
    table: {
      category: 'Props',
    },
  },
  initialFilters: {
    table: {
      category: 'Story parameters',
    },
    description: 'The filters that are set initially in this example (not a component prop)',
  },
  initialLabel: {
    table: {
      category: 'Props',
    },
    description:
      'Initial text for accessible label. This is present when there is no value and no filters',
  },
};
