import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { TOGGLE_CONSTANTS as CONSTANTS } from '.';

const toggleArgTypes = {
  isSelected: {
    description: 'Whether the toggle is on or off',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: CONSTANTS.DEFAULTS.IS_SELECTED,
    },
  },
  isDisabled: {
    description: 'Whether the toggle is disabled or not',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: CONSTANTS.DEFAULTS.IS_DISABLED,
    },
  },
  label: {
    description: 'The label that the toggle should have.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: CONSTANTS.DEFAULTS.LABEL,
    },
  },
};

export { toggleArgTypes };

export default {
  ...commonStyles,
  ...toggleArgTypes,
  onChange: { action: 'selected' },
};
