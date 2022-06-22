import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { CHECKBOX_CONSTANTS as CONSTANTS } from '.';

const checkboxArgTypes = {
  label: {
    description: 'The label that the checkbox should have.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: CONSTANTS.DEFAULTS.LABEL,
    },
  },
  isSelected: {
    description: 'Whether the checkbox is selected or not',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: CONSTANTS.DEFAULTS.IS_SELECTED,
    },
  },
  isDisabled: {
    description: 'Whether the checkbox is disabled or not',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: CONSTANTS.DEFAULTS.IS_DISABLED,
    },
  },
  isIndeterminate: {
    description: 'Whether the checkbox should appear in an indeterminate state or not',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: CONSTANTS.DEFAULTS.IS_INDETERMINATE,
    },
  },
};

export { checkboxArgTypes };

export default {
  ...commonStyles,
  ...checkboxArgTypes,
};
