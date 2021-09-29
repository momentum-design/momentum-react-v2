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
    description: 'Provides the color of this `<ModalContainer />`.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.COLORS)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'primary',
      },
    },
  },
  elevation: {
    description:
      'Provides the elevation for this `<ModalContainer />`. This only applies to the box-shadow depth.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.ELEVATIONS)],
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: '0',
      },
    },
  },
  isPadded: {
    description: 'Identifies if this `<ModalContainer />` should be rendered with padding.',
    control: { type: 'boolean' },
    options: [undefined, ...Object.values(CONSTANTS.ELEVATIONS)],
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  radius: {
    description: 'Specifies the amount of radius to apply to the container',
    control: { type: 'number' },
    options: [undefined, ...Object.values(CONSTANTS.RADIUS)],
    table: {
      type: {
        summary: ' 0 | 12 | 24',
      },
      defaultValue: {
        summary: '0',
      },
    },
  },
};
