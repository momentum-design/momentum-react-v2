import { commonStyles, commonAriaButtonToggle } from '../../storybook/helper.stories.argtypes';
import { BUTTON_PILL_TOGGLE_CONSTANTS as CONSTANTS } from './';
import buttonPillArgTypes from '../ButtonPill/ButtonPill.stories.args';

const buttonPillToggleArgTypes = {
  ...buttonPillArgTypes,
  ...commonAriaButtonToggle,
};

delete buttonPillToggleArgTypes.color;

buttonPillToggleArgTypes.disabled.table.defaultValue.summary = CONSTANTS.DEFAULTS.DISABLED;
buttonPillToggleArgTypes.ghost.table.defaultValue.summary = CONSTANTS.DEFAULTS.GHOST;
buttonPillToggleArgTypes.outline.table.defaultValue.summary = CONSTANTS.DEFAULTS.OUTLINE;

export { buttonPillToggleArgTypes };

export default {
  ...commonStyles,
  ...buttonPillToggleArgTypes,
};
