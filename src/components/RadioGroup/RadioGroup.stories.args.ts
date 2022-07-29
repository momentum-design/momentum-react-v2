import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { DEFAULTS } from './RadioGroup.constants';

const radioGroupArgTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  setValue: {
    description:
      'Setter for the using the component as controlled. Called when the state is changed.',
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
  description: {
    description:
      'The description attached to the radio group. Not supported in horizontal oritentation.',
    control: { type: 'text', required: false },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: DEFAULTS.GROUP_DESCRIPTION,
    },
  },
  options: {
    description: 'Available options for the radio group',
    table: {
      type: {
        summary: 'Array<RadioProps>',
      },
    },
  },
  value: {
    description: 'The current value.',
    control: { type: 'text', required: false },
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  defaultValue: {
    description: 'The default value.',
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
