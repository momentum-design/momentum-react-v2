import {
  commonAriaButton,
  commonHTMLAttributes,
  commonStyles,
} from '../../storybook/helper.stories.argtypes';

import { BUTTON_CONTROL_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonStyles,
  ...commonHTMLAttributes,
  ...commonAriaButton,
  control: {
    description: 'Control type',
    control: { type: 'select' },
    options: [...Object.values(CONSTANTS.CONTROLS)],
    table: {
      type: {
        summary: 'close | favorite | minimize | maximize | mute',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  isCircular: {
    description: 'Whether to render this button as a circle.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};
