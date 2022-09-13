import { commonStyles, commonAriaButtonToggle } from '../../storybook/helper.stories.argtypes';
import { BUTTON_CIRCLE_TOGGLE_CONSTANTS as CONSTANTS } from './';
import { buttonCircleArgTypes } from '../ButtonCircle/ButtonCircle.stories.args';

const buttonCircleToggleArgTypes = {
  ...buttonCircleArgTypes,
  ...commonAriaButtonToggle,
};

delete buttonCircleToggleArgTypes.color;

buttonCircleToggleArgTypes.disabled.table.defaultValue.summary = CONSTANTS.DEFAULTS.DISABLED;
buttonCircleToggleArgTypes.ghost.table.defaultValue.summary = CONSTANTS.DEFAULTS.GHOST;
buttonCircleToggleArgTypes.outline.table.defaultValue.summary = CONSTANTS.DEFAULTS.OUTLINE;

export { buttonCircleToggleArgTypes };

export default {
  ...commonStyles,
  ...buttonCircleToggleArgTypes,
};
