import { commonStyles, commonAriaButtonToggle } from '../../storybook/helper.stories.argtypes';
import { DEFAULTS } from './ButtonCircleToggle.constants';

const buttonCircleToggleArgTypes = {
  prefixIcon: {
    description: 'The icon to display in the button.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  isSelected: {
    description: 'Whether the element should be selected (controlled).',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.SELECTED,
      },
    },
  },
  ...commonAriaButtonToggle,
};

export { buttonCircleToggleArgTypes };

export default {
  ...commonStyles,
  ...buttonCircleToggleArgTypes,
};
