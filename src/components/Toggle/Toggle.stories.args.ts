import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { TOGGLE_CONSTANTS as CONSTANTS } from '.';

const toggleArgTypes = {
  defaultSelected: {
    description: 'Whether the toggle is on or off',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: CONSTANTS.DEFAULTS.DEFAULT_SELECTION,
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
};

export { toggleArgTypes };

export default {
  ...commonStyles,
  ...toggleArgTypes,
  onChange: { action: 'selected' },
};
