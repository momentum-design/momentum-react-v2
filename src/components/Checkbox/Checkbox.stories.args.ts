import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { CHECKBOX_CONSTANTS as CONSTANTS } from '.';

const checkboxArgTypes = {
  // NOTE: Below is an example. See [Storybook argTypes documentation]{@link https://storybook.js.org/docs/react/api/argtypes}.
  children: {
    description:
      'Provides the child nodes for this element. If a label exists, it should appear here.', // NOTE: Description of this prop.
    control: { type: 'text' }, // NOTE: Control type for this prop.
    table: {
      type: {
        summary: 'ReactNode', // NOTE: Explicit type of this prop.
      },
      defaultValue: {
        summary: 'undefined', // NOTE: Default value for this prop.
      },
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
  disabled: {
    description: 'Whether the checkbox is disabled or not',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: CONSTANTS.DEFAULTS.DISABLED,
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
};

export { checkboxArgTypes };

export default {
  ...commonStyles,
  ...checkboxArgTypes,
};
