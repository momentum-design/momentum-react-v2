import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { DEFAULTS } from './DividerDot.constants';

export default {
  ...commonStyles,
  size: {
    description: 'To set the size of DividerDot',
    options: ['small', 'medium', 'large'],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: DEFAULTS.SIZE,
      },
    },
  },
};
