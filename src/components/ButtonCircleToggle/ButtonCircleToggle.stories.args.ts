import { commonStyles, commonAriaButtonToggle } from '../../storybook/helper.stories.argtypes';
import { BUTTON_CIRCLE_TOGGLE_CONSTANTS as CONSTANTS } from './';
import { buttonCircleArgTypes } from '../ButtonCircle/ButtonCircle.stories.args';

const buttonCircleToggleArgTypes = {
  ...buttonCircleArgTypes,
  ...commonAriaButtonToggle,
};

delete buttonCircleToggleArgTypes.color;
delete buttonCircleToggleArgTypes.ghost;

buttonCircleToggleArgTypes.outline.table.defaultValue.summary = CONSTANTS.DEFAULTS.OUTLINE;

export { buttonCircleToggleArgTypes };

export default {
  ...commonStyles,
  ...buttonCircleToggleArgTypes,
};
