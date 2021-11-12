import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { MODAL_CONTAINER_CONSTANTS as CONSTANTS } from '.';

const modalContainerArgTypes = {
  arrow: {
    description: 'Where to render the `<ModalArrow />` for this component.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.ARROWS)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  children: {
    description: 'Provides the child nodes for this component.',
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
    description: 'Provides the color of this component.',
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
      'Provides the elevation for this component. This only applies to the box-shadow depth.',
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
    description: 'Identifies if this component should be rendered with padding.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  round: {
    description:
      'Identifies if this component should be rendered with round corners and to what degree.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.ROUNDS)],
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: '0',
      },
    },
  },
};

export { modalContainerArgTypes };

export default {
  ...commonStyles,
  ...modalContainerArgTypes,
};
