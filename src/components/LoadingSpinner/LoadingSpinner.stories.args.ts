import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { SIZES as ICON_SIZES } from '../Icon/Icon.constants';

import { DEFAULTS } from './LoadingSpinner.constants';
const loadingSpinnerArgTypes = {
  scale: {
    defaultValue: DEFAULTS.SCALE,
    description: 'Size of the loading spinner (same as IconScale).',
    options: [undefined, ...Object.values(ICON_SIZES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'IconScale',
      },
      defaultValue: {
        summary: DEFAULTS.SCALE,
      },
    },
  },
};

export { loadingSpinnerArgTypes };

export default {
  ...commonStyles,
  ...loadingSpinnerArgTypes,
};
