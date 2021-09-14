import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { MODAL_CONTAINER_CONSTANTS as CONSTANTS } from '.';

export default {
  ...commonStyles,
  children: {
    description: 'Provides the child nodes for this `<ModalContainer />`.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  color: {
    description: 'Provides the child nodes for this `<ModalContainer />`.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.COLORS)],
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  elevation: {
    description: 'Provides the child nodes for this `<ModalContainer />`.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.ELEVATIONS)],
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};
