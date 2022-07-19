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
      defaultValue: DEFAULTS.LABEL,
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
};

export { radioGroupArgTypes };

export default {
  ...commonStyles,
  ...radioGroupArgTypes,
};
