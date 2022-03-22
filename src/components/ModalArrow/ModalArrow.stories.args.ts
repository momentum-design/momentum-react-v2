import { commonStyles } from 'storybook/helper.stories.argtypes';

import { MODAL_ARROW_CONSTANTS as CONSTANTS } from '.';

export default {
  ...commonStyles,
  placement: {
    description:
      'Placement of the Modal relative to the trigger component. The modal arrow will be placed accordingly. For example `placement = bottom`, the arrow will show up.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.PLACEMENTS as Record<string, string>)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.PLACEMENTS.BOTTOM as string,
      },
    },
  },
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
};
