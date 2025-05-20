import { commonStyles, commonAriaButtonToggle } from '../../storybook/helper.stories.argtypes';
import { DEFAULTS } from './ButtonCircleToggle.constants';

const buttonCircleToggleArgTypes = {
  ...commonAriaButtonToggle,
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
    description: 'For controlled toggle: whether toggle button is selected or not.',
    options: [true, false, undefined],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.SELECTED,
      },
    },
  },
  initialIsSelected: {
    description: 'For uncontrolled toggle: whether toggle button starts selected or not.',
    options: [true, false, undefined],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.SELECTED,
      },
    },
  },
};

export { buttonCircleToggleArgTypes };

export default {
  ...commonStyles,
  ...buttonCircleToggleArgTypes,
};
