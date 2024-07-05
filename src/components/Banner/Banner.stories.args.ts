import { commonStyles, extendArgTypes } from '../../storybook/helper.stories.argtypes';

import { modalContainerArgTypes } from '../ModalContainer/ModalContainer.stories.args';

import { BANNER_CONSTANTS as CONSTANTS } from '.';

const bannerArgTypes = {
  actions: {
    description: 'Provides the actions for this element.',

    table: {
      type: {
        summary: '<ButtonGroup />',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  description: {
    description: 'Provides the description for this element.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  details: {
    description: 'Provides the details for this element.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  image: {
    description: 'Provides the image for this element.',

    table: {
      type: {
        summary: '<Avatar />',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  isAlert: {
    description: 'Center this `<Banner />` when `true`.',
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
  shape: {
    description: 'Provides the shape for this element. the `rectangle` shape can grow vertically.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.SHAPES)],
    table: {
      type: {
        summary: `${Object.values(CONSTANTS.SHAPES)
          .map((shape) => `"${shape}"`)
          .join(' | ')}`,
      },
      defaultValue: {
        summary: `"${CONSTANTS.DEFAULTS.SHAPE}"`,
      },
    },
  },
  title: {
    description: 'Provides the title for this element.',
    control: { type: 'text' },
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

export { bannerArgTypes };

export default {
  ...commonStyles,
  ...bannerArgTypes,
  ...extendArgTypes('ModalContainer', modalContainerArgTypes, ['children', 'isPadded', 'round']),
};
