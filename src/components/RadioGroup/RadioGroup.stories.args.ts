import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { DEFAULTS } from './RadioGroup.constants';

const radioGroupArgTypes = {
  // NOTE: Below is an example. See [Storybook argTypes documentation]{@link https://storybook.js.org/docs/react/api/argtypes}.
  children: {
    table: {
      disable: true,
    },
  },
  label: {
    description: 'The label of the checkbox group.',
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: DEFAULTS.GROUP_LABEL,
    },
  },
  options: {
    description: 'Available options for the radio group',
    table: {
      type: {
        summary: 'Array<RadioOption>',
      },
    },
  },
  value: {
    description: 'The current value (controlled).',
    control: { type: 'text', required: false },
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  defaultValue: {
    description: 'The default value (uncontrolled).',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  isDisabled: {
    description: 'Whether the input is disabled',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
    },
    defaultValue: DEFAULTS.GROUP_DISABLED,
  },
  isReadOnly: {
    description: 'Whether the input can be selected but not changed by the user.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
    },
    defaultValue: DEFAULTS.GROUP_READONLY,
  },
  orientation: {
    description: 'The axis the Radio Button(s) should align with.',
    control: 'select',
    options: ['vertical', 'horizontal'],
    table: {
      type: {
        summary: "'vertical' | 'horizontal'",
      },
    },
    defaultValue: DEFAULTS.GROUP_ORIENTATION,
  },
};

export { radioGroupArgTypes };

export default {
  ...commonStyles,
  ...radioGroupArgTypes,
};
