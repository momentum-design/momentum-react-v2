import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { DEFAULTS } from './RadioSimpleGroup.constants';

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
  description: {
    description:
      'The description attached to the radio group. Not supported in horizontal oritentation.',
    control: { type: 'text', required: false },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: undefined,
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
};

export { radioGroupArgTypes };

export default {
  ...commonStyles,
  ...radioGroupArgTypes,
};
