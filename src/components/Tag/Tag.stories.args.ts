import { commonStyles, extendArgTypes } from '../../storybook/helper.stories.argtypes';

import { buttonSimpleArgTypes } from '../ButtonSimple/ButtonSimple.stories.args';

import { TAG_CONSTANTS as CONSTANTS } from './';

const tagArgTypes = {
  children: {
    description: 'Provides the text for this element.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'String',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  color: {
    description: 'Color of this component.',
    control: { type: 'select' },
    options: ['undefined', ...Object.values(CONSTANTS.COLORS)],
    table: {
      type: {
        summary: Object.values(CONSTANTS.COLORS)
          .map((value) => `"${value}"`)
          .join(' | '),
      },
      defaultValue: {
        summary: 'primary',
      },
    },
  },
  format: {
    description: 'Format for this component.',
    control: { type: 'select' },
    options: ['undefined', ...Object.values(CONSTANTS.FORMATS)],
    table: {
      type: {
        summary: Object.values(CONSTANTS.FORMATS)
          .map((value) => `"${value}"`)
          .join(' | '),
      },
      defaultValue: {
        summary: 'normal',
      },
    },
  },
};

export { tagArgTypes };

export default {
  ...commonStyles,
  ...extendArgTypes('ButtonSimple', buttonSimpleArgTypes),
  ...tagArgTypes,
};
