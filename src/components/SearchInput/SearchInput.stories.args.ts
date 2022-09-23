import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { DEFAULTS, HEIGHTS } from './SearchInput.constants';

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
  height: {
    description: 'Changes the height of the component',
    options: [...Object.values(HEIGHTS)],
    control: { type: 'select' },
    defaultValue: DEFAULTS.HEIGHT,
    table: {
      category: 'Props',
    },
  },
};
