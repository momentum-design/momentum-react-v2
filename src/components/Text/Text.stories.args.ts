import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { TEXT_CONSTANTS as CONSTANTS } from '.';

export default {
  ...commonStyles,
  children: {
    description: 'Provides the child nodes for this element.',
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
  className: {
    description:
      'If present, the class name will be added to the underlying component. Used to override styles by consumers.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  type: {
    description: 'Modifies the text style (token) of this `<Text />`.',
    options: [undefined, ...Object.values(CONSTANTS.TYPES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.TYPE,
      },
    },
  },
};
