import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { MENU_LIST_BACKGROUND_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonStyles,
  color: {
    defaultValue: undefined,
    description: 'Determines the color of the background.',
    options: [undefined, ...Object.values(CONSTANTS.COLORS)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};
