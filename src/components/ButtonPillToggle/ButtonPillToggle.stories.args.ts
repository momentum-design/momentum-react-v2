import { commonStyles, commonAriaButtonToggle } from '../../storybook/helper.stories.argtypes';
import { BUTTON_PILL_TOGGLE_CONSTANTS as CONSTANTS } from './';
import buttonPillArgTypes from '../ButtonPill/ButtonPill.stories.args';

const buttonPillToggleArgTypes = {
  ...buttonPillArgTypes,
  ...commonAriaButtonToggle,
  isSelected: {
    description: 'For controlled toggle: whether toggle button is selected or not.',
    options: [true, false, undefined],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SELECTED,
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
        summary: CONSTANTS.DEFAULTS.SELECTED,
      },
    },
  },
};

delete buttonPillToggleArgTypes.color;
delete buttonPillToggleArgTypes.ghost;

buttonPillToggleArgTypes.outline.table.defaultValue.summary = CONSTANTS.DEFAULTS.OUTLINE;

export { buttonPillToggleArgTypes };

export default {
  ...commonStyles,
  ...buttonPillToggleArgTypes,
};
