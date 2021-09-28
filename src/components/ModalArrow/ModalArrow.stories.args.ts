import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { MODAL_ARROW_CONSTANTS as CONSTANTS } from '.';

export default {
  ...commonStyles,
  color: {
    description: 'What color to render this `<ModalArrow />` as.',
    control: { type: 'select' },
    options: [...Object.values(CONSTANTS.COLORS)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  side: {
    description: 'Defines which side this `<ModalArrow />` will appear on.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.SIDES)],
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
