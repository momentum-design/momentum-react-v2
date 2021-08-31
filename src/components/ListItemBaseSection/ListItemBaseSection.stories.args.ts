import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { LIST_ITEM_BASE_SECTION_CONSTANTS as CONSTANTS } from '.';

export default {
  ...commonStyles,
  position: {
    defaultValue: CONSTANTS.DEFAULTS.POSITION,
    description: 'Determines the position of the section.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.POSITIONS)],
    table: {
      type: {
        summary: "'start' | 'middle' | 'end' | 'fill'",
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.POSITION,
      },
    },
  },
};
