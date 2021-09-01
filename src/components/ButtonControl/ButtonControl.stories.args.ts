import { commonAriaButton, commonStyles } from '../../storybook/helper.stories.argtypes';

import { BUTTON_CONTROL_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonStyles,
  ...commonAriaButton,
  control: {
    description: 'Control type',
    control: { type: 'select' },
    options: [...Object.values(CONSTANTS.CONTROLS)],
    table: {
      type: {
        summary: 'close',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};
